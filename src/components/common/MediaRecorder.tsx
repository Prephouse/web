import { ReactElement, useCallback, useEffect, useRef, useState } from 'react';

import { MediaRecordingStatus } from '../../utils/enums';

interface RenderProps {
  startRecording: () => void;
  pauseRecording: () => void;
  resumeRecording: () => void;
  stopRecording: () => void;
  mediaBlobUrl: string | null;
  status: MediaRecordingStatus;
  isAudioMuted: () => boolean;
  previewVideoStream: MediaStream | null;
  previewAudioStream: MediaStream | null;
  clearBlobUrl: () => void;
}

interface HookProps {
  audio?: boolean;
  video?: boolean;
  mediaRecorderOptions?: MediaRecorderOptions | null;
  onStop?: (blobUrl: string, blob: Blob) => void;
}

interface Props extends HookProps {
  render: (props: RenderProps) => ReactElement;
}

function useMediaRecorder({
  audio = false,
  video = false,
  mediaRecorderOptions,
  onStop,
}: HookProps): RenderProps {
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const mediaChunks = useRef<Blob[]>([]);
  const mediaStream = useRef<MediaStream | null>(null);

  const [status, setStatus] = useState<MediaRecordingStatus>(MediaRecordingStatus.IDLE);
  const [mediaBlobUrl, setMediaBlobUrl] = useState<string | null>(null);
  // const [errors, setErrors] = useState<MediaRecordingError[]>([]);

  const getMediaStream = useCallback(async () => {
    setStatus(MediaRecordingStatus.ACQUIRING_MEDIA);
    try {
      mediaStream.current = await window.navigator.mediaDevices.getUserMedia({ audio, video });
    } catch (error: any) {
      // TODO send to errors state
    } finally {
      setStatus(MediaRecordingStatus.IDLE);
    }
  }, [audio, video]);

  useEffect(() => {
    if (!window.MediaRecorder) {
      throw new Error('Browser not supported');
    }

    if (
      mediaRecorderOptions?.mimeType &&
      !MediaRecorder.isTypeSupported(mediaRecorderOptions.mimeType)
    ) {
      throw new Error('Specified MIME type not supported on this browser');
    }

    if (!mediaStream.current) {
      getMediaStream().then(console.log);
    }

    return () => {
      if (mediaStream.current) {
        const tracks = mediaStream.current?.getTracks();
        tracks?.forEach(track => track.stop());
      }
    };
  }, [audio, video, getMediaStream, mediaRecorderOptions]);

  const onRecordingActive = ({ data }: BlobEvent) => {
    mediaChunks.current.push(data);
  };

  const onRecordingStop = () => {
    const [chunk] = mediaChunks.current;
    const blobProperty: BlobPropertyBag = Object.assign(
      { type: chunk.type },
      video ? { type: 'video/mp4' } : { type: 'audio/wav' }
    );

    const blob = new Blob(mediaChunks.current, blobProperty);
    const url = URL.createObjectURL(blob);
    setStatus(MediaRecordingStatus.STOPPED);
    setMediaBlobUrl(url);

    if (onStop) {
      onStop(url, blob);
    }
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
        // TODO set errors state
        setStatus(MediaRecordingStatus.IDLE);
      };
      mediaRecorder.current.start();
      setStatus(MediaRecordingStatus.RECORDING);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder.current && mediaRecorder.current.state !== 'inactive') {
      setStatus(MediaRecordingStatus.STOPPING);
      mediaRecorder.current.stop();
      mediaStream.current && mediaStream.current.getTracks().forEach(track => track.stop());
      mediaChunks.current = [];
    }
  };

  const pauseRecording = () => {
    if (mediaRecorder.current?.state === 'recording') {
      setStatus(MediaRecordingStatus.RECORDING);
      mediaRecorder.current.pause();
    }
  };

  const resumeRecording = () => {
    if (mediaRecorder.current?.state === 'paused') {
      setStatus(MediaRecordingStatus.RECORDING);
      mediaRecorder.current.resume();
    }
  };

  const isAudioMuted = () =>
    mediaStream.current?.getAudioTracks().some(track => !track.enabled) ?? false;

  const clearBlobUrl = () => {
    if (mediaBlobUrl) {
      URL.revokeObjectURL(mediaBlobUrl);
    }
    setMediaBlobUrl(null);
  };

  return {
    startRecording,
    stopRecording,
    pauseRecording,
    resumeRecording,
    mediaBlobUrl,
    status,
    isAudioMuted,
    previewVideoStream: mediaStream.current
      ? new MediaStream(mediaStream.current.getVideoTracks())
      : null,
    previewAudioStream: mediaStream.current
      ? new MediaStream(mediaStream.current.getAudioTracks())
      : null,
    clearBlobUrl,
  };
}

const PrephouseMediaRecorder = (props: Props) => props.render(useMediaRecorder(props));

export default PrephouseMediaRecorder;