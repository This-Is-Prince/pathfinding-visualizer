import { AlgorithmFunType, VertexType } from "../types";
import { PriorityQueue } from "./PriorityQueue";

const findNeighbour = (
  x: number,
  y: number,
  row: number,
  column: number,
  visited: any,
  vertices: Node[]
) => {
  if (x >= 0 && x < row && y >= 0 && y < column) {
    let isBlack: boolean, elm: HTMLElement;
    elm = document.getElementById(`node-${x}-${y}`)!;
    isBlack =
      elm.classList.contains("black-node-1") ||
      elm.classList.contains("black-node");
    if (!isBlack) {
      if (visited[`node-${x}-${y}`]) {
        vertices.push(visited[`node-${x}-${y}`]);
      } else {
        let dataWeight = elm.getAttribute("data-weight");
        let weight = 1;
        if (dataWeight) {
          weight = parseInt(dataWeight);
        }
        vertices.push(new Node({ x, y }, Number.MAX_VALUE, null, weight));
      }
    }
  }
};

export const neighbour = (
  vertex: VertexType,
  row: number,
  column: number,
  visited: any
) => {
  let vertices: Node[] = [];
  let x = vertex.x - 1,
    y = vertex.y;
  findNeighbour(x, y, row, column, visited, vertices);
  x = vertex.x;
  y = vertex.y + 1;
  findNeighbour(x, y, row, column, visited, vertices);
  y = vertex.y - 1;
  findNeighbour(x, y, row, column, visited, vertices);
  x = vertex.x + 1;
  y = vertex.y;
  findNeighbour(x, y, row, column, visited, vertices);
  return vertices;
};

export class Node {
  constructor(
    public self: VertexType,
    public wsf: number,
    public parent: Node | null,
    public weight: number
  ) {}
}
export type CompareToFun<T> = (a: T, b: T) => number;

const dijkstra: AlgorithmFunType = (
  noOfRow,
  noOfColumn,
  startVertex,
  targetVertex
) => {
  let visited: any = {};
  let visit: any = {};
  let visitedArr = [] as VertexType[];
  let pathArr = [] as VertexType[];
  let que = new PriorityQueue<Node>((a, b) => a.wsf - b.wsf, [], new Set());
  let isTargetNodeFind = false;
  que.add(new Node(startVertex, 0, null, 0));
  while (!que.isEmpty()) {
    let u = que.get();
    let { x, y } = u.self;
    if (isTargetNodeFind) {
      break;
    }
    if (visit[`node-${x}-${y}`]) {
      continue;
    }
    visit[`node-${x}-${y}`] = true;
    visitedArr.push(u.self);
    let vertexNeighbour = neighbour(u.self, noOfRow, noOfColumn, visited);
    vertexNeighbour.forEach((v) => {
      let { x, y } = v.self;
      if (!isTargetNodeFind) {
        if (x === targetVertex.x && y === targetVertex.y) {
          isTargetNodeFind = true;
          v.parent = u;
          visited[`node-${x}-${y}`] = v;
          visitedArr.push(v.self);
        } else if (v.wsf === Number.MAX_VALUE || v.wsf > u.wsf + v.weight) {
          if (que.contains(v)) {
            que.remove(v);
          }
          v.wsf = u.wsf + v.weight;
          v.parent = u;
          que.add(v);
        }
      }
      visited[`node-${x}-${y}`] = v;
    });
  }
  let { x, y } = targetVertex;
  let parent = visited[`node-${x}-${y}`];
  while (parent) {
    pathArr.push(parent.self);
    parent = parent.parent;
  }
  pathArr.reverse();
  return { visitedArr, pathArr };
};
export default dijkstra;
