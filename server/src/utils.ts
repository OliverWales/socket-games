export const getSparseRef = (x: number, y: number) => `${x}_${y}`;

export const getCoords = (s: string) => {
  const [x, y] = s.split("_");
  return [parseInt(x), parseInt(y)];
};
