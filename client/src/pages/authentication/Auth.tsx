import styles from './Auth.module.scss';
import { memo, useState, useEffect, useContext } from 'react';
import { LoginForm, RegisterForm } from './form';
import { observer } from "mobx-react-lite";
import { useNavigate } from 'react-router';
import { Context } from '@/index';
import { Button } from '@/components/form';

const Auth = () => {
  const [isRegistration, setIsRegistration] = useState<boolean>(false);
  const toggleBtnText = isRegistration ? 'Back to login' : 'Aren`t registered yet? Register here';
  const toggleHeadingText = isRegistration ? 'Registration' : 'Log in';
  const navigate = useNavigate();
  const { store } = useContext(Context);

  const handleToggleForm = () => {
    setIsRegistration(!isRegistration);
  };

  useEffect(() => {
    navigate(store.isAuth && '/home');
  }, [store.isAuth]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h3>{toggleHeadingText}</h3>
        {isRegistration
          ? <RegisterForm />
          : <LoginForm />
        }
        <Button
          className={styles.toggleBtn}
          onClick={handleToggleForm}
          type="submit"
          text={toggleBtnText}
          buttonStyle='secondary'
        />
      </div>
    </div>
  );
}

export default observer(Auth);