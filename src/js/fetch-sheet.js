
const OPTS = {
    mode: 'cors'
}

async function getJSON(url){
    var fetched = await fetch(url, OPTS);
    var json = await fetched.json();
    
    return json;
}


export {
    getJSON
};

