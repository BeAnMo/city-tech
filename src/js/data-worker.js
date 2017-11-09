onmessage = function(e){
    const head = e.data.head;
    const body = e.data.body;

    switch(head){
        case 'START':
            return postMessage({ head: 'STARTED', body: 'we are in business' });

        default:
            return postMessage({ head: 'ERROR', body: 'invalid message' });
    }
}