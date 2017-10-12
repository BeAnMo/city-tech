var Jobs =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return mergeTerms; });
/* unused harmony export createGraph */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return intersect; });

function mergeTerms(objArr){
    return objArr.reduce((acc, terms) => {
        var keys = Object.keys(terms);
        var result = {};
        
        for(var i = 0; i < keys.length; i++){
            var term = keys[i];
            var id = terms[term];
            
            if(acc[term]){
                Object.assign(result, { [term]: [...acc[term], id] })
            } else {
                Object.assign(result, { [term]: [id] });
            }
        }
        
        return Object.assign(acc, result);
    }, {});
}

/* 
{
    term: String,
    total: Number,
    neighbors: [...{ term: String, totalShared: Number }]
}
*/
function GraphNode(term, total, neighbors){
    return {
        term,
        total,
        neighbors
    };
}


function createGraph(termsObj){
    var nodes = [];
    var terms = Object.keys(termsObj);
    var termsLen = terms.length;
    
    for(var i = 0; i < termsLen; i++){
        var neighbors = [];
        var term = terms[i];
        var ids = termsObj[term];
        
        for(var j = 0; j < termsLen; j++){
            var neighbor = terms[j];
            var neighborIds = termsObj[neighbor];
            
            if(neighbor !== term){
                var intersection = intersect(ids, neighborIds).length;
                
                if(intersection > 0){
                   neighbors.push({ [neighbor]: intersection }); 
                }     
            }
        }
        
        nodes.push(GraphNode(term, ids.length, neighbors));
    }
    
    return nodes;
}

/* Array, Array -> Array
    assumes both arrays are sorted
    - could take an additional arg:
        - AND, OR, NOT...
        allow for more complex queries  */
function intersect(arr1, arr2){
    var result = [];
    var a1 = arr1;
    var a2 = arr2;

    while(a1.length !== 0 && a2.length !== 0){
        if(a1[0] === a2[0]){
            result.push(a1[0]);
            a1 = a1.slice(1);
            a2 = a2.slice(1);
        } else if(a1[0] < a2[0]){
            a1 = a1.slice(1);
        } else {
            a2 = a2.slice(1);
        }
    }
    
    return result;
}

/* Array -> Array
    
    returns array ids that are present in all given langs  */
function multipleIntersect(terms, data){
    /* sorts langs by array size
       starting with smallest arrays means 
       intermediate results will be no bigger
       than smallest array */
    var sorted = terms.map((term) => {
        return data[term];
    }).sort((a, b) => {
        return a - b;
    });
    
    // first
    var result = sorted[0];
    // rest
    var sorted = sorted.slice(1);
    
    while(sorted.length !== 0 && result.length !== 0){
        // intersect first & second - smallest arrays
        result = intersect(result, sorted[0]);
        sorted = sorted.slice(1);
    }
    
    return result;
}







/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__css_style_css__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__css_style_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__css_style_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__calculations__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__fetch_sheet__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__words_play__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__graph__ = __webpack_require__(10);
// css








const id = '1dtZyUAobcWC6yYbdsR1_Oww29XCbEUMABVD20w4gIpI';
const url = `https://spreadsheets.google.com/feeds/list/${id}/2/public/full?alt=json`;


/* YYYY-MM-DD */
function formatDate(d){
    const year = d.getFullYear();
    const month = d.getMonth() + 1;
    const day = d.getDate();
    const below10 = n => n < 10 ? '0' + n : n;
    
    return `${year}-${below10(month)}-${below10(day)}`;
}

/* retrieves only the id & summary from GSheets response:
   { id: String, summary: String } */
function createSummaries(json){
    const entries = json.feed.entry;
    
    return entries.map(e => {
        return {
            id: e['gsx$id']['$t'],
            summary: e['gsx$summary']['$t']
        };
    });
}


/* fetches summaries from GSheet */
/*async function getSummaries(){
    var fetched = await getJSON(url);
    var json = createSummaries(fetched);
    
    return json;
}*/


/* main rendering function */
function render(target, html){
    return target.innerHTML = html;
}


/* filters terms that have no references 
   needed in main() */
function filterWithNoRefs(acc, term){
    // 'this is 'results' Object in main
    return term in this ? acc : acc.concat(term);
}


/* gets the size of the client's browser window */
function getClientSize(docWidth){
    if(docWidth < 730){
        return 300;
    } else if(730 < docWidth < 1000){
        return 450;
    } else {
        return 600;
    }
}


/* Object for working with app in web console: 
   'Jobs.App' */
const App = {

    // unfiltered GSheets response
    response: {},
    set ajax(json){
        return Object.assign(this.response, json);
    },
    
    // filtered response data
    get data(){
        return createSummaries(this.response);
    },
    
    // DOM Objects
    table: document.getElementById('resultsTable'),
    graph: document.getElementById('resultsGraph'),
    noRefsList: document.getElementById('noRefsList'),
      
    // app data
    graphSize: getClientSize(document.documentElement.clientWidth),
    
    get postedDate(){
        const date = this.response.feed.updated['$t'];
        return date ? formatDate(new Date(date)) : formatDate(new Date());
    },
    get totalSummaries(){
        return this.data.length;
    },
    get presentTerms() {
        return this.data.map(s => {
            return Object(__WEBPACK_IMPORTED_MODULE_3__words_play__["b" /* presentTerms2 */])(s.summary, s.id);
        }); 
    },
    get termsIndex(){
        return Object(__WEBPACK_IMPORTED_MODULE_1__calculations__["b" /* mergeTerms */])(this.presentTerms);
    },
    get eachIndexLength(){
        return Object.keys(this.termsIndex).map(r => {
            return [r, this.termsIndex[r].length];
        });
    },
    allTermStrings: __WEBPACK_IMPORTED_MODULE_3__words_play__["a" /* TERMS */].slice(0),
    get allWithNoRefs(){
        return this.allTermStrings.reduce(filterWithNoRefs.bind(this.termsIndex), []); 
    },
    get graphNodes(){
        return Object(__WEBPACK_IMPORTED_MODULE_5__graph__["c" /* createNodes */])(this.termsIndex);
    },
    get graphLinks(){
        return Object(__WEBPACK_IMPORTED_MODULE_5__graph__["b" /* createLinks */])(this.termsIndex);
    },

    debug: {
        intersect: __WEBPACK_IMPORTED_MODULE_1__calculations__["a" /* intersect */],
        createLinks: __WEBPACK_IMPORTED_MODULE_5__graph__["b" /* createLinks */]
    }
};
/* harmony export (immutable) */ __webpack_exports__["App"] = App;



/* initialize app */
(() => {
    const initAndRender = json => {
        App.ajax = json;
        App.graph.innerHTML = '';
        
        render(resultsTable, Object(__WEBPACK_IMPORTED_MODULE_4__components__["b" /* ResultsTable */])(App.eachIndexLength, App.totalSummaries, App.postedDate));
        Object(__WEBPACK_IMPORTED_MODULE_5__graph__["a" /* Graph */])(App.graphNodes, App.graphLinks, App.graph, App.graphSize);                         
        render(noRefsList, Object(__WEBPACK_IMPORTED_MODULE_4__components__["a" /* NoRefsList */])(App.allWithNoRefs));
    };

    return Object(__WEBPACK_IMPORTED_MODULE_2__fetch_sheet__["a" /* getJSON */])(url)
        .then(initAndRender)
        .catch(console.log);
})();





/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(3);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(5)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js!./style.css", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js!./style.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)(undefined);
// imports
exports.push([module.i, "@import url(https://fonts.googleapis.com/css?family=Fira+Sans:400,700);", ""]);
exports.push([module.i, "@import url(https://fonts.googleapis.com/css?family=Merriweather:400,700);", ""]);

// module
exports.push([module.i, "h1,h2,h3,h4,h5,h6 {\n  font-family: 'Fira Sans', serif;\n  letter-spacing: 0.2rem\n}\n\nhr {\n  width: 50%;\n  border: 1px solid #ccc;\n}\n\nbody {\n  margin: 0;\n  padding: 0;\n\n  font-family: 'Merriweather', serif;\n  font-size: 0.8rem;\n    \n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n}\n\nheader {\n  height: 20vh;\n  padding: 0;\n  margin: 0;\n  \n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n}\n\nheader > h1,h3,h5 {\n  margin: 0;\n  padding: 0;\n}\n\nmain {\n  width: 90vw;\n}\n\nsection {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n}\n\ntd {\n    font-family: 'Fira Sans', sans-serif;\n    font-weight: 500;\n    letter-spacing: 0.15rem;\n}\n\ntd, th {\n    text-align: left;\n    padding: 0.1rem 1rem 0.3rem 1rem;\n    border-bottom: 1px dashed #aaa;\n}\n\np {\n  line-height: 1.5rem;\n  margin: 1.5rem 1rem 1.5rem 1rem;\n}\n\nfooter {\n  font-family: 'Merriweather', serif;\n  margin: 0;\n}\n\n\n.loading {\n\tmargin: 5rem;\n}\n\ndiv.popup {\n    margin: 0;\n    position: absolute;\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n    align-items: center;\n    font: 1rem 'Fira Sans';\n    padding: 0.1rem;\n    background-color: #fff;\n    border-radius: 15%;\n    pointer-events: none;\n}\n\n\n@media (min-width: 730){\n  body {\n    font-size: 1.3rem;\n  }\n\n  td, th {\n    padding: 0.4rem 4rem 0.4rem 4rem;\n  }\n}\n\n\n@media (min-width: 1000px){\n  body {\n    font-size: 1.3rem;\n  }\n\n  td, th {\n    padding: 0.5rem;\n  }\n  \n  main {\n    width: 80vw;\n    display: flex;\n    flex-direction: row;\n    justify-content: center;\n    align-items: flex-start;\n  }\n  \n  section {\n    width: 50%;\n    margin: 2rem;\n  }\n  \n  aside {\n    width: 50%;\n    margin: 2rem;\n  }\n  \n  p {\n    margin: 2rem 0 2rem 0;\n    line-height: 2.2rem;\n  }\n  \n  table {\n    width: 100%;\n  }\n}\n", ""]);

// exports


/***/ }),
/* 4 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			var styleTarget = fn.call(this, selector);
			// Special case to return head of iframe instead of iframe itself
			if (styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[selector] = styleTarget;
		}
		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(6);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton) options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertInto + " " + options.insertAt.before);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 6 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return getJSON; });

const OPTS = {
    mode: 'cors'
}

async function getJSON(url){
    var fetched = await fetch(url, OPTS);
    var json = await fetched.json();
    
    return json;
}






/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export presentTerms */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return presentTerms2; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TERMS; });
/* for filtering terms with regular expressions */
    
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






//@TEST
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



/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return ResultsTable; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NoRefsList; });

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
    
    




/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return createNodes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return createLinks; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Graph; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__calculations__ = __webpack_require__(0);


/* creates nodes for d3 graph */
function createNodes(results){
  const terms = Object.keys(results);
  
  return terms.map(term => {
    return { term: term, size: results[term].length };
  });
}

function createLinks(results){
  const terms = Object.keys(results);
  const len = terms.length;
  // enforce this order
  // 0 -> 9 -> a > z
  const byIncr = (a, b) => a > b;
  let links = [];
  
  for(let i = 0; i < len; i++){
    const source = terms[i];
    const sourceIds = results[source];
    sourceIds.sort(byIncr);
    
    for(let j = 0; j < len; j++){
      const target = terms[j];
      const targetIds = results[target];
      targetIds.sort(byIncr);
      const shared = Object(__WEBPACK_IMPORTED_MODULE_0__calculations__["a" /* intersect */])(sourceIds, targetIds).length;
    
      // until "C" regexp is more accurate
      const c_test = source === 'C *' || target === 'C *' ? false : true;
    
      if(target !== source && shared > 0 && c_test){
        links.push({ target, source, shared });
      }
    }
  }
  
  return links;
}

//@TEST
(() => {
    const t0 = {
        Scala: [ "d996ecb107d95f5e" ],
        Python: ["1a8db8794d09a479", "22264e0253a9351b", "2973bbaa38b591bd", "2d865695d82ae324", "4ad674d054f4bbf1", "57b44a3efb8f140f", "76ad4673f873412e", "7aae7e244f359744", "91a7f3f9f500fd19", "9d937cc790aabc39"],
        Java: ["04d4a774fe2bd693", "060564ecba2e71e2", "0696f3c1db4ea2b7"],
        'Go *': ["04d4a774fe2bd693", "183f4803b7ba8f51", "2e05678631f51cf4"],
        WhatLang: ["1a8db8794d09a479", "76ad4673f873412e", "7aae7e244f359744"]
    };
    
    const tests = [
        Object(__WEBPACK_IMPORTED_MODULE_0__calculations__["a" /* intersect */])(t0.Scala, t0.Python).length === 0,
        Object(__WEBPACK_IMPORTED_MODULE_0__calculations__["a" /* intersect */])(t0.Java, t0['Go *']).length === 1,
        Object(__WEBPACK_IMPORTED_MODULE_0__calculations__["a" /* intersect */])(t0.WhatLang, t0.Python).length === 3
    ];
    
    let total = tests.length;
    let passed = 0;
    
    console.log('---- MODULE TEST: Graph ----');
    
    tests.forEach((t, i) => {
        console.assert(t, `tests[${i}]`);
        
        if(t){
            passed += 1;
        }
    });
    
    console.log(`${passed} out of ${total} tests passed`);
    console.log('----------------------------');
})();


function Graph(nodes, links, graph, size){
  const W = size;
  const H = W;

  const viz = d3.select(graph)
    .append('svg')
    .attr('width', W)
    .attr('height', H);

  const simulation = d3.forceSimulation()
    .nodes(nodes);

  simulation
    .force('charge_force', d3.forceManyBody()
        .strength(- (size))
        .distanceMin(50)
        .distanceMax(size / 2))
    .force('center_force', d3.forceCenter(W / 2, H / 2));
    
    const popup = d3.select('body').append('div')
        .attr('class', 'popup')
        .style('opacity', 0);   

  const node = viz.append("g")
    .attr("class", "nodes")
    .selectAll("circle")
    .data(nodes)
    .enter()
    .append("circle")
    .attr("r", 12)
    .attr("fill", "red");
 

  function tickActions() {
    //update circle positions to reflect node updates on each tick of the simulation 
    node
      .attr("cx", function(d) { return d.x; })
      .attr("cy", function(d) { return d.y; });

    link
      .attr("x1", function(d) { return d.source.x; })
      .attr("y1", function(d) { return d.source.y; })
      .attr("x2", function(d) { return d.target.x; })
      .attr("y2", function(d) { return d.target.y; });
  }


  const link_force =  d3.forceLink(links)
    .id(function(d) { return d.term; });


  simulation.on('tick', tickActions);
  simulation.force("links",link_force);

  const link = viz.append("g")
    .attr("class", "links")
    .selectAll("line")
    .data(links)
    .enter().append("line")
    .attr("stroke-width", 3)
    .style('stroke', linkColor);
        
    Popup(graph, popup, node, d => `<p>${d.term}</p>`);
    Popup(graph, popup, link, d => `<p>${d.source.term} & ${d.target.term} : <strong>${d.shared}</strong></p>`);
}


