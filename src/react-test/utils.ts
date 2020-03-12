type BoxDescription = {
  color: string;
  left: number;
  top: number;
};

export const randomMax = (v: number) => Math.round(Math.random() * v);
export const randomChannel = () => randomMax(255);
export const generateRGB = () =>`rgb(${randomChannel()}, ${randomChannel()}, ${randomChannel()})`
export const generateBox = (): BoxDescription => ({
  color: generateRGB(),
  left: randomMax(96),
  top: randomMax(96)
});