import React from 'react';
import { useIntl } from 'react-intl';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import {
  Button,
  Card,
  CardContent,
  Divider,
  styled,
  SvgIconTypeMap,
  Typography,
} from '@mui/material';

interface Props {
  img?: React.ReactNode;
  header?: React.ReactNode;
  body?: React.ReactNode;
  bodyComponent?: React.ElementType;
  extra?: React.ReactNode;
  actions?: { href?: string | null; nameId: string; Icon: OverridableComponent<SvgIconTypeMap> }[];
  style?: React.CSSProperties;
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

const CC = styled(CardContent)(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  width: '100%',
  paddingTop: 0,
  '&:last-child': {
    paddingBottom: 0,
  },
}));

const BWrapper = styled('div')(() => ({
  position: 'relative',
  bottom: 0,
}));

const HorizontalCard = ({
  img,
  header,
  body,
  bodyComponent = 'p',
  extra,
  actions,
  style,
}: Props) => {
  const intl = useIntl();

  return (
    <C style={{ ...style }}>
      {img && <ImageWrapper>{img}</ImageWrapper>}
      <CC>
        <div>
          <Typography gutterBottom align="center">
            {header}
          </Typography>
          <Typography sx={{ padding: theme => theme.spacing(1, 0) }} component="p" variant="body2">
            {body}
          </Typography>
        </div>
        <BWrapper>
          {extra}
          {actions && (
            <>
              <Divider sx={{ margin: theme => theme.spacing(2, 0, 1) }} />
              {actions.map(
                ({ href, nameId, Icon }) =>
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
      </CC>
    </C>
  );
};

export default HorizontalCard;
