import {
  ABOUT_PATH,
  LEADERBOARD_PATH,
  PRACTICE_PATH,
  PROGRESS_PATH,
  QUESTION_BANK_PATH,
} from 'strings/paths';

interface NavigationDestination {
  readonly path: string;
  readonly titleId: string;
  readonly privateRoute: boolean;
}

const navigationDestinations: readonly NavigationDestination[] = [
  {
    path: ABOUT_PATH,
    titleId: 'about.title',
    privateRoute: false,
  },
  {
    path: PRACTICE_PATH,
    titleId: 'practice.title',
    privateRoute: true,
  },
  {
    path: PROGRESS_PATH,
    titleId: 'progress.title',
    privateRoute: true,
  },
  {
    path: LEADERBOARD_PATH,
    titleId: 'leaderboard.title',
    privateRoute: true,
  },
  {
    path: QUESTION_BANK_PATH,
    titleId: 'bank.title',
    privateRoute: true,
  },
];

export default navigationDestinations;
