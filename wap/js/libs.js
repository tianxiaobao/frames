/*flexible*/
!
function(t) {
    function e() {
        var e = o.getBoundingClientRect().width;
        e / i > 540 && (e = 540 * i),
        t.rem = e / 16,
        ss = t.rem > 28 ? 28 : t.rem,
        o.style.fontSize = ss + "px"
    }
    var i, n, s, r = t.document,
    o = r.documentElement,
    a = r.querySelector('meta[name="viewport"]'),
    h = r.querySelector('meta[name="flexible"]');
    if (a) {
        console.log("将根据已有的meta标签来设置缩放比例");
        var c = a.getAttribute("content").match(/initial\-scale=(["']?)([\d\.]+)\1?/);
        c && (n = parseFloat(c[2]), i = parseInt(1 / n))
    } else if (h) {
        var c = h.getAttribute("content").match(/initial\-dpr=(["']?)([\d\.]+)\1?/);
        c && (i = parseFloat(c[2]), n = parseFloat((1 / i).toFixed(2)))
    }
    if (!i && !n) {
        var l = (t.navigator.appVersion.match(/android/gi), t.navigator.appVersion.match(/iphone/gi)),
        i = t.devicePixelRatio;
        i = l ? i >= 3 ? 3 : i >= 2 ? 2 : 1 : 1,
        n = 1 / i
    }
    if (o.setAttribute("data-dpr", i), !a) if (a = r.createElement("meta"), a.setAttribute("name", "viewport"), a.setAttribute("content", "initial-scale=" + n + ", maximum-scale=" + n + ", minimum-scale=" + n + ", user-scalable=no"), o.firstElementChild) o.firstElementChild.appendChild(a);
    else {
        var u = r.createElement("div");
        u.appendChild(a),
        r.write(u.innerHTML)
    }
    if(t.dpr){
        t.dpr=i;
    }
    t.addEventListener("resize",
    function() {
        clearTimeout(s),
        s = setTimeout(e, 300)
    },
    !1),
    t.addEventListener("pageshow",
    function(t) {
        t.persisted && (clearTimeout(s), s = setTimeout(e, 300))
    },
    !1),
    "complete" === r.readyState ? r.body.style.fontSize = 12 * i > 28 ? "28px": 12 * i + "px": r.addEventListener("DOMContentLoaded",
    function() {
        r.body.style.fontSize = 12 * i > 28 ? "28px": 12 * i + "px"
    },
    !1),
    e()
} (window);
var requirejs, require, define; !
function(global) {
    function isFunction(t) {
        return "[object Function]" === ostring.call(t)
    }
    function isArray(t) {
        return "[object Array]" === ostring.call(t)
    }
    function each(t, e) {
        if (t) {
            var i;
            for (i = 0; i < t.length && (!t[i] || !e(t[i], i, t)); i += 1);
        }
    }
    function eachReverse(t, e) {
        if (t) {
            var i;
            for (i = t.length - 1; i > -1 && (!t[i] || !e(t[i], i, t)); i -= 1);
        }
    }
    function hasProp(t, e) {
        return hasOwn.call(t, e)
    }
    function getOwn(t, e) {
        return hasProp(t, e) && t[e]
    }
    function eachProp(t, e) {
        var i;
        for (i in t) if (hasProp(t, i) && e(t[i], i)) break
    }
    function mixin(t, e, i, n) {
        return e && eachProp(e,
        function(e, s) { (i || !hasProp(t, s)) && (!n || "object" != typeof e || !e || isArray(e) || isFunction(e) || e instanceof RegExp ? t[s] = e: (t[s] || (t[s] = {}), mixin(t[s], e, i, n)))
        }),
        t
    }
    function bind(t, e) {
        return function() {
            return e.apply(t, arguments)
        }
    }
    function scripts() {
        return document.getElementsByTagName("script")
    }
    function defaultOnError(t) {
        throw t
    }
    function getGlobal(t) {
        if (!t) return t;
        var e = global;
        return each(t.split("."),
        function(t) {
            e = e[t]
        }),
        e
    }
    function makeError(t, e, i, n) {
        var s = new Error(e + "\nhttp://requirejs.org/docs/errors.html#" + t);
        return s.requireType = t,
        s.requireModules = n,
        i && (s.originalError = i),
        s
    }
    function newContext(t) {
        function e(t) {
            var e, i;
            for (e = 0; e < t.length; e++) if (i = t[e], "." === i) t.splice(e, 1),
            e -= 1;
            else if (".." === i) {
                if (0 === e || 1 === e && ".." === t[2] || ".." === t[e - 1]) continue;
                e > 0 && (t.splice(e - 1, 2), e -= 2)
            }
        }
        function i(t, i, n) {
            var s, r, o, a, h, c, l, u, p, d, f, m, g = i && i.split("/"),
            v = T.map,
            x = v && v["*"];
            if (t && (t = t.split("/"), l = t.length - 1, T.nodeIdCompat && jsSuffixRegExp.test(t[l]) && (t[l] = t[l].replace(jsSuffixRegExp, "")), "." === t[0].charAt(0) && g && (m = g.slice(0, g.length - 1), t = m.concat(t)), e(t), t = t.join("/")), n && v && (g || x)) {
                o = t.split("/");
                t: for (a = o.length; a > 0; a -= 1) {
                    if (c = o.slice(0, a).join("/"), g) for (h = g.length; h > 0; h -= 1) if (r = getOwn(v, g.slice(0, h).join("/")), r && (r = getOwn(r, c))) {
                        u = r,
                        p = a;
                        break t
                    } ! d && x && getOwn(x, c) && (d = getOwn(x, c), f = a)
                } ! u && d && (u = d, p = f),
                u && (o.splice(0, p, u), t = o.join("/"))
            }
            return s = getOwn(T.pkgs, t),
            s ? s: t
        }
        function n(t) {
            isBrowser && each(scripts(),
            function(e) {
                return e.getAttribute("data-requiremodule") === t && e.getAttribute("data-requirecontext") === b.contextName ? (e.parentNode.removeChild(e), !0) : void 0
            })
        }
        function s(t) {
            var e = getOwn(T.paths, t);
            return e && isArray(e) && e.length > 1 ? (e.shift(), b.require.undef(t), b.makeRequire(null, {
                skipMap: !0
            })([t]), !0) : void 0
        }
        function r(t) {
            var e, i = t ? t.indexOf("!") : -1;
            return i > -1 && (e = t.substring(0, i), t = t.substring(i + 1, t.length)),
            [e, t]
        }
        function o(t, e, n, s) {
            var o, a, h, c, l = null,
            u = e ? e.name: null,
            p = t,
            d = !0,
            f = "";
            return t || (d = !1, t = "_@r" + (D += 1)),
            c = r(t),
            l = c[0],
            t = c[1],
            l && (l = i(l, u, s), a = getOwn(X, l)),
            t && (l ? f = a && a.normalize ? a.normalize(t,
            function(t) {
                return i(t, u, s)
            }) : -1 === t.indexOf("!") ? i(t, u, s) : t: (f = i(t, u, s), c = r(f), l = c[0], f = c[1], n = !0, o = b.nameToUrl(f))),
            h = !l || a || n ? "": "_unnormalized" + (q += 1),
            {
                prefix: l,
                name: f,
                parentMap: e,
                unnormalized: !!h,
                url: o,
                originalName: p,
                isDefine: d,
                id: (l ? l + "!" + f: f) + h
            }
        }
        function a(t) {
            var e = t.id,
            i = getOwn(E, e);
            return i || (i = E[e] = new b.Module(t)),
            i
        }
        function h(t, e, i) {
            var n = t.id,
            s = getOwn(E, n); ! hasProp(X, n) || s && !s.defineEmitComplete ? (s = a(t), s.error && "error" === e ? i(s.error) : s.on(e, i)) : "defined" === e && i(X[n])
        }
        function c(t, e) {
            var i = t.requireModules,
            n = !1;
            e ? e(t) : (each(i,
            function(e) {
                var i = getOwn(E, e);
                i && (i.error = t, i.events.error && (n = !0, i.emit("error", t)))
            }), n || req.onError(t))
        }
        function l() {
            globalDefQueue.length && (each(globalDefQueue,
            function(t) {
                var e = t[0];
                "string" == typeof e && (b.defQueueMap[e] = !0),
                P.push(t)
            }), globalDefQueue = [])
        }
        function u(t) {
            delete E[t],
            delete _[t]
        }
        function p(t, e, i) {
            var n = t.map.id;
            t.error ? t.emit("error", t.error) : (e[n] = !0, each(t.depMaps,
            function(n, s) {
                var r = n.id,
                o = getOwn(E, r); ! o || t.depMatched[s] || i[r] || (getOwn(e, r) ? (t.defineDep(s, X[r]), t.check()) : p(o, e, i))
            }), i[n] = !0)
        }
        function d() {
            var t, e, i = 1e3 * T.waitSeconds,
            r = i && b.startTime + i < (new Date).getTime(),
            o = [],
            a = [],
            h = !1,
            l = !0;
            if (!x) {
                if (x = !0, eachProp(_,
                function(t) {
                    var i = t.map,
                    c = i.id;
                    if (t.enabled && (i.isDefine || a.push(t), !t.error)) if (!t.inited && r) s(c) ? (e = !0, h = !0) : (o.push(c), n(c));
                    else if (!t.inited && t.fetched && i.isDefine && (h = !0, !i.prefix)) return l = !1
                }), r && o.length) return t = makeError("timeout", "Load timeout for modules: " + o, null, o),
                t.contextName = b.contextName,
                c(t);
                l && each(a,
                function(t) {
                    p(t, {},
                    {})
                }),
                r && !e || !h || !isBrowser && !isWebWorker || S || (S = setTimeout(function() {
                    S = 0,
                    d()
                },
                50)),
                x = !1
            }
        }
        function f(t) {
            hasProp(X, t[0]) || a(o(t[0], null, !0)).init(t[1], t[2])
        }
        function m(t, e, i, n) {
            t.detachEvent && !isOpera ? n && t.detachEvent(n, e) : t.removeEventListener(i, e, !1)
        }
        function g(t) {
            var e = t.currentTarget || t.srcElement;
            return m(e, b.onScriptLoad, "load", "onreadystatechange"),
            m(e, b.onScriptError, "error"),
            {
                node: e,
                id: e && e.getAttribute("data-requiremodule")
            }
        }
        function v() {
            var t;
            for (l(); P.length;) {
                if (t = P.shift(), null === t[0]) return c(makeError("mismatch", "Mismatched anonymous define() module: " + t[t.length - 1]));
                f(t)
            }
            b.defQueueMap = {}
        }
        var x, y, b, w, S, T = {
            waitSeconds: 7,
            baseUrl: "./",
            paths: {},
            bundles: {},
            pkgs: {},
            shim: {},
            config: {}
        },
        E = {},
        _ = {},
        k = {},
        P = [],
        X = {},
        M = {},
        Y = {},
        D = 1,
        q = 1;
        return w = {
            require: function(t) {
                return t.require ? t.require: t.require = b.makeRequire(t.map)
            },
            exports: function(t) {
                return t.usingExports = !0,
                t.map.isDefine ? t.exports ? X[t.map.id] = t.exports: t.exports = X[t.map.id] = {}: void 0
            },
            module: function(t) {
                return t.module ? t.module: t.module = {
                    id: t.map.id,
                    uri: t.map.url,
                    config: function() {
                        return getOwn(T.config, t.map.id) || {}
                    },
                    exports: t.exports || (t.exports = {})
                }
            }
        },
        y = function(t) {
            this.events = getOwn(k, t.id) || {},
            this.map = t,
            this.shim = getOwn(T.shim, t.id),
            this.depExports = [],
            this.depMaps = [],
            this.depMatched = [],
            this.pluginMaps = {},
            this.depCount = 0
        },
        y.prototype = {
            init: function(t, e, i, n) {
                n = n || {},
                this.inited || (this.factory = e, i ? this.on("error", i) : this.events.error && (i = bind(this,
                function(t) {
                    this.emit("error", t)
                })), this.depMaps = t && t.slice(0), this.errback = i, this.inited = !0, this.ignore = n.ignore, n.enabled || this.enabled ? this.enable() : this.check())
            },
            defineDep: function(t, e) {
                this.depMatched[t] || (this.depMatched[t] = !0, this.depCount -= 1, this.depExports[t] = e)
            },
            fetch: function() {
                if (!this.fetched) {
                    this.fetched = !0,
                    b.startTime = (new Date).getTime();
                    var t = this.map;
                    return this.shim ? void b.makeRequire(this.map, {
                        enableBuildCallback: !0
                    })(this.shim.deps || [], bind(this,
                    function() {
                        return t.prefix ? this.callPlugin() : this.load()
                    })) : t.prefix ? this.callPlugin() : this.load()
                }
            },
            load: function() {
                var t = this.map.url;
                M[t] || (M[t] = !0, b.load(this.map.id, t))
            },
            check: function() {
                if (this.enabled && !this.enabling) {
                    var t, e, i = this.map.id,
                    n = this.depExports,
                    s = this.exports,
                    r = this.factory;
                    if (this.inited) {
                        if (this.error) this.emit("error", this.error);
                        else if (!this.defining) {
                            if (this.defining = !0, this.depCount < 1 && !this.defined) {
                                if (isFunction(r)) {
                                    if (this.events.error && this.map.isDefine || req.onError !== defaultOnError) try {
                                        s = b.execCb(i, r, n, s)
                                    } catch(o) {
                                        t = o
                                    } else s = b.execCb(i, r, n, s);
                                    if (this.map.isDefine && void 0 === s && (e = this.module, e ? s = e.exports: this.usingExports && (s = this.exports)), t) return t.requireMap = this.map,
                                    t.requireModules = this.map.isDefine ? [this.map.id] : null,
                                    t.requireType = this.map.isDefine ? "define": "require",
                                    c(this.error = t)
                                } else s = r;
                                this.exports = s,
                                this.map.isDefine && !this.ignore && (X[i] = s, req.onResourceLoad && req.onResourceLoad(b, this.map, this.depMaps)),
                                u(i),
                                this.defined = !0
                            }
                            this.defining = !1,
                            this.defined && !this.defineEmitted && (this.defineEmitted = !0, this.emit("defined", this.exports), this.defineEmitComplete = !0)
                        }
                    } else hasProp(b.defQueueMap, i) || this.fetch()
                }
            },
            callPlugin: function() {
                var t = this.map,
                e = t.id,
                n = o(t.prefix);
                this.depMaps.push(n),
                h(n, "defined", bind(this,
                function(n) {
                    var s, r, l, p = getOwn(Y, this.map.id),
                    d = this.map.name,
                    f = this.map.parentMap ? this.map.parentMap.name: null,
                    m = b.makeRequire(t.parentMap, {
                        enableBuildCallback: !0
                    });
                    return this.map.unnormalized ? (n.normalize && (d = n.normalize(d,
                    function(t) {
                        return i(t, f, !0)
                    }) || ""), r = o(t.prefix + "!" + d, this.map.parentMap), h(r, "defined", bind(this,
                    function(t) {
                        this.init([],
                        function() {
                            return t
                        },
                        null, {
                            enabled: !0,
                            ignore: !0
                        })
                    })), l = getOwn(E, r.id), void(l && (this.depMaps.push(r), this.events.error && l.on("error", bind(this,
                    function(t) {
                        this.emit("error", t)
                    })), l.enable()))) : p ? (this.map.url = b.nameToUrl(p), void this.load()) : (s = bind(this,
                    function(t) {
                        this.init([],
                        function() {
                            return t
                        },
                        null, {
                            enabled: !0
                        })
                    }), s.error = bind(this,
                    function(t) {
                        this.inited = !0,
                        this.error = t,
                        t.requireModules = [e],
                        eachProp(E,
                        function(t) {
                            0 === t.map.id.indexOf(e + "_unnormalized") && u(t.map.id)
                        }),
                        c(t)
                    }), s.fromText = bind(this,
                    function(i, n) {
                        var r = t.name,
                        h = o(r),
                        l = useInteractive;
                        n && (i = n),
                        l && (useInteractive = !1),
                        a(h),
                        hasProp(T.config, e) && (T.config[r] = T.config[e]);
                        try {
                            req.exec(i)
                        } catch(u) {
                            return c(makeError("fromtexteval", "fromText eval for " + e + " failed: " + u, u, [e]))
                        }
                        l && (useInteractive = !0),
                        this.depMaps.push(h),
                        b.completeLoad(r),
                        m([r], s)
                    }), void n.load(t.name, m, s, T))
                })),
                b.enable(n, this),
                this.pluginMaps[n.id] = n
            },
            enable: function() {
                _[this.map.id] = this,
                this.enabled = !0,
                this.enabling = !0,
                each(this.depMaps, bind(this,
                function(t, e) {
                    var i, n, s;
                    if ("string" == typeof t) {
                        if (t = o(t, this.map.isDefine ? this.map: this.map.parentMap, !1, !this.skipMap), this.depMaps[e] = t, s = getOwn(w, t.id)) return void(this.depExports[e] = s(this));
                        this.depCount += 1,
                        h(t, "defined", bind(this,
                        function(t) {
                            this.undefed || (this.defineDep(e, t), this.check())
                        })),
                        this.errback ? h(t, "error", bind(this, this.errback)) : this.events.error && h(t, "error", bind(this,
                        function(t) {
                            this.emit("error", t)
                        }))
                    }
                    i = t.id,
                    n = E[i],
                    hasProp(w, i) || !n || n.enabled || b.enable(t, this)
                })),
                eachProp(this.pluginMaps, bind(this,
                function(t) {
                    var e = getOwn(E, t.id);
                    e && !e.enabled && b.enable(t, this)
                })),
                this.enabling = !1,
                this.check()
            },
            on: function(t, e) {
                var i = this.events[t];
                i || (i = this.events[t] = []),
                i.push(e)
            },
            emit: function(t, e) {
                each(this.events[t],
                function(t) {
                    t(e)
                }),
                "error" === t && delete this.events[t]
            }
        },
        b = {
            config: T,
            contextName: t,
            registry: E,
            defined: X,
            urlFetched: M,
            defQueue: P,
            defQueueMap: {},
            Module: y,
            makeModuleMap: o,
            nextTick: req.nextTick,
            onError: c,
            configure: function(t) {
                t.baseUrl && "/" !== t.baseUrl.charAt(t.baseUrl.length - 1) && (t.baseUrl += "/");
                var e = T.shim,
                i = {
                    paths: !0,
                    bundles: !0,
                    config: !0,
                    map: !0
                };
                eachProp(t,
                function(t, e) {
                    i[e] ? (T[e] || (T[e] = {}), mixin(T[e], t, !0, !0)) : T[e] = t
                }),
                t.bundles && eachProp(t.bundles,
                function(t, e) {
                    each(t,
                    function(t) {
                        t !== e && (Y[t] = e)
                    })
                }),
                t.shim && (eachProp(t.shim,
                function(t, i) {
                    isArray(t) && (t = {
                        deps: t
                    }),
                    !t.exports && !t.init || t.exportsFn || (t.exportsFn = b.makeShimExports(t)),
                    e[i] = t
                }), T.shim = e),
                t.packages && each(t.packages,
                function(t) {
                    var e, i;
                    t = "string" == typeof t ? {
                        name: t
                    }: t,
                    i = t.name,
                    e = t.location,
                    e && (T.paths[i] = t.location),
                    T.pkgs[i] = t.name + "/" + (t.main || "main").replace(currDirRegExp, "").replace(jsSuffixRegExp, "")
                }),
                eachProp(E,
                function(t, e) {
                    t.inited || t.map.unnormalized || (t.map = o(e, null, !0))
                }),
                (t.deps || t.callback) && b.require(t.deps || [], t.callback)
            },
            makeShimExports: function(t) {
                function e() {
                    var e;
                    return t.init && (e = t.init.apply(global, arguments)),
                    e || t.exports && getGlobal(t.exports)
                }
                return e
            },
            makeRequire: function(e, s) {
                function r(i, n, h) {
                    var l, u, p;
                    return s.enableBuildCallback && n && isFunction(n) && (n.__requireJsBuild = !0),
                    "string" == typeof i ? isFunction(n) ? c(makeError("requireargs", "Invalid require call"), h) : e && hasProp(w, i) ? w[i](E[e.id]) : req.get ? req.get(b, i, e, r) : (u = o(i, e, !1, !0), l = u.id, hasProp(X, l) ? X[l] : c(makeError("notloaded", 'Module name "' + l + '" has not been loaded yet for context: ' + t + (e ? "": ". Use require([])")))) : (v(), b.nextTick(function() {
                        v(),
                        p = a(o(null, e)),
                        p.skipMap = s.skipMap,
                        p.init(i, n, h, {
                            enabled: !0
                        }),
                        d()
                    }), r)
                }
                return s = s || {},
                mixin(r, {
                    isBrowser: isBrowser,
                    toUrl: function(t) {
                        var n, s = t.lastIndexOf("."),
                        r = t.split("/")[0],
                        o = "." === r || ".." === r;
                        return - 1 !== s && (!o || s > 1) && (n = t.substring(s, t.length), t = t.substring(0, s)),
                        b.nameToUrl(i(t, e && e.id, !0), n, !0)
                    },
                    defined: function(t) {
                        return hasProp(X, o(t, e, !1, !0).id)
                    },
                    specified: function(t) {
                        return t = o(t, e, !1, !0).id,
                        hasProp(X, t) || hasProp(E, t)
                    }
                }),
                e || (r.undef = function(t) {
                    l();
                    var i = o(t, e, !0),
                    s = getOwn(E, t);
                    s.undefed = !0,
                    n(t),
                    delete X[t],
                    delete M[i.url],
                    delete k[t],
                    eachReverse(P,
                    function(e, i) {
                        e[0] === t && P.splice(i, 1)
                    }),
                    delete b.defQueueMap[t],
                    s && (s.events.defined && (k[t] = s.events), u(t))
                }),
                r
            },
            enable: function(t) {
                var e = getOwn(E, t.id);
                e && a(t).enable()
            },
            completeLoad: function(t) {
                var e, i, n, r = getOwn(T.shim, t) || {},
                o = r.exports;
                for (l(); P.length;) {
                    if (i = P.shift(), null === i[0]) {
                        if (i[0] = t, e) break;
                        e = !0
                    } else i[0] === t && (e = !0);
                    f(i)
                }
                if (b.defQueueMap = {},
                n = getOwn(E, t), !e && !hasProp(X, t) && n && !n.inited) {
                    if (! (!T.enforceDefine || o && getGlobal(o))) return s(t) ? void 0 : c(makeError("nodefine", "No define call for " + t, null, [t]));
                    f([t, r.deps || [], r.exportsFn])
                }
                d()
            },
            nameToUrl: function(t, e, i) {
                var n, s, r, o, a, h, c, l = getOwn(T.pkgs, t);
                if (l && (t = l), c = getOwn(Y, t)) return b.nameToUrl(c, e, i);
                if (req.jsExtRegExp.test(t)) a = t + (e || "");
                else {
                    for (n = T.paths, s = t.split("/"), r = s.length; r > 0; r -= 1) if (o = s.slice(0, r).join("/"), h = getOwn(n, o)) {
                        isArray(h) && (h = h[0]),
                        s.splice(0, r, h);
                        break
                    }
                    a = s.join("/"),
                    a += e || (/^data\:|\?/.test(a) || i ? "": ".js"),
                    a = ("/" === a.charAt(0) || a.match(/^[\w\+\.\-]+:/) ? "": T.baseUrl) + a
                }
                return T.urlArgs ? a + (( - 1 === a.indexOf("?") ? "?": "&") + T.urlArgs) : a
            },
            load: function(t, e) {
                req.load(b, t, e)
            },
            execCb: function(t, e, i, n) {
                return e.apply(n, i)
            },
            onScriptLoad: function(t) {
                if ("load" === t.type || readyRegExp.test((t.currentTarget || t.srcElement).readyState)) {
                    interactiveScript = null;
                    var e = g(t);
                    b.completeLoad(e.id)
                }
            },
            onScriptError: function(t) {
                var e = g(t);
                return s(e.id) ? void 0 : c(makeError("scripterror", "Script error for: " + e.id, t, [e.id]))
            }
        },
        b.require = b.makeRequire(),
        b
    }
    function getInteractiveScript() {
        return interactiveScript && "interactive" === interactiveScript.readyState ? interactiveScript: (eachReverse(scripts(),
        function(t) {
            return "interactive" === t.readyState ? interactiveScript = t: void 0
        }), interactiveScript)
    }
    var req, s, head, baseElement, dataMain, src, interactiveScript, currentlyAddingScript, mainScript, subPath, version = "2.1.20",
    commentRegExp = /(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/gm,
    cjsRequireRegExp = /[^.]\s*require\s*\(\s*["']([^'"\s]+)["']\s*\)/g,
    jsSuffixRegExp = /\.js$/,
    currDirRegExp = /^\.\//,
    op = Object.prototype,
    ostring = op.toString,
    hasOwn = op.hasOwnProperty,
    ap = Array.prototype,
    isBrowser = !("undefined" == typeof window || "undefined" == typeof navigator || !window.document),
    isWebWorker = !isBrowser && "undefined" != typeof importScripts,
    readyRegExp = isBrowser && "PLAYSTATION 3" === navigator.platform ? /^complete$/: /^(complete|loaded)$/,
    defContextName = "_",
    isOpera = "undefined" != typeof opera && "[object Opera]" === opera.toString(),
    contexts = {},
    cfg = {},
    globalDefQueue = [],
    useInteractive = !1;
    if ("undefined" == typeof define) {
        if ("undefined" != typeof requirejs) {
            if (isFunction(requirejs)) return;
            cfg = requirejs,
            requirejs = void 0
        }
        "undefined" == typeof require || isFunction(require) || (cfg = require, require = void 0),
        req = requirejs = function(t, e, i, n) {
            var s, r, o = defContextName;
            return isArray(t) || "string" == typeof t || (r = t, isArray(e) ? (t = e, e = i, i = n) : t = []),
            r && r.context && (o = r.context),
            s = getOwn(contexts, o),
            s || (s = contexts[o] = req.s.newContext(o)),
            r && s.configure(r),
            s.require(t, e, i)
        },
        req.config = function(t) {
            return req(t)
        },
        req.nextTick = "undefined" != typeof setTimeout ?
        function(t) {
            setTimeout(t, 4)
        }: function(t) {
            t()
        },
        require || (require = req),
        req.version = version,
        req.jsExtRegExp = /^\/|:|\?|\.js$/,
        req.isBrowser = isBrowser,
        s = req.s = {
            contexts: contexts,
            newContext: newContext
        },
        req({}),
        each(["toUrl", "undef", "defined", "specified"],
        function(t) {
            req[t] = function() {
                var e = contexts[defContextName];
                return e.require[t].apply(e, arguments)
            }
        }),
        isBrowser && (head = s.head = document.getElementsByTagName("head")[0], baseElement = document.getElementsByTagName("base")[0], baseElement && (head = s.head = baseElement.parentNode)),
        req.onError = defaultOnError,
        req.createNode = function(t, e, i) {
            var n = t.xhtml ? document.createElementNS("http://www.w3.org/1999/xhtml", "html:script") : document.createElement("script");
            return n.type = t.scriptType || "text/javascript",
            n.charset = "utf-8",
            n.async = !0,
            n
        },
        req.load = function(t, e, i) {
            var n, s = t && t.config || {};
            if (isBrowser) return n = req.createNode(s, e, i),
            s.onNodeCreated && s.onNodeCreated(n, s, e, i),
            n.setAttribute("data-requirecontext", t.contextName),
            n.setAttribute("data-requiremodule", e),
            !n.attachEvent || n.attachEvent.toString && n.attachEvent.toString().indexOf("[native code") < 0 || isOpera ? (n.addEventListener("load", t.onScriptLoad, !1), n.addEventListener("error", t.onScriptError, !1)) : (useInteractive = !0, n.attachEvent("onreadystatechange", t.onScriptLoad)),
            n.src = i,
            currentlyAddingScript = n,
            baseElement ? head.insertBefore(n, baseElement) : head.appendChild(n),
            currentlyAddingScript = null,
            n;
            if (isWebWorker) try {
                importScripts(i),
                t.completeLoad(e)
            } catch(r) {
                t.onError(makeError("importscripts", "importScripts failed for " + e + " at " + i, r, [e]))
            }
        },
        isBrowser && !cfg.skipDataMain && eachReverse(scripts(),
        function(t) {
            return head || (head = t.parentNode),
            dataMain = t.getAttribute("data-main"),
            dataMain ? (mainScript = dataMain, cfg.baseUrl || (src = mainScript.split("/"), mainScript = src.pop(), subPath = src.length ? src.join("/") + "/": "./", cfg.baseUrl = subPath), mainScript = mainScript.replace(jsSuffixRegExp, ""), req.jsExtRegExp.test(mainScript) && (mainScript = dataMain), cfg.deps = cfg.deps ? cfg.deps.concat(mainScript) : [mainScript], !0) : void 0
        }),
        define = function(t, e, i) {
            var n, s;
            "string" != typeof t && (i = e, e = t, t = null),
            isArray(e) || (i = e, e = null),
            !e && isFunction(i) && (e = [], i.length && (i.toString().replace(commentRegExp, "").replace(cjsRequireRegExp,
            function(t, i) {
                e.push(i)
            }), e = (1 === i.length ? ["require"] : ["require", "exports", "module"]).concat(e))),
            useInteractive && (n = currentlyAddingScript || getInteractiveScript(), n && (t || (t = n.getAttribute("data-requiremodule")), s = contexts[n.getAttribute("data-requirecontext")])),
            s ? (s.defQueue.push([t, e, i]), s.defQueueMap[t] = !0) : globalDefQueue.push([t, e, i])
        },
        define.amd = {
            jQuery: !0
        },
        req.exec = function(text) {
            return eval(text)
        },
        req(cfg)
    }
} (this),
function(t) {
    String.prototype.trim === t && (String.prototype.trim = function() {
        return this.replace(/^\s+/, "").replace(/\s+$/, "")
    }),
    Array.prototype.reduce === t && (Array.prototype.reduce = function(e) {
        if (void 0 === this || null === this) throw new TypeError;
        var i, n = Object(this),
        s = n.length >>> 0,
        r = 0;
        if ("function" != typeof e) throw new TypeError;
        if (0 == s && 1 == arguments.length) throw new TypeError;
        if (arguments.length >= 2) i = arguments[1];
        else for (;;) {
            if (r in n) {
                i = n[r++];
                break
            }
            if (++r >= s) throw new TypeError
        }
        for (; s > r;) r in n && (i = e.call(t, i, n[r], r, n)),
        r++;
        return i
    })
} ();
var Zepto = function() {
    function t(t) {
        return "[object Function]" == L.call(t)
    }
    function e(t) {
        return t instanceof Object
    }
    function i(e) {
        var i, n;
        if ("[object Object]" !== L.call(e)) return ! 1;
        if (n = t(e.constructor) && e.constructor.prototype, !n || !hasOwnProperty.call(n, "isPrototypeOf")) return ! 1;
        for (i in e);
        return i === m || hasOwnProperty.call(e, i)
    }
    function n(t) {
        return t instanceof Array
    }
    function s(t) {
        return "number" == typeof t.length
    }
    function r(t) {
        return t.filter(function(t) {
            return t !== m && null !== t
        })
    }
    function o(t) {
        return t.length > 0 ? [].concat.apply([], t) : t
    }
    function a(t) {
        return t.replace(/::/g, "/").replace(/([A-Z]+)([A-Z][a-z])/g, "$1_$2").replace(/([a-z\d])([A-Z])/g, "$1_$2").replace(/_/g, "-").toLowerCase()
    }
    function h(t) {
        return t in _ ? _[t] : _[t] = new RegExp("(^|\\s)" + t + "(\\s|$)")
    }
    function c(t, e) {
        return "number" != typeof e || P[a(t)] ? e: e + "px"
    }
    function l(t) {
        var e, i;
        return E[t] || (e = T.createElement(t), T.body.appendChild(e), i = k(e, "").getPropertyValue("display"), e.parentNode.removeChild(e), "none" == i && (i = "block"), E[t] = i),
        E[t]
    }
    function u(t, e) {
        return e === m ? v(t) : v(t).filter(e)
    }
    function p(e, i, n, s) {
        return t(i) ? i.call(e, n, s) : i
    }
    function d(t, e, i) {
        var n = t % 2 ? e: e.parentNode;
        n ? n.insertBefore(i, t ? 1 == t ? n.firstChild: 2 == t ? e: null: e.nextSibling) : v(i).remove()
    }
    function f(t, e) {
        e(t);
        for (var i in t.childNodes) f(t.childNodes[i], e)
    }
    var m, g, v, x, y, b, w = [],
    S = w.slice,
    T = window.document,
    E = {},
    _ = {},
    k = T.defaultView.getComputedStyle,
    P = {
        "column-count": 1,
        columns: 1,
        "font-weight": 1,
        "line-height": 1,
        opacity: 1,
        "z-index": 1,
        zoom: 1
    },
    X = /^\s*<(\w+|!)[^>]*>/,
    M = [1, 3, 8, 9, 11],
    Y = ["after", "prepend", "before", "append"],
    D = T.createElement("table"),
    q = T.createElement("tr"),
    C = {
        tr: T.createElement("tbody"),
        tbody: D,
        thead: D,
        tfoot: D,
        td: q,
        th: q,
        "*": T.createElement("div")
    },
    A = /complete|loaded|interactive/,
    O = /^\.([\w-]+)$/,
    z = /^#([\w-]+)$/,
    j = /^[\w-]+$/,
    L = {}.toString,
    B = {},
    R = T.createElement("div");
    return B.matches = function(t, e) {
        if (!t || 1 !== t.nodeType) return ! 1;
        var i = t.webkitMatchesSelector || t.mozMatchesSelector || t.oMatchesSelector || t.matchesSelector;
        if (i) return i.call(t, e);
        var n, s = t.parentNode,
        r = !s;
        return r && (s = R).appendChild(t),
        n = ~B.qsa(s, e).indexOf(t),
        r && R.removeChild(t),
        n
    },
    y = function(t) {
        return t.replace(/-+(.)?/g,
        function(t, e) {
            return e ? e.toUpperCase() : ""
        })
    },
    b = function(t) {
        return t.filter(function(e, i) {
            return t.indexOf(e) == i
        })
    },
    B.fragment = function(t, e) {
        e === m && (e = X.test(t) && RegExp.$1),
        e in C || (e = "*");
        var i = C[e];
        return i.innerHTML = "" + t,
        v.each(S.call(i.childNodes),
        function() {
            i.removeChild(this)
        })
    },
    B.Z = function(t, e) {
        return t = t || [],
        t.__proto__ = arguments.callee.prototype,
        t.selector = e || "",
        t
    },
    B.isZ = function(t) {
        return t instanceof B.Z
    },
    B.init = function(e, s) {
        if (!e) return B.Z();
        if (t(e)) return v(T).ready(e);
        if (B.isZ(e)) return e;
        var o;
        if (n(e)) o = r(e);
        else if (i(e)) o = [v.extend({},
        e)],
        e = null;
        else if (M.indexOf(e.nodeType) >= 0 || e === window) o = [e],
        e = null;
        else if (X.test(e)) o = B.fragment(e.trim(), RegExp.$1),
        e = null;
        else {
            if (s !== m) return v(s).find(e);
            o = B.qsa(T, e)
        }
        return B.Z(o, e)
    },
    v = function(t, e) {
        return B.init(t, e)
    },
    v.extend = function(t) {
        return S.call(arguments, 1).forEach(function(e) {
            for (g in e) e[g] !== m && (t[g] = e[g])
        }),
        t
    },
    B.qsa = function(t, e) {
        var i;
        return t === T && z.test(e) ? (i = t.getElementById(RegExp.$1)) ? [i] : w: 1 !== t.nodeType && 9 !== t.nodeType ? w: S.call(O.test(e) ? t.getElementsByClassName(RegExp.$1) : j.test(e) ? t.getElementsByTagName(e) : t.querySelectorAll(e))
    },
    v.isFunction = t,
    v.isObject = e,
    v.isArray = n,
    v.isPlainObject = i,
    v.inArray = function(t, e, i) {
        return w.indexOf.call(e, t, i)
    },
    v.trim = function(t) {
        return t.trim()
    },
    v.uuid = 0,
    v.map = function(t, e) {
        var i, n, r, a = [];
        if (s(t)) for (n = 0; n < t.length; n++) i = e(t[n], n),
        null != i && a.push(i);
        else for (r in t) i = e(t[r], r),
        null != i && a.push(i);
        return o(a)
    },
    v.each = function(t, e) {
        var i, n;
        if (s(t)) {
            for (i = 0; i < t.length; i++) if (e.call(t[i], i, t[i]) === !1) return t
        } else for (n in t) if (e.call(t[n], n, t[n]) === !1) return t;
        return t
    },
    v.fn = {
        forEach: w.forEach,
        reduce: w.reduce,
        push: w.push,
        indexOf: w.indexOf,
        concat: w.concat,
        map: function(t) {
            return v.map(this,
            function(e, i) {
                return t.call(e, i, e)
            })
        },
        slice: function() {
            return v(S.apply(this, arguments))
        },
        ready: function(t) {
            return A.test(T.readyState) ? t(v) : T.addEventListener("DOMContentLoaded",
            function() {
                t(v)
            },
            !1),
            this
        },
        get: function(t) {
            return t === m ? S.call(this) : this[t]
        },
        toArray: function() {
            return this.get()
        },
        size: function() {
            return this.length
        },
        remove: function() {
            return this.each(function() {
                null != this.parentNode && this.parentNode.removeChild(this)
            })
        },
        each: function(t) {
            return this.forEach(function(e, i) {
                t.call(e, i, e)
            }),
            this
        },
        filter: function(t) {
            return v([].filter.call(this,
            function(e) {
                return B.matches(e, t)
            }))
        },
        add: function(t, e) {
            return v(b(this.concat(v(t, e))))
        },
        is: function(t) {
            return this.length > 0 && B.matches(this[0], t)
        },
        not: function(e) {
            var i = [];
            if (t(e) && e.call !== m) this.each(function(t) {
                e.call(this, t) || i.push(this)
            });
            else {
                var n = "string" == typeof e ? this.filter(e) : s(e) && t(e.item) ? S.call(e) : v(e);
                this.forEach(function(t) {
                    n.indexOf(t) < 0 && i.push(t)
                })
            }
            return v(i)
        },
        eq: function(t) {
            return - 1 === t ? this.slice(t) : this.slice(t, +t + 1)
        },
        first: function() {
            var t = this[0];
            return t && !e(t) ? t: v(t)
        },
        last: function() {
            var t = this[this.length - 1];
            return t && !e(t) ? t: v(t)
        },
        find: function(t) {
            var e;
            return e = 1 == this.length ? B.qsa(this[0], t) : this.map(function() {
                return B.qsa(this, t)
            }),
            v(e)
        },
        closest: function(t, e) {
            for (var i = this[0]; i && !B.matches(i, t);) i = i !== e && i !== T && i.parentNode;
            return v(i)
        },
        parents: function(t) {
            for (var e = [], i = this; i.length > 0;) i = v.map(i,
            function(t) {
                return (t = t.parentNode) && t !== T && e.indexOf(t) < 0 ? (e.push(t), t) : void 0
            });
            return u(e, t)
        },
        parent: function(t) {
            return u(b(this.pluck("parentNode")), t)
        },
        children: function(t) {
            return u(this.map(function() {
                return S.call(this.children)
            }), t)
        },
        siblings: function(t) {
            return u(this.map(function(t, e) {
                return S.call(e.parentNode.children).filter(function(t) {
                    return t !== e
                })
            }), t)
        },
        empty: function() {
            return this.each(function() {
                this.innerHTML = ""
            })
        },
        pluck: function(t) {
            return this.map(function() {
                return this[t]
            })
        },
        show: function() {
            return this.each(function() {
                "none" == this.style.display && (this.style.display = null),
                "none" == k(this, "").getPropertyValue("display") && (this.style.display = l(this.nodeName))
            })
        },
        replaceWith: function(t) {
            return this.before(t).remove()
        },
        wrap: function(t) {
            return this.each(function() {
                v(this).wrapAll(v(t)[0].cloneNode(!1))
            })
        },
        wrapAll: function(t) {
            return this[0] && (v(this[0]).before(t = v(t)), t.append(this)),
            this
        },
        unwrap: function() {
            return this.parent().each(function() {
                v(this).replaceWith(v(this).children())
            }),
            this
        },
        clone: function() {
            return v(this.map(function() {
                return this.cloneNode(!0)
            }))
        },
        hide: function() {
            return this.css("display", "none")
        },
        toggle: function(t) {
            return (t === m ? "none" == this.css("display") : t) ? this.show() : this.hide()
        },
        prev: function() {
            return v(this.pluck("previousElementSibling"))
        },
        next: function() {
            return v(this.pluck("nextElementSibling"))
        },
        html: function(t) {
            return t === m ? this.length > 0 ? this[0].innerHTML: null: this.each(function(e) {
                var i = this.innerHTML;
                v(this).empty().append(p(this, t, e, i))
            })
        },
        text: function(t) {
            return t === m ? this.length > 0 ? this[0].textContent: null: this.each(function() {
                this.textContent = t
            })
        },
        attr: function(t, i) {
            var n;
            return "string" == typeof t && i === m ? 0 == this.length || 1 !== this[0].nodeType ? m: "value" == t && "INPUT" == this[0].nodeName ? this.val() : !(n = this[0].getAttribute(t)) && t in this[0] ? this[0][t] : n: this.each(function(n) {
                if (1 === this.nodeType) if (e(t)) for (g in t) this.setAttribute(g, t[g]);
                else this.setAttribute(t, p(this, i, n, this.getAttribute(t)))
            })
        },
        removeAttr: function(t) {
            return this.each(function() {
                1 === this.nodeType && this.removeAttribute(t)
            })
        },
        prop: function(t, e) {
            return e === m ? this[0] ? this[0][t] : m: this.each(function(i) {
                this[t] = p(this, e, i, this[t])
            })
        },
        data: function(t, e) {
            var i = this.attr("data-" + a(t), e);
            return null !== i ? i: m
        },
        val: function(t) {
            return t === m ? this.length > 0 ? this[0].value: m: this.each(function(e) {
                this.value = p(this, t, e, this.value)
            })
        },
        offset: function() {
            if (0 == this.length) return null;
            var t = this[0].getBoundingClientRect();
            return {
                left: t.left + window.pageXOffset,
                top: t.top + window.pageYOffset,
                width: t.width,
                height: t.height
            }
        },
        css: function(t, e) {
            if (e === m && "string" == typeof t) return 0 == this.length ? m: this[0].style[y(t)] || k(this[0], "").getPropertyValue(t);
            var i = "";
            for (g in t)"string" == typeof t[g] && "" == t[g] ? this.each(function() {
                this.style.removeProperty(a(g))
            }) : i += a(g) + ":" + c(g, t[g]) + ";";
            return "string" == typeof t && ("" == e ? this.each(function() {
                this.style.removeProperty(a(t))
            }) : i = a(t) + ":" + c(t, e)),
            this.each(function() {
                this.style.cssText += ";" + i
            })
        },
        index: function(t) {
            return t ? this.indexOf(v(t)[0]) : this.parent().children().indexOf(this[0])
        },
        hasClass: function(t) {
            return this.length < 1 ? !1 : h(t).test(this[0].className)
        },
        addClass: function(t) {
            return this.each(function(e) {
                x = [];
                var i = this.className,
                n = p(this, t, e, i);
                n.split(/\s+/g).forEach(function(t) {
                    v(this).hasClass(t) || x.push(t)
                },
                this),
                x.length && (this.className += (i ? " ": "") + x.join(" "))
            })
        },
        removeClass: function(t) {
            return this.each(function(e) {
                return t === m ? this.className = "": (x = this.className, p(this, t, e, x).split(/\s+/g).forEach(function(t) {
                    x = x.replace(h(t), " ")
                }), this.className = x.trim(), void 0)
            })
        },
        toggleClass: function(t, e) {
            return this.each(function(i) {
                var n = p(this, t, i, this.className); (e === m ? !v(this).hasClass(n) : e) ? v(this).addClass(n) : v(this).removeClass(n)
            })
        }
    },
    ["width", "height"].forEach(function(t) {
        v.fn[t] = function(e) {
            var i, n = t.replace(/./,
            function(t) {
                return t[0].toUpperCase()
            });
            return e === m ? this[0] == window ? window["inner" + n] : this[0] == T ? T.documentElement["offset" + n] : (i = this.offset()) && i[t] : this.each(function(i) {
                var n = v(this);
                n.css(t, p(this, e, i, n[t]()))
            })
        }
    }),
    Y.forEach(function(t, i) {
        v.fn[t] = function() {
            var t = v.map(arguments,
            function(t) {
                return e(t) ? t: B.fragment(t)
            });
            if (t.length < 1) return this;
            var n = this.length,
            s = n > 1,
            r = 2 > i;
            return this.each(function(e, o) {
                for (var a = 0; a < t.length; a++) {
                    var h = t[r ? t.length - a - 1 : a];
                    f(h,
                    function(t) {
                        null != t.nodeName && "SCRIPT" === t.nodeName.toUpperCase() && (!t.type || "text/javascript" === t.type) && window.eval.call(window, t.innerHTML)
                    }),
                    s && n - 1 > e && (h = h.cloneNode(!0)),
                    d(i, o, h)
                }
            })
        },
        v.fn[i % 2 ? t + "To": "insert" + (i ? "Before": "After")] = function(e) {
            return v(e)[t](this),
            this
        }
    }),
    B.Z.prototype = v.fn,
    B.camelize = y,
    B.uniq = b,
    v.zepto = B,
    v
} ();
window.Zepto = Zepto,
"$" in window || (window.$ = Zepto),
function(t) {
    function e(t) {
        return t._zid || (t._zid = u++)
    }
    function i(t, i, r, o) {
        if (i = n(i), i.ns) var a = s(i.ns);
        return (l[e(t)] || []).filter(function(t) {
            return ! (!t || i.e && t.e != i.e || i.ns && !a.test(t.ns) || r && e(t.fn) !== e(r) || o && t.sel != o)
        })
    }
    function n(t) {
        var e = ("" + t).split(".");
        return {
            e: e[0],
            ns: e.slice(1).sort().join(" ")
        }
    }
    function s(t) {
        return new RegExp("(?:^| )" + t.replace(" ", " .* ?") + "(?: |$)")
    }
    function r(e, i, n) {
        t.isObject(e) ? t.each(e, n) : e.split(/\s/).forEach(function(t) {
            n(t, i)
        })
    }
    function o(i, s, o, a, h, c) {
        c = !!c;
        var u = e(i),
        p = l[u] || (l[u] = []);
        r(s, o,
        function(e, s) {
            var r = h && h(s, e),
            o = r || s,
            l = function(t) {
                var e = o.apply(i, [t].concat(t.data));
                return e === !1 && t.preventDefault(),
                e
            },
            u = t.extend(n(e), {
                fn: s,
                proxy: l,
                sel: a,
                del: r,
                i: p.length
            });
            p.push(u),
            i.addEventListener(u.e, l, c)
        })
    }
    function a(t, n, s, o) {
        var a = e(t);
        r(n || "", s,
        function(e, n) {
            i(t, e, n, o).forEach(function(e) {
                delete l[a][e.i],
                t.removeEventListener(e.e, e.proxy, !1)
            })
        })
    }
    function h(e) {
        var i = t.extend({
            originalEvent: e
        },
        e);
        return t.each(m,
        function(t, n) {
            i[t] = function() {
                return this[n] = d,
                e[t].apply(e, arguments)
            },
            i[n] = f
        }),
        i
    }
    function c(t) {
        if (! ("defaultPrevented" in t)) {
            t.defaultPrevented = !1;
            var e = t.preventDefault;
            t.preventDefault = function() {
                this.defaultPrevented = !0,
                e.call(this)
            }
        }
    }
    var l = (t.zepto.qsa, {}),
    u = 1,
    p = {};
    p.click = p.mousedown = p.mouseup = p.mousemove = "MouseEvents",
    t.event = {
        add: o,
        remove: a
    },
    t.proxy = function(i, n) {
        if (t.isFunction(i)) {
            var s = function() {
                return i.apply(n, arguments)
            };
            return s._zid = e(i),
            s
        }
        if ("string" == typeof n) return t.proxy(i[n], i);
        throw new TypeError("expected function")
    },
    t.fn.bind = function(t, e) {
        return this.each(function() {
            o(this, t, e)
        })
    },
    t.fn.unbind = function(t, e) {
        return this.each(function() {
            a(this, t, e)
        })
    },
    t.fn.one = function(t, e) {
        return this.each(function(i, n) {
            o(this, t, e, null,
            function(t, e) {
                return function() {
                    var i = t.apply(n, arguments);
                    return a(n, e, t),
                    i
                }
            })
        })
    };
    var d = function() {
        return ! 0
    },
    f = function() {
        return ! 1
    },
    m = {
        preventDefault: "isDefaultPrevented",
        stopImmediatePropagation: "isImmediatePropagationStopped",
        stopPropagation: "isPropagationStopped"
    };
    t.fn.delegate = function(e, i, n) {
        var s = !1;
        return ("blur" == i || "focus" == i) && (t.iswebkit ? i = "blur" == i ? "focusout": "focus" == i ? "focusin": i: s = !0),
        this.each(function(r, a) {
            o(a, i, n, e,
            function(i) {
                return function(n) {
                    var s, r = t(n.target).closest(e, a).get(0);
                    return r ? (s = t.extend(h(n), {
                        currentTarget: r,
                        liveFired: a
                    }), i.apply(r, [s].concat([].slice.call(arguments, 1)))) : void 0
                }
            },
            s)
        })
    },
    t.fn.undelegate = function(t, e, i) {
        return this.each(function() {
            a(this, e, i, t)
        })
    },
    t.fn.live = function(e, i) {
        return t(document.body).delegate(this.selector, e, i),
        this
    },
    t.fn.die = function(e, i) {
        return t(document.body).undelegate(this.selector, e, i),
        this
    },
    t.fn.on = function(e, i, n) {
        return void 0 == i || t.isFunction(i) ? this.bind(e, i) : this.delegate(i, e, n)
    },
    t.fn.off = function(e, i, n) {
        return void 0 == i || t.isFunction(i) ? this.unbind(e, i) : this.undelegate(i, e, n)
    },
    t.fn.trigger = function(e, i) {
        return "string" == typeof e && (e = t.Event(e)),
        c(e),
        e.data = i,
        this.each(function() {
            "dispatchEvent" in this && this.dispatchEvent(e)
        })
    },
    t.fn.triggerHandler = function(e, n) {
        var s, r;
        return this.each(function(o, a) {
            s = h("string" == typeof e ? t.Event(e) : e),
            s.data = n,
            s.target = a,
            t.each(i(a, e.type || e),
            function(t, e) {
                return r = e.proxy(s),
                s.isImmediatePropagationStopped() ? !1 : void 0
            })
        }),
        r
    },
    "focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout change select keydown keypress keyup error".split(" ").forEach(function(e) {
        t.fn[e] = function(t) {
            return this.bind(e, t)
        }
    }),
    ["focus", "blur"].forEach(function(e) {
        t.fn[e] = function(t) {
            if (t) this.bind(e, t);
            else if (this.length) try {
                this.get(0)[e]()
            } catch(i) {}
            return this
        }
    }),
    t.Event = function(t, e) {
        var i = document.createEvent(p[t] || "Events"),
        n = !0;
        if (e) for (var s in e)"bubbles" == s ? n = !!e[s] : i[s] = e[s];
        return i.initEvent(t, n, !0, null, null, null, null, null, null, null, null, null, null, null, null),
        i
    }
} (Zepto),
function(t) {
    function e(t) {
        var e = this.os = {},
        i = this.browser = {},
        n = t.match(/WebKit\/([\d.]+)/),
        s = t.match(/(Android)\s+([\d.]+)/),
        r = t.match(/(iPad).*OS\s([\d_]+)/),
        o = !r && t.match(/(iPhone\sOS)\s([\d_]+)/),
        a = t.match(/(webOS|hpwOS)[\s\/]([\d.]+)/),
        h = a && t.match(/TouchPad/),
        c = t.match(/Kindle\/([\d.]+)/),
        l = t.match(/Silk\/([\d._]+)/),
        u = t.match(/(BlackBerry).*Version\/([\d.]+)/); (i.webkit = !!n) && (i.version = n[1]),
        s && (e.android = !0, e.version = s[2]),
        o && (e.ios = e.iphone = !0, e.version = o[2].replace(/_/g, ".")),
        r && (e.ios = e.ipad = !0, e.version = r[2].replace(/_/g, ".")),
        a && (e.webos = !0, e.version = a[2]),
        h && (e.touchpad = !0),
        u && (e.blackberry = !0, e.version = u[2]),
        c && (e.kindle = !0, e.version = c[1]),
        l && (i.silk = !0, i.version = l[1]),
        !l && e.android && t.match(/Kindle Fire/) && (i.silk = !0)
    }
    e.call(t, navigator.userAgent),
    t.__detect = e
} (Zepto),
function(t, e) {
    function i(t) {
        return t.toLowerCase()
    }
    function n(t) {
        return s ? s + t: i(t)
    }
    var s, r = "",
    o = {
        Webkit: "webkit",
        Moz: "",
        O: "o",
        ms: "MS"
    },
    a = window.document,
    h = a.createElement("div"),
    c = /^((translate|rotate|scale)(X|Y|Z|3d)?|matrix(3d)?|perspective|skew(X|Y)?)$/i,
    l = {};
    t.each(o,
    function(t, n) {
        return h.style[t + "TransitionProperty"] !== e ? (r = "-" + i(t) + "-", s = n, !1) : void 0
    }),
    l[r + "transition-property"] = l[r + "transition-duration"] = l[r + "transition-timing-function"] = l[r + "animation-name"] = l[r + "animation-duration"] = "",
    t.fx = {
        off: s === e && h.style.transitionProperty === e,
        cssPrefix: r,
        transitionEnd: n("TransitionEnd"),
        animationEnd: n("AnimationEnd")
    },
    t.fn.animate = function(e, i, n, s) {
        return t.isObject(i) && (n = i.easing, s = i.complete, i = i.duration),
        i && (i /= 1e3),
        this.anim(e, i, n, s)
    },
    t.fn.anim = function(i, n, s, o) {
        var a, h, u, p = {},
        d = this,
        f = t.fx.transitionEnd;
        if (n === e && (n = .4), t.fx.off && (n = 0), "string" == typeof i) p[r + "animation-name"] = i,
        p[r + "animation-duration"] = n + "s",
        f = t.fx.animationEnd;
        else {
            for (h in i) c.test(h) ? (a || (a = []), a.push(h + "(" + i[h] + ")")) : p[h] = i[h];
            a && (p[r + "transform"] = a.join(" ")),
            !t.fx.off && "object" == typeof i && (p[r + "transition-property"] = Object.keys(i).join(", "), p[r + "transition-duration"] = n + "s", p[r + "transition-timing-function"] = s || "linear")
        }
        return u = function(e) {
            if ("undefined" != typeof e) {
                if (e.target !== e.currentTarget) return;
                t(e.target).unbind(f, arguments.callee)
            }
            t(this).css(l),
            o && o.call(this)
        },
        n > 0 && this.bind(f, u),
        setTimeout(function() {
            d.css(p),
            0 >= n && setTimeout(function() {
                d.each(function() {
                    u.call(this)
                })
            },
            0)
        },
        0),
        this
    },
    h = null
} (Zepto),
function(t) {
    function e(e, i, n) {
        var s = t.Event(i);
        return t(e).trigger(s, n),
        !s.defaultPrevented
    }
    function i(t, i, n, s) {
        return t.global ? e(i || x, n, s) : void 0
    }
    function n(e) {
        e.global && 0 === t.active++&&i(e, null, "ajaxStart")
    }
    function s(e) {
        e.global && !--t.active && i(e, null, "ajaxStop")
    }
    function r(t, e) {
        var n = e.context;
        return e.beforeSend.call(n, t, e) === !1 || i(e, n, "ajaxBeforeSend", [t, e]) === !1 ? !1 : void i(e, n, "ajaxSend", [t, e])
    }
    function o(t, e, n) {
        var s = n.context,
        r = "success";
        n.success.call(s, t, r, e),
        i(n, s, "ajaxSuccess", [e, n, t]),
        h(r, e, n)
    }
    function a(t, e, n, s) {
        var r = s.context;
        s.error.call(r, n, e, t),
        i(s, r, "ajaxError", [n, s, t]),
        h(e, n, s)
    }
    function h(t, e, n) {
        var r = n.context;
        n.complete.call(r, e, t),
        i(n, r, "ajaxComplete", [e, n]),
        s(n)
    }
    function c() {}
    function l(t) {
        return t && (t == T ? "html": t == S ? "json": b.test(t) ? "script": w.test(t) && "xml") || "text"
    }
    function u(t, e) {
        return (t + "&" + e).replace(/[&?]{1,2}/, "?")
    }
    function p(e) {
        v(e.data) && (e.data = t.param(e.data)),
        e.data && (!e.type || "GET" == e.type.toUpperCase()) && (e.url = u(e.url, e.data))
    }
    function d(e, i, n, s) {
        var r = t.isArray(i);
        t.each(i,
        function(i, o) {
            s && (i = n ? s: s + "[" + (r ? "": i) + "]"),
            !s && r ? e.add(o.name, o.value) : (n ? t.isArray(o) : v(o)) ? d(e, o, n, i) : e.add(i, o)
        })
    }
    var f, m, g = 0,
    v = t.isObject,
    x = window.document,
    y = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
    b = /^(?:text|application)\/javascript/i,
    w = /^(?:text|application)\/xml/i,
    S = "application/json",
    T = "text/html",
    E = /^\s*$/;
    t.active = 0,
    t.ajaxJSONP = function(e) {
        var i, n = "jsonp" + ++g,
        s = x.createElement("script"),
        r = function() {
            t(s).remove(),
            n in window && (window[n] = c),
            h("abort", a, e)
        },
        a = {
            abort: r
        };
        return e.error && (s.onerror = function() {
            a.abort(),
            e.error()
        }),
        window[n] = function(r) {
            clearTimeout(i),
            t(s).remove(),
            delete window[n],
            o(r, a, e)
        },
        p(e),
        s.src = e.url.replace(/=\?/, "=" + n),
        t("head").append(s),
        e.timeout > 0 && (i = setTimeout(function() {
            a.abort(),
            h("timeout", a, e)
        },
        e.timeout)),
        a
    },
    t.ajaxSettings = {
        type: "GET",
        beforeSend: c,
        success: c,
        error: c,
        complete: c,
        context: null,
        global: !0,
        xhr: function() {
            return new window.XMLHttpRequest
        },
        accepts: {
            script: "text/javascript, application/javascript",
            json: S,
            xml: "application/xml, text/xml",
            html: T,
            text: "text/plain"
        },
        crossDomain: !1,
        timeout: 0
    },
    t.ajax = function(e) {
        var i = t.extend({},
        e || {});
        for (f in t.ajaxSettings) void 0 === i[f] && (i[f] = t.ajaxSettings[f]);
        n(i),
        i.crossDomain || (i.crossDomain = /^([\w-]+:)?\/\/([^\/]+)/.test(i.url) && RegExp.$2 != window.location.host);
        var s = i.dataType,
        h = /=\?/.test(i.url);
        if ("jsonp" == s || h) return h || (i.url = u(i.url, "callback=?")),
        t.ajaxJSONP(i);
        i.url || (i.url = window.location.toString()),
        p(i);
        var d, g = i.accepts[s],
        v = {},
        x = /^([\w-]+:)\/\//.test(i.url) ? RegExp.$1: window.location.protocol,
        y = t.ajaxSettings.xhr();
        i.crossDomain || (v["X-Requested-With"] = "XMLHttpRequest"),
        g && (v.Accept = g, g.indexOf(",") > -1 && (g = g.split(",", 2)[0]), y.overrideMimeType && y.overrideMimeType(g)),
        (i.contentType || i.data && "GET" != i.type.toUpperCase()) && (v["Content-Type"] = i.contentType || "application/x-www-form-urlencoded"),
        i.headers = t.extend(v, i.headers || {}),
        y.onreadystatechange = function() {
            if (4 == y.readyState) {
                clearTimeout(d);
                var t, e = !1;
                if (y.status >= 200 && y.status < 300 || 304 == y.status || 0 == y.status && "file:" == x) {
                    s = s || l(y.getResponseHeader("content-type")),
                    t = y.responseText;
                    try {
                        "script" == s ? (1, eval)(t) : "xml" == s ? t = y.responseXML: "json" == s && (t = E.test(t) ? null: JSON.parse(t))
                    } catch(n) {
                        e = n
                    }
                    e ? a(e, "parsererror", y, i) : o(t, y, i)
                } else a(null, "error", y, i)
            }
        };
        var b = "async" in i ? i.async: !0;
        y.open(i.type, i.url, b);
        for (m in i.headers) y.setRequestHeader(m, i.headers[m]);
        return r(y, i) === !1 ? (y.abort(), !1) : (i.timeout > 0 && (d = setTimeout(function() {
            y.onreadystatechange = c,
            y.abort(),
            a(null, "timeout", y, i)
        },
        i.timeout)), y.send(i.data ? i.data: null), y)
    },
    t.get = function(e, i) {
        return t.ajax({
            url: e,
            success: i
        })
    },
    t.post = function(e, i, n, s) {
        return t.isFunction(i) && (s = s || n, n = i, i = null),
        t.ajax({
            type: "POST",
            url: e,
            data: i,
            success: n,
            dataType: s
        })
    },
    t.getJSON = function(e, i) {
        return t.ajax({
            url: e,
            success: i,
            dataType: "json"
        })
    },
    t.fn.load = function(e, i) {
        if (!this.length) return this;
        var n, s = this,
        r = e.split(/\s/);
        return r.length > 1 && (e = r[0], n = r[1]),
        t.get(e,
        function(e) {
            s.html(n ? t(x.createElement("div")).html(e.replace(y, "")).find(n).html() : e),
            i && i.call(s)
        }),
        this
    };
    var _ = encodeURIComponent;
    t.param = function(t, e) {
        var i = [];
        return i.add = function(t, e) {
            this.push(_(t) + "=" + _(e))
        },
        d(i, t, e),
        i.join("&").replace("%20", "+")
    }
} (Zepto),
function(t) {
    t.fn.serializeArray = function() {
        var e, i = [];
        return t(Array.prototype.slice.call(this.get(0).elements)).each(function() {
            e = t(this);
            var n = e.attr("type");
            "fieldset" != this.nodeName.toLowerCase() && !this.disabled && "submit" != n && "reset" != n && "button" != n && ("radio" != n && "checkbox" != n || this.checked) && i.push({
                name: e.attr("name"),
                value: e.val()
            })
        }),
        i
    },
    t.fn.serialize = function() {
        var t = [];
        return this.serializeArray().forEach(function(e) {
            t.push(encodeURIComponent(e.name) + "=" + encodeURIComponent(e.value))
        }),
        t.join("&")
    },
    t.fn.submit = function(e) {
        if (e) this.bind("submit", e);
        else if (this.length) {
            var i = t.Event("submit");
            this.eq(0).trigger(i),
            i.defaultPrevented || this.get(0).submit()
        }
        return this
    }
} (Zepto),
function(t) {
    function e(t) {
        return "tagName" in t ? t: t.parentNode
    }
    function i(t, e, i, n) {
        var s = Math.abs(t - e),
        r = Math.abs(i - n);
        return s >= r ? t - e > 0 ? "Left": "Right": i - n > 0 ? "Up": "Down"
    }
    function n() {
        o = null,
        a.last && (a.el.trigger("longTap"), a = {})
    }
    function s() {
        o && clearTimeout(o),
        o = null
    }
    var r, o, a = {},
    h = 750;
    t(document).ready(function() {
        var c, l;
        t(document.body).bind("touchstart",
        function(i) {
            c = Date.now(),
            l = c - (a.last || c),
            a.el = t(e(i.touches[0].target)),
            r && clearTimeout(r),
            a.x1 = i.touches[0].pageX,
            a.y1 = i.touches[0].pageY,
            l > 0 && 250 >= l && (a.isDoubleTap = !0),
            a.last = c,
            o = setTimeout(n, h)
        }).bind("touchmove",
        function(t) {
            s(),
            a.x2 = t.touches[0].pageX,
            a.y2 = t.touches[0].pageY
        }).bind("touchend",
        function(t) {
            s(),
            a.isDoubleTap ? (a.el.trigger("doubleTap"), a = {}) : a.x2 && Math.abs(a.x1 - a.x2) > 30 || a.y2 && Math.abs(a.y1 - a.y2) > 30 ? (a.el.trigger("swipe") && a.el.trigger("swipe" + i(a.x1, a.x2, a.y1, a.y2)), a = {}) : "last" in a && (a.el.trigger("tap"), r = setTimeout(function() {
                r = null,
                a.el.trigger("singleTap"),
                a = {}
            },
            250))
        }).bind("touchcancel",
        function() {
            r && clearTimeout(r),
            o && clearTimeout(o),
            o = r = null,
            a = {}
        })
    }),
    ["swipe", "swipeLeft", "swipeRight", "swipeUp", "swipeDown", "doubleTap", "tap", "singleTap", "longTap"].forEach(function(e) {
        t.fn[e] = function(t) {
            return this.bind(e, t)
        }
    })
} (Zepto),
function(t, e, i) {
    function n(t, i) {
        this.wrapper = "string" == typeof t ? e.querySelector(t) : t,
        this.scroller = this.wrapper.children[0],
        this.scrollerStyle = this.scroller.style,
        this.options = {
            resizeScrollbars: !0,
            mouseWheelSpeed: 20,
            snapThreshold: .334,
            startX: 0,
            startY: 0,
            scrollY: !0,
            directionLockThreshold: 5,
            momentum: !0,
            bounce: !0,
            bounceTime: 600,
            bounceEasing: "",
            preventDefault: !0,
            preventDefaultException: {
                tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT)$/
            },
            HWCompositing: !0,
            useTransition: !0,
            useTransform: !0
        };
        for (var n in i) this.options[n] = i[n];
        this.translateZ = this.options.HWCompositing && a.hasPerspective ? " translateZ(0)": "",
        this.options.useTransition = a.hasTransition && this.options.useTransition,
        this.options.useTransform = a.hasTransform && this.options.useTransform,
        this.options.eventPassthrough = this.options.eventPassthrough === !0 ? "vertical": this.options.eventPassthrough,
        this.options.preventDefault = !this.options.eventPassthrough && this.options.preventDefault,
        this.options.scrollY = "vertical" == this.options.eventPassthrough ? !1 : this.options.scrollY,
        this.options.scrollX = "horizontal" == this.options.eventPassthrough ? !1 : this.options.scrollX,
        this.options.freeScroll = this.options.freeScroll && !this.options.eventPassthrough,
        this.options.directionLockThreshold = this.options.eventPassthrough ? 0 : this.options.directionLockThreshold,
        this.options.bounceEasing = "string" == typeof this.options.bounceEasing ? a.ease[this.options.bounceEasing] || a.ease.circular: this.options.bounceEasing,
        this.options.resizePolling = void 0 === this.options.resizePolling ? 60 : this.options.resizePolling,
        this.options.tap === !0 && (this.options.tap = "tap"),
        "scale" == this.options.shrinkScrollbars && (this.options.useTransition = !1),
        this.options.invertWheelDirection = this.options.invertWheelDirection ? -1 : 1,
        3 == this.options.probeType && (this.options.useTransition = !1),
        this.x = 0,
        this.y = 0,
        this.directionX = 0,
        this.directionY = 0,
        this._events = {},
        this._init(),
        this.refresh(),
        this.scrollTo(this.options.startX, this.options.startY),
        this.enable()
    }
    function s(t, i, n) {
        var s = e.createElement("div"),
        r = e.createElement("div");
        return n === !0 && (s.style.cssText = "position:absolute;z-index:9999", r.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;position:absolute;background:rgba(0,0,0,0.5);border:1px solid rgba(255,255,255,0.9);border-radius:3px"),
        r.className = "iScrollIndicator",
        "h" == t ? (n === !0 && (s.style.cssText += ";height:7px;left:2px;right:2px;bottom:0", r.style.height = "100%"), s.className = "iScrollHorizontalScrollbar") : (n === !0 && (s.style.cssText += ";width:7px;bottom:2px;top:2px;right:1px", r.style.width = "100%"), s.className = "iScrollVerticalScrollbar"),
        s.style.cssText += ";overflow:hidden",
        i || (s.style.pointerEvents = "none"),
        s.appendChild(r),
        s
    }
    function r(i, n) {
        this.wrapper = "string" == typeof n.el ? e.querySelector(n.el) : n.el,
        this.wrapperStyle = this.wrapper.style,
        this.indicator = this.wrapper.children[0],
        this.indicatorStyle = this.indicator.style,
        this.scroller = i,
        this.options = {
            listenX: !0,
            listenY: !0,
            interactive: !1,
            resize: !0,
            defaultScrollbars: !1,
            shrink: !1,
            fade: !1,
            speedRatioX: 0,
            speedRatioY: 0
        };
        for (var s in n) this.options[s] = n[s];
        this.sizeRatioX = 1,
        this.sizeRatioY = 1,
        this.maxPosX = 0,
        this.maxPosY = 0,
        this.options.interactive && (this.options.disableTouch || (a.addEvent(this.indicator, "touchstart", this), a.addEvent(t, "touchend", this)), this.options.disablePointer || (a.addEvent(this.indicator, "MSPointerDown", this), a.addEvent(t, "MSPointerUp", this)), this.options.disableMouse || (a.addEvent(this.indicator, "mousedown", this), a.addEvent(t, "mouseup", this))),
        this.options.fade && (this.wrapperStyle[a.style.transform] = this.scroller.translateZ, this.wrapperStyle[a.style.transitionDuration] = a.isBadAndroid ? "0.001s": "0ms", this.wrapperStyle.opacity = "0")
    }
    var o = t.requestAnimationFrame || t.webkitRequestAnimationFrame || t.mozRequestAnimationFrame || t.oRequestAnimationFrame || t.msRequestAnimationFrame ||
    function(e) {
        t.setTimeout(e, 1e3 / 60)
    },
    a = function() {
        function n(t) {
            return o === !1 ? !1 : "" === o ? t: o + t.charAt(0).toUpperCase() + t.substr(1)
        }
        var s = {},
        r = e.createElement("div").style,
        o = function() {
            for (var t, e = ["t", "webkitT", "MozT", "msT", "OT"], i = 0, n = e.length; n > i; i++) if (t = e[i] + "ransform", t in r) return e[i].substr(0, e[i].length - 1);
            return ! 1
        } ();
        s.getTime = Date.now ||
        function() {
            return (new Date).getTime()
        },
        s.extend = function(t, e) {
            for (var i in e) t[i] = e[i]
        },
        s.addEvent = function(t, e, i, n) {
            t.addEventListener(e, i, !!n)
        },
        s.removeEvent = function(t, e, i, n) {
            t.removeEventListener(e, i, !!n)
        },
        s.momentum = function(t, e, n, s, r, o) {
            var a, h, c = t - e,
            l = i.abs(c) / n;
            return o = void 0 === o ? 6e-4: o,
            a = t + l * l / (2 * o) * (0 > c ? -1 : 1),
            h = l / o,
            s > a ? (a = r ? s - r / 2.5 * (l / 8) : s, c = i.abs(a - t), h = c / l) : a > 0 && (a = r ? r / 2.5 * (l / 8) : 0, c = i.abs(t) + a, h = c / l),
            {
                destination: i.round(a),
                duration: h
            }
        };
        var a = n("transform");
        return s.extend(s, {
            hasTransform: a !== !1,
            hasPerspective: n("perspective") in r,
            hasTouch: "ontouchstart" in t,
            hasPointer: navigator.msPointerEnabled,
            hasTransition: n("transition") in r
        }),
        s.isBadAndroid = /Android /.test(t.navigator.appVersion) && !/Chrome\/\d/.test(t.navigator.appVersion),
        s.extend(s.style = {},
        {
            transform: a,
            transitionTimingFunction: n("transitionTimingFunction"),
            transitionDuration: n("transitionDuration"),
            transitionDelay: n("transitionDelay"),
            transformOrigin: n("transformOrigin")
        }),
        s.hasClass = function(t, e) {
            var i = new RegExp("(^|\\s)" + e + "(\\s|$)");
            return i.test(t.className)
        },
        s.addClass = function(t, e) {
            if (!s.hasClass(t, e)) {
                var i = t.className.split(" ");
                i.push(e),
                t.className = i.join(" ")
            }
        },
        s.removeClass = function(t, e) {
            if (s.hasClass(t, e)) {
                var i = new RegExp("(^|\\s)" + e + "(\\s|$)", "g");
                t.className = t.className.replace(i, " ")
            }
        },
        s.offset = function(t) {
            for (var e = -t.offsetLeft,
            i = -t.offsetTop; t = t.offsetParent;) e -= t.offsetLeft,
            i -= t.offsetTop;
            return {
                left: e,
                top: i
            }
        },
        s.preventDefaultException = function(t, e) {
            for (var i in e) if (e[i].test(t[i])) return ! 0;
            return ! 1
        },
        s.extend(s.eventType = {},
        {
            touchstart: 1,
            touchmove: 1,
            touchend: 1,
            mousedown: 2,
            mousemove: 2,
            mouseup: 2,
            MSPointerDown: 3,
            MSPointerMove: 3,
            MSPointerUp: 3
        }),
        s.extend(s.ease = {},
        {
            quadratic: {
                style: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                fn: function(t) {
                    return t * (2 - t)
                }
            },
            circular: {
                style: "cubic-bezier(0.1, 0.57, 0.1, 1)",
                fn: function(t) {
                    return i.sqrt(1 - --t * t)
                }
            },
            back: {
                style: "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                fn: function(t) {
                    var e = 4;
                    return (t -= 1) * t * ((e + 1) * t + e) + 1
                }
            },
            bounce: {
                style: "",
                fn: function(t) {
                    return (t /= 1) < 1 / 2.75 ? 7.5625 * t * t: 2 / 2.75 > t ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : 2.5 / 2.75 > t ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375
                }
            },
            elastic: {
                style: "",
                fn: function(t) {
                    var e = .22,
                    n = .4;
                    return 0 === t ? 0 : 1 == t ? 1 : n * i.pow(2, -10 * t) * i.sin(2 * (t - e / 4) * i.PI / e) + 1
                }
            }
        }),
        s.tap = function(t, i) {
            var n = e.createEvent("Event");
            n.initEvent(i, !0, !0),
            n.pageX = t.pageX,
            n.pageY = t.pageY,
            t.target.dispatchEvent(n)
        },
        s.click = function(t) {
            var i, n = t.target;
            /(SELECT|INPUT|TEXTAREA)/i.test(n.tagName) || (i = e.createEvent("MouseEvents"), i.initMouseEvent("click", !0, !0, t.view, 1, n.screenX, n.screenY, n.clientX, n.clientY, t.ctrlKey, t.altKey, t.shiftKey, t.metaKey, 0, null), i._constructed = !0, n.dispatchEvent(i))
        },
        s
    } ();
    n.prototype = {
        version: "5.1.1",
        _init: function() {
            this._initEvents(),
            (this.options.scrollbars || this.options.indicators) && this._initIndicators(),
            this.options.mouseWheel && this._initWheel(),
            this.options.snap && this._initSnap(),
            this.options.keyBindings && this._initKeys()
        },
        destroy: function() {
            this._initEvents(!0),
            this._execEvent("destroy")
        },
        _transitionEnd: function(t) {
            t.target == this.scroller && this.isInTransition && (this._transitionTime(), console.log("_transitionEnd scrollEnd"), this.resetPosition(this.options.bounceTime) || (this.isInTransition = !1, this._execEvent("scrollEnd")))
        },
        _start: function(t) {
            if (! (1 != a.eventType[t.type] && 0 !== t.button || !this.enabled || this.initiated && a.eventType[t.type] !== this.initiated)) { ! this.options.preventDefault || a.isBadAndroid || a.preventDefaultException(t.target, this.options.preventDefaultException) || t.preventDefault();
                var e, n = t.touches ? t.touches[0] : t;
                this.initiated = a.eventType[t.type],
                this.moved = !1,
                this.distX = 0,
                this.distY = 0,
                this.directionX = 0,
                this.directionY = 0,
                this.directionLocked = 0,
                this._transitionTime(),
                this.startTime = a.getTime(),
                this.options.useTransition && this.isInTransition ? (this.isInTransition = !1, e = this.getComputedPosition(), this._translate(i.round(e.x), i.round(e.y)), this._execEvent("scrollEnd")) : !this.options.useTransition && this.isAnimating && (this.isAnimating = !1, this._execEvent("scrollEnd")),
                this.startX = this.x,
                this.startY = this.y,
                this.absStartX = this.x,
                this.absStartY = this.y,
                this.pointX = n.pageX,
                this.pointY = n.pageY,
                this._execEvent("beforeScrollStart")
            }
        },
        _move: function(t) {
            if (this.enabled && a.eventType[t.type] === this.initiated) {
                this.options.preventDefault && t.preventDefault();
                var e, n, s, r, o = t.touches ? t.touches[0] : t,
                h = o.pageX - this.pointX,
                c = o.pageY - this.pointY,
                l = a.getTime();
                if (this.pointX = o.pageX, this.pointY = o.pageY, this.distX += h, this.distY += c, s = i.abs(this.distX), r = i.abs(this.distY), !(l - this.endTime > 300 && 10 > s && 10 > r)) {
                    if (this.directionLocked || this.options.freeScroll || (this.directionLocked = s > r + this.options.directionLockThreshold ? "h": r >= s + this.options.directionLockThreshold ? "v": "n"), "h" == this.directionLocked) {
                        if ("vertical" == this.options.eventPassthrough) t.preventDefault();
                        else if ("horizontal" == this.options.eventPassthrough) return void(this.initiated = !1);
                        c = 0
                    } else if ("v" == this.directionLocked) {
                        if ("horizontal" == this.options.eventPassthrough) t.preventDefault();
                        else if ("vertical" == this.options.eventPassthrough) return void(this.initiated = !1);
                        h = 0
                    }
                    h = this.hasHorizontalScroll ? h: 0,
                    c = this.hasVerticalScroll ? c: 0,
                    e = this.x + h,
                    n = this.y + c,
                    (e > 0 || e < this.maxScrollX) && (e = this.options.bounce ? this.x + h / 3 : e > 0 ? 0 : this.maxScrollX),
                    (n > 0 || n < this.maxScrollY) && (n = this.options.bounce ? this.y + c / 3 : n > 0 ? 0 : this.maxScrollY),
                    this.directionX = h > 0 ? -1 : 0 > h ? 1 : 0,
                    this.directionY = c > 0 ? -1 : 0 > c ? 1 : 0,
                    this.moved || this._execEvent("scrollStart"),
                    this.moved = !0,
                    this._translate(e, n),
                    l - this.startTime > 300 && (this.startTime = l, this.startX = this.x, this.startY = this.y, 1 == this.options.probeType && this._execEvent("scroll")),
                    this.options.probeType > 1 && this._execEvent("scroll")
                }
            }
        },
        _end: function(t) {
            if (this.enabled && a.eventType[t.type] === this.initiated) {
                this.options.preventDefault && !a.preventDefaultException(t.target, this.options.preventDefaultException) && t.preventDefault();
                var e, n, s = (t.changedTouches ? t.changedTouches[0] : t, a.getTime() - this.startTime),
                r = i.round(this.x),
                o = i.round(this.y),
                h = i.abs(r - this.startX),
                c = i.abs(o - this.startY),
                l = 0,
                u = "";
                if (this.isInTransition = 0, this.initiated = 0, this.endTime = a.getTime(), !this.resetPosition(this.options.bounceTime)) {
                    if (this.scrollTo(r, o), !this.moved) return this.options.tap && a.tap(t, this.options.tap),
                    this.options.click && a.click(t),
                    void this._execEvent("scrollCancel");
                    if (this._events.flick && 200 > s && 100 > h && 100 > c) return void this._execEvent("flick");
                    if (this.options.momentum && 300 > s && (e = this.hasHorizontalScroll ? a.momentum(this.x, this.startX, s, this.maxScrollX, this.options.bounce ? this.wrapperWidth: 0, this.options.deceleration) : {
                        destination: r,
                        duration: 0
                    },
                    n = this.hasVerticalScroll ? a.momentum(this.y, this.startY, s, this.maxScrollY, this.options.bounce ? this.wrapperHeight: 0, this.options.deceleration) : {
                        destination: o,
                        duration: 0
                    },
                    r = e.destination, o = n.destination, l = i.max(e.duration, n.duration), this.isInTransition = 1), this.options.snap) {
                        var p = this._nearestSnap(r, o);
                        this.currentPage = p,
                        l = this.options.snapSpeed || i.max(i.max(i.min(i.abs(r - p.x), 1e3), i.min(i.abs(o - p.y), 1e3)), 300),
                        r = p.x,
                        o = p.y,
                        this.directionX = 0,
                        this.directionY = 0,
                        u = this.options.bounceEasing
                    }
                    return r != this.x || o != this.y ? ((r > 0 || r < this.maxScrollX || o > 0 || o < this.maxScrollY) && (u = a.ease.quadratic), void this.scrollTo(r, o, l, u)) : void this._execEvent("scrollEnd")
                }
            }
        },
        _resize: function() {
            var t = this;
            clearTimeout(this.resizeTimeout),
            this.resizeTimeout = setTimeout(function() {
                t.refresh()
            },
            this.options.resizePolling)
        },
        resetPosition: function(t) {
            var e = this.x,
            i = this.y;
            return t = t || 0,
            !this.hasHorizontalScroll || this.x > 0 ? e = 0 : this.x < this.maxScrollX && (e = this.maxScrollX),
            !this.hasVerticalScroll || this.y > 0 ? i = this.waitLoadTop && i >= this.waitLoadTop ? this.waitLoadTop: 0 : this.y < this.maxScrollY && (i = this.maxScrollY),
            e == this.x && i == this.y ? !1 : (this.scrollTo(e, i, t, this.options.bounceEasing), !0)
        },
        disable: function() {
            this.enabled = !1
        },
        enable: function() {
            this.enabled = !0
        },
        refresh: function() {
            this.wrapper.offsetHeight;
            this.wrapperWidth = this.wrapper.clientWidth,
            this.wrapperHeight = this.wrapper.clientHeight,
            this.scrollerWidth = this.scroller.offsetWidth,
            this.scrollerHeight = this.scroller.offsetHeight,
            this.maxScrollX = this.wrapperWidth - this.scrollerWidth,
            this.maxScrollY = this.wrapperHeight - this.scrollerHeight,
            this.hasHorizontalScroll = this.options.scrollX && this.maxScrollX < 0,
            this.hasVerticalScroll = this.options.scrollY && this.maxScrollY < 0,
            this.hasHorizontalScroll || (this.maxScrollX = 0, this.scrollerWidth = this.wrapperWidth),
            this.hasVerticalScroll || (this.maxScrollY = 0, this.scrollerHeight = this.wrapperHeight),
            this.endTime = 0,
            this.directionX = 0,
            this.directionY = 0,
            this.wrapperOffset = a.offset(this.wrapper),
            this._execEvent("refresh"),
            this.resetPosition()
        },
        on: function(t, e) {
            return this._events[t] || (this._events[t] = []),
            this._events[t].push(e),
            this
        },
        off: function(t, e) {
            if (this._events[t]) {
                var i = this._events[t].indexOf(e);
                i > -1 && this._events[t].splice(i, 1)
            }
        },
        _execEvent: function(t) {
            if (this._events[t]) {
                var e = 0,
                i = this._events[t].length;
                if (i) for (; i > e; e++) this._events[t][e].apply(this, [].slice.call(arguments, 1))
            }
        },
        scrollBy: function(t, e, i, n) {
            t = this.x + t,
            e = this.y + e,
            i = i || 0,
            this.scrollTo(t, e, i, n)
        },
        scrollTo: function(t, e, i, n) {
            n = n || a.ease.circular,
            this.isInTransition = this.options.useTransition && i > 0,
            !i || this.options.useTransition && n.style ? (this._transitionTimingFunction(n.style), this._transitionTime(i), this._translate(t, e)) : this._animate(t, e, i, n.fn)
        },
        scrollToElement: function(t, e, n, s, r, o) {
            if (t = t.nodeType ? t: this.scroller.querySelector(t), e = e || 0, t) {
                var h = a.offset(t);
                h.left -= this.wrapperOffset.left,
                h.top -= this.wrapperOffset.top,
                s === !0 && (s = i.round(t.offsetWidth / 2 - this.wrapper.offsetWidth / 2)),
                r === !0 && (r = i.round(t.offsetHeight / 2 - this.wrapper.offsetHeight / 2)),
                h.left -= s || 0,
                h.top -= r || 0,
                h.left = h.left > 0 ? 0 : h.left < this.maxScrollX ? this.maxScrollX: h.left,
                h.top = h.top > 0 ? 0 : h.top < this.maxScrollY ? this.maxScrollY: h.top,
                n = void 0 === n || null === n || "auto" === n ? i.max(i.abs(this.x - h.left), i.abs(this.y - h.top)) : n,
                this.scrollTo(h.left, h.top + e, n, o)
            }
        },
        _transitionTime: function(t) {
            if (t = t || 0, this.scrollerStyle[a.style.transitionDuration] = t + "ms", !t && a.isBadAndroid && (this.scrollerStyle[a.style.transitionDuration] = "0.001s"), this.indicators) for (var e = this.indicators.length; e--;) this.indicators[e].transitionTime(t)
        },
        _transitionTimingFunction: function(t) {
            if (this.scrollerStyle[a.style.transitionTimingFunction] = t, this.indicators) for (var e = this.indicators.length; e--;) this.indicators[e].transitionTimingFunction(t)
        },
        _translate: function(t, e) {
            if (this.options.useTransform ? this.scrollerStyle[a.style.transform] = "translate(" + t + "px," + e + "px)" + this.translateZ: (t = i.round(t), e = i.round(e), this.scrollerStyle.left = t + "px", this.scrollerStyle.top = e + "px"), this.x = t, this.y = e, this.indicators) for (var n = this.indicators.length; n--;) this.indicators[n].updatePosition()
        },
        _initEvents: function(e) {
            var i = e ? a.removeEvent: a.addEvent,
            n = this.options.bindToWrapper ? this.wrapper: t;
            i(t, "orientationchange", this),
            i(t, "resize", this),
            this.options.click && i(this.wrapper, "click", this, !0),
            this.options.disableMouse || (i(this.wrapper, "mousedown", this), i(n, "mousemove", this), i(n, "mousecancel", this), i(n, "mouseup", this)),
            a.hasPointer && !this.options.disablePointer && (i(this.wrapper, "MSPointerDown", this), i(n, "MSPointerMove", this), i(n, "MSPointerCancel", this), i(n, "MSPointerUp", this)),
            a.hasTouch && !this.options.disableTouch && (i(this.wrapper, "touchstart", this), i(n, "touchmove", this), i(n, "touchcancel", this), i(n, "touchend", this)),
            i(this.scroller, "transitionend", this),
            i(this.scroller, "webkitTransitionEnd", this),
            i(this.scroller, "oTransitionEnd", this),
            i(this.scroller, "MSTransitionEnd", this)
        },
        getComputedPosition: function() {
            var e, i, n = t.getComputedStyle(this.scroller, null);
            return this.options.useTransform ? (n = n[a.style.transform].split(")")[0].split(", "), e = +(n[12] || n[4]), i = +(n[13] || n[5])) : (e = +n.left.replace(/[^-\d.]/g, ""), i = +n.top.replace(/[^-\d.]/g, "")),
            {
                x: e,
                y: i
            }
        },
        _initIndicators: function() {
            function t(t) {
                for (var e = a.indicators.length; e--;) t.call(a.indicators[e])
            }
            var e, i = this.options.interactiveScrollbars,
            n = "string" != typeof this.options.scrollbars,
            o = [],
            a = this;
            this.indicators = [],
            this.options.scrollbars && (this.options.scrollY && (e = {
                el: s("v", i, this.options.scrollbars),
                interactive: i,
                defaultScrollbars: !0,
                customStyle: n,
                resize: this.options.resizeScrollbars,
                shrink: this.options.shrinkScrollbars,
                fade: this.options.fadeScrollbars,
                listenX: !1
            },
            this.wrapper.appendChild(e.el), o.push(e)), this.options.scrollX && (e = {
                el: s("h", i, this.options.scrollbars),
                interactive: i,
                defaultScrollbars: !0,
                customStyle: n,
                resize: this.options.resizeScrollbars,
                shrink: this.options.shrinkScrollbars,
                fade: this.options.fadeScrollbars,
                listenY: !1
            },
            this.wrapper.appendChild(e.el), o.push(e))),
            this.options.indicators && (o = o.concat(this.options.indicators));
            for (var h = o.length; h--;) this.indicators.push(new r(this, o[h]));
            this.options.fadeScrollbars && (this.on("scrollEnd",
            function() {
                t(function() {
                    this.fade()
                })
            }), this.on("scrollCancel",
            function() {
                t(function() {
                    this.fade()
                })
            }), this.on("scrollStart",
            function() {
                t(function() {
                    this.fade(1)
                })
            }), this.on("beforeScrollStart",
            function() {
                t(function() {
                    this.fade(1, !0)
                })
            })),
            this.on("refresh",
            function() {
                t(function() {
                    this.refresh()
                })
            }),
            this.on("destroy",
            function() {
                t(function() {
                    this.destroy()
                }),
                delete this.indicators
            })
        },
        _initWheel: function() {
            a.addEvent(this.wrapper, "wheel", this),
            a.addEvent(this.wrapper, "mousewheel", this),
            a.addEvent(this.wrapper, "DOMMouseScroll", this),
            this.on("destroy",
            function() {
                a.removeEvent(this.wrapper, "wheel", this),
                a.removeEvent(this.wrapper, "mousewheel", this),
                a.removeEvent(this.wrapper, "DOMMouseScroll", this)
            })
        },
        _wheel: function(t) {
            if (this.enabled) {
                t.preventDefault(),
                t.stopPropagation();
                var e, n, s, r, o = this;
                if (void 0 === this.wheelTimeout && o._execEvent("scrollStart"), clearTimeout(this.wheelTimeout), this.wheelTimeout = setTimeout(function() {
                    o._execEvent("scrollEnd"),
                    o.wheelTimeout = void 0
                },
                400), "deltaX" in t) e = -t.deltaX,
                n = -t.deltaY;
                else if ("wheelDeltaX" in t) e = t.wheelDeltaX / 120 * this.options.mouseWheelSpeed,
                n = t.wheelDeltaY / 120 * this.options.mouseWheelSpeed;
                else if ("wheelDelta" in t) e = n = t.wheelDelta / 120 * this.options.mouseWheelSpeed;
                else {
                    if (! ("detail" in t)) return;
                    e = n = -t.detail / 3 * this.options.mouseWheelSpeed
                }
                if (e *= this.options.invertWheelDirection, n *= this.options.invertWheelDirection, this.hasVerticalScroll || (e = n, n = 0), this.options.snap) return s = this.currentPage.pageX,
                r = this.currentPage.pageY,
                e > 0 ? s--:0 > e && s++,
                n > 0 ? r--:0 > n && r++,
                void this.goToPage(s, r);
                s = this.x + i.round(this.hasHorizontalScroll ? e: 0),
                r = this.y + i.round(this.hasVerticalScroll ? n: 0),
                s > 0 ? s = 0 : s < this.maxScrollX && (s = this.maxScrollX),
                r > 0 ? r = 0 : r < this.maxScrollY && (r = this.maxScrollY),
                this.scrollTo(s, r, 0),
                this.options.probeType > 1 && this._execEvent("scroll")
            }
        },
        _initSnap: function() {
            this.currentPage = {},
            "string" == typeof this.options.snap && (this.options.snap = this.scroller.querySelectorAll(this.options.snap)),
            this.on("refresh",
            function() {
                var t, e, n, s, r, o, a = 0,
                h = 0,
                c = 0,
                l = this.options.snapStepX || this.wrapperWidth,
                u = this.options.snapStepY || this.wrapperHeight;
                if (this.pages = [], this.wrapperWidth && this.wrapperHeight && this.scrollerWidth && this.scrollerHeight) {
                    if (this.options.snap === !0) for (n = i.round(l / 2), s = i.round(u / 2); c > -this.scrollerWidth;) {
                        for (this.pages[a] = [], t = 0, r = 0; r > -this.scrollerHeight;) this.pages[a][t] = {
                            x: i.max(c, this.maxScrollX),
                            y: i.max(r, this.maxScrollY),
                            width: l,
                            height: u,
                            cx: c - n,
                            cy: r - s
                        },
                        r -= u,
                        t++;
                        c -= l,
                        a++
                    } else for (o = this.options.snap, t = o.length, e = -1; t > a; a++)(0 === a || o[a].offsetLeft <= o[a - 1].offsetLeft) && (h = 0, e++),
                    this.pages[h] || (this.pages[h] = []),
                    c = i.max( - o[a].offsetLeft, this.maxScrollX),
                    r = i.max( - o[a].offsetTop, this.maxScrollY),
                    n = c - i.round(o[a].offsetWidth / 2),
                    s = r - i.round(o[a].offsetHeight / 2),
                    this.pages[h][e] = {
                        x: c,
                        y: r,
                        width: o[a].offsetWidth,
                        height: o[a].offsetHeight,
                        cx: n,
                        cy: s
                    },
                    c > this.maxScrollX && h++;
                    this.goToPage(this.currentPage.pageX || 0, this.currentPage.pageY || 0, 0),
                    this.options.snapThreshold % 1 === 0 ? (this.snapThresholdX = this.options.snapThreshold, this.snapThresholdY = this.options.snapThreshold) : (this.snapThresholdX = i.round(this.pages[this.currentPage.pageX][this.currentPage.pageY].width * this.options.snapThreshold), this.snapThresholdY = i.round(this.pages[this.currentPage.pageX][this.currentPage.pageY].height * this.options.snapThreshold))
                }
            }),
            this.on("flick",
            function() {
                var t = this.options.snapSpeed || i.max(i.max(i.min(i.abs(this.x - this.startX), 1e3), i.min(i.abs(this.y - this.startY), 1e3)), 300);
                this.goToPage(this.currentPage.pageX + this.directionX, this.currentPage.pageY + this.directionY, t)
            })
        },
        _nearestSnap: function(t, e) {
            if (!this.pages.length) return {
                x: 0,
                y: 0,
                pageX: 0,
                pageY: 0
            };
            var n = 0,
            s = this.pages.length,
            r = 0;
            if (i.abs(t - this.absStartX) < this.snapThresholdX && i.abs(e - this.absStartY) < this.snapThresholdY) return this.currentPage;
            for (t > 0 ? t = 0 : t < this.maxScrollX && (t = this.maxScrollX), e > 0 ? e = 0 : e < this.maxScrollY && (e = this.maxScrollY); s > n; n++) if (t >= this.pages[n][0].cx) {
                t = this.pages[n][0].x;
                break
            }
            for (s = this.pages[n].length; s > r; r++) if (e >= this.pages[0][r].cy) {
                e = this.pages[0][r].y;
                break
            }
            return n == this.currentPage.pageX && (n += this.directionX, 0 > n ? n = 0 : n >= this.pages.length && (n = this.pages.length - 1), t = this.pages[n][0].x),
            r == this.currentPage.pageY && (r += this.directionY, 0 > r ? r = 0 : r >= this.pages[0].length && (r = this.pages[0].length - 1), e = this.pages[0][r].y),
            {
                x: t,
                y: e,
                pageX: n,
                pageY: r
            }
        },
        goToPage: function(t, e, n, s) {
            s = s || this.options.bounceEasing,
            t >= this.pages.length ? t = this.pages.length - 1 : 0 > t && (t = 0),
            e >= this.pages[t].length ? e = this.pages[t].length - 1 : 0 > e && (e = 0);
            var r = this.pages[t][e].x,
            o = this.pages[t][e].y;
            n = void 0 === n ? this.options.snapSpeed || i.max(i.max(i.min(i.abs(r - this.x), 1e3), i.min(i.abs(o - this.y), 1e3)), 300) : n,
            this.currentPage = {
                x: r,
                y: o,
                pageX: t,
                pageY: e
            },
            this.scrollTo(r, o, n, s)
        },
        next: function(t, e) {
            var i = this.currentPage.pageX,
            n = this.currentPage.pageY;
            i++,
            i >= this.pages.length && this.hasVerticalScroll && (i = 0, n++),
            this.goToPage(i, n, t, e)
        },
        prev: function(t, e) {
            var i = this.currentPage.pageX,
            n = this.currentPage.pageY;
            i--,
            0 > i && this.hasVerticalScroll && (i = 0, n--),
            this.goToPage(i, n, t, e)
        },
        _initKeys: function(e) {
            var i, n = {
                pageUp: 33,
                pageDown: 34,
                end: 35,
                home: 36,
                left: 37,
                up: 38,
                right: 39,
                down: 40
            };
            if ("object" == typeof this.options.keyBindings) for (i in this.options.keyBindings)"string" == typeof this.options.keyBindings[i] && (this.options.keyBindings[i] = this.options.keyBindings[i].toUpperCase().charCodeAt(0));
            else this.options.keyBindings = {};
            for (i in n) this.options.keyBindings[i] = this.options.keyBindings[i] || n[i];
            a.addEvent(t, "keydown", this),
            this.on("destroy",
            function() {
                a.removeEvent(t, "keydown", this)
            })
        },
        _key: function(t) {
            if (this.enabled) {
                var e, n = this.options.snap,
                s = n ? this.currentPage.pageX: this.x,
                r = n ? this.currentPage.pageY: this.y,
                o = a.getTime(),
                h = this.keyTime || 0,
                c = .25;
                switch (this.options.useTransition && this.isInTransition && (e = this.getComputedPosition(), this._translate(i.round(e.x), i.round(e.y)), this.isInTransition = !1), this.keyAcceleration = 200 > o - h ? i.min(this.keyAcceleration + c, 50) : 0, t.keyCode) {
                case this.options.keyBindings.pageUp:
                    this.hasHorizontalScroll && !this.hasVerticalScroll ? s += n ? 1 : this.wrapperWidth: r += n ? 1 : this.wrapperHeight;

                    break;
                case this.options.keyBindings.pageDown:
                    this.hasHorizontalScroll && !this.hasVerticalScroll ? s -= n ? 1 : this.wrapperWidth: r -= n ? 1 : this.wrapperHeight;
                    break;
                case this.options.keyBindings.end:
                    s = n ? this.pages.length - 1 : this.maxScrollX,
                    r = n ? this.pages[0].length - 1 : this.maxScrollY;
                    break;
                case this.options.keyBindings.home:
                    s = 0,
                    r = 0;
                    break;
                case this.options.keyBindings.left:
                    s += n ? -1 : 5 + this.keyAcceleration >> 0;
                    break;
                case this.options.keyBindings.up:
                    r += n ? 1 : 5 + this.keyAcceleration >> 0;
                    break;
                case this.options.keyBindings.right:
                    s -= n ? -1 : 5 + this.keyAcceleration >> 0;
                    break;
                case this.options.keyBindings.down:
                    r -= n ? 1 : 5 + this.keyAcceleration >> 0;
                    break;
                default:
                    return
                }
                if (n) return void this.goToPage(s, r);
                s > 0 ? (s = 0, this.keyAcceleration = 0) : s < this.maxScrollX && (s = this.maxScrollX, this.keyAcceleration = 0),
                r > 0 ? (r = 0, this.keyAcceleration = 0) : r < this.maxScrollY && (r = this.maxScrollY, this.keyAcceleration = 0),
                this.scrollTo(s, r, 0),
                this.keyTime = o
            }
        },
        _animate: function(t, e, i, n) {
            function s() {
                var p, d, f, m = a.getTime();
                return m >= u ? (r.isAnimating = !1, r._translate(t, e), void(r.resetPosition(r.options.bounceTime) || r._execEvent("scrollEnd"))) : (m = (m - l) / i, f = n(m), p = (t - h) * f + h, d = (e - c) * f + c, r._translate(p, d), r.isAnimating && o(s), void(3 == r.options.probeType && r._execEvent("scroll")))
            }
            var r = this,
            h = this.x,
            c = this.y,
            l = a.getTime(),
            u = l + i;
            this.isAnimating = !0,
            s()
        },
        handleEvent: function(t) {
            switch (t.type) {
            case "touchstart":
            case "MSPointerDown":
            case "mousedown":
                this._start(t);
                break;
            case "touchmove":
            case "MSPointerMove":
            case "mousemove":
                this._move(t);
                break;
            case "touchend":
            case "MSPointerUp":
            case "mouseup":
            case "touchcancel":
            case "MSPointerCancel":
            case "mousecancel":
                this._end(t);
                break;
            case "orientationchange":
            case "resize":
                this._resize();
                break;
            case "transitionend":
            case "webkitTransitionEnd":
            case "oTransitionEnd":
            case "MSTransitionEnd":
                this._transitionEnd(t);
                break;
            case "wheel":
            case "DOMMouseScroll":
            case "mousewheel":
                this._wheel(t);
                break;
            case "keydown":
                this._key(t);
                break;
            case "click":
                t._constructed || (t.preventDefault(), t.stopPropagation())
            }
        }
    },
    r.prototype = {
        handleEvent: function(t) {
            switch (t.type) {
            case "touchstart":
            case "MSPointerDown":
            case "mousedown":
                this._start(t);
                break;
            case "touchmove":
            case "MSPointerMove":
            case "mousemove":
                this._move(t);
                break;
            case "touchend":
            case "MSPointerUp":
            case "mouseup":
            case "touchcancel":
            case "MSPointerCancel":
            case "mousecancel":
                this._end(t)
            }
        },
        destroy: function() {
            this.options.interactive && (a.removeEvent(this.indicator, "touchstart", this), a.removeEvent(this.indicator, "MSPointerDown", this), a.removeEvent(this.indicator, "mousedown", this), a.removeEvent(t, "touchmove", this), a.removeEvent(t, "MSPointerMove", this), a.removeEvent(t, "mousemove", this), a.removeEvent(t, "touchend", this), a.removeEvent(t, "MSPointerUp", this), a.removeEvent(t, "mouseup", this)),
            this.options.defaultScrollbars && this.wrapper.parentNode.removeChild(this.wrapper)
        },
        _start: function(e) {
            var i = e.touches ? e.touches[0] : e;
            e.preventDefault(),
            e.stopPropagation(),
            this.transitionTime(),
            this.initiated = !0,
            this.moved = !1,
            this.lastPointX = i.pageX,
            this.lastPointY = i.pageY,
            this.startTime = a.getTime(),
            this.options.disableTouch || a.addEvent(t, "touchmove", this),
            this.options.disablePointer || a.addEvent(t, "MSPointerMove", this),
            this.options.disableMouse || a.addEvent(t, "mousemove", this),
            this.scroller._execEvent("beforeScrollStart")
        },
        _move: function(t) {
            var e, i, n, s, r = t.touches ? t.touches[0] : t,
            o = a.getTime();
            this.moved || this.scroller._execEvent("scrollStart"),
            this.moved = !0,
            e = r.pageX - this.lastPointX,
            this.lastPointX = r.pageX,
            i = r.pageY - this.lastPointY,
            this.lastPointY = r.pageY,
            n = this.x + e,
            s = this.y + i,
            this._pos(n, s),
            1 == this.scroller.options.probeType && o - this.startTime > 300 ? (this.startTime = o, this.scroller._execEvent("scroll")) : this.scroller.options.probeType > 1 && this.scroller._execEvent("scroll"),
            t.preventDefault(),
            t.stopPropagation()
        },
        _end: function(e) {
            if (this.initiated) {
                if (this.initiated = !1, e.preventDefault(), e.stopPropagation(), a.removeEvent(t, "touchmove", this), a.removeEvent(t, "MSPointerMove", this), a.removeEvent(t, "mousemove", this), this.scroller.options.snap) {
                    var n = this.scroller._nearestSnap(this.scroller.x, this.scroller.y),
                    s = this.options.snapSpeed || i.max(i.max(i.min(i.abs(this.scroller.x - n.x), 1e3), i.min(i.abs(this.scroller.y - n.y), 1e3)), 300); (this.scroller.x != n.x || this.scroller.y != n.y) && (this.scroller.directionX = 0, this.scroller.directionY = 0, this.scroller.currentPage = n, this.scroller.scrollTo(n.x, n.y, s, this.scroller.options.bounceEasing))
                }
                this.moved && this.scroller._execEvent("scrollEnd")
            }
        },
        transitionTime: function(t) {
            t = t || 0,
            this.indicatorStyle[a.style.transitionDuration] = t + "ms",
            !t && a.isBadAndroid && (this.indicatorStyle[a.style.transitionDuration] = "0.001s")
        },
        transitionTimingFunction: function(t) {
            this.indicatorStyle[a.style.transitionTimingFunction] = t
        },
        refresh: function() {
            this.transitionTime(),
            this.indicatorStyle.display = this.options.listenX && !this.options.listenY ? this.scroller.hasHorizontalScroll ? "block": "none": this.options.listenY && !this.options.listenX ? this.scroller.hasVerticalScroll ? "block": "none": this.scroller.hasHorizontalScroll || this.scroller.hasVerticalScroll ? "block": "none",
            this.scroller.hasHorizontalScroll && this.scroller.hasVerticalScroll ? (a.addClass(this.wrapper, "iScrollBothScrollbars"), a.removeClass(this.wrapper, "iScrollLoneScrollbar"), this.options.defaultScrollbars && this.options.customStyle && (this.options.listenX ? this.wrapper.style.right = "8px": this.wrapper.style.bottom = "8px")) : (a.removeClass(this.wrapper, "iScrollBothScrollbars"), a.addClass(this.wrapper, "iScrollLoneScrollbar"), this.options.defaultScrollbars && this.options.customStyle && (this.options.listenX ? this.wrapper.style.right = "2px": this.wrapper.style.bottom = "2px"));
            this.wrapper.offsetHeight;
            this.options.listenX && (this.wrapperWidth = this.wrapper.clientWidth, this.options.resize ? (this.indicatorWidth = i.max(i.round(this.wrapperWidth * this.wrapperWidth / (this.scroller.scrollerWidth || this.wrapperWidth || 1)), 8), this.indicatorStyle.width = this.indicatorWidth + "px") : this.indicatorWidth = this.indicator.clientWidth, this.maxPosX = this.wrapperWidth - this.indicatorWidth, "clip" == this.options.shrink ? (this.minBoundaryX = -this.indicatorWidth + 8, this.maxBoundaryX = this.wrapperWidth - 8) : (this.minBoundaryX = 0, this.maxBoundaryX = this.maxPosX), this.sizeRatioX = this.options.speedRatioX || this.scroller.maxScrollX && this.maxPosX / this.scroller.maxScrollX),
            this.options.listenY && (this.wrapperHeight = this.wrapper.clientHeight, this.options.resize ? (this.indicatorHeight = i.max(i.round(this.wrapperHeight * this.wrapperHeight / (this.scroller.scrollerHeight || this.wrapperHeight || 1)), 8), this.indicatorStyle.height = this.indicatorHeight + "px") : this.indicatorHeight = this.indicator.clientHeight, this.maxPosY = this.wrapperHeight - this.indicatorHeight, "clip" == this.options.shrink ? (this.minBoundaryY = -this.indicatorHeight + 8, this.maxBoundaryY = this.wrapperHeight - 8) : (this.minBoundaryY = 0, this.maxBoundaryY = this.maxPosY), this.maxPosY = this.wrapperHeight - this.indicatorHeight, this.sizeRatioY = this.options.speedRatioY || this.scroller.maxScrollY && this.maxPosY / this.scroller.maxScrollY),
            this.updatePosition()
        },
        updatePosition: function() {
            var t = this.options.listenX && i.round(this.sizeRatioX * this.scroller.x) || 0,
            e = this.options.listenY && i.round(this.sizeRatioY * this.scroller.y) || 0;
            this.options.ignoreBoundaries || (t < this.minBoundaryX ? ("scale" == this.options.shrink && (this.width = i.max(this.indicatorWidth + t, 8), this.indicatorStyle.width = this.width + "px"), t = this.minBoundaryX) : t > this.maxBoundaryX ? "scale" == this.options.shrink ? (this.width = i.max(this.indicatorWidth - (t - this.maxPosX), 8), this.indicatorStyle.width = this.width + "px", t = this.maxPosX + this.indicatorWidth - this.width) : t = this.maxBoundaryX: "scale" == this.options.shrink && this.width != this.indicatorWidth && (this.width = this.indicatorWidth, this.indicatorStyle.width = this.width + "px"), e < this.minBoundaryY ? ("scale" == this.options.shrink && (this.height = i.max(this.indicatorHeight + 3 * e, 8), this.indicatorStyle.height = this.height + "px"), e = this.minBoundaryY) : e > this.maxBoundaryY ? "scale" == this.options.shrink ? (this.height = i.max(this.indicatorHeight - 3 * (e - this.maxPosY), 8), this.indicatorStyle.height = this.height + "px", e = this.maxPosY + this.indicatorHeight - this.height) : e = this.maxBoundaryY: "scale" == this.options.shrink && this.height != this.indicatorHeight && (this.height = this.indicatorHeight, this.indicatorStyle.height = this.height + "px")),
            this.x = t,
            this.y = e,
            this.scroller.options.useTransform ? this.indicatorStyle[a.style.transform] = "translate(" + t + "px," + e + "px)" + this.scroller.translateZ: (this.indicatorStyle.left = t + "px", this.indicatorStyle.top = e + "px")
        },
        _pos: function(t, e) {
            0 > t ? t = 0 : t > this.maxPosX && (t = this.maxPosX),
            0 > e ? e = 0 : e > this.maxPosY && (e = this.maxPosY),
            t = this.options.listenX ? i.round(t / this.sizeRatioX) : this.scroller.x,
            e = this.options.listenY ? i.round(e / this.sizeRatioY) : this.scroller.y,
            this.scroller.scrollTo(t, e)
        },
        fade: function(t, e) {
            if (!e || this.visible) {
                clearTimeout(this.fadeTimeout),
                this.fadeTimeout = null;
                var i = t ? 250 : 500,
                n = t ? 0 : 300;
                t = t ? "1": "0",
                this.wrapperStyle[a.style.transitionDuration] = i + "ms",
                this.fadeTimeout = setTimeout(function(t) {
                    this.wrapperStyle.opacity = t,
                    this.visible = +t
                }.bind(this, t), n)
            }
        }
    },
    n.utils = a,
    "function" == typeof define && define.amd ? define("IScroll", [],
    function() {
        return n
    }) : t.IScroll = n
} (window, document, Math),
function(t, e) {
    "use strict";
    function i(t, e, i) {
        e.css({
            "-webkit-transition": "all " + i + "s " + t.opts.transitionType,
            transition: "all " + i + "s " + t.opts.transitionType
        })
    }
    function n(t, e, i) {
        var n = t.opts.axisX ? i + "px,0,0": "0," + i + "px,0";
        e.css({
            "-webkit-transform": "translate3d(" + n + ")",
            transform: "translate3d(" + n + ")"
        })
    }
    function s(t, i) {
        var n = t.opts.ul.children(),
        s = n.eq(i).find("[data-src]");
        s && s.each(function(t) {
            var i = e(this);
            i.is("img") ? (i.attr("src", i.data("src")), i.removeAttr("data-src")) : (i.css({
                "background-image": "url(" + i.data("src") + ")"
            }), i.removeAttr("data-src"))
        })
    }
    function r(t) {
        m.touch && !t.touches && (t.touches = t.originalEvent.touches)
    }
    function o(t, e) {
        e.isScrolling = void 0,
        e._moveDistance = e._moveDistanceIE = 0,
        e._startX = m.touch ? t.touches[0].pageX: t.pageX || t.clientX,
        e._startY = m.touch ? t.touches[0].pageY: t.pageY || t.clientY
    }
    function a(t, e) {
        e.opts.autoSwipe && l(e),
        e.allowSlideClick = !1,
        e._curX = m.touch ? t.touches[0].pageX: t.pageX || t.clientX,
        e._curY = m.touch ? t.touches[0].pageY: t.pageY || t.clientY,
        e._moveX = e._curX - e._startX,
        e._moveY = e._curY - e._startY,
        "undefined" == typeof e.isScrolling && (e.isScrolling = e.opts.axisX ? !!(Math.abs(e._moveX) >= Math.abs(e._moveY)) : !!(Math.abs(e._moveY) >= Math.abs(e._moveX))),
        e.isScrolling && (t.preventDefault ? t.preventDefault() : t.returnValue = !1, i(e, e.opts.ul, 0), e._moveDistance = e._moveDistanceIE = e.opts.axisX ? e._moveX: e._moveY),
        e.opts.continuousScroll || (0 == e._index && e._moveDistance > 0 || e._index + 1 >= e._liLength && e._moveDistance < 0) && (e._moveDistance = 0),
        n(e, e.opts.ul, -(e._slideDistance * e._index - e._moveDistance))
    }
    function h(t) {
        t.isScrolling || c(t),
        (d.ie10 || d.ie11) && (Math.abs(t._moveDistanceIE) < 5 && (t.allowSlideClick = !0), setTimeout(function() {
            t.allowSlideClick = !0
        },
        100)),
        Math.abs(t._moveDistance) <= t._distance ? u(t, "", ".3") : t._moveDistance > t._distance ? u(t, "prev", ".3") : Math.abs(t._moveDistance) > t._distance && u(t, "next", ".3"),
        t._moveDistance = t._moveDistanceIE = 0
    }
    function c(t) {
        t.opts.autoSwipe && (l(t), t.autoSlide = setInterval(function() {
            u(t, "next", ".3")
        },
        t.opts.speed))
    }
    function l(t) {
        clearInterval(t.autoSlide)
    }
    function u(t, e, i) {
        "number" == typeof e ? (t._index = e, t.opts.lazyLoad && (t.opts.continuousScroll ? (s(t, t._index), s(t, t._index + 1), s(t, t._index + 2)) : (s(t, t._index - 1), s(t, t._index), s(t, t._index + 1)))) : "next" == e ? (t._index++, t.opts.lazyLoad && (t.opts.continuousScroll ? (s(t, t._index + 2), t._index + 1 == t._liLength ? s(t, 1) : t._index == t._liLength && s(t, 0)) : s(t, t._index + 1))) : "prev" == e && (t._index--, t.opts.lazyLoad && (t.opts.continuousScroll ? (s(t, t._index), 0 == t._index ? s(t, t._liLength) : t._index < 0 && s(t, t._liLength - 1)) : s(t, t._index - 1))),
        t.opts.continuousScroll ? t._index >= t._liLength ? (p(t, i), t._index = 0, setTimeout(function() {
            p(t, 0)
        },
        300)) : t._index < 0 ? (p(t, i), t._index = t._liLength - 1, setTimeout(function() {
            p(t, 0)
        },
        300)) : p(t, i) : (t._index >= t._liLength ? t._index = 0 : t._index < 0 && (t._index = t._liLength - 1), p(t, i)),
        "" !== arguments[1] && t.opts.callback(t._index, t._liLength, t.$el)
    }
    function p(t, e) {
        i(t, t.opts.ul, e),
        n(t, t.opts.ul, -t._index * t._slideDistance)
    }
    var d = {
        ie10: t.navigator.msPointerEnabled,
        ie11: t.navigator.pointerEnabled
    },
    f = ["touchstart", "touchmove", "touchend"],
    m = {
        touch: t.Modernizr && Modernizr.touch === !0 ||
        function() {
            return !! ("ontouchstart" in t || t.DocumentTouch && document instanceof DocumentTouch)
        } ()
    };
    d.ie10 && (f = ["MSPointerDown", "MSPointerMove", "MSPointerUp"]),
    d.ie11 && (f = ["pointerdown", "pointermove", "pointerup"]);
    var g = {
        touchStart: f[0],
        touchMove: f[1],
        touchEnd: f[2]
    };
    e.fn.swipeSlide = function(t) {
        var e = [];
        return this.each(function(i, n) {
            e.push(new v(n, t))
        }),
        e
    };
    var v = function(t, i) {
        var n = this;
        n.$el = e(t),
        n._distance = 50,
        n.allowSlideClick = !0,
        n.init(i)
    };
    v.prototype.init = function(l) {
        function u() {
            var t = p.opts.ul.children();
            p._slideDistance = p.opts.axisX ? p.opts.ul.width()+p._nums : p.opts.ul.height(),
            i(p, p.opts.ul, 0),
            n(p, p.opts.ul, -p._slideDistance * p._index),
            i(p, t, 0);
            var s = p.opts.continuousScroll ? -1 : 0;
            t.each(function(t) {
                n(p, e(this), p._slideDistance * (t + s))
            })
        }
        var p = this;
        if (p.opts = e.extend({},
        {
            ul: p.$el.children("ul"),
            li: p.$el.children().children("li"),
            index: 0,
            continuousScroll: !1,
            autoSwipe: !0,
            speed: 4e3,
            axisX: !0,
            nums : 0,
            transitionType: "ease",
            lazyLoad: !1,
            firstCallback: function() {},
            callback: function() {}
        },
        l),p._nums = p.opts.nums, p._index = p.opts.index, p._liLength = p.opts.li.length, p.isScrolling, p.opts.firstCallback(p._index, p._liLength, p.$el), p._liLength <= 1) return p.opts.lazyLoad && s(p, 0),
        !1;
        if (p.opts.continuousScroll && p.opts.ul.prepend(p.opts.li.last().clone()).append(p.opts.li.first().clone()), p.opts.lazyLoad && (s(p, p._index), p.opts.continuousScroll ? (s(p, p._index + 1), s(p, p._index + 2), 0 == p._index ? s(p, p._liLength) : p._index + 1 == p._liLength && s(p, 1)) : 0 == p._index ? s(p, p._index + 1) : p._index + 1 == p._liLength ? s(p, p._index - 1) : (s(p, p._index + 1), s(p, p._index - 1))), u(), d.ie10 || d.ie11) {
            var f = "";
            f = p.opts.axisX ? "pan-y": "none",
            p.$el.css({
                "-ms-touch-action": f,
                "touch-action": f
            }),
            p.$el.on("click",
            function() {
                return p.allowSlideClick
            })
        }
        c(p),
        p.$el.on(g.touchStart,
        function(t) {
            r(t),
            o(t, p)
        }),
        p.$el.on(g.touchMove,
        function(t) {
            r(t),
            a(t, p)
        }),
        p.$el.on(g.touchEnd,
        function() {
            h(p)
        }),
        p.opts.ul.on("webkitTransitionEnd MSTransitionEnd transitionend",
        function() {
            c(p)
        }),
        e(t).on("onorientationchange" in t ? "orientationchange": "resize",
        function() {
            clearTimeout(p.timer),
            p.timer = setTimeout(u, 150)
        })
    },
    v.prototype.goTo = function(t) {
        var e = this;
        u(e, t, ".3")
    }
} (window, window.Zepto || window.jQuery);