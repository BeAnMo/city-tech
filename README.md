city-tech

[Live site](https://beanmo.github.io/city-tech)

---

#### data structure reference:
from json:
- Term: String
- ID: String
- Summaries:

    [...{ id: ID, summary: String }]

- Term-Inputs:

    [...{ display: Term, 
        category: String, 
        phrases: [...String], 
        fromLanguage: Boolean|Term }]

in app
- Total: Number (# of ID for a given Term)
- Neighbors: Number (# of intersecting ID from 2 Terms)
- Terms (from Term-Inputs.display): 

    [...Term]

- Regexes (rxs created with Term-Inputs.phrases):

    [...{ lang: Term, rx: RegExp }]

- Special-Cases (key from first element of Term-Inputs.phrases):

    {...Term: RegExp }

- Index:

    {...Term: [...ID] }

- Each-Index-Length:

    {...Term: Total }

- NoRefs (all Term not in Index): 

    [...Term]

- GraphNodes (same info as Each-Index-Length):

    [...{ term: Term, size: Total }]

- GraphLinks (shared is intersection of target & source):

    [...{ target: Term, source: Term, shared: Neighbors }]

---

### notes
- Array.sort speed varies from browser to browser
    - FF56 on W10 is slow but FF57 on Linux is faster than quickSort

### todos
- one big static network map depicting all results
    - same idea as current, but maybe not with d3?
- given each language its own network
    - show links with other langs/libraries/etc...
- allow user to pick 'dream stack':
    - OS/DB/Lang/Library/Misc/other?
    - if user picks Library or Misc associated with a Lang, automatically select that lang


### data structures revisited (or how to stop double work):
- ResultsTable:
    - Total results
    - Date collected
    - Table Data (Array): 
        - Term
        - Total # of references

- NoRefsList (Array):
    - Term

- Graph:
    - Nodes (Object?):
        - Term
        - Total # of references
        - Grouping (language or category)
    - Links (Array):
        - Source Term
        - Target Term
        - Total intersections

every structure uses Terms
- needed:
    - Term
    - # of refs
    - intersections w/ all other Terms

- Terms refactor?:

    {...Term: IDs.length, ...}

    pros:
    - O(1) access to individual term/totals

    cons:
    - holds empty ID arrays for Terms with no refs

- Terms refactor?:

    [...Term]

    pros:
    - doesn't hold any empty references

    cons:
    - O(n) access to individual terms
    - doesn't hold lengths

- References:

    {...Term: Term.IDs.length, ...}

    pros:
    - O(1) access to Term references

    cons: 
    - creating a second list of terms

- One big structure:

    {
        ...
        Term: {
            Refs: Number,
            Intersections: [...{ target: Term, shared: Number}]
        },
        ...
    }

### new app flow:
1. ajax call to sheets
2. Summaires are created: [...{ id: String, summary: String}]
3. Inputs are created:
    - [...Term] (all other arrays with correspond with this)
    - [...{ phrases: [...String], category: String, fromLanguage: String }]
4. RegExps are created:
    - [...RegExp]
5. Index is created:
    - {...Term: [...id] }
6. IndexLengths are created:
    - {...Term: Number }
7. Nodes are created;
    - [...]