import { useIntl } from 'react-intl';

import { Box, Typography } from '@mui/material';

import useAppSelector from 'hooks/useAppSelector';

import { useGetQuestionQuery } from 'services/prephouse';

import { SessionType } from 'states/practice/enums';

const QuestionPrompter = () => {
  const intl = useIntl();

  const { data: questions } = useGetQuestionQuery({ limit: 1, randomize: true });

  const sessionType = useAppSelector(state => state.practice.sessionType);

  return sessionType === SessionType.Interview ? (
    <Box sx={{ width: '100%', marginBottom: 3 }}>
      <Typography component="h2" variant="h6">
        {intl.formatMessage({ id: 'practice.practice.question' })}
        {questions?.map(question => question.question)}
      </Typography>
    </Box>
  ) : (
    <Box />
  );
};
export default QuestionPrompter;
