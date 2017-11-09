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


function render(target, html){
    if(typeof(html) === 'string'){
        return target.innerHTML = html;
    } else {
        return target.appendChild(html);
    }
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
        console.time('initAndRender');
        App.ajax = jsonArr;
        App.table.innerHTML = '';
        App.graph.innerHTML = '';

        const response = App.response;
        /* extensions
        - assigning a whole object, like Object.assign(TermsIndex, SUMMARIES, TERMS)
          is slow, so only assign the data that is needed
          doing this dropped the time for 'extensions' from ~550ms to ~40ms
          the GRAPH extensions are particularly expensive

          how to offload the large structures on to a worker?
          - handle all ajax & big calculation from a worker

          there doesn't seem to be a consistent time difference between:
          - Object.assign(a, b)
          - {...a, [prop]: b[prop]}
          - { [prop1]: a.prop1, [prop2]: b.prop2 }
        */
        console.time('extensions');
        
        const TERMS = Object.assign(Terms, { response });
        const SUMMARIES = Object.assign(Summaries, { response });
        
        console.time('TERMS_INDEX');
        const TERMS_INDEX = Object.assign(TermsIndex, { 
            Summaries: SUMMARIES.Summaries,
            RXS: TERMS.RXS,
            inputs: TERMS.TermInputs
        });
        let indexLength = TERMS_INDEX.eachIndexLength;
        let termsindex = TERMS_INDEX.termsIndex;
        console.timeEnd('TERMS_INDEX');

        console.time('GRAPH');
        const GRAPH = Object.assign(GraphData, { // this is the big time sink
            response,
            // what to do with these 2?
            //termsIndex: TERMS_INDEX.termsIndex,
            termsIndex: termsindex,
        });
        console.timeEnd('GRAPH');
        
        console.timeEnd('extensions');

        console.time('render ResultsTable'); 
        render(
            App.table, 
            ResultsTable(
                indexLength,
                SUMMARIES.totalSummaries, 
                GRAPH.postedDate
            )
        );
        console.timeEnd('render ResultsTable');

        console.time('render Graph');
        Graph(
            indexLength, 
            GRAPH.graphLinks, 
            App.graph, 
            GRAPH.graphSize
        );          
        console.timeEnd('render Graph');
        
        console.time('render NoRefsList');
        render(
            App.noRefsList, 
            NoRefsList(
                TERMS.allWithNoRefs(termsindex)
            )
        );
        console.timeEnd('render NoRefsList');

        console.timeEnd('initAndRender');
    };

    return getUrls(SUMMARIES_URL, TERMS_URL)
        .then(initAndRender)
        .catch(console.log);
})();


