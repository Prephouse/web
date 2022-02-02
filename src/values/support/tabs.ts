import { JSXElementConstructor } from 'react';

import BugReportIcon from '@mui/icons-material/BugReport';
import FeedbackIcon from '@mui/icons-material/Feedback';
import { SvgIconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';

import AppBugReport from 'components/support/bugreport/AppBugReport';
import AppFeedback from 'components/support/feedback/AppFeedback';

interface Tab {
  id: `support.${string}`;
  page: JSXElementConstructor<unknown>;
  icon: OverridableComponent<SvgIconTypeMap> & { muiName: string };
}

const tabs: readonly Tab[] = [
  {
    id: 'support.feedback',
    page: AppFeedback,
    icon: FeedbackIcon,
  },
  {
    id: 'support.bugReport',
    page: AppBugReport,
    icon: BugReportIcon,
  },
];

export default tabs;
