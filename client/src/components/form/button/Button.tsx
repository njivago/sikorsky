import styles from './Button.module.scss';
import { type ComponentPropsWithoutRef, memo } from "react";

type Props = {
  className?: string;
  text: string;
  buttonStyle: 'primary' | 'secondary';
} & Omit<ComponentPropsWithoutRef<"button">, 'className'>;

const Button = ({ className, text, buttonStyle, ...props}: Props) => {
  return (
    <button className={`${styles.btn} ${className && className} ${styles[buttonStyle]}`} {...props}>{text}</button>
  )
}

export default memo(Button);
