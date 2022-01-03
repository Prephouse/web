import { useRef } from 'react';

import { useTheme } from '@mui/material';

import OutOfBoundError from '../../errors/OutOfBoundError';

import { GREY_400 } from '../../styles/colours';

interface Props {
  stream: MediaStream | null;
  height?: number;
}

const AudioPreview = ({ stream, height = 96 }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const theme = useTheme();

  if (stream) {
    const audioCtx = new AudioContext();

    const analyser = audioCtx.createAnalyser();
    analyser.fftSize = 2048;

    const source = audioCtx.createMediaStreamSource(stream);
    source.connect(analyser);

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const canvasCtx = canvasRef?.current?.getContext('2d');

    const draw = () => {
      requestAnimationFrame(draw);
      analyser.getByteTimeDomainData(dataArray);

      const current = canvasRef?.current;
      if (canvasCtx && current) {
        canvasCtx.fillStyle = GREY_400;
        canvasCtx.fillRect(0, 0, current.width, current.height);
        canvasCtx.lineWidth = 2;
        canvasCtx.strokeStyle = theme.palette.common.black;
        canvasCtx.beginPath();

        const sliceWidth = current.width / dataArray.length;
        let x = 0;

        for (let i = 0; i < bufferLength; i += 1) {
          const d = dataArray[i];
          if (d === undefined) {
            throw new OutOfBoundError(i, bufferLength);
          }

          const v = d / 128.0;
          const y = (v * current.height) / 2;

          if (i === 0) {
            canvasCtx.moveTo(x, y);
          } else {
            canvasCtx.lineTo(x, y);
          }

          x += sliceWidth;
        }

        canvasCtx.lineTo(current.width, current.height / 2);
        canvasCtx.stroke();
      }
    };

    draw();
  }

  return <canvas ref={canvasRef} style={{ width: '100%', height }} />;
};

export default AudioPreview;
