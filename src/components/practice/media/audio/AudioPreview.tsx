import { useRef } from 'react';

interface Props {
  stream: MediaStream | null;
}

const AudioPreview = ({ stream }: Props) => {
  const audioCanvasRef = useRef<any>(null);

  if (!stream?.getAudioTracks().length) {
    return null;
  }

  const audioCtx = new AudioContext();
  const analyser = audioCtx.createAnalyser();
  analyser.fftSize = 2048;
  const audioSrc = audioCtx.createMediaStreamSource(stream);
  audioSrc.connect(analyser);
  const data = new Uint8Array(analyser.frequencyBinCount);

  const loopingFunction = () => {
    requestAnimationFrame(loopingFunction);
    analyser.getByteFrequencyData(data);
    draw(data);
  };

  requestAnimationFrame(loopingFunction);

  const draw = (dataParameter: any) => {
    dataParameter = [...dataParameter];

    const ctx = audioCanvasRef?.current?.getContext('2d');
    if (!ctx) {
      return;
    }
    ctx.fillStyle = 'white';
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#d5d4d5';

    const space = audioCanvasRef.current.width / dataParameter.length;
    dataParameter.forEach((value: number, i: number) => {
      ctx.beginPath();
      ctx.moveTo(space * i, audioCanvasRef.current.height);
      ctx.lineTo(space * i, audioCanvasRef.current.height - value);
      ctx.stroke();
    });
  };

  requestAnimationFrame(loopingFunction);

  return <canvas ref={audioCanvasRef} style={{ width: '100%', height: 100 }} />;
};

export default AudioPreview;
