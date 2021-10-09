export type VertexType = {
  x: number;
  y: number;
};
export type Index = {
  r: number;
  c: number;
};
export type Point = {
  tRC: Index;
  tLC: Index;
  bRC: Index;
  bLC: Index;
};
export type IndexDone = {
  isTRC: boolean;
  isTLC: boolean;
  isBRC: boolean;
  isBLC: boolean;
};
export type ModalType = {
  children: any;
  handleChange: (e: any) => void;
  radioState: string;
};
export interface ModalStateType {
  heading: string;
  name: string;
  list: ModalListType[];
}
export interface ModalListType {
  title: string;
  value: string;
  id: number;
}
export type GridType = {
  row: number;
  column: number;
};
export interface AppStateType {
  grid: GridType;
  isFullScreenModelOpen: boolean;
  nodeMaxWidth: number;
  isPlay: boolean;
  isSettingsOpen: boolean;
  isBoardClear: boolean;
  modalState: ModalStateType;
  speed: string;
  algorithm: string;
  visitedArr: VertexType[];
  pathArr: VertexType[];
  maze: string;
  isMazeAnimationComplete: boolean;
  isFindAnimationNodes: boolean;
  isAnimationComplete: boolean;
  isAsideModalOpen: boolean;
}
export type ActionType =
  | { type: "CHANGE_FULLSCREEN_MODEL"; payload: boolean }
  | { type: "CHANGE_ASIDE_MODAL"; payload: boolean }
  | { type: "ADD_GRID"; payload: GridType }
  | { type: "OPEN_SETTINGS"; payload: boolean }
  | { type: "CLEAR_BOARD"; payload: boolean }
  | { type: "CHANGE_MODAL_STATE"; payload: ModalStateType }
  | { type: "CHANGE_PLAY"; payload: boolean }
  | { type: "CHANGE_SPEED"; payload: string }
  | { type: "CHANGE_ALGORITHM"; payload: string }
  | { type: "CHANGE_FIND_ANIMATION_NODES"; payload: boolean }
  | { type: "CHANGE_MAZE"; payload: string }
  | { type: "ANIMATION_COMPLETE"; payload: boolean }
  | { type: "MAZE_ANIMATION_COMPLETE"; payload: boolean }
  | { type: "CHANGE_NODE_MAX_WIDTH"; payload: number };
