import { useEffect, useRef, useState } from 'react';
import { useIntl } from 'react-intl';

import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import VolumeDown from '@mui/icons-material/VolumeDown';
import VolumeUp from '@mui/icons-material/VolumeUp';
import { Grid, IconButton, Paper, Slider, Stack, Typography, useTheme } from '@mui/material';

import { GREY_500 } from '../../styles/colours';

import { roundAsDecimal } from '../../utils/math';

import MediaSeekSlider from '../common/MediaSeekSlider';

interface Props {
  src?: string;
}

const PracticeFeedback = ({ src }: Props) => {
  const playerRef = useRef<HTMLVideoElement | null>(null);

  const [play, setPlay] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0);
  const [duration, setDuration] = useState(0);

  const theme = useTheme();

  const intl = useIntl();

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
      const current = playerRef?.current;

      setVolume(roundAsDecimal((current?.volume ?? 0) * 100));

      if (current?.duration === Infinity) {
        current.currentTime = Number.MAX_SAFE_INTEGER;
        current.ontimeupdate = () => {
          current.ontimeupdate = null;
          setDuration(current.duration);
          current.currentTime = 0;
        };
      } else {
        setDuration(current?.duration ?? 0);
      }
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
      setVolume(roundAsDecimal((playerRef?.current?.volume ?? 0) * 100));
    });
  }, [playerRef]);

  return (
    <>
      <video
        aria-label={intl.formatMessage({ id: 'practice.practice.playback.video' })}
        src={src}
        ref={playerRef}
        style={{ width: '100%', transform: 'scaleX(-1)' }}
      >
        <track kind="captions" srcLang="en" />
      </video>
      <Paper sx={{ margin: theme.spacing(3, 0) }}>
        <Grid container>
          <Grid item xs={10} sx={{ padding: 2 }}>
            <Stack direction="row" spacing={2} alignItems="center">
              {play ? (
                <IconButton
                  onClick={handlePause}
                  size="large"
                  aria-label={intl.formatMessage({ id: 'common.pause' })}
                >
                  <PauseIcon />
                </IconButton>
              ) : (
                <IconButton
                  onClick={handlePlay}
                  size="large"
                  aria-label={intl.formatMessage({ id: 'common.play' })}
                >
                  <PlayArrowIcon />
                </IconButton>
              )}
              <Typography gutterBottom>
                {new Date(currentTime * 1000).toISOString().slice(14, 19)}/
                {new Date((duration ?? 0) * 1000).toISOString().slice(14, 19)}
              </Typography>
              <MediaSeekSlider
                currentTime={currentTime}
                duration={duration ?? 0}
                handleSeek={handleSeek}
                aria-label={intl.formatMessage({ id: 'practice.feedback.playback.seek' })}
              />
            </Stack>
          </Grid>
          <Grid
            item
            xs={2}
            sx={{
              backgroundColor: GREY_500,
              padding: 2,
            }}
          >
            <Stack spacing={2} direction="row" alignItems="center">
              <VolumeDown />
              <Slider
                value={volume}
                onChange={handleVolumeChange}
                valueLabelDisplay="auto"
                valueLabelFormat={x => `${x}%`}
                aria-label={intl.formatMessage({ id: 'practice.feedback.playback.volume' })}
              />
              <VolumeUp />
            </Stack>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};

export default PracticeFeedback;
