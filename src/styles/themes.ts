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
      fontFamily: ['Doppio One', 'sans-serif'].join(','),
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: `
          html {
            height: 100%;
          }
          body {
            display: flex;
            flex-direction: column;
            min-height: 100vh;
            height: 100%;
            margin: 0;
            font-family: 'Doppio One', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
              'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            font-variant-ligatures: none;
          }
          main {
            flex-grow: 1;
          }
          footer {
            height: 100px;
            text-align: center;
          }
          code {
            font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
          }
          blockquote {
            margin: 0;
          }
          blockquote p {
            padding: 16px;
            background: ${GREY_200},
            color: 'black';
            border-radius: 4px;
          }
          figure {
            margin-left: 0;
            margin-right: 0;
          }
          kbd {
            background-color: ${GREY_200};
            border-radius: 3px;
            border: 1px solid #B4B4B4;
            box-shadow: 0 1px 1px rgba(0, 0, 0, .2), 0 2px 0 0 rgba(255, 255, 255, .7) inset;
            color: #333;
            display: inline-block;
            font-weight: 700;
            line-height: 1;
            padding: 2px 4px;
            white-space: nowrap;
          }
          @media screen and (prefers-reduced-motion: reduce), (update: slow) {
            * {
              animationDuration: 0.001ms !important;
              animationIterationCount: 1 !important;
              transitionDuration: 0.001ms !important;
            }
          }
          @keyframes blink {
            78% {
              color: inherit;
              text-shadow: inherit;
            }
            79% {
              color: #333;
            }
            80% {
              text-shadow: none;
            }
            81% {
              color: inherit;
              text-shadow: inherit;
            }
            82% {
              color: #333;
              text-shadow: none;
            }
            83% {
              color: inherit;
              text-shadow: inherit;
            }
            92% {
              color: #333;
              text-shadow: none;
            }
            92.5% {
              color: inherit;
              text-shadow: inherit;
            }
          }
        `,
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
