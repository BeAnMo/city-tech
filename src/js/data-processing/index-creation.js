/* creates an index of terms with their matching ids:
   {...{ term: [...id] }} */
export function mergeTerms(objArr){
    return objArr.reduce(createIndex, {});
}

/* Object, Object -> Object
    { term: [...id] } */
function createIndex(obj, terms){
    const keys = Object.keys(terms);
    let result = {};
    
    for(let i = 0; i < keys.length; i++){
        const term = keys[i];
        const id = terms[term];
        
        if(obj[term]){
            Object.assign(result, { [term]: [...obj[term], id] })
        } else {
            Object.assign(result, { [term]: [id] });
        }
    }
    
    return Object.assign(obj, result);
}
