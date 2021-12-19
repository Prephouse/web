import { mount } from 'enzyme';
import React from 'react';
import { IntlProvider } from 'react-intl';

import strings from '../../../strings/strings';

import PasswordStrengthMeter from './PasswordStrengthIndicator';

const locale = 'en-US';
let wrapper: ReturnType<typeof mount>;

const initPsmComponent = function initPsmComponent(password: string) {
  wrapper = mount(
    <IntlProvider locale={locale} messages={strings[locale]}>
      <PasswordStrengthMeter password={password} />
    </IntlProvider>
  );
};

const matchMeterText = function matchMeterText(expected: string) {
  expect(wrapper.find('#password-strength').text()).toBe(expected);
};

describe('Password Strength Indicator', () => {
  // eslint-disable-next-line jest/expect-expect
  it('indicate extremely weak password (0)', () => {
    initPsmComponent('a');
    matchMeterText('Extremely Weak');
  });

  // eslint-disable-next-line jest/expect-expect
  it('indicate very weak password (1)', () => {
    initPsmComponent('sdffa');
    matchMeterText('Very Weak');
  });

  // eslint-disable-next-line jest/expect-expect
  it('indicate weak password (2)', () => {
    initPsmComponent('sd234ffa');
    matchMeterText('Weak');
  });

  // eslint-disable-next-line jest/expect-expect
  it('indicate adequate password (3)', () => {
    initPsmComponent('sd234ff313');
    matchMeterText('Adequate');
  });

  // eslint-disable-next-line jest/expect-expect
  it('indicate strong password (4)', () => {
    initPsmComponent('sd234ff31332a');
    matchMeterText('Strong');
  });
});
