import { useIntl } from 'react-intl';

import { Typography } from '@mui/material';

import useAppDispatch from 'hooks/useAppDispatch';
import useAppSelector from 'hooks/useAppSelector';

import { useGetQuestionQuery } from 'services/prephouse';

import { setQuestionId } from 'states/practice/actions';
import { SessionType } from 'states/practice/enums';

const QuestionPrompter = () => {
  const sessionType = useAppSelector(state => state.practice.sessionType);
  const dispatch = useAppDispatch();

  const intl = useIntl();

  const { data: questions } = useGetQuestionQuery({ limit: 1, randomize: true });

  return sessionType === SessionType.Interview ? (
    <Typography component="h2" variant="h6">
      {intl.formatMessage({ id: 'practice.practice.question' })}
      {questions?.map(question => {
        dispatch(setQuestionId(question.id));
        return question.question;
      })}
    </Typography>
  ) : null;
};
export default QuestionPrompter;
