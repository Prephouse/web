import { useIntl } from 'react-intl';

import { Typography } from '@mui/material';

import useAppSelector from 'hooks/useAppSelector';

import { useGetQuestionQuery } from 'services/prephouse';

import { SessionType } from 'states/practice/enums';

const QuestionPrompter = () => {
  const sessionType = useAppSelector(state => state.practice.sessionType);

  const intl = useIntl();

  const { data: questions } = useGetQuestionQuery({ limit: 1, randomize: true });

  return sessionType === SessionType.Interview ? (
    <Typography component="h2" variant="h6">
      {intl.formatMessage({ id: 'practice.practice.question' })}
      {questions?.map(question => question.question)}
    </Typography>
  ) : null;
};
export default QuestionPrompter;
