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

export function getSessionTypeId(st: SessionType) {
  let name;
  if (st === SessionType.Interview) {
    name = 'practice.setting.type.interview2';
  } else if (st === SessionType.Presentation) {
    name = 'practice.setting.type.presentation2';
  } else {
    throw new Error();
  }
  return name;
}
