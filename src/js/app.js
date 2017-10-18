import { mergeTerms } from './calculations';
import { getJSON } from './fetch-sheet';
import { presentTermsWithKey, TERMS } from './words-play';
import { ResultsTable, NoRefsList } from './components';
import { Graph, createNodes, createLinks } from './graph';

const SS_ID = '1dtZyUAobcWC6yYbdsR1_Oww29XCbEUMABVD20w4gIpI';
const SS_URL = `https://spreadsheets.google.com/feeds/list/${SS_ID}/2/public/full?alt=json`;


/* YYYY-MM-DD */
function formatDate(d){
    const year = d.getFullYear();
    const month = d.getMonth() + 1;
    const day = d.getDate();
    const below10 = n => n < 10 ? '0' + n : n;
    
    return `${year}-${below10(month)}-${below10(day)}`;
}

/* retrieves only the id & summary from GSheets response:
   { id: String, summary: String } */
function createSummaries(json){
    const entries = json.feed.entry;
    
    return entries.map(e => {
        return {
            id: e['gsx$id']['$t'],
            summary: e['gsx$summary']['$t']
        };
    });
}

function createSummaries2(json){
    const entries = json.feed.entry;

    return extractFromObjectArray(enties, )
}

/* Array-of-Object, ...String -> Array-of-Object */
function extractFromObjectArrayPath(objArr, ...path){    
    return objArr.reduce((acc, obj) => {
        const objExists = valueAtPath(obj, ...path);
        const lastPath = path[path.length - 1];

        return objExists ? acc.concat({ [lastPath]: objExists }) : acc;
    }, []);
}

/* Object, ...String -> Object 
   dives into an object and retrieves a value at a given path:
   object[p1][p2][pn]...*/
function valueAtPath(obj, ...path){
    const applyPath = (obj, path) => obj[path];
    
    return applyPath.apply(null, [obj, ...path]);
}


/* filters terms that have no references 
   needed in main() */
function filterWithNoRefs(acc, term){
    // 'this is 'results' Object in main
    return term in this ? acc : acc.concat(term);
}


/* gets the size of the client's browser window */
function getClientSize(docWidth){
    if(docWidth < 730){
        return 300;
    } else if(730 < docWidth < 1000){
        return 450;
    } else {
        return 600;
    }
}


/* Object for working with app in web console: 'App' */
export const App = {

    // unfiltered GSheets response
    response: {},
    set ajax(json){
        return Object.assign(this.response, json);
    },
    
    // filtered response data
    get data(){
        return createSummaries(this.response);
    },
    
    // DOM Objects
    table: document.getElementById('resultsTable'),
    graph: document.getElementById('resultsGraph'),
    noRefsList: document.getElementById('noRefsList'),
      
    // app data
    graphSize: getClientSize(document.documentElement.clientWidth),
    allTermStrings: TERMS.slice(0),
    
    get postedDate(){
        const date = this.response.feed.updated['$t'];
        return date ? formatDate(new Date(date)) : formatDate(new Date());
    },
    get totalSummaries(){
        return this.data.length;
    },
    get presentTerms() {
        return this.data.map(s => {
            return presentTermsWithKey(s.summary, s.id);
        }); 
    },
    get termsIndex(){
        return mergeTerms(this.presentTerms);
    },
    get eachIndexLength(){
        return Object.keys(this.termsIndex).map(term => {
            return [term, this.termsIndex[term].length];
        });
    },
    get allWithNoRefs(){
        return this.allTermStrings.reduce(filterWithNoRefs.bind(this.termsIndex), []); 
    },
    get graphNodes(){
        return createNodes(this.termsIndex);
    },
    get graphLinks(){
        return createLinks(this.termsIndex);
    },

    // for REPL debugging
    debug: {
    }
};


/* initialize app */
(() => {
    const initAndRender = json => {
        App.ajax = json;
        App.graph.innerHTML = '';
        
        render(resultsTable, ResultsTable(App.eachIndexLength, App.totalSummaries, App.postedDate));
        Graph(App.graphNodes, App.graphLinks, App.graph, App.graphSize);                         
        render(noRefsList, NoRefsList(App.allWithNoRefs));
    };

    return getJSON(SS_URL)
        .then(initAndRender)
        .catch(console.log);
})();


