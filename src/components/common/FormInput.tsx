import { ChangeEvent, ReactNode } from 'react';

import {
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
  OutlinedInputProps,
} from '@mui/material';

import FormErrorMessage from 'components/common/FormErrorMessage';

interface Props extends OutlinedInputProps {
  name: string;
  label: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
  type?: string;
  errorMsg?: string;
  helperText?: string;
  required?: boolean;
  children?: ReactNode;
}

const FormInput = ({
  name,
  label,
  value,
  onChange,
  type,
  errorMsg = '',
  helperText = '',
  children,
  required = false,
  ...otherProps
}: Props) => (
  <FormControl variant="outlined" style={{ width: '100%' }} required={required}>
    <InputLabel htmlFor={label}>{label}</InputLabel>
    <OutlinedInput
      id={label}
      name={name}
      type={type}
      label={label}
      value={value || ''}
      error={errorMsg.length > 0}
      onChange={onChange}
      fullWidth
      aria-invalid={!!errorMsg}
      aria-describedby={errorMsg ? `${label}-error-message` : `${label}-helper-text`}
      {...otherProps}
    />
    {helperText && <FormHelperText id={`${label}-helper-text`}>{helperText}</FormHelperText>}
    {errorMsg && <FormErrorMessage id={`${label}-error-message`} msg={errorMsg} />}
    {children}
  </FormControl>
);

export default FormInput;
