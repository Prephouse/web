import { lazy, useEffect, useState } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { IntlProvider } from 'react-intl';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { CssBaseline, ThemeProvider, responsiveFontSizes } from '@mui/material';

import rollbar from '../libs/rollbar';

import useAppSelector from '../hooks/useAppSelector';
import usePrevious from '../hooks/usePrevious';
import { SnackbarWrapper } from '../hooks/useSnackbar';

import {
  ABOUT_PATH,
  COMPARE_PATH,
  DASHBOARD_PATH,
  HOME_PATH,
  PRACTICE_PATH,
  TIPS_PATH,
  USER_SIGN_UP_PATH,
} from '../strings/paths';
import strings from '../strings/strings';

import generateTheme from '../styles/themes';

import ActionBar from './actionbar/ActionBar';
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
const TipBook = lazy(() => import('./tips/TipBook'));

const establishTheme = (prefersDarkMode: boolean) => {
  let theme = generateTheme(prefersDarkMode);
  theme = responsiveFontSizes(theme);
  return theme;
};

const App = () => {
  const prefersDarkMode = useAppSelector(state => state.settingsReducer.prefersDarkMode);

  const [,] = useState(rollbar);
  const [theme, setTheme] = useState(establishTheme(prefersDarkMode));

  const prevPref = usePrevious<boolean>(prefersDarkMode);
  useEffect(() => {
    if (prevPref !== prefersDarkMode) {
      setTheme(establishTheme(prefersDarkMode));
    }
  }, [prefersDarkMode, prevPref]);

  return (
    <BrowserRouter>
      <IntlProvider locale="en-US" defaultLocale="en-US" messages={strings['en-US']}>
        <HelmetProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <SnackbarContextProvider>
              <ActionBar />
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
                  <Route path="*" element={<SuspendableScreen screen={<PageNotFoundView />} />} />
                </Routes>
                <SnackbarWrapper />
              </main>
            </SnackbarContextProvider>
            <Footer />
          </ThemeProvider>
        </HelmetProvider>
      </IntlProvider>
    </BrowserRouter>
  );
};

export default App;
