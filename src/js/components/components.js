import '../../css/style.css';

function th({colSpan, text, scope}){
    const thead = document.createElement('th');
    thead.colSpan = colSpan ? colSpan : 1;
    thead.textContent = text ? text : '';
    thead.scope = scope ? scope : '';
    return thead;
}

function tr(){
    return document.createElement('tr');
}

function td(text){
    const tdata = document.createElement('td');
    tdata.textContent = text;
    return tdata;
}

function ResultsTable(results, totalNum, date){
    // timing: sorted & sorted.reduce add up to be about 1.4ms
    //const sorted = results.slice(0).sort((a, b) => b[1] - a[1]);
    // adjust for vis.js
    const sorted = results.slice(0).sort((a,b) => b.value - a.value);
    const div = document.createElement('div');
    const table = document.createElement('table');
    
    // table heading
    const numHeading = tr();
    numHeading.appendChild(
        th({colSpan: 3, text: `References from ${totalNum} postings`})
    );
    const dateHeading = tr();
    dateHeading.appendChild(
        th({colSpan: 3, text: `Collected on ${date}`})
    );
    const rowTitles = tr();
    rowTitles.appendChild(th({text: 'Rank'}));
    rowTitles.appendChild(th({text: 'Language'}));
    rowTitles.appendChild(th({text: 'References'}));
    
    table.appendChild(numHeading)
    table.appendChild(dateHeading)
    table.appendChild(rowTitles);

    const dataRow = sorted.forEach((result, i) => {
        const row = tr();
        row.appendChild(th({scope: 'row', text: `${i+1}`}));
        row.appendChild(td(`${result.label}`));
        row.appendChild(td(`${result.value}`));

        table.appendChild(row);
    });
 
    div.className = 'table';
    table.className = 'table';

    div.appendChild(table);

    return div;
}

function ResultsTable1(results, totalNum, date){
    // this takes ~500ms to render
    // timing: sorted & sorted.reduce add up to be about 1.4ms
    const sorted = results.slice(0).sort((a, b) => b[1] - a[1]);
    
    return `
    <div class="table">
        <table class="table">
            <tr>
                <th colspan="3">References from ${totalNum} postings</th>
            </tr>
            <tr>
                <th colspan="3">Collected on ${date}</th>
            </tr>
        
            <tr>
                <th>Rank</th>
                <th>Language</th>
                <th>References</th>
            </tr>
            ${sorted.reduce((acc, result, i) => {
                return acc + `
                    <tr>
                        <th scope="row">${i+1}</th>
                        <td>${result[0]}</td>
                        <td>${result[1]}</td>
                    </tr>`;
            }, ``)}
        </table>
    </div>`;
}


function NoRefsList(noRefs){
    /*return noRefs.reduce((acc, ref) => {
        return acc + `<li>${ref}</li>`;
    }, ``);*/

    const ul = document.createElement('ul');
    const li = ref => {
        const item = document.createElement('li');
        item.textContent = ref;
        return item;
    }

    for(let i = 0; i < noRefs.length; i++){
        ul.appendChild(li(noRefs[i]));
    }

    return ul;
}
    
    
export { ResultsTable, NoRefsList };

