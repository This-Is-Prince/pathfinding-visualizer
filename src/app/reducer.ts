import { AppStateType, NodeInfoType, SVGStateType } from "./state";

export type ActionType =
  | { type: "CHANGE_FULLSCREEN_MODEL"; payload: boolean }
  | { type: "CHANGE_SVG"; payload: SVGStateType }
  | { type: "ADD_NODES"; payload: NodeInfoType }
  | { type: "OPEN_SETTINGS"; payload: boolean }
  | { type: "CLEAR_BOARD"; payload: boolean }
  | { type: "IS_BOARD_DIRTY"; payload: boolean };

const reducer = (state: AppStateType, action: ActionType): AppStateType => {
  switch (action.type) {
    case "CHANGE_FULLSCREEN_MODEL": {
      return {
        ...state,
        isFullScreenModelOpen: action.payload,
      };
    }
    case "CHANGE_SVG": {
      return {
        ...state,
        svg: action.payload,
      };
    }
    case "OPEN_SETTINGS": {
      return {
        ...state,
        isSettingsOpen: action.payload,
      };
    }
    case "IS_BOARD_DIRTY": {
      return {
        ...state,
        isBoardDirty: action.payload,
      };
    }
    case "CLEAR_BOARD": {
      return {
        ...state,
        isBoardClear: action.payload,
      };
    }
    case "ADD_NODES": {
      return {
        ...state,
        nodeInfo: action.payload,
      };
    }
    default:
      return { ...state };
  }
};

export default reducer;
