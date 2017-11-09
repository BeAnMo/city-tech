import { extractPaths, createRegExp } from './data-processing/index';
import { SPECIAL_CASES } from './inputs';

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
    get TermInputs(){
        return createInputs(this.response.Terms);
    },

    get RXS(){
        return createRXS(this.Terms, this.TermInputs, SPECIAL_CASES);
    },
    get Terms(){
        return Object.keys(this.TermInputs);
    },
    allWithNoRefs(termsIndex){
        return this.Terms.reduce(filterWithNoRefs.bind(termsIndex), []); 
    },
};


/* from Terms sheet */
function createInputs(json){
    const entries = json.feed.entry;
    const inputs = extractPaths(
        entries,
        ['display', 'phrases', 'fromLanguage', 'category'],
        ['gsx$display', '$t'],
        ['gsx$phrases', '$t'],
        ['gsx$fromlanguage', '$t'],
        ['gsx$category', '$t']
    );

    return inputs.reduce((acc, i) => {
        const splitPhrases = i.phrases.split(',');
        const iFromLang = i.fromLanguage;
        const fromLang = iFromLang === 'TRUE' ? true :
                            iFromLang === 'FALSE' ? false : iFromLang;
        const resultObj = {
            [i.display]: {
                phrases: splitPhrases,
                fromLanguage: fromLang,
                category: i.category
            }
        };
        return Object.assign(acc, resultObj);
    }, {});
}

/* Array-of-Object, Object -> Array-of-Object
    returns [...{ Term: RegExp }] */
function createRXS(terms, termInputs, specialCases){
    return terms.map(t => {
        const term = t;
        const phrases = termInputs[t].phrases;

        return { lang: term, rx: createRegExp(phrases, specialCases) };
    });
}

/* filters terms that have no references 
   needed in main() */
function filterWithNoRefs(acc, term){
    // 'this is 'results' Object in main
    // this is an ugly hack, refactor
    return term in this ? acc : acc.concat(term);
}