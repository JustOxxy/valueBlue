export const naturalSort = (a: string, b: string) => {
  const extractNumber = (str: string) => {
    const parts = str.split('-');
    return parseInt(parts[1], 10);
  };

  return extractNumber(a) - extractNumber(b);
};
