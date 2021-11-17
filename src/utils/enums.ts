export enum SessionMedium {
  VideoAudio,
  AudioOnly,
}

export enum SessionType {
  Interview,
  Presentation,
}

export enum SessionOrigin {
  Record,
  Upload,
}

export enum MediaRecordingStatus {
  Idle = 'idle',
  AcquiringMedia = 'acquiring_media',
  Recording = 'recording',
  Stopping = 'stopping',
  Stopped = 'stopped',
  Paused = 'paused',
}
