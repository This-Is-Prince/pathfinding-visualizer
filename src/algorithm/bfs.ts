import { VertexType } from "../types";

export const findNeighbour = (
  x: number,
  y: number,
  row: number,
  column: number,
  vertices: VertexType[],
  visited: any
) => {
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
};

export const unVisitedNeighbour = (
  vertex: VertexType,
  r: number,
  c: number,
  visited: any
) => {
  let vertices = [] as VertexType[];
  let x = vertex.x - 1,
    y = vertex.y;
  findNeighbour(x, y, r, c, vertices, visited);
  x = vertex.x;
  y = vertex.y + 1;
  findNeighbour(x, y, r, c, vertices, visited);
  y = vertex.y - 1;
  findNeighbour(x, y, r, c, vertices, visited);

  x = vertex.x + 1;
  y = vertex.y;
  findNeighbour(x, y, r, c, vertices, visited);
  return vertices;
};

const bfs = (
  r: number,
  c: number,
  startVertex: VertexType,
  endVertex: VertexType
) => {
  let visited = {} as any;
  let queue: VertexType[] = [];
  visited[`node-${startVertex.x}-${startVertex.y}`] = true;
  queue.push(startVertex);
  let visitedArr: VertexType[] = [];
  let isTargetVertexFind = false;
  while (queue.length != 0) {
    if (isTargetVertexFind) {
      break;
    }
    let currVertex = queue.shift()!;
    visitedArr.push(currVertex);
    let neighbourVertices = unVisitedNeighbour(currVertex, r, c, visited);
    neighbourVertices.forEach((neighbourVertex) => {
      let { x, y } = neighbourVertex;
      if (x === endVertex.x && y === endVertex.y) {
        isTargetVertexFind = true;
        visited[`node-${x}-${y}`] = currVertex;
        visitedArr.push(neighbourVertex);
      }
      if (!isTargetVertexFind) {
        if (!visited[`node-${x}-${y}`]) {
          visited[`node-${x}-${y}`] = currVertex;
          queue.push(neighbourVertex);
        }
      }
    });
  }
  let pathArr: VertexType[] = [];
  let { x, y } = endVertex;
  pathArr.push({ x, y });
  while (visited[`node-${x}-${y}`] !== true) {
    let parentVertex = visited[`node-${x}-${y}`];
    if (!parentVertex) {
      break;
    }
    pathArr.push(parentVertex);
    x = parentVertex.x;
    y = parentVertex.y;
  }
  pathArr.push({ x: startVertex.x, y: startVertex.y });
  pathArr = pathArr.reverse();
  return { visitedArr, pathArr };
};
export default bfs;
