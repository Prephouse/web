import { createTheme } from '@mui/material';

import { BLUE_500, BLUE_900, GREY_200, GREY_300, GREY_500, GREY_600, PURPLE_500 } from './colours';

export default function generateTheme(prefersDarkMode = false) {
  return createTheme({
    palette: {
      mode: prefersDarkMode ? 'dark' : 'light',
      primary: {
        main: prefersDarkMode ? BLUE_500 : BLUE_900,
      },
      secondary: {
        main: PURPLE_500,
      },
    },
    typography: {
      fontFamily: 'Doppio One, sans-serif',
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          '@global': {
            blockquote: {
              margin: 0,
              '& p': {
                padding: 16,
                background: GREY_200,
                color: 'black',
                borderRadius: 4,
              },
            },
            figure: {
              marginLeft: 0,
              marginRight: 0,
            },
            kbd: {
              backgroundColor: GREY_200,
              borderRadius: 3,
              border: '1px solid #B4B4B4',
              boxShadow: '0 1px 1px rgba(0, 0, 0, .2), 0 2px 0 0 rgba(255, 255, 255, .7) inset',
              color: '#333',
              display: 'inline-block',
              fontWeight: 700,
              lineHeight: 1,
              padding: '2px 4px',
              whiteSpace: 'nowrap',
            },
            '@media screen and (prefers-reduced-motion: reduce), (update: slow)': {
              '*': {
                animationDuration: '0.001ms !important',
                animationIterationCount: '1 !important',
                transitionDuration: '0.001ms !important',
              },
            },
            '@keyframes blink': {
              '78%': {
                color: 'inherit',
                textShadow: 'inherit',
              },
              '79%': {
                color: '#333',
              },
              '80%': {
                textShadow: 'none',
              },
              '81%': {
                color: 'inherit',
                textShadow: 'inherit',
              },
              '82%': {
                color: '#333',
                textShadow: 'none',
              },
              '83%': {
                color: 'inherit',
                textShadow: 'inherit',
              },
              '92%': {
                color: '#333',
                textShadow: 'none',
              },
              '92.5%': {
                color: 'inherit',
                textShadow: 'inherit',
              },
            },
          },
        },
      },
      MuiMenuItem: {
        styleOverrides: {
          root: {
            '&:hover': {
              backgroundColor: prefersDarkMode ? GREY_600 : GREY_300,
            },
          },
        },
      },
      MuiAccordionSummary: {
        styleOverrides: {
          root: {
            backgroundColor: GREY_500,
          },
        },
      },
    },
  });
}
