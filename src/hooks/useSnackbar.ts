import { Dispatch, SetStateAction, createContext, createElement, useContext } from 'react';

import AlertSnackbar, { BaseProps } from 'components/common/snackbar/AlertSnackbar';

export type SnackbarContextType = {
  snackbar: BaseProps | null;
  setSnackbar: Dispatch<SetStateAction<BaseProps | null>>;
};

export const SnackbarContext = createContext<SnackbarContextType>({
  snackbar: null,
  setSnackbar: () => {},
});

export const useSnackbar = () => useContext(SnackbarContext);

export const SnackbarWrapper = () => {
  const { snackbar, setSnackbar } = useSnackbar();

  const onClose = () => {
    setSnackbar(null);
  };

  return snackbar && createElement(AlertSnackbar, { ...snackbar, open: !!snackbar, onClose }, null);
};
