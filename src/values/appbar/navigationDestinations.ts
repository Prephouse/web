import {
  ABOUT_PATH,
  DASHBOARD_PATH,
  LEADERBOARD_PATH,
  PRACTICE_PATH,
  TIPS_PATH,
} from 'strings/paths';

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
    path: LEADERBOARD_PATH,
    titleId: 'leaderboard.title',
  },
  {
    path: TIPS_PATH,
    titleId: 'tips.title',
  },
];

export default navigationDestinations;
