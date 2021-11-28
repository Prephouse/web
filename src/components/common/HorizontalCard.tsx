import { CSSProperties, ReactNode } from 'react';
import { useIntl } from 'react-intl';

import {
  Button,
  Card,
  CardContent,
  Divider,
  SvgIconTypeMap,
  Typography,
  styled,
} from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';

interface Props {
  img?: ReactNode;
  header?: ReactNode;
  body?: ReactNode;
  extra?: ReactNode;
  actions?: { href?: string | null; nameId: string; icon: OverridableComponent<SvgIconTypeMap> }[];
  style?: CSSProperties;
}

const C = styled(Card)(({ theme }) => ({
  padding: theme.spacing(3),
  '@media (min-width: 769px)': {
    display: 'flex',
  },
}));

const ImageWrapper = styled('div')(({ theme }) => ({
  '@media (max-width: 768px)': {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    marginBottom: theme.spacing(1),
  },
}));

const BWrapper = styled('div')(() => ({
  position: 'relative',
  bottom: 0,
}));

const HorizontalCard = ({ img, header, body, extra, actions, style }: Props) => {
  const intl = useIntl();

  return (
    <C style={{ ...style }}>
      {img && <ImageWrapper>{img}</ImageWrapper>}
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          width: '100%',
          paddingTop: 0,
          '&:last-child': {
            paddingBottom: 0,
          },
        }}
      >
        <>
          <Typography gutterBottom align="center">
            {header}
          </Typography>
          <Typography sx={{ padding: theme => theme.spacing(1, 0) }} component="p" variant="body2">
            {body}
          </Typography>
        </>
        <BWrapper>
          {extra}
          {actions && (
            <>
              <Divider sx={{ margin: theme => theme.spacing(2, 0, 1) }} />
              {actions.map(
                ({ href, nameId, icon: Icon }) =>
                  href && (
                    <Button
                      key={nameId}
                      sx={{
                        marginLeft: theme => theme.spacing(1),
                        marginRight: theme => theme.spacing(1),
                        textTransform: 'none',
                      }}
                      href={href}
                      target="_blank"
                      rel="noreferrer noopener"
                      startIcon={<Icon />}
                    >
                      {intl.formatMessage({ id: nameId })}
                    </Button>
                  )
              )}
            </>
          )}
        </BWrapper>
      </CardContent>
    </C>
  );
};

export default HorizontalCard;
