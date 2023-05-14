import styles from './LiveChatsBlock.module.scss';
import { Button } from '@components/form';
import { forwardRef } from 'react';

type Props = {
  rooms?: string[];
  handleNavigate: (roomId: string) => void;
};

const LiveChatsBlock = forwardRef<HTMLDivElement, Props>(({ rooms, handleNavigate }, ref) => {

  return (
    <div className={styles.wrapper} ref={ref}>
        <h2 className={styles.heading}>Available Rooms</h2>
        <ul>
          {rooms.map(roomID => (
            <li key={roomID} className={styles.room}>
              <span className={styles.key}>{roomID}</span>
              <Button 
                onClick={() => handleNavigate(roomID)}
                className={styles.join}
                type='button'
                buttonStyle='secondary'
                text='Join room'
              />
            </li>
          ))}
        </ul>
    </div>
  )
});

export default LiveChatsBlock;