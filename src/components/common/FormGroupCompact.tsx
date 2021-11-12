import { FormGroup, styled } from '@mui/material';

const FormGroupCompact = styled(FormGroup)(({ theme }) => ({
  margin: theme.spacing(2, 0),
  '& > *': {
    margin: `${theme.spacing(1, 0)} !important`,
  },
}));

export default FormGroupCompact;
