var id = '1dtZyUAobcWC6yYbdsR1_Oww29XCbEUMABVD20w4gIpI';
var url = `https://spreadsheets.google.com/feeds/list/${id}/2/public/full?alt=json`;


function createSummaries(json){
    var entries = json.feed.entry;
    
    return entries.map(e => {
        return {
            id: e['gsx$id']['$t'],
            summary: e['gsx$summary']['$t']
        };
    });
}

async function getSummaries(){
    var fetched = await FetchSheets.json(url);
    var json = createSummaries(fetched);
    
    return json;
}


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


function ResultsTable(results, totalNum){
    var sorted = results.slice(0).sort((a, b) => a[1] < b[1]);
    
    return `
    <section>
        <h5>References from ${totalNum} postings</h5>
        <table>
            <tr>
                <th>Language</th>
                <th>References</th>
            </tr>
            ${sorted.reduce((acc, result) => {
                return acc + `
                    <tr>
                        <td>${result[0]}</td>
                        <td>${result[1]}</td>
                    </tr>
                `;
    }, ``)}
        </table>
    </section>`;
}


function render(target, html){
    return target.innerHTML = html;
}


function main(summaries){
    var app = document.getElementById('app');
    var totalSummaries = summaries.length;
    var present = summaries.map(s => {
        return Words.presentTerms2(s.summary, s.id);
    });
    /* main data */
    var results = mergeTerms(present);
    var eachResultLength = Object.keys(results).map(r => {
        return [r, results[r].length];
    });
    
    render(app, ResultsTable(eachResultLength, totalSummaries));
}


/* initialize program */
(() => {
    console.log('initializing');
    getSummaries()
        .then(main)
        .catch(console.log)
})()
