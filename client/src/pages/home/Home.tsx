import styles from './Home.module.scss';
import { useState, useEffect, useRef } from 'react';
import socket from '@services/socket';
import { useNavigate } from 'react-router';
import Header from '@components/header/Header';
import ACTIONS from '@services/socket/actions';
import LiveChatsBlock from './content/live-chats/LiveChatsBlock';
import MainContent from './content/main/MainContent';

export default function Main() {
  const [rooms, updateRooms] = useState([]);
  const rootNode = useRef();
  const navigate = useNavigate();

  const navigateToRoom = (roomID: string) => {
    try {
      navigate(`/room/${roomID}`);
    } catch(error) {
    }
  };

  useEffect(() => {
    socket.on(ACTIONS.SHARE_ROOMS, ({ rooms = [] }: { rooms?: string[] } = {}) => {
      if (rootNode.current) {
        updateRooms(rooms);
      }
    });
    console.log(rootNode.current)
  }, []);

  return (
    <>
      <Header />
      <main className={styles.main}>
        <MainContent handleNavigate={navigateToRoom}/>
        <LiveChatsBlock ref={rootNode} rooms={rooms} handleNavigate={navigateToRoom} />
      </main>
    </>
  );
}