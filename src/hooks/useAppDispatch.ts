import { useDispatch } from 'react-redux';

import type { AppDispatch } from '../store/store';

// use throughout the app instead of plain `useDispatch`
const useAppDispatch = () => useDispatch<AppDispatch>();

export default useAppDispatch;
