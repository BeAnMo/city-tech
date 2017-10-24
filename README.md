city-tech

[Live site](https://beanmo.github.io/city-tech)


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
