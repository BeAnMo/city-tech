import { createIndexes, presentTermsWithKey } from './data-processing/index';

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
        return this.Summaries.map(s => {
            return presentTermsWithKey(s.summary, s.id, this.RXS);
        }); 
    },
    get termsIndex(){
        return createIndexes(this.presentTerms);
    },
    get eachIndexLength(){
        return Object.keys(this.termsIndex).map(term => {
            return [term, this.termsIndex[term].length];
        });
    },
};