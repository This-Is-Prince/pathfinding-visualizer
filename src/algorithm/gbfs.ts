import { AlgorithmFunType, VertexType } from "../types";
import { PriorityQueue } from "./PriorityQueue";

interface VisitedType<T> {
  [key: string]: T;
}

const findNeighbour = (
  x: number,
  y: number,
  row: number,
  column: number,
  visited: VisitedType<Node>,
  targetVertex: VertexType,
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
        vertices.push(
          new Node(
            { x, y },
            null,
            Math.abs(x - targetVertex.x) + Math.abs(y - targetVertex.y) + weight
          )
        );
      }
    }
  }
};
const neighbour = (
  vertex: VertexType,
  row: number,
  column: number,
  visited: VisitedType<Node>,
  targetVertex: VertexType
) => {
  let vertices: Node[] = [];

  let x = vertex.x - 1,
    y = vertex.y;
  findNeighbour(x, y, row, column, visited, targetVertex, vertices);
  x = vertex.x;
  y = vertex.y + 1;
  findNeighbour(x, y, row, column, visited, targetVertex, vertices);

  y = vertex.y - 1;
  findNeighbour(x, y, row, column, visited, targetVertex, vertices);

  x = vertex.x + 1;
  y = vertex.y;
  findNeighbour(x, y, row, column, visited, targetVertex, vertices);

  return vertices;
};
class Node {
  constructor(
    public self: VertexType,
    public parent: Node | null,
    public heuristic: number
  ) {}
}
const gbfs: AlgorithmFunType = (
  noOfRow,
  noOfColumn,
  startVertex,
  targetVertex
) => {
  let visited: VisitedType<Node> = {};
  let visitedArr = [] as VertexType[];
  let pathArr = [] as VertexType[];
  let que = new PriorityQueue(
    (a: Node, b: Node) => {
      return a.heuristic - b.heuristic;
    },
    [],
    new Set<Node>()
  );
  let isTargetNodeFind = false;
  que.add(
    new Node(
      startVertex,
      null,
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
    let vertexNeighbour = neighbour(
      u.self,
      noOfRow,
      noOfColumn,
      visited,
      targetVertex
    );
    vertexNeighbour.forEach((v) => {
      let { x, y } = v.self;
      if (x === targetVertex.x && y === targetVertex.y) {
        isTargetNodeFind = true;
        v.parent = u;
        visited[`node-${x}-${y}`] = v;
        visitedArr.push(v.self);
      }
      if (!isTargetNodeFind) {
        if (!visited[`node-${x}-${y}`]) {
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
    parent = parent.parent!;
  }
  pathArr.reverse();
  return { visitedArr, pathArr };
};
export default gbfs;
