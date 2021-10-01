import stair from "../mazes/stair";
import * as d3 from "d3";
import {
  AppStateType,
  ModalStateType,
  NodeInfoType,
  SVGStateType,
} from "./state";
import mst from "../mazes/mst";

export type ActionType =
  | { type: "CHANGE_FULLSCREEN_MODEL"; payload: boolean }
  | { type: "CHANGE_SVG"; payload: SVGStateType }
  | { type: "ADD_NODES"; payload: NodeInfoType }
  | { type: "OPEN_SETTINGS"; payload: boolean }
  | { type: "CLEAR_BOARD"; payload: boolean }
  | { type: "CHANGE_MODAL_STATE"; payload: ModalStateType }
  | { type: "IS_BOARD_DIRTY"; payload: boolean }
  | { type: "CHANGE_PLAY"; payload: boolean }
  | { type: "CHANGE_SPEED"; payload: string }
  | { type: "CHANGE_ALGORITHM"; payload: string }
  | { type: "CHANGE_MAZES"; payload: string };

const reducer = (state: AppStateType, action: ActionType): AppStateType => {
  switch (action.type) {
    case "CHANGE_PLAY": {
      return {
        ...state,
        isPlay: action.payload,
      };
    }
    case "CHANGE_MODAL_STATE": {
      return {
        ...state,
        modalState: action.payload,
      };
    }
    case "CHANGE_FULLSCREEN_MODEL": {
      return {
        ...state,
        isFullScreenModelOpen: action.payload,
      };
    }
    case "CHANGE_MAZES": {
      let mazesIdArray: string[] = [];
      if (action.payload === "stair pattern") {
        mazesIdArray = stair(state.nodeInfo.row, state.nodeInfo.column);
        const startNode = document.getElementById("start")!;
        const endNode = document.getElementById("end")!;
        mazesIdArray.forEach((id) => {
          let idX = document.getElementById(id)?.getAttribute("x");
          let idY = document.getElementById(id)?.getAttribute("y");
          if (
            !(
              (idX === endNode.getAttribute("x") &&
                idY === endNode.getAttribute("y")) ||
              (idX === startNode.getAttribute("x") &&
                idY === startNode.getAttribute("y"))
            )
          ) {
            d3.select(`#${id}`).attr("fill", "#002233");
          }
        });
      }
      let arr = mst(state.nodeInfo.row, state.nodeInfo.column);
      arr.forEach((id) => {
        d3.select(`#node-${id.startNode.x}-${id.startNode.y}`).attr(
          "fill",
          "#002233"
        );
      });
      return {
        ...state,
        mazesIdArray,
        mazes: action.payload,
      };
    }
    case "CHANGE_ALGORITHM": {
      console.log(action.payload);
      return {
        ...state,
        algorithm: action.payload,
      };
    }
    case "CHANGE_SPEED": {
      return {
        ...state,
        speed: action.payload,
      };
    }
    case "CHANGE_SVG": {
      return {
        ...state,
        svg: action.payload,
        mazes: "",
        mazesIdArray: [],
        algorithm: "",
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
