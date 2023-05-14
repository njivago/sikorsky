import styles from './VideoPlayer.module.scss';
import { type MutableRefObject, memo, useState } from 'react';
import CallEndIcon from '@mui/icons-material/CallEnd';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';

type Media = { mic: Boolean, cam: Boolean };

type Props = {
  toggleMic: () => void;
  toggleCamera: () => void;
  disconnect: () => void;
  mediaRef: MutableRefObject<Media>;
}

const Controls = ({ toggleMic, toggleCamera, disconnect, mediaRef }: Props) => {
  const [media, setMedia] = useState<Media>(mediaRef.current);

  const camIcon = media.cam ? <VideocamIcon /> : <VideocamOffIcon />;
  const micIcon = media.mic ? <MicIcon /> : <MicOffIcon />

  const handleMic = () => {
    toggleMic();
    setMedia({ cam: mediaRef.current.cam, mic: mediaRef.current.mic });
  };

  const handleCam = () => {
    toggleCamera();
    setMedia({ mic: mediaRef.current.mic, cam: mediaRef.current.cam });
  };
  
  return (
    <div className={styles.controls}>
      <button 
        type='button' 
        onClick={handleCam} 
        className={styles.control} 
        aria-label='On/Off Video camera'
      >
        {camIcon}
      </button>
      <button 
        type='button' 
        onClick={handleMic} 
        className={styles.control} 
        aria-label='On/Off Microphone'
      >
        {micIcon}
      </button>
      <button 
        type='button' 
        onClick={disconnect} 
        className={styles.control} 
        aria-label='Disconnect from room'
      >
        <CallEndIcon />
      </button>
    </div>
  )

}

export default memo(Controls);