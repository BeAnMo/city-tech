const Worker = require("worker-loader!./worker-test");

export const Manager = new Worker();

Manager.postMessage({ head: 'FETCH-SHEET', body:false });
// gets GSheet