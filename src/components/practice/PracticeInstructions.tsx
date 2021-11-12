import React from 'react';
import { useIntl } from 'react-intl';

import FormButtons from '../common/FormButtons';

interface Props {
  onNext: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onBack: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
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
