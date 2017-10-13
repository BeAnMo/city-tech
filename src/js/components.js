import '../css/style.css';


function ResultsTable(results, totalNum, date){
    var sorted = results.slice(0).sort((a, b) => a[1] < b[1]);
    
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
    return noRefs.reduce((acc, ref) => {
        return acc + `<li>${ref}</li>`;
    }, ``);
}
    
    
export { ResultsTable, NoRefsList };

