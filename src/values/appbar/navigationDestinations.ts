import {
  ABOUT_PATH,
  COMPARE_PATH,
  DASHBOARD_PATH,
  PRACTICE_PATH,
  TIPS_PATH,
} from '../../strings/paths';

interface NavigationDestination {
  readonly path: string;
  readonly titleId: string;
}

const navigationDestinations: readonly NavigationDestination[] = [
  {
    path: ABOUT_PATH,
    titleId: 'about.title',
  },
  {
    path: DASHBOARD_PATH,
    titleId: 'dashboard.title',
  },
  {
    path: PRACTICE_PATH,
    titleId: 'practice.title',
  },
  {
    path: COMPARE_PATH,
    titleId: 'compare.title',
  },
  {
    path: TIPS_PATH,
    titleId: 'tips.title',
  },
];

export default navigationDestinations;
