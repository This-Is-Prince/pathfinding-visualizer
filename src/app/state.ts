import { mazesPatterns } from "../assets/data";
import { VertexType } from "../mazes/dfs";

export class Node {
  constructor(
    private id: string,
    private x: number,
    private y: number,
    private color: string
  ) {}
  getID() {
    return this.id;
  }
  setID(value: string) {
    this.id = value;
  }
  getX() {
    return this.x;
  }
  setX(value: number) {
    this.x = value;
  }
  getY() {
    return this.y;
  }
  setY(value: number) {
    this.y = value;
  }

  getColor() {
    return this.color;
  }

  setColor(value: string) {
    this.color = value;
  }
}

export type NodeInfoType = {
  nodes: Node[];
  width: number;
  height: number;
  column: number;
  row: number;
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
export interface AppStateType {
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
  isAnimationComplete: boolean;
  isAsideModalOpen: boolean;
}

const AppInitialState: AppStateType = {
  isFullScreenModelOpen: true,
  nodeMaxWidth: 25,
  isPlay: false,
  isAnimationComplete: false,
  isSettingsOpen: false,
  isAsideModalOpen: false,
  isBoardClear: false,
  modalState: mazesPatterns,
  speed: "normal",
  algorithm: "",
  visitedArr: [],
  pathArr: [],
  maze: "",
  isMazeAnimationComplete: true,
};

export default AppInitialState;
