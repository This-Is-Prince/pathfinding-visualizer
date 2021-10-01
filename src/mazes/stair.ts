const stair = (row: number, column: number) => {
  let idArray: string[] = [];
  let i = row - 4,
    j = 3,
    isRowNeg = false;
  while (j < column) {
    idArray.push(`node-${i}-${j}`);
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
  return idArray;
};
export default stair;
