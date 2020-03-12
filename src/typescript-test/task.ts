
/*

BACKGROUND: 

The function below takes an array, a filter function, and a 
mapping function, and returns an output array.

The array values are passed to the filter function first to
remove any values that do not match the predicate. The values
that are matched, are then passed to the mapping function to be
transformed. The output of the mapping function is returned to 
the caller of the filterMap function.

Here is an example of it's use. The following statement:

[1,2,3]
  .filter(a => a % 2 === 0)
  .map(b => b * 2)

Would translate to this:

filterMap(
  [1,2,3],
  a => a % 2 === 0,
  b => b * 2
);

--------------

TASK:

Using generics, define the typings for this function so that
all typescript errors and warnings are eliminated. For the 
best possible score to this question, implement it with no 
casts, and no usage of the 'any' type. The filterMap function
should be able to handle an array of any type, not just the 
EntityOne and EntityTwo types used below. The  return type of 
the filterMap function should be the same as that of the internal
mapFn.

*/

export const filterMap = (array, filterFn, mapFn) => {
  return array.reduce((acc, value, index) => {
    if (filterFn(value)) {
      acc.push(mapFn(value, index));
    }

    return acc;
  }, []);
};


//---------------------------------------
// DO NOT CHANGE THE CODE BELOW THIS LINE
//---------------------------------------

import { EntityOutput, arrayOne, arrayTwo } from './setup';

const resultsOne = filterMap(
  arrayOne,
  v => v.value > 10,
  (v, index) => ({ index, data: v } as EntityOutput)
);

const resultsTwo = filterMap(
  arrayTwo,
  v => v.type === 'b',
  (v, index) => ({ index, data: v } as EntityOutput)
);


