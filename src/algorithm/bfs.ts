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
  let nodes: VertexType[] = [];
  while (queue.length != 0) {
    tmp = queue.shift()!;
    if (tmp.x === endVertex.x && tmp.y === endVertex.y) {
      break;
    }
    nodes.push(tmp);
    let unVisitedVertices = unVisitedNeighbour(tmp);
    unVisitedVertices.forEach((vertex) => {
      if (!visited[`node-${vertex.x}-${vertex.y}`]) {
        visited[`node-${vertex.x}-${vertex.y}`] = true;
        queue.push(vertex);
      }
    });
  }
  return nodes;
};
export default bfs;
