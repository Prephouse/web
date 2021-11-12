import React from 'react';
import { useIntl } from 'react-intl';

import FormButtons from '../common/FormButtons';

interface Props {
  onNext: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const PracticeInstructions = ({ onNext }: Props) => {
  const intl = useIntl();

  return (
    <FormButtons
      primaryText={intl.formatMessage({ id: 'practice.instructions.confirm' })}
      onPrimaryClick={onNext}
    />
  );
};

export default PracticeInstructions;
