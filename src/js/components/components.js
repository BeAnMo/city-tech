import '../../css/style.css';

function th({ colSpan, text, scope }) {
  const thead = document.createElement('th');

  thead.colSpan = colSpan ? colSpan : 1;
  thead.textContent = text ? text : '';
  thead.scope = scope ? scope : '';

  return thead;
}

function tr() {
  return document.createElement('tr');
}

function ResultsTable(totalNum, date) {
  // timing: sorted & sorted.reduce add up to be about 1.4ms
  //const sorted = results.slice(0).sort((a, b) => b[1] - a[1]);
  // adjust for vis.js
  const div = document.createElement('div');
  const table = document.createElement('table');

  // table heading
  const numHeading = tr();

  numHeading.appendChild(
    th({ colSpan: 3, text: `References from ${totalNum} postings` })
  );

  const dateHeading = tr();

  dateHeading.appendChild(th({ colSpan: 3, text: `Collected on ${date}` }));

  const rowTitles = tr();

  rowTitles.appendChild(th({ text: 'Rank' }));
  rowTitles.appendChild(th({ text: 'Tech' }));
  rowTitles.appendChild(th({ text: 'References' }));

  table.appendChild(numHeading);
  table.appendChild(dateHeading);
  table.appendChild(rowTitles);

  div.className = 'table';
  table.className = 'table';

  div.appendChild(table);

  return div;
}

function NoRefsList(noRefs) {
  const ul = document.createElement('ul');
  const li = ref => {
    const item = document.createElement('li');
    item.textContent = ref;
    return item;
  };

  for (let i = 0; i < noRefs.length; i++) {
    ul.appendChild(li(noRefs[i]));
  }

  return ul;
}

export { ResultsTable, NoRefsList };
