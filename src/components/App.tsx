import { lazy, useEffect, useMemo, useState } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { IntlProvider } from 'react-intl';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { CssBaseline, ThemeProvider, responsiveFontSizes } from '@mui/material';
import { Localization } from '@mui/material/locale';

import rollbar from '../libs/rollbar';

import useAppSelector from '../hooks/useAppSelector';
import usePrevious from '../hooks/usePrevious';
import { SnackbarWrapper } from '../hooks/useSnackbar';

import locales from '../strings/locales';
import type { TranslatedStr } from '../strings/locales';
import {
  ABOUT_PATH,
  COMPARE_PATH,
  DASHBOARD_PATH,
  HOME_PATH,
  PRACTICE_PATH,
  SUPPORT_PATH,
  TIPS_PATH,
  USER_SIGN_UP_PATH,
} from '../strings/paths';

import generateTheme from '../styles/themes';

import PrephouseAppBar from './appbar/PrephouseAppBar';
import SnackbarContextProvider from './common/SnackbarContextProvider';
import SuspendableScreen from './common/SuspendableScreen';
import PageNotFoundView from './error/PageNotFoundView';
import Footer from './footer/Footer';
import Home from './home/Home';

const About = lazy(() => import('./about/About'));
const CompareBoard = lazy(() => import('./compare/CompareBoard'));
const Dashboard = lazy(() => import('./dashboard/Dashboard'));
const PracticeGround = lazy(() => import('./practice/PracticeGround'));
const SignUpForm = lazy(() => import('./user/signup/SignUpForm'));
const Support = lazy(() => import('./support/Support'));
const TipBook = lazy(() => import('./tips/TipBook'));

const establishTheme = (localization: Localization, prefersDarkMode: boolean) => {
  let theme = generateTheme(localization, prefersDarkMode);
  theme = responsiveFontSizes(theme);
  return theme;
};

const App = () => {
  const prefersDarkMode = useAppSelector(state => state.preference.prefersDarkMode);
  const locale = useAppSelector(state => state.preference.locale);

  const [,] = useState(rollbar);
  const [translatedStr, setTranslatedStr] = useState<TranslatedStr | Record<string, never>>({});
  const [theme, setTheme] = useState(establishTheme(translatedStr.mui, prefersDarkMode));

  const prevPref = usePrevious(prefersDarkMode);
  const prevLocale = usePrevious(locale);
  useEffect(() => {
    if (prevPref !== prefersDarkMode || locale !== prevLocale) {
      setTheme(establishTheme(translatedStr.mui, prefersDarkMode));
    }
  }, [prefersDarkMode, prevPref, translatedStr.mui, locale, prevLocale]);

  useMemo(() => locales[locale].getStrings(), [locale]).then(value => {
    setTranslatedStr(value);
    return;
  });

  if (!translatedStr.messages || !translatedStr.fnDate) {
    return null;
  }

  return (
    <BrowserRouter>
      <IntlProvider locale={locale} defaultLocale="en-US" messages={translatedStr.messages.default}>
        <LocalizationProvider dateAdapter={AdapterDateFns} locale={translatedStr.fnDate.default}>
          <HelmetProvider>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <SnackbarContextProvider>
                <PrephouseAppBar />
                <main>
                  <Routes>
                    <Route path={HOME_PATH} element={<Home />} />
                    <Route path={ABOUT_PATH} element={<SuspendableScreen screen={<About />} />} />
                    <Route
                      path={DASHBOARD_PATH}
                      element={<SuspendableScreen screen={<Dashboard />} />}
                    />
                    <Route
                      path={PRACTICE_PATH}
                      element={<SuspendableScreen screen={<PracticeGround />} />}
                    />
                    <Route
                      path={COMPARE_PATH}
                      element={<SuspendableScreen screen={<CompareBoard />} />}
                    />
                    <Route path={TIPS_PATH} element={<SuspendableScreen screen={<TipBook />} />} />
                    <Route
                      path={USER_SIGN_UP_PATH}
                      element={<SuspendableScreen screen={<SignUpForm />} />}
                    />
                    <Route
                      path={SUPPORT_PATH}
                      element={<SuspendableScreen screen={<Support />} />}
                    />
                    <Route path="*" element={<PageNotFoundView />} />
                  </Routes>
                  <SnackbarWrapper />
                </main>
              </SnackbarContextProvider>
              <Footer />
            </ThemeProvider>
          </HelmetProvider>
        </LocalizationProvider>
      </IntlProvider>
    </BrowserRouter>
  );
};

export default App;
