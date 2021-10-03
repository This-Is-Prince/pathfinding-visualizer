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

export type ContainerType = {
  self: HTMLElement;
  width: number;
  height: number;
  row: number;
  column: number;
};
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
export type SpecialNodeType = {
  x: number;
  y: number;
  self: HTMLImageElement;
};
export interface AppStateType {
  isFullScreenModelOpen: boolean;
  container: ContainerType;
  nodeMaxWidth: number;
  isPlay: boolean;
  isSettingsOpen: boolean;
  isBoardClear: boolean;
  isBoardDirty: boolean;
  modalState: ModalStateType;
  speed: string;
  algorithm: string;
  visitedArr: VertexType[];
  pathArr: VertexType[];
  mazes: string;
  mazesIdArray: string[];
  isAsideModalOpen: boolean;
  isAnimationComplete: boolean;
  specialNodes: {
    startNode: SpecialNodeType;
    targetNode: SpecialNodeType;
  };
}

const AppInitialState: AppStateType = {
  isFullScreenModelOpen: true,
  container: {
    self: {} as HTMLElement,
    height: 0,
    width: 0,
    row: 0,
    column: 0,
  },
  nodeMaxWidth: 25,
  isPlay: false,
  isAnimationComplete: false,
  isSettingsOpen: false,
  isAsideModalOpen: false,
  isBoardClear: false,
  isBoardDirty: false,
  modalState: mazesPatterns,
  speed: "normal",
  algorithm: "",
  visitedArr: [],
  pathArr: [],
  mazes: "",
  mazesIdArray: [],
  specialNodes: {
    targetNode: { x: 0, y: 0, self: {} as HTMLImageElement },
    startNode: { x: 0, y: 0, self: {} as HTMLImageElement },
  },
};

export default AppInitialState;
