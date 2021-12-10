import { TypedUseSelectorHook, useSelector } from 'react-redux';

import type { RootState } from '../store/store';

// Use throughout the app instead of plain `useSelector`
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default useAppSelector;
