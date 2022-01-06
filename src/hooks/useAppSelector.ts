import { TypedUseSelectorHook, useSelector } from 'react-redux';

import type { RootState } from '../store';

// use throughout the app instead of plain `useSelector`
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default useAppSelector;
