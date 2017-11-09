import { getUrls } from './fetch-sheet';
import { SUMMARIES_URL, TERMS_URL, SPECIAL_CASES } from './inputs';

const Worker = require("worker-loader!./data-worker.js");
const DATA_WORKER = new Worker();

const STATE = {};

onmessage = function(e){
    const head = e.data.head;
    const body = e.data.body;

    switch(head){
        case 'START':
            return DATA_WORKER.postMessage({ head: 'START', body: false });

        case 'STARTED':
            return postMessage({ head: 'STARTED', body: 'in busniess' });
    }
}

DATA_WORKER.onmessage = function(e){
    const head = e.data.head;
    const body = e.data.body;

    switch(head){
        case 'STARTED':
            return postMessage({ head: 'STARTED', body: 'in busniess' });
    }
}


