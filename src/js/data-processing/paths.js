/* Array-of-Object, ...String -> Array-of-Object 
    assumes all objects in array have the same keys */
export function extractPaths(objArr, newKeys, ...path){    
    return objArr.reduce((acc, obj) => {
        const objExists = extractFromPaths(obj, newKeys, ...path);
        const lastPath = path[path.length - 1];

        return objExists ? acc.concat(objExists) : acc;
    }, []);
}

/* Object, Array-of-String, ...Array-of-String -> Object 
    extracts values from an object from multiples paths: 
    [...String] 
    assumes newKeys.length === paths.length or newKeys is false */
export function extractFromPaths(obj, newKeys, ...paths){
    const len = paths.length;
    let result = {};
    
    for(let i = 0; i < len; i++){
        const objAtPath = recurPath(obj, paths[i]);
        const key = Object.keys(objAtPath)[0];

        // prevent same keys from overriding
        if(newKeys){
            Object.assign(result, { [newKeys[i]]: objAtPath[key] });
        } else if(key in result){
            Object.assign(result, { [key + '+' + i]: objAtPath[key] });
        } else {
            Object.assign(result, objAtPath);
        }
    }
    
    return result;
}

/* Object, Array-of-String -> Object
    retrieves the value of an object at the given path
    returns { String-X: object }
    where String-X is the key from the last index of 
    the given array */
function recurPath(obj, arr, lastKey=''){
    if(arr.length === 0){
        return { [lastKey]: obj };
    } else {
        return recurPath(obj[arr[0]], arr.slice(1), arr[0]);
    }
}
/*
//@START-TEST for paths
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
    
    const fp0 = extractFromPaths(t0[0], false, p0);
    const fp1 = extractFromPaths(t0[0], false, p0, p1);
    const fp2 = extractFromPaths(t0[0], false, p0, p1, p2);
    const fp3 = extractFromPaths(t0[0], false, p1, p1); // overriding paths
    const fp4 = extractFromPaths(t0[0], ['g', 'h'],p1, p1); // new keys

    console.assert(fp0.a === 1, 'extractFromPaths: !== 1');
    console.assert(fp1.a1 === 'weef', 'extractFromPaths: !== weef');
    console.assert(fp2.c1 === 'hello', 'extractFromPaths: !== hello');
    console.assert(fp3['a1+1'] === 'weef', 'extractFromPaths: !== weef');
    console.assert(fp4['h'] === 'weef', 'extractFromPaths: !== weef');

    const ex0 = extractPaths(t0, false, p0);
    const ex1 = extractPaths(t0, false, p0, p1);
    const ex2 = extractPaths(t0, false, p0, p1, p2);
    const ex3 = extractPaths(t0, ['g', 'h'], p1, p1);

    console.assert(ex0[2].a === 5, 'extractPaths: !== 5');
    console.assert(ex1[1].a1 === 'wiif', 'extractPaths: !== wiif');
    console.assert(ex2[0].c1 === 'hello', 'extractPaths: !== hello');
    console.assert(ex2[2].c1 === undefined, 'extractPaths: !== undefined');
    console.assert(ex3[0].g === 'weef', 'extractPaths: !== wiif');
    console.assert(ex3[2].g === 'wyyf', 'extractPaths: !== wyyf');
})();//@END-TEST
*/