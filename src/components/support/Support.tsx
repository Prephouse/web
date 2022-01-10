import { SyntheticEvent } from 'react';
import { Helmet } from 'react-helmet-async';
import { useIntl } from 'react-intl';

import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Tab, useTheme } from '@mui/material';

import useAppDispatch from '../../hooks/useAppDispatch';
import useAppSelector from '../../hooks/useAppSelector';

import tabs from '../../values/support/tabs';

import { setSupportTab } from '../../states/support/actions';

const Support = () => {
  const tabIndex = useAppSelector(state => state.support.tabIndex);
  const dispatch = useAppDispatch();

  const theme = useTheme();

  const intl = useIntl();

  const handleTabChange = (event: SyntheticEvent, newValue: number) =>
    dispatch(setSupportTab(newValue));

  return (
    <>
      <Helmet>
        <title>{intl.formatMessage({ id: 'support.title' })}</title>
      </Helmet>
      <Box
        sx={{
          mx: {
            xs: 0,
            md: 2,
          },
        }}
      >
        <TabContext value={tabIndex.toString()}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList
              onChange={handleTabChange}
              indicatorColor="primary"
              aria-label={intl.formatMessage({ id: 'support.tabs' })}
              allowScrollButtonsMobile
            >
              {tabs.map(({ id, icon: Icon }, index) => (
                <Tab
                  key={`support-tab-${id}`}
                  id={id}
                  value={index.toString()}
                  icon={<Icon />}
                  iconPosition="start"
                  label={intl.formatMessage({ id })}
                />
              ))}
            </TabList>
          </Box>
          {tabs.map(({ id, page: Page }, index) => (
            <TabPanel
              key={`support-tab-panel-${id}`}
              id={`tab-panel-${id}`}
              value={index.toString()}
              dir={theme.direction}
            >
              <Page />
            </TabPanel>
          ))}
        </TabContext>
      </Box>
    </>
  );
};

export default Support;
