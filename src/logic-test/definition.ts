/**
 * STRUCTURE
 * 
 * The following types show a recursive structure which defines
 * a set of rules to be used when filtering an array.
 */

// Basic filtering functiont type.
export type FilterFunction<T> = (item: T) => boolean;

export type FilterDefinition<T> = {
  mode: 'ALL_MATCH' | 'ANY_MATCH', // Specifies whether all filters should return true, or if one filter returning true is sufficient.
  filters: (FilterDefinition<T> | FilterFunction<T>)[]; // The list of filters, allows recursive structuring.
}

/**
 * EXAMPLE DEFINITION
 */

 const exampleDef: FilterDefinition<string> = {
   mode: 'ALL_MATCH',
   filters: [
     (item: string) => item.length > 10,
     {
       mode: 'ANY_MATCH',
       filters: [
         (item: string) => item[0].toLowerCase() === 'a',
         (item: string) => item[0].toUpperCase() === 'Z'
       ]
     }
   ]
 }

/**
 * EXPLANATION
 * 
 * We will attempt to descrive the defintion is pseudo-SQL first, as slightly more human readable version:
 * 
 * ---
 * 
 * Starting from the deepest definition block of the structure (exampleDef.filters[1]), there are two functions
 * on the filters property:
 * 
 * (item: string) => item[0].toLowerCase() === 'a',
 * (item: string) => item[0].toUpperCase() === 'Z'
 * 
 * These can be translated to
 * 
 * item LIKE 'a%'
 * item LIKE 'Z%'
 * 
 * 
 * The defintion block (exampleDef.filters[1]) also specified a `mode` property of "ANY_MATCH", which means, 
 * the entire block should return true, if ANY (1 or more) of those filters functions return true. This is the equivalent
 * of a logical or statement. So in pseudo-SQL, we would end up with something similar to:
 * 
 * (item LIKE 'a%' OR item LIKE 'Z%')
 * 
 * ---
 * 
 * Having defined the functionality of the inner definiton block (exampleDef.filters[1]) we can move up a level
 * in the hierarchy, and see that this block is a filter within a higher level defintion block (exampleDef.filters).
 * There is another filter function within this higher level defintion block (exampleDef.filters[0]):
 * 
 * (item: string) => item.length > 10
 * 
 * This can translate roughly in pseudo-SQL to 
 * 
 * LENGTH(item) > 10 
 * Now that we have the pseudo-SQL, we can easily 
 * At the top level defintion block (exampleDef) there is a mode property of "ALL_MATCH", which means, the entire
 * block should return true, if ALL of the filter functions above return true. This is equivalent to a logical and
 * statement. So we can put the entire definition together in pseudo-SQL like so:
 * 
 * LENGTH(item) > 10 AND (
 *   item LIKE 'a%' OR
 *   item LIKE 'Z%'
 * )
 * 
 * --- 
 * 
 * For a different view, we can see how the final SQL-statement above would translate to a javascript function:
 * 
 * (item: string) => item.length > 10 && (item[0] === 'a' || item[0] === 'Z')
 * 
 */

