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
exports.push([module.i, "h1,h2,h3,h4,h5,h6 {\n  font-family: 'Fira Sans', serif;\n  letter-spacing: 0.2rem\n}\n\nhr {\n  width: 50%;\n  border: 1px solid #ccc;\n}\n\nbody {\n  margin: 0;\n  padding: 0;\n\n  font-family: 'Merriweather', serif;\n  font-size: 0.85rem;\n    \n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n}\n\nheader {\n  height: 20vh;\n  padding: 0;\n  margin: 0;\n  \n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n}\n\nheader > h1,h3,h5 {\n  margin: 0;\n  padding: 0;\n}\n\nmain {\n  width: 90vw;\n}\n\nsection {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n}\n\ntd {\n    font-family: 'Fira Sans', sans-serif;\n    font-weight: 500;\n    letter-spacing: 0.15rem;\n}\n\ntd, th {\n    text-align: left;\n    padding: 0.1rem 1rem 0.3rem 1rem;\n    border-bottom: 1px dashed #aaa;\n}\n\np {\n  line-height: 1.5rem;\n  margin: 1.5rem 1rem 1.5rem 1rem;\n}\n\nfooter {\n  font-family: 'Merriweather', serif;\n  margin: 0;\n}\n\n\n.loading {\n\tmargin: 5rem;\n}\n\ndiv.popup {\n    margin: 0;\n    position: absolute;\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n    align-items: center;\n    font: 1rem 'Fira Sans';\n    padding: 0.1rem;\n    background-color: #fff;\n    border-radius: 15%;\n    pointer-events: none;\n}\n\n\n@media (min-width: 730){\n  body {\n    font-size: 1.3rem;\n  }\n\n  td, th {\n    padding: 0.4rem 4rem 0.4rem 4rem;\n  }\n}\n\n\n@media (min-width: 1000px){\n  body {\n    font-size: 1.3rem;\n  }\n\n  td, th {\n    padding: 0.5rem;\n  }\n  \n  main {\n    width: 80vw;\n    display: flex;\n    flex-direction: row;\n    justify-content: center;\n    align-items: flex-start;\n  }\n  \n  section {\n    width: 50%;\n    margin: 2rem;\n  }\n  \n  aside {\n    width: 50%;\n    margin: 2rem;\n  }\n  \n  p {\n    margin: 2rem 0 2rem 0;\n    line-height: 2.2rem;\n  }\n  \n  table {\n    width: 100%;\n  }\n}\n", ""]);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMmVhYjNhZWEzYjQ2NWQ4ODNiZjIiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2NhbGN1bGF0aW9ucy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBwLmpzIiwid2VicGFjazovLy8uL3NyYy9jc3Mvc3R5bGUuY3NzP2UxYjQiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Nzcy9zdHlsZS5jc3MiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi91cmxzLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9mZXRjaC1zaGVldC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvd29yZHMtcGxheS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvY29tcG9uZW50cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvZ3JhcGguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7O0FDNURBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHNCQUFz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QTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNB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QUNBLDhCQUE4QixXQUFXO0FBQ3pDLDZCQUE2QixVQUFVO0FBQ3ZDLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxZQUFZO0FBQ1o7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFPQSIsImZpbGUiOiJvdXRwdXQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAxKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCAyZWFiM2FlYTNiNDY1ZDg4M2JmMiIsIlxuZnVuY3Rpb24gbWVyZ2VUZXJtcyhvYmpBcnIpe1xuICAgIHJldHVybiBvYmpBcnIucmVkdWNlKChhY2MsIHRlcm1zKSA9PiB7XG4gICAgICAgIHZhciBrZXlzID0gT2JqZWN0LmtleXModGVybXMpO1xuICAgICAgICB2YXIgcmVzdWx0ID0ge307XG4gICAgICAgIFxuICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKyl7XG4gICAgICAgICAgICB2YXIgdGVybSA9IGtleXNbaV07XG4gICAgICAgICAgICB2YXIgaWQgPSB0ZXJtc1t0ZXJtXTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYoYWNjW3Rlcm1dKXtcbiAgICAgICAgICAgICAgICBPYmplY3QuYXNzaWduKHJlc3VsdCwgeyBbdGVybV06IFsuLi5hY2NbdGVybV0sIGlkXSB9KVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBPYmplY3QuYXNzaWduKHJlc3VsdCwgeyBbdGVybV06IFtpZF0gfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKGFjYywgcmVzdWx0KTtcbiAgICB9LCB7fSk7XG59XG5cbi8qIFxue1xuICAgIHRlcm06IFN0cmluZyxcbiAgICB0b3RhbDogTnVtYmVyLFxuICAgIG5laWdoYm9yczogWy4uLnsgdGVybTogU3RyaW5nLCB0b3RhbFNoYXJlZDogTnVtYmVyIH1dXG59XG4qL1xuZnVuY3Rpb24gR3JhcGhOb2RlKHRlcm0sIHRvdGFsLCBuZWlnaGJvcnMpe1xuICAgIHJldHVybiB7XG4gICAgICAgIHRlcm0sXG4gICAgICAgIHRvdGFsLFxuICAgICAgICBuZWlnaGJvcnNcbiAgICB9O1xufVxuXG5cbmZ1bmN0aW9uIGNyZWF0ZUdyYXBoKHRlcm1zT2JqKXtcbiAgICB2YXIgbm9kZXMgPSBbXTtcbiAgICB2YXIgdGVybXMgPSBPYmplY3Qua2V5cyh0ZXJtc09iaik7XG4gICAgdmFyIHRlcm1zTGVuID0gdGVybXMubGVuZ3RoO1xuICAgIFxuICAgIGZvcih2YXIgaSA9IDA7IGkgPCB0ZXJtc0xlbjsgaSsrKXtcbiAgICAgICAgdmFyIG5laWdoYm9ycyA9IFtdO1xuICAgICAgICB2YXIgdGVybSA9IHRlcm1zW2ldO1xuICAgICAgICB2YXIgaWRzID0gdGVybXNPYmpbdGVybV07XG4gICAgICAgIFxuICAgICAgICBmb3IodmFyIGogPSAwOyBqIDwgdGVybXNMZW47IGorKyl7XG4gICAgICAgICAgICB2YXIgbmVpZ2hib3IgPSB0ZXJtc1tqXTtcbiAgICAgICAgICAgIHZhciBuZWlnaGJvcklkcyA9IHRlcm1zT2JqW25laWdoYm9yXTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYobmVpZ2hib3IgIT09IHRlcm0pe1xuICAgICAgICAgICAgICAgIHZhciBpbnRlcnNlY3Rpb24gPSBpbnRlcnNlY3QoaWRzLCBuZWlnaGJvcklkcykubGVuZ3RoO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGlmKGludGVyc2VjdGlvbiA+IDApe1xuICAgICAgICAgICAgICAgICAgIG5laWdoYm9ycy5wdXNoKHsgW25laWdoYm9yXTogaW50ZXJzZWN0aW9uIH0pOyBcbiAgICAgICAgICAgICAgICB9ICAgICBcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgbm9kZXMucHVzaChHcmFwaE5vZGUodGVybSwgaWRzLmxlbmd0aCwgbmVpZ2hib3JzKSk7XG4gICAgfVxuICAgIFxuICAgIHJldHVybiBub2Rlcztcbn1cblxuLyogQXJyYXksIEFycmF5IC0+IEFycmF5XG4gICAgYXNzdW1lcyBib3RoIGFycmF5cyBhcmUgc29ydGVkXG4gICAgLSBjb3VsZCB0YWtlIGFuIGFkZGl0aW9uYWwgYXJnOlxuICAgICAgICAtIEFORCwgT1IsIE5PVC4uLlxuICAgICAgICBhbGxvdyBmb3IgbW9yZSBjb21wbGV4IHF1ZXJpZXMgICovXG5mdW5jdGlvbiBpbnRlcnNlY3QoYXJyMSwgYXJyMil7XG4gICAgdmFyIHJlc3VsdCA9IFtdO1xuICAgIHZhciBhMSA9IGFycjE7XG4gICAgdmFyIGEyID0gYXJyMjtcblxuICAgIHdoaWxlKGExLmxlbmd0aCAhPT0gMCAmJiBhMi5sZW5ndGggIT09IDApe1xuICAgICAgICBpZihhMVswXSA9PT0gYTJbMF0pe1xuICAgICAgICAgICAgcmVzdWx0LnB1c2goYTFbMF0pO1xuICAgICAgICAgICAgYTEgPSBhMS5zbGljZSgxKTtcbiAgICAgICAgICAgIGEyID0gYTIuc2xpY2UoMSk7XG4gICAgICAgIH0gZWxzZSBpZihhMVswXSA8IGEyWzBdKXtcbiAgICAgICAgICAgIGExID0gYTEuc2xpY2UoMSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBhMiA9IGEyLnNsaWNlKDEpO1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIHJldHVybiByZXN1bHQ7XG59XG5cbi8qIEFycmF5IC0+IEFycmF5XG4gICAgXG4gICAgcmV0dXJucyBhcnJheSBpZHMgdGhhdCBhcmUgcHJlc2VudCBpbiBhbGwgZ2l2ZW4gbGFuZ3MgICovXG5mdW5jdGlvbiBtdWx0aXBsZUludGVyc2VjdCh0ZXJtcywgZGF0YSl7XG4gICAgLyogc29ydHMgbGFuZ3MgYnkgYXJyYXkgc2l6ZVxuICAgICAgIHN0YXJ0aW5nIHdpdGggc21hbGxlc3QgYXJyYXlzIG1lYW5zIFxuICAgICAgIGludGVybWVkaWF0ZSByZXN1bHRzIHdpbGwgYmUgbm8gYmlnZ2VyXG4gICAgICAgdGhhbiBzbWFsbGVzdCBhcnJheSAqL1xuICAgIHZhciBzb3J0ZWQgPSB0ZXJtcy5tYXAoKHRlcm0pID0+IHtcbiAgICAgICAgcmV0dXJuIGRhdGFbdGVybV07XG4gICAgfSkuc29ydCgoYSwgYikgPT4ge1xuICAgICAgICByZXR1cm4gYSAtIGI7XG4gICAgfSk7XG4gICAgXG4gICAgLy8gZmlyc3RcbiAgICB2YXIgcmVzdWx0ID0gc29ydGVkWzBdO1xuICAgIC8vIHJlc3RcbiAgICB2YXIgc29ydGVkID0gc29ydGVkLnNsaWNlKDEpO1xuICAgIFxuICAgIHdoaWxlKHNvcnRlZC5sZW5ndGggIT09IDAgJiYgcmVzdWx0Lmxlbmd0aCAhPT0gMCl7XG4gICAgICAgIC8vIGludGVyc2VjdCBmaXJzdCAmIHNlY29uZCAtIHNtYWxsZXN0IGFycmF5c1xuICAgICAgICByZXN1bHQgPSBpbnRlcnNlY3QocmVzdWx0LCBzb3J0ZWRbMF0pO1xuICAgICAgICBzb3J0ZWQgPSBzb3J0ZWQuc2xpY2UoMSk7XG4gICAgfVxuICAgIFxuICAgIHJldHVybiByZXN1bHQ7XG59XG5cblxuZXhwb3J0IHtcbiAgICBtZXJnZVRlcm1zLFxuICAgIGNyZWF0ZUdyYXBoLFxuICAgIGludGVyc2VjdFxufTtcblxuXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9qcy9jYWxjdWxhdGlvbnMuanNcbi8vIG1vZHVsZSBpZCA9IDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gY3NzXG5pbXBvcnQgJy4uL2Nzcy9zdHlsZS5jc3MnO1xuXG5pbXBvcnQgeyBtZXJnZVRlcm1zLCBjcmVhdGVHcmFwaCwgaW50ZXJzZWN0IH0gZnJvbSAnLi9jYWxjdWxhdGlvbnMnO1xuaW1wb3J0IHsgZ2V0SlNPTiB9IGZyb20gJy4vZmV0Y2gtc2hlZXQnO1xuaW1wb3J0IHsgcHJlc2VudFRlcm1zLCBwcmVzZW50VGVybXMyLCBURVJNUyB9IGZyb20gJy4vd29yZHMtcGxheSc7XG5pbXBvcnQgeyBSZXN1bHRzVGFibGUsIE5vUmVmc0xpc3QgfSBmcm9tICcuL2NvbXBvbmVudHMnO1xuaW1wb3J0IHsgR3JhcGgsIGNyZWF0ZU5vZGVzLCBjcmVhdGVMaW5rcyB9IGZyb20gJy4vZ3JhcGgnO1xuXG5jb25zdCBpZCA9ICcxZHRaeVVBb2JjV0M2eVliZHNSMV9Pd3cyOVhDYkVVTUFCVkQyMHc0Z0lwSSc7XG5jb25zdCB1cmwgPSBgaHR0cHM6Ly9zcHJlYWRzaGVldHMuZ29vZ2xlLmNvbS9mZWVkcy9saXN0LyR7aWR9LzIvcHVibGljL2Z1bGw/YWx0PWpzb25gO1xuXG5cbi8qIFlZWVktTU0tREQgKi9cbmZ1bmN0aW9uIGZvcm1hdERhdGUoZCl7XG4gICAgY29uc3QgeWVhciA9IGQuZ2V0RnVsbFllYXIoKTtcbiAgICBjb25zdCBtb250aCA9IGQuZ2V0TW9udGgoKSArIDE7XG4gICAgY29uc3QgZGF5ID0gZC5nZXREYXRlKCk7XG4gICAgY29uc3QgYmVsb3cxMCA9IG4gPT4gbiA8IDEwID8gJzAnICsgbiA6IG47XG4gICAgXG4gICAgcmV0dXJuIGAke3llYXJ9LSR7YmVsb3cxMChtb250aCl9LSR7YmVsb3cxMChkYXkpfWA7XG59XG5cbi8qIHJldHJpZXZlcyBvbmx5IHRoZSBpZCAmIHN1bW1hcnkgZnJvbSBHU2hlZXRzIHJlc3BvbnNlOlxuICAgeyBpZDogU3RyaW5nLCBzdW1tYXJ5OiBTdHJpbmcgfSAqL1xuZnVuY3Rpb24gY3JlYXRlU3VtbWFyaWVzKGpzb24pe1xuICAgIGNvbnN0IGVudHJpZXMgPSBqc29uLmZlZWQuZW50cnk7XG4gICAgXG4gICAgcmV0dXJuIGVudHJpZXMubWFwKGUgPT4ge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgaWQ6IGVbJ2dzeCRpZCddWyckdCddLFxuICAgICAgICAgICAgc3VtbWFyeTogZVsnZ3N4JHN1bW1hcnknXVsnJHQnXVxuICAgICAgICB9O1xuICAgIH0pO1xufVxuXG5cbi8qIGZldGNoZXMgc3VtbWFyaWVzIGZyb20gR1NoZWV0ICovXG4vKmFzeW5jIGZ1bmN0aW9uIGdldFN1bW1hcmllcygpe1xuICAgIHZhciBmZXRjaGVkID0gYXdhaXQgZ2V0SlNPTih1cmwpO1xuICAgIHZhciBqc29uID0gY3JlYXRlU3VtbWFyaWVzKGZldGNoZWQpO1xuICAgIFxuICAgIHJldHVybiBqc29uO1xufSovXG5cblxuLyogbWFpbiByZW5kZXJpbmcgZnVuY3Rpb24gKi9cbmZ1bmN0aW9uIHJlbmRlcih0YXJnZXQsIGh0bWwpe1xuICAgIHJldHVybiB0YXJnZXQuaW5uZXJIVE1MID0gaHRtbDtcbn1cblxuXG4vKiBmaWx0ZXJzIHRlcm1zIHRoYXQgaGF2ZSBubyByZWZlcmVuY2VzIFxuICAgbmVlZGVkIGluIG1haW4oKSAqL1xuZnVuY3Rpb24gZmlsdGVyV2l0aE5vUmVmcyhhY2MsIHRlcm0pe1xuICAgIC8vICd0aGlzIGlzICdyZXN1bHRzJyBPYmplY3QgaW4gbWFpblxuICAgIHJldHVybiB0ZXJtIGluIHRoaXMgPyBhY2MgOiBhY2MuY29uY2F0KHRlcm0pO1xufVxuXG5cbi8qIGdldHMgdGhlIHNpemUgb2YgdGhlIGNsaWVudCdzIGJyb3dzZXIgd2luZG93ICovXG5mdW5jdGlvbiBnZXRDbGllbnRTaXplKGRvY1dpZHRoKXtcbiAgICBpZihkb2NXaWR0aCA8IDczMCl7XG4gICAgICAgIHJldHVybiAzMDA7XG4gICAgfSBlbHNlIGlmKDczMCA8IGRvY1dpZHRoIDwgMTAwMCl7XG4gICAgICAgIHJldHVybiA0NTA7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIDYwMDtcbiAgICB9XG59XG5cblxuLyogT2JqZWN0IGZvciB3b3JraW5nIHdpdGggYXBwIGluIHdlYiBjb25zb2xlOiBcbiAgICdKb2JzLkFwcCcgKi9cbmV4cG9ydCBjb25zdCBBcHAgPSB7XG5cbiAgICAvLyB1bmZpbHRlcmVkIEdTaGVldHMgcmVzcG9uc2VcbiAgICByZXNwb25zZToge30sXG4gICAgc2V0IGFqYXgoanNvbil7XG4gICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHRoaXMucmVzcG9uc2UsIGpzb24pO1xuICAgIH0sXG4gICAgXG4gICAgLy8gZmlsdGVyZWQgcmVzcG9uc2UgZGF0YVxuICAgIGdldCBkYXRhKCl7XG4gICAgICAgIHJldHVybiBjcmVhdGVTdW1tYXJpZXModGhpcy5yZXNwb25zZSk7XG4gICAgfSxcbiAgICBcbiAgICAvLyBET00gT2JqZWN0c1xuICAgIHRhYmxlOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVzdWx0c1RhYmxlJyksXG4gICAgZ3JhcGg6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZXN1bHRzR3JhcGgnKSxcbiAgICBub1JlZnNMaXN0OiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbm9SZWZzTGlzdCcpLFxuICAgICAgXG4gICAgLy8gYXBwIGRhdGFcbiAgICBncmFwaFNpemU6IGdldENsaWVudFNpemUoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoKSxcbiAgICBcbiAgICBnZXQgcG9zdGVkRGF0ZSgpe1xuICAgICAgICBjb25zdCBkYXRlID0gdGhpcy5yZXNwb25zZS5mZWVkLnVwZGF0ZWRbJyR0J107XG4gICAgICAgIHJldHVybiBkYXRlID8gZm9ybWF0RGF0ZShuZXcgRGF0ZShkYXRlKSkgOiBmb3JtYXREYXRlKG5ldyBEYXRlKCkpO1xuICAgIH0sXG4gICAgZ2V0IHRvdGFsU3VtbWFyaWVzKCl7XG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEubGVuZ3RoO1xuICAgIH0sXG4gICAgZ2V0IHByZXNlbnRUZXJtcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5tYXAocyA9PiB7XG4gICAgICAgICAgICByZXR1cm4gcHJlc2VudFRlcm1zMihzLnN1bW1hcnksIHMuaWQpO1xuICAgICAgICB9KTsgXG4gICAgfSxcbiAgICBnZXQgdGVybXNJbmRleCgpe1xuICAgICAgICByZXR1cm4gbWVyZ2VUZXJtcyh0aGlzLnByZXNlbnRUZXJtcyk7XG4gICAgfSxcbiAgICBnZXQgZWFjaEluZGV4TGVuZ3RoKCl7XG4gICAgICAgIHJldHVybiBPYmplY3Qua2V5cyh0aGlzLnRlcm1zSW5kZXgpLm1hcChyID0+IHtcbiAgICAgICAgICAgIHJldHVybiBbciwgdGhpcy50ZXJtc0luZGV4W3JdLmxlbmd0aF07XG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgYWxsVGVybVN0cmluZ3M6IFRFUk1TLnNsaWNlKDApLFxuICAgIGdldCBhbGxXaXRoTm9SZWZzKCl7XG4gICAgICAgIHJldHVybiB0aGlzLmFsbFRlcm1TdHJpbmdzLnJlZHVjZShmaWx0ZXJXaXRoTm9SZWZzLmJpbmQodGhpcy50ZXJtc0luZGV4KSwgW10pOyBcbiAgICB9LFxuICAgIGdldCBncmFwaE5vZGVzKCl7XG4gICAgICAgIHJldHVybiBjcmVhdGVOb2Rlcyh0aGlzLnRlcm1zSW5kZXgpO1xuICAgIH0sXG4gICAgZ2V0IGdyYXBoTGlua3MoKXtcbiAgICAgICAgcmV0dXJuIGNyZWF0ZUxpbmtzKHRoaXMudGVybXNJbmRleCk7XG4gICAgfSxcblxuICAgIGRlYnVnOiB7XG4gICAgICAgIGludGVyc2VjdCxcbiAgICAgICAgY3JlYXRlTGlua3NcbiAgICB9XG59O1xuXG5cbi8qIGluaXRpYWxpemUgYXBwICovXG4oKCkgPT4ge1xuICAgIGNvbnN0IGluaXRBbmRSZW5kZXIgPSBqc29uID0+IHtcbiAgICAgICAgQXBwLmFqYXggPSBqc29uO1xuICAgICAgICBBcHAuZ3JhcGguaW5uZXJIVE1MID0gJyc7XG4gICAgICAgIFxuICAgICAgICByZW5kZXIocmVzdWx0c1RhYmxlLCBSZXN1bHRzVGFibGUoQXBwLmVhY2hJbmRleExlbmd0aCwgQXBwLnRvdGFsU3VtbWFyaWVzLCBBcHAucG9zdGVkRGF0ZSkpO1xuICAgICAgICBHcmFwaChBcHAuZ3JhcGhOb2RlcywgQXBwLmdyYXBoTGlua3MsIEFwcC5ncmFwaCwgQXBwLmdyYXBoU2l6ZSk7ICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICByZW5kZXIobm9SZWZzTGlzdCwgTm9SZWZzTGlzdChBcHAuYWxsV2l0aE5vUmVmcykpO1xuICAgIH07XG5cbiAgICByZXR1cm4gZ2V0SlNPTih1cmwpXG4gICAgICAgIC50aGVuKGluaXRBbmRSZW5kZXIpXG4gICAgICAgIC5jYXRjaChjb25zb2xlLmxvZyk7XG59KSgpO1xuXG5cblxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvanMvYXBwLmpzXG4vLyBtb2R1bGUgaWQgPSAxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIHN0eWxlLWxvYWRlcjogQWRkcyBzb21lIGNzcyB0byB0aGUgRE9NIGJ5IGFkZGluZyBhIDxzdHlsZT4gdGFnXG5cbi8vIGxvYWQgdGhlIHN0eWxlc1xudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuL3N0eWxlLmNzc1wiKTtcbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuLy8gUHJlcGFyZSBjc3NUcmFuc2Zvcm1hdGlvblxudmFyIHRyYW5zZm9ybTtcblxudmFyIG9wdGlvbnMgPSB7XCJobXJcIjp0cnVlfVxub3B0aW9ucy50cmFuc2Zvcm0gPSB0cmFuc2Zvcm1cbi8vIGFkZCB0aGUgc3R5bGVzIHRvIHRoZSBET01cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qc1wiKShjb250ZW50LCBvcHRpb25zKTtcbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuaWYobW9kdWxlLmhvdCkge1xuXHQvLyBXaGVuIHRoZSBzdHlsZXMgY2hhbmdlLCB1cGRhdGUgdGhlIDxzdHlsZT4gdGFnc1xuXHRpZighY29udGVudC5sb2NhbHMpIHtcblx0XHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi9zdHlsZS5jc3NcIiwgZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4vc3R5bGUuY3NzXCIpO1xuXHRcdFx0aWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG5cdFx0XHR1cGRhdGUobmV3Q29udGVudCk7XG5cdFx0fSk7XG5cdH1cblx0Ly8gV2hlbiB0aGUgbW9kdWxlIGlzIGRpc3Bvc2VkLCByZW1vdmUgdGhlIDxzdHlsZT4gdGFnc1xuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9jc3Mvc3R5bGUuY3NzXG4vLyBtb2R1bGUgaWQgPSAyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikodW5kZWZpbmVkKTtcbi8vIGltcG9ydHNcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIkBpbXBvcnQgdXJsKGh0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzP2ZhbWlseT1GaXJhK1NhbnM6NDAwLDcwMCk7XCIsIFwiXCJdKTtcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIkBpbXBvcnQgdXJsKGh0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzP2ZhbWlseT1NZXJyaXdlYXRoZXI6NDAwLDcwMCk7XCIsIFwiXCJdKTtcblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCJoMSxoMixoMyxoNCxoNSxoNiB7XFxuICBmb250LWZhbWlseTogJ0ZpcmEgU2FucycsIHNlcmlmO1xcbiAgbGV0dGVyLXNwYWNpbmc6IDAuMnJlbVxcbn1cXG5cXG5ociB7XFxuICB3aWR0aDogNTAlO1xcbiAgYm9yZGVyOiAxcHggc29saWQgI2NjYztcXG59XFxuXFxuYm9keSB7XFxuICBtYXJnaW46IDA7XFxuICBwYWRkaW5nOiAwO1xcblxcbiAgZm9udC1mYW1pbHk6ICdNZXJyaXdlYXRoZXInLCBzZXJpZjtcXG4gIGZvbnQtc2l6ZTogMC44NXJlbTtcXG4gICAgXFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuXFxuaGVhZGVyIHtcXG4gIGhlaWdodDogMjB2aDtcXG4gIHBhZGRpbmc6IDA7XFxuICBtYXJnaW46IDA7XFxuICBcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn1cXG5cXG5oZWFkZXIgPiBoMSxoMyxoNSB7XFxuICBtYXJnaW46IDA7XFxuICBwYWRkaW5nOiAwO1xcbn1cXG5cXG5tYWluIHtcXG4gIHdpZHRoOiA5MHZ3O1xcbn1cXG5cXG5zZWN0aW9uIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbn1cXG5cXG50ZCB7XFxuICAgIGZvbnQtZmFtaWx5OiAnRmlyYSBTYW5zJywgc2Fucy1zZXJpZjtcXG4gICAgZm9udC13ZWlnaHQ6IDUwMDtcXG4gICAgbGV0dGVyLXNwYWNpbmc6IDAuMTVyZW07XFxufVxcblxcbnRkLCB0aCB7XFxuICAgIHRleHQtYWxpZ246IGxlZnQ7XFxuICAgIHBhZGRpbmc6IDAuMXJlbSAxcmVtIDAuM3JlbSAxcmVtO1xcbiAgICBib3JkZXItYm90dG9tOiAxcHggZGFzaGVkICNhYWE7XFxufVxcblxcbnAge1xcbiAgbGluZS1oZWlnaHQ6IDEuNXJlbTtcXG4gIG1hcmdpbjogMS41cmVtIDFyZW0gMS41cmVtIDFyZW07XFxufVxcblxcbmZvb3RlciB7XFxuICBmb250LWZhbWlseTogJ01lcnJpd2VhdGhlcicsIHNlcmlmO1xcbiAgbWFyZ2luOiAwO1xcbn1cXG5cXG5cXG4ubG9hZGluZyB7XFxuXFx0bWFyZ2luOiA1cmVtO1xcbn1cXG5cXG5kaXYucG9wdXAge1xcbiAgICBtYXJnaW46IDA7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIGZvbnQ6IDFyZW0gJ0ZpcmEgU2Fucyc7XFxuICAgIHBhZGRpbmc6IDAuMXJlbTtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcXG4gICAgYm9yZGVyLXJhZGl1czogMTUlO1xcbiAgICBwb2ludGVyLWV2ZW50czogbm9uZTtcXG59XFxuXFxuXFxuQG1lZGlhIChtaW4td2lkdGg6IDczMCl7XFxuICBib2R5IHtcXG4gICAgZm9udC1zaXplOiAxLjNyZW07XFxuICB9XFxuXFxuICB0ZCwgdGgge1xcbiAgICBwYWRkaW5nOiAwLjRyZW0gNHJlbSAwLjRyZW0gNHJlbTtcXG4gIH1cXG59XFxuXFxuXFxuQG1lZGlhIChtaW4td2lkdGg6IDEwMDBweCl7XFxuICBib2R5IHtcXG4gICAgZm9udC1zaXplOiAxLjNyZW07XFxuICB9XFxuXFxuICB0ZCwgdGgge1xcbiAgICBwYWRkaW5nOiAwLjVyZW07XFxuICB9XFxuICBcXG4gIG1haW4ge1xcbiAgICB3aWR0aDogODB2dztcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IHJvdztcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAgIGFsaWduLWl0ZW1zOiBmbGV4LXN0YXJ0O1xcbiAgfVxcbiAgXFxuICBzZWN0aW9uIHtcXG4gICAgd2lkdGg6IDUwJTtcXG4gICAgbWFyZ2luOiAycmVtO1xcbiAgfVxcbiAgXFxuICBhc2lkZSB7XFxuICAgIHdpZHRoOiA1MCU7XFxuICAgIG1hcmdpbjogMnJlbTtcXG4gIH1cXG4gIFxcbiAgcCB7XFxuICAgIG1hcmdpbjogMnJlbSAwIDJyZW0gMDtcXG4gICAgbGluZS1oZWlnaHQ6IDIuMnJlbTtcXG4gIH1cXG4gIFxcbiAgdGFibGUge1xcbiAgICB3aWR0aDogMTAwJTtcXG4gIH1cXG59XFxuXCIsIFwiXCJdKTtcblxuLy8gZXhwb3J0c1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlciEuL3NyYy9jc3Mvc3R5bGUuY3NzXG4vLyBtb2R1bGUgaWQgPSAzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qXG5cdE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG5cdEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG4vLyBjc3MgYmFzZSBjb2RlLCBpbmplY3RlZCBieSB0aGUgY3NzLWxvYWRlclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbih1c2VTb3VyY2VNYXApIHtcblx0dmFyIGxpc3QgPSBbXTtcblxuXHQvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG5cdGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcblx0XHRyZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcblx0XHRcdHZhciBjb250ZW50ID0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtLCB1c2VTb3VyY2VNYXApO1xuXHRcdFx0aWYoaXRlbVsyXSkge1xuXHRcdFx0XHRyZXR1cm4gXCJAbWVkaWEgXCIgKyBpdGVtWzJdICsgXCJ7XCIgKyBjb250ZW50ICsgXCJ9XCI7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRyZXR1cm4gY29udGVudDtcblx0XHRcdH1cblx0XHR9KS5qb2luKFwiXCIpO1xuXHR9O1xuXG5cdC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG5cdGxpc3QuaSA9IGZ1bmN0aW9uKG1vZHVsZXMsIG1lZGlhUXVlcnkpIHtcblx0XHRpZih0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIilcblx0XHRcdG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIFwiXCJdXTtcblx0XHR2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgaWQgPSB0aGlzW2ldWzBdO1xuXHRcdFx0aWYodHlwZW9mIGlkID09PSBcIm51bWJlclwiKVxuXHRcdFx0XHRhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG5cdFx0fVxuXHRcdGZvcihpID0gMDsgaSA8IG1vZHVsZXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBpdGVtID0gbW9kdWxlc1tpXTtcblx0XHRcdC8vIHNraXAgYWxyZWFkeSBpbXBvcnRlZCBtb2R1bGVcblx0XHRcdC8vIHRoaXMgaW1wbGVtZW50YXRpb24gaXMgbm90IDEwMCUgcGVyZmVjdCBmb3Igd2VpcmQgbWVkaWEgcXVlcnkgY29tYmluYXRpb25zXG5cdFx0XHQvLyAgd2hlbiBhIG1vZHVsZSBpcyBpbXBvcnRlZCBtdWx0aXBsZSB0aW1lcyB3aXRoIGRpZmZlcmVudCBtZWRpYSBxdWVyaWVzLlxuXHRcdFx0Ly8gIEkgaG9wZSB0aGlzIHdpbGwgbmV2ZXIgb2NjdXIgKEhleSB0aGlzIHdheSB3ZSBoYXZlIHNtYWxsZXIgYnVuZGxlcylcblx0XHRcdGlmKHR5cGVvZiBpdGVtWzBdICE9PSBcIm51bWJlclwiIHx8ICFhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG5cdFx0XHRcdGlmKG1lZGlhUXVlcnkgJiYgIWl0ZW1bMl0pIHtcblx0XHRcdFx0XHRpdGVtWzJdID0gbWVkaWFRdWVyeTtcblx0XHRcdFx0fSBlbHNlIGlmKG1lZGlhUXVlcnkpIHtcblx0XHRcdFx0XHRpdGVtWzJdID0gXCIoXCIgKyBpdGVtWzJdICsgXCIpIGFuZCAoXCIgKyBtZWRpYVF1ZXJ5ICsgXCIpXCI7XG5cdFx0XHRcdH1cblx0XHRcdFx0bGlzdC5wdXNoKGl0ZW0pO1xuXHRcdFx0fVxuXHRcdH1cblx0fTtcblx0cmV0dXJuIGxpc3Q7XG59O1xuXG5mdW5jdGlvbiBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0sIHVzZVNvdXJjZU1hcCkge1xuXHR2YXIgY29udGVudCA9IGl0ZW1bMV0gfHwgJyc7XG5cdHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcblx0aWYgKCFjc3NNYXBwaW5nKSB7XG5cdFx0cmV0dXJuIGNvbnRlbnQ7XG5cdH1cblxuXHRpZiAodXNlU291cmNlTWFwICYmIHR5cGVvZiBidG9hID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0dmFyIHNvdXJjZU1hcHBpbmcgPSB0b0NvbW1lbnQoY3NzTWFwcGluZyk7XG5cdFx0dmFyIHNvdXJjZVVSTHMgPSBjc3NNYXBwaW5nLnNvdXJjZXMubWFwKGZ1bmN0aW9uIChzb3VyY2UpIHtcblx0XHRcdHJldHVybiAnLyojIHNvdXJjZVVSTD0nICsgY3NzTWFwcGluZy5zb3VyY2VSb290ICsgc291cmNlICsgJyAqLydcblx0XHR9KTtcblxuXHRcdHJldHVybiBbY29udGVudF0uY29uY2F0KHNvdXJjZVVSTHMpLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oJ1xcbicpO1xuXHR9XG5cblx0cmV0dXJuIFtjb250ZW50XS5qb2luKCdcXG4nKTtcbn1cblxuLy8gQWRhcHRlZCBmcm9tIGNvbnZlcnQtc291cmNlLW1hcCAoTUlUKVxuZnVuY3Rpb24gdG9Db21tZW50KHNvdXJjZU1hcCkge1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW5kZWZcblx0dmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSk7XG5cdHZhciBkYXRhID0gJ3NvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LCcgKyBiYXNlNjQ7XG5cblx0cmV0dXJuICcvKiMgJyArIGRhdGEgKyAnICovJztcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXG4vLyBtb2R1bGUgaWQgPSA0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qXG5cdE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG5cdEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5cbnZhciBzdHlsZXNJbkRvbSA9IHt9O1xuXG52YXJcdG1lbW9pemUgPSBmdW5jdGlvbiAoZm4pIHtcblx0dmFyIG1lbW87XG5cblx0cmV0dXJuIGZ1bmN0aW9uICgpIHtcblx0XHRpZiAodHlwZW9mIG1lbW8gPT09IFwidW5kZWZpbmVkXCIpIG1lbW8gPSBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXHRcdHJldHVybiBtZW1vO1xuXHR9O1xufTtcblxudmFyIGlzT2xkSUUgPSBtZW1vaXplKGZ1bmN0aW9uICgpIHtcblx0Ly8gVGVzdCBmb3IgSUUgPD0gOSBhcyBwcm9wb3NlZCBieSBCcm93c2VyaGFja3Ncblx0Ly8gQHNlZSBodHRwOi8vYnJvd3NlcmhhY2tzLmNvbS8jaGFjay1lNzFkODY5MmY2NTMzNDE3M2ZlZTcxNWMyMjJjYjgwNVxuXHQvLyBUZXN0cyBmb3IgZXhpc3RlbmNlIG9mIHN0YW5kYXJkIGdsb2JhbHMgaXMgdG8gYWxsb3cgc3R5bGUtbG9hZGVyXG5cdC8vIHRvIG9wZXJhdGUgY29ycmVjdGx5IGludG8gbm9uLXN0YW5kYXJkIGVudmlyb25tZW50c1xuXHQvLyBAc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS93ZWJwYWNrLWNvbnRyaWIvc3R5bGUtbG9hZGVyL2lzc3Vlcy8xNzdcblx0cmV0dXJuIHdpbmRvdyAmJiBkb2N1bWVudCAmJiBkb2N1bWVudC5hbGwgJiYgIXdpbmRvdy5hdG9iO1xufSk7XG5cbnZhciBnZXRFbGVtZW50ID0gKGZ1bmN0aW9uIChmbikge1xuXHR2YXIgbWVtbyA9IHt9O1xuXG5cdHJldHVybiBmdW5jdGlvbihzZWxlY3Rvcikge1xuXHRcdGlmICh0eXBlb2YgbWVtb1tzZWxlY3Rvcl0gPT09IFwidW5kZWZpbmVkXCIpIHtcblx0XHRcdHZhciBzdHlsZVRhcmdldCA9IGZuLmNhbGwodGhpcywgc2VsZWN0b3IpO1xuXHRcdFx0Ly8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcblx0XHRcdGlmIChzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuXHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG5cdFx0XHRcdFx0Ly8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcblx0XHRcdFx0XHRzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuXHRcdFx0XHR9IGNhdGNoKGUpIHtcblx0XHRcdFx0XHRzdHlsZVRhcmdldCA9IG51bGw7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdG1lbW9bc2VsZWN0b3JdID0gc3R5bGVUYXJnZXQ7XG5cdFx0fVxuXHRcdHJldHVybiBtZW1vW3NlbGVjdG9yXVxuXHR9O1xufSkoZnVuY3Rpb24gKHRhcmdldCkge1xuXHRyZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpXG59KTtcblxudmFyIHNpbmdsZXRvbiA9IG51bGw7XG52YXJcdHNpbmdsZXRvbkNvdW50ZXIgPSAwO1xudmFyXHRzdHlsZXNJbnNlcnRlZEF0VG9wID0gW107XG5cbnZhclx0Zml4VXJscyA9IHJlcXVpcmUoXCIuL3VybHNcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obGlzdCwgb3B0aW9ucykge1xuXHRpZiAodHlwZW9mIERFQlVHICE9PSBcInVuZGVmaW5lZFwiICYmIERFQlVHKSB7XG5cdFx0aWYgKHR5cGVvZiBkb2N1bWVudCAhPT0gXCJvYmplY3RcIikgdGhyb3cgbmV3IEVycm9yKFwiVGhlIHN0eWxlLWxvYWRlciBjYW5ub3QgYmUgdXNlZCBpbiBhIG5vbi1icm93c2VyIGVudmlyb25tZW50XCIpO1xuXHR9XG5cblx0b3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cblx0b3B0aW9ucy5hdHRycyA9IHR5cGVvZiBvcHRpb25zLmF0dHJzID09PSBcIm9iamVjdFwiID8gb3B0aW9ucy5hdHRycyA6IHt9O1xuXG5cdC8vIEZvcmNlIHNpbmdsZS10YWcgc29sdXRpb24gb24gSUU2LTksIHdoaWNoIGhhcyBhIGhhcmQgbGltaXQgb24gdGhlICMgb2YgPHN0eWxlPlxuXHQvLyB0YWdzIGl0IHdpbGwgYWxsb3cgb24gYSBwYWdlXG5cdGlmICghb3B0aW9ucy5zaW5nbGV0b24pIG9wdGlvbnMuc2luZ2xldG9uID0gaXNPbGRJRSgpO1xuXG5cdC8vIEJ5IGRlZmF1bHQsIGFkZCA8c3R5bGU+IHRhZ3MgdG8gdGhlIDxoZWFkPiBlbGVtZW50XG5cdGlmICghb3B0aW9ucy5pbnNlcnRJbnRvKSBvcHRpb25zLmluc2VydEludG8gPSBcImhlYWRcIjtcblxuXHQvLyBCeSBkZWZhdWx0LCBhZGQgPHN0eWxlPiB0YWdzIHRvIHRoZSBib3R0b20gb2YgdGhlIHRhcmdldFxuXHRpZiAoIW9wdGlvbnMuaW5zZXJ0QXQpIG9wdGlvbnMuaW5zZXJ0QXQgPSBcImJvdHRvbVwiO1xuXG5cdHZhciBzdHlsZXMgPSBsaXN0VG9TdHlsZXMobGlzdCwgb3B0aW9ucyk7XG5cblx0YWRkU3R5bGVzVG9Eb20oc3R5bGVzLCBvcHRpb25zKTtcblxuXHRyZXR1cm4gZnVuY3Rpb24gdXBkYXRlIChuZXdMaXN0KSB7XG5cdFx0dmFyIG1heVJlbW92ZSA9IFtdO1xuXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBpdGVtID0gc3R5bGVzW2ldO1xuXHRcdFx0dmFyIGRvbVN0eWxlID0gc3R5bGVzSW5Eb21baXRlbS5pZF07XG5cblx0XHRcdGRvbVN0eWxlLnJlZnMtLTtcblx0XHRcdG1heVJlbW92ZS5wdXNoKGRvbVN0eWxlKTtcblx0XHR9XG5cblx0XHRpZihuZXdMaXN0KSB7XG5cdFx0XHR2YXIgbmV3U3R5bGVzID0gbGlzdFRvU3R5bGVzKG5ld0xpc3QsIG9wdGlvbnMpO1xuXHRcdFx0YWRkU3R5bGVzVG9Eb20obmV3U3R5bGVzLCBvcHRpb25zKTtcblx0XHR9XG5cblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IG1heVJlbW92ZS5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGRvbVN0eWxlID0gbWF5UmVtb3ZlW2ldO1xuXG5cdFx0XHRpZihkb21TdHlsZS5yZWZzID09PSAwKSB7XG5cdFx0XHRcdGZvciAodmFyIGogPSAwOyBqIDwgZG9tU3R5bGUucGFydHMubGVuZ3RoOyBqKyspIGRvbVN0eWxlLnBhcnRzW2pdKCk7XG5cblx0XHRcdFx0ZGVsZXRlIHN0eWxlc0luRG9tW2RvbVN0eWxlLmlkXTtcblx0XHRcdH1cblx0XHR9XG5cdH07XG59O1xuXG5mdW5jdGlvbiBhZGRTdHlsZXNUb0RvbSAoc3R5bGVzLCBvcHRpb25zKSB7XG5cdGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIGl0ZW0gPSBzdHlsZXNbaV07XG5cdFx0dmFyIGRvbVN0eWxlID0gc3R5bGVzSW5Eb21baXRlbS5pZF07XG5cblx0XHRpZihkb21TdHlsZSkge1xuXHRcdFx0ZG9tU3R5bGUucmVmcysrO1xuXG5cdFx0XHRmb3IodmFyIGogPSAwOyBqIDwgZG9tU3R5bGUucGFydHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdFx0ZG9tU3R5bGUucGFydHNbal0oaXRlbS5wYXJ0c1tqXSk7XG5cdFx0XHR9XG5cblx0XHRcdGZvcig7IGogPCBpdGVtLnBhcnRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRcdGRvbVN0eWxlLnBhcnRzLnB1c2goYWRkU3R5bGUoaXRlbS5wYXJ0c1tqXSwgb3B0aW9ucykpO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHR2YXIgcGFydHMgPSBbXTtcblxuXHRcdFx0Zm9yKHZhciBqID0gMDsgaiA8IGl0ZW0ucGFydHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdFx0cGFydHMucHVzaChhZGRTdHlsZShpdGVtLnBhcnRzW2pdLCBvcHRpb25zKSk7XG5cdFx0XHR9XG5cblx0XHRcdHN0eWxlc0luRG9tW2l0ZW0uaWRdID0ge2lkOiBpdGVtLmlkLCByZWZzOiAxLCBwYXJ0czogcGFydHN9O1xuXHRcdH1cblx0fVxufVxuXG5mdW5jdGlvbiBsaXN0VG9TdHlsZXMgKGxpc3QsIG9wdGlvbnMpIHtcblx0dmFyIHN0eWxlcyA9IFtdO1xuXHR2YXIgbmV3U3R5bGVzID0ge307XG5cblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIGl0ZW0gPSBsaXN0W2ldO1xuXHRcdHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuXHRcdHZhciBjc3MgPSBpdGVtWzFdO1xuXHRcdHZhciBtZWRpYSA9IGl0ZW1bMl07XG5cdFx0dmFyIHNvdXJjZU1hcCA9IGl0ZW1bM107XG5cdFx0dmFyIHBhcnQgPSB7Y3NzOiBjc3MsIG1lZGlhOiBtZWRpYSwgc291cmNlTWFwOiBzb3VyY2VNYXB9O1xuXG5cdFx0aWYoIW5ld1N0eWxlc1tpZF0pIHN0eWxlcy5wdXNoKG5ld1N0eWxlc1tpZF0gPSB7aWQ6IGlkLCBwYXJ0czogW3BhcnRdfSk7XG5cdFx0ZWxzZSBuZXdTdHlsZXNbaWRdLnBhcnRzLnB1c2gocGFydCk7XG5cdH1cblxuXHRyZXR1cm4gc3R5bGVzO1xufVxuXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQgKG9wdGlvbnMsIHN0eWxlKSB7XG5cdHZhciB0YXJnZXQgPSBnZXRFbGVtZW50KG9wdGlvbnMuaW5zZXJ0SW50bylcblxuXHRpZiAoIXRhcmdldCkge1xuXHRcdHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0SW50bycgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuXHR9XG5cblx0dmFyIGxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wID0gc3R5bGVzSW5zZXJ0ZWRBdFRvcFtzdHlsZXNJbnNlcnRlZEF0VG9wLmxlbmd0aCAtIDFdO1xuXG5cdGlmIChvcHRpb25zLmluc2VydEF0ID09PSBcInRvcFwiKSB7XG5cdFx0aWYgKCFsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcCkge1xuXHRcdFx0dGFyZ2V0Lmluc2VydEJlZm9yZShzdHlsZSwgdGFyZ2V0LmZpcnN0Q2hpbGQpO1xuXHRcdH0gZWxzZSBpZiAobGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3AubmV4dFNpYmxpbmcpIHtcblx0XHRcdHRhcmdldC5pbnNlcnRCZWZvcmUoc3R5bGUsIGxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wLm5leHRTaWJsaW5nKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcblx0XHR9XG5cdFx0c3R5bGVzSW5zZXJ0ZWRBdFRvcC5wdXNoKHN0eWxlKTtcblx0fSBlbHNlIGlmIChvcHRpb25zLmluc2VydEF0ID09PSBcImJvdHRvbVwiKSB7XG5cdFx0dGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcblx0fSBlbHNlIGlmICh0eXBlb2Ygb3B0aW9ucy5pbnNlcnRBdCA9PT0gXCJvYmplY3RcIiAmJiBvcHRpb25zLmluc2VydEF0LmJlZm9yZSkge1xuXHRcdHZhciBuZXh0U2libGluZyA9IGdldEVsZW1lbnQob3B0aW9ucy5pbnNlcnRJbnRvICsgXCIgXCIgKyBvcHRpb25zLmluc2VydEF0LmJlZm9yZSk7XG5cdFx0dGFyZ2V0Lmluc2VydEJlZm9yZShzdHlsZSwgbmV4dFNpYmxpbmcpO1xuXHR9IGVsc2Uge1xuXHRcdHRocm93IG5ldyBFcnJvcihcIltTdHlsZSBMb2FkZXJdXFxuXFxuIEludmFsaWQgdmFsdWUgZm9yIHBhcmFtZXRlciAnaW5zZXJ0QXQnICgnb3B0aW9ucy5pbnNlcnRBdCcpIGZvdW5kLlxcbiBNdXN0IGJlICd0b3AnLCAnYm90dG9tJywgb3IgT2JqZWN0LlxcbiAoaHR0cHM6Ly9naXRodWIuY29tL3dlYnBhY2stY29udHJpYi9zdHlsZS1sb2FkZXIjaW5zZXJ0YXQpXFxuXCIpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudCAoc3R5bGUpIHtcblx0aWYgKHN0eWxlLnBhcmVudE5vZGUgPT09IG51bGwpIHJldHVybiBmYWxzZTtcblx0c3R5bGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZSk7XG5cblx0dmFyIGlkeCA9IHN0eWxlc0luc2VydGVkQXRUb3AuaW5kZXhPZihzdHlsZSk7XG5cdGlmKGlkeCA+PSAwKSB7XG5cdFx0c3R5bGVzSW5zZXJ0ZWRBdFRvcC5zcGxpY2UoaWR4LCAxKTtcblx0fVxufVxuXG5mdW5jdGlvbiBjcmVhdGVTdHlsZUVsZW1lbnQgKG9wdGlvbnMpIHtcblx0dmFyIHN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuXG5cdG9wdGlvbnMuYXR0cnMudHlwZSA9IFwidGV4dC9jc3NcIjtcblxuXHRhZGRBdHRycyhzdHlsZSwgb3B0aW9ucy5hdHRycyk7XG5cdGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zLCBzdHlsZSk7XG5cblx0cmV0dXJuIHN0eWxlO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVMaW5rRWxlbWVudCAob3B0aW9ucykge1xuXHR2YXIgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaW5rXCIpO1xuXG5cdG9wdGlvbnMuYXR0cnMudHlwZSA9IFwidGV4dC9jc3NcIjtcblx0b3B0aW9ucy5hdHRycy5yZWwgPSBcInN0eWxlc2hlZXRcIjtcblxuXHRhZGRBdHRycyhsaW5rLCBvcHRpb25zLmF0dHJzKTtcblx0aW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMsIGxpbmspO1xuXG5cdHJldHVybiBsaW5rO1xufVxuXG5mdW5jdGlvbiBhZGRBdHRycyAoZWwsIGF0dHJzKSB7XG5cdE9iamVjdC5rZXlzKGF0dHJzKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcblx0XHRlbC5zZXRBdHRyaWJ1dGUoa2V5LCBhdHRyc1trZXldKTtcblx0fSk7XG59XG5cbmZ1bmN0aW9uIGFkZFN0eWxlIChvYmosIG9wdGlvbnMpIHtcblx0dmFyIHN0eWxlLCB1cGRhdGUsIHJlbW92ZSwgcmVzdWx0O1xuXG5cdC8vIElmIGEgdHJhbnNmb3JtIGZ1bmN0aW9uIHdhcyBkZWZpbmVkLCBydW4gaXQgb24gdGhlIGNzc1xuXHRpZiAob3B0aW9ucy50cmFuc2Zvcm0gJiYgb2JqLmNzcykge1xuXHQgICAgcmVzdWx0ID0gb3B0aW9ucy50cmFuc2Zvcm0ob2JqLmNzcyk7XG5cblx0ICAgIGlmIChyZXN1bHQpIHtcblx0ICAgIFx0Ly8gSWYgdHJhbnNmb3JtIHJldHVybnMgYSB2YWx1ZSwgdXNlIHRoYXQgaW5zdGVhZCBvZiB0aGUgb3JpZ2luYWwgY3NzLlxuXHQgICAgXHQvLyBUaGlzIGFsbG93cyBydW5uaW5nIHJ1bnRpbWUgdHJhbnNmb3JtYXRpb25zIG9uIHRoZSBjc3MuXG5cdCAgICBcdG9iai5jc3MgPSByZXN1bHQ7XG5cdCAgICB9IGVsc2Uge1xuXHQgICAgXHQvLyBJZiB0aGUgdHJhbnNmb3JtIGZ1bmN0aW9uIHJldHVybnMgYSBmYWxzeSB2YWx1ZSwgZG9uJ3QgYWRkIHRoaXMgY3NzLlxuXHQgICAgXHQvLyBUaGlzIGFsbG93cyBjb25kaXRpb25hbCBsb2FkaW5nIG9mIGNzc1xuXHQgICAgXHRyZXR1cm4gZnVuY3Rpb24oKSB7XG5cdCAgICBcdFx0Ly8gbm9vcFxuXHQgICAgXHR9O1xuXHQgICAgfVxuXHR9XG5cblx0aWYgKG9wdGlvbnMuc2luZ2xldG9uKSB7XG5cdFx0dmFyIHN0eWxlSW5kZXggPSBzaW5nbGV0b25Db3VudGVyKys7XG5cblx0XHRzdHlsZSA9IHNpbmdsZXRvbiB8fCAoc2luZ2xldG9uID0gY3JlYXRlU3R5bGVFbGVtZW50KG9wdGlvbnMpKTtcblxuXHRcdHVwZGF0ZSA9IGFwcGx5VG9TaW5nbGV0b25UYWcuYmluZChudWxsLCBzdHlsZSwgc3R5bGVJbmRleCwgZmFsc2UpO1xuXHRcdHJlbW92ZSA9IGFwcGx5VG9TaW5nbGV0b25UYWcuYmluZChudWxsLCBzdHlsZSwgc3R5bGVJbmRleCwgdHJ1ZSk7XG5cblx0fSBlbHNlIGlmIChcblx0XHRvYmouc291cmNlTWFwICYmXG5cdFx0dHlwZW9mIFVSTCA9PT0gXCJmdW5jdGlvblwiICYmXG5cdFx0dHlwZW9mIFVSTC5jcmVhdGVPYmplY3RVUkwgPT09IFwiZnVuY3Rpb25cIiAmJlxuXHRcdHR5cGVvZiBVUkwucmV2b2tlT2JqZWN0VVJMID09PSBcImZ1bmN0aW9uXCIgJiZcblx0XHR0eXBlb2YgQmxvYiA9PT0gXCJmdW5jdGlvblwiICYmXG5cdFx0dHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIlxuXHQpIHtcblx0XHRzdHlsZSA9IGNyZWF0ZUxpbmtFbGVtZW50KG9wdGlvbnMpO1xuXHRcdHVwZGF0ZSA9IHVwZGF0ZUxpbmsuYmluZChudWxsLCBzdHlsZSwgb3B0aW9ucyk7XG5cdFx0cmVtb3ZlID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0cmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlKTtcblxuXHRcdFx0aWYoc3R5bGUuaHJlZikgVVJMLnJldm9rZU9iamVjdFVSTChzdHlsZS5ocmVmKTtcblx0XHR9O1xuXHR9IGVsc2Uge1xuXHRcdHN0eWxlID0gY3JlYXRlU3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuXHRcdHVwZGF0ZSA9IGFwcGx5VG9UYWcuYmluZChudWxsLCBzdHlsZSk7XG5cdFx0cmVtb3ZlID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0cmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlKTtcblx0XHR9O1xuXHR9XG5cblx0dXBkYXRlKG9iaik7XG5cblx0cmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZVN0eWxlIChuZXdPYmopIHtcblx0XHRpZiAobmV3T2JqKSB7XG5cdFx0XHRpZiAoXG5cdFx0XHRcdG5ld09iai5jc3MgPT09IG9iai5jc3MgJiZcblx0XHRcdFx0bmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiZcblx0XHRcdFx0bmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcFxuXHRcdFx0KSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0dXBkYXRlKG9iaiA9IG5ld09iaik7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJlbW92ZSgpO1xuXHRcdH1cblx0fTtcbn1cblxudmFyIHJlcGxhY2VUZXh0ID0gKGZ1bmN0aW9uICgpIHtcblx0dmFyIHRleHRTdG9yZSA9IFtdO1xuXG5cdHJldHVybiBmdW5jdGlvbiAoaW5kZXgsIHJlcGxhY2VtZW50KSB7XG5cdFx0dGV4dFN0b3JlW2luZGV4XSA9IHJlcGxhY2VtZW50O1xuXG5cdFx0cmV0dXJuIHRleHRTdG9yZS5maWx0ZXIoQm9vbGVhbikuam9pbignXFxuJyk7XG5cdH07XG59KSgpO1xuXG5mdW5jdGlvbiBhcHBseVRvU2luZ2xldG9uVGFnIChzdHlsZSwgaW5kZXgsIHJlbW92ZSwgb2JqKSB7XG5cdHZhciBjc3MgPSByZW1vdmUgPyBcIlwiIDogb2JqLmNzcztcblxuXHRpZiAoc3R5bGUuc3R5bGVTaGVldCkge1xuXHRcdHN0eWxlLnN0eWxlU2hlZXQuY3NzVGV4dCA9IHJlcGxhY2VUZXh0KGluZGV4LCBjc3MpO1xuXHR9IGVsc2Uge1xuXHRcdHZhciBjc3NOb2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKTtcblx0XHR2YXIgY2hpbGROb2RlcyA9IHN0eWxlLmNoaWxkTm9kZXM7XG5cblx0XHRpZiAoY2hpbGROb2Rlc1tpbmRleF0pIHN0eWxlLnJlbW92ZUNoaWxkKGNoaWxkTm9kZXNbaW5kZXhdKTtcblxuXHRcdGlmIChjaGlsZE5vZGVzLmxlbmd0aCkge1xuXHRcdFx0c3R5bGUuaW5zZXJ0QmVmb3JlKGNzc05vZGUsIGNoaWxkTm9kZXNbaW5kZXhdKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0c3R5bGUuYXBwZW5kQ2hpbGQoY3NzTm9kZSk7XG5cdFx0fVxuXHR9XG59XG5cbmZ1bmN0aW9uIGFwcGx5VG9UYWcgKHN0eWxlLCBvYmopIHtcblx0dmFyIGNzcyA9IG9iai5jc3M7XG5cdHZhciBtZWRpYSA9IG9iai5tZWRpYTtcblxuXHRpZihtZWRpYSkge1xuXHRcdHN0eWxlLnNldEF0dHJpYnV0ZShcIm1lZGlhXCIsIG1lZGlhKVxuXHR9XG5cblx0aWYoc3R5bGUuc3R5bGVTaGVldCkge1xuXHRcdHN0eWxlLnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcblx0fSBlbHNlIHtcblx0XHR3aGlsZShzdHlsZS5maXJzdENoaWxkKSB7XG5cdFx0XHRzdHlsZS5yZW1vdmVDaGlsZChzdHlsZS5maXJzdENoaWxkKTtcblx0XHR9XG5cblx0XHRzdHlsZS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcblx0fVxufVxuXG5mdW5jdGlvbiB1cGRhdGVMaW5rIChsaW5rLCBvcHRpb25zLCBvYmopIHtcblx0dmFyIGNzcyA9IG9iai5jc3M7XG5cdHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuXG5cdC8qXG5cdFx0SWYgY29udmVydFRvQWJzb2x1dGVVcmxzIGlzbid0IGRlZmluZWQsIGJ1dCBzb3VyY2VtYXBzIGFyZSBlbmFibGVkXG5cdFx0YW5kIHRoZXJlIGlzIG5vIHB1YmxpY1BhdGggZGVmaW5lZCB0aGVuIGxldHMgdHVybiBjb252ZXJ0VG9BYnNvbHV0ZVVybHNcblx0XHRvbiBieSBkZWZhdWx0LiAgT3RoZXJ3aXNlIGRlZmF1bHQgdG8gdGhlIGNvbnZlcnRUb0Fic29sdXRlVXJscyBvcHRpb25cblx0XHRkaXJlY3RseVxuXHQqL1xuXHR2YXIgYXV0b0ZpeFVybHMgPSBvcHRpb25zLmNvbnZlcnRUb0Fic29sdXRlVXJscyA9PT0gdW5kZWZpbmVkICYmIHNvdXJjZU1hcDtcblxuXHRpZiAob3B0aW9ucy5jb252ZXJ0VG9BYnNvbHV0ZVVybHMgfHwgYXV0b0ZpeFVybHMpIHtcblx0XHRjc3MgPSBmaXhVcmxzKGNzcyk7XG5cdH1cblxuXHRpZiAoc291cmNlTWFwKSB7XG5cdFx0Ly8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMjY2MDM4NzVcblx0XHRjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiICsgYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSArIFwiICovXCI7XG5cdH1cblxuXHR2YXIgYmxvYiA9IG5ldyBCbG9iKFtjc3NdLCB7IHR5cGU6IFwidGV4dC9jc3NcIiB9KTtcblxuXHR2YXIgb2xkU3JjID0gbGluay5ocmVmO1xuXG5cdGxpbmsuaHJlZiA9IFVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYik7XG5cblx0aWYob2xkU3JjKSBVUkwucmV2b2tlT2JqZWN0VVJMKG9sZFNyYyk7XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qc1xuLy8gbW9kdWxlIGlkID0gNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcbi8qKlxuICogV2hlbiBzb3VyY2UgbWFwcyBhcmUgZW5hYmxlZCwgYHN0eWxlLWxvYWRlcmAgdXNlcyBhIGxpbmsgZWxlbWVudCB3aXRoIGEgZGF0YS11cmkgdG9cbiAqIGVtYmVkIHRoZSBjc3Mgb24gdGhlIHBhZ2UuIFRoaXMgYnJlYWtzIGFsbCByZWxhdGl2ZSB1cmxzIGJlY2F1c2Ugbm93IHRoZXkgYXJlIHJlbGF0aXZlIHRvIGFcbiAqIGJ1bmRsZSBpbnN0ZWFkIG9mIHRoZSBjdXJyZW50IHBhZ2UuXG4gKlxuICogT25lIHNvbHV0aW9uIGlzIHRvIG9ubHkgdXNlIGZ1bGwgdXJscywgYnV0IHRoYXQgbWF5IGJlIGltcG9zc2libGUuXG4gKlxuICogSW5zdGVhZCwgdGhpcyBmdW5jdGlvbiBcImZpeGVzXCIgdGhlIHJlbGF0aXZlIHVybHMgdG8gYmUgYWJzb2x1dGUgYWNjb3JkaW5nIHRvIHRoZSBjdXJyZW50IHBhZ2UgbG9jYXRpb24uXG4gKlxuICogQSBydWRpbWVudGFyeSB0ZXN0IHN1aXRlIGlzIGxvY2F0ZWQgYXQgYHRlc3QvZml4VXJscy5qc2AgYW5kIGNhbiBiZSBydW4gdmlhIHRoZSBgbnBtIHRlc3RgIGNvbW1hbmQuXG4gKlxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzcykge1xuICAvLyBnZXQgY3VycmVudCBsb2NhdGlvblxuICB2YXIgbG9jYXRpb24gPSB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiICYmIHdpbmRvdy5sb2NhdGlvbjtcblxuICBpZiAoIWxvY2F0aW9uKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiZml4VXJscyByZXF1aXJlcyB3aW5kb3cubG9jYXRpb25cIik7XG4gIH1cblxuXHQvLyBibGFuayBvciBudWxsP1xuXHRpZiAoIWNzcyB8fCB0eXBlb2YgY3NzICE9PSBcInN0cmluZ1wiKSB7XG5cdCAgcmV0dXJuIGNzcztcbiAgfVxuXG4gIHZhciBiYXNlVXJsID0gbG9jYXRpb24ucHJvdG9jb2wgKyBcIi8vXCIgKyBsb2NhdGlvbi5ob3N0O1xuICB2YXIgY3VycmVudERpciA9IGJhc2VVcmwgKyBsb2NhdGlvbi5wYXRobmFtZS5yZXBsYWNlKC9cXC9bXlxcL10qJC8sIFwiL1wiKTtcblxuXHQvLyBjb252ZXJ0IGVhY2ggdXJsKC4uLilcblx0Lypcblx0VGhpcyByZWd1bGFyIGV4cHJlc3Npb24gaXMganVzdCBhIHdheSB0byByZWN1cnNpdmVseSBtYXRjaCBicmFja2V0cyB3aXRoaW5cblx0YSBzdHJpbmcuXG5cblx0IC91cmxcXHMqXFwoICA9IE1hdGNoIG9uIHRoZSB3b3JkIFwidXJsXCIgd2l0aCBhbnkgd2hpdGVzcGFjZSBhZnRlciBpdCBhbmQgdGhlbiBhIHBhcmVuc1xuXHQgICAoICA9IFN0YXJ0IGEgY2FwdHVyaW5nIGdyb3VwXG5cdCAgICAgKD86ICA9IFN0YXJ0IGEgbm9uLWNhcHR1cmluZyBncm91cFxuXHQgICAgICAgICBbXikoXSAgPSBNYXRjaCBhbnl0aGluZyB0aGF0IGlzbid0IGEgcGFyZW50aGVzZXNcblx0ICAgICAgICAgfCAgPSBPUlxuXHQgICAgICAgICBcXCggID0gTWF0Y2ggYSBzdGFydCBwYXJlbnRoZXNlc1xuXHQgICAgICAgICAgICAgKD86ICA9IFN0YXJ0IGFub3RoZXIgbm9uLWNhcHR1cmluZyBncm91cHNcblx0ICAgICAgICAgICAgICAgICBbXikoXSsgID0gTWF0Y2ggYW55dGhpbmcgdGhhdCBpc24ndCBhIHBhcmVudGhlc2VzXG5cdCAgICAgICAgICAgICAgICAgfCAgPSBPUlxuXHQgICAgICAgICAgICAgICAgIFxcKCAgPSBNYXRjaCBhIHN0YXJ0IHBhcmVudGhlc2VzXG5cdCAgICAgICAgICAgICAgICAgICAgIFteKShdKiAgPSBNYXRjaCBhbnl0aGluZyB0aGF0IGlzbid0IGEgcGFyZW50aGVzZXNcblx0ICAgICAgICAgICAgICAgICBcXCkgID0gTWF0Y2ggYSBlbmQgcGFyZW50aGVzZXNcblx0ICAgICAgICAgICAgICkgID0gRW5kIEdyb3VwXG4gICAgICAgICAgICAgICpcXCkgPSBNYXRjaCBhbnl0aGluZyBhbmQgdGhlbiBhIGNsb3NlIHBhcmVuc1xuICAgICAgICAgICkgID0gQ2xvc2Ugbm9uLWNhcHR1cmluZyBncm91cFxuICAgICAgICAgICogID0gTWF0Y2ggYW55dGhpbmdcbiAgICAgICApICA9IENsb3NlIGNhcHR1cmluZyBncm91cFxuXHQgXFwpICA9IE1hdGNoIGEgY2xvc2UgcGFyZW5zXG5cblx0IC9naSAgPSBHZXQgYWxsIG1hdGNoZXMsIG5vdCB0aGUgZmlyc3QuICBCZSBjYXNlIGluc2Vuc2l0aXZlLlxuXHQgKi9cblx0dmFyIGZpeGVkQ3NzID0gY3NzLnJlcGxhY2UoL3VybFxccypcXCgoKD86W14pKF18XFwoKD86W14pKF0rfFxcKFteKShdKlxcKSkqXFwpKSopXFwpL2dpLCBmdW5jdGlvbihmdWxsTWF0Y2gsIG9yaWdVcmwpIHtcblx0XHQvLyBzdHJpcCBxdW90ZXMgKGlmIHRoZXkgZXhpc3QpXG5cdFx0dmFyIHVucXVvdGVkT3JpZ1VybCA9IG9yaWdVcmxcblx0XHRcdC50cmltKClcblx0XHRcdC5yZXBsYWNlKC9eXCIoLiopXCIkLywgZnVuY3Rpb24obywgJDEpeyByZXR1cm4gJDE7IH0pXG5cdFx0XHQucmVwbGFjZSgvXicoLiopJyQvLCBmdW5jdGlvbihvLCAkMSl7IHJldHVybiAkMTsgfSk7XG5cblx0XHQvLyBhbHJlYWR5IGEgZnVsbCB1cmw/IG5vIGNoYW5nZVxuXHRcdGlmICgvXigjfGRhdGE6fGh0dHA6XFwvXFwvfGh0dHBzOlxcL1xcL3xmaWxlOlxcL1xcL1xcLykvaS50ZXN0KHVucXVvdGVkT3JpZ1VybCkpIHtcblx0XHQgIHJldHVybiBmdWxsTWF0Y2g7XG5cdFx0fVxuXG5cdFx0Ly8gY29udmVydCB0aGUgdXJsIHRvIGEgZnVsbCB1cmxcblx0XHR2YXIgbmV3VXJsO1xuXG5cdFx0aWYgKHVucXVvdGVkT3JpZ1VybC5pbmRleE9mKFwiLy9cIikgPT09IDApIHtcblx0XHQgIFx0Ly9UT0RPOiBzaG91bGQgd2UgYWRkIHByb3RvY29sP1xuXHRcdFx0bmV3VXJsID0gdW5xdW90ZWRPcmlnVXJsO1xuXHRcdH0gZWxzZSBpZiAodW5xdW90ZWRPcmlnVXJsLmluZGV4T2YoXCIvXCIpID09PSAwKSB7XG5cdFx0XHQvLyBwYXRoIHNob3VsZCBiZSByZWxhdGl2ZSB0byB0aGUgYmFzZSB1cmxcblx0XHRcdG5ld1VybCA9IGJhc2VVcmwgKyB1bnF1b3RlZE9yaWdVcmw7IC8vIGFscmVhZHkgc3RhcnRzIHdpdGggJy8nXG5cdFx0fSBlbHNlIHtcblx0XHRcdC8vIHBhdGggc2hvdWxkIGJlIHJlbGF0aXZlIHRvIGN1cnJlbnQgZGlyZWN0b3J5XG5cdFx0XHRuZXdVcmwgPSBjdXJyZW50RGlyICsgdW5xdW90ZWRPcmlnVXJsLnJlcGxhY2UoL15cXC5cXC8vLCBcIlwiKTsgLy8gU3RyaXAgbGVhZGluZyAnLi8nXG5cdFx0fVxuXG5cdFx0Ly8gc2VuZCBiYWNrIHRoZSBmaXhlZCB1cmwoLi4uKVxuXHRcdHJldHVybiBcInVybChcIiArIEpTT04uc3RyaW5naWZ5KG5ld1VybCkgKyBcIilcIjtcblx0fSk7XG5cblx0Ly8gc2VuZCBiYWNrIHRoZSBmaXhlZCBjc3Ncblx0cmV0dXJuIGZpeGVkQ3NzO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvdXJscy5qc1xuLy8gbW9kdWxlIGlkID0gNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcbmNvbnN0IE9QVFMgPSB7XG4gICAgbW9kZTogJ2NvcnMnXG59XG5cbmFzeW5jIGZ1bmN0aW9uIGdldEpTT04odXJsKXtcbiAgICB2YXIgZmV0Y2hlZCA9IGF3YWl0IGZldGNoKHVybCwgT1BUUyk7XG4gICAgdmFyIGpzb24gPSBhd2FpdCBmZXRjaGVkLmpzb24oKTtcbiAgICBcbiAgICByZXR1cm4ganNvbjtcbn1cblxuXG5leHBvcnQge1xuICAgIGdldEpTT05cbn07XG5cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2pzL2ZldGNoLXNoZWV0LmpzXG4vLyBtb2R1bGUgaWQgPSA3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qIGZvciBmaWx0ZXJpbmcgdGVybXMgd2l0aCByZWd1bGFyIGV4cHJlc3Npb25zICovXG4gICAgXG5jb25zdCBMQU5HX1RFUk1TID0ge1xuICAgIEF3azogICAgICAgICAgICBbJ2F3ayddLFxuICAgIEJhc2g6ICAgICAgICAgICBbJ2Jhc2gnXSxcbiAgICAnQyAqJzogICAgICAgICAgWydjJ10sXG4gICAgJ0MjJzogICAgICAgICAgIFsnYyMnLCAnY3NoYXJwJywgJ2Mgc2hhcnAnXSxcbiAgICAnQysrJzogICAgICAgICAgWydjKysnXSxcbiAgICBDbG9qdXJlOiAgICAgICAgWydjbG9qdXJlJ10sXG4gICAgQ09CT0w6ICAgICAgICAgIFsnY29ib2wnXSxcbiAgICBFcmxhbmc6ICAgICAgICAgWydlcmxhbmcnXSxcbiAgICAnR28gKic6ICAgICAgICAgWydnbycsICdnb2xhbmcnXSxcbiAgICBIYXNrZWxsOiAgICAgICAgWydoYXNrZWxsJ10sXG4gICAgSmF2YTogICAgICAgICAgIFsnamF2YSddLFxuICAgIEphdmFTY3JpcHQ6ICAgICBbJ2phdmFzY3JpcHQnLCAnamF2YSBzY3JpcHQnLCAnanMnXSxcbiAgICBMaXNwOiAgICAgICAgICAgWydsaXNwJ10sXG4gICAgJ09iamVjdGl2ZS1DJzogIFsnb2JqZWN0aXZlLWMnLCAnb2JqZWN0aXZlIGMnXSxcbiAgICBQYXNjYWw6ICAgICAgICAgWydwYXNjYWwnXSxcbiAgICBQZXJsOiAgICAgICAgICAgWydwZXJsJ10sXG4gICAgUEhQOiAgICAgICAgICAgIFsncGhwJ10sXG4gICAgUG93ZXJzaGVsbDogICAgIFsncG93ZXJzaGVsbCcsICdwb3dlciBzaGVsbCddLFxuICAgIFB5dGhvbjogICAgICAgICBbJ3B5dGhvbiddLFxuICAgIFJ1Ynk6ICAgICAgICAgICBbJ3J1YnknXSxcbiAgICBSdXN0OiAgICAgICAgICAgWydydXN0J10sXG4gICAgU2NhbGE6ICAgICAgICAgIFsnc2NhbGEnXSxcbiAgICBTY2hlbWU6ICAgICAgICAgWydzY2hlbWUnXSxcbiAgICBTUUw6ICAgICAgICAgICAgWydzcWwnXSxcbiAgICAnU3dpZnQgKic6ICAgICAgWydzd2lmdCddLFxuICAgICdWaXN1YWwgQmFzaWMnOiBbJ3Zpc3VhbCBiYXNpYycsICd2aXN1YWxiYXNpYycsICd2YicsICd2YmEnXSxcbn07XG4vKiBmb3Igc3RvcmluZyBJRHM6IHsgbGFuZzogWy4uLklkXSB9ICovXG5jb25zdCBURVJNUyA9IE9iamVjdC5rZXlzKExBTkdfVEVSTVMpO1xuXG4vKiBBcnJheSAtPiBSZWdFeHBcbiAgICBidWlsZHMgYSBSZWdFeHAgZnJvbSBhbiBhcnJheSBvZiBwaHJhc2VzIHRvIGFsbG93IGZvciBtdWx0aXBsZSBjYXNlc1xuICAgIHN1Y2ggYXMgJ2MjJyBvciAnYyBzaGFycCcsICdqYXZhc2NyaXB0JyBvciAnanMnICAqL1xuZnVuY3Rpb24gY3JlYXRlUlgocGhyYXNlcyl7XG4gICAgLy8gY3JlYXRlcyBhIFJlZ0V4cCBwYXR0ZXJuIGZyb20gYSBzdHJpbmdcbiAgICBjb25zdCByeCA9IGAke3BocmFzZXMucmVkdWNlKChiYXNlLCBwaHJhc2UsIGkpID0+IHtcbiAgICAgICAgLy8gY2hlY2sgcGhyYXNlIGZvciBzcGFjZXMgJiAnKydcbiAgICAgICAgaWYocGhyYXNlID09PSAnYysrJyl7XG4gICAgICAgICAgICBwaHJhc2UgPSAnY1xcXFwrXFxcXCsnO1xuICAgICAgICB9IGVsc2UgaWYocGhyYXNlLmluZGV4T2YoJyAnKSA+IC0xKXtcbiAgICAgICAgICAgIHBocmFzZSA9IHBocmFzZS5zcGxpdCgnICcpLmpvaW4oJ1xcXFxzJyk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gcGF0dGVybnMgbWF0Y2ggYSBnaXZlbiBwaHJhc2Ugc3Vycm91bmRlZCBieSBub24gbGV0dGVyIGNoYXJhY3RlcnNcbiAgICAgICAgLy8gc28gJ3NjaGVtZScgd2lsbCBwYXNzIGJ1dCBub3QgJ3NjaGVtZXInXG4gICAgICAgIGlmKHBocmFzZSA9PT0gJ3NxbCcpe1xuICAgICAgICAgICAgcmV0dXJuIHBocmFzZTtcbiAgICAgICAgLy8gbmVlZCBjYXNlIGZvciAnYycsIGNhbid0IGJlIGZvbGxvd2VkIGJ5ICcrJ1xuICAgICAgICB9IGVsc2UgaWYocGhyYXNlID09PSAnYycpe1xuICAgICAgICAgICAgcmV0dXJuIGAoXnxbXkEtWmEtel0pJHtwaHJhc2V9KCR8W15BLVphLXpcXFxcK10pYDtcbiAgICAgICAgXG4gICAgICAgIH0gZWxzZSBpZihpID09PSAwKXtcbiAgICAgICAgICAgIC8vIG1hdGNoZXMgcGhyYXNlIGlmIG5vdCBib3JkZXJlZCBieSBvdGhlciBsZXR0ZXJzXG4gICAgICAgICAgICAvLyBzcWwscGhwLGpzIHdpbGwgbWF0Y2gsIGJ1dCBub3Qgc3FscGhwanNcbiAgICAgICAgICAgIHJldHVybiBiYXNlICsgYChefFteQS1aYS16XSkke3BocmFzZX0oJHxbXkEtWmEtel0pYDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBiYXNlICsgYHwoXnxbXkEtWmEtel0pJHtwaHJhc2V9KCR8W15BLVphLXpdKWA7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgfSwgJycpfWA7XG4gICAgXG4gICAgcmV0dXJuIG5ldyBSZWdFeHAocngsICdpJyk7XG59XG5cblxuLyogU3RyaW5nIC0+IEFycmF5LW9mLVN0cmluZyAqL1xuZnVuY3Rpb24gcHJlc2VudFRlcm1zKHR4dCl7XG4gICAgcmV0dXJuIFJYUy5yZWR1Y2UoKGFjYywgdGVybSkgPT4ge1xuICAgICAgICByZXR1cm4gdGVybS5yeC50ZXN0KHR4dCkgP1xuICAgICAgICAgICAgYWNjLmNvbmNhdCh0ZXJtLmxhbmcpIDpcbiAgICAgICAgICAgIGFjYztcbiAgICB9LCBbXSk7XG59XG5cblxuZnVuY3Rpb24gcHJlc2VudFRlcm1zMih0eHQsIGlkKXtcbiAgICBjb25zdCB0ZXN0ZWQgPSBSWFMucmVkdWNlKChhY2MsIHRlcm0pID0+IHtcbiAgICAgICAgcmV0dXJuIHRlcm0ucngudGVzdCh0eHQpID9cbiAgICAgICAgICAgIGFjYy5jb25jYXQodGVybS5sYW5nKSA6XG4gICAgICAgICAgICBhY2M7XG4gICAgfSwgW10pO1xuICAgIFxuICAgIGNvbnN0IHJlc3VsdHMgPSB0ZXN0ZWQucmVkdWNlKChhY2MsIHQpID0+IHtcbiAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oYWNjLCB7IFt0XTogaWQgfSk7XG4gICAgfSwge30pO1xuICAgIFxuICAgIHJldHVybiByZXN1bHRzO1xufVxuXG5cbmNvbnN0IFJYUyA9ICgodGVybXNPYmopID0+IHtcbiAgICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXModGVybXNPYmopO1xuICAgIFxuICAgIHJldHVybiBrZXlzLm1hcChrID0+IHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGxhbmc6IGssXG4gICAgICAgICAgICByeDogY3JlYXRlUlgodGVybXNPYmpba10pXG4gICAgICAgIH07XG4gICAgfSk7XG59KShMQU5HX1RFUk1TKTtcblxuXG5leHBvcnQge1xuICAgIHByZXNlbnRUZXJtcyxcbiAgICBwcmVzZW50VGVybXMyLFxuICAgIFRFUk1TXG59O1xuXG5cblxuLy9AVEVTVFxuKCgpID0+IHtcbiAgICBjb25zdCB0ZXN0cyA9IFtcbiAgICAgICAgeyBcbiAgICAgICAgICAgIGFjdHVhbDogcHJlc2VudFRlcm1zKCd0aGlzIGNvbnRhaW5zIGphdmEnKS5sZW5ndGgsXG4gICAgICAgICAgICBleHBlY3RlZDogMVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBhY3R1YWw6IHByZXNlbnRUZXJtcygndGhpcyBjb250YWlucyBqYXZhcycpLmxlbmd0aCxcbiAgICAgICAgICAgIGV4cGVjdGVkOiAwXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGFjdHVhbDogcHJlc2VudFRlcm1zKCdwaHAgYW5kIGVsZXBocGFudCcpLmxlbmd0aCxcbiAgICAgICAgICAgIGV4cGVjdGVkOiAxXG4gICAgICAgIH0sXG4gICAgICAgIHsgXG4gICAgICAgICAgICBhY3R1YWw6IHByZXNlbnRUZXJtcygnc2NoZW1lcnMgd2l0aCBhIGxpc3AnKS5sZW5ndGgsXG4gICAgICAgICAgICBleHBlY3RlZDogMVxuICAgICAgICB9LFxuICAgICAgICB7IFxuICAgICAgICAgICAgYWN0dWFsOiBwcmVzZW50VGVybXMoJ2NvbnRhaW5zIHZiL3NxbC9qcy9jKysnKS5sZW5ndGgsXG4gICAgICAgICAgICBleHBlY3RlZDogNFxuICAgICAgICB9XG4gICAgXTtcbiAgICBcbiAgICBsZXQgdG90YWwgPSB0ZXN0cy5sZW5ndGg7XG4gICAgbGV0IHBhc3NlZCA9IDA7XG4gICAgXG4gICAgY29uc29sZS5sb2coJy0tLS0gTU9EVUxFIFRFU1Q6IFdvcmRzIC0tLS0nKTtcbiAgICBcbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgdG90YWw7IGkrKyl7XG4gICAgICAgIGlmKHRlc3RzW2ldLmFjdHVhbCA9PT0gdGVzdHNbaV0uZXhwZWN0ZWQpe1xuICAgICAgICAgICAgcGFzc2VkICs9IDE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnLS0tLSAjJyArIGkgKyAnIC0tLS0nKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGAgIGFjdHVhbDogJHt0ZXN0c1tpXS5hY3R1YWx9YCk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgZXhwZWN0ZWQ6ICR7dGVzdHNbaV0uZXhwZWN0ZWR9YCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgY29uc29sZS5sb2coYCR7cGFzc2VkfSBvdXQgb2YgJHt0b3RhbH0gdGVzdHMgcGFzc2VkYCk7XG4gICAgY29uc29sZS5sb2coJy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0nKTtcbn0pKCk7XG5cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2pzL3dvcmRzLXBsYXkuanNcbi8vIG1vZHVsZSBpZCA9IDhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXG5mdW5jdGlvbiBSZXN1bHRzVGFibGUocmVzdWx0cywgdG90YWxOdW0sIGRhdGUpe1xuICAgIHZhciBzb3J0ZWQgPSByZXN1bHRzLnNsaWNlKDApLnNvcnQoKGEsIGIpID0+IGFbMV0gPCBiWzFdKTtcbiAgICBcbiAgICByZXR1cm4gYFxuICAgIDxkaXYgY2xhc3M9XCJ0YWJsZVwiPlxuICAgICAgICA8dGFibGUgY2xhc3M9XCJ0YWJsZVwiPlxuICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgIDx0aCBjb2xzcGFuPVwiM1wiPlJlZmVyZW5jZXMgZnJvbSAke3RvdGFsTnVtfSBwb3N0aW5nczwvdGg+XG4gICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgIDx0aCBjb2xzcGFuPVwiM1wiPkNvbGxlY3RlZCBvbiAke2RhdGV9PC90aD5cbiAgICAgICAgICAgIDwvdHI+XG4gICAgICAgIFxuICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgIDx0aD5SYW5rPC90aD5cbiAgICAgICAgICAgICAgICA8dGg+TGFuZ3VhZ2U8L3RoPlxuICAgICAgICAgICAgICAgIDx0aD5SZWZlcmVuY2VzPC90aD5cbiAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICBcbiAgICAgICAgICAgICR7c29ydGVkLnJlZHVjZSgoYWNjLCByZXN1bHQsIGkpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYWNjICsgYFxuICAgICAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dGggc2NvcGU9XCJyb3dcIj4ke2krMX08L3RoPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRkPiR7cmVzdWx0WzBdfTwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dGQ+JHtyZXN1bHRbMV19PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgPC90cj5gO1xuICAgICAgICAgICAgfSwgYGApfVxuICAgICAgICA8L3RhYmxlPlxuICAgIDwvZGl2PmA7XG59XG5cblxuZnVuY3Rpb24gTm9SZWZzTGlzdChub1JlZnMpe1xuICAgIHJldHVybiBub1JlZnMucmVkdWNlKChhY2MsIHJlZikgPT4ge1xuICAgICAgICByZXR1cm4gYWNjICsgYDxsaT4ke3JlZn08L2xpPmA7XG4gICAgfSwgYGApO1xufVxuICAgIFxuICAgIFxuZXhwb3J0IHsgUmVzdWx0c1RhYmxlLCBOb1JlZnNMaXN0IH07XG5cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2pzL2NvbXBvbmVudHMuanNcbi8vIG1vZHVsZSBpZCA9IDlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHsgaW50ZXJzZWN0IH0gZnJvbSAnLi9jYWxjdWxhdGlvbnMnO1xuXG4vKiBjcmVhdGVzIG5vZGVzIGZvciBkMyBncmFwaCAqL1xuZnVuY3Rpb24gY3JlYXRlTm9kZXMocmVzdWx0cyl7XG4gIGNvbnN0IHRlcm1zID0gT2JqZWN0LmtleXMocmVzdWx0cyk7XG4gIFxuICByZXR1cm4gdGVybXMubWFwKHRlcm0gPT4ge1xuICAgIHJldHVybiB7IHRlcm06IHRlcm0sIHNpemU6IHJlc3VsdHNbdGVybV0ubGVuZ3RoIH07XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVMaW5rcyhyZXN1bHRzKXtcbiAgY29uc3QgdGVybXMgPSBPYmplY3Qua2V5cyhyZXN1bHRzKTtcbiAgY29uc3QgbGVuID0gdGVybXMubGVuZ3RoO1xuICAvLyBlbmZvcmNlIHRoaXMgb3JkZXJcbiAgLy8gMCAtPiA5IC0+IGEgPiB6XG4gIGNvbnN0IGJ5SW5jciA9IChhLCBiKSA9PiBhID4gYjtcbiAgbGV0IGxpbmtzID0gW107XG4gIFxuICBmb3IobGV0IGkgPSAwOyBpIDwgbGVuOyBpKyspe1xuICAgIGNvbnN0IHNvdXJjZSA9IHRlcm1zW2ldO1xuICAgIGNvbnN0IHNvdXJjZUlkcyA9IHJlc3VsdHNbc291cmNlXTtcbiAgICBzb3VyY2VJZHMuc29ydChieUluY3IpO1xuICAgIFxuICAgIGZvcihsZXQgaiA9IDA7IGogPCBsZW47IGorKyl7XG4gICAgICBjb25zdCB0YXJnZXQgPSB0ZXJtc1tqXTtcbiAgICAgIGNvbnN0IHRhcmdldElkcyA9IHJlc3VsdHNbdGFyZ2V0XTtcbiAgICAgIHRhcmdldElkcy5zb3J0KGJ5SW5jcik7XG4gICAgICBjb25zdCBzaGFyZWQgPSBpbnRlcnNlY3Qoc291cmNlSWRzLCB0YXJnZXRJZHMpLmxlbmd0aDtcbiAgICBcbiAgICAgIC8vIHVudGlsIFwiQ1wiIHJlZ2V4cCBpcyBtb3JlIGFjY3VyYXRlXG4gICAgICBjb25zdCBjX3Rlc3QgPSBzb3VyY2UgPT09ICdDIConIHx8IHRhcmdldCA9PT0gJ0MgKicgPyBmYWxzZSA6IHRydWU7XG4gICAgXG4gICAgICBpZih0YXJnZXQgIT09IHNvdXJjZSAmJiBzaGFyZWQgPiAwICYmIGNfdGVzdCl7XG4gICAgICAgIGxpbmtzLnB1c2goeyB0YXJnZXQsIHNvdXJjZSwgc2hhcmVkIH0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBcbiAgcmV0dXJuIGxpbmtzO1xufVxuXG4vL0BURVNUXG4oKCkgPT4ge1xuICAgIGNvbnN0IHQwID0ge1xuICAgICAgICBTY2FsYTogWyBcImQ5OTZlY2IxMDdkOTVmNWVcIiBdLFxuICAgICAgICBQeXRob246IFtcIjFhOGRiODc5NGQwOWE0NzlcIiwgXCIyMjI2NGUwMjUzYTkzNTFiXCIsIFwiMjk3M2JiYWEzOGI1OTFiZFwiLCBcIjJkODY1Njk1ZDgyYWUzMjRcIiwgXCI0YWQ2NzRkMDU0ZjRiYmYxXCIsIFwiNTdiNDRhM2VmYjhmMTQwZlwiLCBcIjc2YWQ0NjczZjg3MzQxMmVcIiwgXCI3YWFlN2UyNDRmMzU5NzQ0XCIsIFwiOTFhN2YzZjlmNTAwZmQxOVwiLCBcIjlkOTM3Y2M3OTBhYWJjMzlcIl0sXG4gICAgICAgIEphdmE6IFtcIjA0ZDRhNzc0ZmUyYmQ2OTNcIiwgXCIwNjA1NjRlY2JhMmU3MWUyXCIsIFwiMDY5NmYzYzFkYjRlYTJiN1wiXSxcbiAgICAgICAgJ0dvIConOiBbXCIwNGQ0YTc3NGZlMmJkNjkzXCIsIFwiMTgzZjQ4MDNiN2JhOGY1MVwiLCBcIjJlMDU2Nzg2MzFmNTFjZjRcIl0sXG4gICAgICAgIFdoYXRMYW5nOiBbXCIxYThkYjg3OTRkMDlhNDc5XCIsIFwiNzZhZDQ2NzNmODczNDEyZVwiLCBcIjdhYWU3ZTI0NGYzNTk3NDRcIl1cbiAgICB9O1xuICAgIFxuICAgIGNvbnN0IHRlc3RzID0gW1xuICAgICAgICBpbnRlcnNlY3QodDAuU2NhbGEsIHQwLlB5dGhvbikubGVuZ3RoID09PSAwLFxuICAgICAgICBpbnRlcnNlY3QodDAuSmF2YSwgdDBbJ0dvIConXSkubGVuZ3RoID09PSAxLFxuICAgICAgICBpbnRlcnNlY3QodDAuV2hhdExhbmcsIHQwLlB5dGhvbikubGVuZ3RoID09PSAzXG4gICAgXTtcbiAgICBcbiAgICBsZXQgdG90YWwgPSB0ZXN0cy5sZW5ndGg7XG4gICAgbGV0IHBhc3NlZCA9IDA7XG4gICAgXG4gICAgY29uc29sZS5sb2coJy0tLS0gTU9EVUxFIFRFU1Q6IEdyYXBoIC0tLS0nKTtcbiAgICBcbiAgICB0ZXN0cy5mb3JFYWNoKCh0LCBpKSA9PiB7XG4gICAgICAgIGNvbnNvbGUuYXNzZXJ0KHQsIGB0ZXN0c1ske2l9XWApO1xuICAgICAgICBcbiAgICAgICAgaWYodCl7XG4gICAgICAgICAgICBwYXNzZWQgKz0gMTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIFxuICAgIGNvbnNvbGUubG9nKGAke3Bhc3NlZH0gb3V0IG9mICR7dG90YWx9IHRlc3RzIHBhc3NlZGApO1xuICAgIGNvbnNvbGUubG9nKCctLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tJyk7XG59KSgpO1xuXG5cbmZ1bmN0aW9uIEdyYXBoKG5vZGVzLCBsaW5rcywgZ3JhcGgsIHNpemUpe1xuICBjb25zdCBXID0gc2l6ZTtcbiAgY29uc3QgSCA9IFc7XG5cbiAgY29uc3Qgdml6ID0gZDMuc2VsZWN0KGdyYXBoKVxuICAgIC5hcHBlbmQoJ3N2ZycpXG4gICAgLmF0dHIoJ3dpZHRoJywgVylcbiAgICAuYXR0cignaGVpZ2h0JywgSCk7XG5cbiAgY29uc3Qgc2ltdWxhdGlvbiA9IGQzLmZvcmNlU2ltdWxhdGlvbigpXG4gICAgLm5vZGVzKG5vZGVzKTtcblxuICBzaW11bGF0aW9uXG4gICAgLmZvcmNlKCdjaGFyZ2VfZm9yY2UnLCBkMy5mb3JjZU1hbnlCb2R5KClcbiAgICAgICAgLnN0cmVuZ3RoKC0gKHNpemUpKVxuICAgICAgICAuZGlzdGFuY2VNaW4oNTApXG4gICAgICAgIC5kaXN0YW5jZU1heChzaXplIC8gMikpXG4gICAgLmZvcmNlKCdjZW50ZXJfZm9yY2UnLCBkMy5mb3JjZUNlbnRlcihXIC8gMiwgSCAvIDIpKTtcbiAgICBcbiAgICBjb25zdCBwb3B1cCA9IGQzLnNlbGVjdCgnYm9keScpLmFwcGVuZCgnZGl2JylcbiAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ3BvcHVwJylcbiAgICAgICAgLnN0eWxlKCdvcGFjaXR5JywgMCk7ICAgXG5cbiAgY29uc3Qgbm9kZSA9IHZpei5hcHBlbmQoXCJnXCIpXG4gICAgLmF0dHIoXCJjbGFzc1wiLCBcIm5vZGVzXCIpXG4gICAgLnNlbGVjdEFsbChcImNpcmNsZVwiKVxuICAgIC5kYXRhKG5vZGVzKVxuICAgIC5lbnRlcigpXG4gICAgLmFwcGVuZChcImNpcmNsZVwiKVxuICAgIC5hdHRyKFwiclwiLCAxMilcbiAgICAuYXR0cihcImZpbGxcIiwgXCJyZWRcIik7XG4gXG5cbiAgZnVuY3Rpb24gdGlja0FjdGlvbnMoKSB7XG4gICAgLy91cGRhdGUgY2lyY2xlIHBvc2l0aW9ucyB0byByZWZsZWN0IG5vZGUgdXBkYXRlcyBvbiBlYWNoIHRpY2sgb2YgdGhlIHNpbXVsYXRpb24gXG4gICAgbm9kZVxuICAgICAgLmF0dHIoXCJjeFwiLCBmdW5jdGlvbihkKSB7IHJldHVybiBkLng7IH0pXG4gICAgICAuYXR0cihcImN5XCIsIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGQueTsgfSk7XG5cbiAgICBsaW5rXG4gICAgICAuYXR0cihcIngxXCIsIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGQuc291cmNlLng7IH0pXG4gICAgICAuYXR0cihcInkxXCIsIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGQuc291cmNlLnk7IH0pXG4gICAgICAuYXR0cihcIngyXCIsIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGQudGFyZ2V0Lng7IH0pXG4gICAgICAuYXR0cihcInkyXCIsIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGQudGFyZ2V0Lnk7IH0pO1xuICB9XG5cblxuICBjb25zdCBsaW5rX2ZvcmNlID0gIGQzLmZvcmNlTGluayhsaW5rcylcbiAgICAuaWQoZnVuY3Rpb24oZCkgeyByZXR1cm4gZC50ZXJtOyB9KTtcblxuXG4gIHNpbXVsYXRpb24ub24oJ3RpY2snLCB0aWNrQWN0aW9ucyk7XG4gIHNpbXVsYXRpb24uZm9yY2UoXCJsaW5rc1wiLGxpbmtfZm9yY2UpO1xuXG4gIGNvbnN0IGxpbmsgPSB2aXouYXBwZW5kKFwiZ1wiKVxuICAgIC5hdHRyKFwiY2xhc3NcIiwgXCJsaW5rc1wiKVxuICAgIC5zZWxlY3RBbGwoXCJsaW5lXCIpXG4gICAgLmRhdGEobGlua3MpXG4gICAgLmVudGVyKCkuYXBwZW5kKFwibGluZVwiKVxuICAgIC5hdHRyKFwic3Ryb2tlLXdpZHRoXCIsIDMpXG4gICAgLnN0eWxlKCdzdHJva2UnLCBsaW5rQ29sb3IpO1xuICAgICAgICBcbiAgICBQb3B1cChncmFwaCwgcG9wdXAsIG5vZGUsIGQgPT4gYDxwPiR7ZC50ZXJtfTwvcD5gKTtcbiAgICBQb3B1cChncmFwaCwgcG9wdXAsIGxpbmssIGQgPT4gYDxwPiR7ZC5zb3VyY2UudGVybX0gJiAke2QudGFyZ2V0LnRlcm19IDogPHN0cm9uZz4ke2Quc2hhcmVkfTwvc3Ryb25nPjwvcD5gKTtcbn1cblxuXG4vKiBEM1BvcHVwLCBEM0VsZW1lbnQsIFtPYmplY3QgLT4gU3RyaW5nXSAtPiBWb2lkICovXG5mdW5jdGlvbiBQb3B1cCgkRWxlbSwgcG9wdXBFbGVtLCBkM0VsZW0sIGh0bWwpe1xuICAgIGNvbnN0ICRwb3NuID0gb2Zmc2V0KCRFbGVtKTtcbiAgXG4gICAgZDNFbGVtLm9uKCdtb3VzZW92ZXInLCAoZCkgPT4ge1xuICAgICAgICBwb3B1cEVsZW0udHJhbnNpdGlvbigpXG4gICAgICAgICAgICAuZHVyYXRpb24oMjAwKVxuICAgICAgICAgICAgLnN0eWxlKCdvcGFjaXR5JywgMC45KVxuICAgICAgICBwb3B1cEVsZW0uaHRtbChodG1sKGQpKVxuICAgICAgICAgICAgLnN0eWxlKCdsZWZ0JywgYCR7JHBvc24ubGVmdH1weGApXG4gICAgICAgICAgICAuc3R5bGUoJ3RvcCcsIGAkeyRwb3NuLnRvcH1weGApXG4gICAgfSlcbiAgICAub24oJ21vdXNlb3V0JywgZCA9PiB7XG4gICAgICAgIHBvcHVwRWxlbS50cmFuc2l0aW9uKClcbiAgICAgICAgICAgIC5kdXJhdGlvbig1MDApXG4gICAgICAgICAgICAuc3R5bGUoJ29wYWNpdHknLCAwKVxuICAgIH0pO1xufVxuXG5cbi8qIGdldHMgcG9zaXRpb24gb2YgdG9wLWxlZnQgY29ybmVyIG9mIGEgRE9NIGVsZW1lbnQgKi9cbmZ1bmN0aW9uIG9mZnNldChlbCkge1xuICAgIGNvbnN0IHJlY3QgPSBlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICBjb25zdCBzY3JvbGxMZWZ0ID0gd2luZG93LnBhZ2VYT2Zmc2V0IHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxMZWZ0O1xuICAgIGNvbnN0IHNjcm9sbFRvcCA9IHdpbmRvdy5wYWdlWU9mZnNldCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wO1xuICAgIFxuICAgIHJldHVybiB7IHRvcDogcmVjdC50b3AgKyBzY3JvbGxUb3AsIGxlZnQ6IHJlY3QubGVmdCArIHNjcm9sbExlZnQgfVxufVxuXG5mdW5jdGlvbiBsaW5rQ29sb3IoZCl7XG4gICAgY29uc3QgbiA9IGQuc2hhcmVkO1xuXG4gICAgcmV0dXJuIChcbiAgICAgICAgbiA8IDIgPyAnIzU1NScgOlxuICAgICAgICBuIDwgMyA/ICcjNTY4JyA6XG4gICAgICAgIG4gPCA1ID8gJyM1OGEnIDpcbiAgICAgICAgbiA8IDkgPyAnIzVhZCcgOiBcbiAgICAgICAgbiA8IDE0ID8gJyM1Y2YnIDpcbiAgICAgICAgbiA8IDIwID8gJyM1ZmYnIDpcbiAgICAgICAgbiA8IDI3ID8gJyMyZmYnIDpcbiAgICAgICAgbiA8IDM1ID8gJyMwZmYnIDogJyMwMGYnXG4gICAgKTtcbn1cblxuXG5leHBvcnQge1xuICAgIGNyZWF0ZU5vZGVzLFxuICAgIGNyZWF0ZUxpbmtzLFxuICAgIEdyYXBoXG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9qcy9ncmFwaC5qc1xuLy8gbW9kdWxlIGlkID0gMTBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sInNvdXJjZVJvb3QiOiIifQ==