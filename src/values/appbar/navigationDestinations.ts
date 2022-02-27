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
}

const navigationDestinations: readonly NavigationDestination[] = [
  {
    path: ABOUT_PATH,
    titleId: 'about.title',
  },
  {
    path: PROGRESS_PATH,
    titleId: 'progress.title',
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
    path: QUESTION_BANK_PATH,
    titleId: 'bank.title',
  },
];

export default navigationDestinations;
