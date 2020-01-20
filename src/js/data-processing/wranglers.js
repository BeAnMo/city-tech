/**
 * @description Like Array.map
 */
export function* project(projection, docs) {
  for (const doc of docs) {
    yield projection(doc);
  }
}

export function* unwind(key, docs) {
  for (const doc of docs) {
    if (doc[key]) {
      for (const item of doc[key]) {
        yield Object.assign({}, doc, { [key]: item });
      }
    }
  }
}

export function at(doc, ...path) {
  let result = doc;

  for (const p of path) {
    result = result[p];

    if (result === undefined) {
      return undefined;
    }
  }

  return result;
}

/**
 * @param {Function} getItem
 * @param {String} idKey
 * @param {Iterable<{ String: String | Number }>} iter
 *
 * @return {{ String: String | Number }}
 */
export function invertedIndex(getItem, idKey, iter) {
  let results = {};

  for (const item of iter) {
    const key = item[idKey];
    const indexItem = getItem(item);

    results[key] ? results[key].push(indexItem) : (results[key] = [indexItem]);
  }

  return results;
}

export function reduce(proc, acc, iter) {
  let result = acc;

  for (const item of iter) {
    result = proc(acc, item);
  }

  return result;
}
