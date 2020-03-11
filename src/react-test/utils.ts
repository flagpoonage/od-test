export const randomMax = (v: number) => Math.round(Math.random() * v);
export const randomChannel = () => randomMax(255);
export const randomPercent = () => randomMax(98); // Width and height are 2% so maxiumum is 98% to fully fit on screen.
export const generateRGB = () =>`rgb(${randomChannel()}, ${randomChannel()}, ${randomChannel()})`