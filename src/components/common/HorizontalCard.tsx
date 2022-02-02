import { CSSProperties, ElementType, ReactNode } from 'react';
import { useIntl } from 'react-intl';

import { Box, Button, Card, CardContent, Divider, SvgIconTypeMap, Typography } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';

interface Props {
  img?: ReactNode;
  header?: ReactNode;
  body?: ReactNode;
  bodyComponent?: ElementType;
  extra?: ReactNode;
  actions?: { href?: string; nameId: string; icon: OverridableComponent<SvgIconTypeMap> }[];
  style?: CSSProperties;
}

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
    <Card
      sx={{
        padding: 3,
        '@media (min-width: 769px)': {
          display: 'flex',
        },
      }}
      style={{ ...style }}
    >
      {img && (
        <Box
          sx={{
            '@media (max-width: 768px)': {
              display: 'flex',
              justifyContent: 'center',
              width: '100%',
              marginBottom: 1,
            },
          }}
        >
          {img}
        </Box>
      )}
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
        <div>
          <Typography gutterBottom align="center">
            {header}
          </Typography>
          <Typography
            sx={{
              padding: theme => theme.spacing(1, 0),
            }}
            component={bodyComponent}
            variant="body2"
          >
            {body}
          </Typography>
        </div>
        <Box sx={{ position: 'relative', bottom: 0 }}>
          {extra}
          {actions && (
            <>
              {actions.some(action => action.href) && (
                <Divider sx={{ margin: theme => theme.spacing(2, 0, 1) }} />
              )}
              {actions.map(
                ({ href, nameId, icon: Icon }) =>
                  href && (
                    <Button
                      key={nameId}
                      sx={{
                        marginLeft: 1,
                        marginRight: 1,
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
        </Box>
      </CardContent>
    </Card>
  );
};

export default HorizontalCard;
