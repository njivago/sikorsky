import styles from './Header.module.scss';
import Logo from '@/assets/logo';
import { useCallback, memo, useContext } from 'react';
import { useNavigate } from 'react-router';
import { Context } from '@/index';
import { Button } from '@components/form';

const Header = () => {
  const navigate = useNavigate();
  const { store } = useContext(Context);

  const handleClick = useCallback((destination: '/home' | '/authentication') => {
    if (destination === '/authentication') {
      store.logout();
      navigate("/authentication");
    } else navigate("/home");
  }, []);

  return (
    <header className={styles.header}>
      <Logo className={styles.logo} onClick={() => handleClick('/home')}/>
      <Button 
        onClick={() => handleClick('/authentication')} 
        className={styles.logout} 
        type='button' 
        buttonStyle='secondary' 
        text='Log out'
      />
    </header>
  )
}

export default memo(Header)