/* D3Popup, D3Element, [Object -> String] -> Void */
function Popup($Elem, popupElem, d3Elem, html){
    const $posn = offset($Elem);
  
    d3Elem.on('mouseover', (d) => {
        popupElem.transition()
            .duration(200)
            .style('opacity', 0.9)
        popupElem.html(html(d))
            .style('left', `${$posn.left}px`)
            .style('top', `${$posn.top}px`)
    })
    .on('mouseout', d => {
        popupElem.transition()
            .duration(500)
            .style('opacity', 0)
    });
}


/* gets position of top-left corner of a DOM element */
function offset(el) {
    const rect = el.getBoundingClientRect();
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
}

function linkColor(d){
    const n = d.shared;

    return (
        n < 2 ? '#555' :
        n < 3 ? '#568' :
        n < 5 ? '#58a' :
        n < 9 ? '#5ad' : 
        n < 14 ? '#5cf' :
        n < 20 ? '#5ff' :
        n < 27 ? '#2ff' :
        n < 35 ? '#0ff' : '#00f'
    );
}





/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZmVhMGU1YTYzZDU1M2YzMjU2NTgiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2NhbGN1bGF0aW9ucy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBwLmpzIiwid2VicGFjazovLy8uL3NyYy9jc3Mvc3R5bGUuY3NzP2UxYjQiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Nzcy9zdHlsZS5jc3MiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi91cmxzLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9mZXRjaC1zaGVldC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvd29yZHMtcGxheS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvY29tcG9uZW50cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvZ3JhcGguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7O0FDNURBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHNCQUFz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QTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNB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QUNBLDhCQUE4QixXQUFXO0FBQ3pDLDZCQUE2QixVQUFVO0FBQ3ZDLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxZQUFZO0FBQ1o7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFPQSIsImZpbGUiOiJvdXRwdXQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAxKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBmZWEwZTVhNjNkNTUzZjMyNTY1OCIsIlxuZnVuY3Rpb24gbWVyZ2VUZXJtcyhvYmpBcnIpe1xuICAgIHJldHVybiBvYmpBcnIucmVkdWNlKChhY2MsIHRlcm1zKSA9PiB7XG4gICAgICAgIHZhciBrZXlzID0gT2JqZWN0LmtleXModGVybXMpO1xuICAgICAgICB2YXIgcmVzdWx0ID0ge307XG4gICAgICAgIFxuICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKyl7XG4gICAgICAgICAgICB2YXIgdGVybSA9IGtleXNbaV07XG4gICAgICAgICAgICB2YXIgaWQgPSB0ZXJtc1t0ZXJtXTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYoYWNjW3Rlcm1dKXtcbiAgICAgICAgICAgICAgICBPYmplY3QuYXNzaWduKHJlc3VsdCwgeyBbdGVybV06IFsuLi5hY2NbdGVybV0sIGlkXSB9KVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBPYmplY3QuYXNzaWduKHJlc3VsdCwgeyBbdGVybV06IFtpZF0gfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKGFjYywgcmVzdWx0KTtcbiAgICB9LCB7fSk7XG59XG5cbi8qIFxue1xuICAgIHRlcm06IFN0cmluZyxcbiAgICB0b3RhbDogTnVtYmVyLFxuICAgIG5laWdoYm9yczogWy4uLnsgdGVybTogU3RyaW5nLCB0b3RhbFNoYXJlZDogTnVtYmVyIH1dXG59XG4qL1xuZnVuY3Rpb24gR3JhcGhOb2RlKHRlcm0sIHRvdGFsLCBuZWlnaGJvcnMpe1xuICAgIHJldHVybiB7XG4gICAgICAgIHRlcm0sXG4gICAgICAgIHRvdGFsLFxuICAgICAgICBuZWlnaGJvcnNcbiAgICB9O1xufVxuXG5cbmZ1bmN0aW9uIGNyZWF0ZUdyYXBoKHRlcm1zT2JqKXtcbiAgICB2YXIgbm9kZXMgPSBbXTtcbiAgICB2YXIgdGVybXMgPSBPYmplY3Qua2V5cyh0ZXJtc09iaik7XG4gICAgdmFyIHRlcm1zTGVuID0gdGVybXMubGVuZ3RoO1xuICAgIFxuICAgIGZvcih2YXIgaSA9IDA7IGkgPCB0ZXJtc0xlbjsgaSsrKXtcbiAgICAgICAgdmFyIG5laWdoYm9ycyA9IFtdO1xuICAgICAgICB2YXIgdGVybSA9IHRlcm1zW2ldO1xuICAgICAgICB2YXIgaWRzID0gdGVybXNPYmpbdGVybV07XG4gICAgICAgIFxuICAgICAgICBmb3IodmFyIGogPSAwOyBqIDwgdGVybXNMZW47IGorKyl7XG4gICAgICAgICAgICB2YXIgbmVpZ2hib3IgPSB0ZXJtc1tqXTtcbiAgICAgICAgICAgIHZhciBuZWlnaGJvcklkcyA9IHRlcm1zT2JqW25laWdoYm9yXTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYobmVpZ2hib3IgIT09IHRlcm0pe1xuICAgICAgICAgICAgICAgIHZhciBpbnRlcnNlY3Rpb24gPSBpbnRlcnNlY3QoaWRzLCBuZWlnaGJvcklkcykubGVuZ3RoO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGlmKGludGVyc2VjdGlvbiA+IDApe1xuICAgICAgICAgICAgICAgICAgIG5laWdoYm9ycy5wdXNoKHsgW25laWdoYm9yXTogaW50ZXJzZWN0aW9uIH0pOyBcbiAgICAgICAgICAgICAgICB9ICAgICBcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgbm9kZXMucHVzaChHcmFwaE5vZGUodGVybSwgaWRzLmxlbmd0aCwgbmVpZ2hib3JzKSk7XG4gICAgfVxuICAgIFxuICAgIHJldHVybiBub2Rlcztcbn1cblxuLyogQXJyYXksIEFycmF5IC0+IEFycmF5XG4gICAgYXNzdW1lcyBib3RoIGFycmF5cyBhcmUgc29ydGVkXG4gICAgLSBjb3VsZCB0YWtlIGFuIGFkZGl0aW9uYWwgYXJnOlxuICAgICAgICAtIEFORCwgT1IsIE5PVC4uLlxuICAgICAgICBhbGxvdyBmb3IgbW9yZSBjb21wbGV4IHF1ZXJpZXMgICovXG5mdW5jdGlvbiBpbnRlcnNlY3QoYXJyMSwgYXJyMil7XG4gICAgdmFyIHJlc3VsdCA9IFtdO1xuICAgIHZhciBhMSA9IGFycjE7XG4gICAgdmFyIGEyID0gYXJyMjtcblxuICAgIHdoaWxlKGExLmxlbmd0aCAhPT0gMCAmJiBhMi5sZW5ndGggIT09IDApe1xuICAgICAgICBpZihhMVswXSA9PT0gYTJbMF0pe1xuICAgICAgICAgICAgcmVzdWx0LnB1c2goYTFbMF0pO1xuICAgICAgICAgICAgYTEgPSBhMS5zbGljZSgxKTtcbiAgICAgICAgICAgIGEyID0gYTIuc2xpY2UoMSk7XG4gICAgICAgIH0gZWxzZSBpZihhMVswXSA8IGEyWzBdKXtcbiAgICAgICAgICAgIGExID0gYTEuc2xpY2UoMSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBhMiA9IGEyLnNsaWNlKDEpO1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIHJldHVybiByZXN1bHQ7XG59XG5cbi8qIEFycmF5IC0+IEFycmF5XG4gICAgXG4gICAgcmV0dXJucyBhcnJheSBpZHMgdGhhdCBhcmUgcHJlc2VudCBpbiBhbGwgZ2l2ZW4gbGFuZ3MgICovXG5mdW5jdGlvbiBtdWx0aXBsZUludGVyc2VjdCh0ZXJtcywgZGF0YSl7XG4gICAgLyogc29ydHMgbGFuZ3MgYnkgYXJyYXkgc2l6ZVxuICAgICAgIHN0YXJ0aW5nIHdpdGggc21hbGxlc3QgYXJyYXlzIG1lYW5zIFxuICAgICAgIGludGVybWVkaWF0ZSByZXN1bHRzIHdpbGwgYmUgbm8gYmlnZ2VyXG4gICAgICAgdGhhbiBzbWFsbGVzdCBhcnJheSAqL1xuICAgIHZhciBzb3J0ZWQgPSB0ZXJtcy5tYXAoKHRlcm0pID0+IHtcbiAgICAgICAgcmV0dXJuIGRhdGFbdGVybV07XG4gICAgfSkuc29ydCgoYSwgYikgPT4ge1xuICAgICAgICByZXR1cm4gYSAtIGI7XG4gICAgfSk7XG4gICAgXG4gICAgLy8gZmlyc3RcbiAgICB2YXIgcmVzdWx0ID0gc29ydGVkWzBdO1xuICAgIC8vIHJlc3RcbiAgICB2YXIgc29ydGVkID0gc29ydGVkLnNsaWNlKDEpO1xuICAgIFxuICAgIHdoaWxlKHNvcnRlZC5sZW5ndGggIT09IDAgJiYgcmVzdWx0Lmxlbmd0aCAhPT0gMCl7XG4gICAgICAgIC8vIGludGVyc2VjdCBmaXJzdCAmIHNlY29uZCAtIHNtYWxsZXN0IGFycmF5c1xuICAgICAgICByZXN1bHQgPSBpbnRlcnNlY3QocmVzdWx0LCBzb3J0ZWRbMF0pO1xuICAgICAgICBzb3J0ZWQgPSBzb3J0ZWQuc2xpY2UoMSk7XG4gICAgfVxuICAgIFxuICAgIHJldHVybiByZXN1bHQ7XG59XG5cblxuZXhwb3J0IHtcbiAgICBtZXJnZVRlcm1zLFxuICAgIGNyZWF0ZUdyYXBoLFxuICAgIGludGVyc2VjdFxufTtcblxuXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9qcy9jYWxjdWxhdGlvbnMuanNcbi8vIG1vZHVsZSBpZCA9IDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gY3NzXG5pbXBvcnQgJy4uL2Nzcy9zdHlsZS5jc3MnO1xuXG5pbXBvcnQgeyBtZXJnZVRlcm1zLCBjcmVhdGVHcmFwaCwgaW50ZXJzZWN0IH0gZnJvbSAnLi9jYWxjdWxhdGlvbnMnO1xuaW1wb3J0IHsgZ2V0SlNPTiB9IGZyb20gJy4vZmV0Y2gtc2hlZXQnO1xuaW1wb3J0IHsgcHJlc2VudFRlcm1zLCBwcmVzZW50VGVybXMyLCBURVJNUyB9IGZyb20gJy4vd29yZHMtcGxheSc7XG5pbXBvcnQgeyBSZXN1bHRzVGFibGUsIE5vUmVmc0xpc3QgfSBmcm9tICcuL2NvbXBvbmVudHMnO1xuaW1wb3J0IHsgR3JhcGgsIGNyZWF0ZU5vZGVzLCBjcmVhdGVMaW5rcyB9IGZyb20gJy4vZ3JhcGgnO1xuXG5jb25zdCBpZCA9ICcxZHRaeVVBb2JjV0M2eVliZHNSMV9Pd3cyOVhDYkVVTUFCVkQyMHc0Z0lwSSc7XG5jb25zdCB1cmwgPSBgaHR0cHM6Ly9zcHJlYWRzaGVldHMuZ29vZ2xlLmNvbS9mZWVkcy9saXN0LyR7aWR9LzIvcHVibGljL2Z1bGw/YWx0PWpzb25gO1xuXG5cbi8qIFlZWVktTU0tREQgKi9cbmZ1bmN0aW9uIGZvcm1hdERhdGUoZCl7XG4gICAgY29uc3QgeWVhciA9IGQuZ2V0RnVsbFllYXIoKTtcbiAgICBjb25zdCBtb250aCA9IGQuZ2V0TW9udGgoKSArIDE7XG4gICAgY29uc3QgZGF5ID0gZC5nZXREYXRlKCk7XG4gICAgY29uc3QgYmVsb3cxMCA9IG4gPT4gbiA8IDEwID8gJzAnICsgbiA6IG47XG4gICAgXG4gICAgcmV0dXJuIGAke3llYXJ9LSR7YmVsb3cxMChtb250aCl9LSR7YmVsb3cxMChkYXkpfWA7XG59XG5cbi8qIHJldHJpZXZlcyBvbmx5IHRoZSBpZCAmIHN1bW1hcnkgZnJvbSBHU2hlZXRzIHJlc3BvbnNlOlxuICAgeyBpZDogU3RyaW5nLCBzdW1tYXJ5OiBTdHJpbmcgfSAqL1xuZnVuY3Rpb24gY3JlYXRlU3VtbWFyaWVzKGpzb24pe1xuICAgIGNvbnN0IGVudHJpZXMgPSBqc29uLmZlZWQuZW50cnk7XG4gICAgXG4gICAgcmV0dXJuIGVudHJpZXMubWFwKGUgPT4ge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgaWQ6IGVbJ2dzeCRpZCddWyckdCddLFxuICAgICAgICAgICAgc3VtbWFyeTogZVsnZ3N4JHN1bW1hcnknXVsnJHQnXVxuICAgICAgICB9O1xuICAgIH0pO1xufVxuXG5cbi8qIGZldGNoZXMgc3VtbWFyaWVzIGZyb20gR1NoZWV0ICovXG4vKmFzeW5jIGZ1bmN0aW9uIGdldFN1bW1hcmllcygpe1xuICAgIHZhciBmZXRjaGVkID0gYXdhaXQgZ2V0SlNPTih1cmwpO1xuICAgIHZhciBqc29uID0gY3JlYXRlU3VtbWFyaWVzKGZldGNoZWQpO1xuICAgIFxuICAgIHJldHVybiBqc29uO1xufSovXG5cblxuLyogbWFpbiByZW5kZXJpbmcgZnVuY3Rpb24gKi9cbmZ1bmN0aW9uIHJlbmRlcih0YXJnZXQsIGh0bWwpe1xuICAgIHJldHVybiB0YXJnZXQuaW5uZXJIVE1MID0gaHRtbDtcbn1cblxuXG4vKiBmaWx0ZXJzIHRlcm1zIHRoYXQgaGF2ZSBubyByZWZlcmVuY2VzIFxuICAgbmVlZGVkIGluIG1haW4oKSAqL1xuZnVuY3Rpb24gZmlsdGVyV2l0aE5vUmVmcyhhY2MsIHRlcm0pe1xuICAgIC8vICd0aGlzIGlzICdyZXN1bHRzJyBPYmplY3QgaW4gbWFpblxuICAgIHJldHVybiB0ZXJtIGluIHRoaXMgPyBhY2MgOiBhY2MuY29uY2F0KHRlcm0pO1xufVxuXG5cbi8qIGdldHMgdGhlIHNpemUgb2YgdGhlIGNsaWVudCdzIGJyb3dzZXIgd2luZG93ICovXG5mdW5jdGlvbiBnZXRDbGllbnRTaXplKGRvY1dpZHRoKXtcbiAgICBpZihkb2NXaWR0aCA8IDczMCl7XG4gICAgICAgIHJldHVybiAzMDA7XG4gICAgfSBlbHNlIGlmKDczMCA8IGRvY1dpZHRoIDwgMTAwMCl7XG4gICAgICAgIHJldHVybiA0NTA7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIDYwMDtcbiAgICB9XG59XG5cblxuLyogT2JqZWN0IGZvciB3b3JraW5nIHdpdGggYXBwIGluIHdlYiBjb25zb2xlOiBcbiAgICdKb2JzLkFwcCcgKi9cbmV4cG9ydCBjb25zdCBBcHAgPSB7XG5cbiAgICAvLyB1bmZpbHRlcmVkIEdTaGVldHMgcmVzcG9uc2VcbiAgICByZXNwb25zZToge30sXG4gICAgc2V0IGFqYXgoanNvbil7XG4gICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHRoaXMucmVzcG9uc2UsIGpzb24pO1xuICAgIH0sXG4gICAgXG4gICAgLy8gZmlsdGVyZWQgcmVzcG9uc2UgZGF0YVxuICAgIGdldCBkYXRhKCl7XG4gICAgICAgIHJldHVybiBjcmVhdGVTdW1tYXJpZXModGhpcy5yZXNwb25zZSk7XG4gICAgfSxcbiAgICBcbiAgICAvLyBET00gT2JqZWN0c1xuICAgIHRhYmxlOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVzdWx0c1RhYmxlJyksXG4gICAgZ3JhcGg6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZXN1bHRzR3JhcGgnKSxcbiAgICBub1JlZnNMaXN0OiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbm9SZWZzTGlzdCcpLFxuICAgICAgXG4gICAgLy8gYXBwIGRhdGFcbiAgICBncmFwaFNpemU6IGdldENsaWVudFNpemUoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoKSxcbiAgICBcbiAgICBnZXQgcG9zdGVkRGF0ZSgpe1xuICAgICAgICBjb25zdCBkYXRlID0gdGhpcy5yZXNwb25zZS5mZWVkLnVwZGF0ZWRbJyR0J107XG4gICAgICAgIHJldHVybiBkYXRlID8gZm9ybWF0RGF0ZShuZXcgRGF0ZShkYXRlKSkgOiBmb3JtYXREYXRlKG5ldyBEYXRlKCkpO1xuICAgIH0sXG4gICAgZ2V0IHRvdGFsU3VtbWFyaWVzKCl7XG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEubGVuZ3RoO1xuICAgIH0sXG4gICAgZ2V0IHByZXNlbnRUZXJtcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5tYXAocyA9PiB7XG4gICAgICAgICAgICByZXR1cm4gcHJlc2VudFRlcm1zMihzLnN1bW1hcnksIHMuaWQpO1xuICAgICAgICB9KTsgXG4gICAgfSxcbiAgICBnZXQgdGVybXNJbmRleCgpe1xuICAgICAgICByZXR1cm4gbWVyZ2VUZXJtcyh0aGlzLnByZXNlbnRUZXJtcyk7XG4gICAgfSxcbiAgICBnZXQgZWFjaEluZGV4TGVuZ3RoKCl7XG4gICAgICAgIHJldHVybiBPYmplY3Qua2V5cyh0aGlzLnRlcm1zSW5kZXgpLm1hcChyID0+IHtcbiAgICAgICAgICAgIHJldHVybiBbciwgdGhpcy50ZXJtc0luZGV4W3JdLmxlbmd0aF07XG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgYWxsVGVybVN0cmluZ3M6IFRFUk1TLnNsaWNlKDApLFxuICAgIGdldCBhbGxXaXRoTm9SZWZzKCl7XG4gICAgICAgIHJldHVybiB0aGlzLmFsbFRlcm1TdHJpbmdzLnJlZHVjZShmaWx0ZXJXaXRoTm9SZWZzLmJpbmQodGhpcy50ZXJtc0luZGV4KSwgW10pOyBcbiAgICB9LFxuICAgIGdldCBncmFwaE5vZGVzKCl7XG4gICAgICAgIHJldHVybiBjcmVhdGVOb2Rlcyh0aGlzLnRlcm1zSW5kZXgpO1xuICAgIH0sXG4gICAgZ2V0IGdyYXBoTGlua3MoKXtcbiAgICAgICAgcmV0dXJuIGNyZWF0ZUxpbmtzKHRoaXMudGVybXNJbmRleCk7XG4gICAgfSxcblxuICAgIGRlYnVnOiB7XG4gICAgICAgIGludGVyc2VjdCxcbiAgICAgICAgY3JlYXRlTGlua3NcbiAgICB9XG59O1xuXG5cbi8qIGluaXRpYWxpemUgYXBwICovXG4oKCkgPT4ge1xuICAgIGNvbnN0IGluaXRBbmRSZW5kZXIgPSBqc29uID0+IHtcbiAgICAgICAgQXBwLmFqYXggPSBqc29uO1xuICAgICAgICBBcHAuZ3JhcGguaW5uZXJIVE1MID0gJyc7XG4gICAgICAgIFxuICAgICAgICByZW5kZXIocmVzdWx0c1RhYmxlLCBSZXN1bHRzVGFibGUoQXBwLmVhY2hJbmRleExlbmd0aCwgQXBwLnRvdGFsU3VtbWFyaWVzLCBBcHAucG9zdGVkRGF0ZSkpO1xuICAgICAgICBHcmFwaChBcHAuZ3JhcGhOb2RlcywgQXBwLmdyYXBoTGlua3MsIEFwcC5ncmFwaCwgQXBwLmdyYXBoU2l6ZSk7ICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICByZW5kZXIobm9SZWZzTGlzdCwgTm9SZWZzTGlzdChBcHAuYWxsV2l0aE5vUmVmcykpO1xuICAgIH07XG5cbiAgICByZXR1cm4gZ2V0SlNPTih1cmwpXG4gICAgICAgIC50aGVuKGluaXRBbmRSZW5kZXIpXG4gICAgICAgIC5jYXRjaChjb25zb2xlLmxvZyk7XG59KSgpO1xuXG5cblxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvanMvYXBwLmpzXG4vLyBtb2R1bGUgaWQgPSAxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIHN0eWxlLWxvYWRlcjogQWRkcyBzb21lIGNzcyB0byB0aGUgRE9NIGJ5IGFkZGluZyBhIDxzdHlsZT4gdGFnXG5cbi8vIGxvYWQgdGhlIHN0eWxlc1xudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuL3N0eWxlLmNzc1wiKTtcbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuLy8gUHJlcGFyZSBjc3NUcmFuc2Zvcm1hdGlvblxudmFyIHRyYW5zZm9ybTtcblxudmFyIG9wdGlvbnMgPSB7XCJobXJcIjp0cnVlfVxub3B0aW9ucy50cmFuc2Zvcm0gPSB0cmFuc2Zvcm1cbi8vIGFkZCB0aGUgc3R5bGVzIHRvIHRoZSBET01cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qc1wiKShjb250ZW50LCBvcHRpb25zKTtcbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuaWYobW9kdWxlLmhvdCkge1xuXHQvLyBXaGVuIHRoZSBzdHlsZXMgY2hhbmdlLCB1cGRhdGUgdGhlIDxzdHlsZT4gdGFnc1xuXHRpZighY29udGVudC5sb2NhbHMpIHtcblx0XHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi9zdHlsZS5jc3NcIiwgZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4vc3R5bGUuY3NzXCIpO1xuXHRcdFx0aWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG5cdFx0XHR1cGRhdGUobmV3Q29udGVudCk7XG5cdFx0fSk7XG5cdH1cblx0Ly8gV2hlbiB0aGUgbW9kdWxlIGlzIGRpc3Bvc2VkLCByZW1vdmUgdGhlIDxzdHlsZT4gdGFnc1xuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9jc3Mvc3R5bGUuY3NzXG4vLyBtb2R1bGUgaWQgPSAyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikodW5kZWZpbmVkKTtcbi8vIGltcG9ydHNcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIkBpbXBvcnQgdXJsKGh0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzP2ZhbWlseT1GaXJhK1NhbnM6NDAwLDcwMCk7XCIsIFwiXCJdKTtcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIkBpbXBvcnQgdXJsKGh0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzP2ZhbWlseT1NZXJyaXdlYXRoZXI6NDAwLDcwMCk7XCIsIFwiXCJdKTtcblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCJoMSxoMixoMyxoNCxoNSxoNiB7XFxuICBmb250LWZhbWlseTogJ0ZpcmEgU2FucycsIHNlcmlmO1xcbiAgbGV0dGVyLXNwYWNpbmc6IDAuMnJlbVxcbn1cXG5cXG5ociB7XFxuICB3aWR0aDogNTAlO1xcbiAgYm9yZGVyOiAxcHggc29saWQgI2NjYztcXG59XFxuXFxuYm9keSB7XFxuICBtYXJnaW46IDA7XFxuICBwYWRkaW5nOiAwO1xcblxcbiAgZm9udC1mYW1pbHk6ICdNZXJyaXdlYXRoZXInLCBzZXJpZjtcXG4gIGZvbnQtc2l6ZTogMC44cmVtO1xcbiAgICBcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn1cXG5cXG5oZWFkZXIge1xcbiAgaGVpZ2h0OiAyMHZoO1xcbiAgcGFkZGluZzogMDtcXG4gIG1hcmdpbjogMDtcXG4gIFxcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbmhlYWRlciA+IGgxLGgzLGg1IHtcXG4gIG1hcmdpbjogMDtcXG4gIHBhZGRpbmc6IDA7XFxufVxcblxcbm1haW4ge1xcbiAgd2lkdGg6IDkwdnc7XFxufVxcblxcbnNlY3Rpb24ge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxufVxcblxcbnRkIHtcXG4gICAgZm9udC1mYW1pbHk6ICdGaXJhIFNhbnMnLCBzYW5zLXNlcmlmO1xcbiAgICBmb250LXdlaWdodDogNTAwO1xcbiAgICBsZXR0ZXItc3BhY2luZzogMC4xNXJlbTtcXG59XFxuXFxudGQsIHRoIHtcXG4gICAgdGV4dC1hbGlnbjogbGVmdDtcXG4gICAgcGFkZGluZzogMC4xcmVtIDFyZW0gMC4zcmVtIDFyZW07XFxuICAgIGJvcmRlci1ib3R0b206IDFweCBkYXNoZWQgI2FhYTtcXG59XFxuXFxucCB7XFxuICBsaW5lLWhlaWdodDogMS41cmVtO1xcbiAgbWFyZ2luOiAxLjVyZW0gMXJlbSAxLjVyZW0gMXJlbTtcXG59XFxuXFxuZm9vdGVyIHtcXG4gIGZvbnQtZmFtaWx5OiAnTWVycml3ZWF0aGVyJywgc2VyaWY7XFxuICBtYXJnaW46IDA7XFxufVxcblxcblxcbi5sb2FkaW5nIHtcXG5cXHRtYXJnaW46IDVyZW07XFxufVxcblxcbmRpdi5wb3B1cCB7XFxuICAgIG1hcmdpbjogMDtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAgZm9udDogMXJlbSAnRmlyYSBTYW5zJztcXG4gICAgcGFkZGluZzogMC4xcmVtO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xcbiAgICBib3JkZXItcmFkaXVzOiAxNSU7XFxuICAgIHBvaW50ZXItZXZlbnRzOiBub25lO1xcbn1cXG5cXG5cXG5AbWVkaWEgKG1pbi13aWR0aDogNzMwKXtcXG4gIGJvZHkge1xcbiAgICBmb250LXNpemU6IDEuM3JlbTtcXG4gIH1cXG5cXG4gIHRkLCB0aCB7XFxuICAgIHBhZGRpbmc6IDAuNHJlbSA0cmVtIDAuNHJlbSA0cmVtO1xcbiAgfVxcbn1cXG5cXG5cXG5AbWVkaWEgKG1pbi13aWR0aDogMTAwMHB4KXtcXG4gIGJvZHkge1xcbiAgICBmb250LXNpemU6IDEuM3JlbTtcXG4gIH1cXG5cXG4gIHRkLCB0aCB7XFxuICAgIHBhZGRpbmc6IDAuNXJlbTtcXG4gIH1cXG4gIFxcbiAgbWFpbiB7XFxuICAgIHdpZHRoOiA4MHZ3O1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gICAgYWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7XFxuICB9XFxuICBcXG4gIHNlY3Rpb24ge1xcbiAgICB3aWR0aDogNTAlO1xcbiAgICBtYXJnaW46IDJyZW07XFxuICB9XFxuICBcXG4gIGFzaWRlIHtcXG4gICAgd2lkdGg6IDUwJTtcXG4gICAgbWFyZ2luOiAycmVtO1xcbiAgfVxcbiAgXFxuICBwIHtcXG4gICAgbWFyZ2luOiAycmVtIDAgMnJlbSAwO1xcbiAgICBsaW5lLWhlaWdodDogMi4ycmVtO1xcbiAgfVxcbiAgXFxuICB0YWJsZSB7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgfVxcbn1cXG5cIiwgXCJcIl0pO1xuXG4vLyBleHBvcnRzXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyIS4vc3JjL2Nzcy9zdHlsZS5jc3Ncbi8vIG1vZHVsZSBpZCA9IDNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLypcblx0TUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcblx0QXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbi8vIGNzcyBiYXNlIGNvZGUsIGluamVjdGVkIGJ5IHRoZSBjc3MtbG9hZGVyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHVzZVNvdXJjZU1hcCkge1xuXHR2YXIgbGlzdCA9IFtdO1xuXG5cdC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcblx0bGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuXHRcdHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuXHRcdFx0dmFyIGNvbnRlbnQgPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0sIHVzZVNvdXJjZU1hcCk7XG5cdFx0XHRpZihpdGVtWzJdKSB7XG5cdFx0XHRcdHJldHVybiBcIkBtZWRpYSBcIiArIGl0ZW1bMl0gKyBcIntcIiArIGNvbnRlbnQgKyBcIn1cIjtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHJldHVybiBjb250ZW50O1xuXHRcdFx0fVxuXHRcdH0pLmpvaW4oXCJcIik7XG5cdH07XG5cblx0Ly8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3Rcblx0bGlzdC5pID0gZnVuY3Rpb24obW9kdWxlcywgbWVkaWFRdWVyeSkge1xuXHRcdGlmKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKVxuXHRcdFx0bW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgXCJcIl1dO1xuXHRcdHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBpZCA9IHRoaXNbaV1bMF07XG5cdFx0XHRpZih0eXBlb2YgaWQgPT09IFwibnVtYmVyXCIpXG5cdFx0XHRcdGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcblx0XHR9XG5cdFx0Zm9yKGkgPSAwOyBpIDwgbW9kdWxlcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGl0ZW0gPSBtb2R1bGVzW2ldO1xuXHRcdFx0Ly8gc2tpcCBhbHJlYWR5IGltcG9ydGVkIG1vZHVsZVxuXHRcdFx0Ly8gdGhpcyBpbXBsZW1lbnRhdGlvbiBpcyBub3QgMTAwJSBwZXJmZWN0IGZvciB3ZWlyZCBtZWRpYSBxdWVyeSBjb21iaW5hdGlvbnNcblx0XHRcdC8vICB3aGVuIGEgbW9kdWxlIGlzIGltcG9ydGVkIG11bHRpcGxlIHRpbWVzIHdpdGggZGlmZmVyZW50IG1lZGlhIHF1ZXJpZXMuXG5cdFx0XHQvLyAgSSBob3BlIHRoaXMgd2lsbCBuZXZlciBvY2N1ciAoSGV5IHRoaXMgd2F5IHdlIGhhdmUgc21hbGxlciBidW5kbGVzKVxuXHRcdFx0aWYodHlwZW9mIGl0ZW1bMF0gIT09IFwibnVtYmVyXCIgfHwgIWFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcblx0XHRcdFx0aWYobWVkaWFRdWVyeSAmJiAhaXRlbVsyXSkge1xuXHRcdFx0XHRcdGl0ZW1bMl0gPSBtZWRpYVF1ZXJ5O1xuXHRcdFx0XHR9IGVsc2UgaWYobWVkaWFRdWVyeSkge1xuXHRcdFx0XHRcdGl0ZW1bMl0gPSBcIihcIiArIGl0ZW1bMl0gKyBcIikgYW5kIChcIiArIG1lZGlhUXVlcnkgKyBcIilcIjtcblx0XHRcdFx0fVxuXHRcdFx0XHRsaXN0LnB1c2goaXRlbSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9O1xuXHRyZXR1cm4gbGlzdDtcbn07XG5cbmZ1bmN0aW9uIGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSwgdXNlU291cmNlTWFwKSB7XG5cdHZhciBjb250ZW50ID0gaXRlbVsxXSB8fCAnJztcblx0dmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuXHRpZiAoIWNzc01hcHBpbmcpIHtcblx0XHRyZXR1cm4gY29udGVudDtcblx0fVxuXG5cdGlmICh1c2VTb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgPT09ICdmdW5jdGlvbicpIHtcblx0XHR2YXIgc291cmNlTWFwcGluZyA9IHRvQ29tbWVudChjc3NNYXBwaW5nKTtcblx0XHR2YXIgc291cmNlVVJMcyA9IGNzc01hcHBpbmcuc291cmNlcy5tYXAoZnVuY3Rpb24gKHNvdXJjZSkge1xuXHRcdFx0cmV0dXJuICcvKiMgc291cmNlVVJMPScgKyBjc3NNYXBwaW5nLnNvdXJjZVJvb3QgKyBzb3VyY2UgKyAnICovJ1xuXHRcdH0pO1xuXG5cdFx0cmV0dXJuIFtjb250ZW50XS5jb25jYXQoc291cmNlVVJMcykuY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbignXFxuJyk7XG5cdH1cblxuXHRyZXR1cm4gW2NvbnRlbnRdLmpvaW4oJ1xcbicpO1xufVxuXG4vLyBBZGFwdGVkIGZyb20gY29udmVydC1zb3VyY2UtbWFwIChNSVQpXG5mdW5jdGlvbiB0b0NvbW1lbnQoc291cmNlTWFwKSB7XG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bmRlZlxuXHR2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKTtcblx0dmFyIGRhdGEgPSAnc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsJyArIGJhc2U2NDtcblxuXHRyZXR1cm4gJy8qIyAnICsgZGF0YSArICcgKi8nO1xufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcbi8vIG1vZHVsZSBpZCA9IDRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLypcblx0TUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcblx0QXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cblxudmFyIHN0eWxlc0luRG9tID0ge307XG5cbnZhclx0bWVtb2l6ZSA9IGZ1bmN0aW9uIChmbikge1xuXHR2YXIgbWVtbztcblxuXHRyZXR1cm4gZnVuY3Rpb24gKCkge1xuXHRcdGlmICh0eXBlb2YgbWVtbyA9PT0gXCJ1bmRlZmluZWRcIikgbWVtbyA9IGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cdFx0cmV0dXJuIG1lbW87XG5cdH07XG59O1xuXG52YXIgaXNPbGRJRSA9IG1lbW9pemUoZnVuY3Rpb24gKCkge1xuXHQvLyBUZXN0IGZvciBJRSA8PSA5IGFzIHByb3Bvc2VkIGJ5IEJyb3dzZXJoYWNrc1xuXHQvLyBAc2VlIGh0dHA6Ly9icm93c2VyaGFja3MuY29tLyNoYWNrLWU3MWQ4NjkyZjY1MzM0MTczZmVlNzE1YzIyMmNiODA1XG5cdC8vIFRlc3RzIGZvciBleGlzdGVuY2Ugb2Ygc3RhbmRhcmQgZ2xvYmFscyBpcyB0byBhbGxvdyBzdHlsZS1sb2FkZXJcblx0Ly8gdG8gb3BlcmF0ZSBjb3JyZWN0bHkgaW50byBub24tc3RhbmRhcmQgZW52aXJvbm1lbnRzXG5cdC8vIEBzZWUgaHR0cHM6Ly9naXRodWIuY29tL3dlYnBhY2stY29udHJpYi9zdHlsZS1sb2FkZXIvaXNzdWVzLzE3N1xuXHRyZXR1cm4gd2luZG93ICYmIGRvY3VtZW50ICYmIGRvY3VtZW50LmFsbCAmJiAhd2luZG93LmF0b2I7XG59KTtcblxudmFyIGdldEVsZW1lbnQgPSAoZnVuY3Rpb24gKGZuKSB7XG5cdHZhciBtZW1vID0ge307XG5cblx0cmV0dXJuIGZ1bmN0aW9uKHNlbGVjdG9yKSB7XG5cdFx0aWYgKHR5cGVvZiBtZW1vW3NlbGVjdG9yXSA9PT0gXCJ1bmRlZmluZWRcIikge1xuXHRcdFx0dmFyIHN0eWxlVGFyZ2V0ID0gZm4uY2FsbCh0aGlzLCBzZWxlY3Rvcik7XG5cdFx0XHQvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuXHRcdFx0aWYgKHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG5cdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0Ly8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcblx0XHRcdFx0XHQvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuXHRcdFx0XHRcdHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG5cdFx0XHRcdH0gY2F0Y2goZSkge1xuXHRcdFx0XHRcdHN0eWxlVGFyZ2V0ID0gbnVsbDtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0bWVtb1tzZWxlY3Rvcl0gPSBzdHlsZVRhcmdldDtcblx0XHR9XG5cdFx0cmV0dXJuIG1lbW9bc2VsZWN0b3JdXG5cdH07XG59KShmdW5jdGlvbiAodGFyZ2V0KSB7XG5cdHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldClcbn0pO1xuXG52YXIgc2luZ2xldG9uID0gbnVsbDtcbnZhclx0c2luZ2xldG9uQ291bnRlciA9IDA7XG52YXJcdHN0eWxlc0luc2VydGVkQXRUb3AgPSBbXTtcblxudmFyXHRmaXhVcmxzID0gcmVxdWlyZShcIi4vdXJsc1wiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihsaXN0LCBvcHRpb25zKSB7XG5cdGlmICh0eXBlb2YgREVCVUcgIT09IFwidW5kZWZpbmVkXCIgJiYgREVCVUcpIHtcblx0XHRpZiAodHlwZW9mIGRvY3VtZW50ICE9PSBcIm9iamVjdFwiKSB0aHJvdyBuZXcgRXJyb3IoXCJUaGUgc3R5bGUtbG9hZGVyIGNhbm5vdCBiZSB1c2VkIGluIGEgbm9uLWJyb3dzZXIgZW52aXJvbm1lbnRcIik7XG5cdH1cblxuXHRvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuXHRvcHRpb25zLmF0dHJzID0gdHlwZW9mIG9wdGlvbnMuYXR0cnMgPT09IFwib2JqZWN0XCIgPyBvcHRpb25zLmF0dHJzIDoge307XG5cblx0Ly8gRm9yY2Ugc2luZ2xlLXRhZyBzb2x1dGlvbiBvbiBJRTYtOSwgd2hpY2ggaGFzIGEgaGFyZCBsaW1pdCBvbiB0aGUgIyBvZiA8c3R5bGU+XG5cdC8vIHRhZ3MgaXQgd2lsbCBhbGxvdyBvbiBhIHBhZ2Vcblx0aWYgKCFvcHRpb25zLnNpbmdsZXRvbikgb3B0aW9ucy5zaW5nbGV0b24gPSBpc09sZElFKCk7XG5cblx0Ly8gQnkgZGVmYXVsdCwgYWRkIDxzdHlsZT4gdGFncyB0byB0aGUgPGhlYWQ+IGVsZW1lbnRcblx0aWYgKCFvcHRpb25zLmluc2VydEludG8pIG9wdGlvbnMuaW5zZXJ0SW50byA9IFwiaGVhZFwiO1xuXG5cdC8vIEJ5IGRlZmF1bHQsIGFkZCA8c3R5bGU+IHRhZ3MgdG8gdGhlIGJvdHRvbSBvZiB0aGUgdGFyZ2V0XG5cdGlmICghb3B0aW9ucy5pbnNlcnRBdCkgb3B0aW9ucy5pbnNlcnRBdCA9IFwiYm90dG9tXCI7XG5cblx0dmFyIHN0eWxlcyA9IGxpc3RUb1N0eWxlcyhsaXN0LCBvcHRpb25zKTtcblxuXHRhZGRTdHlsZXNUb0RvbShzdHlsZXMsIG9wdGlvbnMpO1xuXG5cdHJldHVybiBmdW5jdGlvbiB1cGRhdGUgKG5ld0xpc3QpIHtcblx0XHR2YXIgbWF5UmVtb3ZlID0gW107XG5cblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGl0ZW0gPSBzdHlsZXNbaV07XG5cdFx0XHR2YXIgZG9tU3R5bGUgPSBzdHlsZXNJbkRvbVtpdGVtLmlkXTtcblxuXHRcdFx0ZG9tU3R5bGUucmVmcy0tO1xuXHRcdFx0bWF5UmVtb3ZlLnB1c2goZG9tU3R5bGUpO1xuXHRcdH1cblxuXHRcdGlmKG5ld0xpc3QpIHtcblx0XHRcdHZhciBuZXdTdHlsZXMgPSBsaXN0VG9TdHlsZXMobmV3TGlzdCwgb3B0aW9ucyk7XG5cdFx0XHRhZGRTdHlsZXNUb0RvbShuZXdTdHlsZXMsIG9wdGlvbnMpO1xuXHRcdH1cblxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgbWF5UmVtb3ZlLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgZG9tU3R5bGUgPSBtYXlSZW1vdmVbaV07XG5cblx0XHRcdGlmKGRvbVN0eWxlLnJlZnMgPT09IDApIHtcblx0XHRcdFx0Zm9yICh2YXIgaiA9IDA7IGogPCBkb21TdHlsZS5wYXJ0cy5sZW5ndGg7IGorKykgZG9tU3R5bGUucGFydHNbal0oKTtcblxuXHRcdFx0XHRkZWxldGUgc3R5bGVzSW5Eb21bZG9tU3R5bGUuaWRdO1xuXHRcdFx0fVxuXHRcdH1cblx0fTtcbn07XG5cbmZ1bmN0aW9uIGFkZFN0eWxlc1RvRG9tIChzdHlsZXMsIG9wdGlvbnMpIHtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXMubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgaXRlbSA9IHN0eWxlc1tpXTtcblx0XHR2YXIgZG9tU3R5bGUgPSBzdHlsZXNJbkRvbVtpdGVtLmlkXTtcblxuXHRcdGlmKGRvbVN0eWxlKSB7XG5cdFx0XHRkb21TdHlsZS5yZWZzKys7XG5cblx0XHRcdGZvcih2YXIgaiA9IDA7IGogPCBkb21TdHlsZS5wYXJ0cy5sZW5ndGg7IGorKykge1xuXHRcdFx0XHRkb21TdHlsZS5wYXJ0c1tqXShpdGVtLnBhcnRzW2pdKTtcblx0XHRcdH1cblxuXHRcdFx0Zm9yKDsgaiA8IGl0ZW0ucGFydHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdFx0ZG9tU3R5bGUucGFydHMucHVzaChhZGRTdHlsZShpdGVtLnBhcnRzW2pdLCBvcHRpb25zKSk7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdHZhciBwYXJ0cyA9IFtdO1xuXG5cdFx0XHRmb3IodmFyIGogPSAwOyBqIDwgaXRlbS5wYXJ0cy5sZW5ndGg7IGorKykge1xuXHRcdFx0XHRwYXJ0cy5wdXNoKGFkZFN0eWxlKGl0ZW0ucGFydHNbal0sIG9wdGlvbnMpKTtcblx0XHRcdH1cblxuXHRcdFx0c3R5bGVzSW5Eb21baXRlbS5pZF0gPSB7aWQ6IGl0ZW0uaWQsIHJlZnM6IDEsIHBhcnRzOiBwYXJ0c307XG5cdFx0fVxuXHR9XG59XG5cbmZ1bmN0aW9uIGxpc3RUb1N0eWxlcyAobGlzdCwgb3B0aW9ucykge1xuXHR2YXIgc3R5bGVzID0gW107XG5cdHZhciBuZXdTdHlsZXMgPSB7fTtcblxuXHRmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgaXRlbSA9IGxpc3RbaV07XG5cdFx0dmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG5cdFx0dmFyIGNzcyA9IGl0ZW1bMV07XG5cdFx0dmFyIG1lZGlhID0gaXRlbVsyXTtcblx0XHR2YXIgc291cmNlTWFwID0gaXRlbVszXTtcblx0XHR2YXIgcGFydCA9IHtjc3M6IGNzcywgbWVkaWE6IG1lZGlhLCBzb3VyY2VNYXA6IHNvdXJjZU1hcH07XG5cblx0XHRpZighbmV3U3R5bGVzW2lkXSkgc3R5bGVzLnB1c2gobmV3U3R5bGVzW2lkXSA9IHtpZDogaWQsIHBhcnRzOiBbcGFydF19KTtcblx0XHRlbHNlIG5ld1N0eWxlc1tpZF0ucGFydHMucHVzaChwYXJ0KTtcblx0fVxuXG5cdHJldHVybiBzdHlsZXM7XG59XG5cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudCAob3B0aW9ucywgc3R5bGUpIHtcblx0dmFyIHRhcmdldCA9IGdldEVsZW1lbnQob3B0aW9ucy5pbnNlcnRJbnRvKVxuXG5cdGlmICghdGFyZ2V0KSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnRJbnRvJyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG5cdH1cblxuXHR2YXIgbGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3AgPSBzdHlsZXNJbnNlcnRlZEF0VG9wW3N0eWxlc0luc2VydGVkQXRUb3AubGVuZ3RoIC0gMV07XG5cblx0aWYgKG9wdGlvbnMuaW5zZXJ0QXQgPT09IFwidG9wXCIpIHtcblx0XHRpZiAoIWxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wKSB7XG5cdFx0XHR0YXJnZXQuaW5zZXJ0QmVmb3JlKHN0eWxlLCB0YXJnZXQuZmlyc3RDaGlsZCk7XG5cdFx0fSBlbHNlIGlmIChsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcC5uZXh0U2libGluZykge1xuXHRcdFx0dGFyZ2V0Lmluc2VydEJlZm9yZShzdHlsZSwgbGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3AubmV4dFNpYmxpbmcpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xuXHRcdH1cblx0XHRzdHlsZXNJbnNlcnRlZEF0VG9wLnB1c2goc3R5bGUpO1xuXHR9IGVsc2UgaWYgKG9wdGlvbnMuaW5zZXJ0QXQgPT09IFwiYm90dG9tXCIpIHtcblx0XHR0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xuXHR9IGVsc2UgaWYgKHR5cGVvZiBvcHRpb25zLmluc2VydEF0ID09PSBcIm9iamVjdFwiICYmIG9wdGlvbnMuaW5zZXJ0QXQuYmVmb3JlKSB7XG5cdFx0dmFyIG5leHRTaWJsaW5nID0gZ2V0RWxlbWVudChvcHRpb25zLmluc2VydEludG8gKyBcIiBcIiArIG9wdGlvbnMuaW5zZXJ0QXQuYmVmb3JlKTtcblx0XHR0YXJnZXQuaW5zZXJ0QmVmb3JlKHN0eWxlLCBuZXh0U2libGluZyk7XG5cdH0gZWxzZSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKFwiW1N0eWxlIExvYWRlcl1cXG5cXG4gSW52YWxpZCB2YWx1ZSBmb3IgcGFyYW1ldGVyICdpbnNlcnRBdCcgKCdvcHRpb25zLmluc2VydEF0JykgZm91bmQuXFxuIE11c3QgYmUgJ3RvcCcsICdib3R0b20nLCBvciBPYmplY3QuXFxuIChodHRwczovL2dpdGh1Yi5jb20vd2VicGFjay1jb250cmliL3N0eWxlLWxvYWRlciNpbnNlcnRhdClcXG5cIik7XG5cdH1cbn1cblxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50IChzdHlsZSkge1xuXHRpZiAoc3R5bGUucGFyZW50Tm9kZSA9PT0gbnVsbCkgcmV0dXJuIGZhbHNlO1xuXHRzdHlsZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlKTtcblxuXHR2YXIgaWR4ID0gc3R5bGVzSW5zZXJ0ZWRBdFRvcC5pbmRleE9mKHN0eWxlKTtcblx0aWYoaWR4ID49IDApIHtcblx0XHRzdHlsZXNJbnNlcnRlZEF0VG9wLnNwbGljZShpZHgsIDEpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVN0eWxlRWxlbWVudCAob3B0aW9ucykge1xuXHR2YXIgc3R5bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG5cblx0b3B0aW9ucy5hdHRycy50eXBlID0gXCJ0ZXh0L2Nzc1wiO1xuXG5cdGFkZEF0dHJzKHN0eWxlLCBvcHRpb25zLmF0dHJzKTtcblx0aW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMsIHN0eWxlKTtcblxuXHRyZXR1cm4gc3R5bGU7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUxpbmtFbGVtZW50IChvcHRpb25zKSB7XG5cdHZhciBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpbmtcIik7XG5cblx0b3B0aW9ucy5hdHRycy50eXBlID0gXCJ0ZXh0L2Nzc1wiO1xuXHRvcHRpb25zLmF0dHJzLnJlbCA9IFwic3R5bGVzaGVldFwiO1xuXG5cdGFkZEF0dHJzKGxpbmssIG9wdGlvbnMuYXR0cnMpO1xuXHRpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucywgbGluayk7XG5cblx0cmV0dXJuIGxpbms7XG59XG5cbmZ1bmN0aW9uIGFkZEF0dHJzIChlbCwgYXR0cnMpIHtcblx0T2JqZWN0LmtleXMoYXR0cnMpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuXHRcdGVsLnNldEF0dHJpYnV0ZShrZXksIGF0dHJzW2tleV0pO1xuXHR9KTtcbn1cblxuZnVuY3Rpb24gYWRkU3R5bGUgKG9iaiwgb3B0aW9ucykge1xuXHR2YXIgc3R5bGUsIHVwZGF0ZSwgcmVtb3ZlLCByZXN1bHQ7XG5cblx0Ly8gSWYgYSB0cmFuc2Zvcm0gZnVuY3Rpb24gd2FzIGRlZmluZWQsIHJ1biBpdCBvbiB0aGUgY3NzXG5cdGlmIChvcHRpb25zLnRyYW5zZm9ybSAmJiBvYmouY3NzKSB7XG5cdCAgICByZXN1bHQgPSBvcHRpb25zLnRyYW5zZm9ybShvYmouY3NzKTtcblxuXHQgICAgaWYgKHJlc3VsdCkge1xuXHQgICAgXHQvLyBJZiB0cmFuc2Zvcm0gcmV0dXJucyBhIHZhbHVlLCB1c2UgdGhhdCBpbnN0ZWFkIG9mIHRoZSBvcmlnaW5hbCBjc3MuXG5cdCAgICBcdC8vIFRoaXMgYWxsb3dzIHJ1bm5pbmcgcnVudGltZSB0cmFuc2Zvcm1hdGlvbnMgb24gdGhlIGNzcy5cblx0ICAgIFx0b2JqLmNzcyA9IHJlc3VsdDtcblx0ICAgIH0gZWxzZSB7XG5cdCAgICBcdC8vIElmIHRoZSB0cmFuc2Zvcm0gZnVuY3Rpb24gcmV0dXJucyBhIGZhbHN5IHZhbHVlLCBkb24ndCBhZGQgdGhpcyBjc3MuXG5cdCAgICBcdC8vIFRoaXMgYWxsb3dzIGNvbmRpdGlvbmFsIGxvYWRpbmcgb2YgY3NzXG5cdCAgICBcdHJldHVybiBmdW5jdGlvbigpIHtcblx0ICAgIFx0XHQvLyBub29wXG5cdCAgICBcdH07XG5cdCAgICB9XG5cdH1cblxuXHRpZiAob3B0aW9ucy5zaW5nbGV0b24pIHtcblx0XHR2YXIgc3R5bGVJbmRleCA9IHNpbmdsZXRvbkNvdW50ZXIrKztcblxuXHRcdHN0eWxlID0gc2luZ2xldG9uIHx8IChzaW5nbGV0b24gPSBjcmVhdGVTdHlsZUVsZW1lbnQob3B0aW9ucykpO1xuXG5cdFx0dXBkYXRlID0gYXBwbHlUb1NpbmdsZXRvblRhZy5iaW5kKG51bGwsIHN0eWxlLCBzdHlsZUluZGV4LCBmYWxzZSk7XG5cdFx0cmVtb3ZlID0gYXBwbHlUb1NpbmdsZXRvblRhZy5iaW5kKG51bGwsIHN0eWxlLCBzdHlsZUluZGV4LCB0cnVlKTtcblxuXHR9IGVsc2UgaWYgKFxuXHRcdG9iai5zb3VyY2VNYXAgJiZcblx0XHR0eXBlb2YgVVJMID09PSBcImZ1bmN0aW9uXCIgJiZcblx0XHR0eXBlb2YgVVJMLmNyZWF0ZU9iamVjdFVSTCA9PT0gXCJmdW5jdGlvblwiICYmXG5cdFx0dHlwZW9mIFVSTC5yZXZva2VPYmplY3RVUkwgPT09IFwiZnVuY3Rpb25cIiAmJlxuXHRcdHR5cGVvZiBCbG9iID09PSBcImZ1bmN0aW9uXCIgJiZcblx0XHR0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiXG5cdCkge1xuXHRcdHN0eWxlID0gY3JlYXRlTGlua0VsZW1lbnQob3B0aW9ucyk7XG5cdFx0dXBkYXRlID0gdXBkYXRlTGluay5iaW5kKG51bGwsIHN0eWxlLCBvcHRpb25zKTtcblx0XHRyZW1vdmUgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGUpO1xuXG5cdFx0XHRpZihzdHlsZS5ocmVmKSBVUkwucmV2b2tlT2JqZWN0VVJMKHN0eWxlLmhyZWYpO1xuXHRcdH07XG5cdH0gZWxzZSB7XG5cdFx0c3R5bGUgPSBjcmVhdGVTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG5cdFx0dXBkYXRlID0gYXBwbHlUb1RhZy5iaW5kKG51bGwsIHN0eWxlKTtcblx0XHRyZW1vdmUgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGUpO1xuXHRcdH07XG5cdH1cblxuXHR1cGRhdGUob2JqKTtcblxuXHRyZXR1cm4gZnVuY3Rpb24gdXBkYXRlU3R5bGUgKG5ld09iaikge1xuXHRcdGlmIChuZXdPYmopIHtcblx0XHRcdGlmIChcblx0XHRcdFx0bmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJlxuXHRcdFx0XHRuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJlxuXHRcdFx0XHRuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwXG5cdFx0XHQpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHR1cGRhdGUob2JqID0gbmV3T2JqKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmVtb3ZlKCk7XG5cdFx0fVxuXHR9O1xufVxuXG52YXIgcmVwbGFjZVRleHQgPSAoZnVuY3Rpb24gKCkge1xuXHR2YXIgdGV4dFN0b3JlID0gW107XG5cblx0cmV0dXJuIGZ1bmN0aW9uIChpbmRleCwgcmVwbGFjZW1lbnQpIHtcblx0XHR0ZXh0U3RvcmVbaW5kZXhdID0gcmVwbGFjZW1lbnQ7XG5cblx0XHRyZXR1cm4gdGV4dFN0b3JlLmZpbHRlcihCb29sZWFuKS5qb2luKCdcXG4nKTtcblx0fTtcbn0pKCk7XG5cbmZ1bmN0aW9uIGFwcGx5VG9TaW5nbGV0b25UYWcgKHN0eWxlLCBpbmRleCwgcmVtb3ZlLCBvYmopIHtcblx0dmFyIGNzcyA9IHJlbW92ZSA/IFwiXCIgOiBvYmouY3NzO1xuXG5cdGlmIChzdHlsZS5zdHlsZVNoZWV0KSB7XG5cdFx0c3R5bGUuc3R5bGVTaGVldC5jc3NUZXh0ID0gcmVwbGFjZVRleHQoaW5kZXgsIGNzcyk7XG5cdH0gZWxzZSB7XG5cdFx0dmFyIGNzc05vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpO1xuXHRcdHZhciBjaGlsZE5vZGVzID0gc3R5bGUuY2hpbGROb2RlcztcblxuXHRcdGlmIChjaGlsZE5vZGVzW2luZGV4XSkgc3R5bGUucmVtb3ZlQ2hpbGQoY2hpbGROb2Rlc1tpbmRleF0pO1xuXG5cdFx0aWYgKGNoaWxkTm9kZXMubGVuZ3RoKSB7XG5cdFx0XHRzdHlsZS5pbnNlcnRCZWZvcmUoY3NzTm9kZSwgY2hpbGROb2Rlc1tpbmRleF0pO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRzdHlsZS5hcHBlbmRDaGlsZChjc3NOb2RlKTtcblx0XHR9XG5cdH1cbn1cblxuZnVuY3Rpb24gYXBwbHlUb1RhZyAoc3R5bGUsIG9iaikge1xuXHR2YXIgY3NzID0gb2JqLmNzcztcblx0dmFyIG1lZGlhID0gb2JqLm1lZGlhO1xuXG5cdGlmKG1lZGlhKSB7XG5cdFx0c3R5bGUuc2V0QXR0cmlidXRlKFwibWVkaWFcIiwgbWVkaWEpXG5cdH1cblxuXHRpZihzdHlsZS5zdHlsZVNoZWV0KSB7XG5cdFx0c3R5bGUuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuXHR9IGVsc2Uge1xuXHRcdHdoaWxlKHN0eWxlLmZpcnN0Q2hpbGQpIHtcblx0XHRcdHN0eWxlLnJlbW92ZUNoaWxkKHN0eWxlLmZpcnN0Q2hpbGQpO1xuXHRcdH1cblxuXHRcdHN0eWxlLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUxpbmsgKGxpbmssIG9wdGlvbnMsIG9iaikge1xuXHR2YXIgY3NzID0gb2JqLmNzcztcblx0dmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG5cblx0Lypcblx0XHRJZiBjb252ZXJ0VG9BYnNvbHV0ZVVybHMgaXNuJ3QgZGVmaW5lZCwgYnV0IHNvdXJjZW1hcHMgYXJlIGVuYWJsZWRcblx0XHRhbmQgdGhlcmUgaXMgbm8gcHVibGljUGF0aCBkZWZpbmVkIHRoZW4gbGV0cyB0dXJuIGNvbnZlcnRUb0Fic29sdXRlVXJsc1xuXHRcdG9uIGJ5IGRlZmF1bHQuICBPdGhlcndpc2UgZGVmYXVsdCB0byB0aGUgY29udmVydFRvQWJzb2x1dGVVcmxzIG9wdGlvblxuXHRcdGRpcmVjdGx5XG5cdCovXG5cdHZhciBhdXRvRml4VXJscyA9IG9wdGlvbnMuY29udmVydFRvQWJzb2x1dGVVcmxzID09PSB1bmRlZmluZWQgJiYgc291cmNlTWFwO1xuXG5cdGlmIChvcHRpb25zLmNvbnZlcnRUb0Fic29sdXRlVXJscyB8fCBhdXRvRml4VXJscykge1xuXHRcdGNzcyA9IGZpeFVybHMoY3NzKTtcblx0fVxuXG5cdGlmIChzb3VyY2VNYXApIHtcblx0XHQvLyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8yNjYwMzg3NVxuXHRcdGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIgKyBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpICsgXCIgKi9cIjtcblx0fVxuXG5cdHZhciBibG9iID0gbmV3IEJsb2IoW2Nzc10sIHsgdHlwZTogXCJ0ZXh0L2Nzc1wiIH0pO1xuXG5cdHZhciBvbGRTcmMgPSBsaW5rLmhyZWY7XG5cblx0bGluay5ocmVmID0gVVJMLmNyZWF0ZU9iamVjdFVSTChibG9iKTtcblxuXHRpZihvbGRTcmMpIFVSTC5yZXZva2VPYmplY3RVUkwob2xkU3JjKTtcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzXG4vLyBtb2R1bGUgaWQgPSA1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlxuLyoqXG4gKiBXaGVuIHNvdXJjZSBtYXBzIGFyZSBlbmFibGVkLCBgc3R5bGUtbG9hZGVyYCB1c2VzIGEgbGluayBlbGVtZW50IHdpdGggYSBkYXRhLXVyaSB0b1xuICogZW1iZWQgdGhlIGNzcyBvbiB0aGUgcGFnZS4gVGhpcyBicmVha3MgYWxsIHJlbGF0aXZlIHVybHMgYmVjYXVzZSBub3cgdGhleSBhcmUgcmVsYXRpdmUgdG8gYVxuICogYnVuZGxlIGluc3RlYWQgb2YgdGhlIGN1cnJlbnQgcGFnZS5cbiAqXG4gKiBPbmUgc29sdXRpb24gaXMgdG8gb25seSB1c2UgZnVsbCB1cmxzLCBidXQgdGhhdCBtYXkgYmUgaW1wb3NzaWJsZS5cbiAqXG4gKiBJbnN0ZWFkLCB0aGlzIGZ1bmN0aW9uIFwiZml4ZXNcIiB0aGUgcmVsYXRpdmUgdXJscyB0byBiZSBhYnNvbHV0ZSBhY2NvcmRpbmcgdG8gdGhlIGN1cnJlbnQgcGFnZSBsb2NhdGlvbi5cbiAqXG4gKiBBIHJ1ZGltZW50YXJ5IHRlc3Qgc3VpdGUgaXMgbG9jYXRlZCBhdCBgdGVzdC9maXhVcmxzLmpzYCBhbmQgY2FuIGJlIHJ1biB2aWEgdGhlIGBucG0gdGVzdGAgY29tbWFuZC5cbiAqXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzKSB7XG4gIC8vIGdldCBjdXJyZW50IGxvY2F0aW9uXG4gIHZhciBsb2NhdGlvbiA9IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgJiYgd2luZG93LmxvY2F0aW9uO1xuXG4gIGlmICghbG9jYXRpb24pIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJmaXhVcmxzIHJlcXVpcmVzIHdpbmRvdy5sb2NhdGlvblwiKTtcbiAgfVxuXG5cdC8vIGJsYW5rIG9yIG51bGw/XG5cdGlmICghY3NzIHx8IHR5cGVvZiBjc3MgIT09IFwic3RyaW5nXCIpIHtcblx0ICByZXR1cm4gY3NzO1xuICB9XG5cbiAgdmFyIGJhc2VVcmwgPSBsb2NhdGlvbi5wcm90b2NvbCArIFwiLy9cIiArIGxvY2F0aW9uLmhvc3Q7XG4gIHZhciBjdXJyZW50RGlyID0gYmFzZVVybCArIGxvY2F0aW9uLnBhdGhuYW1lLnJlcGxhY2UoL1xcL1teXFwvXSokLywgXCIvXCIpO1xuXG5cdC8vIGNvbnZlcnQgZWFjaCB1cmwoLi4uKVxuXHQvKlxuXHRUaGlzIHJlZ3VsYXIgZXhwcmVzc2lvbiBpcyBqdXN0IGEgd2F5IHRvIHJlY3Vyc2l2ZWx5IG1hdGNoIGJyYWNrZXRzIHdpdGhpblxuXHRhIHN0cmluZy5cblxuXHQgL3VybFxccypcXCggID0gTWF0Y2ggb24gdGhlIHdvcmQgXCJ1cmxcIiB3aXRoIGFueSB3aGl0ZXNwYWNlIGFmdGVyIGl0IGFuZCB0aGVuIGEgcGFyZW5zXG5cdCAgICggID0gU3RhcnQgYSBjYXB0dXJpbmcgZ3JvdXBcblx0ICAgICAoPzogID0gU3RhcnQgYSBub24tY2FwdHVyaW5nIGdyb3VwXG5cdCAgICAgICAgIFteKShdICA9IE1hdGNoIGFueXRoaW5nIHRoYXQgaXNuJ3QgYSBwYXJlbnRoZXNlc1xuXHQgICAgICAgICB8ICA9IE9SXG5cdCAgICAgICAgIFxcKCAgPSBNYXRjaCBhIHN0YXJ0IHBhcmVudGhlc2VzXG5cdCAgICAgICAgICAgICAoPzogID0gU3RhcnQgYW5vdGhlciBub24tY2FwdHVyaW5nIGdyb3Vwc1xuXHQgICAgICAgICAgICAgICAgIFteKShdKyAgPSBNYXRjaCBhbnl0aGluZyB0aGF0IGlzbid0IGEgcGFyZW50aGVzZXNcblx0ICAgICAgICAgICAgICAgICB8ICA9IE9SXG5cdCAgICAgICAgICAgICAgICAgXFwoICA9IE1hdGNoIGEgc3RhcnQgcGFyZW50aGVzZXNcblx0ICAgICAgICAgICAgICAgICAgICAgW14pKF0qICA9IE1hdGNoIGFueXRoaW5nIHRoYXQgaXNuJ3QgYSBwYXJlbnRoZXNlc1xuXHQgICAgICAgICAgICAgICAgIFxcKSAgPSBNYXRjaCBhIGVuZCBwYXJlbnRoZXNlc1xuXHQgICAgICAgICAgICAgKSAgPSBFbmQgR3JvdXBcbiAgICAgICAgICAgICAgKlxcKSA9IE1hdGNoIGFueXRoaW5nIGFuZCB0aGVuIGEgY2xvc2UgcGFyZW5zXG4gICAgICAgICAgKSAgPSBDbG9zZSBub24tY2FwdHVyaW5nIGdyb3VwXG4gICAgICAgICAgKiAgPSBNYXRjaCBhbnl0aGluZ1xuICAgICAgICkgID0gQ2xvc2UgY2FwdHVyaW5nIGdyb3VwXG5cdCBcXCkgID0gTWF0Y2ggYSBjbG9zZSBwYXJlbnNcblxuXHQgL2dpICA9IEdldCBhbGwgbWF0Y2hlcywgbm90IHRoZSBmaXJzdC4gIEJlIGNhc2UgaW5zZW5zaXRpdmUuXG5cdCAqL1xuXHR2YXIgZml4ZWRDc3MgPSBjc3MucmVwbGFjZSgvdXJsXFxzKlxcKCgoPzpbXikoXXxcXCgoPzpbXikoXSt8XFwoW14pKF0qXFwpKSpcXCkpKilcXCkvZ2ksIGZ1bmN0aW9uKGZ1bGxNYXRjaCwgb3JpZ1VybCkge1xuXHRcdC8vIHN0cmlwIHF1b3RlcyAoaWYgdGhleSBleGlzdClcblx0XHR2YXIgdW5xdW90ZWRPcmlnVXJsID0gb3JpZ1VybFxuXHRcdFx0LnRyaW0oKVxuXHRcdFx0LnJlcGxhY2UoL15cIiguKilcIiQvLCBmdW5jdGlvbihvLCAkMSl7IHJldHVybiAkMTsgfSlcblx0XHRcdC5yZXBsYWNlKC9eJyguKiknJC8sIGZ1bmN0aW9uKG8sICQxKXsgcmV0dXJuICQxOyB9KTtcblxuXHRcdC8vIGFscmVhZHkgYSBmdWxsIHVybD8gbm8gY2hhbmdlXG5cdFx0aWYgKC9eKCN8ZGF0YTp8aHR0cDpcXC9cXC98aHR0cHM6XFwvXFwvfGZpbGU6XFwvXFwvXFwvKS9pLnRlc3QodW5xdW90ZWRPcmlnVXJsKSkge1xuXHRcdCAgcmV0dXJuIGZ1bGxNYXRjaDtcblx0XHR9XG5cblx0XHQvLyBjb252ZXJ0IHRoZSB1cmwgdG8gYSBmdWxsIHVybFxuXHRcdHZhciBuZXdVcmw7XG5cblx0XHRpZiAodW5xdW90ZWRPcmlnVXJsLmluZGV4T2YoXCIvL1wiKSA9PT0gMCkge1xuXHRcdCAgXHQvL1RPRE86IHNob3VsZCB3ZSBhZGQgcHJvdG9jb2w/XG5cdFx0XHRuZXdVcmwgPSB1bnF1b3RlZE9yaWdVcmw7XG5cdFx0fSBlbHNlIGlmICh1bnF1b3RlZE9yaWdVcmwuaW5kZXhPZihcIi9cIikgPT09IDApIHtcblx0XHRcdC8vIHBhdGggc2hvdWxkIGJlIHJlbGF0aXZlIHRvIHRoZSBiYXNlIHVybFxuXHRcdFx0bmV3VXJsID0gYmFzZVVybCArIHVucXVvdGVkT3JpZ1VybDsgLy8gYWxyZWFkeSBzdGFydHMgd2l0aCAnLydcblx0XHR9IGVsc2Uge1xuXHRcdFx0Ly8gcGF0aCBzaG91bGQgYmUgcmVsYXRpdmUgdG8gY3VycmVudCBkaXJlY3Rvcnlcblx0XHRcdG5ld1VybCA9IGN1cnJlbnREaXIgKyB1bnF1b3RlZE9yaWdVcmwucmVwbGFjZSgvXlxcLlxcLy8sIFwiXCIpOyAvLyBTdHJpcCBsZWFkaW5nICcuLydcblx0XHR9XG5cblx0XHQvLyBzZW5kIGJhY2sgdGhlIGZpeGVkIHVybCguLi4pXG5cdFx0cmV0dXJuIFwidXJsKFwiICsgSlNPTi5zdHJpbmdpZnkobmV3VXJsKSArIFwiKVwiO1xuXHR9KTtcblxuXHQvLyBzZW5kIGJhY2sgdGhlIGZpeGVkIGNzc1xuXHRyZXR1cm4gZml4ZWRDc3M7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi91cmxzLmpzXG4vLyBtb2R1bGUgaWQgPSA2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlxuY29uc3QgT1BUUyA9IHtcbiAgICBtb2RlOiAnY29ycydcbn1cblxuYXN5bmMgZnVuY3Rpb24gZ2V0SlNPTih1cmwpe1xuICAgIHZhciBmZXRjaGVkID0gYXdhaXQgZmV0Y2godXJsLCBPUFRTKTtcbiAgICB2YXIganNvbiA9IGF3YWl0IGZldGNoZWQuanNvbigpO1xuICAgIFxuICAgIHJldHVybiBqc29uO1xufVxuXG5cbmV4cG9ydCB7XG4gICAgZ2V0SlNPTlxufTtcblxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvanMvZmV0Y2gtc2hlZXQuanNcbi8vIG1vZHVsZSBpZCA9IDdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyogZm9yIGZpbHRlcmluZyB0ZXJtcyB3aXRoIHJlZ3VsYXIgZXhwcmVzc2lvbnMgKi9cbiAgICBcbmNvbnN0IExBTkdfVEVSTVMgPSB7XG4gICAgQXdrOiAgICAgICAgICAgIFsnYXdrJ10sXG4gICAgQmFzaDogICAgICAgICAgIFsnYmFzaCddLFxuICAgICdDIConOiAgICAgICAgICBbJ2MnXSxcbiAgICAnQyMnOiAgICAgICAgICAgWydjIycsICdjc2hhcnAnLCAnYyBzaGFycCddLFxuICAgICdDKysnOiAgICAgICAgICBbJ2MrKyddLFxuICAgIENsb2p1cmU6ICAgICAgICBbJ2Nsb2p1cmUnXSxcbiAgICBDT0JPTDogICAgICAgICAgWydjb2JvbCddLFxuICAgIEVybGFuZzogICAgICAgICBbJ2VybGFuZyddLFxuICAgICdHbyAqJzogICAgICAgICBbJ2dvJywgJ2dvbGFuZyddLFxuICAgIEhhc2tlbGw6ICAgICAgICBbJ2hhc2tlbGwnXSxcbiAgICBKYXZhOiAgICAgICAgICAgWydqYXZhJ10sXG4gICAgSmF2YVNjcmlwdDogICAgIFsnamF2YXNjcmlwdCcsICdqYXZhIHNjcmlwdCcsICdqcyddLFxuICAgIExpc3A6ICAgICAgICAgICBbJ2xpc3AnXSxcbiAgICAnT2JqZWN0aXZlLUMnOiAgWydvYmplY3RpdmUtYycsICdvYmplY3RpdmUgYyddLFxuICAgIFBhc2NhbDogICAgICAgICBbJ3Bhc2NhbCddLFxuICAgIFBlcmw6ICAgICAgICAgICBbJ3BlcmwnXSxcbiAgICBQSFA6ICAgICAgICAgICAgWydwaHAnXSxcbiAgICBQb3dlcnNoZWxsOiAgICAgWydwb3dlcnNoZWxsJywgJ3Bvd2VyIHNoZWxsJ10sXG4gICAgUHl0aG9uOiAgICAgICAgIFsncHl0aG9uJ10sXG4gICAgUnVieTogICAgICAgICAgIFsncnVieSddLFxuICAgIFJ1c3Q6ICAgICAgICAgICBbJ3J1c3QnXSxcbiAgICBTY2FsYTogICAgICAgICAgWydzY2FsYSddLFxuICAgIFNjaGVtZTogICAgICAgICBbJ3NjaGVtZSddLFxuICAgIFNRTDogICAgICAgICAgICBbJ3NxbCddLFxuICAgICdTd2lmdCAqJzogICAgICBbJ3N3aWZ0J10sXG4gICAgJ1Zpc3VhbCBCYXNpYyc6IFsndmlzdWFsIGJhc2ljJywgJ3Zpc3VhbGJhc2ljJywgJ3ZiJywgJ3ZiYSddLFxufTtcbi8qIGZvciBzdG9yaW5nIElEczogeyBsYW5nOiBbLi4uSWRdIH0gKi9cbmNvbnN0IFRFUk1TID0gT2JqZWN0LmtleXMoTEFOR19URVJNUyk7XG5cbi8qIEFycmF5IC0+IFJlZ0V4cFxuICAgIGJ1aWxkcyBhIFJlZ0V4cCBmcm9tIGFuIGFycmF5IG9mIHBocmFzZXMgdG8gYWxsb3cgZm9yIG11bHRpcGxlIGNhc2VzXG4gICAgc3VjaCBhcyAnYyMnIG9yICdjIHNoYXJwJywgJ2phdmFzY3JpcHQnIG9yICdqcycgICovXG5mdW5jdGlvbiBjcmVhdGVSWChwaHJhc2VzKXtcbiAgICAvLyBjcmVhdGVzIGEgUmVnRXhwIHBhdHRlcm4gZnJvbSBhIHN0cmluZ1xuICAgIGNvbnN0IHJ4ID0gYCR7cGhyYXNlcy5yZWR1Y2UoKGJhc2UsIHBocmFzZSwgaSkgPT4ge1xuICAgICAgICAvLyBjaGVjayBwaHJhc2UgZm9yIHNwYWNlcyAmICcrJ1xuICAgICAgICBpZihwaHJhc2UgPT09ICdjKysnKXtcbiAgICAgICAgICAgIHBocmFzZSA9ICdjXFxcXCtcXFxcKyc7XG4gICAgICAgIH0gZWxzZSBpZihwaHJhc2UuaW5kZXhPZignICcpID4gLTEpe1xuICAgICAgICAgICAgcGhyYXNlID0gcGhyYXNlLnNwbGl0KCcgJykuam9pbignXFxcXHMnKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBwYXR0ZXJucyBtYXRjaCBhIGdpdmVuIHBocmFzZSBzdXJyb3VuZGVkIGJ5IG5vbiBsZXR0ZXIgY2hhcmFjdGVyc1xuICAgICAgICAvLyBzbyAnc2NoZW1lJyB3aWxsIHBhc3MgYnV0IG5vdCAnc2NoZW1lcidcbiAgICAgICAgaWYocGhyYXNlID09PSAnc3FsJyl7XG4gICAgICAgICAgICByZXR1cm4gcGhyYXNlO1xuICAgICAgICAvLyBuZWVkIGNhc2UgZm9yICdjJywgY2FuJ3QgYmUgZm9sbG93ZWQgYnkgJysnXG4gICAgICAgIH0gZWxzZSBpZihwaHJhc2UgPT09ICdjJyl7XG4gICAgICAgICAgICByZXR1cm4gYChefFteQS1aYS16XSkke3BocmFzZX0oJHxbXkEtWmEtelxcXFwrXSlgO1xuICAgICAgICBcbiAgICAgICAgfSBlbHNlIGlmKGkgPT09IDApe1xuICAgICAgICAgICAgLy8gbWF0Y2hlcyBwaHJhc2UgaWYgbm90IGJvcmRlcmVkIGJ5IG90aGVyIGxldHRlcnNcbiAgICAgICAgICAgIC8vIHNxbCxwaHAsanMgd2lsbCBtYXRjaCwgYnV0IG5vdCBzcWxwaHBqc1xuICAgICAgICAgICAgcmV0dXJuIGJhc2UgKyBgKF58W15BLVphLXpdKSR7cGhyYXNlfSgkfFteQS1aYS16XSlgO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGJhc2UgKyBgfChefFteQS1aYS16XSkke3BocmFzZX0oJHxbXkEtWmEtel0pYDtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICB9LCAnJyl9YDtcbiAgICBcbiAgICByZXR1cm4gbmV3IFJlZ0V4cChyeCwgJ2knKTtcbn1cblxuXG4vKiBTdHJpbmcgLT4gQXJyYXktb2YtU3RyaW5nICovXG5mdW5jdGlvbiBwcmVzZW50VGVybXModHh0KXtcbiAgICByZXR1cm4gUlhTLnJlZHVjZSgoYWNjLCB0ZXJtKSA9PiB7XG4gICAgICAgIHJldHVybiB0ZXJtLnJ4LnRlc3QodHh0KSA/XG4gICAgICAgICAgICBhY2MuY29uY2F0KHRlcm0ubGFuZykgOlxuICAgICAgICAgICAgYWNjO1xuICAgIH0sIFtdKTtcbn1cblxuXG5mdW5jdGlvbiBwcmVzZW50VGVybXMyKHR4dCwgaWQpe1xuICAgIGNvbnN0IHRlc3RlZCA9IFJYUy5yZWR1Y2UoKGFjYywgdGVybSkgPT4ge1xuICAgICAgICByZXR1cm4gdGVybS5yeC50ZXN0KHR4dCkgP1xuICAgICAgICAgICAgYWNjLmNvbmNhdCh0ZXJtLmxhbmcpIDpcbiAgICAgICAgICAgIGFjYztcbiAgICB9LCBbXSk7XG4gICAgXG4gICAgY29uc3QgcmVzdWx0cyA9IHRlc3RlZC5yZWR1Y2UoKGFjYywgdCkgPT4ge1xuICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihhY2MsIHsgW3RdOiBpZCB9KTtcbiAgICB9LCB7fSk7XG4gICAgXG4gICAgcmV0dXJuIHJlc3VsdHM7XG59XG5cblxuY29uc3QgUlhTID0gKCh0ZXJtc09iaikgPT4ge1xuICAgIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyh0ZXJtc09iaik7XG4gICAgXG4gICAgcmV0dXJuIGtleXMubWFwKGsgPT4ge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbGFuZzogayxcbiAgICAgICAgICAgIHJ4OiBjcmVhdGVSWCh0ZXJtc09ialtrXSlcbiAgICAgICAgfTtcbiAgICB9KTtcbn0pKExBTkdfVEVSTVMpO1xuXG5cbmV4cG9ydCB7XG4gICAgcHJlc2VudFRlcm1zLFxuICAgIHByZXNlbnRUZXJtczIsXG4gICAgVEVSTVNcbn07XG5cblxuXG4vL0BURVNUXG4oKCkgPT4ge1xuICAgIGNvbnN0IHRlc3RzID0gW1xuICAgICAgICB7IFxuICAgICAgICAgICAgYWN0dWFsOiBwcmVzZW50VGVybXMoJ3RoaXMgY29udGFpbnMgamF2YScpLmxlbmd0aCxcbiAgICAgICAgICAgIGV4cGVjdGVkOiAxXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGFjdHVhbDogcHJlc2VudFRlcm1zKCd0aGlzIGNvbnRhaW5zIGphdmFzJykubGVuZ3RoLFxuICAgICAgICAgICAgZXhwZWN0ZWQ6IDBcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgYWN0dWFsOiBwcmVzZW50VGVybXMoJ3BocCBhbmQgZWxlcGhwYW50JykubGVuZ3RoLFxuICAgICAgICAgICAgZXhwZWN0ZWQ6IDFcbiAgICAgICAgfSxcbiAgICAgICAgeyBcbiAgICAgICAgICAgIGFjdHVhbDogcHJlc2VudFRlcm1zKCdzY2hlbWVycyB3aXRoIGEgbGlzcCcpLmxlbmd0aCxcbiAgICAgICAgICAgIGV4cGVjdGVkOiAxXG4gICAgICAgIH0sXG4gICAgICAgIHsgXG4gICAgICAgICAgICBhY3R1YWw6IHByZXNlbnRUZXJtcygnY29udGFpbnMgdmIvc3FsL2pzL2MrKycpLmxlbmd0aCxcbiAgICAgICAgICAgIGV4cGVjdGVkOiA0XG4gICAgICAgIH1cbiAgICBdO1xuICAgIFxuICAgIGxldCB0b3RhbCA9IHRlc3RzLmxlbmd0aDtcbiAgICBsZXQgcGFzc2VkID0gMDtcbiAgICBcbiAgICBjb25zb2xlLmxvZygnLS0tLSBNT0RVTEUgVEVTVDogV29yZHMgLS0tLScpO1xuICAgIFxuICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0b3RhbDsgaSsrKXtcbiAgICAgICAgaWYodGVzdHNbaV0uYWN0dWFsID09PSB0ZXN0c1tpXS5leHBlY3RlZCl7XG4gICAgICAgICAgICBwYXNzZWQgKz0gMTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCctLS0tICMnICsgaSArICcgLS0tLScpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coYCAgYWN0dWFsOiAke3Rlc3RzW2ldLmFjdHVhbH1gKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBleHBlY3RlZDogJHt0ZXN0c1tpXS5leHBlY3RlZH1gKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBjb25zb2xlLmxvZyhgJHtwYXNzZWR9IG91dCBvZiAke3RvdGFsfSB0ZXN0cyBwYXNzZWRgKTtcbiAgICBjb25zb2xlLmxvZygnLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLScpO1xufSkoKTtcblxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvanMvd29yZHMtcGxheS5qc1xuLy8gbW9kdWxlIGlkID0gOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcbmZ1bmN0aW9uIFJlc3VsdHNUYWJsZShyZXN1bHRzLCB0b3RhbE51bSwgZGF0ZSl7XG4gICAgdmFyIHNvcnRlZCA9IHJlc3VsdHMuc2xpY2UoMCkuc29ydCgoYSwgYikgPT4gYVsxXSA8IGJbMV0pO1xuICAgIFxuICAgIHJldHVybiBgXG4gICAgPGRpdiBjbGFzcz1cInRhYmxlXCI+XG4gICAgICAgIDx0YWJsZSBjbGFzcz1cInRhYmxlXCI+XG4gICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgPHRoIGNvbHNwYW49XCIzXCI+UmVmZXJlbmNlcyBmcm9tICR7dG90YWxOdW19IHBvc3RpbmdzPC90aD5cbiAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgPHRoIGNvbHNwYW49XCIzXCI+Q29sbGVjdGVkIG9uICR7ZGF0ZX08L3RoPlxuICAgICAgICAgICAgPC90cj5cbiAgICAgICAgXG4gICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgPHRoPlJhbms8L3RoPlxuICAgICAgICAgICAgICAgIDx0aD5MYW5ndWFnZTwvdGg+XG4gICAgICAgICAgICAgICAgPHRoPlJlZmVyZW5jZXM8L3RoPlxuICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgJHtzb3J0ZWQucmVkdWNlKChhY2MsIHJlc3VsdCwgaSkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBhY2MgKyBgXG4gICAgICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0aCBzY29wZT1cInJvd1wiPiR7aSsxfTwvdGg+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dGQ+JHtyZXN1bHRbMF19PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ZD4ke3Jlc3VsdFsxXX08L3RkPlxuICAgICAgICAgICAgICAgICAgICA8L3RyPmA7XG4gICAgICAgICAgICB9LCBgYCl9XG4gICAgICAgIDwvdGFibGU+XG4gICAgPC9kaXY+YDtcbn1cblxuXG5mdW5jdGlvbiBOb1JlZnNMaXN0KG5vUmVmcyl7XG4gICAgcmV0dXJuIG5vUmVmcy5yZWR1Y2UoKGFjYywgcmVmKSA9PiB7XG4gICAgICAgIHJldHVybiBhY2MgKyBgPGxpPiR7cmVmfTwvbGk+YDtcbiAgICB9LCBgYCk7XG59XG4gICAgXG4gICAgXG5leHBvcnQgeyBSZXN1bHRzVGFibGUsIE5vUmVmc0xpc3QgfTtcblxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvanMvY29tcG9uZW50cy5qc1xuLy8gbW9kdWxlIGlkID0gOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgeyBpbnRlcnNlY3QgfSBmcm9tICcuL2NhbGN1bGF0aW9ucyc7XG5cbi8qIGNyZWF0ZXMgbm9kZXMgZm9yIGQzIGdyYXBoICovXG5mdW5jdGlvbiBjcmVhdGVOb2RlcyhyZXN1bHRzKXtcbiAgY29uc3QgdGVybXMgPSBPYmplY3Qua2V5cyhyZXN1bHRzKTtcbiAgXG4gIHJldHVybiB0ZXJtcy5tYXAodGVybSA9PiB7XG4gICAgcmV0dXJuIHsgdGVybTogdGVybSwgc2l6ZTogcmVzdWx0c1t0ZXJtXS5sZW5ndGggfTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUxpbmtzKHJlc3VsdHMpe1xuICBjb25zdCB0ZXJtcyA9IE9iamVjdC5rZXlzKHJlc3VsdHMpO1xuICBjb25zdCBsZW4gPSB0ZXJtcy5sZW5ndGg7XG4gIC8vIGVuZm9yY2UgdGhpcyBvcmRlclxuICAvLyAwIC0+IDkgLT4gYSA+IHpcbiAgY29uc3QgYnlJbmNyID0gKGEsIGIpID0+IGEgPiBiO1xuICBsZXQgbGlua3MgPSBbXTtcbiAgXG4gIGZvcihsZXQgaSA9IDA7IGkgPCBsZW47IGkrKyl7XG4gICAgY29uc3Qgc291cmNlID0gdGVybXNbaV07XG4gICAgY29uc3Qgc291cmNlSWRzID0gcmVzdWx0c1tzb3VyY2VdO1xuICAgIHNvdXJjZUlkcy5zb3J0KGJ5SW5jcik7XG4gICAgXG4gICAgZm9yKGxldCBqID0gMDsgaiA8IGxlbjsgaisrKXtcbiAgICAgIGNvbnN0IHRhcmdldCA9IHRlcm1zW2pdO1xuICAgICAgY29uc3QgdGFyZ2V0SWRzID0gcmVzdWx0c1t0YXJnZXRdO1xuICAgICAgdGFyZ2V0SWRzLnNvcnQoYnlJbmNyKTtcbiAgICAgIGNvbnN0IHNoYXJlZCA9IGludGVyc2VjdChzb3VyY2VJZHMsIHRhcmdldElkcykubGVuZ3RoO1xuICAgIFxuICAgICAgLy8gdW50aWwgXCJDXCIgcmVnZXhwIGlzIG1vcmUgYWNjdXJhdGVcbiAgICAgIGNvbnN0IGNfdGVzdCA9IHNvdXJjZSA9PT0gJ0MgKicgfHwgdGFyZ2V0ID09PSAnQyAqJyA/IGZhbHNlIDogdHJ1ZTtcbiAgICBcbiAgICAgIGlmKHRhcmdldCAhPT0gc291cmNlICYmIHNoYXJlZCA+IDAgJiYgY190ZXN0KXtcbiAgICAgICAgbGlua3MucHVzaCh7IHRhcmdldCwgc291cmNlLCBzaGFyZWQgfSk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIFxuICByZXR1cm4gbGlua3M7XG59XG5cbi8vQFRFU1RcbigoKSA9PiB7XG4gICAgY29uc3QgdDAgPSB7XG4gICAgICAgIFNjYWxhOiBbIFwiZDk5NmVjYjEwN2Q5NWY1ZVwiIF0sXG4gICAgICAgIFB5dGhvbjogW1wiMWE4ZGI4Nzk0ZDA5YTQ3OVwiLCBcIjIyMjY0ZTAyNTNhOTM1MWJcIiwgXCIyOTczYmJhYTM4YjU5MWJkXCIsIFwiMmQ4NjU2OTVkODJhZTMyNFwiLCBcIjRhZDY3NGQwNTRmNGJiZjFcIiwgXCI1N2I0NGEzZWZiOGYxNDBmXCIsIFwiNzZhZDQ2NzNmODczNDEyZVwiLCBcIjdhYWU3ZTI0NGYzNTk3NDRcIiwgXCI5MWE3ZjNmOWY1MDBmZDE5XCIsIFwiOWQ5MzdjYzc5MGFhYmMzOVwiXSxcbiAgICAgICAgSmF2YTogW1wiMDRkNGE3NzRmZTJiZDY5M1wiLCBcIjA2MDU2NGVjYmEyZTcxZTJcIiwgXCIwNjk2ZjNjMWRiNGVhMmI3XCJdLFxuICAgICAgICAnR28gKic6IFtcIjA0ZDRhNzc0ZmUyYmQ2OTNcIiwgXCIxODNmNDgwM2I3YmE4ZjUxXCIsIFwiMmUwNTY3ODYzMWY1MWNmNFwiXSxcbiAgICAgICAgV2hhdExhbmc6IFtcIjFhOGRiODc5NGQwOWE0NzlcIiwgXCI3NmFkNDY3M2Y4NzM0MTJlXCIsIFwiN2FhZTdlMjQ0ZjM1OTc0NFwiXVxuICAgIH07XG4gICAgXG4gICAgY29uc3QgdGVzdHMgPSBbXG4gICAgICAgIGludGVyc2VjdCh0MC5TY2FsYSwgdDAuUHl0aG9uKS5sZW5ndGggPT09IDAsXG4gICAgICAgIGludGVyc2VjdCh0MC5KYXZhLCB0MFsnR28gKiddKS5sZW5ndGggPT09IDEsXG4gICAgICAgIGludGVyc2VjdCh0MC5XaGF0TGFuZywgdDAuUHl0aG9uKS5sZW5ndGggPT09IDNcbiAgICBdO1xuICAgIFxuICAgIGxldCB0b3RhbCA9IHRlc3RzLmxlbmd0aDtcbiAgICBsZXQgcGFzc2VkID0gMDtcbiAgICBcbiAgICBjb25zb2xlLmxvZygnLS0tLSBNT0RVTEUgVEVTVDogR3JhcGggLS0tLScpO1xuICAgIFxuICAgIHRlc3RzLmZvckVhY2goKHQsIGkpID0+IHtcbiAgICAgICAgY29uc29sZS5hc3NlcnQodCwgYHRlc3RzWyR7aX1dYCk7XG4gICAgICAgIFxuICAgICAgICBpZih0KXtcbiAgICAgICAgICAgIHBhc3NlZCArPSAxO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgXG4gICAgY29uc29sZS5sb2coYCR7cGFzc2VkfSBvdXQgb2YgJHt0b3RhbH0gdGVzdHMgcGFzc2VkYCk7XG4gICAgY29uc29sZS5sb2coJy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0nKTtcbn0pKCk7XG5cblxuZnVuY3Rpb24gR3JhcGgobm9kZXMsIGxpbmtzLCBncmFwaCwgc2l6ZSl7XG4gIGNvbnN0IFcgPSBzaXplO1xuICBjb25zdCBIID0gVztcblxuICBjb25zdCB2aXogPSBkMy5zZWxlY3QoZ3JhcGgpXG4gICAgLmFwcGVuZCgnc3ZnJylcbiAgICAuYXR0cignd2lkdGgnLCBXKVxuICAgIC5hdHRyKCdoZWlnaHQnLCBIKTtcblxuICBjb25zdCBzaW11bGF0aW9uID0gZDMuZm9yY2VTaW11bGF0aW9uKClcbiAgICAubm9kZXMobm9kZXMpO1xuXG4gIHNpbXVsYXRpb25cbiAgICAuZm9yY2UoJ2NoYXJnZV9mb3JjZScsIGQzLmZvcmNlTWFueUJvZHkoKVxuICAgICAgICAuc3RyZW5ndGgoLSAoc2l6ZSkpXG4gICAgICAgIC5kaXN0YW5jZU1pbig1MClcbiAgICAgICAgLmRpc3RhbmNlTWF4KHNpemUgLyAyKSlcbiAgICAuZm9yY2UoJ2NlbnRlcl9mb3JjZScsIGQzLmZvcmNlQ2VudGVyKFcgLyAyLCBIIC8gMikpO1xuICAgIFxuICAgIGNvbnN0IHBvcHVwID0gZDMuc2VsZWN0KCdib2R5JykuYXBwZW5kKCdkaXYnKVxuICAgICAgICAuYXR0cignY2xhc3MnLCAncG9wdXAnKVxuICAgICAgICAuc3R5bGUoJ29wYWNpdHknLCAwKTsgICBcblxuICBjb25zdCBub2RlID0gdml6LmFwcGVuZChcImdcIilcbiAgICAuYXR0cihcImNsYXNzXCIsIFwibm9kZXNcIilcbiAgICAuc2VsZWN0QWxsKFwiY2lyY2xlXCIpXG4gICAgLmRhdGEobm9kZXMpXG4gICAgLmVudGVyKClcbiAgICAuYXBwZW5kKFwiY2lyY2xlXCIpXG4gICAgLmF0dHIoXCJyXCIsIDEyKVxuICAgIC5hdHRyKFwiZmlsbFwiLCBcInJlZFwiKTtcbiBcblxuICBmdW5jdGlvbiB0aWNrQWN0aW9ucygpIHtcbiAgICAvL3VwZGF0ZSBjaXJjbGUgcG9zaXRpb25zIHRvIHJlZmxlY3Qgbm9kZSB1cGRhdGVzIG9uIGVhY2ggdGljayBvZiB0aGUgc2ltdWxhdGlvbiBcbiAgICBub2RlXG4gICAgICAuYXR0cihcImN4XCIsIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGQueDsgfSlcbiAgICAgIC5hdHRyKFwiY3lcIiwgZnVuY3Rpb24oZCkgeyByZXR1cm4gZC55OyB9KTtcblxuICAgIGxpbmtcbiAgICAgIC5hdHRyKFwieDFcIiwgZnVuY3Rpb24oZCkgeyByZXR1cm4gZC5zb3VyY2UueDsgfSlcbiAgICAgIC5hdHRyKFwieTFcIiwgZnVuY3Rpb24oZCkgeyByZXR1cm4gZC5zb3VyY2UueTsgfSlcbiAgICAgIC5hdHRyKFwieDJcIiwgZnVuY3Rpb24oZCkgeyByZXR1cm4gZC50YXJnZXQueDsgfSlcbiAgICAgIC5hdHRyKFwieTJcIiwgZnVuY3Rpb24oZCkgeyByZXR1cm4gZC50YXJnZXQueTsgfSk7XG4gIH1cblxuXG4gIGNvbnN0IGxpbmtfZm9yY2UgPSAgZDMuZm9yY2VMaW5rKGxpbmtzKVxuICAgIC5pZChmdW5jdGlvbihkKSB7IHJldHVybiBkLnRlcm07IH0pO1xuXG5cbiAgc2ltdWxhdGlvbi5vbigndGljaycsIHRpY2tBY3Rpb25zKTtcbiAgc2ltdWxhdGlvbi5mb3JjZShcImxpbmtzXCIsbGlua19mb3JjZSk7XG5cbiAgY29uc3QgbGluayA9IHZpei5hcHBlbmQoXCJnXCIpXG4gICAgLmF0dHIoXCJjbGFzc1wiLCBcImxpbmtzXCIpXG4gICAgLnNlbGVjdEFsbChcImxpbmVcIilcbiAgICAuZGF0YShsaW5rcylcbiAgICAuZW50ZXIoKS5hcHBlbmQoXCJsaW5lXCIpXG4gICAgLmF0dHIoXCJzdHJva2Utd2lkdGhcIiwgMylcbiAgICAuc3R5bGUoJ3N0cm9rZScsIGxpbmtDb2xvcik7XG4gICAgICAgIFxuICAgIFBvcHVwKGdyYXBoLCBwb3B1cCwgbm9kZSwgZCA9PiBgPHA+JHtkLnRlcm19PC9wPmApO1xuICAgIFBvcHVwKGdyYXBoLCBwb3B1cCwgbGluaywgZCA9PiBgPHA+JHtkLnNvdXJjZS50ZXJtfSAmICR7ZC50YXJnZXQudGVybX0gOiA8c3Ryb25nPiR7ZC5zaGFyZWR9PC9zdHJvbmc+PC9wPmApO1xufVxuXG5cbi8qIEQzUG9wdXAsIEQzRWxlbWVudCwgW09iamVjdCAtPiBTdHJpbmddIC0+IFZvaWQgKi9cbmZ1bmN0aW9uIFBvcHVwKCRFbGVtLCBwb3B1cEVsZW0sIGQzRWxlbSwgaHRtbCl7XG4gICAgY29uc3QgJHBvc24gPSBvZmZzZXQoJEVsZW0pO1xuICBcbiAgICBkM0VsZW0ub24oJ21vdXNlb3ZlcicsIChkKSA9PiB7XG4gICAgICAgIHBvcHVwRWxlbS50cmFuc2l0aW9uKClcbiAgICAgICAgICAgIC5kdXJhdGlvbigyMDApXG4gICAgICAgICAgICAuc3R5bGUoJ29wYWNpdHknLCAwLjkpXG4gICAgICAgIHBvcHVwRWxlbS5odG1sKGh0bWwoZCkpXG4gICAgICAgICAgICAuc3R5bGUoJ2xlZnQnLCBgJHskcG9zbi5sZWZ0fXB4YClcbiAgICAgICAgICAgIC5zdHlsZSgndG9wJywgYCR7JHBvc24udG9wfXB4YClcbiAgICB9KVxuICAgIC5vbignbW91c2VvdXQnLCBkID0+IHtcbiAgICAgICAgcG9wdXBFbGVtLnRyYW5zaXRpb24oKVxuICAgICAgICAgICAgLmR1cmF0aW9uKDUwMClcbiAgICAgICAgICAgIC5zdHlsZSgnb3BhY2l0eScsIDApXG4gICAgfSk7XG59XG5cblxuLyogZ2V0cyBwb3NpdGlvbiBvZiB0b3AtbGVmdCBjb3JuZXIgb2YgYSBET00gZWxlbWVudCAqL1xuZnVuY3Rpb24gb2Zmc2V0KGVsKSB7XG4gICAgY29uc3QgcmVjdCA9IGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIGNvbnN0IHNjcm9sbExlZnQgPSB3aW5kb3cucGFnZVhPZmZzZXQgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbExlZnQ7XG4gICAgY29uc3Qgc2Nyb2xsVG9wID0gd2luZG93LnBhZ2VZT2Zmc2V0IHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3A7XG4gICAgXG4gICAgcmV0dXJuIHsgdG9wOiByZWN0LnRvcCArIHNjcm9sbFRvcCwgbGVmdDogcmVjdC5sZWZ0ICsgc2Nyb2xsTGVmdCB9XG59XG5cbmZ1bmN0aW9uIGxpbmtDb2xvcihkKXtcbiAgICBjb25zdCBuID0gZC5zaGFyZWQ7XG5cbiAgICByZXR1cm4gKFxuICAgICAgICBuIDwgMiA/ICcjNTU1JyA6XG4gICAgICAgIG4gPCAzID8gJyM1NjgnIDpcbiAgICAgICAgbiA8IDUgPyAnIzU4YScgOlxuICAgICAgICBuIDwgOSA/ICcjNWFkJyA6IFxuICAgICAgICBuIDwgMTQgPyAnIzVjZicgOlxuICAgICAgICBuIDwgMjAgPyAnIzVmZicgOlxuICAgICAgICBuIDwgMjcgPyAnIzJmZicgOlxuICAgICAgICBuIDwgMzUgPyAnIzBmZicgOiAnIzAwZidcbiAgICApO1xufVxuXG5cbmV4cG9ydCB7XG4gICAgY3JlYXRlTm9kZXMsXG4gICAgY3JlYXRlTGlua3MsXG4gICAgR3JhcGhcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2pzL2dyYXBoLmpzXG4vLyBtb2R1bGUgaWQgPSAxMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwic291cmNlUm9vdCI6IiJ9