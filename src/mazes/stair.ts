import { VertexType } from "./dfs";
const stair = (
  row: number,
  column: number,
  startVertex: VertexType,
  targetVertex: VertexType
) => {
  let vertices: VertexType[] = [];
  let { x: xS, y: yS } = startVertex;
  xS = xS - 1;
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
  let tRCS = {
      r: xS,
      c: yS + 1,
    },
    tLCS = {
      r: xS,
      c: yS - 1,
    },
    bRCS = {
      r: xS + 2,
      c: yS + 1,
    },
    bLCS = {
      r: xS + 2,
      c: yS - 1,
    };
  let isTRC = false,
    isTLC = false,
    isBRC = false,
    isBLC = false;
  let isTRCS = false,
    isTLCS = false,
    isBRCS = false,
    isBLCS = false;
  let i = x,
    j = y;
  let iS = xS,
    jS = yS;
  while (
    (i >= 0 && j >= 0 && i < row && j < column) ||
    (iS >= 0 && jS >= 0 && iS < row && jS < column)
  ) {
    if (i >= 0 && j >= 0 && i < row && j < column) {
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
    if (iS >= 0 && jS >= 0 && iS < row && jS < column) {
      vertices.push({ x: iS, y: jS });
      if (jS < tRCS.c && !isTRCS) {
        jS++;
        if (jS === tRCS.c) {
          isTRCS = true;
        }
      } else if (iS < bRCS.r && !isBRCS) {
        iS++;
        if (iS === bRCS.r) {
          isBRCS = true;
        }
      } else if (jS > bLCS.c && !isBLCS) {
        jS--;
        if (jS === bLCS.c) {
          isBLCS = true;
        }
      } else if (iS > tLCS.r && !isTLCS) {
        iS--;
        if (iS === tLCS.r) {
          isTLCS = true;
        }
      } else {
        isTLCS = false;
        isTRCS = false;
        isBLCS = false;
        isBRCS = false;
        iS--;
        if (iS >= 0 && jS >= 0 && iS < row && jS < column) {
          vertices.push({ x: iS, y: jS });
        }
        iS--;
        tRCS = {
          r: tRCS.r - 2,
          c: tRCS.c + 2,
        };
        tLCS = {
          r: tLCS.r - 2,
          c: tLCS.c - 2,
        };
        bRCS = {
          r: bRCS.r + 2,
          c: bRCS.c + 2,
        };
        bLCS = {
          r: bLCS.r + 2,
          c: bLCS.c - 2,
        };
      }
    }
  }
  x = Math.floor((startVertex.x + targetVertex.x) / 2);
  y = Math.floor((startVertex.y + targetVertex.y) / 2);
  vertices.push({ x, y });
  y = y - 1;
  vertices.push({ x, y });
  y = y + 2;
  vertices.push({ x, y });
  return vertices;
};
export default stair;
