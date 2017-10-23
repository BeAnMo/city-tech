var Jobs=webpackJsonpJobs([1],{174:function(e,t,n){"use strict";function r(e){const t=e.getFullYear(),n=e.getMonth()+1,r=e.getDate(),s=e=>e<10?"0"+e:e;return`${t}-${s(n)}-${s(r)}`}function s(e){return e.feed.entry.map(e=>({id:e.gsx$id.$t,summary:e.gsx$summary.$t}))}function a(e,t){return t in this?e:e.concat(t)}function o(e,t){return e.innerHTML=t}Object.defineProperty(t,"__esModule",{value:!0});var i=n(90),c=n(179),l=n(477),u=n(478);const f="1dtZyUAobcWC6yYbdsR1_Oww29XCbEUMABVD20w4gIpI",d=`https://spreadsheets.google.com/feeds/list/${f}/2/public/full?alt=json`,h=(`https://spreadsheets.google.com/feeds/list/${f}/3/public/full?alt=json`,Object(i.b)(u.a,u.b)),p={response:{},set ajax(e){return Object.assign(this.response,e)},get data(){return s(this.response)},table:document.getElementById("resultsTable"),graph:document.getElementById("resultsGraph"),noRefsList:document.getElementById("noRefsList"),graphSize:function(e){return e<730?300:730<e<1e3?450:600}(document.documentElement.clientWidth),allTermStrings:u.c.slice(0),get postedDate(){const e=this.response.feed.updated.$t;return r(e?new Date(e):new Date)},get totalSummaries(){return this.data.length},get presentTerms(){return this.data.map(e=>Object(i.e)(e.summary,e.id,h))},get termsIndex(){return Object(i.a)(this.presentTerms)},get eachIndexLength(){return Object.keys(this.termsIndex).map(e=>[e,this.termsIndex[e].length])},get allWithNoRefs(){return this.allTermStrings.reduce(a.bind(this.termsIndex),[])},get graphNodes(){return Object(c.e)(this.termsIndex)},get graphLinks(){return Object(c.d)(this.termsIndex)},debug:{}};t.App=p,Object(l.a)(d).then(e=>{p.ajax=e,p.graph.innerHTML="",o(resultsTable,Object(c.c)(p.eachIndexLength,p.totalSummaries,p.postedDate)),Object(c.a)(p.graphNodes,p.graphLinks,p.graph,p.graphSize),o(noRefsList,Object(c.b)(p.allWithNoRefs))}).catch(console.log)},175:function(e,t,n){"use strict";function r(e,t){let n=[],r=e,s=t;for(;0!==r.length&&0!==s.length;)r[0]===s[0]?(n.push(r[0]),r=r.slice(1),s=s.slice(1)):r[0]<s[0]?r=r.slice(1):s=s.slice(1);return n}t.a=r},176:function(e,t,n){"use strict";function r(e,t){const n=Object.keys(t),r=n.length;let s={};for(let a=0;a<r;a++){const r=n[a],o=t[r];e[r]?Object.assign(s,{[r]:[...e[r],o]}):Object.assign(s,{[r]:[o]})}return Object.assign(e,s)}t.a=function(e){return e.reduce(r,{})},(()=>{const e={a:[3,5],c:[1,2]},t={a:1,b:2,c:3},n=r;console.assert(3===n({},t).c[0],"stringValuesToArray: 3"),console.assert(3===n(e,t).c[2],"stringValuesToArray: 3"),console.assert(void 0===n({},t).d,"stringValuesToArray: 3"),console.assert(2===n(e,t).b[0],"stringValuesToArray: 3")})()},177:function(e,t,n){"use strict";function r(e,t,...n){return e.reduce((e,r)=>{const a=s(r,t,...n);n[n.length-1];return a?e.concat(a):e},[])}function s(e,t,...n){const r=n.length;let s={};for(let o=0;o<r;o++){const r=a(e,n[o]),i=Object.keys(r)[0];t?Object.assign(s,{[t[o]]:r[i]}):i in s?Object.assign(s,{[i+"+"+o]:r[i]}):Object.assign(s,r)}return s}function a(e,t,n=""){return 0===t.length?{[n]:e}:a(e[t[0]],t.slice(1),t[0])}t.a=r,(()=>{const e=[{a:1,b:2,c:{a1:"weef",b1:{c1:"hello"}}},{a:3,b:4,c:{a1:"wiif",b1:"yyf"}},{a:5,c:{a1:"wyyf",b1:"eef"}}],t=["a"],n=["c","a1"],o=["c","b1","c1"],i=a(e[0],t),c=a(e[0],n),l=a(e[0],o);console.assert(1===i.a,"recurPath: !== 1"),console.assert("weef"===c.a1,"recurPath: !== weef"),console.assert("hello"===l.c1,"recurPath: 1 === 1");const u=s(e[0],!1,t),f=s(e[0],!1,t,n),d=s(e[0],!1,t,n,o),h=s(e[0],!1,n,n),p=s(e[0],["g","h"],n,n);console.assert(1===u.a,"extractFromPaths: !== 1"),console.assert("weef"===f.a1,"extractFromPaths: !== weef"),console.assert("hello"===d.c1,"extractFromPaths: !== hello"),console.assert("weef"===h["a1+1"],"extractFromPaths: !== weef"),console.assert("weef"===p.h,"extractFromPaths: !== weef");const g=r(e,!1,t),m=r(e,!1,t,n),b=r(e,!1,t,n,o),y=r(e,["g","h"],n,n);console.assert(5===g[2].a,"extractPaths: !== 5"),console.assert("wiif"===m[1].a1,"extractPaths: !== wiif"),console.assert("hello"===b[0].c1,"extractPaths: !== hello"),console.assert(void 0===b[2].c1,"extractPaths: !== undefined"),console.assert("weef"===y[0].g,"extractPaths: !== wiif"),console.assert("wyyf"===y[2].g,"extractPaths: !== wyyf")})()},178:function(e,t,n){"use strict";function r(e,t){return Object.keys(e).map(n=>({lang:n,rx:s(e[n],t)}))}function s(e,t){return e[0]in t?t[e[0]]:new RegExp(Object(o.a)(e),"i")}function a(e,t){return i.reduce((t,n)=>n.rx.test(e)?t.concat(n.lang):t,[])}t.a=r,t.b=function(e,t,n){return a(e,n).reduce((e,n)=>Object.assign(e,{[n]:t}),{})};var o=n(91);const i=r({Awk:["awk"],Bash:["bash"],"C *":["c"],"C#":["c#","csharp","c sharp"],"C++":["c++"],Clojure:["clojure"],COBOL:["cobol"],Erlang:["erlang"],"Go *":["go","golang"],Haskell:["haskell"],Java:["java"],JavaScript:["javascript","java script","js"],Lisp:["lisp"],"Objective-C":["objective-c","objective c"],Pascal:["pascal"],Perl:["perl"],PHP:["php"],Powershell:["powershell","power shell"],Python:["python"],Ruby:["ruby"],Rust:["rust"],Scala:["scala"],Scheme:["scheme"],SQL:["sql"],"Swift *":["swift"],"Visual Basic":["visual basic","visualbasic","vb","vba"]},{sql:/sql/i,"c++":/c\+\+/i,c:/(^|[^A-Za-z])c($|[^A-Za-z\+])/i});(()=>{const e=[{actual:a("this contains java",i).length,expected:1},{actual:a("this contains javas",i).length,expected:0},{actual:a("php and elephpant",i).length,expected:1},{actual:a("schemers with a lisp",i).length,expected:1},{actual:a("contains vb/sql/js/c++",i).length,expected:4}];let t=e.length,n=0;console.log("---- MODULE TEST: Words ----");for(let r=0;r<t;r++)e[r].actual===e[r].expected?n+=1:(console.log("---- #"+r+" ----"),console.log(`  actual: ${e[r].actual}`),console.log(`expected: ${e[r].expected}`));console.log(`${n} out of ${t} tests passed`),console.log("----------------------------")})()},179:function(e,t,n){"use strict";var r=n(180),s=n(186);n.d(t,"c",function(){return r.b}),n.d(t,"b",function(){return r.a}),n.d(t,"a",function(){return s.a}),n.d(t,"d",function(){return s.b}),n.d(t,"e",function(){return s.c})},180:function(e,t,n){"use strict";function r(e,t,n){return`\n    <div class="table">\n        <table class="table">\n            <tr>\n                <th colspan="3">References from ${t} postings</th>\n            </tr>\n            <tr>\n                <th colspan="3">Collected on ${n}</th>\n            </tr>\n        \n            <tr>\n                <th>Rank</th>\n                <th>Language</th>\n                <th>References</th>\n            </tr>\n            \n            ${e.slice(0).sort((e,t)=>t[1]-e[1]).reduce((e,t,n)=>e+`\n                    <tr>\n                        <th scope="row">${n+1}</th>\n                        <td>${t[0]}</td>\n                        <td>${t[1]}</td>\n                    </tr>`,``)}\n        </table>\n    </div>`}function s(e){return e.reduce((e,t)=>e+`<li>${t}</li>`,``)}n.d(t,"b",function(){return r}),n.d(t,"a",function(){return s});var a=n(181);n.n(a)},181:function(e,t,n){var r=n(182);"string"==typeof r&&(r=[[e.i,r,""]]);var s={hmr:!0};s.transform=void 0;n(184)(r,s);r.locals&&(e.exports=r.locals)},182:function(e,t,n){(t=e.exports=n(183)(void 0)).push([e.i,"@import url(https://fonts.googleapis.com/css?family=Fira+Sans:400,700);",""]),t.push([e.i,"@import url(https://fonts.googleapis.com/css?family=Merriweather:400,700);",""]),t.push([e.i,"h1,h2,h3,h4,h5,h6 {\n  font-family: 'Fira Sans', sans-serif;\n  letter-spacing: 0.2rem;\n  margin: 0 1rem 0 1rem;\n}\n\nhr {\n  width: 50%;\n  border: 1px solid #ccc;\n}\n\nbody {\n  margin: 0;\n  padding: 0;\n\n  font-family: 'Merriweather', serif;\n  font-size: 1.1rem;\n    \n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n}\n\nheader {\n  height: 20vh;\n  padding: 0;\n  margin: 0;\n  \n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n}\n\nheader > h1,h3,h5 {\n  margin: 0;\n  padding: 0;\n}\n\nmain {\n  width: 100vw;\n}\n\naside {\n  margin: 0;\n}\n\nsection {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n}\n\ntd {\n    font-family: 'Fira Sans', sans-serif;\n    font-weight: 500;\n    letter-spacing: 0.15rem;\n}\n\nth {\n    font-size: 0.9rem;\n}\n\ntd, th {\n    text-align: left;\n    padding: 0.1rem 0.8rem 0.3rem 0.8rem;\n    border-bottom: 1px dashed #aaa;\n}\n\np {\n  line-height: 1.5rem;\n  margin: 1.5rem 1rem 1.5rem 1rem;\n}\n\nfooter {\n  font-family: 'Merriweather', serif;\n  margin: 0;\n}\n\ndiv {\n    margin: 0;\n    padding: 0;\n}\n\n\n.loading {\n\tmargin: 5rem;\n}\n\ndiv.popup {\n    margin: 0;\n    position: absolute;\n    /*display: flex;\n    flex-direction: column;\n    justify-content: center;\n    align-items: center;*/\n    font-family: 'Fira Sans', sans-serif;\n    color: #fff;\n    background-color: #555;\n    border-radius: 1%;\n    pointer-events: none;\n}\n\n\n@media (min-width: 730){\n  body {\n    font-size: 1.3rem;\n  }\n  \n  th {\n    font-size: 1.3rem;\n  }\n\n  td, th {\n    padding: 0.4rem 4rem 0.4rem 4rem;\n  }\n}\n\n\n@media (min-width: 1000px){\n  body {\n    font-size: 1.3rem;\n  }\n\n  h1,h2,h3,h4,h5,h6 {\n    margin: 0;\n  }\n\n  th {\n    font-size: 1.3rem;\n  }\n\n  td, th {\n    padding: 0.5rem 1.25rem 0.5rem 1.25rem;\n  }\n  \n  main {\n    width: 80vw;\n    display: flex;\n    flex-direction: row;\n    justify-content: center;\n    align-items: flex-start;\n  }\n  \n  section {\n    width: 50%;\n    margin: 2rem;\n  }\n  \n  aside {\n    width: 50%;\n    margin: 2rem;\n  }\n  \n  p {\n    margin: 2rem 0 2rem 0;\n    line-height: 2.2rem;\n  }\n  \n  table {\n    width: 100%;\n  }\n}\n",""])},183:function(e,t){function n(e,t){var n=e[1]||"",s=e[3];if(!s)return n;if(t&&"function"==typeof btoa){var a=r(s),o=s.sources.map(function(e){return"/*# sourceURL="+s.sourceRoot+e+" */"});return[n].concat(o).concat([a]).join("\n")}return[n].join("\n")}function r(e){return"/*# "+("sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(e)))))+" */"}e.exports=function(e){var t=[];return t.toString=function(){return this.map(function(t){var r=n(t,e);return t[2]?"@media "+t[2]+"{"+r+"}":r}).join("")},t.i=function(e,n){"string"==typeof e&&(e=[[null,e,""]]);for(var r={},s=0;s<this.length;s++){var a=this[s][0];"number"==typeof a&&(r[a]=!0)}for(s=0;s<e.length;s++){var o=e[s];"number"==typeof o[0]&&r[o[0]]||(n&&!o[2]?o[2]=n:n&&(o[2]="("+o[2]+") and ("+n+")"),t.push(o))}},t}},184:function(e,t,n){function r(e,t){for(var n=0;n<e.length;n++){var r=e[n],s=p[r.id];if(s){s.refs++;for(o=0;o<s.parts.length;o++)s.parts[o](r.parts[o]);for(;o<r.parts.length;o++)s.parts.push(u(r.parts[o],t))}else{for(var a=[],o=0;o<r.parts.length;o++)a.push(u(r.parts[o],t));p[r.id]={id:r.id,refs:1,parts:a}}}}function s(e,t){for(var n=[],r={},s=0;s<e.length;s++){var a=e[s],o=t.base?a[0]+t.base:a[0],i={css:a[1],media:a[2],sourceMap:a[3]};r[o]?r[o].parts.push(i):n.push(r[o]={id:o,parts:[i]})}return n}function a(e,t){var n=m(e.insertInto);if(!n)throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");var r=v[v.length-1];if("top"===e.insertAt)r?r.nextSibling?n.insertBefore(t,r.nextSibling):n.appendChild(t):n.insertBefore(t,n.firstChild),v.push(t);else if("bottom"===e.insertAt)n.appendChild(t);else{if("object"!=typeof e.insertAt||!e.insertAt.before)throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");var s=m(e.insertInto+" "+e.insertAt.before);n.insertBefore(t,s)}}function o(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e);var t=v.indexOf(e);t>=0&&v.splice(t,1)}function i(e){var t=document.createElement("style");return e.attrs.type="text/css",l(t,e.attrs),a(e,t),t}function c(e){var t=document.createElement("link");return e.attrs.type="text/css",e.attrs.rel="stylesheet",l(t,e.attrs),a(e,t),t}function l(e,t){Object.keys(t).forEach(function(n){e.setAttribute(n,t[n])})}function u(e,t){var n,r,s,a;if(t.transform&&e.css){if(!(a=t.transform(e.css)))return function(){};e.css=a}if(t.singleton){var l=y++;n=b||(b=i(t)),r=f.bind(null,n,l,!1),s=f.bind(null,n,l,!0)}else e.sourceMap&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&"function"==typeof URL.revokeObjectURL&&"function"==typeof Blob&&"function"==typeof btoa?(n=c(t),r=h.bind(null,n,t),s=function(){o(n),n.href&&URL.revokeObjectURL(n.href)}):(n=i(t),r=d.bind(null,n),s=function(){o(n)});return r(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap)return;r(e=t)}else s()}}function f(e,t,n,r){var s=n?"":r.css;if(e.styleSheet)e.styleSheet.cssText=x(t,s);else{var a=document.createTextNode(s),o=e.childNodes;o[t]&&e.removeChild(o[t]),o.length?e.insertBefore(a,o[t]):e.appendChild(a)}}function d(e,t){var n=t.css,r=t.media;if(r&&e.setAttribute("media",r),e.styleSheet)e.styleSheet.cssText=n;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(n))}}function h(e,t,n){var r=n.css,s=n.sourceMap,a=void 0===t.convertToAbsoluteUrls&&s;(t.convertToAbsoluteUrls||a)&&(r=w(r)),s&&(r+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(s))))+" */");var o=new Blob([r],{type:"text/css"}),i=e.href;e.href=URL.createObjectURL(o),i&&URL.revokeObjectURL(i)}var p={},g=function(e){var t;return function(){return void 0===t&&(t=e.apply(this,arguments)),t}}(function(){return window&&document&&document.all&&!window.atob}),m=function(e){var t={};return function(n){if(void 0===t[n]){var r=e.call(this,n);if(r instanceof window.HTMLIFrameElement)try{r=r.contentDocument.head}catch(e){r=null}t[n]=r}return t[n]}}(function(e){return document.querySelector(e)}),b=null,y=0,v=[],w=n(185);e.exports=function(e,t){if("undefined"!=typeof DEBUG&&DEBUG&&"object"!=typeof document)throw new Error("The style-loader cannot be used in a non-browser environment");(t=t||{}).attrs="object"==typeof t.attrs?t.attrs:{},t.singleton||(t.singleton=g()),t.insertInto||(t.insertInto="head"),t.insertAt||(t.insertAt="bottom");var n=s(e,t);return r(n,t),function(e){for(var a=[],o=0;o<n.length;o++){var i=n[o];(c=p[i.id]).refs--,a.push(c)}e&&r(s(e,t),t);for(o=0;o<a.length;o++){var c=a[o];if(0===c.refs){for(var l=0;l<c.parts.length;l++)c.parts[l]();delete p[c.id]}}}};var x=function(){var e=[];return function(t,n){return e[t]=n,e.filter(Boolean).join("\n")}}()},185:function(e,t){e.exports=function(e){var t="undefined"!=typeof window&&window.location;if(!t)throw new Error("fixUrls requires window.location");if(!e||"string"!=typeof e)return e;var n=t.protocol+"//"+t.host,r=n+t.pathname.replace(/\/[^\/]*$/,"/");return e.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi,function(e,t){var s=t.trim().replace(/^"(.*)"$/,function(e,t){return t}).replace(/^'(.*)'$/,function(e,t){return t});if(/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(s))return e;var a;return a=0===s.indexOf("//")?s:0===s.indexOf("/")?n+s:r+s.replace(/^\.\//,""),"url("+JSON.stringify(a)+")"})}},186:function(e,t,n){"use strict";function r(e){return Object.keys(e).map(t=>({term:t,size:e[t].length}))}function s(e){const t=Object.keys(e),n=t.length,r=(e,t)=>e>t;let s=[];for(let a=0;a<n;a++){const o=t[a],i=e[o].sort(r);for(let a=0;a<n;a++){const n=t[a],c=e[n].sort(r),l=Object(u.d)(i,c).length,f="C *"!==o&&"C *"!==n;n!==o&&l>0&&f&&s.push({target:n,source:o,shared:l})}}return s}function a(e,t,n,r){const s=r,a=s,u=l.select(n).append("svg").attr("width",s).attr("height",a),f=l.forceSimulation().nodes(e);f.force("charge_force",l.forceManyBody().strength(-r).distanceMin(50).distanceMax(r/2)).force("center_force",l.forceCenter(s/2,a/2));l.select("body").append("div").attr("class","popup").style("opacity",0);const d=u.append("g").attr("class","nodes").selectAll("circle").data(e).enter().append("circle").attr("r",12).attr("fill","red").call(l.drag().on("start",i.bind(f)).on("drag",c.bind(f)));d.append("title").text(e=>e.term);const h=l.forceLink(t).id(function(e){return e.term});f.on("tick",function(){d.attr("cx",function(e){return e.x}).attr("cy",function(e){return e.y}),p.attr("x1",function(e){return e.source.x}).attr("y1",function(e){return e.source.y}).attr("x2",function(e){return e.target.x}).attr("y2",function(e){return e.target.y})}),f.force("links",h);const p=u.append("g").attr("class","links").selectAll("line").data(t).enter().append("line").attr("stroke-width",3).style("stroke",o);p.append("title").text(e=>`${e.source.term} & ${e.target.term} : ${e.shared}`)}function o(e){const t=e.shared;return t<2?"#555":t<3?"#568":t<5?"#58a":t<9?"#5ad":t<14?"#5cf":t<20?"#5ff":t<27?"#2ff":t<35?"#0ff":"#00f"}function i(e){l.event.active||this.alphaTarget(.3).restart(),e.fx=e.x,e.fy=e.y}function c(e){e.fx=l.event.x,e.fy=l.event.y}n.d(t,"c",function(){return r}),n.d(t,"b",function(){return s}),n.d(t,"a",function(){return a});var l=n(92),u=n(90);(()=>{const e={Scala:["d996ecb107d95f5e"],Python:["1a8db8794d09a479","22264e0253a9351b","2973bbaa38b591bd","2d865695d82ae324","4ad674d054f4bbf1","57b44a3efb8f140f","76ad4673f873412e","7aae7e244f359744","91a7f3f9f500fd19","9d937cc790aabc39"],Java:["04d4a774fe2bd693","060564ecba2e71e2","0696f3c1db4ea2b7"],"Go *":["04d4a774fe2bd693","183f4803b7ba8f51","2e05678631f51cf4"],WhatLang:["1a8db8794d09a479","76ad4673f873412e","7aae7e244f359744"]},t=[0===Object(u.d)(e.Scala,e.Python).length,1===Object(u.d)(e.Java,e["Go *"]).length,3===Object(u.d)(e.WhatLang,e.Python).length];let n=t.length,r=0;console.log("---- MODULE TEST: Graph ----"),t.forEach((e,t)=>{console.assert(e,`tests[${t}]`),e&&(r+=1)}),console.log(`${r} out of ${n} tests passed`),console.log("----------------------------")})()},477:function(e,t,n){"use strict";async function r(e){const t=await fetch(e,{mode:"cors"});return await t.json()}n.d(t,"a",function(){return r})},478:function(e,t,n){"use strict";const r={Awk:["awk"],Bash:["bash"],"C *":["c"],"C#":["c#","csharp","c sharp"],"C++":["c++"],Clojure:["clojure"],COBOL:["cobol"],Erlang:["erlang"],"Go *":["go","golang"],Haskell:["haskell"],Java:["java"],JavaScript:["javascript","java script","js"],Lisp:["lisp"],"Objective-C":["objective-c","objective c"],Pascal:["pascal"],Perl:["perl"],PHP:["php"],Powershell:["powershell","power shell"],Python:["python"],Ruby:["ruby"],Rust:["rust"],Scala:["scala"],Scheme:["scheme"],SQL:["sql"],"Swift *":["swift"],"Visual Basic":["visual basic","visualbasic","vb","vba"]};t.a=r;const s={sql:/sql/i,"c++":/c\+\+/i,c:/(^|[^A-Za-z])c($|[^A-Za-z\+])/i};t.b=s;const a=Object.keys(r);t.c=a},90:function(e,t,n){"use strict";var r=n(175),s=(n(91),n(176)),a=n(177),o=n(178);n.d(t,"d",function(){return r.a}),n.d(t,"a",function(){return s.a}),n.d(t,"c",function(){return a.a}),n.d(t,"e",function(){return o.b}),n.d(t,"b",function(){return o.a})},91:function(e,t,n){"use strict";function r(e){return`(^|[^A-Za-z])${e.indexOf(" ")>-1?e.split(" ").join("\\s"):e}($|[^A-Za-z])`}t.a=function(e){return e.reduce((e,t,n)=>0===n?e+r(t):e+"|"+r(t),"")}}},[174]);