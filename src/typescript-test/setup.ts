export type EntityOne = {
  name: string;
  value: number;
};

export type EntityTwo = {
  type: 'a' | 'b',
  description: string
};

export type EntityOutput = {
  index: number,
  data: EntityOne | EntityTwo;
}

export const arrayOne: EntityOne[] = [
  { name: 'test1', value: 10 },
  { name: 'test2', value: 20 },
  { name: 'test3', value: 30 }
];

export const arrayTwo: EntityTwo[] = [
  { type: 'a', description: 'type of a' },
  { type: 'a', description: 'type of a' },
  { type: 'b', description: 'type of b' },
  { type: 'b', description: 'type of b' }
];