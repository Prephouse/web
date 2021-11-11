import { CHANGE_PREFERS_DARK_MODE } from "./types";
import { PREFERS_DARK_MODE_KEY } from "../../strings/keys";

export const changePrefersDarkMode = (prefersDarkMode: boolean) => (dispatch: any) => {
  localStorage.setItem(PREFERS_DARK_MODE_KEY, prefersDarkMode.toString());
  dispatch({
    type: CHANGE_PREFERS_DARK_MODE,
    payload: { prefersDarkMode },
  });
};
