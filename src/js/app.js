import { 
    createIndexes, 
    extractPaths,
    presentTermsWithKey,
    TERMS 
} from './data-processing/index';
import { ResultsTable, 
    NoRefsList, 
    Graph, 
    createNodes, 
    createLinks 
} from './components/index';
import { getJSON } from './fetch-sheet';

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

//!!!
function createSummaries2(json){
    const entries = json.feed.entry;
    // need to be able to assign custom keys
    return extractPaths(entries, ['gsx$id', '$t'], ['gsx$summary', '$t']);
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

/* main rendering function */
function render(target, html){
    return target.innerHTML = html;
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
        return createIndexes(this.presentTerms);
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


