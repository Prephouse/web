import { ReactElement, useCallback, useEffect, useRef, useState } from 'react';

import BrowserSupportError from 'errors/BrowserSupportError';

export enum MediaRecordingStatus {
  Idle = 'idle',
  AcquiringMedia = 'acquiring_media',
  Recording = 'recording',
  Stopping = 'stopping',
  Stopped = 'stopped',
  Paused = 'paused',
}

interface RenderProps {
  startRecording: () => void;
  pauseRecording: () => void;
  resumeRecording: () => void;
  stopRecording: () => void;
  status: MediaRecordingStatus;
  isAudioMuted: () => boolean;
  previewVideoStream: MediaStream | null;
  previewAudioStream: MediaStream | null;
}

interface HookProps {
  audio?: boolean;
  video?: boolean;
  mediaRecorderOptions?: MediaRecorderOptions | null;
  onStart?: () => void;
  onResume?: () => void;
  onPause?: () => void;
  onStop?: (blob: Blob) => void;
}

interface Props extends HookProps {
  render: (props: RenderProps) => ReactElement | null;
}

function useMediaRecorder({
  audio = false,
  video = false,
  mediaRecorderOptions,
  onStart,
  onResume,
  onPause,
  onStop,
}: HookProps): RenderProps {
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const mediaChunks = useRef<Blob[]>([]);
  const mediaStream = useRef<MediaStream | null>(null);

  const [status, setStatus] = useState<MediaRecordingStatus>(MediaRecordingStatus.Idle);

  const getMediaStream = useCallback(async () => {
    setStatus(MediaRecordingStatus.AcquiringMedia);
    try {
      mediaStream.current = await window.navigator.mediaDevices.getUserMedia({ audio, video });
    } finally {
      setStatus(MediaRecordingStatus.Idle);
    }
  }, [audio, video]);

  useEffect(() => {
    if (!window.MediaRecorder) {
      throw new BrowserSupportError();
    }

    if (
      mediaRecorderOptions?.mimeType &&
      !MediaRecorder.isTypeSupported(mediaRecorderOptions.mimeType)
    ) {
      throw new BrowserSupportError('Specified MIME type not supported on this browser');
    }

    if (!mediaStream.current) {
      getMediaStream().then(undefined);
    }

    return () => {
      mediaStream.current?.getTracks()?.forEach(track => track.stop());
    };
  }, [audio, video, getMediaStream, mediaRecorderOptions]);

  const onRecordingActive = ({ data }: BlobEvent) => {
    mediaChunks.current.push(data);
  };

  const onRecordingStop = () => {
    const blob = new Blob(mediaChunks.current, {
      ...(video ? { type: 'video/mp4' } : { type: 'audio/wav' }),
    });

    setStatus(MediaRecordingStatus.Stopped);

    onStop?.(blob);
  };

  const startRecording = async () => {
    if (!mediaStream.current) {
      await getMediaStream();
    }

    if (mediaStream.current) {
      const hasStreamEnded = mediaStream.current
        ?.getTracks()
        ?.some(track => track.readyState === 'ended');
      if (hasStreamEnded) {
        await getMediaStream();
      }

      mediaRecorder.current = new MediaRecorder(mediaStream.current);
      mediaRecorder.current.ondataavailable = onRecordingActive;
      mediaRecorder.current.onstop = onRecordingStop;
      mediaRecorder.current.onerror = () => {
        setStatus(MediaRecordingStatus.Idle);
      };

      setStatus(MediaRecordingStatus.Recording);
      mediaRecorder.current.start();

      onStart?.();
    }
  };

  const stopRecording = () => {
    if (mediaRecorder.current && mediaRecorder.current.state !== 'inactive') {
      setStatus(MediaRecordingStatus.Stopping);
      mediaRecorder.current.stop();
      mediaStream.current?.getTracks().forEach(track => track.stop());
      mediaChunks.current = [];
    }
  };

  const resumeRecording = () => {
    if (mediaRecorder.current?.state === 'paused') {
      setStatus(MediaRecordingStatus.Recording);
      mediaRecorder.current.resume();
    }

    onResume?.();
  };

  const pauseRecording = () => {
    if (mediaRecorder.current?.state === 'recording') {
      setStatus(MediaRecordingStatus.Paused);
      mediaRecorder.current.pause();
    }

    onPause?.();
  };

  const isAudioMuted = () =>
    mediaStream.current?.getAudioTracks().some(track => !track.enabled) ?? true;

  return {
    startRecording,
    stopRecording,
    pauseRecording,
    resumeRecording,
    status,
    isAudioMuted,
    previewVideoStream: mediaStream.current
      ? new MediaStream(mediaStream.current.getVideoTracks())
      : null,
    previewAudioStream: mediaStream.current
      ? new MediaStream(mediaStream.current.getAudioTracks())
      : null,
  };
}

const PrephouseMediaRecorder = (props: Props) => props.render(useMediaRecorder(props));

export default PrephouseMediaRecorder;
