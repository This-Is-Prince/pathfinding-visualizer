type VertexType = {
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

const randomizedDFS = (vertex: VertexType) => {
  visited[`node-${vertex.x}-${vertex.y}`] = true;
  let nxtVertex = randomUnvisitedNeighbour(vertex);
  while (nxtVertex !== null) {
    nodes[`node-${vertex.x}-${vertex.y}`] = "n";
    nodes[
      `node-${(nxtVertex.x + vertex.x) / 2}-${(nxtVertex.y + vertex.y) / 2}`
    ] = "n";
    nodes[`node-${nxtVertex.x}-${nxtVertex.y}`] = "n";
    randomizedDFS(nxtVertex);
    nxtVertex = randomUnvisitedNeighbour(vertex);
  }
};

const dfs = (r: number, c: number) => {
  visited = {};
  nodes = {};
  row = r;
  column = c;
  randomizedDFS({ x: 0, y: 0 });
  return nodes;
};
export default dfs;