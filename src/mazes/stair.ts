import { VertexType } from "./dfs";
const stair = (
  row: number,
  column: number,
  startVertex: VertexType,
  targetVertex: VertexType
) => {
  let vertices: VertexType[] = [];
  let { x, y } = targetVertex;
  x = x - 1;
  let tRC = {
      r: x,
      c: y + 1,
    },
    tLC = {
      r: x,
      c: y - 1,
    },
    bRC = {
      r: x + 2,
      c: y + 1,
    },
    bLC = {
      r: x + 2,
      c: y - 1,
    };
  let isTRC = false,
    isTLC = false,
    isBRC = false,
    isBLC = false;
  let i = x,
    j = y;
  while (i >= 0 && j >= 0 && i < row && j < column) {
    vertices.push({ x: i, y: j });
    if (j < tRC.c && !isTRC) {
      j++;
      if (j === tRC.c) {
        isTRC = true;
      }
    } else if (i < bRC.r && !isBRC) {
      i++;
      if (i === bRC.r) {
        isBRC = true;
      }
    } else if (j > bLC.c && !isBLC) {
      j--;
      if (j === bLC.c) {
        isBLC = true;
      }
    } else if (i > tLC.r && !isTLC) {
      i--;
      if (i === tLC.r) {
        isTLC = true;
      }
    } else {
      isTLC = false;
      isTRC = false;
      isBLC = false;
      isBRC = false;
      i--;
      if (i >= 0 && j >= 0 && i < row && j < column) {
        vertices.push({ x: i, y: j });
      }
      i--;
      tRC = {
        r: tRC.r - 2,
        c: tRC.c + 2,
      };
      tLC = {
        r: tLC.r - 2,
        c: tLC.c - 2,
      };
      bRC = {
        r: bRC.r + 2,
        c: bRC.c + 2,
      };
      bLC = {
        r: bLC.r + 2,
        c: bLC.c - 2,
      };
    }
  }
  x = startVertex.x;
  y = startVertex.y;
  x = x - 1;
  (tRC = {
    r: x,
    c: y + 1,
  }),
    (tLC = {
      r: x,
      c: y - 1,
    }),
    (bRC = {
      r: x + 2,
      c: y + 1,
    }),
    (bLC = {
      r: x + 2,
      c: y - 1,
    });
  (isTRC = false), (isTLC = false), (isBRC = false), (isBLC = false);
  (i = x), (j = y);
  while (i >= 0 && j >= 0 && i < row && j < column) {
    vertices.push({ x: i, y: j });
    if (j < tRC.c && !isTRC) {
      j++;
      if (j === tRC.c) {
        isTRC = true;
      }
    } else if (i < bRC.r && !isBRC) {
      i++;
      if (i === bRC.r) {
        isBRC = true;
      }
    } else if (j > bLC.c && !isBLC) {
      j--;
      if (j === bLC.c) {
        isBLC = true;
      }
    } else if (i > tLC.r && !isTLC) {
      i--;
      if (i === tLC.r) {
        isTLC = true;
      }
    } else {
      isTLC = false;
      isTRC = false;
      isBLC = false;
      isBRC = false;
      i--;
      if (i >= 0 && j >= 0 && i < row && j < column) {
        vertices.push({ x: i, y: j });
      }
      i--;
      tRC = {
        r: tRC.r - 2,
        c: tRC.c + 2,
      };
      tLC = {
        r: tLC.r - 2,
        c: tLC.c - 2,
      };
      bRC = {
        r: bRC.r + 2,
        c: bRC.c + 2,
      };
      bLC = {
        r: bLC.r + 2,
        c: bLC.c - 2,
      };
    }
  }
  return vertices;
};
export default stair;
