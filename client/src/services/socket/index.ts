import io from 'socket.io-client';
import type { ManagerOptions } from 'socket.io-client/build/esm/manager';
import type { SocketOptions } from 'socket.io-client/build/esm/socket';

const options: Partial<ManagerOptions & SocketOptions> = {
  forceNew: true,
  reconnectionAttempts: 10,
  timeout : 10000,
  transports : ["websocket"]
}

const socket = io('http://localhost:3001', options);

export default socket;
