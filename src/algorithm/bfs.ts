import { SpecialNodeType } from "../components/Main";
import { VertexType } from "../mazes/dfs";

let visited: any = {};

export const unVisitedNeighbour = (
  vertex: VertexType,
  row: number,
  column: number,
  visited: any
) => {
  let vertices: VertexType[] = [];

  let x = vertex.x - 1,
    y = vertex.y;
  let isBlack: boolean, elm: HTMLElement;
  if (x >= 0 && x < row && y >= 0 && y < column) {
    elm = document.getElementById(`node-${x}-${y}`)!;
    isBlack =
      elm.classList.contains("black-node-1") ||
      elm.classList.contains("black-node");
    if (!isBlack && !visited[`node-${x}-${y}`]) {
      vertices.push({ x, y });
    }
  }
  x = vertex.x;
  y = vertex.y + 1;
  if (x >= 0 && x < row && y >= 0 && y < column) {
    elm = document.getElementById(`node-${x}-${y}`)!;
    isBlack =
      elm.classList.contains("black-node-1") ||
      elm.classList.contains("black-node");
    if (!isBlack && !visited[`node-${x}-${y}`]) {
      vertices.push({ x, y });
    }
  }
  y = vertex.y - 1;
  if (x >= 0 && x < row && y >= 0 && y < column) {
    elm = document.getElementById(`node-${x}-${y}`)!;
    isBlack =
      elm.classList.contains("black-node-1") ||
      elm.classList.contains("black-node");
    if (!isBlack && !visited[`node-${x}-${y}`]) {
      vertices.push({ x, y });
    }
  }
  x = vertex.x + 1;
  y = vertex.y;
  if (x >= 0 && x < row && y >= 0 && y < column) {
    elm = document.getElementById(`node-${x}-${y}`)!;
    isBlack =
      elm.classList.contains("black-node-1") ||
      elm.classList.contains("black-node");
    if (!isBlack && !visited[`node-${x}-${y}`]) {
      vertices.push({ x, y });
    }
  }

  return vertices;
};

const bfs = (
  r: number,
  c: number,
  startVertex: SpecialNodeType,
  endVertex: SpecialNodeType
) => {
  visited = {};
  let queue: VertexType[] = [],
    tmp: VertexType;
  tmp = { x: startVertex.x, y: startVertex.y };
  visited[`node-${tmp.x}-${tmp.y}`] = true;
  queue.push(tmp);
  let visitedArr: VertexType[] = [];
  while (queue.length != 0) {
    tmp = queue.shift()!;
    if (tmp.x === endVertex.x && tmp.y === endVertex.y) {
      break;
    }
    visitedArr.push(tmp);
    let unVisitedVertices = unVisitedNeighbour(tmp, r, c, visited);
    unVisitedVertices.forEach((vertex) => {
      if (!visited[`node-${vertex.x}-${vertex.y}`]) {
        visited[`node-${vertex.x}-${vertex.y}`] = tmp;
        queue.push(vertex);
      }
    });
  }
  let pathArr: VertexType[] = [];
  let x = endVertex.x,
    y = endVertex.y;
  while (visited[`node-${x}-${y}`] !== true) {
    let parentVertex = visited[`node-${x}-${y}`];
    if (!parentVertex) {
      break;
    }
    if (parentVertex.x === startVertex.x && parentVertex.y === startVertex.y) {
      break;
    }
    pathArr.push(parentVertex);
    x = parentVertex.x;
    y = parentVertex.y;
  }
  pathArr = pathArr.reverse();
  return { visitedArr, pathArr };
};
export default bfs;
