import { VertexType } from "../mazes/dfs";

let column = 0,
  row = 0,
  visited: any = {};

const unVisitedNeighbour = (startVertex: VertexType) => {
  let x = startVertex.x,
    y = startVertex.y + 1;
  let vertices: VertexType[] = [];
  if (x >= 0 && x < row && y >= 0 && y < column && !visited[`node-${x}-${y}`]) {
    vertices.push({ x, y });
  }
  y = startVertex.y - 1;
  if (x >= 0 && x < row && y >= 0 && y < column && !visited[`node-${x}-${y}`]) {
    vertices.push({ x, y });
  }
  x = startVertex.x + 1;
  y = startVertex.y;
  if (x >= 0 && x < row && y >= 0 && y < column && !visited[`node-${x}-${y}`]) {
    vertices.push({ x, y });
  }
  x = startVertex.x - 1;
  if (x >= 0 && x < row && y >= 0 && y < column && !visited[`node-${x}-${y}`]) {
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
  tmp = { x: startVertex.x, y: endVertex.y };
  visited[`node-${tmp.x}-${tmp.y}`] = true;
  queue.push(tmp);
  let nodes: VertexType[] = [];
  while (queue.length != 0) {
    tmp = queue.shift()!;
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
