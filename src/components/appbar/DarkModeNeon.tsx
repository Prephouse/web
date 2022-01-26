import { memo } from 'react';
import { useIntl } from 'react-intl';

import Neon from 'components/common/Neon';

interface Props {
  prefersDarkMode: boolean;
}

const DarkModeNeon = ({ prefersDarkMode }: Props) => {
  const intl = useIntl();

  return (
    <Neon lightup={prefersDarkMode.toString()}>
      {Array.from(intl.formatMessage({ id: 'app.preference.darkMode' }), c => (
        <span key={`neon-char-${c}-${c + 1}`}>{c}</span>
      ))}
    </Neon>
  );
};

export default memo(DarkModeNeon);
