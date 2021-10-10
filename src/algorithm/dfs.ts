import { AlgorithmFunType, VertexType } from "../types";
import { unVisitedNeighbour } from "./bfs";

let column = 0,
  row = 0,
  visited: any = {},
  visitedArr: VertexType[],
  isTargetVertexFind = false,
  endVertex: VertexType;

const dfsMain = (vertex: VertexType) => {
  if (isTargetVertexFind) {
    return;
  }
  let unVisitedVertices = unVisitedNeighbour(vertex, row, column, visited);
  unVisitedVertices.forEach((nxtVertex) => {
    let { x, y } = nxtVertex;
    if (x === endVertex.x && y === endVertex.y) {
      isTargetVertexFind = true;
      visitedArr.push({ x, y });
      visited[`node-${x}-${y}`] = vertex;
    }
    if (!isTargetVertexFind) {
      if (!visited[`node-${x}-${y}`]) {
        visited[`node-${x}-${y}`] = vertex;
        visitedArr.push(nxtVertex);
        dfsMain(nxtVertex);
      }
    }
  });
};

const dfs: AlgorithmFunType = (
  noOfRow,
  noOfColumn,
  startVertex,
  targetVertex
) => {
  column = noOfColumn;
  row = noOfRow;
  visited = {};
  visitedArr = [];
  visitedArr.push(startVertex);
  visited[`node-${startVertex.x}-${startVertex.y}`] = true;
  isTargetVertexFind = false;
  endVertex = targetVertex;
  dfsMain(startVertex);
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
export default dfs;
