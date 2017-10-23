import { 
    createIndexes, 
    extractPaths,
    presentTermsWithKey,
    createRegExp
} from './data-processing/index';
import { ResultsTable, 
    NoRefsList, 
    Graph, 
    createNodes, 
    createLinks 
} from './components/index';
import { getUrls } from './fetch-sheet';
import { SUMMARIES_URL, TERMS_URL, SPECIAL_CASES } from './inputs';


/* YYYY-MM-DD */
function formatDate(d){
    const year = d.getFullYear();
    const month = d.getMonth() + 1;
    const day = d.getDate();
    const below10 = n => n < 10 ? '0' + n : n;
    
    return `${year}-${below10(month)}-${below10(day)}`;
}

/* Array-of-Object, Object -> Array-of-Object
    returns [...{ Term: RegExp }] */
function createRXS(Terms, specialCases){
    return Terms.map(t => {
        const term = t.display;
        const phrases = t.phrases;

        return { [term]: createRegExp(phrases, specialCases) };
    });
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

// createSum... with Array.map vs createSum with extractPaths:
// ~1ms : > 7ms
function createSummaries2(json){
    const entries = json.feed.entry;
    // need to be able to assign custom keys
    return extractPaths(entries, ['gsx$id', '$t'], ['gsx$summary', '$t']);
}

/* from Terms sheet 
    [...{ display: String, */
function createInputs(json){
    const entries = json.feed.entry;
    const inputs = extractPaths(
        entries,
        ['display', 'phrases', 'fromLanguage', 'category'],
        ['gsx$display', '$t'],
        ['gsx$phrases', '$t'],
        ['gsx$fromlanguage', '$t'],
        ['gsx$category', '$t']
    );
    
    return inputs.map(i => {
        const splitPhrases = i.phrases.split(',');
        const iFromLang = i.fromLanguage;
        const fromLang = iFromLang === 'TRUE' ? true :
                            iFromLang === 'FALSE' ? false : iFromLang;
        
        return Object.assign(i, { phrases: splitPhrases, fromLanguage: fromLang });
    });
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
    set ajax(jsonArr){
        return Object.assign(this.response, { 
            Terms: jsonArr[1], Summaries: jsonArr[0] 
        });
    },
    
    // filtered response data
    get Summaries(){
        return createSummaries(this.response.Summaries);
    },

    get TermInputs(){
        return createInputs(this.response.Terms);
    },

    get RXS(){
        return createRXS(this.TermInputs, SPECIAL_CASES);
    },
    
    // DOM Objects
    table: document.getElementById('resultsTable'),
    graph: document.getElementById('resultsGraph'),
    noRefsList: document.getElementById('noRefsList'),
      
    // app data
    graphSize: getClientSize(document.documentElement.clientWidth),
    get Terms(){
        return this.TermInputs.map(t => t.display);
    },
    get postedDate(){
        const date = this.response.Summaries.feed.updated['$t'];
        return date ? formatDate(new Date(date)) : formatDate(new Date());
    },
    get totalSummaries(){
        return this.Summaries.length;
    },
    get presentTerms() {
        return this.Summaries.map(s => {
            return presentTermsWithKey(s.summary, s.id, this.RXS);
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
        return this.Terms.reduce(filterWithNoRefs.bind(this.termsIndex), []); 
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
    const initAndRender = jsonArr => {
        App.ajax = jsonArr;
        App.graph.innerHTML = '';

        render(resultsTable, ResultsTable(App.eachIndexLength, App.totalSummaries, App.postedDate));
        Graph(App.graphNodes, App.graphLinks, App.graph, App.graphSize);                         
        render(noRefsList, NoRefsList(App.allWithNoRefs));
    };

    return getUrls(SUMMARIES_URL, TERMS_URL)
        .then(initAndRender)
        .catch(console.log);
})();


