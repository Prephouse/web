import { JSXElementConstructor } from 'react';

import BugReportIcon from '@mui/icons-material/BugReport';
import FeedbackIcon from '@mui/icons-material/Feedback';
import { SvgIconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';

import BugReportForm from 'components/support/BugReportForm';
import FeedbackForm from 'components/support/FeedbackForm';

interface Tab {
  id: `support.${string}`;
  page: JSXElementConstructor<unknown>;
  icon: OverridableComponent<SvgIconTypeMap> & { muiName: string };
}

const tabs: readonly Tab[] = [
  {
    id: 'support.feedback',
    page: FeedbackForm,
    icon: FeedbackIcon,
  },
  {
    id: 'support.bugReport',
    page: BugReportForm,
    icon: BugReportIcon,
  },
];

export default tabs;
