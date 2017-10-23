
async function getJSON(url){
    const fetched = await fetch(url, { mode: 'cors' });
    const json = await fetched.json();
    
    return json;
}

async function getUrls(...urls){
    var promises = [];
    
    for(var i = 0; i < urls.length; i++){
        promises.push(getJSON(urls[i]));
    }
    
    let results = Promise.all(promises);
    
    return results;
}


export {
    getUrls
};

