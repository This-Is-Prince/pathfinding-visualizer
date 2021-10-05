import { VertexType } from "../mazes/dfs";
import { PriorityQueue } from "./PriorityQueue";

const findNeighbour = (
  x: number,
  y: number,
  row: number,
  column: number,
  visited: any,
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
            weight,
            Math.abs(x - targetVertex.x) + Math.abs(y - targetVertex.y)
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
  visited: any,
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
  f: number;
  g: number;
  constructor(
    public self: VertexType,
    public parent: Node | null,
    public weight: number,
    public heuristic: number
  ) {
    this.f = Number.MAX_VALUE;
    this.g = Number.MAX_VALUE;
  }
}
const aStar = (
  r: number,
  c: number,
  startVertex: VertexType,
  targetVertex: VertexType
) => {
  let visited: any = {};
  let visitedArr = [] as VertexType[];
  let pathArr = [] as VertexType[];
  let openList = new PriorityQueue(
    (a: Node, b: Node) => {
      return a.heuristic - b.heuristic;
    },
    [],
    new Set<Node>()
  );
  let closeList = new PriorityQueue(
    (a: Node, b: Node) => {
      return a.heuristic - b.heuristic;
    },
    [],
    new Set<Node>()
  );
  let isTargetNodeFind = false;
  let start = new Node(
    startVertex,
    null,
    0,
    Math.abs(startVertex.x - targetVertex.x) +
      Math.abs(startVertex.y - targetVertex.y)
  );
  start.g = 0;
  start.f = start.g + start.heuristic;
  openList.add(start);
  while (!openList.isEmpty()) {
    let current = openList.get();
    let { x, y } = current.self;
    if (isTargetNodeFind) {
      break;
    }
    if (visited[`node-${x}-${y}`]) {
      continue;
    }
    visited[`node-${x}-${y}`] = current;
    visitedArr.push(current.self);

    let vertexNeighbour = neighbour(current.self, r, c, visited, targetVertex);
    vertexNeighbour.forEach((vertex) => {
      let { x, y } = vertex.self;
      if (x === targetVertex.x && y === targetVertex.y) {
        isTargetNodeFind = true;
        vertex.parent = current;
        visited[`node-${x}-${y}`] = vertex;
      }
      if (!isTargetNodeFind) {
        let totalWeight = vertex.weight + current.g;
        if (!openList.contains(vertex) && !closeList.contains(vertex)) {
          vertex.parent = current;
          vertex.g = totalWeight;
          vertex.f = totalWeight + vertex.heuristic;
          openList.add(vertex);
        } else if (totalWeight < vertex.g) {
          vertex.parent = current;
          vertex.g = totalWeight;
          vertex.f = totalWeight + vertex.heuristic;
          if (closeList.contains(vertex)) {
            closeList.remove(vertex);
            openList.add(vertex);
          }
        }
      }
    });
    closeList.add(current);
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

export default aStar;
