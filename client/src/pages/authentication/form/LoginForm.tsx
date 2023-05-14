import styles from './Form.module.scss';
import { useForm } from 'react-hook-form';
import { Button, FormField } from '@components/form';
import { type FC, memo, useContext } from 'react';
import type { RegistrationFormFields } from './types';
import { Context } from '@/index';

const LoginForm: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationFormFields>();

  const { store } = useContext(Context);

  const onSubmit = handleSubmit((data) => {
    const { username, password } = data;
    store.login(username, password);
  });

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <FormField<RegistrationFormFields>
        id="username"
        type="text"
        name="username"
        label="Username"
        placeholder="Username"
        register={register}
        rules={{ required: 'You must enter your username.' }}
        errors={errors}
      />
      <FormField<RegistrationFormFields>
        id="password"
        type="password"
        name="password"
        label="Password"
        placeholder="Password"
        register={register}
        rules={{ required: 'You must enter your password.' }}
        errors={errors}
      />
      <Button
        className={styles.submitBtn}
        type="submit"
        text='Log in'
        buttonStyle='primary'
      />
    </form>
  );
};

export default memo(LoginForm);