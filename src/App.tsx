import { useEffect, useState } from 'react';
import { IntlProvider } from 'react-intl';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import usePrevious from './hooks/usePrevious';
import { RootState } from './store/rootReducer';
import {
  ABOUT_PATH,
  HOME_PATH,
  PRACTICE_PATH,
  COMPARE_PATH,
  TIPS_PATH,
  USER_REGISTRATION_PATH,
  DASHBOARD_PATH,
} from './strings/paths';
import strings from './strings/strings';
import generateTheme from './styles/themes';
import { CssBaseline, responsiveFontSizes, ThemeProvider } from '@mui/material';
import Home from './components/home/Home';
import ActionBar from './components/actionbar/ActionBar';
import About from './components/about/About';
import Footer from './components/footer/Footer';
import RegistrationForm from './components/user/registration/RegistrationForm';
import PageNotFound from './components/error/PageNotFound';
import PracticeGround from './components/practice/PracticeGround';
import TipBook from './components/tips/TipBook';
import CompareBoard from './compare/CompareBoard';
import Dashboard from './components/dashboard/Dashboard';

const App = () => {
  const prefersDarkMode: boolean = useSelector(
    (state: RootState) => state.settingsReducer.prefersDarkMode
  );

  function establishTheme() {
    let theme = generateTheme(prefersDarkMode);
    theme = responsiveFontSizes(theme);
    return theme;
  }

  const [theme, setTheme] = useState(establishTheme());

  const prevPref = usePrevious(prefersDarkMode);
  useEffect(() => {
    if (prevPref !== prefersDarkMode) {
      console.log('PREFERS', prefersDarkMode);
      setTheme(establishTheme());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prefersDarkMode, prevPref]);

  return (
    <BrowserRouter>
      <IntlProvider
        locale="en-US"
        defaultLocale="en-US"
        messages={strings['en-US']}
        onError={err => {
          if (err.code === 'MISSING_TRANSLATION') {
            console.warn('Missing translation', err.message);
            return;
          }
          throw err;
        }}
      >
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <body>
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
                <Route path="*" element={<PageNotFound />} />
              </Routes>
            </main>
            <Footer />
          </body>
        </ThemeProvider>
      </IntlProvider>
    </BrowserRouter>
  );
};

export default App;
