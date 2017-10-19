/* creates an index of terms with their matching ids:
   {...{ term: [...id] }} */
function mergeTerms(objArr){
    return objArr.reduce((acc, terms) => {
        const keys = Object.keys(terms);
        let result = {};
        
        for(let i = 0; i < keys.length; i++){
            const term = keys[i];
            const id = terms[term];
            
            if(acc[term]){
                Object.assign(result, { [term]: [...acc[term], id] })
            } else {
                Object.assign(result, { [term]: [id] });
            }
        }
        
        return Object.assign(acc, result);
    }, {});
}

/* 
{
    term: String,
    total: Number,
    neighbors: [...{ term: String, totalShared: Number }]
}
*/
// unused with d3
function GraphNode(term, total, neighbors){
    return {
        term,
        total,
        neighbors
    };
}

// unused with d3
function createGraph(termsObj){
    var nodes = [];
    var terms = Object.keys(termsObj);
    var termsLen = terms.length;
    
    for(var i = 0; i < termsLen; i++){
        var neighbors = [];
        var term = terms[i];
        var ids = termsObj[term];
        
        for(var j = 0; j < termsLen; j++){
            var neighbor = terms[j];
            var neighborIds = termsObj[neighbor];
            
            if(neighbor !== term){
                var intersection = intersect(ids, neighborIds).length;
                
                if(intersection > 0){
                   neighbors.push({ [neighbor]: intersection }); 
                }     
            }
        }
        
        nodes.push(GraphNode(term, ids.length, neighbors));
    }
    
    return nodes;
}


/* Array-of-Object, ...String -> Array-of-Object */
function extractPaths(objArr, ...path){    
    return objArr.reduce((acc, obj) => {
        const objExists = extractFromPaths(obj, ...path);
        const lastPath = path[path.length - 1];

        return objExists ? acc.concat(objExists) : acc;
    }, []);
}

/* Object, ...Array-of-String -> Object */
function extractFromPaths(obj, ...paths){
    const len = paths.length;
    let result = {};
    
    for(let i = 0; i < len; i++){
        Object.assign(result, recurPath(obj, paths[i]));
    }
    
    return result;
}

// Object, Array-of-String -> Object 
function recurPath(obj, arr, lastKey=''){
    if(arr.length === 0){
        return { [lastKey]: obj };
    } else {
        return recurPath(obj[arr[0]], arr.slice(1), arr[0]);
    }
}

//@START-TEST
(() => {
    const t0 = [
        {a: 1, b: 2, c: {
            a1: 'weef',
            b1: {
                c1: 'hello'
            }
        }},
        {a: 3, b: 4, c: {
            a1: 'wiif',
            b1: 'yyf'
        }},
        {a:5, c: {
            a1: 'wyyf',
            b1: 'eef'
        }}
    ];
    
    const p0 = ['a'];
    const p1 = ['c', 'a1'];
    const p2 = ['c', 'b1', 'c1'];
    
    const rp0 = recurPath(t0[0], p0)
    const rp1 = recurPath(t0[0], p1);
    const rp2 = recurPath(t0[0], p2);
    
    console.assert(rp0.a === 1, 'recurPath: !== 1');
    console.assert(rp1.a1 === 'weef', 'recurPath: !== weef');
    console.assert(rp2.c1 === 'hello', 'recurPath: 1 === 1');
    
    const fp0 = extractFromPaths(t0[0], p0);
    const fp1 = extractFromPaths(t0[0], p0, p1);
    const fp2 = extractFromPaths(t0[0], p0, p1, p2);
    
    console.assert(fp0.a === 1, 'extractFromPaths: !== 1');
    console.assert(fp1.a1 === 'weef', 'extractFromPaths: !== weef');
    console.assert(fp2.c1 === 'hello', 'extractFromPaths: !== hello');
    
    const ex0 = extractPaths(t0, p0);
    const ex1 = extractPaths(t0, p0, p1);
    const ex2 = extractPaths(t0, p0, p1, p2);
    
    console.assert(ex0[2].a === 5, 'extractPaths: !== 5');
    console.assert(ex1[1].a1 === 'wiif', 'extractPaths: !== wiif');
    console.assert(ex2[0].c1 === 'hello', 'extractPaths: !== hello');
    console.assert(ex2[2].c1 === undefined, 'extractPaths: !== undefined');
})();


export {
    mergeTerms,
    extractPaths
};


