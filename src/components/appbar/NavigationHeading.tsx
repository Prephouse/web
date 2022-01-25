import { useIntl } from 'react-intl';

import { SxProps, Theme, Typography } from '@mui/material';

import PlainRouterLink from 'components/common/PlainRouterLink';

import { HOME_PATH } from 'strings/paths';

interface Props {
  sx?: SxProps<Theme>;
}

const NavigationHeading = ({ sx }: Props) => {
  const intl = useIntl();

  return (
    <Typography
      component="h1"
      variant="h4"
      sx={{
        ...sx,
        display: 'inline-block',
        marginRight: 2,
      }}
    >
      <PlainRouterLink to={HOME_PATH}>{intl.formatMessage({ id: 'app.title' })}</PlainRouterLink>
    </Typography>
  );
};

export default NavigationHeading;
