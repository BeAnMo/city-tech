import { Terms } from './Terms';
import { Summaries } from './Summaries';
import { TermsIndex } from './Terms-Index';
import { GraphData } from './Graph-Data';
import { 
    ResultsTable, 
    NoRefsList, 
    Graph
} from './components/index';
import { getUrls } from './fetch-sheet';
import { SUMMARIES_URL, TERMS_URL } from './inputs';


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

    // DOM Objects
    table: document.getElementById('resultsTable'),
    graph: document.getElementById('resultsGraph'),
    noRefsList: document.getElementById('noRefsList'),
      
    // for REPL debugging
    debug: {
        // not working with differenct webpack configs :(
    }
};


/* initialize app */
(() => {
    /* Object extensions
             Terms -------> Index
        App -^-> Summaries -^-> Graph
    */
    const initAndRender = jsonArr => {
        App.ajax = jsonArr;
        App.graph.innerHTML = '';

        const response = App.response;
        /* extensions
        - assigning a whole object, like Object.assign(TermsIndex, SUMMARIES, TERMS)
          is slow, so only assign the data that is needed
          doing this dropped the time for 'extensions' from ~550ms to ~40ms
          the GRAPH extensions are particularly expensive
        */
        console.time('extensions');
        const TERMS = Object.assign(Terms, { response });
        const SUMMARIES = Object.assign(Summaries, { response });
        const TERMS_INDEX = Object.assign(TermsIndex, { 
            Summaries: SUMMARIES.Summaries,
            RXS: TERMS.RXS 
        });
        const GRAPH = Object.assign(GraphData, { 
            response,
            termsIndex: TERMS_INDEX.termsIndex 
        });
        console.timeEnd('extensions');

        console.time('render ResultsTable'); // 500ms
        render(
            resultsTable, 
            ResultsTable(
                TERMS_INDEX.eachIndexLength, 
                SUMMARIES.totalSummaries, 
                GRAPH.postedDate
            )
        );
        console.timeEnd('render ResultsTable');

        console.time('render Graph'); // 25ms
        Graph(
            GRAPH.graphNodes, 
            GRAPH.graphLinks, 
            GRAPH.graph, 
            GRAPH.graphSize
        );          
        console.timeEnd('render Graph');
        
        console.time('render NoRefsList'); // 26ms
        render(
            noRefsList, 
            NoRefsList(
                TERMS.allWithNoRefs(TERMS_INDEX.termsIndex)
            )
        );
        console.timeEnd('render NoRefsList');
    };

    return getUrls(SUMMARIES_URL, TERMS_URL)
        .then(initAndRender)
        .catch(console.log);
})();


