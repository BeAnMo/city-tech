import { unwind, invertedIndex } from '../data-processing/wranglers';

// termsIndex & eachIndexLength are the major time sinks
// both are ~30ms to calculate
/* to be extended by App
TermIndex:
{
    ...
    Term: [...ID],
    ...
}
*/
export const TermsIndex = {
  get presentTerms() {
    const present = summary => presentTerms(summary, this.RXS);

    return this.Summaries.map(s => {
      return {
        id: s.id,
        terms: present(s.summary)
      };
    });
  },
  get termsIndex() {
    const unwound = unwind('terms', this.presentTerms);

    return invertedIndex(({ id }) => id, 'terms', unwound);
  },
  get eachIndexLength() {
    // this takes almost 500ms to process!!!!!
    return getLengths(this.termsIndex, this.inputs);
  }
};

/**
 * @param {String} txt
 * @param {[{ lang: String, rx: RegExp }]} rxs
 *
 * @return {[String]}
 */
function presentTerms(txt, rxs) {
  return rxs.filter(({ rx }) => rx.test(txt)).map(({ lang }) => lang);
}

function getLengths(index, inputs) {
  const keys = Object.keys(index);
  let results = [];

  for (const key of keys) {
    results.push({
      id: key,
      label: key,
      value: index[key].length,
      group: inputs[key].fromLanguage
    });
  }

  return results;
}
