import { styled } from '@mui/material';

interface Props {
  lightup: string;
}

const Neon = styled('div')((props: Props) => {
  if (props.lightup === 'true') {
    return {
      '@media (prefers-reduced-motion: no-preference)': {
        textShadow:
          '0 0 2px, 0 0 1em #4444ff, 0 0 0.5em #4444ff, 0 0 0.1em #4444ff, 0 8px 4px #000',
        '& > span': {
          animation: 'blink linear infinite 3s',
        },
        '& > span:first-of-type': {
          animation: 'blink linear infinite 5s',
        },
        '& > span:nth-of-type(3n + 1)': {
          animation: 'blink linear infinite 4s',
        },
        '& > span:nth-last-of-type(even)': {
          animation: 'blink linear infinite 6s',
        },
      },
    };
  }

  return {};
});

export default Neon;
