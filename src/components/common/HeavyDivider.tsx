import Divider from '@mui/material/Divider';
import { NAVIGATION_HOVER_GREY } from '../../styles/colours';
import { styled } from '@mui/material';

interface HeavyDividerProps {
  orientation?: 'horizontal' | 'vertical';
}

const D = styled(Divider)(({ theme }) => ({
  marginLeft: theme.spacing(2),
  marginRight: theme.spacing(2),
  backgroundColor: NAVIGATION_HOVER_GREY,
}));

const HeavyDivider = ({ orientation = 'horizontal' }: HeavyDividerProps) => (
  <D orientation={orientation} variant="middle" flexItem />
);

export default HeavyDivider;
