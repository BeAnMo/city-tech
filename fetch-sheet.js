const FetchSheets = (() => {

    const OPTS = {
        mode: 'cors'
    }

    async function getJSON(url){
        var fetched = await fetch(url, OPTS);
        var json = await fetched.json();
        
        return json;
    }
    
    
    return {
        json: getJSON,
        docs: {
            json: 'String -> Promise'
        }
    };
})();
