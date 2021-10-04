import { VertexType } from "../mazes/dfs";
import { PriorityQueue } from "./PriorityQueue";
import { neighbour, Node } from "./dijkstra";
const gbfs = (
  r: number,
  c: number,
  startVertex: VertexType,
  targetVertex: VertexType
) => {
  let visited: any = {};
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
      0,
      null,
      10,
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
    let vertexNeighbour = neighbour(u.self, r, c, visited, targetVertex);
    vertexNeighbour.forEach((v) => {
      let { x, y } = v.self;
      if (x === targetVertex.x && y === targetVertex.y) {
        isTargetNodeFind = true;
        v.parent = u;
        visited[`node-${x}-${y}`] = v;
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
    parent = parent.parent;
  }
  pathArr.reverse();
  return { visitedArr, pathArr };
};
export default gbfs;
