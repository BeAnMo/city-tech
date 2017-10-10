/* for filtering terms with regular expressions */
const Words = (() => {
    
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
    /* for storing IDs: { lang: [...Id] } */
    const TERMS = Object.keys(LANG_TERMS);

    /* Array -> RegExp
        builds a RegExp from an array of phrases to allow for multiple cases
        such as 'c#' or 'c sharp', 'javascript' or 'js'  */
    function createRX(phrases){
        // creates a RegExp pattern from a string
        const rx = `${phrases.reduce((base, phrase, i) => {
            // check phrase for spaces & '+'
            if(phrase === 'c++'){
                phrase = 'c\\+\\+';
            } else if(phrase.indexOf(' ') > -1){
                phrase = phrase.split(' ').join('\\s');
            }
            // patterns match a given phrase surrounded by non letter characters
            // so 'scheme' will pass but not 'schemer'
            if(phrase === 'sql'){
                return phrase;
            // need case for 'c', can't be followed by '+'
            } else if(phrase === 'c'){
                return `(^|[^A-Za-z])${phrase}($|[^A-Za-z\\+])`;
            
            } else if(i === 0){
                // matches phrase if not bordered by other letters
                // sql,php,js will match, but not sqlphpjs
                return base + `(^|[^A-Za-z])${phrase}($|[^A-Za-z])`;
            } else {
                return base + `|(^|[^A-Za-z])${phrase}($|[^A-Za-z])`;
            }
            
        }, '')}`;
        
        return new RegExp(rx, 'i');
    }


    /* String -> Array-of-String */
    function presentTerms(txt){
        return RXS.reduce((acc, term) => {
            return term.rx.test(txt) ?
                acc.concat(term.lang) :
                acc;
        }, []);
    }
    
    
    function presentTerms2(txt, id){
        const tested = RXS.reduce((acc, term) => {
            return term.rx.test(txt) ?
                acc.concat(term.lang) :
                acc;
        }, []);
        
        const results = tested.reduce((acc, t) => {
            return Object.assign(acc, { [t]: id });
        }, {});
        
        return results;
    }


    const RXS = ((termsObj) => {
        const keys = Object.keys(termsObj);
        
        return keys.map(k => {
            return {
                lang: k,
                rx: createRX(termsObj[k])
            };
        });
    })(LANG_TERMS);

    
    return {
        presentTerms: presentTerms,
        presentTerms2: presentTerms2,
        terms: TERMS,
        docs: {
            presentTerms: 'String -> Array-of-String: Tests string for given terms'
        }
    };
})();


//@TEST
((module) => {
    const tests = [
        { 
            actual: module.presentTerms('this contains java').length,
            expected: 1
        },
        {
            actual: module.presentTerms('this contains javas').length,
            expected: 0
        },
        {
            actual: module.presentTerms('php and elephpant').length,
            expected: 1
        },
        { 
            actual: module.presentTerms('schemers with a lisp').length,
            expected: 1
        },
        { 
            actual: module.presentTerms('contains vb/sql/js/c++').length,
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
})(Words)

