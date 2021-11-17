import { ReactNode, useMemo, useState } from 'react';

import { SnackbarContext } from '../../hooks/useSnackbar';

import { BaseProps } from './AlertSnackbar';

const SnackbarContextProvider = ({ children }: { children: ReactNode }) => {
  const [snackbar, setSnackbar] = useState<BaseProps | null>(null);

  const value = useMemo(
    () => ({
      snackbar,
      setSnackbar,
    }),
    [snackbar]
  );

  return <SnackbarContext.Provider value={value}>{children}</SnackbarContext.Provider>;
};

export default SnackbarContextProvider;
