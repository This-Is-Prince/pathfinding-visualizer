const makeEdges = (row: number, column: number) => {
  let edgesArray = [];
  let i = 0,
    j = 0;
  while (i < row) {
    if (j + 2 < column) {
      edgesArray.push({
        startNode: {
          x: i,
          y: j,
        },
        endNode: {
          x: i,
          y: j + 2,
        },
        weight: Math.floor(Math.random() * 101),
      });
    }
    if (i + 2 < column) {
      edgesArray.push({
        startNode: {
          x: i,
          y: j,
        },
        endNode: {
          x: i + 2,
          y: j,
        },
        weight: Math.floor(Math.random() * 101),
      });
    }
    j += 2;
    if (j >= column) {
      j = 0;
      i += 2;
    }
  }
  return edgesArray;
};

const mst = (row: number, column: number) => {
  let edgesArray = makeEdges(row, column);
  console.log(edgesArray);

  return edgesArray;
};
export default mst;
