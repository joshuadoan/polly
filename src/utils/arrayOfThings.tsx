/**
 * Returns an array of X many things
 */

export function arrayOfThings<Type>(number: number, expression: () => Type) {
  return [...Array(number)].map(expression);
}
