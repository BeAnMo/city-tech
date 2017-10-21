import { getJSON } from './fetch-sheet';

/* 
structure: { head: String, body: object }
MESSAGES:
- FETCH-SHEET: gets the spreadsheet, prepares data
*/
const SS_ID = '1dtZyUAobcWC6yYbdsR1_Oww29XCbEUMABVD20w4gIpI';
const SS_URL = `https://spreadsheets.google.com/feeds/list/${SS_ID}/2/public/full?alt=json`;


onmessage = function(e){
    const head = e.data.head;
    const body = e.data.body;

    if(head === 'FETCH-SHEET'){
        return sendSheetData();

    } else if(head === 'TEST'){ 
        return postMessage({ head: 'TEST', body: 'testing' });
        
    } else {
        return console.log('invalid message');
    }
}

function sendSheetData(){
    return getJSON(SS_URL)
        .then(json => postMessage({ head: 'FETCH-SHEET', body: json }));
}
