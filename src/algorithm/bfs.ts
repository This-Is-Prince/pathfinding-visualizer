import { VertexType } from "../mazes/dfs";

let column = 0,
  row = 0,
  visited: any = {};

const unVisitedNeighbour = (startVertex: VertexType) => {
  let x = startVertex.x - 1,
    y = startVertex.y;
  let fill = document.getElementById(`node-${x}-${y}`)?.getAttribute("fill");
  let vertices: VertexType[] = [];
  if (
    fill !== "rgb(0, 34, 51)" &&
    fill !== "#002233" &&
    x >= 0 &&
    x < row &&
    y >= 0 &&
    y < column &&
    !visited[`node-${x}-${y}`]
  ) {
    vertices.push({ x, y });
  }
  x = startVertex.x;
  y = startVertex.y + 1;
  fill = document.getElementById(`node-${x}-${y}`)?.getAttribute("fill");
  if (
    fill !== "rgb(0, 34, 51)" &&
    fill !== "#002233" &&
    x >= 0 &&
    x < row &&
    y >= 0 &&
    y < column &&
    !visited[`node-${x}-${y}`]
  ) {
    vertices.push({ x, y });
  }
  x = startVertex.x + 1;
  y = startVertex.y;
  fill = document.getElementById(`node-${x}-${y}`)?.getAttribute("fill");
  if (
    fill !== "rgb(0, 34, 51)" &&
    fill !== "#002233" &&
    x >= 0 &&
    x < row &&
    y >= 0 &&
    y < column &&
    !visited[`node-${x}-${y}`]
  ) {
    vertices.push({ x, y });
  }
  x = startVertex.x;
  y = startVertex.y - 1;
  fill = document.getElementById(`node-${x}-${y}`)?.getAttribute("fill");
  if (
    fill !== "rgb(0, 34, 51)" &&
    fill !== "#002233" &&
    x >= 0 &&
    x < row &&
    y >= 0 &&
    y < column &&
    !visited[`node-${x}-${y}`]
  ) {
    vertices.push({ x, y });
  }
  return vertices;
};
const bfs = (
  r: number,
  c: number,
  startVertex: VertexType,
  endVertex: VertexType
) => {
  row = r;
  column = c;
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
    let unVisitedVertices = unVisitedNeighbour(tmp);
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
    if (parentVertex.x === startVertex.x && parentVertex.y === startVertex.y) {
      break;
    }
    pathArr.push(parentVertex);
    x = parentVertex.x;
    y = parentVertex.y;
  }
  console.log(pathArr);
  pathArr = pathArr.reverse();
  return { visitedArr, pathArr };
};
export default bfs;
