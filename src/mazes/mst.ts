export class Node {
  constructor(public x: number, public y: number, public id: number) {}
}
class Edge {
  constructor(public src: Node, public des: Node, public weight: number) {}
}
class Subset {
  constructor(public parent: number, public rank: number) {}
}

const makesNodes = (row: number, column: number) => {
  let i = 0,
    j = 0;
  let nodes: any = {};
  let id = 0;
  while (i < row) {
    nodes[`node-${i}-${j}`] = new Node(i, j, id);
    id++;
    j += 2;
    if (j >= column) {
      j = 0;
      i += 2;
    }
  }
  return nodes;
};
const makeEdges = (row: number, column: number) => {
  let edgesArray: Edge[] = [];
  let i = 0,
    j = 0,
    noOfNodes = 0,
    nodes = makesNodes(row, column);
  while (i < row) {
    noOfNodes++;
    let rootNode = nodes[`node-${i}-${j}`];
    if (j + 2 < column) {
      let rightNode = nodes[`node-${i}-${j + 2}`];
      edgesArray.push(
        new Edge(rootNode, rightNode, Math.floor(Math.random() * 101))
      );
    }
    if (i + 2 < row) {
      let bottomNode = nodes[`node-${i + 2}-${j}`];
      edgesArray.push(
        new Edge(rootNode, bottomNode, Math.floor(Math.random() * 101))
      );
    }
    j += 2;
    if (j >= column) {
      j = 0;
      i += 2;
    }
  }
  return { edgesArray, noOfNodes, nodes };
};

const find = (subsets: Subset[], i: number) => {
  if (subsets[i].parent !== i) {
    subsets[i].parent = find(subsets, subsets[i].parent);
  }
  return subsets[i].parent;
};

const union = (subsets: Subset[], x: number, y: number) => {
  let xRoot = find(subsets, x);
  let yRoot = find(subsets, y);
  if (subsets[xRoot].rank < subsets[yRoot].rank) {
    subsets[xRoot].parent = yRoot;
  } else if (subsets[xRoot].rank > subsets[yRoot].rank) {
    subsets[yRoot].parent = xRoot;
  } else {
    subsets[yRoot].parent = xRoot;
    subsets[xRoot].rank += 1;
  }
};

const mst = (row: number, column: number) => {
  let { edgesArray, noOfNodes, nodes } = makeEdges(row, column);
  let e = 0,
    i = 0;
  edgesArray.sort((a, b) => {
    return a.weight > b.weight ? 1 : a.weight < b.weight ? -1 : 0;
  });
  let subsets: Subset[] = [];
  for (i = 0; i < noOfNodes; ++i) {
    subsets[i] = new Subset(i, 0);
  }
  i = 0;
  while (e < noOfNodes - 1) {
    let nxt_edge = edgesArray[i++],
      src = nxt_edge.src,
      des = nxt_edge.des,
      x = find(subsets, src.id),
      y = find(subsets, des.id);
    if (x !== y) {
      e++;
      let midX = (src.x + des.x) / 2,
        midY = (src.y + des.y) / 2;
      nodes[`node-${midX}-${midY}`] = new Node(midX, midY, 0);
      union(subsets, x, y);
    }
  }
  return nodes;
};
export default mst;
