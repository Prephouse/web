import { ReactNode, useState } from 'react';

import { SnackbarContext } from '../../hooks/useSnackbar';

import { BaseProps } from './AlertSnackbar';

const SnackbarContextProvider = ({ children }: { children: ReactNode }) => {
  const [snackbar, setSnackbar] = useState<BaseProps | null>(null);

  return (
    <SnackbarContext.Provider value={[snackbar, setSnackbar]}>{children}</SnackbarContext.Provider>
  );
};

export default SnackbarContextProvider;
