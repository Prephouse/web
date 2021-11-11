export const CHANGE_PREFERS_DARK_MODE = "changePrefersDarkMode";

export type SettingsReduxState = {
  prefersDarkMode: boolean;
};

export type SettingsReduxAction =
  | { type: typeof CHANGE_PREFERS_DARK_MODE; payload: { prefersDarkMode: boolean } };
