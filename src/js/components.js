/* component */
const View = (() => {

    function ResultsTable(results, totalNum, noRefs){
        var sorted = results.slice(0).sort((a, b) => a[1] < b[1]);
        
        return `
        <section>
            <h5>References from ${totalNum} postings</h5>
            <table class="table">
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
                        </tr>
                    `;
        }, ``)}
            </table>
            <p>* The results are RegExp based, so I am wary of the results from these terms.</p>
            <p>The following terms had no related job postings:</p>
            <ul>
                ${noRefs.reduce((acc, ref) => acc + `<li>${ref}</li>`, ``)}
            </ul>
        </section>`;
    }
    
    
    return {
        ResultsTable: ResultsTable
    };

})();

