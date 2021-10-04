import { VertexType } from "../mazes/dfs";
import { neighbour, Node } from "./dijkstra";
import { PriorityQueue } from "./PriorityQueue";

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
    0,
    null,
    10,
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
  console.log(visitedArr);
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
