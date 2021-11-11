import { styled } from '@mui/material';

interface Props {
  success: boolean;
}

const SmallCircle = styled('span')(() => ({
  display: 'inline-block',
  height: '12px',
  width: '12px',
  borderRadius: '50%',
}));

const SmallSuccessIndicatorIcon = ({ success }: Props) => (
  <SmallCircle
    sx={{
      backgroundColor: theme => theme.palette[success ? 'success' : 'error'].main,
    }}
  />
);

export default SmallSuccessIndicatorIcon;
