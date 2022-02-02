import { ReactNode, useMemo, useState } from 'react';

import { BaseProps } from 'components/common/snackbar/AlertSnackbar';

import { SnackbarContext } from 'hooks/useSnackbar';

const SnackbarProvider = ({ children }: { children: ReactNode }) => {
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

export default SnackbarProvider;
