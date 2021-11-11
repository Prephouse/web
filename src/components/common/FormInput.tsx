import React from "react";
import { FormControl, FormHelperText, InputLabel, OutlinedInput, OutlinedInputProps } from "@mui/material";
import FormErrorMessage from "./FormErrorMessage";

interface Props extends OutlinedInputProps {
  name: string;
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
  type?: string;
  errorMsg?: string;
  helperText?: string;
  children?: React.ReactNode;
}

const FcInput = ({
   name,
   label,
   value,
   onChange,
   type,
   errorMsg = "",
   helperText = "",
   children,
   ...otherProps
 }: Props) => {
  return (
    <FormControl variant="outlined" style={{ width: "100%" }}>
      <InputLabel htmlFor={label}>{label}</InputLabel>
      <OutlinedInput
        id={label}
        name={name}
        type={type}
        label={label}
        value={value || ""}
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
};

export default FcInput;
