import { Node } from "./mst";

const stair = (row: number, column: number) => {
  let nodes: any = {};
  let i = row - 4,
    j = 3,
    isRowNeg = false;
  let id = 0;
  while (j < column) {
    nodes[`node-${i}-${j}`] = new Node(i, j, id);
    id++;
    if (i == 3) {
      isRowNeg = true;
    }
    if (isRowNeg) {
      i++;
    } else {
      i--;
    }
    if (i === row) {
      isRowNeg = false;
      i = i - 2;
    }
    j++;
  }
  return nodes;
};
export default stair;
