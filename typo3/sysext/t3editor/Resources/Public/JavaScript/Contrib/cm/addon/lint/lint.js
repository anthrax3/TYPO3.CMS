'use strict';(function(e){"object"==typeof exports&&"object"==typeof module?e(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],e):e(CodeMirror)})(function(e){function v(a,c){function b(a){if(!d.parentNode)return e.off(document,"mousemove",b);d.style.top=Math.max(0,a.clientY-d.offsetHeight-5)+"px";d.style.left=a.clientX+5+"px"}var d=document.createElement("div");d.className="CodeMirror-lint-tooltip";d.appendChild(c.cloneNode(!0));document.body.appendChild(d);
e.on(document,"mousemove",b);b(a);null!=d.style.opacity&&(d.style.opacity=1);return d}function w(a){a.parentNode&&(null==a.style.opacity&&a.parentNode&&a.parentNode.removeChild(a),a.style.opacity=0,setTimeout(function(){a.parentNode&&a.parentNode.removeChild(a)},600))}function q(a,c,b){function d(){e.off(b,"mouseout",d);g&&(w(g),g=null)}var g=v(a,c),f=setInterval(function(){if(g)for(var a=b;;a=a.parentNode){a&&11==a.nodeType&&(a=a.host);if(a==document.body)return;if(!a){d();break}}if(!g)return clearInterval(f)},
400);e.on(b,"mouseout",d)}function x(a,c,b){this.marked=[];this.options=c;this.timeout=null;this.hasGutter=b;this.onMouseOver=function(c){var b=c.target||c.srcElement;if(/\bCodeMirror-lint-mark-/.test(b.className)){for(var b=b.getBoundingClientRect(),d=a.findMarksAt(a.coordsChar({left:(b.left+b.right)/2,top:(b.top+b.bottom)/2},"client")),b=[],h=0;h<d.length;++h){var e=d[h].__annotation;e&&b.push(e)}if(b.length){d=c.target||c.srcElement;h=document.createDocumentFragment();for(e=0;e<b.length;e++)h.appendChild(r(b[e]));
q(c,h,d)}}};this.waitingFor=0}function t(a){var c=a.state.lint;c.hasGutter&&a.clearGutter("CodeMirror-lint-markers");for(a=0;a<c.marked.length;++a)c.marked[a].clear();c.marked.length=0}function y(a,c,b,d){var g=document.createElement("div"),f=g;g.className="CodeMirror-lint-marker-"+c;b&&(f=g.appendChild(document.createElement("div")),f.className="CodeMirror-lint-marker-multiple");if(0!=d)e.on(f,"mouseover",function(b){q(b,a,f)});return g}function r(a){var c=a.severity;c||(c="error");var b=document.createElement("div");
b.className="CodeMirror-lint-message-"+c;"undefined"!=typeof a.messageHTML?b.innerHTML=a.messageHTML:b.appendChild(document.createTextNode(a.message));return b}function z(a,c,b){function d(){f=-1;a.off("change",d)}var g=a.state.lint,f=++g.waitingFor;a.on("change",d);c(a.getValue(),function(b,c){a.off("change",d);g.waitingFor==f&&(c&&b instanceof e&&(b=c),n(a,b))},b,a)}function l(a){var c=a.state.lint.options,b=c.options||c,d=c.getAnnotations||a.getHelper(e.Pos(0,0),"lint");d&&(c.async||d.async?z(a,
d,b):(c=d(a.getValue(),b,a))&&(c.then?c.then(function(b){n(a,b)}):n(a,c)))}function n(a,c){t(a);for(var b=a.state.lint,d=b.options,e=[],f=0;f<c.length;++f){var h=c[f],m=h.from.line;(e[m]||(e[m]=[])).push(h)}for(f=0;f<e.length;++f)if(h=e[f]){for(var m=null,n=b.hasGutter&&document.createDocumentFragment(),l=0;l<h.length;++l){var k=h[l],p=k.severity;p||(p="error");"error"!=m&&(m=p);d.formatAnnotation&&(k=d.formatAnnotation(k));b.hasGutter&&n.appendChild(r(k));k.to&&b.marked.push(a.markText(k.from,k.to,
{className:"CodeMirror-lint-mark-"+p,__annotation:k}))}b.hasGutter&&a.setGutterMarker(f,"CodeMirror-lint-markers",y(n,m,1<h.length,b.options.tooltips))}if(d.onUpdateLinting)d.onUpdateLinting(c,e,a)}function u(a){var c=a.state.lint;c&&(clearTimeout(c.timeout),c.timeout=setTimeout(function(){l(a)},c.options.delay||500))}e.defineOption("lint",!1,function(a,c,b){b&&b!=e.Init&&(t(a),!1!==a.state.lint.options.lintOnChange&&a.off("change",u),e.off(a.getWrapperElement(),"mouseover",a.state.lint.onMouseOver),
clearTimeout(a.state.lint.timeout),delete a.state.lint);if(c){var d=a.getOption("gutters");b=!1;for(var g=0;g<d.length;++g)"CodeMirror-lint-markers"==d[g]&&(b=!0);d=a.state;c instanceof Function?c={getAnnotations:c}:c&&!0!==c||(c={});b=d.lint=new x(a,c,b);if(!1!==b.options.lintOnChange)a.on("change",u);if(0!=b.options.tooltips&&"gutter"!=b.options.tooltips)e.on(a.getWrapperElement(),"mouseover",b.onMouseOver);l(a)}});e.defineExtension("performLint",function(){this.state.lint&&l(this)})});