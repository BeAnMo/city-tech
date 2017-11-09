import { createIndexes, presentTermsWithKey } from './data-processing/index';
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
        return this.Summaries.map(s => {
            return presentTermsWithKey(s.summary, s.id, this.RXS);
        }); 
    },
    get termsIndex(){
        return createIndexes(this.presentTerms);
    },
    get eachIndexLength(){ // this takes almost 500ms to process!!!!!
        return getLengths(this.termsIndex, this.inputs);
    }
    /*eachIndexLength: false,
    setIndexLength(){ // .reduce version ~480-500ms, for loop < 40ms  
        return this.eachIndexLength = getLengths(this.termsIndex);
    }*/
};


function getLengths(index, inputs){
    let result = [];

    for(let term in index){
        result.push({ 
            id: term, 
            label: term, 
            value: index[term].length,
            group: inputs[term].fromLanguage 
        });
    }

    return result;
}
