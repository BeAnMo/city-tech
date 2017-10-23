/* how to organize other terms beyond languages? */
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

// libs & frameworks
const LIB_TERMS = {
    /* C# */
    '.NET':         ['.net', 'dotnet', 'asp.net'], // maybe special case?

    /* Java */
    Spring:         ['spring'],

    /* JS */
    Angular:        ['angular', 'angularjs', 'angular.js', 'angular-js'],
    D3:             ['d3', 'd3js', 'd3.js', 'd3-js'],
    React:          ['react', 'reactjs', 'react.js', 'react-js'],

    /* PHP */
    Cake:           ['cake'],
    Laravel:        ['laravel'],
    Symfony:        ['symfony'],

    /* Python */
    Django:         ['django'],
    Flask:          ['flask'],

    /* Ruby */
    Rails:          ['rails', 'rubyonrails', 'rubyrails', /* 'ror' ??? */]
};

// OS, software, ...
const OS_TERMS = {
    Android:        ['android'],
    Apple:          ['mac', 'macos', 'apple', 'ios'],
    Linux:          ['linux', 'redhat', 'red hat', 'ubuntu', 'debian', 'centos'],
    Windows:        ['windows', 'xp', 'vista'],
};

const SPECIAL_CASES = {
    '.net': /\.net/i,
    sql: /sql/i,
    'c++': /c\+\+/i,
    'c': /(^|[^A-Za-z])c($|[^A-Za-z\+])/i
};

export {
    LANG_TERMS,
    SPECIAL_CASES
}