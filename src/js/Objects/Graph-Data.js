import { intersect } from '../data-processing/arrays';

const stringSort = (a, b) => a.localeCompare(b);

/**
 * @param {[String]} arr1
 * @param {[String]} arr2
 *
 * @return {Number}
 */
const intersectionLength = (arr1, arr2) => {
  const args = arr1.length > arr2.length ? [arr2, arr1] : [arr1, arr2];

  return intersect(stringSort, ...args).length;
};

export const GraphData = {
  graphSize: getClientSize(document.documentElement.clientWidth),
  graphNodes: false,

  get postedDate() {
    const date = this.response.Summaries.feed.updated['$t'];

    return formatDate(date ? new Date(date) : new Date());
  },

  get graphLinks() {
    const [terms, indexes] = sortIndex(this.termsIndex);

    return createLinks(terms, indexes);
  }
};

/**
 * @typedef {{ String: [String | Number] }} InvertedIndex
 * @param {[String]} terms
 * @param {InvertedIndex} results
 *
 * @return {[{ from: String, to: String, value: Number }]}
 */
function createLinks(terms, results) {
  const L = terms.length;
  let links = [];

  for (let i = 0; i < L; i++) {
    const first = terms[i];

    for (let j = i + 1; j < L; j++) {
      const target = terms[j];
      // until "C" regexp is more accurate
      if (!(first === 'C *' || target === 'C *')) {
        const shared = intersectionLength(results[first], results[target]);

        shared > 0 &&
          links.push({
            from: first,
            to: target,
            value: shared
          });
      }
    }
  }

  return links;
}

function sortIndex(indexes) {
  const keys = Object.keys(indexes);
  let result = {};

  for (const key of keys) {
    result[key] = indexes[key].sort(stringSort);
  }

  return [keys, result];
}

/**
 * @param {Number} docWidth
 *
 * @return {Number}
 */
function getClientSize(docWidth) {
  if (docWidth < 500) {
    return 300;
  } else if (docWidth < 600) {
    return 400;
  } else if (730 < docWidth < 1000) {
    return 500;
  } else {
    return 600;
  }
}

/**
 * @param {Date} d
 *
 * @return {String} YYYY-MM-DD
 */
function formatDate(d) {
  const year = d.getFullYear();
  const month = d.getMonth() + 1;
  const day = d.getDate();

  return `${year}-${below10(month)}-${below10(day)}`;
}

function below10(n) {
  return n < 10 ? '0' + n : n;
}
