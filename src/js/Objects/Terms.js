import { createMetonymRXs } from '../data-processing/regexes';
import { SPECIAL_CASES } from '../inputs';

import { project, at, reduce } from '../data-processing/wranglers';

/* To be extended by the App 
Terms are:
{
    display: String, // Term
    phrases: [...String],
    fromLanguage: Boolean|Term,
    category: String
}

SPECIAL_CASES are hard coded for now
*/
export const Terms = {
  get TermInputs() {
    return createInputs(this.response.Terms, 'feed', 'entry');
  },

  get RXS() {
    return createRXS(this.Terms, this.TermInputs, SPECIAL_CASES);
  },
  get Terms() {
    return Object.keys(this.TermInputs);
  },
  allWithNoRefs(termsIndex) {
    return this.Terms.reduce(filterWithNoRefs.bind(termsIndex), []);
  }
};

function createInputs(json) {
  return reduce(
    (acc, i) => {
      const iFromLang = i.fromLanguage;
      const fromLang =
        iFromLang === 'TRUE' ? true : iFromLang === 'FALSE' ? false : iFromLang;

      acc[i.display] = {
        phrases: i.phrases.split(','),
        fromLanguage: fromLang,
        category: i.category
      };

      return acc;
    },
    {},
    project(
      doc => ({
        display: at(doc, 'gsx$display', '$t'),
        phrases: at(doc, 'gsx$phrases', '$t'),
        fromLanguage: at(doc, 'gsx$fromlanguage', '$t'),
        category: at(doc, '$gsx$category', '$t')
      }),
      at(json, 'feed', 'entry')
    )
  );
}

/* Array-of-Object, Object -> Array-of-Object
    returns [...{ Term: RegExp }] */
function createRXS(terms, termInputs, specialCases) {
  return terms.map(t => {
    return { lang: t, rx: createRegExp(termInputs[t].phrases, specialCases) };
  });
}

/* filters terms that have no references 
   needed in main() */
function filterWithNoRefs(acc, term) {
  // 'this is 'results' Object in main
  // this is an ugly hack, refactor
  return term in this ? acc : acc.concat(term);
}

/**
 * @param {[String]} phrases
 * @param {{ String: Boolean }} specialCases
 *
 * @return {RegExp}
 */
export function createRegExp(phrases, specialCases) {
  return phrases[0] in specialCases
    ? specialCases[phrases[0]]
    : new RegExp(createMetonymRXs(phrases), 'i');
}
