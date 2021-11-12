import { Container, styled } from '@mui/material';

const PageContainer = styled(Container)(({ theme }) => ({
  flexDirection: 'column',
  margin: 'auto',
  padding: theme.spacing(3, 0),
  [theme.breakpoints.down('xs')]: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  [theme.breakpoints.only('sm')]: {
    paddingLeft: theme.spacing(6),
    paddingRight: theme.spacing(6),
  },
  [theme.breakpoints.only('md')]: {
    paddingLeft: theme.spacing(9),
    paddingRight: theme.spacing(9),
  },
  [theme.breakpoints.only('lg')]: {
    paddingLeft: theme.spacing(12),
    paddingRight: theme.spacing(12),
  },
  '& > section': {
    display: 'inline-block',
    boxSizing: 'border-box',
    width: '100%',
    '&:not(:first-child):not(:last-child)': {
      padding: theme.spacing(3, 0),
    },
    '&:first-child': {
      padding: theme.spacing(0, 0, 3),
    },
    '&:last-child': {
      padding: theme.spacing(3, 0, 0),
    },
    // overflowX: "scroll",
  },
}));

export default PageContainer;
