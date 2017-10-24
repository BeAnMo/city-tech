/* Array-of-Object -> Object 
    takes an array of shape: [...{ String-X: String-Y }] 
    return an object of shape: { ...String-X: [...String-Y] } */
export function objectArrayToObject(objArr){
    return objArr.reduce(stringValuesToArray, {});
}

// marginally faster?
export function objectArrayToObject2(objArr){
    let result = {};

    for(let i = 0; i < objArr.length; i++){
        stringValuesToArray(result, objArr[i]);
    }

    return result;
}

/* Object, Object -> Object
    takes an object of  { String-X: String-Y } -> { String-X: [...String-Y] }
    and assigns it to the accumulator: {...}
    if the key is not present, it adds
    a the new key and an array containing the single value
    otherwise it appends the value to the existing array
    at the key */
function stringValuesToArray(acc, obj){
    const keys = Object.keys(obj);
    const len = keys.length;
    let result = {};
    
    for(let i = 0; i < len; i++){
        const key = keys[i];
        const value = obj[key];
        
        if(acc[key]){
            Object.assign(result, { [key]: [...acc[key], value] });
        } else {
            Object.assign(result, { [key]: [value] });
        }
    }
    
    return Object.assign(acc, result);
}

//@START-TEST
(() => {
    const acc = { a: [3, 5], c: [1,2] };
    const t0 = { a: 1, b: 2, c:3 };
    
    const toTest = stringValuesToArray;

    console.assert(toTest({}, t0).c[0] === 3, 'stringValuesToArray: 3');
    console.assert(toTest(acc, t0).c[2] === 3, 'stringValuesToArray: 3');
    console.assert(toTest({}, t0).d === undefined, 'stringValuesToArray: 3');
    console.assert(toTest(acc, t0).b[0] === 2, 'stringValuesToArray: 3');
})();//@END-TEST