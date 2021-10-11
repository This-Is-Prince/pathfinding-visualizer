import { VertexType } from "../types";

export class AStarNode {
  f: number;
  g: number;
  constructor(
    public self: VertexType,
    public parent: AStarNode | null,
    public weight: number,
    public heuristic: number
  ) {
    this.f = Number.MAX_VALUE;
    this.g = Number.MAX_VALUE;
  }
}
export class DijkstraNode {
  constructor(
    public self: VertexType,
    public wsf: number,
    public parent: DijkstraNode | null,
    public weight: number
  ) {}
}
export class GBFSNode {
  constructor(
    public self: VertexType,
    public parent: GBFSNode | null,
    public heuristic: number
  ) {}
}
