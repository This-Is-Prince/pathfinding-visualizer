import { AlgorithmFunType, VertexType } from "../types";
import { neighbour } from "./algo_utility_method";

const bfs: AlgorithmFunType = (
  noOfRow,
  noOfColumn,
  startVertex,
  targetVertex
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
    let neighbourVertices = neighbour(
      currVertex,
      noOfRow,
      noOfColumn,
      "bfs",
      [],
      visited
    ) as VertexType[];
    neighbourVertices.forEach((neighbourVertex) => {
      let { x, y } = neighbourVertex;
      if (x === targetVertex.x && y === targetVertex.y) {
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
  let { x, y } = targetVertex;
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
