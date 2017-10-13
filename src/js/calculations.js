/* creates an index of terms with their matching ids:
   {...{ term: [...id] }} */
function mergeTerms(objArr){
    return objArr.reduce((acc, terms) => {
        var keys = Object.keys(terms);
        var result = {};
        
        for(var i = 0; i < keys.length; i++){
            var term = keys[i];
            var id = terms[term];
            
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


export {
    mergeTerms
};


