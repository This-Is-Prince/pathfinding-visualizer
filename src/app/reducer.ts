import stair from "../mazes/stair";
import * as d3 from "d3";
import {
  AppStateType,
  ModalStateType,
  NodeInfoType,
  SVGStateType,
} from "./state";
import mst from "../mazes/mst";
import dfs, { VertexType } from "../mazes/dfs";
import bfs from "../algorithm/bfs";

export type ActionType =
  | { type: "CHANGE_FULLSCREEN_MODEL"; payload: boolean }
  | { type: "CHANGE_ASIDE_MODAL"; payload: boolean }
  | { type: "CHANGE_SVG"; payload: SVGStateType }
  | { type: "ADD_NODES"; payload: NodeInfoType }
  | {
      type: "ADD_SPECIAL_START_NODE";
      payload: VertexType;
    }
  | {
      type: "ADD_SPECIAL_END_NODE";
      payload: VertexType;
    }
  | { type: "OPEN_SETTINGS"; payload: boolean }
  | { type: "CLEAR_BOARD"; payload: boolean }
  | { type: "CHANGE_MODAL_STATE"; payload: ModalStateType }
  | { type: "IS_BOARD_DIRTY"; payload: boolean }
  | { type: "CHANGE_PLAY"; payload: boolean }
  | { type: "CHANGE_SPEED"; payload: string }
  | { type: "CHANGE_ALGORITHM"; payload: string }
  | { type: "CHANGE_MAZES"; payload: string }
  | { type: "CHANGE_NODE_MAX_WIDTH"; payload: number };

const reducer = (state: AppStateType, action: ActionType): AppStateType => {
  switch (action.type) {
    case "CHANGE_PLAY": {
      return {
        ...state,
        isPlay: action.payload,
      };
    }
    case "CHANGE_NODE_MAX_WIDTH": {
      return {
        ...state,
        nodeMaxWidth: action.payload,
      };
    }
    case "CHANGE_MODAL_STATE": {
      return {
        ...state,
        modalState: action.payload,
      };
    }
    case "CHANGE_ASIDE_MODAL": {
      return {
        ...state,
        isAsideModalOpen: action.payload,
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
      const startNode = document.getElementById("start")!;
      const endNode = document.getElementById("end")!;
      if (action.payload === "stair pattern") {
        let nodes = stair(state.nodeInfo.row, state.nodeInfo.column);
        for (let i = 0; i < state.nodeInfo.row; i++) {
          for (let j = 0; j < state.nodeInfo.column; j++) {
            let idX = document
              .getElementById(`node-${i}-${j}`)
              ?.getAttribute("x");
            let idY = document
              .getElementById(`node-${i}-${j}`)
              ?.getAttribute("y");
            if (
              !(
                (idX === endNode.getAttribute("x") &&
                  idY === endNode.getAttribute("y")) ||
                (idX === startNode.getAttribute("x") &&
                  idY === startNode.getAttribute("y"))
              )
            ) {
              if (nodes[`node-${i}-${j}`]) {
                d3.select(`#node-${i}-${j}`).attr("fill", "#002233");
              } else {
                d3.select(`#node-${i}-${j}`).attr("fill", "#fff");
              }
            }
          }
        }
      } else if (action.payload === "mst maze") {
        let nodes = mst(state.nodeInfo.row, state.nodeInfo.column);
        for (let i = 0; i < state.nodeInfo.row; i++) {
          for (let j = 0; j < state.nodeInfo.column; j++) {
            let idX = document
              .getElementById(`node-${i}-${j}`)
              ?.getAttribute("x");
            let idY = document
              .getElementById(`node-${i}-${j}`)
              ?.getAttribute("y");
            if (
              !(
                (idX === endNode.getAttribute("x") &&
                  idY === endNode.getAttribute("y")) ||
                (idX === startNode.getAttribute("x") &&
                  idY === startNode.getAttribute("y"))
              )
            ) {
              if (nodes[`node-${i}-${j}`]) {
                d3.select(`#node-${i}-${j}`).attr("fill", "#fff");
              } else {
                d3.select(`#node-${i}-${j}`).attr("fill", "#002233");
              }
            }
          }
        }
      } else if (
        action.payload === "recursive division" ||
        action.payload === "recursive division (horizontal skew)" ||
        action.payload === "recursive division (vertical skew)"
      ) {
        let nodes = dfs(
          state.nodeInfo.row,
          state.nodeInfo.column,
          action.payload
        );
        for (let i = 0; i < state.nodeInfo.row; i++) {
          for (let j = 0; j < state.nodeInfo.column; j++) {
            let idX = document
              .getElementById(`node-${i}-${j}`)
              ?.getAttribute("x");
            let idY = document
              .getElementById(`node-${i}-${j}`)
              ?.getAttribute("y");
            if (
              !(
                (idX === endNode.getAttribute("x") &&
                  idY === endNode.getAttribute("y")) ||
                (idX === startNode.getAttribute("x") &&
                  idY === startNode.getAttribute("y"))
              )
            ) {
              if (nodes[`node-${i}-${j}`]) {
                d3.select(`#node-${i}-${j}`).attr("fill", "#fff");
              } else {
                d3.select(`#node-${i}-${j}`).attr("fill", "#002233");
              }
            }
          }
        }
      }
      return {
        ...state,
        mazesIdArray,
        mazes: action.payload,
      };
    }
    case "CHANGE_ALGORITHM": {
      // bfs(state.nodeInfo.row,state.nodeInfo.column,{})
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
    case "ADD_SPECIAL_START_NODE": {
      return {
        ...state,
        specialNodes: {
          startNode: action.payload,
          targetNode: { ...state.specialNodes.targetNode },
        },
      };
    }
    case "ADD_SPECIAL_END_NODE": {
      return {
        ...state,
        specialNodes: {
          startNode: { ...state.specialNodes.startNode },
          targetNode: action.payload,
        },
      };
    }
    default:
      return { ...state };
  }
};

export default reducer;
