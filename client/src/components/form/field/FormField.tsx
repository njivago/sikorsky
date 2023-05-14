import styles from './FormField.module.scss';
import { get } from './lodashGet';
import {
  RegisterOptions,
  DeepMap,
  FieldError,
  UseFormRegister,
  Path,
} from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { Input, InputProps } from './Input';
import { ErrorMessage as FormErrorMessage } from '../error';

export type FormInputProps<TFormValues> = {
  name: Path<TFormValues>;
  rules?: RegisterOptions;
  register?: UseFormRegister<TFormValues>;
  errors?: Partial<DeepMap<TFormValues, FieldError>>;
} & Omit<InputProps, 'name'>;

const FormField = <TFormValues extends Record<string, unknown>>({
  name,
  register,
  rules,
  errors,
  className,
  id,
  label,
  ...props
}: FormInputProps<TFormValues>): JSX.Element => {
  const errorMessages = get(errors, name);
  const hasError = !!(errors && errorMessages);

  return (
    <div className={`${styles.wrapper} ${className}`} aria-live="polite">
      <Input
        name={name}
        id={id}
        label={label}
        aria-invalid={hasError}
        className={`${styles.input} ${hasError && styles.hasError}`}
        {...props}
        {...(register && register(name, rules))}
      />
      <label htmlFor={id} className={styles.label}>{label}</label>
      <ErrorMessage
        errors={errors}
        name={name as any}
        render={({ message }) => (
          <FormErrorMessage className={styles.errorMessage}>{message}</FormErrorMessage>
        )}
      />
    </div>
  );
};

export default FormField;