import { Slider, useTheme } from '@mui/material';

interface Props {
  currentTime: number;
  duration: number;
  handleSeek: (event: Event, newValue: number | number[]) => void;
}

const MediaSeekSlider = ({ currentTime, duration, handleSeek }: Props) => {
  const theme = useTheme();

  return (
    <Slider
      size="small"
      value={currentTime}
      min={0}
      step={1}
      max={duration}
      onChange={handleSeek}
      sx={{
        color: theme.palette.mode === 'dark' ? '#fff' : 'rgba(0,0,0,0.87)',
        height: 4,
        '& .MuiSlider-thumb': {
          width: 8,
          height: 8,
          transition: '0.3s cubic-bezier(.47,1.64,.41,.8)',
          '&:before': {
            boxShadow: '0 2px 12px 0 rgba(0,0,0,0.4)',
          },
          '&:hover, &.Mui-focusVisible': {
            boxShadow: `0px 0px 0px 8px ${
              theme.palette.mode === 'dark' ? 'rgb(255 255 255 / 16%)' : 'rgb(0 0 0 / 16%)'
            }`,
          },
          '&.Mui-active': {
            width: 20,
            height: 20,
          },
        },
        '& .MuiSlider-rail': {
          opacity: 0.28,
        },
      }}
    />
  );
};

export default MediaSeekSlider;
