import { useEffect, useRef, useState } from 'react';

import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import VolumeDown from '@mui/icons-material/VolumeDown';
import VolumeUp from '@mui/icons-material/VolumeUp';
import { Grid, IconButton, Paper, Slider, Stack, Typography, useTheme } from '@mui/material';

import { FADING_GREY } from '../../../../styles/colours';

import { round_as_decimal } from '../../../../utils/math-utils';

import MediaSeekSlider from '../../../common/MediaSeekSlider';

interface Props {
  duration?: number | null /* in seconds */;
  src?: string;
}

const VideoPlaybackView = ({ duration, src }: Props) => {
  const theme = useTheme();

  const playerRef = useRef<HTMLVideoElement | null>(null);

  const [play, setPlay] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0);

  const handlePlay = () => {
    playerRef.current?.play();
  };

  const handlePause = () => {
    playerRef.current?.pause();
  };

  const handleSeek = (event: Event, newValue: number | number[]) => {
    if (playerRef?.current) {
      playerRef.current.currentTime = newValue as number;
    }
  };

  const handleVolumeChange = (event: Event | null, newValue: number | number[]) => {
    if (playerRef?.current) {
      playerRef.current.volume = (newValue as number) / 100;
    }
  };

  useEffect(() => {
    playerRef?.current?.addEventListener('loadedmetadata', () => {
      setVolume(round_as_decimal((playerRef?.current?.volume ?? 0) * 100));
    });

    playerRef?.current?.addEventListener('play', () => {
      setPlay(true);
    });

    playerRef?.current?.addEventListener('pause', () => {
      setPlay(false);
    });

    playerRef?.current?.addEventListener('timeupdate', () => {
      setCurrentTime(playerRef.current?.currentTime ?? 0);
    });

    playerRef?.current?.addEventListener('volumechange', () => {
      setVolume(round_as_decimal((playerRef?.current?.volume ?? 0) * 100));
    });
  }, [playerRef]);

  return (
    <>
      <video src={src} ref={playerRef} style={{ width: '100%', transform: 'scaleX(-1)' }} />
      <Paper sx={{ margin: theme => theme.spacing(3, 0) }}>
        <Grid container>
          <Grid item xs={10} sx={{ padding: theme.spacing(2) }}>
            <Stack direction="row" spacing={2} alignItems="center">
              {play ? (
                <IconButton onClick={handlePause}>
                  <PauseIcon />
                </IconButton>
              ) : (
                <IconButton onClick={handlePlay}>
                  <PlayArrowIcon />
                </IconButton>
              )}
              <Typography gutterBottom>
                {new Date(currentTime * 1000).toISOString().substr(14, 5)}/
                {new Date((duration ?? 0) * 1000).toISOString().substr(14, 5)}
              </Typography>
              <MediaSeekSlider
                currentTime={currentTime}
                duration={duration ?? 0}
                handleSeek={handleSeek}
              />
            </Stack>
          </Grid>
          <Grid
            item
            xs={2}
            sx={{
              backgroundColor: FADING_GREY,
              padding: theme.spacing(2),
            }}
          >
            <Stack spacing={2} direction="row" alignItems="center">
              <VolumeDown />
              <Slider
                value={volume}
                onChange={handleVolumeChange}
                valueLabelDisplay="auto"
                valueLabelFormat={x => x + '%'}
              />
              <VolumeUp />
            </Stack>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};

export default VideoPlaybackView;
