/**
 * @description Creates a single RX string
 * from multiple given metonyms.
 *
 * @param {[String]} metonyms
 *
 * @return {String} RX string
 */
export function createMetonymRXs([first, ...rest]) {
  return rest.reduce((base, metonym) => {
    return base + '|' + createPhraseRX(metonym);
  }, createPhraseRX(first));
}

/**
 * @description Creates an RX string to filter from
 * text. It can be at the start/end of a text or can be
 * surrounded by non-letter characters:
 * "hello", "/hello/", "hello1", will match but
 * "ahello" or "hellop" will not.
 *
 * @param {String} phrase
 *
 * @return {String} regexp String
 */
function createPhraseRX(phrase) {
  const hasSpace =
    phrase.indexOf(' ') > -1 ? phrase.split(' ').join('\\s') : phrase;

  return `(^|[^A-Za-z])${hasSpace}($|[^A-Za-z])`;
}
