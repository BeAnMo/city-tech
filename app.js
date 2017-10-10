var id = '1dtZyUAobcWC6yYbdsR1_Oww29XCbEUMABVD20w4gIpI';
var url = `https://spreadsheets.google.com/feeds/list/${id}/2/public/full?alt=json`;


/* retrieves only the id & summary from GSheets response:
   { id: String, summary: String } */
function createSummaries(json){
    var entries = json.feed.entry;
    
    return entries.map(e => {
        return {
            id: e['gsx$id']['$t'],
            summary: e['gsx$summary']['$t']
        };
    });
}


/* fetches summaries from GSheet */
async function getSummaries(){
    var fetched = await FetchSheets.json(url);
    var json = createSummaries(fetched);
    
    return json;
}


/* main rendering function */
function render(target, html){
    return target.innerHTML = html;
}


/* filters terms that have no references 
   needed in main() */
function filterWithNoRefs(acc, term){
    // 'this is 'results' Object in main
    return term in this ? acc : acc.concat(term);
}


function main(summaries){
    var app = document.getElementById('app');
    var totalSummaries = summaries.length;
    var present = summaries.map(s => {
        return Words.presentTerms2(s.summary, s.id);
    });
    /* main data */
    var results = Calc.mergeTerms(present);
    var eachResultLength = Object.keys(results).map(r => {
        return [r, results[r].length];
    });
    
    var allTerms = Words.terms.slice(0);
    var noRefs = allTerms.reduce(filterWithNoRefs.bind(results), []);
    
    var termsGraph = Calc.createGraph(results);
    
    console.log(termsGraph);
    
    render(app, View.ResultsTable(eachResultLength, totalSummaries, noRefs));
    console.log('initialized');
}


/* initialize program */
(() => {
    console.log('initializing');
    getSummaries()
        .then(main)
        .catch(console.log)
})();




