import { useIntl } from 'react-intl';

import FormButtons from 'components/common/form/FormButtons';

interface Props {
  onNext: () => void;
  onBack: () => void;
}

const PracticeInstructions = ({ onNext, onBack }: Props) => {
  const intl = useIntl();

  return (
    <FormButtons
      primaryText={intl.formatMessage({ id: 'practice.instructions.confirm' })}
      onPrimaryClick={onNext}
      secondaryText={intl.formatMessage({ id: 'practice.instructions.back' })}
      onSecondaryClick={onBack}
    />
  );
};

export default PracticeInstructions;
