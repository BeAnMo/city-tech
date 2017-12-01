import { extractPaths } from '../data-processing/index';

/* to be extended by App
Summaries:
[...{ id: ID, summary: String }]
*/
export const Summaries = {
    get Summaries(){
        return createSummaries(this.response.Summaries);
    },
    
    get totalSummaries(){
        return this.Summaries.length;
    },
};


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
