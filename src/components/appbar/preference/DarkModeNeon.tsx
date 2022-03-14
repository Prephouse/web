import { memo } from 'react';
import { useIntl } from 'react-intl';

import NeonText from 'components/common/text/NeonText';

interface Props {
  prefersDarkMode: boolean;
}

const DarkModeNeon = ({ prefersDarkMode }: Props) => {
  const intl = useIntl();

  return (
    <NeonText lightup={prefersDarkMode.toString()}>
      {Array.from(intl.formatMessage({ id: 'app.preference.darkMode' }), c => (
        <span key={`neon-char-${c}-${c + 1}`}>{c}</span>
      ))}
    </NeonText>
  );
};

export default memo(DarkModeNeon);
