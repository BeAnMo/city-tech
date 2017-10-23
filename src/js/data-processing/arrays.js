/* Array, Array -> Array
    assumes both arrays are sorted
    - could take an additional arg:
        - AND, OR, NOT...
        allow for more complex queries  */
export function intersect(arr1, arr2){
    let result = [];
    let a1 = arr1;
    let a2 = arr2;

    while(a1.length !== 0 && a2.length !== 0){
        if(a1[0] === a2[0]){
            result.push(a1[0]);
            a1 = a1.slice(1);
            a2 = a2.slice(1);
        } else if(a1[0] < a2[0]){
            a1 = a1.slice(1);
        } else {
            a2 = a2.slice(1);
        }
    }
    
    return result;
}

/* Array -> Array
    returns array ids that are present in all given langs  */
export function multipleIntersect(terms, data){
    /* sorts langs by array size
        starting with smallest arrays means 
        intermediate results will be no bigger
        than smallest array */
    let sorted = terms.map((term) => {
        return data[term];
    }).sort((a, b) => {
        return a - b;
    });
    
    // first
    let result = sorted[0];
    // rest
    sorted = sorted.slice(1);
    
    while(sorted.length !== 0 && result.length !== 0){
        // intersect first & second - smallest arrays
        result = intersect(result, sorted[0]);
        sorted = sorted.slice(1);
    }
    
    return result;
}
