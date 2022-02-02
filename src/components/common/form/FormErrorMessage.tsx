import ErrorIcon from '@mui/icons-material/Error';
import { FormHelperText } from '@mui/material';

interface Props {
  id?: string;
  msg?: string;
}

const FormErrorMessage = ({ id, msg }: Props) => (
  <FormHelperText
    sx={{
      display: 'flex',
      alignItems: 'center',
      color: 'error.dark',
      textAlign: 'left',
      fontSize: 'small',
    }}
    role="alert"
    id={id}
  >
    <ErrorIcon sx={{ marginRight: 1 }} fontSize="small" />
    {msg}
  </FormHelperText>
);

export default FormErrorMessage;
