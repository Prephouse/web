import { FormGroup, styled } from '@mui/material';

const FormGroupCompact = styled(FormGroup)(({ theme }) => ({
  marginTop: theme.spacing(2),
  gap: theme.spacing(2),
}));

export default FormGroupCompact;
