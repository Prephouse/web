export const CHANGE_PREFERS_DARK_MODE = 'changePrefersDarkMode';

export type PreferenceReduxState = {
  prefersDarkMode: boolean;
};

export type PreferenceReduxAction = {
  type: typeof CHANGE_PREFERS_DARK_MODE;
  payload: { prefersDarkMode: boolean };
};
