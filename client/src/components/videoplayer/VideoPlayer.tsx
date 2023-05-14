import { useNavigate } from 'react-router';
import Controls from './Controls';
import styles from './VideoPlayer.module.scss';
import { getLayout } from './getLayout';
import useRTC, { LOCAL_VIDEO } from '@utils/hooks/useRTC';

type Props = {
  className?: string;
  roomId: string;
}

const VideoPlayer = ({ roomId }: Props) => {
  const { clients, provideMediaRef, toggleCamera, toggleMic, mediaRef } = useRTC(roomId);
  const videoLayout = getLayout(clients.length);
  const navigate = useNavigate();

  return (
    <div className={styles.wrapper}>
      {typeof clients === 'object' && clients.map((client, index) => (
        <div key={client} className={styles.container} style={videoLayout[index]} id={client}>
          <video
            className={styles.video}
            ref={instance => provideMediaRef(client, instance)}
            autoPlay
            playsInline
            muted={client === LOCAL_VIDEO}
          />
          {/* <span className={styles.name}>{client.name}</span> */}
        </div>
      ))}
      <Controls 
        toggleCamera={toggleCamera}
        toggleMic={toggleMic}
        disconnect={() => navigate('/home')}
        mediaRef={mediaRef}
      />
    </div>
  )
}

export default VideoPlayer;
