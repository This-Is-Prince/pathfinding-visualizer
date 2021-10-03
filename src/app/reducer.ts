import stair from "../mazes/stair";
import { AppStateType, ModalStateType, NodeInfoType } from "./state";
import mst from "../mazes/mst";
import dfs, { VertexType } from "../mazes/dfs";
import bfs from "../algorithm/bfs";

export type ActionType =
  | { type: "CHANGE_FULLSCREEN_MODEL"; payload: boolean }
  | { type: "CHANGE_ASIDE_MODAL"; payload: boolean }
  | { type: "ADD_NODES"; payload: NodeInfoType }
  | {
      type: "ADD_SPECIAL_START_NODE";
      payload: VertexType;
    }
  | {
      type: "ADD_SPECIAL_TARGET_NODE";
      payload: VertexType;
    }
  | { type: "OPEN_SETTINGS"; payload: boolean }
  | { type: "CLEAR_BOARD"; payload: boolean }
  | { type: "CHANGE_MODAL_STATE"; payload: ModalStateType }
  | { type: "CHANGE_PLAY"; payload: boolean }
  | { type: "CHANGE_SPEED"; payload: string }
  | { type: "CHANGE_ALGORITHM"; payload: string }
  | { type: "CHANGE_MAZES"; payload: string }
  | { type: "ANIMATION_COMPLETE"; payload: boolean }
  | { type: "MAZE_ANIMATION_COMPLETE"; payload: boolean }
  | { type: "CHANGE_NODE_MAX_WIDTH"; payload: number };

const reducer = (state: AppStateType, action: ActionType): AppStateType => {
  switch (action.type) {
    case "CHANGE_PLAY": {
      return {
        ...state,
        isPlay: action.payload,
      };
    }
    case "MAZE_ANIMATION_COMPLETE": {
      return {
        ...state,
        isMazeAnimationComplete: action.payload,
      };
    }
    case "ANIMATION_COMPLETE": {
      return {
        ...state,
        isAnimationComplete: action.payload,
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
      // const { startNode, targetNode } = state.specialNodes;
      // if (action.payload === "stair pattern") {
      //   let nodes = stair(state.container.row, state.container.column);
      //   for (let i = 0; i < state.container.row; i++) {
      //     for (let j = 0; j < state.container.column; j++) {
      //       if (
      //         !(
      //           (i === targetNode.x && j === targetNode.y) ||
      //           (i === startNode.x && j === startNode.y)
      //         )
      //       ) {
      //         if (nodes[`node-${i}-${j}`]) {
      //           document
      //             .getElementById(`node-${i}-${j}`)!
      //             .classList.add("black-node");
      //         } else {
      //           document
      //             .getElementById(`node-${i}-${j}`)!
      //             .classList.remove("black-node");
      //         }
      //       }
      //     }
      //   }
      // } else if (action.payload === "mst maze") {
      //   let nodes = mst(state.container.row, state.container.column);
      //   for (let i = 0; i < state.container.row; i++) {
      //     for (let j = 0; j < state.container.column; j++) {
      //       if (
      //         !(
      //           (i === targetNode.x && j === targetNode.y) ||
      //           (i === startNode.x && j === startNode.y)
      //         )
      //       ) {
      //         if (nodes[`node-${i}-${j}`]) {
      //           document
      //             .getElementById(`node-${i}-${j}`)!
      //             .classList.remove("black-node");
      //         } else {
      //           document
      //             .getElementById(`node-${i}-${j}`)!
      //             .classList.add("black-node");
      //         }
      //       }
      //     }
      //   }
      // } else if (
      //   action.payload === "recursive division" ||
      //   action.payload === "recursive division (horizontal skew)" ||
      //   action.payload === "recursive division (vertical skew)"
      // ) {
      //   let nodes = dfs(
      //     state.container.row,
      //     state.container.column,
      //     action.payload
      //   );
      //   for (let i = 0; i < state.container.row; i++) {
      //     for (let j = 0; j < state.container.column; j++) {
      //       if (
      //         !(
      //           (i === targetNode.x && j === targetNode.y) ||
      //           (i === startNode.x && j === startNode.y)
      //         )
      //       ) {
      //         if (nodes[`node-${i}-${j}`]) {
      //           document
      //             .getElementById(`node-${i}-${j}`)!
      //             .classList.remove("black-node");
      //         } else {
      //           document
      //             .getElementById(`node-${i}-${j}`)!
      //             .classList.add("black-node");
      //         }
      //       }
      //     }
      //   }
      // }
      return {
        ...state,
        isMazeAnimationComplete: false,
        maze: action.payload,
      };
    }
    case "CHANGE_ALGORITHM": {
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
    case "OPEN_SETTINGS": {
      return {
        ...state,
        isSettingsOpen: action.payload,
      };
    }
    case "CLEAR_BOARD": {
      return {
        ...state,
        isBoardClear: action.payload,
      };
    }
    default:
      return { ...state };
  }
};

export default reducer;
