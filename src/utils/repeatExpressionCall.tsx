/**
 * Returns an array of X many things
 */

export function repeatExpressionCall<Type>(
  number: number,
  expression: () => Type
) {
  [...Array(number)].map(expression);
}
