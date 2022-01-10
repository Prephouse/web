import { createAction } from '@reduxjs/toolkit';

import type { BcpName } from '../../strings/locales';

export const changePrefersDarkMode = createAction<boolean>('preference/changePrefersDarkMode');

export const changeLocale = createAction<BcpName>('preference/changeLocale');
