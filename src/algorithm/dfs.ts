import { VertexType } from "../mazes/dfs";
import { unVisitedNeighbour } from "./bfs";

let column = 0,
  row = 0,
  visited: any = {},
  visitedArr: VertexType[],
  isEndVertexFind = false,
  endVertex: VertexType;

const dfsMain = (vertex: VertexType) => {
  if (isEndVertexFind) {
    return;
  }
  let { x, y } = vertex;
  if (x === endVertex.x && y === endVertex.y) {
    isEndVertexFind = true;
    return;
  }
  let unVisitedVertices = unVisitedNeighbour(vertex, row, column, visited);
  unVisitedVertices.forEach((nxtVertex) => {
    let { x, y } = nxtVertex;
    if (!isEndVertexFind) {
      if (!visited[`node-${x}-${y}`]) {
        visited[`node-${x}-${y}`] = vertex;
        visitedArr.push(nxtVertex);
        dfsMain(nxtVertex);
      }
    }
  });
};

const dfs = (
  r: number,
  c: number,
  startVertex: VertexType,
  targetVertex: VertexType
) => {
  column = c;
  row = r;
  visited = {};
  visitedArr = [];
  visitedArr.push(startVertex);
  visited[`node-${startVertex.x}-${startVertex.y}`] = true;
  isEndVertexFind = false;
  endVertex = targetVertex;
  dfsMain(startVertex);
  let pathArr: VertexType[] = [];
  let { x, y } = endVertex;
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
export default dfs;
