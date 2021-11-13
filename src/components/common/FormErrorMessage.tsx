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
      color: theme => theme.palette.error.dark,
      textAlign: 'left',
      fontWeight: theme => theme.typography.fontWeightBold,
      fontSize: 'small',
    }}
    role="alert"
    id={id}
  >
    <ErrorIcon sx={{ marginRight: theme => theme.spacing(1) }} fontSize="small" />
    {msg}
  </FormHelperText>
);

export default FormErrorMessage;
