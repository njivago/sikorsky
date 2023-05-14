import styles from './Chat.module.scss';
import { useParams } from 'react-router';
import { VideoPlayer } from '@components/videoplayer';
import Header from '@components/header/Header';

export default function Room() {
  const { id: roomID } = useParams();

  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className={styles.wrapper}>
          <VideoPlayer roomId={roomID} />
        </div>
      </main>
    </>
  );
}