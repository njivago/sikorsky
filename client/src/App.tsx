import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Room from '@pages/chat/Chat';
import Main from '@pages/home/Home';
import Auth from '@pages/authentication/Auth';
import { useContext } from 'react';
import { Context } from '@/index';

const App = () => {
  const { store } = useContext(Context);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={store.isAuth 
            ? <Navigate to="/home" replace />
            : <Navigate to="/authentication" replace /> 
          }
        />
        <Route path='/room/:id' element={<Room />} />
        <Route path='/home' element={<Main />} />
        <Route path='/authentication' element={<Auth />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;