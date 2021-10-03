export type VertexType = {
  x: number;
  y: number;
};
let nodes: any,
  visited: any,
  row = 0,
  column = 0;
const randomUnvisitedNeighbour = (startVertex: VertexType) => {
  let x = startVertex.x,
    y = startVertex.y + 2;
  let arr: VertexType[] = [];
  if (x >= 0 && x < row && y >= 0 && y < column && !visited[`node-${x}-${y}`]) {
    arr.push({ x, y });
  }
  y = startVertex.y - 2;
  if (x >= 0 && x < row && y >= 0 && y < column && !visited[`node-${x}-${y}`]) {
    arr.push({ x, y });
  }
  x = startVertex.x + 2;
  y = startVertex.y;
  if (x >= 0 && x < row && y >= 0 && y < column && !visited[`node-${x}-${y}`]) {
    arr.push({ x, y });
  }
  x = startVertex.x - 2;
  if (x >= 0 && x < row && y >= 0 && y < column && !visited[`node-${x}-${y}`]) {
    arr.push({ x, y });
  }
  if (arr.length === 0) {
    return null;
  } else if (arr.length === 1) {
    return arr[0];
  }
  let rnd = Math.floor(Math.random() * arr.length);
  return arr[rnd];
};
const randomUnvisitedNeighbourHorizontal = (startVertex: VertexType) => {
  let x = startVertex.x,
    y = startVertex.y + 2;
  if (x >= 0 && x < row && y >= 0 && y < column && !visited[`node-${x}-${y}`]) {
    return { x, y };
  }
  y = startVertex.y - 2;
  if (x >= 0 && x < row && y >= 0 && y < column && !visited[`node-${x}-${y}`]) {
    return { x, y };
  }
  x = startVertex.x + 2;
  y = startVertex.y;
  if (x >= 0 && x < row && y >= 0 && y < column && !visited[`node-${x}-${y}`]) {
    return { x, y };
  }
  x = startVertex.x - 2;
  if (x >= 0 && x < row && y >= 0 && y < column && !visited[`node-${x}-${y}`]) {
    return { x, y };
  }
  return null;
};
const randomUnvisitedNeighbourVertical = (startVertex: VertexType) => {
  let x = startVertex.x + 2,
    y = startVertex.y;
  if (x >= 0 && x < row && y >= 0 && y < column && !visited[`node-${x}-${y}`]) {
    return { x, y };
  }
  x = startVertex.x - 2;
  if (x >= 0 && x < row && y >= 0 && y < column && !visited[`node-${x}-${y}`]) {
    return { x, y };
  }
  x = startVertex.x;
  y = startVertex.y + 2;
  if (x >= 0 && x < row && y >= 0 && y < column && !visited[`node-${x}-${y}`]) {
    return { x, y };
  }
  y = startVertex.y - 2;
  if (x >= 0 && x < row && y >= 0 && y < column && !visited[`node-${x}-${y}`]) {
    return { x, y };
  }
  return null;
};

const randomizedDFS = (vertex: VertexType, which: string) => {
  visited[`node-${vertex.x}-${vertex.y}`] = true;
  let nxtVertex: VertexType | null = { x: 0, y: 0 };
  if (which === "recursive division (horizontal skew)") {
    nxtVertex = randomUnvisitedNeighbourHorizontal(vertex);
  } else if (which === "recursive division (vertical skew)") {
    nxtVertex = randomUnvisitedNeighbourVertical(vertex);
  } else {
    nxtVertex = randomUnvisitedNeighbour(vertex);
  }
  while (nxtVertex !== null) {
    nodes[`node-${vertex.x}-${vertex.y}`] = "n";
    nodes[
      `node-${(nxtVertex.x + vertex.x) / 2}-${(nxtVertex.y + vertex.y) / 2}`
    ] = "n";
    nodes[`node-${nxtVertex.x}-${nxtVertex.y}`] = "n";
    randomizedDFS(nxtVertex, which);
    if (which === "recursive division (horizontal skew)") {
      nxtVertex = randomUnvisitedNeighbourHorizontal(vertex);
    } else if (which === "recursive division (vertical skew)") {
      nxtVertex = randomUnvisitedNeighbourVertical(vertex);
    } else {
      nxtVertex = randomUnvisitedNeighbour(vertex);
    }
  }
};
export let findVertices = (r: number, c: number, nodes: any) => {
  let vertices = [] as VertexType[];
  for (let i = 0; i < r; i++) {
    for (let j = 0; j < c; j++) {
      if (!nodes[`node-${i}-${j}`]) {
        vertices.push({ x: i, y: j });
      }
    }
  }
  return vertices;
};
const dfs = (r: number, c: number, which: string) => {
  visited = {};
  nodes = {};
  row = r;
  column = c;
  randomizedDFS({ x: 0, y: 0 }, which);
  return findVertices(r, c, nodes);
};
export default dfs;
