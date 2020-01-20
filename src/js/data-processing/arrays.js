/**
 * @description "cmp" return -1 if a < b, 0 if a == b, 1 if a > b
 * @param {Function} cmp X, Y -> Number< -1|0|1 >
 * @param {Array} small
 * @param {Array} large
 *
 * @return {Array}
 */
export function intersect(cmp, small, large) {
  let i = 0;
  let j = 0;
  let results = [];

  while (small[i] !== undefined && large[j] !== undefined) {
    const comparison = cmp(small[i], large[j]);

    if (comparison === 0) {
      results.push(small[i]);
      i++;
      j++;
    } else if (comparison === 1) {
      j++;
    } else {
      i++;
    }
  }

  return results;
}
