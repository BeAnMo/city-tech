async function getJson(url) {
  const fetched = await fetch(url, { mode: 'cors' });
  const json = await fetched.json();

  return json;
}

/**
 * @typedef { Number | String | Boolean | Array | Object } JSON
 * @param {[String]} urls
 *
 * @return {Promise<JSON>}
 */
export function getJsonParallel(urls) {
  return Promise.all(urls.map(getJson));
}
