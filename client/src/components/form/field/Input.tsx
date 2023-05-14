import { type FC, forwardRef, type DetailedHTMLProps, type InputHTMLAttributes } from 'react';

type InputType = 'text' | 'email' | 'password';

export type InputProps = {
  id: string;
  name: string;
  label: string;
  type?: InputType;
  className?: string;
} & Omit<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, 'type'>;

export const Input: FC<InputProps> = forwardRef<HTMLInputElement, InputProps>(
  ({
    id,
    name,
    label,
    type = 'text',
    className = '',
    placeholder,
    ...props
  }, ref) => 
    <input 
      id={id} 
      ref={ref} 
      name={name} 
      type={type} 
      aria-label={label} 
      placeholder={placeholder} 
      className={className} 
      {...props} 
    />
);