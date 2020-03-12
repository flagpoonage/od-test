export const randomMax = (v: number) => Math.round(Math.random() * v);
export const randomChannel = () => randomMax(255);
export const generateRGB = () =>`rgb(${randomChannel()}, ${randomChannel()}, ${randomChannel()})`