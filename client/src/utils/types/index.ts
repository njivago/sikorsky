type RTCCommonInitial =
  | 'peerID' 
  | 'createOffer'
  | 'sessionDescription'
  | 'iceCandidate';

export type RTCCommon<T extends RTCCommonInitial, B extends RTCCommonInitial> = Pick<{
  peerID: string;
  createOffer: boolean;
  sessionDescription: RTCSessionDescriptionInit;
  iceCandidate: RTCIceCandidateInit;
}, T | B>