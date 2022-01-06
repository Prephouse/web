import type { BcpName } from '../../strings/locales';

export const CHANGE_PREFERS_DARK_MODE = 'preference/changePrefersDarkMode';
export const CHANGE_LOCALE = 'preference/changeLocale';

export type PreferenceReduxState = {
  prefersDarkMode: boolean;
  locale: BcpName;
};

export type PreferenceReduxAction =
  | {
      type: typeof CHANGE_PREFERS_DARK_MODE;
      payload: { prefersDarkMode: boolean };
    }
  | { type: typeof CHANGE_LOCALE; payload: { locale: BcpName } };
