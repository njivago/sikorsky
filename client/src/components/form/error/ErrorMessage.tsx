import { memo } from 'react';

type FormErrorMessageProps = {
  className?: string;
  children: any;
};

const FormErrorMessage = ({
  className,
  children
}: FormErrorMessageProps) => <p className={className}>{children}</p>

export default memo(FormErrorMessage);