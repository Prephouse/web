import { Localization, enUS, frFR, jaJP, zhCN, zhTW } from '@mui/material/locale';

export type BcpName = 'en-US' | 'en-GB' | 'fr-FR' | 'zh-CN' | 'zh-TW' | 'ja-JP';
export const DEFAULT_LOCALE: BcpName = 'en-US';

export interface TranslatedStr {
  messages: { default: { [id: string]: string } };
  mui: Localization;
  fnDate: { default: object };
}

/**
 * @property display the full name of the language in that respecitve language
 * @property mui MUI locale tag
 * @property date date-fns locale tag
 * @property dir writing direction (ltr = left-to-right, rtl = right-to-left)
 */
interface LocaleDict {
  display: string;
  dir: 'ltr' | 'rtl';
  getStrings: () => Promise<TranslatedStr>;
}

const locales: Record<BcpName, LocaleDict> = {
  'en-US': {
    display: 'English (US)',
    dir: 'ltr',
    getStrings: async () => ({
      messages: await import('./translations/en-US/index.json'),
      mui: enUS,
      fnDate: await import('date-fns/locale/en-US'),
    }),
  },
  'en-GB': {
    display: 'English (UK)',
    dir: 'ltr',
    getStrings: async () => ({
      messages: await import('./translations/en-US/index.json'),
      mui: enUS,
      fnDate: await import('date-fns/locale/en-GB'),
    }),
  },
  'fr-FR': {
    display: 'Français',
    dir: 'ltr',
    getStrings: async () => ({
      messages: await import('./translations/en-US/index.json'),
      mui: frFR,
      fnDate: await import('date-fns/locale/fr'),
    }),
  },
  'zh-CN': {
    display: '中文（简体）',
    dir: 'ltr',
    getStrings: async () => ({
      messages: await import('./translations/en-US/index.json'),
      mui: zhCN,
      fnDate: await import('date-fns/locale/zh-CN'),
    }),
  },
  'zh-TW': {
    display: '中文（繁體）',
    dir: 'ltr',
    getStrings: async () => ({
      messages: await import('./translations/en-US/index.json'),
      mui: zhTW,
      fnDate: await import('date-fns/locale/zh-TW'),
    }),
  },
  'ja-JP': {
    display: '日本語',
    dir: 'ltr',
    getStrings: async () => ({
      messages: await import('./translations/en-US/index.json'),
      mui: jaJP,
      fnDate: await import('date-fns/locale/ja'),
    }),
  },
};

export default locales;
