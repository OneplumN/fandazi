(function () {
  const f = document.createElement("link").relList;
  if (f && f.supports && f.supports("modulepreload")) return;
  for (const S of document.querySelectorAll('link[rel="modulepreload"]')) r(S);
  new MutationObserver((S) => {
    for (const g of S)
      if (g.type === "childList")
        for (const O of g.addedNodes)
          O.tagName === "LINK" && O.rel === "modulepreload" && r(O);
  }).observe(document, { childList: !0, subtree: !0 });
  function d(S) {
    const g = {};
    return (
      S.integrity && (g.integrity = S.integrity),
      S.referrerPolicy && (g.referrerPolicy = S.referrerPolicy),
      S.crossOrigin === "use-credentials"
        ? (g.credentials = "include")
        : S.crossOrigin === "anonymous"
          ? (g.credentials = "omit")
          : (g.credentials = "same-origin"),
      g
    );
  }
  function r(S) {
    if (S.ep) return;
    S.ep = !0;
    const g = d(S);
    fetch(S.href, g);
  }
})();
var Uf = { exports: {} },
  yu = {};
var m2;
function zm() {
  if (m2) return yu;
  m2 = 1;
  var s = Symbol.for("react.transitional.element"),
    f = Symbol.for("react.fragment");
  function d(r, S, g) {
    var O = null;
    if (
      (g !== void 0 && (O = "" + g),
      S.key !== void 0 && (O = "" + S.key),
      "key" in S)
    ) {
      g = {};
      for (var D in S) D !== "key" && (g[D] = S[D]);
    } else g = S;
    return (
      (S = g.ref),
      { $$typeof: s, type: r, key: O, ref: S !== void 0 ? S : null, props: g }
    );
  }
  return ((yu.Fragment = f), (yu.jsx = d), (yu.jsxs = d), yu);
}
var y2;
function Am() {
  return (y2 || ((y2 = 1), (Uf.exports = zm())), Uf.exports);
}
var i = Am(),
  Rf = { exports: {} },
  tl = {};
var g2;
function Om() {
  if (g2) return tl;
  g2 = 1;
  var s = Symbol.for("react.transitional.element"),
    f = Symbol.for("react.portal"),
    d = Symbol.for("react.fragment"),
    r = Symbol.for("react.strict_mode"),
    S = Symbol.for("react.profiler"),
    g = Symbol.for("react.consumer"),
    O = Symbol.for("react.context"),
    D = Symbol.for("react.forward_ref"),
    _ = Symbol.for("react.suspense"),
    T = Symbol.for("react.memo"),
    A = Symbol.for("react.lazy"),
    E = Symbol.for("react.activity"),
    Q = Symbol.for("react.view_transition"),
    G = Symbol.iterator;
  function Z(y) {
    return y === null || typeof y != "object"
      ? null
      : ((y = (G && y[G]) || y["@@iterator"]),
        typeof y == "function" ? y : null);
  }
  var I = {
      isMounted: function () {
        return !1;
      },
      enqueueForceUpdate: function () {},
      enqueueReplaceState: function () {},
      enqueueSetState: function () {},
    },
    K = Object.assign,
    rl = {};
  function Rl(y, U, J) {
    ((this.props = y),
      (this.context = U),
      (this.refs = rl),
      (this.updater = J || I));
  }
  ((Rl.prototype.isReactComponent = {}),
    (Rl.prototype.setState = function (y, U) {
      if (typeof y != "object" && typeof y != "function" && y != null)
        throw Error(
          "takes an object of state variables to update or a function which returns an object of state variables.",
        );
      this.updater.enqueueSetState(this, y, U, "setState");
    }),
    (Rl.prototype.forceUpdate = function (y) {
      this.updater.enqueueForceUpdate(this, y, "forceUpdate");
    }));
  function Fl() {}
  Fl.prototype = Rl.prototype;
  function vl(y, U, J) {
    ((this.props = y),
      (this.context = U),
      (this.refs = rl),
      (this.updater = J || I));
  }
  var Dl = (vl.prototype = new Fl());
  ((Dl.constructor = vl), K(Dl, Rl.prototype), (Dl.isPureReactComponent = !0));
  var ol = Array.isArray;
  function el() {}
  var dl = { H: null, A: null, T: null, S: null },
    Wt = Object.prototype.hasOwnProperty;
  function Ot(y, U, J) {
    var W = J.ref;
    return {
      $$typeof: s,
      type: y,
      key: U,
      ref: W !== void 0 ? W : null,
      props: J,
    };
  }
  function _t(y, U) {
    return Ot(y.type, U, y.props);
  }
  function vt(y) {
    return typeof y == "object" && y !== null && y.$$typeof === s;
  }
  function Me(y) {
    var U = { "=": "=0", ":": "=2" };
    return (
      "$" +
      y.replace(/[=:]/g, function (J) {
        return U[J];
      })
    );
  }
  var ea = /\/+/g;
  function Xl(y, U) {
    return typeof y == "object" && y !== null && y.key != null
      ? Me("" + y.key)
      : U.toString(36);
  }
  function q(y) {
    switch (y.status) {
      case "fulfilled":
        return y.value;
      case "rejected":
        throw y.reason;
      default:
        switch (
          (typeof y.status == "string"
            ? y.then(el, el)
            : ((y.status = "pending"),
              y.then(
                function (U) {
                  y.status === "pending" &&
                    ((y.status = "fulfilled"), (y.value = U));
                },
                function (U) {
                  y.status === "pending" &&
                    ((y.status = "rejected"), (y.reason = U));
                },
              )),
          y.status)
        ) {
          case "fulfilled":
            return y.value;
          case "rejected":
            throw y.reason;
        }
    }
    throw y;
  }
  function $(y, U, J, W, ml) {
    var yl = typeof y;
    (yl === "undefined" || yl === "boolean") && (y = null);
    var xl = !1;
    if (y === null) xl = !0;
    else
      switch (yl) {
        case "bigint":
        case "string":
        case "number":
          xl = !0;
          break;
        case "object":
          switch (y.$$typeof) {
            case s:
            case f:
              xl = !0;
              break;
            case A:
              return ((xl = y._init), $(xl(y._payload), U, J, W, ml));
          }
      }
    if (xl)
      return (
        (ml = ml(y)),
        (xl = W === "" ? "." + Xl(y, 0) : W),
        ol(ml)
          ? ((J = ""),
            xl != null && (J = xl.replace(ea, "$&/") + "/"),
            $(ml, U, J, "", function (oe) {
              return oe;
            }))
          : ml != null &&
            (vt(ml) &&
              (ml = _t(
                ml,
                J +
                  (ml.key == null || (y && y.key === ml.key)
                    ? ""
                    : ("" + ml.key).replace(ea, "$&/") + "/") +
                  xl,
              )),
            U.push(ml)),
        1
      );
    xl = 0;
    var V = W === "" ? "." : W + ":";
    if (ol(y))
      for (var ll = 0; ll < y.length; ll++)
        ((W = y[ll]), (yl = V + Xl(W, ll)), (xl += $(W, U, J, yl, ml)));
    else if (((ll = Z(y)), typeof ll == "function"))
      for (y = ll.call(y), ll = 0; !(W = y.next()).done; )
        ((W = W.value), (yl = V + Xl(W, ll++)), (xl += $(W, U, J, yl, ml)));
    else if (yl === "object") {
      if (typeof y.then == "function") return $(q(y), U, J, W, ml);
      throw (
        (U = String(y)),
        Error(
          "Objects are not valid as a React child (found: " +
            (U === "[object Object]"
              ? "object with keys {" + Object.keys(y).join(", ") + "}"
              : U) +
            "). If you meant to render a collection of children, use an array instead.",
        )
      );
    }
    return xl;
  }
  function P(y, U, J) {
    if (y == null) return y;
    var W = [],
      ml = 0;
    return (
      $(y, W, "", "", function (yl) {
        return U.call(J, yl, ml++);
      }),
      W
    );
  }
  function Cl(y) {
    if (y._status === -1) {
      var U = y._result,
        J = U();
      (J.then(
        function (W) {
          (y._status === 0 || y._status === -1) &&
            ((y._status = 1),
            (y._result = W),
            J.status === void 0 && ((J.status = "fulfilled"), (J.value = W)));
        },
        function (W) {
          (y._status === 0 || y._status === -1) &&
            ((y._status = 2),
            (y._result = W),
            J.status === void 0 && ((J.status = "rejected"), (J.reason = W)));
        },
      ),
        y._status === -1 && ((y._status = 0), (y._result = J)));
    }
    if (y._status === 1) return y._result.default;
    throw y._result;
  }
  var jl =
    typeof reportError == "function"
      ? reportError
      : function (y) {
          if (
            typeof window == "object" &&
            typeof window.ErrorEvent == "function"
          ) {
            var U = new window.ErrorEvent("error", {
              bubbles: !0,
              cancelable: !0,
              message:
                typeof y == "object" &&
                y !== null &&
                typeof y.message == "string"
                  ? String(y.message)
                  : String(y),
              error: y,
            });
            if (!window.dispatchEvent(U)) return;
          } else if (
            typeof process == "object" &&
            typeof process.emit == "function"
          ) {
            process.emit("uncaughtException", y);
            return;
          }
          console.error(y);
        };
  function Zt(y) {
    var U = dl.T,
      J = {};
    ((J.types = U !== null ? U.types : null), (dl.T = J));
    try {
      var W = y(),
        ml = dl.S;
      (ml !== null && ml(J, W),
        typeof W == "object" &&
          W !== null &&
          typeof W.then == "function" &&
          W.then(el, jl));
    } catch (yl) {
      jl(yl);
    } finally {
      (U !== null && J.types !== null && (U.types = J.types), (dl.T = U));
    }
  }
  function fe(y) {
    var U = dl.T;
    if (U !== null) {
      var J = U.types;
      J === null ? (U.types = [y]) : J.indexOf(y) === -1 && J.push(y);
    } else Zt(fe.bind(null, y));
  }
  var aa = {
    map: P,
    forEach: function (y, U, J) {
      P(
        y,
        function () {
          U.apply(this, arguments);
        },
        J,
      );
    },
    count: function (y) {
      var U = 0;
      return (
        P(y, function () {
          U++;
        }),
        U
      );
    },
    toArray: function (y) {
      return (
        P(y, function (U) {
          return U;
        }) || []
      );
    },
    only: function (y) {
      if (!vt(y))
        throw Error(
          "React.Children.only expected to receive a single React element child.",
        );
      return y;
    },
  };
  return (
    (tl.Activity = E),
    (tl.Children = aa),
    (tl.Component = Rl),
    (tl.Fragment = d),
    (tl.Profiler = S),
    (tl.PureComponent = vl),
    (tl.StrictMode = r),
    (tl.Suspense = _),
    (tl.ViewTransition = Q),
    (tl.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = dl),
    (tl.__COMPILER_RUNTIME = {
      __proto__: null,
      c: function (y) {
        return dl.H.useMemoCache(y);
      },
    }),
    (tl.addTransitionType = fe),
    (tl.cache = function (y) {
      return function () {
        return y.apply(null, arguments);
      };
    }),
    (tl.cacheSignal = function () {
      return null;
    }),
    (tl.cloneElement = function (y, U, J) {
      if (y == null)
        throw Error(
          "The argument must be a React element, but you passed " + y + ".",
        );
      var W = K({}, y.props),
        ml = y.key;
      if (U != null)
        for (yl in (U.key !== void 0 && (ml = "" + U.key), U))
          !Wt.call(U, yl) ||
            yl === "key" ||
            yl === "__self" ||
            yl === "__source" ||
            (yl === "ref" && U.ref === void 0) ||
            (W[yl] = U[yl]);
      var yl = arguments.length - 2;
      if (yl === 1) W.children = J;
      else if (1 < yl) {
        for (var xl = Array(yl), V = 0; V < yl; V++) xl[V] = arguments[V + 2];
        W.children = xl;
      }
      return Ot(y.type, ml, W);
    }),
    (tl.createContext = function (y) {
      return (
        (y = {
          $$typeof: O,
          _currentValue: y,
          _currentValue2: y,
          _threadCount: 0,
          Provider: null,
          Consumer: null,
        }),
        (y.Provider = y),
        (y.Consumer = { $$typeof: g, _context: y }),
        y
      );
    }),
    (tl.createElement = function (y, U, J) {
      var W,
        ml = {},
        yl = null;
      if (U != null)
        for (W in (U.key !== void 0 && (yl = "" + U.key), U))
          Wt.call(U, W) &&
            W !== "key" &&
            W !== "__self" &&
            W !== "__source" &&
            (ml[W] = U[W]);
      var xl = arguments.length - 2;
      if (xl === 1) ml.children = J;
      else if (1 < xl) {
        for (var V = Array(xl), ll = 0; ll < xl; ll++)
          V[ll] = arguments[ll + 2];
        ml.children = V;
      }
      if (y && y.defaultProps)
        for (W in ((xl = y.defaultProps), xl))
          ml[W] === void 0 && (ml[W] = xl[W]);
      return Ot(y, yl, ml);
    }),
    (tl.createRef = function () {
      return { current: null };
    }),
    (tl.forwardRef = function (y) {
      return { $$typeof: D, render: y };
    }),
    (tl.isValidElement = vt),
    (tl.lazy = function (y) {
      return { $$typeof: A, _payload: { _status: -1, _result: y }, _init: Cl };
    }),
    (tl.memo = function (y, U) {
      return { $$typeof: T, type: y, compare: U === void 0 ? null : U };
    }),
    (tl.startTransition = Zt),
    (tl.unstable_useCacheRefresh = function () {
      return dl.H.useCacheRefresh();
    }),
    (tl.use = function (y) {
      return dl.H.use(y);
    }),
    (tl.useActionState = function (y, U, J) {
      return dl.H.useActionState(y, U, J);
    }),
    (tl.useCallback = function (y, U) {
      return dl.H.useCallback(y, U);
    }),
    (tl.useContext = function (y) {
      return dl.H.useContext(y);
    }),
    (tl.useDebugValue = function () {}),
    (tl.useDeferredValue = function (y, U) {
      return dl.H.useDeferredValue(y, U);
    }),
    (tl.useEffect = function (y, U) {
      return dl.H.useEffect(y, U);
    }),
    (tl.useEffectEvent = function (y) {
      return dl.H.useEffectEvent(y);
    }),
    (tl.useId = function () {
      return dl.H.useId();
    }),
    (tl.useImperativeHandle = function (y, U, J) {
      return dl.H.useImperativeHandle(y, U, J);
    }),
    (tl.useInsertionEffect = function (y, U) {
      return dl.H.useInsertionEffect(y, U);
    }),
    (tl.useLayoutEffect = function (y, U) {
      return dl.H.useLayoutEffect(y, U);
    }),
    (tl.useMemo = function (y, U) {
      return dl.H.useMemo(y, U);
    }),
    (tl.useOptimistic = function (y, U) {
      return dl.H.useOptimistic(y, U);
    }),
    (tl.useReducer = function (y, U, J) {
      return dl.H.useReducer(y, U, J);
    }),
    (tl.useRef = function (y) {
      return dl.H.useRef(y);
    }),
    (tl.useState = function (y) {
      return dl.H.useState(y);
    }),
    (tl.useSyncExternalStore = function (y, U, J) {
      return dl.H.useSyncExternalStore(y, U, J);
    }),
    (tl.useTransition = function () {
      return dl.H.useTransition();
    }),
    (tl.version = "19.3.1"),
    tl
  );
}
var v2;
function Yf() {
  return (v2 || ((v2 = 1), (Rf.exports = Om())), Rf.exports);
}
var X = Yf(),
  Lf = { exports: {} },
  gu = {},
  Qf = { exports: {} },
  Hf = {};
var x2;
function _m() {
  return (
    x2 ||
      ((x2 = 1),
      (function (s) {
        function f(q, $) {
          var P = q.length;
          q.push($);
          l: for (; 0 < P; ) {
            var Cl = (P - 1) >>> 1,
              jl = q[Cl];
            if (0 < S(jl, $)) ((q[Cl] = $), (q[P] = jl), (P = Cl));
            else break l;
          }
        }
        function d(q) {
          return q.length === 0 ? null : q[0];
        }
        function r(q) {
          if (q.length === 0) return null;
          var $ = q[0],
            P = q.pop();
          if (P !== $) {
            q[0] = P;
            l: for (var Cl = 0, jl = q.length, Zt = jl >>> 1; Cl < Zt; ) {
              var fe = 2 * (Cl + 1) - 1,
                aa = q[fe],
                y = fe + 1,
                U = q[y];
              if (0 > S(aa, P))
                y < jl && 0 > S(U, aa)
                  ? ((q[Cl] = U), (q[y] = P), (Cl = y))
                  : ((q[Cl] = aa), (q[fe] = P), (Cl = fe));
              else if (y < jl && 0 > S(U, P))
                ((q[Cl] = U), (q[y] = P), (Cl = y));
              else break l;
            }
          }
          return $;
        }
        function S(q, $) {
          var P = q.sortIndex - $.sortIndex;
          return P !== 0 ? P : q.id - $.id;
        }
        if (
          ((s.unstable_now = void 0),
          typeof performance == "object" &&
            typeof performance.now == "function")
        ) {
          var g = performance;
          s.unstable_now = function () {
            return g.now();
          };
        } else {
          var O = Date,
            D = O.now();
          s.unstable_now = function () {
            return O.now() - D;
          };
        }
        var _ = [],
          T = [],
          A = 1,
          E = null,
          Q = 3,
          G = !1,
          Z = !1,
          I = !1,
          K = !1,
          rl = typeof setTimeout == "function" ? setTimeout : null,
          Rl = typeof clearTimeout == "function" ? clearTimeout : null,
          Fl = typeof setImmediate < "u" ? setImmediate : null;
        function vl(q) {
          for (var $ = d(T); $ !== null; ) {
            if ($.callback === null) r(T);
            else if ($.startTime <= q)
              (r(T), ($.sortIndex = $.expirationTime), f(_, $));
            else break;
            $ = d(T);
          }
        }
        function Dl(q) {
          if (((I = !1), vl(q), !Z))
            if (d(_) !== null) ((Z = !0), ol || ((ol = !0), vt()));
            else {
              var $ = d(T);
              $ !== null && Xl(Dl, $.startTime - q);
            }
        }
        var ol = !1,
          el = -1,
          dl = 5,
          Wt = -1;
        function Ot() {
          return K ? !0 : !(s.unstable_now() - Wt < dl);
        }
        function _t() {
          if (((K = !1), ol)) {
            var q = s.unstable_now();
            Wt = q;
            var $ = !0;
            try {
              l: {
                ((Z = !1), I && ((I = !1), Rl(el), (el = -1)), (G = !0));
                var P = Q;
                try {
                  t: {
                    for (
                      vl(q), E = d(_);
                      E !== null && !(E.expirationTime > q && Ot());

                    ) {
                      var Cl = E.callback;
                      if (typeof Cl == "function") {
                        ((E.callback = null), (Q = E.priorityLevel));
                        var jl = Cl(E.expirationTime <= q);
                        if (((q = s.unstable_now()), typeof jl == "function")) {
                          ((E.callback = jl), vl(q), ($ = !0));
                          break t;
                        }
                        (E === d(_) && r(_), vl(q));
                      } else r(_);
                      E = d(_);
                    }
                    if (E !== null) $ = !0;
                    else {
                      var Zt = d(T);
                      (Zt !== null && Xl(Dl, Zt.startTime - q), ($ = !1));
                    }
                  }
                  break l;
                } finally {
                  ((E = null), (Q = P), (G = !1));
                }
                $ = void 0;
              }
            } finally {
              $ ? vt() : (ol = !1);
            }
          }
        }
        var vt;
        if (typeof Fl == "function")
          vt = function () {
            Fl(_t);
          };
        else if (typeof MessageChannel < "u") {
          var Me = new MessageChannel(),
            ea = Me.port2;
          ((Me.port1.onmessage = _t),
            (vt = function () {
              ea.postMessage(null);
            }));
        } else
          vt = function () {
            rl(_t, 0);
          };
        function Xl(q, $) {
          el = rl(function () {
            q(s.unstable_now());
          }, $);
        }
        ((s.unstable_IdlePriority = 5),
          (s.unstable_ImmediatePriority = 1),
          (s.unstable_LowPriority = 4),
          (s.unstable_NormalPriority = 3),
          (s.unstable_Profiling = null),
          (s.unstable_UserBlockingPriority = 2),
          (s.unstable_cancelCallback = function (q) {
            q.callback = null;
          }),
          (s.unstable_forceFrameRate = function (q) {
            0 > q || 125 < q
              ? console.error(
                  "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported",
                )
              : (dl = 0 < q ? Math.floor(1e3 / q) : 5);
          }),
          (s.unstable_getCurrentPriorityLevel = function () {
            return Q;
          }),
          (s.unstable_next = function (q) {
            switch (Q) {
              case 1:
              case 2:
              case 3:
                var $ = 3;
                break;
              default:
                $ = Q;
            }
            var P = Q;
            Q = $;
            try {
              return q();
            } finally {
              Q = P;
            }
          }),
          (s.unstable_requestPaint = function () {
            K = !0;
          }),
          (s.unstable_runWithPriority = function (q, $) {
            switch (q) {
              case 1:
              case 2:
              case 3:
              case 4:
              case 5:
                break;
              default:
                q = 3;
            }
            var P = Q;
            Q = q;
            try {
              return $();
            } finally {
              Q = P;
            }
          }),
          (s.unstable_scheduleCallback = function (q, $, P) {
            var Cl = s.unstable_now();
            switch (
              (typeof P == "object" && P !== null
                ? ((P = P.delay),
                  (P = typeof P == "number" && 0 < P ? Cl + P : Cl))
                : (P = Cl),
              q)
            ) {
              case 1:
                var jl = -1;
                break;
              case 2:
                jl = 250;
                break;
              case 5:
                jl = 1073741823;
                break;
              case 4:
                jl = 1e4;
                break;
              default:
                jl = 5e3;
            }
            return (
              (jl = P + jl),
              (q = {
                id: A++,
                callback: $,
                priorityLevel: q,
                startTime: P,
                expirationTime: jl,
                sortIndex: -1,
              }),
              P > Cl
                ? ((q.sortIndex = P),
                  f(T, q),
                  d(_) === null &&
                    q === d(T) &&
                    (I ? (Rl(el), (el = -1)) : (I = !0), Xl(Dl, P - Cl)))
                : ((q.sortIndex = jl),
                  f(_, q),
                  Z || G || ((Z = !0), ol || ((ol = !0), vt()))),
              q
            );
          }),
          (s.unstable_shouldYield = Ot),
          (s.unstable_wrapCallback = function (q) {
            var $ = Q;
            return function () {
              var P = Q;
              Q = $;
              try {
                return q.apply(this, arguments);
              } finally {
                Q = P;
              }
            };
          }));
      })(Hf)),
    Hf
  );
}
var p2;
function Dm() {
  return (p2 || ((p2 = 1), (Qf.exports = _m())), Qf.exports);
}
var Bf = { exports: {} },
  nt = {};
var j2;
function Um() {
  if (j2) return nt;
  j2 = 1;
  var s = Yf();
  function f(A) {
    var E = "https://react.dev/errors/" + A;
    if (1 < arguments.length) {
      E += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var Q = 2; Q < arguments.length; Q++)
        E += "&args[]=" + encodeURIComponent(arguments[Q]);
    }
    return (
      "Minified React error #" +
      A +
      "; visit " +
      E +
      " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
    );
  }
  function d() {}
  var r = {
      d: {
        f: d,
        r: function () {
          throw Error(f(522));
        },
        D: d,
        C: d,
        L: d,
        m: d,
        X: d,
        S: d,
        M: d,
      },
      p: 0,
      findDOMNode: null,
    },
    S = Symbol.for("react.portal"),
    g = Symbol.for("react.recoverable"),
    O = Symbol.for("react.optimistic_key");
  function D(A, E, Q) {
    var G =
      3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: S,
      key: G == null ? null : G === O ? O : "" + G,
      children: A,
      containerInfo: E,
      implementation: Q,
    };
  }
  var _ = s.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function T(A, E) {
    if (A === "font") return "";
    if (typeof E == "string") return E === "use-credentials" ? E : "";
  }
  return (
    (nt.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = r),
    (nt.browser = function (A) {
      return { $$typeof: g, _reason: A };
    }),
    (nt.createPortal = function (A, E) {
      var Q =
        2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
      if (!E || (E.nodeType !== 1 && E.nodeType !== 9 && E.nodeType !== 11))
        throw Error(f(299));
      return D(A, E, null, Q);
    }),
    (nt.flushSync = function (A) {
      var E = _.T,
        Q = r.p;
      try {
        if (((_.T = null), (r.p = 2), A)) return A();
      } finally {
        ((_.T = E), (r.p = Q), r.d.f());
      }
    }),
    (nt.preconnect = function (A, E) {
      typeof A == "string" &&
        (E
          ? ((E = E.crossOrigin),
            (E =
              typeof E == "string"
                ? E === "use-credentials"
                  ? E
                  : ""
                : void 0))
          : (E = null),
        r.d.C(A, E));
    }),
    (nt.prefetchDNS = function (A) {
      typeof A == "string" && r.d.D(A);
    }),
    (nt.preinit = function (A, E) {
      if (typeof A == "string" && E && typeof E.as == "string") {
        var Q = E.as,
          G = T(Q, E.crossOrigin),
          Z = typeof E.integrity == "string" ? E.integrity : void 0,
          I = typeof E.fetchPriority == "string" ? E.fetchPriority : void 0;
        Q === "style"
          ? r.d.S(A, typeof E.precedence == "string" ? E.precedence : void 0, {
              crossOrigin: G,
              integrity: Z,
              fetchPriority: I,
            })
          : Q === "script" &&
            r.d.X(A, {
              crossOrigin: G,
              integrity: Z,
              fetchPriority: I,
              nonce: typeof E.nonce == "string" ? E.nonce : void 0,
            });
      }
    }),
    (nt.preinitModule = function (A, E) {
      if (typeof A == "string")
        if (typeof E == "object" && E !== null) {
          if (E.as == null || E.as === "script") {
            var Q = T(E.as, E.crossOrigin);
            r.d.M(A, {
              crossOrigin: Q,
              integrity: typeof E.integrity == "string" ? E.integrity : void 0,
              nonce: typeof E.nonce == "string" ? E.nonce : void 0,
              fetchPriority:
                typeof E.fetchPriority == "string" ? E.fetchPriority : void 0,
            });
          }
        } else E == null && r.d.M(A);
    }),
    (nt.preload = function (A, E) {
      if (
        typeof A == "string" &&
        typeof E == "object" &&
        E !== null &&
        typeof E.as == "string"
      ) {
        var Q = E.as,
          G = T(Q, E.crossOrigin);
        r.d.L(A, Q, {
          crossOrigin: G,
          integrity: typeof E.integrity == "string" ? E.integrity : void 0,
          nonce: typeof E.nonce == "string" ? E.nonce : void 0,
          type: typeof E.type == "string" ? E.type : void 0,
          fetchPriority:
            typeof E.fetchPriority == "string" ? E.fetchPriority : void 0,
          referrerPolicy:
            typeof E.referrerPolicy == "string" ? E.referrerPolicy : void 0,
          imageSrcSet:
            typeof E.imageSrcSet == "string" ? E.imageSrcSet : void 0,
          imageSizes: typeof E.imageSizes == "string" ? E.imageSizes : void 0,
          media: typeof E.media == "string" ? E.media : void 0,
        });
      }
    }),
    (nt.preloadModule = function (A, E) {
      if (typeof A == "string")
        if (E) {
          var Q = T(E.as, E.crossOrigin);
          r.d.m(A, {
            as: typeof E.as == "string" && E.as !== "script" ? E.as : void 0,
            crossOrigin: Q,
            integrity: typeof E.integrity == "string" ? E.integrity : void 0,
            nonce: typeof E.nonce == "string" ? E.nonce : void 0,
            fetchPriority:
              typeof E.fetchPriority == "string" ? E.fetchPriority : void 0,
          });
        } else r.d.m(A);
    }),
    (nt.requestFormReset = function (A) {
      r.d.r(A);
    }),
    (nt.unstable_batchedUpdates = function (A, E) {
      return A(E);
    }),
    (nt.useFormState = function (A, E, Q) {
      return _.H.useFormState(A, E, Q);
    }),
    (nt.useFormStatus = function () {
      return _.H.useHostTransitionStatus();
    }),
    (nt.version = "19.3.1"),
    nt
  );
}
var b2;
function Rm() {
  if (b2) return Bf.exports;
  b2 = 1;
  function s() {
    if (
      !(
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
      )
    )
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(s);
      } catch (f) {
        console.error(f);
      }
  }
  return (s(), (Bf.exports = Um()), Bf.exports);
}
var S2;
function Lm() {
  if (S2) return gu;
  S2 = 1;
  var s = Dm(),
    f = Yf(),
    d = Rm();
  function r(l) {
    var t = "https://react.dev/errors/" + l;
    if (1 < arguments.length) {
      t += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var e = 2; e < arguments.length; e++)
        t += "&args[]=" + encodeURIComponent(arguments[e]);
    }
    return (
      "Minified React error #" +
      l +
      "; visit " +
      t +
      " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
    );
  }
  function S(l) {
    return !(!l || (l.nodeType !== 1 && l.nodeType !== 9 && l.nodeType !== 11));
  }
  function g(l) {
    for (var t = l, e = t; e && !e.alternate; )
      ((t = e), (t.flags & 4098) !== 0 && (l = t.return), (e = t.return));
    for (; t.return; ) t = t.return;
    return t.tag === 3 ? l : null;
  }
  function O(l) {
    if (l.tag === 13) {
      var t = l.memoizedState;
      if (
        (t === null && ((l = l.alternate), l !== null && (t = l.memoizedState)),
        t !== null)
      )
        return t.dehydrated;
    }
    return null;
  }
  function D(l) {
    if (l.tag === 31) {
      var t = l.memoizedState;
      if (
        (t === null && ((l = l.alternate), l !== null && (t = l.memoizedState)),
        t !== null)
      )
        return t.dehydrated;
    }
    return null;
  }
  function _(l) {
    if (g(l) !== l) throw Error(r(188));
  }
  function T(l) {
    var t = l.alternate;
    if (!t) {
      if (((t = g(l)), t === null)) throw Error(r(188));
      return t !== l ? null : l;
    }
    for (var e = l, a = t; ; ) {
      var n = e.return;
      if (n === null) break;
      var u = n.alternate;
      if (u === null) {
        if (((a = n.return), a !== null)) {
          e = a;
          continue;
        }
        break;
      }
      if (n.child === u.child) {
        for (u = n.child; u; ) {
          if (u === e) return (_(n), l);
          if (u === a) return (_(n), t);
          u = u.sibling;
        }
        throw Error(r(188));
      }
      if (e.return !== a.return) ((e = n), (a = u));
      else {
        for (var c = !1, o = n.child; o; ) {
          if (o === e) {
            ((c = !0), (e = n), (a = u));
            break;
          }
          if (o === a) {
            ((c = !0), (a = n), (e = u));
            break;
          }
          o = o.sibling;
        }
        if (!c) {
          for (o = u.child; o; ) {
            if (o === e) {
              ((c = !0), (e = u), (a = n));
              break;
            }
            if (o === a) {
              ((c = !0), (a = u), (e = n));
              break;
            }
            o = o.sibling;
          }
          if (!c) throw Error(r(189));
        }
      }
      if (e.alternate !== a) throw Error(r(190));
    }
    if (e.tag !== 3) throw Error(r(188));
    return e.stateNode.current === e ? l : t;
  }
  function A(l) {
    var t = l.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return l;
    for (l = l.child; l !== null; ) {
      if (((t = A(l)), t !== null)) return t;
      l = l.sibling;
    }
    return null;
  }
  function E(l, t, e, a, n, u) {
    for (; l !== null; ) {
      if (
        ((l.tag === 5 || l.tag === 27 || l.tag === 6) && e(l, a, n, u)) ||
        ((l.tag !== 22 || l.memoizedState === null) &&
          (t || (l.tag !== 5 && l.tag !== 27)) &&
          E(l.child, t, e, a, n, u))
      )
        return !0;
      l = l.sibling;
    }
    return !1;
  }
  function Q(l) {
    for (l = l.return; l !== null; ) {
      if (l.tag === 3 || l.tag === 5 || l.tag === 27) return l;
      l = l.return;
    }
    return null;
  }
  function G(l) {
    var t = !1;
    for (
      l = l.return;
      l !== null &&
      (l.tag === 4 && (t = !0), !(l.tag === 3 || l.tag === 5 || l.tag === 27));

    )
      l = l.return;
    return t;
  }
  function Z(l) {
    var t = [null, null],
      e = Q(l);
    return (e === null || I(t, l, e.child, { foundSelf: !1 }), t);
  }
  function I(l, t, e, a) {
    for (; e !== null; ) {
      if (e === t) a.foundSelf = !0;
      else if (e.tag === 5 || e.tag === 27 || e.tag === 6) {
        if (a.foundSelf) return ((l[1] = e), !0);
        l[0] = e;
      } else if (
        (e.tag !== 22 || e.memoizedState === null) &&
        I(l, t, e.child, a)
      )
        return !0;
      e = e.sibling;
    }
    return !1;
  }
  function K(l) {
    switch (l.tag) {
      case 5:
      case 27:
      case 6:
        return l.stateNode;
      case 3:
        return l.stateNode.containerInfo;
      default:
        throw Error(r(559));
    }
  }
  var rl = null,
    Rl = null;
  function Fl(l, t, e) {
    return l === e ? !0 : l === t ? ((rl = l), !0) : !1;
  }
  function vl(l, t, e) {
    return l === e
      ? ((Rl = l), !1)
      : l === t
        ? (Rl !== null && (rl = l), !0)
        : !1;
  }
  function Dl(l) {
    if (l === null) return null;
    do l = l === null ? null : l.return;
    while (l && l.tag !== 5 && l.tag !== 27 && l.tag !== 3);
    return l || null;
  }
  function ol(l, t, e) {
    for (var a = 0, n = l; n; n = e(n)) a++;
    n = 0;
    for (var u = t; u; u = e(u)) n++;
    for (; 0 < a - n; ) ((l = e(l)), a--);
    for (; 0 < n - a; ) ((t = e(t)), n--);
    for (; a--; ) {
      if (l === t || (t !== null && l === t.alternate)) return l;
      ((l = e(l)), (t = e(t)));
    }
    return null;
  }
  var el = Object.assign,
    dl = Symbol.for("react.element"),
    Wt = Symbol.for("react.transitional.element"),
    Ot = Symbol.for("react.portal"),
    _t = Symbol.for("react.fragment"),
    vt = Symbol.for("react.strict_mode"),
    Me = Symbol.for("react.profiler"),
    ea = Symbol.for("react.consumer"),
    Xl = Symbol.for("react.context"),
    q = Symbol.for("react.forward_ref"),
    $ = Symbol.for("react.suspense"),
    P = Symbol.for("react.suspense_list"),
    Cl = Symbol.for("react.memo"),
    jl = Symbol.for("react.lazy"),
    Zt = Symbol.for("react.activity"),
    fe = Symbol.for("react.legacy_hidden"),
    aa = Symbol.for("react.memo_cache_sentinel"),
    y = Symbol.for("react.view_transition"),
    U = Symbol.for("react.recoverable"),
    J = Symbol.iterator;
  function W(l) {
    return l === null || typeof l != "object"
      ? null
      : ((l = (J && l[J]) || l["@@iterator"]),
        typeof l == "function" ? l : null);
  }
  var ml = Symbol.for("react.client.reference");
  function yl(l) {
    if (l == null) return null;
    if (typeof l == "function")
      return l.$$typeof === ml ? null : l.displayName || l.name || null;
    if (typeof l == "string") return l;
    switch (l) {
      case _t:
        return "Fragment";
      case Me:
        return "Profiler";
      case vt:
        return "StrictMode";
      case $:
        return "Suspense";
      case P:
        return "SuspenseList";
      case Zt:
        return "Activity";
      case y:
        return "ViewTransition";
    }
    if (typeof l == "object")
      switch (l.$$typeof) {
        case Ot:
          return "Portal";
        case Xl:
          return l.displayName || "Context";
        case ea:
          return (l._context.displayName || "Context") + ".Consumer";
        case q:
          var t = l.render;
          return (
            (l = l.displayName),
            l ||
              ((l = t.displayName || t.name || ""),
              (l = l !== "" ? "ForwardRef(" + l + ")" : "ForwardRef")),
            l
          );
        case Cl:
          return (
            (t = l.displayName || null),
            t !== null ? t : yl(l.type) || "Memo"
          );
        case jl:
          ((t = l._payload), (l = l._init));
          try {
            return yl(l(t));
          } catch {}
      }
    return null;
  }
  var xl = Array.isArray,
    V = f.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    ll = d.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    oe = { pending: !1, data: null, method: null, action: null },
    $i = [],
    za = -1;
  function Ft(l) {
    return { current: l };
  }
  function $l(l) {
    0 > za || ((l.current = $i[za]), ($i[za] = null), za--);
  }
  function Al(l, t) {
    (za++, ($i[za] = l.current), (l.current = t));
  }
  var $t = Ft(null),
    bn = Ft(null),
    Ce = Ft(null),
    xu = Ft(null);
  function pu(l, t) {
    switch ((Al(Ce, t), Al(bn, l), Al($t, null), t.nodeType)) {
      case 9:
      case 11:
        l = (l = t.documentElement) && (l = l.namespaceURI) ? E0(l) : 0;
        break;
      default:
        if (((l = t.tagName), (t = t.namespaceURI)))
          ((t = E0(t)), (l = N0(t, l)));
        else
          switch (l) {
            case "svg":
              l = 1;
              break;
            case "math":
              l = 2;
              break;
            default:
              l = 0;
          }
    }
    ($l($t), Al($t, l));
  }
  function Aa() {
    ($l($t), $l(bn), $l(Ce));
  }
  function Ii(l) {
    var t = l.memoizedState;
    (t !== null && ((vn._currentValue = t.memoizedState), Al(xu, l)),
      (t = $t.current));
    var e = N0(t, l.type);
    t !== e && (Al(bn, l), Al($t, e));
  }
  function ju(l) {
    (bn.current === l && ($l($t), $l(bn)),
      xu.current === l && ($l(xu), (vn._currentValue = oe)));
  }
  var Pi, wf;
  function ze(l) {
    if (Pi === void 0)
      try {
        throw Error();
      } catch (e) {
        var t = e.stack.trim().match(/\n( *(at )?)/);
        ((Pi = (t && t[1]) || ""),
          (wf =
            -1 <
            e.stack.indexOf(`
    at`)
              ? " (<anonymous>)"
              : -1 < e.stack.indexOf("@")
                ? "@unknown:0:0"
                : ""));
      }
    return (
      `
` +
      Pi +
      l +
      wf
    );
  }
  var lc = !1;
  function tc(l, t) {
    if (!l || lc) return "";
    lc = !0;
    var e = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var a = {
        DetermineComponentFrameRoot: function () {
          try {
            if (t) {
              var C = function () {
                throw Error();
              };
              if (
                (Object.defineProperty(C.prototype, "props", {
                  set: function () {
                    throw Error();
                  },
                }),
                typeof Reflect == "object" && Reflect.construct)
              ) {
                try {
                  Reflect.construct(C, []);
                } catch (R) {
                  var v = R;
                }
                Reflect.construct(l, [], C);
              } else {
                try {
                  C.call();
                } catch (R) {
                  v = R;
                }
                C = !1;
                try {
                  var b = Object.getOwnPropertyDescriptor(l.prototype, "props");
                  (Object.defineProperty(l.prototype, "props", {
                    configurable: !0,
                    set: function () {
                      throw Error();
                    },
                  }),
                    (C = !0),
                    new l());
                } finally {
                  C &&
                    (b !== void 0
                      ? Object.defineProperty(l.prototype, "props", b)
                      : delete l.prototype.props);
                }
              }
            } else {
              try {
                throw Error();
              } catch (R) {
                v = R;
              }
              (C = l()) &&
                typeof C.catch == "function" &&
                C.catch(function () {});
            }
          } catch (R) {
            if (R && v && typeof R.stack == "string") return [R.stack, v.stack];
          }
          return [null, null];
        },
      };
      a.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
      var n = Object.getOwnPropertyDescriptor(
        a.DetermineComponentFrameRoot,
        "name",
      );
      n &&
        n.configurable &&
        Object.defineProperty(a.DetermineComponentFrameRoot, "name", {
          value: "DetermineComponentFrameRoot",
        });
      var u = a.DetermineComponentFrameRoot(),
        c = u[0],
        o = u[1];
      if (c && o) {
        var h = c.split(`
`),
          p = o.split(`
`);
        for (
          n = a = 0;
          a < h.length && !h[a].includes("DetermineComponentFrameRoot");

        )
          a++;
        for (; n < p.length && !p[n].includes("DetermineComponentFrameRoot"); )
          n++;
        if (a === h.length || n === p.length)
          for (
            a = h.length - 1, n = p.length - 1;
            1 <= a && 0 <= n && h[a] !== p[n];

          )
            n--;
        for (; 1 <= a && 0 <= n; a--, n--)
          if (h[a] !== p[n]) {
            if (a !== 1 || n !== 1)
              do
                if ((a--, n--, 0 > n || h[a] !== p[n])) {
                  var N =
                    `
` + h[a].replace(" at new ", " at ");
                  return (
                    l.displayName &&
                      N.includes("<anonymous>") &&
                      (N = N.replace("<anonymous>", l.displayName)),
                    N
                  );
                }
              while (1 <= a && 0 <= n);
            break;
          }
      }
    } finally {
      ((lc = !1), (Error.prepareStackTrace = e));
    }
    return (e = l ? l.displayName || l.name : "") ? ze(e) : "";
  }
  function D2(l, t) {
    switch (l.tag) {
      case 26:
      case 27:
      case 5:
        return ze(l.type);
      case 16:
        return ze("Lazy");
      case 13:
        return l.child !== t && t !== null
          ? ze("Suspense Fallback")
          : ze("Suspense");
      case 19:
        return ze("SuspenseList");
      case 0:
      case 15:
        return tc(l.type, !1);
      case 11:
        return tc(l.type.render, !1);
      case 1:
        return tc(l.type, !0);
      case 31:
        return ze("Activity");
      case 30:
        return ze("ViewTransition");
      default:
        return "";
    }
  }
  function Xf(l) {
    try {
      var t = "",
        e = null;
      do ((t += D2(l, e)), (e = l), (l = l.return));
      while (l);
      return t;
    } catch (a) {
      return (
        `
Error generating stack: ` +
        a.message +
        `
` +
        a.stack
      );
    }
  }
  var ec = Object.prototype.hasOwnProperty,
    ac = s.unstable_scheduleCallback,
    nc = s.unstable_cancelCallback,
    U2 = s.unstable_shouldYield,
    R2 = s.unstable_requestPaint,
    xt = s.unstable_now,
    L2 = s.unstable_getCurrentPriorityLevel,
    Vf = s.unstable_ImmediatePriority,
    kf = s.unstable_UserBlockingPriority,
    bu = s.unstable_NormalPriority,
    Q2 = s.unstable_LowPriority,
    Kf = s.unstable_IdlePriority,
    H2 = s.log,
    B2 = s.unstable_setDisableYieldValue,
    Sn = null,
    pt = null;
  function Ae(l) {
    if (
      (typeof H2 == "function" && B2(l),
      pt && typeof pt.setStrictMode == "function")
    )
      try {
        pt.setStrictMode(Sn, l);
      } catch {}
  }
  var jt = Math.clz32 ? Math.clz32 : Y2,
    q2 = Math.log,
    G2 = Math.LN2;
  function Y2(l) {
    return ((l >>>= 0), l === 0 ? 32 : (31 - ((q2(l) / G2) | 0)) | 0);
  }
  var Su = 256,
    Eu = 262144,
    Nu = 4194304;
  function na(l) {
    var t = l & 42;
    if (t !== 0) return t;
    switch (l & -l) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 4;
      case 8:
        return 8;
      case 16:
        return 16;
      case 32:
        return 32;
      case 64:
        return 64;
      case 128:
        return 128;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
        return l & -l;
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return l & 3932160;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return l & 62914560;
      case 67108864:
        return 67108864;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 0;
      default:
        return l;
    }
  }
  function Tu(l, t, e) {
    var a = l.pendingLanes;
    if (a === 0) return 0;
    var n = 0,
      u = l.suspendedLanes,
      c = l.pingedLanes;
    l = l.warmLanes;
    var o = a & 134217727;
    return (
      o !== 0
        ? ((a = o & ~u),
          a !== 0
            ? (n = na(a))
            : ((c &= o),
              c !== 0
                ? (n = na(c))
                : e || ((e = o & ~l), e !== 0 && (n = na(e)))))
        : ((o = a & ~u),
          o !== 0
            ? (n = na(o))
            : c !== 0
              ? (n = na(c))
              : e || ((e = a & ~l), e !== 0 && (n = na(e)))),
      n === 0
        ? 0
        : t !== 0 &&
            t !== n &&
            (t & u) === 0 &&
            ((u = n & -n),
            (e = t & -t),
            u >= e || (u === 32 && (e & 4194048) !== 0))
          ? t
          : n
    );
  }
  function En(l, t) {
    return (l.pendingLanes & ~(l.suspendedLanes & ~l.pingedLanes) & t) === 0;
  }
  function Jf(l, t) {
    (t & 8) !== 0 && (t |= t & 32);
    var e = l.entangledLanes;
    if (e !== 0)
      for (l = l.entanglements, e &= t; 0 < e; ) {
        var a = 31 - jt(e),
          n = 1 << a;
        ((t |= l[a]), (e &= ~n));
      }
    return t;
  }
  function Z2(l, t) {
    switch (l) {
      case 1:
      case 2:
      case 4:
      case 8:
      case 64:
        return t + 250;
      case 16:
      case 32:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return t + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return -1;
      case 67108864:
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function Wf() {
    var l = Nu;
    return ((Nu <<= 1), (Nu & 62914560) === 0 && (Nu = 4194304), l);
  }
  function uc(l) {
    for (var t = [], e = 0; 31 > e; e++) t.push(l);
    return t;
  }
  function Nn(l, t) {
    ((l.pendingLanes |= t),
      t !== 268435456 &&
        ((l.suspendedLanes = 0), (l.pingedLanes = 0), (l.warmLanes = 0)));
  }
  function w2(l, t, e, a, n, u) {
    var c = l.pendingLanes;
    ((l.pendingLanes = e),
      (l.suspendedLanes = 0),
      (l.pingedLanes = 0),
      (l.warmLanes = 0),
      (l.expiredLanes &= e),
      (l.entangledLanes &= e),
      (l.errorRecoveryDisabledLanes &= e),
      (l.shellSuspendCounter = 0));
    var o = l.entanglements,
      h = l.expirationTimes,
      p = l.hiddenUpdates;
    for (e = c & ~e; 0 < e; ) {
      var N = 31 - jt(e),
        C = 1 << N;
      ((o[N] = 0), (h[N] = -1));
      var v = p[N];
      if (v !== null)
        for (p[N] = null, N = 0; N < v.length; N++) {
          var b = v[N];
          b !== null && (b.lane &= -536870913);
        }
      e &= ~C;
    }
    (a !== 0 && Ff(l, a, 0),
      u !== 0 && n === 0 && l.tag !== 0 && (l.suspendedLanes |= u & ~(c & ~t)));
  }
  function Ff(l, t, e) {
    ((l.pendingLanes |= t), (l.suspendedLanes &= ~t));
    var a = 31 - jt(t);
    ((l.entangledLanes |= t),
      (l.entanglements[a] = l.entanglements[a] | 1073741824 | (e & 261930)));
  }
  function $f(l, t) {
    var e = (l.entangledLanes |= t);
    for (l = l.entanglements; e; ) {
      var a = 31 - jt(e),
        n = 1 << a;
      ((n & t) | (l[a] & t) && (l[a] |= t), (e &= ~n));
    }
  }
  function If(l, t) {
    var e = t & -t;
    return (
      (e = (e & 42) !== 0 ? 1 : ic(e)),
      (e & (l.suspendedLanes | t)) !== 0 ? 0 : e
    );
  }
  function ic(l) {
    switch (l) {
      case 2:
        l = 1;
        break;
      case 8:
        l = 4;
        break;
      case 32:
        l = 16;
        break;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        l = 128;
        break;
      case 268435456:
        l = 134217728;
        break;
      default:
        l = 0;
    }
    return l;
  }
  function cc(l) {
    return (
      (l &= -l),
      2 < l ? (8 < l ? ((l & 134217727) !== 0 ? 32 : 268435456) : 8) : 2
    );
  }
  function Pf() {
    var l = ll.p;
    return l !== 0 ? l : ((l = window.event), l === void 0 ? 32 : c2(l.type));
  }
  function lo(l, t) {
    var e = ll.p;
    try {
      return ((ll.p = l), t());
    } finally {
      ll.p = e;
    }
  }
  var re = Math.random().toString(36).slice(2),
    Il = "__reactFiber$" + re,
    rt = "__reactProps$" + re,
    Oa = "__reactContainer$" + re,
    to = "__reactEvents$" + re,
    X2 = "__reactListeners$" + re,
    V2 = "__reactHandles$" + re,
    eo = "__reactResources$" + re,
    Tn = "__reactMarker$" + re,
    Mu = "__reactLoad$" + re;
  function Cu(l) {
    (delete l[Il], delete l[rt], delete l[X2], delete l[V2]);
  }
  function ua(l) {
    var t;
    if ((t = l[Il])) return t;
    for (var e = l.parentNode; e; ) {
      if ((t = e[Oa] || e[Il])) {
        if (
          ((e = t.alternate),
          t.child !== null || (e !== null && e.child !== null))
        )
          for (l = Y0(l); l !== null; ) {
            if ((e = l[Il])) return e;
            l = Y0(l);
          }
        return t;
      }
      ((l = e), (e = l.parentNode));
    }
    return null;
  }
  function _a(l) {
    if ((l = l[Il] || l[Oa])) {
      var t = l.tag;
      if (
        t === 5 ||
        t === 6 ||
        t === 13 ||
        t === 31 ||
        t === 26 ||
        t === 27 ||
        t === 3
      )
        return l;
    }
    return null;
  }
  function Mn(l) {
    var t = l.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return l.stateNode;
    throw Error(r(33));
  }
  function Da(l) {
    var t = l[eo];
    return (
      t ||
        (t = l[eo] =
          { hoistableStyles: new Map(), hoistableScripts: new Map() }),
      t
    );
  }
  function Vl(l) {
    l[Tn] = !0;
  }
  function ao(l) {
    l[Mu] = void 0;
  }
  var no = new Set(),
    uo = {};
  function ia(l, t) {
    (Ua(l, t), Ua(l + "Capture", t));
  }
  function Ua(l, t) {
    for (uo[l] = t, l = 0; l < t.length; l++) no.add(t[l]);
  }
  var k2 = RegExp(
      "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$",
    ),
    io = {},
    co = {};
  function K2(l) {
    return ec.call(co, l)
      ? !0
      : ec.call(io, l)
        ? !1
        : k2.test(l)
          ? (co[l] = !0)
          : ((io[l] = !0), !1);
  }
  var gl = !1;
  function so() {
    var l = gl;
    return ((gl = !1), l);
  }
  function zu(l, t, e) {
    if (K2(t))
      if (e === null) l.removeAttribute(t);
      else {
        switch (typeof e) {
          case "undefined":
          case "function":
          case "symbol":
            l.removeAttribute(t);
            return;
          case "boolean":
            var a = t.toLowerCase().slice(0, 5);
            if (a !== "data-" && a !== "aria-") {
              l.removeAttribute(t);
              return;
            }
        }
        l.setAttribute(t, e);
      }
  }
  function Au(l, t, e) {
    if (e === null) l.removeAttribute(t);
    else {
      switch (typeof e) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          l.removeAttribute(t);
          return;
      }
      l.setAttribute(t, e);
    }
  }
  function de(l, t, e, a) {
    if (a === null) l.removeAttribute(e);
    else {
      switch (typeof a) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          l.removeAttribute(e);
          return;
      }
      l.setAttributeNS(t, e, a);
    }
  }
  function bt(l) {
    switch (typeof l) {
      case "bigint":
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return l;
      case "object":
        return l;
      default:
        return "";
    }
  }
  function fo(l) {
    var t = l.type;
    return (
      (l = l.nodeName) &&
      l.toLowerCase() === "input" &&
      (t === "checkbox" || t === "radio")
    );
  }
  function J2(l, t, e) {
    var a = Object.getOwnPropertyDescriptor(l.constructor.prototype, t);
    if (
      !l.hasOwnProperty(t) &&
      typeof a < "u" &&
      typeof a.get == "function" &&
      typeof a.set == "function"
    ) {
      var n = a.get,
        u = a.set;
      return (
        Object.defineProperty(l, t, {
          configurable: !0,
          get: function () {
            return n.call(this);
          },
          set: function (c) {
            ((e = "" + c), u.call(this, c));
          },
        }),
        Object.defineProperty(l, t, { enumerable: a.enumerable }),
        {
          getValue: function () {
            return e;
          },
          setValue: function (c) {
            e = "" + c;
          },
          stopTracking: function () {
            ((l._valueTracker = null), delete l[t]);
          },
        }
      );
    }
  }
  function sc(l) {
    if (!l._valueTracker) {
      var t = fo(l) ? "checked" : "value";
      l._valueTracker = J2(l, t, "" + l[t]);
    }
  }
  function oo(l) {
    if (!l) return !1;
    var t = l._valueTracker;
    if (!t) return !0;
    var e = t.getValue(),
      a = "";
    return (
      l && (a = fo(l) ? (l.checked ? "true" : "false") : l.value),
      (l = a),
      l !== e ? (t.setValue(l), !0) : !1
    );
  }
  var W2 = /[\n"\\]/g;
  function Dt(l) {
    return l.replace(W2, function (t) {
      return "\\" + t.charCodeAt(0).toString(16) + " ";
    });
  }
  function fc(l, t, e, a, n, u, c, o) {
    ((l.name = ""),
      c != null &&
      typeof c != "function" &&
      typeof c != "symbol" &&
      typeof c != "boolean"
        ? (l.type = c)
        : l.removeAttribute("type"),
      t != null
        ? c === "number"
          ? ((t === 0 && l.value === "") || l.value != t) &&
            (l.value = "" + bt(t))
          : l.value !== "" + bt(t) && (l.value = "" + bt(t))
        : (c !== "submit" && c !== "reset") || l.removeAttribute("value"),
      t != null
        ? c === "number" && l.value == t
          ? oc(l, bt(l.value))
          : oc(l, bt(t))
        : e != null
          ? oc(l, bt(e))
          : a != null && l.removeAttribute("value"),
      n == null && u != null && (l.defaultChecked = !!u),
      n != null &&
        (l.checked = n && typeof n != "function" && typeof n != "symbol"),
      o != null &&
      typeof o != "function" &&
      typeof o != "symbol" &&
      typeof o != "boolean"
        ? (l.name = "" + bt(o))
        : l.removeAttribute("name"));
  }
  function ro(l, t, e, a, n, u, c, o) {
    if (
      (u != null &&
        typeof u != "function" &&
        typeof u != "symbol" &&
        typeof u != "boolean" &&
        (l.type = u),
      t != null || e != null)
    ) {
      if (!((u !== "submit" && u !== "reset") || t != null)) {
        sc(l);
        return;
      }
      ((e = e != null ? "" + bt(e) : ""),
        (t = t != null ? "" + bt(t) : e),
        o || t === l.value || (l.value = t),
        (l.defaultValue = t));
    }
    ((a = a ?? n),
      (a = typeof a != "function" && typeof a != "symbol" && !!a),
      (l.checked = o ? l.checked : !!a),
      (l.defaultChecked = !!a),
      c != null &&
        typeof c != "function" &&
        typeof c != "symbol" &&
        typeof c != "boolean" &&
        (l.name = c),
      sc(l));
  }
  function oc(l, t) {
    l.defaultValue !== "" + t && (l.defaultValue = "" + t);
  }
  function Ra(l, t, e, a) {
    if (((l = l.options), t)) {
      t = {};
      for (var n = 0; n < e.length; n++) t["$" + e[n]] = !0;
      for (e = 0; e < l.length; e++)
        ((n = t.hasOwnProperty("$" + l[e].value)),
          l[e].selected !== n && (l[e].selected = n),
          n && a && (l[e].defaultSelected = !0));
    } else {
      for (e = "" + bt(e), t = null, n = 0; n < l.length; n++) {
        if (l[n].value === e) {
          ((l[n].selected = !0), a && (l[n].defaultSelected = !0));
          return;
        }
        t !== null || l[n].disabled || (t = l[n]);
      }
      t !== null && (t.selected = !0);
    }
  }
  function ho(l, t, e) {
    if (
      t != null &&
      ((t = "" + bt(t)), t !== l.value && (l.value = t), e == null)
    ) {
      l.defaultValue !== t && (l.defaultValue = t);
      return;
    }
    l.defaultValue = e != null ? "" + bt(e) : "";
  }
  function mo(l, t, e, a) {
    if (t == null) {
      if (a != null) {
        if (e != null) throw Error(r(92));
        if (xl(a)) {
          if (1 < a.length) throw Error(r(93));
          a = a[0];
        }
        e = a;
      }
      (e == null && (e = ""), (t = e));
    }
    ((e = bt(t)),
      (l.defaultValue = e),
      (a = l.textContent),
      a === e && a !== "" && a !== null && (l.value = a),
      sc(l));
  }
  function La(l, t) {
    if (t) {
      var e = l.firstChild;
      if (e && e === l.lastChild && e.nodeType === 3) {
        e.nodeValue = t;
        return;
      }
    }
    l.textContent = t;
  }
  var F2 = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " ",
    ),
  );
  function yo(l, t, e) {
    var a = t.indexOf("--") === 0;
    e == null || typeof e == "boolean" || e === ""
      ? a
        ? l.setProperty(t, "")
        : t === "float"
          ? (l.cssFloat = "")
          : (l[t] = "")
      : a
        ? l.setProperty(t, e)
        : typeof e != "number" || e === 0 || F2.has(t)
          ? t === "float"
            ? (l.cssFloat = e)
            : (l[t] = ("" + e).trim())
          : (l[t] = e + "px");
  }
  function go(l, t, e) {
    if (t != null && typeof t != "object") throw Error(r(62));
    if (((l = l.style), e != null)) {
      for (var a in e)
        !e.hasOwnProperty(a) ||
          (t != null && t.hasOwnProperty(a)) ||
          (a.indexOf("--") === 0
            ? l.setProperty(a, "")
            : a === "float"
              ? (l.cssFloat = "")
              : (l[a] = ""),
          (gl = !0));
      for (var n in t)
        ((a = t[n]),
          t.hasOwnProperty(n) && e[n] !== a && (yo(l, n, a), (gl = !0)));
    } else for (var u in t) t.hasOwnProperty(u) && yo(l, u, t[u]);
  }
  function rc(l) {
    if (l.indexOf("-") === -1) return !1;
    switch (l) {
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return !1;
      default:
        return !0;
    }
  }
  var $2 = new Map([
      ["acceptCharset", "accept-charset"],
      ["htmlFor", "for"],
      ["httpEquiv", "http-equiv"],
      ["crossOrigin", "crossorigin"],
      ["accentHeight", "accent-height"],
      ["alignmentBaseline", "alignment-baseline"],
      ["arabicForm", "arabic-form"],
      ["baselineShift", "baseline-shift"],
      ["capHeight", "cap-height"],
      ["clipPath", "clip-path"],
      ["clipRule", "clip-rule"],
      ["colorInterpolation", "color-interpolation"],
      ["colorInterpolationFilters", "color-interpolation-filters"],
      ["colorProfile", "color-profile"],
      ["colorRendering", "color-rendering"],
      ["dominantBaseline", "dominant-baseline"],
      ["enableBackground", "enable-background"],
      ["fillOpacity", "fill-opacity"],
      ["fillRule", "fill-rule"],
      ["floodColor", "flood-color"],
      ["floodOpacity", "flood-opacity"],
      ["fontFamily", "font-family"],
      ["fontSize", "font-size"],
      ["fontSizeAdjust", "font-size-adjust"],
      ["fontStretch", "font-stretch"],
      ["fontStyle", "font-style"],
      ["fontVariant", "font-variant"],
      ["fontWeight", "font-weight"],
      ["glyphName", "glyph-name"],
      ["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
      ["glyphOrientationVertical", "glyph-orientation-vertical"],
      ["horizAdvX", "horiz-adv-x"],
      ["horizOriginX", "horiz-origin-x"],
      ["imageRendering", "image-rendering"],
      ["letterSpacing", "letter-spacing"],
      ["lightingColor", "lighting-color"],
      ["markerEnd", "marker-end"],
      ["markerMid", "marker-mid"],
      ["markerStart", "marker-start"],
      ["maskType", "mask-type"],
      ["overlinePosition", "overline-position"],
      ["overlineThickness", "overline-thickness"],
      ["paintOrder", "paint-order"],
      ["panose-1", "panose-1"],
      ["pointerEvents", "pointer-events"],
      ["renderingIntent", "rendering-intent"],
      ["shapeRendering", "shape-rendering"],
      ["stopColor", "stop-color"],
      ["stopOpacity", "stop-opacity"],
      ["strikethroughPosition", "strikethrough-position"],
      ["strikethroughThickness", "strikethrough-thickness"],
      ["strokeDasharray", "stroke-dasharray"],
      ["strokeDashoffset", "stroke-dashoffset"],
      ["strokeLinecap", "stroke-linecap"],
      ["strokeLinejoin", "stroke-linejoin"],
      ["strokeMiterlimit", "stroke-miterlimit"],
      ["strokeOpacity", "stroke-opacity"],
      ["strokeWidth", "stroke-width"],
      ["textAnchor", "text-anchor"],
      ["textDecoration", "text-decoration"],
      ["textRendering", "text-rendering"],
      ["transformOrigin", "transform-origin"],
      ["underlinePosition", "underline-position"],
      ["underlineThickness", "underline-thickness"],
      ["unicodeBidi", "unicode-bidi"],
      ["unicodeRange", "unicode-range"],
      ["unitsPerEm", "units-per-em"],
      ["vAlphabetic", "v-alphabetic"],
      ["vHanging", "v-hanging"],
      ["vIdeographic", "v-ideographic"],
      ["vMathematical", "v-mathematical"],
      ["vectorEffect", "vector-effect"],
      ["vertAdvY", "vert-adv-y"],
      ["vertOriginX", "vert-origin-x"],
      ["vertOriginY", "vert-origin-y"],
      ["wordSpacing", "word-spacing"],
      ["writingMode", "writing-mode"],
      ["xmlnsXlink", "xmlns:xlink"],
      ["xHeight", "x-height"],
    ]),
    I2 =
      /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function Ou(l) {
    return I2.test("" + l)
      ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
      : l;
  }
  function It() {}
  var dc = null;
  function hc(l) {
    return (
      (l = l.target || l.srcElement || window),
      l.correspondingUseElement && (l = l.correspondingUseElement),
      l.nodeType === 3 ? l.parentNode : l
    );
  }
  var Qa = null,
    Ha = null;
  function vo(l) {
    var t = _a(l);
    if (t && (l = t.stateNode)) {
      var e = l[rt] || null;
      l: switch (((l = t.stateNode), t.type)) {
        case "input":
          if (
            (fc(
              l,
              e.value,
              e.defaultValue,
              e.defaultValue,
              e.checked,
              e.defaultChecked,
              e.type,
              e.name,
            ),
            (t = e.name),
            e.type === "radio" && t != null)
          ) {
            for (e = l; e.parentNode; ) e = e.parentNode;
            for (
              e = e.querySelectorAll(
                'input[name="' + Dt("" + t) + '"][type="radio"]',
              ),
                t = 0;
              t < e.length;
              t++
            ) {
              var a = e[t];
              if (a !== l && a.form === l.form) {
                var n = a[rt] || null;
                if (!n) throw Error(r(90));
                fc(
                  a,
                  n.value,
                  n.defaultValue,
                  n.defaultValue,
                  n.checked,
                  n.defaultChecked,
                  n.type,
                  n.name,
                );
              }
            }
            for (t = 0; t < e.length; t++)
              ((a = e[t]), a.form === l.form && oo(a));
          }
          break l;
        case "textarea":
          ho(l, e.value, e.defaultValue);
          break l;
        case "select":
          ((t = e.value), t != null && Ra(l, !!e.multiple, t, !1));
      }
    }
  }
  var mc = !1;
  function xo(l, t, e) {
    if (mc) return l(t, e);
    mc = !0;
    try {
      var a = l(t);
      return a;
    } finally {
      if (
        ((mc = !1),
        (Qa !== null || Ha !== null) &&
          (Oi(), Qa && ((t = Qa), (l = Ha), (Ha = Qa = null), vo(t), l)))
      )
        for (t = 0; t < l.length; t++) vo(l[t]);
    }
  }
  function Cn(l, t) {
    var e = l.stateNode;
    if (e === null) return null;
    var a = e[rt] || null;
    if (a === null) return null;
    e = a[t];
    l: switch (t) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
      case "onMouseEnter":
        ((a = !a.disabled) ||
          ((l = l.type),
          (a = !(
            l === "button" ||
            l === "input" ||
            l === "select" ||
            l === "textarea"
          ))),
          (l = !a));
        break l;
      default:
        l = !1;
    }
    if (l) return null;
    if (e && typeof e != "function") throw Error(r(231, t, typeof e));
    return e;
  }
  var he = !(
      typeof window > "u" ||
      typeof window.document > "u" ||
      typeof window.document.createElement > "u"
    ),
    yc = !1;
  if (he)
    try {
      var zn = {};
      (Object.defineProperty(zn, "passive", {
        get: function () {
          yc = !0;
        },
      }),
        window.addEventListener("test", zn, zn),
        window.removeEventListener("test", zn, zn));
    } catch {
      yc = !1;
    }
  var Oe = null,
    gc = null,
    _u = null;
  function po() {
    if (_u) return _u;
    var l,
      t = gc,
      e = t.length,
      a,
      n = "value" in Oe ? Oe.value : Oe.textContent,
      u = n.length;
    for (l = 0; l < e && t[l] === n[l]; l++);
    var c = e - l;
    for (a = 1; a <= c && t[e - a] === n[u - a]; a++);
    return (_u = n.slice(l, 1 < a ? 1 - a : void 0));
  }
  function Du(l) {
    var t = l.keyCode;
    return (
      "charCode" in l
        ? ((l = l.charCode), l === 0 && t === 13 && (l = 13))
        : (l = t),
      l === 10 && (l = 13),
      32 <= l || l === 13 ? l : 0
    );
  }
  function Uu() {
    return !0;
  }
  function jo() {
    return !1;
  }
  function it(l) {
    function t(e, a, n, u, c) {
      ((this._reactName = e),
        (this._targetInst = n),
        (this.type = a),
        (this.nativeEvent = u),
        (this.target = c),
        (this.currentTarget = null));
      for (var o in l)
        l.hasOwnProperty(o) && ((e = l[o]), (this[o] = e ? e(u) : u[o]));
      return (
        (this.isDefaultPrevented = (
          u.defaultPrevented != null ? u.defaultPrevented : u.returnValue === !1
        )
          ? Uu
          : jo),
        (this.isPropagationStopped = jo),
        this
      );
    }
    return (
      el(t.prototype, {
        preventDefault: function () {
          this.defaultPrevented = !0;
          var e = this.nativeEvent;
          e &&
            (e.preventDefault
              ? e.preventDefault()
              : typeof e.returnValue != "unknown" && (e.returnValue = !1),
            (this.isDefaultPrevented = Uu));
        },
        stopPropagation: function () {
          var e = this.nativeEvent;
          e &&
            (e.stopPropagation
              ? e.stopPropagation()
              : typeof e.cancelBubble != "unknown" && (e.cancelBubble = !0),
            (this.isPropagationStopped = Uu));
        },
        persist: function () {},
        isPersistent: Uu,
      }),
      t
    );
  }
  var _e = {
      eventPhase: 0,
      bubbles: 0,
      cancelable: 0,
      timeStamp: function (l) {
        return l.timeStamp || Date.now();
      },
      defaultPrevented: 0,
      isTrusted: 0,
    },
    Ru = it(_e),
    An = el({}, _e, { view: 0, detail: 0 }),
    P2 = it(An),
    vc,
    xc,
    On,
    Lu = el({}, An, {
      screenX: 0,
      screenY: 0,
      clientX: 0,
      clientY: 0,
      pageX: 0,
      pageY: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      getModifierState: jc,
      button: 0,
      buttons: 0,
      relatedTarget: function (l) {
        return l.relatedTarget === void 0
          ? l.fromElement === l.srcElement
            ? l.toElement
            : l.fromElement
          : l.relatedTarget;
      },
      movementX: function (l) {
        return "movementX" in l
          ? l.movementX
          : (l !== On &&
              (On && l.type === "mousemove"
                ? ((vc = l.screenX - On.screenX), (xc = l.screenY - On.screenY))
                : (xc = vc = 0),
              (On = l)),
            vc);
      },
      movementY: function (l) {
        return "movementY" in l ? l.movementY : xc;
      },
    }),
    bo = it(Lu),
    lh = el({}, Lu, { dataTransfer: 0 }),
    th = it(lh),
    eh = el({}, An, { relatedTarget: 0 }),
    pc = it(eh),
    ah = el({}, _e, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
    nh = it(ah),
    uh = el({}, _e, {
      clipboardData: function (l) {
        return "clipboardData" in l ? l.clipboardData : window.clipboardData;
      },
    }),
    ih = it(uh),
    ch = el({}, _e, { data: 0 }),
    So = it(ch),
    sh = {
      Esc: "Escape",
      Spacebar: " ",
      Left: "ArrowLeft",
      Up: "ArrowUp",
      Right: "ArrowRight",
      Down: "ArrowDown",
      Del: "Delete",
      Win: "OS",
      Menu: "ContextMenu",
      Apps: "ContextMenu",
      Scroll: "ScrollLock",
      MozPrintableKey: "Unidentified",
    },
    fh = {
      8: "Backspace",
      9: "Tab",
      12: "Clear",
      13: "Enter",
      16: "Shift",
      17: "Control",
      18: "Alt",
      19: "Pause",
      20: "CapsLock",
      27: "Escape",
      32: " ",
      33: "PageUp",
      34: "PageDown",
      35: "End",
      36: "Home",
      37: "ArrowLeft",
      38: "ArrowUp",
      39: "ArrowRight",
      40: "ArrowDown",
      45: "Insert",
      46: "Delete",
      112: "F1",
      113: "F2",
      114: "F3",
      115: "F4",
      116: "F5",
      117: "F6",
      118: "F7",
      119: "F8",
      120: "F9",
      121: "F10",
      122: "F11",
      123: "F12",
      144: "NumLock",
      145: "ScrollLock",
      224: "Meta",
    },
    oh = {
      Alt: "altKey",
      Control: "ctrlKey",
      Meta: "metaKey",
      Shift: "shiftKey",
    };
  function rh(l) {
    var t = this.nativeEvent;
    return t.getModifierState
      ? t.getModifierState(l)
      : (l = oh[l])
        ? !!t[l]
        : !1;
  }
  function jc() {
    return rh;
  }
  var dh = el({}, An, {
      key: function (l) {
        if (l.key) {
          var t = sh[l.key] || l.key;
          if (t !== "Unidentified") return t;
        }
        return l.type === "keypress"
          ? ((l = Du(l)), l === 13 ? "Enter" : String.fromCharCode(l))
          : l.type === "keydown" || l.type === "keyup"
            ? fh[l.keyCode] || "Unidentified"
            : "";
      },
      code: 0,
      location: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      repeat: 0,
      locale: 0,
      getModifierState: jc,
      charCode: function (l) {
        return l.type === "keypress" ? Du(l) : 0;
      },
      keyCode: function (l) {
        return l.type === "keydown" || l.type === "keyup" ? l.keyCode : 0;
      },
      which: function (l) {
        return l.type === "keypress"
          ? Du(l)
          : l.type === "keydown" || l.type === "keyup"
            ? l.keyCode
            : 0;
      },
    }),
    hh = it(dh),
    mh = el({}, Lu, {
      pointerId: 0,
      width: 0,
      height: 0,
      pressure: 0,
      tangentialPressure: 0,
      tiltX: 0,
      tiltY: 0,
      twist: 0,
      pointerType: 0,
      isPrimary: 0,
    }),
    Eo = it(mh),
    yh = el({}, _e, { submitter: 0 }),
    gh = it(yh),
    vh = el({}, An, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: jc,
    }),
    xh = it(vh),
    ph = el({}, _e, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
    jh = it(ph),
    bh = el({}, Lu, {
      deltaX: function (l) {
        return "deltaX" in l
          ? l.deltaX
          : "wheelDeltaX" in l
            ? -l.wheelDeltaX
            : 0;
      },
      deltaY: function (l) {
        return "deltaY" in l
          ? l.deltaY
          : "wheelDeltaY" in l
            ? -l.wheelDeltaY
            : "wheelDelta" in l
              ? -l.wheelDelta
              : 0;
      },
      deltaZ: 0,
      deltaMode: 0,
    }),
    Sh = it(bh),
    Eh = el({}, _e, { newState: 0, oldState: 0, source: 0 }),
    Nh = it(Eh),
    Th = [9, 13, 27, 32],
    bc = he && "CompositionEvent" in window,
    _n = null;
  he && "documentMode" in document && (_n = document.documentMode);
  var Mh = he && "TextEvent" in window && !_n,
    No = he && (!bc || (_n && 8 < _n && 11 >= _n)),
    To = " ",
    Mo = !1;
  function Co(l, t) {
    switch (l) {
      case "keyup":
        return Th.indexOf(t.keyCode) !== -1;
      case "keydown":
        return t.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function zo(l) {
    return (
      (l = l.detail),
      typeof l == "object" && "data" in l ? l.data : null
    );
  }
  var Ba = !1;
  function Ch(l, t) {
    switch (l) {
      case "compositionend":
        return zo(t);
      case "keypress":
        return t.which !== 32 ? null : ((Mo = !0), To);
      case "textInput":
        return ((l = t.data), l === To && Mo ? null : l);
      default:
        return null;
    }
  }
  function zh(l, t) {
    if (Ba)
      return l === "compositionend" || (!bc && Co(l, t))
        ? ((l = po()), (_u = gc = Oe = null), (Ba = !1), l)
        : null;
    switch (l) {
      case "paste":
        return null;
      case "keypress":
        if (!(t.ctrlKey || t.altKey || t.metaKey) || (t.ctrlKey && t.altKey)) {
          if (t.char && 1 < t.char.length) return t.char;
          if (t.which) return String.fromCharCode(t.which);
        }
        return null;
      case "compositionend":
        return No && t.locale !== "ko" ? null : t.data;
      default:
        return null;
    }
  }
  var Ah = {
    color: !0,
    date: !0,
    datetime: !0,
    "datetime-local": !0,
    email: !0,
    month: !0,
    number: !0,
    password: !0,
    range: !0,
    search: !0,
    tel: !0,
    text: !0,
    time: !0,
    url: !0,
    week: !0,
  };
  function Ao(l) {
    var t = l && l.nodeName && l.nodeName.toLowerCase();
    return t === "input" ? !!Ah[l.type] : t === "textarea";
  }
  function Oo(l, t, e, a) {
    (Qa ? (Ha ? Ha.push(a) : (Ha = [a])) : (Qa = a),
      (t = Qi(t, "onChange")),
      0 < t.length &&
        ((e = new Ru("onChange", "change", null, e, a)),
        l.push({ event: e, listeners: t })));
  }
  var Dn = null,
    Un = null;
  function Oh(l) {
    v0(l, 0);
  }
  function Qu(l) {
    var t = Mn(l);
    if (oo(t)) return l;
  }
  function _o(l, t) {
    if (l === "change") return t;
  }
  var Do = !1;
  if (he) {
    var Sc;
    if (he) {
      var Ec = "oninput" in document;
      if (!Ec) {
        var Uo = document.createElement("div");
        (Uo.setAttribute("oninput", "return;"),
          (Ec = typeof Uo.oninput == "function"));
      }
      Sc = Ec;
    } else Sc = !1;
    Do = Sc && (!document.documentMode || 9 < document.documentMode);
  }
  function Ro() {
    Dn && (Dn.detachEvent("onpropertychange", Lo), (Un = Dn = null));
  }
  function Lo(l) {
    if (l.propertyName === "value" && Qu(Un)) {
      var t = [];
      (Oo(t, Un, l, hc(l)), xo(Oh, t));
    }
  }
  function _h(l, t, e) {
    l === "focusin"
      ? (Ro(), (Dn = t), (Un = e), Dn.attachEvent("onpropertychange", Lo))
      : l === "focusout" && Ro();
  }
  function Dh(l) {
    if (l === "selectionchange" || l === "keyup" || l === "keydown")
      return Qu(Un);
  }
  function Uh(l, t) {
    if (l === "click") return Qu(t);
  }
  function Rh(l, t) {
    if (l === "input" || l === "change") return Qu(t);
  }
  function Lh(l, t) {
    return (l === t && (l !== 0 || 1 / l === 1 / t)) || (l !== l && t !== t);
  }
  var St = typeof Object.is == "function" ? Object.is : Lh;
  function Rn(l, t) {
    if (St(l, t)) return !0;
    if (
      typeof l != "object" ||
      l === null ||
      typeof t != "object" ||
      t === null
    )
      return !1;
    var e = Object.keys(l),
      a = Object.keys(t);
    if (e.length !== a.length) return !1;
    for (a = 0; a < e.length; a++) {
      var n = e[a];
      if (!ec.call(t, n) || !St(l[n], t[n])) return !1;
    }
    return !0;
  }
  function Nc(l) {
    if (
      ((l = l || (typeof document < "u" ? document : void 0)), typeof l > "u")
    )
      return null;
    try {
      return l.activeElement || l.body;
    } catch {
      return l.body;
    }
  }
  function Qo(l) {
    for (; l && l.firstChild; ) l = l.firstChild;
    return l;
  }
  function Ho(l, t) {
    var e = Qo(l);
    l = 0;
    for (var a; e; ) {
      if (e.nodeType === 3) {
        if (((a = l + e.textContent.length), l <= t && a >= t))
          return { node: e, offset: t - l };
        l = a;
      }
      l: {
        for (; e; ) {
          if (e.nextSibling) {
            e = e.nextSibling;
            break l;
          }
          e = e.parentNode;
        }
        e = void 0;
      }
      e = Qo(e);
    }
  }
  function Bo(l, t) {
    return l && t
      ? l === t
        ? !0
        : l && l.nodeType === 3
          ? !1
          : t && t.nodeType === 3
            ? Bo(l, t.parentNode)
            : "contains" in l
              ? l.contains(t)
              : l.compareDocumentPosition
                ? !!(l.compareDocumentPosition(t) & 16)
                : !1
      : !1;
  }
  function qo(l) {
    l =
      l != null &&
      l.ownerDocument != null &&
      l.ownerDocument.defaultView != null
        ? l.ownerDocument.defaultView
        : window;
    for (var t = Nc(l.document); t instanceof l.HTMLIFrameElement; ) {
      try {
        var e = typeof t.contentWindow.location.href == "string";
      } catch {
        e = !1;
      }
      if (e) l = t.contentWindow;
      else break;
      t = Nc(l.document);
    }
    return t;
  }
  function Tc(l) {
    var t = l && l.nodeName && l.nodeName.toLowerCase();
    return (
      t &&
      ((t === "input" &&
        (l.type === "text" ||
          l.type === "search" ||
          l.type === "tel" ||
          l.type === "url" ||
          l.type === "password")) ||
        t === "textarea" ||
        l.contentEditable === "true")
    );
  }
  var Qh = he && "documentMode" in document && 11 >= document.documentMode,
    qa = null,
    Mc = null,
    Ln = null,
    Cc = !1;
  function Go(l, t, e) {
    var a =
      e.window === e ? e.document : e.nodeType === 9 ? e : e.ownerDocument;
    Cc ||
      qa == null ||
      qa !== Nc(a) ||
      ((a = qa),
      "selectionStart" in a && Tc(a)
        ? (a = { start: a.selectionStart, end: a.selectionEnd })
        : ((a = (
            (a.ownerDocument && a.ownerDocument.defaultView) ||
            window
          ).getSelection()),
          (a = {
            anchorNode: a.anchorNode,
            anchorOffset: a.anchorOffset,
            focusNode: a.focusNode,
            focusOffset: a.focusOffset,
          })),
      (Ln && Rn(Ln, a)) ||
        ((Ln = a),
        (a = Qi(Mc, "onSelect")),
        0 < a.length &&
          ((t = new Ru("onSelect", "select", null, t, e)),
          l.push({ event: t, listeners: a }),
          (t.target = qa))));
  }
  function ca(l, t) {
    var e = {};
    return (
      (e[l.toLowerCase()] = t.toLowerCase()),
      (e["Webkit" + l] = "webkit" + t),
      (e["Moz" + l] = "moz" + t),
      e
    );
  }
  var Ga = {
      animationend: ca("Animation", "AnimationEnd"),
      animationiteration: ca("Animation", "AnimationIteration"),
      animationstart: ca("Animation", "AnimationStart"),
      transitionrun: ca("Transition", "TransitionRun"),
      transitionstart: ca("Transition", "TransitionStart"),
      transitioncancel: ca("Transition", "TransitionCancel"),
      transitionend: ca("Transition", "TransitionEnd"),
    },
    zc = {},
    Yo = {};
  he &&
    ((Yo = document.createElement("div").style),
    "AnimationEvent" in window ||
      (delete Ga.animationend.animation,
      delete Ga.animationiteration.animation,
      delete Ga.animationstart.animation),
    "TransitionEvent" in window || delete Ga.transitionend.transition);
  function sa(l) {
    if (zc[l]) return zc[l];
    if (!Ga[l]) return l;
    var t = Ga[l],
      e;
    for (e in t) if (t.hasOwnProperty(e) && e in Yo) return (zc[l] = t[e]);
    return l;
  }
  var Zo = sa("animationend"),
    wo = sa("animationiteration"),
    Xo = sa("animationstart"),
    Hh = sa("transitionrun"),
    Bh = sa("transitionstart"),
    qh = sa("transitioncancel"),
    Vo = sa("transitionend"),
    ko = new Map(),
    Ac =
      "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error fullscreenChange fullscreenError gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
        " ",
      );
  Ac.push("scrollEnd");
  function wt(l, t) {
    (ko.set(l, t), ia(t, [l]));
  }
  var Gh = 0;
  function me(l, t) {
    if (l.name != null && l.name !== "auto") return l.name;
    if (t.autoName !== null) return t.autoName;
    l = Kt.identifierPrefix;
    var e = Gh++;
    return ((l = "_" + l + "t_" + e.toString(32) + "_"), (t.autoName = l));
  }
  function Ko(l) {
    if (l == null || typeof l == "string") return l;
    var t = null,
      e = cn;
    if (e !== null)
      for (var a = 0; a < e.length; a++) {
        var n = l[e[a]];
        if (n != null) {
          if (n === "none") return "none";
          t = t == null ? n : t + (" " + n);
        }
      }
    return t ?? l.default;
  }
  function ye(l, t) {
    return (
      (l = Ko(l)),
      (t = Ko(t)),
      t == null ? (l === "auto" ? null : l) : t === "auto" ? null : t
    );
  }
  var Hu =
      typeof reportError == "function"
        ? reportError
        : function (l) {
            if (
              typeof window == "object" &&
              typeof window.ErrorEvent == "function"
            ) {
              var t = new window.ErrorEvent("error", {
                bubbles: !0,
                cancelable: !0,
                message:
                  typeof l == "object" &&
                  l !== null &&
                  typeof l.message == "string"
                    ? String(l.message)
                    : String(l),
                error: l,
              });
              if (!window.dispatchEvent(t)) return;
            } else if (
              typeof process == "object" &&
              typeof process.emit == "function"
            ) {
              process.emit("uncaughtException", l);
              return;
            }
            console.error(l);
          },
    Ut = [],
    Ya = 0,
    Oc = 0;
  function Bu() {
    for (var l = Ya, t = (Oc = Ya = 0); t < l; ) {
      var e = Ut[t];
      Ut[t++] = null;
      var a = Ut[t];
      Ut[t++] = null;
      var n = Ut[t];
      Ut[t++] = null;
      var u = Ut[t];
      if (((Ut[t++] = null), a !== null && n !== null)) {
        var c = a.pending;
        (c === null ? (n.next = n) : ((n.next = c.next), (c.next = n)),
          (a.pending = n));
      }
      u !== 0 && Jo(e, n, u);
    }
  }
  function qu(l, t, e, a) {
    ((Ut[Ya++] = l),
      (Ut[Ya++] = t),
      (Ut[Ya++] = e),
      (Ut[Ya++] = a),
      (Oc |= a),
      (l.lanes |= a),
      (l = l.alternate),
      l !== null && (l.lanes |= a));
  }
  function _c(l, t, e, a) {
    return (qu(l, t, e, a), Gu(l));
  }
  function fa(l, t) {
    return (qu(l, null, null, t), Gu(l));
  }
  function Jo(l, t, e) {
    l.lanes |= e;
    var a = l.alternate;
    a !== null && (a.lanes |= e);
    for (var n = !1, u = l.return; u !== null; )
      ((u.childLanes |= e),
        (a = u.alternate),
        a !== null && (a.childLanes |= e),
        u.tag === 22 &&
          ((l = u.stateNode), l === null || l._visibility & 1 || (n = !0)),
        (l = u),
        (u = u.return));
    return l.tag === 3
      ? ((u = l.stateNode),
        n &&
          t !== null &&
          ((n = 31 - jt(e)),
          (l = u.hiddenUpdates),
          (a = l[n]),
          a === null ? (l[n] = [t]) : a.push(t),
          (t.lane = e | 536870912)),
        u)
      : null;
  }
  function Gu(l) {
    if (50 < au) throw ((au = 0), (Ai = null), Error(r(185)));
    for (var t = l.return; t !== null; ) ((l = t), (t = l.return));
    return l.tag === 3 ? l.stateNode : null;
  }
  var Za = {};
  function Yh(l, t, e, a) {
    ((this.tag = l),
      (this.key = e),
      (this.sibling =
        this.child =
        this.return =
        this.stateNode =
        this.type =
        this.elementType =
          null),
      (this.index = 0),
      (this.refCleanup = this.ref = null),
      (this.pendingProps = t),
      (this.dependencies =
        this.memoizedState =
        this.updateQueue =
        this.memoizedProps =
          null),
      (this.mode = a),
      (this.subtreeFlags = this.flags = 0),
      (this.deletions = null),
      (this.childLanes = this.lanes = 0),
      (this.alternate = null));
  }
  function dt(l, t, e, a) {
    return new Yh(l, t, e, a);
  }
  function Dc(l) {
    return ((l = l.prototype), !(!l || !l.isReactComponent));
  }
  function ge(l, t) {
    var e = l.alternate;
    return (
      e === null
        ? ((e = dt(l.tag, t, l.key, l.mode)),
          (e.elementType = l.elementType),
          (e.type = l.type),
          (e.stateNode = l.stateNode),
          (e.alternate = l),
          (l.alternate = e))
        : ((e.pendingProps = t),
          (e.type = l.type),
          (e.flags = 0),
          (e.subtreeFlags = 0),
          (e.deletions = null)),
      (e.flags = l.flags & 1206910976),
      (e.childLanes = l.childLanes),
      (e.lanes = l.lanes),
      (e.child = l.child),
      (e.memoizedProps = l.memoizedProps),
      (e.memoizedState = l.memoizedState),
      (e.updateQueue = l.updateQueue),
      (t = l.dependencies),
      (e.dependencies =
        t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }),
      (e.sibling = l.sibling),
      (e.index = l.index),
      (e.ref = l.ref),
      (e.refCleanup = l.refCleanup),
      e
    );
  }
  function Wo(l, t) {
    l.flags &= 1206910978;
    var e = l.alternate;
    return (
      e === null
        ? ((l.childLanes = 0),
          (l.lanes = t),
          (l.child = null),
          (l.subtreeFlags = 0),
          (l.memoizedProps = null),
          (l.memoizedState = null),
          (l.updateQueue = null),
          (l.dependencies = null),
          (l.stateNode = null))
        : ((l.childLanes = e.childLanes),
          (l.lanes = e.lanes),
          (l.child = e.child),
          (l.subtreeFlags = 0),
          (l.deletions = null),
          (l.memoizedProps = e.memoizedProps),
          (l.memoizedState = e.memoizedState),
          (l.updateQueue = e.updateQueue),
          (l.type = e.type),
          (t = e.dependencies),
          (l.dependencies =
            t === null
              ? null
              : { lanes: t.lanes, firstContext: t.firstContext })),
      l
    );
  }
  function Yu(l, t, e, a, n, u) {
    var c = 0;
    if (((a = l), typeof a == "function")) Dc(a) && (c = 1);
    else if (typeof a == "string")
      c = ym(l, e, $t.current)
        ? 26
        : l === "html" || l === "head" || l === "body"
          ? 27
          : 5;
    else
      l: switch (a) {
        case Zt:
          return (
            (l = dt(31, e, t, n)),
            (l.elementType = Zt),
            (l.lanes = u),
            l
          );
        case _t:
          return oa(e.children, n, u, t);
        case vt:
          ((c = 8), (n |= 24));
          break;
        case Me:
          return (
            (l = dt(12, e, t, n | 2)),
            (l.elementType = Me),
            (l.lanes = u),
            l
          );
        case $:
          return ((l = dt(13, e, t, n)), (l.elementType = $), (l.lanes = u), l);
        case P:
          return ((l = dt(19, e, t, n)), (l.elementType = P), (l.lanes = u), l);
        case fe:
        case y:
          return (
            (l = n | 32),
            (l = dt(30, e, t, l)),
            (l.elementType = y),
            (l.lanes = u),
            (l.stateNode = {
              autoName: null,
              paired: null,
              clones: null,
              ref: null,
            }),
            l
          );
        default:
          if (typeof a == "object" && a !== null)
            switch (a.$$typeof) {
              case Xl:
                c = 10;
                break l;
              case ea:
                c = 9;
                break l;
              case q:
                c = 11;
                break l;
              case Cl:
                c = 14;
                break l;
              case jl:
                ((c = 16), (a = null));
                break l;
            }
          ((c = 29),
            (e = Error(r(130, l === null ? "null" : typeof l, ""))),
            (a = null));
      }
    return (
      (t = dt(c, e, t, n)),
      (t.elementType = l),
      (t.type = a),
      (t.lanes = u),
      t
    );
  }
  function oa(l, t, e, a) {
    return ((l = dt(7, l, a, t)), (l.lanes = e), l);
  }
  function Uc(l, t, e) {
    return ((l = dt(6, l, null, t)), (l.lanes = e), l);
  }
  function Fo(l) {
    var t = dt(18, null, null, 0);
    return ((t.stateNode = l), t);
  }
  function Rc(l, t, e) {
    return (
      (t = dt(4, l.children !== null ? l.children : [], l.key, t)),
      (t.lanes = e),
      (t.stateNode = {
        containerInfo: l.containerInfo,
        pendingChildren: null,
        implementation: l.implementation,
      }),
      t
    );
  }
  var $o = new WeakMap();
  function Rt(l, t) {
    if (typeof l == "object" && l !== null) {
      var e = $o.get(l);
      return e !== void 0
        ? e
        : ((t = { value: l, source: t, stack: Xf(t) }), $o.set(l, t), t);
    }
    return { value: l, source: t, stack: Xf(t) };
  }
  var wa = [],
    Xa = 0,
    Zu = null,
    Qn = 0,
    Lt = [],
    Qt = 0,
    De = null,
    Pt = 1,
    le = "";
  function ve(l, t) {
    ((wa[Xa++] = Qn), (wa[Xa++] = Zu), (Zu = l), (Qn = t));
  }
  function Io(l, t, e) {
    ((Lt[Qt++] = Pt), (Lt[Qt++] = le), (Lt[Qt++] = De), (De = l));
    var a = Pt;
    l = le;
    var n = 32 - jt(a) - 1;
    ((a &= ~(1 << n)), (e += 1));
    var u = 32 - jt(t) + n;
    if (30 < u) {
      var c = n - (n % 5);
      ((u = (a & ((1 << c) - 1)).toString(32)),
        (a >>= c),
        (n -= c),
        (Pt = (1 << (32 - jt(t) + n)) | (e << n) | a),
        (le = u + l));
    } else ((Pt = (1 << u) | (e << n) | a), (le = l));
  }
  function wu(l) {
    l.return !== null && (ve(l, 1), Io(l, 1, 0));
  }
  function Lc(l) {
    for (; l === Zu; )
      ((Zu = wa[--Xa]), (wa[Xa] = null), (Qn = wa[--Xa]), (wa[Xa] = null));
    for (; l === De; )
      ((De = Lt[--Qt]),
        (Lt[Qt] = null),
        (le = Lt[--Qt]),
        (Lt[Qt] = null),
        (Pt = Lt[--Qt]),
        (Lt[Qt] = null));
  }
  function Po(l, t) {
    ((Lt[Qt++] = Pt),
      (Lt[Qt++] = le),
      (Lt[Qt++] = De),
      (Pt = t.id),
      (le = t.overflow),
      (De = l));
  }
  var kl = null,
    Ol = null,
    ul = !1,
    Ue = null,
    Ht = !1,
    Qc = Error(r(519));
  function Re(l) {
    var t = Error(
      r(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1]
          ? "text"
          : "HTML",
        "",
      ),
    );
    throw (Hn(Rt(t, l)), Qc);
  }
  function lr(l) {
    var t = l.stateNode,
      e = l.type,
      a = l.memoizedProps;
    switch (((t[Il] = l), (t[rt] = a), e)) {
      case "dialog":
        (cl("cancel", t), cl("close", t));
        break;
      case "iframe":
      case "object":
      case "embed":
        cl("load", t);
        break;
      case "video":
      case "audio":
        for (e = 0; e < uu.length; e++) cl(uu[e], t);
        break;
      case "source":
        cl("error", t);
        break;
      case "img":
      case "image":
      case "link":
        (cl("error", t), cl("load", t));
        break;
      case "details":
        cl("toggle", t);
        break;
      case "input":
        (cl("invalid", t),
          ro(
            t,
            a.value,
            a.defaultValue,
            a.checked,
            a.defaultChecked,
            a.type,
            a.name,
            !0,
          ));
        break;
      case "select":
        cl("invalid", t);
        break;
      case "textarea":
        (cl("invalid", t), mo(t, a.value, a.defaultValue, a.children));
    }
    ((e = a.children),
      (typeof e != "string" && typeof e != "number" && typeof e != "bigint") ||
      t.textContent === "" + e ||
      a.suppressHydrationWarning === !0 ||
      b0(t.textContent, e)
        ? (a.popover != null && (cl("beforetoggle", t), cl("toggle", t)),
          a.onScroll != null && cl("scroll", t),
          a.onScrollEnd != null && cl("scrollend", t),
          a.onClick != null && (t.onclick = It),
          (t = !0))
        : (t = !1),
      t || Re(l, !0));
  }
  function Xu(l) {
    for (kl = l.return; kl; )
      switch (kl.tag) {
        case 5:
        case 31:
        case 13:
          Ht = !1;
          return;
        case 27:
        case 3:
          Ht = !0;
          return;
        default:
          kl = kl.return;
      }
  }
  function Va(l) {
    if (l !== kl) return !1;
    if (!ul) return (Xu(l), (ul = !0), !1);
    var t = l.tag,
      e;
    if (
      ((e = t !== 3 && t !== 27) &&
        ((e = t === 5) &&
          ((e = l.type),
          (e =
            !(e !== "form" && e !== "button") || hf(l.type, l.memoizedProps))),
        (e = !e)),
      e && Ol && Re(l),
      Xu(l),
      t === 13)
    ) {
      if (((l = l.memoizedState), (l = l !== null ? l.dehydrated : null), !l))
        throw Error(r(317));
      Ol = G0(l);
    } else if (t === 31) {
      if (((l = l.memoizedState), (l = l !== null ? l.dehydrated : null), !l))
        throw Error(r(317));
      Ol = G0(l);
    } else
      t === 27
        ? ((t = Ol), Fe(l.type) ? ((l = Sf), (Sf = null), (Ol = l)) : (Ol = t))
        : (Ol = kl ? qt(l.stateNode.nextSibling) : null);
    return !0;
  }
  function ra() {
    ((Ol = kl = null), (ul = !1));
  }
  function Hc() {
    var l = Ue;
    return (
      l !== null &&
        (yt === null ? (yt = l) : yt.push.apply(yt, l), (Ue = null)),
      l
    );
  }
  function Hn(l) {
    Ue === null ? (Ue = [l]) : Ue.push(l);
  }
  var Bc = Ft(null),
    da = null,
    xe = null;
  function Le(l, t, e) {
    (Al(Bc, t._currentValue), (t._currentValue = e));
  }
  function pe(l) {
    ((l._currentValue = Bc.current), $l(Bc));
  }
  function Vu(l, t, e) {
    for (; l !== null; ) {
      var a = l.alternate;
      if (
        ((l.childLanes & t) !== t
          ? ((l.childLanes |= t), a !== null && (a.childLanes |= t))
          : a !== null && (a.childLanes & t) !== t && (a.childLanes |= t),
        l === e)
      )
        break;
      l = l.return;
    }
  }
  function qc(l, t, e, a) {
    var n = l.child;
    for (n !== null && (n.return = l); n !== null; ) {
      var u = n.dependencies;
      if (u !== null) {
        var c = n.child;
        u = u.firstContext;
        l: for (; u !== null; ) {
          var o = u;
          u = n;
          for (var h = 0; h < t.length; h++)
            if (o.context === t[h]) {
              ((u.lanes |= e),
                (o = u.alternate),
                o !== null && (o.lanes |= e),
                Vu(u.return, e, l),
                a || (c = null));
              break l;
            }
          u = o.next;
        }
      } else if (n.tag === 18) {
        if (((c = n.return), c === null)) throw Error(r(341));
        ((c.lanes |= e),
          (u = c.alternate),
          u !== null && (u.lanes |= e),
          Vu(c, e, l),
          (c = null));
      } else
        n.tag === 13 &&
        n.memoizedState !== null &&
        n.memoizedState.dehydrated === null
          ? ((n.lanes |= e),
            (c = n.alternate),
            c !== null && (c.lanes |= e),
            Vu(n.return, e, l),
            (c = n.child),
            (c = c !== null ? c.sibling : null))
          : (c = n.child);
      if (c !== null) c.return = n;
      else
        for (c = n; c !== null; ) {
          if (c === l) {
            c = null;
            break;
          }
          if (((n = c.sibling), n !== null)) {
            ((n.return = c.return), (c = n));
            break;
          }
          c = c.return;
        }
      n = c;
    }
  }
  function ha(l, t, e, a) {
    l = null;
    for (var n = t, u = !1; n !== null; ) {
      if (!u) {
        if ((n.flags & 524288) !== 0) u = !0;
        else if ((n.flags & 262144) !== 0) break;
      }
      if (n.tag === 10) {
        var c = n.alternate;
        if (c === null) throw Error(r(387));
        if (((c = c.memoizedProps), c !== null)) {
          var o = n.type;
          St(n.pendingProps.value, c.value) ||
            (l !== null ? l.push(o) : (l = [o]));
        }
      } else if (n === xu.current) {
        if (((c = n.alternate), c === null)) throw Error(r(387));
        c.memoizedState.memoizedState !== n.memoizedState.memoizedState &&
          (l !== null ? l.push(vn) : (l = [vn]));
      }
      n = n.return;
    }
    return (l !== null && qc(t, l, e, a), (t.flags |= 262144), l !== null);
  }
  function ku(l) {
    for (l = l.firstContext; l !== null; ) {
      if (!St(l.context._currentValue, l.memoizedValue)) return !0;
      l = l.next;
    }
    return !1;
  }
  function ma(l) {
    ((da = l),
      (xe = null),
      (l = l.dependencies),
      l !== null && (l.firstContext = null));
  }
  function Pl(l) {
    return tr(da, l);
  }
  function Ku(l, t) {
    return (da === null && ma(l), tr(l, t));
  }
  function tr(l, t) {
    var e = t._currentValue;
    if (((t = { context: t, memoizedValue: e, next: null }), xe === null)) {
      if (l === null) throw Error(r(308));
      ((xe = t),
        (l.dependencies = { lanes: 0, firstContext: t }),
        (l.flags |= 524288));
    } else xe = xe.next = t;
    return e;
  }
  var Zh =
      typeof AbortController < "u"
        ? AbortController
        : function () {
            var l = [],
              t = (this.signal = {
                aborted: !1,
                addEventListener: function (e, a) {
                  l.push(a);
                },
              });
            this.abort = function () {
              ((t.aborted = !0),
                l.forEach(function (e) {
                  return e();
                }));
            };
          },
    wh = s.unstable_scheduleCallback,
    Xh = s.unstable_NormalPriority,
    ql = {
      $$typeof: Xl,
      Consumer: null,
      Provider: null,
      _currentValue: null,
      _currentValue2: null,
      _threadCount: 0,
    };
  function Gc() {
    return { controller: new Zh(), data: new Map(), refCount: 0 };
  }
  function Bn(l) {
    (l.refCount--,
      l.refCount === 0 &&
        wh(Xh, function () {
          l.controller.abort();
        }));
  }
  function er(l, t) {
    if ((l.pendingLanes & 4194048) !== 0) {
      var e = l.transitionTypes;
      for (
        e === null && (e = l.transitionTypes = []), l = 0;
        l < t.length;
        l++
      ) {
        var a = t[l];
        e.indexOf(a) === -1 && e.push(a);
      }
    }
  }
  var qn = null;
  function Vh(l) {
    var t = l.transitionTypes;
    return ((l.transitionTypes = null), t);
  }
  var Gn = null,
    Yc = 0,
    ya = 0,
    ka = null;
  function kh(l, t) {
    if (Gn === null) {
      var e = (Gn = []);
      ((Yc = 0),
        (ya = af()),
        (ka = {
          status: "pending",
          value: void 0,
          then: function (a) {
            e.push(a);
          },
        }));
    }
    return (Yc++, t.then(ar, ar), t);
  }
  function ar() {
    if (--Yc === 0 && ((qn = null), Gn !== null)) {
      ka !== null && (ka.status = "fulfilled");
      var l = Gn;
      ((Gn = null), (ya = 0), (ka = null));
      for (var t = 0; t < l.length; t++) (0, l[t])();
    }
  }
  function Kh(l, t) {
    var e = [],
      a = {
        status: "pending",
        value: null,
        reason: null,
        then: function (n) {
          e.push(n);
        },
      };
    return (
      l.then(
        function () {
          ((a.status = "fulfilled"), (a.value = t));
          for (var n = 0; n < e.length; n++) (0, e[n])(t);
        },
        function (n) {
          for (a.status = "rejected", a.reason = n, n = 0; n < e.length; n++)
            (0, e[n])(void 0);
        },
      ),
      a
    );
  }
  var nr = V.S;
  V.S = function (l, t) {
    if (
      ((Fd = xt()),
      typeof t == "object" &&
        t !== null &&
        typeof t.then == "function" &&
        kh(l, t),
      qn !== null)
    )
      for (var e = rn; e !== null; ) (er(e, qn), (e = e.next));
    if (((e = l.types), e !== null)) {
      for (var a = rn; a !== null; ) (er(a, e), (a = a.next));
      if (ya !== 0) {
        ((a = qn), a === null && (a = qn = []));
        for (var n = 0; n < e.length; n++) {
          var u = e[n];
          a.indexOf(u) === -1 && a.push(u);
        }
      }
    }
    nr !== null && nr(l, t);
  };
  var ga = Ft(null);
  function Zc() {
    var l = ga.current;
    return l !== null ? l : zl.pooledCache;
  }
  function Ju(l, t) {
    t === null ? Al(ga, ga.current) : Al(ga, t.pool);
  }
  function ur() {
    var l = Zc();
    return l === null ? null : { parent: ql._currentValue, pool: l };
  }
  var Ka = Error(r(460)),
    wc = Error(r(474)),
    Wu = Error(r(542)),
    Fu = { then: function () {} };
  function ir(l) {
    return ((l = l.status), l === "fulfilled" || l === "rejected");
  }
  function cr(l, t, e) {
    switch (
      ((e = l[e]),
      e === void 0 ? l.push(t) : e !== t && (t.then(It, It), (t = e)),
      t.status)
    ) {
      case "fulfilled":
        return t.value;
      case "rejected":
        throw (
          (l = t.reason),
          fr(l),
          l === void 0 && !("reason" in t) ? Error(r(600)) : l
        );
      default:
        if (typeof t.status == "string") t.then(It, It);
        else {
          if (((l = zl), l !== null && 100 < l.shellSuspendCounter))
            throw Error(r(482));
          ((l = t),
            (l.status = "pending"),
            l.then(
              function (a) {
                if (t.status === "pending") {
                  var n = t;
                  ((n.status = "fulfilled"), (n.value = a));
                }
              },
              function (a) {
                if (t.status === "pending") {
                  var n = t;
                  ((n.status = "rejected"), (n.reason = a));
                }
              },
            ));
        }
        switch (t.status) {
          case "fulfilled":
            return t.value;
          case "rejected":
            throw ((l = t.reason), fr(l), l);
        }
        throw ((xa = t), Ka);
    }
  }
  function va(l) {
    try {
      var t = l._init;
      return t(l._payload);
    } catch (e) {
      throw e !== null && typeof e == "object" && typeof e.then == "function"
        ? ((xa = e), Ka)
        : e;
    }
  }
  var xa = null;
  function sr() {
    if (xa === null) throw Error(r(459));
    var l = xa;
    return ((xa = null), l);
  }
  function fr(l) {
    if (l === Ka || l === Wu) throw Error(r(483));
  }
  var Ja = null,
    Yn = 0;
  function $u(l) {
    var t = Yn;
    return ((Yn += 1), Ja === null && (Ja = []), cr(Ja, l, t));
  }
  function Qe(l, t) {
    ((t = t.props.ref), (l.ref = t !== void 0 ? t : null));
  }
  function Iu(l, t) {
    throw t.$$typeof === dl
      ? Error(r(525))
      : ((l = Object.prototype.toString.call(t)),
        Error(
          r(
            31,
            l === "[object Object]"
              ? "object with keys {" + Object.keys(t).join(", ") + "}"
              : l,
          ),
        ));
  }
  function or(l) {
    function t(x, m) {
      if (l) {
        var j = x.deletions;
        j === null ? ((x.deletions = [m]), (x.flags |= 16)) : j.push(m);
      }
    }
    function e(x, m) {
      if (!l) return null;
      for (; m !== null; ) (t(x, m), (m = m.sibling));
      return null;
    }
    function a(x) {
      for (var m = new Map(); x !== null; )
        (x.key === null ? m.set(x.index, x) : m.set(x.key, x), (x = x.sibling));
      return m;
    }
    function n(x, m) {
      return ((x = ge(x, m)), (x.index = 0), (x.sibling = null), x);
    }
    function u(x, m, j) {
      return (
        (x.index = j),
        l
          ? ((j = x.alternate),
            j !== null
              ? ((j = j.index), j < m ? ((x.flags |= 2), m) : j)
              : ((x.flags |= 134217730), m))
          : ((x.flags |= 1048576), m)
      );
    }
    function c(x) {
      return (l && x.alternate === null && (x.flags |= 134217730), x);
    }
    function o(x, m, j, M) {
      return m === null || m.tag !== 6
        ? ((m = Uc(j, x.mode, M)), (m.return = x), m)
        : ((m = n(m, j)), (m.return = x), m);
    }
    function h(x, m, j, M) {
      var Y = j.type;
      return Y === _t
        ? ((x = N(x, m, j.props.children, M, j.key)), Qe(x, j), x)
        : m !== null &&
            (m.elementType === Y ||
              (typeof Y == "object" &&
                Y !== null &&
                Y.$$typeof === jl &&
                va(Y) === m.type))
          ? ((m = n(m, j.props)), Qe(m, j), (m.return = x), m)
          : ((m = Yu(j.type, j.key, j.props, null, x.mode, M)),
            Qe(m, j),
            (m.return = x),
            m);
    }
    function p(x, m, j, M) {
      return m === null ||
        m.tag !== 4 ||
        m.stateNode.containerInfo !== j.containerInfo ||
        m.stateNode.implementation !== j.implementation
        ? ((m = Rc(j, x.mode, M)), (m.return = x), m)
        : ((m = n(m, j.children || [])), (m.return = x), m);
    }
    function N(x, m, j, M, Y) {
      return m === null || m.tag !== 7
        ? ((m = oa(j, x.mode, M, Y)), (m.return = x), m)
        : ((m = n(m, j)), (m.return = x), m);
    }
    function C(x, m, j) {
      if (
        (typeof m == "string" && m !== "") ||
        typeof m == "number" ||
        typeof m == "bigint"
      )
        return ((m = Uc("" + m, x.mode, j)), (m.return = x), m);
      if (typeof m == "object" && m !== null) {
        switch (m.$$typeof) {
          case Wt:
            return (
              (j = Yu(m.type, m.key, m.props, null, x.mode, j)),
              Qe(j, m),
              (j.return = x),
              j
            );
          case Ot:
            return ((m = Rc(m, x.mode, j)), (m.return = x), m);
          case jl:
            return ((m = va(m)), C(x, m, j));
        }
        if (xl(m) || W(m))
          return ((m = oa(m, x.mode, j, null)), (m.return = x), m);
        if (typeof m.then == "function") return C(x, $u(m), j);
        if (m.$$typeof === Xl) return C(x, Ku(x, m), j);
        Iu(x, m);
      }
      return null;
    }
    function v(x, m, j, M) {
      var Y = m !== null ? m.key : null;
      if (
        (typeof j == "string" && j !== "") ||
        typeof j == "number" ||
        typeof j == "bigint"
      )
        return Y !== null ? null : o(x, m, "" + j, M);
      if (typeof j == "object" && j !== null) {
        switch (j.$$typeof) {
          case Wt:
            return j.key === Y ? h(x, m, j, M) : null;
          case Ot:
            return j.key === Y ? p(x, m, j, M) : null;
          case jl:
            return ((j = va(j)), v(x, m, j, M));
        }
        if (xl(j) || W(j)) return Y !== null ? null : N(x, m, j, M, null);
        if (typeof j.then == "function") return v(x, m, $u(j), M);
        if (j.$$typeof === Xl) return v(x, m, Ku(x, j), M);
        Iu(x, j);
      }
      return null;
    }
    function b(x, m, j, M, Y) {
      if (
        (typeof M == "string" && M !== "") ||
        typeof M == "number" ||
        typeof M == "bigint"
      )
        return ((x = x.get(j) || null), o(m, x, "" + M, Y));
      if (typeof M == "object" && M !== null) {
        switch (M.$$typeof) {
          case Wt:
            return (
              (x = x.get(M.key === null ? j : M.key) || null),
              h(m, x, M, Y)
            );
          case Ot:
            return (
              (x = x.get(M.key === null ? j : M.key) || null),
              p(m, x, M, Y)
            );
          case jl:
            return ((M = va(M)), b(x, m, j, M, Y));
        }
        if (xl(M) || W(M)) return ((x = x.get(j) || null), N(m, x, M, Y, null));
        if (typeof M.then == "function") return b(x, m, j, $u(M), Y);
        if (M.$$typeof === Xl) return b(x, m, j, Ku(m, M), Y);
        Iu(m, M);
      }
      return null;
    }
    function R(x, m, j, M) {
      for (
        var Y = null, fl = null, k = m, F = (m = 0), Zl = null;
        k !== null && F < j.length;
        F++
      ) {
        k.index > F ? ((Zl = k), (k = null)) : (Zl = k.sibling);
        var hl = v(x, k, j[F], M);
        if (hl === null) {
          k === null && (k = Zl);
          break;
        }
        (l && k && hl.alternate === null && t(x, k),
          (m = u(hl, m, F)),
          fl === null ? (Y = hl) : (fl.sibling = hl),
          (fl = hl),
          (k = Zl));
      }
      if (F === j.length) return (e(x, k), ul && ve(x, F), Y);
      if (k === null) {
        for (; F < j.length; F++)
          ((k = C(x, j[F], M)),
            k !== null &&
              ((m = u(k, m, F)),
              fl === null ? (Y = k) : (fl.sibling = k),
              (fl = k)));
        return (ul && ve(x, F), Y);
      }
      for (k = a(k); F < j.length; F++)
        ((Zl = b(k, x, F, j[F], M)),
          Zl !== null &&
            (l &&
              ((hl = Zl.alternate),
              hl !== null && k.delete(hl.key === null ? F : hl.key)),
            (m = u(Zl, m, F)),
            fl === null ? (Y = Zl) : (fl.sibling = Zl),
            (fl = Zl)));
      return (
        l &&
          k.forEach(function (ta) {
            return t(x, ta);
          }),
        ul && ve(x, F),
        Y
      );
    }
    function w(x, m, j, M) {
      if (j == null) throw Error(r(151));
      for (
        var Y = null, fl = null, k = m, F = (m = 0), Zl = null, hl = j.next();
        k !== null && !hl.done;
        F++, hl = j.next()
      ) {
        k.index > F ? ((Zl = k), (k = null)) : (Zl = k.sibling);
        var ta = v(x, k, hl.value, M);
        if (ta === null) {
          k === null && (k = Zl);
          break;
        }
        (l && k && ta.alternate === null && t(x, k),
          (m = u(ta, m, F)),
          fl === null ? (Y = ta) : (fl.sibling = ta),
          (fl = ta),
          (k = Zl));
      }
      if (hl.done) return (e(x, k), ul && ve(x, F), Y);
      if (k === null) {
        for (; !hl.done; F++, hl = j.next())
          ((hl = C(x, hl.value, M)),
            hl !== null &&
              ((m = u(hl, m, F)),
              fl === null ? (Y = hl) : (fl.sibling = hl),
              (fl = hl)));
        return (ul && ve(x, F), Y);
      }
      for (k = a(k); !hl.done; F++, hl = j.next())
        ((hl = b(k, x, F, hl.value, M)),
          hl !== null &&
            (l &&
              ((Zl = hl.alternate),
              Zl !== null && k.delete(Zl.key === null ? F : Zl.key)),
            (m = u(hl, m, F)),
            fl === null ? (Y = hl) : (fl.sibling = hl),
            (fl = hl)));
      return (
        l &&
          k.forEach(function (Cm) {
            return t(x, Cm);
          }),
        ul && ve(x, F),
        Y
      );
    }
    function nl(x, m, j, M) {
      if (
        (typeof j == "object" &&
          j !== null &&
          j.type === _t &&
          j.key === null &&
          j.props.ref === void 0 &&
          (j = j.props.children),
        typeof j == "object" && j !== null)
      ) {
        switch (j.$$typeof) {
          case Wt:
            l: {
              for (var Y = j.key; m !== null; ) {
                if (m.key === Y) {
                  if (((Y = j.type), Y === _t)) {
                    if (m.tag === 7) {
                      (e(x, m.sibling),
                        (M = n(m, j.props.children)),
                        Qe(M, j),
                        (M.return = x),
                        (x = M));
                      break l;
                    }
                  } else if (
                    m.elementType === Y ||
                    (typeof Y == "object" &&
                      Y !== null &&
                      Y.$$typeof === jl &&
                      va(Y) === m.type)
                  ) {
                    (e(x, m.sibling),
                      (M = n(m, j.props)),
                      Qe(M, j),
                      (M.return = x),
                      (x = M));
                    break l;
                  }
                  e(x, m);
                  break;
                } else t(x, m);
                m = m.sibling;
              }
              j.type === _t
                ? ((M = oa(j.props.children, x.mode, M, j.key)),
                  Qe(M, j),
                  (M.return = x),
                  (x = M))
                : ((M = Yu(j.type, j.key, j.props, null, x.mode, M)),
                  Qe(M, j),
                  (M.return = x),
                  (x = M));
            }
            return c(x);
          case Ot:
            l: {
              for (Y = j.key; m !== null; ) {
                if (m.key === Y)
                  if (
                    m.tag === 4 &&
                    m.stateNode.containerInfo === j.containerInfo &&
                    m.stateNode.implementation === j.implementation
                  ) {
                    (e(x, m.sibling),
                      (M = n(m, j.children || [])),
                      (M.return = x),
                      (x = M));
                    break l;
                  } else {
                    e(x, m);
                    break;
                  }
                else t(x, m);
                m = m.sibling;
              }
              ((M = Rc(j, x.mode, M)), (M.return = x), (x = M));
            }
            return c(x);
          case jl:
            return ((j = va(j)), nl(x, m, j, M));
        }
        if (xl(j)) return R(x, m, j, M);
        if (W(j)) {
          if (((Y = W(j)), typeof Y != "function")) throw Error(r(150));
          return ((j = Y.call(j)), w(x, m, j, M));
        }
        if (typeof j.then == "function") return nl(x, m, $u(j), M);
        if (j.$$typeof === Xl) return nl(x, m, Ku(x, j), M);
        Iu(x, j);
      }
      return (typeof j == "string" && j !== "") ||
        typeof j == "number" ||
        typeof j == "bigint"
        ? ((j = "" + j),
          m !== null && m.tag === 6
            ? (e(x, m.sibling), (M = n(m, j)), (M.return = x), (x = M))
            : (e(x, m), (M = Uc(j, x.mode, M)), (M.return = x), (x = M)),
          c(x))
        : e(x, m);
    }
    return function (x, m, j, M) {
      try {
        Yn = 0;
        var Y = nl(x, m, j, M);
        return ((Ja = null), Y);
      } catch (k) {
        if (k === Ka || k === Wu) throw k;
        var fl = dt(29, k, null, x.mode);
        return ((fl.lanes = M), (fl.return = x), fl);
      }
    };
  }
  var pa = or(!0),
    rr = or(!1),
    He = !1;
  function Xc(l) {
    l.updateQueue = {
      baseState: l.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null,
    };
  }
  function Vc(l, t) {
    ((l = l.updateQueue),
      t.updateQueue === l &&
        (t.updateQueue = {
          baseState: l.baseState,
          firstBaseUpdate: l.firstBaseUpdate,
          lastBaseUpdate: l.lastBaseUpdate,
          shared: l.shared,
          callbacks: null,
        }));
  }
  function Be(l) {
    return { lane: l, tag: 0, payload: null, callback: null, next: null };
  }
  function qe(l, t, e) {
    var a = l.updateQueue;
    if (a === null) return null;
    if (((a = a.shared), (pl & 2) !== 0)) {
      var n = a.pending;
      return (
        n === null ? (t.next = t) : ((t.next = n.next), (n.next = t)),
        (a.pending = t),
        (t = Gu(l)),
        Jo(l, null, e),
        t
      );
    }
    return (qu(l, a, t, e), Gu(l));
  }
  function Zn(l, t, e) {
    if (
      ((t = t.updateQueue), t !== null && ((t = t.shared), (e & 4194048) !== 0))
    ) {
      var a = t.lanes;
      ((a &= l.pendingLanes), (e |= a), (t.lanes = e), $f(l, e));
    }
  }
  function kc(l, t) {
    var e = l.updateQueue,
      a = l.alternate;
    if (a !== null && ((a = a.updateQueue), e === a)) {
      var n = null,
        u = null;
      if (((e = e.firstBaseUpdate), e !== null)) {
        do {
          var c = {
            lane: e.lane,
            tag: e.tag,
            payload: e.payload,
            callback: null,
            next: null,
          };
          (u === null ? (n = u = c) : (u = u.next = c), (e = e.next));
        } while (e !== null);
        u === null ? (n = u = t) : (u = u.next = t);
      } else n = u = t;
      ((e = {
        baseState: a.baseState,
        firstBaseUpdate: n,
        lastBaseUpdate: u,
        shared: a.shared,
        callbacks: a.callbacks,
      }),
        (l.updateQueue = e));
      return;
    }
    ((l = e.lastBaseUpdate),
      l === null ? (e.firstBaseUpdate = t) : (l.next = t),
      (e.lastBaseUpdate = t));
  }
  var Kc = !1;
  function wn() {
    if (Kc) {
      var l = ka;
      if (l !== null) throw l;
    }
  }
  function Xn(l, t, e, a) {
    Kc = !1;
    var n = l.updateQueue;
    He = !1;
    var u = n.firstBaseUpdate,
      c = n.lastBaseUpdate,
      o = n.shared.pending;
    if (o !== null) {
      n.shared.pending = null;
      var h = o,
        p = h.next;
      ((h.next = null), c === null ? (u = p) : (c.next = p), (c = h));
      var N = l.alternate;
      N !== null &&
        ((N = N.updateQueue),
        (o = N.lastBaseUpdate),
        o !== c &&
          (o === null ? (N.firstBaseUpdate = p) : (o.next = p),
          (N.lastBaseUpdate = h)));
    }
    if (u !== null) {
      var C = n.baseState;
      ((c = 0), (N = p = h = null), (o = u));
      do {
        var v = o.lane & -536870913,
          b = v !== o.lane;
        if (b ? (sl & v) === v : (a & v) === v) {
          (v !== 0 && v === ya && (Kc = !0),
            N !== null &&
              (N = N.next =
                {
                  lane: 0,
                  tag: o.tag,
                  payload: o.payload,
                  callback: null,
                  next: null,
                }));
          l: {
            var R = l,
              w = o;
            v = t;
            var nl = e;
            switch (w.tag) {
              case 1:
                if (((R = w.payload), typeof R == "function")) {
                  C = R.call(nl, C, v);
                  break l;
                }
                C = R;
                break l;
              case 3:
                R.flags = (R.flags & -65537) | 128;
              case 0:
                if (
                  ((R = w.payload),
                  (v = typeof R == "function" ? R.call(nl, C, v) : R),
                  v == null)
                )
                  break l;
                C = el({}, C, v);
                break l;
              case 2:
                He = !0;
            }
          }
          ((v = o.callback),
            v !== null &&
              ((l.flags |= 64),
              b && (l.flags |= 8192),
              (b = n.callbacks),
              b === null ? (n.callbacks = [v]) : b.push(v)));
        } else
          ((b = {
            lane: v,
            tag: o.tag,
            payload: o.payload,
            callback: o.callback,
            next: null,
          }),
            N === null ? ((p = N = b), (h = C)) : (N = N.next = b),
            (c |= v));
        if (((o = o.next), o === null)) {
          if (((o = n.shared.pending), o === null)) break;
          ((b = o),
            (o = b.next),
            (b.next = null),
            (n.lastBaseUpdate = b),
            (n.shared.pending = null));
        }
      } while (!0);
      (N === null && (h = C),
        (n.baseState = h),
        (n.firstBaseUpdate = p),
        (n.lastBaseUpdate = N),
        u === null && (n.shared.lanes = 0),
        (ke |= c),
        (l.lanes = c),
        (l.memoizedState = C));
    }
  }
  function dr(l, t) {
    if (typeof l != "function") throw Error(r(191, l));
    l.call(t);
  }
  function hr(l, t) {
    var e = l.callbacks;
    if (e !== null)
      for (l.callbacks = null, l = 0; l < e.length; l++) dr(e[l], t);
  }
  var Ge = Ft(null),
    Pu = Ft(0);
  function mr(l, t) {
    ((l = Ne), Al(Pu, l), Al(Ge, t), (Ne = l | t.baseLanes));
  }
  function Jc() {
    (Al(Pu, Ne), Al(Ge, Ge.current));
  }
  function Wc() {
    ((Ne = Pu.current), $l(Ge), $l(Pu));
  }
  var lt = Ft(null),
    ut = null;
  function Ye(l) {
    var t = l.alternate;
    (Al(tt, tt.current & 1),
      Al(lt, l),
      ut === null &&
        (t === null || Ge.current !== null || t.memoizedState !== null) &&
        (ut = l));
  }
  function Fc(l) {
    (Al(tt, tt.current), Al(lt, l), ut === null && (ut = l));
  }
  function yr(l) {
    l.tag === 22
      ? (Al(tt, tt.current), Al(lt, l), ut === null && (ut = l))
      : Ze();
  }
  function Ze() {
    (Al(tt, tt.current), Al(lt, lt.current));
  }
  function Et(l) {
    ($l(lt), ut === l && (ut = null), $l(tt));
  }
  var tt = Ft(0);
  function Vn(l, t) {
    (Al(lt, lt.current), Al(tt, t));
  }
  function $c(l) {
    ($l(tt), $l(lt), ut === l && (ut = null));
  }
  function li(l) {
    for (var t = l; t !== null; ) {
      if (t.tag === 13) {
        var e = t.memoizedState;
        if (e !== null && ((e = e.dehydrated), e === null || jf(e) || bf(e)))
          return t;
      } else if (
        t.tag === 19 &&
        t.memoizedProps.revealOrder !== "independent"
      ) {
        if ((t.flags & 128) !== 0) return t;
      } else if (t.child !== null) {
        ((t.child.return = t), (t = t.child));
        continue;
      }
      if (t === l) break;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === l) return null;
        t = t.return;
      }
      ((t.sibling.return = t.return), (t = t.sibling));
    }
    return null;
  }
  var je = 0,
    al = null,
    Ml = null,
    Gl = null,
    ti = !1,
    Wa = !1,
    ja = !1,
    ei = 0,
    kn = 0,
    Fa = null,
    Jh = 0;
  function Ql() {
    throw Error(r(321));
  }
  function Ic(l, t) {
    if (t === null) return !1;
    for (var e = 0; e < t.length && e < l.length; e++)
      if (!St(l[e], t[e])) return !1;
    return !0;
  }
  function Pc(l, t, e, a, n, u) {
    return (
      (je = u),
      (al = t),
      (t.memoizedState = null),
      (t.updateQueue = null),
      (t.lanes = 0),
      (V.H = l === null || l.memoizedState === null ? Ir : Pr),
      (ja = !1),
      (u = e(a, n)),
      (ja = !1),
      Wa && (u = vr(t, e, a, n)),
      gr(l),
      u
    );
  }
  function gr(l) {
    V.H = fi;
    var t = Ml !== null && Ml.next !== null;
    if (((je = 0), (Gl = Ml = al = null), (ti = !1), (kn = 0), (Fa = null), t))
      throw Error(r(300));
    l === null ||
      Yl ||
      ((l = l.dependencies), l !== null && ku(l) && (Yl = !0));
  }
  function vr(l, t, e, a) {
    al = l;
    var n = 0;
    do {
      if ((Wa && (Fa = null), (kn = 0), (Wa = !1), 25 <= n))
        throw Error(r(301));
      if (((n += 1), (Gl = Ml = null), l.updateQueue != null)) {
        var u = l.updateQueue;
        ((u.lastEffect = null),
          (u.events = null),
          (u.stores = null),
          u.memoCache != null && (u.memoCache.index = 0));
      }
      ((V.H = e1), (u = t(e, a)));
    } while (Wa);
    return u;
  }
  function Wh() {
    var l = V.H,
      t = l.useState()[0];
    return (
      (t = typeof t.then == "function" ? Kn(t) : t),
      (l = l.useState()[0]),
      (Ml !== null ? Ml.memoizedState : null) !== l && (al.flags |= 1024),
      t
    );
  }
  function ls() {
    var l = ei !== 0;
    return ((ei = 0), l);
  }
  function ts(l, t, e) {
    ((t.updateQueue = l.updateQueue), (t.flags &= -2053), (l.lanes &= ~e));
  }
  function es(l) {
    if (ti) {
      for (l = l.memoizedState; l !== null; ) {
        var t = l.queue;
        (t !== null && (t.pending = null), (l = l.next));
      }
      ti = !1;
    }
    ((je = 0), (Gl = Ml = al = null), (Wa = !1), (kn = ei = 0), (Fa = null));
  }
  function ct() {
    var l = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null,
    };
    return (Gl === null ? (al.memoizedState = Gl = l) : (Gl = Gl.next = l), Gl);
  }
  function Bl() {
    if (Ml === null) {
      var l = al.alternate;
      l = l !== null ? l.memoizedState : null;
    } else l = Ml.next;
    var t = Gl === null ? al.memoizedState : Gl.next;
    if (t !== null) ((Gl = t), (Ml = l));
    else {
      if (l === null)
        throw al.alternate === null ? Error(r(467)) : Error(r(310));
      ((Ml = l),
        (l = {
          memoizedState: Ml.memoizedState,
          baseState: Ml.baseState,
          baseQueue: Ml.baseQueue,
          queue: Ml.queue,
          next: null,
        }),
        Gl === null ? (al.memoizedState = Gl = l) : (Gl = Gl.next = l));
    }
    return Gl;
  }
  function ai() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function Kn(l) {
    var t = kn;
    return (
      (kn += 1),
      Fa === null && (Fa = []),
      (l = cr(Fa, l, t)),
      (t = al),
      (Gl === null ? t.memoizedState : Gl.next) === null &&
        ((t = t.alternate),
        (V.H = t === null || t.memoizedState === null ? Ir : Pr)),
      l
    );
  }
  function ni(l) {
    if (l !== null && typeof l == "object") {
      if (typeof l.then == "function") return Kn(l);
      if (l.$$typeof === U) return;
      if (l.$$typeof === Xl) return Pl(l);
    }
    throw Error(r(438, String(l)));
  }
  function as(l) {
    var t = null,
      e = al.updateQueue;
    if ((e !== null && (t = e.memoCache), t == null)) {
      var a = al.alternate;
      a !== null &&
        ((a = a.updateQueue),
        a !== null &&
          ((a = a.memoCache),
          a != null &&
            (t = {
              data: a.data.map(function (n) {
                return n.slice();
              }),
              index: 0,
            })));
    }
    if (
      (t == null && (t = { data: [], index: 0 }),
      e === null && ((e = ai()), (al.updateQueue = e)),
      (e.memoCache = t),
      (e = t.data[t.index]),
      e === void 0)
    )
      for (e = t.data[t.index] = Array(l), a = 0; a < l; a++) e[a] = aa;
    return (t.index++, e);
  }
  function be(l, t) {
    return typeof t == "function" ? t(l) : t;
  }
  function ui(l) {
    var t = Bl();
    return ns(t, Ml, l);
  }
  function ns(l, t, e) {
    var a = l.queue;
    if (a === null) throw Error(r(311));
    a.lastRenderedReducer = e;
    var n = l.baseQueue,
      u = a.pending;
    if (u !== null) {
      if (n !== null) {
        var c = n.next;
        ((n.next = u.next), (u.next = c));
      }
      ((t.baseQueue = n = u), (a.pending = null));
    }
    if (((u = l.baseState), n === null)) l.memoizedState = u;
    else {
      t = n.next;
      var o = (c = null),
        h = null,
        p = t,
        N = !1;
      do {
        var C = p.lane & -536870913;
        if (C !== p.lane ? (sl & C) === C : (je & C) === C) {
          var v = p.revertLane;
          if (v === 0)
            (h !== null &&
              (h = h.next =
                {
                  lane: 0,
                  revertLane: 0,
                  gesture: null,
                  action: p.action,
                  hasEagerState: p.hasEagerState,
                  eagerState: p.eagerState,
                  next: null,
                }),
              C === ya && (N = !0));
          else if ((je & v) === v) {
            ((p = p.next), v === ya && (N = !0));
            continue;
          } else
            ((C = {
              lane: 0,
              revertLane: p.revertLane,
              gesture: null,
              action: p.action,
              hasEagerState: p.hasEagerState,
              eagerState: p.eagerState,
              next: null,
            }),
              h === null ? ((o = h = C), (c = u)) : (h = h.next = C),
              (al.lanes |= v),
              (ke |= v));
          ((C = p.action),
            ja && e(u, C),
            (u = p.hasEagerState ? p.eagerState : e(u, C)));
        } else
          ((v = {
            lane: C,
            revertLane: p.revertLane,
            gesture: p.gesture,
            action: p.action,
            hasEagerState: p.hasEagerState,
            eagerState: p.eagerState,
            next: null,
          }),
            h === null ? ((o = h = v), (c = u)) : (h = h.next = v),
            (al.lanes |= C),
            (ke |= C));
        p = p.next;
      } while (p !== null && p !== t);
      if (
        (h === null ? (c = u) : (h.next = o),
        !St(u, l.memoizedState) && ((Yl = !0), N && ((e = ka), e !== null)))
      )
        throw e;
      ((l.memoizedState = u),
        (l.baseState = c),
        (l.baseQueue = h),
        (a.lastRenderedState = u));
    }
    return (n === null && (a.lanes = 0), [l.memoizedState, a.dispatch]);
  }
  function us(l) {
    var t = Bl(),
      e = t.queue;
    if (e === null) throw Error(r(311));
    e.lastRenderedReducer = l;
    var a = e.dispatch,
      n = e.pending,
      u = t.memoizedState;
    if (n !== null) {
      e.pending = null;
      var c = (n = n.next);
      do ((u = l(u, c.action)), (c = c.next));
      while (c !== n);
      (St(u, t.memoizedState) || (Yl = !0),
        (t.memoizedState = u),
        t.baseQueue === null && (t.baseState = u),
        (e.lastRenderedState = u));
    }
    return [u, a];
  }
  function xr(l, t, e) {
    var a = al,
      n = Bl(),
      u = ul;
    if (u) {
      if (e === void 0) throw Error(r(407));
      e = e();
    } else e = t();
    var c = !St((Ml || n).memoizedState, e);
    if (
      (c && ((n.memoizedState = e), (Yl = !0)),
      (n = n.queue),
      ss(br.bind(null, a, n, l), [l]),
      (l =
        n.getSnapshot !== t ||
        c ||
        (Gl !== null && (Gl.memoizedState.tag & 1) !== 0)),
      $a(l ? 9 : 8, { destroy: void 0 }, jr.bind(null, a, n, e, t), null),
      l)
    ) {
      if (((a.flags |= 2048), zl === null)) throw Error(r(349));
      u || (je & 127) !== 0 || pr(a, t, e);
    }
    return e;
  }
  function pr(l, t, e) {
    ((l.flags |= 16384),
      (l = { getSnapshot: t, value: e }),
      (t = al.updateQueue),
      t === null
        ? ((t = ai()), (al.updateQueue = t), (t.stores = [l]))
        : ((e = t.stores), e === null ? (t.stores = [l]) : e.push(l)));
  }
  function jr(l, t, e, a) {
    ((t.value = e), (t.getSnapshot = a), Sr(t) && Er(l));
  }
  function br(l, t, e) {
    return e(function () {
      Sr(t) && Er(l);
    });
  }
  function Sr(l) {
    var t = l.getSnapshot;
    l = l.value;
    try {
      var e = t();
      return !St(l, e);
    } catch {
      return !0;
    }
  }
  function Er(l) {
    var t = fa(l, 2);
    t !== null && gt(t, l, 2);
  }
  function is(l) {
    var t = ct();
    if (typeof l == "function") {
      var e = l;
      if (((l = e()), ja)) {
        Ae(!0);
        try {
          e();
        } finally {
          Ae(!1);
        }
      }
    }
    return (
      (t.memoizedState = t.baseState = l),
      (t.queue = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: be,
        lastRenderedState: l,
      }),
      t
    );
  }
  function Nr(l, t, e, a) {
    return ((l.baseState = e), ns(l, Ml, typeof a == "function" ? a : be));
  }
  function Fh(l, t, e, a, n) {
    if (si(l)) throw Error(r(485));
    if (((l = t.action), l !== null)) {
      var u = {
        payload: n,
        action: l,
        next: null,
        isTransition: !0,
        status: "pending",
        value: null,
        reason: null,
        listeners: [],
        then: function (c) {
          u.listeners.push(c);
        },
      };
      (V.T !== null ? e(!0) : (u.isTransition = !1),
        a(u),
        (e = t.pending),
        e === null
          ? ((u.next = t.pending = u), Tr(t, u))
          : ((u.next = e.next), (t.pending = e.next = u)));
    }
  }
  function Tr(l, t) {
    var e = t.action,
      a = t.payload,
      n = l.state;
    if (t.isTransition) {
      var u = V.T,
        c = {};
      ((c.types = u !== null ? u.types : null), (V.T = c));
      try {
        var o = e(n, a),
          h = V.S;
        (h !== null && h(c, o), Mr(l, t, o));
      } catch (p) {
        cs(l, t, p);
      } finally {
        (u !== null && c.types !== null && (u.types = c.types), (V.T = u));
      }
    } else
      try {
        ((u = e(n, a)), Mr(l, t, u));
      } catch (p) {
        cs(l, t, p);
      }
  }
  function Mr(l, t, e) {
    e !== null && typeof e == "object" && typeof e.then == "function"
      ? e.then(
          function (a) {
            Cr(l, t, a);
          },
          function (a) {
            return cs(l, t, a);
          },
        )
      : Cr(l, t, e);
  }
  function Cr(l, t, e) {
    ((t.status = "fulfilled"),
      (t.value = e),
      zr(t),
      (l.state = e),
      (t = l.pending),
      t !== null &&
        ((e = t.next),
        e === t ? (l.pending = null) : ((e = e.next), (t.next = e), Tr(l, e))));
  }
  function cs(l, t, e) {
    var a = l.pending;
    if (((l.pending = null), a !== null)) {
      a = a.next;
      do ((t.status = "rejected"), (t.reason = e), zr(t), (t = t.next));
      while (t !== a);
    }
    l.action = null;
  }
  function zr(l) {
    l = l.listeners;
    for (var t = 0; t < l.length; t++) (0, l[t])();
  }
  function Ar(l, t) {
    return t;
  }
  function Or(l, t) {
    if (ul) {
      var e = zl.formState;
      if (e !== null) {
        l: {
          var a = al;
          if (ul) {
            if (Ol) {
              t: {
                for (var n = Ol, u = Ht; n.nodeType !== 8; ) {
                  if (!u) {
                    n = null;
                    break t;
                  }
                  if (((n = qt(n.nextSibling)), n === null)) {
                    n = null;
                    break t;
                  }
                }
                ((u = n.data), (n = u === "F!" || u === "F" ? n : null));
              }
              if (n) {
                ((Ol = qt(n.nextSibling)), (a = n.data === "F!"));
                break l;
              }
            }
            Re(a);
          }
          a = !1;
        }
        a && (t = e[0]);
      }
    }
    return (
      (e = ct()),
      (e.memoizedState = e.baseState = t),
      (a = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Ar,
        lastRenderedState: t,
      }),
      (e.queue = a),
      (e = Wr.bind(null, al, a)),
      (a.dispatch = e),
      (a = is(!1)),
      (u = hs.bind(null, al, !1, a.queue)),
      (a = ct()),
      (n = { state: t, dispatch: null, action: l, pending: null }),
      (a.queue = n),
      (e = Fh.bind(null, al, n, u, e)),
      (n.dispatch = e),
      (a.memoizedState = l),
      [t, e, !1]
    );
  }
  function _r(l) {
    var t = Bl();
    return Dr(t, Ml, l);
  }
  function Dr(l, t, e) {
    if (
      ((t = ns(l, t, Ar)[0]),
      (l = ui(be)[0]),
      typeof t == "object" && t !== null && typeof t.then == "function")
    )
      try {
        var a = Kn(t);
      } catch (c) {
        throw c === Ka ? Wu : c;
      }
    else a = t;
    t = Bl();
    var n = t.queue,
      u = n.dispatch;
    return (
      e !== t.memoizedState &&
        ((al.flags |= 2048),
        $a(9, { destroy: void 0 }, $h.bind(null, n, e), null)),
      [a, u, l]
    );
  }
  function $h(l, t) {
    l.action = t;
  }
  function Ur(l) {
    var t = Bl(),
      e = Ml;
    if (e !== null) return Dr(t, e, l);
    (Bl(), (t = t.memoizedState), (e = Bl()));
    var a = e.queue.dispatch;
    return ((e.memoizedState = l), [t, a, !1]);
  }
  function $a(l, t, e, a) {
    return (
      (l = { tag: l, create: e, deps: a, inst: t, next: null }),
      (t = al.updateQueue),
      t === null && ((t = ai()), (al.updateQueue = t)),
      (e = t.lastEffect),
      e === null
        ? (t.lastEffect = l.next = l)
        : ((a = e.next), (e.next = l), (l.next = a), (t.lastEffect = l)),
      l
    );
  }
  function Rr() {
    return Bl().memoizedState;
  }
  function ii(l, t, e, a) {
    var n = ct();
    ((al.flags |= l),
      (n.memoizedState = $a(
        1 | t,
        { destroy: void 0 },
        e,
        a === void 0 ? null : a,
      )));
  }
  function ci(l, t, e, a) {
    var n = Bl();
    a = a === void 0 ? null : a;
    var u = n.memoizedState.inst;
    Ml !== null && a !== null && Ic(a, Ml.memoizedState.deps)
      ? (n.memoizedState = $a(t, u, e, a))
      : ((al.flags |= l), (n.memoizedState = $a(1 | t, u, e, a)));
  }
  function Lr(l, t) {
    ii(8390656, 8, l, t);
  }
  function ss(l, t) {
    ci(2048, 8, l, t);
  }
  function Ih(l) {
    al.flags |= 4;
    var t = al.updateQueue;
    if (t === null) ((t = ai()), (al.updateQueue = t), (t.events = [l]));
    else {
      var e = t.events;
      e === null ? (t.events = [l]) : e.push(l);
    }
  }
  function Qr(l) {
    var t = Bl().memoizedState;
    return (
      Ih({ ref: t, nextImpl: l }),
      function () {
        if ((pl & 2) !== 0) throw Error(r(440));
        return t.impl.apply(void 0, arguments);
      }
    );
  }
  function Hr(l, t) {
    return ci(4, 2, l, t);
  }
  function Br(l, t) {
    return ci(4, 4, l, t);
  }
  function qr(l, t) {
    if (typeof t == "function") {
      l = l();
      var e = t(l);
      return function () {
        typeof e == "function" ? e() : t(null);
      };
    }
    if (t != null)
      return (
        (l = l()),
        (t.current = l),
        function () {
          t.current = null;
        }
      );
  }
  function Gr(l, t, e) {
    ((e = e != null ? e.concat([l]) : null), ci(4, 4, qr.bind(null, t, l), e));
  }
  function fs() {}
  function Yr(l, t) {
    var e = Bl();
    t = t === void 0 ? null : t;
    var a = e.memoizedState;
    return t !== null && Ic(t, a[1]) ? a[0] : ((e.memoizedState = [l, t]), l);
  }
  function Zr(l, t) {
    var e = Bl();
    t = t === void 0 ? null : t;
    var a = e.memoizedState;
    if (t !== null && Ic(t, a[1])) return a[0];
    if (((a = l()), ja)) {
      Ae(!0);
      try {
        l();
      } finally {
        Ae(!1);
      }
    }
    return ((e.memoizedState = [a, t]), a);
  }
  function os(l, t, e) {
    return e === void 0 || ((je & 1073741824) !== 0 && (sl & 261930) === 0)
      ? (l.memoizedState = t)
      : ((l.memoizedState = e), (l = Id()), (al.lanes |= l), (ke |= l), e);
  }
  function wr(l, t, e, a) {
    return St(e, t)
      ? e
      : Ge.current !== null
        ? ((l = os(l, e, a)), St(l, t) || (Yl = !0), l)
        : (je & 106) === 0 || ((je & 1073741824) !== 0 && (sl & 261930) === 0)
          ? ((Yl = !0), (l.memoizedState = e))
          : ((l = Id()), (al.lanes |= l), (ke |= l), t);
  }
  function Xr(l, t, e, a, n) {
    var u = ll.p;
    ll.p = u !== 0 && 8 > u ? u : 8;
    var c = V.T,
      o = {};
    ((o.types = c !== null ? c.types : null), (V.T = o), hs(l, !1, t, e));
    try {
      var h = n(),
        p = V.S;
      if (
        (p !== null && p(o, h),
        h !== null && typeof h == "object" && typeof h.then == "function")
      ) {
        var N = Kh(h, a);
        Jn(l, t, N, Ct(l));
      } else Jn(l, t, a, Ct(l));
    } catch (C) {
      Jn(l, t, { then: function () {}, status: "rejected", reason: C }, Ct());
    } finally {
      ((ll.p = u),
        c !== null && o.types !== null && (c.types = o.types),
        (V.T = c));
    }
  }
  function Ph() {}
  function rs(l, t, e, a) {
    if (l.tag !== 5) throw Error(r(476));
    var n = Vr(l).queue;
    Xr(
      l,
      n,
      t,
      oe,
      e === null
        ? Ph
        : function () {
            return (kr(l), e(a));
          },
    );
  }
  function Vr(l) {
    var t = l.memoizedState;
    if (t !== null) return t;
    t = {
      memoizedState: oe,
      baseState: oe,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: be,
        lastRenderedState: oe,
      },
      next: null,
    };
    var e = {};
    return (
      (t.next = {
        memoizedState: e,
        baseState: e,
        baseQueue: null,
        queue: {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: be,
          lastRenderedState: e,
        },
        next: null,
      }),
      (l.memoizedState = t),
      (l = l.alternate),
      l !== null && (l.memoizedState = t),
      t
    );
  }
  function kr(l) {
    var t = Vr(l);
    (t.next === null && (t = l.alternate.memoizedState),
      Jn(l, t.next.queue, {}, Ct()));
  }
  function ds() {
    return Pl(vn);
  }
  function Kr() {
    return Bl().memoizedState;
  }
  function Jr() {
    return Bl().memoizedState;
  }
  function l1(l) {
    for (var t = l.return; t !== null; ) {
      switch (t.tag) {
        case 24:
        case 3:
          var e = Ct();
          l = Be(e);
          var a = qe(t, l, e);
          (a !== null && (gt(a, t, e), Zn(a, t, e)),
            (t = { cache: Gc() }),
            (l.payload = t));
          return;
      }
      t = t.return;
    }
  }
  function t1(l, t, e) {
    var a = Ct();
    ((e = {
      lane: a,
      revertLane: 0,
      gesture: null,
      action: e,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    }),
      si(l)
        ? Fr(t, e)
        : ((e = _c(l, t, e, a)), e !== null && (gt(e, l, a), $r(e, t, a))));
  }
  function Wr(l, t, e) {
    var a = Ct();
    Jn(l, t, e, a);
  }
  function Jn(l, t, e, a) {
    var n = {
      lane: a,
      revertLane: 0,
      gesture: null,
      action: e,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    };
    if (si(l)) Fr(t, n);
    else {
      var u = l.alternate;
      if (
        l.lanes === 0 &&
        (u === null || u.lanes === 0) &&
        ((u = t.lastRenderedReducer), u !== null)
      )
        try {
          var c = t.lastRenderedState,
            o = u(c, e);
          if (((n.hasEagerState = !0), (n.eagerState = o), St(o, c)))
            return (qu(l, t, n, 0), zl === null && Bu(), !1);
        } catch {}
      if (((e = _c(l, t, n, a)), e !== null))
        return (gt(e, l, a), $r(e, t, a), !0);
    }
    return !1;
  }
  function hs(l, t, e, a) {
    if (
      ((a = {
        lane: 2,
        revertLane: af(),
        gesture: null,
        action: a,
        hasEagerState: !1,
        eagerState: null,
        next: null,
      }),
      si(l))
    ) {
      if (t) throw Error(r(479));
    } else ((t = _c(l, e, a, 2)), t !== null && gt(t, l, 2));
  }
  function si(l) {
    var t = l.alternate;
    return l === al || (t !== null && t === al);
  }
  function Fr(l, t) {
    Wa = ti = !0;
    var e = l.pending;
    (e === null ? (t.next = t) : ((t.next = e.next), (e.next = t)),
      (l.pending = t));
  }
  function $r(l, t, e) {
    if ((e & 4194048) !== 0) {
      var a = t.lanes;
      ((a &= l.pendingLanes), (e |= a), (t.lanes = e), $f(l, e));
    }
  }
  var fi = {
      readContext: Pl,
      use: ni,
      useCallback: Ql,
      useContext: Ql,
      useEffect: Ql,
      useImperativeHandle: Ql,
      useLayoutEffect: Ql,
      useInsertionEffect: Ql,
      useMemo: Ql,
      useReducer: Ql,
      useRef: Ql,
      useState: Ql,
      useDebugValue: Ql,
      useDeferredValue: Ql,
      useTransition: Ql,
      useSyncExternalStore: Ql,
      useId: Ql,
      useHostTransitionStatus: Ql,
      useFormState: Ql,
      useActionState: Ql,
      useOptimistic: Ql,
      useMemoCache: Ql,
      useCacheRefresh: Ql,
      useEffectEvent: Ql,
    },
    Ir = {
      readContext: Pl,
      use: ni,
      useCallback: function (l, t) {
        return ((ct().memoizedState = [l, t === void 0 ? null : t]), l);
      },
      useContext: Pl,
      useEffect: Lr,
      useImperativeHandle: function (l, t, e) {
        ((e = e != null ? e.concat([l]) : null),
          ii(4194308, 4, qr.bind(null, t, l), e));
      },
      useLayoutEffect: function (l, t) {
        return ii(4194308, 4, l, t);
      },
      useInsertionEffect: function (l, t) {
        ii(4, 2, l, t);
      },
      useMemo: function (l, t) {
        var e = ct();
        t = t === void 0 ? null : t;
        var a = l();
        if (ja) {
          Ae(!0);
          try {
            l();
          } finally {
            Ae(!1);
          }
        }
        return ((e.memoizedState = [a, t]), a);
      },
      useReducer: function (l, t, e) {
        var a = ct();
        if (e !== void 0) {
          var n = e(t);
          if (ja) {
            Ae(!0);
            try {
              e(t);
            } finally {
              Ae(!1);
            }
          }
        } else n = t;
        return (
          (a.memoizedState = a.baseState = n),
          (l = {
            pending: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: l,
            lastRenderedState: n,
          }),
          (a.queue = l),
          (l = l.dispatch = t1.bind(null, al, l)),
          [a.memoizedState, l]
        );
      },
      useRef: function (l) {
        var t = ct();
        return ((l = { current: l }), (t.memoizedState = l));
      },
      useState: function (l) {
        l = is(l);
        var t = l.queue,
          e = Wr.bind(null, al, t);
        return ((t.dispatch = e), [l.memoizedState, e]);
      },
      useDebugValue: fs,
      useDeferredValue: function (l, t) {
        var e = ct();
        return os(e, l, t);
      },
      useTransition: function () {
        var l = is(!1);
        return (
          (l = Xr.bind(null, al, l.queue, !0, !1)),
          (ct().memoizedState = l),
          [!1, l]
        );
      },
      useSyncExternalStore: function (l, t, e) {
        var a = al,
          n = ct();
        if (ul) {
          if (e === void 0) throw Error(r(407));
          e = e();
        } else {
          if (((e = t()), zl === null)) throw Error(r(349));
          (sl & 127) !== 0 || pr(a, t, e);
        }
        n.memoizedState = e;
        var u = { value: e, getSnapshot: t };
        return (
          (n.queue = u),
          Lr(br.bind(null, a, u, l), [l]),
          (a.flags |= 2048),
          $a(9, { destroy: void 0 }, jr.bind(null, a, u, e, t), null),
          e
        );
      },
      useId: function () {
        var l = ct(),
          t = zl.identifierPrefix;
        if (ul) {
          var e = le,
            a = Pt;
          ((e = (a & ~(1 << (32 - jt(a) - 1))).toString(32) + e),
            (t = "_" + t + "R_" + e),
            (e = ei++),
            0 < e && (t += "H" + e.toString(32)),
            (t += "_"));
        } else ((e = Jh++), (t = "_" + t + "r_" + e.toString(32) + "_"));
        return (l.memoizedState = t);
      },
      useHostTransitionStatus: ds,
      useFormState: Or,
      useActionState: Or,
      useOptimistic: function (l) {
        var t = ct();
        t.memoizedState = t.baseState = l;
        var e = {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: null,
          lastRenderedState: null,
        };
        return (
          (t.queue = e),
          (t = hs.bind(null, al, !0, e)),
          (e.dispatch = t),
          [l, t]
        );
      },
      useMemoCache: as,
      useCacheRefresh: function () {
        return (ct().memoizedState = l1.bind(null, al));
      },
      useEffectEvent: function (l) {
        var t = ct(),
          e = { impl: l };
        return (
          (t.memoizedState = e),
          function () {
            if ((pl & 2) !== 0) throw Error(r(440));
            return e.impl.apply(void 0, arguments);
          }
        );
      },
    },
    Pr = {
      readContext: Pl,
      use: ni,
      useCallback: Yr,
      useContext: Pl,
      useEffect: ss,
      useImperativeHandle: Gr,
      useInsertionEffect: Hr,
      useLayoutEffect: Br,
      useMemo: Zr,
      useReducer: ui,
      useRef: Rr,
      useState: function () {
        return ui(be);
      },
      useDebugValue: fs,
      useDeferredValue: function (l, t) {
        var e = Bl();
        return wr(e, Ml.memoizedState, l, t);
      },
      useTransition: function () {
        var l = ui(be)[0],
          t = Bl().memoizedState;
        return [typeof l == "boolean" ? l : Kn(l), t];
      },
      useSyncExternalStore: xr,
      useId: Kr,
      useHostTransitionStatus: ds,
      useFormState: _r,
      useActionState: _r,
      useOptimistic: function (l, t) {
        var e = Bl();
        return Nr(e, Ml, l, t);
      },
      useMemoCache: as,
      useCacheRefresh: Jr,
      useEffectEvent: Qr,
    },
    e1 = {
      readContext: Pl,
      use: ni,
      useCallback: Yr,
      useContext: Pl,
      useEffect: ss,
      useImperativeHandle: Gr,
      useInsertionEffect: Hr,
      useLayoutEffect: Br,
      useMemo: Zr,
      useReducer: us,
      useRef: Rr,
      useState: function () {
        return us(be);
      },
      useDebugValue: fs,
      useDeferredValue: function (l, t) {
        var e = Bl();
        return Ml === null ? os(e, l, t) : wr(e, Ml.memoizedState, l, t);
      },
      useTransition: function () {
        var l = us(be)[0],
          t = Bl().memoizedState;
        return [typeof l == "boolean" ? l : Kn(l), t];
      },
      useSyncExternalStore: xr,
      useId: Kr,
      useHostTransitionStatus: ds,
      useFormState: Ur,
      useActionState: Ur,
      useOptimistic: function (l, t) {
        var e = Bl();
        return Ml !== null
          ? Nr(e, Ml, l, t)
          : ((e.baseState = l), [l, e.queue.dispatch]);
      },
      useMemoCache: as,
      useCacheRefresh: Jr,
      useEffectEvent: Qr,
    };
  function ms(l, t, e, a) {
    ((t = l.memoizedState),
      (e = e(a, t)),
      (e = e == null ? t : el({}, t, e)),
      (l.memoizedState = e),
      l.lanes === 0 && (l.updateQueue.baseState = e));
  }
  var ys = {
    enqueueSetState: function (l, t, e) {
      l = l._reactInternals;
      var a = Ct(),
        n = Be(a);
      ((n.payload = t),
        e != null && (n.callback = e),
        (t = qe(l, n, a)),
        t !== null && (gt(t, l, a), Zn(t, l, a)));
    },
    enqueueReplaceState: function (l, t, e) {
      l = l._reactInternals;
      var a = Ct(),
        n = Be(a);
      ((n.tag = 1),
        (n.payload = t),
        e != null && (n.callback = e),
        (t = qe(l, n, a)),
        t !== null && (gt(t, l, a), Zn(t, l, a)));
    },
    enqueueForceUpdate: function (l, t) {
      l = l._reactInternals;
      var e = Ct(),
        a = Be(e);
      ((a.tag = 2),
        t != null && (a.callback = t),
        (t = qe(l, a, e)),
        t !== null && (gt(t, l, e), Zn(t, l, e)));
    },
  };
  function ld(l, t, e, a, n, u, c) {
    return (
      (l = l.stateNode),
      typeof l.shouldComponentUpdate == "function"
        ? l.shouldComponentUpdate(a, u, c)
        : t.prototype && t.prototype.isPureReactComponent
          ? !Rn(e, a) || !Rn(n, u)
          : !0
    );
  }
  function td(l, t, e, a) {
    ((l = t.state),
      typeof t.componentWillReceiveProps == "function" &&
        t.componentWillReceiveProps(e, a),
      typeof t.UNSAFE_componentWillReceiveProps == "function" &&
        t.UNSAFE_componentWillReceiveProps(e, a),
      t.state !== l && ys.enqueueReplaceState(t, t.state, null));
  }
  function ba(l, t) {
    var e = t;
    if ("ref" in t) {
      e = {};
      for (var a in t) a !== "ref" && (e[a] = t[a]);
    }
    if ((l = l.defaultProps)) {
      e === t && (e = el({}, e));
      for (var n in l) e[n] === void 0 && (e[n] = l[n]);
    }
    return e;
  }
  function ed(l) {
    Hu(l);
  }
  function ad(l) {
    console.error(l);
  }
  function nd(l) {
    Hu(l);
  }
  function oi(l, t) {
    try {
      var e = l.onUncaughtError;
      e(t.value, { componentStack: t.stack });
    } catch (a) {
      setTimeout(function () {
        throw a;
      });
    }
  }
  function ud(l, t, e) {
    try {
      var a = l.onCaughtError;
      a(e.value, {
        componentStack: e.stack,
        errorBoundary: t.tag === 1 ? t.stateNode : null,
      });
    } catch (n) {
      setTimeout(function () {
        throw n;
      });
    }
  }
  function gs(l, t, e) {
    return (
      (e = Be(e)),
      (e.tag = 3),
      (e.payload = { element: null }),
      (e.callback = function () {
        oi(l, t);
      }),
      e
    );
  }
  function id(l) {
    return ((l = Be(l)), (l.tag = 3), l);
  }
  function cd(l, t, e, a) {
    var n = e.type.getDerivedStateFromError;
    if (typeof n == "function") {
      var u = a.value;
      ((l.payload = function () {
        return n(u);
      }),
        (l.callback = function () {
          ud(t, e, a);
        }));
    }
    var c = e.stateNode;
    c !== null &&
      typeof c.componentDidCatch == "function" &&
      (l.callback = function () {
        (ud(t, e, a),
          typeof n != "function" &&
            (Ke === null ? (Ke = new Set([this])) : Ke.add(this)));
        var o = a.stack;
        this.componentDidCatch(a.value, {
          componentStack: o !== null ? o : "",
        });
      });
  }
  function a1(l, t, e, a, n) {
    if (
      ((e.flags |= 32768),
      a !== null && typeof a == "object" && typeof a.then == "function")
    ) {
      if (
        ((t = e.alternate),
        t !== null && ha(t, e, n, !0),
        (e = lt.current),
        e !== null)
      ) {
        switch (e.tag) {
          case 31:
          case 13:
          case 19:
            return (
              ut === null ? _i() : e.alternate === null && Hl === 0 && (Hl = 3),
              (e.flags &= -257),
              (e.flags |= 65536),
              (e.lanes = n),
              a === Fu
                ? (e.flags |= 16384)
                : ((t = e.updateQueue),
                  t === null ? (e.updateQueue = new Set([a])) : t.add(a),
                  lf(l, a, n)),
              !1
            );
          case 22:
            return (
              (e.flags |= 65536),
              a === Fu
                ? (e.flags |= 16384)
                : ((t = e.updateQueue),
                  t === null
                    ? ((t = {
                        transitions: null,
                        markerInstances: null,
                        retryQueue: new Set([a]),
                      }),
                      (e.updateQueue = t))
                    : ((e = t.retryQueue),
                      e === null ? (t.retryQueue = new Set([a])) : e.add(a)),
                  lf(l, a, n)),
              !1
            );
        }
        throw Error(r(435, e.tag));
      }
      return (lf(l, a, n), _i(), !1);
    }
    if (ul)
      return (
        (t = lt.current),
        t !== null
          ? ((t.flags & 65536) === 0 && (t.flags |= 256),
            (t.flags |= 65536),
            (t.lanes = n),
            a !== Qc && ((l = Error(r(422), { cause: a })), Hn(Rt(l, e))))
          : (a !== Qc && ((t = Error(r(423), { cause: a })), Hn(Rt(t, e))),
            (l = l.current.alternate),
            (l.flags |= 65536),
            (n &= -n),
            (l.lanes |= n),
            (a = Rt(a, e)),
            (n = gs(l.stateNode, a, n)),
            kc(l, n),
            Hl !== 4 && (Hl = 2)),
        !1
      );
    var u = Error(r(520), { cause: a });
    if (
      ((u = Rt(u, e)),
      eu === null ? (eu = [u]) : eu.push(u),
      Hl !== 4 && (Hl = 2),
      t === null)
    )
      return !0;
    ((a = Rt(a, e)), (e = t));
    do {
      switch (e.tag) {
        case 3:
          return (
            (e.flags |= 65536),
            (l = n & -n),
            (e.lanes |= l),
            (l = gs(e.stateNode, a, l)),
            kc(e, l),
            !1
          );
        case 1:
          if (
            ((t = e.type),
            (u = e.stateNode),
            (e.flags & 128) === 0 &&
              (typeof t.getDerivedStateFromError == "function" ||
                (u !== null &&
                  typeof u.componentDidCatch == "function" &&
                  (Ke === null || !Ke.has(u)))))
          )
            return (
              (e.flags |= 65536),
              (n &= -n),
              (e.lanes |= n),
              (n = id(n)),
              cd(n, l, e, a),
              kc(e, n),
              !1
            );
          break;
        case 22:
          if (e.memoizedState !== null) return ((e.flags |= 65536), !1);
      }
      e = e.return;
    } while (e !== null);
    return !1;
  }
  var vs = Error(r(461)),
    Yl = !1;
  function wl(l, t, e, a) {
    t.child = l === null ? rr(t, null, e, a) : pa(t, l.child, e, a);
  }
  function sd(l, t, e, a, n) {
    e = e.render;
    var u = t.ref;
    if ("ref" in a) {
      var c = {};
      for (var o in a) o !== "ref" && (c[o] = a[o]);
    } else c = a;
    return (
      ma(t),
      (a = Pc(l, t, e, c, u, n)),
      (o = ls()),
      l !== null && !Yl
        ? (ts(l, t, n), Se(l, t, n))
        : (ul && o && wu(t), (t.flags |= 1), wl(l, t, a, n), t.child)
    );
  }
  function fd(l, t, e, a, n) {
    if (l === null) {
      var u = e.type;
      return typeof u == "function" &&
        !Dc(u) &&
        u.defaultProps === void 0 &&
        e.compare === null
        ? ((t.tag = 15), (t.type = u), od(l, t, u, a, n))
        : ((l = Yu(e.type, null, a, t, t.mode, n)),
          (l.ref = t.ref),
          (l.return = t),
          (t.child = l));
    }
    if (((u = l.child), !Ts(l, n))) {
      var c = u.memoizedProps;
      if (
        ((e = e.compare), (e = e !== null ? e : Rn), e(c, a) && l.ref === t.ref)
      )
        return Se(l, t, n);
    }
    return (
      (t.flags |= 1),
      (l = ge(u, a)),
      (l.ref = t.ref),
      (l.return = t),
      (t.child = l)
    );
  }
  function od(l, t, e, a, n) {
    if (l !== null) {
      var u = l.memoizedProps;
      if (Rn(u, a) && l.ref === t.ref)
        if (((Yl = !1), (t.pendingProps = a = u), Ts(l, n)))
          (l.flags & 131072) !== 0 && (Yl = !0);
        else return ((t.lanes = l.lanes), Se(l, t, n));
    }
    return xs(l, t, e, a, n);
  }
  function rd(l, t, e, a) {
    var n = a.children,
      u = l !== null ? l.memoizedState : null;
    if (
      (l === null &&
        t.stateNode === null &&
        (t.stateNode = {
          _visibility: 1,
          _pendingMarkers: null,
          _retryCache: null,
          _transitions: null,
        }),
      a.mode === "hidden")
    ) {
      if ((t.flags & 128) !== 0) {
        if (((u = u !== null ? u.baseLanes | e : e), l !== null)) {
          for (a = t.child = l.child, n = 0; a !== null; )
            ((n = n | a.lanes | a.childLanes), (a = a.sibling));
          a = n & ~u;
        } else ((a = 0), (t.child = null));
        return dd(l, t, u, e, a);
      }
      if ((e & 536870912) !== 0)
        ((t.memoizedState = { baseLanes: 0, cachePool: null }),
          l !== null && Ju(t, u !== null ? u.cachePool : null),
          u !== null ? mr(t, u) : Jc(),
          yr(t));
      else
        return (
          (a = t.lanes = 536870912),
          dd(l, t, u !== null ? u.baseLanes | e : e, e, a)
        );
    } else
      u !== null
        ? (Ju(t, u.cachePool), mr(t, u), Ze(), (t.memoizedState = null))
        : (l !== null && Ju(t, null), Jc(), Ze());
    return (wl(l, t, n, e), t.child);
  }
  function Wn(l, t) {
    return (
      (l !== null && l.tag === 22) ||
        t.stateNode !== null ||
        (t.stateNode = {
          _visibility: 1,
          _pendingMarkers: null,
          _retryCache: null,
          _transitions: null,
        }),
      t.sibling
    );
  }
  function dd(l, t, e, a, n) {
    var u = Zc();
    return (
      (u = u === null ? null : { parent: ql._currentValue, pool: u }),
      (t.memoizedState = { baseLanes: e, cachePool: u }),
      l !== null && Ju(t, null),
      Jc(),
      yr(t),
      l !== null && ha(l, t, a, !0),
      (t.childLanes = n),
      null
    );
  }
  function ri(l, t) {
    return (
      (t = di({ mode: t.mode, children: t.children }, l.mode)),
      (t.ref = l.ref),
      (l.child = t),
      (t.return = l),
      t
    );
  }
  function hd(l, t, e) {
    return (
      pa(t, l.child, null, e),
      (l = ri(t, t.pendingProps)),
      (l.flags |= 2),
      Et(t),
      (t.memoizedState = null),
      l
    );
  }
  function n1(l, t, e) {
    var a = t.pendingProps,
      n = (t.flags & 128) !== 0;
    if (((t.flags &= -129), l === null)) {
      if (ul) {
        if (a.mode === "hidden")
          return (
            (l = ri(t, a)),
            (t.lanes = 536870912),
            (l.memoizedState = { baseLanes: 0, cachePool: null }),
            Wn(null, l)
          );
        if (
          (Fc(t),
          (l = Ol)
            ? ((l = q0(l, Ht)),
              (l = l !== null && l.data === "&" ? l : null),
              l !== null &&
                ((t.memoizedState = {
                  dehydrated: l,
                  treeContext: De !== null ? { id: Pt, overflow: le } : null,
                  retryLane: 536870912,
                  hydrationErrors: null,
                }),
                (e = Fo(l)),
                (e.return = t),
                (t.child = e),
                (kl = t),
                (Ol = null)))
            : (l = null),
          l === null)
        )
          throw Re(t);
        return ((t.lanes = 536870912), null);
      }
      return ri(t, a);
    }
    var u = l.memoizedState;
    if (u !== null) {
      var c = u.dehydrated;
      if ((Fc(t), n))
        if (t.flags & 256) ((t.flags &= -257), (t = hd(l, t, e)));
        else if (t.memoizedState !== null)
          ((t.child = l.child), (t.flags |= 128), (t = null));
        else throw Error(r(558));
      else if (
        (Yl || ha(l, t, e, !1), (n = (e & l.childLanes) !== 0), Yl || n)
      ) {
        if (Ge.current === null) {
          if (
            ((a = zl),
            a !== null && ((c = If(a, e)), c !== 0 && c !== u.retryLane))
          )
            throw ((u.retryLane = c), fa(l, c), gt(a, l, c), vs);
          _i();
        }
        t = hd(l, t, e);
      } else
        ((l = u.treeContext),
          (Ol = qt(c.nextSibling)),
          (kl = t),
          (ul = !0),
          (Ue = null),
          (Ht = !1),
          l !== null && Po(t, l),
          (t = ri(t, a)),
          (t.flags |= 134221824));
      return t;
    }
    return (
      (l = ge(l.child, { mode: a.mode, children: a.children })),
      (l.ref = t.ref),
      (t.child = l),
      (l.return = t),
      l
    );
  }
  function Ia(l, t) {
    var e = t.ref;
    if (e === null) l !== null && l.ref !== null && (t.flags |= 4194816);
    else {
      if (typeof e != "function" && typeof e != "object") throw Error(r(284));
      (l === null || l.ref !== e) && (t.flags |= 4194816);
    }
  }
  function xs(l, t, e, a, n) {
    return (
      ma(t),
      (e = Pc(l, t, e, a, void 0, n)),
      (a = ls()),
      l !== null && !Yl
        ? (ts(l, t, n), Se(l, t, n))
        : (ul && a && wu(t), (t.flags |= 1), wl(l, t, e, n), t.child)
    );
  }
  function md(l, t, e, a, n, u) {
    return (
      ma(t),
      (t.updateQueue = null),
      (e = vr(t, a, e, n)),
      gr(l),
      (a = ls()),
      l !== null && !Yl
        ? (ts(l, t, u), Se(l, t, u))
        : (ul && a && wu(t), (t.flags |= 1), wl(l, t, e, u), t.child)
    );
  }
  function yd(l, t, e, a, n) {
    if ((ma(t), t.stateNode === null)) {
      var u = Za,
        c = e.contextType;
      (typeof c == "object" && c !== null && (u = Pl(c)),
        (u = new e(a, u)),
        (t.memoizedState =
          u.state !== null && u.state !== void 0 ? u.state : null),
        (u.updater = ys),
        (t.stateNode = u),
        (u._reactInternals = t),
        (u = t.stateNode),
        (u.props = a),
        (u.state = t.memoizedState),
        (u.refs = {}),
        Xc(t),
        (c = e.contextType),
        (u.context = typeof c == "object" && c !== null ? Pl(c) : Za),
        (u.state = t.memoizedState),
        (c = e.getDerivedStateFromProps),
        typeof c == "function" && (ms(t, e, c, a), (u.state = t.memoizedState)),
        typeof e.getDerivedStateFromProps == "function" ||
          typeof u.getSnapshotBeforeUpdate == "function" ||
          (typeof u.UNSAFE_componentWillMount != "function" &&
            typeof u.componentWillMount != "function") ||
          ((c = u.state),
          typeof u.componentWillMount == "function" && u.componentWillMount(),
          typeof u.UNSAFE_componentWillMount == "function" &&
            u.UNSAFE_componentWillMount(),
          c !== u.state && ys.enqueueReplaceState(u, u.state, null),
          Xn(t, a, u, n),
          wn(),
          (u.state = t.memoizedState)),
        typeof u.componentDidMount == "function" && (t.flags |= 4194308),
        (a = !0));
    } else if (l === null) {
      u = t.stateNode;
      var o = t.memoizedProps,
        h = ba(e, o);
      u.props = h;
      var p = u.context,
        N = e.contextType;
      ((c = Za), typeof N == "object" && N !== null && (c = Pl(N)));
      var C = e.getDerivedStateFromProps;
      ((N =
        typeof C == "function" ||
        typeof u.getSnapshotBeforeUpdate == "function"),
        (o = t.pendingProps !== o),
        N ||
          (typeof u.UNSAFE_componentWillReceiveProps != "function" &&
            typeof u.componentWillReceiveProps != "function") ||
          ((o || p !== c) && td(t, u, a, c)),
        (He = !1));
      var v = t.memoizedState;
      ((u.state = v),
        Xn(t, a, u, n),
        wn(),
        (p = t.memoizedState),
        o || v !== p || He
          ? (typeof C == "function" && (ms(t, e, C, a), (p = t.memoizedState)),
            (h = He || ld(t, e, h, a, v, p, c))
              ? (N ||
                  (typeof u.UNSAFE_componentWillMount != "function" &&
                    typeof u.componentWillMount != "function") ||
                  (typeof u.componentWillMount == "function" &&
                    u.componentWillMount(),
                  typeof u.UNSAFE_componentWillMount == "function" &&
                    u.UNSAFE_componentWillMount()),
                typeof u.componentDidMount == "function" &&
                  (t.flags |= 4194308))
              : (typeof u.componentDidMount == "function" &&
                  (t.flags |= 4194308),
                (t.memoizedProps = a),
                (t.memoizedState = p)),
            (u.props = a),
            (u.state = p),
            (u.context = c),
            (a = h))
          : (typeof u.componentDidMount == "function" && (t.flags |= 4194308),
            (a = !1)));
    } else {
      ((u = t.stateNode),
        Vc(l, t),
        (c = t.memoizedProps),
        (N = ba(e, c)),
        (u.props = N),
        (C = t.pendingProps),
        (v = u.context),
        (p = e.contextType),
        (h = Za),
        typeof p == "object" && p !== null && (h = Pl(p)),
        (o = e.getDerivedStateFromProps),
        (p =
          typeof o == "function" ||
          typeof u.getSnapshotBeforeUpdate == "function") ||
          (typeof u.UNSAFE_componentWillReceiveProps != "function" &&
            typeof u.componentWillReceiveProps != "function") ||
          ((c !== C || v !== h) && td(t, u, a, h)),
        (He = !1),
        (v = t.memoizedState),
        (u.state = v),
        Xn(t, a, u, n),
        wn());
      var b = t.memoizedState;
      c !== C ||
      v !== b ||
      He ||
      (l !== null && l.dependencies !== null && ku(l.dependencies))
        ? (typeof o == "function" && (ms(t, e, o, a), (b = t.memoizedState)),
          (N =
            He ||
            ld(t, e, N, a, v, b, h) ||
            (l !== null && l.dependencies !== null && ku(l.dependencies)))
            ? (p ||
                (typeof u.UNSAFE_componentWillUpdate != "function" &&
                  typeof u.componentWillUpdate != "function") ||
                (typeof u.componentWillUpdate == "function" &&
                  u.componentWillUpdate(a, b, h),
                typeof u.UNSAFE_componentWillUpdate == "function" &&
                  u.UNSAFE_componentWillUpdate(a, b, h)),
              typeof u.componentDidUpdate == "function" && (t.flags |= 4),
              typeof u.getSnapshotBeforeUpdate == "function" &&
                (t.flags |= 1024))
            : (typeof u.componentDidUpdate != "function" ||
                (c === l.memoizedProps && v === l.memoizedState) ||
                (t.flags |= 4),
              typeof u.getSnapshotBeforeUpdate != "function" ||
                (c === l.memoizedProps && v === l.memoizedState) ||
                (t.flags |= 1024),
              (t.memoizedProps = a),
              (t.memoizedState = b)),
          (u.props = a),
          (u.state = b),
          (u.context = h),
          (a = N))
        : (typeof u.componentDidUpdate != "function" ||
            (c === l.memoizedProps && v === l.memoizedState) ||
            (t.flags |= 4),
          typeof u.getSnapshotBeforeUpdate != "function" ||
            (c === l.memoizedProps && v === l.memoizedState) ||
            (t.flags |= 1024),
          (a = !1));
    }
    return (
      (u = a),
      Ia(l, t),
      (a = (t.flags & 128) !== 0),
      u || a
        ? ((u = t.stateNode),
          (e =
            a && typeof e.getDerivedStateFromError != "function"
              ? null
              : u.render()),
          (t.flags |= 1),
          l !== null && a
            ? ((t.child = pa(t, l.child, null, n)),
              (t.child = pa(t, null, e, n)))
            : wl(l, t, e, n),
          (t.memoizedState = u.state),
          (l = t.child))
        : (l = Se(l, t, n)),
      l
    );
  }
  function gd(l, t, e, a) {
    return (ra(), (t.flags |= 256), wl(l, t, e, a), t.child);
  }
  var ps = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null,
  };
  function js(l) {
    return { baseLanes: l, cachePool: ur() };
  }
  function bs(l, t, e) {
    return ((l = l !== null ? l.childLanes & ~e : 0), t && (l |= Mt), l);
  }
  function vd(l, t, e) {
    var a = t.pendingProps,
      n = !1,
      u = (t.flags & 128) !== 0,
      c;
    if (
      ((c = u) ||
        (c =
          l !== null && l.memoizedState === null ? !1 : (tt.current & 2) !== 0),
      c && ((n = !0), (t.flags &= -129)),
      (c = (t.flags & 32) !== 0),
      (t.flags &= -33),
      l === null)
    ) {
      if (ul) {
        if (
          (n ? Ye(t) : Ze(),
          (l = Ol)
            ? ((l = q0(l, Ht)),
              (l = l !== null && l.data !== "&" ? l : null),
              l !== null &&
                ((t.memoizedState = {
                  dehydrated: l,
                  treeContext: De !== null ? { id: Pt, overflow: le } : null,
                  retryLane: 536870912,
                  hydrationErrors: null,
                }),
                (e = Fo(l)),
                (e.return = t),
                (t.child = e),
                (kl = t),
                (Ol = null)))
            : (l = null),
          l === null)
        )
          throw Re(t);
        return (bf(l) ? (t.lanes = 32) : (t.lanes = 536870912), null);
      }
      return (
        (u = a.children),
        (a = a.fallback),
        n
          ? (Ze(),
            (n = t.mode),
            (u = di({ mode: "hidden", children: u }, n)),
            (a = oa(a, n, e, null)),
            (u.return = t),
            (a.return = t),
            (u.sibling = a),
            (t.child = u),
            (a = t.child),
            (a.memoizedState = js(e)),
            (a.childLanes = bs(l, c, e)),
            (t.memoizedState = ps),
            Wn(null, a))
          : (Ye(t), Ss(t, u))
      );
    }
    var o = l.memoizedState;
    if (o !== null) {
      var h = o.dehydrated;
      if (h !== null) return u1(l, t, u, c, a, h, o, e);
    }
    return n
      ? (Ze(),
        (n = a.fallback),
        (u = t.mode),
        (o = l.child),
        (h = o.sibling),
        (a = ge(o, { mode: "hidden", children: a.children })),
        (a.subtreeFlags = o.subtreeFlags & 1206910976),
        h !== null ? (n = ge(h, n)) : ((n = oa(n, u, e, null)), (n.flags |= 2)),
        (n.return = t),
        (a.return = t),
        (a.sibling = n),
        (t.child = a),
        Wn(null, a),
        (a = t.child),
        (n = l.child.memoizedState),
        n === null
          ? (n = js(e))
          : ((u = n.cachePool),
            u !== null
              ? ((o = ql._currentValue),
                (u = u.parent !== o ? { parent: o, pool: o } : u))
              : (u = ur()),
            (n = { baseLanes: n.baseLanes | e, cachePool: u })),
        (a.memoizedState = n),
        (a.childLanes = bs(l, c, e)),
        (t.memoizedState = ps),
        Wn(l.child, a))
      : (Ye(t),
        (e = l.child),
        (l = e.sibling),
        (e = ge(e, { mode: "visible", children: a.children })),
        (e.return = t),
        (e.sibling = null),
        l !== null &&
          ((c = t.deletions),
          c === null ? ((t.deletions = [l]), (t.flags |= 16)) : c.push(l)),
        (t.child = e),
        (t.memoizedState = null),
        e);
  }
  function Ss(l, t) {
    return (
      (t = di({ mode: "visible", children: t }, l.mode)),
      (t.return = l),
      (l.child = t)
    );
  }
  function di(l, t) {
    return ((l = dt(22, l, null, t)), (l.lanes = 0), l);
  }
  function hi(l, t, e) {
    return (
      pa(t, l.child, null, e),
      (l = Ss(t, t.pendingProps.children)),
      (l.flags |= 2),
      (t.memoizedState = null),
      l
    );
  }
  function u1(l, t, e, a, n, u, c, o) {
    if (e)
      return t.flags & 256
        ? (Ye(t), (t.flags &= -257), hi(l, t, o))
        : t.memoizedState !== null
          ? (Ze(), (t.child = l.child), (t.flags |= 128), null)
          : (Ze(),
            (u = n.fallback),
            (c = t.mode),
            (n = di({ mode: "visible", children: n.children }, c)),
            (u = oa(u, c, o, null)),
            (u.flags |= 2),
            (n.return = t),
            (u.return = t),
            (n.sibling = u),
            (t.child = n),
            pa(t, l.child, null, o),
            (n = t.child),
            (n.memoizedState = js(o)),
            (n.childLanes = bs(l, a, o)),
            (t.memoizedState = ps),
            Wn(null, n));
    if ((Ye(t), bf(u))) {
      if (((a = u.nextSibling && u.nextSibling.dataset), a)) var h = a.dgst;
      return (
        (a = h),
        a !== "" &&
          ((n = Error(r(419))),
          (n.stack = ""),
          (n.digest = a),
          Hn({ value: n, source: null, stack: null })),
        hi(l, t, o)
      );
    }
    if ((Yl || ha(l, t, o, !1), (a = (o & l.childLanes) !== 0), Yl || a)) {
      if (Ge.current !== null) return hi(l, t, o);
      if (
        ((a = zl), a !== null && ((n = If(a, o)), n !== 0 && n !== c.retryLane))
      )
        throw ((c.retryLane = n), fa(l, n), gt(a, l, n), vs);
      return (jf(u) || _i(), hi(l, t, o));
    }
    return jf(u)
      ? ((t.flags |= 192), (t.child = l.child), null)
      : ((l = c.treeContext),
        (Ol = qt(u.nextSibling)),
        (kl = t),
        (ul = !0),
        (Ue = null),
        (Ht = !1),
        l !== null && Po(t, l),
        (t = Ss(t, n.children)),
        (t.flags |= 134221824),
        t);
  }
  function xd(l, t, e) {
    l.lanes |= t;
    var a = l.alternate;
    (a !== null && (a.lanes |= t), Vu(l.return, t, e));
  }
  function pd(l) {
    for (var t = null; l !== null; ) {
      var e = l.alternate;
      (e !== null && li(e) === null && (t = l), (l = l.sibling));
    }
    return t;
  }
  function mi(l, t, e, a, n, u) {
    var c = l.memoizedState;
    c === null
      ? (l.memoizedState = {
          isBackwards: t,
          rendering: null,
          renderingStartTime: 0,
          last: a,
          tail: e,
          tailMode: n,
          treeForkCount: u,
        })
      : ((c.isBackwards = t),
        (c.rendering = null),
        (c.renderingStartTime = 0),
        (c.last = a),
        (c.tail = e),
        (c.tailMode = n),
        (c.treeForkCount = u));
  }
  function Es(l) {
    var t = l.child;
    for (l.child = null; t !== null; ) {
      var e = t.sibling;
      ((t.sibling = l.child), (l.child = t), (t = e));
    }
  }
  function Ns(l, t, e) {
    var a = t.pendingProps,
      n = a.revealOrder,
      u = a.tail;
    a = a.children;
    var c = tt.current;
    if (t.flags & 128) return (Vn(t, c), null);
    var o = (c & 2) !== 0;
    if (
      (o ? ((c = (c & 1) | 2), (t.flags |= 128)) : (c &= 1),
      Vn(t, c),
      n === "backwards" && l !== null
        ? (Es(l), wl(l, t, a, e), Es(l))
        : wl(l, t, a, e),
      (a = ul ? Qn : 0),
      !o && l !== null && (l.flags & 128) !== 0)
    )
      l: for (l = t.child; l !== null; ) {
        if (l.tag === 13) l.memoizedState !== null && xd(l, e, t);
        else if (l.tag === 19) xd(l, e, t);
        else if (l.child !== null) {
          ((l.child.return = l), (l = l.child));
          continue;
        }
        if (l === t) break l;
        for (; l.sibling === null; ) {
          if (l.return === null || l.return === t) break l;
          l = l.return;
        }
        ((l.sibling.return = l.return), (l = l.sibling));
      }
    switch (n) {
      case "backwards":
        ((e = pd(t.child)),
          e === null
            ? ((n = t.child), (t.child = null))
            : ((n = e.sibling), (e.sibling = null), Es(t)),
          mi(t, !0, n, null, u, a));
        break;
      case "unstable_legacy-backwards":
        for (e = null, n = t.child, t.child = null; n !== null; ) {
          if (((l = n.alternate), l !== null && li(l) === null)) {
            t.child = n;
            break;
          }
          ((l = n.sibling), (n.sibling = e), (e = n), (n = l));
        }
        mi(t, !0, e, null, u, a);
        break;
      case "together":
        mi(t, !1, null, null, void 0, a);
        break;
      case "independent":
        t.memoizedState = null;
        break;
      default:
        ((e = pd(t.child)),
          e === null
            ? ((n = t.child), (t.child = null))
            : ((n = e.sibling), (e.sibling = null)),
          mi(t, !1, n, e, u, a));
    }
    return t.child;
  }
  function jd(l, t, e) {
    var a = t.pendingProps;
    return (Le(t, t.type, a.value), wl(l, t, a.children, e), t.child);
  }
  function Se(l, t, e) {
    if (
      (l !== null && (t.dependencies = l.dependencies),
      (ke |= t.lanes),
      (e & t.childLanes) === 0)
    )
      if (l !== null) {
        if ((ha(l, t, e, !1), (e & t.childLanes) === 0)) return null;
      } else return null;
    if (l !== null && t.child !== l.child) throw Error(r(153));
    if (t.child !== null) {
      for (
        l = t.child, e = ge(l, l.pendingProps), t.child = e, e.return = t;
        l.sibling !== null;

      )
        ((l = l.sibling),
          (e = e.sibling = ge(l, l.pendingProps)),
          (e.return = t));
      e.sibling = null;
    }
    return t.child;
  }
  function Ts(l, t) {
    return (l.lanes & t) !== 0
      ? !0
      : ((l = l.dependencies), !!(l !== null && ku(l)));
  }
  function i1(l, t, e) {
    switch (t.tag) {
      case 3:
        (pu(t, t.stateNode.containerInfo),
          Le(t, ql, l.memoizedState.cache),
          ra());
        break;
      case 27:
      case 5:
        Ii(t);
        break;
      case 4:
        pu(t, t.stateNode.containerInfo);
        break;
      case 10:
        Le(t, t.type, t.memoizedProps.value);
        break;
      case 31:
        if (t.memoizedState !== null) return ((t.flags |= 128), Fc(t), null);
        break;
      case 13:
        var a = t.memoizedState;
        if (a !== null) {
          if (a.dehydrated !== null) return (Ye(t), (t.flags |= 128), null);
          a = ha(l, t, e, !1);
          var n = t.child.childLanes;
          return a || (e & n) !== 0
            ? vd(l, t, e)
            : (Ye(t), (l = Se(l, t, e)), l !== null ? l.sibling : null);
        }
        Ye(t);
        break;
      case 19:
        if (t.flags & 128) return Ns(l, t, e);
        if (
          ((n = (l.flags & 128) !== 0),
          (a = (e & t.childLanes) !== 0),
          a || (ha(l, t, e, !1), (a = (e & t.childLanes) !== 0)),
          n)
        ) {
          if (a) return Ns(l, t, e);
          t.flags |= 128;
        }
        if (
          ((n = t.memoizedState),
          n !== null &&
            ((n.rendering = null), (n.tail = null), (n.lastEffect = null)),
          Vn(t, tt.current),
          a)
        )
          break;
        return null;
      case 22:
        return ((t.lanes = 0), rd(l, t, e, t.pendingProps));
      case 24:
        Le(t, ql, l.memoizedState.cache);
    }
    return Se(l, t, e);
  }
  function bd(l, t, e) {
    if (l !== null)
      if (l.memoizedProps !== t.pendingProps) Yl = !0;
      else {
        if (!Ts(l, e) && (t.flags & 128) === 0) return ((Yl = !1), i1(l, t, e));
        Yl = (l.flags & 131072) !== 0;
      }
    else ((Yl = !1), ul && (t.flags & 1048576) !== 0 && Io(t, Qn, t.index));
    switch (((t.lanes = 0), t.tag)) {
      case 16:
        l: {
          var a = t.pendingProps;
          if (((l = va(t.elementType)), (t.type = l), typeof l == "function"))
            Dc(l)
              ? ((a = ba(l, a)), (t.tag = 1), (t = yd(null, t, l, a, e)))
              : ((t.tag = 0), (t = xs(null, t, l, a, e)));
          else {
            if (l != null) {
              var n = l.$$typeof;
              if (n === q) {
                ((t.tag = 11), (t = sd(null, t, l, a, e)));
                break l;
              } else if (n === Cl) {
                ((t.tag = 14), (t = fd(null, t, l, a, e)));
                break l;
              } else if (n === Xl) {
                ((t.tag = 10), (t.type = l), (t = jd(null, t, e)));
                break l;
              }
            }
            throw ((t = yl(l) || l), Error(r(306, t, "")));
          }
        }
        return t;
      case 0:
        return xs(l, t, t.type, t.pendingProps, e);
      case 1:
        return ((a = t.type), (n = ba(a, t.pendingProps)), yd(l, t, a, n, e));
      case 3:
        l: {
          if ((pu(t, t.stateNode.containerInfo), l === null))
            throw Error(r(387));
          a = t.pendingProps;
          var u = t.memoizedState;
          ((n = u.element), Vc(l, t), Xn(t, a, null, e));
          var c = t.memoizedState;
          if (
            ((a = c.cache),
            Le(t, ql, a),
            a !== u.cache && qc(t, [ql], e, !0),
            wn(),
            (a = c.element),
            u.isDehydrated)
          )
            if (
              ((u = { element: a, isDehydrated: !1, cache: c.cache }),
              (t.updateQueue.baseState = u),
              (t.memoizedState = u),
              t.flags & 256)
            ) {
              t = gd(l, t, a, e);
              break l;
            } else if (a !== n) {
              ((n = Rt(Error(r(424)), t)), Hn(n), (t = gd(l, t, a, e)));
              break l;
            } else
              for (
                l = t.stateNode.containerInfo,
                  l.nodeType === 9
                    ? (l = l.body)
                    : (l = l.nodeName === "HTML" ? l.ownerDocument.body : l),
                  Ol = qt(l.firstChild),
                  kl = t,
                  ul = !0,
                  Ue = null,
                  Ht = !0,
                  e = rr(t, null, a, e),
                  t.child = e;
                e;

              )
                ((e.flags = (e.flags & -3) | 134221824), (e = e.sibling));
          else {
            if ((ra(), a === n)) {
              t = Se(l, t, e);
              break l;
            }
            wl(l, t, a, e);
          }
          t = t.child;
        }
        return t;
      case 26:
        return (
          Ia(l, t),
          l === null
            ? (e = k0(t.type, null, t.pendingProps, null))
              ? (t.memoizedState = e)
              : ul || (t.stateNode = T0(t.type, t.pendingProps, Ce.current, t))
            : (t.memoizedState = k0(
                t.type,
                l.memoizedProps,
                t.pendingProps,
                l.memoizedState,
              )),
          null
        );
      case 27:
        return (
          Ii(t),
          l === null &&
            ul &&
            ((a = t.stateNode = Z0(t.type, t.pendingProps, Ce.current)),
            (kl = t),
            (Ht = !0),
            (n = Ol),
            Fe(t.type) ? ((Sf = n), (Ol = qt(a.firstChild))) : (Ol = n)),
          wl(l, t, t.pendingProps.children, e),
          Ia(l, t),
          l === null && (t.flags |= 4194304),
          t.child
        );
      case 5:
        return (
          l === null &&
            ul &&
            ((n = a = Ol) &&
              ((a = lm(a, t.type, t.pendingProps, Ht)),
              a !== null
                ? ((t.stateNode = a),
                  (kl = t),
                  (Ol = qt(a.firstChild)),
                  (Ht = !1),
                  (n = !0))
                : (n = !1)),
            n || Re(t)),
          Ii(t),
          (n = t.type),
          (u = t.pendingProps),
          (c = l !== null ? l.memoizedProps : null),
          (a = u.children),
          hf(n, u) ? (a = null) : c !== null && hf(n, c) && (t.flags |= 32),
          t.memoizedState !== null &&
            ((n = Pc(l, t, Wh, null, null, e)), (vn._currentValue = n)),
          Ia(l, t),
          wl(l, t, a, e),
          t.child
        );
      case 6:
        return (
          l === null &&
            ul &&
            ((l = e = Ol) &&
              ((e = tm(e, t.pendingProps, Ht)),
              e !== null
                ? ((t.stateNode = e), (kl = t), (Ol = null), (l = !0))
                : (l = !1)),
            l || Re(t)),
          null
        );
      case 13:
        return vd(l, t, e);
      case 4:
        return (
          pu(t, t.stateNode.containerInfo),
          (a = t.pendingProps),
          l === null ? (t.child = pa(t, null, a, e)) : wl(l, t, a, e),
          t.child
        );
      case 11:
        return sd(l, t, t.type, t.pendingProps, e);
      case 7:
        return ((a = t.pendingProps), Ia(l, t), wl(l, t, a, e), t.child);
      case 8:
        return (wl(l, t, t.pendingProps.children, e), t.child);
      case 12:
        return (wl(l, t, t.pendingProps.children, e), t.child);
      case 10:
        return jd(l, t, e);
      case 9:
        return (
          (n = t.type._context),
          (a = t.pendingProps.children),
          ma(t),
          (n = Pl(n)),
          (a = a(n)),
          (t.flags |= 1),
          wl(l, t, a, e),
          t.child
        );
      case 14:
        return fd(l, t, t.type, t.pendingProps, e);
      case 15:
        return od(l, t, t.type, t.pendingProps, e);
      case 19:
        return Ns(l, t, e);
      case 31:
        return n1(l, t, e);
      case 22:
        return rd(l, t, e, t.pendingProps);
      case 24:
        return (
          ma(t),
          (a = Pl(ql)),
          l === null
            ? ((n = Zc()),
              n === null &&
                ((n = zl),
                (u = Gc()),
                (n.pooledCache = u),
                u.refCount++,
                u !== null && (n.pooledCacheLanes |= e),
                (n = u)),
              (t.memoizedState = { parent: a, cache: n }),
              Xc(t),
              Le(t, ql, n))
            : ((l.lanes & e) !== 0 && (Vc(l, t), Xn(t, null, null, e), wn()),
              (n = l.memoizedState),
              (u = t.memoizedState),
              n.parent !== a
                ? ((n = { parent: a, cache: a }),
                  (t.memoizedState = n),
                  t.lanes === 0 &&
                    (t.memoizedState = t.updateQueue.baseState = n),
                  Le(t, ql, a))
                : ((a = u.cache),
                  Le(t, ql, a),
                  a !== n.cache && qc(t, [ql], e, !0))),
          wl(l, t, t.pendingProps.children, e),
          t.child
        );
      case 30:
        return (
          t.stateNode === null &&
            (t.stateNode = {
              autoName: null,
              paired: null,
              clones: null,
              ref: null,
            }),
          (a = t.pendingProps),
          a.name != null && a.name !== "auto"
            ? (t.flags |= l === null ? 18882560 : 18874368)
            : ul && wu(t),
          l !== null && l.memoizedProps.name !== a.name
            ? (t.flags |= 4194816)
            : Ia(l, t),
          wl(l, t, a.children, e),
          t.child
        );
      case 29:
        throw t.pendingProps;
    }
    throw Error(r(156, t.tag));
  }
  function Ee(l) {
    l.flags |= 4;
  }
  function Ms(l, t, e, a, n) {
    var u;
    if (
      ((u = (l.mode & 32) !== 0) &&
        (u =
          e === null
            ? F0(t, a)
            : F0(t, a) && (a.src !== e.src || a.srcSet !== e.srcSet)),
      u)
    ) {
      if (((l.flags |= 16777216), (n & 335544128) === n))
        if (l.stateNode.complete) l.flags |= 8192;
        else if (e0()) l.flags |= 8192;
        else throw ((xa = Fu), wc);
    } else l.flags &= -16777217;
  }
  function Sd(l, t) {
    if (t.type !== "stylesheet" || (t.state.loading & 4) !== 0)
      l.flags &= -16777217;
    else if (((l.flags |= 16777216), !$0(t)))
      if (e0()) l.flags |= 8192;
      else throw ((xa = Fu), wc);
  }
  function yi(l, t) {
    (t !== null && (l.flags |= 4),
      l.flags & 16384 &&
        ((t = l.tag !== 22 ? Wf() : 536870912), (l.lanes |= t), (an |= t)));
  }
  function Fn(l, t) {
    if (!ul)
      switch (l.tailMode) {
        case "visible":
          break;
        case "collapsed":
          for (var e = l.tail, a = null; e !== null; )
            (e.alternate !== null && (a = e), (e = e.sibling));
          a === null
            ? t || l.tail === null
              ? (l.tail = null)
              : (l.tail.sibling = null)
            : (a.sibling = null);
          break;
        default:
          for (t = l.tail, e = null; t !== null; )
            (t.alternate !== null && (e = t), (t = t.sibling));
          e === null ? (l.tail = null) : (e.sibling = null);
      }
  }
  function _l(l) {
    var t = l.alternate !== null && l.alternate.child === l.child,
      e = 0,
      a = 0;
    if (t)
      for (var n = l.child; n !== null; )
        ((e |= n.lanes | n.childLanes),
          (a |= n.subtreeFlags & 1206910976),
          (a |= n.flags & 1206910976),
          (n.return = l),
          (n = n.sibling));
    else
      for (n = l.child; n !== null; )
        ((e |= n.lanes | n.childLanes),
          (a |= n.subtreeFlags),
          (a |= n.flags),
          (n.return = l),
          (n = n.sibling));
    return ((l.subtreeFlags |= a), (l.childLanes = e), t);
  }
  function c1(l, t, e) {
    var a = t.pendingProps;
    switch ((Lc(t), t.tag)) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return (_l(t), null);
      case 1:
        return (_l(t), null);
      case 3:
        return (
          (e = t.stateNode),
          (a = null),
          l !== null && (a = l.memoizedState.cache),
          t.memoizedState.cache !== a && (t.flags |= 2048),
          pe(ql),
          Aa(),
          e.pendingContext &&
            ((e.context = e.pendingContext), (e.pendingContext = null)),
          (l === null || l.child === null) &&
            (Va(t)
              ? Ee(t)
              : l === null ||
                (l.memoizedState.isDehydrated && (t.flags & 256) === 0) ||
                ((t.flags |= 1024), Hc())),
          _l(t),
          null
        );
      case 26:
        var n = t.type,
          u = t.memoizedState;
        return (
          l === null
            ? (Ee(t),
              u !== null ? (_l(t), Sd(t, u)) : (_l(t), Ms(t, n, null, a, e)))
            : u
              ? u !== l.memoizedState
                ? (Ee(t), _l(t), Sd(t, u))
                : (_l(t), (t.flags &= -16777217))
              : ((l = l.memoizedProps),
                l !== a && Ee(t),
                _l(t),
                Ms(t, n, l, a, e)),
          null
        );
      case 27:
        if (
          (ju(t),
          (e = Ce.current),
          (n = t.type),
          l !== null && t.stateNode != null)
        )
          l.memoizedProps !== a && Ee(t);
        else {
          if (!a) {
            if (t.stateNode === null) throw Error(r(166));
            return (_l(t), (t.subtreeFlags &= -33554433), null);
          }
          ((l = $t.current),
            Va(t) ? lr(t) : ((l = Z0(n, a, e)), (t.stateNode = l), Ee(t)));
        }
        return (_l(t), (t.subtreeFlags &= -33554433), null);
      case 5:
        if ((ju(t), (n = t.type), l !== null && t.stateNode != null))
          l.memoizedProps !== a && Ee(t);
        else {
          if (!a) {
            if (t.stateNode === null) throw Error(r(166));
            return (_l(t), (t.subtreeFlags &= -33554433), null);
          }
          if (((u = $t.current), Va(t))) lr(t);
          else {
            var c = cu(Ce.current);
            switch (u) {
              case 1:
                u = c.createElementNS("http://www.w3.org/2000/svg", n);
                break;
              case 2:
                u = c.createElementNS("http://www.w3.org/1998/Math/MathML", n);
                break;
              default:
                switch (n) {
                  case "svg":
                    u = c.createElementNS("http://www.w3.org/2000/svg", n);
                    break;
                  case "math":
                    u = c.createElementNS(
                      "http://www.w3.org/1998/Math/MathML",
                      n,
                    );
                    break;
                  case "script":
                    ((u = c.createElement("div")),
                      (u.innerHTML = "<script><\/script>"),
                      (u = u.removeChild(u.firstChild)));
                    break;
                  case "select":
                    ((u =
                      typeof a.is == "string"
                        ? c.createElement("select", { is: a.is })
                        : c.createElement("select")),
                      a.multiple
                        ? (u.multiple = !0)
                        : a.size && (u.size = a.size));
                    break;
                  default:
                    u =
                      typeof a.is == "string"
                        ? c.createElement(n, { is: a.is })
                        : c.createElement(n);
                }
            }
            ((u[Il] = t), (u[rt] = a));
            l: for (c = t.child; c !== null; ) {
              if (c.tag === 5 || c.tag === 6) u.appendChild(c.stateNode);
              else if (c.tag !== 4 && c.tag !== 27 && c.child !== null) {
                ((c.child.return = c), (c = c.child));
                continue;
              }
              if (c === t) break l;
              for (; c.sibling === null; ) {
                if (c.return === null || c.return === t) break l;
                c = c.return;
              }
              ((c.sibling.return = c.return), (c = c.sibling));
            }
            t.stateNode = u;
            l: switch ((at(u, n, a), n)) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                a = !!a.autoFocus;
                break l;
              case "img":
                a = !0;
                break l;
              default:
                a = !1;
            }
            a && Ee(t);
          }
        }
        return (
          _l(t),
          (t.subtreeFlags &= -33554433),
          Ms(t, t.type, l === null ? null : l.memoizedProps, t.pendingProps, e),
          null
        );
      case 6:
        if (l && t.stateNode != null) l.memoizedProps !== a && Ee(t);
        else {
          if (typeof a != "string" && t.stateNode === null) throw Error(r(166));
          if (((l = Ce.current), Va(t))) {
            if (
              ((l = t.stateNode),
              (e = t.memoizedProps),
              (a = null),
              (n = kl),
              n !== null)
            )
              switch (n.tag) {
                case 27:
                case 5:
                  a = n.memoizedProps;
              }
            ((l[Il] = t),
              (l = !!(
                l.nodeValue === e ||
                (a !== null && a.suppressHydrationWarning === !0) ||
                b0(l.nodeValue, e)
              )),
              l || Re(t, !0));
          } else
            ((l = cu(l).createTextNode(a)), (l[Il] = t), (t.stateNode = l));
        }
        return (_l(t), null);
      case 31:
        if (((e = t.memoizedState), l === null || l.memoizedState !== null)) {
          if (((a = Va(t)), e !== null)) {
            if (l === null) {
              if (!a) throw Error(r(318));
              if (
                ((l = t.memoizedState),
                (l = l !== null ? l.dehydrated : null),
                !l)
              )
                throw Error(r(557));
              l[Il] = t;
            } else
              (ra(),
                (t.flags & 128) === 0 && (t.memoizedState = null),
                (t.flags |= 4));
            (_l(t), (l = !1));
          } else
            ((e = Hc()),
              l !== null &&
                l.memoizedState !== null &&
                (l.memoizedState.hydrationErrors = e),
              (l = !0));
          if (!l) return t.flags & 256 ? (Et(t), t) : (Et(t), null);
          if ((t.flags & 128) !== 0) throw Error(r(558));
        }
        return (_l(t), null);
      case 13:
        if (
          ((a = t.memoizedState),
          l === null ||
            (l.memoizedState !== null && l.memoizedState.dehydrated !== null))
        ) {
          if (((n = Va(t)), a !== null && a.dehydrated !== null)) {
            if (l === null) {
              if (!n) throw Error(r(318));
              if (
                ((n = t.memoizedState),
                (n = n !== null ? n.dehydrated : null),
                !n)
              )
                throw Error(r(317));
              n[Il] = t;
            } else
              (ra(),
                (t.flags & 128) === 0 && (t.memoizedState = null),
                (t.flags |= 4));
            (_l(t), (n = !1));
          } else
            ((n = Hc()),
              l !== null &&
                l.memoizedState !== null &&
                (l.memoizedState.hydrationErrors = n),
              (n = !0));
          if (!n) return t.flags & 256 ? (Et(t), t) : (Et(t), null);
        }
        return (
          Et(t),
          (t.flags & 128) !== 0
            ? ((t.lanes = e), t)
            : ((e = a !== null),
              (l = l !== null && l.memoizedState !== null),
              e &&
                ((a = t.child),
                (n = null),
                a.alternate !== null &&
                  a.alternate.memoizedState !== null &&
                  a.alternate.memoizedState.cachePool !== null &&
                  (n = a.alternate.memoizedState.cachePool.pool),
                (u = null),
                a.memoizedState !== null &&
                  a.memoizedState.cachePool !== null &&
                  (u = a.memoizedState.cachePool.pool),
                u !== n && (a.flags |= 2048)),
              e !== l && e && (t.child.flags |= 8192),
              yi(t, t.updateQueue),
              _l(t),
              null)
        );
      case 4:
        return (
          Aa(),
          l === null && sf(t.stateNode.containerInfo),
          (t.flags |= 67108864),
          _l(t),
          null
        );
      case 10:
        return (pe(t.type), _l(t), null);
      case 19:
        if (($c(t), (a = t.memoizedState), a === null)) return (_l(t), null);
        if (((n = (t.flags & 128) !== 0), (u = a.rendering), u === null))
          if (n) Fn(a, !1);
          else {
            if (Hl !== 0 || (l !== null && (l.flags & 128) !== 0))
              for (l = t.child; l !== null; ) {
                if (((u = li(l)), u !== null)) {
                  for (
                    t.flags |= 128,
                      Fn(a, !1),
                      l = u.updateQueue,
                      t.updateQueue = l,
                      yi(t, l),
                      t.subtreeFlags = 0,
                      l = e,
                      e = t.child;
                    e !== null;

                  )
                    (Wo(e, l), (e = e.sibling));
                  return (
                    Vn(t, (tt.current & 1) | 2),
                    ul && ve(t, a.treeForkCount),
                    t.child
                  );
                }
                l = l.sibling;
              }
            a.tail !== null &&
              xt() > Ci &&
              ((t.flags |= 128), (n = !0), Fn(a, !1), (t.lanes = 4194304));
          }
        else {
          if (!n)
            if (((l = li(u)), l !== null)) {
              if (
                ((t.flags |= 128),
                (n = !0),
                (l = l.updateQueue),
                (t.updateQueue = l),
                yi(t, l),
                Fn(a, !0),
                a.tail === null &&
                  a.tailMode !== "collapsed" &&
                  a.tailMode !== "visible" &&
                  !u.alternate &&
                  !ul)
              )
                return (_l(t), null);
            } else
              2 * xt() - a.renderingStartTime > Ci &&
                e !== 536870912 &&
                ((t.flags |= 128), (n = !0), Fn(a, !1), (t.lanes = 4194304));
          a.isBackwards
            ? ((u.sibling = t.child), (t.child = u))
            : ((l = a.last),
              l !== null ? (l.sibling = u) : (t.child = u),
              (a.last = u));
        }
        if (a.tail !== null) {
          l = a.tail;
          l: {
            for (e = l; e !== null; ) {
              if (e.alternate !== null) {
                e = !1;
                break l;
              }
              e = e.sibling;
            }
            e = !0;
          }
          return (
            (a.rendering = l),
            (a.tail = l.sibling),
            (a.renderingStartTime = xt()),
            (l.sibling = null),
            (u = tt.current),
            (u = n ? (u & 1) | 2 : u & 1),
            a.tailMode === "visible" || a.tailMode === "collapsed" || !e || ul
              ? Vn(t, u)
              : ((e = u), Al(lt, t), Al(tt, e), ut === null && (ut = t)),
            ul && ve(t, a.treeForkCount),
            l
          );
        }
        return (_l(t), null);
      case 22:
      case 23:
        return (
          Et(t),
          Wc(),
          (a = t.memoizedState !== null),
          l !== null
            ? (l.memoizedState !== null) !== a && (t.flags |= 8192)
            : a && (t.flags |= 8192),
          a
            ? (e & 536870912) !== 0 &&
              (t.flags & 128) === 0 &&
              (_l(t), t.subtreeFlags & 6 && (t.flags |= 8192))
            : _l(t),
          (e = t.updateQueue),
          e !== null && yi(t, e.retryQueue),
          (e = null),
          l !== null &&
            l.memoizedState !== null &&
            l.memoizedState.cachePool !== null &&
            (e = l.memoizedState.cachePool.pool),
          (a = null),
          t.memoizedState !== null &&
            t.memoizedState.cachePool !== null &&
            (a = t.memoizedState.cachePool.pool),
          a !== e && (t.flags |= 2048),
          l !== null && $l(ga),
          null
        );
      case 24:
        return (
          (e = null),
          l !== null && (e = l.memoizedState.cache),
          t.memoizedState.cache !== e && (t.flags |= 2048),
          pe(ql),
          _l(t),
          null
        );
      case 25:
        return null;
      case 30:
        return ((t.flags |= 33554432), _l(t), null);
    }
    throw Error(r(156, t.tag));
  }
  function s1(l, t) {
    switch ((Lc(t), t.tag)) {
      case 1:
        return (
          (l = t.flags),
          l & 65536 ? ((t.flags = (l & -65537) | 128), t) : null
        );
      case 3:
        return (
          pe(ql),
          Aa(),
          (l = t.flags),
          (l & 65536) !== 0 && (l & 128) === 0
            ? ((t.flags = (l & -65537) | 128), t)
            : null
        );
      case 26:
      case 27:
      case 5:
        return (ju(t), null);
      case 31:
        if (t.memoizedState !== null) {
          if ((Et(t), t.alternate === null)) throw Error(r(340));
          ra();
        }
        return (
          (l = t.flags),
          l & 65536 ? ((t.flags = (l & -65537) | 128), t) : null
        );
      case 13:
        if (
          (Et(t), (l = t.memoizedState), l !== null && l.dehydrated !== null)
        ) {
          if (t.alternate === null) throw Error(r(340));
          ra();
        }
        return (
          (l = t.flags),
          l & 65536 ? ((t.flags = (l & -65537) | 128), t) : null
        );
      case 19:
        return (
          $c(t),
          (l = t.flags),
          l & 65536
            ? ((t.flags = (l & -65537) | 128),
              (l = t.memoizedState),
              l !== null && ((l.rendering = null), (l.tail = null)),
              (t.flags |= 4),
              t)
            : null
        );
      case 4:
        return (Aa(), null);
      case 10:
        return (pe(t.type), null);
      case 22:
      case 23:
        return (
          Et(t),
          Wc(),
          l !== null && $l(ga),
          (l = t.flags),
          l & 65536 ? ((t.flags = (l & -65537) | 128), t) : null
        );
      case 24:
        return (pe(ql), null);
      case 25:
        return null;
      default:
        return null;
    }
  }
  function Ed(l, t) {
    switch ((Lc(t), t.tag)) {
      case 3:
        (pe(ql), Aa());
        break;
      case 26:
      case 27:
      case 5:
        ju(t);
        break;
      case 4:
        Aa();
        break;
      case 31:
        t.memoizedState !== null && Et(t);
        break;
      case 13:
        Et(t);
        break;
      case 19:
        $c(t);
        break;
      case 10:
        pe(t.type);
        break;
      case 22:
      case 23:
        (Et(t), Wc(), l !== null && $l(ga));
        break;
      case 24:
        pe(ql);
    }
  }
  function $n(l, t) {
    try {
      var e = t.updateQueue,
        a = e !== null ? e.lastEffect : null;
      if (a !== null) {
        var n = a.next;
        e = n;
        do {
          if ((e.tag & l) === l) {
            a = void 0;
            var u = e.create,
              c = e.inst;
            ((a = u()), (c.destroy = a));
          }
          e = e.next;
        } while (e !== n);
      }
    } catch (o) {
      El(t, t.return, o);
    }
  }
  function we(l, t, e) {
    try {
      var a = t.updateQueue,
        n = a !== null ? a.lastEffect : null;
      if (n !== null) {
        var u = n.next;
        a = u;
        do {
          if ((a.tag & l) === l) {
            var c = a.inst,
              o = c.destroy;
            if (o !== void 0) {
              ((c.destroy = void 0), (n = t));
              var h = e,
                p = o;
              try {
                p();
              } catch (N) {
                El(n, h, N);
              }
            }
          }
          a = a.next;
        } while (a !== u);
      }
    } catch (N) {
      El(t, t.return, N);
    }
  }
  function Nd(l) {
    var t = l.updateQueue;
    if (t !== null) {
      var e = l.stateNode;
      try {
        hr(t, e);
      } catch (a) {
        El(l, l.return, a);
      }
    }
  }
  function Td(l, t, e) {
    ((e.props = ba(l.type, l.memoizedProps)), (e.state = l.memoizedState));
    try {
      e.componentWillUnmount();
    } catch (a) {
      El(l, t, a);
    }
  }
  function te(l, t) {
    try {
      var e = l.ref;
      if (e !== null) {
        switch (l.tag) {
          case 26:
          case 27:
          case 5:
            var a = l.stateNode;
            break;
          case 30:
            var n = l.stateNode,
              u = me(l.memoizedProps, n);
            ((n.ref === null || n.ref.name !== u) && (n.ref = D0(u)),
              (a = n.ref));
            break;
          case 7:
            if (l.stateNode === null) {
              var c = new zt(l);
              (E(l.child, !1, I1, c, void 0, void 0), (l.stateNode = c));
            }
            a = l.stateNode;
            break;
          default:
            a = l.stateNode;
        }
        typeof e == "function" ? (l.refCleanup = e(a)) : (e.current = a);
      }
    } catch (o) {
      El(l, t, o);
    }
  }
  function et(l, t) {
    var e = l.ref,
      a = l.refCleanup;
    if (e !== null)
      if (typeof a == "function")
        try {
          a();
        } catch (n) {
          El(l, t, n);
        } finally {
          ((l.refCleanup = null),
            (l = l.alternate),
            l != null && (l.refCleanup = null));
        }
      else if (typeof e == "function")
        try {
          e(null);
        } catch (n) {
          El(l, t, n);
        }
      else e.current = null;
  }
  function gi(l, t) {
    if (
      (l.tag === 5 || l.tag === 27 || l.tag === 6) &&
      l.alternate === null &&
      t !== null
    )
      for (var e = 0; e < t.length; e++) B0(l.stateNode, t[e]);
  }
  function Md(l) {
    for (
      var t = l.return;
      t !== null && (zs(t) && B0(l.stateNode, t.stateNode), !Cs(t));

    )
      t = t.return;
  }
  function In(l) {
    for (
      var t = l.return;
      t !== null && (zs(t) && P1(l.stateNode, t.stateNode), !Cs(t));

    )
      t = t.return;
  }
  function Cs(l) {
    return l.tag === 5 || l.tag === 3 || l.tag === 27;
  }
  function zs(l) {
    return l && l.tag === 7 && l.stateNode !== null;
  }
  function As(l) {
    var t = l.type,
      e = l.memoizedProps,
      a = l.stateNode;
    try {
      l: switch (t) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          e.autoFocus && a.focus();
          break l;
        case "img":
          e.src ? (a.src = e.src) : e.srcSet && (a.srcset = e.srcSet);
      }
    } catch (n) {
      El(l, l.return, n);
    }
  }
  function Os(l, t, e) {
    try {
      var a = l.stateNode;
      (R1(a, l.type, e, t), (a[rt] = t));
    } catch (n) {
      El(l, l.return, n);
    }
  }
  function Cd(l) {
    return (
      l.tag === 5 ||
      l.tag === 3 ||
      l.tag === 26 ||
      (l.tag === 27 && Fe(l.type)) ||
      l.tag === 4
    );
  }
  function _s(l) {
    l: for (;;) {
      for (; l.sibling === null; ) {
        if (l.return === null || Cd(l.return)) return null;
        l = l.return;
      }
      for (
        l.sibling.return = l.return, l = l.sibling;
        l.tag !== 5 && l.tag !== 6 && l.tag !== 18;

      ) {
        if (
          (l.tag === 27 && Fe(l.type)) ||
          l.flags & 2 ||
          l.child === null ||
          l.tag === 4
        )
          continue l;
        ((l.child.return = l), (l = l.child));
      }
      if (!(l.flags & 2)) return l.stateNode;
    }
  }
  function Ds(l, t, e, a) {
    var n = l.tag;
    if (n === 5 || n === 6)
      ((n = l.stateNode),
        t
          ? (e.nodeType === 9
              ? e.body
              : e.nodeName === "HTML"
                ? e.ownerDocument.body
                : e
            ).insertBefore(n, t)
          : ((t =
              e.nodeType === 9
                ? e.body
                : e.nodeName === "HTML"
                  ? e.ownerDocument.body
                  : e),
            t.appendChild(n),
            (e = e._reactRootContainer),
            e != null || t.onclick !== null || (t.onclick = It)),
        gi(l, a),
        (gl = !0));
    else if (
      n !== 4 &&
      (n === 27 &&
        (gi(l, a), (a = null), Fe(l.type) && ((e = l.stateNode), (t = null))),
      (l = l.child),
      l !== null)
    )
      for (Ds(l, t, e, a), l = l.sibling; l !== null; )
        (Ds(l, t, e, a), (l = l.sibling));
  }
  function vi(l, t, e, a) {
    var n = l.tag;
    if (n === 5 || n === 6)
      ((n = l.stateNode),
        t ? e.insertBefore(n, t) : e.appendChild(n),
        gi(l, a),
        (gl = !0));
    else if (
      n !== 4 &&
      (n === 27 && (gi(l, a), (a = null), Fe(l.type) && (e = l.stateNode)),
      (l = l.child),
      l !== null)
    )
      for (vi(l, t, e, a), l = l.sibling; l !== null; )
        (vi(l, t, e, a), (l = l.sibling));
  }
  function zd(l) {
    var t = l.stateNode,
      e = l.memoizedProps;
    try {
      for (var a = l.type, n = t.attributes; n.length; )
        t.removeAttributeNode(n[0]);
      (at(t, a, e), (t[Il] = l), (t[rt] = e));
    } catch (u) {
      El(l, l.return, u);
    }
  }
  var xi = !1,
    Nt = null;
  function Ad(l) {
    (l.tag === 30 || (l.subtreeFlags & 33554432) !== 0) && (xi = !0);
  }
  var ee = null;
  function Od() {
    var l = ee;
    return ((ee = null), l);
  }
  var ht = 0;
  function Pa(l, t, e, a, n) {
    return ((ht = 0), _d(l.child, t, e, a, n));
  }
  function _d(l, t, e, a, n) {
    for (var u = !1; l !== null; ) {
      if (l.tag === 5) {
        var c = l.stateNode;
        if (a !== null) {
          var o = gf(c);
          (a.push(o), o.view && (u = !0));
        } else u || (gf(c).view && (u = !0));
        ((xi = !0), O0(c, ht === 0 ? t : t + "_" + ht, e), ht++);
      } else
        (l.tag !== 22 || l.memoizedState === null) &&
          ((l.tag === 30 && n) || (_d(l.child, t, e, a, n) && (u = !0)));
      l = l.sibling;
    }
    return u;
  }
  function ae(l, t) {
    for (; l !== null; )
      (l.tag === 5
        ? _0(l.stateNode, l.memoizedProps)
        : (l.tag !== 22 || l.memoizedState === null) &&
          ((l.tag === 30 && t) || ae(l.child, t)),
        (l = l.sibling));
  }
  function pi(l) {
    if ((l.subtreeFlags & 18874368) !== 0)
      for (l = l.child; l !== null; ) {
        if (
          (l.tag !== 22 || l.memoizedState === null) &&
          (pi(l),
          l.tag === 30 && (l.flags & 18874368) !== 0 && l.stateNode.paired)
        ) {
          var t = l.memoizedProps;
          if (t.name == null || t.name === "auto") throw Error(r(544));
          var e = t.name;
          ((t = ye(t.default, t.share)),
            t !== "none" && (Pa(l, e, t, null, !1) || ae(l.child, !1)));
        }
        l = l.sibling;
      }
  }
  function Us(l, t) {
    if (l.tag === 30) {
      var e = l.stateNode,
        a = l.memoizedProps,
        n = me(a, e),
        u = ye(a.default, e.paired ? a.share : a.enter);
      u !== "none"
        ? Pa(l, n, u, null, !1)
          ? (pi(l), e.paired || t || sn(l, a.onEnter))
          : ae(l.child, !1)
        : pi(l);
    } else if ((l.subtreeFlags & 33554432) !== 0)
      for (l = l.child; l !== null; ) (Us(l, t), (l = l.sibling));
    else pi(l);
  }
  function Rs(l) {
    if (Nt !== null && Nt.size !== 0) {
      var t = Nt;
      if ((l.subtreeFlags & 18874368) !== 0)
        for (l = l.child; l !== null; ) {
          if (l.tag !== 22 || l.memoizedState === null) {
            if (l.tag === 30 && (l.flags & 18874368) !== 0) {
              var e = l.memoizedProps,
                a = e.name;
              if (a != null && a !== "auto") {
                var n = t.get(a);
                if (n !== void 0) {
                  var u = ye(e.default, e.share);
                  if (
                    (u !== "none" &&
                      (Pa(l, a, u, null, !1)
                        ? ((u = l.stateNode),
                          (n.paired = u),
                          (u.paired = n),
                          sn(l, e.onShare))
                        : ae(l.child, !1)),
                    t.delete(a),
                    t.size === 0)
                  )
                    break;
                }
              }
            }
            Rs(l);
          }
          l = l.sibling;
        }
    }
  }
  function Ls(l) {
    if (l.tag === 30) {
      var t = l.memoizedProps,
        e = me(t, l.stateNode),
        a = Nt !== null ? Nt.get(e) : void 0,
        n = ye(t.default, a !== void 0 ? t.share : t.exit);
      (n !== "none" &&
        (Pa(l, e, n, null, !1)
          ? a !== void 0
            ? ((n = l.stateNode),
              (a.paired = n),
              (n.paired = a),
              Nt.delete(e),
              sn(l, t.onShare))
            : sn(l, t.onExit)
          : ae(l.child, !1)),
        Nt !== null && Rs(l));
    } else if ((l.subtreeFlags & 33554432) !== 0)
      for (l = l.child; l !== null; ) (Ls(l), (l = l.sibling));
    else Nt !== null && Rs(l);
  }
  function Dd(l) {
    for (l = l.child; l !== null; ) {
      if (l.tag === 30) {
        var t = l.memoizedProps,
          e = me(t, l.stateNode);
        ((t = ye(t.default, t.update)),
          (l.flags &= -5),
          t !== "none" && Pa(l, e, t, (l.memoizedState = []), !1));
      } else (l.subtreeFlags & 33554432) !== 0 && Dd(l);
      l = l.sibling;
    }
  }
  function Qs(l) {
    if ((l.subtreeFlags & 18874368) !== 0)
      for (l = l.child; l !== null; ) {
        if (l.tag !== 22 || l.memoizedState === null) {
          if (l.tag === 30 && (l.flags & 18874368) !== 0) {
            var t = l.stateNode;
            t.paired !== null && ((t.paired = null), ae(l.child, !1));
          }
          Qs(l);
        }
        l = l.sibling;
      }
  }
  function ji(l) {
    if (l.tag === 30) ((l.stateNode.paired = null), ae(l.child, !1), Qs(l));
    else if ((l.subtreeFlags & 33554432) !== 0)
      for (l = l.child; l !== null; ) (ji(l), (l = l.sibling));
    else Qs(l);
  }
  function Ud(l) {
    for (l = l.child; l !== null; )
      (l.tag === 30
        ? ae(l.child, !1)
        : (l.subtreeFlags & 33554432) !== 0 && Ud(l),
        (l = l.sibling));
  }
  function Hs(l, t, e, a, n, u, c) {
    for (var o = !1; t !== null; ) {
      if (t.tag === 5) {
        var h = t.stateNode;
        if (u !== null && ht < u.length) {
          var p = u[ht],
            N = gf(h);
          (p.view || N.view) && (o = !0);
          var C;
          if ((C = (l.flags & 4) === 0))
            if (N.clip) C = !0;
            else {
              C = p.rect;
              var v = N.rect;
              C =
                C.y !== v.y ||
                C.x !== v.x ||
                C.height !== v.height ||
                C.width !== v.width;
            }
          (C && (l.flags |= 4),
            N.abs
              ? (N = !p.abs)
              : ((p = p.rect),
                (N = N.rect),
                (N = p.height !== N.height || p.width !== N.width)),
            N && (l.flags |= 32));
        } else l.flags |= 32;
        ((l.flags & 4) !== 0 && O0(h, ht === 0 ? e : e + "_" + ht, n),
          (o && (l.flags & 4) !== 0) ||
            (ee === null && (ee = []),
            ee.push(h, ht === 0 ? a : a + "_" + ht, t.memoizedProps)),
          ht++);
      } else
        (t.tag !== 22 || t.memoizedState === null) &&
          (t.tag === 30 && c
            ? (l.flags |= t.flags & 32)
            : Hs(l, t.child, e, a, n, u, c) && (o = !0));
      t = t.sibling;
    }
    return o;
  }
  function Rd(l, t) {
    for (l = l.child; l !== null; ) {
      if (l.tag === 30) {
        var e = l.memoizedProps,
          a = l.stateNode,
          n = me(e, a),
          u = ye(e.default, e.update),
          c;
        ((c = l.memoizedState), (l.memoizedState = null), (a = l));
        var o = l.child;
        ((ht = 0),
          (n = Hs(a, o, n, n, u, c, !1)),
          (l.flags & 4) !== 0 && n && sn(l, e.onUpdate));
      } else (l.subtreeFlags & 33554432) !== 0 && Rd(l);
      l = l.sibling;
    }
  }
  var Kl = !1,
    bl = !1,
    ne = !1,
    Bs = !1,
    Ld = typeof WeakSet == "function" ? WeakSet : Set,
    Jl = null,
    ue = !1,
    Pn = !1,
    bi = !1,
    qs = !1;
  function f1(l, t, e) {
    if (((l = l.containerInfo), (rf = xn), (l = qo(l)), Tc(l))) {
      if ("selectionStart" in l)
        var a = { start: l.selectionStart, end: l.selectionEnd };
      else
        l: {
          a = ((a = l.ownerDocument) && a.defaultView) || window;
          var n = a.getSelection && a.getSelection();
          if (n && n.rangeCount !== 0) {
            a = n.anchorNode;
            var u = n.anchorOffset,
              c = n.focusNode;
            n = n.focusOffset;
            try {
              (a.nodeType, c.nodeType);
            } catch {
              a = null;
              break l;
            }
            var o = 0,
              h = -1,
              p = -1,
              N = 0,
              C = 0,
              v = l,
              b = null;
            t: for (;;) {
              for (
                var R;
                v !== a || (u !== 0 && v.nodeType !== 3) || (h = o + u),
                  v !== c || (n !== 0 && v.nodeType !== 3) || (p = o + n),
                  v.nodeType === 3 && (o += v.nodeValue.length),
                  (R = v.firstChild) !== null;

              )
                ((b = v), (v = R));
              for (;;) {
                if (v === l) break t;
                if (
                  (b === a && ++N === u && (h = o),
                  b === c && ++C === n && (p = o),
                  (R = v.nextSibling) !== null)
                )
                  break;
                ((v = b), (b = v.parentNode));
              }
              v = R;
            }
            a = h === -1 || p === -1 ? null : { start: h, end: p };
          } else a = null;
        }
      a = a || { start: 0, end: 0 };
    } else a = null;
    for (
      df = { focusedElem: l, selectionRange: a },
        xn = !1,
        e = (e & 335544064) === e,
        Jl = t,
        t = e ? 9270 : 1024;
      Jl !== null;

    ) {
      if (((l = Jl), e && ((a = l.deletions), a !== null)))
        for (u = 0; u < a.length; u++) e && Ls(a[u]);
      if (l.alternate === null && (l.flags & 2) !== 0) (e && Ad(l), Si(e));
      else {
        if (l.tag === 22) {
          if (((a = l.alternate), l.memoizedState !== null)) {
            (a !== null && a.memoizedState === null && e && Ls(a), Si(e));
            continue;
          } else if (a !== null && a.memoizedState !== null) {
            (e && Ad(l), Si(e));
            continue;
          }
        }
        ((a = l.child),
          (l.subtreeFlags & t) !== 0 && a !== null
            ? ((a.return = l), (Jl = a))
            : (e && Dd(l), Si(e)));
      }
    }
    Nt = null;
  }
  function Si(l) {
    for (; Jl !== null; ) {
      var t = Jl,
        e = l,
        a = t.alternate,
        n = t.flags;
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          break;
        case 1:
          if ((n & 1024) !== 0 && a !== null) {
            ((e = void 0), (n = a.memoizedProps), (a = a.memoizedState));
            var u = t.stateNode;
            try {
              var c = ba(t.type, n);
              ((e = u.getSnapshotBeforeUpdate(c, a)),
                (u.__reactInternalSnapshotBeforeUpdate = e));
            } catch (o) {
              El(t, t.return, o);
            }
          }
          break;
        case 3:
          if ((n & 1024) !== 0) {
            if (((a = t.stateNode.containerInfo), (e = a.nodeType), e === 9))
              pf(a);
            else if (e === 1)
              switch (a.nodeName) {
                case "HEAD":
                case "HTML":
                case "BODY":
                  pf(a);
                  break;
                default:
                  a.textContent = "";
              }
          }
          break;
        case 5:
        case 26:
        case 27:
        case 6:
        case 4:
        case 17:
          break;
        case 30:
          e &&
            a !== null &&
            ((e = me(a.memoizedProps, a.stateNode)),
            (n = t.memoizedProps),
            (n = ye(n.default, n.update)),
            n !== "none" && Pa(a, e, n, (a.memoizedState = []), !0));
          break;
        default:
          if ((n & 1024) !== 0) throw Error(r(163));
      }
      if (((a = t.sibling), a !== null)) {
        ((a.return = t.return), (Jl = a));
        break;
      }
      Jl = t.return;
    }
  }
  function Qd(l, t, e) {
    var a = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        (ie(l, e), a & 4 && $n(5, e));
        break;
      case 1:
        if ((ie(l, e), a & 4))
          if (((l = e.stateNode), t === null))
            try {
              l.componentDidMount();
            } catch (c) {
              El(e, e.return, c);
            }
          else {
            var n = ba(e.type, t.memoizedProps);
            t = t.memoizedState;
            try {
              l.componentDidUpdate(n, t, l.__reactInternalSnapshotBeforeUpdate);
            } catch (c) {
              El(e, e.return, c);
            }
          }
        (a & 64 && Nd(e), a & 512 && te(e, e.return));
        break;
      case 3:
        if ((ie(l, e), a & 64 && ((l = e.updateQueue), l !== null))) {
          if (((t = null), e.child !== null))
            switch (e.child.tag) {
              case 27:
              case 5:
                t = e.child.stateNode;
                break;
              case 1:
                t = e.child.stateNode;
            }
          try {
            hr(l, t);
          } catch (c) {
            El(e, e.return, c);
          }
        }
        break;
      case 27:
        t === null && a & 4 && zd(e);
      case 26:
      case 5:
        (ie(l, e), t === null && a & 4 && As(e), a & 512 && te(e, e.return));
        break;
      case 12:
        ie(l, e);
        break;
      case 31:
        (ie(l, e), a & 4 && Gd(l, e));
        break;
      case 13:
        (ie(l, e),
          a & 4 && Yd(l, e),
          a & 64 &&
            ((l = e.memoizedState),
            l !== null &&
              ((l = l.dehydrated),
              l !== null && ((e = b1.bind(null, e)), em(l, e)))));
        break;
      case 22:
        if (((a = e.memoizedState !== null || Kl), !a)) {
          var u = (t !== null && t.memoizedState !== null) || bl;
          ((t = Kl),
            (n = bl),
            (Kl = a),
            (bl = u) && !n
              ? ((a = 2),
                (e.subtreeFlags & 8772) !== 0 && (a |= 1),
                kt(l, e, a))
              : ie(l, e),
            (Kl = t),
            (bl = n));
        }
        break;
      case 30:
        (ie(l, e), a & 512 && te(e, e.return));
        break;
      case 7:
        a & 512 && te(e, e.return);
      default:
        ie(l, e);
    }
  }
  function Gs(l, t) {
    for (l = l.child; l !== null; ) (Hd(l, t), (l = l.sibling));
  }
  function Hd(l, t) {
    switch (l.tag) {
      case 5:
      case 26:
        try {
          var e = l.stateNode;
          if (t) {
            var a = e.style;
            typeof a.setProperty == "function"
              ? a.setProperty("display", "none", "important")
              : (a.display = "none");
          } else {
            var n = l.stateNode,
              u = l.memoizedProps.style,
              c = u != null && u.hasOwnProperty("display") ? u.display : null;
            n.style.display =
              c == null || typeof c == "boolean" ? "" : ("" + c).trim();
          }
        } catch (h) {
          El(l, l.return, h);
        }
        Ys(l, t);
        break;
      case 6:
        try {
          ((l.stateNode.nodeValue = t ? "" : l.memoizedProps), (gl = !0));
        } catch (h) {
          El(l, l.return, h);
        }
        break;
      case 18:
        try {
          var o = l.stateNode;
          t ? A0(o, !0) : A0(l.stateNode, !1);
        } catch (h) {
          El(l, l.return, h);
        }
        break;
      case 22:
      case 23:
        l.memoizedState === null && Gs(l, t);
        break;
      default:
        Gs(l, t);
    }
  }
  function Ys(l, t) {
    if (l.subtreeFlags & 67108864)
      for (l = l.child; l !== null; ) {
        l: {
          var e = l,
            a = t;
          switch (e.tag) {
            case 4:
              Hd(e, a);
              break l;
            case 22:
              e.memoizedState === null && Ys(e, a);
              break l;
            default:
              Ys(e, a);
          }
        }
        l = l.sibling;
      }
  }
  function Bd(l) {
    var t = l.alternate;
    (t !== null && ((l.alternate = null), Bd(t)),
      (l.child = null),
      (l.deletions = null),
      (l.sibling = null),
      l.tag === 5 && ((t = l.stateNode), t !== null && Cu(t)),
      (l.stateNode = null),
      (l.return = null),
      (l.dependencies = null),
      (l.memoizedProps = null),
      (l.memoizedState = null),
      (l.pendingProps = null),
      (l.stateNode = null),
      (l.updateQueue = null));
  }
  var Ul = null,
    mt = !1;
  function Xt(l, t, e) {
    for (e = e.child; e !== null; ) (qd(l, t, e), (e = e.sibling));
  }
  function qd(l, t, e) {
    if (pt && typeof pt.onCommitFiberUnmount == "function")
      try {
        pt.onCommitFiberUnmount(Sn, e);
      } catch {}
    switch (e.tag) {
      case 26:
        (bl || et(e, t),
          Xt(l, t, e),
          e.memoizedState
            ? e.memoizedState.count--
            : e.stateNode &&
              !bl &&
              ((e = e.stateNode), e.parentNode.removeChild(e)));
        break;
      case 27:
        (bl || et(e, t), In(e));
        var a = Ul,
          n = mt;
        (Fe(e.type) && ((Ul = e.stateNode), (mt = !1)),
          Xt(l, t, e),
          w0(e.stateNode, e.type, e.memoizedProps),
          (Ul = a),
          (mt = n));
        break;
      case 5:
        (bl || et(e, t), In(e));
      case 6:
        if (
          (e.tag === 6 && In(e),
          (a = Ul),
          (n = mt),
          (Ul = null),
          Xt(l, t, e),
          (Ul = a),
          (mt = n),
          Ul !== null)
        )
          if (mt)
            try {
              ((Ul.nodeType === 9
                ? Ul.body
                : Ul.nodeName === "HTML"
                  ? Ul.ownerDocument.body
                  : Ul
              ).removeChild(e.stateNode),
                (gl = !0));
            } catch (u) {
              El(e, t, u);
            }
          else
            try {
              (Ul.removeChild(e.stateNode), (gl = !0));
            } catch (u) {
              El(e, t, u);
            }
        break;
      case 18:
        Ul !== null &&
          (mt
            ? ((l = Ul),
              z0(
                l.nodeType === 9
                  ? l.body
                  : l.nodeName === "HTML"
                    ? l.ownerDocument.body
                    : l,
                e.stateNode,
              ),
              pn(l))
            : z0(Ul, e.stateNode));
        break;
      case 4:
        ((a = Ul),
          (n = mt),
          (Ul = e.stateNode.containerInfo),
          (mt = !0),
          Xt(l, t, e),
          (Ul = a),
          (mt = n));
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        (we(2, e, t), bl || we(4, e, t), Xt(l, t, e));
        break;
      case 1:
        (bl ||
          (et(e, t),
          (a = e.stateNode),
          typeof a.componentWillUnmount == "function" && Td(e, t, a)),
          Xt(l, t, e));
        break;
      case 21:
        Xt(l, t, e);
        break;
      case 22:
        ((bl = (a = bl) || e.memoizedState !== null), Xt(l, t, e), (bl = a));
        break;
      case 30:
        (et(e, t), Xt(l, t, e));
        break;
      case 7:
        (bl || et(e, t), Xt(l, t, e));
        break;
      default:
        Xt(l, t, e);
    }
  }
  function Gd(l, t) {
    if (
      t.memoizedState === null &&
      ((l = t.alternate), l !== null && ((l = l.memoizedState), l !== null))
    ) {
      l = l.dehydrated;
      try {
        pn(l);
      } catch (e) {
        El(t, t.return, e);
      }
    }
  }
  function Yd(l, t) {
    if (
      t.memoizedState === null &&
      ((l = t.alternate),
      l !== null &&
        ((l = l.memoizedState), l !== null && ((l = l.dehydrated), l !== null)))
    )
      try {
        pn(l);
      } catch (e) {
        El(t, t.return, e);
      }
  }
  function o1(l) {
    switch (l.tag) {
      case 31:
      case 13:
      case 19:
        var t = l.stateNode;
        return (t === null && (t = l.stateNode = new Ld()), t);
      case 22:
        return (
          (l = l.stateNode),
          (t = l._retryCache),
          t === null && (t = l._retryCache = new Ld()),
          t
        );
      default:
        throw Error(r(435, l.tag));
    }
  }
  function Ei(l, t) {
    var e = o1(l);
    t.forEach(function (a) {
      if (!e.has(a)) {
        e.add(a);
        var n = S1.bind(null, l, a);
        a.then(n, n);
      }
    });
  }
  function st(l, t, e) {
    var a = t.deletions;
    if (a !== null)
      for (var n = 0; n < a.length; n++) {
        var u = a[n],
          c = l,
          o = t,
          h = o;
        l: for (; h !== null; ) {
          switch (h.tag) {
            case 27:
              if (Fe(h.type)) {
                ((Ul = h.stateNode), (mt = !1));
                break l;
              }
              break;
            case 5:
              ((Ul = h.stateNode), (mt = !1));
              break l;
            case 3:
            case 4:
              ((Ul = h.stateNode.containerInfo), (mt = !0));
              break l;
          }
          h = h.return;
        }
        if (Ul === null) throw Error(r(160));
        (qd(c, o, u),
          (Ul = null),
          (mt = !1),
          (c = u.alternate),
          c !== null && (c.return = null),
          (u.return = null));
      }
    if (t.subtreeFlags & 13886)
      for (t = t.child; t !== null; ) (Zd(t, l, e), (t = t.sibling));
  }
  var Vt = null;
  function Zd(l, t, e) {
    var a = l.alternate,
      n = l.flags;
    switch (l.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        if (
          n & 4 &&
          ((a = l.updateQueue), (a = a !== null ? a.events : null), a !== null)
        )
          for (var u = 0; u < a.length; u++) {
            var c = a[u];
            c.ref.impl = c.nextImpl;
          }
        (st(t, l, e),
          ft(l),
          n & 4 && (we(3, l, l.return), $n(3, l), we(5, l, l.return)));
        break;
      case 1:
        (st(t, l, e),
          ft(l),
          n & 512 && (bl || a === null || et(a, a.return)),
          n & 64 &&
            Kl &&
            ((l = l.updateQueue),
            l !== null &&
              ((t = l.callbacks),
              t !== null &&
                ((e = l.shared.hiddenCallbacks),
                (l.shared.hiddenCallbacks = e === null ? t : e.concat(t))))));
        break;
      case 26:
        if (
          ((u = Vt),
          st(t, l, e),
          ft(l),
          n & 512 && (bl || a === null || et(a, a.return)),
          n & 4)
        )
          if (
            ((n = a !== null ? a.memoizedState : null),
            (e = l.memoizedState),
            a === null)
          )
            if (e === null)
              if (l.stateNode === null)
                if (Kl)
                  l.stateNode = T0(l.type, l.memoizedProps, t.containerInfo, l);
                else {
                  l: {
                    ((t = l.type),
                      (e = l.memoizedProps),
                      (n = u.ownerDocument || u));
                    t: switch (t) {
                      case "title":
                        ((a = n.getElementsByTagName("title")[0]),
                          (!a ||
                            a[Tn] ||
                            a[Il] ||
                            a.namespaceURI === "http://www.w3.org/2000/svg" ||
                            a.hasAttribute("itemprop")) &&
                            ((a = n.createElement(t)),
                            n.head.insertBefore(
                              a,
                              n.querySelector("head > title"),
                            )),
                          at(a, t, e),
                          (a[Il] = l),
                          Vl(a),
                          (t = a));
                        break l;
                      case "link":
                        if (
                          (u = W0("link", "href", n).get(t + (e.href || "")))
                        ) {
                          for (c = 0; c < u.length; c++)
                            if (
                              ((a = u[c]),
                              a.getAttribute("href") ===
                                (e.href == null || e.href === ""
                                  ? null
                                  : e.href) &&
                                a.getAttribute("rel") ===
                                  (e.rel == null ? null : e.rel) &&
                                a.getAttribute("title") ===
                                  (e.title == null ? null : e.title) &&
                                a.getAttribute("crossorigin") ===
                                  (e.crossOrigin == null
                                    ? null
                                    : e.crossOrigin))
                            ) {
                              u.splice(c, 1);
                              break t;
                            }
                        }
                        ((a = n.createElement(t)),
                          at(a, t, e),
                          n.head.appendChild(a));
                        break;
                      case "meta":
                        if (
                          (u = W0("meta", "content", n).get(
                            t + (e.content || ""),
                          ))
                        ) {
                          for (c = 0; c < u.length; c++)
                            if (
                              ((a = u[c]),
                              a.getAttribute("content") ===
                                (e.content == null ? null : "" + e.content) &&
                                a.getAttribute("name") ===
                                  (e.name == null ? null : e.name) &&
                                a.getAttribute("property") ===
                                  (e.property == null ? null : e.property) &&
                                a.getAttribute("http-equiv") ===
                                  (e.httpEquiv == null ? null : e.httpEquiv) &&
                                a.getAttribute("charset") ===
                                  (e.charSet == null ? null : e.charSet))
                            ) {
                              u.splice(c, 1);
                              break t;
                            }
                        }
                        ((a = n.createElement(t)),
                          at(a, t, e),
                          n.head.appendChild(a));
                        break;
                      default:
                        throw Error(r(468, t));
                    }
                    ((a[Il] = l), Vl(a), (t = a));
                  }
                  l.stateNode = t;
                }
              else Kl || Mf(u, l.type, l.stateNode);
            else l.stateNode = J0(u, e, l.memoizedProps);
          else
            n !== e
              ? (n === null
                  ? ((t = a.stateNode),
                    t === null || bl || t.parentNode.removeChild(t))
                  : n.count--,
                e === null
                  ? Kl || Mf(u, l.type, l.stateNode)
                  : J0(u, e, l.memoizedProps))
              : e === null &&
                l.stateNode !== null &&
                Os(l, l.memoizedProps, a.memoizedProps);
        break;
      case 27:
        (st(t, l, e),
          ft(l),
          n & 512 && (bl || a === null || et(a, a.return)),
          a !== null && n & 4 && Os(l, l.memoizedProps, a.memoizedProps));
        break;
      case 5:
        if (
          ((u = ne),
          (ne = !1),
          st(t, l, e),
          (ne = u),
          ft(l),
          n & 512 && (bl || a === null || et(a, a.return)),
          l.flags & 32)
        ) {
          t = l.stateNode;
          try {
            (La(t, ""), (gl = !0));
          } catch (N) {
            El(l, l.return, N);
          }
        }
        (n & 4 &&
          l.stateNode != null &&
          ((t = l.memoizedProps), Os(l, t, a !== null ? a.memoizedProps : t)),
          n & 1024 && (Bs = !0));
        break;
      case 6:
        if ((st(t, l, e), ft(l), n & 4)) {
          if (l.stateNode === null) throw Error(r(162));
          ((t = l.memoizedProps), (e = l.stateNode));
          try {
            ((e.nodeValue = t), (gl = !0));
          } catch (N) {
            El(l, l.return, N);
          }
        }
        break;
      case 3:
        if (
          ((gl = !1),
          (Bi = null),
          (u = Vt),
          (Vt = su(t.containerInfo)),
          st(t, l, e),
          (Vt = u),
          ft(l),
          n & 4 && a !== null && a.memoizedState.isDehydrated)
        )
          try {
            pn(t.containerInfo);
          } catch (N) {
            El(l, l.return, N);
          }
        (Bs && ((Bs = !1), wd(l)), (gl = !1));
        break;
      case 4:
        ((n = ne),
          (ne = Kl),
          (a = so()),
          (u = Vt),
          (Vt = su(l.stateNode.containerInfo)),
          st(t, l, e),
          ft(l),
          (Vt = u),
          gl && Pn && (bi = !0),
          (gl = a),
          (ne = n));
        break;
      case 12:
        (st(t, l, e), ft(l));
        break;
      case 31:
        (st(t, l, e),
          ft(l),
          n & 4 &&
            ((t = l.updateQueue),
            t !== null && ((l.updateQueue = null), Ei(l, t))));
        break;
      case 13:
        (st(t, l, e),
          ft(l),
          l.child.flags & 8192 &&
            (l.memoizedState !== null) !=
              (a !== null && a.memoizedState !== null) &&
            (Mi = xt()),
          n & 4 &&
            ((t = l.updateQueue),
            t !== null && ((l.updateQueue = null), Ei(l, t))));
        break;
      case 22:
        ((u = l.memoizedState !== null),
          (c = a !== null && a.memoizedState !== null));
        var o = Kl,
          h = bl,
          p = ne;
        ((Kl = o || u),
          (ne = p || u),
          (bl = h || c),
          st(t, l, e),
          (bl = h),
          (ne = p),
          (Kl = o),
          ft(l),
          n & 8192 &&
            ((t = l.stateNode),
            (t._visibility = u ? t._visibility & -2 : t._visibility | 1),
            !u ||
              a === null ||
              c ||
              Kl ||
              bl ||
              ((t = c || bl),
              (e = Kl),
              (a = bl),
              (Kl = u || Kl),
              (bl = t),
              Xe(l, 2),
              (Kl = e),
              (bl = a)),
            (!u && ne) || Gs(l, u)),
          n & 4 &&
            ((t = l.updateQueue),
            t !== null &&
              ((e = t.retryQueue),
              e !== null && ((t.retryQueue = null), Ei(l, e)))));
        break;
      case 19:
        (st(t, l, e),
          ft(l),
          n & 4 &&
            ((t = l.updateQueue),
            t !== null && ((l.updateQueue = null), Ei(l, t))));
        break;
      case 30:
        (n & 512 && (bl || a === null || et(a, a.return)),
          (n = so()),
          (u = Pn),
          (c = (e & 335544064) === e),
          (o = l.memoizedProps),
          (Pn = c && ye(o.default, o.update) !== "none"),
          st(t, l, e),
          ft(l),
          c && a !== null && gl && (l.flags |= 4),
          (Pn = u),
          (gl = n));
        break;
      case 21:
        break;
      case 7:
        (n & 512 && (bl || a === null || et(a, a.return)),
          a && a.stateNode !== null && (a.stateNode._fragmentFiber = l));
      default:
        (st(t, l, e), ft(l));
    }
  }
  function ft(l) {
    var t = l.flags;
    if (t & 2) {
      try {
        for (var e, a = l.return; a !== null; ) {
          if (Cd(a)) {
            e = a;
            break;
          }
          a = a.return;
        }
        a = null;
        for (var n = l.return; n !== null; ) {
          if (zs(n)) {
            var u = n.stateNode;
            a === null ? (a = [u]) : a.push(u);
          }
          if (Cs(n)) break;
          n = n.return;
        }
        var c = a;
        if (e == null) throw Error(r(160));
        switch (e.tag) {
          case 27:
            var o = e.stateNode,
              h = _s(l);
            vi(l, h, o, c);
            break;
          case 5:
            var p = e.stateNode;
            e.flags & 32 && (La(p, ""), (e.flags &= -33));
            var N = _s(l);
            vi(l, N, p, c);
            break;
          case 3:
          case 4:
            var C = e.stateNode.containerInfo,
              v = _s(l);
            Ds(l, v, C, c);
            break;
          default:
            throw Error(r(161));
        }
      } catch (b) {
        El(l, l.return, b);
      }
      l.flags &= -3;
    }
    t & 4096 && (l.flags &= -4097);
  }
  function wd(l) {
    if (l.subtreeFlags & 1024)
      for (l = l.child; l !== null; ) {
        var t = l;
        (wd(t),
          t.tag === 5 &&
            t.flags & 1024 &&
            ((t = t.stateNode), (xn = !0), t.reset(), (xn = !1)),
          (l = l.sibling));
      }
  }
  function ln(l, t) {
    if (t.subtreeFlags & 9270)
      for (t = t.child; t !== null; ) (Xd(t, l), (t = t.sibling));
    else Rd(t);
  }
  function Xd(l, t) {
    var e = l.alternate;
    if (e === null) Us(l, !1);
    else
      switch (l.tag) {
        case 3:
          if (((qs = ue = !1), Od(), ln(t, l), !ue && !bi)) {
            if (((l = ee), l !== null))
              for (var a = 0; a < l.length; a += 3) {
                e = l[a];
                var n = l[a + 1];
                (_0(e, l[a + 2]),
                  (e = e.ownerDocument.documentElement),
                  e !== null &&
                    e.animate(
                      { opacity: [0, 0], pointerEvents: ["none", "none"] },
                      {
                        duration: 0,
                        fill: "forwards",
                        pseudoElement: "::view-transition-group(" + n + ")",
                      },
                    ));
              }
            ((l = t.containerInfo),
              (l =
                l.nodeType === 9
                  ? l.documentElement
                  : l.ownerDocument.documentElement),
              l !== null &&
                l.style.viewTransitionName === "" &&
                ((l.style.viewTransitionName = "none"),
                l.animate(
                  { opacity: [0, 0], pointerEvents: ["none", "none"] },
                  {
                    duration: 0,
                    fill: "forwards",
                    pseudoElement: "::view-transition-group(root)",
                  },
                ),
                l.animate(
                  { width: [0, 0], height: [0, 0] },
                  {
                    duration: 0,
                    fill: "forwards",
                    pseudoElement: "::view-transition",
                  },
                )),
              (qs = !0));
          }
          ee = null;
          break;
        case 5:
          ln(t, l);
          break;
        case 4:
          ((a = ue), (ue = !1), ln(t, l), ue && (bi = !0), (ue = a));
          break;
        case 22:
          l.memoizedState === null &&
            (e.memoizedState !== null ? Us(l, !1) : ln(t, l));
          break;
        case 30:
          ((a = ue), (n = Od()), (ue = !1), ln(t, l), ue && (l.flags |= 4));
          var u = l.memoizedProps,
            c = l.stateNode;
          ((t = me(u, c)), (c = me(e.memoizedProps, c)));
          var o = ye(u.default, u.update);
          (o === "none"
            ? (t = !1)
            : ((u = e.memoizedState),
              (e.memoizedState = null),
              (e = l.child),
              (ht = 0),
              (t = Hs(l, e, t, c, o, u, !0)),
              ht !== (u === null ? 0 : u.length) && (l.flags |= 32)),
            (l.flags & 4) !== 0 && t
              ? (sn(l, l.memoizedProps.onUpdate), (ee = n))
              : n !== null && (n.push.apply(n, ee), (ee = n)),
            (ue = (l.flags & 32) !== 0 ? !0 : a));
          break;
        default:
          ln(t, l);
      }
  }
  function ie(l, t) {
    if (t.subtreeFlags & 8772)
      for (t = t.child; t !== null; ) (Qd(l, t.alternate, t), (t = t.sibling));
  }
  function Xe(l, t) {
    for (l = l.child; l !== null; ) {
      var e = l,
        a = t;
      switch (e.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          (we(4, e, e.return), Xe(e, a));
          break;
        case 1:
          et(e, e.return);
          var n = e.stateNode;
          (typeof n.componentWillUnmount == "function" && Td(e, e.return, n),
            Xe(e, a));
          break;
        case 27:
          (a & 2) !== 0 && w0(e.stateNode, e.type, e.memoizedProps);
        case 5:
          (et(e, e.return), (e.tag !== 5 && e.tag !== 27) || In(e), Xe(e, a));
          break;
        case 6:
          In(e);
          break;
        case 26:
          (et(e, e.return),
            (n = e.stateNode),
            e.memoizedState !== null ||
              n === null ||
              bl ||
              n.parentNode.removeChild(n),
            Xe(e, a));
          break;
        case 22:
          e.memoizedState === null && Xe(e, a);
          break;
        case 30:
          (et(e, e.return), Xe(e, a));
          break;
        case 7:
          et(e, e.return);
        default:
          Xe(e, a);
      }
      l = l.sibling;
    }
  }
  function kt(l, t, e) {
    for (
      e = (t.subtreeFlags & 8772) !== 0 ? e : e & -2, t = t.child;
      t !== null;

    ) {
      var a = t.alternate,
        n = l,
        u = t,
        c = u.flags,
        o = (e & 1) !== 0;
      switch (u.tag) {
        case 0:
        case 11:
        case 15:
          (kt(n, u, e), $n(4, u));
          break;
        case 1:
          if (
            (kt(n, u, e),
            (a = u),
            (n = a.stateNode),
            typeof n.componentDidMount == "function")
          )
            try {
              n.componentDidMount();
            } catch (N) {
              El(a, a.return, N);
            }
          if (((a = u), (n = a.updateQueue), n !== null)) {
            var h = a.stateNode;
            try {
              var p = n.shared.hiddenCallbacks;
              if (p !== null)
                for (n.shared.hiddenCallbacks = null, n = 0; n < p.length; n++)
                  dr(p[n], h);
            } catch (N) {
              El(a, a.return, N);
            }
          }
          (o && c & 64 && Nd(u), te(u, u.return));
          break;
        case 27:
          (e & 2) !== 0 && zd(u);
        case 5:
          ((u.tag !== 5 && u.tag !== 27) || Md(u),
            kt(n, u, e),
            o && a === null && c & 4 && As(u),
            te(u, u.return));
          break;
        case 6:
          Md(u);
          break;
        case 26:
          ((h = u.stateNode),
            u.memoizedState !== null ||
              h === null ||
              Kl ||
              Mf(su(h.ownerDocument), u.type, h),
            kt(n, u, e),
            o && a === null && c & 4 && As(u),
            te(u, u.return));
          break;
        case 12:
          kt(n, u, e);
          break;
        case 31:
          (kt(n, u, e), o && c & 4 && Gd(n, u));
          break;
        case 13:
          (kt(n, u, e), o && c & 4 && Yd(n, u));
          break;
        case 22:
          (u.memoizedState === null && kt(n, u, e), te(u, u.return));
          break;
        case 30:
          (kt(n, u, e), te(u, u.return));
          break;
        case 7:
          te(u, u.return);
        default:
          kt(n, u, e);
      }
      t = t.sibling;
    }
  }
  function Zs(l, t) {
    var e = null;
    (l !== null &&
      l.memoizedState !== null &&
      l.memoizedState.cachePool !== null &&
      (e = l.memoizedState.cachePool.pool),
      (l = null),
      t.memoizedState !== null &&
        t.memoizedState.cachePool !== null &&
        (l = t.memoizedState.cachePool.pool),
      l !== e && (l != null && l.refCount++, e != null && Bn(e)));
  }
  function ws(l, t) {
    ((l = null),
      t.alternate !== null && (l = t.alternate.memoizedState.cache),
      (t = t.memoizedState.cache),
      t !== l && (t.refCount++, l != null && Bn(l)));
  }
  function Bt(l, t, e, a) {
    var n = (e & 335544064) === e;
    if (t.subtreeFlags & (n ? 10262 : 10256))
      for (t = t.child; t !== null; ) (Vd(l, t, e, a), (t = t.sibling));
    else n && Ud(t);
  }
  function Vd(l, t, e, a) {
    var n = (e & 335544064) === e;
    n &&
      t.alternate === null &&
      t.return !== null &&
      t.return.alternate !== null &&
      ji(t);
    var u = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        (Bt(l, t, e, a), u & 2048 && $n(9, t));
        break;
      case 1:
        Bt(l, t, e, a);
        break;
      case 3:
        (Bt(l, t, e, a),
          n &&
            qs &&
            ((l = l.containerInfo),
            (l =
              l.nodeType === 9
                ? l.body
                : l.nodeName === "HTML"
                  ? l.ownerDocument.body
                  : l),
            l.style.viewTransitionName === "root" &&
              (l.style.viewTransitionName = ""),
            (l = l.ownerDocument.documentElement),
            l !== null &&
              l.style.viewTransitionName === "none" &&
              (l.style.viewTransitionName = "")),
          u & 2048 &&
            ((u = null),
            t.alternate !== null && (u = t.alternate.memoizedState.cache),
            (t = t.memoizedState.cache),
            t !== u && (t.refCount++, u != null && Bn(u))));
        break;
      case 12:
        if (u & 2048) {
          (Bt(l, t, e, a), (u = t.stateNode));
          try {
            var c = t.memoizedProps,
              o = c.id,
              h = c.onPostCommit;
            typeof h == "function" &&
              h(
                o,
                t.alternate === null ? "mount" : "update",
                u.passiveEffectDuration,
                -0,
              );
          } catch (p) {
            El(t, t.return, p);
          }
        } else Bt(l, t, e, a);
        break;
      case 31:
        Bt(l, t, e, a);
        break;
      case 13:
        Bt(l, t, e, a);
        break;
      case 23:
        break;
      case 22:
        ((c = t.stateNode),
          (o = t.alternate),
          t.memoizedState !== null
            ? (n && o !== null && o.memoizedState === null && ji(o),
              c._visibility & 2 ? Bt(l, t, e, a) : lu(l, t))
            : (n && o !== null && o.memoizedState !== null && ji(t),
              c._visibility & 2
                ? Bt(l, t, e, a)
                : ((c._visibility |= 2),
                  tn(l, t, e, a, (t.subtreeFlags & 10256) !== 0 || !1))),
          u & 2048 && Zs(o, t));
        break;
      case 24:
        (Bt(l, t, e, a), u & 2048 && ws(t.alternate, t));
        break;
      case 30:
        (n &&
          ((u = t.alternate), u !== null && (ae(u.child, !0), ae(t.child, !0))),
          Bt(l, t, e, a));
        break;
      default:
        Bt(l, t, e, a);
    }
  }
  function tn(l, t, e, a, n) {
    for (
      n = n && ((t.subtreeFlags & 10256) !== 0 || !1), t = t.child;
      t !== null;

    ) {
      var u = l,
        c = t,
        o = e,
        h = a,
        p = c.flags;
      switch (c.tag) {
        case 0:
        case 11:
        case 15:
          (tn(u, c, o, h, n), $n(8, c));
          break;
        case 23:
          break;
        case 22:
          var N = c.stateNode;
          (c.memoizedState !== null
            ? N._visibility & 2
              ? tn(u, c, o, h, n)
              : lu(u, c)
            : ((N._visibility |= 2), tn(u, c, o, h, n)),
            n && p & 2048 && Zs(c.alternate, c));
          break;
        case 24:
          (tn(u, c, o, h, n), n && p & 2048 && ws(c.alternate, c));
          break;
        default:
          tn(u, c, o, h, n);
      }
      t = t.sibling;
    }
  }
  function lu(l, t) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; ) {
        var e = l,
          a = t,
          n = a.flags;
        switch (a.tag) {
          case 22:
            (lu(e, a), n & 2048 && Zs(a.alternate, a));
            break;
          case 24:
            (lu(e, a), n & 2048 && ws(a.alternate, a));
            break;
          default:
            lu(e, a);
        }
        t = t.sibling;
      }
  }
  var Sa = 8192;
  function Ea(l, t, e) {
    if (l.subtreeFlags & Sa)
      for (l = l.child; l !== null; ) (kd(l, t, e), (l = l.sibling));
  }
  function kd(l, t, e) {
    switch (l.tag) {
      case 26:
        (Ea(l, t, e),
          l.flags & Sa &&
            (l.memoizedState !== null
              ? gm(e, Vt, l.memoizedState, l.memoizedProps)
              : ((l = l.stateNode), (t & 335544128) === t && P0(e, l))));
        break;
      case 5:
        (Ea(l, t, e),
          l.flags & Sa &&
            ((l = l.stateNode), (t & 335544128) === t && P0(e, l)));
        break;
      case 3:
      case 4:
        var a = Vt;
        ((Vt = su(l.stateNode.containerInfo)), Ea(l, t, e), (Vt = a));
        break;
      case 22:
        l.memoizedState === null &&
          ((a = l.alternate),
          a !== null && a.memoizedState !== null
            ? ((a = Sa), (Sa = 16777216), Ea(l, t, e), (Sa = a))
            : Ea(l, t, e));
        break;
      case 30:
        if (
          (l.flags & Sa) !== 0 &&
          ((a = l.memoizedProps.name), a != null && a !== "auto")
        ) {
          var n = l.stateNode;
          ((n.paired = null), Nt === null && (Nt = new Map()), Nt.set(a, n));
        }
        Ea(l, t, e);
        break;
      default:
        Ea(l, t, e);
    }
  }
  function Kd(l) {
    var t = l.alternate;
    if (t !== null && ((l = t.child), l !== null)) {
      t.child = null;
      do ((t = l.sibling), (l.sibling = null), (l = t));
      while (l !== null);
    }
  }
  function tu(l) {
    var t = l.deletions;
    if ((l.flags & 16) !== 0) {
      if (t !== null)
        for (var e = 0; e < t.length; e++) {
          var a = t[e];
          ((Jl = a), Wd(a, l));
        }
      Kd(l);
    }
    if (l.subtreeFlags & 10256)
      for (l = l.child; l !== null; ) (Jd(l), (l = l.sibling));
  }
  function Jd(l) {
    switch (l.tag) {
      case 0:
      case 11:
      case 15:
        (tu(l), l.flags & 2048 && we(9, l, l.return));
        break;
      case 3:
        tu(l);
        break;
      case 12:
        tu(l);
        break;
      case 22:
        var t = l.stateNode;
        l.memoizedState !== null &&
        t._visibility & 2 &&
        (l.return === null || l.return.tag !== 13)
          ? ((t._visibility &= -3), Ni(l))
          : tu(l);
        break;
      default:
        tu(l);
    }
  }
  function Ni(l) {
    var t = l.deletions;
    if ((l.flags & 16) !== 0) {
      if (t !== null)
        for (var e = 0; e < t.length; e++) {
          var a = t[e];
          ((Jl = a), Wd(a, l));
        }
      Kd(l);
    }
    for (l = l.child; l !== null; ) {
      switch (((t = l), t.tag)) {
        case 0:
        case 11:
        case 15:
          (we(8, t, t.return), Ni(t));
          break;
        case 22:
          ((e = t.stateNode),
            e._visibility & 2 && ((e._visibility &= -3), Ni(t)));
          break;
        default:
          Ni(t);
      }
      l = l.sibling;
    }
  }
  function Wd(l, t) {
    for (; Jl !== null; ) {
      var e = Jl;
      switch (e.tag) {
        case 0:
        case 11:
        case 15:
          we(8, e, t);
          break;
        case 23:
        case 22:
          if (e.memoizedState !== null && e.memoizedState.cachePool !== null) {
            var a = e.memoizedState.cachePool.pool;
            a != null && a.refCount++;
          }
          break;
        case 24:
          Bn(e.memoizedState.cache);
      }
      if (((a = e.child), a !== null)) ((a.return = e), (Jl = a));
      else
        l: for (e = l; Jl !== null; ) {
          a = Jl;
          var n = a.sibling,
            u = a.return;
          if ((Bd(a), a === e)) {
            Jl = null;
            break l;
          }
          if (n !== null) {
            ((n.return = u), (Jl = n));
            break l;
          }
          Jl = u;
        }
    }
  }
  var r1 = {
      getCacheForType: function (l) {
        var t = Pl(ql),
          e = t.data.get(l);
        return (e === void 0 && ((e = l()), t.data.set(l, e)), e);
      },
      cacheSignal: function () {
        return Pl(ql).controller.signal;
      },
    },
    d1 = typeof WeakMap == "function" ? WeakMap : Map,
    pl = 0,
    zl = null,
    il = null,
    sl = 0,
    Sl = 0,
    Tt = null,
    Ve = !1,
    en = !1,
    Xs = !1,
    Ne = 0,
    Hl = 0,
    ke = 0,
    Na = 0,
    Ti = 0,
    Mt = 0,
    an = 0,
    eu = null,
    yt = null,
    Vs = !1,
    Mi = 0,
    Fd = 0,
    Ci = 1 / 0,
    zi = null,
    Ke = null,
    Ll = 0,
    Kt = null,
    Ta = null,
    ce = 0,
    ks = 0,
    Ks = null,
    $d = null,
    nn = null,
    un = null,
    cn = null,
    au = 0,
    Ai = null;
  function Ct() {
    return (pl & 2) !== 0 && sl !== 0 ? sl & -sl : V.T !== null ? af() : Pf();
  }
  function Id() {
    if (Mt === 0)
      if ((sl & 536870912) === 0 || ul) {
        var l = Eu;
        ((Eu <<= 1), (Eu & 3932160) === 0 && (Eu = 262144), (Mt = l));
      } else Mt = 536870912;
    return ((l = lt.current), l !== null && (l.flags |= 32), Mt);
  }
  function sn(l, t) {
    if (t != null) {
      var e = l.stateNode,
        a = e.ref;
      (a === null && (a = e.ref = D0(me(l.memoizedProps, e))),
        un === null && (un = []),
        un.push(t.bind(null, a)));
    }
  }
  function gt(l, t, e) {
    (((l === zl && (Sl === 2 || Sl === 9)) || l.cancelPendingCommit !== null) &&
      (fn(l, 0), Je(l, sl, Mt, !1)),
      Nn(l, e),
      ((pl & 2) === 0 || l !== zl) &&
        (l === zl &&
          ((pl & 2) === 0 && (Na |= e), Hl === 4 && Je(l, sl, Mt, !1)),
        se(l)));
  }
  function Pd(l, t, e) {
    if ((pl & 6) !== 0) throw Error(r(327));
    var a = (!e && (t & 127) === 0 && (t & l.expiredLanes) === 0) || En(l, t),
      n = a ? y1(l, t) : Ws(l, t, !0),
      u = a;
    do {
      if (n === 0) {
        en && !a && Je(l, t, 0, !1);
        break;
      } else {
        if (((e = l.current.alternate), u && !h1(e))) {
          ((n = Ws(l, t, !1)), (u = !1));
          continue;
        }
        if (n === 2) {
          if (((u = t), l.errorRecoveryDisabledLanes & u)) var c = 0;
          else
            ((c = l.pendingLanes & -536870913),
              (c = c !== 0 ? c : c & 536870912 ? 536870912 : 0));
          if (c !== 0) {
            t = c;
            l: {
              var o = l;
              n = eu;
              var h = o.current.memoizedState.isDehydrated;
              if (
                (h && (fn(o, c).flags |= 256),
                (c = Ws(o, c, !1)),
                c !== 2 && c !== 6)
              ) {
                if (Xs && !h) {
                  ((o.errorRecoveryDisabledLanes |= u), (Na |= u), (n = 4));
                  break l;
                }
                ((u = yt),
                  (yt = n),
                  u !== null &&
                    (yt === null ? (yt = u) : yt.push.apply(yt, u)));
              }
              n = c;
            }
            if (((u = !1), n !== 2)) continue;
          }
        }
        if (n === 1) {
          (fn(l, 0), Je(l, t, 0, !0));
          break;
        }
        l: {
          switch (((a = l), (u = n), u)) {
            case 0:
            case 1:
              throw Error(r(345));
            case 4:
              if ((t & 4194048) !== t && (t & 62914560) !== t) break;
            case 6:
              Je(a, t, Mt, !Ve);
              break l;
            case 2:
              yt = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(r(329));
          }
          if ((t & 62914560) === t && ((n = Mi + 300 - xt()), 10 < n)) {
            if ((Je(a, t, Mt, !Ve), Tu(a, 0, !0) !== 0)) break l;
            ((ce = t),
              (a.timeoutHandle = yf(
                l0.bind(
                  null,
                  a,
                  e,
                  yt,
                  zi,
                  Vs,
                  t,
                  Mt,
                  Na,
                  an,
                  Ve,
                  u,
                  "Throttled",
                  -0,
                  0,
                ),
                n,
              )));
            break l;
          }
          l0(a, e, yt, zi, Vs, t, Mt, Na, an, Ve, u, null, -0, 0);
        }
      }
      break;
    } while (!0);
    se(l);
  }
  function l0(l, t, e, a, n, u, c, o, h, p, N, C, v, b) {
    l.timeoutHandle = -1;
    var R = t.subtreeFlags,
      w = (u & 335544064) === u;
    if (
      ((C = null),
      (w || R & 8192 || (R & 16785408) === 16785408) &&
        ((C = {
          stylesheets: null,
          count: 0,
          imgCount: 0,
          imgBytes: 0,
          suspenseyImages: [],
          waitingForImages: !0,
          waitingForViewTransition: !1,
          unsuspend: It,
        }),
        (Nt = null),
        kd(t, u, C),
        w &&
          ((R = C),
          (w = l.containerInfo),
          (w = (w.nodeType === 9 ? w : w.ownerDocument).__reactViewTransition),
          w != null &&
            (R.count++,
            (R.waitingForViewTransition = !0),
            (R = ru.bind(R)),
            w.finished.then(R, R))),
        (R =
          (u & 62914560) === u
            ? Mi - xt()
            : (u & 4194048) === u
              ? Fd - xt()
              : 0),
        (R = vm(C, R)),
        R !== null))
    ) {
      ((ce = u),
        (l.cancelPendingCommit = R(
          s0.bind(null, l, t, u, e, a, n, c, o, h, p, N, C, null, v, b),
        )),
        Je(l, u, c, !p));
      return;
    }
    s0(l, t, u, e, a, n, c, o, h, p, N, C);
  }
  function h1(l) {
    for (var t = l; ; ) {
      var e = t.tag;
      if (
        (e === 0 || e === 11 || e === 15) &&
        t.flags & 16384 &&
        ((e = t.updateQueue), e !== null && ((e = e.stores), e !== null))
      )
        for (var a = 0; a < e.length; a++) {
          var n = e[a],
            u = n.getSnapshot;
          n = n.value;
          try {
            if (!St(u(), n)) return !1;
          } catch {
            return !1;
          }
        }
      if (((e = t.child), t.subtreeFlags & 16384 && e !== null))
        ((e.return = t), (t = e));
      else {
        if (t === l) break;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === l) return !0;
          t = t.return;
        }
        ((t.sibling.return = t.return), (t = t.sibling));
      }
    }
    return !0;
  }
  function Je(l, t, e, a) {
    ((t = Jf(l, t)),
      (t &= ~Ti),
      (t &= ~Na),
      (l.suspendedLanes |= t),
      (l.pingedLanes &= ~t),
      a && (l.warmLanes |= t),
      (a = l.expirationTimes));
    for (var n = t; 0 < n; ) {
      var u = 31 - jt(n),
        c = 1 << u;
      ((a[u] = -1), (n &= ~c));
    }
    e !== 0 && Ff(l, e, t);
  }
  function Oi() {
    return (pl & 6) === 0 ? (nu(0), !1) : !0;
  }
  function Js() {
    if (il !== null) {
      if (Sl === 0) var l = il.return;
      else ((l = il), (xe = da = null), es(l), (Ja = null), (Yn = 0), (l = il));
      for (; l !== null; ) (Ed(l.alternate, l), (l = l.return));
      il = null;
    }
  }
  function fn(l, t) {
    var e = l.timeoutHandle;
    return (
      e !== -1 && ((l.timeoutHandle = -1), H1(e)),
      (e = l.cancelPendingCommit),
      e !== null && ((l.cancelPendingCommit = null), e()),
      (ce = 0),
      Js(),
      (zl = l),
      (il = e = ge(l.current, null)),
      (sl = t),
      (Sl = 0),
      (Tt = null),
      (Ve = !1),
      (en = En(l, t)),
      (Xs = !1),
      (an = Mt = Ti = Na = ke = Hl = 0),
      (yt = eu = null),
      (Vs = !1),
      (Ne = Jf(l, t)),
      Bu(),
      e
    );
  }
  function t0(l, t) {
    ((al = null),
      (V.H = fi),
      t === Ka || t === Wu
        ? ((t = sr()), (Sl = 3))
        : t === wc
          ? ((t = sr()), (Sl = 4))
          : (Sl =
              t === vs
                ? 8
                : t !== null &&
                    typeof t == "object" &&
                    typeof t.then == "function"
                  ? 6
                  : 1),
      (Tt = t),
      il === null && ((Hl = 1), oi(l, Rt(t, l.current))));
  }
  function e0() {
    var l = lt.current;
    return l === null
      ? !0
      : (sl & 4194048) === sl
        ? ut === null
        : (sl & 62914560) === sl || (sl & 536870912) !== 0
          ? l === ut
          : !1;
  }
  function a0() {
    var l = V.H;
    return ((V.H = fi), l === null ? fi : l);
  }
  function n0() {
    var l = V.A;
    return ((V.A = r1), l);
  }
  function _i() {
    ((Hl = 4),
      Ve || ((sl & 4194048) !== sl && lt.current !== null) || (en = !0),
      ((ke & 134217727) === 0 && (Na & 134217727) === 0) ||
        zl === null ||
        Je(zl, sl, Mt, !1));
  }
  function Ws(l, t, e) {
    var a = pl;
    pl |= 2;
    var n = a0(),
      u = n0();
    ((zl !== l || sl !== t) && ((zi = null), fn(l, t)), (t = !1));
    var c = Hl;
    l: do
      try {
        if (Sl !== 0 && il !== null) {
          var o = il,
            h = Tt;
          switch (Sl) {
            case 8:
              (Js(), (c = 6));
              break l;
            case 3:
            case 2:
            case 9:
            case 6:
              lt.current === null && (t = !0);
              var p = Sl;
              if (((Sl = 0), (Tt = null), on(l, o, h, p), e && en)) {
                c = 0;
                break l;
              }
              break;
            default:
              ((p = Sl), (Sl = 0), (Tt = null), on(l, o, h, p));
          }
        }
        (m1(), (c = Hl));
        break;
      } catch (N) {
        t0(l, N);
      }
    while (!0);
    return (
      t && l.shellSuspendCounter++,
      (xe = da = null),
      (pl = a),
      (V.H = n),
      (V.A = u),
      il === null && ((zl = null), (sl = 0), Bu()),
      c
    );
  }
  function m1() {
    for (; il !== null; ) u0(il);
  }
  function y1(l, t) {
    var e = pl;
    pl |= 2;
    var a = a0(),
      n = n0();
    zl !== l || sl !== t
      ? ((zi = null), (Ci = xt() + 500), fn(l, t))
      : (en = En(l, t));
    l: do
      try {
        if (Sl !== 0 && il !== null) {
          t = il;
          var u = Tt;
          t: switch (Sl) {
            case 1:
              ((Sl = 0), (Tt = null), on(l, t, u, 1));
              break;
            case 2:
            case 9:
              if (ir(u)) {
                ((Sl = 0), (Tt = null), i0(t));
                break;
              }
              ((t = function () {
                ((Sl !== 2 && Sl !== 9) || zl !== l || (Sl = 7), se(l));
              }),
                u.then(t, t));
              break l;
            case 3:
              Sl = 7;
              break l;
            case 4:
              Sl = 5;
              break l;
            case 7:
              ir(u)
                ? ((Sl = 0), (Tt = null), i0(t))
                : ((Sl = 0), (Tt = null), on(l, t, u, 7));
              break;
            case 5:
              var c = null;
              switch (il.tag) {
                case 26:
                  c = il.memoizedState;
                case 5:
                case 27:
                  var o = il;
                  if (c ? $0(c) : o.stateNode.complete) {
                    ((Sl = 0), (Tt = null));
                    var h = o.sibling;
                    if (h !== null) il = h;
                    else {
                      var p = o.return;
                      p !== null ? ((il = p), Di(p)) : (il = null);
                    }
                    break t;
                  }
              }
              ((Sl = 0), (Tt = null), on(l, t, u, 5));
              break;
            case 6:
              ((Sl = 0), (Tt = null), on(l, t, u, 6));
              break;
            case 8:
              (Js(), (Hl = 6));
              break l;
            default:
              throw Error(r(462));
          }
        }
        g1();
        break;
      } catch (N) {
        t0(l, N);
      }
    while (!0);
    return (
      (xe = da = null),
      (V.H = a),
      (V.A = n),
      (pl = e),
      il !== null ? 0 : ((zl = null), (sl = 0), Bu(), Hl)
    );
  }
  function g1() {
    for (; il !== null && !U2(); ) u0(il);
  }
  function u0(l) {
    var t = bd(l.alternate, l, Ne);
    ((l.memoizedProps = l.pendingProps), t === null ? Di(l) : (il = t));
  }
  function i0(l) {
    var t = l,
      e = t.alternate;
    switch (t.tag) {
      case 15:
      case 0:
        t = md(e, t, t.pendingProps, t.type, void 0, sl);
        break;
      case 11:
        t = md(e, t, t.pendingProps, t.type.render, t.ref, sl);
        break;
      case 5:
        es(t);
        var a = t;
        a === kl &&
          (ul
            ? (Xu(a), a.tag === 5 && a.stateNode != null && (Ol = a.stateNode))
            : (Xu(a), (ul = !0)));
      default:
        (Ed(e, t), (t = il = Wo(t, Ne)), (t = bd(e, t, Ne)));
    }
    ((l.memoizedProps = l.pendingProps), t === null ? Di(l) : (il = t));
  }
  function on(l, t, e, a) {
    ((xe = da = null), es(t), (Ja = null), (Yn = 0));
    var n = t.return;
    try {
      if (a1(l, n, t, e, sl)) {
        ((Hl = 1), oi(l, Rt(e, l.current)), (il = null));
        return;
      }
    } catch (u) {
      if (n !== null) throw ((il = n), u);
      ((Hl = 1), oi(l, Rt(e, l.current)), (il = null));
      return;
    }
    t.flags & 32768
      ? (ul || a === 1
          ? (l = !0)
          : en || (sl & 536870912) !== 0
            ? (l = !1)
            : ((Ve = l = !0),
              (a === 2 || a === 9 || a === 3 || a === 6) &&
                ((a = lt.current),
                a !== null && a.tag === 13 && (a.flags |= 16384))),
        c0(t, l))
      : Di(t);
  }
  function Di(l) {
    var t = l;
    do {
      if ((t.flags & 32768) !== 0) {
        c0(t, Ve);
        return;
      }
      l = t.return;
      var e = c1(t.alternate, t, Ne);
      if (e !== null) {
        il = e;
        return;
      }
      if (((t = t.sibling), t !== null)) {
        il = t;
        return;
      }
      il = t = l;
    } while (t !== null);
    Hl === 0 && (Hl = 5);
  }
  function c0(l, t) {
    do {
      var e = s1(l.alternate, l);
      if (e !== null) {
        ((e.flags &= 32767), (il = e));
        return;
      }
      if (
        ((e = l.return),
        e !== null &&
          ((e.flags |= 32768), (e.subtreeFlags = 0), (e.deletions = null)),
        !t && ((l = l.sibling), l !== null))
      ) {
        il = l;
        return;
      }
      il = l = e;
    } while (l !== null);
    ((Hl = 6), (il = null));
  }
  function s0(l, t, e, a, n, u, c, o, h, p, N, C) {
    l.cancelPendingCommit = null;
    do Ui();
    while (Ll !== 0);
    if ((pl & 6) !== 0) throw Error(r(327));
    if (t !== null) {
      if (t === l.current) throw Error(r(177));
      (l === zl && ((il = zl = null), (sl = 0)),
        (Ta = t),
        (Kt = l),
        (ce = e),
        (Ks = n),
        ($d = a),
        v1(l, t, e, c, o, h, C));
    }
  }
  function v1(l, t, e, a, n, u, c) {
    var o = t.lanes | t.childLanes;
    if (
      ((ks = o),
      (o |= Oc),
      w2(l, e, o, a, n, u),
      (un = null),
      (e & 335544064) === e
        ? ((cn = Vh(l)), (a = 10262))
        : ((cn = null), (a = 10256)),
      (t.subtreeFlags & a) !== 0 || (t.flags & a) !== 0
        ? ((l.callbackNode = null),
          (l.callbackPriority = 0),
          E1(bu, function () {
            return (Ps(), null);
          }))
        : ((l.callbackNode = null), (l.callbackPriority = 0)),
      (xi = !1),
      (a = (t.flags & 13878) !== 0),
      (t.subtreeFlags & 13878) !== 0 || a)
    ) {
      ((a = V.T), (V.T = null), (n = ll.p), (ll.p = 2), (u = pl), (pl |= 4));
      try {
        f1(l, t, e);
      } finally {
        ((pl = u), (ll.p = n), (V.T = a));
      }
    }
    ((Ll = 1),
      xi
        ? (nn = w1(c, l.containerInfo, cn, Fs, $s, p1, Is, Ps, x1))
        : (Fs(), $s(), Is()));
  }
  function x1(l) {
    if (Ll !== 0) {
      var t = Kt.onRecoverableError;
      t(l, { componentStack: null });
    }
  }
  function p1() {
    Ll === 3 && ((Ll = 0), Xd(Ta, Kt), (Ll = 4));
  }
  function Fs() {
    if (Ll === 1) {
      Ll = 0;
      var l = Kt,
        t = Ta,
        e = ce,
        a = (t.flags & 13878) !== 0;
      if ((t.subtreeFlags & 13878) !== 0 || a) {
        ((a = V.T), (V.T = null));
        var n = ll.p;
        ll.p = 2;
        var u = pl;
        pl |= 4;
        try {
          ((Pn = bi = !1), Zd(t, l, e), (e = df));
          var c = qo(l.containerInfo),
            o = e.focusedElem,
            h = e.selectionRange;
          if (
            c !== o &&
            o &&
            o.ownerDocument &&
            Bo(o.ownerDocument.documentElement, o)
          ) {
            if (h !== null && Tc(o)) {
              var p = h.start,
                N = h.end;
              if ((N === void 0 && (N = p), "selectionStart" in o))
                ((o.selectionStart = p),
                  (o.selectionEnd = Math.min(N, o.value.length)));
              else {
                var C = o.ownerDocument || document,
                  v = (C && C.defaultView) || window;
                if (v.getSelection) {
                  var b = v.getSelection(),
                    R = o.textContent.length,
                    w = Math.min(h.start, R),
                    nl = h.end === void 0 ? w : Math.min(h.end, R);
                  !b.extend && w > nl && ((c = nl), (nl = w), (w = c));
                  var x = Ho(o, w),
                    m = Ho(o, nl);
                  if (
                    x &&
                    m &&
                    (b.rangeCount !== 1 ||
                      b.anchorNode !== x.node ||
                      b.anchorOffset !== x.offset ||
                      b.focusNode !== m.node ||
                      b.focusOffset !== m.offset)
                  ) {
                    var j = C.createRange();
                    (j.setStart(x.node, x.offset),
                      b.removeAllRanges(),
                      w > nl
                        ? (b.addRange(j), b.extend(m.node, m.offset))
                        : (j.setEnd(m.node, m.offset), b.addRange(j)));
                  }
                }
              }
            }
            for (C = [], b = o; (b = b.parentNode); )
              b.nodeType === 1 &&
                C.push({ element: b, left: b.scrollLeft, top: b.scrollTop });
            for (
              typeof o.focus == "function" && o.focus(), o = 0;
              o < C.length;
              o++
            ) {
              var M = C[o];
              ((M.element.scrollLeft = M.left), (M.element.scrollTop = M.top));
            }
          }
          ((xn = !!rf), (df = rf = null));
        } finally {
          ((pl = u), (ll.p = n), (V.T = a));
        }
      }
      ((l.current = t), (Ll = 2));
    }
  }
  function $s() {
    if (Ll === 2) {
      Ll = 0;
      var l = Kt,
        t = Ta,
        e = (t.flags & 8772) !== 0;
      if ((t.subtreeFlags & 8772) !== 0 || e) {
        ((e = V.T), (V.T = null));
        var a = ll.p;
        ll.p = 2;
        var n = pl;
        pl |= 4;
        try {
          Qd(l, t.alternate, t);
        } finally {
          ((pl = n), (ll.p = a), (V.T = e));
        }
      }
      Ll = 3;
    }
  }
  function Is() {
    if (Ll === 4 || Ll === 3) {
      Ll = 0;
      var l = nn;
      ((nn = null), R2());
      var t = Kt,
        e = Ta,
        a = ce,
        n = $d,
        u = (a & 335544064) === a ? 10262 : 10256;
      if (
        ((e.subtreeFlags & u) !== 0 || (e.flags & u) !== 0
          ? (Ll = 5)
          : ((Ll = 0), (Ta = Kt = null), f0(t, t.pendingLanes)),
        (u = t.pendingLanes),
        u === 0 && (Ke = null),
        cc(a),
        (e = e.stateNode),
        pt && typeof pt.onCommitFiberRoot == "function")
      )
        try {
          pt.onCommitFiberRoot(Sn, e, void 0, (e.current.flags & 128) === 128);
        } catch {}
      if (n !== null) {
        ((e = V.T), (u = ll.p), (ll.p = 2), (V.T = null));
        try {
          for (var c = t.onRecoverableError, o = 0; o < n.length; o++) {
            var h = n[o];
            c(h.value, { componentStack: h.stack });
          }
        } finally {
          ((V.T = e), (ll.p = u));
        }
      }
      if (
        ((n = un),
        (c = cn),
        (cn = null),
        n !== null && ((un = null), c === null && (c = []), l !== null))
      )
        for (h = 0; h < n.length; h++)
          ((e = (0, n[h])(c)), e !== void 0 && l.finished.finally(e));
      ((ce & 3) !== 0 && Ui(),
        se(t),
        (u = t.pendingLanes),
        (a & 261930) !== 0 && (u & 42) !== 0
          ? t === Ai
            ? au++
            : ((au = 0), (Ai = t))
          : ((au = 0), (Ai = null)),
        nu(0));
    }
  }
  function f0(l, t) {
    (l.pooledCacheLanes &= t) === 0 &&
      ((t = l.pooledCache), t != null && ((l.pooledCache = null), Bn(t)));
  }
  function Ui() {
    return (
      nn !== null && (nn.skipTransition(), (nn = null)),
      Fs(),
      $s(),
      Is(),
      Ps()
    );
  }
  function Ps() {
    if (Ll !== 5) return !1;
    var l = Kt,
      t = ks;
    ks = 0;
    var e = cc(ce),
      a = V.T,
      n = ll.p;
    try {
      ((ll.p = 32 > e ? 32 : e), (V.T = null), (e = Ks), (Ks = null));
      var u = Kt,
        c = ce;
      if (((Ll = 0), (Ta = Kt = null), (ce = 0), (pl & 6) !== 0))
        throw Error(r(331));
      var o = pl;
      if (
        ((pl |= 4),
        Jd(u.current),
        Vd(u, u.current, c, e),
        (pl = o),
        nu(0, !1),
        pt && typeof pt.onPostCommitFiberRoot == "function")
      )
        try {
          pt.onPostCommitFiberRoot(Sn, u);
        } catch {}
      return !0;
    } finally {
      ((ll.p = n), (V.T = a), f0(l, t));
    }
  }
  function o0(l, t, e) {
    ((t = Rt(e, t)),
      (t = gs(l.stateNode, t, 2)),
      (l = qe(l, t, 2)),
      l !== null && (Nn(l, 2), se(l)));
  }
  function El(l, t, e) {
    if (l.tag === 3) o0(l, l, e);
    else
      for (; t !== null; ) {
        if (t.tag === 3) {
          o0(t, l, e);
          break;
        } else if (t.tag === 1) {
          var a = t.stateNode;
          if (
            typeof t.type.getDerivedStateFromError == "function" ||
            (typeof a.componentDidCatch == "function" &&
              (Ke === null || !Ke.has(a)))
          ) {
            ((l = Rt(e, l)),
              (e = id(2)),
              (a = qe(t, e, 2)),
              a !== null && (cd(e, a, t, l), Nn(a, 2), se(a)));
            break;
          }
        }
        t = t.return;
      }
  }
  function lf(l, t, e) {
    var a = l.pingCache;
    if (a === null) {
      a = l.pingCache = new d1();
      var n = new Set();
      a.set(t, n);
    } else ((n = a.get(t)), n === void 0 && ((n = new Set()), a.set(t, n)));
    n.has(e) ||
      ((Xs = !0), n.add(e), (l = j1.bind(null, l, t, e)), t.then(l, l));
  }
  function j1(l, t, e) {
    var a = l.pingCache;
    (a !== null && a.delete(t),
      (l.pingedLanes |= l.suspendedLanes & e),
      (l.warmLanes &= ~e),
      zl === l &&
        (sl & e) === e &&
        ((Hl === 4 ||
          (Hl === 3 && (sl & 62914560) === sl && 300 > xt() - Mi)) &&
        (pl & 2) === 0
          ? fn(l, 0)
          : (Ti |= e),
        an === sl && (an = 0)),
      se(l));
  }
  function r0(l, t) {
    (t === 0 && (t = Wf()), (l = fa(l, t)), l !== null && (Nn(l, t), se(l)));
  }
  function b1(l) {
    var t = l.memoizedState,
      e = 0;
    (t !== null && (e = t.retryLane), r0(l, e));
  }
  function S1(l, t) {
    var e = 0;
    switch (l.tag) {
      case 31:
      case 13:
        var a = l.stateNode,
          n = l.memoizedState;
        n !== null && (e = n.retryLane);
        break;
      case 19:
        a = l.stateNode;
        break;
      case 22:
        a = l.stateNode._retryCache;
        break;
      default:
        throw Error(r(314));
    }
    (a !== null && a.delete(t), r0(l, e));
  }
  function E1(l, t) {
    return ac(l, t);
  }
  var rn = null,
    dn = null,
    tf = !1,
    Ri = !1,
    ef = !1,
    We = 0;
  function se(l) {
    (l !== dn &&
      l.next === null &&
      (dn === null ? (rn = dn = l) : (dn = dn.next = l)),
      (Ri = !0),
      tf || ((tf = !0), T1()));
  }
  function nu(l, t) {
    if (!ef && Ri) {
      ef = !0;
      do
        for (var e = !1, a = rn; a !== null; ) {
          if (l !== 0) {
            var n = a.pendingLanes;
            if (n === 0) var u = 0;
            else {
              var c = a.suspendedLanes,
                o = a.pingedLanes;
              ((u = (1 << (31 - jt(42 | l) + 1)) - 1),
                (u &= n & ~(c & ~o)),
                (u = u & 201326741 ? (u & 201326741) | 1 : u ? u | 2 : 0));
            }
            u !== 0 && ((e = !0), y0(a, u));
          } else
            ((u = sl),
              (u = Tu(
                a,
                a === zl ? u : 0,
                a.cancelPendingCommit !== null || a.timeoutHandle !== -1,
              )),
              (u & 3) === 0 || En(a, u) || ((e = !0), y0(a, u)));
          a = a.next;
        }
      while (e);
      ef = !1;
    }
  }
  function N1() {
    d0();
  }
  function d0() {
    Ri = tf = !1;
    var l = 0;
    We !== 0 && Q1() && (l = We);
    for (var t = xt(), e = null, a = rn; a !== null; ) {
      var n = a.next,
        u = h0(a, t);
      (u === 0
        ? ((a.next = null),
          e === null ? (rn = n) : (e.next = n),
          n === null && (dn = e))
        : ((e = a), (l !== 0 || (u & 3) !== 0) && (Ri = !0)),
        (a = n));
    }
    ((Ll !== 0 && Ll !== 5) || nu(l), We !== 0 && (We = 0));
  }
  function h0(l, t) {
    for (
      var e = l.suspendedLanes,
        a = l.pingedLanes,
        n = l.expirationTimes,
        u = l.pendingLanes & -62914561;
      0 < u;

    ) {
      var c = 31 - jt(u),
        o = 1 << c,
        h = n[c];
      (h === -1
        ? ((o & e) === 0 || (o & a) !== 0) && (n[c] = Z2(o, t))
        : h <= t && (l.expiredLanes |= o),
        (u &= ~o));
    }
    if (
      ((t = zl),
      (e = sl),
      (e = Tu(
        l,
        l === t ? e : 0,
        l.cancelPendingCommit !== null || l.timeoutHandle !== -1,
      )),
      (a = l.callbackNode),
      e === 0 ||
        (l === t && (Sl === 2 || Sl === 9)) ||
        l.cancelPendingCommit !== null)
    )
      return (
        a !== null && a !== null && nc(a),
        (l.callbackNode = null),
        (l.callbackPriority = 0)
      );
    if ((e & 3) === 0 || En(l, e)) {
      if (((t = e & -e), t === l.callbackPriority)) return t;
      switch ((a !== null && nc(a), cc(e))) {
        case 2:
        case 8:
          e = kf;
          break;
        case 32:
          e = bu;
          break;
        case 268435456:
          e = Kf;
          break;
        default:
          e = bu;
      }
      return (
        (a = m0.bind(null, l)),
        (e = ac(e, a)),
        (l.callbackPriority = t),
        (l.callbackNode = e),
        t
      );
    }
    return (
      a !== null && a !== null && nc(a),
      (l.callbackPriority = 2),
      (l.callbackNode = null),
      2
    );
  }
  function m0(l, t) {
    if (Ll !== 0 && Ll !== 5)
      return ((l.callbackNode = null), (l.callbackPriority = 0), null);
    var e = l.callbackNode;
    if (Ui() && l.callbackNode !== e) return null;
    var a = sl;
    return (
      (a = Tu(
        l,
        l === zl ? a : 0,
        l.cancelPendingCommit !== null || l.timeoutHandle !== -1,
      )),
      a === 0
        ? null
        : (Pd(l, a, t),
          h0(l, xt()),
          l.callbackNode != null && l.callbackNode === e
            ? m0.bind(null, l)
            : null)
    );
  }
  function y0(l, t) {
    if (Ui()) return null;
    Pd(l, t, !0);
  }
  function T1() {
    B1(function () {
      (pl & 6) !== 0 ? ac(Vf, N1) : d0();
    });
  }
  function af() {
    if (We === 0) {
      var l = ya;
      (l === 0 && ((l = Su), (Su <<= 1), (Su & 261888) === 0 && (Su = 256)),
        (We = l));
    }
    return We;
  }
  function g0(l) {
    return l == null || typeof l == "symbol" || typeof l == "boolean"
      ? null
      : typeof l == "function"
        ? l
        : Ou(l);
  }
  function M1(l, t, e, a, n) {
    if (t === "submit" && e && e.stateNode === n) {
      var u = g0((n[rt] || null).action),
        c = a.submitter;
      c &&
        ((t = (t = c[rt] || null)
          ? g0(t.formAction)
          : c.getAttribute("formAction")),
        t !== null && ((u = t), (c = null)));
      var o = new Ru("action", "action", null, a, n);
      l.push({
        event: o,
        listeners: [
          {
            instance: null,
            listener: function () {
              if (a.defaultPrevented) {
                if (We !== 0) {
                  var h = new FormData(n, c);
                  rs(
                    e,
                    { pending: !0, data: h, method: n.method, action: u },
                    null,
                    h,
                  );
                }
              } else
                typeof u == "function" &&
                  (o.preventDefault(),
                  (h = new FormData(n, c)),
                  rs(
                    e,
                    { pending: !0, data: h, method: n.method, action: u },
                    u,
                    h,
                  ));
            },
            currentTarget: n,
          },
        ],
      });
    }
  }
  for (var nf = 0; nf < Ac.length; nf++) {
    var uf = Ac[nf],
      C1 = uf.toLowerCase(),
      z1 = uf[0].toUpperCase() + uf.slice(1);
    wt(C1, "on" + z1);
  }
  (wt(Zo, "onAnimationEnd"),
    wt(wo, "onAnimationIteration"),
    wt(Xo, "onAnimationStart"),
    wt("dblclick", "onDoubleClick"),
    wt("focusin", "onFocus"),
    wt("focusout", "onBlur"),
    wt(Hh, "onTransitionRun"),
    wt(Bh, "onTransitionStart"),
    wt(qh, "onTransitionCancel"),
    wt(Vo, "onTransitionEnd"),
    Ua("onMouseEnter", ["mouseout", "mouseover"]),
    Ua("onMouseLeave", ["mouseout", "mouseover"]),
    Ua("onPointerEnter", ["pointerout", "pointerover"]),
    Ua("onPointerLeave", ["pointerout", "pointerover"]),
    ia(
      "onChange",
      "change click focusin focusout input keydown keyup selectionchange".split(
        " ",
      ),
    ),
    ia(
      "onSelect",
      "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
        " ",
      ),
    ),
    ia("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]),
    ia(
      "onCompositionEnd",
      "compositionend focusout keydown keypress keyup mousedown".split(" "),
    ),
    ia(
      "onCompositionStart",
      "compositionstart focusout keydown keypress keyup mousedown".split(" "),
    ),
    ia(
      "onCompositionUpdate",
      "compositionupdate focusout keydown keypress keyup mousedown".split(" "),
    ));
  var uu =
      "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
        " ",
      ),
    A1 = new Set(
      "beforetoggle cancel close invalid load scroll scrollend toggle"
        .split(" ")
        .concat(uu),
    );
  function v0(l, t) {
    t = (t & 4) !== 0;
    for (var e = 0; e < l.length; e++) {
      var a = l[e],
        n = a.event;
      a = a.listeners;
      l: {
        var u = void 0;
        if (t)
          for (var c = a.length - 1; 0 <= c; c--) {
            var o = a[c],
              h = o.instance,
              p = o.currentTarget;
            if (((o = o.listener), h !== u && n.isPropagationStopped()))
              break l;
            ((u = o), (n.currentTarget = p));
            try {
              u(n);
            } catch (N) {
              Hu(N);
            }
            ((n.currentTarget = null), (u = h));
          }
        else
          for (c = 0; c < a.length; c++) {
            if (
              ((o = a[c]),
              (h = o.instance),
              (p = o.currentTarget),
              (o = o.listener),
              h !== u && n.isPropagationStopped())
            )
              break l;
            ((u = o), (n.currentTarget = p));
            try {
              u(n);
            } catch (N) {
              Hu(N);
            }
            ((n.currentTarget = null), (u = h));
          }
      }
    }
  }
  function cl(l, t) {
    var e = t[to];
    e === void 0 && (e = t[to] = new Set());
    var a = l + "__bubble";
    e.has(a) || (x0(t, l, 2, !1), e.add(a));
  }
  function cf(l, t, e) {
    var a = 0;
    (t && (a |= 4), x0(e, l, a, t));
  }
  var Li = "_reactListening" + Math.random().toString(36).slice(2);
  function sf(l) {
    if (!l[Li]) {
      ((l[Li] = !0),
        no.forEach(function (e) {
          e !== "selectionchange" && (A1.has(e) || cf(e, !1, l), cf(e, !0, l));
        }));
      var t = l.nodeType === 9 ? l : l.ownerDocument;
      t === null || t[Li] || ((t[Li] = !0), cf("selectionchange", !1, t));
    }
  }
  function x0(l, t, e, a) {
    switch (c2(t)) {
      case 2:
        var n = bm;
        break;
      case 8:
        n = Sm;
        break;
      default:
        n = zf;
    }
    ((e = n.bind(null, t, e, l)),
      (n = void 0),
      !yc ||
        (t !== "touchstart" && t !== "touchmove" && t !== "wheel") ||
        (n = !0),
      a
        ? n !== void 0
          ? l.addEventListener(t, e, { capture: !0, passive: n })
          : l.addEventListener(t, e, !0)
        : n !== void 0
          ? l.addEventListener(t, e, { passive: n })
          : l.addEventListener(t, e, !1));
  }
  function ff(l, t, e, a, n) {
    var u = a;
    if ((t & 1) === 0 && (t & 2) === 0 && a !== null)
      l: for (;;) {
        if (a === null) return;
        var c = a.tag;
        if (c === 3 || c === 4) {
          var o = a.stateNode.containerInfo;
          if (o === n) break;
          if (c === 4)
            for (c = a.return; c !== null; ) {
              var h = c.tag;
              if ((h === 3 || h === 4) && c.stateNode.containerInfo === n)
                return;
              c = c.return;
            }
          for (; o !== null; ) {
            if (((c = ua(o)), c === null)) return;
            if (((h = c.tag), h === 5 || h === 6 || h === 26 || h === 27)) {
              a = u = c;
              continue l;
            }
            o = o.parentNode;
          }
        }
        a = a.return;
      }
    xo(function () {
      var p = u,
        N = hc(e),
        C = [];
      l: {
        var v = ko.get(l);
        if (v !== void 0) {
          var b = Ru,
            R = l;
          switch (l) {
            case "keypress":
              if (Du(e) === 0) break l;
            case "keydown":
            case "keyup":
              b = hh;
              break;
            case "focusin":
              ((R = "focus"), (b = pc));
              break;
            case "focusout":
              ((R = "blur"), (b = pc));
              break;
            case "beforeblur":
            case "afterblur":
              b = pc;
              break;
            case "click":
              if (e.button === 2) break l;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              b = bo;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              b = th;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              b = xh;
              break;
            case Zo:
            case wo:
            case Xo:
              b = nh;
              break;
            case Vo:
              b = jh;
              break;
            case "scroll":
            case "scrollend":
              b = P2;
              break;
            case "wheel":
              b = Sh;
              break;
            case "copy":
            case "cut":
            case "paste":
              b = ih;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              b = Eo;
              break;
            case "submit":
              b = gh;
              break;
            case "toggle":
            case "beforetoggle":
              b = Nh;
          }
          var w = (t & 4) !== 0,
            nl = !w && (l === "scroll" || l === "scrollend"),
            x = w ? (v !== null ? v + "Capture" : null) : v;
          w = [];
          for (var m = p, j; m !== null; ) {
            var M = m;
            if (
              ((j = M.stateNode),
              (M = M.tag),
              (M !== 5 && M !== 26 && M !== 27) ||
                j === null ||
                x === null ||
                ((M = Cn(m, x)), M != null && w.push(iu(m, M, j))),
              nl)
            )
              break;
            m = m.return;
          }
          0 < w.length &&
            ((v = new b(v, R, null, e, N)), C.push({ event: v, listeners: w }));
        }
      }
      if ((t & 7) === 0) {
        l: {
          if (
            ((b = l === "mouseover" || l === "pointerover"),
            (v = l === "mouseout" || l === "pointerout"),
            b &&
              e !== dc &&
              (R = e.relatedTarget || e.fromElement) &&
              (ua(R) || R[Oa]))
          )
            break l;
          (v || b) &&
            ((R =
              N.window === N
                ? N
                : (b = N.ownerDocument)
                  ? b.defaultView || b.parentWindow
                  : window),
            v
              ? ((b = e.relatedTarget || e.toElement),
                (v = p),
                (b = b ? ua(b) : null),
                b !== null &&
                  ((nl = g(b)),
                  (w = b.tag),
                  b !== nl || (w !== 5 && w !== 27 && w !== 6)) &&
                  (b = null))
              : ((v = null), (b = p)),
            v !== b &&
              ((w = bo),
              (M = "onMouseLeave"),
              (x = "onMouseEnter"),
              (m = "mouse"),
              (l === "pointerout" || l === "pointerover") &&
                ((w = Eo),
                (M = "onPointerLeave"),
                (x = "onPointerEnter"),
                (m = "pointer")),
              (nl = v == null ? R : Mn(v)),
              (j = b == null ? R : Mn(b)),
              (R = new w(M, m + "leave", v, e, N)),
              (R.target = nl),
              (R.relatedTarget = j),
              (M = null),
              ua(N) === p &&
                ((w = new w(x, m + "enter", b, e, N)),
                (w.target = j),
                (w.relatedTarget = nl),
                (M = w)),
              (nl = M),
              (w = v && b ? ol(v, b, O1) : null),
              v !== null && p0(C, R, v, w, !1),
              b !== null && nl !== null && p0(C, nl, b, w, !0)));
        }
        l: {
          if (
            ((v = p ? Mn(p) : window),
            (b = v.nodeName && v.nodeName.toLowerCase()),
            b === "select" || (b === "input" && v.type === "file"))
          )
            var Y = _o;
          else if (Ao(v))
            if (Do) Y = Rh;
            else {
              Y = Dh;
              var fl = _h;
            }
          else
            ((b = v.nodeName),
              !b ||
              b.toLowerCase() !== "input" ||
              (v.type !== "checkbox" && v.type !== "radio")
                ? p && rc(p.elementType) && (Y = _o)
                : (Y = Uh));
          if (Y && (Y = Y(l, p))) {
            Oo(C, Y, e, N);
            break l;
          }
          fl && fl(l, v, p);
        }
        switch (((fl = p ? Mn(p) : window), l)) {
          case "focusin":
            (Ao(fl) || fl.contentEditable === "true") &&
              ((qa = fl), (Mc = p), (Ln = null));
            break;
          case "focusout":
            Ln = Mc = qa = null;
            break;
          case "mousedown":
            Cc = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            ((Cc = !1), Go(C, e, N));
            break;
          case "selectionchange":
            if (Qh) break;
          case "keydown":
          case "keyup":
            Go(C, e, N);
        }
        var k;
        if (bc)
          l: {
            switch (l) {
              case "compositionstart":
                var F = "onCompositionStart";
                break l;
              case "compositionend":
                F = "onCompositionEnd";
                break l;
              case "compositionupdate":
                F = "onCompositionUpdate";
                break l;
            }
            F = void 0;
          }
        else
          Ba
            ? Co(l, e) && (F = "onCompositionEnd")
            : l === "keydown" &&
              e.keyCode === 229 &&
              (F = "onCompositionStart");
        (F &&
          (No &&
            e.locale !== "ko" &&
            (Ba || F !== "onCompositionStart"
              ? F === "onCompositionEnd" && Ba && (k = po())
              : ((Oe = N),
                (gc = "value" in Oe ? Oe.value : Oe.textContent),
                (Ba = !0))),
          (fl = Qi(p, F)),
          0 < fl.length &&
            ((F = new So(F, l, null, e, N)),
            C.push({ event: F, listeners: fl }),
            k ? (F.data = k) : ((k = zo(e)), k !== null && (F.data = k)))),
          (k = Mh ? Ch(l, e) : zh(l, e)) &&
            ((F = Qi(p, "onBeforeInput")),
            0 < F.length &&
              ((fl = new So("onBeforeInput", "beforeinput", null, e, N)),
              C.push({ event: fl, listeners: F }),
              (fl.data = k))),
          M1(C, l, p, e, N));
      }
      v0(C, t);
    });
  }
  function iu(l, t, e) {
    return { instance: l, listener: t, currentTarget: e };
  }
  function Qi(l, t) {
    for (var e = t + "Capture", a = []; l !== null; ) {
      var n = l,
        u = n.stateNode;
      if (
        ((n = n.tag),
        (n !== 5 && n !== 26 && n !== 27) ||
          u === null ||
          ((n = Cn(l, e)),
          n != null && a.unshift(iu(l, n, u)),
          (n = Cn(l, t)),
          n != null && a.push(iu(l, n, u))),
        l.tag === 3)
      )
        return a;
      l = l.return;
    }
    return [];
  }
  function O1(l) {
    if (l === null) return null;
    do l = l.return;
    while (l && l.tag !== 5 && l.tag !== 27);
    return l || null;
  }
  function p0(l, t, e, a, n) {
    for (var u = t._reactName, c = []; e !== null && e !== a; ) {
      var o = e,
        h = o.alternate,
        p = o.stateNode;
      if (((o = o.tag), h !== null && h === a)) break;
      ((o !== 5 && o !== 26 && o !== 27) ||
        p === null ||
        ((h = p),
        n
          ? ((p = Cn(e, u)), p != null && c.unshift(iu(e, p, h)))
          : n || ((p = Cn(e, u)), p != null && c.push(iu(e, p, h)))),
        (e = e.return));
    }
    c.length !== 0 && l.push({ event: t, listeners: c });
  }
  var _1 = /\r\n?/g,
    D1 = /\u0000|\uFFFD/g;
  function j0(l) {
    return (typeof l == "string" ? l : "" + l)
      .replace(
        _1,
        `
`,
      )
      .replace(D1, "");
  }
  function b0(l, t) {
    return ((t = j0(t)), j0(l) === t);
  }
  function Nl(l, t, e, a, n, u) {
    switch (e) {
      case "children":
        if (typeof a == "string")
          t === "body" || (t === "textarea" && a === "") || La(l, a);
        else if (typeof a == "number" || typeof a == "bigint")
          t !== "body" && La(l, "" + a);
        else return;
        break;
      case "className":
        Au(l, "class", a);
        break;
      case "tabIndex":
        Au(l, "tabindex", a);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        Au(l, e, a);
        break;
      case "style":
        go(l, a, u);
        return;
      case "data":
        if (t !== "object") {
          Au(l, "data", a);
          break;
        }
      case "src":
      case "href":
        if (a === "" && (t !== "a" || e !== "href")) {
          l.removeAttribute(e);
          break;
        }
        if (
          a == null ||
          typeof a == "function" ||
          typeof a == "symbol" ||
          typeof a == "boolean"
        ) {
          l.removeAttribute(e);
          break;
        }
        ((a = Ou(a)), l.setAttribute(e, a));
        break;
      case "action":
      case "formAction":
        if (typeof a == "function") {
          l.setAttribute(
            e,
            "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')",
          );
          break;
        } else
          typeof u == "function" &&
            (e === "formAction"
              ? (t !== "input" && Nl(l, t, "name", n.name, n, null),
                Nl(l, t, "formEncType", n.formEncType, n, null),
                Nl(l, t, "formMethod", n.formMethod, n, null),
                Nl(l, t, "formTarget", n.formTarget, n, null))
              : (Nl(l, t, "encType", n.encType, n, null),
                Nl(l, t, "method", n.method, n, null),
                Nl(l, t, "target", n.target, n, null)));
        if (a == null || typeof a == "symbol" || typeof a == "boolean") {
          l.removeAttribute(e);
          break;
        }
        ((a = Ou(a)), l.setAttribute(e, a));
        break;
      case "onClick":
        a != null && (l.onclick = It);
        return;
      case "onScroll":
        a != null && cl("scroll", l);
        return;
      case "onScrollEnd":
        a != null && cl("scrollend", l);
        return;
      case "dangerouslySetInnerHTML":
        if (a != null) {
          if (typeof a != "object" || !("__html" in a)) throw Error(r(61));
          if (((e = a.__html), e != null)) {
            if (n.children != null) throw Error(r(60));
            u?.__html !== e && (l.innerHTML = e);
          }
        }
        break;
      case "multiple":
        l.multiple = a && typeof a != "function" && typeof a != "symbol";
        break;
      case "muted":
        l.muted = a && typeof a != "function" && typeof a != "symbol";
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "defaultValue":
      case "defaultChecked":
      case "innerHTML":
      case "ref":
        break;
      case "autoFocus":
        break;
      case "xlinkHref":
        if (
          a == null ||
          typeof a == "function" ||
          typeof a == "boolean" ||
          typeof a == "symbol"
        ) {
          l.removeAttribute("xlink:href");
          break;
        }
        ((e = Ou(a)),
          l.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", e));
        break;
      case "contentEditable":
      case "spellCheck":
      case "draggable":
      case "value":
      case "autoReverse":
      case "externalResourcesRequired":
      case "focusable":
      case "preserveAlpha":
        a != null && typeof a != "function" && typeof a != "symbol"
          ? l.setAttribute(e, a)
          : l.removeAttribute(e);
        break;
      case "inert":
      case "allowFullScreen":
      case "async":
      case "autoPlay":
      case "controls":
      case "credentialless":
      case "default":
      case "defer":
      case "disabled":
      case "disablePictureInPicture":
      case "disableRemotePlayback":
      case "formNoValidate":
      case "hidden":
      case "loop":
      case "noModule":
      case "noValidate":
      case "open":
      case "playsInline":
      case "readOnly":
      case "required":
      case "reversed":
      case "scoped":
      case "seamless":
      case "itemScope":
        a && typeof a != "function" && typeof a != "symbol"
          ? l.setAttribute(e, "")
          : l.removeAttribute(e);
        break;
      case "capture":
      case "download":
        a === !0
          ? l.setAttribute(e, "")
          : a !== !1 &&
              a != null &&
              typeof a != "function" &&
              typeof a != "symbol"
            ? l.setAttribute(e, a)
            : l.removeAttribute(e);
        break;
      case "cols":
      case "rows":
      case "size":
      case "span":
        a != null &&
        typeof a != "function" &&
        typeof a != "symbol" &&
        !isNaN(a) &&
        1 <= a
          ? l.setAttribute(e, a)
          : l.removeAttribute(e);
        break;
      case "rowSpan":
      case "start":
        a == null || typeof a == "function" || typeof a == "symbol" || isNaN(a)
          ? l.removeAttribute(e)
          : l.setAttribute(e, a);
        break;
      case "popover":
        (cl("beforetoggle", l), cl("toggle", l), zu(l, "popover", a));
        break;
      case "xlinkActuate":
        de(l, "http://www.w3.org/1999/xlink", "xlink:actuate", a);
        break;
      case "xlinkArcrole":
        de(l, "http://www.w3.org/1999/xlink", "xlink:arcrole", a);
        break;
      case "xlinkRole":
        de(l, "http://www.w3.org/1999/xlink", "xlink:role", a);
        break;
      case "xlinkShow":
        de(l, "http://www.w3.org/1999/xlink", "xlink:show", a);
        break;
      case "xlinkTitle":
        de(l, "http://www.w3.org/1999/xlink", "xlink:title", a);
        break;
      case "xlinkType":
        de(l, "http://www.w3.org/1999/xlink", "xlink:type", a);
        break;
      case "xmlBase":
        de(l, "http://www.w3.org/XML/1998/namespace", "xml:base", a);
        break;
      case "xmlLang":
        de(l, "http://www.w3.org/XML/1998/namespace", "xml:lang", a);
        break;
      case "xmlSpace":
        de(l, "http://www.w3.org/XML/1998/namespace", "xml:space", a);
        break;
      case "is":
        zu(l, "is", a);
        break;
      case "innerText":
      case "textContent":
        return;
      default:
        if (
          !(2 < e.length) ||
          (e[0] !== "o" && e[0] !== "O") ||
          (e[1] !== "n" && e[1] !== "N")
        )
          ((e = $2.get(e) || e), zu(l, e, a));
        else return;
    }
    gl = !0;
  }
  function of(l, t, e, a, n, u) {
    switch (e) {
      case "style":
        go(l, a, u);
        return;
      case "dangerouslySetInnerHTML":
        if (a != null) {
          if (typeof a != "object" || !("__html" in a)) throw Error(r(61));
          if (((e = a.__html), e != null)) {
            if (n.children != null) throw Error(r(60));
            u?.__html !== e && (l.innerHTML = e);
          }
        }
        break;
      case "children":
        if (typeof a == "string") La(l, a);
        else if (typeof a == "number" || typeof a == "bigint") La(l, "" + a);
        else return;
        break;
      case "onScroll":
        a != null && cl("scroll", l);
        return;
      case "onScrollEnd":
        a != null && cl("scrollend", l);
        return;
      case "onClick":
        a != null && (l.onclick = It);
        return;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "innerHTML":
      case "ref":
        return;
      case "innerText":
      case "textContent":
        return;
      default:
        if (!uo.hasOwnProperty(e))
          l: {
            if (
              e[0] === "o" &&
              e[1] === "n" &&
              ((n = e.endsWith("Capture")),
              (u = e.slice(2, n ? e.length - 7 : void 0)),
              (t = l[rt] || null),
              (t = t != null ? t[e] : null),
              typeof t == "function" && l.removeEventListener(u, t, n),
              typeof a == "function")
            ) {
              (typeof t != "function" &&
                t !== null &&
                (e in l
                  ? (l[e] = null)
                  : l.hasAttribute(e) && l.removeAttribute(e)),
                l.addEventListener(u, a, n));
              break l;
            }
            ((gl = !0),
              e in l
                ? (l[e] = a)
                : a === !0
                  ? l.setAttribute(e, "")
                  : zu(l, e, a));
          }
        return;
    }
    gl = !0;
  }
  function at(l, t, e) {
    switch (t) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "img":
        (cl("error", l), cl("load", l));
        var a = !1,
          n = !1,
          u;
        for (u in e)
          if (e.hasOwnProperty(u)) {
            var c = e[u];
            if (c != null)
              switch (u) {
                case "src":
                  a = !0;
                  break;
                case "srcSet":
                  n = !0;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(r(137, t));
                default:
                  Nl(l, t, u, c, e, null);
              }
          }
        (n && Nl(l, t, "srcSet", e.srcSet, e, null),
          a && Nl(l, t, "src", e.src, e, null));
        return;
      case "input":
        cl("invalid", l);
        var o = (u = c = n = null),
          h = null,
          p = null;
        for (a in e)
          if (e.hasOwnProperty(a)) {
            var N = e[a];
            if (N != null)
              switch (a) {
                case "name":
                  n = N;
                  break;
                case "type":
                  c = N;
                  break;
                case "checked":
                  h = N;
                  break;
                case "defaultChecked":
                  p = N;
                  break;
                case "value":
                  u = N;
                  break;
                case "defaultValue":
                  o = N;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (N != null) throw Error(r(137, t));
                  break;
                default:
                  Nl(l, t, a, N, e, null);
              }
          }
        ro(l, u, o, h, p, c, n, !1);
        return;
      case "select":
        (cl("invalid", l), (a = c = u = null));
        for (n in e)
          if (e.hasOwnProperty(n) && ((o = e[n]), o != null))
            switch (n) {
              case "value":
                u = o;
                break;
              case "defaultValue":
                c = o;
                break;
              case "multiple":
                a = o;
              default:
                Nl(l, t, n, o, e, null);
            }
        ((t = u),
          (e = c),
          (l.multiple = !!a),
          t != null ? Ra(l, !!a, t, !1) : e != null && Ra(l, !!a, e, !0));
        return;
      case "textarea":
        (cl("invalid", l), (u = n = a = null));
        for (c in e)
          if (e.hasOwnProperty(c) && ((o = e[c]), o != null))
            switch (c) {
              case "value":
                a = o;
                break;
              case "defaultValue":
                n = o;
                break;
              case "children":
                u = o;
                break;
              case "dangerouslySetInnerHTML":
                if (o != null) throw Error(r(91));
                break;
              default:
                Nl(l, t, c, o, e, null);
            }
        mo(l, a, n, u);
        return;
      case "option":
        for (h in e)
          e.hasOwnProperty(h) &&
            ((a = e[h]), a != null) &&
            (h === "selected"
              ? (l.selected =
                  a && typeof a != "function" && typeof a != "symbol")
              : Nl(l, t, h, a, e, null));
        return;
      case "dialog":
        (cl("beforetoggle", l),
          cl("toggle", l),
          cl("cancel", l),
          cl("close", l));
        break;
      case "iframe":
      case "object":
        cl("load", l);
        break;
      case "video":
      case "audio":
        for (a = 0; a < uu.length; a++) cl(uu[a], l);
        break;
      case "image":
        (cl("error", l), cl("load", l));
        break;
      case "details":
        cl("toggle", l);
        break;
      case "embed":
      case "source":
      case "link":
        (cl("error", l), cl("load", l));
      case "area":
      case "base":
      case "br":
      case "col":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "track":
      case "wbr":
      case "menuitem":
        for (p in e)
          if (e.hasOwnProperty(p) && ((a = e[p]), a != null))
            switch (p) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(r(137, t));
              default:
                Nl(l, t, p, a, e, null);
            }
        return;
      default:
        if (rc(t)) {
          for (N in e)
            e.hasOwnProperty(N) &&
              ((a = e[N]), a !== void 0 && of(l, t, N, a, e, void 0));
          return;
        }
    }
    for (o in e)
      e.hasOwnProperty(o) && ((a = e[o]), a != null && Nl(l, t, o, a, e, null));
  }
  var U1 = {};
  function R1(l, t, e, a) {
    switch (t) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "input":
        var n = null,
          u = null,
          c = null,
          o = null,
          h = null,
          p = null,
          N = null;
        for (b in e) {
          var C = e[b];
          if (e.hasOwnProperty(b) && C != null)
            switch (b) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                h = C;
              default:
                a.hasOwnProperty(b) || Nl(l, t, b, null, a, C);
            }
        }
        for (var v in a) {
          var b = a[v];
          if (((C = e[v]), a.hasOwnProperty(v) && (b != null || C != null)))
            switch (v) {
              case "type":
                (b !== C && (gl = !0), (u = b));
                break;
              case "name":
                (b !== C && (gl = !0), (n = b));
                break;
              case "checked":
                (b !== C && (gl = !0), (p = b));
                break;
              case "defaultChecked":
                (b !== C && (gl = !0), (N = b));
                break;
              case "value":
                (b !== C && (gl = !0), (c = b));
                break;
              case "defaultValue":
                (b !== C && (gl = !0), (o = b));
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (b != null) throw Error(r(137, t));
                break;
              default:
                b !== C && Nl(l, t, v, b, a, C);
            }
        }
        fc(l, c, o, h, p, N, u, n);
        return;
      case "select":
        b = c = o = v = null;
        for (u in e)
          if (((h = e[u]), e.hasOwnProperty(u) && h != null))
            switch (u) {
              case "value":
                break;
              case "multiple":
                b = h;
              default:
                a.hasOwnProperty(u) || Nl(l, t, u, null, a, h);
            }
        for (n in a)
          if (
            ((u = a[n]),
            (h = e[n]),
            a.hasOwnProperty(n) && (u != null || h != null))
          )
            switch (n) {
              case "value":
                (u !== h && (gl = !0), (v = u));
                break;
              case "defaultValue":
                (u !== h && (gl = !0), (o = u));
                break;
              case "multiple":
                (u !== h && (gl = !0), (c = u));
              default:
                u !== h && Nl(l, t, n, u, a, h);
            }
        ((t = o),
          (e = c),
          (a = b),
          v != null
            ? Ra(l, !!e, v, !1)
            : !!a != !!e &&
              (t != null ? Ra(l, !!e, t, !0) : Ra(l, !!e, e ? [] : "", !1)));
        return;
      case "textarea":
        b = v = null;
        for (o in e)
          if (
            ((n = e[o]),
            e.hasOwnProperty(o) && n != null && !a.hasOwnProperty(o))
          )
            switch (o) {
              case "value":
                break;
              case "children":
                break;
              default:
                Nl(l, t, o, null, a, n);
            }
        for (c in a)
          if (
            ((n = a[c]),
            (u = e[c]),
            a.hasOwnProperty(c) && (n != null || u != null))
          )
            switch (c) {
              case "value":
                (n !== u && (gl = !0), (v = n));
                break;
              case "defaultValue":
                (n !== u && (gl = !0), (b = n));
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (n != null) throw Error(r(91));
                break;
              default:
                n !== u && Nl(l, t, c, n, a, u);
            }
        ho(l, v, b);
        return;
      case "option":
        for (var R in e)
          ((v = e[R]),
            e.hasOwnProperty(R) &&
              v != null &&
              !a.hasOwnProperty(R) &&
              (R === "selected" ? (l.selected = !1) : Nl(l, t, R, null, a, v)));
        for (h in a)
          ((v = a[h]),
            (b = e[h]),
            a.hasOwnProperty(h) &&
              v !== b &&
              (v != null || b != null) &&
              (h === "selected"
                ? (v !== b && (gl = !0),
                  (l.selected =
                    v && typeof v != "function" && typeof v != "symbol"))
                : Nl(l, t, h, v, a, b)));
        return;
      case "img":
      case "link":
      case "area":
      case "base":
      case "br":
      case "col":
      case "embed":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "source":
      case "track":
      case "wbr":
      case "menuitem":
        for (var w in e)
          ((v = e[w]),
            e.hasOwnProperty(w) &&
              v != null &&
              !a.hasOwnProperty(w) &&
              Nl(l, t, w, null, a, v));
        for (p in a)
          if (
            ((v = a[p]),
            (b = e[p]),
            a.hasOwnProperty(p) && v !== b && (v != null || b != null))
          )
            switch (p) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (v != null) throw Error(r(137, t));
                break;
              default:
                Nl(l, t, p, v, a, b);
            }
        return;
      default:
        if (rc(t)) {
          for (var nl in e)
            ((v = e[nl]),
              e.hasOwnProperty(nl) &&
                v !== void 0 &&
                !a.hasOwnProperty(nl) &&
                of(l, t, nl, void 0, a, v));
          for (N in a)
            ((v = a[N]),
              (b = e[N]),
              !a.hasOwnProperty(N) ||
                v === b ||
                (v === void 0 && b === void 0) ||
                of(l, t, N, v, a, b));
          return;
        }
    }
    for (var x in e)
      ((v = e[x]),
        e.hasOwnProperty(x) &&
          v != null &&
          !a.hasOwnProperty(x) &&
          Nl(l, t, x, null, a, v));
    for (C in a)
      ((v = a[C]),
        (b = e[C]),
        !a.hasOwnProperty(C) ||
          v === b ||
          (v == null && b == null) ||
          Nl(l, t, C, v, a, b));
  }
  function S0(l) {
    switch (l) {
      case "css":
      case "script":
      case "font":
      case "img":
      case "image":
      case "input":
      case "link":
        return !0;
      default:
        return !1;
    }
  }
  function L1() {
    if (typeof performance.getEntriesByType == "function") {
      for (
        var l = 0, t = 0, e = performance.getEntriesByType("resource"), a = 0;
        a < e.length;
        a++
      ) {
        var n = e[a],
          u = n.transferSize,
          c = n.initiatorType,
          o = n.duration;
        if (u && o && S0(c)) {
          for (c = 0, o = n.responseEnd, a += 1; a < e.length; a++) {
            var h = e[a],
              p = h.startTime;
            if (p > o) break;
            var N = h.transferSize,
              C = h.initiatorType;
            N &&
              S0(C) &&
              ((h = h.responseEnd), (c += N * (h < o ? 1 : (o - p) / (h - p))));
          }
          if ((--a, (t += (8 * (u + c)) / (n.duration / 1e3)), l++, 10 < l))
            break;
        }
      }
      if (0 < l) return t / l / 1e6;
    }
    return navigator.connection &&
      ((l = navigator.connection.downlink), typeof l == "number")
      ? l
      : 5;
  }
  var rf = null,
    df = null;
  function cu(l) {
    return l.nodeType === 9 ? l : l.ownerDocument;
  }
  function E0(l) {
    switch (l) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function N0(l, t) {
    if (l === 0)
      switch (t) {
        case "svg":
          return 1;
        case "math":
          return 2;
        default:
          return 0;
      }
    return l === 1 && t === "foreignObject" ? 0 : l;
  }
  function T0(l, t, e, a) {
    return (
      (e = cu(e).createElement(l)),
      (e[Il] = a),
      (e[rt] = t),
      at(e, l, t),
      Vl(e),
      e
    );
  }
  function hf(l, t) {
    return (
      l === "textarea" ||
      l === "noscript" ||
      typeof t.children == "string" ||
      typeof t.children == "number" ||
      typeof t.children == "bigint" ||
      (typeof t.dangerouslySetInnerHTML == "object" &&
        t.dangerouslySetInnerHTML !== null &&
        t.dangerouslySetInnerHTML.__html != null)
    );
  }
  var mf = null;
  function Q1() {
    var l = window.event;
    return l && l.type === "popstate"
      ? l === mf
        ? !1
        : ((mf = l), !0)
      : ((mf = null), !1);
  }
  var yf = typeof setTimeout == "function" ? setTimeout : void 0,
    H1 = typeof clearTimeout == "function" ? clearTimeout : void 0,
    M0 = typeof Promise == "function" ? Promise : void 0,
    C0 =
      typeof requestAnimationFrame == "function" ? requestAnimationFrame : yf,
    B1 =
      typeof queueMicrotask == "function"
        ? queueMicrotask
        : typeof M0 < "u"
          ? function (l) {
              return M0.resolve(null).then(l).catch(q1);
            }
          : yf;
  function q1(l) {
    setTimeout(function () {
      throw l;
    });
  }
  function Fe(l) {
    return l === "head";
  }
  function z0(l, t) {
    var e = t,
      a = 0;
    do {
      var n = e.nextSibling;
      if ((l.removeChild(e), n && n.nodeType === 8))
        if (((e = n.data), e === "/$" || e === "/&")) {
          if (a === 0) {
            (l.removeChild(n), pn(t));
            return;
          }
          a--;
        } else if (
          e === "$" ||
          e === "$?" ||
          e === "$~" ||
          e === "$!" ||
          e === "&"
        )
          a++;
        else if (e === "html") Ef(l.ownerDocument.documentElement);
        else if (e === "head") {
          ((e = l.ownerDocument.head), Ef(e));
          for (var u = e.firstChild; u; ) {
            var c = u.nextSibling,
              o = u.nodeName;
            (u[Tn] ||
              o === "SCRIPT" ||
              o === "STYLE" ||
              (o === "LINK" && u.rel.toLowerCase() === "stylesheet") ||
              e.removeChild(u),
              (u = c));
          }
        } else e === "body" && Ef(l.ownerDocument.body);
      e = n;
    } while (e);
    pn(t);
  }
  function A0(l, t) {
    var e = l;
    l = 0;
    do {
      var a = e.nextSibling;
      if (
        (e.nodeType === 1
          ? t
            ? ((e._stashedDisplay = e.style.display),
              (e.style.display = "none"))
            : ((e.style.display = e._stashedDisplay || ""),
              e.getAttribute("style") === "" && e.removeAttribute("style"))
          : e.nodeType === 3 &&
            (t
              ? ((e._stashedText = e.nodeValue), (e.nodeValue = ""))
              : (e.nodeValue = e._stashedText || "")),
        a && a.nodeType === 8)
      )
        if (((e = a.data), e === "/$")) {
          if (l === 0) break;
          l--;
        } else (e !== "$" && e !== "$?" && e !== "$~" && e !== "$!") || l++;
      e = a;
    } while (e);
  }
  function O0(l, t, e) {
    if (
      ((t = CSS.escape(t) !== t ? "r-" + btoa(t).replace(/=/g, "") : t),
      (l.style.viewTransitionName = t),
      e != null && (l.style.viewTransitionClass = e),
      (e = getComputedStyle(l)),
      e.display === "inline")
    ) {
      if (((t = l.getClientRects()), t.length === 1)) var a = 1;
      else
        for (var n = (a = 0); n < t.length; n++) {
          var u = t[n];
          0 < u.width && 0 < u.height && a++;
        }
      a === 1 &&
        ((l = l.style),
        (l.display = t.length === 1 ? "inline-block" : "block"),
        (l.marginTop = "-" + e.paddingTop),
        (l.marginBottom = "-" + e.paddingBottom));
    }
  }
  function _0(l, t) {
    ((l = l.style), (t = t.style));
    var e =
      t != null
        ? t.hasOwnProperty("viewTransitionName")
          ? t.viewTransitionName
          : t.hasOwnProperty("view-transition-name")
            ? t["view-transition-name"]
            : null
        : null;
    ((l.viewTransitionName =
      e == null || typeof e == "boolean" ? "" : ("" + e).trim()),
      (e =
        t != null
          ? t.hasOwnProperty("viewTransitionClass")
            ? t.viewTransitionClass
            : t.hasOwnProperty("view-transition-class")
              ? t["view-transition-class"]
              : null
          : null),
      (l.viewTransitionClass =
        e == null || typeof e == "boolean" ? "" : ("" + e).trim()),
      l.display === "inline-block" &&
        (t == null
          ? (l.display = l.margin = "")
          : ((e = t.display),
            (l.display = e == null || typeof e == "boolean" ? "" : e),
            (e = t.margin),
            e != null
              ? (l.margin = e)
              : ((e = t.hasOwnProperty("marginTop")
                  ? t.marginTop
                  : t["margin-top"]),
                (l.marginTop = e == null || typeof e == "boolean" ? "" : e),
                (t = t.hasOwnProperty("marginBottom")
                  ? t.marginBottom
                  : t["margin-bottom"]),
                (l.marginBottom =
                  t == null || typeof t == "boolean" ? "" : t)))));
  }
  function G1(l, t, e) {
    return (
      (e = e.ownerDocument.defaultView),
      {
        rect: l,
        abs: t.position === "absolute" || t.position === "fixed",
        clip:
          t.clipPath !== "none" ||
          t.overflow !== "visible" ||
          t.filter !== "none" ||
          t.mask !== "none" ||
          t.mask !== "none" ||
          t.borderRadius !== "0px",
        view:
          0 <= l.bottom &&
          0 <= l.right &&
          l.top <= e.innerHeight &&
          l.left <= e.innerWidth,
      }
    );
  }
  function gf(l) {
    var t = l.getBoundingClientRect(),
      e = getComputedStyle(l);
    return G1(t, e, l);
  }
  function Y1(l) {
    return l.documentElement.clientHeight;
  }
  function Z1(l) {
    (this.addEventListener("load", l), this.addEventListener("error", l));
  }
  function w1(l, t, e, a, n, u, c, o, h) {
    var p = t.nodeType === 9 ? t : t.ownerDocument;
    try {
      var N = p.startViewTransition({
        update: function () {
          var v = p.defaultView,
            b = v.navigation && v.navigation.transition,
            R = p.fonts.status;
          a();
          var w = [];
          if (
            (R === "loaded" &&
              (Y1(p), p.fonts.status === "loading" && w.push(p.fonts.ready)),
            (R = w.length),
            l !== null)
          )
            for (var nl = l.suspenseyImages, x = 0, m = 0; m < nl.length; m++) {
              var j = nl[m];
              if (!j.complete) {
                var M = j.getBoundingClientRect();
                if (
                  0 < M.bottom &&
                  0 < M.right &&
                  M.top < v.innerHeight &&
                  M.left < v.innerWidth
                ) {
                  if (((x += I0(j)), x > qi)) {
                    w.length = R;
                    break;
                  }
                  ((j = new Promise(Z1.bind(j))), w.push(j));
                }
              }
            }
          if (0 < w.length)
            return (
              (v = Promise.race([
                Promise.all(w),
                new Promise(function (Y) {
                  return setTimeout(Y, 500);
                }),
              ]).then(n, n)),
              (b ? Promise.allSettled([b.finished, v]) : v).then(u, u)
            );
          if ((n(), b)) return b.finished.then(u, u);
          u();
        },
        types: e,
      });
      p.__reactViewTransition = N;
      var C = [];
      return (
        N.ready.then(
          function () {
            for (
              var v = p.documentElement.getAnimations({ subtree: !0 }), b = 0;
              b < v.length;
              b++
            ) {
              var R = v[b],
                w = R.effect,
                nl = w.pseudoElement;
              if (nl != null && nl.startsWith("::view-transition")) {
                (C.push(R), (R = w.getKeyframes()));
                for (var x = (nl = void 0), m = !0, j = 0; j < R.length; j++) {
                  var M = R[j],
                    Y = M.width;
                  if (nl === void 0) nl = Y;
                  else if (nl !== Y) {
                    m = !1;
                    break;
                  }
                  if (((Y = M.height), x === void 0)) x = Y;
                  else if (x !== Y) {
                    m = !1;
                    break;
                  }
                  (delete M.width,
                    delete M.height,
                    M.transform === "none" && delete M.transform);
                }
                m &&
                  nl !== void 0 &&
                  x !== void 0 &&
                  (w.setKeyframes(R),
                  (m = getComputedStyle(w.target, w.pseudoElement)),
                  m.width !== nl || m.height !== x) &&
                  ((m = R[0]),
                  (m.width = nl),
                  (m.height = x),
                  (m = R[R.length - 1]),
                  (m.width = nl),
                  (m.height = x),
                  w.setKeyframes(R));
              }
            }
            c();
          },
          function (v) {
            p.__reactViewTransition === N && (p.__reactViewTransition = null);
            try {
              (typeof v == "object" &&
                v !== null &&
                v.name === "InvalidStateError" &&
                (v.message ===
                  "View transition was skipped because document visibility state is hidden." ||
                  v.message ===
                    "Skipping view transition because document visibility state has become hidden." ||
                  v.message ===
                    "Skipping view transition because viewport size changed." ||
                  v.message ===
                    "Transition was aborted because of invalid state") &&
                (v = null),
                v !== null && h(v));
            } finally {
              (a(), n(), c());
            }
          },
        ),
        N.finished.finally(function () {
          for (var v = 0; v < C.length; v++) C[v].cancel();
          (p.__reactViewTransition === N && (p.__reactViewTransition = null),
            o());
        }),
        N
      );
    } catch {
      return (a(), n(), c(), null);
    }
  }
  function Ma(l, t) {
    ((this._scope = document.documentElement),
      (this._selector = "::view-transition-" + l + "(" + t + ")"));
  }
  ((Ma.prototype.animate = function (l, t) {
    return (
      (t = typeof t == "number" ? { duration: t } : el({}, t)),
      (t.pseudoElement = this._selector),
      this._scope.animate(l, t)
    );
  }),
    (Ma.prototype.getAnimations = function () {
      for (
        var l = this._scope,
          t = this._selector,
          e = l.getAnimations({ subtree: !0 }),
          a = [],
          n = 0;
        n < e.length;
        n++
      ) {
        var u = e[n].effect;
        u !== null && u.target === l && u.pseudoElement === t && a.push(e[n]);
      }
      return a;
    }),
    (Ma.prototype.getComputedStyle = function () {
      return getComputedStyle(this._scope, this._selector);
    }));
  function D0(l) {
    return {
      name: l,
      group: new Ma("group", l),
      imagePair: new Ma("image-pair", l),
      old: new Ma("old", l),
      new: new Ma("new", l),
    };
  }
  function zt(l) {
    ((this._fragmentFiber = l),
      (this._observers = this._eventListeners = null));
  }
  zt.prototype.addEventListener = function (l, t, e) {
    var a = null,
      n = null;
    if (
      !(
        e != null &&
        typeof e != "boolean" &&
        ((a = e.signal || null), a !== null && a.aborted)
      )
    ) {
      this._eventListeners === null && (this._eventListeners = []);
      var u = this._eventListeners;
      if (R0(u, l, t, e) === -1) {
        var c = this,
          o = t;
        (e != null &&
          typeof e != "boolean" &&
          e.once === !0 &&
          (o = function (h) {
            (c.removeEventListener(l, t, e),
              typeof t == "function" ? t.call(this, h) : t.handleEvent(h));
          }),
          a !== null &&
            ((n = c.removeEventListener.bind(c, l, t, e)),
            a.addEventListener("abort", n, { once: !0 }),
            (n = a.removeEventListener.bind(a, "abort", n))),
          (a = hn(e)),
          u.push({
            type: l,
            listener: t,
            optionsOrUseCapture: e,
            attachedListener: o,
            cleanup: n,
          }),
          E(this._fragmentFiber.child, !1, X1, l, o, a));
      }
      this._eventListeners = u;
    }
  };
  function X1(l, t, e, a) {
    return (K(l).addEventListener(t, e, a), !1);
  }
  zt.prototype.removeEventListener = function (l, t, e) {
    var a = this._eventListeners;
    if (a !== null && ((t = R0(a, l, t, e)), t !== -1)) {
      var n = a[t];
      e = n.attachedListener;
      var u = n.cleanup;
      ((n = hn(n.optionsOrUseCapture)),
        E(this._fragmentFiber.child, !1, V1, l, e, n),
        a.splice(t, 1),
        u !== null && u());
    }
  };
  function V1(l, t, e, a) {
    return (K(l).removeEventListener(t, e, a), !1);
  }
  function hn(l) {
    return l != null &&
      typeof l != "boolean" &&
      (l.once === !0 || l.signal instanceof AbortSignal)
      ? { capture: l.capture, passive: l.passive }
      : l;
  }
  function U0(l) {
    return l == null
      ? "c=0"
      : typeof l == "boolean"
        ? "c=" + (l ? "1" : "0")
        : "c=" + (l.capture ? "1" : "0");
  }
  function R0(l, t, e, a) {
    if (l.length === 0) return -1;
    a = U0(a);
    for (var n = 0; n < l.length; n++) {
      var u = l[n];
      if (u.type === t && u.listener === e && U0(u.optionsOrUseCapture) === a)
        return n;
    }
    return -1;
  }
  ((zt.prototype.dispatchEvent = function (l) {
    var t = Q(this._fragmentFiber);
    if (t === null) return !0;
    t = K(t);
    var e = this._eventListeners;
    if ((e !== null && 0 < e.length) || !l.bubbles) {
      var a =
        t.nodeType === 9 ? t.createComment("") : document.createTextNode("");
      if (e)
        for (var n = 0; n < e.length; n++) {
          var u = e[n];
          a.addEventListener(
            u.type,
            u.attachedListener,
            hn(u.optionsOrUseCapture),
          );
        }
      if ((t.appendChild(a), (l = a.dispatchEvent(l)), e))
        for (n = 0; n < e.length; n++)
          ((u = e[n]),
            a.removeEventListener(
              u.type,
              u.attachedListener,
              hn(u.optionsOrUseCapture),
            ));
      return (t.removeChild(a), l);
    }
    return t.dispatchEvent(l);
  }),
    (zt.prototype.focus = function (l) {
      E(this._fragmentFiber.child, !0, L0, l, void 0, void 0);
    }));
  function L0(l, t) {
    return l.tag === 6 ? !1 : ((l = K(l)), am(l, t));
  }
  zt.prototype.focusLast = function (l) {
    var t = [];
    E(this._fragmentFiber.child, !0, vf, t, void 0, void 0);
    for (var e = t.length - 1; 0 <= e && !L0(t[e], l); e--);
  };
  function vf(l, t) {
    return (t.push(l), !1);
  }
  zt.prototype.blur = function () {
    var l = Q(this._fragmentFiber);
    l !== null &&
      ((l = K(l)),
      (l = cu(l).activeElement),
      l !== null && E(this._fragmentFiber.child, !1, k1, l, void 0, void 0));
  };
  function k1(l, t) {
    return l.tag === 6
      ? !1
      : ((l = K(l)), l === t || l.contains(t) ? (t.blur(), !0) : !1);
  }
  zt.prototype.observeUsing = function (l) {
    (this._observers === null && (this._observers = new Set()),
      this._observers.add(l),
      E(this._fragmentFiber.child, !1, K1, l, void 0, void 0));
  };
  function K1(l, t) {
    return (l.tag === 6 || ((l = K(l)), t.observe(l)), !1);
  }
  zt.prototype.unobserveUsing = function (l) {
    var t = this._observers;
    if (t !== null && t.has(l)) {
      (t.delete(l), E(this._fragmentFiber.child, !1, J1, l, void 0, void 0));
      for (var e = (t = 0); e < Jt.length; e++) {
        var a = Jt[e];
        a.fragmentInstance === this && a.observer === l
          ? l.unobserve(a.instance)
          : (Jt[t++] = a);
      }
      Jt.length = t;
    }
  };
  function J1(l, t) {
    return (l.tag === 6 || ((l = K(l)), t.unobserve(l)), !1);
  }
  var Jt = [],
    xf = !1;
  function W1(l, t, e) {
    (Jt.push({ fragmentInstance: l, observer: t, instance: e }),
      xf ||
        ((xf = !0),
        nm(function () {
          xf = !1;
          var a = Jt;
          Jt = [];
          for (var n = 0; n < a.length; n++) {
            var u = a[n];
            u.observer.unobserve(u.instance);
          }
        })));
  }
  zt.prototype.getClientRects = function () {
    var l = [];
    return (E(this._fragmentFiber.child, !1, F1, l, void 0, void 0), l);
  };
  function F1(l, t) {
    if (l.tag === 6) {
      l = l.stateNode;
      var e = l.ownerDocument.createRange();
      (e.selectNodeContents(l), t.push.apply(t, e.getClientRects()));
    } else ((l = K(l)), t.push.apply(t, l.getClientRects()));
    return !1;
  }
  ((zt.prototype.getRootNode = function (l) {
    var t = Q(this._fragmentFiber);
    return t === null ? this : K(t).getRootNode(l);
  }),
    (zt.prototype.compareDocumentPosition = function (l) {
      var t = Q(this._fragmentFiber);
      if (t === null) return Node.DOCUMENT_POSITION_DISCONNECTED;
      var e = [];
      E(this._fragmentFiber.child, !1, vf, e, void 0, void 0);
      var a = K(t);
      if (e.length === 0) {
        if (((e = a), G(this._fragmentFiber))) {
          l: {
            for (t = this._fragmentFiber.return; t !== null; ) {
              if (t.tag === 4) {
                t = t.stateNode.containerInfo;
                break l;
              }
              if (t.tag === 3 || t.tag === 5 || t.tag === 27) break;
              t = t.return;
            }
            t = null;
          }
          t != null && (e = t);
        }
        t = this._fragmentFiber;
        var n = (a = e.compareDocumentPosition(l));
        return (
          e === l
            ? (n = Node.DOCUMENT_POSITION_CONTAINS)
            : a & Node.DOCUMENT_POSITION_CONTAINED_BY &&
              ((e = Z(t)[1]),
              e === null
                ? (n = Node.DOCUMENT_POSITION_PRECEDING)
                : ((l = K(e).compareDocumentPosition(l)),
                  (n =
                    l === 0 || l & Node.DOCUMENT_POSITION_FOLLOWING
                      ? Node.DOCUMENT_POSITION_FOLLOWING
                      : Node.DOCUMENT_POSITION_PRECEDING))),
          (n |= Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC)
        );
      }
      ((t = K(e[0])), (n = K(e[e.length - 1])));
      var u = G(this._fragmentFiber) ? t.parentElement : a;
      if (u == null) return Node.DOCUMENT_POSITION_DISCONNECTED;
      ((a = u.compareDocumentPosition(t) & Node.DOCUMENT_POSITION_CONTAINED_BY),
        (u =
          u.compareDocumentPosition(n) & Node.DOCUMENT_POSITION_CONTAINED_BY));
      var c = t.compareDocumentPosition(l),
        o = n.compareDocumentPosition(l),
        h =
          c & Node.DOCUMENT_POSITION_CONTAINED_BY ||
          o & Node.DOCUMENT_POSITION_CONTAINED_BY;
      return (
        (o =
          a &&
          u &&
          c & Node.DOCUMENT_POSITION_FOLLOWING &&
          o & Node.DOCUMENT_POSITION_PRECEDING),
        (t =
          (a && t === l) || (u && n === l) || h || o
            ? Node.DOCUMENT_POSITION_CONTAINED_BY
            : (!a && t === l) || (!u && n === l)
              ? Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC
              : c),
        t & Node.DOCUMENT_POSITION_DISCONNECTED ||
        t & Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC ||
        $1(t, this._fragmentFiber, e[0], e[e.length - 1], l)
          ? t
          : Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC
      );
    }));
  function $1(l, t, e, a, n) {
    var u = ua(n);
    if (l & Node.DOCUMENT_POSITION_CONTAINED_BY) {
      if ((e = !!u))
        l: {
          for (; u !== null; ) {
            if (u.tag === 7 && (u === t || u.alternate === t)) {
              e = !0;
              break l;
            }
            u = u.return;
          }
          e = !1;
        }
      return e;
    }
    if (l & Node.DOCUMENT_POSITION_CONTAINS) {
      if (u === null)
        return (
          (u = n.ownerDocument),
          n === u || n === u.documentElement || n === u.body
        );
      l: {
        for (u = t, t = Q(t); u !== null; ) {
          if (
            !(
              (u.tag !== 5 && u.tag !== 3 && u.tag !== 27) ||
              (u !== t && u.alternate !== t)
            )
          ) {
            u = !0;
            break l;
          }
          u = u.return;
        }
        u = !1;
      }
      return u;
    }
    return l & Node.DOCUMENT_POSITION_PRECEDING
      ? ((t = !!u) &&
          !(t = u === e) &&
          ((t = ol(e, u, Dl)),
          t === null
            ? (t = !1)
            : (E(t, !0, Fl, u, e), (u = rl), (rl = null), (t = u !== null))),
        t)
      : l & Node.DOCUMENT_POSITION_FOLLOWING
        ? ((t = !!u) &&
            !(t = u === a) &&
            ((t = ol(a, u, Dl)),
            t === null
              ? (t = !1)
              : (E(t, !0, vl, u, a),
                (u = rl),
                (Rl = rl = null),
                (t = u !== null))),
          t)
        : !1;
  }
  function Q0(l, t) {
    var e = l.ownerDocument.createRange();
    (e.selectNodeContents(l),
      (l = e.getBoundingClientRect()),
      window.scrollTo(
        window.scrollX + l.left,
        t
          ? window.scrollY + l.top
          : window.scrollY + l.bottom - window.innerHeight,
      ));
  }
  zt.prototype.scrollIntoView = function (l) {
    if (typeof l == "object") throw Error(r(566));
    var t = [];
    E(this._fragmentFiber.child, !1, vf, t, void 0, void 0);
    var e = l !== !1;
    if (t.length === 0) {
      var a = Z(this._fragmentFiber);
      if (
        ((a = e ? a[1] || a[0] || Q(this._fragmentFiber) : a[0] || a[1]),
        a === null)
      )
        return;
      if (a.tag === 6) {
        ((l = K(a)), Q0(l, e));
        return;
      }
      if (((a = K(a)), a.nodeType !== 9)) {
        if (a.nodeType === 11) {
          ((e = "host" in a ? a.host : null),
            e !== null && e.scrollIntoView(l));
          return;
        }
        a.scrollIntoView(l);
      }
    }
    for (a = e ? t.length - 1 : 0; a !== (e ? -1 : t.length); ) {
      var n = t[a];
      (n.tag === 6 ? ((n = K(n)), Q0(n, e)) : K(n).scrollIntoView(l),
        (a += e ? -1 : 1));
    }
  };
  function I1(l, t) {
    return ((l = K(l)), H0(l, t), !1);
  }
  function H0(l, t) {
    (l.reactFragments == null && (l.reactFragments = new Set()),
      l.reactFragments.add(t));
  }
  function B0(l, t) {
    var e = t._eventListeners;
    if (e !== null)
      for (var a = 0; a < e.length; a++) {
        var n = e[a];
        l.addEventListener(
          n.type,
          n.attachedListener,
          hn(n.optionsOrUseCapture),
        );
      }
    l.nodeType !== 3 &&
      ((e = t._observers),
      e !== null &&
        e.forEach(function (u) {
          for (var c = 0, o = 0; o < Jt.length; o++) {
            var h = Jt[o];
            (h.fragmentInstance !== t ||
              h.observer !== u ||
              h.instance !== l) &&
              (Jt[c++] = h);
          }
          ((Jt.length = c), u.observe(l));
        }),
      H0(l, t));
  }
  function P1(l, t) {
    var e = t._eventListeners;
    if (e !== null)
      for (var a = 0; a < e.length; a++) {
        var n = e[a];
        l.removeEventListener(
          n.type,
          n.attachedListener,
          hn(n.optionsOrUseCapture),
        );
      }
    l.nodeType !== 3 &&
      ((e = t._observers),
      e !== null &&
        e.forEach(function (u) {
          typeof u.rootMargin == "string" ? W1(t, u, l) : u.unobserve(l);
        }),
      l.reactFragments != null && l.reactFragments.delete(t));
  }
  function pf(l) {
    var t = l.firstChild;
    for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
      var e = t;
      switch (((t = t.nextSibling), e.nodeName)) {
        case "HTML":
        case "HEAD":
        case "BODY":
          (pf(e), Cu(e));
          continue;
        case "SCRIPT":
        case "STYLE":
          continue;
        case "LINK":
          if (e.rel.toLowerCase() === "stylesheet") continue;
      }
      l.removeChild(e);
    }
  }
  function lm(l, t, e, a) {
    for (; l.nodeType === 1; ) {
      var n = e;
      if (l.nodeName.toLowerCase() !== t.toLowerCase()) {
        if (!a && (l.nodeName !== "INPUT" || l.type !== "hidden")) break;
      } else if (a) {
        if (!l[Tn])
          switch (t) {
            case "meta":
              if (!l.hasAttribute("itemprop")) break;
              return l;
            case "link":
              if (
                ((u = l.getAttribute("rel")),
                u === "stylesheet" && l.hasAttribute("data-precedence"))
              )
                break;
              if (
                u !== n.rel ||
                l.getAttribute("href") !==
                  (n.href == null || n.href === "" ? null : n.href) ||
                l.getAttribute("crossorigin") !==
                  (n.crossOrigin == null ? null : n.crossOrigin) ||
                l.getAttribute("title") !== (n.title == null ? null : n.title)
              )
                break;
              return l;
            case "style":
              if (l.hasAttribute("data-precedence")) break;
              return l;
            case "script":
              if (
                ((u = l.getAttribute("src")),
                (u !== (n.src == null ? null : n.src) ||
                  l.getAttribute("type") !== (n.type == null ? null : n.type) ||
                  l.getAttribute("crossorigin") !==
                    (n.crossOrigin == null ? null : n.crossOrigin)) &&
                  u &&
                  l.hasAttribute("async") &&
                  !l.hasAttribute("itemprop"))
              )
                break;
              return l;
            default:
              return l;
          }
      } else if (t === "input" && l.type === "hidden") {
        var u = n.name == null ? null : "" + n.name;
        if (n.type === "hidden" && l.getAttribute("name") === u) return l;
      } else return l;
      if (((l = qt(l.nextSibling)), l === null)) break;
    }
    return null;
  }
  function tm(l, t, e) {
    if (t === "") return null;
    for (; l.nodeType !== 3; )
      if (
        ((l.nodeType !== 1 || l.nodeName !== "INPUT" || l.type !== "hidden") &&
          !e) ||
        ((l = qt(l.nextSibling)), l === null)
      )
        return null;
    return l;
  }
  function q0(l, t) {
    for (; l.nodeType !== 8; )
      if (
        ((l.nodeType !== 1 || l.nodeName !== "INPUT" || l.type !== "hidden") &&
          !t) ||
        ((l = qt(l.nextSibling)), l === null)
      )
        return null;
    return l;
  }
  function jf(l) {
    return l.data === "$?" || l.data === "$~";
  }
  function bf(l) {
    return (
      l.data === "$!" ||
      (l.data === "$?" && l.ownerDocument.readyState !== "loading")
    );
  }
  function em(l, t) {
    var e = l.ownerDocument;
    if (l.data === "$~") l._reactRetry = t;
    else if (l.data !== "$?" || e.readyState !== "loading") t();
    else {
      var a = function () {
        (t(), e.removeEventListener("DOMContentLoaded", a));
      };
      (e.addEventListener("DOMContentLoaded", a), (l._reactRetry = a));
    }
  }
  function qt(l) {
    for (; l != null; l = l.nextSibling) {
      var t = l.nodeType;
      if (t === 1 || t === 3) break;
      if (t === 8) {
        if (
          ((t = l.data),
          t === "$" ||
            t === "$!" ||
            t === "$?" ||
            t === "$~" ||
            t === "&" ||
            t === "F!" ||
            t === "F")
        )
          break;
        if (t === "/$" || t === "/&") return null;
      }
    }
    return l;
  }
  var Sf = null;
  function G0(l) {
    l = l.nextSibling;
    for (var t = 0; l; ) {
      if (l.nodeType === 8) {
        var e = l.data;
        if (e === "/$" || e === "/&") {
          if (t === 0) return qt(l.nextSibling);
          t--;
        } else
          (e !== "$" && e !== "$!" && e !== "$?" && e !== "$~" && e !== "&") ||
            t++;
      }
      l = l.nextSibling;
    }
    return null;
  }
  function Y0(l) {
    l = l.previousSibling;
    for (var t = 0; l; ) {
      if (l.nodeType === 8) {
        var e = l.data;
        if (e === "$" || e === "$!" || e === "$?" || e === "$~" || e === "&") {
          if (t === 0) return l;
          t--;
        } else (e !== "/$" && e !== "/&") || t++;
      }
      l = l.previousSibling;
    }
    return null;
  }
  function am(l, t) {
    function e() {
      a = !0;
    }
    if (l.ownerDocument.activeElement === l) return !0;
    var a = !1;
    try {
      (l.ownerDocument.addEventListener("focus", e, !0),
        (l.focus || HTMLElement.prototype.focus).call(l, t));
    } finally {
      l.ownerDocument.removeEventListener("focus", e, !0);
    }
    return a;
  }
  function nm(l) {
    C0(function () {
      C0(function (t) {
        return l(t);
      });
    });
  }
  function Z0(l, t, e) {
    switch (((t = cu(e)), l)) {
      case "html":
        if (((l = t.documentElement), !l)) throw Error(r(452));
        return l;
      case "head":
        if (((l = t.head), !l)) throw Error(r(453));
        return l;
      case "body":
        if (((l = t.body), !l)) throw Error(r(454));
        return l;
      default:
        throw Error(r(451));
    }
  }
  function w0(l, t, e) {
    for (var a in e) {
      var n = e[a];
      e.hasOwnProperty(a) && n != null && Nl(l, t, a, null, U1, n);
    }
    (e.dangerouslySetInnerHTML != null && (l.textContent = ""),
      l.onclick === It && (l.onclick = null),
      Cu(l));
  }
  function Ef(l) {
    for (var t = l.attributes; t.length; ) l.removeAttributeNode(t[0]);
    Cu(l);
  }
  var Gt = new Map(),
    X0 = new Set();
  function su(l) {
    if (typeof l.getRootNode == "function") {
      var t = l.getRootNode();
      if (t.nodeType === 9 || t.nodeType === 11) return t;
    }
    return l.nodeType === 9 ? l : l.ownerDocument;
  }
  var Te = ll.d;
  ll.d = { f: um, r: im, D: cm, C: sm, L: fm, m: om, X: dm, S: rm, M: hm };
  function um() {
    var l = Te.f(),
      t = Oi();
    return l || t;
  }
  function im(l) {
    var t = _a(l);
    t !== null && t.tag === 5 && t.type === "form" ? kr(t) : Te.r(l);
  }
  var mn = typeof document > "u" ? null : document;
  function V0(l, t, e) {
    var a = mn;
    if (a && typeof t == "string" && t) {
      var n = Dt(t);
      ((n = 'link[rel="' + l + '"][href="' + n + '"]'),
        typeof e == "string" && (n += '[crossorigin="' + e + '"]'),
        X0.has(n) ||
          (X0.add(n),
          (l = { rel: l, crossOrigin: e, href: t }),
          a.querySelector(n) === null &&
            ((t = a.createElement("link")),
            at(t, "link", l),
            Vl(t),
            a.head.appendChild(t))));
    }
  }
  function cm(l) {
    (Te.D(l), V0("dns-prefetch", l, null));
  }
  function sm(l, t) {
    (Te.C(l, t), V0("preconnect", l, t));
  }
  function fm(l, t, e) {
    Te.L(l, t, e);
    var a = mn;
    if (a && l && t) {
      var n = 'link[rel="preload"][as="' + Dt(t) + '"]';
      t === "image" && e && e.imageSrcSet
        ? ((n += '[imagesrcset="' + Dt(e.imageSrcSet) + '"]'),
          typeof e.imageSizes == "string" &&
            (n += '[imagesizes="' + Dt(e.imageSizes) + '"]'))
        : (n += '[href="' + Dt(l) + '"]');
      var u = n;
      switch (t) {
        case "style":
          u = yn(l);
          break;
        case "script":
          u = gn(l);
      }
      if (
        !(
          Gt.has(u) ||
          ((l = el(
            {
              rel: "preload",
              href: t === "image" && e && e.imageSrcSet ? void 0 : l,
              as: t,
            },
            e,
          )),
          Gt.set(u, l),
          a.querySelector(n) !== null ||
            (t === "style" && a.querySelector(fu(u))) ||
            (t === "script" && a.querySelector(ou(u))))
        )
      ) {
        var c = a.createElement("link");
        (at(c, "link", l),
          t === "style" &&
            ((c[Mu] = !0),
            (c.onload = c.onerror =
              function () {
                ao(c);
              })),
          Vl(c),
          a.head.appendChild(c));
      }
    }
  }
  function om(l, t) {
    Te.m(l, t);
    var e = mn;
    if (e && l) {
      var a = t && typeof t.as == "string" ? t.as : "script",
        n =
          'link[rel="modulepreload"][as="' + Dt(a) + '"][href="' + Dt(l) + '"]',
        u = n;
      switch (a) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          u = gn(l);
      }
      if (
        !Gt.has(u) &&
        ((l = el({ rel: "modulepreload", href: l }, t)),
        Gt.set(u, l),
        e.querySelector(n) === null)
      ) {
        switch (a) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (e.querySelector(ou(u))) return;
        }
        ((a = e.createElement("link")),
          at(a, "link", l),
          Vl(a),
          e.head.appendChild(a));
      }
    }
  }
  function rm(l, t, e) {
    Te.S(l, t, e);
    var a = mn;
    if (a && l) {
      var n = Da(a).hoistableStyles,
        u = yn(l);
      t = t || "default";
      var c = n.get(u);
      if (!c) {
        var o = { loading: 0, preload: null };
        if ((c = a.querySelector(fu(u)))) o.loading = 5;
        else {
          ((l = el({ rel: "stylesheet", href: l, "data-precedence": t }, e)),
            (e = Gt.get(u)) && Nf(l, e));
          var h = (c = a.createElement("link"));
          (Vl(h),
            at(h, "link", l),
            (h._p = new Promise(function (p, N) {
              ((h.onload = p), (h.onerror = N));
            })),
            h.addEventListener("load", function () {
              o.loading |= 1;
            }),
            h.addEventListener("error", function () {
              o.loading |= 2;
            }),
            (o.loading |= 4),
            Hi(c, t, a));
        }
        ((c = { type: "stylesheet", instance: c, count: 1, state: o }),
          n.set(u, c));
      }
    }
  }
  function dm(l, t) {
    Te.X(l, t);
    var e = mn;
    if (e && l) {
      var a = Da(e).hoistableScripts,
        n = gn(l),
        u = a.get(n);
      u ||
        ((u = e.querySelector(ou(n))),
        u ||
          ((l = el({ src: l, async: !0 }, t)),
          (t = Gt.get(n)) && Tf(l, t),
          (u = e.createElement("script")),
          Vl(u),
          at(u, "link", l),
          e.head.appendChild(u)),
        (u = { type: "script", instance: u, count: 1, state: null }),
        a.set(n, u));
    }
  }
  function hm(l, t) {
    Te.M(l, t);
    var e = mn;
    if (e && l) {
      var a = Da(e).hoistableScripts,
        n = gn(l),
        u = a.get(n);
      u ||
        ((u = e.querySelector(ou(n))),
        u ||
          ((l = el({ src: l, async: !0, type: "module" }, t)),
          (t = Gt.get(n)) && Tf(l, t),
          (u = e.createElement("script")),
          Vl(u),
          at(u, "link", l),
          e.head.appendChild(u)),
        (u = { type: "script", instance: u, count: 1, state: null }),
        a.set(n, u));
    }
  }
  function k0(l, t, e, a) {
    var n = (n = Ce.current) ? su(n) : null;
    if (!n) throw Error(r(446));
    switch (l) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof e.precedence == "string" && typeof e.href == "string"
          ? ((e = yn(e.href)),
            (t = Da(n).hoistableStyles),
            (a = t.get(e)),
            a ||
              ((a = { type: "style", instance: null, count: 0, state: null }),
              t.set(e, a)),
            a)
          : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (
          e.rel === "stylesheet" &&
          typeof e.href == "string" &&
          typeof e.precedence == "string"
        ) {
          l = yn(e.href);
          var u = Da(n).hoistableStyles,
            c = u.get(l);
          if (
            (c ||
              ((n = n.ownerDocument || n),
              (c = {
                type: "stylesheet",
                instance: null,
                count: 0,
                state: { loading: 0, preload: null },
              }),
              u.set(l, c),
              (u = n.querySelector(fu(l)))
                ? u._p || ((c.instance = u), (c.state.loading = 5))
                : ((u = Gt.get(l)),
                  u ||
                    ((u = {
                      rel: "preload",
                      as: "style",
                      href: e.href,
                      crossOrigin: e.crossOrigin,
                      integrity: e.integrity,
                      media: e.media,
                      hrefLang: e.hrefLang,
                      referrerPolicy: e.referrerPolicy,
                    }),
                    Gt.set(l, u)),
                  mm(n, l, u, c.state))),
            t && a === null)
          )
            throw Error(r(528, ""));
          return c;
        }
        if (t && a !== null) throw Error(r(529, ""));
        return null;
      case "script":
        return (
          (t = e.async),
          (e = e.src),
          typeof e == "string" &&
          t &&
          typeof t != "function" &&
          typeof t != "symbol"
            ? ((e = gn(e)),
              (t = Da(n).hoistableScripts),
              (a = t.get(e)),
              a ||
                ((a = {
                  type: "script",
                  instance: null,
                  count: 0,
                  state: null,
                }),
                t.set(e, a)),
              a)
            : { type: "void", instance: null, count: 0, state: null }
        );
      default:
        throw Error(r(444, l));
    }
  }
  function yn(l) {
    return 'href="' + Dt(l) + '"';
  }
  function fu(l) {
    return 'link[rel="stylesheet"][' + l + "]";
  }
  function K0(l) {
    return el({}, l, { "data-precedence": l.precedence, precedence: null });
  }
  function mm(l, t, e, a) {
    if ((t = l.querySelector('link[rel="preload"][as="style"][' + t + "]"))) {
      if (t[Mu] !== !0) {
        a.loading = 1;
        return;
      }
    } else
      ((t = l.createElement("link")),
        (t[Mu] = !0),
        (t.onload = t.onerror = ao.bind(null, t)),
        at(t, "link", e),
        Vl(t),
        l.head.appendChild(t));
    ((a.preload = t),
      t.addEventListener("load", function () {
        return (a.loading |= 1);
      }),
      t.addEventListener("error", function () {
        return (a.loading |= 2);
      }));
  }
  function gn(l) {
    return '[src="' + Dt(l) + '"]';
  }
  function ou(l) {
    return "script[async]" + l;
  }
  function J0(l, t, e) {
    if ((t.count++, t.instance === null))
      switch (t.type) {
        case "style":
          var a = l.querySelector('style[data-href~="' + Dt(e.href) + '"]');
          if (a) return ((t.instance = a), Vl(a), a);
          var n = el({}, e, {
            "data-href": e.href,
            "data-precedence": e.precedence,
            href: null,
            precedence: null,
          });
          return (
            (a = (l.ownerDocument || l).createElement("style")),
            Vl(a),
            at(a, "style", n),
            Hi(a, e.precedence, l),
            (t.instance = a)
          );
        case "stylesheet":
          n = yn(e.href);
          var u = l.querySelector(fu(n));
          if (u) return ((t.state.loading |= 4), (t.instance = u), Vl(u), u);
          ((a = K0(e)),
            (n = Gt.get(n)) && Nf(a, n),
            (u = (l.ownerDocument || l).createElement("link")),
            Vl(u));
          var c = u;
          return (
            (c._p = new Promise(function (o, h) {
              ((c.onload = o), (c.onerror = h));
            })),
            at(u, "link", a),
            (t.state.loading |= 4),
            Hi(u, e.precedence, l),
            (t.instance = u)
          );
        case "script":
          return (
            (u = gn(e.src)),
            (n = l.querySelector(ou(u)))
              ? ((t.instance = n), Vl(n), n)
              : ((a = e),
                (n = Gt.get(u)) && ((a = el({}, e)), Tf(a, n)),
                (l = l.ownerDocument || l),
                (n = l.createElement("script")),
                Vl(n),
                at(n, "link", a),
                l.head.appendChild(n),
                (t.instance = n))
          );
        case "void":
          return null;
        default:
          throw Error(r(443, t.type));
      }
    else
      t.type === "stylesheet" &&
        (t.state.loading & 4) === 0 &&
        ((a = t.instance), (t.state.loading |= 4), Hi(a, e.precedence, l));
    return t.instance;
  }
  function Hi(l, t, e) {
    for (
      var a = e.querySelectorAll(
          'link[rel="stylesheet"][data-precedence],style[data-precedence]',
        ),
        n = a.length ? a[a.length - 1] : null,
        u = n,
        c = 0;
      c < a.length;
      c++
    ) {
      var o = a[c];
      if (o.dataset.precedence === t) u = o;
      else if (u !== n) break;
    }
    u
      ? u.parentNode.insertBefore(l, u.nextSibling)
      : ((t = e.nodeType === 9 ? e.head : e), t.insertBefore(l, t.firstChild));
  }
  function Nf(l, t) {
    (l.crossOrigin == null && (l.crossOrigin = t.crossOrigin),
      l.referrerPolicy == null && (l.referrerPolicy = t.referrerPolicy),
      l.title == null && (l.title = t.title));
  }
  function Tf(l, t) {
    (l.crossOrigin == null && (l.crossOrigin = t.crossOrigin),
      l.referrerPolicy == null && (l.referrerPolicy = t.referrerPolicy),
      l.integrity == null && (l.integrity = t.integrity));
  }
  var Bi = null;
  function W0(l, t, e) {
    if (Bi === null) {
      var a = new Map(),
        n = (Bi = new Map());
      n.set(e, a);
    } else ((n = Bi), (a = n.get(e)), a || ((a = new Map()), n.set(e, a)));
    if (a.has(l)) return a;
    for (
      a.set(l, null), e = e.getElementsByTagName(l), n = 0;
      n < e.length;
      n++
    ) {
      var u = e[n];
      if (
        !(
          u[Tn] ||
          u[Il] ||
          (l === "link" && u.getAttribute("rel") === "stylesheet")
        ) &&
        u.namespaceURI !== "http://www.w3.org/2000/svg"
      ) {
        var c = u.getAttribute(t) || "";
        c = l + c;
        var o = a.get(c);
        o ? o.push(u) : a.set(c, [u]);
      }
    }
    return a;
  }
  function Mf(l, t, e) {
    ((l = l.ownerDocument || l),
      l.head.insertBefore(
        e,
        t === "title" ? l.querySelector("head > title") : null,
      ));
  }
  function ym(l, t, e) {
    if (e === 1 || t.itemProp != null) return !1;
    switch (l) {
      case "meta":
      case "title":
        return !0;
      case "style":
        if (
          typeof t.precedence != "string" ||
          typeof t.href != "string" ||
          t.href === ""
        )
          break;
        return !0;
      case "link":
        if (
          typeof t.rel != "string" ||
          typeof t.href != "string" ||
          t.href === "" ||
          t.onLoad ||
          t.onError
        )
          break;
        return t.rel === "stylesheet"
          ? ((l = t.disabled), typeof t.precedence == "string" && l == null)
          : !0;
      case "script":
        if (
          t.async &&
          typeof t.async != "function" &&
          typeof t.async != "symbol" &&
          !t.onLoad &&
          !t.onError &&
          t.src &&
          typeof t.src == "string"
        )
          return !0;
    }
    return !1;
  }
  function F0(l, t) {
    return (
      l === "img" &&
      t.src != null &&
      t.src !== "" &&
      t.onLoad == null &&
      t.loading !== "lazy"
    );
  }
  function $0(l) {
    return !(l.type === "stylesheet" && (l.state.loading & 3) === 0);
  }
  function I0(l) {
    return (
      (l.width || 100) *
      (l.height || 100) *
      (typeof devicePixelRatio == "number" ? devicePixelRatio : 1) *
      0.25
    );
  }
  function P0(l, t) {
    typeof t.decode == "function" &&
      (l.imgCount++,
      t.complete || ((l.imgBytes += I0(t)), l.suspenseyImages.push(t)),
      (l = xm.bind(l)),
      t.decode().then(l, l));
  }
  function gm(l, t, e, a) {
    if (
      e.type === "stylesheet" &&
      (typeof a.media != "string" || matchMedia(a.media).matches !== !1) &&
      (e.state.loading & 4) === 0
    ) {
      if (e.instance === null) {
        var n = yn(a.href),
          u = t.querySelector(fu(n));
        if (u) {
          ((t = u._p),
            t !== null &&
              typeof t == "object" &&
              typeof t.then == "function" &&
              (l.count++, (l = ru.bind(l)), t.then(l, l)),
            (e.state.loading |= 4),
            (e.instance = u),
            Vl(u));
          return;
        }
        ((u = t.ownerDocument || t),
          (a = K0(a)),
          (n = Gt.get(n)) && Nf(a, n),
          (u = u.createElement("link")),
          Vl(u));
        var c = u;
        ((c._p = new Promise(function (o, h) {
          ((c.onload = o), (c.onerror = h));
        })),
          at(u, "link", a),
          (e.instance = u));
      }
      (l.stylesheets === null && (l.stylesheets = new Map()),
        l.stylesheets.set(e, t),
        (t = e.state.preload) &&
          (e.state.loading & 3) === 0 &&
          (l.count++,
          (e = ru.bind(l)),
          t.addEventListener("load", e),
          t.addEventListener("error", e)));
    }
  }
  var qi = 0;
  function vm(l, t) {
    return (
      l.stylesheets && l.count === 0 && Yi(l, l.stylesheets),
      0 < l.count || 0 < l.imgCount
        ? function (e) {
            var a = setTimeout(function () {
              if ((l.stylesheets && Yi(l, l.stylesheets), l.unsuspend)) {
                var u = l.unsuspend;
                ((l.unsuspend = null), u());
              }
            }, 6e4 + t);
            0 < l.imgBytes && qi === 0 && (qi = 62500 * L1());
            var n = setTimeout(
              function () {
                if (
                  ((l.waitingForImages = !1),
                  l.count === 0 &&
                    (l.stylesheets && Yi(l, l.stylesheets), l.unsuspend))
                ) {
                  var u = l.unsuspend;
                  ((l.unsuspend = null), u());
                }
              },
              (l.imgBytes > qi ? 50 : 800) + t,
            );
            return (
              (l.unsuspend = e),
              function () {
                ((l.unsuspend = null), clearTimeout(a), clearTimeout(n));
              }
            );
          }
        : null
    );
  }
  function l2(l) {
    if (l.count === 0 && (l.imgCount === 0 || !l.waitingForImages)) {
      if (l.stylesheets) Yi(l, l.stylesheets);
      else if (l.unsuspend) {
        var t = l.unsuspend;
        ((l.unsuspend = null), t());
      }
    }
  }
  function ru() {
    (this.count--, l2(this));
  }
  function xm() {
    (this.imgCount--, l2(this));
  }
  var Gi = null;
  function Yi(l, t) {
    ((l.stylesheets = null),
      l.unsuspend !== null &&
        (l.count++,
        (Gi = new Map()),
        t.forEach(pm, l),
        (Gi = null),
        ru.call(l)));
  }
  function pm(l, t) {
    if (!(t.state.loading & 4)) {
      var e = Gi.get(l);
      if (e) var a = e.get(null);
      else {
        ((e = new Map()), Gi.set(l, e));
        for (
          var n = l.querySelectorAll(
              "link[data-precedence],style[data-precedence]",
            ),
            u = 0;
          u < n.length;
          u++
        ) {
          var c = n[u];
          (c.nodeName === "LINK" || c.getAttribute("media") !== "not all") &&
            (e.set(c.dataset.precedence, c), (a = c));
        }
        a && e.set(null, a);
      }
      ((n = t.instance),
        (c = n.getAttribute("data-precedence")),
        (u = e.get(c) || a),
        u === a && e.set(null, n),
        e.set(c, n),
        this.count++,
        (a = ru.bind(this)),
        n.addEventListener("load", a),
        n.addEventListener("error", a),
        u
          ? u.parentNode.insertBefore(n, u.nextSibling)
          : ((l = l.nodeType === 9 ? l.head : l),
            l.insertBefore(n, l.firstChild)),
        (t.state.loading |= 4));
    }
  }
  var vn = {
    $$typeof: Xl,
    Provider: null,
    Consumer: null,
    _currentValue: oe,
    _currentValue2: oe,
    _threadCount: 0,
  };
  function jm(l, t, e, a, n, u, c, o, h) {
    ((this.tag = 1),
      (this.containerInfo = l),
      (this.pingCache = this.current = this.pendingChildren = null),
      (this.timeoutHandle = -1),
      (this.callbackNode =
        this.next =
        this.pendingContext =
        this.context =
        this.cancelPendingCommit =
          null),
      (this.callbackPriority = 0),
      (this.expirationTimes = uc(-1)),
      (this.entangledLanes =
        this.shellSuspendCounter =
        this.errorRecoveryDisabledLanes =
        this.expiredLanes =
        this.warmLanes =
        this.pingedLanes =
        this.suspendedLanes =
        this.pendingLanes =
          0),
      (this.entanglements = uc(0)),
      (this.hiddenUpdates = uc(null)),
      (this.identifierPrefix = a),
      (this.onUncaughtError = n),
      (this.onCaughtError = u),
      (this.onRecoverableError = c),
      (this.pooledCache = null),
      (this.pooledCacheLanes = 0),
      (this.formState = h),
      (this.transitionTypes = null),
      (this.incompleteTransitions = new Map()));
  }
  function t2(l, t, e, a, n, u, c, o, h, p, N, C) {
    return (
      (l = new jm(l, t, e, c, h, p, N, C, o)),
      (t = 1),
      u === !0 && (t |= 24),
      (u = dt(3, null, null, t)),
      (l.current = u),
      (u.stateNode = l),
      (t = Gc()),
      t.refCount++,
      (l.pooledCache = t),
      t.refCount++,
      (u.memoizedState = { element: a, isDehydrated: e, cache: t }),
      Xc(u),
      l
    );
  }
  function e2(l) {
    return l ? ((l = Za), l) : Za;
  }
  function a2(l, t, e, a, n, u) {
    ((n = e2(n)),
      a.context === null ? (a.context = n) : (a.pendingContext = n),
      (a = Be(t)),
      (a.payload = { element: e }),
      (u = u === void 0 ? null : u),
      u !== null && (a.callback = u),
      (e = qe(l, a, t)),
      e !== null && (gt(e, l, t), Zn(e, l, t)));
  }
  function n2(l, t) {
    if (((l = l.memoizedState), l !== null && l.dehydrated !== null)) {
      var e = l.retryLane;
      l.retryLane = e !== 0 && e < t ? e : t;
    }
  }
  function Cf(l, t) {
    (n2(l, t), (l = l.alternate) && n2(l, t));
  }
  function u2(l) {
    if (l.tag === 13 || l.tag === 31) {
      var t = fa(l, 67108864);
      (t !== null && gt(t, l, 67108864), Cf(l, 67108864));
    }
  }
  function i2(l) {
    if (l.tag === 13 || l.tag === 31) {
      var t = Ct();
      t = ic(t);
      var e = fa(l, t);
      (e !== null && gt(e, l, t), Cf(l, t));
    }
  }
  var xn = !0;
  function bm(l, t, e, a) {
    var n = V.T;
    V.T = null;
    var u = ll.p;
    try {
      ((ll.p = 2), zf(l, t, e, a));
    } finally {
      ((ll.p = u), (V.T = n));
    }
  }
  function Sm(l, t, e, a) {
    var n = V.T;
    V.T = null;
    var u = ll.p;
    try {
      ((ll.p = 8), zf(l, t, e, a));
    } finally {
      ((ll.p = u), (V.T = n));
    }
  }
  function zf(l, t, e, a) {
    if (xn) {
      var n = Af(a);
      if (n === null) (ff(l, t, a, Zi, e), s2(l, a));
      else if (Nm(n, l, t, e, a)) a.stopPropagation();
      else if ((s2(l, a), t & 4 && -1 < Em.indexOf(l))) {
        for (; n !== null; ) {
          var u = _a(n);
          if (u !== null)
            switch (u.tag) {
              case 3:
                if (((u = u.stateNode), u.current.memoizedState.isDehydrated)) {
                  var c = na(u.pendingLanes);
                  if (c !== 0) {
                    var o = u;
                    for (o.pendingLanes |= 2, o.entangledLanes |= 2; c; ) {
                      var h = 1 << (31 - jt(c));
                      ((o.entanglements[1] |= h), (c &= ~h));
                    }
                    (se(u), (pl & 6) === 0 && ((Ci = xt() + 500), nu(0)));
                  }
                }
                break;
              case 31:
              case 13:
                ((o = fa(u, 2)), o !== null && gt(o, u, 2), Oi(), Cf(u, 2));
            }
          if (((u = Af(a)), u === null && ff(l, t, a, Zi, e), u === n)) break;
          n = u;
        }
        n !== null && a.stopPropagation();
      } else ff(l, t, a, null, e);
    }
  }
  function Af(l) {
    return ((l = hc(l)), Of(l));
  }
  var Zi = null;
  function Of(l) {
    if (((Zi = null), (l = ua(l)), l !== null)) {
      var t = g(l);
      if (t === null) l = null;
      else {
        var e = t.tag;
        if (e === 13) {
          if (((l = O(t)), l !== null)) return l;
          l = null;
        } else if (e === 31) {
          if (((l = D(t)), l !== null)) return l;
          l = null;
        } else if (e === 3) {
          if (t.stateNode.current.memoizedState.isDehydrated)
            return t.tag === 3 ? t.stateNode.containerInfo : null;
          l = null;
        } else t !== l && (l = null);
      }
    }
    return ((Zi = l), null);
  }
  function c2(l) {
    switch (l) {
      case "beforetoggle":
      case "cancel":
      case "click":
      case "close":
      case "contextmenu":
      case "copy":
      case "cut":
      case "auxclick":
      case "dblclick":
      case "dragend":
      case "dragstart":
      case "drop":
      case "focusin":
      case "focusout":
      case "input":
      case "invalid":
      case "keydown":
      case "keypress":
      case "keyup":
      case "mousedown":
      case "mouseup":
      case "paste":
      case "pause":
      case "play":
      case "pointercancel":
      case "pointerdown":
      case "pointerup":
      case "ratechange":
      case "reset":
      case "seeked":
      case "submit":
      case "toggle":
      case "touchcancel":
      case "touchend":
      case "touchstart":
      case "volumechange":
      case "change":
      case "selectionchange":
      case "textInput":
      case "compositionstart":
      case "compositionend":
      case "compositionupdate":
      case "beforeblur":
      case "afterblur":
      case "beforeinput":
      case "blur":
      case "fullscreenchange":
      case "fullscreenerror":
      case "focus":
      case "hashchange":
      case "popstate":
      case "select":
      case "selectstart":
        return 2;
      case "drag":
      case "dragenter":
      case "dragexit":
      case "dragleave":
      case "dragover":
      case "mousemove":
      case "mouseout":
      case "mouseover":
      case "pointermove":
      case "pointerout":
      case "pointerover":
      case "resize":
      case "scroll":
      case "touchmove":
      case "wheel":
      case "mouseenter":
      case "mouseleave":
      case "pointerenter":
      case "pointerleave":
        return 8;
      case "message":
        switch (L2()) {
          case Vf:
            return 2;
          case kf:
            return 8;
          case bu:
          case Q2:
            return 32;
          case Kf:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var _f = !1,
    $e = null,
    Ie = null,
    Pe = null,
    du = new Map(),
    hu = new Map(),
    la = [],
    Em =
      "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
        " ",
      );
  function s2(l, t) {
    switch (l) {
      case "focusin":
      case "focusout":
        $e = null;
        break;
      case "dragenter":
      case "dragleave":
        Ie = null;
        break;
      case "mouseover":
      case "mouseout":
        Pe = null;
        break;
      case "pointerover":
      case "pointerout":
        du.delete(t.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        hu.delete(t.pointerId);
    }
  }
  function mu(l, t, e, a, n, u) {
    return l === null || l.nativeEvent !== u
      ? ((l = {
          blockedOn: t,
          domEventName: e,
          eventSystemFlags: a,
          nativeEvent: u,
          targetContainers: [n],
        }),
        t !== null && ((t = _a(t)), t !== null && u2(t)),
        l)
      : ((l.eventSystemFlags |= a),
        (t = l.targetContainers),
        n !== null && t.indexOf(n) === -1 && t.push(n),
        l);
  }
  function Nm(l, t, e, a, n) {
    switch (t) {
      case "focusin":
        return (($e = mu($e, l, t, e, a, n)), !0);
      case "dragenter":
        return ((Ie = mu(Ie, l, t, e, a, n)), !0);
      case "mouseover":
        return ((Pe = mu(Pe, l, t, e, a, n)), !0);
      case "pointerover":
        var u = n.pointerId;
        return (du.set(u, mu(du.get(u) || null, l, t, e, a, n)), !0);
      case "gotpointercapture":
        return (
          (u = n.pointerId),
          hu.set(u, mu(hu.get(u) || null, l, t, e, a, n)),
          !0
        );
    }
    return !1;
  }
  function f2(l) {
    var t = ua(l.target);
    if (t !== null) {
      var e = g(t);
      if (e !== null) {
        if (((t = e.tag), t === 13)) {
          if (((t = O(e)), t !== null)) {
            ((l.blockedOn = t),
              lo(l.priority, function () {
                i2(e);
              }));
            return;
          }
        } else if (t === 31) {
          if (((t = D(e)), t !== null)) {
            ((l.blockedOn = t),
              lo(l.priority, function () {
                i2(e);
              }));
            return;
          }
        } else if (t === 3 && e.stateNode.current.memoizedState.isDehydrated) {
          l.blockedOn = e.tag === 3 ? e.stateNode.containerInfo : null;
          return;
        }
      }
    }
    l.blockedOn = null;
  }
  function wi(l) {
    if (l.blockedOn !== null) return !1;
    for (var t = l.targetContainers; 0 < t.length; ) {
      var e = Af(l.nativeEvent);
      if (e === null) {
        e = l.nativeEvent;
        var a = new e.constructor(e.type, e);
        ((dc = a), e.target.dispatchEvent(a), (dc = null));
      } else return ((t = _a(e)), t !== null && u2(t), (l.blockedOn = e), !1);
      t.shift();
    }
    return !0;
  }
  function o2(l, t, e) {
    wi(l) && e.delete(t);
  }
  function Tm() {
    ((_f = !1),
      $e !== null && wi($e) && ($e = null),
      Ie !== null && wi(Ie) && (Ie = null),
      Pe !== null && wi(Pe) && (Pe = null),
      du.forEach(o2),
      hu.forEach(o2));
  }
  function Xi(l, t) {
    l.blockedOn === t &&
      ((l.blockedOn = null),
      _f ||
        ((_f = !0),
        s.unstable_scheduleCallback(s.unstable_NormalPriority, Tm)));
  }
  var Vi = null;
  function r2(l) {
    Vi !== l &&
      ((Vi = l),
      s.unstable_scheduleCallback(s.unstable_NormalPriority, function () {
        Vi === l && (Vi = null);
        for (var t = 0; t < l.length; t += 3) {
          var e = l[t],
            a = l[t + 1],
            n = l[t + 2];
          if (typeof a != "function") {
            if (Of(a || e) === null) continue;
            break;
          }
          var u = _a(e);
          u !== null &&
            (l.splice(t, 3),
            (t -= 3),
            rs(u, { pending: !0, data: n, method: e.method, action: a }, a, n));
        }
      }));
  }
  function pn(l) {
    function t(h) {
      return Xi(h, l);
    }
    ($e !== null && Xi($e, l),
      Ie !== null && Xi(Ie, l),
      Pe !== null && Xi(Pe, l),
      du.forEach(t),
      hu.forEach(t));
    for (var e = 0; e < la.length; e++) {
      var a = la[e];
      a.blockedOn === l && (a.blockedOn = null);
    }
    for (; 0 < la.length && ((e = la[0]), e.blockedOn === null); )
      (f2(e), e.blockedOn === null && la.shift());
    if (((e = (l.ownerDocument || l).$$reactFormReplay), e != null))
      for (a = 0; a < e.length; a += 3) {
        var n = e[a],
          u = e[a + 1],
          c = n[rt] || null;
        if (typeof u == "function") c || r2(e);
        else if (c) {
          var o = null;
          if (u && u.hasAttribute("formAction")) {
            if (((n = u), (c = u[rt] || null))) o = c.formAction;
            else if (Of(n) !== null) continue;
          } else o = c.action;
          (typeof o == "function" ? (e[a + 1] = o) : (e.splice(a, 3), (a -= 3)),
            r2(e));
        }
      }
  }
  function d2() {
    function l(u) {
      u.canIntercept &&
        u.info === "react-transition" &&
        u.intercept({
          handler: function () {
            return new Promise(function (c) {
              return (n = c);
            });
          },
          focusReset: "manual",
          scroll: "manual",
        });
    }
    function t() {
      (n !== null && (n(), (n = null)), a || setTimeout(e, 20));
    }
    function e() {
      if (!a && !navigation.transition) {
        var u = navigation.currentEntry;
        u &&
          u.url != null &&
          navigation.navigate(u.url, {
            state: u.getState(),
            info: "react-transition",
            history: "replace",
          });
      }
    }
    if (typeof navigation == "object") {
      var a = !1,
        n = null;
      return (
        navigation.addEventListener("navigate", l),
        navigation.addEventListener("navigatesuccess", t),
        navigation.addEventListener("navigateerror", t),
        setTimeout(e, 100),
        function () {
          ((a = !0),
            navigation.removeEventListener("navigate", l),
            navigation.removeEventListener("navigatesuccess", t),
            navigation.removeEventListener("navigateerror", t),
            n !== null && (n(), (n = null)));
        }
      );
    }
  }
  function Df(l) {
    this._internalRoot = l;
  }
  ((ki.prototype.render = Df.prototype.render =
    function (l) {
      var t = this._internalRoot;
      if (t === null) throw Error(r(409));
      var e = t.current,
        a = Ct();
      a2(e, a, l, t, null, null);
    }),
    (ki.prototype.unmount = Df.prototype.unmount =
      function () {
        var l = this._internalRoot;
        if (l !== null) {
          this._internalRoot = null;
          var t = l.containerInfo;
          (a2(l.current, 2, null, l, null, null), Oi(), (t[Oa] = null));
        }
      }));
  function ki(l) {
    this._internalRoot = l;
  }
  ki.prototype.unstable_scheduleHydration = function (l) {
    if (l) {
      var t = Pf();
      l = { blockedOn: null, target: l, priority: t };
      for (var e = 0; e < la.length && t !== 0 && t < la[e].priority; e++);
      (la.splice(e, 0, l), e === 0 && f2(l));
    }
  };
  var h2 = f.version;
  if (h2 !== "19.3.1") throw Error(r(527, h2, "19.3.1"));
  ll.findDOMNode = function (l) {
    var t = l._reactInternals;
    if (t === void 0)
      throw typeof l.render == "function"
        ? Error(r(188))
        : ((l = Object.keys(l).join(",")), Error(r(268, l)));
    return (
      (l = T(t)),
      (l = l !== null ? A(l) : null),
      (l = l === null ? null : l.stateNode),
      l
    );
  };
  var Mm = {
    bundleType: 0,
    version: "19.3.1",
    rendererPackageName: "react-dom",
    currentDispatcherRef: V,
    reconcilerVersion: "19.3.1",
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Ki = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Ki.isDisabled && Ki.supportsFiber)
      try {
        ((Sn = Ki.inject(Mm)), (pt = Ki));
      } catch {}
  }
  return (
    (gu.createRoot = function (l, t) {
      if (!S(l)) throw Error(r(299));
      var e = !1,
        a = "",
        n = ed,
        u = ad,
        c = nd;
      return (
        t != null &&
          (t.unstable_strictMode === !0 && (e = !0),
          t.identifierPrefix !== void 0 && (a = t.identifierPrefix),
          t.onUncaughtError !== void 0 && (n = t.onUncaughtError),
          t.onCaughtError !== void 0 && (u = t.onCaughtError),
          t.onRecoverableError !== void 0 && (c = t.onRecoverableError)),
        (t = t2(l, 1, !1, null, null, e, a, null, n, u, c, d2)),
        (l[Oa] = t.current),
        sf(l),
        new Df(t)
      );
    }),
    (gu.hydrateRoot = function (l, t, e) {
      if (!S(l)) throw Error(r(299));
      var a = !1,
        n = "",
        u = ed,
        c = ad,
        o = nd,
        h = null;
      return (
        e != null &&
          (e.unstable_strictMode === !0 && (a = !0),
          e.identifierPrefix !== void 0 && (n = e.identifierPrefix),
          e.onUncaughtError !== void 0 && (u = e.onUncaughtError),
          e.onCaughtError !== void 0 && (c = e.onCaughtError),
          e.onRecoverableError !== void 0 && (o = e.onRecoverableError),
          e.formState !== void 0 && (h = e.formState)),
        (t = t2(l, 1, !0, t, e ?? null, a, n, h, u, c, o, d2)),
        (t.context = e2(null)),
        (e = t.current),
        (a = Ct()),
        (a = ic(a)),
        (n = Be(a)),
        (n.callback = null),
        qe(e, n, a),
        (e = a),
        (t.current.lanes = e),
        Nn(t, e),
        se(t),
        (l[Oa] = t.current),
        sf(l),
        new ki(t)
      );
    }),
    (gu.version = "19.3.1"),
    gu
  );
}
var E2;
function Qm() {
  if (E2) return Lf.exports;
  E2 = 1;
  function s() {
    if (
      !(
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
      )
    )
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(s);
      } catch (f) {
        console.error(f);
      }
  }
  return (s(), (Lf.exports = Lm()), Lf.exports);
}
var Hm = Qm();

export { X, i, Hm };

// Expose the existing ReactDOM portal API for non-interactive food motion overlays.
const createPortal = Rm().createPortal;
export {createPortal};
