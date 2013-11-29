define("magix/magix",function(){var e=/\/\.\/|\/[^\/.]+?\/\.{2}\/|([^:\/])\/\/+|\.{2}\//,t=/\/[^\/]*$/,n=/[#?].*$/,r="",i=/([^=&?\/#]+)=?([^&=#?]*)/g,a="pathname",o=/^https?:\/\//i,c=0,f="/",s="vframe",u=function(){},v={tagName:s,rootId:"magix_vf_root",execError:u},m=v.hasOwnProperty,d=function(e,t){return e?m.call(e,t):e},l=function(e){return function(t,n,r){switch(arguments.length){case 0:r=e;break;case 1:r=b.isObject(t)?g(e,t):d(e,t)?e[t]:null;break;case 2:null===n?(delete e[t],r=n):e[t]=r=n}return r}},p=function(e,t){return t.f==e.f?t.t-e.t:t.f-e.f},h=function(e,t){var n=this;return n.get?(n.c=[],n.x=e||20,n.b=n.x+(isNaN(t)?5:t),void 0):new h(e,t)},g=function(e,t,n){for(var r in t)n&&d(n,r)||(e[r]=t[r]);return e};g(h.prototype,{get:function(e){var t,n=this,r=n.c;return e=a+e,d(r,e)&&(t=r[e],t.f>=1&&(t.f++,t.t=c++,t=t.v)),t},set:function(e,t,n){var r=this,i=r.c,o=a+e,f=i[o];if(!d(i,o)){if(i.length>=r.b){i.sort(p);for(var s=r.b-r.x;s--;)f=i.pop(),delete i[f.k],f.m&&y(f.m,f.o,f)}f={},i.push(f),i[o]=f}return f.o=e,f.k=o,f.v=t,f.f=1,f.t=c++,f.m=n,t},del:function(e){e=a+e;var t=this.c,n=t[e];n&&(n.f=-1e5,n.v=r,delete t[e],n.m&&(y(n.m,n.o,n),n.m=r))},has:function(e){return e=a+e,d(this.c,e)}});var x=h(60),w=h(),y=function(e,t,n,r,i,a){for(b.isArray(e)||(e=[e]),t&&(b.isArray(t)||t.callee)||(t=[t]),r=0;e.length>r;r++)try{a=e[r],i=a&&a.apply(n,t)}catch(o){v.execError(o)}return i},b={isNumeric:function(e){return!isNaN(parseFloat(e))&&isFinite(e)},mix:g,has:d,safeExec:y,noop:u,config:l(v),start:function(e){var t=this;g(v,e),t.libRequire(v.iniFile,function(n){v=g(v,n,e),v["!tnc"]=v.tagName!=s;var r=v.progress;t.libRequire(["magix/router","magix/vom"],function(e,n){e.on("!ul",n.locChged),e.on("changed",n.locChged),r&&n.on("progress",r),t.libRequire(v.extensions,e.start)})})},keys:Object.keys||function(e){var t=[];for(var n in e)d(e,n)&&t.push(n);return t},local:l({}),path:function(i,a){var c=i+"\n"+a,s=w.get(c);if(!s){if(o.test(a))s=a;else if(i=i.replace(n,r).replace(t,r)+f,a.charAt(0)==f){var u=o.test(i)?8:0,v=i.indexOf(f,u);s=i.substring(0,v)+a}else s=i+a;for(;e.test(s);)s=s.replace(e,"$1/");w.set(c,s)}return s},pathToObject:function(e,t){var c=x.get(e);if(!c){c={};var s={},u=r;n.test(e)?u=e.replace(n,r):~e.indexOf("=")||(u=e);var v=e.replace(u,r);if(u&&o.test(u)){var m=u.indexOf(f,8);u=~m?u.substring(m):f}v.replace(i,function(e,n,r){if(t)try{r=decodeURIComponent(r)}catch(i){}s[n]=r}),c[a]=u,c.params=s,x.set(e,c)}return c},objectToPath:function(e,t,n){var r,i=e[a],o=[],c=e.params;for(var f in c)r=c[f],(!n||r||d(n,f))&&(t&&(r=encodeURIComponent(r)),o.push(f+"="+r));return o.length&&(i=i+"?"+o.join("&")),i},listToMap:function(e,t){var n,r,i,a={};if(b.isString(e)&&(e=e.split(",")),e&&(i=e.length))for(n=0;i>n;n++)r=e[n],a[t?r[t]:r]=t?r:1;return a},cache:h},C=Object.prototype.toString;return g(b,{libRequire:function(e,t){e?seajs.use(e,t):t&&t()},isArray:$.isArray,isFunction:$.isFunction,isObject:function(e){return"[object Object]"==C.call(e)},isString:function(e){return"[object String]"==C.call(e)},isNumber:function(e){return"[object Number]"==C.call(e)},isRegExp:function(e){return"[object RegExp]"==C.call(e)},extend:function(e,t,n,r){e.superclass=t.prototype,t.prototype.constructor=t;var i=function(){};return i.prototype=t.prototype,e.prototype=new i,b.mix(e.prototype,n),b.mix(e,r),e.prototype.constructor=e,e}})}),define("magix/router",["magix/magix","magix/event"],function(e){var t,n,r,i,a=e("magix/magix"),o=e("magix/event"),c=window,f="",s="pathname",u="view",v=a.has,m=a.mix,d=document,l=a.keys,p=/^UTF-8$/i.test(d.charset||d.characterSet||"UTF-8"),h=a.config(),g=a.cache(),x=a.cache(40),w={params:{},href:f},y=/#.*$/,b=/^[^#]*#?!?/,C="params",E=h.nativeHistory,V=function(e,t,n){if(e){n=this[C],a.isString(e)&&(e=e.split(","));for(var r=0;e.length>r&&!(t=v(n,e[r]));r++);}return t},j=function(){return this[s]},I=function(){return this[u]},M=function(e,t,n,r){return n=this,r=n[C],arguments.length>1?r[e]=t:r[e]},T=function(e){var t=a.pathToObject(e,p),n=t[s];return n&&i&&(t[s]=a.path(c.location[s],n)),t},$=m({viewInfo:function(e,t){var r,i;if(!n){n={rs:h.routes||{},nf:h.notFoundView};var o=h.defaultView;n.dv=o;var c=h.defaultPathname||f;r=n.rs,n.f=a.isFunction(r),n.f||r[c]||!o||(r[c]=o),n[s]=c}return e||(e=n[s]),r=n.rs,i=n.f?r.call(h,e,t):r[e],{view:i||n.nf||n.dv,pathname:i||E||n.nf?e:n[s]}},start:function(){var e=$,t=c.history;r=E&&t.pushState,i=E&&!r,r?e.useState():e.useHash(),e.route()},parseQH:function(e,t){e=e||c.location.href;var n=$,r=g.get(e);if(!r){var i=e.replace(y,f),a=e.replace(b,f),o=T(i),v=T(a),d={};m(d,o[C]),m(d,v[C]),r={get:M,set:M,href:e,refHref:w.href,srcQuery:i,srcHash:a,query:o,hash:v,params:d},g.set(e,r)}if(t&&!r[u]){var l;l=E?r.hash[s]||r.query[s]:r.hash[s];var p=n.viewInfo(l,r);m(r,p)}return r},getChged:function(e,t){var n=e.href,r=t.href,i=n+"\n"+r,a=x.get(i);if(!a){var o,c,f;a={},a[u]=f,a[s]=f,a[C]={};var v,m,d=[s,u];for(v=1;v>=0;v--)m=d[v],c=e[m],f=t[m],c!=f&&(a[m]={from:c,to:f},o=1);var p=e[C],h=t[C];for(d=l(p).concat(l(h)),v=d.length-1;v>=0;v--)m=d[v],c=p[m],f=h[m],c!=f&&(a[C][m]={from:c,to:f},o=1);a.occur=o,a.isParam=V,a.isPathname=j,a.isView=I,x.set(i,a)}return a},route:function(){var e=$,n=e.parseQH(0,1),r=!w.get,i=e.getChged(w,n);w=n,i.occur&&(t=n,e.fire("changed",{location:n,changed:i,force:r}))},navigate:function(e,n,o){var c=$;if(!n&&a.isObject(e)&&(n=e,e=f),n&&(e=a.objectToPath({params:n,pathname:e},p)),e){var u=T(e),d={};if(d[C]=m({},u[C]),d[s]=u[s],d[s]){if(i){var l=t.query[C];for(var h in l)v(l,h)&&!v(d[C],h)&&(d[C][h]=f)}}else{var g=m({},t[C]);d[C]=m(g,d[C]),d[s]=t[s]}var x,w=a.objectToPath(d,p,t.query[C]);x=r?w!=t.srcQuery:w!=t.srcHash,x&&(r?(c.poped=1,history[o?"replaceState":"pushState"](f,f,w),c.route()):(m(d,t,d),d.srcHash=w,d.hash={params:d[C],pathname:d[s]},c.fire("!ul",{loc:t=d}),w="#!"+w,o?location.replace(w):location.hash=w))}}},o);return $.useState=function(){var e=$,t=location.href;c.addEventListener("popstate",function(){var n=location.href==t;(e.poped||!n)&&(e.poped=1,e.route())},!1)},$.useHash=function(){c.addEventListener("hashchange",$.route,!1)},$}),define("magix/body",["magix/magix"],function(e){var t,n=e("magix/magix"),r=n.has,i=n.mix,a={},o=document.body,c={},f=String.fromCharCode(26),s="mx-ei",u="mx-owner",v={},m=65536,d="on",l=",",p=function(e){return e.id||(e.id="mx-e-"+m--)},h=function(e,t,n){return e&&e.setAttribute&&(n?e.setAttribute(t,n):n=e.getAttribute(t)),n},g={special:function(e){i(a,e)},process:function(e){if(e=e||window.event,e&&!e[d]){var n=e.target||e.srcElement;for(e[d]=1;n&&1!=n.nodeType;)n=n.parentNode;var i=n,a=e.type,o=v[a]||(v[a]=RegExp(l+a+"(?:,|$)"));if(!o.test(h(n,s))){for(var c,m,g="mx-"+a,x=[];i&&(c=h(i,g),m=h(i,s),!c&&!o.test(m));)x.push(i),i=i.parentNode;if(c){var w,y=c.split(f);if(y.length>1&&(w=y[0],c=y.pop()),w=w||h(i,u),!w)for(var b=i,C=t.all();b;){if(r(C,b.id)){h(i,u,w=b.id);break}b=b.parentNode}if(!w)throw Error("bad:"+c);var E=t.get(w),V=E&&E.view;V&&V.processEvent({info:c,se:e,st:a,tId:p(n),cId:p(i)})}else for(var j;x.length;)j=x.shift(),m=h(j,s)||d,o.test(m)||(m=m+l+a,h(j,s,m))}}},act:function(e,n,r){var i=c[e]||0,f=i>0?1:0;if(i+=n?-f:f,!i){r&&(t=r);var s=a[e];s?g.lib(o,e,n,g.process):o[d+e]=n?null:g.process,n||(i=1)}c[e]=i}},x={focus:2,blur:2,mouseenter:2,mouseleave:2};return g.special(x),g.lib=function(e,t,n,r){$(e)[(n?"un":"")+"delegate"]("[mx-"+t+"]",t,r)},g}),define("magix/event",["magix/magix"],function(e){var t=e("magix/magix"),n=function(e){return"~"+e},r=t.safeExec,i={fire:function(e,t,i,a){var o=n(e),c=this,f=c[o];if(f){t||(t={}),t.type||(t.type=e);for(var s,u,v=f.length,m=v-1;v--;)s=a?v:m-v,u=f[s],(u.d||u.r)&&(f.splice(s,1),m--),u.d||r(u.f,t,c)}i&&delete c[o]},on:function(e,r,i){var a=n(e),o=this[a]||(this[a]=[]);t.isNumeric(i)?o.splice(i,0,{f:r}):o.push({f:r,r:i})},off:function(e,t){var r=n(e),i=this[r];if(i)if(t){for(var a,o=i.length-1;o>=0;o--)if(a=i[o],a.f==t&&!a.d){a.d=1;break}}else delete this[r]},once:function(e,t){this.on(e,t,!0)}};return i}),define("magix/vframe",["magix/magix","magix/event","magix/view"],function(e){var t,n,r,i,a,o=e("magix/magix"),c=e("magix/event"),f=e("magix/view"),s=document,u=s.body,v=65536,m=o.safeExec,d=[],l=d.slice,p=o.mix,h=o.config("tagName"),g=o.config("rootId"),x=o.config("!tnc"),w=o.has,y=x?"mx-vframe":"mx-defer",b=u.contains,C=x&&u.querySelectorAll,E=" "+h+"[mx-vframe]",V="alter",j="created",I=function(e){return"object"==typeof e?e:s.getElementById(e)},M=function(e,t,n){return t=I(e),t&&(n=C?s.querySelectorAll("#"+t.id+E):t.getElementsByTagName(h)),n||d},T=function(e){return e.id||(e.id="magix_vf_"+v--)},$=function(e,t,n){if(e=I(e),t=I(t),e&&t)if(e!==t)try{n=b?t.contains(e):16&t.compareDocumentPosition(e)}catch(r){n=0}else n=1;return n},k=function(e){var t=this;t.id=e,t.cM={},t.cC=0,t.rC=0,t.sign=1<<30,t.rM={},t.owner=a};return p(k,{root:function(e,n,o){if(!t){r=n,i=o,a=e;var c=I(g);c||(c=s.createElement(h),c.id=g,u.insertBefore(c,u.firstChild)),t=new k(g),e.add(t)}return t}}),p(p(k.prototype,c),{mountView:function(e,t,n){var c=this,s=I(c.id);if(s._bak?s._chgd=1:(s._bak=1,s._tmpl=s.innerHTML),c.unmountView(),e){var u=o.pathToObject(e),v=u.pathname,d=--c.sign;o.libRequire(v,function(e){if(d==c.sign){f.prepare(e);var o=new e({owner:c,id:c.id,$:I,path:v,vom:a,location:r});c.view=o,o.on("interact",function(e){e.tmpl||(s._chgd&&(s.innerHTML=s._tmpl),c.mountZoneVframes()),o.on("rendered",function(){c.mountZoneVframes()}),o.on("prerender",function(){c.unmountZoneVframes(0,1)||c.cAlter()}),o.on("inited",function(){c.viewInited=1,c.fire("viewInited",{view:o}),n&&m(n,o,c)})},0),t=t||{},o.load(p(t,u.params,t),i)}})}},unmountView:function(){var e=this;if(e.view){n||(n={}),e.unmountZoneVframes(0,1),e.cAlter(n),e.view.oust();var t=I(e.id);t&&t._bak&&(t.innerHTML=t._tmpl),delete e.view,delete e.viewInited,n=0,e.fire("viewUnmounted")}e.sign--},mountVframe:function(e,t,n,r){var i=this,o=a.get(e);return o||(o=new k(e),o.pId=i.id,w(i.cM,e)||i.cC++,i.cM[e]=1,a.add(o)),o.mountView(t,n,r),o},mountZoneVframes:function(e,t,n){var r=this,i=e||r.id;r.unmountZoneVframes(i,1);var a=M(i),o=a.length,c={};if(o)for(var f,s,u,v,m=0;o>m;m++)if(f=a[m],s=T(f),!w(c,s)&&(u=f.getAttribute("mx-view"),v=!f.getAttribute(y),v=v!=x,v||u)){r.mountVframe(s,u,t,n);for(var d,l=M(f),p=0,h=l.length;h>p;p++)d=l[p],c[T(d)]=1}r.cCreated()},unmountVframe:function(e,t){var n=this;e=e||n.id;var r=a.get(e);if(r){var i=r.fcc;r.unmountView(),a.remove(e,i);var o=a.get(r.pId);o&&w(o.cM,e)&&(delete o.cM[e],o.cC--,t||o.cCreated())}},unmountZoneVframes:function(e,t){var n,r,i=this,a=i.cM;for(r in a)e?$(r,e)&&i.unmountVframe(r,n=1):i.unmountVframe(r,n=1);return t||i.cCreated(),n},invokeView:function(e){var t,n=this,r=n.view,i=n.viewInited&&r[e],a=l.call(arguments,1);return i&&(t=m(i,a,r)),t},cCreated:function(e){var t=this;if(t.cC==t.rC){var n=t.view;n&&!t.fcc&&(t.fcc=1,delete t.fca,n.fire(j,e),t.fire(j,e)),a.vfCreated();var r=t.id,i=a.get(t.pId);i&&!w(i.rM,r)&&(i.rM[r]=i.cM[r],i.rC++,i.cCreated(e))}},cAlter:function(e){var t=this;if(e||(e={}),delete t.fcc,!t.fca){var n=t.view,r=t.id;n&&(t.fca=1,n.fire(V,e),t.fire(V,e));var i=a.get(t.pId);i&&w(i.rM,r)&&(i.rC--,delete i.rM[r],i.cAlter(e))}},locChged:function(){var e=this,t=e.view;if(t&&t.sign>0&&t.rendered){var n=t.olChanged(i),c={location:r,changed:i,prevent:function(){this.cs=d},toChildren:function(e){e=e||d,o.isString(e)&&(e=e.split(",")),this.cs=e}};n&&m(t.locationChange,c,t);for(var f,s=c.cs||o.keys(e.cM),u=0,v=s.length;v>u;u++)f=a.get(s[u]),f&&f.locChged()}}}),k}),define("magix/view",function(e){var t=e("magix/magix"),n=e("magix/event"),r=e("magix/body"),i=t.safeExec,a=t.has,o=",",c=[],f=t.noop,s=t.mix,u="~",v=function(e){return function(){var t,n=this,r=n.notifyUpdate();return r&&(t=e.apply(n,arguments)),t}},m=t.cache(40),d="<",l=">",p=/\smx-(?!view|defer|owner|vframe)[a-z]+\s*=\s*"/g,h=String.fromCharCode(26),g={prevent:function(e){e=e||this.domEvent,e.preventDefault?e.preventDefault():e.returnValue=!1},stop:function(e){e=e||this.domEvent,e.stopPropagation?e.stopPropagation():e.cancelBubble=!0},halt:function(e){this.prevent(e),this.stop(e)}},x=/(\w+)(?:<(\w+)>)?(?:{([\s\S]*)})?/,w=/(\w+):([^,]+)/g,y=/([$\w]+)<([\w,]+)>/,b=function(e){var t=this;s(t,e),t.sign=1,i(b.ms,[e],t)};b.ms=[],b.prepare=function(e){if(!e[u]){e[u]=1;var t,n,r,i,c,s=e.prototype,m={};for(var p in s)if(a(s,p))if(t=s[p],n=p.match(y))for(r=n[1],i=n[2],i=i.split(o),c=i.length-1;c>-1;c--)n=i[c],m[n]=1,s[r+d+n+l]=t;else"render"==p&&t!=f&&(s[p]=v(t));i&&(s.$evts=m)}},b.mixin=function(e,t){t&&b.ms.push(t),s(b.prototype,e)},s(s(b.prototype,n),{render:f,locationChange:f,init:f,hasTmpl:!0,enableEvent:!0,load:function(){var e=this,t=e.hasTmpl,n=arguments,r=e.sign,a=function(a){if(r==e.sign){e.template=e.wrapMxEvent(a),e.delegateEvents(),e.fire("interact",{tmpl:t},1),i(e.init,n,e),e.fire("inited",0,1),i(e.render,c,e);var o=!t&&!e.rendered;o&&(e.rendered=!0,e.fire("primed",0,1))}};t?e.fetchTmpl(e.path,a):a()},beginUpdate:function(){var e=this;e.sign>0&&e.rendered&&(e.fire("refresh",0,1),e.fire("prerender"))},endUpdate:function(){var e=this;e.sign>0&&(e.rendered||(e.fire("primed",0,1),e.rendered=!0),e.fire("rendered"))},notifyUpdate:function(){var e=this;return e.sign>0&&(e.sign++,e.fire("rendercall")),e.sign},wrapMxEvent:function(e){return(e+"").replace(p,"$&"+this.id+h)},setViewHTML:function(e){var t,n=this;n.beginUpdate(),n.sign>0&&(t=n.$(n.id),t&&(t.innerHTML=e)),n.endUpdate()},observeLocation:function(e){var n,r=this;r.$ol||(r.$ol={keys:[]}),n=r.$ol;var i=n.keys;t.isObject(e)&&(n.pn=e.pathname,e=e.keys),e&&(n.keys=i.concat((e+"").split(o)))},olChanged:function(e){var t=this,n=t.$ol;if(n){var r=0;if(n.pn&&(r=e.isPathname()),!r){var i=n.keys;r=e.isParam(i)}return r}return 1},oust:function(){var e=this;e.sign>0&&(e.sign=0,e.fire("refresh",0,1),e.fire("destroy",0,1,1),e.delegateEvents(1)),e.sign--},processEvent:function(e){var t=this;if(t.enableEvent&&t.sign>0){var n=e.info,r=e.se,a=m.get(n);a||(a=n.match(x),a={n:a[1],f:a[2],i:a[3],p:{}},a.i&&a.i.replace(w,function(e,t,n){a.p[t]=n}),m.set(n,a));var o=a.n+d+e.st+l,c=t[o];if(c){var f=g[a.f];f&&f.call(g,r),i(c,s({currentId:e.cId,targetId:e.tId,type:e.st,domEvent:r,params:a.p},g),t)}}},delegateEvents:function(e){var t=this,n=t.$evts,i=t.vom;for(var a in n)r.act(a,e,i)}});var C,E="?t="+Date.now(),V={},j={};return b.prototype.fetchTmpl=function(e,t){var n=this,r="template"in n;if(r)t(n.template);else if(a(V,e))t(V[e]);else{var o=e.indexOf("/");if(!C){var c=e.substring(0,o);C=seajs.data.paths[c]}e=e.substring(o+1);var f=C+e+".html",s=j[f],u=function(n){t(V[e]=n)};s?s.push(u):(s=j[f]=[u],$.ajax({url:f+E,success:function(e){i(s,e),delete j[f]},error:function(e,t){i(s,t),delete j[f]}}))}},b.extend=function(e,n,r){var a=this,o=function(){o.superclass.constructor.apply(this,arguments),n&&i(n,arguments,this)};return o.extend=a.extend,t.extend(o,a,e,r)},b}),define("magix/vom",["magix/vframe","magix/magix","magix/event"],function(e){var t=e("magix/vframe"),n=e("magix/magix"),r=e("magix/event"),i=n.has,a=n.mix,o=0,c=0,f=0,s=0,u={},v={},m={},d=n.mix({all:function(){return u},add:function(e){i(u,e.id)||(o++,u[e.id]=e,d.fire("add",{vframe:e}))},get:function(e){return u[e]},remove:function(e,t){var n=u[e];n&&(o--,t&&c--,delete u[e],d.fire("remove",{vframe:n}))},vfCreated:function(){if(!s){c++;var e=c/o;e>f&&d.fire("progress",{percent:f=e},s=1==e)}},locChged:function(e){var n,r=e.loc;if(r?n=1:r=e.location,a(v,r),!n){a(m,e.changed);var i=t.root(d,v,m);m.view?i.mountView(r.view):i.locChged()}}},r);return d}),document.createElement("vframe");