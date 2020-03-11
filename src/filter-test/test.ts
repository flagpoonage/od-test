import { createFilterFromDefinition } from './task';
import { FilterDefinition } from './definition';

describe('Filter Test', () => {

  describe('createFilterFromDefinition()', () => {
  
    it('generates an output function to be used in a filter', () => {
  
      const def: FilterDefinition<any> = { mode: 'ALL_MATCH', filters: [() => true] };
      const output = createFilterFromDefinition(def);

      expect(typeof output).toBe('function');
  
    });
  
    describe('when filtering a number array', () => {

      const numberSet = [5,10,15,20,25];
      
      const numberDefinition: FilterDefinition<number> = {
        mode: 'ANY_MATCH',
        filters: [
          (i: number) => i > 20,
          (i: number) => i < 10
        ]
      };
      
      const numberFilter = createFilterFromDefinition(numberDefinition);

      it('filters the number array correctly', () => {
        const number_results = numberSet.filter(numberFilter);
        expect(number_results).toEqual([5,25]);
      });
  
    });
  
    describe('when filtering a string array', () => {

      const stringSet = [
        'abcd',
        'abcdefg',
        'abcdefghijk',
        'bbcd',
        'bbcdefg',
        'bbcdefghijk'
      ];
      
      const stringDefinition: FilterDefinition<string> = {
        mode: 'ALL_MATCH',
        filters: [
          {
            mode: 'ANY_MATCH',
            filters: [
              (i: string) => i.length < 5,
              (i: string) => i.length > 10
            ]
          },
          (i: string) => i[0] === 'a'
        ]
      };

      const stringFilter = createFilterFromDefinition(stringDefinition);

      it('filters the string array correctly', () => {
        const string_results = stringSet.filter(stringFilter);
        expect(string_results).toEqual(['abcd', 'abcdefghijk']);
      });
  
    });
  
    describe('when filtering an object array', () => {
      type ItemType = {
        id: number,
        name: string;
        size: number;
      };

      const itemSet: ItemType[] = [
        { id: 1, size: 30, name: 'qwe' },
        { id: 2, size: 400, name: 'wer' },
        { id: 3, size: 30, name: 'ert' },
        { id: 4, size: 10, name: 'asd' },
        { id: 5, size: 200, name: 'qsc' },
        { id: 6, size: 500, name: 'qaz' },
        { id: 7, size: 50, name: 'zxc' },
        { id: 8, size: 800, name: 'ppp' }
      ];

      const itemDefinition: FilterDefinition<ItemType> = {
        mode: 'ANY_MATCH',
        filters: [
          {
            mode: 'ALL_MATCH',
            filters: [
              {
                mode: 'ANY_MATCH',
                filters: [
                  (item: ItemType) => item.id > 5,
                  (item: ItemType) => item.size < 50
                ]
              },
              (item: ItemType) => item.name.includes('a')
            ]
          },
          (item: ItemType) => item.name.includes('z'),
          (item: ItemType) => item.size > 500
        ]
      };

      const itemFilter = createFilterFromDefinition(itemDefinition);

      it('filters the object array correctly', () => {
        const itemResults = itemSet.filter(itemFilter);
        expect(itemResults).toEqual([
          { id: 4, size: 10, name: 'asd' },
          { id: 6, size: 500, name: 'qaz' },
          { id: 7, size: 50, name: 'zxc' },
          { id: 8, size: 800, name: 'ppp' }
        ]);
      });
    });
  });
});