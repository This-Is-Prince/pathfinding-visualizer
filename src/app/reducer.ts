import { AppStateType, NodeInfoType, SVGStateType } from "./state";

export type ActionType =
  | { type: "CHANGE_FULLSCREEN_MODEL"; payload: boolean }
  | { type: "CHANGE_SVG"; payload: SVGStateType }
  | { type: "ADD_NODES"; payload: NodeInfoType };

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
