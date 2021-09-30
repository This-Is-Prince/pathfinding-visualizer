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

export type SVGStateType = {
  self: any;
  width: number;
  height: number;
};
export type NodeInfoType = {
  nodes: Node[];
  width: number;
  height: number;
  column: number;
  row: number;
};
export interface AppStateType {
  isFullScreenModelOpen: boolean;
  svg: SVGStateType;
  nodeInfo: NodeInfoType;
}

const AppInitialState: AppStateType = {
  isFullScreenModelOpen: true,
  svg: { self: undefined, height: 0, width: 0 },
  nodeInfo: { column: 0, row: 0, height: 0, nodes: [], width: 0 },
};

export default AppInitialState;
