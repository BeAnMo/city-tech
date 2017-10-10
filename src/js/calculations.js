const Calc = (() => {

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
    function GraphNode(term, total, neighbors){
        return {
            term,
            total,
            neighbors
        };
    }


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

    /* Array, Array -> Array
        assumes both arrays are sorted
        - could take an additional arg:
            - AND, OR, NOT...
            allow for more complex queries  */
    function intersect(arr1, arr2){
        var result = [];
        var a1 = arr1;
        var a2 = arr2;

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
    function multipleIntersect(terms, data){
        /* sorts langs by array size
           starting with smallest arrays means 
           intermediate results will be no bigger
           than smallest array */
        var sorted = terms.map((term) => {
            return data[term];
        }).sort((a, b) => {
            return a - b;
        });
        
        // first
        var result = sorted[0];
        // rest
        var sorted = sorted.slice(1);
        
        while(sorted.length !== 0 && result.length !== 0){
            // intersect first & second - smallest arrays
            result = intersect(result, sorted[0]);
            sorted = sorted.slice(1);
        }
        
        return result;
    }
    
    
    return {
        mergeTerms: mergeTerms,
        createGraph: createGraph,
        intersect: intersect
    };

})();
/* converts summaries from GSheets response:
   [...{ term1: id, term2: id }]
   in a single Object: 
   { term1: [...id], term2: [...id] } */ 

