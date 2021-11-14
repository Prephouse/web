export enum SessionMedium {
  VIDEO_AND_AUDIO,
  AUDIO_ONLY,
}

export enum SessionType {
  INTERVIEW,
  PRESENTATION,
}

export enum SessionOrigin {
  RECORD,
  UPLOAD,
}

export enum MediaRecordingStatus {
  IDLE = 'idle',
  ACQUIRING_MEDIA = 'acquiring_media',
  RECORDING = 'recording',
  STOPPING = 'stopping',
  STOPPED = 'stopped',
  PAUSED = 'paused',
}
