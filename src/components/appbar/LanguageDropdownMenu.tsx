import { useIntl } from 'react-intl';

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

import useAppDispatch from '../../hooks/useAppDispatch';
import useAppSelector from '../../hooks/useAppSelector';

import { changeLocale } from '../../store/preference/actions';

import locales from '../../strings/locales';
import type { BcpName } from '../../strings/locales';

import DropdownMenuItem from '../common/DropdownMenuItem';

interface Props {
  onMenuBack: () => void;
}

const LanguageDropdownMenu = ({ onMenuBack }: Props) => {
  const locale = useAppSelector(state => state.preference.locale);
  const dispatch = useAppDispatch();

  const intl = useIntl();

  return (
    <>
      <DropdownMenuItem
        primary={intl.formatMessage({ id: 'app.preference.language' })}
        icon={<ChevronLeftIcon />}
        onClick={onMenuBack}
      />
      {Object.entries(locales).map(([bcp, { display }]) => (
        <DropdownMenuItem
          key={bcp}
          primary={display}
          selected={bcp === locale}
          onClick={() => {
            changeLocale(bcp as BcpName)(dispatch);
          }}
        />
      ))}
    </>
  );
};

export default LanguageDropdownMenu;
