import { render, screen } from 'testing';

import PasswordStrengthMeter from './PasswordStrengthIndicator';

describe('Password Strength Indicator', () => {
  it('indicate extremely weak password (0)', () => {
    render(<PasswordStrengthMeter password="a" />);
    expect(screen.getByTestId('password-strength')).toHaveTextContent('Extremely Weak');
  });

  it('indicate very weak password (1)', () => {
    render(<PasswordStrengthMeter password="sdffa" />);
    expect(screen.getByTestId('password-strength')).toHaveTextContent('Very Weak');
  });

  // eslint-disable-next-line jest/expect-expect
  it('indicate weak password (2)', () => {
    render(<PasswordStrengthMeter password="sd234ffa" />);
    expect(screen.getByTestId('password-strength')).toHaveTextContent('Weak');
  });

  // eslint-disable-next-line jest/expect-expect
  it('indicate adequate password (3)', () => {
    render(<PasswordStrengthMeter password="sd234ff313" />);
    expect(screen.getByTestId('password-strength')).toHaveTextContent('Adequate');
  });

  // eslint-disable-next-line jest/expect-expect
  it('indicate strong password (4)', () => {
    render(<PasswordStrengthMeter password="sd234ff31332a" />);
    expect(screen.getByTestId('password-strength')).toHaveTextContent('Strong');
  });
});
