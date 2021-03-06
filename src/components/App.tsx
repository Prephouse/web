import { lazy, useEffect, useMemo, useState } from 'react';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import { HelmetProvider } from 'react-helmet-async';
import { IntlProvider } from 'react-intl';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { getAuth } from 'firebase/auth';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { CssBaseline, ThemeProvider, responsiveFontSizes } from '@mui/material';
import { Localization } from '@mui/material/locale';

import PrephouseAppBar from 'components/appbar/PrephouseAppBar';
import PrivateRoute from 'components/appbar/PrivateRoute';
import PageNotFoundView from 'components/common/PageNotFoundView';
import SuspendableScreen from 'components/common/router/SuspendableScreen';
import SnackbarProvider from 'components/common/snackbar/SnackbarProvider';
import Footer from 'components/footer/Footer';
import Home from 'components/home/Home';

import useAppDispatch from 'hooks/useAppDispatch';
import useAppSelector from 'hooks/useAppSelector';
import usePrevious from 'hooks/usePrevious';
import { SnackbarWrapper } from 'hooks/useSnackbar';

import rollbar from 'libs/rollbar';

import { setUser } from 'states/auth/actions';

import { USER_KEY } from 'strings/keys';
import locales, { DEFAULT_LOCALE, TranslatedStr } from 'strings/locales';
import {
  ABOUT_PATH,
  HOME_PATH,
  LEADERBOARD_PATH,
  PRACTICE_PATH,
  PROGRESS_PATH,
  QUESTION_BANK_PATH,
  SESSION_PATH,
  SUPPORT_PATH,
  USER_SIGN_IN_PATH,
  USER_SIGN_UP_PATH,
} from 'strings/paths';

import generateTheme from 'styles/themes';

const About = lazy(() => import('components/about/About'));
const Progress = lazy(() => import('components/progress/Progress'));
const Leaderboard = lazy(() => import('components/leaderboard/Leaderboard'));
const PracticeGround = lazy(() => import('components/practice/Practice'));
const SignInForm = lazy(() => import('components/user/signin/SignIn'));
const SignUpForm = lazy(() => import('components/user/signup/SignUp'));
const Support = lazy(() => import('components/support/Support'));
const QuestionBank = lazy(() => import('components/bank/Bank'));
const Session = lazy(() => import('components/session/Session'));

const establishTheme = (localization: Localization, prefersDarkMode: boolean) => {
  let theme = generateTheme(localization, prefersDarkMode);
  theme = responsiveFontSizes(theme);
  return theme;
};

const App = () => {
  const dispatch = useAppDispatch();

  const prefersDarkMode = useAppSelector(state => state.preference.prefersDarkMode);
  const locale = useAppSelector(state => state.preference.locale);

  const [,] = useState(rollbar);
  const [translatedStr, setTranslatedStr] = useState<TranslatedStr | Record<string, never>>({});
  const [theme, setTheme] = useState(() => establishTheme(translatedStr.mui, prefersDarkMode));

  const prevPref = usePrevious(prefersDarkMode);
  const prevLocale = usePrevious(locale);
  useEffect(() => {
    if (prevPref !== prefersDarkMode || locale !== prevLocale) {
      setTheme(establishTheme(translatedStr.mui, prefersDarkMode));
    }
  }, [prefersDarkMode, prevPref, translatedStr.mui, locale, prevLocale]);

  useMemo(() => locales[locale].getStrings(), [locale]).then(value => {
    setTranslatedStr(value);
  });

  useEffect(() => {
    const auth = getAuth();
    auth?.onAuthStateChanged(user => {
      localStorage.setItem(USER_KEY, JSON.stringify(user));
      dispatch(
        setUser(
          user ? (({ uid, displayName, photoURL }) => ({ uid, displayName, photoURL }))(user) : null
        )
      );
    });
  }, [dispatch]);

  if (!translatedStr.messages || !translatedStr.fnDate) {
    return null;
  }

  return (
    <GoogleReCaptchaProvider reCaptchaKey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}>
      <BrowserRouter>
        <IntlProvider
          locale={locale}
          defaultLocale={DEFAULT_LOCALE}
          timeZone={Intl.DateTimeFormat().resolvedOptions().timeZone}
          messages={translatedStr.messages.default}
        >
          <LocalizationProvider dateAdapter={AdapterDateFns} locale={translatedStr.fnDate.default}>
            <HelmetProvider>
              <ThemeProvider theme={theme}>
                <CssBaseline />
                <SnackbarProvider>
                  <PrephouseAppBar />
                  <main>
                    <Routes>
                      <Route path={HOME_PATH} element={<Home />} />
                      <Route path={ABOUT_PATH} element={<SuspendableScreen screen={<About />} />} />
                      <Route
                        path={PROGRESS_PATH}
                        element={
                          <SuspendableScreen
                            screen={
                              <PrivateRoute>
                                <Progress />
                              </PrivateRoute>
                            }
                          />
                        }
                      />
                      <Route
                        path={PRACTICE_PATH}
                        element={
                          <SuspendableScreen
                            screen={
                              <PrivateRoute>
                                <PracticeGround />
                              </PrivateRoute>
                            }
                          />
                        }
                      />
                      <Route
                        path={LEADERBOARD_PATH}
                        element={
                          <SuspendableScreen
                            screen={
                              <PrivateRoute>
                                <Leaderboard />
                              </PrivateRoute>
                            }
                          />
                        }
                      />
                      <Route
                        path={SESSION_PATH}
                        element={
                          <SuspendableScreen
                            screen={
                              <PrivateRoute>
                                <Session />
                              </PrivateRoute>
                            }
                          />
                        }
                      />
                      <Route
                        path={QUESTION_BANK_PATH}
                        element={<SuspendableScreen screen={<QuestionBank />} />}
                      />
                      <Route
                        path={USER_SIGN_IN_PATH}
                        element={<SuspendableScreen screen={<SignInForm />} />}
                      />
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
                </SnackbarProvider>
                <Footer />
              </ThemeProvider>
            </HelmetProvider>
          </LocalizationProvider>
        </IntlProvider>
      </BrowserRouter>
    </GoogleReCaptchaProvider>
  );
};

export default App;
