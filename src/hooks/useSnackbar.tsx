import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useState } from 'react';

import { BaseProps } from '../components/common/AlertSnackbar';

type SnackbarContextType = [BaseProps | null, Dispatch<SetStateAction<BaseProps | null>>];

// eslint-disable-next-line @typescript-eslint/no-empty-function
const SnackbarContext = createContext<SnackbarContextType>([null, () => {}]);

export const SnackbarContextProvider = ({ children }: { children: ReactNode }) => {
  const [snackbar, setSnackbar] = useState<BaseProps | null>(null);

  return (
    <SnackbarContext.Provider value={[snackbar, setSnackbar]}>{children}</SnackbarContext.Provider>
  );
};

export const useSnackbar = () => {
  return useContext(SnackbarContext);
};
