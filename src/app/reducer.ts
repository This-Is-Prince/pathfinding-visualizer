import { AppStateType } from "./state";

export type ActionType = { type: "CHANGE_FULLSCREEN"; payload: boolean };

const reducer = (state: AppStateType, action: ActionType): AppStateType => {
  if (action.type === "CHANGE_FULLSCREEN") {
    return {
      ...state,
      isFullScreen: action.payload,
    };
  }
  return state;
};

export default reducer;
