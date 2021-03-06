define('app/refresh',['magix','$'],function(require){
/*Magix ,$ */
/*
    author:xinglie.lkf@taobao.com
 */
var Magix = require('magix');
var $ = require('$');
var HolderReg = /\u001f/g;
var ContentReg = /@(\d+)\-\u001f/g;
var TmplCache = new Magix.Cache();
var BuildHTML = function(tmpl, data, id) {
    var fn = TmplCache.get(tmpl);
    if (!fn) {
        fn = $.tmpl(tmpl);
        TmplCache.set(tmpl, fn);
    }
    return fn(data).replace(HolderReg, id);
};
var Data = function() {
    var me = this;
    me.$data = {};
    me.$json = {};
};
var fn = Data.prototype;
Magix.mix(fn, Magix.Event);
Magix.mix(fn, {
    get: function(key) {
        var result = this.$data;
        if (key) result = result[key];
        return result;
    },
    set: function(key, val) {
        var me = this,
            data = me.$data;
        if ($.isPlainObject(key)) {
            Magix.mix(data, key);
        } else {
            data[key] = val;
        }
        return me;
    },
    digest: function() {
        var me = this;
        var data = me.$data;
        var json = me.$json;
        var keys = {};
        var changed, val, key, valJSON, lchange;
        for (key in data) {
            val = data[key];
            lchange = 0;
             //try {
                valJSON = JSON.stringify(val);
             //} catch (e) {
                 //lchange = e;
             //}
            if (!Magix.has(json, key)) {
                json[key] = valJSON;
                lchange = 1;
            }
            if (!lchange) {
                lchange = valJSON != json[key];
                json[key] = valJSON;
            }
            if (lchange) {
                keys[key] = changed = 1;
            }
        }
        me.onapply(keys, changed, data);
        if (changed) {
            me.fire('changed', {
                keys: keys
            });
            delete me.$lss;
        }
        return me;
    },
    snapshot: function() {
        var me = this;
         //try {
            me.$ss = JSON.stringify(me.$json);
         //} catch (e) {

         //}
        return me;
    },
    altered: function() {
        var me = this;
        if (me.$ss) {  //存在快照
             //try {
                if (!me.$lss) me.$lss = JSON.stringify(me.$json);  //不存在比较的快照，生成
                return me.$ss != me.$lss;  //比较2次快照是否一样
             //} catch (e) {
               //  console.error(e);
             //}
        }
        return true;
    }
});
Magix.View.merge({
    ctor: function() {
        var me = this;
        me.data = new Data();
        me.data.onapply = function(keys, changed, data) {
            if (changed || !me.$rd) {
                me.updateHTML(keys, data);
            }
        };
    },
    toHTML: function(tmpl, data) {
        return BuildHTML(tmpl, data, this.id);
    },
    /*asyncSetHTML: function(id, html) {
        var me = this;
        me.beginUpdate(id);
        var key = '_timer_' + id;
        if (me[key]) {
            clearTimeout(key);
        }
        var nodes = $(html);
        var node = $('#' + id);
        node.html('');
        var step = 200;
        var max = nodes.length,
            index = 0;
        var go = function() {
            if (index < max) {
                var end = Math.min(index + step, max);
                for (var i = index; i < end; i++) {
                    node.append(nodes[i]);
                }
                index = end;
                me[key] = setTimeout(go, 0);
            } else {
                delete me[key];
                me.endUpdate(id);
            }
        };
        go();
    },*/
    updateHTML: function(updateFlags, renderData) {
        var me = this;
        var selfId = me.id;
        var list = me.tmplData;
        if (me.$rd && updateFlags && list) {
            var updatedNodes = {},
                keys;
            var one, updateTmpl, updateAttrs;
            var updateNode = function(index, node) {
                var id = node.id || (node.id = Magix.guid('n'));
                if (!updatedNodes[id]) {
                     //console.time('update:' + id);
                    updatedNodes[id] = 1;
                    var vf = one.view && Magix.Vframe.get(id);
                    if (updateAttrs) {
                        for (var i = one.attrs.length - 1; i >= 0; i--) {
                            var attr = one.attrs[i];
                            var val = BuildHTML(attr.v, renderData);
                            if (attr.p) {
                                node[attr.n] = val;
                            } else {
                                node.setAttribute(attr.n, val);
                            }
                        }
                    }
                    if (vf) {
                        vf.unmountView();
                    }
                    if (one.tmpl && updateTmpl) {
                        me.setHTML(id, BuildHTML(one.tmpl, renderData, selfId));
                    }
                    if (vf) {
                        vf.mountView(BuildHTML(one.view, renderData, selfId));
                    }
                     //console.timeEnd('update:' + id);
                }
            };
            console.log(updateFlags);
            for (var i = list.length - 1, update, q, mask, m; i >= 0; i--) {  //keys
                updateTmpl = 0;
                updateAttrs = 0;
                one = list[i];
                update = 1;
                mask = one.mask;
                keys = one.pKeys;
                if (keys) {
                    q = keys.length;
                    while (--q >= 0) {
                        if (Magix.has(updateFlags, keys[q])) {
                            update = 0;
                            break;
                        }
                    }
                }
                if (update) {
                    keys = one.keys;
                    q = keys.length;
                    update = 0;
                    while (--q >= 0) {
                        if (Magix.has(updateFlags, keys[q])) {
                            update = 1;
                            if (!mask || (updateTmpl && updateAttrs)) {
                                updateTmpl = one.tmpl;
                                updateAttrs = one.attrs;
                                break;
                            }
                            m = mask.charAt(q);
                            updateTmpl = updateTmpl || m & 1;
                            updateAttrs = updateAttrs || m & 2;
                        }
                    }
                    if (update) {
                        update = '#' + selfId + ' ' + one.selector.replace(HolderReg, selfId);
                        $(update).each(updateNode);
                    }
                }
            }
        } else {
            var map,
                tmplment = function(m, guid) {
                    return map[guid].tmpl;
                },
                x;
            if (list) {
                if (!list.$) {  //process once
                    list.$ = map = {};
                    x = list.length;
                    while (x > 0) {
                        var s = list[--x];
                        if (s.guid) {
                            map[s.guid] = s;
                            s.tmpl = s.tmpl.replace(ContentReg, tmplment);
                            delete s.guid;
                        }
                    }
                }
                map = list.$;
            }
            me.$rd = 1;
            var tmpl = me.tmpl.replace(ContentReg, tmplment);
            me.setHTML(selfId, BuildHTML(tmpl, renderData, selfId));
        }
    }
});
});