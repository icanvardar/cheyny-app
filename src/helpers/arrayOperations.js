export const shuffleArray = (array) => {
  let tmpArr = array;

  for (let i = tmpArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = tmpArr[i];
    tmpArr[i] = tmpArr[j];
    tmpArr[j] = temp;
  }

  return tmpArr;
};

export const equals = (a, b) => JSON.stringify(a) === JSON.stringify(b);
