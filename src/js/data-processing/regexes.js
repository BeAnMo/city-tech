/* creates a single RX of multiple given metonyms */
export function createMetonymRXs(metonyms){
    return metonyms.reduce((base, metonym, index) => {
        if(index === 0){
            return base + createPhraseRX(metonym);
        } else {
            return base + '|' + createPhraseRX(metonym);
        }
    }, '');
}


/* creates a RX string to filter from text
   can be at start/end of a text
   can be surrounded by non-letter characters:
   'hello', '/hello/', ',hello1' will match,
   but not 'ahello' or 'hellop' */ 
function createPhraseRX(phrase){
    const hasSpace = phrase.indexOf(' ') > -1 ?
          phrase.split(' ').join('\\s') :
          phrase;
    
    return `(^|[^A-Za-z])${hasSpace}($|[^A-Za-z])`;   
}
