import { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useIntl } from 'react-intl';

import CategoryIcon from '@mui/icons-material/Category';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Chip,
  FormControl,
  SelectChangeEvent,
  Stack,
  Typography,
} from '@mui/material';

import PageContainer from 'components/common/container/PageContainer';
import ChipInput from 'components/common/form/ChipInput';

import { useGetQuestionCategoriesQuery, useGetQuestionQuery } from 'services/prephouse';

const Bank = () => {
  const intl = useIntl();

  const { data: categories } = useGetQuestionCategoriesQuery();
  const { data: questions } = useGetQuestionQuery();

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  useEffect(() => {
    setSelectedCategories(Object.values(categories?.categories ?? {}));
  }, [categories]);

  const filteredQuestions = useMemo(
    () => questions?.filter(question => selectedCategories.includes(question.categoryName)),
    [questions, selectedCategories]
  );

  const handleSelectedCategoryChange = (event: SelectChangeEvent<typeof selectedCategories>) => {
    const {
      target: { value },
    } = event;
    setSelectedCategories(typeof value === 'string' ? value.split(',') : value);
  };

  return (
    <>
      <Helmet title={intl.formatMessage({ id: 'bank.title' })} />
      <PageContainer>
        <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
          <Typography component="h2" variant="h4">
            {intl.formatMessage({ id: 'bank.title' })}
          </Typography>
          <FormControl sx={{ mx: 1, minWidth: 300 }} size="small">
            <ChipInput
              idPrefix="question-category"
              label={intl.formatMessage({ id: 'bank.question.categories' })}
              possibleValues={Object.keys(categories?.categories ?? {})}
              selectedValues={selectedCategories}
              codeRecord={categories?.categories}
              handleSelectedChange={handleSelectedCategoryChange}
            />
          </FormControl>
        </Stack>
        <Box sx={{ my: 2 }}>
          {filteredQuestions?.map((question, idx) => (
            <Accordion key={`question-accordion-${question.id}`}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel${idx}a-content`}
                id={`panel${idx}a-header`}
              >
                <Typography noWrap sx={{ flexGrow: 1 }}>
                  {intl.formatMessage(
                    { id: 'bank.question.title' },
                    { q_num: intl.formatNumber(question.id), q_title: question.question }
                  )}
                </Typography>
                <Chip
                  sx={{ mx: 2 }}
                  size="small"
                  icon={<CategoryIcon />}
                  label={question.categoryName}
                />
              </AccordionSummary>
              <AccordionDetails>
                <Typography component="h3" variant="h6" sx={{ fontWeight: 'bold' }}>
                  {intl.formatMessage({ id: 'bank.question.description' })}
                </Typography>
                <Typography paragraph>{question.description}</Typography>
                <Typography component="h3" variant="h6" sx={{ fontWeight: 'bold' }}>
                  {intl.formatMessage({ id: 'bank.question.sampleAnswer' })}
                </Typography>
                <Typography paragraph>
                  {question.sampleAnswer || (
                    <i>{intl.formatMessage({ id: 'bank.question.sampleAnswer.empty' })}</i>
                  )}
                </Typography>
                <Typography component="h3" variant="h6" sx={{ fontWeight: 'bold' }}>
                  {intl.formatMessage({ id: 'bank.question.statistics' })}
                </Typography>
                <Typography component="ul">
                  <li>
                    {intl.formatMessage(
                      { id: 'bank.question.frequency' },
                      { frequency: question.frequency }
                    )}
                  </li>
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </PageContainer>
    </>
  );
};

export default Bank;
