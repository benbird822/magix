KISSY.add("magix/body",function(k,g,h,i){var a=h.has,k=h.mix,c=h.listToMap("submit,focusin,focusout,mouseenter,mouseleave,mousewheel,change"),e=document.body,n={},o={},q=65536,m=function(a,b,d){d?a.setAttribute(b,d):d=a.getAttribute(b);return d},i=k({processEvent:function(f){for(var b=f.target||f.srcElement;b&&1!=b.nodeType;)b=b.parentNode;var d=b,c=f.type,p=o[c]||(o[c]=RegExp("(?:^|,)"+c+"(?:,|$)"));if(!p.test(m(b,"mx-ie"))){for(var n="mx-"+c,i,h,l=[];d&&d!=e&&!(i=m(d,n),h=m(d,"mx-ie"),i||p.test(h));)l.push(d),
d=d.parentNode;if(i){c=m(d,"mx-owner");if(!c){p=d;for(h=this.VOM.all();p&&p!=e;)if(a(h,p.id)){m(d,"mx-owner",c=p.id);break}else p=p.parentNode}if(c)this.fire("event",{info:i,se:f,tId:b.id||(b.id="mx-e-"+q--),cId:d.id||(d.id="mx-e-"+q--),hld:c});else throw Error("miss mx-owner:"+i);}else for(;l.length;)f=l.shift(),h=m(f,"mx-ie"),p.test(h)||(h=h?h+","+c:c,m(f,"mx-ie",h))}},attachEvent:function(a){var b=this;if(n[a])n[a]++;else if(n[a]=1,c[a])b.onUnbubble(e,a);else e["on"+a]=function(a){(a=a||window.event)&&
b.processEvent(a)}},detachEvent:function(a){var b=n[a];0<b&&(b--,b||(c[a]?this.offUnbubble(e,a):e["on"+a]=null),n[a]=b)}},i);return h.mix(i,g)},{requires:["magix/impl/body","magix/magix","magix/event"]});
KISSY.add("magix/event",function(k,g){var h=g.safeExec;return{fire:function(i,a,c,e){var n="~"+i,o=this[n];if(o){a||(a={});if(!a.type)a.type=i;for(var i=o.length,g=i-1,m,f;i--;)m=e?i:g-i,f=o[m],f.d&&(o.splice(m,1),g--),h(f,a,this)}c&&delete this[n]},on:function(i,a,c){i="~"+i;this[i]||(this[i]=[]);g.isNumeric(c)?this[i].splice(c,0,a):(a.d=c,this[i].push(a))},un:function(i,a){g.isArray(i)||(i=[i]);for(var c=0,e=i.length;c<e;c++){var n="~"+i[c],o=this[n];if(o)if(a)for(var n=0,h=o.length;n<h;n++){if(o[n]==
a){o.splice(n,1);break}}else delete this[n]}}}},{requires:["magix/magix"]});KISSY.add("magix/impl/body",function(k,g){var h={};return{onUnbubble:function(i,a){var c=this;g.delegate(i,a,"*[mx-"+a+"]",h[a]=function(a){c.processEvent(a)})},offUnbubble:function(i,a){g.undelegate(i,a,"*[mx-"+a+"]",h[a]);delete h[a]}}},{requires:["event"]});
KISSY.add("magix/impl/magix",function(k,g){g=[].slice;return{libRequire:function(h,i){if(h){var a=this.isFunction(i),c=this.isArray(h);k.use(c?h.join(","):h,a?function(a){i.apply(a,g.call(arguments,1))}:this.noop)}else i()},libEnv:function(h){var i=h.appHome,a=location,c=a.protocol,e=h.appName;~i.indexOf(c)||(i=this.path(a.href,i));k.endsWith(i,"/")||(i+="/");h.appHome=i;var n=h.debug;n&&(n=0==i.indexOf(c+"//"+a.host));"~"==e.charAt(0)&&k.config({map:[[RegExp("/"+e+"/"),"/"]]});a="";(a=n?k.now():
h.appTag)&&(a+=".js");c=h.appCombine;k.isUndefined(c)&&(c=k.config("combine"));k.config({packages:[{name:e,path:i,debug:h.debug=n,combine:c,tag:a}]})},isArray:k.isArray,isFunction:k.isFunction,isObject:k.isObject,isRegExp:k.isRegExp,isString:k.isString,isNumber:k.isNumber}});
KISSY.add("magix/impl/router",function(k,g){var h=window;return{useState:function(){var i=this,a=location.href;g.on(h,"popstate",function(){var c=location.href==a;if(i.$firedPop||!c)i.$firedPop=!0,i.route()})},useHash:function(){var i=this;g.on(h,"hashchange",function(){i.route()})}}},{requires:["event"]});
KISSY.add("magix/impl/view",function(k,g,h){var i=function(){},a=k.Env.mods,c={wrapAsyn:1,extend:1},e=function(a,c,i){for(var g in c)k.isObject(c[g])?(h.has(a,g)||(a[g]={}),e(a[g],c[g],!0)):i&&(a[g]=c[g])};i.extend=function(a,c){var e=function(){e.superclass.constructor.apply(this,arguments);c&&h.safeExec(c,arguments,this)};e.extend=i.extend;return k.extend(e,this,a)};i.prepare=function(n,i){if(!n.wrapAsyn){for(var g in this)h.has(c,g)&&(n[g]=this[g]);g=n.prototype;for(var k=n;k.superclass;)k=k.superclass.constructor,
e(g,k.prototype);i.home=a[i.path].packageInfo.getBase();h.mix(g,i)}n.wrapAsyn()};h.mix(i.prototype,{fetchTmpl:function(a,c,e){g({url:a+(e?"?_="+k.now():""),success:c,error:function(a,f){c(f)}})}});return i},{requires:["ajax","magix/magix"]});
KISSY.add("magix/magix",function(k,g){var h=/\/\.\/|\/[^\/]+?\/\.{2}\/|([^:\/])\/\/+/,i=/[^\/]*$/,a=/[#?].*$/,c=/([^=&?\/#]+)=([^&=#?]*)/g,e=/^https?:\/\//i,n={},o=0,q={debug:false,iniFile:"~/ini",appName:"app",appHome:"./",tagName:"vframe",rootId:"magix_vf_root"},m=n.hasOwnProperty,f=function(a){return function(b,d,c){switch(arguments.length){case 0:c=a;break;case 1:c=r.isObject(b)?p(a,b):j(a,b)?a[b]:null;break;case 2:null===d?(delete a[b],c=d):a[b]=c=d}return c}},b=function(a){this.c=[];this.x=
a||20;this.b=this.x+5},d=function(a){return new b(a)},j=function(a,b){return a?m.call(a,b):0},p=function(a,b,d){for(var c in b)if(!0===d)a[c]=b[c];else if(j(b,c)&&(!d||!j(d,c)))a[c]=b[c];return a};p(b.prototype,{get:function(a){var b=this.c,d,a="pathname"+a;if(j(b,a)&&(d=b[a],1<=d.f))d.f++,d.t=o++,d=d.v;return d},set:function(a,b){var d=this.c,a="pathname"+a,c=d[a];if(!j(d,a)){if(d.length>=this.b){d.sort(function(a,b){return b.f==a.f?b.t-a.t:b.f-a.f});for(var f=this.b-this.x;f--;)c=d.pop(),delete d[c.k]}c=
{};d.push(c);d[a]=c}c.k=a;c.v=b;c.f=1;c.t=o++;return c},del:function(a){var a="pathname"+a,b=this.c,d=b[a];if(d)d.f=-1E5,delete b[a]}});var u=d(60),v=d(),w=function(a,b,d,c,f,l){r.isArray(a)||(a=[a]);if(!b||!r.isArray(b)&&!b.callee)b=[b];for(c=0;c<a.length;c++)try{l=a[c],f=r.isFunction(l)&&l.apply(d,b)}catch(e){}return f},l=function(){},r={isNumeric:function(a){return!isNaN(parseFloat(a))&&isFinite(a)},mix:p,has:j,safeExec:w,noop:l,config:f(q),start:function(a){var b=this,a=p(q,a);b.libEnv(a);var d=
a.iniFile.replace("~",a.appName);b.libRequire(d,function(d){q=p(a,d,a);var c=a.progress;b.libRequire(["magix/router","magix/vom"],function(d,f){d.on("changed",function(a){a.loc?f.locationUpdated(a.loc):a.changed.isView()?f.remountRoot(a):f.locationChanged(a)});f.on("progress",c||l);b.libRequire(a.extensions,function(){d.start()})})});a.ready&&(w(a.ready),delete a.ready)},keys:Object.keys||function(a){var b=[],d;for(d in a)j(a,d)&&b.push(d);return b},local:f({}),path:function(b,d){var c=b+"\n"+d,f=
v.get(c);if(!f){b=b.replace(a,"").replace(i,"");"/"==d.charAt(0)?(f=b.indexOf("://"),-1==f?f=d:(f=b.indexOf("/",f+3),f=-1==f?b+d:b.substring(0,f)+d)):f=b+d;for(;h.test(f);)f=f.replace(h,"$1/");v.set(c,f)}return f},pathToObject:function(b,d){var f=u.get(b);if(!f){var f={},l={},j="";a.test(b)?j=b.replace(a,""):~b.indexOf("=")||(j=b);if(j&&e.test(j))var p=j.indexOf("/",8),j=-1==p?"/":j.substring(p);b.replace(c,function(a,b,c){if(d)try{c=decodeURIComponent(c)}catch(f){}l[b]=c});f.pathname=j;f.params=
l;u.set(b,f)}return f},objectToPath:function(a,b){var d=a.pathname,c=[],f=a.params,l,j;for(j in f)l=f[j],b&&encodeURIComponent(l),c.push(j+"="+l);return d+(d&&c.length?"?":"")+c.join("&")},tmpl:function(a,b){return 1==arguments.length?n[a]:n[a]=b},listToMap:function(a,b){var d,c,f={},l;this.isString(a)&&(a=a.split(","));if(a&&(l=a.length))for(d=0;d<l;d++)c=a[d],f[b?c[b]:c]=b?c:1;return f},createCache:d};return r.mix(r,g)},{requires:["magix/impl/magix"]});
KISSY.add("magix/router",function(k,g,h,i){var a=window,c=h.has,e=h.mix,n=document,o=/^UTF-8$/i.test(n.charset||n.characterSet||"UTF-8"),q=h.config(),m=h.createCache(),f=h.createCache(),b,d,j,p=65536,u=/#.*$/,v=/^[^#]*#?!?/,w=q.nativeHistory,l,r,s=function(a,b,d){if(a){d=this.params;h.isArray(a)||(a=a.split(","));for(var f=0;f<a.length&&!(b=c(d,a[f]));f++);}return b},x=function(){return c(this,"pathname")},D=function(){return c(this,"view")},y=function(){return this.hash.pathname!=this.query.pathname},
A=function(a){return this.hash.params[a]!=this.query.params[a]},z=function(a){return c(this.hash.params,a)},E=function(a){return c(this.query.params,a)},C=function(a){return this.params[a]},k=e({getView:function(a){if(!j){j={routes:q.routes||{},e404:q.notFoundView};var b=q.defaultView;if(!b)throw Error("unset defaultView");j.home=b;var d=q.defaultPathname||"";j.routes[d]=b;j.pathname=d}a||(a=j.pathname);b=j.routes;b=h.isFunction(b)?b.call(q,a):b[a];return{view:b?b:j.e404||j.home,pathname:b?a:j.e404?
a:j.pathname}},start:function(){var b=a.history;l=w&&b.pushState;r=w&&!l;l?this.useState():this.useHash();this.route()},parsePath:function(b){var b=h.pathToObject(b,o),d=b.pathname;d&&"/"!=d.charAt(0)&&r&&(b.pathname=h.path(a.location.pathname,d));return b},parseQH:function(b){var b=b||a.location.href,d=m.get(b);if(!d){var d=b.replace(u,""),c=b.replace(v,""),f=this.parsePath(d),l=this.parsePath(c),j={};e(j,f.params);e(j,l.params);d={pathnameDiff:y,paramDiff:A,hashOwn:z,queryOwn:E,get:C,href:b,srcQuery:d,
srcHash:c,query:f,hash:l,params:j};m.set(b,d)}return d},parseLoc:function(a){a=this.parseQH(a);if(!a.view){var b=this.getView(w?a.hash.pathname||a.query.pathname:a.hash.pathname);e(a,b)}return a},getChged:function(a,b){var d=b.href,c=a.href+"\n"+d,l=f.get(c);l||(c=d+"\n"+c,l=f.get(c));if(!l){var j,l={params:{}};if(a.pathname!=b.pathname)j=l.pathname=1;if(a.view!=b.view)j=l.view=1;var d=a.params,e=b.params,p;for(p in d)d[p]!=e[p]&&(j=1,l.params[p]=1);for(p in e)d[p]!=e[p]&&(j=1,l.params[p]=1);l.occur=
j;l.isParam=s;l.isPathname=x;l.isView=D;f.set(c,l)}return l},route:function(){var a=this.parseLoc(),c=d||{params:{},href:"~"},f=!d;d=a;c=this.getChged(c,a);c.occur&&(b=a,this.fire("changed",{location:a,changed:c,firstFire:f}))},navigate2:function(a){if(a&&h.isString(a)){var d=this.parsePath(a),a={};a.params=e({},d.params);a.pathname=d.pathname;if(a.pathname){if(r&&(d=b.query)&&(d=d.params))for(var f in d)c(d,f)&&!c(a.params,f)&&(a.params[f]="")}else f=e({},b.params),a.params=e(f,a.params),a.pathname=
b.pathname;f=h.objectToPath(a);if(l?f!=b.srcQuery:f!=b.srcHash)l?(this.$firedPop=1,history.pushState(p--,n.title,f),this.route()):(e(a,b,a),a.srcHash=f,a.hash={params:a.params,pathname:a.pathname},this.fire("changed",{loc:b=a}),location.hash="#!"+f)}},navigate:function(a,b){!b&&h.isObject(a)&&(b=a,a="");b&&(a=h.objectToPath({params:b,pathname:a},o));this.navigate2(a)}},i);return h.mix(k,g)},{requires:["magix/impl/router","magix/magix","magix/event"]});
KISSY.add("magix/vframe",function(k,g,h,i){var a=document,c=65536,e=window.CollectGarbage||g.noop,n=g.mix,k=g.config(),o=k.tagName,q=k.rootId,m=g.has,f,b=function(b){return"object"==typeof b?b:a.getElementById(b)};a.createElement(o);var d=/<script[^>]*>[\s\S]*?<\/script>/ig,j=function(a){this.id=a;this.vId=a+"_v";this.cS={};this.rC=this.cC=0;this.sign=-2147483648;this.rM={}};n(j,{root:function(d){if(!f){var c=b(q);if(!c)c=a.createElement(o),c.id=q,a.body.insertBefore(c,a.body.firstChild);f=new j(q);
d.add(f)}return f}});n(n(j.prototype,h),{useAnimUpdate:g.noop,oldViewDestroy:g.noop,prepareNextView:g.noop,newViewCreated:g.noop,mountView:function(a,c){var f=this,j=b(f.id);j._bak?j._chgd=1:(j._bak=1,j._tmpl=j.innerHTML.replace(d,""));var l=f.vN&&f.useAnimUpdate();f.unmountView(l,1);if(a){var e=g.pathToObject(a),h=e.pathname,o=--f.sign;g.libRequire(h,function(a){if(o==f.sign){var d=f.owner;i.prepare(a,{$:b,path:h,vom:d});var p;l?(p=f.vId,f.prepareNextView()):p=f.id;var g=new a({owner:f,id:p,vId:f.vId,
vfId:f.id,location:d.getLocation()});f.view=g;g.on("interact",function(a){f.fire("viewInteract",{view:g});f.viewUsable=1;l&&f.newViewCreated(1);if(!a.tmpl){if(!l&&j._chgd)j.innerHTML=j._tmpl;f.mountZoneVframes(0,0,1)}g.on("rendered",function(){f.mountZoneVframes(0,0,1)});g.on("prerender",function(a){f.unmountZoneVframes(0,a.anim)})},0);g.load(n(e.params,c,!0))}})}},unmountView:function(a,d){if(this.view){this.unmountZoneVframes(0,a);this.childrenAlter({});this.fire("viewUnmount");this.view.destroy();
var f=b(this.id);if(!a&&f._bak)f.innerHTML=f._tmpl;a&&d&&this.oldViewDestroy();delete this.view;delete this.viewUsable;e()}this.un("viewInteract");this.sign--},mountVframe:function(a,b,d,f){var c=this.owner,e=c.get(a);if(!e)e=new j(a),e.pId=this.id,m(this.cS,a)||this.cC++,this.cS[a]=f,c.add(e);e.mountView(b,d);return e},mountZoneVframes:function(a,d,f){this.unmountZoneVframes(a);var a=a?a:b(this.vId)||b(this.id),a=b(a).getElementsByTagName(o),j=a.length,l={};if(j)for(var e=0,g,i;e<j;e++){g=a[e];i=
g.id||(g.id="magix_vf_"+c--);m(l,i)||this.mountVframe(i,g.getAttribute("mx-view"),d,f);g=b(g).getElementsByTagName(o);i=0;for(var h=g.length;i<h;i++)l[g[i].id||(g[i].id="magix_vf_"+c--)]=1}else this.childrenCreated({})},unmountVframe:function(a,b){var d=this.owner,f=d.get(a);f&&(f.unmountView(b),d.remove(a),delete this.cS[a],this.cC--)},unmountZoneVframes:function(a){var d;if(a){d=b(a).getElementsByTagName(o);for(var f={},c=this.cS,j=d.length-1,e;0<=j;j--)e=d[j].id,m(c,e)&&(f[e]=1);d=f}else d=this.cS;
for(var g in d)this.unmountVframe(g);if(!a)this.cS={},this.cC=0},childrenCreated:function(a){var b=this.view;if(b&&!this.fcc)this.fcc=1,delete this.fca,b.fire("created",a),this.fire("created",a);b=this.owner;b.childCreated();if(b=b.get(this.pId)){var d=this.id,f=b.rM;m(f,d)||(f[d]=b.cS[d],b.rC++,b.rC==b.cC&&b.childrenCreated(a))}},childrenAlter:function(a){delete this.fcc;var b=this.view,d=this.id;if(b&&!this.fca)this.fca=1,b.fire("alter",a),this.fire("alter",a);if(b=this.owner.get(this.pId)){var d=
this.id,f=b.rM,c=f[d];m(f,d)&&(b.rC--,delete f[d],c&&b.childrenAlter(a))}},locationChanged:function(a,b){var d=this.view;if(d&&d.sign&&(d.location=a,d.rendered)){var f=d.olChanged(b),c={location:a,changed:b,prevent:function(){this.cs=[]},toChildren:function(a){a=a||[];g.isString(a)&&(a=a.split(","));this.cs=a}};f&&g.safeExec(d.locationChange,c,d);for(var d=c.cs||g.keys(this.cS),f=0,c=d.length,j=this.owner,e;f<c;f++)(e=j.get(d[f]))&&e.locationChanged(a,b)}},locationUpdated:function(a){var b=this.view;
if(b&&b.sign){b.location=a;var b=this.cS,d,f=this.owner,c;for(c in b)(d=f.get(c))&&d.locationUpdated(a)}}});return j},{requires:["magix/magix","magix/event","magix/view"]});
KISSY.add("magix/view",function(k,g,h,i,a){var c=h.safeExec,e=h.has,n=[],o=h.config(),q=/^~[^\/]*/,m=h.mix,f=h.listToMap("render,renderUI"),b=function(a){return function(){var b;this.sign&&(this.sign++,this.fire("rendercall"),b=a.apply(this,arguments));return b}},k=function(a){m(this,a);this.sign=1};m(k,{wrapAsyn:function(){if(!this["~~"]){this["~~"]=1;var a=this.prototype,d,c;for(c in a){d=a[c];var j=null;h.isFunction(d)&&d!=h.noop&&!d["~~"]&&e(f,c)&&(j=b(d),j["~~"]=d,a[c]=j)}}}});var d=k.prototype,
j=window.CollectGarbage||h.noop,p=/\smx-[^ohv][a-z]+\s*=/g,u={prevent:function(a){a=a||this.domEvent;a.preventDefault?a.preventDefault():a.returnValue=!1},stop:function(a){a=a||this.domEvent;a.stopPropagation?a.stopPropagation():a.cancelBubble=!0},halt:function(a){this.prevent(a);this.stop(a)}},v=/(\w+)(?:<(\w+)>)?(?:{([\s\S]*)})?/,w=/(\w+):([^,]+)/g;m(d,i);m(d,{render:h.noop,locationChange:h.noop,init:h.noop,hasTmpl:!0,enableEvent:!0,enableAnim:!1,load:function(){var a=this,b=a.hasTmpl,d=arguments,
f=a.sign,j=function(){if(f==a.sign&&(a.delegateEvents(),a.fire("interact",{tmpl:b},1),c(a.init,d,a),c(a.render,n,a),!b&&!a.rendered))a.rendered=!0,a.fire("primed",null,1)};b&&!a.template?a.planTmpl(j):j()},updateViewId:function(){this.id=this.$(this.vId)?this.vId:this.vfId},beginUpdateHTML:function(){if(this.sign&&this.rendered){var a=this.enableAnim;this.fire("refresh",0,1);this.fire("prerender",{anim:a});var b=this.owner;a&&(c(b.oldViewDestroy,n,b),c(b.prepareNextView,n,b),this.updateViewId())}},
endUpdateHTML:function(){if(this.sign){if(this.rendered&&this.enableAnim){var a=this.owner;c(a.newViewCreated,n,a)}this.rendered||this.fire("primed",null,1);this.rendered=!0;this.fire("rendered");j()}},wrapMxEvent:function(a){return a?(""+a).replace(p,' mx-owner="'+this.vfId+'"$&'):a},setViewHTML:function(a){this.beginUpdateHTML();if(this.sign)this.$(this.id).innerHTML=this.wrapMxEvent(a);this.endUpdateHTML()},observeLocation:function(a){var b;if(!this.$ol)this.$ol={keys:[]};b=this.$ol;var d=b.keys;
if(h.isObject(a))b.pn=a.pathname,a=a.keys;if(a)b.keys=d.concat(h.isString(a)?a.split(","):a)},olChanged:function(a){var b=this.$ol;if(b){var d=0;b.pn&&(d=a.isPathname());d||(d=a.isParam(b.keys));return d}return 1},destroy:function(){this.fire("refresh",0,1);this.fire("destroy",0,1,1);this.delegateEvents(1);this.sign=0},parentView:function(){var a=this.vom.get(this.owner.pId),b=null;if(a&&a.viewUsable)b=a.view;return b},planTmpl:function(a){var b=this,d=h.tmpl(b.path);if(void 0===d){var d=o.debug,
f=b.home+b.path.replace(q,"")+".html";b.fetchTmpl(f,function(d){b.template=h.tmpl(b.path,d);a()},d)}else b.template=d,a()},processEvent:function(a){if(this.enableEvent&&this.sign){var b=a.se,d=a.info.match(v),f=d[1],j=d[2],d=d[3],e=this.events;if(e){var g=e[b.type];if(u[j])u[j](b);if(g&&g[f]){var i={};d&&d.replace(w,function(a,b,d){i[b]=d});c(g[f],m({view:this,currentId:a.cId,targetId:a.tId,domEvent:b,events:e,params:i},u),g)}}}},delegateEvents:function(b){var d=this.events,b=b?a.detachEvent:a.attachEvent,
f;for(f in d)b.call(a,f)}});h.mix(k,g,{prototype:!0});h.mix(k.prototype,g.prototype);return k},{requires:["magix/impl/view","magix/magix","magix/event","magix/body"]});
KISSY.add("magix/vom",function(k,g,h,i,a){var c=h.has,e=0,n=0,o=0,q=0,m={},f,b=h.mix({all:function(){return m},add:function(a){if(!c(m,a.id))e++,m[a.id]=a,a.owner=b,b.fire("add",{vframe:a})},get:function(a){return m[a]},remove:function(a){var f=m[a];f&&(e--,f.fcc&&n--,delete m[a],b.fire("remove",{vframe:f}))},childCreated:function(){if(!q){n++;var a=n/e;o<a&&(b.fire("progress",{percent:o=a}),1==a&&(q=1,b.un("progress")))}},root:function(){return g.root(b)},remountRoot:function(a){var c=b.root();f=
a.location;c.mountView(f.view)},locationChanged:function(a){f=a.location;b.root().locationChanged(f,a.changed)},locationUpdated:function(a){f=a;b.root().locationUpdated(a)},getLocation:function(){return f}},i);a.VOM=b;a.on("event",function(a){var f=b.get(a.hld);(f=f&&f.view)&&f.processEvent(a)});return b},{requires:["magix/vframe","magix/magix","magix/event","magix/body"]});
KISSY.add("mxext/mmanager",function(k,g){var h=g.has,i=g.safeExec,a=function(a){g.isArray(a)||(a=[a]);for(var b=0,d;b<a.length;b++)d=a[b],delete d.cacheKey;return a},c=function(a){this.$modelClass=a;this.$modelsCache=g.createCache();this.$modelsCacheKeys={}},e=[].slice,n={urlParams:1,postParams:1,cacheKey:1,cacheTime:1,before:1,after:1},o=function(a){var b={},d;for(d in a)n[d]||(b[d]=a[d]);return b},q=function(a,b){var d=e.call(arguments,2);return function(){return a.apply(b,d.concat(e.call(arguments)))}};
g.mix(c,{create:function(a){if(!a)throw Error("MManager.create modelClass ungiven");return new c(a)}});var m=function(a){this.$host=a;this.$task=!1};g.mix(m.prototype,{fetchModels:function(a,b,d){var c=this;if(c.$task)return c.next(function(c){c.fetchModels(a,b,error,d)}),c;c.$task=!0;var e=c.$host;if(!c.$reqModels)c.$reqModels={};var n=e.$modelsCache,o=e.$modelsCacheKeys,m=c.$reqModels;g.isArray(a)||(a=[a]);var l=a.length,r=0,s,x,D=Array(l),y=[],A={},z=[],E=k.isArray(b);E&&(y=Array(b.length));for(var C=
function(a,f,e,g){if(!c.$destroy){r++;delete m[e.id];var p=e._cacheKey;D[a]=e;if(f)x=!0,s=g||s,A[a]=g;else{p&&!n.get(p)&&n.set(p,e);var q=e.metaParams;e._doneAt=k.now();var t=e._context;t&&i(t.after,[e].concat(q),t)}if(2==d)(q=E?b[a]:b)&&(y[a]=i(q,[e,f?{msg:g}:null,x?A:null],c));else if(4==d){z[a]={m:e,e:f,s:g};for(a=z.i||0;q=z[a];a++)if(t=E?b[a]:b,y[a]=i(t,[q.m,q.e?{msg:q.s}:null,z.e?A:null,y],c),q.e)A[a]=q.s,z.e=1;z.i=a}p&&h(o,p)&&(a=o[p],delete o[p],i(a,[f,e,g],e));if(r>=l)A.msg=s,f=x?A:null,1==
d?(D.push(f),y[0]=i(b,D,c),y[1]=f):y.push(f),c.$ntId=setTimeout(function(){c.$task=!1;c.doNext(y)},30)}},B=0,t;B<a.length;B++)if(t=a[B]){var G;G=e.getModel(t);var F=G.cacheKey;F&&h(o,F)?o[F].push(q(C,c,B)):(t=G.entity,G.needUpdate?(m[t.id]=t,F&&(o[F]=[]),t.request({success:q(C,t,B,!1,t),error:q(C,t,B,!0,t)})):C(B,!1,t))}else throw Error("miss attrs:"+a);return c},fetchAll:function(a,b){return this.fetchModels(a,b,1)},saveAll:function(c,b){c=a(c);return this.fetchModels(c,b,1)},fetchOrder:function(a,
b){var d=e.call(arguments,1);return this.fetchModels(a,1<d.length?d:b,4)},saveOrder:function(c,b){var c=a(c),d=e.call(arguments,1);return this.fetchModels(c,1<d.length?d:b,4)},saveOne:function(c,b){var c=a(c),d=e.call(arguments,1);return this.reqModels(c,1<d.length?d:b,2)},fetchOne:function(a,b){var d=e.call(arguments,1);return this.fetchModels(a,1<d.length?d:b,2)},abort:function(){clearTimeout(this.$ntId);var a=this.$reqModels,b=this.$host.$modelsCacheKeys;if(a)for(var d in a){var c=a[d],e=c._cacheKey;
if(e&&h(b,e)){var g=b[e];delete b[e];i(g,[!0,c,"aborted"],c)}c.abort()}this.$reqModels={};this.$queue=[];this.$task=!1},next:function(a){if(!this.$queue)this.$queue=[];this.$queue.push(a);this.$task||this.doNext.apply(this,[this].concat(this.$latest||[]));return this},doNext:function(a){var b=this.$queue;b&&(b=b.shift())&&i(b,[this].concat(a),this);this.$latest=a},destroy:function(){this.$destroy=!0;this.abort()}});g.mix(c.prototype,{registerModels:function(a){g.isArray(a)||(a=[a]);for(var b=0,d;b<
a.length;b++){d=a[b];if(!d.name)throw Error("model must own a name attribute");this[d.name]=d}},registerMethods:function(a){var b=this,d;for(d in a)h(a,d)&&(b[d]=function(a){return function(){for(var d,c=arguments,f=[],e=0,h;e<c.length;e++)h=c[e],g.isFunction(h)?f.push(function(a){return function(){d||a.apply(a,arguments)}}(h)):f.push(h);var n=a.apply(b,f);return{abort:function(){n&&n.abort&&i(n.abort,["aborted"],n);d=!0}}}}(a[d]))},createModel:function(a){var b=this.getModelMeta(a),d=new this.$modelClass(o(b)),
c=a;c.before||(c=b);var e=a.metaParams||[];k.isFunction(c.before)&&i(c.before,[d].concat(e),c);c=a;c.after||(c=b);if(c.after)d._context=c;d._cacheKey=a.cacheKey||b.cacheKey;d._meta=b;d.set(o(a));d.setUrlParams(b.urlParams);d.setPostParams(b.postParams);d.setUrlParams(a.urlParams);d.setPostParams(a.postParams);d.metaParams=e;return d},getModelMeta:function(a){var b=this[a.name];if(!b)throw Error("Not found:"+a.name);return b},getModel:function(a){var b=this.getModelFromCache(a),d;b||(d=!0,b=this.createModel(a));
return{entity:b,cacheKey:b._cacheKey,needUpdate:d}},saveAll:function(a,b){return(new m(this)).saveAll(a,b)},fetchAll:function(a,b){return(new m(this)).fetchAll(a,b)},saveOrder:function(a,b){var d=new m(this);return d.saveOrder.apply(d,arguments)},fetchOrder:function(a,b){var d=new m(this);return d.fetchOrder.apply(d,arguments)},saveOne:function(a,b){var d=new m(this);return d.saveOne.apply(d,arguments)},fetchOne:function(a,b){var d=new m(this);return d.fetchOne.apply(d,arguments)},clearCacheByKey:function(a){var b=
this.$modelsCache;k.isString(a)&&b.del(a)},clearCacheByName:function(a){for(var b=this.$modelsCache.c,d=0;d<b.length;d++){var c=b[d];c.v&&c.v._meta.name==a&&delete b[c.k]}},getModelUrl:function(a){return this.$modelClass.prototype.url((k.isString(a)?this[a]:a).uri)},getModelFromCache:function(a){var b=this.$modelsCache,d=null,c;if(k.isString(a))c=a;else{var e=this.getModelMeta(a);c=a.cacheKey||e.cacheKey}if(c&&(d=b.get(c))){if(!e)e=d._meta;a=a.cacheTime||e.cacheTime||0;0<a&&k.now()-d._doneAt>a&&(this.clearCacheByKey(c),
d=null)}return d}});return c},{requires:["magix/magix"]});
KISSY.add("mxext/model",function(k,g){var h=function(a,c,e){for(var i in c)k.isObject(c[i])?(g.has(a,i)||(a[i]={}),h(a[i],c[i],!0)):e&&(a[i]=c[i])},i=function(a){a&&this.set(a);this.id=k.guid("m")};g.mix(i,{GET:"GET",POST:"POST",extend:function(a,c){var e=function(){e.superclass.constructor.apply(this,arguments);c&&g.safeExec(c,[],this)};g.mix(e,this,{prototype:!0});h(a,this.prototype);return k.extend(e,this,a)}});g.mix(i.prototype,{urlMap:{},sync:g.noop,parse:function(a){return a},getParamsObject:function(a){if(!a)a=
i.GET;return this["$"+a]||null},getUrlParamsObject:function(){return this.getParamsObject(i.GET)},getPostParamsObject:function(){return this.getParamsObject(i.POST)},getPostParams:function(){return this.getParams(i.POST)},getUrlParams:function(){return this.getParams(i.GET)},getParams:function(a){var a=a?a.toUpperCase():i.GET,a=this["$"+a],c=[],e;if(a)for(var g in a)if(e=a[g],k.isArray(e))for(var h=0;h<e.length;h++)c.push(g+"="+encodeURIComponent(e[h]));else c.push(g+"="+encodeURIComponent(e));return c.join("&")},
setUrlParamsIf:function(a,c){this.setParams(a,c,i.GET,!0)},setPostParamsIf:function(a,c){this.setParams(a,c,i.POST,!0)},setParams:function(a,c,e,g){e=e?e.toUpperCase():i.GET;if(!this.$keysCache)this.$keysCache={};this.$keysCache[e]=!0;e="$"+e;this[e]||(this[e]={});if(k.isObject(a))for(var h in a){if(!g||!this[e][h])this[e][h]=a[h]}else if(a&&(!g||!this[e][a]))this[e][a]=c},setPostParams:function(a,c){this.setParams(a,c,i.POST)},setUrlParams:function(a,c){this.setParams(a,c,i.GET)},removeParamsObject:function(a){if(!a)a=
i.GET;delete this["$"+a]},removePostParamsObject:function(){this.removeParamsObject(i.POST)},removeUrlParamsObject:function(){this.removeParamsObject(i.GET)},reset:function(){var a=this.$keysCache;if(a){for(var c in a)g.has(a,c)&&delete this["$"+c];delete this.$keysCache}a=this.$keys;c=this.$attrs;if(a){for(var e=0;e<a.length;e++)delete c[a[e]];delete this.$keys}},url:function(a){var a=a||this.get("uri"),c;if(a){c=a.split(":");var e=this.urlMap;if(e)for(var g=0,i=c.length;g<i&&!(e=e[c[g]],void 0===
e);g++)g==i-1&&(a=e)}else throw Error("model not set uri");return a},get:function(a){var c=this.$attrs;return c?c[a]:null},set:function(a,c,e){if(!this.$attrs)this.$attrs={};if(e&&!this.$keys)this.$keys=[];if(k.isObject(a))for(var g in a)e&&this.$keys.push(g),this.$attrs[g]=a[g];else a&&(e&&this.$keys.push(a),this.$attrs[a]=c)},load:function(a){this.request(a)},save:function(a){this.request(a)},request:function(a){a||(a={});var c=a.success,e=a.error,g=this;g.$abort=!1;a.success=function(a){if(!g.$abort){if(a){var e=
g.parse(a);e&&(k.isArray(e)&&(e={list:e}),g.set(e,null,!0))}c&&c.apply(this,arguments)}};a.error=function(){g.$abort||e&&e.apply(this,arguments)};g.$trans=g.sync(a)},abort:function(){this.$trans&&this.$trans.abort&&this.$trans.abort();delete this.$trans;this.$abort=!0},isAborted:function(){return this.$abort},beginTransaction:function(){this.$bakAttrs=k.clone(this.$attrs)},rollbackTransaction:function(){var a=this.$bakAttrs;if(a)this.$attrs=a,delete this.$bakAttrs},endTransaction:function(){delete this.$bakAttrs}});
return i},{requires:["magix/magix"]});
KISSY.add("mxext/modelfactory",function(k,g){var h=function(a){this.$modelClass=a},i=function(a){if(a._wraped_)return a;var c=function(c){var i=c.success,h=this;h.get("~~ui")?(c.success=function(){h.set("~~ui",!1);h._after&&g.safeExec(h._after,h);i&&i.apply(c)},a.call(h,c)):i&&i.apply(c)};c._wraped_=!0;return c};g.mix(h,{mClsCache:{},create:function(a,c){if(!c)throw Error("Factory.create modelClass ungiven");var e=this.mClsCache;a||(a=k.guid());e[a]||(e[a]=new h(c));return e[a]}});g.mix(h.prototype,
{registerModels:function(a){g.isArray(a)||(a=[a]);for(var c=0,e;c<a.length;c++){e=a[c];if(!e.type)throw Error("model must own a type attribute");this[e.type]=e}},registerMethods:function(a){for(var c in a)g.hasProp(a,c)&&(this[c]=a[c])},callMethods:function(a,c,e){for(var g=[],i="",h=a.length,m=0,f,b=function(a,b,d){f||(m++,d?i=a:g[b]=a,h<=m&&(i?k.isFunction(e)&&e(i):k.isFunction(c)&&c.apply(c,g)))},d=function(a,d){return function(c){b(c,a,!d)}},j=0,p;j<a.length;j++){p=a[j];var u;if(u=k.isFunction(p.name)?
p.name:this[p.name]){if(!p.params)p.params=[];p.params.push(d(j,!0),d(j));u.apply(this,p.params)}else b("unfound:"+p.name,j,!0)}return{abort:function(){f=!0}}},fetchModels:function(a,c,e,i){var h=this;if(!h.$modelsCache)h.$modelsCache={};if(!h.$modelsCacheKeys)h.$modelsCacheKeys={};var q=h.$modelsCache,m=h.$modelsCacheKeys;g.isArray(a)||(a=[a]);for(var f=a.length,b=0,d,j=[],p=[],u,v=function(a,p,l,r){b++;if(p)d=r||"fetch data error";else{u=!0;l.set("~~ui",!1);j[a]=l;if((a=l._cacheKey)&&!g.hasProp(q,
a))q[l._cacheKey]=l,a=l._params,l._doneAt=k.now(),l._after&&g.safeExec(l._after,[l].concat(a));4==i&&c(l)}if((a=l._cacheKey)&&g.hasProp(m,a)){var v=m[a];delete m[a];g.safeExec(v,[p,l,r],l)}4!=i&&b>=f&&(2==i?u?c&&c.apply(h,j):e&&e(d):d?e&&e(d):c&&c.apply(h,j))},w=Array.prototype.slice,l=function(a,b){var d=w.call(arguments,2);return function(){return a.apply(b,d.concat(w.call(arguments)))}},r=0,s;r<a.length;r++){s=a[r];var x=s.cacheKey;x&&g.hasProp(m,x)?m[x].push(l(v,h,r)):(s=h.create(s,!0),s.get("~~ui")?
(p.push(s),x&&(m[x]=[]),s.request({success:l(v,s,r,!1,s),error:l(v,s,r,!0,s)})):v(r,!1,s))}return{abort:function(){for(var a=0,b;a<p.length;a++){b=p[a];var d=b._cacheKey;if(d&&g.hasProp(m,d)){var c=m[d];delete m[d];g.safeExec(c,[!0,b,"abort"],b)}b.abort()}}}},fetchAll:function(a,c,e){return this.fetchModels(a,c,e,1)},fetchAny:function(a,c,e){return this.fetchModels(a,c,e,2)},fetchOne:function(a,c){return this.fetchModels(a,c,g.noop,4)},getIf:function(a){var c=this.$modelsCache;return c&&g.hasProp(c,
a)?c[a]:null},setUpdateIdent:function(a){(a=this.getIf(a))&&a.set("~~ui",!0)},create:function(a,c){if(!a.type)throw Error('model must own a "type" attribute');var e=a.type,h=a.cacheKey||e.cacheKey,o,q=a.expires||e.expires||0;if(!this.$modelsCache)this.$modelsCache={};var m=this.$modelsCache,f=a.params||[];if(h&&g.hasProp(m,h)){o=m[h];var b=o.get("~~ui");!b&&0<q&&k.now()-o._doneAt>q&&(b=!0);b&&(delete m[h],o.set("~~ui",!0))}else o=new this.$modelClass(e.ops),o._after=e.after,o._cacheKey=h,o.set("~~ui",
!0);o._params=f;if(b=o.get("~~ui"))o.reset(),o.set(a.ops),o.setParams(e.gets),o.setPostParams(e.posts),o.setParams(a.gets),o.setPostParams(a.posts),g.isFunction(e.before)&&g.safeExec(e.before,[o].concat(f),e);if(!c)o.request=i(o.request);return o}});return h},{requires:["magix/magix"]});
KISSY.add("mxext/view",function(k,g,h,i){var a=window,c="destroy,abort,stop,cancel,remove".split(","),e=0,n=g.safeExec,o=g.has,q={},m=function(a){if(!m.d)m.d=1,a.on("add",function(a){var a=a.vframe,b=q[a.id];if(b){for(var c=0;c<b.length;c++)f(a,b[c]);delete q[a.id]}}),a.on("remove",function(a){delete q[a.vframe.id]}),a.root().on("childrenCreated",function(){q={}})},f=function(a,c){var e=a.view;if(e&&a.viewUsable)n(e.receiveMessage,c,e);else{var f=function(e){a.un("viewInteract",f);n(e.view.receiveMessage,
c,e.view)};a.on("viewInteract",f)}};return h.extend({mxViewCtor:g.noop,navigate:function(a){i.navigate.apply(i,arguments)},manage:function(a,c){var f=!0;1==arguments.length&&(c=a,a="res_"+e++,f=!1);if(!this.$resCache)this.$resCache={};this.$resCache[a]={hasKey:f,res:c};return c},getManaged:function(a){var c=this.$resCache;return c&&o(c,a)?c[a].res:null},removeManaged:function(a){var c=null,e=this.$resCache;if(e)if(o(e,a))c=e[a].res,delete e[a];else for(var f in e)if(e[f].res===a){c=e[f].res;delete e[f];
break}return c},destroyManaged:function(b){var d=this.$resCache;if(d){for(var e in d){var f=d[e],h=f.res;if(g.isNumber(h))a.clearTimeout(h),a.clearInterval(h);else if(h)if(h.nodeType&&h.parentNode)k.one(h).remove();else for(var i=0;i<c.length;i++)g.isFunction(h[c[i]])&&n(h[c[i]],[],h);b&&!f.hasKey&&delete d[e]}b||delete this.$resCache}},receiveMessage:g.noop,postMessageTo:function(a,c){var e=this.vom;m(e);g.isArray(a)||(a=[a]);c||(c={});for(var h=0,i;h<a.length;h++){i=a[h];var k=e.get(i);k?f(k,c):
(q[i]||(q[i]=[]),q[i].push(c))}},destroyMRequest:function(){var a=this.$resCache;if(a)for(var c in a){var e=a[c].res;e&&e.fetchOne&&e.fetchAll&&(e.destroy(),delete a[c])}}},function(){var a=this;a.on("interact",function(){a.on("rendercall",function(){a.destroyMRequest()});a.on("prerender",function(){a.destroyManaged(!0)});a.on("destroy",function(){a.destroyManaged()})});a.mxViewCtor()})},{requires:["magix/magix","magix/view","magix/router"]});
(function(k){var g=function(){};if(!k.console)k.console={log:g,info:g,error:g};var h,i={};if(!k.Magix)k.Magix={config:function(a){for(var c in a)i[c]=a[c]},start:function(a){h=a}},KISSY.use("magix/magix",function(a,c){k.Magix=c;c.config(i);h&&c.start(h)})})(this);