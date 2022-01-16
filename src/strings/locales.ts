import { Localization, enUS, frFR, jaJP, zhCN, zhTW } from '@mui/material/locale';

export type BcpName = 'en-US' | 'en-GB' | 'fr-FR' | 'zh-CN' | 'zh-TW' | 'ja-JP';
export const DEFAULT_LOCALE: BcpName = 'en-US';

export interface TranslatedStr {
  messages: { default: { [id: string]: string } };
  fnDate: { default: object };
  mui: Localization;
}

interface LocaleDict {
  display: string;
  dir: 'ltr' | 'rtl';
  getStrings: () => Promise<TranslatedStr>;
}

const locales: Record<BcpName, LocaleDict> = {
  'en-US': {
    display: 'English (US)',
    dir: 'ltr',
    async getStrings() {
      return {
        messages: await import('./translations/en-US/index.json'),
        fnDate: await import('date-fns/locale/en-US'),
        mui: enUS,
      };
    },
  },
  'en-GB': {
    display: 'English (UK)',
    dir: 'ltr',
    async getStrings() {
      return {
        messages: await import('./translations/en-US/index.json'),
        fnDate: await import('date-fns/locale/en-GB'),
        mui: enUS,
      };
    },
  },
  'fr-FR': {
    display: 'Français',
    dir: 'ltr',
    async getStrings() {
      return {
        messages: await import('./translations/en-US/index.json'),
        fnDate: await import('date-fns/locale/fr'),
        mui: frFR,
      };
    },
  },
  'zh-CN': {
    display: '中文（简体）',
    dir: 'ltr',
    async getStrings() {
      return {
        messages: await import('./translations/en-US/index.json'),
        fnDate: await import('date-fns/locale/zh-CN'),
        mui: zhCN,
      };
    },
  },
  'zh-TW': {
    display: '中文（繁體）',
    dir: 'ltr',
    async getStrings() {
      return {
        messages: await import('./translations/en-US/index.json'),
        fnDate: await import('date-fns/locale/zh-TW'),
        mui: zhTW,
      };
    },
  },
  'ja-JP': {
    display: '日本語',
    dir: 'ltr',
    async getStrings() {
      return {
        messages: await import('./translations/en-US/index.json'),
        fnDate: await import('date-fns/locale/ja'),
        mui: jaJP,
      };
    },
  },
};

export default locales;
