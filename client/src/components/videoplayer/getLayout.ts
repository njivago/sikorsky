export const getLayout = (clientsNumber: number = 1): { width: string; height: string }[] => {
  const pairs: number[][] = [];
  Array.from({ length: clientsNumber }).forEach((_, index: number, arr: undefined[]) => {
    if (index % 2 === 0) {
      pairs.push((arr as number[]).slice(index, index + 2));
    }
  });
  
  const rowsNumber: number = pairs.length;
  const height: string = `${100 / rowsNumber}%`;

  return pairs.flatMap((row: number[], index: number, arr: number[][]) => {
    if (index === arr.length - 1 && row.length === 1) {
      return [{
        width: '100%',
        height,
      }];
    }
    return row.map(() => ({
      width: '50%',
      height,
    }));
  });
}
