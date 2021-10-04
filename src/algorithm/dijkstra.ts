import { VertexType } from "../mazes/dfs";
import { PriorityQueue } from "./PriorityQueue";
export const neighbour = (
  vertex: VertexType,
  row: number,
  column: number,
  visited: any,
  targetVertex: VertexType
) => {
  let vertices: Node[] = [];

  let x = vertex.x - 1,
    y = vertex.y;
  let isBlack: boolean, elm: HTMLElement;
  if (x >= 0 && x < row && y >= 0 && y < column) {
    elm = document.getElementById(`node-${x}-${y}`)!;
    isBlack =
      elm.classList.contains("black-node-1") ||
      elm.classList.contains("black-node");
    if (!isBlack) {
      if (visited[`node-${x}-${y}`]) {
        vertices.push(visited[`node-${x}-${y}`]);
      } else {
        vertices.push(
          new Node(
            { x, y },
            99999,
            null,
            10,
            Math.abs(x - targetVertex.x) + Math.abs(y - targetVertex.y)
          )
        );
      }
    }
  }
  x = vertex.x;
  y = vertex.y + 1;
  if (x >= 0 && x < row && y >= 0 && y < column) {
    elm = document.getElementById(`node-${x}-${y}`)!;
    isBlack =
      elm.classList.contains("black-node-1") ||
      elm.classList.contains("black-node");
    if (!isBlack) {
      if (visited[`node-${x}-${y}`]) {
        vertices.push(visited[`node-${x}-${y}`]);
      } else {
        vertices.push(
          new Node(
            { x, y },
            99999,
            null,
            10,
            Math.abs(x - targetVertex.x) + Math.abs(y - targetVertex.y)
          )
        );
      }
    }
  }
  y = vertex.y - 1;
  if (x >= 0 && x < row && y >= 0 && y < column) {
    elm = document.getElementById(`node-${x}-${y}`)!;
    isBlack =
      elm.classList.contains("black-node-1") ||
      elm.classList.contains("black-node");
    if (!isBlack) {
      if (visited[`node-${x}-${y}`]) {
        vertices.push(visited[`node-${x}-${y}`]);
      } else {
        vertices.push(
          new Node(
            { x, y },
            99999,
            null,
            10,
            Math.abs(x - targetVertex.x) + Math.abs(y - targetVertex.y)
          )
        );
      }
    }
  }
  x = vertex.x + 1;
  y = vertex.y;
  if (x >= 0 && x < row && y >= 0 && y < column) {
    elm = document.getElementById(`node-${x}-${y}`)!;
    isBlack =
      elm.classList.contains("black-node-1") ||
      elm.classList.contains("black-node");
    if (!isBlack) {
      if (visited[`node-${x}-${y}`]) {
        vertices.push(visited[`node-${x}-${y}`]);
      } else {
        vertices.push(
          new Node(
            { x, y },
            99999,
            null,
            10,
            Math.abs(x - targetVertex.x) + Math.abs(y - targetVertex.y)
          )
        );
      }
    }
  }

  return vertices;
};

export class Node {
  f: number;
  g: number;
  constructor(
    public self: VertexType,
    public wsf: number,
    public parent: Node | null,
    public weight: number,
    public heuristic: number
  ) {
    this.f = Number.MAX_VALUE;
    this.g = Number.MAX_VALUE;
  }
}
export type CompareToFun = (a: Node, b: Node) => number;

const dijkstra = (
  r: number,
  c: number,
  startVertex: VertexType,
  targetVertex: VertexType
) => {
  let visited: any = {};
  let visitedArr = [] as VertexType[];
  let pathArr = [] as VertexType[];
  let que = new PriorityQueue(
    (a: Node, b: Node) => {
      return a.wsf - b.wsf;
    },
    [],
    new Set<Node>()
  );
  let isTargetNodeFind = false;
  que.add(
    new Node(
      startVertex,
      0,
      null,
      10,
      Math.abs(startVertex.x - targetVertex.x) +
        Math.abs(startVertex.y - targetVertex.y)
    )
  );
  while (!que.isEmpty()) {
    let u = que.get();
    let { x, y } = u.self;
    if (isTargetNodeFind) {
      break;
    }
    if (visited[`node-${x}-${y}`]) {
      continue;
    }
    visited[`node-${x}-${y}`] = u;
    visitedArr.push(u.self);
    let vertexNeighbour = neighbour(u.self, r, c, visited, targetVertex);
    vertexNeighbour.forEach((v) => {
      let { x, y } = v.self;
      if (x === targetVertex.x && y === targetVertex.y) {
        isTargetNodeFind = true;
        v.parent = u;
        visited[`node-${x}-${y}`] = v;
      }
      if (!isTargetNodeFind) {
        if (v.wsf > u.wsf + v.weight) {
          if (que.contains(v)) {
            que.remove(v);
          }
          v.wsf = u.wsf + v.weight;
          v.parent = u;
          que.add(v);
        }
      }
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
