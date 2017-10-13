
async function getJSON(url){
    const fetched = await fetch(url, { mode: 'cors' });
    const json = await fetched.json();
    
    return json;
}


export {
    getJSON
};

