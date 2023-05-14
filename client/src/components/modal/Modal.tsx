import styles from './Modal.module.scss';
import { type ReactNode, memo } from 'react';
import { createPortal } from 'react-dom';

type Props = {
  title: string;
  children: ReactNode;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Modal = ({ title, children, isOpen, setIsOpen }: Props) => {
  const modalContainer = document.querySelector('#overlay');

  const handleClose = () => {
    setIsOpen(false);
  }

  const modal = (
    <div className={`${styles.wrapper} ${isOpen ? styles.opened : styles.closed}`}>
      <div className={styles.scrim} onClick={handleClose} />
      <div className={styles.modal}>
        <h4 className={styles.title}>{title}</h4>
        <div className={styles.content}>
          {children}
        </div>
        <button type='button' onClick={handleClose} className={styles.close}>&#10006;</button>
      </div>
    </div>
  )

  return createPortal(modal, modalContainer);
}

export default memo(Modal);