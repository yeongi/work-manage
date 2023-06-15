const sumMhMyList = (arr) =>
  arr.reduce((acc, cur) => {
    return acc + cur.INP_MH;
  }, 0);

export default sumMhMyList;
