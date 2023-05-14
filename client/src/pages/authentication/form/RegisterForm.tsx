import styles from './Form.module.scss';
import { useForm } from 'react-hook-form';
import { Button, FormField } from '@components/form';
import { type FC, memo, useContext } from 'react';
import type { RegistrationFormFields } from './types';
import { Context } from '@/index';

const emailPattern = {
  value: new RegExp('^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$', 'ig'),
  message: 'Enter a valid email address.',
};

const RegisterForm: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationFormFields>();

  const { store } = useContext(Context);

  const onSubmit = handleSubmit((data) => {
    const { username, password, email } = data;
    store.registration(username, password, email);
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
      <FormField<RegistrationFormFields>
        id="email"
        type="email"
        name="email"
        label="Email Address"
        placeholder="Email Address"
        register={register}
        rules={{
          required: 'You must enter your email address.',
          pattern: emailPattern,
        }}
        errors={errors}
      />
      <Button
        className={styles.submitBtn}
        type="submit"
        text='Register'
        buttonStyle='primary'
      />
    </form>
  );
};

export default memo(RegisterForm);