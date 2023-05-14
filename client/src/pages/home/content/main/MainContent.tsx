import styles from './MainContent.module.scss';
import { Button, FormField } from '@components/form';
import Modal from '@/components/modal/Modal';
import { memo, useState } from 'react';
import { v4 } from 'uuid';
import { useForm } from 'react-hook-form';

type Props = {
  handleNavigate: (roomId: string) => void;
};
 
const MainContent = ({ handleNavigate }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isCreation, setIsCreation] = useState<boolean>(true);
  const [isOpened, setIsOpened] = useState<boolean>(false);

  const handleClick = (action: 'creation' | 'joining') => {
    setIsCreation(action === 'creation' ? true : false);
    setIsOpened(true);
  }

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    setIsOpened(false);
  });

  const modalTitle = isCreation ? 'Create Private room' : 'Join Private room';

  const createPrivateRoomModalContent = (
    <form className={styles.form} onSubmit={onSubmit}>
      <FormField
        id="title"
        type="text"
        name="title"
        label="Title of room"
        placeholder="Title of room"
        register={register}
        rules={{ required: 'You must enter title.' }}
        errors={errors}
      />
      <Button
        className={styles.submitBtn}
        type="submit"
        text='Create Private room'
        buttonStyle='primary'
      />
    </form>
  )

  const joinPrivateRoomModalContent = (
    <form className={styles.form} onSubmit={onSubmit}>
      <FormField
        id="title"
        type="text"
        name="title"
        label="Key of private room"
        placeholder="Key of private room"
        register={register}
        rules={{ required: 'You must enter key of room.' }}
        errors={errors}
      />
      <Button
        className={styles.submitBtn}
        type="submit"
        text='Join Private room'
        buttonStyle='primary'
      />
    </form>
  )

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.heading}>{`Welcome to Sikorsky speaking club!`}</h2>
      <div className={styles.controls}>
        <div className={styles.control}>
          <h4 className={styles.title}>Create a Private chat</h4>
          <Button 
            type='button' 
            buttonStyle='secondary' 
            text='Create' 
            aria-label='Create a Private chat'
            onClick={() => handleClick('creation')}
          />
        </div>
        <div className={styles.control}>
          <h4 className={styles.title}>Join a Private chat</h4>
          <Button 
            type='button' 
            buttonStyle='secondary' 
            text='Join' 
            aria-label='Join a Private chat'
            onClick={() => handleClick('joining')}
          />
        </div>
        <div className={styles.control}>
          <h4 className={styles.title}>Create a Live chat</h4>
          <Button
            onClick={() => handleNavigate(v4())}
            type='button'
            buttonStyle='secondary'
            text='Create'
            aria-label='Create a Live chat'
          />
        </div>
      </div>
      <Modal title={modalTitle} setIsOpen={setIsOpened} isOpen={isOpened} children={isCreation ? createPrivateRoomModalContent : joinPrivateRoomModalContent} />
    </div>
  )
}

export default memo(MainContent);