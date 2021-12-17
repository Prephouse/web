import { useEffect, useState } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { IntlProvider } from 'react-intl';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { CssBaseline, ThemeProvider, responsiveFontSizes } from '@mui/material';

import rollbar from '../libs/rollbar';

import useAppSelector from '../hooks/useAppSelector';
import usePrevious from '../hooks/usePrevious';

import {
  ABOUT_PATH,
  COMPARE_PATH,
  DASHBOARD_PATH,
  HOME_PATH,
  PRACTICE_PATH,
  TIPS_PATH,
  USER_REGISTRATION_PATH,
} from '../strings/paths';
import strings from '../strings/strings';

import generateTheme from '../styles/themes';

import About from './about/About';
import ActionBar from './actionbar/ActionBar';
import SnackbarWrapper from './common/AlertSnackbar';
import SnackbarContextProvider from './common/SnackbarContextProvider';
import CompareBoard from './compare/CompareBoard';
import Dashboard from './dashboard/Dashboard';
import PageNotFoundView from './error/PageNotFoundView';
import Footer from './footer/Footer';
import Home from './home/Home';
import PracticeGround from './practice/PracticeGround';
import TipBook from './tips/TipBook';
import RegistrationForm from './user/registration/RegistrationForm';

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
                  <Route path={ABOUT_PATH} element={<About />} />
                  <Route path={DASHBOARD_PATH} element={<Dashboard />} />
                  <Route path={PRACTICE_PATH} element={<PracticeGround />} />
                  <Route path={COMPARE_PATH} element={<CompareBoard />} />
                  <Route path={TIPS_PATH} element={<TipBook />} />
                  <Route path={USER_REGISTRATION_PATH} element={<RegistrationForm />} />
                  <Route path="*" element={<PageNotFoundView />} />
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
