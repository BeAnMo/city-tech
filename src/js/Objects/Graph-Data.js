import { intersect } from '../data-processing/index';

export const GraphData = {
    graphSize: getClientSize(document.documentElement.clientWidth),
    
    get postedDate(){
        const date = this.response.Summaries.feed.updated['$t'];
        return date ? formatDate(new Date(date)) : formatDate(new Date());
    },
    graphNodes: false,
    /*get graphNodes(){
        return createNodes(this.termsIndex);
    },*/
    get graphLinks(){
        return createLinks(this.termsIndex);
    },
};


// reused TERMS_INDEX.eachIndexLength instead
/* creates nodes for graph */
function createNodes(results){
    const terms = Object.keys(results);
  
    return terms.map(term => {
        //return { term: term, size: results[term].length }; for d3
        return { id: term, label: term, value: results[term].length };
    });
}

// 11ms or roughly half the time of createLinks1
function createLinks(results){
    const byIncr = (a, b) => a > b;
    let terms = Object.keys(results);
    let links = [];
    
    while(terms.length > 0){
        const first = terms[0];
        const rest = terms.slice(1);
        const sourceIds = results[first].sort(byIncr);

        for(let i = 0; i < rest.length; i++){
            const target = rest[i];
            const targetIds = results[target].sort(byIncr);
            const shared = intersect(sourceIds, targetIds).length;
        
            // until "C" regexp is more accurate
            const c_test = first === 'C *' || target === 'C *' ? false : true;
            if(target !== first && shared > 0 && c_test){
                //links.push({ source: first, target, shared });
                links.push({ from: first, to: target, value: shared });
            }
        }

        terms = terms.slice(1);
    }    
    
    return links;
}

//@START-TEST
(() => {
    const t0 = {
        Scala: [ "d996ecb107d95f5e" ],
        Python: ["1a8db8794d09a479", "22264e0253a9351b", "2973bbaa38b591bd", "2d865695d82ae324", "4ad674d054f4bbf1", "57b44a3efb8f140f", "76ad4673f873412e", "7aae7e244f359744", "91a7f3f9f500fd19", "9d937cc790aabc39"],
        Java: ["04d4a774fe2bd693", "060564ecba2e71e2", "0696f3c1db4ea2b7"],
        'Go *': ["04d4a774fe2bd693", "183f4803b7ba8f51", "2e05678631f51cf4"],
        WhatLang: ["1a8db8794d09a479", "76ad4673f873412e", "7aae7e244f359744"]
    };
    
    const tests = [
        intersect(t0.Scala, t0.Python).length === 0,
        intersect(t0.Java, t0['Go *']).length === 1,
        intersect(t0.WhatLang, t0.Python).length === 3
    ];
    
    let total = tests.length;
    let passed = 0;
    
    console.log('---- MODULE TEST: GraphData ----');
    
    tests.forEach((t, i) => {
        console.assert(t, `tests[${i}]`);
        
        if(t){
            passed += 1;
        }
    });
    
    console.log(`${passed} out of ${total} tests passed`);
    console.log('----------------------------');
})();
//@END-TEST

/* gets the size of the client's browser window */
function getClientSize(docWidth){
    if(docWidth < 500){
        return 300;
    } else if(docWidth < 600){ 
        return 400;
    } else if(730 < docWidth < 1000){
        return 500;
    } else {
        return 600;
    }
}

/* YYYY-MM-DD */
function formatDate(d){
    const year = d.getFullYear();
    const month = d.getMonth() + 1;
    const day = d.getDate();
    const below10 = n => n < 10 ? '0' + n : n;
    
    return `${year}-${below10(month)}-${below10(day)}`;
}