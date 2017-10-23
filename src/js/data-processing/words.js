/* for filtering terms with regular expressions */
import { createMetonymRXs } from './regexes';


/* Object -> Array-of-Object
   {...Term: [...String } -> [...{ Term: RegExp }] */
function createRXObj(termsObj, specialCases){
    const keys = Object.keys(termsObj);
    
    return keys.map(k => {
        return {
            lang: k,
            rx: createRegExp(termsObj[k], specialCases)
        };
    });
}


/* Array-of-String -> RegExp
    builds a RegExp from an array of phrases to allow for multiple cases
    such as 'c#' or 'c sharp', 'javascript' or 'js'  
    specialcases = {...{ Term: RegExp} } */
export function createRegExp(phrases, specialCases){
    return phrases[0] in specialCases ?
        specialCases[phrases[0]] :
        new RegExp(createMetonymRXs(phrases), 'i');    
}


/* String, Array-of-Object -> Array-of-String 
   rxs = [...{ lang: Term, rx: RegExp}] */
function presentTerms(txt, rxs){
    return RXS.reduce((acc, term) => {
        return term.rx.test(txt) ?
            acc.concat(term.lang) :
            acc;
    }, []);
}


/* collects present terms in a job post:
   {...{ term: jobkey }} */
export function presentTermsWithKey(txt, id, rxs){
    // merge w/ present terms?
    // 2 loops seems unecessary    
    const tested = presentTerms(txt, rxs);
    
    return tested.reduce((acc, t) => {
        return Object.assign(acc, { [t]: id });
    }, {});
}


// constants are just for testing now   
const LANG_TERMS = {
    Awk:            ['awk'],
    Bash:           ['bash'],
    'C *':          ['c'],
    'C#':           ['c#', 'csharp', 'c sharp'],
    'C++':          ['c++'],
    Clojure:        ['clojure'],
    COBOL:          ['cobol'],
    Erlang:         ['erlang'],
    'Go *':         ['go', 'golang'],
    Haskell:        ['haskell'],
    Java:           ['java'],
    JavaScript:     ['javascript', 'java script', 'js'],
    Lisp:           ['lisp'],
    'Objective-C':  ['objective-c', 'objective c'],
    Pascal:         ['pascal'],
    Perl:           ['perl'],
    PHP:            ['php'],
    Powershell:     ['powershell', 'power shell'],
    Python:         ['python'],
    Ruby:           ['ruby'],
    Rust:           ['rust'],
    Scala:          ['scala'],
    Scheme:         ['scheme'],
    SQL:            ['sql'],
    'Swift *':      ['swift'],
    'Visual Basic': ['visual basic', 'visualbasic', 'vb', 'vba'],
};

const SPECIAL_CASES = {
    sql: /sql/i,
    'c++': /c\+\+/i,
    'c': /(^|[^A-Za-z])c($|[^A-Za-z\+])/i
};

/* array of term regexps */
const RXS = createRXObj(LANG_TERMS, SPECIAL_CASES);

//@START-TEST
(() => {
    const tests = [
        { 
            actual: presentTerms('this contains java', RXS).length,
            expected: 1
        },
        {
            actual: presentTerms('this contains javas', RXS).length,
            expected: 0
        },
        {
            actual: presentTerms('php and elephpant', RXS).length,
            expected: 1
        },
        { 
            actual: presentTerms('schemers with a lisp', RXS).length,
            expected: 1
        },
        { 
            actual: presentTerms('contains vb/sql/js/c++', RXS).length,
            expected: 4
        }
    ];
    
    let total = tests.length;
    let passed = 0;
    
    console.log('---- MODULE TEST: Words ----');
    
    for(let i = 0; i < total; i++){
        if(tests[i].actual === tests[i].expected){
            passed += 1;
        } else {
            console.log('---- #' + i + ' ----');
            console.log(`  actual: ${tests[i].actual}`);
            console.log(`expected: ${tests[i].expected}`);
        }
    }
    
    console.log(`${passed} out of ${total} tests passed`);
    console.log('----------------------------');
})();
//@END-TEST

