import { App } from './app';
import { Manager } from './manager-test';

/* web worker not working the way I want
- want to be able to start worker in script tag in HTML head
    - don't know how to access bundled worker script from HTML
        - webpack seems to bundle it with the same name 'xxxx.worker.js'
            - bundle doesn't behave the way a normal worker script does
            - how to inject into HTML head?
- starts get request for GSheet before other scripts start loading
    - data takes atleast 1 sec to load, would like to speed up as much as possible
    
const Worker = require("worker-loader!./worker-test");
const worker = new Worker();
*/


Manager.onmessage = function(e){
    const head = e.data.head;
    const body = e.data.body;

    switch(head){
        case 'TEST':
            //App.ajax = body;
            //return App.initAndRender(App.response);
            return console.log('Hello', body);

        case 'FETCH-SHEET':
            console.log('initializing');

            return App.initAndRender(body);

        default:
            return console.log('whoops');
    }
}