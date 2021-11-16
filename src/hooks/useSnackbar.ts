import { Dispatch, SetStateAction, createContext, useContext } from 'react';

import { BaseProps } from '../components/common/AlertSnackbar';

type SnackbarContextType = [BaseProps | null, Dispatch<SetStateAction<BaseProps | null>>];

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const SnackbarContext = createContext<SnackbarContextType>([null, () => {}]);

export const useSnackbar = () => {
  return useContext(SnackbarContext);
};
