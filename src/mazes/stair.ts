import { VertexType } from "./dfs";
import { Node } from "./mst";

const stair = (row: number, column: number) => {
  let vertices: VertexType[] = [];
  let i = row - 4,
    j = 3,
    isRowNeg = false;
  while (j < column) {
    vertices.push({ x: i, y: j });
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
  return vertices;
};
export default stair;
