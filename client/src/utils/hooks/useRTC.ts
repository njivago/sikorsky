import { useEffect, useRef, useCallback } from 'react';
import useStateWithCallback from './useStateWithCallback';
import socket from '@services/socket';
import type { RTCCommon } from '@utils/types';
import ACTIONS from '@services/socket/actions'

type PeerConnection = {
  [key: string]: RTCPeerConnection;
};

type PeerMediaElement = {
  [key: string]: HTMLMediaElement;
}

const freeice = require('freeice');

export const LOCAL_VIDEO = 'LOCAL_VIDEO';

export default function useRTC(roomID: string) {
  const [clients, updateClients] = useStateWithCallback<string[]>([]);
  
  const addNewClient = useCallback((newClient: string, callback: (...args: unknown[]) => unknown) => {
    typeof updateClients === 'function' && updateClients((clientList: string[]) => {
      return !clientList.includes(newClient) 
      ? [...clientList, newClient]
      : clientList;
    }, callback);
  }, [updateClients]);
  
  const peerConnections = useRef<PeerConnection>({});
  const localMediaStream = useRef<MediaStream>(null);
  const peerMediaElements = useRef<PeerMediaElement>({ [LOCAL_VIDEO]: null });
  const mediaRef = useRef<{ mic: Boolean, cam: Boolean }>({ mic: true, cam: true });

  const handleNewPeer = async ({ peerID, createOffer }: RTCCommon<'peerID', 'createOffer'>) => {
    if (peerID in peerConnections.current) 
      console.warn(`Already connected to peer ${peerID}`);

    peerConnections.current[peerID] = new RTCPeerConnection({ iceServers: freeice() });

    peerConnections.current[peerID].onicecandidate = event => {
      if (!event.candidate)
        return null;

      socket.emit(ACTIONS.RELAY_ICE, {
        peerID,
        iceCandidate: event.candidate
      });
    }

    let tracksNumber = 0;

    peerConnections.current[peerID].ontrack = ({ streams: [remoteStream] }) => {
      tracksNumber++;

      if (tracksNumber !== 2) 
        return null;
      
      tracksNumber = 0;

      addNewClient(peerID, () => {
        if (peerMediaElements.current[peerID])
          peerMediaElements.current[peerID].srcObject = remoteStream;
        
        else {
          let settled = false;

          const interval = setInterval(() => {
            if (peerMediaElements.current[peerID]) {
              peerMediaElements.current[peerID].srcObject = remoteStream;
              settled = true;
            }

            settled && clearInterval(interval);
          }, 1000);
        }
      });
    }

    localMediaStream.current?.getTracks().forEach(track => {
      peerConnections.current[peerID].addTrack(track, localMediaStream.current);
    });

    if (createOffer) {
      const offer = await peerConnections.current[peerID].createOffer();

      await peerConnections.current[peerID].setLocalDescription(offer);

      socket.emit(ACTIONS.RELAY_SDP, {
        peerID,
        sessionDescription: offer
      });
    }
  }

  const setRemoteMedia = async ({ peerID, sessionDescription: remoteDescription }: RTCCommon<'peerID', 'sessionDescription'>) => {
    await peerConnections.current[peerID].setRemoteDescription(
      new RTCSessionDescription(remoteDescription)
    );

    if (remoteDescription.type === 'offer') {
      const answer = await peerConnections.current[peerID].createAnswer();

      await peerConnections.current[peerID].setLocalDescription(answer);

      socket.emit(ACTIONS.RELAY_SDP, {
        peerID,
        sessionDescription: answer
      });
    }
  }

  useEffect(() => {
    socket.on(ACTIONS.ADD_PEER, handleNewPeer);

    return () => {
      socket.off(ACTIONS.ADD_PEER);
    }
  }, []);

  useEffect(() => {
    socket.on(ACTIONS.SESSION_DESCRIPTION, setRemoteMedia)

    return () => {
      socket.off(ACTIONS.SESSION_DESCRIPTION);
    }
  }, []);

  useEffect(() => {
    socket.on(ACTIONS.ICE_CANDIDATE, ({ peerID, iceCandidate }: RTCCommon<'peerID', 'iceCandidate'>) => {
      peerConnections.current[peerID].addIceCandidate(
        new RTCIceCandidate(iceCandidate)
      );
    });

    return () => {
      socket.off(ACTIONS.ICE_CANDIDATE);
    }
  }, []);

  useEffect(() => {
    const handleRemovePeer = ({ peerID }: RTCCommon<'peerID', null>) => {
      if (peerConnections.current[peerID]) {
        peerConnections.current[peerID].close();
      }

      delete peerConnections.current[peerID];
      delete peerMediaElements.current[peerID];

      typeof updateClients === 'function' && updateClients((clientList: string[]) => clientList.filter((clientId) => clientId !== peerID));
    };

    socket.on(ACTIONS.REMOVE_PEER, handleRemovePeer);

    return () => {
      socket.off(ACTIONS.REMOVE_PEER);
    }
  }, []);

  useEffect(() => {
    async function startCapture() {

      localMediaStream.current = await navigator.mediaDevices?.getUserMedia({
        audio: true,
        video: {
          width: 1280,
          height: 1280,
        }
      });

      console.log(await navigator.mediaDevices.enumerateDevices(), await navigator.mediaDevices?.getUserMedia({
        audio: true,
        video: true
      }))

      addNewClient(LOCAL_VIDEO, () => {
        const localVideoElement = peerMediaElements.current[LOCAL_VIDEO];

        if (localVideoElement) {
          localVideoElement.volume = 0;
          localVideoElement.srcObject = localMediaStream.current;
        }
      });
    }

    startCapture()
      .then(() => socket.emit(ACTIONS.JOIN, { room: roomID }))
      .catch(e => console.error('Error getting userMedia:', e));

    return () => {
      localMediaStream.current?.getTracks().forEach(track => track.stop());

      socket.emit(ACTIONS.LEAVE);
    };
  }, [roomID, addNewClient]);

  const toggleCamera = async () => {
    const videoTrack = localMediaStream.current?.getTracks().find(track => track.kind === 'video');
    videoTrack.enabled = !videoTrack.enabled;
    mediaRef.current.cam = videoTrack.enabled;
  };

  const toggleMic = async () => {
    const audioTrack = localMediaStream.current?.getTracks().find(track => track.kind === 'audio');
    audioTrack.enabled = !audioTrack.enabled;
    mediaRef.current.mic = audioTrack.enabled;
  };

  const provideMediaRef = useCallback((id: string, node: HTMLMediaElement) => {
    peerMediaElements.current[id] = node;
  }, []);

  return {
    clients,
    provideMediaRef,
    toggleCamera,
    toggleMic,
    mediaRef
  };
}
