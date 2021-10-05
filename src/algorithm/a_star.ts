import { VertexType } from "../mazes/dfs";
import { PriorityQueue } from "./PriorityQueue";

const findNeighbour = (
  x: number,
  y: number,
  row: number,
  column: number,
  visited: any,
  targetVertex: VertexType,
  vertices: Node[]
) => {
  if (x >= 0 && x < row && y >= 0 && y < column) {
    let isBlack: boolean, elm: HTMLElement;
    elm = document.getElementById(`node-${x}-${y}`)!;
    isBlack =
      elm.classList.contains("black-node-1") ||
      elm.classList.contains("black-node");
    if (!isBlack) {
      if (visited[`node-${x}-${y}`]) {
        vertices.push(visited[`node-${x}-${y}`]);
      } else {
        let dataWeight = elm.getAttribute("data-weight");
        let weight = 1;
        if (dataWeight) {
          weight = parseInt(dataWeight);
        }
        vertices.push(
          new Node(
            { x, y },
            null,
            weight,
            Math.abs(x - targetVertex.x) + Math.abs(y - targetVertex.y)
          )
        );
      }
    }
  }
};
const neighbour = (
  vertex: VertexType,
  row: number,
  column: number,
  visited: any,
  targetVertex: VertexType
) => {
  let vertices: Node[] = [];

  let x = vertex.x - 1,
    y = vertex.y;
  findNeighbour(x, y, row, column, visited, targetVertex, vertices);
  x = vertex.x;
  y = vertex.y + 1;
  findNeighbour(x, y, row, column, visited, targetVertex, vertices);

  y = vertex.y - 1;
  findNeighbour(x, y, row, column, visited, targetVertex, vertices);

  x = vertex.x + 1;
  y = vertex.y;
  findNeighbour(x, y, row, column, visited, targetVertex, vertices);

  return vertices;
};
class Node {
  f: number;
  g: number;
  constructor(
    public self: VertexType,
    public parent: Node | null,
    public weight: number,
    public heuristic: number
  ) {
    this.f = Number.MAX_VALUE;
    this.g = Number.MAX_VALUE;
  }
}
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
      return a.f - b.f;
    },
    [],
    new Set<Node>()
  );
  let closeList = new PriorityQueue(
    (a: Node, b: Node) => {
      return a.f - b.f;
    },
    [],
    new Set<Node>()
  );
  let isTargetNodeFind = false;
  let start = new Node(startVertex, null, 0, 0);
  start.g = 0;
  start.f = 0;
  openList.add(start);
  visited[`node-${start.self.x}-${start.self.y}`] = start;
  while (!openList.isEmpty()) {
    let current = openList.get();
    if (isTargetNodeFind) {
      break;
    }
    let vertexNeighbour = neighbour(current.self, r, c, visited, targetVertex);
    vertexNeighbour.forEach((vertex) => {
      let { x, y } = vertex.self;
      if (!isTargetNodeFind) {
        if (x === targetVertex.x && y === targetVertex.y) {
          isTargetNodeFind = true;
          vertex.parent = current;
          visitedArr.push(vertex.self);
        } else if (!closeList.contains(vertex)) {
          let gNew = current.g + vertex.weight;
          let fNew = vertex.heuristic + gNew;
          if (vertex.f === Number.MAX_VALUE || vertex.f > fNew) {
            if (openList.contains(vertex)) {
              openList.remove(vertex);
            }
            vertex.f = fNew;
            vertex.g = gNew;
            vertex.parent = current;
            openList.add(vertex);
          }
        }
      }
      visited[`node-${x}-${y}`] = vertex;
    });
    closeList.add(current);
    visitedArr.push(current.self);
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

export default aStar;
