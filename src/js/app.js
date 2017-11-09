import { Terms } from './Prototypes/Terms';
import { Summaries } from './Prototypes/Summaries';
import { TermsIndex } from './Prototypes/Terms-Index';
import { GraphData } from './Prototypes/Graph-Data';
import { 
    ResultsTable, 
    NoRefsList, 
    Graph
} from './components/index';
import { getUrls } from './fetch-sheet';
import { SUMMARIES_URL, TERMS_URL } from './inputs';


const Worker = require("worker-loader!./web-worker.js");
const WORKER = new Worker();


/* main rendering function */
function render1(target, html){
    return target.innerHTML = html;
}

function render(target, html){
    if(typeof(html) === 'string'){
        return target.innerHTML = html;
    } else {
        return target.appendChild(html);
    }
}


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
};


WORKER.postMessage({ head: 'START', body: false });

WORKER.onmessage = function(e){
    console.log(e.data.body);
}

