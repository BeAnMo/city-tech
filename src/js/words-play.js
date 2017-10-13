/* for filtering terms with regular expressions */
import { createMetonymRXs } from './utils';
    
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
    'c++': /c\+\+/,
    'c': /(^|[^A-Za-z])c($|[^A-Za-z\+])/
};

/* for storing IDs: { lang: [...Id] } */
const TERMS = Object.keys(LANG_TERMS);

/* array of term regexps */
const RXS = ((termsObj) => {
    const keys = Object.keys(termsObj);
    
    return keys.map(k => {
        return {
            lang: k,
            rx: createRX(termsObj[k])
        };
    });
})(LANG_TERMS);


/* Array -> RegExp
    builds a RegExp from an array of phrases to allow for multiple cases
    such as 'c#' or 'c sharp', 'javascript' or 'js'  */
function createRX(phrases){
    return phrases[0] in SPECIAL_CASES ?
        SPECIAL_CASES[phrases[0]] :
        new RegExp(createMetonymRXs(phrases), 'i');    
}


/* String -> Array-of-String */
function presentTerms(txt){
    return RXS.reduce((acc, term) => {
        return term.rx.test(txt) ?
            acc.concat(term.lang) :
            acc;
    }, []);
}


/* collects present terms in a job post:
   {...{ term: jobkey }} */
function presentTermsWithKey(txt, id){
    // merge w/ present terms?
    // 2 loops seems unecessary    
    const tested = presentTerms(txt);
    
    return tested.reduce((acc, t) => {
        return Object.assign(acc, { [t]: id });
    }, {});
}


export {
    presentTerms,
    presentTermsWithKey,
    TERMS
};



//@START-TEST
(() => {
    const tests = [
        { 
            actual: presentTerms('this contains java').length,
            expected: 1
        },
        {
            actual: presentTerms('this contains javas').length,
            expected: 0
        },
        {
            actual: presentTerms('php and elephpant').length,
            expected: 1
        },
        { 
            actual: presentTerms('schemers with a lisp').length,
            expected: 1
        },
        { 
            actual: presentTerms('contains vb/sql/js/c++').length,
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

