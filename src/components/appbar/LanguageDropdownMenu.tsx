import { useIntl } from 'react-intl';

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

import DropdownMenuItem from 'components/common/DropdownMenuItem';

import useAppDispatch from 'hooks/useAppDispatch';
import useAppSelector from 'hooks/useAppSelector';

import { changeLocale } from 'states/preference/actions';

import locales from 'strings/locales';
import type { BcpName } from 'strings/locales';

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
            dispatch(changeLocale(bcp as BcpName));
          }}
        />
      ))}
    </>
  );
};

export default LanguageDropdownMenu;
