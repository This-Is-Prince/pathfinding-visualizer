import { mazesPatterns } from "../assets/data";
import { AppStateType } from "../types";
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

const AppInitialState: AppStateType = {
  grid: { row: 0, column: 0 },
  nodeMaxWidth: 25,
  modalState: mazesPatterns,
  speed: "fast",
  pathArr: [],
  visitedArr: [],
  maze: "",
  algorithm: "bfs",
  isPlay: false,
  isBoardClear: false,
  isSettingsOpen: false,
  isAsideModalOpen: false,
  isAnimationComplete: true,
  isFindAnimationNodes: true,
  isFullScreenModelOpen: true,
  isMazeAnimationComplete: true,
};

export default AppInitialState;
