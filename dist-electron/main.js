var W0 = Object.defineProperty;
var Uu = (e) => {
  throw TypeError(e);
};
var K0 = (e, t, r) => t in e ? W0(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r;
var li = (e, t, r) => K0(e, typeof t != "symbol" ? t + "" : t, r), ju = (e, t, r) => t.has(e) || Uu("Cannot " + r);
var ve = (e, t, r) => (ju(e, t, "read from private field"), r ? r.call(e) : t.get(e)), ui = (e, t, r) => t.has(e) ? Uu("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, r), fi = (e, t, r, n) => (ju(e, t, "write to private field"), n ? n.call(e, r) : t.set(e, r), r);
import Xt, { ipcMain as Mu, dialog as Y0, app as Vr, BrowserWindow as qu } from "electron";
import Hh from "events";
import eo from "crypto";
import Bh from "tty";
import Sa from "util";
import ba from "os";
import Cr from "fs";
import to from "stream";
import Bn from "url";
import X0 from "string_decoder";
import J0 from "constants";
import Gh from "assert";
import ce from "path";
import ro from "child_process";
import Vh from "zlib";
import Q0 from "http";
import { fileURLToPath as Z0 } from "node:url";
import se from "node:path";
import Ie from "node:process";
import { promisify as Be, isDeepStrictEqual as ev } from "node:util";
import oe from "node:fs";
import di from "node:crypto";
import tv from "node:assert";
import Pa from "node:os";
var Tt = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Ta(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var ys = {}, Fe = {}, Pr = {};
Object.defineProperty(Pr, "__esModule", { value: !0 });
Pr.CancellationError = Pr.CancellationToken = void 0;
const rv = Hh;
class nv extends rv.EventEmitter {
  get cancelled() {
    return this._cancelled || this._parent != null && this._parent.cancelled;
  }
  set parent(t) {
    this.removeParentCancelHandler(), this._parent = t, this.parentCancelHandler = () => this.cancel(), this._parent.onCancel(this.parentCancelHandler);
  }
  // babel cannot compile ... correctly for super calls
  constructor(t) {
    super(), this.parentCancelHandler = null, this._parent = null, this._cancelled = !1, t != null && (this.parent = t);
  }
  cancel() {
    this._cancelled = !0, this.emit("cancel");
  }
  onCancel(t) {
    this.cancelled ? t() : this.once("cancel", t);
  }
  createPromise(t) {
    if (this.cancelled)
      return Promise.reject(new nc());
    const r = () => {
      if (n != null)
        try {
          this.removeListener("cancel", n), n = null;
        } catch {
        }
    };
    let n = null;
    return new Promise((i, o) => {
      let a = null;
      if (n = () => {
        try {
          a != null && (a(), a = null);
        } finally {
          o(new nc());
        }
      }, this.cancelled) {
        n();
        return;
      }
      this.onCancel(n), t(i, o, (s) => {
        a = s;
      });
    }).then((i) => (r(), i)).catch((i) => {
      throw r(), i;
    });
  }
  removeParentCancelHandler() {
    const t = this._parent;
    t != null && this.parentCancelHandler != null && (t.removeListener("cancel", this.parentCancelHandler), this.parentCancelHandler = null);
  }
  dispose() {
    try {
      this.removeParentCancelHandler();
    } finally {
      this.removeAllListeners(), this._parent = null;
    }
  }
}
Pr.CancellationToken = nv;
class nc extends Error {
  constructor() {
    super("cancelled");
  }
}
Pr.CancellationError = nc;
var et = {}, ic = { exports: {} }, To = { exports: {} }, gs, Hu;
function iv() {
  if (Hu) return gs;
  Hu = 1;
  var e = 1e3, t = e * 60, r = t * 60, n = r * 24, i = n * 7, o = n * 365.25;
  gs = function(l, u) {
    u = u || {};
    var d = typeof l;
    if (d === "string" && l.length > 0)
      return a(l);
    if (d === "number" && isFinite(l))
      return u.long ? c(l) : s(l);
    throw new Error(
      "val is not a non-empty string or a valid number. val=" + JSON.stringify(l)
    );
  };
  function a(l) {
    if (l = String(l), !(l.length > 100)) {
      var u = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
        l
      );
      if (u) {
        var d = parseFloat(u[1]), h = (u[2] || "ms").toLowerCase();
        switch (h) {
          case "years":
          case "year":
          case "yrs":
          case "yr":
          case "y":
            return d * o;
          case "weeks":
          case "week":
          case "w":
            return d * i;
          case "days":
          case "day":
          case "d":
            return d * n;
          case "hours":
          case "hour":
          case "hrs":
          case "hr":
          case "h":
            return d * r;
          case "minutes":
          case "minute":
          case "mins":
          case "min":
          case "m":
            return d * t;
          case "seconds":
          case "second":
          case "secs":
          case "sec":
          case "s":
            return d * e;
          case "milliseconds":
          case "millisecond":
          case "msecs":
          case "msec":
          case "ms":
            return d;
          default:
            return;
        }
      }
    }
  }
  function s(l) {
    var u = Math.abs(l);
    return u >= n ? Math.round(l / n) + "d" : u >= r ? Math.round(l / r) + "h" : u >= t ? Math.round(l / t) + "m" : u >= e ? Math.round(l / e) + "s" : l + "ms";
  }
  function c(l) {
    var u = Math.abs(l);
    return u >= n ? f(l, u, n, "day") : u >= r ? f(l, u, r, "hour") : u >= t ? f(l, u, t, "minute") : u >= e ? f(l, u, e, "second") : l + " ms";
  }
  function f(l, u, d, h) {
    var y = u >= d * 1.5;
    return Math.round(l / d) + " " + h + (y ? "s" : "");
  }
  return gs;
}
var vs, Bu;
function zh() {
  if (Bu) return vs;
  Bu = 1;
  function e(t) {
    n.debug = n, n.default = n, n.coerce = f, n.disable = s, n.enable = o, n.enabled = c, n.humanize = iv(), n.destroy = l, Object.keys(t).forEach((u) => {
      n[u] = t[u];
    }), n.names = [], n.skips = [], n.formatters = {};
    function r(u) {
      let d = 0;
      for (let h = 0; h < u.length; h++)
        d = (d << 5) - d + u.charCodeAt(h), d |= 0;
      return n.colors[Math.abs(d) % n.colors.length];
    }
    n.selectColor = r;
    function n(u) {
      let d, h = null, y, g;
      function $(...v) {
        if (!$.enabled)
          return;
        const S = $, C = Number(/* @__PURE__ */ new Date()), R = C - (d || C);
        S.diff = R, S.prev = d, S.curr = C, d = C, v[0] = n.coerce(v[0]), typeof v[0] != "string" && v.unshift("%O");
        let M = 0;
        v[0] = v[0].replace(/%([a-zA-Z%])/g, (L, B) => {
          if (L === "%%")
            return "%";
          M++;
          const w = n.formatters[B];
          if (typeof w == "function") {
            const K = v[M];
            L = w.call(S, K), v.splice(M, 1), M--;
          }
          return L;
        }), n.formatArgs.call(S, v), (S.log || n.log).apply(S, v);
      }
      return $.namespace = u, $.useColors = n.useColors(), $.color = n.selectColor(u), $.extend = i, $.destroy = n.destroy, Object.defineProperty($, "enabled", {
        enumerable: !0,
        configurable: !1,
        get: () => h !== null ? h : (y !== n.namespaces && (y = n.namespaces, g = n.enabled(u)), g),
        set: (v) => {
          h = v;
        }
      }), typeof n.init == "function" && n.init($), $;
    }
    function i(u, d) {
      const h = n(this.namespace + (typeof d > "u" ? ":" : d) + u);
      return h.log = this.log, h;
    }
    function o(u) {
      n.save(u), n.namespaces = u, n.names = [], n.skips = [];
      const d = (typeof u == "string" ? u : "").trim().replace(" ", ",").split(",").filter(Boolean);
      for (const h of d)
        h[0] === "-" ? n.skips.push(h.slice(1)) : n.names.push(h);
    }
    function a(u, d) {
      let h = 0, y = 0, g = -1, $ = 0;
      for (; h < u.length; )
        if (y < d.length && (d[y] === u[h] || d[y] === "*"))
          d[y] === "*" ? (g = y, $ = h, y++) : (h++, y++);
        else if (g !== -1)
          y = g + 1, $++, h = $;
        else
          return !1;
      for (; y < d.length && d[y] === "*"; )
        y++;
      return y === d.length;
    }
    function s() {
      const u = [
        ...n.names,
        ...n.skips.map((d) => "-" + d)
      ].join(",");
      return n.enable(""), u;
    }
    function c(u) {
      for (const d of n.skips)
        if (a(u, d))
          return !1;
      for (const d of n.names)
        if (a(u, d))
          return !0;
      return !1;
    }
    function f(u) {
      return u instanceof Error ? u.stack || u.message : u;
    }
    function l() {
      console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
    }
    return n.enable(n.load()), n;
  }
  return vs = e, vs;
}
var Gu;
function ov() {
  return Gu || (Gu = 1, function(e, t) {
    t.formatArgs = n, t.save = i, t.load = o, t.useColors = r, t.storage = a(), t.destroy = /* @__PURE__ */ (() => {
      let c = !1;
      return () => {
        c || (c = !0, console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."));
      };
    })(), t.colors = [
      "#0000CC",
      "#0000FF",
      "#0033CC",
      "#0033FF",
      "#0066CC",
      "#0066FF",
      "#0099CC",
      "#0099FF",
      "#00CC00",
      "#00CC33",
      "#00CC66",
      "#00CC99",
      "#00CCCC",
      "#00CCFF",
      "#3300CC",
      "#3300FF",
      "#3333CC",
      "#3333FF",
      "#3366CC",
      "#3366FF",
      "#3399CC",
      "#3399FF",
      "#33CC00",
      "#33CC33",
      "#33CC66",
      "#33CC99",
      "#33CCCC",
      "#33CCFF",
      "#6600CC",
      "#6600FF",
      "#6633CC",
      "#6633FF",
      "#66CC00",
      "#66CC33",
      "#9900CC",
      "#9900FF",
      "#9933CC",
      "#9933FF",
      "#99CC00",
      "#99CC33",
      "#CC0000",
      "#CC0033",
      "#CC0066",
      "#CC0099",
      "#CC00CC",
      "#CC00FF",
      "#CC3300",
      "#CC3333",
      "#CC3366",
      "#CC3399",
      "#CC33CC",
      "#CC33FF",
      "#CC6600",
      "#CC6633",
      "#CC9900",
      "#CC9933",
      "#CCCC00",
      "#CCCC33",
      "#FF0000",
      "#FF0033",
      "#FF0066",
      "#FF0099",
      "#FF00CC",
      "#FF00FF",
      "#FF3300",
      "#FF3333",
      "#FF3366",
      "#FF3399",
      "#FF33CC",
      "#FF33FF",
      "#FF6600",
      "#FF6633",
      "#FF9900",
      "#FF9933",
      "#FFCC00",
      "#FFCC33"
    ];
    function r() {
      if (typeof window < "u" && window.process && (window.process.type === "renderer" || window.process.__nwjs))
        return !0;
      if (typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))
        return !1;
      let c;
      return typeof document < "u" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // Is firebug? http://stackoverflow.com/a/398120/376773
      typeof window < "u" && window.console && (window.console.firebug || window.console.exception && window.console.table) || // Is firefox >= v31?
      // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
      typeof navigator < "u" && navigator.userAgent && (c = navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)) && parseInt(c[1], 10) >= 31 || // Double check webkit in userAgent just in case we are in a worker
      typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
    }
    function n(c) {
      if (c[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + c[0] + (this.useColors ? "%c " : " ") + "+" + e.exports.humanize(this.diff), !this.useColors)
        return;
      const f = "color: " + this.color;
      c.splice(1, 0, f, "color: inherit");
      let l = 0, u = 0;
      c[0].replace(/%[a-zA-Z%]/g, (d) => {
        d !== "%%" && (l++, d === "%c" && (u = l));
      }), c.splice(u, 0, f);
    }
    t.log = console.debug || console.log || (() => {
    });
    function i(c) {
      try {
        c ? t.storage.setItem("debug", c) : t.storage.removeItem("debug");
      } catch {
      }
    }
    function o() {
      let c;
      try {
        c = t.storage.getItem("debug");
      } catch {
      }
      return !c && typeof process < "u" && "env" in process && (c = process.env.DEBUG), c;
    }
    function a() {
      try {
        return localStorage;
      } catch {
      }
    }
    e.exports = zh()(t);
    const { formatters: s } = e.exports;
    s.j = function(c) {
      try {
        return JSON.stringify(c);
      } catch (f) {
        return "[UnexpectedJSONParseError]: " + f.message;
      }
    };
  }(To, To.exports)), To.exports;
}
var Ao = { exports: {} }, $s, Vu;
function av() {
  return Vu || (Vu = 1, $s = (e, t = process.argv) => {
    const r = e.startsWith("-") ? "" : e.length === 1 ? "-" : "--", n = t.indexOf(r + e), i = t.indexOf("--");
    return n !== -1 && (i === -1 || n < i);
  }), $s;
}
var _s, zu;
function sv() {
  if (zu) return _s;
  zu = 1;
  const e = ba, t = Bh, r = av(), { env: n } = process;
  let i;
  r("no-color") || r("no-colors") || r("color=false") || r("color=never") ? i = 0 : (r("color") || r("colors") || r("color=true") || r("color=always")) && (i = 1), "FORCE_COLOR" in n && (n.FORCE_COLOR === "true" ? i = 1 : n.FORCE_COLOR === "false" ? i = 0 : i = n.FORCE_COLOR.length === 0 ? 1 : Math.min(parseInt(n.FORCE_COLOR, 10), 3));
  function o(c) {
    return c === 0 ? !1 : {
      level: c,
      hasBasic: !0,
      has256: c >= 2,
      has16m: c >= 3
    };
  }
  function a(c, f) {
    if (i === 0)
      return 0;
    if (r("color=16m") || r("color=full") || r("color=truecolor"))
      return 3;
    if (r("color=256"))
      return 2;
    if (c && !f && i === void 0)
      return 0;
    const l = i || 0;
    if (n.TERM === "dumb")
      return l;
    if (process.platform === "win32") {
      const u = e.release().split(".");
      return Number(u[0]) >= 10 && Number(u[2]) >= 10586 ? Number(u[2]) >= 14931 ? 3 : 2 : 1;
    }
    if ("CI" in n)
      return ["TRAVIS", "CIRCLECI", "APPVEYOR", "GITLAB_CI", "GITHUB_ACTIONS", "BUILDKITE"].some((u) => u in n) || n.CI_NAME === "codeship" ? 1 : l;
    if ("TEAMCITY_VERSION" in n)
      return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(n.TEAMCITY_VERSION) ? 1 : 0;
    if (n.COLORTERM === "truecolor")
      return 3;
    if ("TERM_PROGRAM" in n) {
      const u = parseInt((n.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
      switch (n.TERM_PROGRAM) {
        case "iTerm.app":
          return u >= 3 ? 3 : 2;
        case "Apple_Terminal":
          return 2;
      }
    }
    return /-256(color)?$/i.test(n.TERM) ? 2 : /^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(n.TERM) || "COLORTERM" in n ? 1 : l;
  }
  function s(c) {
    const f = a(c, c && c.isTTY);
    return o(f);
  }
  return _s = {
    supportsColor: s,
    stdout: o(a(!0, t.isatty(1))),
    stderr: o(a(!0, t.isatty(2)))
  }, _s;
}
var Wu;
function cv() {
  return Wu || (Wu = 1, function(e, t) {
    const r = Bh, n = Sa;
    t.init = l, t.log = s, t.formatArgs = o, t.save = c, t.load = f, t.useColors = i, t.destroy = n.deprecate(
      () => {
      },
      "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."
    ), t.colors = [6, 2, 3, 4, 5, 1];
    try {
      const d = sv();
      d && (d.stderr || d).level >= 2 && (t.colors = [
        20,
        21,
        26,
        27,
        32,
        33,
        38,
        39,
        40,
        41,
        42,
        43,
        44,
        45,
        56,
        57,
        62,
        63,
        68,
        69,
        74,
        75,
        76,
        77,
        78,
        79,
        80,
        81,
        92,
        93,
        98,
        99,
        112,
        113,
        128,
        129,
        134,
        135,
        148,
        149,
        160,
        161,
        162,
        163,
        164,
        165,
        166,
        167,
        168,
        169,
        170,
        171,
        172,
        173,
        178,
        179,
        184,
        185,
        196,
        197,
        198,
        199,
        200,
        201,
        202,
        203,
        204,
        205,
        206,
        207,
        208,
        209,
        214,
        215,
        220,
        221
      ]);
    } catch {
    }
    t.inspectOpts = Object.keys(process.env).filter((d) => /^debug_/i.test(d)).reduce((d, h) => {
      const y = h.substring(6).toLowerCase().replace(/_([a-z])/g, ($, v) => v.toUpperCase());
      let g = process.env[h];
      return /^(yes|on|true|enabled)$/i.test(g) ? g = !0 : /^(no|off|false|disabled)$/i.test(g) ? g = !1 : g === "null" ? g = null : g = Number(g), d[y] = g, d;
    }, {});
    function i() {
      return "colors" in t.inspectOpts ? !!t.inspectOpts.colors : r.isatty(process.stderr.fd);
    }
    function o(d) {
      const { namespace: h, useColors: y } = this;
      if (y) {
        const g = this.color, $ = "\x1B[3" + (g < 8 ? g : "8;5;" + g), v = `  ${$};1m${h} \x1B[0m`;
        d[0] = v + d[0].split(`
`).join(`
` + v), d.push($ + "m+" + e.exports.humanize(this.diff) + "\x1B[0m");
      } else
        d[0] = a() + h + " " + d[0];
    }
    function a() {
      return t.inspectOpts.hideDate ? "" : (/* @__PURE__ */ new Date()).toISOString() + " ";
    }
    function s(...d) {
      return process.stderr.write(n.formatWithOptions(t.inspectOpts, ...d) + `
`);
    }
    function c(d) {
      d ? process.env.DEBUG = d : delete process.env.DEBUG;
    }
    function f() {
      return process.env.DEBUG;
    }
    function l(d) {
      d.inspectOpts = {};
      const h = Object.keys(t.inspectOpts);
      for (let y = 0; y < h.length; y++)
        d.inspectOpts[h[y]] = t.inspectOpts[h[y]];
    }
    e.exports = zh()(t);
    const { formatters: u } = e.exports;
    u.o = function(d) {
      return this.inspectOpts.colors = this.useColors, n.inspect(d, this.inspectOpts).split(`
`).map((h) => h.trim()).join(" ");
    }, u.O = function(d) {
      return this.inspectOpts.colors = this.useColors, n.inspect(d, this.inspectOpts);
    };
  }(Ao, Ao.exports)), Ao.exports;
}
typeof process > "u" || process.type === "renderer" || process.browser === !0 || process.__nwjs ? ic.exports = ov() : ic.exports = cv();
var lv = ic.exports, Gn = {};
Object.defineProperty(Gn, "__esModule", { value: !0 });
Gn.newError = uv;
function uv(e, t) {
  const r = new Error(e);
  return r.code = t, r;
}
var no = {};
Object.defineProperty(no, "__esModule", { value: !0 });
no.ProgressCallbackTransform = void 0;
const fv = to;
class dv extends fv.Transform {
  constructor(t, r, n) {
    super(), this.total = t, this.cancellationToken = r, this.onProgress = n, this.start = Date.now(), this.transferred = 0, this.delta = 0, this.nextUpdate = this.start + 1e3;
  }
  _transform(t, r, n) {
    if (this.cancellationToken.cancelled) {
      n(new Error("cancelled"), null);
      return;
    }
    this.transferred += t.length, this.delta += t.length;
    const i = Date.now();
    i >= this.nextUpdate && this.transferred !== this.total && (this.nextUpdate = i + 1e3, this.onProgress({
      total: this.total,
      delta: this.delta,
      transferred: this.transferred,
      percent: this.transferred / this.total * 100,
      bytesPerSecond: Math.round(this.transferred / ((i - this.start) / 1e3))
    }), this.delta = 0), n(null, t);
  }
  _flush(t) {
    if (this.cancellationToken.cancelled) {
      t(new Error("cancelled"));
      return;
    }
    this.onProgress({
      total: this.total,
      delta: this.delta,
      transferred: this.total,
      percent: 100,
      bytesPerSecond: Math.round(this.transferred / ((Date.now() - this.start) / 1e3))
    }), this.delta = 0, t(null);
  }
}
no.ProgressCallbackTransform = dv;
Object.defineProperty(et, "__esModule", { value: !0 });
et.DigestTransform = et.HttpExecutor = et.HttpError = void 0;
et.createHttpError = oc;
et.parseJson = _v;
et.configureRequestOptionsFromUrl = Kh;
et.configureRequestUrl = Fc;
et.safeGetHeader = Rn;
et.configureRequestOptions = aa;
et.safeStringifyJson = sa;
const hv = eo, pv = lv, mv = Cr, yv = to, Wh = Bn, gv = Pr, Ku = Gn, vv = no, hi = (0, pv.default)("electron-builder");
function oc(e, t = null) {
  return new kc(e.statusCode || -1, `${e.statusCode} ${e.statusMessage}` + (t == null ? "" : `
` + JSON.stringify(t, null, "  ")) + `
Headers: ` + sa(e.headers), t);
}
const $v = /* @__PURE__ */ new Map([
  [429, "Too many requests"],
  [400, "Bad request"],
  [403, "Forbidden"],
  [404, "Not found"],
  [405, "Method not allowed"],
  [406, "Not acceptable"],
  [408, "Request timeout"],
  [413, "Request entity too large"],
  [500, "Internal server error"],
  [502, "Bad gateway"],
  [503, "Service unavailable"],
  [504, "Gateway timeout"],
  [505, "HTTP version not supported"]
]);
class kc extends Error {
  constructor(t, r = `HTTP error: ${$v.get(t) || t}`, n = null) {
    super(r), this.statusCode = t, this.description = n, this.name = "HttpError", this.code = `HTTP_ERROR_${t}`;
  }
  isServerError() {
    return this.statusCode >= 500 && this.statusCode <= 599;
  }
}
et.HttpError = kc;
function _v(e) {
  return e.then((t) => t == null || t.length === 0 ? null : JSON.parse(t));
}
class oa {
  constructor() {
    this.maxRedirects = 10;
  }
  request(t, r = new gv.CancellationToken(), n) {
    aa(t);
    const i = n == null ? void 0 : JSON.stringify(n), o = i ? Buffer.from(i) : void 0;
    if (o != null) {
      hi(i);
      const { headers: a, ...s } = t;
      t = {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": o.length,
          ...a
        },
        ...s
      };
    }
    return this.doApiRequest(t, r, (a) => a.end(o));
  }
  doApiRequest(t, r, n, i = 0) {
    return hi.enabled && hi(`Request: ${sa(t)}`), r.createPromise((o, a, s) => {
      const c = this.createRequest(t, (f) => {
        try {
          this.handleResponse(f, t, r, o, a, i, n);
        } catch (l) {
          a(l);
        }
      });
      this.addErrorAndTimeoutHandlers(c, a, t.timeout), this.addRedirectHandlers(c, t, a, i, (f) => {
        this.doApiRequest(f, r, n, i).then(o).catch(a);
      }), n(c, a), s(() => c.abort());
    });
  }
  // noinspection JSUnusedLocalSymbols
  // eslint-disable-next-line
  addRedirectHandlers(t, r, n, i, o) {
  }
  addErrorAndTimeoutHandlers(t, r, n = 60 * 1e3) {
    this.addTimeOutHandler(t, r, n), t.on("error", r), t.on("aborted", () => {
      r(new Error("Request has been aborted by the server"));
    });
  }
  handleResponse(t, r, n, i, o, a, s) {
    var c;
    if (hi.enabled && hi(`Response: ${t.statusCode} ${t.statusMessage}, request options: ${sa(r)}`), t.statusCode === 404) {
      o(oc(t, `method: ${r.method || "GET"} url: ${r.protocol || "https:"}//${r.hostname}${r.port ? `:${r.port}` : ""}${r.path}

Please double check that your authentication token is correct. Due to security reasons, actual status maybe not reported, but 404.
`));
      return;
    } else if (t.statusCode === 204) {
      i();
      return;
    }
    const f = (c = t.statusCode) !== null && c !== void 0 ? c : 0, l = f >= 300 && f < 400, u = Rn(t, "location");
    if (l && u != null) {
      if (a > this.maxRedirects) {
        o(this.createMaxRedirectError());
        return;
      }
      this.doApiRequest(oa.prepareRedirectUrlOptions(u, r), n, s, a).then(i).catch(o);
      return;
    }
    t.setEncoding("utf8");
    let d = "";
    t.on("error", o), t.on("data", (h) => d += h), t.on("end", () => {
      try {
        if (t.statusCode != null && t.statusCode >= 400) {
          const h = Rn(t, "content-type"), y = h != null && (Array.isArray(h) ? h.find((g) => g.includes("json")) != null : h.includes("json"));
          o(oc(t, `method: ${r.method || "GET"} url: ${r.protocol || "https:"}//${r.hostname}${r.port ? `:${r.port}` : ""}${r.path}

          Data:
          ${y ? JSON.stringify(JSON.parse(d)) : d}
          `));
        } else
          i(d.length === 0 ? null : d);
      } catch (h) {
        o(h);
      }
    });
  }
  async downloadToBuffer(t, r) {
    return await r.cancellationToken.createPromise((n, i, o) => {
      const a = [], s = {
        headers: r.headers || void 0,
        // because PrivateGitHubProvider requires HttpExecutor.prepareRedirectUrlOptions logic, so, we need to redirect manually
        redirect: "manual"
      };
      Fc(t, s), aa(s), this.doDownload(s, {
        destination: null,
        options: r,
        onCancel: o,
        callback: (c) => {
          c == null ? n(Buffer.concat(a)) : i(c);
        },
        responseHandler: (c, f) => {
          let l = 0;
          c.on("data", (u) => {
            if (l += u.length, l > 524288e3) {
              f(new Error("Maximum allowed size is 500 MB"));
              return;
            }
            a.push(u);
          }), c.on("end", () => {
            f(null);
          });
        }
      }, 0);
    });
  }
  doDownload(t, r, n) {
    const i = this.createRequest(t, (o) => {
      if (o.statusCode >= 400) {
        r.callback(new Error(`Cannot download "${t.protocol || "https:"}//${t.hostname}${t.path}", status ${o.statusCode}: ${o.statusMessage}`));
        return;
      }
      o.on("error", r.callback);
      const a = Rn(o, "location");
      if (a != null) {
        n < this.maxRedirects ? this.doDownload(oa.prepareRedirectUrlOptions(a, t), r, n++) : r.callback(this.createMaxRedirectError());
        return;
      }
      r.responseHandler == null ? Ev(r, o) : r.responseHandler(o, r.callback);
    });
    this.addErrorAndTimeoutHandlers(i, r.callback, t.timeout), this.addRedirectHandlers(i, t, r.callback, n, (o) => {
      this.doDownload(o, r, n++);
    }), i.end();
  }
  createMaxRedirectError() {
    return new Error(`Too many redirects (> ${this.maxRedirects})`);
  }
  addTimeOutHandler(t, r, n) {
    t.on("socket", (i) => {
      i.setTimeout(n, () => {
        t.abort(), r(new Error("Request timed out"));
      });
    });
  }
  static prepareRedirectUrlOptions(t, r) {
    const n = Kh(t, { ...r }), i = n.headers;
    if (i != null && i.authorization) {
      const o = new Wh.URL(t);
      (o.hostname.endsWith(".amazonaws.com") || o.searchParams.has("X-Amz-Credential")) && delete i.authorization;
    }
    return n;
  }
  static retryOnServerError(t, r = 3) {
    for (let n = 0; ; n++)
      try {
        return t();
      } catch (i) {
        if (n < r && (i instanceof kc && i.isServerError() || i.code === "EPIPE"))
          continue;
        throw i;
      }
  }
}
et.HttpExecutor = oa;
function Kh(e, t) {
  const r = aa(t);
  return Fc(new Wh.URL(e), r), r;
}
function Fc(e, t) {
  t.protocol = e.protocol, t.hostname = e.hostname, e.port ? t.port = e.port : t.port && delete t.port, t.path = e.pathname + e.search;
}
class ac extends yv.Transform {
  // noinspection JSUnusedGlobalSymbols
  get actual() {
    return this._actual;
  }
  constructor(t, r = "sha512", n = "base64") {
    super(), this.expected = t, this.algorithm = r, this.encoding = n, this._actual = null, this.isValidateOnEnd = !0, this.digester = (0, hv.createHash)(r);
  }
  // noinspection JSUnusedGlobalSymbols
  _transform(t, r, n) {
    this.digester.update(t), n(null, t);
  }
  // noinspection JSUnusedGlobalSymbols
  _flush(t) {
    if (this._actual = this.digester.digest(this.encoding), this.isValidateOnEnd)
      try {
        this.validate();
      } catch (r) {
        t(r);
        return;
      }
    t(null);
  }
  validate() {
    if (this._actual == null)
      throw (0, Ku.newError)("Not finished yet", "ERR_STREAM_NOT_FINISHED");
    if (this._actual !== this.expected)
      throw (0, Ku.newError)(`${this.algorithm} checksum mismatch, expected ${this.expected}, got ${this._actual}`, "ERR_CHECKSUM_MISMATCH");
    return null;
  }
}
et.DigestTransform = ac;
function wv(e, t, r) {
  return e != null && t != null && e !== t ? (r(new Error(`checksum mismatch: expected ${t} but got ${e} (X-Checksum-Sha2 header)`)), !1) : !0;
}
function Rn(e, t) {
  const r = e.headers[t];
  return r == null ? null : Array.isArray(r) ? r.length === 0 ? null : r[r.length - 1] : r;
}
function Ev(e, t) {
  if (!wv(Rn(t, "X-Checksum-Sha2"), e.options.sha2, e.callback))
    return;
  const r = [];
  if (e.options.onProgress != null) {
    const a = Rn(t, "content-length");
    a != null && r.push(new vv.ProgressCallbackTransform(parseInt(a, 10), e.options.cancellationToken, e.options.onProgress));
  }
  const n = e.options.sha512;
  n != null ? r.push(new ac(n, "sha512", n.length === 128 && !n.includes("+") && !n.includes("Z") && !n.includes("=") ? "hex" : "base64")) : e.options.sha2 != null && r.push(new ac(e.options.sha2, "sha256", "hex"));
  const i = (0, mv.createWriteStream)(e.destination);
  r.push(i);
  let o = t;
  for (const a of r)
    a.on("error", (s) => {
      i.close(), e.options.cancellationToken.cancelled || e.callback(s);
    }), o = o.pipe(a);
  i.on("finish", () => {
    i.close(e.callback);
  });
}
function aa(e, t, r) {
  r != null && (e.method = r), e.headers = { ...e.headers };
  const n = e.headers;
  return t != null && (n.authorization = t.startsWith("Basic") || t.startsWith("Bearer") ? t : `token ${t}`), n["User-Agent"] == null && (n["User-Agent"] = "electron-builder"), (r == null || r === "GET" || n["Cache-Control"] == null) && (n["Cache-Control"] = "no-cache"), e.protocol == null && process.versions.electron != null && (e.protocol = "https:"), e;
}
function sa(e, t) {
  return JSON.stringify(e, (r, n) => r.endsWith("Authorization") || r.endsWith("authorization") || r.endsWith("Password") || r.endsWith("PASSWORD") || r.endsWith("Token") || r.includes("password") || r.includes("token") || t != null && t.has(r) ? "<stripped sensitive data>" : n, 2);
}
var Aa = {};
Object.defineProperty(Aa, "__esModule", { value: !0 });
Aa.githubUrl = Sv;
Aa.getS3LikeProviderBaseUrl = bv;
function Sv(e, t = "github.com") {
  return `${e.protocol || "https"}://${e.host || t}`;
}
function bv(e) {
  const t = e.provider;
  if (t === "s3")
    return Pv(e);
  if (t === "spaces")
    return Tv(e);
  throw new Error(`Not supported provider: ${t}`);
}
function Pv(e) {
  let t;
  if (e.accelerate == !0)
    t = `https://${e.bucket}.s3-accelerate.amazonaws.com`;
  else if (e.endpoint != null)
    t = `${e.endpoint}/${e.bucket}`;
  else if (e.bucket.includes(".")) {
    if (e.region == null)
      throw new Error(`Bucket name "${e.bucket}" includes a dot, but S3 region is missing`);
    e.region === "us-east-1" ? t = `https://s3.amazonaws.com/${e.bucket}` : t = `https://s3-${e.region}.amazonaws.com/${e.bucket}`;
  } else e.region === "cn-north-1" ? t = `https://${e.bucket}.s3.${e.region}.amazonaws.com.cn` : t = `https://${e.bucket}.s3.amazonaws.com`;
  return Yh(t, e.path);
}
function Yh(e, t) {
  return t != null && t.length > 0 && (t.startsWith("/") || (e += "/"), e += t), e;
}
function Tv(e) {
  if (e.name == null)
    throw new Error("name is missing");
  if (e.region == null)
    throw new Error("region is missing");
  return Yh(`https://${e.name}.${e.region}.digitaloceanspaces.com`, e.path);
}
var Lc = {};
Object.defineProperty(Lc, "__esModule", { value: !0 });
Lc.parseDn = Av;
function Av(e) {
  let t = !1, r = null, n = "", i = 0;
  e = e.trim();
  const o = /* @__PURE__ */ new Map();
  for (let a = 0; a <= e.length; a++) {
    if (a === e.length) {
      r !== null && o.set(r, n);
      break;
    }
    const s = e[a];
    if (t) {
      if (s === '"') {
        t = !1;
        continue;
      }
    } else {
      if (s === '"') {
        t = !0;
        continue;
      }
      if (s === "\\") {
        a++;
        const c = parseInt(e.slice(a, a + 2), 16);
        Number.isNaN(c) ? n += e[a] : (a++, n += String.fromCharCode(c));
        continue;
      }
      if (r === null && s === "=") {
        r = n, n = "";
        continue;
      }
      if (s === "," || s === ";" || s === "+") {
        r !== null && o.set(r, n), r = null, n = "";
        continue;
      }
    }
    if (s === " " && !t) {
      if (n.length === 0)
        continue;
      if (a > i) {
        let c = a;
        for (; e[c] === " "; )
          c++;
        i = c;
      }
      if (i >= e.length || e[i] === "," || e[i] === ";" || r === null && e[i] === "=" || r !== null && e[i] === "+") {
        a = i - 1;
        continue;
      }
    }
    n += s;
  }
  return o;
}
var xn = {};
Object.defineProperty(xn, "__esModule", { value: !0 });
xn.nil = xn.UUID = void 0;
const Xh = eo, Jh = Gn, Ov = "options.name must be either a string or a Buffer", Yu = (0, Xh.randomBytes)(16);
Yu[0] = Yu[0] | 1;
const Ko = {}, le = [];
for (let e = 0; e < 256; e++) {
  const t = (e + 256).toString(16).substr(1);
  Ko[t] = e, le[e] = t;
}
class tn {
  constructor(t) {
    this.ascii = null, this.binary = null;
    const r = tn.check(t);
    if (!r)
      throw new Error("not a UUID");
    this.version = r.version, r.format === "ascii" ? this.ascii = t : this.binary = t;
  }
  static v5(t, r) {
    return Cv(t, "sha1", 80, r);
  }
  toString() {
    return this.ascii == null && (this.ascii = Iv(this.binary)), this.ascii;
  }
  inspect() {
    return `UUID v${this.version} ${this.toString()}`;
  }
  static check(t, r = 0) {
    if (typeof t == "string")
      return t = t.toLowerCase(), /^[a-f0-9]{8}(-[a-f0-9]{4}){3}-([a-f0-9]{12})$/.test(t) ? t === "00000000-0000-0000-0000-000000000000" ? { version: void 0, variant: "nil", format: "ascii" } : {
        version: (Ko[t[14] + t[15]] & 240) >> 4,
        variant: Xu((Ko[t[19] + t[20]] & 224) >> 5),
        format: "ascii"
      } : !1;
    if (Buffer.isBuffer(t)) {
      if (t.length < r + 16)
        return !1;
      let n = 0;
      for (; n < 16 && t[r + n] === 0; n++)
        ;
      return n === 16 ? { version: void 0, variant: "nil", format: "binary" } : {
        version: (t[r + 6] & 240) >> 4,
        variant: Xu((t[r + 8] & 224) >> 5),
        format: "binary"
      };
    }
    throw (0, Jh.newError)("Unknown type of uuid", "ERR_UNKNOWN_UUID_TYPE");
  }
  // read stringified uuid into a Buffer
  static parse(t) {
    const r = Buffer.allocUnsafe(16);
    let n = 0;
    for (let i = 0; i < 16; i++)
      r[i] = Ko[t[n++] + t[n++]], (i === 3 || i === 5 || i === 7 || i === 9) && (n += 1);
    return r;
  }
}
xn.UUID = tn;
tn.OID = tn.parse("6ba7b812-9dad-11d1-80b4-00c04fd430c8");
function Xu(e) {
  switch (e) {
    case 0:
    case 1:
    case 3:
      return "ncs";
    case 4:
    case 5:
      return "rfc4122";
    case 6:
      return "microsoft";
    default:
      return "future";
  }
}
var Ci;
(function(e) {
  e[e.ASCII = 0] = "ASCII", e[e.BINARY = 1] = "BINARY", e[e.OBJECT = 2] = "OBJECT";
})(Ci || (Ci = {}));
function Cv(e, t, r, n, i = Ci.ASCII) {
  const o = (0, Xh.createHash)(t);
  if (typeof e != "string" && !Buffer.isBuffer(e))
    throw (0, Jh.newError)(Ov, "ERR_INVALID_UUID_NAME");
  o.update(n), o.update(e);
  const s = o.digest();
  let c;
  switch (i) {
    case Ci.BINARY:
      s[6] = s[6] & 15 | r, s[8] = s[8] & 63 | 128, c = s;
      break;
    case Ci.OBJECT:
      s[6] = s[6] & 15 | r, s[8] = s[8] & 63 | 128, c = new tn(s);
      break;
    default:
      c = le[s[0]] + le[s[1]] + le[s[2]] + le[s[3]] + "-" + le[s[4]] + le[s[5]] + "-" + le[s[6] & 15 | r] + le[s[7]] + "-" + le[s[8] & 63 | 128] + le[s[9]] + "-" + le[s[10]] + le[s[11]] + le[s[12]] + le[s[13]] + le[s[14]] + le[s[15]];
      break;
  }
  return c;
}
function Iv(e) {
  return le[e[0]] + le[e[1]] + le[e[2]] + le[e[3]] + "-" + le[e[4]] + le[e[5]] + "-" + le[e[6]] + le[e[7]] + "-" + le[e[8]] + le[e[9]] + "-" + le[e[10]] + le[e[11]] + le[e[12]] + le[e[13]] + le[e[14]] + le[e[15]];
}
xn.nil = new tn("00000000-0000-0000-0000-000000000000");
var io = {}, Qh = {};
(function(e) {
  (function(t) {
    t.parser = function(m, p) {
      return new n(m, p);
    }, t.SAXParser = n, t.SAXStream = l, t.createStream = f, t.MAX_BUFFER_LENGTH = 64 * 1024;
    var r = [
      "comment",
      "sgmlDecl",
      "textNode",
      "tagName",
      "doctype",
      "procInstName",
      "procInstBody",
      "entity",
      "attribName",
      "attribValue",
      "cdata",
      "script"
    ];
    t.EVENTS = [
      "text",
      "processinginstruction",
      "sgmldeclaration",
      "doctype",
      "comment",
      "opentagstart",
      "attribute",
      "opentag",
      "closetag",
      "opencdata",
      "cdata",
      "closecdata",
      "error",
      "end",
      "ready",
      "script",
      "opennamespace",
      "closenamespace"
    ];
    function n(m, p) {
      if (!(this instanceof n))
        return new n(m, p);
      var D = this;
      o(D), D.q = D.c = "", D.bufferCheckPosition = t.MAX_BUFFER_LENGTH, D.opt = p || {}, D.opt.lowercase = D.opt.lowercase || D.opt.lowercasetags, D.looseCase = D.opt.lowercase ? "toLowerCase" : "toUpperCase", D.tags = [], D.closed = D.closedRoot = D.sawRoot = !1, D.tag = D.error = null, D.strict = !!m, D.noscript = !!(m || D.opt.noscript), D.state = w.BEGIN, D.strictEntities = D.opt.strictEntities, D.ENTITIES = D.strictEntities ? Object.create(t.XML_ENTITIES) : Object.create(t.ENTITIES), D.attribList = [], D.opt.xmlns && (D.ns = Object.create(g)), D.opt.unquotedAttributeValues === void 0 && (D.opt.unquotedAttributeValues = !m), D.trackPosition = D.opt.position !== !1, D.trackPosition && (D.position = D.line = D.column = 0), q(D, "onready");
    }
    Object.create || (Object.create = function(m) {
      function p() {
      }
      p.prototype = m;
      var D = new p();
      return D;
    }), Object.keys || (Object.keys = function(m) {
      var p = [];
      for (var D in m) m.hasOwnProperty(D) && p.push(D);
      return p;
    });
    function i(m) {
      for (var p = Math.max(t.MAX_BUFFER_LENGTH, 10), D = 0, P = 0, ee = r.length; P < ee; P++) {
        var de = m[r[P]].length;
        if (de > p)
          switch (r[P]) {
            case "textNode":
              X(m);
              break;
            case "cdata":
              z(m, "oncdata", m.cdata), m.cdata = "";
              break;
            case "script":
              z(m, "onscript", m.script), m.script = "";
              break;
            default:
              F(m, "Max buffer length exceeded: " + r[P]);
          }
        D = Math.max(D, de);
      }
      var me = t.MAX_BUFFER_LENGTH - D;
      m.bufferCheckPosition = me + m.position;
    }
    function o(m) {
      for (var p = 0, D = r.length; p < D; p++)
        m[r[p]] = "";
    }
    function a(m) {
      X(m), m.cdata !== "" && (z(m, "oncdata", m.cdata), m.cdata = ""), m.script !== "" && (z(m, "onscript", m.script), m.script = "");
    }
    n.prototype = {
      end: function() {
        G(this);
      },
      write: j,
      resume: function() {
        return this.error = null, this;
      },
      close: function() {
        return this.write(null);
      },
      flush: function() {
        a(this);
      }
    };
    var s;
    try {
      s = require("stream").Stream;
    } catch {
      s = function() {
      };
    }
    s || (s = function() {
    });
    var c = t.EVENTS.filter(function(m) {
      return m !== "error" && m !== "end";
    });
    function f(m, p) {
      return new l(m, p);
    }
    function l(m, p) {
      if (!(this instanceof l))
        return new l(m, p);
      s.apply(this), this._parser = new n(m, p), this.writable = !0, this.readable = !0;
      var D = this;
      this._parser.onend = function() {
        D.emit("end");
      }, this._parser.onerror = function(P) {
        D.emit("error", P), D._parser.error = null;
      }, this._decoder = null, c.forEach(function(P) {
        Object.defineProperty(D, "on" + P, {
          get: function() {
            return D._parser["on" + P];
          },
          set: function(ee) {
            if (!ee)
              return D.removeAllListeners(P), D._parser["on" + P] = ee, ee;
            D.on(P, ee);
          },
          enumerable: !0,
          configurable: !1
        });
      });
    }
    l.prototype = Object.create(s.prototype, {
      constructor: {
        value: l
      }
    }), l.prototype.write = function(m) {
      if (typeof Buffer == "function" && typeof Buffer.isBuffer == "function" && Buffer.isBuffer(m)) {
        if (!this._decoder) {
          var p = X0.StringDecoder;
          this._decoder = new p("utf8");
        }
        m = this._decoder.write(m);
      }
      return this._parser.write(m.toString()), this.emit("data", m), !0;
    }, l.prototype.end = function(m) {
      return m && m.length && this.write(m), this._parser.end(), !0;
    }, l.prototype.on = function(m, p) {
      var D = this;
      return !D._parser["on" + m] && c.indexOf(m) !== -1 && (D._parser["on" + m] = function() {
        var P = arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments);
        P.splice(0, 0, m), D.emit.apply(D, P);
      }), s.prototype.on.call(D, m, p);
    };
    var u = "[CDATA[", d = "DOCTYPE", h = "http://www.w3.org/XML/1998/namespace", y = "http://www.w3.org/2000/xmlns/", g = { xml: h, xmlns: y }, $ = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/, v = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/, S = /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/, C = /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/;
    function R(m) {
      return m === " " || m === `
` || m === "\r" || m === "	";
    }
    function M(m) {
      return m === '"' || m === "'";
    }
    function I(m) {
      return m === ">" || R(m);
    }
    function L(m, p) {
      return m.test(p);
    }
    function B(m, p) {
      return !L(m, p);
    }
    var w = 0;
    t.STATE = {
      BEGIN: w++,
      // leading byte order mark or whitespace
      BEGIN_WHITESPACE: w++,
      // leading whitespace
      TEXT: w++,
      // general stuff
      TEXT_ENTITY: w++,
      // &amp and such.
      OPEN_WAKA: w++,
      // <
      SGML_DECL: w++,
      // <!BLARG
      SGML_DECL_QUOTED: w++,
      // <!BLARG foo "bar
      DOCTYPE: w++,
      // <!DOCTYPE
      DOCTYPE_QUOTED: w++,
      // <!DOCTYPE "//blah
      DOCTYPE_DTD: w++,
      // <!DOCTYPE "//blah" [ ...
      DOCTYPE_DTD_QUOTED: w++,
      // <!DOCTYPE "//blah" [ "foo
      COMMENT_STARTING: w++,
      // <!-
      COMMENT: w++,
      // <!--
      COMMENT_ENDING: w++,
      // <!-- blah -
      COMMENT_ENDED: w++,
      // <!-- blah --
      CDATA: w++,
      // <![CDATA[ something
      CDATA_ENDING: w++,
      // ]
      CDATA_ENDING_2: w++,
      // ]]
      PROC_INST: w++,
      // <?hi
      PROC_INST_BODY: w++,
      // <?hi there
      PROC_INST_ENDING: w++,
      // <?hi "there" ?
      OPEN_TAG: w++,
      // <strong
      OPEN_TAG_SLASH: w++,
      // <strong /
      ATTRIB: w++,
      // <a
      ATTRIB_NAME: w++,
      // <a foo
      ATTRIB_NAME_SAW_WHITE: w++,
      // <a foo _
      ATTRIB_VALUE: w++,
      // <a foo=
      ATTRIB_VALUE_QUOTED: w++,
      // <a foo="bar
      ATTRIB_VALUE_CLOSED: w++,
      // <a foo="bar"
      ATTRIB_VALUE_UNQUOTED: w++,
      // <a foo=bar
      ATTRIB_VALUE_ENTITY_Q: w++,
      // <foo bar="&quot;"
      ATTRIB_VALUE_ENTITY_U: w++,
      // <foo bar=&quot
      CLOSE_TAG: w++,
      // </a
      CLOSE_TAG_SAW_WHITE: w++,
      // </a   >
      SCRIPT: w++,
      // <script> ...
      SCRIPT_ENDING: w++
      // <script> ... <
    }, t.XML_ENTITIES = {
      amp: "&",
      gt: ">",
      lt: "<",
      quot: '"',
      apos: "'"
    }, t.ENTITIES = {
      amp: "&",
      gt: ">",
      lt: "<",
      quot: '"',
      apos: "'",
      AElig: 198,
      Aacute: 193,
      Acirc: 194,
      Agrave: 192,
      Aring: 197,
      Atilde: 195,
      Auml: 196,
      Ccedil: 199,
      ETH: 208,
      Eacute: 201,
      Ecirc: 202,
      Egrave: 200,
      Euml: 203,
      Iacute: 205,
      Icirc: 206,
      Igrave: 204,
      Iuml: 207,
      Ntilde: 209,
      Oacute: 211,
      Ocirc: 212,
      Ograve: 210,
      Oslash: 216,
      Otilde: 213,
      Ouml: 214,
      THORN: 222,
      Uacute: 218,
      Ucirc: 219,
      Ugrave: 217,
      Uuml: 220,
      Yacute: 221,
      aacute: 225,
      acirc: 226,
      aelig: 230,
      agrave: 224,
      aring: 229,
      atilde: 227,
      auml: 228,
      ccedil: 231,
      eacute: 233,
      ecirc: 234,
      egrave: 232,
      eth: 240,
      euml: 235,
      iacute: 237,
      icirc: 238,
      igrave: 236,
      iuml: 239,
      ntilde: 241,
      oacute: 243,
      ocirc: 244,
      ograve: 242,
      oslash: 248,
      otilde: 245,
      ouml: 246,
      szlig: 223,
      thorn: 254,
      uacute: 250,
      ucirc: 251,
      ugrave: 249,
      uuml: 252,
      yacute: 253,
      yuml: 255,
      copy: 169,
      reg: 174,
      nbsp: 160,
      iexcl: 161,
      cent: 162,
      pound: 163,
      curren: 164,
      yen: 165,
      brvbar: 166,
      sect: 167,
      uml: 168,
      ordf: 170,
      laquo: 171,
      not: 172,
      shy: 173,
      macr: 175,
      deg: 176,
      plusmn: 177,
      sup1: 185,
      sup2: 178,
      sup3: 179,
      acute: 180,
      micro: 181,
      para: 182,
      middot: 183,
      cedil: 184,
      ordm: 186,
      raquo: 187,
      frac14: 188,
      frac12: 189,
      frac34: 190,
      iquest: 191,
      times: 215,
      divide: 247,
      OElig: 338,
      oelig: 339,
      Scaron: 352,
      scaron: 353,
      Yuml: 376,
      fnof: 402,
      circ: 710,
      tilde: 732,
      Alpha: 913,
      Beta: 914,
      Gamma: 915,
      Delta: 916,
      Epsilon: 917,
      Zeta: 918,
      Eta: 919,
      Theta: 920,
      Iota: 921,
      Kappa: 922,
      Lambda: 923,
      Mu: 924,
      Nu: 925,
      Xi: 926,
      Omicron: 927,
      Pi: 928,
      Rho: 929,
      Sigma: 931,
      Tau: 932,
      Upsilon: 933,
      Phi: 934,
      Chi: 935,
      Psi: 936,
      Omega: 937,
      alpha: 945,
      beta: 946,
      gamma: 947,
      delta: 948,
      epsilon: 949,
      zeta: 950,
      eta: 951,
      theta: 952,
      iota: 953,
      kappa: 954,
      lambda: 955,
      mu: 956,
      nu: 957,
      xi: 958,
      omicron: 959,
      pi: 960,
      rho: 961,
      sigmaf: 962,
      sigma: 963,
      tau: 964,
      upsilon: 965,
      phi: 966,
      chi: 967,
      psi: 968,
      omega: 969,
      thetasym: 977,
      upsih: 978,
      piv: 982,
      ensp: 8194,
      emsp: 8195,
      thinsp: 8201,
      zwnj: 8204,
      zwj: 8205,
      lrm: 8206,
      rlm: 8207,
      ndash: 8211,
      mdash: 8212,
      lsquo: 8216,
      rsquo: 8217,
      sbquo: 8218,
      ldquo: 8220,
      rdquo: 8221,
      bdquo: 8222,
      dagger: 8224,
      Dagger: 8225,
      bull: 8226,
      hellip: 8230,
      permil: 8240,
      prime: 8242,
      Prime: 8243,
      lsaquo: 8249,
      rsaquo: 8250,
      oline: 8254,
      frasl: 8260,
      euro: 8364,
      image: 8465,
      weierp: 8472,
      real: 8476,
      trade: 8482,
      alefsym: 8501,
      larr: 8592,
      uarr: 8593,
      rarr: 8594,
      darr: 8595,
      harr: 8596,
      crarr: 8629,
      lArr: 8656,
      uArr: 8657,
      rArr: 8658,
      dArr: 8659,
      hArr: 8660,
      forall: 8704,
      part: 8706,
      exist: 8707,
      empty: 8709,
      nabla: 8711,
      isin: 8712,
      notin: 8713,
      ni: 8715,
      prod: 8719,
      sum: 8721,
      minus: 8722,
      lowast: 8727,
      radic: 8730,
      prop: 8733,
      infin: 8734,
      ang: 8736,
      and: 8743,
      or: 8744,
      cap: 8745,
      cup: 8746,
      int: 8747,
      there4: 8756,
      sim: 8764,
      cong: 8773,
      asymp: 8776,
      ne: 8800,
      equiv: 8801,
      le: 8804,
      ge: 8805,
      sub: 8834,
      sup: 8835,
      nsub: 8836,
      sube: 8838,
      supe: 8839,
      oplus: 8853,
      otimes: 8855,
      perp: 8869,
      sdot: 8901,
      lceil: 8968,
      rceil: 8969,
      lfloor: 8970,
      rfloor: 8971,
      lang: 9001,
      rang: 9002,
      loz: 9674,
      spades: 9824,
      clubs: 9827,
      hearts: 9829,
      diams: 9830
    }, Object.keys(t.ENTITIES).forEach(function(m) {
      var p = t.ENTITIES[m], D = typeof p == "number" ? String.fromCharCode(p) : p;
      t.ENTITIES[m] = D;
    });
    for (var K in t.STATE)
      t.STATE[t.STATE[K]] = K;
    w = t.STATE;
    function q(m, p, D) {
      m[p] && m[p](D);
    }
    function z(m, p, D) {
      m.textNode && X(m), q(m, p, D);
    }
    function X(m) {
      m.textNode = k(m.opt, m.textNode), m.textNode && q(m, "ontext", m.textNode), m.textNode = "";
    }
    function k(m, p) {
      return m.trim && (p = p.trim()), m.normalize && (p = p.replace(/\s+/g, " ")), p;
    }
    function F(m, p) {
      return X(m), m.trackPosition && (p += `
Line: ` + m.line + `
Column: ` + m.column + `
Char: ` + m.c), p = new Error(p), m.error = p, q(m, "onerror", p), m;
    }
    function G(m) {
      return m.sawRoot && !m.closedRoot && x(m, "Unclosed root tag"), m.state !== w.BEGIN && m.state !== w.BEGIN_WHITESPACE && m.state !== w.TEXT && F(m, "Unexpected end"), X(m), m.c = "", m.closed = !0, q(m, "onend"), n.call(m, m.strict, m.opt), m;
    }
    function x(m, p) {
      if (typeof m != "object" || !(m instanceof n))
        throw new Error("bad call to strictFail");
      m.strict && F(m, p);
    }
    function W(m) {
      m.strict || (m.tagName = m.tagName[m.looseCase]());
      var p = m.tags[m.tags.length - 1] || m, D = m.tag = { name: m.tagName, attributes: {} };
      m.opt.xmlns && (D.ns = p.ns), m.attribList.length = 0, z(m, "onopentagstart", D);
    }
    function V(m, p) {
      var D = m.indexOf(":"), P = D < 0 ? ["", m] : m.split(":"), ee = P[0], de = P[1];
      return p && m === "xmlns" && (ee = "xmlns", de = ""), { prefix: ee, local: de };
    }
    function U(m) {
      if (m.strict || (m.attribName = m.attribName[m.looseCase]()), m.attribList.indexOf(m.attribName) !== -1 || m.tag.attributes.hasOwnProperty(m.attribName)) {
        m.attribName = m.attribValue = "";
        return;
      }
      if (m.opt.xmlns) {
        var p = V(m.attribName, !0), D = p.prefix, P = p.local;
        if (D === "xmlns")
          if (P === "xml" && m.attribValue !== h)
            x(
              m,
              "xml: prefix must be bound to " + h + `
Actual: ` + m.attribValue
            );
          else if (P === "xmlns" && m.attribValue !== y)
            x(
              m,
              "xmlns: prefix must be bound to " + y + `
Actual: ` + m.attribValue
            );
          else {
            var ee = m.tag, de = m.tags[m.tags.length - 1] || m;
            ee.ns === de.ns && (ee.ns = Object.create(de.ns)), ee.ns[P] = m.attribValue;
          }
        m.attribList.push([m.attribName, m.attribValue]);
      } else
        m.tag.attributes[m.attribName] = m.attribValue, z(m, "onattribute", {
          name: m.attribName,
          value: m.attribValue
        });
      m.attribName = m.attribValue = "";
    }
    function T(m, p) {
      if (m.opt.xmlns) {
        var D = m.tag, P = V(m.tagName);
        D.prefix = P.prefix, D.local = P.local, D.uri = D.ns[P.prefix] || "", D.prefix && !D.uri && (x(m, "Unbound namespace prefix: " + JSON.stringify(m.tagName)), D.uri = P.prefix);
        var ee = m.tags[m.tags.length - 1] || m;
        D.ns && ee.ns !== D.ns && Object.keys(D.ns).forEach(function(tr) {
          z(m, "onopennamespace", {
            prefix: tr,
            uri: D.ns[tr]
          });
        });
        for (var de = 0, me = m.attribList.length; de < me; de++) {
          var Pe = m.attribList[de], Ae = Pe[0], pt = Pe[1], _e = V(Ae, !0), Xe = _e.prefix, Lr = _e.local, er = Xe === "" ? "" : D.ns[Xe] || "", Mt = {
            name: Ae,
            value: pt,
            prefix: Xe,
            local: Lr,
            uri: er
          };
          Xe && Xe !== "xmlns" && !er && (x(m, "Unbound namespace prefix: " + JSON.stringify(Xe)), Mt.uri = Xe), m.tag.attributes[Ae] = Mt, z(m, "onattribute", Mt);
        }
        m.attribList.length = 0;
      }
      m.tag.isSelfClosing = !!p, m.sawRoot = !0, m.tags.push(m.tag), z(m, "onopentag", m.tag), p || (!m.noscript && m.tagName.toLowerCase() === "script" ? m.state = w.SCRIPT : m.state = w.TEXT, m.tag = null, m.tagName = ""), m.attribName = m.attribValue = "", m.attribList.length = 0;
    }
    function N(m) {
      if (!m.tagName) {
        x(m, "Weird empty close tag."), m.textNode += "</>", m.state = w.TEXT;
        return;
      }
      if (m.script) {
        if (m.tagName !== "script") {
          m.script += "</" + m.tagName + ">", m.tagName = "", m.state = w.SCRIPT;
          return;
        }
        z(m, "onscript", m.script), m.script = "";
      }
      var p = m.tags.length, D = m.tagName;
      m.strict || (D = D[m.looseCase]());
      for (var P = D; p--; ) {
        var ee = m.tags[p];
        if (ee.name !== P)
          x(m, "Unexpected close tag");
        else
          break;
      }
      if (p < 0) {
        x(m, "Unmatched closing tag: " + m.tagName), m.textNode += "</" + m.tagName + ">", m.state = w.TEXT;
        return;
      }
      m.tagName = D;
      for (var de = m.tags.length; de-- > p; ) {
        var me = m.tag = m.tags.pop();
        m.tagName = m.tag.name, z(m, "onclosetag", m.tagName);
        var Pe = {};
        for (var Ae in me.ns)
          Pe[Ae] = me.ns[Ae];
        var pt = m.tags[m.tags.length - 1] || m;
        m.opt.xmlns && me.ns !== pt.ns && Object.keys(me.ns).forEach(function(_e) {
          var Xe = me.ns[_e];
          z(m, "onclosenamespace", { prefix: _e, uri: Xe });
        });
      }
      p === 0 && (m.closedRoot = !0), m.tagName = m.attribValue = m.attribName = "", m.attribList.length = 0, m.state = w.TEXT;
    }
    function A(m) {
      var p = m.entity, D = p.toLowerCase(), P, ee = "";
      return m.ENTITIES[p] ? m.ENTITIES[p] : m.ENTITIES[D] ? m.ENTITIES[D] : (p = D, p.charAt(0) === "#" && (p.charAt(1) === "x" ? (p = p.slice(2), P = parseInt(p, 16), ee = P.toString(16)) : (p = p.slice(1), P = parseInt(p, 10), ee = P.toString(10))), p = p.replace(/^0+/, ""), isNaN(P) || ee.toLowerCase() !== p ? (x(m, "Invalid character entity"), "&" + m.entity + ";") : String.fromCodePoint(P));
    }
    function _(m, p) {
      p === "<" ? (m.state = w.OPEN_WAKA, m.startTagPosition = m.position) : R(p) || (x(m, "Non-whitespace before first tag."), m.textNode = p, m.state = w.TEXT);
    }
    function b(m, p) {
      var D = "";
      return p < m.length && (D = m.charAt(p)), D;
    }
    function j(m) {
      var p = this;
      if (this.error)
        throw this.error;
      if (p.closed)
        return F(
          p,
          "Cannot write after close. Assign an onready handler."
        );
      if (m === null)
        return G(p);
      typeof m == "object" && (m = m.toString());
      for (var D = 0, P = ""; P = b(m, D++), p.c = P, !!P; )
        switch (p.trackPosition && (p.position++, P === `
` ? (p.line++, p.column = 0) : p.column++), p.state) {
          case w.BEGIN:
            if (p.state = w.BEGIN_WHITESPACE, P === "\uFEFF")
              continue;
            _(p, P);
            continue;
          case w.BEGIN_WHITESPACE:
            _(p, P);
            continue;
          case w.TEXT:
            if (p.sawRoot && !p.closedRoot) {
              for (var ee = D - 1; P && P !== "<" && P !== "&"; )
                P = b(m, D++), P && p.trackPosition && (p.position++, P === `
` ? (p.line++, p.column = 0) : p.column++);
              p.textNode += m.substring(ee, D - 1);
            }
            P === "<" && !(p.sawRoot && p.closedRoot && !p.strict) ? (p.state = w.OPEN_WAKA, p.startTagPosition = p.position) : (!R(P) && (!p.sawRoot || p.closedRoot) && x(p, "Text data outside of root node."), P === "&" ? p.state = w.TEXT_ENTITY : p.textNode += P);
            continue;
          case w.SCRIPT:
            P === "<" ? p.state = w.SCRIPT_ENDING : p.script += P;
            continue;
          case w.SCRIPT_ENDING:
            P === "/" ? p.state = w.CLOSE_TAG : (p.script += "<" + P, p.state = w.SCRIPT);
            continue;
          case w.OPEN_WAKA:
            if (P === "!")
              p.state = w.SGML_DECL, p.sgmlDecl = "";
            else if (!R(P)) if (L($, P))
              p.state = w.OPEN_TAG, p.tagName = P;
            else if (P === "/")
              p.state = w.CLOSE_TAG, p.tagName = "";
            else if (P === "?")
              p.state = w.PROC_INST, p.procInstName = p.procInstBody = "";
            else {
              if (x(p, "Unencoded <"), p.startTagPosition + 1 < p.position) {
                var de = p.position - p.startTagPosition;
                P = new Array(de).join(" ") + P;
              }
              p.textNode += "<" + P, p.state = w.TEXT;
            }
            continue;
          case w.SGML_DECL:
            if (p.sgmlDecl + P === "--") {
              p.state = w.COMMENT, p.comment = "", p.sgmlDecl = "";
              continue;
            }
            p.doctype && p.doctype !== !0 && p.sgmlDecl ? (p.state = w.DOCTYPE_DTD, p.doctype += "<!" + p.sgmlDecl + P, p.sgmlDecl = "") : (p.sgmlDecl + P).toUpperCase() === u ? (z(p, "onopencdata"), p.state = w.CDATA, p.sgmlDecl = "", p.cdata = "") : (p.sgmlDecl + P).toUpperCase() === d ? (p.state = w.DOCTYPE, (p.doctype || p.sawRoot) && x(
              p,
              "Inappropriately located doctype declaration"
            ), p.doctype = "", p.sgmlDecl = "") : P === ">" ? (z(p, "onsgmldeclaration", p.sgmlDecl), p.sgmlDecl = "", p.state = w.TEXT) : (M(P) && (p.state = w.SGML_DECL_QUOTED), p.sgmlDecl += P);
            continue;
          case w.SGML_DECL_QUOTED:
            P === p.q && (p.state = w.SGML_DECL, p.q = ""), p.sgmlDecl += P;
            continue;
          case w.DOCTYPE:
            P === ">" ? (p.state = w.TEXT, z(p, "ondoctype", p.doctype), p.doctype = !0) : (p.doctype += P, P === "[" ? p.state = w.DOCTYPE_DTD : M(P) && (p.state = w.DOCTYPE_QUOTED, p.q = P));
            continue;
          case w.DOCTYPE_QUOTED:
            p.doctype += P, P === p.q && (p.q = "", p.state = w.DOCTYPE);
            continue;
          case w.DOCTYPE_DTD:
            P === "]" ? (p.doctype += P, p.state = w.DOCTYPE) : P === "<" ? (p.state = w.OPEN_WAKA, p.startTagPosition = p.position) : M(P) ? (p.doctype += P, p.state = w.DOCTYPE_DTD_QUOTED, p.q = P) : p.doctype += P;
            continue;
          case w.DOCTYPE_DTD_QUOTED:
            p.doctype += P, P === p.q && (p.state = w.DOCTYPE_DTD, p.q = "");
            continue;
          case w.COMMENT:
            P === "-" ? p.state = w.COMMENT_ENDING : p.comment += P;
            continue;
          case w.COMMENT_ENDING:
            P === "-" ? (p.state = w.COMMENT_ENDED, p.comment = k(p.opt, p.comment), p.comment && z(p, "oncomment", p.comment), p.comment = "") : (p.comment += "-" + P, p.state = w.COMMENT);
            continue;
          case w.COMMENT_ENDED:
            P !== ">" ? (x(p, "Malformed comment"), p.comment += "--" + P, p.state = w.COMMENT) : p.doctype && p.doctype !== !0 ? p.state = w.DOCTYPE_DTD : p.state = w.TEXT;
            continue;
          case w.CDATA:
            P === "]" ? p.state = w.CDATA_ENDING : p.cdata += P;
            continue;
          case w.CDATA_ENDING:
            P === "]" ? p.state = w.CDATA_ENDING_2 : (p.cdata += "]" + P, p.state = w.CDATA);
            continue;
          case w.CDATA_ENDING_2:
            P === ">" ? (p.cdata && z(p, "oncdata", p.cdata), z(p, "onclosecdata"), p.cdata = "", p.state = w.TEXT) : P === "]" ? p.cdata += "]" : (p.cdata += "]]" + P, p.state = w.CDATA);
            continue;
          case w.PROC_INST:
            P === "?" ? p.state = w.PROC_INST_ENDING : R(P) ? p.state = w.PROC_INST_BODY : p.procInstName += P;
            continue;
          case w.PROC_INST_BODY:
            if (!p.procInstBody && R(P))
              continue;
            P === "?" ? p.state = w.PROC_INST_ENDING : p.procInstBody += P;
            continue;
          case w.PROC_INST_ENDING:
            P === ">" ? (z(p, "onprocessinginstruction", {
              name: p.procInstName,
              body: p.procInstBody
            }), p.procInstName = p.procInstBody = "", p.state = w.TEXT) : (p.procInstBody += "?" + P, p.state = w.PROC_INST_BODY);
            continue;
          case w.OPEN_TAG:
            L(v, P) ? p.tagName += P : (W(p), P === ">" ? T(p) : P === "/" ? p.state = w.OPEN_TAG_SLASH : (R(P) || x(p, "Invalid character in tag name"), p.state = w.ATTRIB));
            continue;
          case w.OPEN_TAG_SLASH:
            P === ">" ? (T(p, !0), N(p)) : (x(p, "Forward-slash in opening tag not followed by >"), p.state = w.ATTRIB);
            continue;
          case w.ATTRIB:
            if (R(P))
              continue;
            P === ">" ? T(p) : P === "/" ? p.state = w.OPEN_TAG_SLASH : L($, P) ? (p.attribName = P, p.attribValue = "", p.state = w.ATTRIB_NAME) : x(p, "Invalid attribute name");
            continue;
          case w.ATTRIB_NAME:
            P === "=" ? p.state = w.ATTRIB_VALUE : P === ">" ? (x(p, "Attribute without value"), p.attribValue = p.attribName, U(p), T(p)) : R(P) ? p.state = w.ATTRIB_NAME_SAW_WHITE : L(v, P) ? p.attribName += P : x(p, "Invalid attribute name");
            continue;
          case w.ATTRIB_NAME_SAW_WHITE:
            if (P === "=")
              p.state = w.ATTRIB_VALUE;
            else {
              if (R(P))
                continue;
              x(p, "Attribute without value"), p.tag.attributes[p.attribName] = "", p.attribValue = "", z(p, "onattribute", {
                name: p.attribName,
                value: ""
              }), p.attribName = "", P === ">" ? T(p) : L($, P) ? (p.attribName = P, p.state = w.ATTRIB_NAME) : (x(p, "Invalid attribute name"), p.state = w.ATTRIB);
            }
            continue;
          case w.ATTRIB_VALUE:
            if (R(P))
              continue;
            M(P) ? (p.q = P, p.state = w.ATTRIB_VALUE_QUOTED) : (p.opt.unquotedAttributeValues || F(p, "Unquoted attribute value"), p.state = w.ATTRIB_VALUE_UNQUOTED, p.attribValue = P);
            continue;
          case w.ATTRIB_VALUE_QUOTED:
            if (P !== p.q) {
              P === "&" ? p.state = w.ATTRIB_VALUE_ENTITY_Q : p.attribValue += P;
              continue;
            }
            U(p), p.q = "", p.state = w.ATTRIB_VALUE_CLOSED;
            continue;
          case w.ATTRIB_VALUE_CLOSED:
            R(P) ? p.state = w.ATTRIB : P === ">" ? T(p) : P === "/" ? p.state = w.OPEN_TAG_SLASH : L($, P) ? (x(p, "No whitespace between attributes"), p.attribName = P, p.attribValue = "", p.state = w.ATTRIB_NAME) : x(p, "Invalid attribute name");
            continue;
          case w.ATTRIB_VALUE_UNQUOTED:
            if (!I(P)) {
              P === "&" ? p.state = w.ATTRIB_VALUE_ENTITY_U : p.attribValue += P;
              continue;
            }
            U(p), P === ">" ? T(p) : p.state = w.ATTRIB;
            continue;
          case w.CLOSE_TAG:
            if (p.tagName)
              P === ">" ? N(p) : L(v, P) ? p.tagName += P : p.script ? (p.script += "</" + p.tagName, p.tagName = "", p.state = w.SCRIPT) : (R(P) || x(p, "Invalid tagname in closing tag"), p.state = w.CLOSE_TAG_SAW_WHITE);
            else {
              if (R(P))
                continue;
              B($, P) ? p.script ? (p.script += "</" + P, p.state = w.SCRIPT) : x(p, "Invalid tagname in closing tag.") : p.tagName = P;
            }
            continue;
          case w.CLOSE_TAG_SAW_WHITE:
            if (R(P))
              continue;
            P === ">" ? N(p) : x(p, "Invalid characters in closing tag");
            continue;
          case w.TEXT_ENTITY:
          case w.ATTRIB_VALUE_ENTITY_Q:
          case w.ATTRIB_VALUE_ENTITY_U:
            var me, Pe;
            switch (p.state) {
              case w.TEXT_ENTITY:
                me = w.TEXT, Pe = "textNode";
                break;
              case w.ATTRIB_VALUE_ENTITY_Q:
                me = w.ATTRIB_VALUE_QUOTED, Pe = "attribValue";
                break;
              case w.ATTRIB_VALUE_ENTITY_U:
                me = w.ATTRIB_VALUE_UNQUOTED, Pe = "attribValue";
                break;
            }
            if (P === ";") {
              var Ae = A(p);
              p.opt.unparsedEntities && !Object.values(t.XML_ENTITIES).includes(Ae) ? (p.entity = "", p.state = me, p.write(Ae)) : (p[Pe] += Ae, p.entity = "", p.state = me);
            } else L(p.entity.length ? C : S, P) ? p.entity += P : (x(p, "Invalid character in entity name"), p[Pe] += "&" + p.entity + P, p.entity = "", p.state = me);
            continue;
          default:
            throw new Error(p, "Unknown state: " + p.state);
        }
      return p.position >= p.bufferCheckPosition && i(p), p;
    }
    /*! http://mths.be/fromcodepoint v0.1.0 by @mathias */
    String.fromCodePoint || function() {
      var m = String.fromCharCode, p = Math.floor, D = function() {
        var P = 16384, ee = [], de, me, Pe = -1, Ae = arguments.length;
        if (!Ae)
          return "";
        for (var pt = ""; ++Pe < Ae; ) {
          var _e = Number(arguments[Pe]);
          if (!isFinite(_e) || // `NaN`, `+Infinity`, or `-Infinity`
          _e < 0 || // not a valid Unicode code point
          _e > 1114111 || // not a valid Unicode code point
          p(_e) !== _e)
            throw RangeError("Invalid code point: " + _e);
          _e <= 65535 ? ee.push(_e) : (_e -= 65536, de = (_e >> 10) + 55296, me = _e % 1024 + 56320, ee.push(de, me)), (Pe + 1 === Ae || ee.length > P) && (pt += m.apply(null, ee), ee.length = 0);
        }
        return pt;
      };
      Object.defineProperty ? Object.defineProperty(String, "fromCodePoint", {
        value: D,
        configurable: !0,
        writable: !0
      }) : String.fromCodePoint = D;
    }();
  })(e);
})(Qh);
Object.defineProperty(io, "__esModule", { value: !0 });
io.XElement = void 0;
io.parseXml = kv;
const Rv = Qh, Oo = Gn;
class Zh {
  constructor(t) {
    if (this.name = t, this.value = "", this.attributes = null, this.isCData = !1, this.elements = null, !t)
      throw (0, Oo.newError)("Element name cannot be empty", "ERR_XML_ELEMENT_NAME_EMPTY");
    if (!Dv(t))
      throw (0, Oo.newError)(`Invalid element name: ${t}`, "ERR_XML_ELEMENT_INVALID_NAME");
  }
  attribute(t) {
    const r = this.attributes === null ? null : this.attributes[t];
    if (r == null)
      throw (0, Oo.newError)(`No attribute "${t}"`, "ERR_XML_MISSED_ATTRIBUTE");
    return r;
  }
  removeAttribute(t) {
    this.attributes !== null && delete this.attributes[t];
  }
  element(t, r = !1, n = null) {
    const i = this.elementOrNull(t, r);
    if (i === null)
      throw (0, Oo.newError)(n || `No element "${t}"`, "ERR_XML_MISSED_ELEMENT");
    return i;
  }
  elementOrNull(t, r = !1) {
    if (this.elements === null)
      return null;
    for (const n of this.elements)
      if (Ju(n, t, r))
        return n;
    return null;
  }
  getElements(t, r = !1) {
    return this.elements === null ? [] : this.elements.filter((n) => Ju(n, t, r));
  }
  elementValueOrEmpty(t, r = !1) {
    const n = this.elementOrNull(t, r);
    return n === null ? "" : n.value;
  }
}
io.XElement = Zh;
const Nv = new RegExp(/^[A-Za-z_][:A-Za-z0-9_-]*$/i);
function Dv(e) {
  return Nv.test(e);
}
function Ju(e, t, r) {
  const n = e.name;
  return n === t || r === !0 && n.length === t.length && n.toLowerCase() === t.toLowerCase();
}
function kv(e) {
  let t = null;
  const r = Rv.parser(!0, {}), n = [];
  return r.onopentag = (i) => {
    const o = new Zh(i.name);
    if (o.attributes = i.attributes, t === null)
      t = o;
    else {
      const a = n[n.length - 1];
      a.elements == null && (a.elements = []), a.elements.push(o);
    }
    n.push(o);
  }, r.onclosetag = () => {
    n.pop();
  }, r.ontext = (i) => {
    n.length > 0 && (n[n.length - 1].value = i);
  }, r.oncdata = (i) => {
    const o = n[n.length - 1];
    o.value = i, o.isCData = !0;
  }, r.onerror = (i) => {
    throw i;
  }, r.write(e), t;
}
var Oa = {};
Object.defineProperty(Oa, "__esModule", { value: !0 });
Oa.MemoLazy = void 0;
class Fv {
  constructor(t, r) {
    this.selector = t, this.creator = r, this.selected = void 0, this._value = void 0;
  }
  get hasValue() {
    return this._value !== void 0;
  }
  get value() {
    const t = this.selector();
    if (this._value !== void 0 && ep(this.selected, t))
      return this._value;
    this.selected = t;
    const r = this.creator(t);
    return this.value = r, r;
  }
  set value(t) {
    this._value = t;
  }
}
Oa.MemoLazy = Fv;
function ep(e, t) {
  if (typeof e == "object" && e !== null && (typeof t == "object" && t !== null)) {
    const i = Object.keys(e), o = Object.keys(t);
    return i.length === o.length && i.every((a) => ep(e[a], t[a]));
  }
  return e === t;
}
var xc = {};
Object.defineProperty(xc, "__esModule", { value: !0 });
xc.retry = tp;
const Lv = Pr;
async function tp(e, t, r, n = 0, i = 0, o) {
  var a;
  const s = new Lv.CancellationToken();
  try {
    return await e();
  } catch (c) {
    if ((!((a = o == null ? void 0 : o(c)) !== null && a !== void 0) || a) && t > 0 && !s.cancelled)
      return await new Promise((f) => setTimeout(f, r + n * i)), await tp(e, t - 1, r, n, i + 1, o);
    throw c;
  }
}
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.CURRENT_APP_PACKAGE_FILE_NAME = e.CURRENT_APP_INSTALLER_FILE_NAME = e.retry = e.MemoLazy = e.newError = e.XElement = e.parseXml = e.ProgressCallbackTransform = e.UUID = e.parseDn = e.githubUrl = e.getS3LikeProviderBaseUrl = e.configureRequestUrl = e.parseJson = e.safeStringifyJson = e.configureRequestOptionsFromUrl = e.configureRequestOptions = e.safeGetHeader = e.DigestTransform = e.HttpExecutor = e.createHttpError = e.HttpError = e.CancellationError = e.CancellationToken = void 0, e.asArray = u;
  var t = Pr;
  Object.defineProperty(e, "CancellationToken", { enumerable: !0, get: function() {
    return t.CancellationToken;
  } }), Object.defineProperty(e, "CancellationError", { enumerable: !0, get: function() {
    return t.CancellationError;
  } });
  var r = et;
  Object.defineProperty(e, "HttpError", { enumerable: !0, get: function() {
    return r.HttpError;
  } }), Object.defineProperty(e, "createHttpError", { enumerable: !0, get: function() {
    return r.createHttpError;
  } }), Object.defineProperty(e, "HttpExecutor", { enumerable: !0, get: function() {
    return r.HttpExecutor;
  } }), Object.defineProperty(e, "DigestTransform", { enumerable: !0, get: function() {
    return r.DigestTransform;
  } }), Object.defineProperty(e, "safeGetHeader", { enumerable: !0, get: function() {
    return r.safeGetHeader;
  } }), Object.defineProperty(e, "configureRequestOptions", { enumerable: !0, get: function() {
    return r.configureRequestOptions;
  } }), Object.defineProperty(e, "configureRequestOptionsFromUrl", { enumerable: !0, get: function() {
    return r.configureRequestOptionsFromUrl;
  } }), Object.defineProperty(e, "safeStringifyJson", { enumerable: !0, get: function() {
    return r.safeStringifyJson;
  } }), Object.defineProperty(e, "parseJson", { enumerable: !0, get: function() {
    return r.parseJson;
  } }), Object.defineProperty(e, "configureRequestUrl", { enumerable: !0, get: function() {
    return r.configureRequestUrl;
  } });
  var n = Aa;
  Object.defineProperty(e, "getS3LikeProviderBaseUrl", { enumerable: !0, get: function() {
    return n.getS3LikeProviderBaseUrl;
  } }), Object.defineProperty(e, "githubUrl", { enumerable: !0, get: function() {
    return n.githubUrl;
  } });
  var i = Lc;
  Object.defineProperty(e, "parseDn", { enumerable: !0, get: function() {
    return i.parseDn;
  } });
  var o = xn;
  Object.defineProperty(e, "UUID", { enumerable: !0, get: function() {
    return o.UUID;
  } });
  var a = no;
  Object.defineProperty(e, "ProgressCallbackTransform", { enumerable: !0, get: function() {
    return a.ProgressCallbackTransform;
  } });
  var s = io;
  Object.defineProperty(e, "parseXml", { enumerable: !0, get: function() {
    return s.parseXml;
  } }), Object.defineProperty(e, "XElement", { enumerable: !0, get: function() {
    return s.XElement;
  } });
  var c = Gn;
  Object.defineProperty(e, "newError", { enumerable: !0, get: function() {
    return c.newError;
  } });
  var f = Oa;
  Object.defineProperty(e, "MemoLazy", { enumerable: !0, get: function() {
    return f.MemoLazy;
  } });
  var l = xc;
  Object.defineProperty(e, "retry", { enumerable: !0, get: function() {
    return l.retry;
  } }), e.CURRENT_APP_INSTALLER_FILE_NAME = "installer.exe", e.CURRENT_APP_PACKAGE_FILE_NAME = "package.7z";
  function u(d) {
    return d == null ? [] : Array.isArray(d) ? d : [d];
  }
})(Fe);
var an = {}, fe = {};
fe.fromCallback = function(e) {
  return Object.defineProperty(function(...t) {
    if (typeof t[t.length - 1] == "function") e.apply(this, t);
    else
      return new Promise((r, n) => {
        t.push((i, o) => i != null ? n(i) : r(o)), e.apply(this, t);
      });
  }, "name", { value: e.name });
};
fe.fromPromise = function(e) {
  return Object.defineProperty(function(...t) {
    const r = t[t.length - 1];
    if (typeof r != "function") return e.apply(this, t);
    t.pop(), e.apply(this, t).then((n) => r(null, n), r);
  }, "name", { value: e.name });
};
var ar = J0, xv = process.cwd, Yo = null, Uv = process.env.GRACEFUL_FS_PLATFORM || process.platform;
process.cwd = function() {
  return Yo || (Yo = xv.call(process)), Yo;
};
try {
  process.cwd();
} catch {
}
if (typeof process.chdir == "function") {
  var Qu = process.chdir;
  process.chdir = function(e) {
    Yo = null, Qu.call(process, e);
  }, Object.setPrototypeOf && Object.setPrototypeOf(process.chdir, Qu);
}
var jv = Mv;
function Mv(e) {
  ar.hasOwnProperty("O_SYMLINK") && process.version.match(/^v0\.6\.[0-2]|^v0\.5\./) && t(e), e.lutimes || r(e), e.chown = o(e.chown), e.fchown = o(e.fchown), e.lchown = o(e.lchown), e.chmod = n(e.chmod), e.fchmod = n(e.fchmod), e.lchmod = n(e.lchmod), e.chownSync = a(e.chownSync), e.fchownSync = a(e.fchownSync), e.lchownSync = a(e.lchownSync), e.chmodSync = i(e.chmodSync), e.fchmodSync = i(e.fchmodSync), e.lchmodSync = i(e.lchmodSync), e.stat = s(e.stat), e.fstat = s(e.fstat), e.lstat = s(e.lstat), e.statSync = c(e.statSync), e.fstatSync = c(e.fstatSync), e.lstatSync = c(e.lstatSync), e.chmod && !e.lchmod && (e.lchmod = function(l, u, d) {
    d && process.nextTick(d);
  }, e.lchmodSync = function() {
  }), e.chown && !e.lchown && (e.lchown = function(l, u, d, h) {
    h && process.nextTick(h);
  }, e.lchownSync = function() {
  }), Uv === "win32" && (e.rename = typeof e.rename != "function" ? e.rename : function(l) {
    function u(d, h, y) {
      var g = Date.now(), $ = 0;
      l(d, h, function v(S) {
        if (S && (S.code === "EACCES" || S.code === "EPERM" || S.code === "EBUSY") && Date.now() - g < 6e4) {
          setTimeout(function() {
            e.stat(h, function(C, R) {
              C && C.code === "ENOENT" ? l(d, h, v) : y(S);
            });
          }, $), $ < 100 && ($ += 10);
          return;
        }
        y && y(S);
      });
    }
    return Object.setPrototypeOf && Object.setPrototypeOf(u, l), u;
  }(e.rename)), e.read = typeof e.read != "function" ? e.read : function(l) {
    function u(d, h, y, g, $, v) {
      var S;
      if (v && typeof v == "function") {
        var C = 0;
        S = function(R, M, I) {
          if (R && R.code === "EAGAIN" && C < 10)
            return C++, l.call(e, d, h, y, g, $, S);
          v.apply(this, arguments);
        };
      }
      return l.call(e, d, h, y, g, $, S);
    }
    return Object.setPrototypeOf && Object.setPrototypeOf(u, l), u;
  }(e.read), e.readSync = typeof e.readSync != "function" ? e.readSync : /* @__PURE__ */ function(l) {
    return function(u, d, h, y, g) {
      for (var $ = 0; ; )
        try {
          return l.call(e, u, d, h, y, g);
        } catch (v) {
          if (v.code === "EAGAIN" && $ < 10) {
            $++;
            continue;
          }
          throw v;
        }
    };
  }(e.readSync);
  function t(l) {
    l.lchmod = function(u, d, h) {
      l.open(
        u,
        ar.O_WRONLY | ar.O_SYMLINK,
        d,
        function(y, g) {
          if (y) {
            h && h(y);
            return;
          }
          l.fchmod(g, d, function($) {
            l.close(g, function(v) {
              h && h($ || v);
            });
          });
        }
      );
    }, l.lchmodSync = function(u, d) {
      var h = l.openSync(u, ar.O_WRONLY | ar.O_SYMLINK, d), y = !0, g;
      try {
        g = l.fchmodSync(h, d), y = !1;
      } finally {
        if (y)
          try {
            l.closeSync(h);
          } catch {
          }
        else
          l.closeSync(h);
      }
      return g;
    };
  }
  function r(l) {
    ar.hasOwnProperty("O_SYMLINK") && l.futimes ? (l.lutimes = function(u, d, h, y) {
      l.open(u, ar.O_SYMLINK, function(g, $) {
        if (g) {
          y && y(g);
          return;
        }
        l.futimes($, d, h, function(v) {
          l.close($, function(S) {
            y && y(v || S);
          });
        });
      });
    }, l.lutimesSync = function(u, d, h) {
      var y = l.openSync(u, ar.O_SYMLINK), g, $ = !0;
      try {
        g = l.futimesSync(y, d, h), $ = !1;
      } finally {
        if ($)
          try {
            l.closeSync(y);
          } catch {
          }
        else
          l.closeSync(y);
      }
      return g;
    }) : l.futimes && (l.lutimes = function(u, d, h, y) {
      y && process.nextTick(y);
    }, l.lutimesSync = function() {
    });
  }
  function n(l) {
    return l && function(u, d, h) {
      return l.call(e, u, d, function(y) {
        f(y) && (y = null), h && h.apply(this, arguments);
      });
    };
  }
  function i(l) {
    return l && function(u, d) {
      try {
        return l.call(e, u, d);
      } catch (h) {
        if (!f(h)) throw h;
      }
    };
  }
  function o(l) {
    return l && function(u, d, h, y) {
      return l.call(e, u, d, h, function(g) {
        f(g) && (g = null), y && y.apply(this, arguments);
      });
    };
  }
  function a(l) {
    return l && function(u, d, h) {
      try {
        return l.call(e, u, d, h);
      } catch (y) {
        if (!f(y)) throw y;
      }
    };
  }
  function s(l) {
    return l && function(u, d, h) {
      typeof d == "function" && (h = d, d = null);
      function y(g, $) {
        $ && ($.uid < 0 && ($.uid += 4294967296), $.gid < 0 && ($.gid += 4294967296)), h && h.apply(this, arguments);
      }
      return d ? l.call(e, u, d, y) : l.call(e, u, y);
    };
  }
  function c(l) {
    return l && function(u, d) {
      var h = d ? l.call(e, u, d) : l.call(e, u);
      return h && (h.uid < 0 && (h.uid += 4294967296), h.gid < 0 && (h.gid += 4294967296)), h;
    };
  }
  function f(l) {
    if (!l || l.code === "ENOSYS")
      return !0;
    var u = !process.getuid || process.getuid() !== 0;
    return !!(u && (l.code === "EINVAL" || l.code === "EPERM"));
  }
}
var Zu = to.Stream, qv = Hv;
function Hv(e) {
  return {
    ReadStream: t,
    WriteStream: r
  };
  function t(n, i) {
    if (!(this instanceof t)) return new t(n, i);
    Zu.call(this);
    var o = this;
    this.path = n, this.fd = null, this.readable = !0, this.paused = !1, this.flags = "r", this.mode = 438, this.bufferSize = 64 * 1024, i = i || {};
    for (var a = Object.keys(i), s = 0, c = a.length; s < c; s++) {
      var f = a[s];
      this[f] = i[f];
    }
    if (this.encoding && this.setEncoding(this.encoding), this.start !== void 0) {
      if (typeof this.start != "number")
        throw TypeError("start must be a Number");
      if (this.end === void 0)
        this.end = 1 / 0;
      else if (typeof this.end != "number")
        throw TypeError("end must be a Number");
      if (this.start > this.end)
        throw new Error("start must be <= end");
      this.pos = this.start;
    }
    if (this.fd !== null) {
      process.nextTick(function() {
        o._read();
      });
      return;
    }
    e.open(this.path, this.flags, this.mode, function(l, u) {
      if (l) {
        o.emit("error", l), o.readable = !1;
        return;
      }
      o.fd = u, o.emit("open", u), o._read();
    });
  }
  function r(n, i) {
    if (!(this instanceof r)) return new r(n, i);
    Zu.call(this), this.path = n, this.fd = null, this.writable = !0, this.flags = "w", this.encoding = "binary", this.mode = 438, this.bytesWritten = 0, i = i || {};
    for (var o = Object.keys(i), a = 0, s = o.length; a < s; a++) {
      var c = o[a];
      this[c] = i[c];
    }
    if (this.start !== void 0) {
      if (typeof this.start != "number")
        throw TypeError("start must be a Number");
      if (this.start < 0)
        throw new Error("start must be >= zero");
      this.pos = this.start;
    }
    this.busy = !1, this._queue = [], this.fd === null && (this._open = e.open, this._queue.push([this._open, this.path, this.flags, this.mode, void 0]), this.flush());
  }
}
var Bv = Vv, Gv = Object.getPrototypeOf || function(e) {
  return e.__proto__;
};
function Vv(e) {
  if (e === null || typeof e != "object")
    return e;
  if (e instanceof Object)
    var t = { __proto__: Gv(e) };
  else
    var t = /* @__PURE__ */ Object.create(null);
  return Object.getOwnPropertyNames(e).forEach(function(r) {
    Object.defineProperty(t, r, Object.getOwnPropertyDescriptor(e, r));
  }), t;
}
var Ee = Cr, zv = jv, Wv = qv, Kv = Bv, Co = Sa, Me, ca;
typeof Symbol == "function" && typeof Symbol.for == "function" ? (Me = Symbol.for("graceful-fs.queue"), ca = Symbol.for("graceful-fs.previous")) : (Me = "___graceful-fs.queue", ca = "___graceful-fs.previous");
function Yv() {
}
function rp(e, t) {
  Object.defineProperty(e, Me, {
    get: function() {
      return t;
    }
  });
}
var Zr = Yv;
Co.debuglog ? Zr = Co.debuglog("gfs4") : /\bgfs4\b/i.test(process.env.NODE_DEBUG || "") && (Zr = function() {
  var e = Co.format.apply(Co, arguments);
  e = "GFS4: " + e.split(/\n/).join(`
GFS4: `), console.error(e);
});
if (!Ee[Me]) {
  var Xv = Tt[Me] || [];
  rp(Ee, Xv), Ee.close = function(e) {
    function t(r, n) {
      return e.call(Ee, r, function(i) {
        i || ef(), typeof n == "function" && n.apply(this, arguments);
      });
    }
    return Object.defineProperty(t, ca, {
      value: e
    }), t;
  }(Ee.close), Ee.closeSync = function(e) {
    function t(r) {
      e.apply(Ee, arguments), ef();
    }
    return Object.defineProperty(t, ca, {
      value: e
    }), t;
  }(Ee.closeSync), /\bgfs4\b/i.test(process.env.NODE_DEBUG || "") && process.on("exit", function() {
    Zr(Ee[Me]), Gh.equal(Ee[Me].length, 0);
  });
}
Tt[Me] || rp(Tt, Ee[Me]);
var Re = Uc(Kv(Ee));
process.env.TEST_GRACEFUL_FS_GLOBAL_PATCH && !Ee.__patched && (Re = Uc(Ee), Ee.__patched = !0);
function Uc(e) {
  zv(e), e.gracefulify = Uc, e.createReadStream = M, e.createWriteStream = I;
  var t = e.readFile;
  e.readFile = r;
  function r(w, K, q) {
    return typeof K == "function" && (q = K, K = null), z(w, K, q);
    function z(X, k, F, G) {
      return t(X, k, function(x) {
        x && (x.code === "EMFILE" || x.code === "ENFILE") ? hn([z, [X, k, F], x, G || Date.now(), Date.now()]) : typeof F == "function" && F.apply(this, arguments);
      });
    }
  }
  var n = e.writeFile;
  e.writeFile = i;
  function i(w, K, q, z) {
    return typeof q == "function" && (z = q, q = null), X(w, K, q, z);
    function X(k, F, G, x, W) {
      return n(k, F, G, function(V) {
        V && (V.code === "EMFILE" || V.code === "ENFILE") ? hn([X, [k, F, G, x], V, W || Date.now(), Date.now()]) : typeof x == "function" && x.apply(this, arguments);
      });
    }
  }
  var o = e.appendFile;
  o && (e.appendFile = a);
  function a(w, K, q, z) {
    return typeof q == "function" && (z = q, q = null), X(w, K, q, z);
    function X(k, F, G, x, W) {
      return o(k, F, G, function(V) {
        V && (V.code === "EMFILE" || V.code === "ENFILE") ? hn([X, [k, F, G, x], V, W || Date.now(), Date.now()]) : typeof x == "function" && x.apply(this, arguments);
      });
    }
  }
  var s = e.copyFile;
  s && (e.copyFile = c);
  function c(w, K, q, z) {
    return typeof q == "function" && (z = q, q = 0), X(w, K, q, z);
    function X(k, F, G, x, W) {
      return s(k, F, G, function(V) {
        V && (V.code === "EMFILE" || V.code === "ENFILE") ? hn([X, [k, F, G, x], V, W || Date.now(), Date.now()]) : typeof x == "function" && x.apply(this, arguments);
      });
    }
  }
  var f = e.readdir;
  e.readdir = u;
  var l = /^v[0-5]\./;
  function u(w, K, q) {
    typeof K == "function" && (q = K, K = null);
    var z = l.test(process.version) ? function(F, G, x, W) {
      return f(F, X(
        F,
        G,
        x,
        W
      ));
    } : function(F, G, x, W) {
      return f(F, G, X(
        F,
        G,
        x,
        W
      ));
    };
    return z(w, K, q);
    function X(k, F, G, x) {
      return function(W, V) {
        W && (W.code === "EMFILE" || W.code === "ENFILE") ? hn([
          z,
          [k, F, G],
          W,
          x || Date.now(),
          Date.now()
        ]) : (V && V.sort && V.sort(), typeof G == "function" && G.call(this, W, V));
      };
    }
  }
  if (process.version.substr(0, 4) === "v0.8") {
    var d = Wv(e);
    v = d.ReadStream, C = d.WriteStream;
  }
  var h = e.ReadStream;
  h && (v.prototype = Object.create(h.prototype), v.prototype.open = S);
  var y = e.WriteStream;
  y && (C.prototype = Object.create(y.prototype), C.prototype.open = R), Object.defineProperty(e, "ReadStream", {
    get: function() {
      return v;
    },
    set: function(w) {
      v = w;
    },
    enumerable: !0,
    configurable: !0
  }), Object.defineProperty(e, "WriteStream", {
    get: function() {
      return C;
    },
    set: function(w) {
      C = w;
    },
    enumerable: !0,
    configurable: !0
  });
  var g = v;
  Object.defineProperty(e, "FileReadStream", {
    get: function() {
      return g;
    },
    set: function(w) {
      g = w;
    },
    enumerable: !0,
    configurable: !0
  });
  var $ = C;
  Object.defineProperty(e, "FileWriteStream", {
    get: function() {
      return $;
    },
    set: function(w) {
      $ = w;
    },
    enumerable: !0,
    configurable: !0
  });
  function v(w, K) {
    return this instanceof v ? (h.apply(this, arguments), this) : v.apply(Object.create(v.prototype), arguments);
  }
  function S() {
    var w = this;
    B(w.path, w.flags, w.mode, function(K, q) {
      K ? (w.autoClose && w.destroy(), w.emit("error", K)) : (w.fd = q, w.emit("open", q), w.read());
    });
  }
  function C(w, K) {
    return this instanceof C ? (y.apply(this, arguments), this) : C.apply(Object.create(C.prototype), arguments);
  }
  function R() {
    var w = this;
    B(w.path, w.flags, w.mode, function(K, q) {
      K ? (w.destroy(), w.emit("error", K)) : (w.fd = q, w.emit("open", q));
    });
  }
  function M(w, K) {
    return new e.ReadStream(w, K);
  }
  function I(w, K) {
    return new e.WriteStream(w, K);
  }
  var L = e.open;
  e.open = B;
  function B(w, K, q, z) {
    return typeof q == "function" && (z = q, q = null), X(w, K, q, z);
    function X(k, F, G, x, W) {
      return L(k, F, G, function(V, U) {
        V && (V.code === "EMFILE" || V.code === "ENFILE") ? hn([X, [k, F, G, x], V, W || Date.now(), Date.now()]) : typeof x == "function" && x.apply(this, arguments);
      });
    }
  }
  return e;
}
function hn(e) {
  Zr("ENQUEUE", e[0].name, e[1]), Ee[Me].push(e), jc();
}
var Io;
function ef() {
  for (var e = Date.now(), t = 0; t < Ee[Me].length; ++t)
    Ee[Me][t].length > 2 && (Ee[Me][t][3] = e, Ee[Me][t][4] = e);
  jc();
}
function jc() {
  if (clearTimeout(Io), Io = void 0, Ee[Me].length !== 0) {
    var e = Ee[Me].shift(), t = e[0], r = e[1], n = e[2], i = e[3], o = e[4];
    if (i === void 0)
      Zr("RETRY", t.name, r), t.apply(null, r);
    else if (Date.now() - i >= 6e4) {
      Zr("TIMEOUT", t.name, r);
      var a = r.pop();
      typeof a == "function" && a.call(null, n);
    } else {
      var s = Date.now() - o, c = Math.max(o - i, 1), f = Math.min(c * 1.2, 100);
      s >= f ? (Zr("RETRY", t.name, r), t.apply(null, r.concat([i]))) : Ee[Me].push(e);
    }
    Io === void 0 && (Io = setTimeout(jc, 0));
  }
}
(function(e) {
  const t = fe.fromCallback, r = Re, n = [
    "access",
    "appendFile",
    "chmod",
    "chown",
    "close",
    "copyFile",
    "fchmod",
    "fchown",
    "fdatasync",
    "fstat",
    "fsync",
    "ftruncate",
    "futimes",
    "lchmod",
    "lchown",
    "link",
    "lstat",
    "mkdir",
    "mkdtemp",
    "open",
    "opendir",
    "readdir",
    "readFile",
    "readlink",
    "realpath",
    "rename",
    "rm",
    "rmdir",
    "stat",
    "symlink",
    "truncate",
    "unlink",
    "utimes",
    "writeFile"
  ].filter((i) => typeof r[i] == "function");
  Object.assign(e, r), n.forEach((i) => {
    e[i] = t(r[i]);
  }), e.exists = function(i, o) {
    return typeof o == "function" ? r.exists(i, o) : new Promise((a) => r.exists(i, a));
  }, e.read = function(i, o, a, s, c, f) {
    return typeof f == "function" ? r.read(i, o, a, s, c, f) : new Promise((l, u) => {
      r.read(i, o, a, s, c, (d, h, y) => {
        if (d) return u(d);
        l({ bytesRead: h, buffer: y });
      });
    });
  }, e.write = function(i, o, ...a) {
    return typeof a[a.length - 1] == "function" ? r.write(i, o, ...a) : new Promise((s, c) => {
      r.write(i, o, ...a, (f, l, u) => {
        if (f) return c(f);
        s({ bytesWritten: l, buffer: u });
      });
    });
  }, typeof r.writev == "function" && (e.writev = function(i, o, ...a) {
    return typeof a[a.length - 1] == "function" ? r.writev(i, o, ...a) : new Promise((s, c) => {
      r.writev(i, o, ...a, (f, l, u) => {
        if (f) return c(f);
        s({ bytesWritten: l, buffers: u });
      });
    });
  }), typeof r.realpath.native == "function" ? e.realpath.native = t(r.realpath.native) : process.emitWarning(
    "fs.realpath.native is not a function. Is fs being monkey-patched?",
    "Warning",
    "fs-extra-WARN0003"
  );
})(an);
var Mc = {}, np = {};
const Jv = ce;
np.checkPath = function(t) {
  if (process.platform === "win32" && /[<>:"|?*]/.test(t.replace(Jv.parse(t).root, ""))) {
    const n = new Error(`Path contains invalid characters: ${t}`);
    throw n.code = "EINVAL", n;
  }
};
const ip = an, { checkPath: op } = np, ap = (e) => {
  const t = { mode: 511 };
  return typeof e == "number" ? e : { ...t, ...e }.mode;
};
Mc.makeDir = async (e, t) => (op(e), ip.mkdir(e, {
  mode: ap(t),
  recursive: !0
}));
Mc.makeDirSync = (e, t) => (op(e), ip.mkdirSync(e, {
  mode: ap(t),
  recursive: !0
}));
const Qv = fe.fromPromise, { makeDir: Zv, makeDirSync: ws } = Mc, Es = Qv(Zv);
var Ut = {
  mkdirs: Es,
  mkdirsSync: ws,
  // alias
  mkdirp: Es,
  mkdirpSync: ws,
  ensureDir: Es,
  ensureDirSync: ws
};
const e$ = fe.fromPromise, sp = an;
function t$(e) {
  return sp.access(e).then(() => !0).catch(() => !1);
}
var sn = {
  pathExists: e$(t$),
  pathExistsSync: sp.existsSync
};
const Nn = Re;
function r$(e, t, r, n) {
  Nn.open(e, "r+", (i, o) => {
    if (i) return n(i);
    Nn.futimes(o, t, r, (a) => {
      Nn.close(o, (s) => {
        n && n(a || s);
      });
    });
  });
}
function n$(e, t, r) {
  const n = Nn.openSync(e, "r+");
  return Nn.futimesSync(n, t, r), Nn.closeSync(n);
}
var cp = {
  utimesMillis: r$,
  utimesMillisSync: n$
};
const Un = an, De = ce, i$ = Sa;
function o$(e, t, r) {
  const n = r.dereference ? (i) => Un.stat(i, { bigint: !0 }) : (i) => Un.lstat(i, { bigint: !0 });
  return Promise.all([
    n(e),
    n(t).catch((i) => {
      if (i.code === "ENOENT") return null;
      throw i;
    })
  ]).then(([i, o]) => ({ srcStat: i, destStat: o }));
}
function a$(e, t, r) {
  let n;
  const i = r.dereference ? (a) => Un.statSync(a, { bigint: !0 }) : (a) => Un.lstatSync(a, { bigint: !0 }), o = i(e);
  try {
    n = i(t);
  } catch (a) {
    if (a.code === "ENOENT") return { srcStat: o, destStat: null };
    throw a;
  }
  return { srcStat: o, destStat: n };
}
function s$(e, t, r, n, i) {
  i$.callbackify(o$)(e, t, n, (o, a) => {
    if (o) return i(o);
    const { srcStat: s, destStat: c } = a;
    if (c) {
      if (oo(s, c)) {
        const f = De.basename(e), l = De.basename(t);
        return r === "move" && f !== l && f.toLowerCase() === l.toLowerCase() ? i(null, { srcStat: s, destStat: c, isChangingCase: !0 }) : i(new Error("Source and destination must not be the same."));
      }
      if (s.isDirectory() && !c.isDirectory())
        return i(new Error(`Cannot overwrite non-directory '${t}' with directory '${e}'.`));
      if (!s.isDirectory() && c.isDirectory())
        return i(new Error(`Cannot overwrite directory '${t}' with non-directory '${e}'.`));
    }
    return s.isDirectory() && qc(e, t) ? i(new Error(Ca(e, t, r))) : i(null, { srcStat: s, destStat: c });
  });
}
function c$(e, t, r, n) {
  const { srcStat: i, destStat: o } = a$(e, t, n);
  if (o) {
    if (oo(i, o)) {
      const a = De.basename(e), s = De.basename(t);
      if (r === "move" && a !== s && a.toLowerCase() === s.toLowerCase())
        return { srcStat: i, destStat: o, isChangingCase: !0 };
      throw new Error("Source and destination must not be the same.");
    }
    if (i.isDirectory() && !o.isDirectory())
      throw new Error(`Cannot overwrite non-directory '${t}' with directory '${e}'.`);
    if (!i.isDirectory() && o.isDirectory())
      throw new Error(`Cannot overwrite directory '${t}' with non-directory '${e}'.`);
  }
  if (i.isDirectory() && qc(e, t))
    throw new Error(Ca(e, t, r));
  return { srcStat: i, destStat: o };
}
function lp(e, t, r, n, i) {
  const o = De.resolve(De.dirname(e)), a = De.resolve(De.dirname(r));
  if (a === o || a === De.parse(a).root) return i();
  Un.stat(a, { bigint: !0 }, (s, c) => s ? s.code === "ENOENT" ? i() : i(s) : oo(t, c) ? i(new Error(Ca(e, r, n))) : lp(e, t, a, n, i));
}
function up(e, t, r, n) {
  const i = De.resolve(De.dirname(e)), o = De.resolve(De.dirname(r));
  if (o === i || o === De.parse(o).root) return;
  let a;
  try {
    a = Un.statSync(o, { bigint: !0 });
  } catch (s) {
    if (s.code === "ENOENT") return;
    throw s;
  }
  if (oo(t, a))
    throw new Error(Ca(e, r, n));
  return up(e, t, o, n);
}
function oo(e, t) {
  return t.ino && t.dev && t.ino === e.ino && t.dev === e.dev;
}
function qc(e, t) {
  const r = De.resolve(e).split(De.sep).filter((i) => i), n = De.resolve(t).split(De.sep).filter((i) => i);
  return r.reduce((i, o, a) => i && n[a] === o, !0);
}
function Ca(e, t, r) {
  return `Cannot ${r} '${e}' to a subdirectory of itself, '${t}'.`;
}
var Vn = {
  checkPaths: s$,
  checkPathsSync: c$,
  checkParentPaths: lp,
  checkParentPathsSync: up,
  isSrcSubdir: qc,
  areIdentical: oo
};
const st = Re, ji = ce, l$ = Ut.mkdirs, u$ = sn.pathExists, f$ = cp.utimesMillis, Mi = Vn;
function d$(e, t, r, n) {
  typeof r == "function" && !n ? (n = r, r = {}) : typeof r == "function" && (r = { filter: r }), n = n || function() {
  }, r = r || {}, r.clobber = "clobber" in r ? !!r.clobber : !0, r.overwrite = "overwrite" in r ? !!r.overwrite : r.clobber, r.preserveTimestamps && process.arch === "ia32" && process.emitWarning(
    `Using the preserveTimestamps option in 32-bit node is not recommended;

	see https://github.com/jprichardson/node-fs-extra/issues/269`,
    "Warning",
    "fs-extra-WARN0001"
  ), Mi.checkPaths(e, t, "copy", r, (i, o) => {
    if (i) return n(i);
    const { srcStat: a, destStat: s } = o;
    Mi.checkParentPaths(e, a, t, "copy", (c) => c ? n(c) : r.filter ? fp(tf, s, e, t, r, n) : tf(s, e, t, r, n));
  });
}
function tf(e, t, r, n, i) {
  const o = ji.dirname(r);
  u$(o, (a, s) => {
    if (a) return i(a);
    if (s) return la(e, t, r, n, i);
    l$(o, (c) => c ? i(c) : la(e, t, r, n, i));
  });
}
function fp(e, t, r, n, i, o) {
  Promise.resolve(i.filter(r, n)).then((a) => a ? e(t, r, n, i, o) : o(), (a) => o(a));
}
function h$(e, t, r, n, i) {
  return n.filter ? fp(la, e, t, r, n, i) : la(e, t, r, n, i);
}
function la(e, t, r, n, i) {
  (n.dereference ? st.stat : st.lstat)(t, (a, s) => a ? i(a) : s.isDirectory() ? _$(s, e, t, r, n, i) : s.isFile() || s.isCharacterDevice() || s.isBlockDevice() ? p$(s, e, t, r, n, i) : s.isSymbolicLink() ? S$(e, t, r, n, i) : s.isSocket() ? i(new Error(`Cannot copy a socket file: ${t}`)) : s.isFIFO() ? i(new Error(`Cannot copy a FIFO pipe: ${t}`)) : i(new Error(`Unknown file: ${t}`)));
}
function p$(e, t, r, n, i, o) {
  return t ? m$(e, r, n, i, o) : dp(e, r, n, i, o);
}
function m$(e, t, r, n, i) {
  if (n.overwrite)
    st.unlink(r, (o) => o ? i(o) : dp(e, t, r, n, i));
  else return n.errorOnExist ? i(new Error(`'${r}' already exists`)) : i();
}
function dp(e, t, r, n, i) {
  st.copyFile(t, r, (o) => o ? i(o) : n.preserveTimestamps ? y$(e.mode, t, r, i) : Ia(r, e.mode, i));
}
function y$(e, t, r, n) {
  return g$(e) ? v$(r, e, (i) => i ? n(i) : rf(e, t, r, n)) : rf(e, t, r, n);
}
function g$(e) {
  return (e & 128) === 0;
}
function v$(e, t, r) {
  return Ia(e, t | 128, r);
}
function rf(e, t, r, n) {
  $$(t, r, (i) => i ? n(i) : Ia(r, e, n));
}
function Ia(e, t, r) {
  return st.chmod(e, t, r);
}
function $$(e, t, r) {
  st.stat(e, (n, i) => n ? r(n) : f$(t, i.atime, i.mtime, r));
}
function _$(e, t, r, n, i, o) {
  return t ? hp(r, n, i, o) : w$(e.mode, r, n, i, o);
}
function w$(e, t, r, n, i) {
  st.mkdir(r, (o) => {
    if (o) return i(o);
    hp(t, r, n, (a) => a ? i(a) : Ia(r, e, i));
  });
}
function hp(e, t, r, n) {
  st.readdir(e, (i, o) => i ? n(i) : pp(o, e, t, r, n));
}
function pp(e, t, r, n, i) {
  const o = e.pop();
  return o ? E$(e, o, t, r, n, i) : i();
}
function E$(e, t, r, n, i, o) {
  const a = ji.join(r, t), s = ji.join(n, t);
  Mi.checkPaths(a, s, "copy", i, (c, f) => {
    if (c) return o(c);
    const { destStat: l } = f;
    h$(l, a, s, i, (u) => u ? o(u) : pp(e, r, n, i, o));
  });
}
function S$(e, t, r, n, i) {
  st.readlink(t, (o, a) => {
    if (o) return i(o);
    if (n.dereference && (a = ji.resolve(process.cwd(), a)), e)
      st.readlink(r, (s, c) => s ? s.code === "EINVAL" || s.code === "UNKNOWN" ? st.symlink(a, r, i) : i(s) : (n.dereference && (c = ji.resolve(process.cwd(), c)), Mi.isSrcSubdir(a, c) ? i(new Error(`Cannot copy '${a}' to a subdirectory of itself, '${c}'.`)) : e.isDirectory() && Mi.isSrcSubdir(c, a) ? i(new Error(`Cannot overwrite '${c}' with '${a}'.`)) : b$(a, r, i)));
    else
      return st.symlink(a, r, i);
  });
}
function b$(e, t, r) {
  st.unlink(t, (n) => n ? r(n) : st.symlink(e, t, r));
}
var P$ = d$;
const Ke = Re, qi = ce, T$ = Ut.mkdirsSync, A$ = cp.utimesMillisSync, Hi = Vn;
function O$(e, t, r) {
  typeof r == "function" && (r = { filter: r }), r = r || {}, r.clobber = "clobber" in r ? !!r.clobber : !0, r.overwrite = "overwrite" in r ? !!r.overwrite : r.clobber, r.preserveTimestamps && process.arch === "ia32" && process.emitWarning(
    `Using the preserveTimestamps option in 32-bit node is not recommended;

	see https://github.com/jprichardson/node-fs-extra/issues/269`,
    "Warning",
    "fs-extra-WARN0002"
  );
  const { srcStat: n, destStat: i } = Hi.checkPathsSync(e, t, "copy", r);
  return Hi.checkParentPathsSync(e, n, t, "copy"), C$(i, e, t, r);
}
function C$(e, t, r, n) {
  if (n.filter && !n.filter(t, r)) return;
  const i = qi.dirname(r);
  return Ke.existsSync(i) || T$(i), mp(e, t, r, n);
}
function I$(e, t, r, n) {
  if (!(n.filter && !n.filter(t, r)))
    return mp(e, t, r, n);
}
function mp(e, t, r, n) {
  const o = (n.dereference ? Ke.statSync : Ke.lstatSync)(t);
  if (o.isDirectory()) return x$(o, e, t, r, n);
  if (o.isFile() || o.isCharacterDevice() || o.isBlockDevice()) return R$(o, e, t, r, n);
  if (o.isSymbolicLink()) return M$(e, t, r, n);
  throw o.isSocket() ? new Error(`Cannot copy a socket file: ${t}`) : o.isFIFO() ? new Error(`Cannot copy a FIFO pipe: ${t}`) : new Error(`Unknown file: ${t}`);
}
function R$(e, t, r, n, i) {
  return t ? N$(e, r, n, i) : yp(e, r, n, i);
}
function N$(e, t, r, n) {
  if (n.overwrite)
    return Ke.unlinkSync(r), yp(e, t, r, n);
  if (n.errorOnExist)
    throw new Error(`'${r}' already exists`);
}
function yp(e, t, r, n) {
  return Ke.copyFileSync(t, r), n.preserveTimestamps && D$(e.mode, t, r), Hc(r, e.mode);
}
function D$(e, t, r) {
  return k$(e) && F$(r, e), L$(t, r);
}
function k$(e) {
  return (e & 128) === 0;
}
function F$(e, t) {
  return Hc(e, t | 128);
}
function Hc(e, t) {
  return Ke.chmodSync(e, t);
}
function L$(e, t) {
  const r = Ke.statSync(e);
  return A$(t, r.atime, r.mtime);
}
function x$(e, t, r, n, i) {
  return t ? gp(r, n, i) : U$(e.mode, r, n, i);
}
function U$(e, t, r, n) {
  return Ke.mkdirSync(r), gp(t, r, n), Hc(r, e);
}
function gp(e, t, r) {
  Ke.readdirSync(e).forEach((n) => j$(n, e, t, r));
}
function j$(e, t, r, n) {
  const i = qi.join(t, e), o = qi.join(r, e), { destStat: a } = Hi.checkPathsSync(i, o, "copy", n);
  return I$(a, i, o, n);
}
function M$(e, t, r, n) {
  let i = Ke.readlinkSync(t);
  if (n.dereference && (i = qi.resolve(process.cwd(), i)), e) {
    let o;
    try {
      o = Ke.readlinkSync(r);
    } catch (a) {
      if (a.code === "EINVAL" || a.code === "UNKNOWN") return Ke.symlinkSync(i, r);
      throw a;
    }
    if (n.dereference && (o = qi.resolve(process.cwd(), o)), Hi.isSrcSubdir(i, o))
      throw new Error(`Cannot copy '${i}' to a subdirectory of itself, '${o}'.`);
    if (Ke.statSync(r).isDirectory() && Hi.isSrcSubdir(o, i))
      throw new Error(`Cannot overwrite '${o}' with '${i}'.`);
    return q$(i, r);
  } else
    return Ke.symlinkSync(i, r);
}
function q$(e, t) {
  return Ke.unlinkSync(t), Ke.symlinkSync(e, t);
}
var H$ = O$;
const B$ = fe.fromCallback;
var Bc = {
  copy: B$(P$),
  copySync: H$
};
const nf = Re, vp = ce, pe = Gh, Bi = process.platform === "win32";
function $p(e) {
  [
    "unlink",
    "chmod",
    "stat",
    "lstat",
    "rmdir",
    "readdir"
  ].forEach((r) => {
    e[r] = e[r] || nf[r], r = r + "Sync", e[r] = e[r] || nf[r];
  }), e.maxBusyTries = e.maxBusyTries || 3;
}
function Gc(e, t, r) {
  let n = 0;
  typeof t == "function" && (r = t, t = {}), pe(e, "rimraf: missing path"), pe.strictEqual(typeof e, "string", "rimraf: path should be a string"), pe.strictEqual(typeof r, "function", "rimraf: callback function required"), pe(t, "rimraf: invalid options argument provided"), pe.strictEqual(typeof t, "object", "rimraf: options should be object"), $p(t), of(e, t, function i(o) {
    if (o) {
      if ((o.code === "EBUSY" || o.code === "ENOTEMPTY" || o.code === "EPERM") && n < t.maxBusyTries) {
        n++;
        const a = n * 100;
        return setTimeout(() => of(e, t, i), a);
      }
      o.code === "ENOENT" && (o = null);
    }
    r(o);
  });
}
function of(e, t, r) {
  pe(e), pe(t), pe(typeof r == "function"), t.lstat(e, (n, i) => {
    if (n && n.code === "ENOENT")
      return r(null);
    if (n && n.code === "EPERM" && Bi)
      return af(e, t, n, r);
    if (i && i.isDirectory())
      return Xo(e, t, n, r);
    t.unlink(e, (o) => {
      if (o) {
        if (o.code === "ENOENT")
          return r(null);
        if (o.code === "EPERM")
          return Bi ? af(e, t, o, r) : Xo(e, t, o, r);
        if (o.code === "EISDIR")
          return Xo(e, t, o, r);
      }
      return r(o);
    });
  });
}
function af(e, t, r, n) {
  pe(e), pe(t), pe(typeof n == "function"), t.chmod(e, 438, (i) => {
    i ? n(i.code === "ENOENT" ? null : r) : t.stat(e, (o, a) => {
      o ? n(o.code === "ENOENT" ? null : r) : a.isDirectory() ? Xo(e, t, r, n) : t.unlink(e, n);
    });
  });
}
function sf(e, t, r) {
  let n;
  pe(e), pe(t);
  try {
    t.chmodSync(e, 438);
  } catch (i) {
    if (i.code === "ENOENT")
      return;
    throw r;
  }
  try {
    n = t.statSync(e);
  } catch (i) {
    if (i.code === "ENOENT")
      return;
    throw r;
  }
  n.isDirectory() ? Jo(e, t, r) : t.unlinkSync(e);
}
function Xo(e, t, r, n) {
  pe(e), pe(t), pe(typeof n == "function"), t.rmdir(e, (i) => {
    i && (i.code === "ENOTEMPTY" || i.code === "EEXIST" || i.code === "EPERM") ? G$(e, t, n) : i && i.code === "ENOTDIR" ? n(r) : n(i);
  });
}
function G$(e, t, r) {
  pe(e), pe(t), pe(typeof r == "function"), t.readdir(e, (n, i) => {
    if (n) return r(n);
    let o = i.length, a;
    if (o === 0) return t.rmdir(e, r);
    i.forEach((s) => {
      Gc(vp.join(e, s), t, (c) => {
        if (!a) {
          if (c) return r(a = c);
          --o === 0 && t.rmdir(e, r);
        }
      });
    });
  });
}
function _p(e, t) {
  let r;
  t = t || {}, $p(t), pe(e, "rimraf: missing path"), pe.strictEqual(typeof e, "string", "rimraf: path should be a string"), pe(t, "rimraf: missing options"), pe.strictEqual(typeof t, "object", "rimraf: options should be object");
  try {
    r = t.lstatSync(e);
  } catch (n) {
    if (n.code === "ENOENT")
      return;
    n.code === "EPERM" && Bi && sf(e, t, n);
  }
  try {
    r && r.isDirectory() ? Jo(e, t, null) : t.unlinkSync(e);
  } catch (n) {
    if (n.code === "ENOENT")
      return;
    if (n.code === "EPERM")
      return Bi ? sf(e, t, n) : Jo(e, t, n);
    if (n.code !== "EISDIR")
      throw n;
    Jo(e, t, n);
  }
}
function Jo(e, t, r) {
  pe(e), pe(t);
  try {
    t.rmdirSync(e);
  } catch (n) {
    if (n.code === "ENOTDIR")
      throw r;
    if (n.code === "ENOTEMPTY" || n.code === "EEXIST" || n.code === "EPERM")
      V$(e, t);
    else if (n.code !== "ENOENT")
      throw n;
  }
}
function V$(e, t) {
  if (pe(e), pe(t), t.readdirSync(e).forEach((r) => _p(vp.join(e, r), t)), Bi) {
    const r = Date.now();
    do
      try {
        return t.rmdirSync(e, t);
      } catch {
      }
    while (Date.now() - r < 500);
  } else
    return t.rmdirSync(e, t);
}
var z$ = Gc;
Gc.sync = _p;
const ua = Re, W$ = fe.fromCallback, wp = z$;
function K$(e, t) {
  if (ua.rm) return ua.rm(e, { recursive: !0, force: !0 }, t);
  wp(e, t);
}
function Y$(e) {
  if (ua.rmSync) return ua.rmSync(e, { recursive: !0, force: !0 });
  wp.sync(e);
}
var Ra = {
  remove: W$(K$),
  removeSync: Y$
};
const X$ = fe.fromPromise, Ep = an, Sp = ce, bp = Ut, Pp = Ra, cf = X$(async function(t) {
  let r;
  try {
    r = await Ep.readdir(t);
  } catch {
    return bp.mkdirs(t);
  }
  return Promise.all(r.map((n) => Pp.remove(Sp.join(t, n))));
});
function lf(e) {
  let t;
  try {
    t = Ep.readdirSync(e);
  } catch {
    return bp.mkdirsSync(e);
  }
  t.forEach((r) => {
    r = Sp.join(e, r), Pp.removeSync(r);
  });
}
var J$ = {
  emptyDirSync: lf,
  emptydirSync: lf,
  emptyDir: cf,
  emptydir: cf
};
const Q$ = fe.fromCallback, Tp = ce, $r = Re, Ap = Ut;
function Z$(e, t) {
  function r() {
    $r.writeFile(e, "", (n) => {
      if (n) return t(n);
      t();
    });
  }
  $r.stat(e, (n, i) => {
    if (!n && i.isFile()) return t();
    const o = Tp.dirname(e);
    $r.stat(o, (a, s) => {
      if (a)
        return a.code === "ENOENT" ? Ap.mkdirs(o, (c) => {
          if (c) return t(c);
          r();
        }) : t(a);
      s.isDirectory() ? r() : $r.readdir(o, (c) => {
        if (c) return t(c);
      });
    });
  });
}
function e_(e) {
  let t;
  try {
    t = $r.statSync(e);
  } catch {
  }
  if (t && t.isFile()) return;
  const r = Tp.dirname(e);
  try {
    $r.statSync(r).isDirectory() || $r.readdirSync(r);
  } catch (n) {
    if (n && n.code === "ENOENT") Ap.mkdirsSync(r);
    else throw n;
  }
  $r.writeFileSync(e, "");
}
var t_ = {
  createFile: Q$(Z$),
  createFileSync: e_
};
const r_ = fe.fromCallback, Op = ce, mr = Re, Cp = Ut, n_ = sn.pathExists, { areIdentical: Ip } = Vn;
function i_(e, t, r) {
  function n(i, o) {
    mr.link(i, o, (a) => {
      if (a) return r(a);
      r(null);
    });
  }
  mr.lstat(t, (i, o) => {
    mr.lstat(e, (a, s) => {
      if (a)
        return a.message = a.message.replace("lstat", "ensureLink"), r(a);
      if (o && Ip(s, o)) return r(null);
      const c = Op.dirname(t);
      n_(c, (f, l) => {
        if (f) return r(f);
        if (l) return n(e, t);
        Cp.mkdirs(c, (u) => {
          if (u) return r(u);
          n(e, t);
        });
      });
    });
  });
}
function o_(e, t) {
  let r;
  try {
    r = mr.lstatSync(t);
  } catch {
  }
  try {
    const o = mr.lstatSync(e);
    if (r && Ip(o, r)) return;
  } catch (o) {
    throw o.message = o.message.replace("lstat", "ensureLink"), o;
  }
  const n = Op.dirname(t);
  return mr.existsSync(n) || Cp.mkdirsSync(n), mr.linkSync(e, t);
}
var a_ = {
  createLink: r_(i_),
  createLinkSync: o_
};
const _r = ce, Ii = Re, s_ = sn.pathExists;
function c_(e, t, r) {
  if (_r.isAbsolute(e))
    return Ii.lstat(e, (n) => n ? (n.message = n.message.replace("lstat", "ensureSymlink"), r(n)) : r(null, {
      toCwd: e,
      toDst: e
    }));
  {
    const n = _r.dirname(t), i = _r.join(n, e);
    return s_(i, (o, a) => o ? r(o) : a ? r(null, {
      toCwd: i,
      toDst: e
    }) : Ii.lstat(e, (s) => s ? (s.message = s.message.replace("lstat", "ensureSymlink"), r(s)) : r(null, {
      toCwd: e,
      toDst: _r.relative(n, e)
    })));
  }
}
function l_(e, t) {
  let r;
  if (_r.isAbsolute(e)) {
    if (r = Ii.existsSync(e), !r) throw new Error("absolute srcpath does not exist");
    return {
      toCwd: e,
      toDst: e
    };
  } else {
    const n = _r.dirname(t), i = _r.join(n, e);
    if (r = Ii.existsSync(i), r)
      return {
        toCwd: i,
        toDst: e
      };
    if (r = Ii.existsSync(e), !r) throw new Error("relative srcpath does not exist");
    return {
      toCwd: e,
      toDst: _r.relative(n, e)
    };
  }
}
var u_ = {
  symlinkPaths: c_,
  symlinkPathsSync: l_
};
const Rp = Re;
function f_(e, t, r) {
  if (r = typeof t == "function" ? t : r, t = typeof t == "function" ? !1 : t, t) return r(null, t);
  Rp.lstat(e, (n, i) => {
    if (n) return r(null, "file");
    t = i && i.isDirectory() ? "dir" : "file", r(null, t);
  });
}
function d_(e, t) {
  let r;
  if (t) return t;
  try {
    r = Rp.lstatSync(e);
  } catch {
    return "file";
  }
  return r && r.isDirectory() ? "dir" : "file";
}
var h_ = {
  symlinkType: f_,
  symlinkTypeSync: d_
};
const p_ = fe.fromCallback, Np = ce, bt = an, Dp = Ut, m_ = Dp.mkdirs, y_ = Dp.mkdirsSync, kp = u_, g_ = kp.symlinkPaths, v_ = kp.symlinkPathsSync, Fp = h_, $_ = Fp.symlinkType, __ = Fp.symlinkTypeSync, w_ = sn.pathExists, { areIdentical: Lp } = Vn;
function E_(e, t, r, n) {
  n = typeof r == "function" ? r : n, r = typeof r == "function" ? !1 : r, bt.lstat(t, (i, o) => {
    !i && o.isSymbolicLink() ? Promise.all([
      bt.stat(e),
      bt.stat(t)
    ]).then(([a, s]) => {
      if (Lp(a, s)) return n(null);
      uf(e, t, r, n);
    }) : uf(e, t, r, n);
  });
}
function uf(e, t, r, n) {
  g_(e, t, (i, o) => {
    if (i) return n(i);
    e = o.toDst, $_(o.toCwd, r, (a, s) => {
      if (a) return n(a);
      const c = Np.dirname(t);
      w_(c, (f, l) => {
        if (f) return n(f);
        if (l) return bt.symlink(e, t, s, n);
        m_(c, (u) => {
          if (u) return n(u);
          bt.symlink(e, t, s, n);
        });
      });
    });
  });
}
function S_(e, t, r) {
  let n;
  try {
    n = bt.lstatSync(t);
  } catch {
  }
  if (n && n.isSymbolicLink()) {
    const s = bt.statSync(e), c = bt.statSync(t);
    if (Lp(s, c)) return;
  }
  const i = v_(e, t);
  e = i.toDst, r = __(i.toCwd, r);
  const o = Np.dirname(t);
  return bt.existsSync(o) || y_(o), bt.symlinkSync(e, t, r);
}
var b_ = {
  createSymlink: p_(E_),
  createSymlinkSync: S_
};
const { createFile: ff, createFileSync: df } = t_, { createLink: hf, createLinkSync: pf } = a_, { createSymlink: mf, createSymlinkSync: yf } = b_;
var P_ = {
  // file
  createFile: ff,
  createFileSync: df,
  ensureFile: ff,
  ensureFileSync: df,
  // link
  createLink: hf,
  createLinkSync: pf,
  ensureLink: hf,
  ensureLinkSync: pf,
  // symlink
  createSymlink: mf,
  createSymlinkSync: yf,
  ensureSymlink: mf,
  ensureSymlinkSync: yf
};
function T_(e, { EOL: t = `
`, finalEOL: r = !0, replacer: n = null, spaces: i } = {}) {
  const o = r ? t : "";
  return JSON.stringify(e, n, i).replace(/\n/g, t) + o;
}
function A_(e) {
  return Buffer.isBuffer(e) && (e = e.toString("utf8")), e.replace(/^\uFEFF/, "");
}
var ao = { stringify: T_, stripBom: A_ };
let jn;
try {
  jn = Re;
} catch {
  jn = Cr;
}
const Na = fe, { stringify: xp, stripBom: Up } = ao;
async function O_(e, t = {}) {
  typeof t == "string" && (t = { encoding: t });
  const r = t.fs || jn, n = "throws" in t ? t.throws : !0;
  let i = await Na.fromCallback(r.readFile)(e, t);
  i = Up(i);
  let o;
  try {
    o = JSON.parse(i, t ? t.reviver : null);
  } catch (a) {
    if (n)
      throw a.message = `${e}: ${a.message}`, a;
    return null;
  }
  return o;
}
const C_ = Na.fromPromise(O_);
function I_(e, t = {}) {
  typeof t == "string" && (t = { encoding: t });
  const r = t.fs || jn, n = "throws" in t ? t.throws : !0;
  try {
    let i = r.readFileSync(e, t);
    return i = Up(i), JSON.parse(i, t.reviver);
  } catch (i) {
    if (n)
      throw i.message = `${e}: ${i.message}`, i;
    return null;
  }
}
async function R_(e, t, r = {}) {
  const n = r.fs || jn, i = xp(t, r);
  await Na.fromCallback(n.writeFile)(e, i, r);
}
const N_ = Na.fromPromise(R_);
function D_(e, t, r = {}) {
  const n = r.fs || jn, i = xp(t, r);
  return n.writeFileSync(e, i, r);
}
const k_ = {
  readFile: C_,
  readFileSync: I_,
  writeFile: N_,
  writeFileSync: D_
};
var jp = k_;
const Ro = jp;
var F_ = {
  // jsonfile exports
  readJson: Ro.readFile,
  readJsonSync: Ro.readFileSync,
  writeJson: Ro.writeFile,
  writeJsonSync: Ro.writeFileSync
};
const L_ = fe.fromCallback, Ri = Re, Mp = ce, qp = Ut, x_ = sn.pathExists;
function U_(e, t, r, n) {
  typeof r == "function" && (n = r, r = "utf8");
  const i = Mp.dirname(e);
  x_(i, (o, a) => {
    if (o) return n(o);
    if (a) return Ri.writeFile(e, t, r, n);
    qp.mkdirs(i, (s) => {
      if (s) return n(s);
      Ri.writeFile(e, t, r, n);
    });
  });
}
function j_(e, ...t) {
  const r = Mp.dirname(e);
  if (Ri.existsSync(r))
    return Ri.writeFileSync(e, ...t);
  qp.mkdirsSync(r), Ri.writeFileSync(e, ...t);
}
var Vc = {
  outputFile: L_(U_),
  outputFileSync: j_
};
const { stringify: M_ } = ao, { outputFile: q_ } = Vc;
async function H_(e, t, r = {}) {
  const n = M_(t, r);
  await q_(e, n, r);
}
var B_ = H_;
const { stringify: G_ } = ao, { outputFileSync: V_ } = Vc;
function z_(e, t, r) {
  const n = G_(t, r);
  V_(e, n, r);
}
var W_ = z_;
const K_ = fe.fromPromise, tt = F_;
tt.outputJson = K_(B_);
tt.outputJsonSync = W_;
tt.outputJSON = tt.outputJson;
tt.outputJSONSync = tt.outputJsonSync;
tt.writeJSON = tt.writeJson;
tt.writeJSONSync = tt.writeJsonSync;
tt.readJSON = tt.readJson;
tt.readJSONSync = tt.readJsonSync;
var Y_ = tt;
const X_ = Re, sc = ce, J_ = Bc.copy, Hp = Ra.remove, Q_ = Ut.mkdirp, Z_ = sn.pathExists, gf = Vn;
function ew(e, t, r, n) {
  typeof r == "function" && (n = r, r = {}), r = r || {};
  const i = r.overwrite || r.clobber || !1;
  gf.checkPaths(e, t, "move", r, (o, a) => {
    if (o) return n(o);
    const { srcStat: s, isChangingCase: c = !1 } = a;
    gf.checkParentPaths(e, s, t, "move", (f) => {
      if (f) return n(f);
      if (tw(t)) return vf(e, t, i, c, n);
      Q_(sc.dirname(t), (l) => l ? n(l) : vf(e, t, i, c, n));
    });
  });
}
function tw(e) {
  const t = sc.dirname(e);
  return sc.parse(t).root === t;
}
function vf(e, t, r, n, i) {
  if (n) return Ss(e, t, r, i);
  if (r)
    return Hp(t, (o) => o ? i(o) : Ss(e, t, r, i));
  Z_(t, (o, a) => o ? i(o) : a ? i(new Error("dest already exists.")) : Ss(e, t, r, i));
}
function Ss(e, t, r, n) {
  X_.rename(e, t, (i) => i ? i.code !== "EXDEV" ? n(i) : rw(e, t, r, n) : n());
}
function rw(e, t, r, n) {
  J_(e, t, {
    overwrite: r,
    errorOnExist: !0
  }, (o) => o ? n(o) : Hp(e, n));
}
var nw = ew;
const Bp = Re, cc = ce, iw = Bc.copySync, Gp = Ra.removeSync, ow = Ut.mkdirpSync, $f = Vn;
function aw(e, t, r) {
  r = r || {};
  const n = r.overwrite || r.clobber || !1, { srcStat: i, isChangingCase: o = !1 } = $f.checkPathsSync(e, t, "move", r);
  return $f.checkParentPathsSync(e, i, t, "move"), sw(t) || ow(cc.dirname(t)), cw(e, t, n, o);
}
function sw(e) {
  const t = cc.dirname(e);
  return cc.parse(t).root === t;
}
function cw(e, t, r, n) {
  if (n) return bs(e, t, r);
  if (r)
    return Gp(t), bs(e, t, r);
  if (Bp.existsSync(t)) throw new Error("dest already exists.");
  return bs(e, t, r);
}
function bs(e, t, r) {
  try {
    Bp.renameSync(e, t);
  } catch (n) {
    if (n.code !== "EXDEV") throw n;
    return lw(e, t, r);
  }
}
function lw(e, t, r) {
  return iw(e, t, {
    overwrite: r,
    errorOnExist: !0
  }), Gp(e);
}
var uw = aw;
const fw = fe.fromCallback;
var dw = {
  move: fw(nw),
  moveSync: uw
}, Ir = {
  // Export promiseified graceful-fs:
  ...an,
  // Export extra methods:
  ...Bc,
  ...J$,
  ...P_,
  ...Y_,
  ...Ut,
  ...dw,
  ...Vc,
  ...sn,
  ...Ra
}, pi = {}, Br = {}, qe = {}, zc = {}, At = {};
function Vp(e) {
  return typeof e > "u" || e === null;
}
function hw(e) {
  return typeof e == "object" && e !== null;
}
function pw(e) {
  return Array.isArray(e) ? e : Vp(e) ? [] : [e];
}
function mw(e, t) {
  var r, n, i, o;
  if (t)
    for (o = Object.keys(t), r = 0, n = o.length; r < n; r += 1)
      i = o[r], e[i] = t[i];
  return e;
}
function yw(e, t) {
  var r = "", n;
  for (n = 0; n < t; n += 1)
    r += e;
  return r;
}
function gw(e) {
  return e === 0 && Number.NEGATIVE_INFINITY === 1 / e;
}
At.isNothing = Vp;
At.isObject = hw;
At.toArray = pw;
At.repeat = yw;
At.isNegativeZero = gw;
At.extend = mw;
function zp(e, t) {
  var r = "", n = e.reason || "(unknown reason)";
  return e.mark ? (e.mark.name && (r += 'in "' + e.mark.name + '" '), r += "(" + (e.mark.line + 1) + ":" + (e.mark.column + 1) + ")", !t && e.mark.snippet && (r += `

` + e.mark.snippet), n + " " + r) : n;
}
function Gi(e, t) {
  Error.call(this), this.name = "YAMLException", this.reason = e, this.mark = t, this.message = zp(this, !1), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack || "";
}
Gi.prototype = Object.create(Error.prototype);
Gi.prototype.constructor = Gi;
Gi.prototype.toString = function(t) {
  return this.name + ": " + zp(this, t);
};
var so = Gi, Pi = At;
function Ps(e, t, r, n, i) {
  var o = "", a = "", s = Math.floor(i / 2) - 1;
  return n - t > s && (o = " ... ", t = n - s + o.length), r - n > s && (a = " ...", r = n + s - a.length), {
    str: o + e.slice(t, r).replace(/\t/g, "→") + a,
    pos: n - t + o.length
    // relative position
  };
}
function Ts(e, t) {
  return Pi.repeat(" ", t - e.length) + e;
}
function vw(e, t) {
  if (t = Object.create(t || null), !e.buffer) return null;
  t.maxLength || (t.maxLength = 79), typeof t.indent != "number" && (t.indent = 1), typeof t.linesBefore != "number" && (t.linesBefore = 3), typeof t.linesAfter != "number" && (t.linesAfter = 2);
  for (var r = /\r?\n|\r|\0/g, n = [0], i = [], o, a = -1; o = r.exec(e.buffer); )
    i.push(o.index), n.push(o.index + o[0].length), e.position <= o.index && a < 0 && (a = n.length - 2);
  a < 0 && (a = n.length - 1);
  var s = "", c, f, l = Math.min(e.line + t.linesAfter, i.length).toString().length, u = t.maxLength - (t.indent + l + 3);
  for (c = 1; c <= t.linesBefore && !(a - c < 0); c++)
    f = Ps(
      e.buffer,
      n[a - c],
      i[a - c],
      e.position - (n[a] - n[a - c]),
      u
    ), s = Pi.repeat(" ", t.indent) + Ts((e.line - c + 1).toString(), l) + " | " + f.str + `
` + s;
  for (f = Ps(e.buffer, n[a], i[a], e.position, u), s += Pi.repeat(" ", t.indent) + Ts((e.line + 1).toString(), l) + " | " + f.str + `
`, s += Pi.repeat("-", t.indent + l + 3 + f.pos) + `^
`, c = 1; c <= t.linesAfter && !(a + c >= i.length); c++)
    f = Ps(
      e.buffer,
      n[a + c],
      i[a + c],
      e.position - (n[a] - n[a + c]),
      u
    ), s += Pi.repeat(" ", t.indent) + Ts((e.line + c + 1).toString(), l) + " | " + f.str + `
`;
  return s.replace(/\n$/, "");
}
var $w = vw, _f = so, _w = [
  "kind",
  "multi",
  "resolve",
  "construct",
  "instanceOf",
  "predicate",
  "represent",
  "representName",
  "defaultStyle",
  "styleAliases"
], ww = [
  "scalar",
  "sequence",
  "mapping"
];
function Ew(e) {
  var t = {};
  return e !== null && Object.keys(e).forEach(function(r) {
    e[r].forEach(function(n) {
      t[String(n)] = r;
    });
  }), t;
}
function Sw(e, t) {
  if (t = t || {}, Object.keys(t).forEach(function(r) {
    if (_w.indexOf(r) === -1)
      throw new _f('Unknown option "' + r + '" is met in definition of "' + e + '" YAML type.');
  }), this.options = t, this.tag = e, this.kind = t.kind || null, this.resolve = t.resolve || function() {
    return !0;
  }, this.construct = t.construct || function(r) {
    return r;
  }, this.instanceOf = t.instanceOf || null, this.predicate = t.predicate || null, this.represent = t.represent || null, this.representName = t.representName || null, this.defaultStyle = t.defaultStyle || null, this.multi = t.multi || !1, this.styleAliases = Ew(t.styleAliases || null), ww.indexOf(this.kind) === -1)
    throw new _f('Unknown kind "' + this.kind + '" is specified for "' + e + '" YAML type.');
}
var nt = Sw, mi = so, As = nt;
function wf(e, t) {
  var r = [];
  return e[t].forEach(function(n) {
    var i = r.length;
    r.forEach(function(o, a) {
      o.tag === n.tag && o.kind === n.kind && o.multi === n.multi && (i = a);
    }), r[i] = n;
  }), r;
}
function bw() {
  var e = {
    scalar: {},
    sequence: {},
    mapping: {},
    fallback: {},
    multi: {
      scalar: [],
      sequence: [],
      mapping: [],
      fallback: []
    }
  }, t, r;
  function n(i) {
    i.multi ? (e.multi[i.kind].push(i), e.multi.fallback.push(i)) : e[i.kind][i.tag] = e.fallback[i.tag] = i;
  }
  for (t = 0, r = arguments.length; t < r; t += 1)
    arguments[t].forEach(n);
  return e;
}
function lc(e) {
  return this.extend(e);
}
lc.prototype.extend = function(t) {
  var r = [], n = [];
  if (t instanceof As)
    n.push(t);
  else if (Array.isArray(t))
    n = n.concat(t);
  else if (t && (Array.isArray(t.implicit) || Array.isArray(t.explicit)))
    t.implicit && (r = r.concat(t.implicit)), t.explicit && (n = n.concat(t.explicit));
  else
    throw new mi("Schema.extend argument should be a Type, [ Type ], or a schema definition ({ implicit: [...], explicit: [...] })");
  r.forEach(function(o) {
    if (!(o instanceof As))
      throw new mi("Specified list of YAML types (or a single Type object) contains a non-Type object.");
    if (o.loadKind && o.loadKind !== "scalar")
      throw new mi("There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.");
    if (o.multi)
      throw new mi("There is a multi type in the implicit list of a schema. Multi tags can only be listed as explicit.");
  }), n.forEach(function(o) {
    if (!(o instanceof As))
      throw new mi("Specified list of YAML types (or a single Type object) contains a non-Type object.");
  });
  var i = Object.create(lc.prototype);
  return i.implicit = (this.implicit || []).concat(r), i.explicit = (this.explicit || []).concat(n), i.compiledImplicit = wf(i, "implicit"), i.compiledExplicit = wf(i, "explicit"), i.compiledTypeMap = bw(i.compiledImplicit, i.compiledExplicit), i;
};
var Wp = lc, Pw = nt, Kp = new Pw("tag:yaml.org,2002:str", {
  kind: "scalar",
  construct: function(e) {
    return e !== null ? e : "";
  }
}), Tw = nt, Yp = new Tw("tag:yaml.org,2002:seq", {
  kind: "sequence",
  construct: function(e) {
    return e !== null ? e : [];
  }
}), Aw = nt, Xp = new Aw("tag:yaml.org,2002:map", {
  kind: "mapping",
  construct: function(e) {
    return e !== null ? e : {};
  }
}), Ow = Wp, Jp = new Ow({
  explicit: [
    Kp,
    Yp,
    Xp
  ]
}), Cw = nt;
function Iw(e) {
  if (e === null) return !0;
  var t = e.length;
  return t === 1 && e === "~" || t === 4 && (e === "null" || e === "Null" || e === "NULL");
}
function Rw() {
  return null;
}
function Nw(e) {
  return e === null;
}
var Qp = new Cw("tag:yaml.org,2002:null", {
  kind: "scalar",
  resolve: Iw,
  construct: Rw,
  predicate: Nw,
  represent: {
    canonical: function() {
      return "~";
    },
    lowercase: function() {
      return "null";
    },
    uppercase: function() {
      return "NULL";
    },
    camelcase: function() {
      return "Null";
    },
    empty: function() {
      return "";
    }
  },
  defaultStyle: "lowercase"
}), Dw = nt;
function kw(e) {
  if (e === null) return !1;
  var t = e.length;
  return t === 4 && (e === "true" || e === "True" || e === "TRUE") || t === 5 && (e === "false" || e === "False" || e === "FALSE");
}
function Fw(e) {
  return e === "true" || e === "True" || e === "TRUE";
}
function Lw(e) {
  return Object.prototype.toString.call(e) === "[object Boolean]";
}
var Zp = new Dw("tag:yaml.org,2002:bool", {
  kind: "scalar",
  resolve: kw,
  construct: Fw,
  predicate: Lw,
  represent: {
    lowercase: function(e) {
      return e ? "true" : "false";
    },
    uppercase: function(e) {
      return e ? "TRUE" : "FALSE";
    },
    camelcase: function(e) {
      return e ? "True" : "False";
    }
  },
  defaultStyle: "lowercase"
}), xw = At, Uw = nt;
function jw(e) {
  return 48 <= e && e <= 57 || 65 <= e && e <= 70 || 97 <= e && e <= 102;
}
function Mw(e) {
  return 48 <= e && e <= 55;
}
function qw(e) {
  return 48 <= e && e <= 57;
}
function Hw(e) {
  if (e === null) return !1;
  var t = e.length, r = 0, n = !1, i;
  if (!t) return !1;
  if (i = e[r], (i === "-" || i === "+") && (i = e[++r]), i === "0") {
    if (r + 1 === t) return !0;
    if (i = e[++r], i === "b") {
      for (r++; r < t; r++)
        if (i = e[r], i !== "_") {
          if (i !== "0" && i !== "1") return !1;
          n = !0;
        }
      return n && i !== "_";
    }
    if (i === "x") {
      for (r++; r < t; r++)
        if (i = e[r], i !== "_") {
          if (!jw(e.charCodeAt(r))) return !1;
          n = !0;
        }
      return n && i !== "_";
    }
    if (i === "o") {
      for (r++; r < t; r++)
        if (i = e[r], i !== "_") {
          if (!Mw(e.charCodeAt(r))) return !1;
          n = !0;
        }
      return n && i !== "_";
    }
  }
  if (i === "_") return !1;
  for (; r < t; r++)
    if (i = e[r], i !== "_") {
      if (!qw(e.charCodeAt(r)))
        return !1;
      n = !0;
    }
  return !(!n || i === "_");
}
function Bw(e) {
  var t = e, r = 1, n;
  if (t.indexOf("_") !== -1 && (t = t.replace(/_/g, "")), n = t[0], (n === "-" || n === "+") && (n === "-" && (r = -1), t = t.slice(1), n = t[0]), t === "0") return 0;
  if (n === "0") {
    if (t[1] === "b") return r * parseInt(t.slice(2), 2);
    if (t[1] === "x") return r * parseInt(t.slice(2), 16);
    if (t[1] === "o") return r * parseInt(t.slice(2), 8);
  }
  return r * parseInt(t, 10);
}
function Gw(e) {
  return Object.prototype.toString.call(e) === "[object Number]" && e % 1 === 0 && !xw.isNegativeZero(e);
}
var em = new Uw("tag:yaml.org,2002:int", {
  kind: "scalar",
  resolve: Hw,
  construct: Bw,
  predicate: Gw,
  represent: {
    binary: function(e) {
      return e >= 0 ? "0b" + e.toString(2) : "-0b" + e.toString(2).slice(1);
    },
    octal: function(e) {
      return e >= 0 ? "0o" + e.toString(8) : "-0o" + e.toString(8).slice(1);
    },
    decimal: function(e) {
      return e.toString(10);
    },
    /* eslint-disable max-len */
    hexadecimal: function(e) {
      return e >= 0 ? "0x" + e.toString(16).toUpperCase() : "-0x" + e.toString(16).toUpperCase().slice(1);
    }
  },
  defaultStyle: "decimal",
  styleAliases: {
    binary: [2, "bin"],
    octal: [8, "oct"],
    decimal: [10, "dec"],
    hexadecimal: [16, "hex"]
  }
}), tm = At, Vw = nt, zw = new RegExp(
  // 2.5e4, 2.5 and integers
  "^(?:[-+]?(?:[0-9][0-9_]*)(?:\\.[0-9_]*)?(?:[eE][-+]?[0-9]+)?|\\.[0-9_]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$"
);
function Ww(e) {
  return !(e === null || !zw.test(e) || // Quick hack to not allow integers end with `_`
  // Probably should update regexp & check speed
  e[e.length - 1] === "_");
}
function Kw(e) {
  var t, r;
  return t = e.replace(/_/g, "").toLowerCase(), r = t[0] === "-" ? -1 : 1, "+-".indexOf(t[0]) >= 0 && (t = t.slice(1)), t === ".inf" ? r === 1 ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY : t === ".nan" ? NaN : r * parseFloat(t, 10);
}
var Yw = /^[-+]?[0-9]+e/;
function Xw(e, t) {
  var r;
  if (isNaN(e))
    switch (t) {
      case "lowercase":
        return ".nan";
      case "uppercase":
        return ".NAN";
      case "camelcase":
        return ".NaN";
    }
  else if (Number.POSITIVE_INFINITY === e)
    switch (t) {
      case "lowercase":
        return ".inf";
      case "uppercase":
        return ".INF";
      case "camelcase":
        return ".Inf";
    }
  else if (Number.NEGATIVE_INFINITY === e)
    switch (t) {
      case "lowercase":
        return "-.inf";
      case "uppercase":
        return "-.INF";
      case "camelcase":
        return "-.Inf";
    }
  else if (tm.isNegativeZero(e))
    return "-0.0";
  return r = e.toString(10), Yw.test(r) ? r.replace("e", ".e") : r;
}
function Jw(e) {
  return Object.prototype.toString.call(e) === "[object Number]" && (e % 1 !== 0 || tm.isNegativeZero(e));
}
var rm = new Vw("tag:yaml.org,2002:float", {
  kind: "scalar",
  resolve: Ww,
  construct: Kw,
  predicate: Jw,
  represent: Xw,
  defaultStyle: "lowercase"
}), nm = Jp.extend({
  implicit: [
    Qp,
    Zp,
    em,
    rm
  ]
}), im = nm, Qw = nt, om = new RegExp(
  "^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$"
), am = new RegExp(
  "^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$"
);
function Zw(e) {
  return e === null ? !1 : om.exec(e) !== null || am.exec(e) !== null;
}
function eE(e) {
  var t, r, n, i, o, a, s, c = 0, f = null, l, u, d;
  if (t = om.exec(e), t === null && (t = am.exec(e)), t === null) throw new Error("Date resolve error");
  if (r = +t[1], n = +t[2] - 1, i = +t[3], !t[4])
    return new Date(Date.UTC(r, n, i));
  if (o = +t[4], a = +t[5], s = +t[6], t[7]) {
    for (c = t[7].slice(0, 3); c.length < 3; )
      c += "0";
    c = +c;
  }
  return t[9] && (l = +t[10], u = +(t[11] || 0), f = (l * 60 + u) * 6e4, t[9] === "-" && (f = -f)), d = new Date(Date.UTC(r, n, i, o, a, s, c)), f && d.setTime(d.getTime() - f), d;
}
function tE(e) {
  return e.toISOString();
}
var sm = new Qw("tag:yaml.org,2002:timestamp", {
  kind: "scalar",
  resolve: Zw,
  construct: eE,
  instanceOf: Date,
  represent: tE
}), rE = nt;
function nE(e) {
  return e === "<<" || e === null;
}
var cm = new rE("tag:yaml.org,2002:merge", {
  kind: "scalar",
  resolve: nE
}), iE = nt, Wc = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=
\r`;
function oE(e) {
  if (e === null) return !1;
  var t, r, n = 0, i = e.length, o = Wc;
  for (r = 0; r < i; r++)
    if (t = o.indexOf(e.charAt(r)), !(t > 64)) {
      if (t < 0) return !1;
      n += 6;
    }
  return n % 8 === 0;
}
function aE(e) {
  var t, r, n = e.replace(/[\r\n=]/g, ""), i = n.length, o = Wc, a = 0, s = [];
  for (t = 0; t < i; t++)
    t % 4 === 0 && t && (s.push(a >> 16 & 255), s.push(a >> 8 & 255), s.push(a & 255)), a = a << 6 | o.indexOf(n.charAt(t));
  return r = i % 4 * 6, r === 0 ? (s.push(a >> 16 & 255), s.push(a >> 8 & 255), s.push(a & 255)) : r === 18 ? (s.push(a >> 10 & 255), s.push(a >> 2 & 255)) : r === 12 && s.push(a >> 4 & 255), new Uint8Array(s);
}
function sE(e) {
  var t = "", r = 0, n, i, o = e.length, a = Wc;
  for (n = 0; n < o; n++)
    n % 3 === 0 && n && (t += a[r >> 18 & 63], t += a[r >> 12 & 63], t += a[r >> 6 & 63], t += a[r & 63]), r = (r << 8) + e[n];
  return i = o % 3, i === 0 ? (t += a[r >> 18 & 63], t += a[r >> 12 & 63], t += a[r >> 6 & 63], t += a[r & 63]) : i === 2 ? (t += a[r >> 10 & 63], t += a[r >> 4 & 63], t += a[r << 2 & 63], t += a[64]) : i === 1 && (t += a[r >> 2 & 63], t += a[r << 4 & 63], t += a[64], t += a[64]), t;
}
function cE(e) {
  return Object.prototype.toString.call(e) === "[object Uint8Array]";
}
var lm = new iE("tag:yaml.org,2002:binary", {
  kind: "scalar",
  resolve: oE,
  construct: aE,
  predicate: cE,
  represent: sE
}), lE = nt, uE = Object.prototype.hasOwnProperty, fE = Object.prototype.toString;
function dE(e) {
  if (e === null) return !0;
  var t = [], r, n, i, o, a, s = e;
  for (r = 0, n = s.length; r < n; r += 1) {
    if (i = s[r], a = !1, fE.call(i) !== "[object Object]") return !1;
    for (o in i)
      if (uE.call(i, o))
        if (!a) a = !0;
        else return !1;
    if (!a) return !1;
    if (t.indexOf(o) === -1) t.push(o);
    else return !1;
  }
  return !0;
}
function hE(e) {
  return e !== null ? e : [];
}
var um = new lE("tag:yaml.org,2002:omap", {
  kind: "sequence",
  resolve: dE,
  construct: hE
}), pE = nt, mE = Object.prototype.toString;
function yE(e) {
  if (e === null) return !0;
  var t, r, n, i, o, a = e;
  for (o = new Array(a.length), t = 0, r = a.length; t < r; t += 1) {
    if (n = a[t], mE.call(n) !== "[object Object]" || (i = Object.keys(n), i.length !== 1)) return !1;
    o[t] = [i[0], n[i[0]]];
  }
  return !0;
}
function gE(e) {
  if (e === null) return [];
  var t, r, n, i, o, a = e;
  for (o = new Array(a.length), t = 0, r = a.length; t < r; t += 1)
    n = a[t], i = Object.keys(n), o[t] = [i[0], n[i[0]]];
  return o;
}
var fm = new pE("tag:yaml.org,2002:pairs", {
  kind: "sequence",
  resolve: yE,
  construct: gE
}), vE = nt, $E = Object.prototype.hasOwnProperty;
function _E(e) {
  if (e === null) return !0;
  var t, r = e;
  for (t in r)
    if ($E.call(r, t) && r[t] !== null)
      return !1;
  return !0;
}
function wE(e) {
  return e !== null ? e : {};
}
var dm = new vE("tag:yaml.org,2002:set", {
  kind: "mapping",
  resolve: _E,
  construct: wE
}), Kc = im.extend({
  implicit: [
    sm,
    cm
  ],
  explicit: [
    lm,
    um,
    fm,
    dm
  ]
}), Wr = At, hm = so, EE = $w, SE = Kc, Tr = Object.prototype.hasOwnProperty, fa = 1, pm = 2, mm = 3, da = 4, Os = 1, bE = 2, Ef = 3, PE = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/, TE = /[\x85\u2028\u2029]/, AE = /[,\[\]\{\}]/, ym = /^(?:!|!!|![a-z\-]+!)$/i, gm = /^(?:!|[^,\[\]\{\}])(?:%[0-9a-f]{2}|[0-9a-z\-#;\/\?:@&=\+\$,_\.!~\*'\(\)\[\]])*$/i;
function Sf(e) {
  return Object.prototype.toString.call(e);
}
function Lt(e) {
  return e === 10 || e === 13;
}
function en(e) {
  return e === 9 || e === 32;
}
function ct(e) {
  return e === 9 || e === 32 || e === 10 || e === 13;
}
function bn(e) {
  return e === 44 || e === 91 || e === 93 || e === 123 || e === 125;
}
function OE(e) {
  var t;
  return 48 <= e && e <= 57 ? e - 48 : (t = e | 32, 97 <= t && t <= 102 ? t - 97 + 10 : -1);
}
function CE(e) {
  return e === 120 ? 2 : e === 117 ? 4 : e === 85 ? 8 : 0;
}
function IE(e) {
  return 48 <= e && e <= 57 ? e - 48 : -1;
}
function bf(e) {
  return e === 48 ? "\0" : e === 97 ? "\x07" : e === 98 ? "\b" : e === 116 || e === 9 ? "	" : e === 110 ? `
` : e === 118 ? "\v" : e === 102 ? "\f" : e === 114 ? "\r" : e === 101 ? "\x1B" : e === 32 ? " " : e === 34 ? '"' : e === 47 ? "/" : e === 92 ? "\\" : e === 78 ? "" : e === 95 ? " " : e === 76 ? "\u2028" : e === 80 ? "\u2029" : "";
}
function RE(e) {
  return e <= 65535 ? String.fromCharCode(e) : String.fromCharCode(
    (e - 65536 >> 10) + 55296,
    (e - 65536 & 1023) + 56320
  );
}
var vm = new Array(256), $m = new Array(256);
for (var pn = 0; pn < 256; pn++)
  vm[pn] = bf(pn) ? 1 : 0, $m[pn] = bf(pn);
function NE(e, t) {
  this.input = e, this.filename = t.filename || null, this.schema = t.schema || SE, this.onWarning = t.onWarning || null, this.legacy = t.legacy || !1, this.json = t.json || !1, this.listener = t.listener || null, this.implicitTypes = this.schema.compiledImplicit, this.typeMap = this.schema.compiledTypeMap, this.length = e.length, this.position = 0, this.line = 0, this.lineStart = 0, this.lineIndent = 0, this.firstTabInLine = -1, this.documents = [];
}
function _m(e, t) {
  var r = {
    name: e.filename,
    buffer: e.input.slice(0, -1),
    // omit trailing \0
    position: e.position,
    line: e.line,
    column: e.position - e.lineStart
  };
  return r.snippet = EE(r), new hm(t, r);
}
function Z(e, t) {
  throw _m(e, t);
}
function ha(e, t) {
  e.onWarning && e.onWarning.call(null, _m(e, t));
}
var Pf = {
  YAML: function(t, r, n) {
    var i, o, a;
    t.version !== null && Z(t, "duplication of %YAML directive"), n.length !== 1 && Z(t, "YAML directive accepts exactly one argument"), i = /^([0-9]+)\.([0-9]+)$/.exec(n[0]), i === null && Z(t, "ill-formed argument of the YAML directive"), o = parseInt(i[1], 10), a = parseInt(i[2], 10), o !== 1 && Z(t, "unacceptable YAML version of the document"), t.version = n[0], t.checkLineBreaks = a < 2, a !== 1 && a !== 2 && ha(t, "unsupported YAML version of the document");
  },
  TAG: function(t, r, n) {
    var i, o;
    n.length !== 2 && Z(t, "TAG directive accepts exactly two arguments"), i = n[0], o = n[1], ym.test(i) || Z(t, "ill-formed tag handle (first argument) of the TAG directive"), Tr.call(t.tagMap, i) && Z(t, 'there is a previously declared suffix for "' + i + '" tag handle'), gm.test(o) || Z(t, "ill-formed tag prefix (second argument) of the TAG directive");
    try {
      o = decodeURIComponent(o);
    } catch {
      Z(t, "tag prefix is malformed: " + o);
    }
    t.tagMap[i] = o;
  }
};
function Sr(e, t, r, n) {
  var i, o, a, s;
  if (t < r) {
    if (s = e.input.slice(t, r), n)
      for (i = 0, o = s.length; i < o; i += 1)
        a = s.charCodeAt(i), a === 9 || 32 <= a && a <= 1114111 || Z(e, "expected valid JSON character");
    else PE.test(s) && Z(e, "the stream contains non-printable characters");
    e.result += s;
  }
}
function Tf(e, t, r, n) {
  var i, o, a, s;
  for (Wr.isObject(r) || Z(e, "cannot merge mappings; the provided source object is unacceptable"), i = Object.keys(r), a = 0, s = i.length; a < s; a += 1)
    o = i[a], Tr.call(t, o) || (t[o] = r[o], n[o] = !0);
}
function Pn(e, t, r, n, i, o, a, s, c) {
  var f, l;
  if (Array.isArray(i))
    for (i = Array.prototype.slice.call(i), f = 0, l = i.length; f < l; f += 1)
      Array.isArray(i[f]) && Z(e, "nested arrays are not supported inside keys"), typeof i == "object" && Sf(i[f]) === "[object Object]" && (i[f] = "[object Object]");
  if (typeof i == "object" && Sf(i) === "[object Object]" && (i = "[object Object]"), i = String(i), t === null && (t = {}), n === "tag:yaml.org,2002:merge")
    if (Array.isArray(o))
      for (f = 0, l = o.length; f < l; f += 1)
        Tf(e, t, o[f], r);
    else
      Tf(e, t, o, r);
  else
    !e.json && !Tr.call(r, i) && Tr.call(t, i) && (e.line = a || e.line, e.lineStart = s || e.lineStart, e.position = c || e.position, Z(e, "duplicated mapping key")), i === "__proto__" ? Object.defineProperty(t, i, {
      configurable: !0,
      enumerable: !0,
      writable: !0,
      value: o
    }) : t[i] = o, delete r[i];
  return t;
}
function Yc(e) {
  var t;
  t = e.input.charCodeAt(e.position), t === 10 ? e.position++ : t === 13 ? (e.position++, e.input.charCodeAt(e.position) === 10 && e.position++) : Z(e, "a line break is expected"), e.line += 1, e.lineStart = e.position, e.firstTabInLine = -1;
}
function Oe(e, t, r) {
  for (var n = 0, i = e.input.charCodeAt(e.position); i !== 0; ) {
    for (; en(i); )
      i === 9 && e.firstTabInLine === -1 && (e.firstTabInLine = e.position), i = e.input.charCodeAt(++e.position);
    if (t && i === 35)
      do
        i = e.input.charCodeAt(++e.position);
      while (i !== 10 && i !== 13 && i !== 0);
    if (Lt(i))
      for (Yc(e), i = e.input.charCodeAt(e.position), n++, e.lineIndent = 0; i === 32; )
        e.lineIndent++, i = e.input.charCodeAt(++e.position);
    else
      break;
  }
  return r !== -1 && n !== 0 && e.lineIndent < r && ha(e, "deficient indentation"), n;
}
function Da(e) {
  var t = e.position, r;
  return r = e.input.charCodeAt(t), !!((r === 45 || r === 46) && r === e.input.charCodeAt(t + 1) && r === e.input.charCodeAt(t + 2) && (t += 3, r = e.input.charCodeAt(t), r === 0 || ct(r)));
}
function Xc(e, t) {
  t === 1 ? e.result += " " : t > 1 && (e.result += Wr.repeat(`
`, t - 1));
}
function DE(e, t, r) {
  var n, i, o, a, s, c, f, l, u = e.kind, d = e.result, h;
  if (h = e.input.charCodeAt(e.position), ct(h) || bn(h) || h === 35 || h === 38 || h === 42 || h === 33 || h === 124 || h === 62 || h === 39 || h === 34 || h === 37 || h === 64 || h === 96 || (h === 63 || h === 45) && (i = e.input.charCodeAt(e.position + 1), ct(i) || r && bn(i)))
    return !1;
  for (e.kind = "scalar", e.result = "", o = a = e.position, s = !1; h !== 0; ) {
    if (h === 58) {
      if (i = e.input.charCodeAt(e.position + 1), ct(i) || r && bn(i))
        break;
    } else if (h === 35) {
      if (n = e.input.charCodeAt(e.position - 1), ct(n))
        break;
    } else {
      if (e.position === e.lineStart && Da(e) || r && bn(h))
        break;
      if (Lt(h))
        if (c = e.line, f = e.lineStart, l = e.lineIndent, Oe(e, !1, -1), e.lineIndent >= t) {
          s = !0, h = e.input.charCodeAt(e.position);
          continue;
        } else {
          e.position = a, e.line = c, e.lineStart = f, e.lineIndent = l;
          break;
        }
    }
    s && (Sr(e, o, a, !1), Xc(e, e.line - c), o = a = e.position, s = !1), en(h) || (a = e.position + 1), h = e.input.charCodeAt(++e.position);
  }
  return Sr(e, o, a, !1), e.result ? !0 : (e.kind = u, e.result = d, !1);
}
function kE(e, t) {
  var r, n, i;
  if (r = e.input.charCodeAt(e.position), r !== 39)
    return !1;
  for (e.kind = "scalar", e.result = "", e.position++, n = i = e.position; (r = e.input.charCodeAt(e.position)) !== 0; )
    if (r === 39)
      if (Sr(e, n, e.position, !0), r = e.input.charCodeAt(++e.position), r === 39)
        n = e.position, e.position++, i = e.position;
      else
        return !0;
    else Lt(r) ? (Sr(e, n, i, !0), Xc(e, Oe(e, !1, t)), n = i = e.position) : e.position === e.lineStart && Da(e) ? Z(e, "unexpected end of the document within a single quoted scalar") : (e.position++, i = e.position);
  Z(e, "unexpected end of the stream within a single quoted scalar");
}
function FE(e, t) {
  var r, n, i, o, a, s;
  if (s = e.input.charCodeAt(e.position), s !== 34)
    return !1;
  for (e.kind = "scalar", e.result = "", e.position++, r = n = e.position; (s = e.input.charCodeAt(e.position)) !== 0; ) {
    if (s === 34)
      return Sr(e, r, e.position, !0), e.position++, !0;
    if (s === 92) {
      if (Sr(e, r, e.position, !0), s = e.input.charCodeAt(++e.position), Lt(s))
        Oe(e, !1, t);
      else if (s < 256 && vm[s])
        e.result += $m[s], e.position++;
      else if ((a = CE(s)) > 0) {
        for (i = a, o = 0; i > 0; i--)
          s = e.input.charCodeAt(++e.position), (a = OE(s)) >= 0 ? o = (o << 4) + a : Z(e, "expected hexadecimal character");
        e.result += RE(o), e.position++;
      } else
        Z(e, "unknown escape sequence");
      r = n = e.position;
    } else Lt(s) ? (Sr(e, r, n, !0), Xc(e, Oe(e, !1, t)), r = n = e.position) : e.position === e.lineStart && Da(e) ? Z(e, "unexpected end of the document within a double quoted scalar") : (e.position++, n = e.position);
  }
  Z(e, "unexpected end of the stream within a double quoted scalar");
}
function LE(e, t) {
  var r = !0, n, i, o, a = e.tag, s, c = e.anchor, f, l, u, d, h, y = /* @__PURE__ */ Object.create(null), g, $, v, S;
  if (S = e.input.charCodeAt(e.position), S === 91)
    l = 93, h = !1, s = [];
  else if (S === 123)
    l = 125, h = !0, s = {};
  else
    return !1;
  for (e.anchor !== null && (e.anchorMap[e.anchor] = s), S = e.input.charCodeAt(++e.position); S !== 0; ) {
    if (Oe(e, !0, t), S = e.input.charCodeAt(e.position), S === l)
      return e.position++, e.tag = a, e.anchor = c, e.kind = h ? "mapping" : "sequence", e.result = s, !0;
    r ? S === 44 && Z(e, "expected the node content, but found ','") : Z(e, "missed comma between flow collection entries"), $ = g = v = null, u = d = !1, S === 63 && (f = e.input.charCodeAt(e.position + 1), ct(f) && (u = d = !0, e.position++, Oe(e, !0, t))), n = e.line, i = e.lineStart, o = e.position, Mn(e, t, fa, !1, !0), $ = e.tag, g = e.result, Oe(e, !0, t), S = e.input.charCodeAt(e.position), (d || e.line === n) && S === 58 && (u = !0, S = e.input.charCodeAt(++e.position), Oe(e, !0, t), Mn(e, t, fa, !1, !0), v = e.result), h ? Pn(e, s, y, $, g, v, n, i, o) : u ? s.push(Pn(e, null, y, $, g, v, n, i, o)) : s.push(g), Oe(e, !0, t), S = e.input.charCodeAt(e.position), S === 44 ? (r = !0, S = e.input.charCodeAt(++e.position)) : r = !1;
  }
  Z(e, "unexpected end of the stream within a flow collection");
}
function xE(e, t) {
  var r, n, i = Os, o = !1, a = !1, s = t, c = 0, f = !1, l, u;
  if (u = e.input.charCodeAt(e.position), u === 124)
    n = !1;
  else if (u === 62)
    n = !0;
  else
    return !1;
  for (e.kind = "scalar", e.result = ""; u !== 0; )
    if (u = e.input.charCodeAt(++e.position), u === 43 || u === 45)
      Os === i ? i = u === 43 ? Ef : bE : Z(e, "repeat of a chomping mode identifier");
    else if ((l = IE(u)) >= 0)
      l === 0 ? Z(e, "bad explicit indentation width of a block scalar; it cannot be less than one") : a ? Z(e, "repeat of an indentation width identifier") : (s = t + l - 1, a = !0);
    else
      break;
  if (en(u)) {
    do
      u = e.input.charCodeAt(++e.position);
    while (en(u));
    if (u === 35)
      do
        u = e.input.charCodeAt(++e.position);
      while (!Lt(u) && u !== 0);
  }
  for (; u !== 0; ) {
    for (Yc(e), e.lineIndent = 0, u = e.input.charCodeAt(e.position); (!a || e.lineIndent < s) && u === 32; )
      e.lineIndent++, u = e.input.charCodeAt(++e.position);
    if (!a && e.lineIndent > s && (s = e.lineIndent), Lt(u)) {
      c++;
      continue;
    }
    if (e.lineIndent < s) {
      i === Ef ? e.result += Wr.repeat(`
`, o ? 1 + c : c) : i === Os && o && (e.result += `
`);
      break;
    }
    for (n ? en(u) ? (f = !0, e.result += Wr.repeat(`
`, o ? 1 + c : c)) : f ? (f = !1, e.result += Wr.repeat(`
`, c + 1)) : c === 0 ? o && (e.result += " ") : e.result += Wr.repeat(`
`, c) : e.result += Wr.repeat(`
`, o ? 1 + c : c), o = !0, a = !0, c = 0, r = e.position; !Lt(u) && u !== 0; )
      u = e.input.charCodeAt(++e.position);
    Sr(e, r, e.position, !1);
  }
  return !0;
}
function Af(e, t) {
  var r, n = e.tag, i = e.anchor, o = [], a, s = !1, c;
  if (e.firstTabInLine !== -1) return !1;
  for (e.anchor !== null && (e.anchorMap[e.anchor] = o), c = e.input.charCodeAt(e.position); c !== 0 && (e.firstTabInLine !== -1 && (e.position = e.firstTabInLine, Z(e, "tab characters must not be used in indentation")), !(c !== 45 || (a = e.input.charCodeAt(e.position + 1), !ct(a)))); ) {
    if (s = !0, e.position++, Oe(e, !0, -1) && e.lineIndent <= t) {
      o.push(null), c = e.input.charCodeAt(e.position);
      continue;
    }
    if (r = e.line, Mn(e, t, mm, !1, !0), o.push(e.result), Oe(e, !0, -1), c = e.input.charCodeAt(e.position), (e.line === r || e.lineIndent > t) && c !== 0)
      Z(e, "bad indentation of a sequence entry");
    else if (e.lineIndent < t)
      break;
  }
  return s ? (e.tag = n, e.anchor = i, e.kind = "sequence", e.result = o, !0) : !1;
}
function UE(e, t, r) {
  var n, i, o, a, s, c, f = e.tag, l = e.anchor, u = {}, d = /* @__PURE__ */ Object.create(null), h = null, y = null, g = null, $ = !1, v = !1, S;
  if (e.firstTabInLine !== -1) return !1;
  for (e.anchor !== null && (e.anchorMap[e.anchor] = u), S = e.input.charCodeAt(e.position); S !== 0; ) {
    if (!$ && e.firstTabInLine !== -1 && (e.position = e.firstTabInLine, Z(e, "tab characters must not be used in indentation")), n = e.input.charCodeAt(e.position + 1), o = e.line, (S === 63 || S === 58) && ct(n))
      S === 63 ? ($ && (Pn(e, u, d, h, y, null, a, s, c), h = y = g = null), v = !0, $ = !0, i = !0) : $ ? ($ = !1, i = !0) : Z(e, "incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line"), e.position += 1, S = n;
    else {
      if (a = e.line, s = e.lineStart, c = e.position, !Mn(e, r, pm, !1, !0))
        break;
      if (e.line === o) {
        for (S = e.input.charCodeAt(e.position); en(S); )
          S = e.input.charCodeAt(++e.position);
        if (S === 58)
          S = e.input.charCodeAt(++e.position), ct(S) || Z(e, "a whitespace character is expected after the key-value separator within a block mapping"), $ && (Pn(e, u, d, h, y, null, a, s, c), h = y = g = null), v = !0, $ = !1, i = !1, h = e.tag, y = e.result;
        else if (v)
          Z(e, "can not read an implicit mapping pair; a colon is missed");
        else
          return e.tag = f, e.anchor = l, !0;
      } else if (v)
        Z(e, "can not read a block mapping entry; a multiline key may not be an implicit key");
      else
        return e.tag = f, e.anchor = l, !0;
    }
    if ((e.line === o || e.lineIndent > t) && ($ && (a = e.line, s = e.lineStart, c = e.position), Mn(e, t, da, !0, i) && ($ ? y = e.result : g = e.result), $ || (Pn(e, u, d, h, y, g, a, s, c), h = y = g = null), Oe(e, !0, -1), S = e.input.charCodeAt(e.position)), (e.line === o || e.lineIndent > t) && S !== 0)
      Z(e, "bad indentation of a mapping entry");
    else if (e.lineIndent < t)
      break;
  }
  return $ && Pn(e, u, d, h, y, null, a, s, c), v && (e.tag = f, e.anchor = l, e.kind = "mapping", e.result = u), v;
}
function jE(e) {
  var t, r = !1, n = !1, i, o, a;
  if (a = e.input.charCodeAt(e.position), a !== 33) return !1;
  if (e.tag !== null && Z(e, "duplication of a tag property"), a = e.input.charCodeAt(++e.position), a === 60 ? (r = !0, a = e.input.charCodeAt(++e.position)) : a === 33 ? (n = !0, i = "!!", a = e.input.charCodeAt(++e.position)) : i = "!", t = e.position, r) {
    do
      a = e.input.charCodeAt(++e.position);
    while (a !== 0 && a !== 62);
    e.position < e.length ? (o = e.input.slice(t, e.position), a = e.input.charCodeAt(++e.position)) : Z(e, "unexpected end of the stream within a verbatim tag");
  } else {
    for (; a !== 0 && !ct(a); )
      a === 33 && (n ? Z(e, "tag suffix cannot contain exclamation marks") : (i = e.input.slice(t - 1, e.position + 1), ym.test(i) || Z(e, "named tag handle cannot contain such characters"), n = !0, t = e.position + 1)), a = e.input.charCodeAt(++e.position);
    o = e.input.slice(t, e.position), AE.test(o) && Z(e, "tag suffix cannot contain flow indicator characters");
  }
  o && !gm.test(o) && Z(e, "tag name cannot contain such characters: " + o);
  try {
    o = decodeURIComponent(o);
  } catch {
    Z(e, "tag name is malformed: " + o);
  }
  return r ? e.tag = o : Tr.call(e.tagMap, i) ? e.tag = e.tagMap[i] + o : i === "!" ? e.tag = "!" + o : i === "!!" ? e.tag = "tag:yaml.org,2002:" + o : Z(e, 'undeclared tag handle "' + i + '"'), !0;
}
function ME(e) {
  var t, r;
  if (r = e.input.charCodeAt(e.position), r !== 38) return !1;
  for (e.anchor !== null && Z(e, "duplication of an anchor property"), r = e.input.charCodeAt(++e.position), t = e.position; r !== 0 && !ct(r) && !bn(r); )
    r = e.input.charCodeAt(++e.position);
  return e.position === t && Z(e, "name of an anchor node must contain at least one character"), e.anchor = e.input.slice(t, e.position), !0;
}
function qE(e) {
  var t, r, n;
  if (n = e.input.charCodeAt(e.position), n !== 42) return !1;
  for (n = e.input.charCodeAt(++e.position), t = e.position; n !== 0 && !ct(n) && !bn(n); )
    n = e.input.charCodeAt(++e.position);
  return e.position === t && Z(e, "name of an alias node must contain at least one character"), r = e.input.slice(t, e.position), Tr.call(e.anchorMap, r) || Z(e, 'unidentified alias "' + r + '"'), e.result = e.anchorMap[r], Oe(e, !0, -1), !0;
}
function Mn(e, t, r, n, i) {
  var o, a, s, c = 1, f = !1, l = !1, u, d, h, y, g, $;
  if (e.listener !== null && e.listener("open", e), e.tag = null, e.anchor = null, e.kind = null, e.result = null, o = a = s = da === r || mm === r, n && Oe(e, !0, -1) && (f = !0, e.lineIndent > t ? c = 1 : e.lineIndent === t ? c = 0 : e.lineIndent < t && (c = -1)), c === 1)
    for (; jE(e) || ME(e); )
      Oe(e, !0, -1) ? (f = !0, s = o, e.lineIndent > t ? c = 1 : e.lineIndent === t ? c = 0 : e.lineIndent < t && (c = -1)) : s = !1;
  if (s && (s = f || i), (c === 1 || da === r) && (fa === r || pm === r ? g = t : g = t + 1, $ = e.position - e.lineStart, c === 1 ? s && (Af(e, $) || UE(e, $, g)) || LE(e, g) ? l = !0 : (a && xE(e, g) || kE(e, g) || FE(e, g) ? l = !0 : qE(e) ? (l = !0, (e.tag !== null || e.anchor !== null) && Z(e, "alias node should not have any properties")) : DE(e, g, fa === r) && (l = !0, e.tag === null && (e.tag = "?")), e.anchor !== null && (e.anchorMap[e.anchor] = e.result)) : c === 0 && (l = s && Af(e, $))), e.tag === null)
    e.anchor !== null && (e.anchorMap[e.anchor] = e.result);
  else if (e.tag === "?") {
    for (e.result !== null && e.kind !== "scalar" && Z(e, 'unacceptable node kind for !<?> tag; it should be "scalar", not "' + e.kind + '"'), u = 0, d = e.implicitTypes.length; u < d; u += 1)
      if (y = e.implicitTypes[u], y.resolve(e.result)) {
        e.result = y.construct(e.result), e.tag = y.tag, e.anchor !== null && (e.anchorMap[e.anchor] = e.result);
        break;
      }
  } else if (e.tag !== "!") {
    if (Tr.call(e.typeMap[e.kind || "fallback"], e.tag))
      y = e.typeMap[e.kind || "fallback"][e.tag];
    else
      for (y = null, h = e.typeMap.multi[e.kind || "fallback"], u = 0, d = h.length; u < d; u += 1)
        if (e.tag.slice(0, h[u].tag.length) === h[u].tag) {
          y = h[u];
          break;
        }
    y || Z(e, "unknown tag !<" + e.tag + ">"), e.result !== null && y.kind !== e.kind && Z(e, "unacceptable node kind for !<" + e.tag + '> tag; it should be "' + y.kind + '", not "' + e.kind + '"'), y.resolve(e.result, e.tag) ? (e.result = y.construct(e.result, e.tag), e.anchor !== null && (e.anchorMap[e.anchor] = e.result)) : Z(e, "cannot resolve a node with !<" + e.tag + "> explicit tag");
  }
  return e.listener !== null && e.listener("close", e), e.tag !== null || e.anchor !== null || l;
}
function HE(e) {
  var t = e.position, r, n, i, o = !1, a;
  for (e.version = null, e.checkLineBreaks = e.legacy, e.tagMap = /* @__PURE__ */ Object.create(null), e.anchorMap = /* @__PURE__ */ Object.create(null); (a = e.input.charCodeAt(e.position)) !== 0 && (Oe(e, !0, -1), a = e.input.charCodeAt(e.position), !(e.lineIndent > 0 || a !== 37)); ) {
    for (o = !0, a = e.input.charCodeAt(++e.position), r = e.position; a !== 0 && !ct(a); )
      a = e.input.charCodeAt(++e.position);
    for (n = e.input.slice(r, e.position), i = [], n.length < 1 && Z(e, "directive name must not be less than one character in length"); a !== 0; ) {
      for (; en(a); )
        a = e.input.charCodeAt(++e.position);
      if (a === 35) {
        do
          a = e.input.charCodeAt(++e.position);
        while (a !== 0 && !Lt(a));
        break;
      }
      if (Lt(a)) break;
      for (r = e.position; a !== 0 && !ct(a); )
        a = e.input.charCodeAt(++e.position);
      i.push(e.input.slice(r, e.position));
    }
    a !== 0 && Yc(e), Tr.call(Pf, n) ? Pf[n](e, n, i) : ha(e, 'unknown document directive "' + n + '"');
  }
  if (Oe(e, !0, -1), e.lineIndent === 0 && e.input.charCodeAt(e.position) === 45 && e.input.charCodeAt(e.position + 1) === 45 && e.input.charCodeAt(e.position + 2) === 45 ? (e.position += 3, Oe(e, !0, -1)) : o && Z(e, "directives end mark is expected"), Mn(e, e.lineIndent - 1, da, !1, !0), Oe(e, !0, -1), e.checkLineBreaks && TE.test(e.input.slice(t, e.position)) && ha(e, "non-ASCII line breaks are interpreted as content"), e.documents.push(e.result), e.position === e.lineStart && Da(e)) {
    e.input.charCodeAt(e.position) === 46 && (e.position += 3, Oe(e, !0, -1));
    return;
  }
  if (e.position < e.length - 1)
    Z(e, "end of the stream or a document separator is expected");
  else
    return;
}
function wm(e, t) {
  e = String(e), t = t || {}, e.length !== 0 && (e.charCodeAt(e.length - 1) !== 10 && e.charCodeAt(e.length - 1) !== 13 && (e += `
`), e.charCodeAt(0) === 65279 && (e = e.slice(1)));
  var r = new NE(e, t), n = e.indexOf("\0");
  for (n !== -1 && (r.position = n, Z(r, "null byte is not allowed in input")), r.input += "\0"; r.input.charCodeAt(r.position) === 32; )
    r.lineIndent += 1, r.position += 1;
  for (; r.position < r.length - 1; )
    HE(r);
  return r.documents;
}
function BE(e, t, r) {
  t !== null && typeof t == "object" && typeof r > "u" && (r = t, t = null);
  var n = wm(e, r);
  if (typeof t != "function")
    return n;
  for (var i = 0, o = n.length; i < o; i += 1)
    t(n[i]);
}
function GE(e, t) {
  var r = wm(e, t);
  if (r.length !== 0) {
    if (r.length === 1)
      return r[0];
    throw new hm("expected a single document in the stream, but found more");
  }
}
zc.loadAll = BE;
zc.load = GE;
var Em = {}, ka = At, co = so, VE = Kc, Sm = Object.prototype.toString, bm = Object.prototype.hasOwnProperty, Jc = 65279, zE = 9, Vi = 10, WE = 13, KE = 32, YE = 33, XE = 34, uc = 35, JE = 37, QE = 38, ZE = 39, eS = 42, Pm = 44, tS = 45, pa = 58, rS = 61, nS = 62, iS = 63, oS = 64, Tm = 91, Am = 93, aS = 96, Om = 123, sS = 124, Cm = 125, Ye = {};
Ye[0] = "\\0";
Ye[7] = "\\a";
Ye[8] = "\\b";
Ye[9] = "\\t";
Ye[10] = "\\n";
Ye[11] = "\\v";
Ye[12] = "\\f";
Ye[13] = "\\r";
Ye[27] = "\\e";
Ye[34] = '\\"';
Ye[92] = "\\\\";
Ye[133] = "\\N";
Ye[160] = "\\_";
Ye[8232] = "\\L";
Ye[8233] = "\\P";
var cS = [
  "y",
  "Y",
  "yes",
  "Yes",
  "YES",
  "on",
  "On",
  "ON",
  "n",
  "N",
  "no",
  "No",
  "NO",
  "off",
  "Off",
  "OFF"
], lS = /^[-+]?[0-9_]+(?::[0-9_]+)+(?:\.[0-9_]*)?$/;
function uS(e, t) {
  var r, n, i, o, a, s, c;
  if (t === null) return {};
  for (r = {}, n = Object.keys(t), i = 0, o = n.length; i < o; i += 1)
    a = n[i], s = String(t[a]), a.slice(0, 2) === "!!" && (a = "tag:yaml.org,2002:" + a.slice(2)), c = e.compiledTypeMap.fallback[a], c && bm.call(c.styleAliases, s) && (s = c.styleAliases[s]), r[a] = s;
  return r;
}
function fS(e) {
  var t, r, n;
  if (t = e.toString(16).toUpperCase(), e <= 255)
    r = "x", n = 2;
  else if (e <= 65535)
    r = "u", n = 4;
  else if (e <= 4294967295)
    r = "U", n = 8;
  else
    throw new co("code point within a string may not be greater than 0xFFFFFFFF");
  return "\\" + r + ka.repeat("0", n - t.length) + t;
}
var dS = 1, zi = 2;
function hS(e) {
  this.schema = e.schema || VE, this.indent = Math.max(1, e.indent || 2), this.noArrayIndent = e.noArrayIndent || !1, this.skipInvalid = e.skipInvalid || !1, this.flowLevel = ka.isNothing(e.flowLevel) ? -1 : e.flowLevel, this.styleMap = uS(this.schema, e.styles || null), this.sortKeys = e.sortKeys || !1, this.lineWidth = e.lineWidth || 80, this.noRefs = e.noRefs || !1, this.noCompatMode = e.noCompatMode || !1, this.condenseFlow = e.condenseFlow || !1, this.quotingType = e.quotingType === '"' ? zi : dS, this.forceQuotes = e.forceQuotes || !1, this.replacer = typeof e.replacer == "function" ? e.replacer : null, this.implicitTypes = this.schema.compiledImplicit, this.explicitTypes = this.schema.compiledExplicit, this.tag = null, this.result = "", this.duplicates = [], this.usedDuplicates = null;
}
function Of(e, t) {
  for (var r = ka.repeat(" ", t), n = 0, i = -1, o = "", a, s = e.length; n < s; )
    i = e.indexOf(`
`, n), i === -1 ? (a = e.slice(n), n = s) : (a = e.slice(n, i + 1), n = i + 1), a.length && a !== `
` && (o += r), o += a;
  return o;
}
function fc(e, t) {
  return `
` + ka.repeat(" ", e.indent * t);
}
function pS(e, t) {
  var r, n, i;
  for (r = 0, n = e.implicitTypes.length; r < n; r += 1)
    if (i = e.implicitTypes[r], i.resolve(t))
      return !0;
  return !1;
}
function ma(e) {
  return e === KE || e === zE;
}
function Wi(e) {
  return 32 <= e && e <= 126 || 161 <= e && e <= 55295 && e !== 8232 && e !== 8233 || 57344 <= e && e <= 65533 && e !== Jc || 65536 <= e && e <= 1114111;
}
function Cf(e) {
  return Wi(e) && e !== Jc && e !== WE && e !== Vi;
}
function If(e, t, r) {
  var n = Cf(e), i = n && !ma(e);
  return (
    // ns-plain-safe
    (r ? (
      // c = flow-in
      n
    ) : n && e !== Pm && e !== Tm && e !== Am && e !== Om && e !== Cm) && e !== uc && !(t === pa && !i) || Cf(t) && !ma(t) && e === uc || t === pa && i
  );
}
function mS(e) {
  return Wi(e) && e !== Jc && !ma(e) && e !== tS && e !== iS && e !== pa && e !== Pm && e !== Tm && e !== Am && e !== Om && e !== Cm && e !== uc && e !== QE && e !== eS && e !== YE && e !== sS && e !== rS && e !== nS && e !== ZE && e !== XE && e !== JE && e !== oS && e !== aS;
}
function yS(e) {
  return !ma(e) && e !== pa;
}
function Ti(e, t) {
  var r = e.charCodeAt(t), n;
  return r >= 55296 && r <= 56319 && t + 1 < e.length && (n = e.charCodeAt(t + 1), n >= 56320 && n <= 57343) ? (r - 55296) * 1024 + n - 56320 + 65536 : r;
}
function Im(e) {
  var t = /^\n* /;
  return t.test(e);
}
var Rm = 1, dc = 2, Nm = 3, Dm = 4, En = 5;
function gS(e, t, r, n, i, o, a, s) {
  var c, f = 0, l = null, u = !1, d = !1, h = n !== -1, y = -1, g = mS(Ti(e, 0)) && yS(Ti(e, e.length - 1));
  if (t || a)
    for (c = 0; c < e.length; f >= 65536 ? c += 2 : c++) {
      if (f = Ti(e, c), !Wi(f))
        return En;
      g = g && If(f, l, s), l = f;
    }
  else {
    for (c = 0; c < e.length; f >= 65536 ? c += 2 : c++) {
      if (f = Ti(e, c), f === Vi)
        u = !0, h && (d = d || // Foldable line = too long, and not more-indented.
        c - y - 1 > n && e[y + 1] !== " ", y = c);
      else if (!Wi(f))
        return En;
      g = g && If(f, l, s), l = f;
    }
    d = d || h && c - y - 1 > n && e[y + 1] !== " ";
  }
  return !u && !d ? g && !a && !i(e) ? Rm : o === zi ? En : dc : r > 9 && Im(e) ? En : a ? o === zi ? En : dc : d ? Dm : Nm;
}
function vS(e, t, r, n, i) {
  e.dump = function() {
    if (t.length === 0)
      return e.quotingType === zi ? '""' : "''";
    if (!e.noCompatMode && (cS.indexOf(t) !== -1 || lS.test(t)))
      return e.quotingType === zi ? '"' + t + '"' : "'" + t + "'";
    var o = e.indent * Math.max(1, r), a = e.lineWidth === -1 ? -1 : Math.max(Math.min(e.lineWidth, 40), e.lineWidth - o), s = n || e.flowLevel > -1 && r >= e.flowLevel;
    function c(f) {
      return pS(e, f);
    }
    switch (gS(
      t,
      s,
      e.indent,
      a,
      c,
      e.quotingType,
      e.forceQuotes && !n,
      i
    )) {
      case Rm:
        return t;
      case dc:
        return "'" + t.replace(/'/g, "''") + "'";
      case Nm:
        return "|" + Rf(t, e.indent) + Nf(Of(t, o));
      case Dm:
        return ">" + Rf(t, e.indent) + Nf(Of($S(t, a), o));
      case En:
        return '"' + _S(t) + '"';
      default:
        throw new co("impossible error: invalid scalar style");
    }
  }();
}
function Rf(e, t) {
  var r = Im(e) ? String(t) : "", n = e[e.length - 1] === `
`, i = n && (e[e.length - 2] === `
` || e === `
`), o = i ? "+" : n ? "" : "-";
  return r + o + `
`;
}
function Nf(e) {
  return e[e.length - 1] === `
` ? e.slice(0, -1) : e;
}
function $S(e, t) {
  for (var r = /(\n+)([^\n]*)/g, n = function() {
    var f = e.indexOf(`
`);
    return f = f !== -1 ? f : e.length, r.lastIndex = f, Df(e.slice(0, f), t);
  }(), i = e[0] === `
` || e[0] === " ", o, a; a = r.exec(e); ) {
    var s = a[1], c = a[2];
    o = c[0] === " ", n += s + (!i && !o && c !== "" ? `
` : "") + Df(c, t), i = o;
  }
  return n;
}
function Df(e, t) {
  if (e === "" || e[0] === " ") return e;
  for (var r = / [^ ]/g, n, i = 0, o, a = 0, s = 0, c = ""; n = r.exec(e); )
    s = n.index, s - i > t && (o = a > i ? a : s, c += `
` + e.slice(i, o), i = o + 1), a = s;
  return c += `
`, e.length - i > t && a > i ? c += e.slice(i, a) + `
` + e.slice(a + 1) : c += e.slice(i), c.slice(1);
}
function _S(e) {
  for (var t = "", r = 0, n, i = 0; i < e.length; r >= 65536 ? i += 2 : i++)
    r = Ti(e, i), n = Ye[r], !n && Wi(r) ? (t += e[i], r >= 65536 && (t += e[i + 1])) : t += n || fS(r);
  return t;
}
function wS(e, t, r) {
  var n = "", i = e.tag, o, a, s;
  for (o = 0, a = r.length; o < a; o += 1)
    s = r[o], e.replacer && (s = e.replacer.call(r, String(o), s)), (Jt(e, t, s, !1, !1) || typeof s > "u" && Jt(e, t, null, !1, !1)) && (n !== "" && (n += "," + (e.condenseFlow ? "" : " ")), n += e.dump);
  e.tag = i, e.dump = "[" + n + "]";
}
function kf(e, t, r, n) {
  var i = "", o = e.tag, a, s, c;
  for (a = 0, s = r.length; a < s; a += 1)
    c = r[a], e.replacer && (c = e.replacer.call(r, String(a), c)), (Jt(e, t + 1, c, !0, !0, !1, !0) || typeof c > "u" && Jt(e, t + 1, null, !0, !0, !1, !0)) && ((!n || i !== "") && (i += fc(e, t)), e.dump && Vi === e.dump.charCodeAt(0) ? i += "-" : i += "- ", i += e.dump);
  e.tag = o, e.dump = i || "[]";
}
function ES(e, t, r) {
  var n = "", i = e.tag, o = Object.keys(r), a, s, c, f, l;
  for (a = 0, s = o.length; a < s; a += 1)
    l = "", n !== "" && (l += ", "), e.condenseFlow && (l += '"'), c = o[a], f = r[c], e.replacer && (f = e.replacer.call(r, c, f)), Jt(e, t, c, !1, !1) && (e.dump.length > 1024 && (l += "? "), l += e.dump + (e.condenseFlow ? '"' : "") + ":" + (e.condenseFlow ? "" : " "), Jt(e, t, f, !1, !1) && (l += e.dump, n += l));
  e.tag = i, e.dump = "{" + n + "}";
}
function SS(e, t, r, n) {
  var i = "", o = e.tag, a = Object.keys(r), s, c, f, l, u, d;
  if (e.sortKeys === !0)
    a.sort();
  else if (typeof e.sortKeys == "function")
    a.sort(e.sortKeys);
  else if (e.sortKeys)
    throw new co("sortKeys must be a boolean or a function");
  for (s = 0, c = a.length; s < c; s += 1)
    d = "", (!n || i !== "") && (d += fc(e, t)), f = a[s], l = r[f], e.replacer && (l = e.replacer.call(r, f, l)), Jt(e, t + 1, f, !0, !0, !0) && (u = e.tag !== null && e.tag !== "?" || e.dump && e.dump.length > 1024, u && (e.dump && Vi === e.dump.charCodeAt(0) ? d += "?" : d += "? "), d += e.dump, u && (d += fc(e, t)), Jt(e, t + 1, l, !0, u) && (e.dump && Vi === e.dump.charCodeAt(0) ? d += ":" : d += ": ", d += e.dump, i += d));
  e.tag = o, e.dump = i || "{}";
}
function Ff(e, t, r) {
  var n, i, o, a, s, c;
  for (i = r ? e.explicitTypes : e.implicitTypes, o = 0, a = i.length; o < a; o += 1)
    if (s = i[o], (s.instanceOf || s.predicate) && (!s.instanceOf || typeof t == "object" && t instanceof s.instanceOf) && (!s.predicate || s.predicate(t))) {
      if (r ? s.multi && s.representName ? e.tag = s.representName(t) : e.tag = s.tag : e.tag = "?", s.represent) {
        if (c = e.styleMap[s.tag] || s.defaultStyle, Sm.call(s.represent) === "[object Function]")
          n = s.represent(t, c);
        else if (bm.call(s.represent, c))
          n = s.represent[c](t, c);
        else
          throw new co("!<" + s.tag + '> tag resolver accepts not "' + c + '" style');
        e.dump = n;
      }
      return !0;
    }
  return !1;
}
function Jt(e, t, r, n, i, o, a) {
  e.tag = null, e.dump = r, Ff(e, r, !1) || Ff(e, r, !0);
  var s = Sm.call(e.dump), c = n, f;
  n && (n = e.flowLevel < 0 || e.flowLevel > t);
  var l = s === "[object Object]" || s === "[object Array]", u, d;
  if (l && (u = e.duplicates.indexOf(r), d = u !== -1), (e.tag !== null && e.tag !== "?" || d || e.indent !== 2 && t > 0) && (i = !1), d && e.usedDuplicates[u])
    e.dump = "*ref_" + u;
  else {
    if (l && d && !e.usedDuplicates[u] && (e.usedDuplicates[u] = !0), s === "[object Object]")
      n && Object.keys(e.dump).length !== 0 ? (SS(e, t, e.dump, i), d && (e.dump = "&ref_" + u + e.dump)) : (ES(e, t, e.dump), d && (e.dump = "&ref_" + u + " " + e.dump));
    else if (s === "[object Array]")
      n && e.dump.length !== 0 ? (e.noArrayIndent && !a && t > 0 ? kf(e, t - 1, e.dump, i) : kf(e, t, e.dump, i), d && (e.dump = "&ref_" + u + e.dump)) : (wS(e, t, e.dump), d && (e.dump = "&ref_" + u + " " + e.dump));
    else if (s === "[object String]")
      e.tag !== "?" && vS(e, e.dump, t, o, c);
    else {
      if (s === "[object Undefined]")
        return !1;
      if (e.skipInvalid) return !1;
      throw new co("unacceptable kind of an object to dump " + s);
    }
    e.tag !== null && e.tag !== "?" && (f = encodeURI(
      e.tag[0] === "!" ? e.tag.slice(1) : e.tag
    ).replace(/!/g, "%21"), e.tag[0] === "!" ? f = "!" + f : f.slice(0, 18) === "tag:yaml.org,2002:" ? f = "!!" + f.slice(18) : f = "!<" + f + ">", e.dump = f + " " + e.dump);
  }
  return !0;
}
function bS(e, t) {
  var r = [], n = [], i, o;
  for (hc(e, r, n), i = 0, o = n.length; i < o; i += 1)
    t.duplicates.push(r[n[i]]);
  t.usedDuplicates = new Array(o);
}
function hc(e, t, r) {
  var n, i, o;
  if (e !== null && typeof e == "object")
    if (i = t.indexOf(e), i !== -1)
      r.indexOf(i) === -1 && r.push(i);
    else if (t.push(e), Array.isArray(e))
      for (i = 0, o = e.length; i < o; i += 1)
        hc(e[i], t, r);
    else
      for (n = Object.keys(e), i = 0, o = n.length; i < o; i += 1)
        hc(e[n[i]], t, r);
}
function PS(e, t) {
  t = t || {};
  var r = new hS(t);
  r.noRefs || bS(e, r);
  var n = e;
  return r.replacer && (n = r.replacer.call({ "": n }, "", n)), Jt(r, 0, n, !0, !0) ? r.dump + `
` : "";
}
Em.dump = PS;
var km = zc, TS = Em;
function Qc(e, t) {
  return function() {
    throw new Error("Function yaml." + e + " is removed in js-yaml 4. Use yaml." + t + " instead, which is now safe by default.");
  };
}
qe.Type = nt;
qe.Schema = Wp;
qe.FAILSAFE_SCHEMA = Jp;
qe.JSON_SCHEMA = nm;
qe.CORE_SCHEMA = im;
qe.DEFAULT_SCHEMA = Kc;
qe.load = km.load;
qe.loadAll = km.loadAll;
qe.dump = TS.dump;
qe.YAMLException = so;
qe.types = {
  binary: lm,
  float: rm,
  map: Xp,
  null: Qp,
  pairs: fm,
  set: dm,
  timestamp: sm,
  bool: Zp,
  int: em,
  merge: cm,
  omap: um,
  seq: Yp,
  str: Kp
};
qe.safeLoad = Qc("safeLoad", "load");
qe.safeLoadAll = Qc("safeLoadAll", "loadAll");
qe.safeDump = Qc("safeDump", "dump");
var Fa = {};
Object.defineProperty(Fa, "__esModule", { value: !0 });
Fa.Lazy = void 0;
class AS {
  constructor(t) {
    this._value = null, this.creator = t;
  }
  get hasValue() {
    return this.creator == null;
  }
  get value() {
    if (this.creator == null)
      return this._value;
    const t = this.creator();
    return this.value = t, t;
  }
  set value(t) {
    this._value = t, this.creator = null;
  }
}
Fa.Lazy = AS;
var pc = { exports: {} };
const OS = "2.0.0", Fm = 256, CS = Number.MAX_SAFE_INTEGER || /* istanbul ignore next */
9007199254740991, IS = 16, RS = Fm - 6, NS = [
  "major",
  "premajor",
  "minor",
  "preminor",
  "patch",
  "prepatch",
  "prerelease"
];
var La = {
  MAX_LENGTH: Fm,
  MAX_SAFE_COMPONENT_LENGTH: IS,
  MAX_SAFE_BUILD_LENGTH: RS,
  MAX_SAFE_INTEGER: CS,
  RELEASE_TYPES: NS,
  SEMVER_SPEC_VERSION: OS,
  FLAG_INCLUDE_PRERELEASE: 1,
  FLAG_LOOSE: 2
};
const DS = typeof process == "object" && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG) ? (...e) => console.error("SEMVER", ...e) : () => {
};
var xa = DS;
(function(e, t) {
  const {
    MAX_SAFE_COMPONENT_LENGTH: r,
    MAX_SAFE_BUILD_LENGTH: n,
    MAX_LENGTH: i
  } = La, o = xa;
  t = e.exports = {};
  const a = t.re = [], s = t.safeRe = [], c = t.src = [], f = t.safeSrc = [], l = t.t = {};
  let u = 0;
  const d = "[a-zA-Z0-9-]", h = [
    ["\\s", 1],
    ["\\d", i],
    [d, n]
  ], y = ($) => {
    for (const [v, S] of h)
      $ = $.split(`${v}*`).join(`${v}{0,${S}}`).split(`${v}+`).join(`${v}{1,${S}}`);
    return $;
  }, g = ($, v, S) => {
    const C = y(v), R = u++;
    o($, R, v), l[$] = R, c[R] = v, f[R] = C, a[R] = new RegExp(v, S ? "g" : void 0), s[R] = new RegExp(C, S ? "g" : void 0);
  };
  g("NUMERICIDENTIFIER", "0|[1-9]\\d*"), g("NUMERICIDENTIFIERLOOSE", "\\d+"), g("NONNUMERICIDENTIFIER", `\\d*[a-zA-Z-]${d}*`), g("MAINVERSION", `(${c[l.NUMERICIDENTIFIER]})\\.(${c[l.NUMERICIDENTIFIER]})\\.(${c[l.NUMERICIDENTIFIER]})`), g("MAINVERSIONLOOSE", `(${c[l.NUMERICIDENTIFIERLOOSE]})\\.(${c[l.NUMERICIDENTIFIERLOOSE]})\\.(${c[l.NUMERICIDENTIFIERLOOSE]})`), g("PRERELEASEIDENTIFIER", `(?:${c[l.NUMERICIDENTIFIER]}|${c[l.NONNUMERICIDENTIFIER]})`), g("PRERELEASEIDENTIFIERLOOSE", `(?:${c[l.NUMERICIDENTIFIERLOOSE]}|${c[l.NONNUMERICIDENTIFIER]})`), g("PRERELEASE", `(?:-(${c[l.PRERELEASEIDENTIFIER]}(?:\\.${c[l.PRERELEASEIDENTIFIER]})*))`), g("PRERELEASELOOSE", `(?:-?(${c[l.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${c[l.PRERELEASEIDENTIFIERLOOSE]})*))`), g("BUILDIDENTIFIER", `${d}+`), g("BUILD", `(?:\\+(${c[l.BUILDIDENTIFIER]}(?:\\.${c[l.BUILDIDENTIFIER]})*))`), g("FULLPLAIN", `v?${c[l.MAINVERSION]}${c[l.PRERELEASE]}?${c[l.BUILD]}?`), g("FULL", `^${c[l.FULLPLAIN]}$`), g("LOOSEPLAIN", `[v=\\s]*${c[l.MAINVERSIONLOOSE]}${c[l.PRERELEASELOOSE]}?${c[l.BUILD]}?`), g("LOOSE", `^${c[l.LOOSEPLAIN]}$`), g("GTLT", "((?:<|>)?=?)"), g("XRANGEIDENTIFIERLOOSE", `${c[l.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`), g("XRANGEIDENTIFIER", `${c[l.NUMERICIDENTIFIER]}|x|X|\\*`), g("XRANGEPLAIN", `[v=\\s]*(${c[l.XRANGEIDENTIFIER]})(?:\\.(${c[l.XRANGEIDENTIFIER]})(?:\\.(${c[l.XRANGEIDENTIFIER]})(?:${c[l.PRERELEASE]})?${c[l.BUILD]}?)?)?`), g("XRANGEPLAINLOOSE", `[v=\\s]*(${c[l.XRANGEIDENTIFIERLOOSE]})(?:\\.(${c[l.XRANGEIDENTIFIERLOOSE]})(?:\\.(${c[l.XRANGEIDENTIFIERLOOSE]})(?:${c[l.PRERELEASELOOSE]})?${c[l.BUILD]}?)?)?`), g("XRANGE", `^${c[l.GTLT]}\\s*${c[l.XRANGEPLAIN]}$`), g("XRANGELOOSE", `^${c[l.GTLT]}\\s*${c[l.XRANGEPLAINLOOSE]}$`), g("COERCEPLAIN", `(^|[^\\d])(\\d{1,${r}})(?:\\.(\\d{1,${r}}))?(?:\\.(\\d{1,${r}}))?`), g("COERCE", `${c[l.COERCEPLAIN]}(?:$|[^\\d])`), g("COERCEFULL", c[l.COERCEPLAIN] + `(?:${c[l.PRERELEASE]})?(?:${c[l.BUILD]})?(?:$|[^\\d])`), g("COERCERTL", c[l.COERCE], !0), g("COERCERTLFULL", c[l.COERCEFULL], !0), g("LONETILDE", "(?:~>?)"), g("TILDETRIM", `(\\s*)${c[l.LONETILDE]}\\s+`, !0), t.tildeTrimReplace = "$1~", g("TILDE", `^${c[l.LONETILDE]}${c[l.XRANGEPLAIN]}$`), g("TILDELOOSE", `^${c[l.LONETILDE]}${c[l.XRANGEPLAINLOOSE]}$`), g("LONECARET", "(?:\\^)"), g("CARETTRIM", `(\\s*)${c[l.LONECARET]}\\s+`, !0), t.caretTrimReplace = "$1^", g("CARET", `^${c[l.LONECARET]}${c[l.XRANGEPLAIN]}$`), g("CARETLOOSE", `^${c[l.LONECARET]}${c[l.XRANGEPLAINLOOSE]}$`), g("COMPARATORLOOSE", `^${c[l.GTLT]}\\s*(${c[l.LOOSEPLAIN]})$|^$`), g("COMPARATOR", `^${c[l.GTLT]}\\s*(${c[l.FULLPLAIN]})$|^$`), g("COMPARATORTRIM", `(\\s*)${c[l.GTLT]}\\s*(${c[l.LOOSEPLAIN]}|${c[l.XRANGEPLAIN]})`, !0), t.comparatorTrimReplace = "$1$2$3", g("HYPHENRANGE", `^\\s*(${c[l.XRANGEPLAIN]})\\s+-\\s+(${c[l.XRANGEPLAIN]})\\s*$`), g("HYPHENRANGELOOSE", `^\\s*(${c[l.XRANGEPLAINLOOSE]})\\s+-\\s+(${c[l.XRANGEPLAINLOOSE]})\\s*$`), g("STAR", "(<|>)?=?\\s*\\*"), g("GTE0", "^\\s*>=\\s*0\\.0\\.0\\s*$"), g("GTE0PRE", "^\\s*>=\\s*0\\.0\\.0-0\\s*$");
})(pc, pc.exports);
var lo = pc.exports;
const kS = Object.freeze({ loose: !0 }), FS = Object.freeze({}), LS = (e) => e ? typeof e != "object" ? kS : e : FS;
var Zc = LS;
const Lf = /^[0-9]+$/, Lm = (e, t) => {
  const r = Lf.test(e), n = Lf.test(t);
  return r && n && (e = +e, t = +t), e === t ? 0 : r && !n ? -1 : n && !r ? 1 : e < t ? -1 : 1;
}, xS = (e, t) => Lm(t, e);
var xm = {
  compareIdentifiers: Lm,
  rcompareIdentifiers: xS
};
const No = xa, { MAX_LENGTH: xf, MAX_SAFE_INTEGER: Do } = La, { safeRe: Uf, safeSrc: jf, t: ko } = lo, US = Zc, { compareIdentifiers: mn } = xm;
let jS = class It {
  constructor(t, r) {
    if (r = US(r), t instanceof It) {
      if (t.loose === !!r.loose && t.includePrerelease === !!r.includePrerelease)
        return t;
      t = t.version;
    } else if (typeof t != "string")
      throw new TypeError(`Invalid version. Must be a string. Got type "${typeof t}".`);
    if (t.length > xf)
      throw new TypeError(
        `version is longer than ${xf} characters`
      );
    No("SemVer", t, r), this.options = r, this.loose = !!r.loose, this.includePrerelease = !!r.includePrerelease;
    const n = t.trim().match(r.loose ? Uf[ko.LOOSE] : Uf[ko.FULL]);
    if (!n)
      throw new TypeError(`Invalid Version: ${t}`);
    if (this.raw = t, this.major = +n[1], this.minor = +n[2], this.patch = +n[3], this.major > Do || this.major < 0)
      throw new TypeError("Invalid major version");
    if (this.minor > Do || this.minor < 0)
      throw new TypeError("Invalid minor version");
    if (this.patch > Do || this.patch < 0)
      throw new TypeError("Invalid patch version");
    n[4] ? this.prerelease = n[4].split(".").map((i) => {
      if (/^[0-9]+$/.test(i)) {
        const o = +i;
        if (o >= 0 && o < Do)
          return o;
      }
      return i;
    }) : this.prerelease = [], this.build = n[5] ? n[5].split(".") : [], this.format();
  }
  format() {
    return this.version = `${this.major}.${this.minor}.${this.patch}`, this.prerelease.length && (this.version += `-${this.prerelease.join(".")}`), this.version;
  }
  toString() {
    return this.version;
  }
  compare(t) {
    if (No("SemVer.compare", this.version, this.options, t), !(t instanceof It)) {
      if (typeof t == "string" && t === this.version)
        return 0;
      t = new It(t, this.options);
    }
    return t.version === this.version ? 0 : this.compareMain(t) || this.comparePre(t);
  }
  compareMain(t) {
    return t instanceof It || (t = new It(t, this.options)), mn(this.major, t.major) || mn(this.minor, t.minor) || mn(this.patch, t.patch);
  }
  comparePre(t) {
    if (t instanceof It || (t = new It(t, this.options)), this.prerelease.length && !t.prerelease.length)
      return -1;
    if (!this.prerelease.length && t.prerelease.length)
      return 1;
    if (!this.prerelease.length && !t.prerelease.length)
      return 0;
    let r = 0;
    do {
      const n = this.prerelease[r], i = t.prerelease[r];
      if (No("prerelease compare", r, n, i), n === void 0 && i === void 0)
        return 0;
      if (i === void 0)
        return 1;
      if (n === void 0)
        return -1;
      if (n === i)
        continue;
      return mn(n, i);
    } while (++r);
  }
  compareBuild(t) {
    t instanceof It || (t = new It(t, this.options));
    let r = 0;
    do {
      const n = this.build[r], i = t.build[r];
      if (No("build compare", r, n, i), n === void 0 && i === void 0)
        return 0;
      if (i === void 0)
        return 1;
      if (n === void 0)
        return -1;
      if (n === i)
        continue;
      return mn(n, i);
    } while (++r);
  }
  // preminor will bump the version up to the next minor release, and immediately
  // down to pre-release. premajor and prepatch work the same way.
  inc(t, r, n) {
    if (t.startsWith("pre")) {
      if (!r && n === !1)
        throw new Error("invalid increment argument: identifier is empty");
      if (r) {
        const i = new RegExp(`^${this.options.loose ? jf[ko.PRERELEASELOOSE] : jf[ko.PRERELEASE]}$`), o = `-${r}`.match(i);
        if (!o || o[1] !== r)
          throw new Error(`invalid identifier: ${r}`);
      }
    }
    switch (t) {
      case "premajor":
        this.prerelease.length = 0, this.patch = 0, this.minor = 0, this.major++, this.inc("pre", r, n);
        break;
      case "preminor":
        this.prerelease.length = 0, this.patch = 0, this.minor++, this.inc("pre", r, n);
        break;
      case "prepatch":
        this.prerelease.length = 0, this.inc("patch", r, n), this.inc("pre", r, n);
        break;
      case "prerelease":
        this.prerelease.length === 0 && this.inc("patch", r, n), this.inc("pre", r, n);
        break;
      case "release":
        if (this.prerelease.length === 0)
          throw new Error(`version ${this.raw} is not a prerelease`);
        this.prerelease.length = 0;
        break;
      case "major":
        (this.minor !== 0 || this.patch !== 0 || this.prerelease.length === 0) && this.major++, this.minor = 0, this.patch = 0, this.prerelease = [];
        break;
      case "minor":
        (this.patch !== 0 || this.prerelease.length === 0) && this.minor++, this.patch = 0, this.prerelease = [];
        break;
      case "patch":
        this.prerelease.length === 0 && this.patch++, this.prerelease = [];
        break;
      case "pre": {
        const i = Number(n) ? 1 : 0;
        if (this.prerelease.length === 0)
          this.prerelease = [i];
        else {
          let o = this.prerelease.length;
          for (; --o >= 0; )
            typeof this.prerelease[o] == "number" && (this.prerelease[o]++, o = -2);
          if (o === -1) {
            if (r === this.prerelease.join(".") && n === !1)
              throw new Error("invalid increment argument: identifier already exists");
            this.prerelease.push(i);
          }
        }
        if (r) {
          let o = [r, i];
          n === !1 && (o = [r]), mn(this.prerelease[0], r) === 0 ? isNaN(this.prerelease[1]) && (this.prerelease = o) : this.prerelease = o;
        }
        break;
      }
      default:
        throw new Error(`invalid increment argument: ${t}`);
    }
    return this.raw = this.format(), this.build.length && (this.raw += `+${this.build.join(".")}`), this;
  }
};
var it = jS;
const Mf = it, MS = (e, t, r = !1) => {
  if (e instanceof Mf)
    return e;
  try {
    return new Mf(e, t);
  } catch (n) {
    if (!r)
      return null;
    throw n;
  }
};
var zn = MS;
const qS = zn, HS = (e, t) => {
  const r = qS(e, t);
  return r ? r.version : null;
};
var BS = HS;
const GS = zn, VS = (e, t) => {
  const r = GS(e.trim().replace(/^[=v]+/, ""), t);
  return r ? r.version : null;
};
var zS = VS;
const qf = it, WS = (e, t, r, n, i) => {
  typeof r == "string" && (i = n, n = r, r = void 0);
  try {
    return new qf(
      e instanceof qf ? e.version : e,
      r
    ).inc(t, n, i).version;
  } catch {
    return null;
  }
};
var KS = WS;
const Hf = zn, YS = (e, t) => {
  const r = Hf(e, null, !0), n = Hf(t, null, !0), i = r.compare(n);
  if (i === 0)
    return null;
  const o = i > 0, a = o ? r : n, s = o ? n : r, c = !!a.prerelease.length;
  if (!!s.prerelease.length && !c) {
    if (!s.patch && !s.minor)
      return "major";
    if (s.compareMain(a) === 0)
      return s.minor && !s.patch ? "minor" : "patch";
  }
  const l = c ? "pre" : "";
  return r.major !== n.major ? l + "major" : r.minor !== n.minor ? l + "minor" : r.patch !== n.patch ? l + "patch" : "prerelease";
};
var XS = YS;
const JS = it, QS = (e, t) => new JS(e, t).major;
var ZS = QS;
const e1 = it, t1 = (e, t) => new e1(e, t).minor;
var r1 = t1;
const n1 = it, i1 = (e, t) => new n1(e, t).patch;
var o1 = i1;
const a1 = zn, s1 = (e, t) => {
  const r = a1(e, t);
  return r && r.prerelease.length ? r.prerelease : null;
};
var c1 = s1;
const Bf = it, l1 = (e, t, r) => new Bf(e, r).compare(new Bf(t, r));
var Ot = l1;
const u1 = Ot, f1 = (e, t, r) => u1(t, e, r);
var d1 = f1;
const h1 = Ot, p1 = (e, t) => h1(e, t, !0);
var m1 = p1;
const Gf = it, y1 = (e, t, r) => {
  const n = new Gf(e, r), i = new Gf(t, r);
  return n.compare(i) || n.compareBuild(i);
};
var el = y1;
const g1 = el, v1 = (e, t) => e.sort((r, n) => g1(r, n, t));
var $1 = v1;
const _1 = el, w1 = (e, t) => e.sort((r, n) => _1(n, r, t));
var E1 = w1;
const S1 = Ot, b1 = (e, t, r) => S1(e, t, r) > 0;
var Ua = b1;
const P1 = Ot, T1 = (e, t, r) => P1(e, t, r) < 0;
var tl = T1;
const A1 = Ot, O1 = (e, t, r) => A1(e, t, r) === 0;
var Um = O1;
const C1 = Ot, I1 = (e, t, r) => C1(e, t, r) !== 0;
var jm = I1;
const R1 = Ot, N1 = (e, t, r) => R1(e, t, r) >= 0;
var rl = N1;
const D1 = Ot, k1 = (e, t, r) => D1(e, t, r) <= 0;
var nl = k1;
const F1 = Um, L1 = jm, x1 = Ua, U1 = rl, j1 = tl, M1 = nl, q1 = (e, t, r, n) => {
  switch (t) {
    case "===":
      return typeof e == "object" && (e = e.version), typeof r == "object" && (r = r.version), e === r;
    case "!==":
      return typeof e == "object" && (e = e.version), typeof r == "object" && (r = r.version), e !== r;
    case "":
    case "=":
    case "==":
      return F1(e, r, n);
    case "!=":
      return L1(e, r, n);
    case ">":
      return x1(e, r, n);
    case ">=":
      return U1(e, r, n);
    case "<":
      return j1(e, r, n);
    case "<=":
      return M1(e, r, n);
    default:
      throw new TypeError(`Invalid operator: ${t}`);
  }
};
var Mm = q1;
const H1 = it, B1 = zn, { safeRe: Fo, t: Lo } = lo, G1 = (e, t) => {
  if (e instanceof H1)
    return e;
  if (typeof e == "number" && (e = String(e)), typeof e != "string")
    return null;
  t = t || {};
  let r = null;
  if (!t.rtl)
    r = e.match(t.includePrerelease ? Fo[Lo.COERCEFULL] : Fo[Lo.COERCE]);
  else {
    const c = t.includePrerelease ? Fo[Lo.COERCERTLFULL] : Fo[Lo.COERCERTL];
    let f;
    for (; (f = c.exec(e)) && (!r || r.index + r[0].length !== e.length); )
      (!r || f.index + f[0].length !== r.index + r[0].length) && (r = f), c.lastIndex = f.index + f[1].length + f[2].length;
    c.lastIndex = -1;
  }
  if (r === null)
    return null;
  const n = r[2], i = r[3] || "0", o = r[4] || "0", a = t.includePrerelease && r[5] ? `-${r[5]}` : "", s = t.includePrerelease && r[6] ? `+${r[6]}` : "";
  return B1(`${n}.${i}.${o}${a}${s}`, t);
};
var V1 = G1;
class z1 {
  constructor() {
    this.max = 1e3, this.map = /* @__PURE__ */ new Map();
  }
  get(t) {
    const r = this.map.get(t);
    if (r !== void 0)
      return this.map.delete(t), this.map.set(t, r), r;
  }
  delete(t) {
    return this.map.delete(t);
  }
  set(t, r) {
    if (!this.delete(t) && r !== void 0) {
      if (this.map.size >= this.max) {
        const i = this.map.keys().next().value;
        this.delete(i);
      }
      this.map.set(t, r);
    }
    return this;
  }
}
var W1 = z1, Cs, Vf;
function Ct() {
  if (Vf) return Cs;
  Vf = 1;
  const e = /\s+/g;
  class t {
    constructor(F, G) {
      if (G = i(G), F instanceof t)
        return F.loose === !!G.loose && F.includePrerelease === !!G.includePrerelease ? F : new t(F.raw, G);
      if (F instanceof o)
        return this.raw = F.value, this.set = [[F]], this.formatted = void 0, this;
      if (this.options = G, this.loose = !!G.loose, this.includePrerelease = !!G.includePrerelease, this.raw = F.trim().replace(e, " "), this.set = this.raw.split("||").map((x) => this.parseRange(x.trim())).filter((x) => x.length), !this.set.length)
        throw new TypeError(`Invalid SemVer Range: ${this.raw}`);
      if (this.set.length > 1) {
        const x = this.set[0];
        if (this.set = this.set.filter((W) => !g(W[0])), this.set.length === 0)
          this.set = [x];
        else if (this.set.length > 1) {
          for (const W of this.set)
            if (W.length === 1 && $(W[0])) {
              this.set = [W];
              break;
            }
        }
      }
      this.formatted = void 0;
    }
    get range() {
      if (this.formatted === void 0) {
        this.formatted = "";
        for (let F = 0; F < this.set.length; F++) {
          F > 0 && (this.formatted += "||");
          const G = this.set[F];
          for (let x = 0; x < G.length; x++)
            x > 0 && (this.formatted += " "), this.formatted += G[x].toString().trim();
        }
      }
      return this.formatted;
    }
    format() {
      return this.range;
    }
    toString() {
      return this.range;
    }
    parseRange(F) {
      const x = ((this.options.includePrerelease && h) | (this.options.loose && y)) + ":" + F, W = n.get(x);
      if (W)
        return W;
      const V = this.options.loose, U = V ? c[f.HYPHENRANGELOOSE] : c[f.HYPHENRANGE];
      F = F.replace(U, z(this.options.includePrerelease)), a("hyphen replace", F), F = F.replace(c[f.COMPARATORTRIM], l), a("comparator trim", F), F = F.replace(c[f.TILDETRIM], u), a("tilde trim", F), F = F.replace(c[f.CARETTRIM], d), a("caret trim", F);
      let T = F.split(" ").map((b) => S(b, this.options)).join(" ").split(/\s+/).map((b) => q(b, this.options));
      V && (T = T.filter((b) => (a("loose invalid filter", b, this.options), !!b.match(c[f.COMPARATORLOOSE])))), a("range list", T);
      const N = /* @__PURE__ */ new Map(), A = T.map((b) => new o(b, this.options));
      for (const b of A) {
        if (g(b))
          return [b];
        N.set(b.value, b);
      }
      N.size > 1 && N.has("") && N.delete("");
      const _ = [...N.values()];
      return n.set(x, _), _;
    }
    intersects(F, G) {
      if (!(F instanceof t))
        throw new TypeError("a Range is required");
      return this.set.some((x) => v(x, G) && F.set.some((W) => v(W, G) && x.every((V) => W.every((U) => V.intersects(U, G)))));
    }
    // if ANY of the sets match ALL of its comparators, then pass
    test(F) {
      if (!F)
        return !1;
      if (typeof F == "string")
        try {
          F = new s(F, this.options);
        } catch {
          return !1;
        }
      for (let G = 0; G < this.set.length; G++)
        if (X(this.set[G], F, this.options))
          return !0;
      return !1;
    }
  }
  Cs = t;
  const r = W1, n = new r(), i = Zc, o = ja(), a = xa, s = it, {
    safeRe: c,
    t: f,
    comparatorTrimReplace: l,
    tildeTrimReplace: u,
    caretTrimReplace: d
  } = lo, { FLAG_INCLUDE_PRERELEASE: h, FLAG_LOOSE: y } = La, g = (k) => k.value === "<0.0.0-0", $ = (k) => k.value === "", v = (k, F) => {
    let G = !0;
    const x = k.slice();
    let W = x.pop();
    for (; G && x.length; )
      G = x.every((V) => W.intersects(V, F)), W = x.pop();
    return G;
  }, S = (k, F) => (a("comp", k, F), k = I(k, F), a("caret", k), k = R(k, F), a("tildes", k), k = B(k, F), a("xrange", k), k = K(k, F), a("stars", k), k), C = (k) => !k || k.toLowerCase() === "x" || k === "*", R = (k, F) => k.trim().split(/\s+/).map((G) => M(G, F)).join(" "), M = (k, F) => {
    const G = F.loose ? c[f.TILDELOOSE] : c[f.TILDE];
    return k.replace(G, (x, W, V, U, T) => {
      a("tilde", k, x, W, V, U, T);
      let N;
      return C(W) ? N = "" : C(V) ? N = `>=${W}.0.0 <${+W + 1}.0.0-0` : C(U) ? N = `>=${W}.${V}.0 <${W}.${+V + 1}.0-0` : T ? (a("replaceTilde pr", T), N = `>=${W}.${V}.${U}-${T} <${W}.${+V + 1}.0-0`) : N = `>=${W}.${V}.${U} <${W}.${+V + 1}.0-0`, a("tilde return", N), N;
    });
  }, I = (k, F) => k.trim().split(/\s+/).map((G) => L(G, F)).join(" "), L = (k, F) => {
    a("caret", k, F);
    const G = F.loose ? c[f.CARETLOOSE] : c[f.CARET], x = F.includePrerelease ? "-0" : "";
    return k.replace(G, (W, V, U, T, N) => {
      a("caret", k, W, V, U, T, N);
      let A;
      return C(V) ? A = "" : C(U) ? A = `>=${V}.0.0${x} <${+V + 1}.0.0-0` : C(T) ? V === "0" ? A = `>=${V}.${U}.0${x} <${V}.${+U + 1}.0-0` : A = `>=${V}.${U}.0${x} <${+V + 1}.0.0-0` : N ? (a("replaceCaret pr", N), V === "0" ? U === "0" ? A = `>=${V}.${U}.${T}-${N} <${V}.${U}.${+T + 1}-0` : A = `>=${V}.${U}.${T}-${N} <${V}.${+U + 1}.0-0` : A = `>=${V}.${U}.${T}-${N} <${+V + 1}.0.0-0`) : (a("no pr"), V === "0" ? U === "0" ? A = `>=${V}.${U}.${T}${x} <${V}.${U}.${+T + 1}-0` : A = `>=${V}.${U}.${T}${x} <${V}.${+U + 1}.0-0` : A = `>=${V}.${U}.${T} <${+V + 1}.0.0-0`), a("caret return", A), A;
    });
  }, B = (k, F) => (a("replaceXRanges", k, F), k.split(/\s+/).map((G) => w(G, F)).join(" ")), w = (k, F) => {
    k = k.trim();
    const G = F.loose ? c[f.XRANGELOOSE] : c[f.XRANGE];
    return k.replace(G, (x, W, V, U, T, N) => {
      a("xRange", k, x, W, V, U, T, N);
      const A = C(V), _ = A || C(U), b = _ || C(T), j = b;
      return W === "=" && j && (W = ""), N = F.includePrerelease ? "-0" : "", A ? W === ">" || W === "<" ? x = "<0.0.0-0" : x = "*" : W && j ? (_ && (U = 0), T = 0, W === ">" ? (W = ">=", _ ? (V = +V + 1, U = 0, T = 0) : (U = +U + 1, T = 0)) : W === "<=" && (W = "<", _ ? V = +V + 1 : U = +U + 1), W === "<" && (N = "-0"), x = `${W + V}.${U}.${T}${N}`) : _ ? x = `>=${V}.0.0${N} <${+V + 1}.0.0-0` : b && (x = `>=${V}.${U}.0${N} <${V}.${+U + 1}.0-0`), a("xRange return", x), x;
    });
  }, K = (k, F) => (a("replaceStars", k, F), k.trim().replace(c[f.STAR], "")), q = (k, F) => (a("replaceGTE0", k, F), k.trim().replace(c[F.includePrerelease ? f.GTE0PRE : f.GTE0], "")), z = (k) => (F, G, x, W, V, U, T, N, A, _, b, j) => (C(x) ? G = "" : C(W) ? G = `>=${x}.0.0${k ? "-0" : ""}` : C(V) ? G = `>=${x}.${W}.0${k ? "-0" : ""}` : U ? G = `>=${G}` : G = `>=${G}${k ? "-0" : ""}`, C(A) ? N = "" : C(_) ? N = `<${+A + 1}.0.0-0` : C(b) ? N = `<${A}.${+_ + 1}.0-0` : j ? N = `<=${A}.${_}.${b}-${j}` : k ? N = `<${A}.${_}.${+b + 1}-0` : N = `<=${N}`, `${G} ${N}`.trim()), X = (k, F, G) => {
    for (let x = 0; x < k.length; x++)
      if (!k[x].test(F))
        return !1;
    if (F.prerelease.length && !G.includePrerelease) {
      for (let x = 0; x < k.length; x++)
        if (a(k[x].semver), k[x].semver !== o.ANY && k[x].semver.prerelease.length > 0) {
          const W = k[x].semver;
          if (W.major === F.major && W.minor === F.minor && W.patch === F.patch)
            return !0;
        }
      return !1;
    }
    return !0;
  };
  return Cs;
}
var Is, zf;
function ja() {
  if (zf) return Is;
  zf = 1;
  const e = Symbol("SemVer ANY");
  class t {
    static get ANY() {
      return e;
    }
    constructor(l, u) {
      if (u = r(u), l instanceof t) {
        if (l.loose === !!u.loose)
          return l;
        l = l.value;
      }
      l = l.trim().split(/\s+/).join(" "), a("comparator", l, u), this.options = u, this.loose = !!u.loose, this.parse(l), this.semver === e ? this.value = "" : this.value = this.operator + this.semver.version, a("comp", this);
    }
    parse(l) {
      const u = this.options.loose ? n[i.COMPARATORLOOSE] : n[i.COMPARATOR], d = l.match(u);
      if (!d)
        throw new TypeError(`Invalid comparator: ${l}`);
      this.operator = d[1] !== void 0 ? d[1] : "", this.operator === "=" && (this.operator = ""), d[2] ? this.semver = new s(d[2], this.options.loose) : this.semver = e;
    }
    toString() {
      return this.value;
    }
    test(l) {
      if (a("Comparator.test", l, this.options.loose), this.semver === e || l === e)
        return !0;
      if (typeof l == "string")
        try {
          l = new s(l, this.options);
        } catch {
          return !1;
        }
      return o(l, this.operator, this.semver, this.options);
    }
    intersects(l, u) {
      if (!(l instanceof t))
        throw new TypeError("a Comparator is required");
      return this.operator === "" ? this.value === "" ? !0 : new c(l.value, u).test(this.value) : l.operator === "" ? l.value === "" ? !0 : new c(this.value, u).test(l.semver) : (u = r(u), u.includePrerelease && (this.value === "<0.0.0-0" || l.value === "<0.0.0-0") || !u.includePrerelease && (this.value.startsWith("<0.0.0") || l.value.startsWith("<0.0.0")) ? !1 : !!(this.operator.startsWith(">") && l.operator.startsWith(">") || this.operator.startsWith("<") && l.operator.startsWith("<") || this.semver.version === l.semver.version && this.operator.includes("=") && l.operator.includes("=") || o(this.semver, "<", l.semver, u) && this.operator.startsWith(">") && l.operator.startsWith("<") || o(this.semver, ">", l.semver, u) && this.operator.startsWith("<") && l.operator.startsWith(">")));
    }
  }
  Is = t;
  const r = Zc, { safeRe: n, t: i } = lo, o = Mm, a = xa, s = it, c = Ct();
  return Is;
}
const K1 = Ct(), Y1 = (e, t, r) => {
  try {
    t = new K1(t, r);
  } catch {
    return !1;
  }
  return t.test(e);
};
var Ma = Y1;
const X1 = Ct(), J1 = (e, t) => new X1(e, t).set.map((r) => r.map((n) => n.value).join(" ").trim().split(" "));
var Q1 = J1;
const Z1 = it, eb = Ct(), tb = (e, t, r) => {
  let n = null, i = null, o = null;
  try {
    o = new eb(t, r);
  } catch {
    return null;
  }
  return e.forEach((a) => {
    o.test(a) && (!n || i.compare(a) === -1) && (n = a, i = new Z1(n, r));
  }), n;
};
var rb = tb;
const nb = it, ib = Ct(), ob = (e, t, r) => {
  let n = null, i = null, o = null;
  try {
    o = new ib(t, r);
  } catch {
    return null;
  }
  return e.forEach((a) => {
    o.test(a) && (!n || i.compare(a) === 1) && (n = a, i = new nb(n, r));
  }), n;
};
var ab = ob;
const Rs = it, sb = Ct(), Wf = Ua, cb = (e, t) => {
  e = new sb(e, t);
  let r = new Rs("0.0.0");
  if (e.test(r) || (r = new Rs("0.0.0-0"), e.test(r)))
    return r;
  r = null;
  for (let n = 0; n < e.set.length; ++n) {
    const i = e.set[n];
    let o = null;
    i.forEach((a) => {
      const s = new Rs(a.semver.version);
      switch (a.operator) {
        case ">":
          s.prerelease.length === 0 ? s.patch++ : s.prerelease.push(0), s.raw = s.format();
        case "":
        case ">=":
          (!o || Wf(s, o)) && (o = s);
          break;
        case "<":
        case "<=":
          break;
        default:
          throw new Error(`Unexpected operation: ${a.operator}`);
      }
    }), o && (!r || Wf(r, o)) && (r = o);
  }
  return r && e.test(r) ? r : null;
};
var lb = cb;
const ub = Ct(), fb = (e, t) => {
  try {
    return new ub(e, t).range || "*";
  } catch {
    return null;
  }
};
var db = fb;
const hb = it, qm = ja(), { ANY: pb } = qm, mb = Ct(), yb = Ma, Kf = Ua, Yf = tl, gb = nl, vb = rl, $b = (e, t, r, n) => {
  e = new hb(e, n), t = new mb(t, n);
  let i, o, a, s, c;
  switch (r) {
    case ">":
      i = Kf, o = gb, a = Yf, s = ">", c = ">=";
      break;
    case "<":
      i = Yf, o = vb, a = Kf, s = "<", c = "<=";
      break;
    default:
      throw new TypeError('Must provide a hilo val of "<" or ">"');
  }
  if (yb(e, t, n))
    return !1;
  for (let f = 0; f < t.set.length; ++f) {
    const l = t.set[f];
    let u = null, d = null;
    if (l.forEach((h) => {
      h.semver === pb && (h = new qm(">=0.0.0")), u = u || h, d = d || h, i(h.semver, u.semver, n) ? u = h : a(h.semver, d.semver, n) && (d = h);
    }), u.operator === s || u.operator === c || (!d.operator || d.operator === s) && o(e, d.semver))
      return !1;
    if (d.operator === c && a(e, d.semver))
      return !1;
  }
  return !0;
};
var il = $b;
const _b = il, wb = (e, t, r) => _b(e, t, ">", r);
var Eb = wb;
const Sb = il, bb = (e, t, r) => Sb(e, t, "<", r);
var Pb = bb;
const Xf = Ct(), Tb = (e, t, r) => (e = new Xf(e, r), t = new Xf(t, r), e.intersects(t, r));
var Ab = Tb;
const Ob = Ma, Cb = Ot;
var Ib = (e, t, r) => {
  const n = [];
  let i = null, o = null;
  const a = e.sort((l, u) => Cb(l, u, r));
  for (const l of a)
    Ob(l, t, r) ? (o = l, i || (i = l)) : (o && n.push([i, o]), o = null, i = null);
  i && n.push([i, null]);
  const s = [];
  for (const [l, u] of n)
    l === u ? s.push(l) : !u && l === a[0] ? s.push("*") : u ? l === a[0] ? s.push(`<=${u}`) : s.push(`${l} - ${u}`) : s.push(`>=${l}`);
  const c = s.join(" || "), f = typeof t.raw == "string" ? t.raw : String(t);
  return c.length < f.length ? c : t;
};
const Jf = Ct(), ol = ja(), { ANY: Ns } = ol, yi = Ma, al = Ot, Rb = (e, t, r = {}) => {
  if (e === t)
    return !0;
  e = new Jf(e, r), t = new Jf(t, r);
  let n = !1;
  e: for (const i of e.set) {
    for (const o of t.set) {
      const a = Db(i, o, r);
      if (n = n || a !== null, a)
        continue e;
    }
    if (n)
      return !1;
  }
  return !0;
}, Nb = [new ol(">=0.0.0-0")], Qf = [new ol(">=0.0.0")], Db = (e, t, r) => {
  if (e === t)
    return !0;
  if (e.length === 1 && e[0].semver === Ns) {
    if (t.length === 1 && t[0].semver === Ns)
      return !0;
    r.includePrerelease ? e = Nb : e = Qf;
  }
  if (t.length === 1 && t[0].semver === Ns) {
    if (r.includePrerelease)
      return !0;
    t = Qf;
  }
  const n = /* @__PURE__ */ new Set();
  let i, o;
  for (const h of e)
    h.operator === ">" || h.operator === ">=" ? i = Zf(i, h, r) : h.operator === "<" || h.operator === "<=" ? o = ed(o, h, r) : n.add(h.semver);
  if (n.size > 1)
    return null;
  let a;
  if (i && o) {
    if (a = al(i.semver, o.semver, r), a > 0)
      return null;
    if (a === 0 && (i.operator !== ">=" || o.operator !== "<="))
      return null;
  }
  for (const h of n) {
    if (i && !yi(h, String(i), r) || o && !yi(h, String(o), r))
      return null;
    for (const y of t)
      if (!yi(h, String(y), r))
        return !1;
    return !0;
  }
  let s, c, f, l, u = o && !r.includePrerelease && o.semver.prerelease.length ? o.semver : !1, d = i && !r.includePrerelease && i.semver.prerelease.length ? i.semver : !1;
  u && u.prerelease.length === 1 && o.operator === "<" && u.prerelease[0] === 0 && (u = !1);
  for (const h of t) {
    if (l = l || h.operator === ">" || h.operator === ">=", f = f || h.operator === "<" || h.operator === "<=", i) {
      if (d && h.semver.prerelease && h.semver.prerelease.length && h.semver.major === d.major && h.semver.minor === d.minor && h.semver.patch === d.patch && (d = !1), h.operator === ">" || h.operator === ">=") {
        if (s = Zf(i, h, r), s === h && s !== i)
          return !1;
      } else if (i.operator === ">=" && !yi(i.semver, String(h), r))
        return !1;
    }
    if (o) {
      if (u && h.semver.prerelease && h.semver.prerelease.length && h.semver.major === u.major && h.semver.minor === u.minor && h.semver.patch === u.patch && (u = !1), h.operator === "<" || h.operator === "<=") {
        if (c = ed(o, h, r), c === h && c !== o)
          return !1;
      } else if (o.operator === "<=" && !yi(o.semver, String(h), r))
        return !1;
    }
    if (!h.operator && (o || i) && a !== 0)
      return !1;
  }
  return !(i && f && !o && a !== 0 || o && l && !i && a !== 0 || d || u);
}, Zf = (e, t, r) => {
  if (!e)
    return t;
  const n = al(e.semver, t.semver, r);
  return n > 0 ? e : n < 0 || t.operator === ">" && e.operator === ">=" ? t : e;
}, ed = (e, t, r) => {
  if (!e)
    return t;
  const n = al(e.semver, t.semver, r);
  return n < 0 ? e : n > 0 || t.operator === "<" && e.operator === "<=" ? t : e;
};
var kb = Rb;
const Ds = lo, td = La, Fb = it, rd = xm, Lb = zn, xb = BS, Ub = zS, jb = KS, Mb = XS, qb = ZS, Hb = r1, Bb = o1, Gb = c1, Vb = Ot, zb = d1, Wb = m1, Kb = el, Yb = $1, Xb = E1, Jb = Ua, Qb = tl, Zb = Um, eP = jm, tP = rl, rP = nl, nP = Mm, iP = V1, oP = ja(), aP = Ct(), sP = Ma, cP = Q1, lP = rb, uP = ab, fP = lb, dP = db, hP = il, pP = Eb, mP = Pb, yP = Ab, gP = Ib, vP = kb;
var sl = {
  parse: Lb,
  valid: xb,
  clean: Ub,
  inc: jb,
  diff: Mb,
  major: qb,
  minor: Hb,
  patch: Bb,
  prerelease: Gb,
  compare: Vb,
  rcompare: zb,
  compareLoose: Wb,
  compareBuild: Kb,
  sort: Yb,
  rsort: Xb,
  gt: Jb,
  lt: Qb,
  eq: Zb,
  neq: eP,
  gte: tP,
  lte: rP,
  cmp: nP,
  coerce: iP,
  Comparator: oP,
  Range: aP,
  satisfies: sP,
  toComparators: cP,
  maxSatisfying: lP,
  minSatisfying: uP,
  minVersion: fP,
  validRange: dP,
  outside: hP,
  gtr: pP,
  ltr: mP,
  intersects: yP,
  simplifyRange: gP,
  subset: vP,
  SemVer: Fb,
  re: Ds.re,
  src: Ds.src,
  tokens: Ds.t,
  SEMVER_SPEC_VERSION: td.SEMVER_SPEC_VERSION,
  RELEASE_TYPES: td.RELEASE_TYPES,
  compareIdentifiers: rd.compareIdentifiers,
  rcompareIdentifiers: rd.rcompareIdentifiers
};
const yn = /* @__PURE__ */ Ta(sl);
var uo = {}, ya = { exports: {} };
ya.exports;
(function(e, t) {
  var r = 200, n = "__lodash_hash_undefined__", i = 1, o = 2, a = 9007199254740991, s = "[object Arguments]", c = "[object Array]", f = "[object AsyncFunction]", l = "[object Boolean]", u = "[object Date]", d = "[object Error]", h = "[object Function]", y = "[object GeneratorFunction]", g = "[object Map]", $ = "[object Number]", v = "[object Null]", S = "[object Object]", C = "[object Promise]", R = "[object Proxy]", M = "[object RegExp]", I = "[object Set]", L = "[object String]", B = "[object Symbol]", w = "[object Undefined]", K = "[object WeakMap]", q = "[object ArrayBuffer]", z = "[object DataView]", X = "[object Float32Array]", k = "[object Float64Array]", F = "[object Int8Array]", G = "[object Int16Array]", x = "[object Int32Array]", W = "[object Uint8Array]", V = "[object Uint8ClampedArray]", U = "[object Uint16Array]", T = "[object Uint32Array]", N = /[\\^$.*+?()[\]{}|]/g, A = /^\[object .+?Constructor\]$/, _ = /^(?:0|[1-9]\d*)$/, b = {};
  b[X] = b[k] = b[F] = b[G] = b[x] = b[W] = b[V] = b[U] = b[T] = !0, b[s] = b[c] = b[q] = b[l] = b[z] = b[u] = b[d] = b[h] = b[g] = b[$] = b[S] = b[M] = b[I] = b[L] = b[K] = !1;
  var j = typeof Tt == "object" && Tt && Tt.Object === Object && Tt, m = typeof self == "object" && self && self.Object === Object && self, p = j || m || Function("return this")(), D = t && !t.nodeType && t, P = D && !0 && e && !e.nodeType && e, ee = P && P.exports === D, de = ee && j.process, me = function() {
    try {
      return de && de.binding && de.binding("util");
    } catch {
    }
  }(), Pe = me && me.isTypedArray;
  function Ae(E, O) {
    for (var H = -1, J = E == null ? 0 : E.length, ye = 0, ne = []; ++H < J; ) {
      var Se = E[H];
      O(Se, H, E) && (ne[ye++] = Se);
    }
    return ne;
  }
  function pt(E, O) {
    for (var H = -1, J = O.length, ye = E.length; ++H < J; )
      E[ye + H] = O[H];
    return E;
  }
  function _e(E, O) {
    for (var H = -1, J = E == null ? 0 : E.length; ++H < J; )
      if (O(E[H], H, E))
        return !0;
    return !1;
  }
  function Xe(E, O) {
    for (var H = -1, J = Array(E); ++H < E; )
      J[H] = O(H);
    return J;
  }
  function Lr(E) {
    return function(O) {
      return E(O);
    };
  }
  function er(E, O) {
    return E.has(O);
  }
  function Mt(E, O) {
    return E == null ? void 0 : E[O];
  }
  function tr(E) {
    var O = -1, H = Array(E.size);
    return E.forEach(function(J, ye) {
      H[++O] = [ye, J];
    }), H;
  }
  function ti(E, O) {
    return function(H) {
      return E(O(H));
    };
  }
  function ri(E) {
    var O = -1, H = Array(E.size);
    return E.forEach(function(J) {
      H[++O] = J;
    }), H;
  }
  var ni = Array.prototype, xr = Function.prototype, rr = Object.prototype, fn = p["__core-js_shared__"], ii = xr.toString, mt = rr.hasOwnProperty, wu = function() {
    var E = /[^.]+$/.exec(fn && fn.keys && fn.keys.IE_PROTO || "");
    return E ? "Symbol(src)_1." + E : "";
  }(), Eu = rr.toString, Yg = RegExp(
    "^" + ii.call(mt).replace(N, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
  ), Su = ee ? p.Buffer : void 0, $o = p.Symbol, bu = p.Uint8Array, Pu = rr.propertyIsEnumerable, Xg = ni.splice, Ur = $o ? $o.toStringTag : void 0, Tu = Object.getOwnPropertySymbols, Jg = Su ? Su.isBuffer : void 0, Qg = ti(Object.keys, Object), us = dn(p, "DataView"), oi = dn(p, "Map"), fs = dn(p, "Promise"), ds = dn(p, "Set"), hs = dn(p, "WeakMap"), ai = dn(Object, "create"), Zg = qr(us), e0 = qr(oi), t0 = qr(fs), r0 = qr(ds), n0 = qr(hs), Au = $o ? $o.prototype : void 0, ps = Au ? Au.valueOf : void 0;
  function jr(E) {
    var O = -1, H = E == null ? 0 : E.length;
    for (this.clear(); ++O < H; ) {
      var J = E[O];
      this.set(J[0], J[1]);
    }
  }
  function i0() {
    this.__data__ = ai ? ai(null) : {}, this.size = 0;
  }
  function o0(E) {
    var O = this.has(E) && delete this.__data__[E];
    return this.size -= O ? 1 : 0, O;
  }
  function a0(E) {
    var O = this.__data__;
    if (ai) {
      var H = O[E];
      return H === n ? void 0 : H;
    }
    return mt.call(O, E) ? O[E] : void 0;
  }
  function s0(E) {
    var O = this.__data__;
    return ai ? O[E] !== void 0 : mt.call(O, E);
  }
  function c0(E, O) {
    var H = this.__data__;
    return this.size += this.has(E) ? 0 : 1, H[E] = ai && O === void 0 ? n : O, this;
  }
  jr.prototype.clear = i0, jr.prototype.delete = o0, jr.prototype.get = a0, jr.prototype.has = s0, jr.prototype.set = c0;
  function qt(E) {
    var O = -1, H = E == null ? 0 : E.length;
    for (this.clear(); ++O < H; ) {
      var J = E[O];
      this.set(J[0], J[1]);
    }
  }
  function l0() {
    this.__data__ = [], this.size = 0;
  }
  function u0(E) {
    var O = this.__data__, H = wo(O, E);
    if (H < 0)
      return !1;
    var J = O.length - 1;
    return H == J ? O.pop() : Xg.call(O, H, 1), --this.size, !0;
  }
  function f0(E) {
    var O = this.__data__, H = wo(O, E);
    return H < 0 ? void 0 : O[H][1];
  }
  function d0(E) {
    return wo(this.__data__, E) > -1;
  }
  function h0(E, O) {
    var H = this.__data__, J = wo(H, E);
    return J < 0 ? (++this.size, H.push([E, O])) : H[J][1] = O, this;
  }
  qt.prototype.clear = l0, qt.prototype.delete = u0, qt.prototype.get = f0, qt.prototype.has = d0, qt.prototype.set = h0;
  function Mr(E) {
    var O = -1, H = E == null ? 0 : E.length;
    for (this.clear(); ++O < H; ) {
      var J = E[O];
      this.set(J[0], J[1]);
    }
  }
  function p0() {
    this.size = 0, this.__data__ = {
      hash: new jr(),
      map: new (oi || qt)(),
      string: new jr()
    };
  }
  function m0(E) {
    var O = Eo(this, E).delete(E);
    return this.size -= O ? 1 : 0, O;
  }
  function y0(E) {
    return Eo(this, E).get(E);
  }
  function g0(E) {
    return Eo(this, E).has(E);
  }
  function v0(E, O) {
    var H = Eo(this, E), J = H.size;
    return H.set(E, O), this.size += H.size == J ? 0 : 1, this;
  }
  Mr.prototype.clear = p0, Mr.prototype.delete = m0, Mr.prototype.get = y0, Mr.prototype.has = g0, Mr.prototype.set = v0;
  function _o(E) {
    var O = -1, H = E == null ? 0 : E.length;
    for (this.__data__ = new Mr(); ++O < H; )
      this.add(E[O]);
  }
  function $0(E) {
    return this.__data__.set(E, n), this;
  }
  function _0(E) {
    return this.__data__.has(E);
  }
  _o.prototype.add = _o.prototype.push = $0, _o.prototype.has = _0;
  function nr(E) {
    var O = this.__data__ = new qt(E);
    this.size = O.size;
  }
  function w0() {
    this.__data__ = new qt(), this.size = 0;
  }
  function E0(E) {
    var O = this.__data__, H = O.delete(E);
    return this.size = O.size, H;
  }
  function S0(E) {
    return this.__data__.get(E);
  }
  function b0(E) {
    return this.__data__.has(E);
  }
  function P0(E, O) {
    var H = this.__data__;
    if (H instanceof qt) {
      var J = H.__data__;
      if (!oi || J.length < r - 1)
        return J.push([E, O]), this.size = ++H.size, this;
      H = this.__data__ = new Mr(J);
    }
    return H.set(E, O), this.size = H.size, this;
  }
  nr.prototype.clear = w0, nr.prototype.delete = E0, nr.prototype.get = S0, nr.prototype.has = b0, nr.prototype.set = P0;
  function T0(E, O) {
    var H = So(E), J = !H && q0(E), ye = !H && !J && ms(E), ne = !H && !J && !ye && Lu(E), Se = H || J || ye || ne, Ne = Se ? Xe(E.length, String) : [], xe = Ne.length;
    for (var we in E)
      mt.call(E, we) && !(Se && // Safari 9 has enumerable `arguments.length` in strict mode.
      (we == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
      ye && (we == "offset" || we == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
      ne && (we == "buffer" || we == "byteLength" || we == "byteOffset") || // Skip index properties.
      L0(we, xe))) && Ne.push(we);
    return Ne;
  }
  function wo(E, O) {
    for (var H = E.length; H--; )
      if (Nu(E[H][0], O))
        return H;
    return -1;
  }
  function A0(E, O, H) {
    var J = O(E);
    return So(E) ? J : pt(J, H(E));
  }
  function si(E) {
    return E == null ? E === void 0 ? w : v : Ur && Ur in Object(E) ? k0(E) : M0(E);
  }
  function Ou(E) {
    return ci(E) && si(E) == s;
  }
  function Cu(E, O, H, J, ye) {
    return E === O ? !0 : E == null || O == null || !ci(E) && !ci(O) ? E !== E && O !== O : O0(E, O, H, J, Cu, ye);
  }
  function O0(E, O, H, J, ye, ne) {
    var Se = So(E), Ne = So(O), xe = Se ? c : ir(E), we = Ne ? c : ir(O);
    xe = xe == s ? S : xe, we = we == s ? S : we;
    var lt = xe == S, wt = we == S, He = xe == we;
    if (He && ms(E)) {
      if (!ms(O))
        return !1;
      Se = !0, lt = !1;
    }
    if (He && !lt)
      return ne || (ne = new nr()), Se || Lu(E) ? Iu(E, O, H, J, ye, ne) : N0(E, O, xe, H, J, ye, ne);
    if (!(H & i)) {
      var yt = lt && mt.call(E, "__wrapped__"), gt = wt && mt.call(O, "__wrapped__");
      if (yt || gt) {
        var or = yt ? E.value() : E, Ht = gt ? O.value() : O;
        return ne || (ne = new nr()), ye(or, Ht, H, J, ne);
      }
    }
    return He ? (ne || (ne = new nr()), D0(E, O, H, J, ye, ne)) : !1;
  }
  function C0(E) {
    if (!Fu(E) || U0(E))
      return !1;
    var O = Du(E) ? Yg : A;
    return O.test(qr(E));
  }
  function I0(E) {
    return ci(E) && ku(E.length) && !!b[si(E)];
  }
  function R0(E) {
    if (!j0(E))
      return Qg(E);
    var O = [];
    for (var H in Object(E))
      mt.call(E, H) && H != "constructor" && O.push(H);
    return O;
  }
  function Iu(E, O, H, J, ye, ne) {
    var Se = H & i, Ne = E.length, xe = O.length;
    if (Ne != xe && !(Se && xe > Ne))
      return !1;
    var we = ne.get(E);
    if (we && ne.get(O))
      return we == O;
    var lt = -1, wt = !0, He = H & o ? new _o() : void 0;
    for (ne.set(E, O), ne.set(O, E); ++lt < Ne; ) {
      var yt = E[lt], gt = O[lt];
      if (J)
        var or = Se ? J(gt, yt, lt, O, E, ne) : J(yt, gt, lt, E, O, ne);
      if (or !== void 0) {
        if (or)
          continue;
        wt = !1;
        break;
      }
      if (He) {
        if (!_e(O, function(Ht, Hr) {
          if (!er(He, Hr) && (yt === Ht || ye(yt, Ht, H, J, ne)))
            return He.push(Hr);
        })) {
          wt = !1;
          break;
        }
      } else if (!(yt === gt || ye(yt, gt, H, J, ne))) {
        wt = !1;
        break;
      }
    }
    return ne.delete(E), ne.delete(O), wt;
  }
  function N0(E, O, H, J, ye, ne, Se) {
    switch (H) {
      case z:
        if (E.byteLength != O.byteLength || E.byteOffset != O.byteOffset)
          return !1;
        E = E.buffer, O = O.buffer;
      case q:
        return !(E.byteLength != O.byteLength || !ne(new bu(E), new bu(O)));
      case l:
      case u:
      case $:
        return Nu(+E, +O);
      case d:
        return E.name == O.name && E.message == O.message;
      case M:
      case L:
        return E == O + "";
      case g:
        var Ne = tr;
      case I:
        var xe = J & i;
        if (Ne || (Ne = ri), E.size != O.size && !xe)
          return !1;
        var we = Se.get(E);
        if (we)
          return we == O;
        J |= o, Se.set(E, O);
        var lt = Iu(Ne(E), Ne(O), J, ye, ne, Se);
        return Se.delete(E), lt;
      case B:
        if (ps)
          return ps.call(E) == ps.call(O);
    }
    return !1;
  }
  function D0(E, O, H, J, ye, ne) {
    var Se = H & i, Ne = Ru(E), xe = Ne.length, we = Ru(O), lt = we.length;
    if (xe != lt && !Se)
      return !1;
    for (var wt = xe; wt--; ) {
      var He = Ne[wt];
      if (!(Se ? He in O : mt.call(O, He)))
        return !1;
    }
    var yt = ne.get(E);
    if (yt && ne.get(O))
      return yt == O;
    var gt = !0;
    ne.set(E, O), ne.set(O, E);
    for (var or = Se; ++wt < xe; ) {
      He = Ne[wt];
      var Ht = E[He], Hr = O[He];
      if (J)
        var xu = Se ? J(Hr, Ht, He, O, E, ne) : J(Ht, Hr, He, E, O, ne);
      if (!(xu === void 0 ? Ht === Hr || ye(Ht, Hr, H, J, ne) : xu)) {
        gt = !1;
        break;
      }
      or || (or = He == "constructor");
    }
    if (gt && !or) {
      var bo = E.constructor, Po = O.constructor;
      bo != Po && "constructor" in E && "constructor" in O && !(typeof bo == "function" && bo instanceof bo && typeof Po == "function" && Po instanceof Po) && (gt = !1);
    }
    return ne.delete(E), ne.delete(O), gt;
  }
  function Ru(E) {
    return A0(E, G0, F0);
  }
  function Eo(E, O) {
    var H = E.__data__;
    return x0(O) ? H[typeof O == "string" ? "string" : "hash"] : H.map;
  }
  function dn(E, O) {
    var H = Mt(E, O);
    return C0(H) ? H : void 0;
  }
  function k0(E) {
    var O = mt.call(E, Ur), H = E[Ur];
    try {
      E[Ur] = void 0;
      var J = !0;
    } catch {
    }
    var ye = Eu.call(E);
    return J && (O ? E[Ur] = H : delete E[Ur]), ye;
  }
  var F0 = Tu ? function(E) {
    return E == null ? [] : (E = Object(E), Ae(Tu(E), function(O) {
      return Pu.call(E, O);
    }));
  } : V0, ir = si;
  (us && ir(new us(new ArrayBuffer(1))) != z || oi && ir(new oi()) != g || fs && ir(fs.resolve()) != C || ds && ir(new ds()) != I || hs && ir(new hs()) != K) && (ir = function(E) {
    var O = si(E), H = O == S ? E.constructor : void 0, J = H ? qr(H) : "";
    if (J)
      switch (J) {
        case Zg:
          return z;
        case e0:
          return g;
        case t0:
          return C;
        case r0:
          return I;
        case n0:
          return K;
      }
    return O;
  });
  function L0(E, O) {
    return O = O ?? a, !!O && (typeof E == "number" || _.test(E)) && E > -1 && E % 1 == 0 && E < O;
  }
  function x0(E) {
    var O = typeof E;
    return O == "string" || O == "number" || O == "symbol" || O == "boolean" ? E !== "__proto__" : E === null;
  }
  function U0(E) {
    return !!wu && wu in E;
  }
  function j0(E) {
    var O = E && E.constructor, H = typeof O == "function" && O.prototype || rr;
    return E === H;
  }
  function M0(E) {
    return Eu.call(E);
  }
  function qr(E) {
    if (E != null) {
      try {
        return ii.call(E);
      } catch {
      }
      try {
        return E + "";
      } catch {
      }
    }
    return "";
  }
  function Nu(E, O) {
    return E === O || E !== E && O !== O;
  }
  var q0 = Ou(/* @__PURE__ */ function() {
    return arguments;
  }()) ? Ou : function(E) {
    return ci(E) && mt.call(E, "callee") && !Pu.call(E, "callee");
  }, So = Array.isArray;
  function H0(E) {
    return E != null && ku(E.length) && !Du(E);
  }
  var ms = Jg || z0;
  function B0(E, O) {
    return Cu(E, O);
  }
  function Du(E) {
    if (!Fu(E))
      return !1;
    var O = si(E);
    return O == h || O == y || O == f || O == R;
  }
  function ku(E) {
    return typeof E == "number" && E > -1 && E % 1 == 0 && E <= a;
  }
  function Fu(E) {
    var O = typeof E;
    return E != null && (O == "object" || O == "function");
  }
  function ci(E) {
    return E != null && typeof E == "object";
  }
  var Lu = Pe ? Lr(Pe) : I0;
  function G0(E) {
    return H0(E) ? T0(E) : R0(E);
  }
  function V0() {
    return [];
  }
  function z0() {
    return !1;
  }
  e.exports = B0;
})(ya, ya.exports);
var $P = ya.exports;
Object.defineProperty(uo, "__esModule", { value: !0 });
uo.DownloadedUpdateHelper = void 0;
uo.createTempUpdateFile = bP;
const _P = eo, wP = Cr, nd = $P, zr = Ir, Ni = ce;
class EP {
  constructor(t) {
    this.cacheDir = t, this._file = null, this._packageFile = null, this.versionInfo = null, this.fileInfo = null, this._downloadedFileInfo = null;
  }
  get downloadedFileInfo() {
    return this._downloadedFileInfo;
  }
  get file() {
    return this._file;
  }
  get packageFile() {
    return this._packageFile;
  }
  get cacheDirForPendingUpdate() {
    return Ni.join(this.cacheDir, "pending");
  }
  async validateDownloadedPath(t, r, n, i) {
    if (this.versionInfo != null && this.file === t && this.fileInfo != null)
      return nd(this.versionInfo, r) && nd(this.fileInfo.info, n.info) && await (0, zr.pathExists)(t) ? t : null;
    const o = await this.getValidCachedUpdateFile(n, i);
    return o === null ? null : (i.info(`Update has already been downloaded to ${t}).`), this._file = o, o);
  }
  async setDownloadedFile(t, r, n, i, o, a) {
    this._file = t, this._packageFile = r, this.versionInfo = n, this.fileInfo = i, this._downloadedFileInfo = {
      fileName: o,
      sha512: i.info.sha512,
      isAdminRightsRequired: i.info.isAdminRightsRequired === !0
    }, a && await (0, zr.outputJson)(this.getUpdateInfoFile(), this._downloadedFileInfo);
  }
  async clear() {
    this._file = null, this._packageFile = null, this.versionInfo = null, this.fileInfo = null, await this.cleanCacheDirForPendingUpdate();
  }
  async cleanCacheDirForPendingUpdate() {
    try {
      await (0, zr.emptyDir)(this.cacheDirForPendingUpdate);
    } catch {
    }
  }
  /**
   * Returns "update-info.json" which is created in the update cache directory's "pending" subfolder after the first update is downloaded.  If the update file does not exist then the cache is cleared and recreated.  If the update file exists then its properties are validated.
   * @param fileInfo
   * @param logger
   */
  async getValidCachedUpdateFile(t, r) {
    const n = this.getUpdateInfoFile();
    if (!await (0, zr.pathExists)(n))
      return null;
    let o;
    try {
      o = await (0, zr.readJson)(n);
    } catch (f) {
      let l = "No cached update info available";
      return f.code !== "ENOENT" && (await this.cleanCacheDirForPendingUpdate(), l += ` (error on read: ${f.message})`), r.info(l), null;
    }
    if (!((o == null ? void 0 : o.fileName) !== null))
      return r.warn("Cached update info is corrupted: no fileName, directory for cached update will be cleaned"), await this.cleanCacheDirForPendingUpdate(), null;
    if (t.info.sha512 !== o.sha512)
      return r.info(`Cached update sha512 checksum doesn't match the latest available update. New update must be downloaded. Cached: ${o.sha512}, expected: ${t.info.sha512}. Directory for cached update will be cleaned`), await this.cleanCacheDirForPendingUpdate(), null;
    const s = Ni.join(this.cacheDirForPendingUpdate, o.fileName);
    if (!await (0, zr.pathExists)(s))
      return r.info("Cached update file doesn't exist"), null;
    const c = await SP(s);
    return t.info.sha512 !== c ? (r.warn(`Sha512 checksum doesn't match the latest available update. New update must be downloaded. Cached: ${c}, expected: ${t.info.sha512}`), await this.cleanCacheDirForPendingUpdate(), null) : (this._downloadedFileInfo = o, s);
  }
  getUpdateInfoFile() {
    return Ni.join(this.cacheDirForPendingUpdate, "update-info.json");
  }
}
uo.DownloadedUpdateHelper = EP;
function SP(e, t = "sha512", r = "base64", n) {
  return new Promise((i, o) => {
    const a = (0, _P.createHash)(t);
    a.on("error", o).setEncoding(r), (0, wP.createReadStream)(e, {
      ...n,
      highWaterMark: 1024 * 1024
      /* better to use more memory but hash faster */
    }).on("error", o).on("end", () => {
      a.end(), i(a.read());
    }).pipe(a, { end: !1 });
  });
}
async function bP(e, t, r) {
  let n = 0, i = Ni.join(t, e);
  for (let o = 0; o < 3; o++)
    try {
      return await (0, zr.unlink)(i), i;
    } catch (a) {
      if (a.code === "ENOENT")
        return i;
      r.warn(`Error on remove temp update file: ${a}`), i = Ni.join(t, `${n++}-${e}`);
    }
  return i;
}
var qa = {}, cl = {};
Object.defineProperty(cl, "__esModule", { value: !0 });
cl.getAppCacheDir = TP;
const ks = ce, PP = ba;
function TP() {
  const e = (0, PP.homedir)();
  let t;
  return process.platform === "win32" ? t = process.env.LOCALAPPDATA || ks.join(e, "AppData", "Local") : process.platform === "darwin" ? t = ks.join(e, "Library", "Caches") : t = process.env.XDG_CACHE_HOME || ks.join(e, ".cache"), t;
}
Object.defineProperty(qa, "__esModule", { value: !0 });
qa.ElectronAppAdapter = void 0;
const id = ce, AP = cl;
class OP {
  constructor(t = Xt.app) {
    this.app = t;
  }
  whenReady() {
    return this.app.whenReady();
  }
  get version() {
    return this.app.getVersion();
  }
  get name() {
    return this.app.getName();
  }
  get isPackaged() {
    return this.app.isPackaged === !0;
  }
  get appUpdateConfigPath() {
    return this.isPackaged ? id.join(process.resourcesPath, "app-update.yml") : id.join(this.app.getAppPath(), "dev-app-update.yml");
  }
  get userDataPath() {
    return this.app.getPath("userData");
  }
  get baseCachePath() {
    return (0, AP.getAppCacheDir)();
  }
  quit() {
    this.app.quit();
  }
  relaunch() {
    this.app.relaunch();
  }
  onQuit(t) {
    this.app.once("quit", (r, n) => t(n));
  }
}
qa.ElectronAppAdapter = OP;
var Hm = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.ElectronHttpExecutor = e.NET_SESSION_NAME = void 0, e.getNetSession = r;
  const t = Fe;
  e.NET_SESSION_NAME = "electron-updater";
  function r() {
    return Xt.session.fromPartition(e.NET_SESSION_NAME, {
      cache: !1
    });
  }
  class n extends t.HttpExecutor {
    constructor(o) {
      super(), this.proxyLoginCallback = o, this.cachedSession = null;
    }
    async download(o, a, s) {
      return await s.cancellationToken.createPromise((c, f, l) => {
        const u = {
          headers: s.headers || void 0,
          redirect: "manual"
        };
        (0, t.configureRequestUrl)(o, u), (0, t.configureRequestOptions)(u), this.doDownload(u, {
          destination: a,
          options: s,
          onCancel: l,
          callback: (d) => {
            d == null ? c(a) : f(d);
          },
          responseHandler: null
        }, 0);
      });
    }
    createRequest(o, a) {
      o.headers && o.headers.Host && (o.host = o.headers.Host, delete o.headers.Host), this.cachedSession == null && (this.cachedSession = r());
      const s = Xt.net.request({
        ...o,
        session: this.cachedSession
      });
      return s.on("response", a), this.proxyLoginCallback != null && s.on("login", this.proxyLoginCallback), s;
    }
    addRedirectHandlers(o, a, s, c, f) {
      o.on("redirect", (l, u, d) => {
        o.abort(), c > this.maxRedirects ? s(this.createMaxRedirectError()) : f(t.HttpExecutor.prepareRedirectUrlOptions(d, a));
      });
    }
  }
  e.ElectronHttpExecutor = n;
})(Hm);
var fo = {}, _t = {}, CP = "[object Symbol]", Bm = /[\\^$.*+?()[\]{}|]/g, IP = RegExp(Bm.source), RP = typeof Tt == "object" && Tt && Tt.Object === Object && Tt, NP = typeof self == "object" && self && self.Object === Object && self, DP = RP || NP || Function("return this")(), kP = Object.prototype, FP = kP.toString, od = DP.Symbol, ad = od ? od.prototype : void 0, sd = ad ? ad.toString : void 0;
function LP(e) {
  if (typeof e == "string")
    return e;
  if (UP(e))
    return sd ? sd.call(e) : "";
  var t = e + "";
  return t == "0" && 1 / e == -1 / 0 ? "-0" : t;
}
function xP(e) {
  return !!e && typeof e == "object";
}
function UP(e) {
  return typeof e == "symbol" || xP(e) && FP.call(e) == CP;
}
function jP(e) {
  return e == null ? "" : LP(e);
}
function MP(e) {
  return e = jP(e), e && IP.test(e) ? e.replace(Bm, "\\$&") : e;
}
var qP = MP;
Object.defineProperty(_t, "__esModule", { value: !0 });
_t.newBaseUrl = BP;
_t.newUrlFromBase = mc;
_t.getChannelFilename = GP;
_t.blockmapFiles = VP;
const Gm = Bn, HP = qP;
function BP(e) {
  const t = new Gm.URL(e);
  return t.pathname.endsWith("/") || (t.pathname += "/"), t;
}
function mc(e, t, r = !1) {
  const n = new Gm.URL(e, t), i = t.search;
  return i != null && i.length !== 0 ? n.search = i : r && (n.search = `noCache=${Date.now().toString(32)}`), n;
}
function GP(e) {
  return `${e}.yml`;
}
function VP(e, t, r) {
  const n = mc(`${e.pathname}.blockmap`, e);
  return [mc(`${e.pathname.replace(new RegExp(HP(r), "g"), t)}.blockmap`, e), n];
}
var Le = {};
Object.defineProperty(Le, "__esModule", { value: !0 });
Le.Provider = void 0;
Le.findFile = KP;
Le.parseUpdateInfo = YP;
Le.getFileList = Vm;
Le.resolveFiles = XP;
const Ar = Fe, zP = qe, cd = _t;
class WP {
  constructor(t) {
    this.runtimeOptions = t, this.requestHeaders = null, this.executor = t.executor;
  }
  get isUseMultipleRangeRequest() {
    return this.runtimeOptions.isUseMultipleRangeRequest !== !1;
  }
  getChannelFilePrefix() {
    if (this.runtimeOptions.platform === "linux") {
      const t = process.env.TEST_UPDATER_ARCH || process.arch;
      return "-linux" + (t === "x64" ? "" : `-${t}`);
    } else
      return this.runtimeOptions.platform === "darwin" ? "-mac" : "";
  }
  // due to historical reasons for windows we use channel name without platform specifier
  getDefaultChannelName() {
    return this.getCustomChannelName("latest");
  }
  getCustomChannelName(t) {
    return `${t}${this.getChannelFilePrefix()}`;
  }
  get fileExtraDownloadHeaders() {
    return null;
  }
  setRequestHeaders(t) {
    this.requestHeaders = t;
  }
  /**
   * Method to perform API request only to resolve update info, but not to download update.
   */
  httpRequest(t, r, n) {
    return this.executor.request(this.createRequestOptions(t, r), n);
  }
  createRequestOptions(t, r) {
    const n = {};
    return this.requestHeaders == null ? r != null && (n.headers = r) : n.headers = r == null ? this.requestHeaders : { ...this.requestHeaders, ...r }, (0, Ar.configureRequestUrl)(t, n), n;
  }
}
Le.Provider = WP;
function KP(e, t, r) {
  if (e.length === 0)
    throw (0, Ar.newError)("No files provided", "ERR_UPDATER_NO_FILES_PROVIDED");
  const n = e.find((i) => i.url.pathname.toLowerCase().endsWith(`.${t}`));
  return n ?? (r == null ? e[0] : e.find((i) => !r.some((o) => i.url.pathname.toLowerCase().endsWith(`.${o}`))));
}
function YP(e, t, r) {
  if (e == null)
    throw (0, Ar.newError)(`Cannot parse update info from ${t} in the latest release artifacts (${r}): rawData: null`, "ERR_UPDATER_INVALID_UPDATE_INFO");
  let n;
  try {
    n = (0, zP.load)(e);
  } catch (i) {
    throw (0, Ar.newError)(`Cannot parse update info from ${t} in the latest release artifacts (${r}): ${i.stack || i.message}, rawData: ${e}`, "ERR_UPDATER_INVALID_UPDATE_INFO");
  }
  return n;
}
function Vm(e) {
  const t = e.files;
  if (t != null && t.length > 0)
    return t;
  if (e.path != null)
    return [
      {
        url: e.path,
        sha2: e.sha2,
        sha512: e.sha512
      }
    ];
  throw (0, Ar.newError)(`No files provided: ${(0, Ar.safeStringifyJson)(e)}`, "ERR_UPDATER_NO_FILES_PROVIDED");
}
function XP(e, t, r = (n) => n) {
  const i = Vm(e).map((s) => {
    if (s.sha2 == null && s.sha512 == null)
      throw (0, Ar.newError)(`Update info doesn't contain nor sha256 neither sha512 checksum: ${(0, Ar.safeStringifyJson)(s)}`, "ERR_UPDATER_NO_CHECKSUM");
    return {
      url: (0, cd.newUrlFromBase)(r(s.url), t),
      info: s
    };
  }), o = e.packages, a = o == null ? null : o[process.arch] || o.ia32;
  return a != null && (i[0].packageInfo = {
    ...a,
    path: (0, cd.newUrlFromBase)(r(a.path), t).href
  }), i;
}
Object.defineProperty(fo, "__esModule", { value: !0 });
fo.GenericProvider = void 0;
const ld = Fe, Fs = _t, Ls = Le;
class JP extends Ls.Provider {
  constructor(t, r, n) {
    super(n), this.configuration = t, this.updater = r, this.baseUrl = (0, Fs.newBaseUrl)(this.configuration.url);
  }
  get channel() {
    const t = this.updater.channel || this.configuration.channel;
    return t == null ? this.getDefaultChannelName() : this.getCustomChannelName(t);
  }
  async getLatestVersion() {
    const t = (0, Fs.getChannelFilename)(this.channel), r = (0, Fs.newUrlFromBase)(t, this.baseUrl, this.updater.isAddNoCacheQuery);
    for (let n = 0; ; n++)
      try {
        return (0, Ls.parseUpdateInfo)(await this.httpRequest(r), t, r);
      } catch (i) {
        if (i instanceof ld.HttpError && i.statusCode === 404)
          throw (0, ld.newError)(`Cannot find channel "${t}" update info: ${i.stack || i.message}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND");
        if (i.code === "ECONNREFUSED" && n < 3) {
          await new Promise((o, a) => {
            try {
              setTimeout(o, 1e3 * n);
            } catch (s) {
              a(s);
            }
          });
          continue;
        }
        throw i;
      }
  }
  resolveFiles(t) {
    return (0, Ls.resolveFiles)(t, this.baseUrl);
  }
}
fo.GenericProvider = JP;
var Ha = {}, Ba = {};
Object.defineProperty(Ba, "__esModule", { value: !0 });
Ba.BitbucketProvider = void 0;
const ud = Fe, xs = _t, Us = Le;
class QP extends Us.Provider {
  constructor(t, r, n) {
    super({
      ...n,
      isUseMultipleRangeRequest: !1
    }), this.configuration = t, this.updater = r;
    const { owner: i, slug: o } = t;
    this.baseUrl = (0, xs.newBaseUrl)(`https://api.bitbucket.org/2.0/repositories/${i}/${o}/downloads`);
  }
  get channel() {
    return this.updater.channel || this.configuration.channel || "latest";
  }
  async getLatestVersion() {
    const t = new ud.CancellationToken(), r = (0, xs.getChannelFilename)(this.getCustomChannelName(this.channel)), n = (0, xs.newUrlFromBase)(r, this.baseUrl, this.updater.isAddNoCacheQuery);
    try {
      const i = await this.httpRequest(n, void 0, t);
      return (0, Us.parseUpdateInfo)(i, r, n);
    } catch (i) {
      throw (0, ud.newError)(`Unable to find latest version on ${this.toString()}, please ensure release exists: ${i.stack || i.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
    }
  }
  resolveFiles(t) {
    return (0, Us.resolveFiles)(t, this.baseUrl);
  }
  toString() {
    const { owner: t, slug: r } = this.configuration;
    return `Bitbucket (owner: ${t}, slug: ${r}, channel: ${this.channel})`;
  }
}
Ba.BitbucketProvider = QP;
var Or = {};
Object.defineProperty(Or, "__esModule", { value: !0 });
Or.GitHubProvider = Or.BaseGitHubProvider = void 0;
Or.computeReleaseNotes = Wm;
const Gt = Fe, Tn = sl, ZP = Bn, An = _t, yc = Le, js = /\/tag\/([^/]+)$/;
class zm extends yc.Provider {
  constructor(t, r, n) {
    super({
      ...n,
      /* because GitHib uses S3 */
      isUseMultipleRangeRequest: !1
    }), this.options = t, this.baseUrl = (0, An.newBaseUrl)((0, Gt.githubUrl)(t, r));
    const i = r === "github.com" ? "api.github.com" : r;
    this.baseApiUrl = (0, An.newBaseUrl)((0, Gt.githubUrl)(t, i));
  }
  computeGithubBasePath(t) {
    const r = this.options.host;
    return r && !["github.com", "api.github.com"].includes(r) ? `/api/v3${t}` : t;
  }
}
Or.BaseGitHubProvider = zm;
class eT extends zm {
  constructor(t, r, n) {
    super(t, "github.com", n), this.options = t, this.updater = r;
  }
  get channel() {
    const t = this.updater.channel || this.options.channel;
    return t == null ? this.getDefaultChannelName() : this.getCustomChannelName(t);
  }
  async getLatestVersion() {
    var t, r, n, i, o;
    const a = new Gt.CancellationToken(), s = await this.httpRequest((0, An.newUrlFromBase)(`${this.basePath}.atom`, this.baseUrl), {
      accept: "application/xml, application/atom+xml, text/xml, */*"
    }, a), c = (0, Gt.parseXml)(s);
    let f = c.element("entry", !1, "No published versions on GitHub"), l = null;
    try {
      if (this.updater.allowPrerelease) {
        const $ = ((t = this.updater) === null || t === void 0 ? void 0 : t.channel) || ((r = Tn.prerelease(this.updater.currentVersion)) === null || r === void 0 ? void 0 : r[0]) || null;
        if ($ === null)
          l = js.exec(f.element("link").attribute("href"))[1];
        else
          for (const v of c.getElements("entry")) {
            const S = js.exec(v.element("link").attribute("href"));
            if (S === null)
              continue;
            const C = S[1], R = ((n = Tn.prerelease(C)) === null || n === void 0 ? void 0 : n[0]) || null, M = !$ || ["alpha", "beta"].includes($), I = R !== null && !["alpha", "beta"].includes(String(R));
            if (M && !I && !($ === "beta" && R === "alpha")) {
              l = C;
              break;
            }
            if (R && R === $) {
              l = C;
              break;
            }
          }
      } else {
        l = await this.getLatestTagName(a);
        for (const $ of c.getElements("entry"))
          if (js.exec($.element("link").attribute("href"))[1] === l) {
            f = $;
            break;
          }
      }
    } catch ($) {
      throw (0, Gt.newError)(`Cannot parse releases feed: ${$.stack || $.message},
XML:
${s}`, "ERR_UPDATER_INVALID_RELEASE_FEED");
    }
    if (l == null)
      throw (0, Gt.newError)("No published versions on GitHub", "ERR_UPDATER_NO_PUBLISHED_VERSIONS");
    let u, d = "", h = "";
    const y = async ($) => {
      d = (0, An.getChannelFilename)($), h = (0, An.newUrlFromBase)(this.getBaseDownloadPath(String(l), d), this.baseUrl);
      const v = this.createRequestOptions(h);
      try {
        return await this.executor.request(v, a);
      } catch (S) {
        throw S instanceof Gt.HttpError && S.statusCode === 404 ? (0, Gt.newError)(`Cannot find ${d} in the latest release artifacts (${h}): ${S.stack || S.message}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND") : S;
      }
    };
    try {
      let $ = this.channel;
      this.updater.allowPrerelease && (!((i = Tn.prerelease(l)) === null || i === void 0) && i[0]) && ($ = this.getCustomChannelName(String((o = Tn.prerelease(l)) === null || o === void 0 ? void 0 : o[0]))), u = await y($);
    } catch ($) {
      if (this.updater.allowPrerelease)
        u = await y(this.getDefaultChannelName());
      else
        throw $;
    }
    const g = (0, yc.parseUpdateInfo)(u, d, h);
    return g.releaseName == null && (g.releaseName = f.elementValueOrEmpty("title")), g.releaseNotes == null && (g.releaseNotes = Wm(this.updater.currentVersion, this.updater.fullChangelog, c, f)), {
      tag: l,
      ...g
    };
  }
  async getLatestTagName(t) {
    const r = this.options, n = r.host == null || r.host === "github.com" ? (0, An.newUrlFromBase)(`${this.basePath}/latest`, this.baseUrl) : new ZP.URL(`${this.computeGithubBasePath(`/repos/${r.owner}/${r.repo}/releases`)}/latest`, this.baseApiUrl);
    try {
      const i = await this.httpRequest(n, { Accept: "application/json" }, t);
      return i == null ? null : JSON.parse(i).tag_name;
    } catch (i) {
      throw (0, Gt.newError)(`Unable to find latest version on GitHub (${n}), please ensure a production release exists: ${i.stack || i.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
    }
  }
  get basePath() {
    return `/${this.options.owner}/${this.options.repo}/releases`;
  }
  resolveFiles(t) {
    return (0, yc.resolveFiles)(t, this.baseUrl, (r) => this.getBaseDownloadPath(t.tag, r.replace(/ /g, "-")));
  }
  getBaseDownloadPath(t, r) {
    return `${this.basePath}/download/${t}/${r}`;
  }
}
Or.GitHubProvider = eT;
function fd(e) {
  const t = e.elementValueOrEmpty("content");
  return t === "No content." ? "" : t;
}
function Wm(e, t, r, n) {
  if (!t)
    return fd(n);
  const i = [];
  for (const o of r.getElements("entry")) {
    const a = /\/tag\/v?([^/]+)$/.exec(o.element("link").attribute("href"))[1];
    Tn.lt(e, a) && i.push({
      version: a,
      note: fd(o)
    });
  }
  return i.sort((o, a) => Tn.rcompare(o.version, a.version));
}
var Ga = {};
Object.defineProperty(Ga, "__esModule", { value: !0 });
Ga.KeygenProvider = void 0;
const dd = Fe, Ms = _t, qs = Le;
class tT extends qs.Provider {
  constructor(t, r, n) {
    super({
      ...n,
      isUseMultipleRangeRequest: !1
    }), this.configuration = t, this.updater = r, this.baseUrl = (0, Ms.newBaseUrl)(`https://api.keygen.sh/v1/accounts/${this.configuration.account}/artifacts?product=${this.configuration.product}`);
  }
  get channel() {
    return this.updater.channel || this.configuration.channel || "stable";
  }
  async getLatestVersion() {
    const t = new dd.CancellationToken(), r = (0, Ms.getChannelFilename)(this.getCustomChannelName(this.channel)), n = (0, Ms.newUrlFromBase)(r, this.baseUrl, this.updater.isAddNoCacheQuery);
    try {
      const i = await this.httpRequest(n, {
        Accept: "application/vnd.api+json",
        "Keygen-Version": "1.1"
      }, t);
      return (0, qs.parseUpdateInfo)(i, r, n);
    } catch (i) {
      throw (0, dd.newError)(`Unable to find latest version on ${this.toString()}, please ensure release exists: ${i.stack || i.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
    }
  }
  resolveFiles(t) {
    return (0, qs.resolveFiles)(t, this.baseUrl);
  }
  toString() {
    const { account: t, product: r, platform: n } = this.configuration;
    return `Keygen (account: ${t}, product: ${r}, platform: ${n}, channel: ${this.channel})`;
  }
}
Ga.KeygenProvider = tT;
var Va = {};
Object.defineProperty(Va, "__esModule", { value: !0 });
Va.PrivateGitHubProvider = void 0;
const gn = Fe, rT = qe, nT = ce, hd = Bn, pd = _t, iT = Or, oT = Le;
class aT extends iT.BaseGitHubProvider {
  constructor(t, r, n, i) {
    super(t, "api.github.com", i), this.updater = r, this.token = n;
  }
  createRequestOptions(t, r) {
    const n = super.createRequestOptions(t, r);
    return n.redirect = "manual", n;
  }
  async getLatestVersion() {
    const t = new gn.CancellationToken(), r = (0, pd.getChannelFilename)(this.getDefaultChannelName()), n = await this.getLatestVersionInfo(t), i = n.assets.find((s) => s.name === r);
    if (i == null)
      throw (0, gn.newError)(`Cannot find ${r} in the release ${n.html_url || n.name}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND");
    const o = new hd.URL(i.url);
    let a;
    try {
      a = (0, rT.load)(await this.httpRequest(o, this.configureHeaders("application/octet-stream"), t));
    } catch (s) {
      throw s instanceof gn.HttpError && s.statusCode === 404 ? (0, gn.newError)(`Cannot find ${r} in the latest release artifacts (${o}): ${s.stack || s.message}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND") : s;
    }
    return a.assets = n.assets, a;
  }
  get fileExtraDownloadHeaders() {
    return this.configureHeaders("application/octet-stream");
  }
  configureHeaders(t) {
    return {
      accept: t,
      authorization: `token ${this.token}`
    };
  }
  async getLatestVersionInfo(t) {
    const r = this.updater.allowPrerelease;
    let n = this.basePath;
    r || (n = `${n}/latest`);
    const i = (0, pd.newUrlFromBase)(n, this.baseUrl);
    try {
      const o = JSON.parse(await this.httpRequest(i, this.configureHeaders("application/vnd.github.v3+json"), t));
      return r ? o.find((a) => a.prerelease) || o[0] : o;
    } catch (o) {
      throw (0, gn.newError)(`Unable to find latest version on GitHub (${i}), please ensure a production release exists: ${o.stack || o.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
    }
  }
  get basePath() {
    return this.computeGithubBasePath(`/repos/${this.options.owner}/${this.options.repo}/releases`);
  }
  resolveFiles(t) {
    return (0, oT.getFileList)(t).map((r) => {
      const n = nT.posix.basename(r.url).replace(/ /g, "-"), i = t.assets.find((o) => o != null && o.name === n);
      if (i == null)
        throw (0, gn.newError)(`Cannot find asset "${n}" in: ${JSON.stringify(t.assets, null, 2)}`, "ERR_UPDATER_ASSET_NOT_FOUND");
      return {
        url: new hd.URL(i.url),
        info: r
      };
    });
  }
}
Va.PrivateGitHubProvider = aT;
Object.defineProperty(Ha, "__esModule", { value: !0 });
Ha.isUrlProbablySupportMultiRangeRequests = Km;
Ha.createClient = fT;
const xo = Fe, sT = Ba, md = fo, cT = Or, lT = Ga, uT = Va;
function Km(e) {
  return !e.includes("s3.amazonaws.com");
}
function fT(e, t, r) {
  if (typeof e == "string")
    throw (0, xo.newError)("Please pass PublishConfiguration object", "ERR_UPDATER_INVALID_PROVIDER_CONFIGURATION");
  const n = e.provider;
  switch (n) {
    case "github": {
      const i = e, o = (i.private ? process.env.GH_TOKEN || process.env.GITHUB_TOKEN : null) || i.token;
      return o == null ? new cT.GitHubProvider(i, t, r) : new uT.PrivateGitHubProvider(i, t, o, r);
    }
    case "bitbucket":
      return new sT.BitbucketProvider(e, t, r);
    case "keygen":
      return new lT.KeygenProvider(e, t, r);
    case "s3":
    case "spaces":
      return new md.GenericProvider({
        provider: "generic",
        url: (0, xo.getS3LikeProviderBaseUrl)(e),
        channel: e.channel || null
      }, t, {
        ...r,
        // https://github.com/minio/minio/issues/5285#issuecomment-350428955
        isUseMultipleRangeRequest: !1
      });
    case "generic": {
      const i = e;
      return new md.GenericProvider(i, t, {
        ...r,
        isUseMultipleRangeRequest: i.useMultipleRangeRequest !== !1 && Km(i.url)
      });
    }
    case "custom": {
      const i = e, o = i.updateProvider;
      if (!o)
        throw (0, xo.newError)("Custom provider not specified", "ERR_UPDATER_INVALID_PROVIDER_CONFIGURATION");
      return new o(i, t, r);
    }
    default:
      throw (0, xo.newError)(`Unsupported provider: ${n}`, "ERR_UPDATER_UNSUPPORTED_PROVIDER");
  }
}
var za = {}, ho = {}, Wn = {}, cn = {};
Object.defineProperty(cn, "__esModule", { value: !0 });
cn.OperationKind = void 0;
cn.computeOperations = dT;
var Qr;
(function(e) {
  e[e.COPY = 0] = "COPY", e[e.DOWNLOAD = 1] = "DOWNLOAD";
})(Qr || (cn.OperationKind = Qr = {}));
function dT(e, t, r) {
  const n = gd(e.files), i = gd(t.files);
  let o = null;
  const a = t.files[0], s = [], c = a.name, f = n.get(c);
  if (f == null)
    throw new Error(`no file ${c} in old blockmap`);
  const l = i.get(c);
  let u = 0;
  const { checksumToOffset: d, checksumToOldSize: h } = pT(n.get(c), f.offset, r);
  let y = a.offset;
  for (let g = 0; g < l.checksums.length; y += l.sizes[g], g++) {
    const $ = l.sizes[g], v = l.checksums[g];
    let S = d.get(v);
    S != null && h.get(v) !== $ && (r.warn(`Checksum ("${v}") matches, but size differs (old: ${h.get(v)}, new: ${$})`), S = void 0), S === void 0 ? (u++, o != null && o.kind === Qr.DOWNLOAD && o.end === y ? o.end += $ : (o = {
      kind: Qr.DOWNLOAD,
      start: y,
      end: y + $
      // oldBlocks: null,
    }, yd(o, s, v, g))) : o != null && o.kind === Qr.COPY && o.end === S ? o.end += $ : (o = {
      kind: Qr.COPY,
      start: S,
      end: S + $
      // oldBlocks: [checksum]
    }, yd(o, s, v, g));
  }
  return u > 0 && r.info(`File${a.name === "file" ? "" : " " + a.name} has ${u} changed blocks`), s;
}
const hT = process.env.DIFFERENTIAL_DOWNLOAD_PLAN_BUILDER_VALIDATE_RANGES === "true";
function yd(e, t, r, n) {
  if (hT && t.length !== 0) {
    const i = t[t.length - 1];
    if (i.kind === e.kind && e.start < i.end && e.start > i.start) {
      const o = [i.start, i.end, e.start, e.end].reduce((a, s) => a < s ? a : s);
      throw new Error(`operation (block index: ${n}, checksum: ${r}, kind: ${Qr[e.kind]}) overlaps previous operation (checksum: ${r}):
abs: ${i.start} until ${i.end} and ${e.start} until ${e.end}
rel: ${i.start - o} until ${i.end - o} and ${e.start - o} until ${e.end - o}`);
    }
  }
  t.push(e);
}
function pT(e, t, r) {
  const n = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map();
  let o = t;
  for (let a = 0; a < e.checksums.length; a++) {
    const s = e.checksums[a], c = e.sizes[a], f = i.get(s);
    if (f === void 0)
      n.set(s, o), i.set(s, c);
    else if (r.debug != null) {
      const l = f === c ? "(same size)" : `(size: ${f}, this size: ${c})`;
      r.debug(`${s} duplicated in blockmap ${l}, it doesn't lead to broken differential downloader, just corresponding block will be skipped)`);
    }
    o += c;
  }
  return { checksumToOffset: n, checksumToOldSize: i };
}
function gd(e) {
  const t = /* @__PURE__ */ new Map();
  for (const r of e)
    t.set(r.name, r);
  return t;
}
Object.defineProperty(Wn, "__esModule", { value: !0 });
Wn.DataSplitter = void 0;
Wn.copyData = Ym;
const Uo = Fe, mT = Cr, yT = to, gT = cn, vd = Buffer.from(`\r
\r
`);
var pr;
(function(e) {
  e[e.INIT = 0] = "INIT", e[e.HEADER = 1] = "HEADER", e[e.BODY = 2] = "BODY";
})(pr || (pr = {}));
function Ym(e, t, r, n, i) {
  const o = (0, mT.createReadStream)("", {
    fd: r,
    autoClose: !1,
    start: e.start,
    // end is inclusive
    end: e.end - 1
  });
  o.on("error", n), o.once("end", i), o.pipe(t, {
    end: !1
  });
}
class vT extends yT.Writable {
  constructor(t, r, n, i, o, a) {
    super(), this.out = t, this.options = r, this.partIndexToTaskIndex = n, this.partIndexToLength = o, this.finishHandler = a, this.partIndex = -1, this.headerListBuffer = null, this.readState = pr.INIT, this.ignoreByteCount = 0, this.remainingPartDataCount = 0, this.actualPartLength = 0, this.boundaryLength = i.length + 4, this.ignoreByteCount = this.boundaryLength - 2;
  }
  get isFinished() {
    return this.partIndex === this.partIndexToLength.length;
  }
  // noinspection JSUnusedGlobalSymbols
  _write(t, r, n) {
    if (this.isFinished) {
      console.error(`Trailing ignored data: ${t.length} bytes`);
      return;
    }
    this.handleData(t).then(n).catch(n);
  }
  async handleData(t) {
    let r = 0;
    if (this.ignoreByteCount !== 0 && this.remainingPartDataCount !== 0)
      throw (0, Uo.newError)("Internal error", "ERR_DATA_SPLITTER_BYTE_COUNT_MISMATCH");
    if (this.ignoreByteCount > 0) {
      const n = Math.min(this.ignoreByteCount, t.length);
      this.ignoreByteCount -= n, r = n;
    } else if (this.remainingPartDataCount > 0) {
      const n = Math.min(this.remainingPartDataCount, t.length);
      this.remainingPartDataCount -= n, await this.processPartData(t, 0, n), r = n;
    }
    if (r !== t.length) {
      if (this.readState === pr.HEADER) {
        const n = this.searchHeaderListEnd(t, r);
        if (n === -1)
          return;
        r = n, this.readState = pr.BODY, this.headerListBuffer = null;
      }
      for (; ; ) {
        if (this.readState === pr.BODY)
          this.readState = pr.INIT;
        else {
          this.partIndex++;
          let a = this.partIndexToTaskIndex.get(this.partIndex);
          if (a == null)
            if (this.isFinished)
              a = this.options.end;
            else
              throw (0, Uo.newError)("taskIndex is null", "ERR_DATA_SPLITTER_TASK_INDEX_IS_NULL");
          const s = this.partIndex === 0 ? this.options.start : this.partIndexToTaskIndex.get(this.partIndex - 1) + 1;
          if (s < a)
            await this.copyExistingData(s, a);
          else if (s > a)
            throw (0, Uo.newError)("prevTaskIndex must be < taskIndex", "ERR_DATA_SPLITTER_TASK_INDEX_ASSERT_FAILED");
          if (this.isFinished) {
            this.onPartEnd(), this.finishHandler();
            return;
          }
          if (r = this.searchHeaderListEnd(t, r), r === -1) {
            this.readState = pr.HEADER;
            return;
          }
        }
        const n = this.partIndexToLength[this.partIndex], i = r + n, o = Math.min(i, t.length);
        if (await this.processPartStarted(t, r, o), this.remainingPartDataCount = n - (o - r), this.remainingPartDataCount > 0)
          return;
        if (r = i + this.boundaryLength, r >= t.length) {
          this.ignoreByteCount = this.boundaryLength - (t.length - i);
          return;
        }
      }
    }
  }
  copyExistingData(t, r) {
    return new Promise((n, i) => {
      const o = () => {
        if (t === r) {
          n();
          return;
        }
        const a = this.options.tasks[t];
        if (a.kind !== gT.OperationKind.COPY) {
          i(new Error("Task kind must be COPY"));
          return;
        }
        Ym(a, this.out, this.options.oldFileFd, i, () => {
          t++, o();
        });
      };
      o();
    });
  }
  searchHeaderListEnd(t, r) {
    const n = t.indexOf(vd, r);
    if (n !== -1)
      return n + vd.length;
    const i = r === 0 ? t : t.slice(r);
    return this.headerListBuffer == null ? this.headerListBuffer = i : this.headerListBuffer = Buffer.concat([this.headerListBuffer, i]), -1;
  }
  onPartEnd() {
    const t = this.partIndexToLength[this.partIndex - 1];
    if (this.actualPartLength !== t)
      throw (0, Uo.newError)(`Expected length: ${t} differs from actual: ${this.actualPartLength}`, "ERR_DATA_SPLITTER_LENGTH_MISMATCH");
    this.actualPartLength = 0;
  }
  processPartStarted(t, r, n) {
    return this.partIndex !== 0 && this.onPartEnd(), this.processPartData(t, r, n);
  }
  processPartData(t, r, n) {
    this.actualPartLength += n - r;
    const i = this.out;
    return i.write(r === 0 && t.length === n ? t : t.slice(r, n)) ? Promise.resolve() : new Promise((o, a) => {
      i.on("error", a), i.once("drain", () => {
        i.removeListener("error", a), o();
      });
    });
  }
}
Wn.DataSplitter = vT;
var Wa = {};
Object.defineProperty(Wa, "__esModule", { value: !0 });
Wa.executeTasksUsingMultipleRangeRequests = $T;
Wa.checkIsRangesSupported = vc;
const gc = Fe, $d = Wn, _d = cn;
function $T(e, t, r, n, i) {
  const o = (a) => {
    if (a >= t.length) {
      e.fileMetadataBuffer != null && r.write(e.fileMetadataBuffer), r.end();
      return;
    }
    const s = a + 1e3;
    _T(e, {
      tasks: t,
      start: a,
      end: Math.min(t.length, s),
      oldFileFd: n
    }, r, () => o(s), i);
  };
  return o;
}
function _T(e, t, r, n, i) {
  let o = "bytes=", a = 0;
  const s = /* @__PURE__ */ new Map(), c = [];
  for (let u = t.start; u < t.end; u++) {
    const d = t.tasks[u];
    d.kind === _d.OperationKind.DOWNLOAD && (o += `${d.start}-${d.end - 1}, `, s.set(a, u), a++, c.push(d.end - d.start));
  }
  if (a <= 1) {
    const u = (d) => {
      if (d >= t.end) {
        n();
        return;
      }
      const h = t.tasks[d++];
      if (h.kind === _d.OperationKind.COPY)
        (0, $d.copyData)(h, r, t.oldFileFd, i, () => u(d));
      else {
        const y = e.createRequestOptions();
        y.headers.Range = `bytes=${h.start}-${h.end - 1}`;
        const g = e.httpExecutor.createRequest(y, ($) => {
          vc($, i) && ($.pipe(r, {
            end: !1
          }), $.once("end", () => u(d)));
        });
        e.httpExecutor.addErrorAndTimeoutHandlers(g, i), g.end();
      }
    };
    u(t.start);
    return;
  }
  const f = e.createRequestOptions();
  f.headers.Range = o.substring(0, o.length - 2);
  const l = e.httpExecutor.createRequest(f, (u) => {
    if (!vc(u, i))
      return;
    const d = (0, gc.safeGetHeader)(u, "content-type"), h = /^multipart\/.+?(?:; boundary=(?:(?:"(.+)")|(?:([^\s]+))))$/i.exec(d);
    if (h == null) {
      i(new Error(`Content-Type "multipart/byteranges" is expected, but got "${d}"`));
      return;
    }
    const y = new $d.DataSplitter(r, t, s, h[1] || h[2], c, n);
    y.on("error", i), u.pipe(y), u.on("end", () => {
      setTimeout(() => {
        l.abort(), i(new Error("Response ends without calling any handlers"));
      }, 1e4);
    });
  });
  e.httpExecutor.addErrorAndTimeoutHandlers(l, i), l.end();
}
function vc(e, t) {
  if (e.statusCode >= 400)
    return t((0, gc.createHttpError)(e)), !1;
  if (e.statusCode !== 206) {
    const r = (0, gc.safeGetHeader)(e, "accept-ranges");
    if (r == null || r === "none")
      return t(new Error(`Server doesn't support Accept-Ranges (response code ${e.statusCode})`)), !1;
  }
  return !0;
}
var Ka = {};
Object.defineProperty(Ka, "__esModule", { value: !0 });
Ka.ProgressDifferentialDownloadCallbackTransform = void 0;
const wT = to;
var On;
(function(e) {
  e[e.COPY = 0] = "COPY", e[e.DOWNLOAD = 1] = "DOWNLOAD";
})(On || (On = {}));
class ET extends wT.Transform {
  constructor(t, r, n) {
    super(), this.progressDifferentialDownloadInfo = t, this.cancellationToken = r, this.onProgress = n, this.start = Date.now(), this.transferred = 0, this.delta = 0, this.expectedBytes = 0, this.index = 0, this.operationType = On.COPY, this.nextUpdate = this.start + 1e3;
  }
  _transform(t, r, n) {
    if (this.cancellationToken.cancelled) {
      n(new Error("cancelled"), null);
      return;
    }
    if (this.operationType == On.COPY) {
      n(null, t);
      return;
    }
    this.transferred += t.length, this.delta += t.length;
    const i = Date.now();
    i >= this.nextUpdate && this.transferred !== this.expectedBytes && this.transferred !== this.progressDifferentialDownloadInfo.grandTotal && (this.nextUpdate = i + 1e3, this.onProgress({
      total: this.progressDifferentialDownloadInfo.grandTotal,
      delta: this.delta,
      transferred: this.transferred,
      percent: this.transferred / this.progressDifferentialDownloadInfo.grandTotal * 100,
      bytesPerSecond: Math.round(this.transferred / ((i - this.start) / 1e3))
    }), this.delta = 0), n(null, t);
  }
  beginFileCopy() {
    this.operationType = On.COPY;
  }
  beginRangeDownload() {
    this.operationType = On.DOWNLOAD, this.expectedBytes += this.progressDifferentialDownloadInfo.expectedByteCounts[this.index++];
  }
  endRangeDownload() {
    this.transferred !== this.progressDifferentialDownloadInfo.grandTotal && this.onProgress({
      total: this.progressDifferentialDownloadInfo.grandTotal,
      delta: this.delta,
      transferred: this.transferred,
      percent: this.transferred / this.progressDifferentialDownloadInfo.grandTotal * 100,
      bytesPerSecond: Math.round(this.transferred / ((Date.now() - this.start) / 1e3))
    });
  }
  // Called when we are 100% done with the connection/download
  _flush(t) {
    if (this.cancellationToken.cancelled) {
      t(new Error("cancelled"));
      return;
    }
    this.onProgress({
      total: this.progressDifferentialDownloadInfo.grandTotal,
      delta: this.delta,
      transferred: this.transferred,
      percent: 100,
      bytesPerSecond: Math.round(this.transferred / ((Date.now() - this.start) / 1e3))
    }), this.delta = 0, this.transferred = 0, t(null);
  }
}
Ka.ProgressDifferentialDownloadCallbackTransform = ET;
Object.defineProperty(ho, "__esModule", { value: !0 });
ho.DifferentialDownloader = void 0;
const gi = Fe, Hs = Ir, ST = Cr, bT = Wn, PT = Bn, jo = cn, wd = Wa, TT = Ka;
class AT {
  // noinspection TypeScriptAbstractClassConstructorCanBeMadeProtected
  constructor(t, r, n) {
    this.blockAwareFileInfo = t, this.httpExecutor = r, this.options = n, this.fileMetadataBuffer = null, this.logger = n.logger;
  }
  createRequestOptions() {
    const t = {
      headers: {
        ...this.options.requestHeaders,
        accept: "*/*"
      }
    };
    return (0, gi.configureRequestUrl)(this.options.newUrl, t), (0, gi.configureRequestOptions)(t), t;
  }
  doDownload(t, r) {
    if (t.version !== r.version)
      throw new Error(`version is different (${t.version} - ${r.version}), full download is required`);
    const n = this.logger, i = (0, jo.computeOperations)(t, r, n);
    n.debug != null && n.debug(JSON.stringify(i, null, 2));
    let o = 0, a = 0;
    for (const c of i) {
      const f = c.end - c.start;
      c.kind === jo.OperationKind.DOWNLOAD ? o += f : a += f;
    }
    const s = this.blockAwareFileInfo.size;
    if (o + a + (this.fileMetadataBuffer == null ? 0 : this.fileMetadataBuffer.length) !== s)
      throw new Error(`Internal error, size mismatch: downloadSize: ${o}, copySize: ${a}, newSize: ${s}`);
    return n.info(`Full: ${Ed(s)}, To download: ${Ed(o)} (${Math.round(o / (s / 100))}%)`), this.downloadFile(i);
  }
  downloadFile(t) {
    const r = [], n = () => Promise.all(r.map((i) => (0, Hs.close)(i.descriptor).catch((o) => {
      this.logger.error(`cannot close file "${i.path}": ${o}`);
    })));
    return this.doDownloadFile(t, r).then(n).catch((i) => n().catch((o) => {
      try {
        this.logger.error(`cannot close files: ${o}`);
      } catch (a) {
        try {
          console.error(a);
        } catch {
        }
      }
      throw i;
    }).then(() => {
      throw i;
    }));
  }
  async doDownloadFile(t, r) {
    const n = await (0, Hs.open)(this.options.oldFile, "r");
    r.push({ descriptor: n, path: this.options.oldFile });
    const i = await (0, Hs.open)(this.options.newFile, "w");
    r.push({ descriptor: i, path: this.options.newFile });
    const o = (0, ST.createWriteStream)(this.options.newFile, { fd: i });
    await new Promise((a, s) => {
      const c = [];
      let f;
      if (!this.options.isUseMultipleRangeRequest && this.options.onProgress) {
        const v = [];
        let S = 0;
        for (const R of t)
          R.kind === jo.OperationKind.DOWNLOAD && (v.push(R.end - R.start), S += R.end - R.start);
        const C = {
          expectedByteCounts: v,
          grandTotal: S
        };
        f = new TT.ProgressDifferentialDownloadCallbackTransform(C, this.options.cancellationToken, this.options.onProgress), c.push(f);
      }
      const l = new gi.DigestTransform(this.blockAwareFileInfo.sha512);
      l.isValidateOnEnd = !1, c.push(l), o.on("finish", () => {
        o.close(() => {
          r.splice(1, 1);
          try {
            l.validate();
          } catch (v) {
            s(v);
            return;
          }
          a(void 0);
        });
      }), c.push(o);
      let u = null;
      for (const v of c)
        v.on("error", s), u == null ? u = v : u = u.pipe(v);
      const d = c[0];
      let h;
      if (this.options.isUseMultipleRangeRequest) {
        h = (0, wd.executeTasksUsingMultipleRangeRequests)(this, t, d, n, s), h(0);
        return;
      }
      let y = 0, g = null;
      this.logger.info(`Differential download: ${this.options.newUrl}`);
      const $ = this.createRequestOptions();
      $.redirect = "manual", h = (v) => {
        var S, C;
        if (v >= t.length) {
          this.fileMetadataBuffer != null && d.write(this.fileMetadataBuffer), d.end();
          return;
        }
        const R = t[v++];
        if (R.kind === jo.OperationKind.COPY) {
          f && f.beginFileCopy(), (0, bT.copyData)(R, d, n, s, () => h(v));
          return;
        }
        const M = `bytes=${R.start}-${R.end - 1}`;
        $.headers.range = M, (C = (S = this.logger) === null || S === void 0 ? void 0 : S.debug) === null || C === void 0 || C.call(S, `download range: ${M}`), f && f.beginRangeDownload();
        const I = this.httpExecutor.createRequest($, (L) => {
          L.on("error", s), L.on("aborted", () => {
            s(new Error("response has been aborted by the server"));
          }), L.statusCode >= 400 && s((0, gi.createHttpError)(L)), L.pipe(d, {
            end: !1
          }), L.once("end", () => {
            f && f.endRangeDownload(), ++y === 100 ? (y = 0, setTimeout(() => h(v), 1e3)) : h(v);
          });
        });
        I.on("redirect", (L, B, w) => {
          this.logger.info(`Redirect to ${OT(w)}`), g = w, (0, gi.configureRequestUrl)(new PT.URL(g), $), I.followRedirect();
        }), this.httpExecutor.addErrorAndTimeoutHandlers(I, s), I.end();
      }, h(0);
    });
  }
  async readRemoteBytes(t, r) {
    const n = Buffer.allocUnsafe(r + 1 - t), i = this.createRequestOptions();
    i.headers.range = `bytes=${t}-${r}`;
    let o = 0;
    if (await this.request(i, (a) => {
      a.copy(n, o), o += a.length;
    }), o !== n.length)
      throw new Error(`Received data length ${o} is not equal to expected ${n.length}`);
    return n;
  }
  request(t, r) {
    return new Promise((n, i) => {
      const o = this.httpExecutor.createRequest(t, (a) => {
        (0, wd.checkIsRangesSupported)(a, i) && (a.on("error", i), a.on("aborted", () => {
          i(new Error("response has been aborted by the server"));
        }), a.on("data", r), a.on("end", () => n()));
      });
      this.httpExecutor.addErrorAndTimeoutHandlers(o, i), o.end();
    });
  }
}
ho.DifferentialDownloader = AT;
function Ed(e, t = " KB") {
  return new Intl.NumberFormat("en").format((e / 1024).toFixed(2)) + t;
}
function OT(e) {
  const t = e.indexOf("?");
  return t < 0 ? e : e.substring(0, t);
}
Object.defineProperty(za, "__esModule", { value: !0 });
za.GenericDifferentialDownloader = void 0;
const CT = ho;
class IT extends CT.DifferentialDownloader {
  download(t, r) {
    return this.doDownload(t, r);
  }
}
za.GenericDifferentialDownloader = IT;
var Sd;
function ll() {
  if (Sd) return Br;
  Sd = 1, Object.defineProperty(Br, "__esModule", { value: !0 }), Br.NoOpLogger = Br.AppUpdater = void 0;
  const e = Fe, t = eo, r = ba, n = Hh, i = Ir, o = qe, a = Fa, s = ce, c = sl, f = uo, l = qa, u = Hm, d = fo, h = Kn(), y = Ha, g = Vh, $ = _t, v = za;
  let S = class Xm extends n.EventEmitter {
    /**
     * Get the update channel. Doesn't return `channel` from the update configuration, only if was previously set.
     */
    get channel() {
      return this._channel;
    }
    /**
     * Set the update channel. Overrides `channel` in the update configuration.
     *
     * `allowDowngrade` will be automatically set to `true`. If this behavior is not suitable for you, simple set `allowDowngrade` explicitly after.
     */
    set channel(I) {
      if (this._channel != null) {
        if (typeof I != "string")
          throw (0, e.newError)(`Channel must be a string, but got: ${I}`, "ERR_UPDATER_INVALID_CHANNEL");
        if (I.length === 0)
          throw (0, e.newError)("Channel must be not an empty string", "ERR_UPDATER_INVALID_CHANNEL");
      }
      this._channel = I, this.allowDowngrade = !0;
    }
    /**
     *  Shortcut for explicitly adding auth tokens to request headers
     */
    addAuthHeader(I) {
      this.requestHeaders = Object.assign({}, this.requestHeaders, {
        authorization: I
      });
    }
    // noinspection JSMethodCanBeStatic,JSUnusedGlobalSymbols
    get netSession() {
      return (0, u.getNetSession)();
    }
    /**
     * The logger. You can pass [electron-log](https://github.com/megahertz/electron-log), [winston](https://github.com/winstonjs/winston) or another logger with the following interface: `{ info(), warn(), error() }`.
     * Set it to `null` if you would like to disable a logging feature.
     */
    get logger() {
      return this._logger;
    }
    set logger(I) {
      this._logger = I ?? new R();
    }
    // noinspection JSUnusedGlobalSymbols
    /**
     * test only
     * @private
     */
    set updateConfigPath(I) {
      this.clientPromise = null, this._appUpdateConfigPath = I, this.configOnDisk = new a.Lazy(() => this.loadUpdateConfig());
    }
    constructor(I, L) {
      super(), this.autoDownload = !0, this.autoInstallOnAppQuit = !0, this.autoRunAppAfterInstall = !0, this.allowPrerelease = !1, this.fullChangelog = !1, this.allowDowngrade = !1, this.disableWebInstaller = !1, this.disableDifferentialDownload = !1, this.forceDevUpdateConfig = !1, this._channel = null, this.downloadedUpdateHelper = null, this.requestHeaders = null, this._logger = console, this.signals = new h.UpdaterSignal(this), this._appUpdateConfigPath = null, this.clientPromise = null, this.stagingUserIdPromise = new a.Lazy(() => this.getOrCreateStagingUserId()), this.configOnDisk = new a.Lazy(() => this.loadUpdateConfig()), this.checkForUpdatesPromise = null, this.downloadPromise = null, this.updateInfoAndProvider = null, this._testOnlyOptions = null, this.on("error", (K) => {
        this._logger.error(`Error: ${K.stack || K.message}`);
      }), L == null ? (this.app = new l.ElectronAppAdapter(), this.httpExecutor = new u.ElectronHttpExecutor((K, q) => this.emit("login", K, q))) : (this.app = L, this.httpExecutor = null);
      const B = this.app.version, w = (0, c.parse)(B);
      if (w == null)
        throw (0, e.newError)(`App version is not a valid semver version: "${B}"`, "ERR_UPDATER_INVALID_VERSION");
      this.currentVersion = w, this.allowPrerelease = C(w), I != null && (this.setFeedURL(I), typeof I != "string" && I.requestHeaders && (this.requestHeaders = I.requestHeaders));
    }
    //noinspection JSMethodCanBeStatic,JSUnusedGlobalSymbols
    getFeedURL() {
      return "Deprecated. Do not use it.";
    }
    /**
     * Configure update provider. If value is `string`, [GenericServerOptions](./publish.md#genericserveroptions) will be set with value as `url`.
     * @param options If you want to override configuration in the `app-update.yml`.
     */
    setFeedURL(I) {
      const L = this.createProviderRuntimeOptions();
      let B;
      typeof I == "string" ? B = new d.GenericProvider({ provider: "generic", url: I }, this, {
        ...L,
        isUseMultipleRangeRequest: (0, y.isUrlProbablySupportMultiRangeRequests)(I)
      }) : B = (0, y.createClient)(I, this, L), this.clientPromise = Promise.resolve(B);
    }
    /**
     * Asks the server whether there is an update.
     */
    checkForUpdates() {
      if (!this.isUpdaterActive())
        return Promise.resolve(null);
      let I = this.checkForUpdatesPromise;
      if (I != null)
        return this._logger.info("Checking for update (already in progress)"), I;
      const L = () => this.checkForUpdatesPromise = null;
      return this._logger.info("Checking for update"), I = this.doCheckForUpdates().then((B) => (L(), B)).catch((B) => {
        throw L(), this.emit("error", B, `Cannot check for updates: ${(B.stack || B).toString()}`), B;
      }), this.checkForUpdatesPromise = I, I;
    }
    isUpdaterActive() {
      return this.app.isPackaged || this.forceDevUpdateConfig ? !0 : (this._logger.info("Skip checkForUpdates because application is not packed and dev update config is not forced"), !1);
    }
    // noinspection JSUnusedGlobalSymbols
    checkForUpdatesAndNotify(I) {
      return this.checkForUpdates().then((L) => L != null && L.downloadPromise ? (L.downloadPromise.then(() => {
        const B = Xm.formatDownloadNotification(L.updateInfo.version, this.app.name, I);
        new Xt.Notification(B).show();
      }), L) : (this._logger.debug != null && this._logger.debug("checkForUpdatesAndNotify called, downloadPromise is null"), L));
    }
    static formatDownloadNotification(I, L, B) {
      return B == null && (B = {
        title: "A new update is ready to install",
        body: "{appName} version {version} has been downloaded and will be automatically installed on exit"
      }), B = {
        title: B.title.replace("{appName}", L).replace("{version}", I),
        body: B.body.replace("{appName}", L).replace("{version}", I)
      }, B;
    }
    async isStagingMatch(I) {
      const L = I.stagingPercentage;
      let B = L;
      if (B == null)
        return !0;
      if (B = parseInt(B, 10), isNaN(B))
        return this._logger.warn(`Staging percentage is NaN: ${L}`), !0;
      B = B / 100;
      const w = await this.stagingUserIdPromise.value, q = e.UUID.parse(w).readUInt32BE(12) / 4294967295;
      return this._logger.info(`Staging percentage: ${B}, percentage: ${q}, user id: ${w}`), q < B;
    }
    computeFinalHeaders(I) {
      return this.requestHeaders != null && Object.assign(I, this.requestHeaders), I;
    }
    async isUpdateAvailable(I) {
      const L = (0, c.parse)(I.version);
      if (L == null)
        throw (0, e.newError)(`This file could not be downloaded, or the latest version (from update server) does not have a valid semver version: "${I.version}"`, "ERR_UPDATER_INVALID_VERSION");
      const B = this.currentVersion;
      if ((0, c.eq)(L, B))
        return !1;
      const w = I == null ? void 0 : I.minimumSystemVersion, K = (0, r.release)();
      if (w)
        try {
          if ((0, c.lt)(K, w))
            return this._logger.info(`Current OS version ${K} is less than the minimum OS version required ${w} for version ${K}`), !1;
        } catch (k) {
          this._logger.warn(`Failed to compare current OS version(${K}) with minimum OS version(${w}): ${(k.message || k).toString()}`);
        }
      if (!await this.isStagingMatch(I))
        return !1;
      const z = (0, c.gt)(L, B), X = (0, c.lt)(L, B);
      return z ? !0 : this.allowDowngrade && X;
    }
    async getUpdateInfoAndProvider() {
      await this.app.whenReady(), this.clientPromise == null && (this.clientPromise = this.configOnDisk.value.then((B) => (0, y.createClient)(B, this, this.createProviderRuntimeOptions())));
      const I = await this.clientPromise, L = await this.stagingUserIdPromise.value;
      return I.setRequestHeaders(this.computeFinalHeaders({ "x-user-staging-id": L })), {
        info: await I.getLatestVersion(),
        provider: I
      };
    }
    createProviderRuntimeOptions() {
      return {
        isUseMultipleRangeRequest: !0,
        platform: this._testOnlyOptions == null ? process.platform : this._testOnlyOptions.platform,
        executor: this.httpExecutor
      };
    }
    async doCheckForUpdates() {
      this.emit("checking-for-update");
      const I = await this.getUpdateInfoAndProvider(), L = I.info;
      if (!await this.isUpdateAvailable(L))
        return this._logger.info(`Update for version ${this.currentVersion.format()} is not available (latest version: ${L.version}, downgrade is ${this.allowDowngrade ? "allowed" : "disallowed"}).`), this.emit("update-not-available", L), {
          versionInfo: L,
          updateInfo: L
        };
      this.updateInfoAndProvider = I, this.onUpdateAvailable(L);
      const B = new e.CancellationToken();
      return {
        versionInfo: L,
        updateInfo: L,
        cancellationToken: B,
        downloadPromise: this.autoDownload ? this.downloadUpdate(B) : null
      };
    }
    onUpdateAvailable(I) {
      this._logger.info(`Found version ${I.version} (url: ${(0, e.asArray)(I.files).map((L) => L.url).join(", ")})`), this.emit("update-available", I);
    }
    /**
     * Start downloading update manually. You can use this method if `autoDownload` option is set to `false`.
     * @returns {Promise<Array<string>>} Paths to downloaded files.
     */
    downloadUpdate(I = new e.CancellationToken()) {
      const L = this.updateInfoAndProvider;
      if (L == null) {
        const w = new Error("Please check update first");
        return this.dispatchError(w), Promise.reject(w);
      }
      if (this.downloadPromise != null)
        return this._logger.info("Downloading update (already in progress)"), this.downloadPromise;
      this._logger.info(`Downloading update from ${(0, e.asArray)(L.info.files).map((w) => w.url).join(", ")}`);
      const B = (w) => {
        if (!(w instanceof e.CancellationError))
          try {
            this.dispatchError(w);
          } catch (K) {
            this._logger.warn(`Cannot dispatch error event: ${K.stack || K}`);
          }
        return w;
      };
      return this.downloadPromise = this.doDownloadUpdate({
        updateInfoAndProvider: L,
        requestHeaders: this.computeRequestHeaders(L.provider),
        cancellationToken: I,
        disableWebInstaller: this.disableWebInstaller,
        disableDifferentialDownload: this.disableDifferentialDownload
      }).catch((w) => {
        throw B(w);
      }).finally(() => {
        this.downloadPromise = null;
      }), this.downloadPromise;
    }
    dispatchError(I) {
      this.emit("error", I, (I.stack || I).toString());
    }
    dispatchUpdateDownloaded(I) {
      this.emit(h.UPDATE_DOWNLOADED, I);
    }
    async loadUpdateConfig() {
      return this._appUpdateConfigPath == null && (this._appUpdateConfigPath = this.app.appUpdateConfigPath), (0, o.load)(await (0, i.readFile)(this._appUpdateConfigPath, "utf-8"));
    }
    computeRequestHeaders(I) {
      const L = I.fileExtraDownloadHeaders;
      if (L != null) {
        const B = this.requestHeaders;
        return B == null ? L : {
          ...L,
          ...B
        };
      }
      return this.computeFinalHeaders({ accept: "*/*" });
    }
    async getOrCreateStagingUserId() {
      const I = s.join(this.app.userDataPath, ".updaterId");
      try {
        const B = await (0, i.readFile)(I, "utf-8");
        if (e.UUID.check(B))
          return B;
        this._logger.warn(`Staging user id file exists, but content was invalid: ${B}`);
      } catch (B) {
        B.code !== "ENOENT" && this._logger.warn(`Couldn't read staging user ID, creating a blank one: ${B}`);
      }
      const L = e.UUID.v5((0, t.randomBytes)(4096), e.UUID.OID);
      this._logger.info(`Generated new staging user ID: ${L}`);
      try {
        await (0, i.outputFile)(I, L);
      } catch (B) {
        this._logger.warn(`Couldn't write out staging user ID: ${B}`);
      }
      return L;
    }
    /** @internal */
    get isAddNoCacheQuery() {
      const I = this.requestHeaders;
      if (I == null)
        return !0;
      for (const L of Object.keys(I)) {
        const B = L.toLowerCase();
        if (B === "authorization" || B === "private-token")
          return !1;
      }
      return !0;
    }
    async getOrCreateDownloadHelper() {
      let I = this.downloadedUpdateHelper;
      if (I == null) {
        const L = (await this.configOnDisk.value).updaterCacheDirName, B = this._logger;
        L == null && B.error("updaterCacheDirName is not specified in app-update.yml Was app build using at least electron-builder 20.34.0?");
        const w = s.join(this.app.baseCachePath, L || this.app.name);
        B.debug != null && B.debug(`updater cache dir: ${w}`), I = new f.DownloadedUpdateHelper(w), this.downloadedUpdateHelper = I;
      }
      return I;
    }
    async executeDownload(I) {
      const L = I.fileInfo, B = {
        headers: I.downloadUpdateOptions.requestHeaders,
        cancellationToken: I.downloadUpdateOptions.cancellationToken,
        sha2: L.info.sha2,
        sha512: L.info.sha512
      };
      this.listenerCount(h.DOWNLOAD_PROGRESS) > 0 && (B.onProgress = (A) => this.emit(h.DOWNLOAD_PROGRESS, A));
      const w = I.downloadUpdateOptions.updateInfoAndProvider.info, K = w.version, q = L.packageInfo;
      function z() {
        const A = decodeURIComponent(I.fileInfo.url.pathname);
        return A.endsWith(`.${I.fileExtension}`) ? s.basename(A) : I.fileInfo.info.url;
      }
      const X = await this.getOrCreateDownloadHelper(), k = X.cacheDirForPendingUpdate;
      await (0, i.mkdir)(k, { recursive: !0 });
      const F = z();
      let G = s.join(k, F);
      const x = q == null ? null : s.join(k, `package-${K}${s.extname(q.path) || ".7z"}`), W = async (A) => (await X.setDownloadedFile(G, x, w, L, F, A), await I.done({
        ...w,
        downloadedFile: G
      }), x == null ? [G] : [G, x]), V = this._logger, U = await X.validateDownloadedPath(G, w, L, V);
      if (U != null)
        return G = U, await W(!1);
      const T = async () => (await X.clear().catch(() => {
      }), await (0, i.unlink)(G).catch(() => {
      })), N = await (0, f.createTempUpdateFile)(`temp-${F}`, k, V);
      try {
        await I.task(N, B, x, T), await (0, e.retry)(() => (0, i.rename)(N, G), 60, 500, 0, 0, (A) => A instanceof Error && /^EBUSY:/.test(A.message));
      } catch (A) {
        throw await T(), A instanceof e.CancellationError && (V.info("cancelled"), this.emit("update-cancelled", w)), A;
      }
      return V.info(`New version ${K} has been downloaded to ${G}`), await W(!0);
    }
    async differentialDownloadInstaller(I, L, B, w, K) {
      try {
        if (this._testOnlyOptions != null && !this._testOnlyOptions.isUseDifferentialDownload)
          return !0;
        const q = (0, $.blockmapFiles)(I.url, this.app.version, L.updateInfoAndProvider.info.version);
        this._logger.info(`Download block maps (old: "${q[0]}", new: ${q[1]})`);
        const z = async (F) => {
          const G = await this.httpExecutor.downloadToBuffer(F, {
            headers: L.requestHeaders,
            cancellationToken: L.cancellationToken
          });
          if (G == null || G.length === 0)
            throw new Error(`Blockmap "${F.href}" is empty`);
          try {
            return JSON.parse((0, g.gunzipSync)(G).toString());
          } catch (x) {
            throw new Error(`Cannot parse blockmap "${F.href}", error: ${x}`);
          }
        }, X = {
          newUrl: I.url,
          oldFile: s.join(this.downloadedUpdateHelper.cacheDir, K),
          logger: this._logger,
          newFile: B,
          isUseMultipleRangeRequest: w.isUseMultipleRangeRequest,
          requestHeaders: L.requestHeaders,
          cancellationToken: L.cancellationToken
        };
        this.listenerCount(h.DOWNLOAD_PROGRESS) > 0 && (X.onProgress = (F) => this.emit(h.DOWNLOAD_PROGRESS, F));
        const k = await Promise.all(q.map((F) => z(F)));
        return await new v.GenericDifferentialDownloader(I.info, this.httpExecutor, X).download(k[0], k[1]), !1;
      } catch (q) {
        if (this._logger.error(`Cannot download differentially, fallback to full download: ${q.stack || q}`), this._testOnlyOptions != null)
          throw q;
        return !0;
      }
    }
  };
  Br.AppUpdater = S;
  function C(M) {
    const I = (0, c.prerelease)(M);
    return I != null && I.length > 0;
  }
  class R {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    info(I) {
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    warn(I) {
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    error(I) {
    }
  }
  return Br.NoOpLogger = R, Br;
}
var bd;
function po() {
  if (bd) return pi;
  bd = 1, Object.defineProperty(pi, "__esModule", { value: !0 }), pi.BaseUpdater = void 0;
  const e = ro, t = ll();
  let r = class extends t.AppUpdater {
    constructor(i, o) {
      super(i, o), this.quitAndInstallCalled = !1, this.quitHandlerAdded = !1;
    }
    quitAndInstall(i = !1, o = !1) {
      this._logger.info("Install on explicit quitAndInstall"), this.install(i, i ? o : this.autoRunAppAfterInstall) ? setImmediate(() => {
        Xt.autoUpdater.emit("before-quit-for-update"), this.app.quit();
      }) : this.quitAndInstallCalled = !1;
    }
    executeDownload(i) {
      return super.executeDownload({
        ...i,
        done: (o) => (this.dispatchUpdateDownloaded(o), this.addQuitHandler(), Promise.resolve())
      });
    }
    // must be sync (because quit even handler is not async)
    install(i = !1, o = !1) {
      if (this.quitAndInstallCalled)
        return this._logger.warn("install call ignored: quitAndInstallCalled is set to true"), !1;
      const a = this.downloadedUpdateHelper, s = a && a.file ? process.platform === "linux" ? a.file.replace(/ /g, "\\ ") : a.file : null, c = a == null ? null : a.downloadedFileInfo;
      if (s == null || c == null)
        return this.dispatchError(new Error("No valid update available, can't quit and install")), !1;
      this.quitAndInstallCalled = !0;
      try {
        return this._logger.info(`Install: isSilent: ${i}, isForceRunAfter: ${o}`), this.doInstall({
          installerPath: s,
          isSilent: i,
          isForceRunAfter: o,
          isAdminRightsRequired: c.isAdminRightsRequired
        });
      } catch (f) {
        return this.dispatchError(f), !1;
      }
    }
    addQuitHandler() {
      this.quitHandlerAdded || !this.autoInstallOnAppQuit || (this.quitHandlerAdded = !0, this.app.onQuit((i) => {
        if (this.quitAndInstallCalled) {
          this._logger.info("Update installer has already been triggered. Quitting application.");
          return;
        }
        if (!this.autoInstallOnAppQuit) {
          this._logger.info("Update will not be installed on quit because autoInstallOnAppQuit is set to false.");
          return;
        }
        if (i !== 0) {
          this._logger.info(`Update will be not installed on quit because application is quitting with exit code ${i}`);
          return;
        }
        this._logger.info("Auto install update on quit"), this.install(!0, !1);
      }));
    }
    wrapSudo() {
      const { name: i } = this.app, o = `"${i} would like to update"`, a = this.spawnSyncLog("which gksudo || which kdesudo || which pkexec || which beesu"), s = [a];
      return /kdesudo/i.test(a) ? (s.push("--comment", o), s.push("-c")) : /gksudo/i.test(a) ? s.push("--message", o) : /pkexec/i.test(a) && s.push("--disable-internal-agent"), s.join(" ");
    }
    spawnSyncLog(i, o = [], a = {}) {
      return this._logger.info(`Executing: ${i} with args: ${o}`), (0, e.spawnSync)(i, o, {
        env: { ...process.env, ...a },
        encoding: "utf-8",
        shell: !0
      }).stdout.trim();
    }
    /**
     * This handles both node 8 and node 10 way of emitting error when spawning a process
     *   - node 8: Throws the error
     *   - node 10: Emit the error(Need to listen with on)
     */
    // https://github.com/electron-userland/electron-builder/issues/1129
    // Node 8 sends errors: https://nodejs.org/dist/latest-v8.x/docs/api/errors.html#errors_common_system_errors
    async spawnLog(i, o = [], a = void 0, s = "ignore") {
      return this._logger.info(`Executing: ${i} with args: ${o}`), new Promise((c, f) => {
        try {
          const l = { stdio: s, env: a, detached: !0 }, u = (0, e.spawn)(i, o, l);
          u.on("error", (d) => {
            f(d);
          }), u.unref(), u.pid !== void 0 && c(!0);
        } catch (l) {
          f(l);
        }
      });
    }
  };
  return pi.BaseUpdater = r, pi;
}
var vi = {}, mo = {};
Object.defineProperty(mo, "__esModule", { value: !0 });
mo.FileWithEmbeddedBlockMapDifferentialDownloader = void 0;
const vn = Ir, RT = ho, NT = Vh;
class DT extends RT.DifferentialDownloader {
  async download() {
    const t = this.blockAwareFileInfo, r = t.size, n = r - (t.blockMapSize + 4);
    this.fileMetadataBuffer = await this.readRemoteBytes(n, r - 1);
    const i = Jm(this.fileMetadataBuffer.slice(0, this.fileMetadataBuffer.length - 4));
    await this.doDownload(await kT(this.options.oldFile), i);
  }
}
mo.FileWithEmbeddedBlockMapDifferentialDownloader = DT;
function Jm(e) {
  return JSON.parse((0, NT.inflateRawSync)(e).toString());
}
async function kT(e) {
  const t = await (0, vn.open)(e, "r");
  try {
    const r = (await (0, vn.fstat)(t)).size, n = Buffer.allocUnsafe(4);
    await (0, vn.read)(t, n, 0, n.length, r - n.length);
    const i = Buffer.allocUnsafe(n.readUInt32BE(0));
    return await (0, vn.read)(t, i, 0, i.length, r - n.length - i.length), await (0, vn.close)(t), Jm(i);
  } catch (r) {
    throw await (0, vn.close)(t), r;
  }
}
var Pd;
function Td() {
  if (Pd) return vi;
  Pd = 1, Object.defineProperty(vi, "__esModule", { value: !0 }), vi.AppImageUpdater = void 0;
  const e = Fe, t = ro, r = Ir, n = Cr, i = ce, o = po(), a = mo, s = Kn(), c = Le;
  let f = class extends o.BaseUpdater {
    constructor(u, d) {
      super(u, d);
    }
    isUpdaterActive() {
      return process.env.APPIMAGE == null ? (process.env.SNAP == null ? this._logger.warn("APPIMAGE env is not defined, current application is not an AppImage") : this._logger.info("SNAP env is defined, updater is disabled"), !1) : super.isUpdaterActive();
    }
    /*** @private */
    doDownloadUpdate(u) {
      const d = u.updateInfoAndProvider.provider, h = (0, c.findFile)(d.resolveFiles(u.updateInfoAndProvider.info), "AppImage", ["rpm", "deb"]);
      return this.executeDownload({
        fileExtension: "AppImage",
        fileInfo: h,
        downloadUpdateOptions: u,
        task: async (y, g) => {
          const $ = process.env.APPIMAGE;
          if ($ == null)
            throw (0, e.newError)("APPIMAGE env is not defined", "ERR_UPDATER_OLD_FILE_NOT_FOUND");
          let v = !1;
          try {
            const S = {
              newUrl: h.url,
              oldFile: $,
              logger: this._logger,
              newFile: y,
              isUseMultipleRangeRequest: d.isUseMultipleRangeRequest,
              requestHeaders: u.requestHeaders,
              cancellationToken: u.cancellationToken
            };
            this.listenerCount(s.DOWNLOAD_PROGRESS) > 0 && (S.onProgress = (C) => this.emit(s.DOWNLOAD_PROGRESS, C)), await new a.FileWithEmbeddedBlockMapDifferentialDownloader(h.info, this.httpExecutor, S).download();
          } catch (S) {
            this._logger.error(`Cannot download differentially, fallback to full download: ${S.stack || S}`), v = process.platform === "linux";
          }
          v && await this.httpExecutor.download(h.url, y, g), await (0, r.chmod)(y, 493);
        }
      });
    }
    doInstall(u) {
      const d = process.env.APPIMAGE;
      if (d == null)
        throw (0, e.newError)("APPIMAGE env is not defined", "ERR_UPDATER_OLD_FILE_NOT_FOUND");
      (0, n.unlinkSync)(d);
      let h;
      const y = i.basename(d);
      i.basename(u.installerPath) === y || !/\d+\.\d+\.\d+/.test(y) ? h = d : h = i.join(i.dirname(d), i.basename(u.installerPath)), (0, t.execFileSync)("mv", ["-f", u.installerPath, h]), h !== d && this.emit("appimage-filename-updated", h);
      const g = {
        ...process.env,
        APPIMAGE_SILENT_INSTALL: "true"
      };
      return u.isForceRunAfter ? this.spawnLog(h, [], g) : (g.APPIMAGE_EXIT_AFTER_INSTALL = "true", (0, t.execFileSync)(h, [], { env: g })), !0;
    }
  };
  return vi.AppImageUpdater = f, vi;
}
var $i = {}, Ad;
function Od() {
  if (Ad) return $i;
  Ad = 1, Object.defineProperty($i, "__esModule", { value: !0 }), $i.DebUpdater = void 0;
  const e = po(), t = Kn(), r = Le;
  let n = class extends e.BaseUpdater {
    constructor(o, a) {
      super(o, a);
    }
    /*** @private */
    doDownloadUpdate(o) {
      const a = o.updateInfoAndProvider.provider, s = (0, r.findFile)(a.resolveFiles(o.updateInfoAndProvider.info), "deb", ["AppImage", "rpm"]);
      return this.executeDownload({
        fileExtension: "deb",
        fileInfo: s,
        downloadUpdateOptions: o,
        task: async (c, f) => {
          this.listenerCount(t.DOWNLOAD_PROGRESS) > 0 && (f.onProgress = (l) => this.emit(t.DOWNLOAD_PROGRESS, l)), await this.httpExecutor.download(s.url, c, f);
        }
      });
    }
    doInstall(o) {
      const a = this.wrapSudo(), s = /pkexec/i.test(a) ? "" : '"', c = ["dpkg", "-i", o.installerPath, "||", "apt-get", "install", "-f", "-y"];
      return this.spawnSyncLog(a, [`${s}/bin/bash`, "-c", `'${c.join(" ")}'${s}`]), o.isForceRunAfter && this.app.relaunch(), !0;
    }
  };
  return $i.DebUpdater = n, $i;
}
var _i = {}, Cd;
function Id() {
  if (Cd) return _i;
  Cd = 1, Object.defineProperty(_i, "__esModule", { value: !0 }), _i.RpmUpdater = void 0;
  const e = po(), t = Kn(), r = Le;
  let n = class extends e.BaseUpdater {
    constructor(o, a) {
      super(o, a);
    }
    /*** @private */
    doDownloadUpdate(o) {
      const a = o.updateInfoAndProvider.provider, s = (0, r.findFile)(a.resolveFiles(o.updateInfoAndProvider.info), "rpm", ["AppImage", "deb"]);
      return this.executeDownload({
        fileExtension: "rpm",
        fileInfo: s,
        downloadUpdateOptions: o,
        task: async (c, f) => {
          this.listenerCount(t.DOWNLOAD_PROGRESS) > 0 && (f.onProgress = (l) => this.emit(t.DOWNLOAD_PROGRESS, l)), await this.httpExecutor.download(s.url, c, f);
        }
      });
    }
    doInstall(o) {
      const a = o.installerPath, s = this.wrapSudo(), c = /pkexec/i.test(s) ? "" : '"', f = this.spawnSyncLog("which zypper");
      let l;
      return f ? l = [f, "--no-refresh", "install", "--allow-unsigned-rpm", "-y", "-f", a] : l = [this.spawnSyncLog("which dnf || which yum"), "-y", "install", a], this.spawnSyncLog(s, [`${c}/bin/bash`, "-c", `'${l.join(" ")}'${c}`]), o.isForceRunAfter && this.app.relaunch(), !0;
    }
  };
  return _i.RpmUpdater = n, _i;
}
var wi = {}, Rd;
function Nd() {
  if (Rd) return wi;
  Rd = 1, Object.defineProperty(wi, "__esModule", { value: !0 }), wi.MacUpdater = void 0;
  const e = Fe, t = Ir, r = Cr, n = ce, i = Q0, o = ll(), a = Le, s = ro, c = eo;
  let f = class extends o.AppUpdater {
    constructor(u, d) {
      super(u, d), this.nativeUpdater = Xt.autoUpdater, this.squirrelDownloadedUpdate = !1, this.nativeUpdater.on("error", (h) => {
        this._logger.warn(h), this.emit("error", h);
      }), this.nativeUpdater.on("update-downloaded", () => {
        this.squirrelDownloadedUpdate = !0, this.debug("nativeUpdater.update-downloaded");
      });
    }
    debug(u) {
      this._logger.debug != null && this._logger.debug(u);
    }
    closeServerIfExists() {
      this.server && (this.debug("Closing proxy server"), this.server.close((u) => {
        u && this.debug("proxy server wasn't already open, probably attempted closing again as a safety check before quit");
      }));
    }
    async doDownloadUpdate(u) {
      let d = u.updateInfoAndProvider.provider.resolveFiles(u.updateInfoAndProvider.info);
      const h = this._logger, y = "sysctl.proc_translated";
      let g = !1;
      try {
        this.debug("Checking for macOS Rosetta environment"), g = (0, s.execFileSync)("sysctl", [y], { encoding: "utf8" }).includes(`${y}: 1`), h.info(`Checked for macOS Rosetta environment (isRosetta=${g})`);
      } catch (M) {
        h.warn(`sysctl shell command to check for macOS Rosetta environment failed: ${M}`);
      }
      let $ = !1;
      try {
        this.debug("Checking for arm64 in uname");
        const I = (0, s.execFileSync)("uname", ["-a"], { encoding: "utf8" }).includes("ARM");
        h.info(`Checked 'uname -a': arm64=${I}`), $ = $ || I;
      } catch (M) {
        h.warn(`uname shell command to check for arm64 failed: ${M}`);
      }
      $ = $ || process.arch === "arm64" || g;
      const v = (M) => {
        var I;
        return M.url.pathname.includes("arm64") || ((I = M.info.url) === null || I === void 0 ? void 0 : I.includes("arm64"));
      };
      $ && d.some(v) ? d = d.filter((M) => $ === v(M)) : d = d.filter((M) => !v(M));
      const S = (0, a.findFile)(d, "zip", ["pkg", "dmg"]);
      if (S == null)
        throw (0, e.newError)(`ZIP file not provided: ${(0, e.safeStringifyJson)(d)}`, "ERR_UPDATER_ZIP_FILE_NOT_FOUND");
      const C = u.updateInfoAndProvider.provider, R = "update.zip";
      return this.executeDownload({
        fileExtension: "zip",
        fileInfo: S,
        downloadUpdateOptions: u,
        task: async (M, I) => {
          const L = n.join(this.downloadedUpdateHelper.cacheDir, R), B = () => (0, t.pathExistsSync)(L) ? !u.disableDifferentialDownload : (h.info("Unable to locate previous update.zip for differential download (is this first install?), falling back to full download"), !1);
          let w = !0;
          B() && (w = await this.differentialDownloadInstaller(S, u, M, C, R)), w && await this.httpExecutor.download(S.url, M, I);
        },
        done: (M) => {
          if (!u.disableDifferentialDownload)
            try {
              const I = n.join(this.downloadedUpdateHelper.cacheDir, R);
              (0, r.copyFileSync)(M.downloadedFile, I);
            } catch (I) {
              this._logger.warn(`Unable to copy file for caching for future differential downloads: ${I.message}`);
            }
          return this.updateDownloaded(S, M);
        }
      });
    }
    async updateDownloaded(u, d) {
      var h;
      const y = d.downloadedFile, g = (h = u.info.size) !== null && h !== void 0 ? h : (await (0, t.stat)(y)).size, $ = this._logger, v = `fileToProxy=${u.url.href}`;
      this.closeServerIfExists(), this.debug(`Creating proxy server for native Squirrel.Mac (${v})`), this.server = (0, i.createServer)(), this.debug(`Proxy server for native Squirrel.Mac is created (${v})`), this.server.on("close", () => {
        $.info(`Proxy server for native Squirrel.Mac is closed (${v})`);
      });
      const S = (C) => {
        const R = C.address();
        return typeof R == "string" ? R : `http://127.0.0.1:${R == null ? void 0 : R.port}`;
      };
      return await new Promise((C, R) => {
        const M = (0, c.randomBytes)(64).toString("base64").replace(/\//g, "_").replace(/\+/g, "-"), I = Buffer.from(`autoupdater:${M}`, "ascii"), L = `/${(0, c.randomBytes)(64).toString("hex")}.zip`;
        this.server.on("request", (B, w) => {
          const K = B.url;
          if ($.info(`${K} requested`), K === "/") {
            if (!B.headers.authorization || B.headers.authorization.indexOf("Basic ") === -1) {
              w.statusCode = 401, w.statusMessage = "Invalid Authentication Credentials", w.end(), $.warn("No authenthication info");
              return;
            }
            const X = B.headers.authorization.split(" ")[1], k = Buffer.from(X, "base64").toString("ascii"), [F, G] = k.split(":");
            if (F !== "autoupdater" || G !== M) {
              w.statusCode = 401, w.statusMessage = "Invalid Authentication Credentials", w.end(), $.warn("Invalid authenthication credentials");
              return;
            }
            const x = Buffer.from(`{ "url": "${S(this.server)}${L}" }`);
            w.writeHead(200, { "Content-Type": "application/json", "Content-Length": x.length }), w.end(x);
            return;
          }
          if (!K.startsWith(L)) {
            $.warn(`${K} requested, but not supported`), w.writeHead(404), w.end();
            return;
          }
          $.info(`${L} requested by Squirrel.Mac, pipe ${y}`);
          let q = !1;
          w.on("finish", () => {
            q || (this.nativeUpdater.removeListener("error", R), C([]));
          });
          const z = (0, r.createReadStream)(y);
          z.on("error", (X) => {
            try {
              w.end();
            } catch (k) {
              $.warn(`cannot end response: ${k}`);
            }
            q = !0, this.nativeUpdater.removeListener("error", R), R(new Error(`Cannot pipe "${y}": ${X}`));
          }), w.writeHead(200, {
            "Content-Type": "application/zip",
            "Content-Length": g
          }), z.pipe(w);
        }), this.debug(`Proxy server for native Squirrel.Mac is starting to listen (${v})`), this.server.listen(0, "127.0.0.1", () => {
          this.debug(`Proxy server for native Squirrel.Mac is listening (address=${S(this.server)}, ${v})`), this.nativeUpdater.setFeedURL({
            url: S(this.server),
            headers: {
              "Cache-Control": "no-cache",
              Authorization: `Basic ${I.toString("base64")}`
            }
          }), this.dispatchUpdateDownloaded(d), this.autoInstallOnAppQuit ? (this.nativeUpdater.once("error", R), this.nativeUpdater.checkForUpdates()) : C([]);
        });
      });
    }
    quitAndInstall() {
      this.squirrelDownloadedUpdate ? (this.nativeUpdater.quitAndInstall(), this.closeServerIfExists()) : (this.nativeUpdater.on("update-downloaded", () => {
        this.nativeUpdater.quitAndInstall(), this.closeServerIfExists();
      }), this.autoInstallOnAppQuit || this.nativeUpdater.checkForUpdates());
    }
  };
  return wi.MacUpdater = f, wi;
}
var Ei = {}, ul = {};
Object.defineProperty(ul, "__esModule", { value: !0 });
ul.verifySignature = LT;
const Dd = Fe, Qm = ro, FT = ba, kd = ce;
function LT(e, t, r) {
  return new Promise((n, i) => {
    const o = t.replace(/'/g, "''");
    r.info(`Verifying signature ${o}`), (0, Qm.execFile)('set "PSModulePath=" & chcp 65001 >NUL & powershell.exe', ["-NoProfile", "-NonInteractive", "-InputFormat", "None", "-Command", `"Get-AuthenticodeSignature -LiteralPath '${o}' | ConvertTo-Json -Compress"`], {
      shell: !0,
      timeout: 20 * 1e3
    }, (a, s, c) => {
      var f;
      try {
        if (a != null || c) {
          Bs(r, a, c, i), n(null);
          return;
        }
        const l = xT(s);
        if (l.Status === 0) {
          try {
            const y = kd.normalize(l.Path), g = kd.normalize(t);
            if (r.info(`LiteralPath: ${y}. Update Path: ${g}`), y !== g) {
              Bs(r, new Error(`LiteralPath of ${y} is different than ${g}`), c, i), n(null);
              return;
            }
          } catch (y) {
            r.warn(`Unable to verify LiteralPath of update asset due to missing data.Path. Skipping this step of validation. Message: ${(f = y.message) !== null && f !== void 0 ? f : y.stack}`);
          }
          const d = (0, Dd.parseDn)(l.SignerCertificate.Subject);
          let h = !1;
          for (const y of e) {
            const g = (0, Dd.parseDn)(y);
            if (g.size ? h = Array.from(g.keys()).every((v) => g.get(v) === d.get(v)) : y === d.get("CN") && (r.warn(`Signature validated using only CN ${y}. Please add your full Distinguished Name (DN) to publisherNames configuration`), h = !0), h) {
              n(null);
              return;
            }
          }
        }
        const u = `publisherNames: ${e.join(" | ")}, raw info: ` + JSON.stringify(l, (d, h) => d === "RawData" ? void 0 : h, 2);
        r.warn(`Sign verification failed, installer signed with incorrect certificate: ${u}`), n(u);
      } catch (l) {
        Bs(r, l, null, i), n(null);
        return;
      }
    });
  });
}
function xT(e) {
  const t = JSON.parse(e);
  delete t.PrivateKey, delete t.IsOSBinary, delete t.SignatureType;
  const r = t.SignerCertificate;
  return r != null && (delete r.Archived, delete r.Extensions, delete r.Handle, delete r.HasPrivateKey, delete r.SubjectName), t;
}
function Bs(e, t, r, n) {
  if (UT()) {
    e.warn(`Cannot execute Get-AuthenticodeSignature: ${t || r}. Ignoring signature validation due to unsupported powershell version. Please upgrade to powershell 3 or higher.`);
    return;
  }
  try {
    (0, Qm.execFileSync)("powershell.exe", ["-NoProfile", "-NonInteractive", "-Command", "ConvertTo-Json test"], { timeout: 10 * 1e3 });
  } catch (i) {
    e.warn(`Cannot execute ConvertTo-Json: ${i.message}. Ignoring signature validation due to unsupported powershell version. Please upgrade to powershell 3 or higher.`);
    return;
  }
  t != null && n(t), r && n(new Error(`Cannot execute Get-AuthenticodeSignature, stderr: ${r}. Failing signature validation due to unknown stderr.`));
}
function UT() {
  const e = FT.release();
  return e.startsWith("6.") && !e.startsWith("6.3");
}
var Fd;
function Ld() {
  if (Fd) return Ei;
  Fd = 1, Object.defineProperty(Ei, "__esModule", { value: !0 }), Ei.NsisUpdater = void 0;
  const e = Fe, t = ce, r = po(), n = mo, i = Kn(), o = Le, a = Ir, s = ul, c = Bn;
  let f = class extends r.BaseUpdater {
    constructor(u, d) {
      super(u, d), this._verifyUpdateCodeSignature = (h, y) => (0, s.verifySignature)(h, y, this._logger);
    }
    /**
     * The verifyUpdateCodeSignature. You can pass [win-verify-signature](https://github.com/beyondkmp/win-verify-trust) or another custom verify function: ` (publisherName: string[], path: string) => Promise<string | null>`.
     * The default verify function uses [windowsExecutableCodeSignatureVerifier](https://github.com/electron-userland/electron-builder/blob/master/packages/electron-updater/src/windowsExecutableCodeSignatureVerifier.ts)
     */
    get verifyUpdateCodeSignature() {
      return this._verifyUpdateCodeSignature;
    }
    set verifyUpdateCodeSignature(u) {
      u && (this._verifyUpdateCodeSignature = u);
    }
    /*** @private */
    doDownloadUpdate(u) {
      const d = u.updateInfoAndProvider.provider, h = (0, o.findFile)(d.resolveFiles(u.updateInfoAndProvider.info), "exe");
      return this.executeDownload({
        fileExtension: "exe",
        downloadUpdateOptions: u,
        fileInfo: h,
        task: async (y, g, $, v) => {
          const S = h.packageInfo, C = S != null && $ != null;
          if (C && u.disableWebInstaller)
            throw (0, e.newError)(`Unable to download new version ${u.updateInfoAndProvider.info.version}. Web Installers are disabled`, "ERR_UPDATER_WEB_INSTALLER_DISABLED");
          !C && !u.disableWebInstaller && this._logger.warn("disableWebInstaller is set to false, you should set it to true if you do not plan on using a web installer. This will default to true in a future version."), (C || u.disableDifferentialDownload || await this.differentialDownloadInstaller(h, u, y, d, e.CURRENT_APP_INSTALLER_FILE_NAME)) && await this.httpExecutor.download(h.url, y, g);
          const R = await this.verifySignature(y);
          if (R != null)
            throw await v(), (0, e.newError)(`New version ${u.updateInfoAndProvider.info.version} is not signed by the application owner: ${R}`, "ERR_UPDATER_INVALID_SIGNATURE");
          if (C && await this.differentialDownloadWebPackage(u, S, $, d))
            try {
              await this.httpExecutor.download(new c.URL(S.path), $, {
                headers: u.requestHeaders,
                cancellationToken: u.cancellationToken,
                sha512: S.sha512
              });
            } catch (M) {
              try {
                await (0, a.unlink)($);
              } catch {
              }
              throw M;
            }
        }
      });
    }
    // $certificateInfo = (Get-AuthenticodeSignature 'xxx\yyy.exe'
    // | where {$_.Status.Equals([System.Management.Automation.SignatureStatus]::Valid) -and $_.SignerCertificate.Subject.Contains("CN=siemens.com")})
    // | Out-String ; if ($certificateInfo) { exit 0 } else { exit 1 }
    async verifySignature(u) {
      let d;
      try {
        if (d = (await this.configOnDisk.value).publisherName, d == null)
          return null;
      } catch (h) {
        if (h.code === "ENOENT")
          return null;
        throw h;
      }
      return await this._verifyUpdateCodeSignature(Array.isArray(d) ? d : [d], u);
    }
    doInstall(u) {
      const d = ["--updated"];
      u.isSilent && d.push("/S"), u.isForceRunAfter && d.push("--force-run"), this.installDirectory && d.push(`/D=${this.installDirectory}`);
      const h = this.downloadedUpdateHelper == null ? null : this.downloadedUpdateHelper.packageFile;
      h != null && d.push(`--package-file=${h}`);
      const y = () => {
        this.spawnLog(t.join(process.resourcesPath, "elevate.exe"), [u.installerPath].concat(d)).catch((g) => this.dispatchError(g));
      };
      return u.isAdminRightsRequired ? (this._logger.info("isAdminRightsRequired is set to true, run installer using elevate.exe"), y(), !0) : (this.spawnLog(u.installerPath, d).catch((g) => {
        const $ = g.code;
        this._logger.info(`Cannot run installer: error code: ${$}, error message: "${g.message}", will be executed again using elevate if EACCES, and will try to use electron.shell.openItem if ENOENT`), $ === "UNKNOWN" || $ === "EACCES" ? y() : $ === "ENOENT" ? Xt.shell.openPath(u.installerPath).catch((v) => this.dispatchError(v)) : this.dispatchError(g);
      }), !0);
    }
    async differentialDownloadWebPackage(u, d, h, y) {
      if (d.blockMapSize == null)
        return !0;
      try {
        const g = {
          newUrl: new c.URL(d.path),
          oldFile: t.join(this.downloadedUpdateHelper.cacheDir, e.CURRENT_APP_PACKAGE_FILE_NAME),
          logger: this._logger,
          newFile: h,
          requestHeaders: this.requestHeaders,
          isUseMultipleRangeRequest: y.isUseMultipleRangeRequest,
          cancellationToken: u.cancellationToken
        };
        this.listenerCount(i.DOWNLOAD_PROGRESS) > 0 && (g.onProgress = ($) => this.emit(i.DOWNLOAD_PROGRESS, $)), await new n.FileWithEmbeddedBlockMapDifferentialDownloader(d, this.httpExecutor, g).download();
      } catch (g) {
        return this._logger.error(`Cannot download differentially, fallback to full download: ${g.stack || g}`), process.platform === "win32";
      }
      return !1;
    }
  };
  return Ei.NsisUpdater = f, Ei;
}
var xd;
function Kn() {
  return xd || (xd = 1, function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.UpdaterSignal = e.UPDATE_DOWNLOADED = e.DOWNLOAD_PROGRESS = e.NsisUpdater = e.MacUpdater = e.RpmUpdater = e.DebUpdater = e.AppImageUpdater = e.Provider = e.CancellationToken = e.NoOpLogger = e.AppUpdater = e.BaseUpdater = void 0;
    const t = Fe;
    Object.defineProperty(e, "CancellationToken", { enumerable: !0, get: function() {
      return t.CancellationToken;
    } });
    const r = Ir, n = ce;
    var i = po();
    Object.defineProperty(e, "BaseUpdater", { enumerable: !0, get: function() {
      return i.BaseUpdater;
    } });
    var o = ll();
    Object.defineProperty(e, "AppUpdater", { enumerable: !0, get: function() {
      return o.AppUpdater;
    } }), Object.defineProperty(e, "NoOpLogger", { enumerable: !0, get: function() {
      return o.NoOpLogger;
    } });
    var a = Le;
    Object.defineProperty(e, "Provider", { enumerable: !0, get: function() {
      return a.Provider;
    } });
    var s = Td();
    Object.defineProperty(e, "AppImageUpdater", { enumerable: !0, get: function() {
      return s.AppImageUpdater;
    } });
    var c = Od();
    Object.defineProperty(e, "DebUpdater", { enumerable: !0, get: function() {
      return c.DebUpdater;
    } });
    var f = Id();
    Object.defineProperty(e, "RpmUpdater", { enumerable: !0, get: function() {
      return f.RpmUpdater;
    } });
    var l = Nd();
    Object.defineProperty(e, "MacUpdater", { enumerable: !0, get: function() {
      return l.MacUpdater;
    } });
    var u = Ld();
    Object.defineProperty(e, "NsisUpdater", { enumerable: !0, get: function() {
      return u.NsisUpdater;
    } });
    let d;
    function h() {
      if (process.platform === "win32")
        d = new (Ld()).NsisUpdater();
      else if (process.platform === "darwin")
        d = new (Nd()).MacUpdater();
      else {
        d = new (Td()).AppImageUpdater();
        try {
          const $ = n.join(process.resourcesPath, "package-type");
          if (!(0, r.existsSync)($))
            return d;
          console.info("Checking for beta autoupdate feature for deb/rpm distributions");
          const v = (0, r.readFileSync)($).toString().trim();
          switch (console.info("Found package-type:", v), v) {
            case "deb":
              d = new (Od()).DebUpdater();
              break;
            case "rpm":
              d = new (Id()).RpmUpdater();
              break;
            default:
              break;
          }
        } catch ($) {
          console.warn("Unable to detect 'package-type' for autoUpdater (beta rpm/deb support). If you'd like to expand support, please consider contributing to electron-builder", $.message);
        }
      }
      return d;
    }
    Object.defineProperty(e, "autoUpdater", {
      enumerable: !0,
      get: () => d || h()
    }), e.DOWNLOAD_PROGRESS = "download-progress", e.UPDATE_DOWNLOADED = "update-downloaded";
    class y {
      constructor(v) {
        this.emitter = v;
      }
      /**
       * Emitted when an authenticating proxy is [asking for user credentials](https://github.com/electron/electron/blob/master/docs/api/client-request.md#event-login).
       */
      login(v) {
        g(this.emitter, "login", v);
      }
      progress(v) {
        g(this.emitter, e.DOWNLOAD_PROGRESS, v);
      }
      updateDownloaded(v) {
        g(this.emitter, e.UPDATE_DOWNLOADED, v);
      }
      updateCancelled(v) {
        g(this.emitter, "update-cancelled", v);
      }
    }
    e.UpdaterSignal = y;
    function g($, v, S) {
      $.on(v, S);
    }
  }(ys)), ys;
}
var xt = Kn(), ot = {};
(function(e) {
  const t = fe.fromCallback, r = Re, n = [
    "access",
    "appendFile",
    "chmod",
    "chown",
    "close",
    "copyFile",
    "cp",
    "fchmod",
    "fchown",
    "fdatasync",
    "fstat",
    "fsync",
    "ftruncate",
    "futimes",
    "glob",
    "lchmod",
    "lchown",
    "lutimes",
    "link",
    "lstat",
    "mkdir",
    "mkdtemp",
    "open",
    "opendir",
    "readdir",
    "readFile",
    "readlink",
    "realpath",
    "rename",
    "rm",
    "rmdir",
    "stat",
    "statfs",
    "symlink",
    "truncate",
    "unlink",
    "utimes",
    "writeFile"
  ].filter((i) => typeof r[i] == "function");
  Object.assign(e, r), n.forEach((i) => {
    e[i] = t(r[i]);
  }), e.exists = function(i, o) {
    return typeof o == "function" ? r.exists(i, o) : new Promise((a) => r.exists(i, a));
  }, e.read = function(i, o, a, s, c, f) {
    return typeof f == "function" ? r.read(i, o, a, s, c, f) : new Promise((l, u) => {
      r.read(i, o, a, s, c, (d, h, y) => {
        if (d) return u(d);
        l({ bytesRead: h, buffer: y });
      });
    });
  }, e.write = function(i, o, ...a) {
    return typeof a[a.length - 1] == "function" ? r.write(i, o, ...a) : new Promise((s, c) => {
      r.write(i, o, ...a, (f, l, u) => {
        if (f) return c(f);
        s({ bytesWritten: l, buffer: u });
      });
    });
  }, e.readv = function(i, o, ...a) {
    return typeof a[a.length - 1] == "function" ? r.readv(i, o, ...a) : new Promise((s, c) => {
      r.readv(i, o, ...a, (f, l, u) => {
        if (f) return c(f);
        s({ bytesRead: l, buffers: u });
      });
    });
  }, e.writev = function(i, o, ...a) {
    return typeof a[a.length - 1] == "function" ? r.writev(i, o, ...a) : new Promise((s, c) => {
      r.writev(i, o, ...a, (f, l, u) => {
        if (f) return c(f);
        s({ bytesWritten: l, buffers: u });
      });
    });
  }, typeof r.realpath.native == "function" ? e.realpath.native = t(r.realpath.native) : process.emitWarning(
    "fs.realpath.native is not a function. Is fs being monkey-patched?",
    "Warning",
    "fs-extra-WARN0003"
  );
})(ot);
var fl = {}, Zm = {};
const jT = ce;
Zm.checkPath = function(t) {
  if (process.platform === "win32" && /[<>:"|?*]/.test(t.replace(jT.parse(t).root, ""))) {
    const n = new Error(`Path contains invalid characters: ${t}`);
    throw n.code = "EINVAL", n;
  }
};
const ey = ot, { checkPath: ty } = Zm, ry = (e) => {
  const t = { mode: 511 };
  return typeof e == "number" ? e : { ...t, ...e }.mode;
};
fl.makeDir = async (e, t) => (ty(e), ey.mkdir(e, {
  mode: ry(t),
  recursive: !0
}));
fl.makeDirSync = (e, t) => (ty(e), ey.mkdirSync(e, {
  mode: ry(t),
  recursive: !0
}));
const MT = fe.fromPromise, { makeDir: qT, makeDirSync: Gs } = fl, Vs = MT(qT);
var jt = {
  mkdirs: Vs,
  mkdirsSync: Gs,
  // alias
  mkdirp: Vs,
  mkdirpSync: Gs,
  ensureDir: Vs,
  ensureDirSync: Gs
};
const HT = fe.fromPromise, ny = ot;
function BT(e) {
  return ny.access(e).then(() => !0).catch(() => !1);
}
var ln = {
  pathExists: HT(BT),
  pathExistsSync: ny.existsSync
};
const Dn = ot, GT = fe.fromPromise;
async function VT(e, t, r) {
  const n = await Dn.open(e, "r+");
  let i = null;
  try {
    await Dn.futimes(n, t, r);
  } finally {
    try {
      await Dn.close(n);
    } catch (o) {
      i = o;
    }
  }
  if (i)
    throw i;
}
function zT(e, t, r) {
  const n = Dn.openSync(e, "r+");
  return Dn.futimesSync(n, t, r), Dn.closeSync(n);
}
var iy = {
  utimesMillis: GT(VT),
  utimesMillisSync: zT
};
const qn = ot, ke = ce, Ud = fe.fromPromise;
function WT(e, t, r) {
  const n = r.dereference ? (i) => qn.stat(i, { bigint: !0 }) : (i) => qn.lstat(i, { bigint: !0 });
  return Promise.all([
    n(e),
    n(t).catch((i) => {
      if (i.code === "ENOENT") return null;
      throw i;
    })
  ]).then(([i, o]) => ({ srcStat: i, destStat: o }));
}
function KT(e, t, r) {
  let n;
  const i = r.dereference ? (a) => qn.statSync(a, { bigint: !0 }) : (a) => qn.lstatSync(a, { bigint: !0 }), o = i(e);
  try {
    n = i(t);
  } catch (a) {
    if (a.code === "ENOENT") return { srcStat: o, destStat: null };
    throw a;
  }
  return { srcStat: o, destStat: n };
}
async function YT(e, t, r, n) {
  const { srcStat: i, destStat: o } = await WT(e, t, n);
  if (o) {
    if (yo(i, o)) {
      const a = ke.basename(e), s = ke.basename(t);
      if (r === "move" && a !== s && a.toLowerCase() === s.toLowerCase())
        return { srcStat: i, destStat: o, isChangingCase: !0 };
      throw new Error("Source and destination must not be the same.");
    }
    if (i.isDirectory() && !o.isDirectory())
      throw new Error(`Cannot overwrite non-directory '${t}' with directory '${e}'.`);
    if (!i.isDirectory() && o.isDirectory())
      throw new Error(`Cannot overwrite directory '${t}' with non-directory '${e}'.`);
  }
  if (i.isDirectory() && dl(e, t))
    throw new Error(Ya(e, t, r));
  return { srcStat: i, destStat: o };
}
function XT(e, t, r, n) {
  const { srcStat: i, destStat: o } = KT(e, t, n);
  if (o) {
    if (yo(i, o)) {
      const a = ke.basename(e), s = ke.basename(t);
      if (r === "move" && a !== s && a.toLowerCase() === s.toLowerCase())
        return { srcStat: i, destStat: o, isChangingCase: !0 };
      throw new Error("Source and destination must not be the same.");
    }
    if (i.isDirectory() && !o.isDirectory())
      throw new Error(`Cannot overwrite non-directory '${t}' with directory '${e}'.`);
    if (!i.isDirectory() && o.isDirectory())
      throw new Error(`Cannot overwrite directory '${t}' with non-directory '${e}'.`);
  }
  if (i.isDirectory() && dl(e, t))
    throw new Error(Ya(e, t, r));
  return { srcStat: i, destStat: o };
}
async function oy(e, t, r, n) {
  const i = ke.resolve(ke.dirname(e)), o = ke.resolve(ke.dirname(r));
  if (o === i || o === ke.parse(o).root) return;
  let a;
  try {
    a = await qn.stat(o, { bigint: !0 });
  } catch (s) {
    if (s.code === "ENOENT") return;
    throw s;
  }
  if (yo(t, a))
    throw new Error(Ya(e, r, n));
  return oy(e, t, o, n);
}
function ay(e, t, r, n) {
  const i = ke.resolve(ke.dirname(e)), o = ke.resolve(ke.dirname(r));
  if (o === i || o === ke.parse(o).root) return;
  let a;
  try {
    a = qn.statSync(o, { bigint: !0 });
  } catch (s) {
    if (s.code === "ENOENT") return;
    throw s;
  }
  if (yo(t, a))
    throw new Error(Ya(e, r, n));
  return ay(e, t, o, n);
}
function yo(e, t) {
  return t.ino && t.dev && t.ino === e.ino && t.dev === e.dev;
}
function dl(e, t) {
  const r = ke.resolve(e).split(ke.sep).filter((i) => i), n = ke.resolve(t).split(ke.sep).filter((i) => i);
  return r.every((i, o) => n[o] === i);
}
function Ya(e, t, r) {
  return `Cannot ${r} '${e}' to a subdirectory of itself, '${t}'.`;
}
var Yn = {
  // checkPaths
  checkPaths: Ud(YT),
  checkPathsSync: XT,
  // checkParent
  checkParentPaths: Ud(oy),
  checkParentPathsSync: ay,
  // Misc
  isSrcSubdir: dl,
  areIdentical: yo
};
const We = ot, Ki = ce, { mkdirs: JT } = jt, { pathExists: QT } = ln, { utimesMillis: ZT } = iy, Yi = Yn;
async function eA(e, t, r = {}) {
  typeof r == "function" && (r = { filter: r }), r.clobber = "clobber" in r ? !!r.clobber : !0, r.overwrite = "overwrite" in r ? !!r.overwrite : r.clobber, r.preserveTimestamps && process.arch === "ia32" && process.emitWarning(
    `Using the preserveTimestamps option in 32-bit node is not recommended;

	see https://github.com/jprichardson/node-fs-extra/issues/269`,
    "Warning",
    "fs-extra-WARN0001"
  );
  const { srcStat: n, destStat: i } = await Yi.checkPaths(e, t, "copy", r);
  if (await Yi.checkParentPaths(e, n, t, "copy"), !await sy(e, t, r)) return;
  const a = Ki.dirname(t);
  await QT(a) || await JT(a), await cy(i, e, t, r);
}
async function sy(e, t, r) {
  return r.filter ? r.filter(e, t) : !0;
}
async function cy(e, t, r, n) {
  const o = await (n.dereference ? We.stat : We.lstat)(t);
  if (o.isDirectory()) return iA(o, e, t, r, n);
  if (o.isFile() || o.isCharacterDevice() || o.isBlockDevice()) return tA(o, e, t, r, n);
  if (o.isSymbolicLink()) return oA(e, t, r, n);
  throw o.isSocket() ? new Error(`Cannot copy a socket file: ${t}`) : o.isFIFO() ? new Error(`Cannot copy a FIFO pipe: ${t}`) : new Error(`Unknown file: ${t}`);
}
async function tA(e, t, r, n, i) {
  if (!t) return jd(e, r, n, i);
  if (i.overwrite)
    return await We.unlink(n), jd(e, r, n, i);
  if (i.errorOnExist)
    throw new Error(`'${n}' already exists`);
}
async function jd(e, t, r, n) {
  if (await We.copyFile(t, r), n.preserveTimestamps) {
    rA(e.mode) && await nA(r, e.mode);
    const i = await We.stat(t);
    await ZT(r, i.atime, i.mtime);
  }
  return We.chmod(r, e.mode);
}
function rA(e) {
  return (e & 128) === 0;
}
function nA(e, t) {
  return We.chmod(e, t | 128);
}
async function iA(e, t, r, n, i) {
  t || await We.mkdir(n);
  const o = [];
  for await (const a of await We.opendir(r)) {
    const s = Ki.join(r, a.name), c = Ki.join(n, a.name);
    o.push(
      sy(s, c, i).then((f) => {
        if (f)
          return Yi.checkPaths(s, c, "copy", i).then(({ destStat: l }) => cy(l, s, c, i));
      })
    );
  }
  await Promise.all(o), t || await We.chmod(n, e.mode);
}
async function oA(e, t, r, n) {
  let i = await We.readlink(t);
  if (n.dereference && (i = Ki.resolve(process.cwd(), i)), !e)
    return We.symlink(i, r);
  let o = null;
  try {
    o = await We.readlink(r);
  } catch (a) {
    if (a.code === "EINVAL" || a.code === "UNKNOWN") return We.symlink(i, r);
    throw a;
  }
  if (n.dereference && (o = Ki.resolve(process.cwd(), o)), Yi.isSrcSubdir(i, o))
    throw new Error(`Cannot copy '${i}' to a subdirectory of itself, '${o}'.`);
  if (Yi.isSrcSubdir(o, i))
    throw new Error(`Cannot overwrite '${o}' with '${i}'.`);
  return await We.unlink(r), We.symlink(i, r);
}
var aA = eA;
const Ze = Re, Xi = ce, sA = jt.mkdirsSync, cA = iy.utimesMillisSync, Ji = Yn;
function lA(e, t, r) {
  typeof r == "function" && (r = { filter: r }), r = r || {}, r.clobber = "clobber" in r ? !!r.clobber : !0, r.overwrite = "overwrite" in r ? !!r.overwrite : r.clobber, r.preserveTimestamps && process.arch === "ia32" && process.emitWarning(
    `Using the preserveTimestamps option in 32-bit node is not recommended;

	see https://github.com/jprichardson/node-fs-extra/issues/269`,
    "Warning",
    "fs-extra-WARN0002"
  );
  const { srcStat: n, destStat: i } = Ji.checkPathsSync(e, t, "copy", r);
  if (Ji.checkParentPathsSync(e, n, t, "copy"), r.filter && !r.filter(e, t)) return;
  const o = Xi.dirname(t);
  return Ze.existsSync(o) || sA(o), ly(i, e, t, r);
}
function ly(e, t, r, n) {
  const o = (n.dereference ? Ze.statSync : Ze.lstatSync)(t);
  if (o.isDirectory()) return yA(o, e, t, r, n);
  if (o.isFile() || o.isCharacterDevice() || o.isBlockDevice()) return uA(o, e, t, r, n);
  if (o.isSymbolicLink()) return $A(e, t, r, n);
  throw o.isSocket() ? new Error(`Cannot copy a socket file: ${t}`) : o.isFIFO() ? new Error(`Cannot copy a FIFO pipe: ${t}`) : new Error(`Unknown file: ${t}`);
}
function uA(e, t, r, n, i) {
  return t ? fA(e, r, n, i) : uy(e, r, n, i);
}
function fA(e, t, r, n) {
  if (n.overwrite)
    return Ze.unlinkSync(r), uy(e, t, r, n);
  if (n.errorOnExist)
    throw new Error(`'${r}' already exists`);
}
function uy(e, t, r, n) {
  return Ze.copyFileSync(t, r), n.preserveTimestamps && dA(e.mode, t, r), hl(r, e.mode);
}
function dA(e, t, r) {
  return hA(e) && pA(r, e), mA(t, r);
}
function hA(e) {
  return (e & 128) === 0;
}
function pA(e, t) {
  return hl(e, t | 128);
}
function hl(e, t) {
  return Ze.chmodSync(e, t);
}
function mA(e, t) {
  const r = Ze.statSync(e);
  return cA(t, r.atime, r.mtime);
}
function yA(e, t, r, n, i) {
  return t ? fy(r, n, i) : gA(e.mode, r, n, i);
}
function gA(e, t, r, n) {
  return Ze.mkdirSync(r), fy(t, r, n), hl(r, e);
}
function fy(e, t, r) {
  const n = Ze.opendirSync(e);
  try {
    let i;
    for (; (i = n.readSync()) !== null; )
      vA(i.name, e, t, r);
  } finally {
    n.closeSync();
  }
}
function vA(e, t, r, n) {
  const i = Xi.join(t, e), o = Xi.join(r, e);
  if (n.filter && !n.filter(i, o)) return;
  const { destStat: a } = Ji.checkPathsSync(i, o, "copy", n);
  return ly(a, i, o, n);
}
function $A(e, t, r, n) {
  let i = Ze.readlinkSync(t);
  if (n.dereference && (i = Xi.resolve(process.cwd(), i)), e) {
    let o;
    try {
      o = Ze.readlinkSync(r);
    } catch (a) {
      if (a.code === "EINVAL" || a.code === "UNKNOWN") return Ze.symlinkSync(i, r);
      throw a;
    }
    if (n.dereference && (o = Xi.resolve(process.cwd(), o)), Ji.isSrcSubdir(i, o))
      throw new Error(`Cannot copy '${i}' to a subdirectory of itself, '${o}'.`);
    if (Ji.isSrcSubdir(o, i))
      throw new Error(`Cannot overwrite '${o}' with '${i}'.`);
    return _A(i, r);
  } else
    return Ze.symlinkSync(i, r);
}
function _A(e, t) {
  return Ze.unlinkSync(t), Ze.symlinkSync(e, t);
}
var wA = lA;
const EA = fe.fromPromise;
var pl = {
  copy: EA(aA),
  copySync: wA
};
const dy = Re, SA = fe.fromCallback;
function bA(e, t) {
  dy.rm(e, { recursive: !0, force: !0 }, t);
}
function PA(e) {
  dy.rmSync(e, { recursive: !0, force: !0 });
}
var Xa = {
  remove: SA(bA),
  removeSync: PA
};
const TA = fe.fromPromise, hy = ot, py = ce, my = jt, yy = Xa, Md = TA(async function(t) {
  let r;
  try {
    r = await hy.readdir(t);
  } catch {
    return my.mkdirs(t);
  }
  return Promise.all(r.map((n) => yy.remove(py.join(t, n))));
});
function qd(e) {
  let t;
  try {
    t = hy.readdirSync(e);
  } catch {
    return my.mkdirsSync(e);
  }
  t.forEach((r) => {
    r = py.join(e, r), yy.removeSync(r);
  });
}
var AA = {
  emptyDirSync: qd,
  emptydirSync: qd,
  emptyDir: Md,
  emptydir: Md
};
const OA = fe.fromPromise, gy = ce, Wt = ot, vy = jt;
async function CA(e) {
  let t;
  try {
    t = await Wt.stat(e);
  } catch {
  }
  if (t && t.isFile()) return;
  const r = gy.dirname(e);
  let n = null;
  try {
    n = await Wt.stat(r);
  } catch (i) {
    if (i.code === "ENOENT") {
      await vy.mkdirs(r), await Wt.writeFile(e, "");
      return;
    } else
      throw i;
  }
  n.isDirectory() ? await Wt.writeFile(e, "") : await Wt.readdir(r);
}
function IA(e) {
  let t;
  try {
    t = Wt.statSync(e);
  } catch {
  }
  if (t && t.isFile()) return;
  const r = gy.dirname(e);
  try {
    Wt.statSync(r).isDirectory() || Wt.readdirSync(r);
  } catch (n) {
    if (n && n.code === "ENOENT") vy.mkdirsSync(r);
    else throw n;
  }
  Wt.writeFileSync(e, "");
}
var RA = {
  createFile: OA(CA),
  createFileSync: IA
};
const NA = fe.fromPromise, $y = ce, yr = ot, _y = jt, { pathExists: DA } = ln, { areIdentical: wy } = Yn;
async function kA(e, t) {
  let r;
  try {
    r = await yr.lstat(t);
  } catch {
  }
  let n;
  try {
    n = await yr.lstat(e);
  } catch (a) {
    throw a.message = a.message.replace("lstat", "ensureLink"), a;
  }
  if (r && wy(n, r)) return;
  const i = $y.dirname(t);
  await DA(i) || await _y.mkdirs(i), await yr.link(e, t);
}
function FA(e, t) {
  let r;
  try {
    r = yr.lstatSync(t);
  } catch {
  }
  try {
    const o = yr.lstatSync(e);
    if (r && wy(o, r)) return;
  } catch (o) {
    throw o.message = o.message.replace("lstat", "ensureLink"), o;
  }
  const n = $y.dirname(t);
  return yr.existsSync(n) || _y.mkdirsSync(n), yr.linkSync(e, t);
}
var LA = {
  createLink: NA(kA),
  createLinkSync: FA
};
const wr = ce, Di = ot, { pathExists: xA } = ln, UA = fe.fromPromise;
async function jA(e, t) {
  if (wr.isAbsolute(e)) {
    try {
      await Di.lstat(e);
    } catch (o) {
      throw o.message = o.message.replace("lstat", "ensureSymlink"), o;
    }
    return {
      toCwd: e,
      toDst: e
    };
  }
  const r = wr.dirname(t), n = wr.join(r, e);
  if (await xA(n))
    return {
      toCwd: n,
      toDst: e
    };
  try {
    await Di.lstat(e);
  } catch (o) {
    throw o.message = o.message.replace("lstat", "ensureSymlink"), o;
  }
  return {
    toCwd: e,
    toDst: wr.relative(r, e)
  };
}
function MA(e, t) {
  if (wr.isAbsolute(e)) {
    if (!Di.existsSync(e)) throw new Error("absolute srcpath does not exist");
    return {
      toCwd: e,
      toDst: e
    };
  }
  const r = wr.dirname(t), n = wr.join(r, e);
  if (Di.existsSync(n))
    return {
      toCwd: n,
      toDst: e
    };
  if (!Di.existsSync(e)) throw new Error("relative srcpath does not exist");
  return {
    toCwd: e,
    toDst: wr.relative(r, e)
  };
}
var qA = {
  symlinkPaths: UA(jA),
  symlinkPathsSync: MA
};
const Ey = ot, HA = fe.fromPromise;
async function BA(e, t) {
  if (t) return t;
  let r;
  try {
    r = await Ey.lstat(e);
  } catch {
    return "file";
  }
  return r && r.isDirectory() ? "dir" : "file";
}
function GA(e, t) {
  if (t) return t;
  let r;
  try {
    r = Ey.lstatSync(e);
  } catch {
    return "file";
  }
  return r && r.isDirectory() ? "dir" : "file";
}
var VA = {
  symlinkType: HA(BA),
  symlinkTypeSync: GA
};
const zA = fe.fromPromise, Sy = ce, Rt = ot, { mkdirs: WA, mkdirsSync: KA } = jt, { symlinkPaths: YA, symlinkPathsSync: XA } = qA, { symlinkType: JA, symlinkTypeSync: QA } = VA, { pathExists: ZA } = ln, { areIdentical: by } = Yn;
async function eO(e, t, r) {
  let n;
  try {
    n = await Rt.lstat(t);
  } catch {
  }
  if (n && n.isSymbolicLink()) {
    const [s, c] = await Promise.all([
      Rt.stat(e),
      Rt.stat(t)
    ]);
    if (by(s, c)) return;
  }
  const i = await YA(e, t);
  e = i.toDst;
  const o = await JA(i.toCwd, r), a = Sy.dirname(t);
  return await ZA(a) || await WA(a), Rt.symlink(e, t, o);
}
function tO(e, t, r) {
  let n;
  try {
    n = Rt.lstatSync(t);
  } catch {
  }
  if (n && n.isSymbolicLink()) {
    const s = Rt.statSync(e), c = Rt.statSync(t);
    if (by(s, c)) return;
  }
  const i = XA(e, t);
  e = i.toDst, r = QA(i.toCwd, r);
  const o = Sy.dirname(t);
  return Rt.existsSync(o) || KA(o), Rt.symlinkSync(e, t, r);
}
var rO = {
  createSymlink: zA(eO),
  createSymlinkSync: tO
};
const { createFile: Hd, createFileSync: Bd } = RA, { createLink: Gd, createLinkSync: Vd } = LA, { createSymlink: zd, createSymlinkSync: Wd } = rO;
var nO = {
  // file
  createFile: Hd,
  createFileSync: Bd,
  ensureFile: Hd,
  ensureFileSync: Bd,
  // link
  createLink: Gd,
  createLinkSync: Vd,
  ensureLink: Gd,
  ensureLinkSync: Vd,
  // symlink
  createSymlink: zd,
  createSymlinkSync: Wd,
  ensureSymlink: zd,
  ensureSymlinkSync: Wd
};
const Mo = jp;
var iO = {
  // jsonfile exports
  readJson: Mo.readFile,
  readJsonSync: Mo.readFileSync,
  writeJson: Mo.writeFile,
  writeJsonSync: Mo.writeFileSync
};
const oO = fe.fromPromise, $c = ot, Py = ce, Ty = jt, aO = ln.pathExists;
async function sO(e, t, r = "utf-8") {
  const n = Py.dirname(e);
  return await aO(n) || await Ty.mkdirs(n), $c.writeFile(e, t, r);
}
function cO(e, ...t) {
  const r = Py.dirname(e);
  $c.existsSync(r) || Ty.mkdirsSync(r), $c.writeFileSync(e, ...t);
}
var ml = {
  outputFile: oO(sO),
  outputFileSync: cO
};
const { stringify: lO } = ao, { outputFile: uO } = ml;
async function fO(e, t, r = {}) {
  const n = lO(t, r);
  await uO(e, n, r);
}
var dO = fO;
const { stringify: hO } = ao, { outputFileSync: pO } = ml;
function mO(e, t, r) {
  const n = hO(t, r);
  pO(e, n, r);
}
var yO = mO;
const gO = fe.fromPromise, rt = iO;
rt.outputJson = gO(dO);
rt.outputJsonSync = yO;
rt.outputJSON = rt.outputJson;
rt.outputJSONSync = rt.outputJsonSync;
rt.writeJSON = rt.writeJson;
rt.writeJSONSync = rt.writeJsonSync;
rt.readJSON = rt.readJson;
rt.readJSONSync = rt.readJsonSync;
var vO = rt;
const $O = ot, Kd = ce, { copy: _O } = pl, { remove: Ay } = Xa, { mkdirp: wO } = jt, { pathExists: EO } = ln, Yd = Yn;
async function SO(e, t, r = {}) {
  const n = r.overwrite || r.clobber || !1, { srcStat: i, isChangingCase: o = !1 } = await Yd.checkPaths(e, t, "move", r);
  await Yd.checkParentPaths(e, i, t, "move");
  const a = Kd.dirname(t);
  return Kd.parse(a).root !== a && await wO(a), bO(e, t, n, o);
}
async function bO(e, t, r, n) {
  if (!n) {
    if (r)
      await Ay(t);
    else if (await EO(t))
      throw new Error("dest already exists.");
  }
  try {
    await $O.rename(e, t);
  } catch (i) {
    if (i.code !== "EXDEV")
      throw i;
    await PO(e, t, r);
  }
}
async function PO(e, t, r) {
  return await _O(e, t, {
    overwrite: r,
    errorOnExist: !0,
    preserveTimestamps: !0
  }), Ay(e);
}
var TO = SO;
const Oy = Re, _c = ce, AO = pl.copySync, Cy = Xa.removeSync, OO = jt.mkdirpSync, Xd = Yn;
function CO(e, t, r) {
  r = r || {};
  const n = r.overwrite || r.clobber || !1, { srcStat: i, isChangingCase: o = !1 } = Xd.checkPathsSync(e, t, "move", r);
  return Xd.checkParentPathsSync(e, i, t, "move"), IO(t) || OO(_c.dirname(t)), RO(e, t, n, o);
}
function IO(e) {
  const t = _c.dirname(e);
  return _c.parse(t).root === t;
}
function RO(e, t, r, n) {
  if (n) return zs(e, t, r);
  if (r)
    return Cy(t), zs(e, t, r);
  if (Oy.existsSync(t)) throw new Error("dest already exists.");
  return zs(e, t, r);
}
function zs(e, t, r) {
  try {
    Oy.renameSync(e, t);
  } catch (n) {
    if (n.code !== "EXDEV") throw n;
    return NO(e, t, r);
  }
}
function NO(e, t, r) {
  return AO(e, t, {
    overwrite: r,
    errorOnExist: !0,
    preserveTimestamps: !0
  }), Cy(e);
}
var DO = CO;
const kO = fe.fromPromise;
var FO = {
  move: kO(TO),
  moveSync: DO
}, LO = {
  // Export promiseified graceful-fs:
  ...ot,
  // Export extra methods:
  ...pl,
  ...AA,
  ...nO,
  ...vO,
  ...jt,
  ...FO,
  ...ml,
  ...ln,
  ...Xa
};
const Dt = /* @__PURE__ */ Ta(LO), rn = (e) => {
  const t = typeof e;
  return e !== null && (t === "object" || t === "function");
}, Ws = /* @__PURE__ */ new Set([
  "__proto__",
  "prototype",
  "constructor"
]), xO = new Set("0123456789");
function Ja(e) {
  const t = [];
  let r = "", n = "start", i = !1;
  for (const o of e)
    switch (o) {
      case "\\": {
        if (n === "index")
          throw new Error("Invalid character in an index");
        if (n === "indexEnd")
          throw new Error("Invalid character after an index");
        i && (r += o), n = "property", i = !i;
        break;
      }
      case ".": {
        if (n === "index")
          throw new Error("Invalid character in an index");
        if (n === "indexEnd") {
          n = "property";
          break;
        }
        if (i) {
          i = !1, r += o;
          break;
        }
        if (Ws.has(r))
          return [];
        t.push(r), r = "", n = "property";
        break;
      }
      case "[": {
        if (n === "index")
          throw new Error("Invalid character in an index");
        if (n === "indexEnd") {
          n = "index";
          break;
        }
        if (i) {
          i = !1, r += o;
          break;
        }
        if (n === "property") {
          if (Ws.has(r))
            return [];
          t.push(r), r = "";
        }
        n = "index";
        break;
      }
      case "]": {
        if (n === "index") {
          t.push(Number.parseInt(r, 10)), r = "", n = "indexEnd";
          break;
        }
        if (n === "indexEnd")
          throw new Error("Invalid character after an index");
      }
      default: {
        if (n === "index" && !xO.has(o))
          throw new Error("Invalid character in an index");
        if (n === "indexEnd")
          throw new Error("Invalid character after an index");
        n === "start" && (n = "property"), i && (i = !1, r += "\\"), r += o;
      }
    }
  switch (i && (r += "\\"), n) {
    case "property": {
      if (Ws.has(r))
        return [];
      t.push(r);
      break;
    }
    case "index":
      throw new Error("Index was not closed");
    case "start": {
      t.push("");
      break;
    }
  }
  return t;
}
function yl(e, t) {
  if (typeof t != "number" && Array.isArray(e)) {
    const r = Number.parseInt(t, 10);
    return Number.isInteger(r) && e[r] === e[t];
  }
  return !1;
}
function Iy(e, t) {
  if (yl(e, t))
    throw new Error("Cannot use string index");
}
function UO(e, t, r) {
  if (!rn(e) || typeof t != "string")
    return r === void 0 ? e : r;
  const n = Ja(t);
  if (n.length === 0)
    return r;
  for (let i = 0; i < n.length; i++) {
    const o = n[i];
    if (yl(e, o) ? e = i === n.length - 1 ? void 0 : null : e = e[o], e == null) {
      if (i !== n.length - 1)
        return r;
      break;
    }
  }
  return e === void 0 ? r : e;
}
function Jd(e, t, r) {
  if (!rn(e) || typeof t != "string")
    return e;
  const n = e, i = Ja(t);
  for (let o = 0; o < i.length; o++) {
    const a = i[o];
    Iy(e, a), o === i.length - 1 ? e[a] = r : rn(e[a]) || (e[a] = typeof i[o + 1] == "number" ? [] : {}), e = e[a];
  }
  return n;
}
function jO(e, t) {
  if (!rn(e) || typeof t != "string")
    return !1;
  const r = Ja(t);
  for (let n = 0; n < r.length; n++) {
    const i = r[n];
    if (Iy(e, i), n === r.length - 1)
      return delete e[i], !0;
    if (e = e[i], !rn(e))
      return !1;
  }
}
function MO(e, t) {
  if (!rn(e) || typeof t != "string")
    return !1;
  const r = Ja(t);
  if (r.length === 0)
    return !1;
  for (const n of r) {
    if (!rn(e) || !(n in e) || yl(e, n))
      return !1;
    e = e[n];
  }
  return !0;
}
const gr = Pa.homedir(), gl = Pa.tmpdir(), { env: Cn } = Ie, qO = (e) => {
  const t = se.join(gr, "Library");
  return {
    data: se.join(t, "Application Support", e),
    config: se.join(t, "Preferences", e),
    cache: se.join(t, "Caches", e),
    log: se.join(t, "Logs", e),
    temp: se.join(gl, e)
  };
}, HO = (e) => {
  const t = Cn.APPDATA || se.join(gr, "AppData", "Roaming"), r = Cn.LOCALAPPDATA || se.join(gr, "AppData", "Local");
  return {
    // Data/config/cache/log are invented by me as Windows isn't opinionated about this
    data: se.join(r, e, "Data"),
    config: se.join(t, e, "Config"),
    cache: se.join(r, e, "Cache"),
    log: se.join(r, e, "Log"),
    temp: se.join(gl, e)
  };
}, BO = (e) => {
  const t = se.basename(gr);
  return {
    data: se.join(Cn.XDG_DATA_HOME || se.join(gr, ".local", "share"), e),
    config: se.join(Cn.XDG_CONFIG_HOME || se.join(gr, ".config"), e),
    cache: se.join(Cn.XDG_CACHE_HOME || se.join(gr, ".cache"), e),
    // https://wiki.debian.org/XDGBaseDirectorySpecification#state
    log: se.join(Cn.XDG_STATE_HOME || se.join(gr, ".local", "state"), e),
    temp: se.join(gl, t, e)
  };
};
function GO(e, { suffix: t = "nodejs" } = {}) {
  if (typeof e != "string")
    throw new TypeError(`Expected a string, got ${typeof e}`);
  return t && (e += `-${t}`), Ie.platform === "darwin" ? qO(e) : Ie.platform === "win32" ? HO(e) : BO(e);
}
const sr = (e, t) => function(...n) {
  return e.apply(void 0, n).catch(t);
}, Bt = (e, t) => function(...n) {
  try {
    return e.apply(void 0, n);
  } catch (i) {
    return t(i);
  }
}, VO = Ie.getuid ? !Ie.getuid() : !1, zO = 1e4, ut = () => {
}, $e = {
  /* API */
  isChangeErrorOk: (e) => {
    if (!$e.isNodeError(e))
      return !1;
    const { code: t } = e;
    return t === "ENOSYS" || !VO && (t === "EINVAL" || t === "EPERM");
  },
  isNodeError: (e) => e instanceof Error,
  isRetriableError: (e) => {
    if (!$e.isNodeError(e))
      return !1;
    const { code: t } = e;
    return t === "EMFILE" || t === "ENFILE" || t === "EAGAIN" || t === "EBUSY" || t === "EACCESS" || t === "EACCES" || t === "EACCS" || t === "EPERM";
  },
  onChangeError: (e) => {
    if (!$e.isNodeError(e))
      throw e;
    if (!$e.isChangeErrorOk(e))
      throw e;
  }
};
class WO {
  constructor() {
    this.interval = 25, this.intervalId = void 0, this.limit = zO, this.queueActive = /* @__PURE__ */ new Set(), this.queueWaiting = /* @__PURE__ */ new Set(), this.init = () => {
      this.intervalId || (this.intervalId = setInterval(this.tick, this.interval));
    }, this.reset = () => {
      this.intervalId && (clearInterval(this.intervalId), delete this.intervalId);
    }, this.add = (t) => {
      this.queueWaiting.add(t), this.queueActive.size < this.limit / 2 ? this.tick() : this.init();
    }, this.remove = (t) => {
      this.queueWaiting.delete(t), this.queueActive.delete(t);
    }, this.schedule = () => new Promise((t) => {
      const r = () => this.remove(n), n = () => t(r);
      this.add(n);
    }), this.tick = () => {
      if (!(this.queueActive.size >= this.limit)) {
        if (!this.queueWaiting.size)
          return this.reset();
        for (const t of this.queueWaiting) {
          if (this.queueActive.size >= this.limit)
            break;
          this.queueWaiting.delete(t), this.queueActive.add(t), t();
        }
      }
    };
  }
}
const KO = new WO(), cr = (e, t) => function(n) {
  return function i(...o) {
    return KO.schedule().then((a) => {
      const s = (f) => (a(), f), c = (f) => {
        if (a(), Date.now() >= n)
          throw f;
        if (t(f)) {
          const l = Math.round(100 * Math.random());
          return new Promise((d) => setTimeout(d, l)).then(() => i.apply(void 0, o));
        }
        throw f;
      };
      return e.apply(void 0, o).then(s, c);
    });
  };
}, lr = (e, t) => function(n) {
  return function i(...o) {
    try {
      return e.apply(void 0, o);
    } catch (a) {
      if (Date.now() > n)
        throw a;
      if (t(a))
        return i.apply(void 0, o);
      throw a;
    }
  };
}, Ve = {
  attempt: {
    /* ASYNC */
    chmod: sr(Be(oe.chmod), $e.onChangeError),
    chown: sr(Be(oe.chown), $e.onChangeError),
    close: sr(Be(oe.close), ut),
    fsync: sr(Be(oe.fsync), ut),
    mkdir: sr(Be(oe.mkdir), ut),
    realpath: sr(Be(oe.realpath), ut),
    stat: sr(Be(oe.stat), ut),
    unlink: sr(Be(oe.unlink), ut),
    /* SYNC */
    chmodSync: Bt(oe.chmodSync, $e.onChangeError),
    chownSync: Bt(oe.chownSync, $e.onChangeError),
    closeSync: Bt(oe.closeSync, ut),
    existsSync: Bt(oe.existsSync, ut),
    fsyncSync: Bt(oe.fsync, ut),
    mkdirSync: Bt(oe.mkdirSync, ut),
    realpathSync: Bt(oe.realpathSync, ut),
    statSync: Bt(oe.statSync, ut),
    unlinkSync: Bt(oe.unlinkSync, ut)
  },
  retry: {
    /* ASYNC */
    close: cr(Be(oe.close), $e.isRetriableError),
    fsync: cr(Be(oe.fsync), $e.isRetriableError),
    open: cr(Be(oe.open), $e.isRetriableError),
    readFile: cr(Be(oe.readFile), $e.isRetriableError),
    rename: cr(Be(oe.rename), $e.isRetriableError),
    stat: cr(Be(oe.stat), $e.isRetriableError),
    write: cr(Be(oe.write), $e.isRetriableError),
    writeFile: cr(Be(oe.writeFile), $e.isRetriableError),
    /* SYNC */
    closeSync: lr(oe.closeSync, $e.isRetriableError),
    fsyncSync: lr(oe.fsyncSync, $e.isRetriableError),
    openSync: lr(oe.openSync, $e.isRetriableError),
    readFileSync: lr(oe.readFileSync, $e.isRetriableError),
    renameSync: lr(oe.renameSync, $e.isRetriableError),
    statSync: lr(oe.statSync, $e.isRetriableError),
    writeSync: lr(oe.writeSync, $e.isRetriableError),
    writeFileSync: lr(oe.writeFileSync, $e.isRetriableError)
  }
}, YO = "utf8", Qd = 438, XO = 511, JO = {}, QO = Pa.userInfo().uid, ZO = Pa.userInfo().gid, eC = 1e3, tC = !!Ie.getuid;
Ie.getuid && Ie.getuid();
const Zd = 128, rC = (e) => e instanceof Error && "code" in e, eh = (e) => typeof e == "string", Ks = (e) => e === void 0, nC = Ie.platform === "linux", Ry = Ie.platform === "win32", vl = ["SIGABRT", "SIGALRM", "SIGHUP", "SIGINT", "SIGTERM"];
Ry || vl.push("SIGVTALRM", "SIGXCPU", "SIGXFSZ", "SIGUSR2", "SIGTRAP", "SIGSYS", "SIGQUIT", "SIGIOT");
nC && vl.push("SIGIO", "SIGPOLL", "SIGPWR", "SIGSTKFLT", "SIGUNUSED");
class iC {
  /* CONSTRUCTOR */
  constructor() {
    this.callbacks = /* @__PURE__ */ new Set(), this.exited = !1, this.exit = (t) => {
      if (!this.exited) {
        this.exited = !0;
        for (const r of this.callbacks)
          r();
        t && (Ry && t !== "SIGINT" && t !== "SIGTERM" && t !== "SIGKILL" ? Ie.kill(Ie.pid, "SIGTERM") : Ie.kill(Ie.pid, t));
      }
    }, this.hook = () => {
      Ie.once("exit", () => this.exit());
      for (const t of vl)
        try {
          Ie.once(t, () => this.exit(t));
        } catch {
        }
    }, this.register = (t) => (this.callbacks.add(t), () => {
      this.callbacks.delete(t);
    }), this.hook();
  }
}
const oC = new iC(), aC = oC.register, ze = {
  /* VARIABLES */
  store: {},
  /* API */
  create: (e) => {
    const t = `000000${Math.floor(Math.random() * 16777215).toString(16)}`.slice(-6), i = `.tmp-${Date.now().toString().slice(-10)}${t}`;
    return `${e}${i}`;
  },
  get: (e, t, r = !0) => {
    const n = ze.truncate(t(e));
    return n in ze.store ? ze.get(e, t, r) : (ze.store[n] = r, [n, () => delete ze.store[n]]);
  },
  purge: (e) => {
    ze.store[e] && (delete ze.store[e], Ve.attempt.unlink(e));
  },
  purgeSync: (e) => {
    ze.store[e] && (delete ze.store[e], Ve.attempt.unlinkSync(e));
  },
  purgeSyncAll: () => {
    for (const e in ze.store)
      ze.purgeSync(e);
  },
  truncate: (e) => {
    const t = se.basename(e);
    if (t.length <= Zd)
      return e;
    const r = /^(\.?)(.*?)((?:\.[^.]+)?(?:\.tmp-\d{10}[a-f0-9]{6})?)$/.exec(t);
    if (!r)
      return e;
    const n = t.length - Zd;
    return `${e.slice(0, -t.length)}${r[1]}${r[2].slice(0, -n)}${r[3]}`;
  }
};
aC(ze.purgeSyncAll);
function Ny(e, t, r = JO) {
  if (eh(r))
    return Ny(e, t, { encoding: r });
  const n = Date.now() + ((r.timeout ?? eC) || -1);
  let i = null, o = null, a = null;
  try {
    const s = Ve.attempt.realpathSync(e), c = !!s;
    e = s || e, [o, i] = ze.get(e, r.tmpCreate || ze.create, r.tmpPurge !== !1);
    const f = tC && Ks(r.chown), l = Ks(r.mode);
    if (c && (f || l)) {
      const u = Ve.attempt.statSync(e);
      u && (r = { ...r }, f && (r.chown = { uid: u.uid, gid: u.gid }), l && (r.mode = u.mode));
    }
    if (!c) {
      const u = se.dirname(e);
      Ve.attempt.mkdirSync(u, {
        mode: XO,
        recursive: !0
      });
    }
    a = Ve.retry.openSync(n)(o, "w", r.mode || Qd), r.tmpCreated && r.tmpCreated(o), eh(t) ? Ve.retry.writeSync(n)(a, t, 0, r.encoding || YO) : Ks(t) || Ve.retry.writeSync(n)(a, t, 0, t.length, 0), r.fsync !== !1 && (r.fsyncWait !== !1 ? Ve.retry.fsyncSync(n)(a) : Ve.attempt.fsync(a)), Ve.retry.closeSync(n)(a), a = null, r.chown && (r.chown.uid !== QO || r.chown.gid !== ZO) && Ve.attempt.chownSync(o, r.chown.uid, r.chown.gid), r.mode && r.mode !== Qd && Ve.attempt.chmodSync(o, r.mode);
    try {
      Ve.retry.renameSync(n)(o, e);
    } catch (u) {
      if (!rC(u) || u.code !== "ENAMETOOLONG")
        throw u;
      Ve.retry.renameSync(n)(o, ze.truncate(e));
    }
    i(), o = null;
  } finally {
    a && Ve.attempt.closeSync(a), o && ze.purge(o);
  }
}
var wc = { exports: {} }, $l = {}, $t = {}, Hn = {}, go = {}, re = {}, Qi = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.regexpCode = e.getEsmExportName = e.getProperty = e.safeStringify = e.stringify = e.strConcat = e.addCodeArg = e.str = e._ = e.nil = e._Code = e.Name = e.IDENTIFIER = e._CodeOrName = void 0;
  class t {
  }
  e._CodeOrName = t, e.IDENTIFIER = /^[a-z$_][a-z$_0-9]*$/i;
  class r extends t {
    constructor(S) {
      if (super(), !e.IDENTIFIER.test(S))
        throw new Error("CodeGen: name must be a valid identifier");
      this.str = S;
    }
    toString() {
      return this.str;
    }
    emptyStr() {
      return !1;
    }
    get names() {
      return { [this.str]: 1 };
    }
  }
  e.Name = r;
  class n extends t {
    constructor(S) {
      super(), this._items = typeof S == "string" ? [S] : S;
    }
    toString() {
      return this.str;
    }
    emptyStr() {
      if (this._items.length > 1)
        return !1;
      const S = this._items[0];
      return S === "" || S === '""';
    }
    get str() {
      var S;
      return (S = this._str) !== null && S !== void 0 ? S : this._str = this._items.reduce((C, R) => `${C}${R}`, "");
    }
    get names() {
      var S;
      return (S = this._names) !== null && S !== void 0 ? S : this._names = this._items.reduce((C, R) => (R instanceof r && (C[R.str] = (C[R.str] || 0) + 1), C), {});
    }
  }
  e._Code = n, e.nil = new n("");
  function i(v, ...S) {
    const C = [v[0]];
    let R = 0;
    for (; R < S.length; )
      s(C, S[R]), C.push(v[++R]);
    return new n(C);
  }
  e._ = i;
  const o = new n("+");
  function a(v, ...S) {
    const C = [h(v[0])];
    let R = 0;
    for (; R < S.length; )
      C.push(o), s(C, S[R]), C.push(o, h(v[++R]));
    return c(C), new n(C);
  }
  e.str = a;
  function s(v, S) {
    S instanceof n ? v.push(...S._items) : S instanceof r ? v.push(S) : v.push(u(S));
  }
  e.addCodeArg = s;
  function c(v) {
    let S = 1;
    for (; S < v.length - 1; ) {
      if (v[S] === o) {
        const C = f(v[S - 1], v[S + 1]);
        if (C !== void 0) {
          v.splice(S - 1, 3, C);
          continue;
        }
        v[S++] = "+";
      }
      S++;
    }
  }
  function f(v, S) {
    if (S === '""')
      return v;
    if (v === '""')
      return S;
    if (typeof v == "string")
      return S instanceof r || v[v.length - 1] !== '"' ? void 0 : typeof S != "string" ? `${v.slice(0, -1)}${S}"` : S[0] === '"' ? v.slice(0, -1) + S.slice(1) : void 0;
    if (typeof S == "string" && S[0] === '"' && !(v instanceof r))
      return `"${v}${S.slice(1)}`;
  }
  function l(v, S) {
    return S.emptyStr() ? v : v.emptyStr() ? S : a`${v}${S}`;
  }
  e.strConcat = l;
  function u(v) {
    return typeof v == "number" || typeof v == "boolean" || v === null ? v : h(Array.isArray(v) ? v.join(",") : v);
  }
  function d(v) {
    return new n(h(v));
  }
  e.stringify = d;
  function h(v) {
    return JSON.stringify(v).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
  }
  e.safeStringify = h;
  function y(v) {
    return typeof v == "string" && e.IDENTIFIER.test(v) ? new n(`.${v}`) : i`[${v}]`;
  }
  e.getProperty = y;
  function g(v) {
    if (typeof v == "string" && e.IDENTIFIER.test(v))
      return new n(`${v}`);
    throw new Error(`CodeGen: invalid export name: ${v}, use explicit $id name mapping`);
  }
  e.getEsmExportName = g;
  function $(v) {
    return new n(v.toString());
  }
  e.regexpCode = $;
})(Qi);
var Ec = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.ValueScope = e.ValueScopeName = e.Scope = e.varKinds = e.UsedValueState = void 0;
  const t = Qi;
  class r extends Error {
    constructor(f) {
      super(`CodeGen: "code" for ${f} not defined`), this.value = f.value;
    }
  }
  var n;
  (function(c) {
    c[c.Started = 0] = "Started", c[c.Completed = 1] = "Completed";
  })(n || (e.UsedValueState = n = {})), e.varKinds = {
    const: new t.Name("const"),
    let: new t.Name("let"),
    var: new t.Name("var")
  };
  class i {
    constructor({ prefixes: f, parent: l } = {}) {
      this._names = {}, this._prefixes = f, this._parent = l;
    }
    toName(f) {
      return f instanceof t.Name ? f : this.name(f);
    }
    name(f) {
      return new t.Name(this._newName(f));
    }
    _newName(f) {
      const l = this._names[f] || this._nameGroup(f);
      return `${f}${l.index++}`;
    }
    _nameGroup(f) {
      var l, u;
      if (!((u = (l = this._parent) === null || l === void 0 ? void 0 : l._prefixes) === null || u === void 0) && u.has(f) || this._prefixes && !this._prefixes.has(f))
        throw new Error(`CodeGen: prefix "${f}" is not allowed in this scope`);
      return this._names[f] = { prefix: f, index: 0 };
    }
  }
  e.Scope = i;
  class o extends t.Name {
    constructor(f, l) {
      super(l), this.prefix = f;
    }
    setValue(f, { property: l, itemIndex: u }) {
      this.value = f, this.scopePath = (0, t._)`.${new t.Name(l)}[${u}]`;
    }
  }
  e.ValueScopeName = o;
  const a = (0, t._)`\n`;
  class s extends i {
    constructor(f) {
      super(f), this._values = {}, this._scope = f.scope, this.opts = { ...f, _n: f.lines ? a : t.nil };
    }
    get() {
      return this._scope;
    }
    name(f) {
      return new o(f, this._newName(f));
    }
    value(f, l) {
      var u;
      if (l.ref === void 0)
        throw new Error("CodeGen: ref must be passed in value");
      const d = this.toName(f), { prefix: h } = d, y = (u = l.key) !== null && u !== void 0 ? u : l.ref;
      let g = this._values[h];
      if (g) {
        const S = g.get(y);
        if (S)
          return S;
      } else
        g = this._values[h] = /* @__PURE__ */ new Map();
      g.set(y, d);
      const $ = this._scope[h] || (this._scope[h] = []), v = $.length;
      return $[v] = l.ref, d.setValue(l, { property: h, itemIndex: v }), d;
    }
    getValue(f, l) {
      const u = this._values[f];
      if (u)
        return u.get(l);
    }
    scopeRefs(f, l = this._values) {
      return this._reduceValues(l, (u) => {
        if (u.scopePath === void 0)
          throw new Error(`CodeGen: name "${u}" has no value`);
        return (0, t._)`${f}${u.scopePath}`;
      });
    }
    scopeCode(f = this._values, l, u) {
      return this._reduceValues(f, (d) => {
        if (d.value === void 0)
          throw new Error(`CodeGen: name "${d}" has no value`);
        return d.value.code;
      }, l, u);
    }
    _reduceValues(f, l, u = {}, d) {
      let h = t.nil;
      for (const y in f) {
        const g = f[y];
        if (!g)
          continue;
        const $ = u[y] = u[y] || /* @__PURE__ */ new Map();
        g.forEach((v) => {
          if ($.has(v))
            return;
          $.set(v, n.Started);
          let S = l(v);
          if (S) {
            const C = this.opts.es5 ? e.varKinds.var : e.varKinds.const;
            h = (0, t._)`${h}${C} ${v} = ${S};${this.opts._n}`;
          } else if (S = d == null ? void 0 : d(v))
            h = (0, t._)`${h}${S}${this.opts._n}`;
          else
            throw new r(v);
          $.set(v, n.Completed);
        });
      }
      return h;
    }
  }
  e.ValueScope = s;
})(Ec);
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.or = e.and = e.not = e.CodeGen = e.operators = e.varKinds = e.ValueScopeName = e.ValueScope = e.Scope = e.Name = e.regexpCode = e.stringify = e.getProperty = e.nil = e.strConcat = e.str = e._ = void 0;
  const t = Qi, r = Ec;
  var n = Qi;
  Object.defineProperty(e, "_", { enumerable: !0, get: function() {
    return n._;
  } }), Object.defineProperty(e, "str", { enumerable: !0, get: function() {
    return n.str;
  } }), Object.defineProperty(e, "strConcat", { enumerable: !0, get: function() {
    return n.strConcat;
  } }), Object.defineProperty(e, "nil", { enumerable: !0, get: function() {
    return n.nil;
  } }), Object.defineProperty(e, "getProperty", { enumerable: !0, get: function() {
    return n.getProperty;
  } }), Object.defineProperty(e, "stringify", { enumerable: !0, get: function() {
    return n.stringify;
  } }), Object.defineProperty(e, "regexpCode", { enumerable: !0, get: function() {
    return n.regexpCode;
  } }), Object.defineProperty(e, "Name", { enumerable: !0, get: function() {
    return n.Name;
  } });
  var i = Ec;
  Object.defineProperty(e, "Scope", { enumerable: !0, get: function() {
    return i.Scope;
  } }), Object.defineProperty(e, "ValueScope", { enumerable: !0, get: function() {
    return i.ValueScope;
  } }), Object.defineProperty(e, "ValueScopeName", { enumerable: !0, get: function() {
    return i.ValueScopeName;
  } }), Object.defineProperty(e, "varKinds", { enumerable: !0, get: function() {
    return i.varKinds;
  } }), e.operators = {
    GT: new t._Code(">"),
    GTE: new t._Code(">="),
    LT: new t._Code("<"),
    LTE: new t._Code("<="),
    EQ: new t._Code("==="),
    NEQ: new t._Code("!=="),
    NOT: new t._Code("!"),
    OR: new t._Code("||"),
    AND: new t._Code("&&"),
    ADD: new t._Code("+")
  };
  class o {
    optimizeNodes() {
      return this;
    }
    optimizeNames(_, b) {
      return this;
    }
  }
  class a extends o {
    constructor(_, b, j) {
      super(), this.varKind = _, this.name = b, this.rhs = j;
    }
    render({ es5: _, _n: b }) {
      const j = _ ? r.varKinds.var : this.varKind, m = this.rhs === void 0 ? "" : ` = ${this.rhs}`;
      return `${j} ${this.name}${m};` + b;
    }
    optimizeNames(_, b) {
      if (_[this.name.str])
        return this.rhs && (this.rhs = k(this.rhs, _, b)), this;
    }
    get names() {
      return this.rhs instanceof t._CodeOrName ? this.rhs.names : {};
    }
  }
  class s extends o {
    constructor(_, b, j) {
      super(), this.lhs = _, this.rhs = b, this.sideEffects = j;
    }
    render({ _n: _ }) {
      return `${this.lhs} = ${this.rhs};` + _;
    }
    optimizeNames(_, b) {
      if (!(this.lhs instanceof t.Name && !_[this.lhs.str] && !this.sideEffects))
        return this.rhs = k(this.rhs, _, b), this;
    }
    get names() {
      const _ = this.lhs instanceof t.Name ? {} : { ...this.lhs.names };
      return X(_, this.rhs);
    }
  }
  class c extends s {
    constructor(_, b, j, m) {
      super(_, j, m), this.op = b;
    }
    render({ _n: _ }) {
      return `${this.lhs} ${this.op}= ${this.rhs};` + _;
    }
  }
  class f extends o {
    constructor(_) {
      super(), this.label = _, this.names = {};
    }
    render({ _n: _ }) {
      return `${this.label}:` + _;
    }
  }
  class l extends o {
    constructor(_) {
      super(), this.label = _, this.names = {};
    }
    render({ _n: _ }) {
      return `break${this.label ? ` ${this.label}` : ""};` + _;
    }
  }
  class u extends o {
    constructor(_) {
      super(), this.error = _;
    }
    render({ _n: _ }) {
      return `throw ${this.error};` + _;
    }
    get names() {
      return this.error.names;
    }
  }
  class d extends o {
    constructor(_) {
      super(), this.code = _;
    }
    render({ _n: _ }) {
      return `${this.code};` + _;
    }
    optimizeNodes() {
      return `${this.code}` ? this : void 0;
    }
    optimizeNames(_, b) {
      return this.code = k(this.code, _, b), this;
    }
    get names() {
      return this.code instanceof t._CodeOrName ? this.code.names : {};
    }
  }
  class h extends o {
    constructor(_ = []) {
      super(), this.nodes = _;
    }
    render(_) {
      return this.nodes.reduce((b, j) => b + j.render(_), "");
    }
    optimizeNodes() {
      const { nodes: _ } = this;
      let b = _.length;
      for (; b--; ) {
        const j = _[b].optimizeNodes();
        Array.isArray(j) ? _.splice(b, 1, ...j) : j ? _[b] = j : _.splice(b, 1);
      }
      return _.length > 0 ? this : void 0;
    }
    optimizeNames(_, b) {
      const { nodes: j } = this;
      let m = j.length;
      for (; m--; ) {
        const p = j[m];
        p.optimizeNames(_, b) || (F(_, p.names), j.splice(m, 1));
      }
      return j.length > 0 ? this : void 0;
    }
    get names() {
      return this.nodes.reduce((_, b) => z(_, b.names), {});
    }
  }
  class y extends h {
    render(_) {
      return "{" + _._n + super.render(_) + "}" + _._n;
    }
  }
  class g extends h {
  }
  class $ extends y {
  }
  $.kind = "else";
  class v extends y {
    constructor(_, b) {
      super(b), this.condition = _;
    }
    render(_) {
      let b = `if(${this.condition})` + super.render(_);
      return this.else && (b += "else " + this.else.render(_)), b;
    }
    optimizeNodes() {
      super.optimizeNodes();
      const _ = this.condition;
      if (_ === !0)
        return this.nodes;
      let b = this.else;
      if (b) {
        const j = b.optimizeNodes();
        b = this.else = Array.isArray(j) ? new $(j) : j;
      }
      if (b)
        return _ === !1 ? b instanceof v ? b : b.nodes : this.nodes.length ? this : new v(G(_), b instanceof v ? [b] : b.nodes);
      if (!(_ === !1 || !this.nodes.length))
        return this;
    }
    optimizeNames(_, b) {
      var j;
      if (this.else = (j = this.else) === null || j === void 0 ? void 0 : j.optimizeNames(_, b), !!(super.optimizeNames(_, b) || this.else))
        return this.condition = k(this.condition, _, b), this;
    }
    get names() {
      const _ = super.names;
      return X(_, this.condition), this.else && z(_, this.else.names), _;
    }
  }
  v.kind = "if";
  class S extends y {
  }
  S.kind = "for";
  class C extends S {
    constructor(_) {
      super(), this.iteration = _;
    }
    render(_) {
      return `for(${this.iteration})` + super.render(_);
    }
    optimizeNames(_, b) {
      if (super.optimizeNames(_, b))
        return this.iteration = k(this.iteration, _, b), this;
    }
    get names() {
      return z(super.names, this.iteration.names);
    }
  }
  class R extends S {
    constructor(_, b, j, m) {
      super(), this.varKind = _, this.name = b, this.from = j, this.to = m;
    }
    render(_) {
      const b = _.es5 ? r.varKinds.var : this.varKind, { name: j, from: m, to: p } = this;
      return `for(${b} ${j}=${m}; ${j}<${p}; ${j}++)` + super.render(_);
    }
    get names() {
      const _ = X(super.names, this.from);
      return X(_, this.to);
    }
  }
  class M extends S {
    constructor(_, b, j, m) {
      super(), this.loop = _, this.varKind = b, this.name = j, this.iterable = m;
    }
    render(_) {
      return `for(${this.varKind} ${this.name} ${this.loop} ${this.iterable})` + super.render(_);
    }
    optimizeNames(_, b) {
      if (super.optimizeNames(_, b))
        return this.iterable = k(this.iterable, _, b), this;
    }
    get names() {
      return z(super.names, this.iterable.names);
    }
  }
  class I extends y {
    constructor(_, b, j) {
      super(), this.name = _, this.args = b, this.async = j;
    }
    render(_) {
      return `${this.async ? "async " : ""}function ${this.name}(${this.args})` + super.render(_);
    }
  }
  I.kind = "func";
  class L extends h {
    render(_) {
      return "return " + super.render(_);
    }
  }
  L.kind = "return";
  class B extends y {
    render(_) {
      let b = "try" + super.render(_);
      return this.catch && (b += this.catch.render(_)), this.finally && (b += this.finally.render(_)), b;
    }
    optimizeNodes() {
      var _, b;
      return super.optimizeNodes(), (_ = this.catch) === null || _ === void 0 || _.optimizeNodes(), (b = this.finally) === null || b === void 0 || b.optimizeNodes(), this;
    }
    optimizeNames(_, b) {
      var j, m;
      return super.optimizeNames(_, b), (j = this.catch) === null || j === void 0 || j.optimizeNames(_, b), (m = this.finally) === null || m === void 0 || m.optimizeNames(_, b), this;
    }
    get names() {
      const _ = super.names;
      return this.catch && z(_, this.catch.names), this.finally && z(_, this.finally.names), _;
    }
  }
  class w extends y {
    constructor(_) {
      super(), this.error = _;
    }
    render(_) {
      return `catch(${this.error})` + super.render(_);
    }
  }
  w.kind = "catch";
  class K extends y {
    render(_) {
      return "finally" + super.render(_);
    }
  }
  K.kind = "finally";
  class q {
    constructor(_, b = {}) {
      this._values = {}, this._blockStarts = [], this._constants = {}, this.opts = { ...b, _n: b.lines ? `
` : "" }, this._extScope = _, this._scope = new r.Scope({ parent: _ }), this._nodes = [new g()];
    }
    toString() {
      return this._root.render(this.opts);
    }
    // returns unique name in the internal scope
    name(_) {
      return this._scope.name(_);
    }
    // reserves unique name in the external scope
    scopeName(_) {
      return this._extScope.name(_);
    }
    // reserves unique name in the external scope and assigns value to it
    scopeValue(_, b) {
      const j = this._extScope.value(_, b);
      return (this._values[j.prefix] || (this._values[j.prefix] = /* @__PURE__ */ new Set())).add(j), j;
    }
    getScopeValue(_, b) {
      return this._extScope.getValue(_, b);
    }
    // return code that assigns values in the external scope to the names that are used internally
    // (same names that were returned by gen.scopeName or gen.scopeValue)
    scopeRefs(_) {
      return this._extScope.scopeRefs(_, this._values);
    }
    scopeCode() {
      return this._extScope.scopeCode(this._values);
    }
    _def(_, b, j, m) {
      const p = this._scope.toName(b);
      return j !== void 0 && m && (this._constants[p.str] = j), this._leafNode(new a(_, p, j)), p;
    }
    // `const` declaration (`var` in es5 mode)
    const(_, b, j) {
      return this._def(r.varKinds.const, _, b, j);
    }
    // `let` declaration with optional assignment (`var` in es5 mode)
    let(_, b, j) {
      return this._def(r.varKinds.let, _, b, j);
    }
    // `var` declaration with optional assignment
    var(_, b, j) {
      return this._def(r.varKinds.var, _, b, j);
    }
    // assignment code
    assign(_, b, j) {
      return this._leafNode(new s(_, b, j));
    }
    // `+=` code
    add(_, b) {
      return this._leafNode(new c(_, e.operators.ADD, b));
    }
    // appends passed SafeExpr to code or executes Block
    code(_) {
      return typeof _ == "function" ? _() : _ !== t.nil && this._leafNode(new d(_)), this;
    }
    // returns code for object literal for the passed argument list of key-value pairs
    object(..._) {
      const b = ["{"];
      for (const [j, m] of _)
        b.length > 1 && b.push(","), b.push(j), (j !== m || this.opts.es5) && (b.push(":"), (0, t.addCodeArg)(b, m));
      return b.push("}"), new t._Code(b);
    }
    // `if` clause (or statement if `thenBody` and, optionally, `elseBody` are passed)
    if(_, b, j) {
      if (this._blockNode(new v(_)), b && j)
        this.code(b).else().code(j).endIf();
      else if (b)
        this.code(b).endIf();
      else if (j)
        throw new Error('CodeGen: "else" body without "then" body');
      return this;
    }
    // `else if` clause - invalid without `if` or after `else` clauses
    elseIf(_) {
      return this._elseNode(new v(_));
    }
    // `else` clause - only valid after `if` or `else if` clauses
    else() {
      return this._elseNode(new $());
    }
    // end `if` statement (needed if gen.if was used only with condition)
    endIf() {
      return this._endBlockNode(v, $);
    }
    _for(_, b) {
      return this._blockNode(_), b && this.code(b).endFor(), this;
    }
    // a generic `for` clause (or statement if `forBody` is passed)
    for(_, b) {
      return this._for(new C(_), b);
    }
    // `for` statement for a range of values
    forRange(_, b, j, m, p = this.opts.es5 ? r.varKinds.var : r.varKinds.let) {
      const D = this._scope.toName(_);
      return this._for(new R(p, D, b, j), () => m(D));
    }
    // `for-of` statement (in es5 mode replace with a normal for loop)
    forOf(_, b, j, m = r.varKinds.const) {
      const p = this._scope.toName(_);
      if (this.opts.es5) {
        const D = b instanceof t.Name ? b : this.var("_arr", b);
        return this.forRange("_i", 0, (0, t._)`${D}.length`, (P) => {
          this.var(p, (0, t._)`${D}[${P}]`), j(p);
        });
      }
      return this._for(new M("of", m, p, b), () => j(p));
    }
    // `for-in` statement.
    // With option `ownProperties` replaced with a `for-of` loop for object keys
    forIn(_, b, j, m = this.opts.es5 ? r.varKinds.var : r.varKinds.const) {
      if (this.opts.ownProperties)
        return this.forOf(_, (0, t._)`Object.keys(${b})`, j);
      const p = this._scope.toName(_);
      return this._for(new M("in", m, p, b), () => j(p));
    }
    // end `for` loop
    endFor() {
      return this._endBlockNode(S);
    }
    // `label` statement
    label(_) {
      return this._leafNode(new f(_));
    }
    // `break` statement
    break(_) {
      return this._leafNode(new l(_));
    }
    // `return` statement
    return(_) {
      const b = new L();
      if (this._blockNode(b), this.code(_), b.nodes.length !== 1)
        throw new Error('CodeGen: "return" should have one node');
      return this._endBlockNode(L);
    }
    // `try` statement
    try(_, b, j) {
      if (!b && !j)
        throw new Error('CodeGen: "try" without "catch" and "finally"');
      const m = new B();
      if (this._blockNode(m), this.code(_), b) {
        const p = this.name("e");
        this._currNode = m.catch = new w(p), b(p);
      }
      return j && (this._currNode = m.finally = new K(), this.code(j)), this._endBlockNode(w, K);
    }
    // `throw` statement
    throw(_) {
      return this._leafNode(new u(_));
    }
    // start self-balancing block
    block(_, b) {
      return this._blockStarts.push(this._nodes.length), _ && this.code(_).endBlock(b), this;
    }
    // end the current self-balancing block
    endBlock(_) {
      const b = this._blockStarts.pop();
      if (b === void 0)
        throw new Error("CodeGen: not in self-balancing block");
      const j = this._nodes.length - b;
      if (j < 0 || _ !== void 0 && j !== _)
        throw new Error(`CodeGen: wrong number of nodes: ${j} vs ${_} expected`);
      return this._nodes.length = b, this;
    }
    // `function` heading (or definition if funcBody is passed)
    func(_, b = t.nil, j, m) {
      return this._blockNode(new I(_, b, j)), m && this.code(m).endFunc(), this;
    }
    // end function definition
    endFunc() {
      return this._endBlockNode(I);
    }
    optimize(_ = 1) {
      for (; _-- > 0; )
        this._root.optimizeNodes(), this._root.optimizeNames(this._root.names, this._constants);
    }
    _leafNode(_) {
      return this._currNode.nodes.push(_), this;
    }
    _blockNode(_) {
      this._currNode.nodes.push(_), this._nodes.push(_);
    }
    _endBlockNode(_, b) {
      const j = this._currNode;
      if (j instanceof _ || b && j instanceof b)
        return this._nodes.pop(), this;
      throw new Error(`CodeGen: not in block "${b ? `${_.kind}/${b.kind}` : _.kind}"`);
    }
    _elseNode(_) {
      const b = this._currNode;
      if (!(b instanceof v))
        throw new Error('CodeGen: "else" without "if"');
      return this._currNode = b.else = _, this;
    }
    get _root() {
      return this._nodes[0];
    }
    get _currNode() {
      const _ = this._nodes;
      return _[_.length - 1];
    }
    set _currNode(_) {
      const b = this._nodes;
      b[b.length - 1] = _;
    }
  }
  e.CodeGen = q;
  function z(A, _) {
    for (const b in _)
      A[b] = (A[b] || 0) + (_[b] || 0);
    return A;
  }
  function X(A, _) {
    return _ instanceof t._CodeOrName ? z(A, _.names) : A;
  }
  function k(A, _, b) {
    if (A instanceof t.Name)
      return j(A);
    if (!m(A))
      return A;
    return new t._Code(A._items.reduce((p, D) => (D instanceof t.Name && (D = j(D)), D instanceof t._Code ? p.push(...D._items) : p.push(D), p), []));
    function j(p) {
      const D = b[p.str];
      return D === void 0 || _[p.str] !== 1 ? p : (delete _[p.str], D);
    }
    function m(p) {
      return p instanceof t._Code && p._items.some((D) => D instanceof t.Name && _[D.str] === 1 && b[D.str] !== void 0);
    }
  }
  function F(A, _) {
    for (const b in _)
      A[b] = (A[b] || 0) - (_[b] || 0);
  }
  function G(A) {
    return typeof A == "boolean" || typeof A == "number" || A === null ? !A : (0, t._)`!${N(A)}`;
  }
  e.not = G;
  const x = T(e.operators.AND);
  function W(...A) {
    return A.reduce(x);
  }
  e.and = W;
  const V = T(e.operators.OR);
  function U(...A) {
    return A.reduce(V);
  }
  e.or = U;
  function T(A) {
    return (_, b) => _ === t.nil ? b : b === t.nil ? _ : (0, t._)`${N(_)} ${A} ${N(b)}`;
  }
  function N(A) {
    return A instanceof t.Name ? A : (0, t._)`(${A})`;
  }
})(re);
var Y = {};
Object.defineProperty(Y, "__esModule", { value: !0 });
Y.checkStrictMode = Y.getErrorPath = Y.Type = Y.useFunc = Y.setEvaluated = Y.evaluatedPropsToName = Y.mergeEvaluated = Y.eachItem = Y.unescapeJsonPointer = Y.escapeJsonPointer = Y.escapeFragment = Y.unescapeFragment = Y.schemaRefOrVal = Y.schemaHasRulesButRef = Y.schemaHasRules = Y.checkUnknownRules = Y.alwaysValidSchema = Y.toHash = void 0;
const he = re, sC = Qi;
function cC(e) {
  const t = {};
  for (const r of e)
    t[r] = !0;
  return t;
}
Y.toHash = cC;
function lC(e, t) {
  return typeof t == "boolean" ? t : Object.keys(t).length === 0 ? !0 : (Dy(e, t), !ky(t, e.self.RULES.all));
}
Y.alwaysValidSchema = lC;
function Dy(e, t = e.schema) {
  const { opts: r, self: n } = e;
  if (!r.strictSchema || typeof t == "boolean")
    return;
  const i = n.RULES.keywords;
  for (const o in t)
    i[o] || xy(e, `unknown keyword: "${o}"`);
}
Y.checkUnknownRules = Dy;
function ky(e, t) {
  if (typeof e == "boolean")
    return !e;
  for (const r in e)
    if (t[r])
      return !0;
  return !1;
}
Y.schemaHasRules = ky;
function uC(e, t) {
  if (typeof e == "boolean")
    return !e;
  for (const r in e)
    if (r !== "$ref" && t.all[r])
      return !0;
  return !1;
}
Y.schemaHasRulesButRef = uC;
function fC({ topSchemaRef: e, schemaPath: t }, r, n, i) {
  if (!i) {
    if (typeof r == "number" || typeof r == "boolean")
      return r;
    if (typeof r == "string")
      return (0, he._)`${r}`;
  }
  return (0, he._)`${e}${t}${(0, he.getProperty)(n)}`;
}
Y.schemaRefOrVal = fC;
function dC(e) {
  return Fy(decodeURIComponent(e));
}
Y.unescapeFragment = dC;
function hC(e) {
  return encodeURIComponent(_l(e));
}
Y.escapeFragment = hC;
function _l(e) {
  return typeof e == "number" ? `${e}` : e.replace(/~/g, "~0").replace(/\//g, "~1");
}
Y.escapeJsonPointer = _l;
function Fy(e) {
  return e.replace(/~1/g, "/").replace(/~0/g, "~");
}
Y.unescapeJsonPointer = Fy;
function pC(e, t) {
  if (Array.isArray(e))
    for (const r of e)
      t(r);
  else
    t(e);
}
Y.eachItem = pC;
function th({ mergeNames: e, mergeToName: t, mergeValues: r, resultToName: n }) {
  return (i, o, a, s) => {
    const c = a === void 0 ? o : a instanceof he.Name ? (o instanceof he.Name ? e(i, o, a) : t(i, o, a), a) : o instanceof he.Name ? (t(i, a, o), o) : r(o, a);
    return s === he.Name && !(c instanceof he.Name) ? n(i, c) : c;
  };
}
Y.mergeEvaluated = {
  props: th({
    mergeNames: (e, t, r) => e.if((0, he._)`${r} !== true && ${t} !== undefined`, () => {
      e.if((0, he._)`${t} === true`, () => e.assign(r, !0), () => e.assign(r, (0, he._)`${r} || {}`).code((0, he._)`Object.assign(${r}, ${t})`));
    }),
    mergeToName: (e, t, r) => e.if((0, he._)`${r} !== true`, () => {
      t === !0 ? e.assign(r, !0) : (e.assign(r, (0, he._)`${r} || {}`), wl(e, r, t));
    }),
    mergeValues: (e, t) => e === !0 ? !0 : { ...e, ...t },
    resultToName: Ly
  }),
  items: th({
    mergeNames: (e, t, r) => e.if((0, he._)`${r} !== true && ${t} !== undefined`, () => e.assign(r, (0, he._)`${t} === true ? true : ${r} > ${t} ? ${r} : ${t}`)),
    mergeToName: (e, t, r) => e.if((0, he._)`${r} !== true`, () => e.assign(r, t === !0 ? !0 : (0, he._)`${r} > ${t} ? ${r} : ${t}`)),
    mergeValues: (e, t) => e === !0 ? !0 : Math.max(e, t),
    resultToName: (e, t) => e.var("items", t)
  })
};
function Ly(e, t) {
  if (t === !0)
    return e.var("props", !0);
  const r = e.var("props", (0, he._)`{}`);
  return t !== void 0 && wl(e, r, t), r;
}
Y.evaluatedPropsToName = Ly;
function wl(e, t, r) {
  Object.keys(r).forEach((n) => e.assign((0, he._)`${t}${(0, he.getProperty)(n)}`, !0));
}
Y.setEvaluated = wl;
const rh = {};
function mC(e, t) {
  return e.scopeValue("func", {
    ref: t,
    code: rh[t.code] || (rh[t.code] = new sC._Code(t.code))
  });
}
Y.useFunc = mC;
var Sc;
(function(e) {
  e[e.Num = 0] = "Num", e[e.Str = 1] = "Str";
})(Sc || (Y.Type = Sc = {}));
function yC(e, t, r) {
  if (e instanceof he.Name) {
    const n = t === Sc.Num;
    return r ? n ? (0, he._)`"[" + ${e} + "]"` : (0, he._)`"['" + ${e} + "']"` : n ? (0, he._)`"/" + ${e}` : (0, he._)`"/" + ${e}.replace(/~/g, "~0").replace(/\\//g, "~1")`;
  }
  return r ? (0, he.getProperty)(e).toString() : "/" + _l(e);
}
Y.getErrorPath = yC;
function xy(e, t, r = e.opts.strictSchema) {
  if (r) {
    if (t = `strict mode: ${t}`, r === !0)
      throw new Error(t);
    e.self.logger.warn(t);
  }
}
Y.checkStrictMode = xy;
var ht = {};
Object.defineProperty(ht, "__esModule", { value: !0 });
const Ge = re, gC = {
  // validation function arguments
  data: new Ge.Name("data"),
  // data passed to validation function
  // args passed from referencing schema
  valCxt: new Ge.Name("valCxt"),
  // validation/data context - should not be used directly, it is destructured to the names below
  instancePath: new Ge.Name("instancePath"),
  parentData: new Ge.Name("parentData"),
  parentDataProperty: new Ge.Name("parentDataProperty"),
  rootData: new Ge.Name("rootData"),
  // root data - same as the data passed to the first/top validation function
  dynamicAnchors: new Ge.Name("dynamicAnchors"),
  // used to support recursiveRef and dynamicRef
  // function scoped variables
  vErrors: new Ge.Name("vErrors"),
  // null or array of validation errors
  errors: new Ge.Name("errors"),
  // counter of validation errors
  this: new Ge.Name("this"),
  // "globals"
  self: new Ge.Name("self"),
  scope: new Ge.Name("scope"),
  // JTD serialize/parse name for JSON string and position
  json: new Ge.Name("json"),
  jsonPos: new Ge.Name("jsonPos"),
  jsonLen: new Ge.Name("jsonLen"),
  jsonPart: new Ge.Name("jsonPart")
};
ht.default = gC;
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.extendErrors = e.resetErrorsCount = e.reportExtraError = e.reportError = e.keyword$DataError = e.keywordError = void 0;
  const t = re, r = Y, n = ht;
  e.keywordError = {
    message: ({ keyword: $ }) => (0, t.str)`must pass "${$}" keyword validation`
  }, e.keyword$DataError = {
    message: ({ keyword: $, schemaType: v }) => v ? (0, t.str)`"${$}" keyword must be ${v} ($data)` : (0, t.str)`"${$}" keyword is invalid ($data)`
  };
  function i($, v = e.keywordError, S, C) {
    const { it: R } = $, { gen: M, compositeRule: I, allErrors: L } = R, B = u($, v, S);
    C ?? (I || L) ? c(M, B) : f(R, (0, t._)`[${B}]`);
  }
  e.reportError = i;
  function o($, v = e.keywordError, S) {
    const { it: C } = $, { gen: R, compositeRule: M, allErrors: I } = C, L = u($, v, S);
    c(R, L), M || I || f(C, n.default.vErrors);
  }
  e.reportExtraError = o;
  function a($, v) {
    $.assign(n.default.errors, v), $.if((0, t._)`${n.default.vErrors} !== null`, () => $.if(v, () => $.assign((0, t._)`${n.default.vErrors}.length`, v), () => $.assign(n.default.vErrors, null)));
  }
  e.resetErrorsCount = a;
  function s({ gen: $, keyword: v, schemaValue: S, data: C, errsCount: R, it: M }) {
    if (R === void 0)
      throw new Error("ajv implementation error");
    const I = $.name("err");
    $.forRange("i", R, n.default.errors, (L) => {
      $.const(I, (0, t._)`${n.default.vErrors}[${L}]`), $.if((0, t._)`${I}.instancePath === undefined`, () => $.assign((0, t._)`${I}.instancePath`, (0, t.strConcat)(n.default.instancePath, M.errorPath))), $.assign((0, t._)`${I}.schemaPath`, (0, t.str)`${M.errSchemaPath}/${v}`), M.opts.verbose && ($.assign((0, t._)`${I}.schema`, S), $.assign((0, t._)`${I}.data`, C));
    });
  }
  e.extendErrors = s;
  function c($, v) {
    const S = $.const("err", v);
    $.if((0, t._)`${n.default.vErrors} === null`, () => $.assign(n.default.vErrors, (0, t._)`[${S}]`), (0, t._)`${n.default.vErrors}.push(${S})`), $.code((0, t._)`${n.default.errors}++`);
  }
  function f($, v) {
    const { gen: S, validateName: C, schemaEnv: R } = $;
    R.$async ? S.throw((0, t._)`new ${$.ValidationError}(${v})`) : (S.assign((0, t._)`${C}.errors`, v), S.return(!1));
  }
  const l = {
    keyword: new t.Name("keyword"),
    schemaPath: new t.Name("schemaPath"),
    // also used in JTD errors
    params: new t.Name("params"),
    propertyName: new t.Name("propertyName"),
    message: new t.Name("message"),
    schema: new t.Name("schema"),
    parentSchema: new t.Name("parentSchema")
  };
  function u($, v, S) {
    const { createErrors: C } = $.it;
    return C === !1 ? (0, t._)`{}` : d($, v, S);
  }
  function d($, v, S = {}) {
    const { gen: C, it: R } = $, M = [
      h(R, S),
      y($, S)
    ];
    return g($, v, M), C.object(...M);
  }
  function h({ errorPath: $ }, { instancePath: v }) {
    const S = v ? (0, t.str)`${$}${(0, r.getErrorPath)(v, r.Type.Str)}` : $;
    return [n.default.instancePath, (0, t.strConcat)(n.default.instancePath, S)];
  }
  function y({ keyword: $, it: { errSchemaPath: v } }, { schemaPath: S, parentSchema: C }) {
    let R = C ? v : (0, t.str)`${v}/${$}`;
    return S && (R = (0, t.str)`${R}${(0, r.getErrorPath)(S, r.Type.Str)}`), [l.schemaPath, R];
  }
  function g($, { params: v, message: S }, C) {
    const { keyword: R, data: M, schemaValue: I, it: L } = $, { opts: B, propertyName: w, topSchemaRef: K, schemaPath: q } = L;
    C.push([l.keyword, R], [l.params, typeof v == "function" ? v($) : v || (0, t._)`{}`]), B.messages && C.push([l.message, typeof S == "function" ? S($) : S]), B.verbose && C.push([l.schema, I], [l.parentSchema, (0, t._)`${K}${q}`], [n.default.data, M]), w && C.push([l.propertyName, w]);
  }
})(go);
Object.defineProperty(Hn, "__esModule", { value: !0 });
Hn.boolOrEmptySchema = Hn.topBoolOrEmptySchema = void 0;
const vC = go, $C = re, _C = ht, wC = {
  message: "boolean schema is false"
};
function EC(e) {
  const { gen: t, schema: r, validateName: n } = e;
  r === !1 ? Uy(e, !1) : typeof r == "object" && r.$async === !0 ? t.return(_C.default.data) : (t.assign((0, $C._)`${n}.errors`, null), t.return(!0));
}
Hn.topBoolOrEmptySchema = EC;
function SC(e, t) {
  const { gen: r, schema: n } = e;
  n === !1 ? (r.var(t, !1), Uy(e)) : r.var(t, !0);
}
Hn.boolOrEmptySchema = SC;
function Uy(e, t) {
  const { gen: r, data: n } = e, i = {
    gen: r,
    keyword: "false schema",
    data: n,
    schema: !1,
    schemaCode: !1,
    schemaValue: !1,
    params: {},
    it: e
  };
  (0, vC.reportError)(i, wC, void 0, t);
}
var Ce = {}, nn = {};
Object.defineProperty(nn, "__esModule", { value: !0 });
nn.getRules = nn.isJSONType = void 0;
const bC = ["string", "number", "integer", "boolean", "null", "object", "array"], PC = new Set(bC);
function TC(e) {
  return typeof e == "string" && PC.has(e);
}
nn.isJSONType = TC;
function AC() {
  const e = {
    number: { type: "number", rules: [] },
    string: { type: "string", rules: [] },
    array: { type: "array", rules: [] },
    object: { type: "object", rules: [] }
  };
  return {
    types: { ...e, integer: !0, boolean: !0, null: !0 },
    rules: [{ rules: [] }, e.number, e.string, e.array, e.object],
    post: { rules: [] },
    all: {},
    keywords: {}
  };
}
nn.getRules = AC;
var Kt = {};
Object.defineProperty(Kt, "__esModule", { value: !0 });
Kt.shouldUseRule = Kt.shouldUseGroup = Kt.schemaHasRulesForType = void 0;
function OC({ schema: e, self: t }, r) {
  const n = t.RULES.types[r];
  return n && n !== !0 && jy(e, n);
}
Kt.schemaHasRulesForType = OC;
function jy(e, t) {
  return t.rules.some((r) => My(e, r));
}
Kt.shouldUseGroup = jy;
function My(e, t) {
  var r;
  return e[t.keyword] !== void 0 || ((r = t.definition.implements) === null || r === void 0 ? void 0 : r.some((n) => e[n] !== void 0));
}
Kt.shouldUseRule = My;
Object.defineProperty(Ce, "__esModule", { value: !0 });
Ce.reportTypeError = Ce.checkDataTypes = Ce.checkDataType = Ce.coerceAndCheckDataType = Ce.getJSONTypes = Ce.getSchemaTypes = Ce.DataType = void 0;
const CC = nn, IC = Kt, RC = go, ie = re, qy = Y;
var kn;
(function(e) {
  e[e.Correct = 0] = "Correct", e[e.Wrong = 1] = "Wrong";
})(kn || (Ce.DataType = kn = {}));
function NC(e) {
  const t = Hy(e.type);
  if (t.includes("null")) {
    if (e.nullable === !1)
      throw new Error("type: null contradicts nullable: false");
  } else {
    if (!t.length && e.nullable !== void 0)
      throw new Error('"nullable" cannot be used without "type"');
    e.nullable === !0 && t.push("null");
  }
  return t;
}
Ce.getSchemaTypes = NC;
function Hy(e) {
  const t = Array.isArray(e) ? e : e ? [e] : [];
  if (t.every(CC.isJSONType))
    return t;
  throw new Error("type must be JSONType or JSONType[]: " + t.join(","));
}
Ce.getJSONTypes = Hy;
function DC(e, t) {
  const { gen: r, data: n, opts: i } = e, o = kC(t, i.coerceTypes), a = t.length > 0 && !(o.length === 0 && t.length === 1 && (0, IC.schemaHasRulesForType)(e, t[0]));
  if (a) {
    const s = El(t, n, i.strictNumbers, kn.Wrong);
    r.if(s, () => {
      o.length ? FC(e, t, o) : Sl(e);
    });
  }
  return a;
}
Ce.coerceAndCheckDataType = DC;
const By = /* @__PURE__ */ new Set(["string", "number", "integer", "boolean", "null"]);
function kC(e, t) {
  return t ? e.filter((r) => By.has(r) || t === "array" && r === "array") : [];
}
function FC(e, t, r) {
  const { gen: n, data: i, opts: o } = e, a = n.let("dataType", (0, ie._)`typeof ${i}`), s = n.let("coerced", (0, ie._)`undefined`);
  o.coerceTypes === "array" && n.if((0, ie._)`${a} == 'object' && Array.isArray(${i}) && ${i}.length == 1`, () => n.assign(i, (0, ie._)`${i}[0]`).assign(a, (0, ie._)`typeof ${i}`).if(El(t, i, o.strictNumbers), () => n.assign(s, i))), n.if((0, ie._)`${s} !== undefined`);
  for (const f of r)
    (By.has(f) || f === "array" && o.coerceTypes === "array") && c(f);
  n.else(), Sl(e), n.endIf(), n.if((0, ie._)`${s} !== undefined`, () => {
    n.assign(i, s), LC(e, s);
  });
  function c(f) {
    switch (f) {
      case "string":
        n.elseIf((0, ie._)`${a} == "number" || ${a} == "boolean"`).assign(s, (0, ie._)`"" + ${i}`).elseIf((0, ie._)`${i} === null`).assign(s, (0, ie._)`""`);
        return;
      case "number":
        n.elseIf((0, ie._)`${a} == "boolean" || ${i} === null
              || (${a} == "string" && ${i} && ${i} == +${i})`).assign(s, (0, ie._)`+${i}`);
        return;
      case "integer":
        n.elseIf((0, ie._)`${a} === "boolean" || ${i} === null
              || (${a} === "string" && ${i} && ${i} == +${i} && !(${i} % 1))`).assign(s, (0, ie._)`+${i}`);
        return;
      case "boolean":
        n.elseIf((0, ie._)`${i} === "false" || ${i} === 0 || ${i} === null`).assign(s, !1).elseIf((0, ie._)`${i} === "true" || ${i} === 1`).assign(s, !0);
        return;
      case "null":
        n.elseIf((0, ie._)`${i} === "" || ${i} === 0 || ${i} === false`), n.assign(s, null);
        return;
      case "array":
        n.elseIf((0, ie._)`${a} === "string" || ${a} === "number"
              || ${a} === "boolean" || ${i} === null`).assign(s, (0, ie._)`[${i}]`);
    }
  }
}
function LC({ gen: e, parentData: t, parentDataProperty: r }, n) {
  e.if((0, ie._)`${t} !== undefined`, () => e.assign((0, ie._)`${t}[${r}]`, n));
}
function bc(e, t, r, n = kn.Correct) {
  const i = n === kn.Correct ? ie.operators.EQ : ie.operators.NEQ;
  let o;
  switch (e) {
    case "null":
      return (0, ie._)`${t} ${i} null`;
    case "array":
      o = (0, ie._)`Array.isArray(${t})`;
      break;
    case "object":
      o = (0, ie._)`${t} && typeof ${t} == "object" && !Array.isArray(${t})`;
      break;
    case "integer":
      o = a((0, ie._)`!(${t} % 1) && !isNaN(${t})`);
      break;
    case "number":
      o = a();
      break;
    default:
      return (0, ie._)`typeof ${t} ${i} ${e}`;
  }
  return n === kn.Correct ? o : (0, ie.not)(o);
  function a(s = ie.nil) {
    return (0, ie.and)((0, ie._)`typeof ${t} == "number"`, s, r ? (0, ie._)`isFinite(${t})` : ie.nil);
  }
}
Ce.checkDataType = bc;
function El(e, t, r, n) {
  if (e.length === 1)
    return bc(e[0], t, r, n);
  let i;
  const o = (0, qy.toHash)(e);
  if (o.array && o.object) {
    const a = (0, ie._)`typeof ${t} != "object"`;
    i = o.null ? a : (0, ie._)`!${t} || ${a}`, delete o.null, delete o.array, delete o.object;
  } else
    i = ie.nil;
  o.number && delete o.integer;
  for (const a in o)
    i = (0, ie.and)(i, bc(a, t, r, n));
  return i;
}
Ce.checkDataTypes = El;
const xC = {
  message: ({ schema: e }) => `must be ${e}`,
  params: ({ schema: e, schemaValue: t }) => typeof e == "string" ? (0, ie._)`{type: ${e}}` : (0, ie._)`{type: ${t}}`
};
function Sl(e) {
  const t = UC(e);
  (0, RC.reportError)(t, xC);
}
Ce.reportTypeError = Sl;
function UC(e) {
  const { gen: t, data: r, schema: n } = e, i = (0, qy.schemaRefOrVal)(e, n, "type");
  return {
    gen: t,
    keyword: "type",
    data: r,
    schema: n.type,
    schemaCode: i,
    schemaValue: i,
    parentSchema: n,
    params: {},
    it: e
  };
}
var Qa = {};
Object.defineProperty(Qa, "__esModule", { value: !0 });
Qa.assignDefaults = void 0;
const $n = re, jC = Y;
function MC(e, t) {
  const { properties: r, items: n } = e.schema;
  if (t === "object" && r)
    for (const i in r)
      nh(e, i, r[i].default);
  else t === "array" && Array.isArray(n) && n.forEach((i, o) => nh(e, o, i.default));
}
Qa.assignDefaults = MC;
function nh(e, t, r) {
  const { gen: n, compositeRule: i, data: o, opts: a } = e;
  if (r === void 0)
    return;
  const s = (0, $n._)`${o}${(0, $n.getProperty)(t)}`;
  if (i) {
    (0, jC.checkStrictMode)(e, `default is ignored for: ${s}`);
    return;
  }
  let c = (0, $n._)`${s} === undefined`;
  a.useDefaults === "empty" && (c = (0, $n._)`${c} || ${s} === null || ${s} === ""`), n.if(c, (0, $n._)`${s} = ${(0, $n.stringify)(r)}`);
}
var kt = {}, ae = {};
Object.defineProperty(ae, "__esModule", { value: !0 });
ae.validateUnion = ae.validateArray = ae.usePattern = ae.callValidateCode = ae.schemaProperties = ae.allSchemaProperties = ae.noPropertyInData = ae.propertyInData = ae.isOwnProperty = ae.hasPropFunc = ae.reportMissingProp = ae.checkMissingProp = ae.checkReportMissingProp = void 0;
const ge = re, bl = Y, ur = ht, qC = Y;
function HC(e, t) {
  const { gen: r, data: n, it: i } = e;
  r.if(Tl(r, n, t, i.opts.ownProperties), () => {
    e.setParams({ missingProperty: (0, ge._)`${t}` }, !0), e.error();
  });
}
ae.checkReportMissingProp = HC;
function BC({ gen: e, data: t, it: { opts: r } }, n, i) {
  return (0, ge.or)(...n.map((o) => (0, ge.and)(Tl(e, t, o, r.ownProperties), (0, ge._)`${i} = ${o}`)));
}
ae.checkMissingProp = BC;
function GC(e, t) {
  e.setParams({ missingProperty: t }, !0), e.error();
}
ae.reportMissingProp = GC;
function Gy(e) {
  return e.scopeValue("func", {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    ref: Object.prototype.hasOwnProperty,
    code: (0, ge._)`Object.prototype.hasOwnProperty`
  });
}
ae.hasPropFunc = Gy;
function Pl(e, t, r) {
  return (0, ge._)`${Gy(e)}.call(${t}, ${r})`;
}
ae.isOwnProperty = Pl;
function VC(e, t, r, n) {
  const i = (0, ge._)`${t}${(0, ge.getProperty)(r)} !== undefined`;
  return n ? (0, ge._)`${i} && ${Pl(e, t, r)}` : i;
}
ae.propertyInData = VC;
function Tl(e, t, r, n) {
  const i = (0, ge._)`${t}${(0, ge.getProperty)(r)} === undefined`;
  return n ? (0, ge.or)(i, (0, ge.not)(Pl(e, t, r))) : i;
}
ae.noPropertyInData = Tl;
function Vy(e) {
  return e ? Object.keys(e).filter((t) => t !== "__proto__") : [];
}
ae.allSchemaProperties = Vy;
function zC(e, t) {
  return Vy(t).filter((r) => !(0, bl.alwaysValidSchema)(e, t[r]));
}
ae.schemaProperties = zC;
function WC({ schemaCode: e, data: t, it: { gen: r, topSchemaRef: n, schemaPath: i, errorPath: o }, it: a }, s, c, f) {
  const l = f ? (0, ge._)`${e}, ${t}, ${n}${i}` : t, u = [
    [ur.default.instancePath, (0, ge.strConcat)(ur.default.instancePath, o)],
    [ur.default.parentData, a.parentData],
    [ur.default.parentDataProperty, a.parentDataProperty],
    [ur.default.rootData, ur.default.rootData]
  ];
  a.opts.dynamicRef && u.push([ur.default.dynamicAnchors, ur.default.dynamicAnchors]);
  const d = (0, ge._)`${l}, ${r.object(...u)}`;
  return c !== ge.nil ? (0, ge._)`${s}.call(${c}, ${d})` : (0, ge._)`${s}(${d})`;
}
ae.callValidateCode = WC;
const KC = (0, ge._)`new RegExp`;
function YC({ gen: e, it: { opts: t } }, r) {
  const n = t.unicodeRegExp ? "u" : "", { regExp: i } = t.code, o = i(r, n);
  return e.scopeValue("pattern", {
    key: o.toString(),
    ref: o,
    code: (0, ge._)`${i.code === "new RegExp" ? KC : (0, qC.useFunc)(e, i)}(${r}, ${n})`
  });
}
ae.usePattern = YC;
function XC(e) {
  const { gen: t, data: r, keyword: n, it: i } = e, o = t.name("valid");
  if (i.allErrors) {
    const s = t.let("valid", !0);
    return a(() => t.assign(s, !1)), s;
  }
  return t.var(o, !0), a(() => t.break()), o;
  function a(s) {
    const c = t.const("len", (0, ge._)`${r}.length`);
    t.forRange("i", 0, c, (f) => {
      e.subschema({
        keyword: n,
        dataProp: f,
        dataPropType: bl.Type.Num
      }, o), t.if((0, ge.not)(o), s);
    });
  }
}
ae.validateArray = XC;
function JC(e) {
  const { gen: t, schema: r, keyword: n, it: i } = e;
  if (!Array.isArray(r))
    throw new Error("ajv implementation error");
  if (r.some((c) => (0, bl.alwaysValidSchema)(i, c)) && !i.opts.unevaluated)
    return;
  const a = t.let("valid", !1), s = t.name("_valid");
  t.block(() => r.forEach((c, f) => {
    const l = e.subschema({
      keyword: n,
      schemaProp: f,
      compositeRule: !0
    }, s);
    t.assign(a, (0, ge._)`${a} || ${s}`), e.mergeValidEvaluated(l, s) || t.if((0, ge.not)(a));
  })), e.result(a, () => e.reset(), () => e.error(!0));
}
ae.validateUnion = JC;
Object.defineProperty(kt, "__esModule", { value: !0 });
kt.validateKeywordUsage = kt.validSchemaType = kt.funcKeywordCode = kt.macroKeywordCode = void 0;
const Je = re, Kr = ht, QC = ae, ZC = go;
function eI(e, t) {
  const { gen: r, keyword: n, schema: i, parentSchema: o, it: a } = e, s = t.macro.call(a.self, i, o, a), c = zy(r, n, s);
  a.opts.validateSchema !== !1 && a.self.validateSchema(s, !0);
  const f = r.name("valid");
  e.subschema({
    schema: s,
    schemaPath: Je.nil,
    errSchemaPath: `${a.errSchemaPath}/${n}`,
    topSchemaRef: c,
    compositeRule: !0
  }, f), e.pass(f, () => e.error(!0));
}
kt.macroKeywordCode = eI;
function tI(e, t) {
  var r;
  const { gen: n, keyword: i, schema: o, parentSchema: a, $data: s, it: c } = e;
  nI(c, t);
  const f = !s && t.compile ? t.compile.call(c.self, o, a, c) : t.validate, l = zy(n, i, f), u = n.let("valid");
  e.block$data(u, d), e.ok((r = t.valid) !== null && r !== void 0 ? r : u);
  function d() {
    if (t.errors === !1)
      g(), t.modifying && ih(e), $(() => e.error());
    else {
      const v = t.async ? h() : y();
      t.modifying && ih(e), $(() => rI(e, v));
    }
  }
  function h() {
    const v = n.let("ruleErrs", null);
    return n.try(() => g((0, Je._)`await `), (S) => n.assign(u, !1).if((0, Je._)`${S} instanceof ${c.ValidationError}`, () => n.assign(v, (0, Je._)`${S}.errors`), () => n.throw(S))), v;
  }
  function y() {
    const v = (0, Je._)`${l}.errors`;
    return n.assign(v, null), g(Je.nil), v;
  }
  function g(v = t.async ? (0, Je._)`await ` : Je.nil) {
    const S = c.opts.passContext ? Kr.default.this : Kr.default.self, C = !("compile" in t && !s || t.schema === !1);
    n.assign(u, (0, Je._)`${v}${(0, QC.callValidateCode)(e, l, S, C)}`, t.modifying);
  }
  function $(v) {
    var S;
    n.if((0, Je.not)((S = t.valid) !== null && S !== void 0 ? S : u), v);
  }
}
kt.funcKeywordCode = tI;
function ih(e) {
  const { gen: t, data: r, it: n } = e;
  t.if(n.parentData, () => t.assign(r, (0, Je._)`${n.parentData}[${n.parentDataProperty}]`));
}
function rI(e, t) {
  const { gen: r } = e;
  r.if((0, Je._)`Array.isArray(${t})`, () => {
    r.assign(Kr.default.vErrors, (0, Je._)`${Kr.default.vErrors} === null ? ${t} : ${Kr.default.vErrors}.concat(${t})`).assign(Kr.default.errors, (0, Je._)`${Kr.default.vErrors}.length`), (0, ZC.extendErrors)(e);
  }, () => e.error());
}
function nI({ schemaEnv: e }, t) {
  if (t.async && !e.$async)
    throw new Error("async keyword in sync schema");
}
function zy(e, t, r) {
  if (r === void 0)
    throw new Error(`keyword "${t}" failed to compile`);
  return e.scopeValue("keyword", typeof r == "function" ? { ref: r } : { ref: r, code: (0, Je.stringify)(r) });
}
function iI(e, t, r = !1) {
  return !t.length || t.some((n) => n === "array" ? Array.isArray(e) : n === "object" ? e && typeof e == "object" && !Array.isArray(e) : typeof e == n || r && typeof e > "u");
}
kt.validSchemaType = iI;
function oI({ schema: e, opts: t, self: r, errSchemaPath: n }, i, o) {
  if (Array.isArray(i.keyword) ? !i.keyword.includes(o) : i.keyword !== o)
    throw new Error("ajv implementation error");
  const a = i.dependencies;
  if (a != null && a.some((s) => !Object.prototype.hasOwnProperty.call(e, s)))
    throw new Error(`parent schema must have dependencies of ${o}: ${a.join(",")}`);
  if (i.validateSchema && !i.validateSchema(e[o])) {
    const c = `keyword "${o}" value is invalid at path "${n}": ` + r.errorsText(i.validateSchema.errors);
    if (t.validateSchema === "log")
      r.logger.error(c);
    else
      throw new Error(c);
  }
}
kt.validateKeywordUsage = oI;
var br = {};
Object.defineProperty(br, "__esModule", { value: !0 });
br.extendSubschemaMode = br.extendSubschemaData = br.getSubschema = void 0;
const Nt = re, Wy = Y;
function aI(e, { keyword: t, schemaProp: r, schema: n, schemaPath: i, errSchemaPath: o, topSchemaRef: a }) {
  if (t !== void 0 && n !== void 0)
    throw new Error('both "keyword" and "schema" passed, only one allowed');
  if (t !== void 0) {
    const s = e.schema[t];
    return r === void 0 ? {
      schema: s,
      schemaPath: (0, Nt._)`${e.schemaPath}${(0, Nt.getProperty)(t)}`,
      errSchemaPath: `${e.errSchemaPath}/${t}`
    } : {
      schema: s[r],
      schemaPath: (0, Nt._)`${e.schemaPath}${(0, Nt.getProperty)(t)}${(0, Nt.getProperty)(r)}`,
      errSchemaPath: `${e.errSchemaPath}/${t}/${(0, Wy.escapeFragment)(r)}`
    };
  }
  if (n !== void 0) {
    if (i === void 0 || o === void 0 || a === void 0)
      throw new Error('"schemaPath", "errSchemaPath" and "topSchemaRef" are required with "schema"');
    return {
      schema: n,
      schemaPath: i,
      topSchemaRef: a,
      errSchemaPath: o
    };
  }
  throw new Error('either "keyword" or "schema" must be passed');
}
br.getSubschema = aI;
function sI(e, t, { dataProp: r, dataPropType: n, data: i, dataTypes: o, propertyName: a }) {
  if (i !== void 0 && r !== void 0)
    throw new Error('both "data" and "dataProp" passed, only one allowed');
  const { gen: s } = t;
  if (r !== void 0) {
    const { errorPath: f, dataPathArr: l, opts: u } = t, d = s.let("data", (0, Nt._)`${t.data}${(0, Nt.getProperty)(r)}`, !0);
    c(d), e.errorPath = (0, Nt.str)`${f}${(0, Wy.getErrorPath)(r, n, u.jsPropertySyntax)}`, e.parentDataProperty = (0, Nt._)`${r}`, e.dataPathArr = [...l, e.parentDataProperty];
  }
  if (i !== void 0) {
    const f = i instanceof Nt.Name ? i : s.let("data", i, !0);
    c(f), a !== void 0 && (e.propertyName = a);
  }
  o && (e.dataTypes = o);
  function c(f) {
    e.data = f, e.dataLevel = t.dataLevel + 1, e.dataTypes = [], t.definedProperties = /* @__PURE__ */ new Set(), e.parentData = t.data, e.dataNames = [...t.dataNames, f];
  }
}
br.extendSubschemaData = sI;
function cI(e, { jtdDiscriminator: t, jtdMetadata: r, compositeRule: n, createErrors: i, allErrors: o }) {
  n !== void 0 && (e.compositeRule = n), i !== void 0 && (e.createErrors = i), o !== void 0 && (e.allErrors = o), e.jtdDiscriminator = t, e.jtdMetadata = r;
}
br.extendSubschemaMode = cI;
var je = {}, Ky = function e(t, r) {
  if (t === r) return !0;
  if (t && r && typeof t == "object" && typeof r == "object") {
    if (t.constructor !== r.constructor) return !1;
    var n, i, o;
    if (Array.isArray(t)) {
      if (n = t.length, n != r.length) return !1;
      for (i = n; i-- !== 0; )
        if (!e(t[i], r[i])) return !1;
      return !0;
    }
    if (t.constructor === RegExp) return t.source === r.source && t.flags === r.flags;
    if (t.valueOf !== Object.prototype.valueOf) return t.valueOf() === r.valueOf();
    if (t.toString !== Object.prototype.toString) return t.toString() === r.toString();
    if (o = Object.keys(t), n = o.length, n !== Object.keys(r).length) return !1;
    for (i = n; i-- !== 0; )
      if (!Object.prototype.hasOwnProperty.call(r, o[i])) return !1;
    for (i = n; i-- !== 0; ) {
      var a = o[i];
      if (!e(t[a], r[a])) return !1;
    }
    return !0;
  }
  return t !== t && r !== r;
}, Yy = { exports: {} }, Er = Yy.exports = function(e, t, r) {
  typeof t == "function" && (r = t, t = {}), r = t.cb || r;
  var n = typeof r == "function" ? r : r.pre || function() {
  }, i = r.post || function() {
  };
  Qo(t, n, i, e, "", e);
};
Er.keywords = {
  additionalItems: !0,
  items: !0,
  contains: !0,
  additionalProperties: !0,
  propertyNames: !0,
  not: !0,
  if: !0,
  then: !0,
  else: !0
};
Er.arrayKeywords = {
  items: !0,
  allOf: !0,
  anyOf: !0,
  oneOf: !0
};
Er.propsKeywords = {
  $defs: !0,
  definitions: !0,
  properties: !0,
  patternProperties: !0,
  dependencies: !0
};
Er.skipKeywords = {
  default: !0,
  enum: !0,
  const: !0,
  required: !0,
  maximum: !0,
  minimum: !0,
  exclusiveMaximum: !0,
  exclusiveMinimum: !0,
  multipleOf: !0,
  maxLength: !0,
  minLength: !0,
  pattern: !0,
  format: !0,
  maxItems: !0,
  minItems: !0,
  uniqueItems: !0,
  maxProperties: !0,
  minProperties: !0
};
function Qo(e, t, r, n, i, o, a, s, c, f) {
  if (n && typeof n == "object" && !Array.isArray(n)) {
    t(n, i, o, a, s, c, f);
    for (var l in n) {
      var u = n[l];
      if (Array.isArray(u)) {
        if (l in Er.arrayKeywords)
          for (var d = 0; d < u.length; d++)
            Qo(e, t, r, u[d], i + "/" + l + "/" + d, o, i, l, n, d);
      } else if (l in Er.propsKeywords) {
        if (u && typeof u == "object")
          for (var h in u)
            Qo(e, t, r, u[h], i + "/" + l + "/" + lI(h), o, i, l, n, h);
      } else (l in Er.keywords || e.allKeys && !(l in Er.skipKeywords)) && Qo(e, t, r, u, i + "/" + l, o, i, l, n);
    }
    r(n, i, o, a, s, c, f);
  }
}
function lI(e) {
  return e.replace(/~/g, "~0").replace(/\//g, "~1");
}
var uI = Yy.exports;
Object.defineProperty(je, "__esModule", { value: !0 });
je.getSchemaRefs = je.resolveUrl = je.normalizeId = je._getFullPath = je.getFullPath = je.inlineRef = void 0;
const fI = Y, dI = Ky, hI = uI, pI = /* @__PURE__ */ new Set([
  "type",
  "format",
  "pattern",
  "maxLength",
  "minLength",
  "maxProperties",
  "minProperties",
  "maxItems",
  "minItems",
  "maximum",
  "minimum",
  "uniqueItems",
  "multipleOf",
  "required",
  "enum",
  "const"
]);
function mI(e, t = !0) {
  return typeof e == "boolean" ? !0 : t === !0 ? !Pc(e) : t ? Xy(e) <= t : !1;
}
je.inlineRef = mI;
const yI = /* @__PURE__ */ new Set([
  "$ref",
  "$recursiveRef",
  "$recursiveAnchor",
  "$dynamicRef",
  "$dynamicAnchor"
]);
function Pc(e) {
  for (const t in e) {
    if (yI.has(t))
      return !0;
    const r = e[t];
    if (Array.isArray(r) && r.some(Pc) || typeof r == "object" && Pc(r))
      return !0;
  }
  return !1;
}
function Xy(e) {
  let t = 0;
  for (const r in e) {
    if (r === "$ref")
      return 1 / 0;
    if (t++, !pI.has(r) && (typeof e[r] == "object" && (0, fI.eachItem)(e[r], (n) => t += Xy(n)), t === 1 / 0))
      return 1 / 0;
  }
  return t;
}
function Jy(e, t = "", r) {
  r !== !1 && (t = Fn(t));
  const n = e.parse(t);
  return Qy(e, n);
}
je.getFullPath = Jy;
function Qy(e, t) {
  return e.serialize(t).split("#")[0] + "#";
}
je._getFullPath = Qy;
const gI = /#\/?$/;
function Fn(e) {
  return e ? e.replace(gI, "") : "";
}
je.normalizeId = Fn;
function vI(e, t, r) {
  return r = Fn(r), e.resolve(t, r);
}
je.resolveUrl = vI;
const $I = /^[a-z_][-a-z0-9._]*$/i;
function _I(e, t) {
  if (typeof e == "boolean")
    return {};
  const { schemaId: r, uriResolver: n } = this.opts, i = Fn(e[r] || t), o = { "": i }, a = Jy(n, i, !1), s = {}, c = /* @__PURE__ */ new Set();
  return hI(e, { allKeys: !0 }, (u, d, h, y) => {
    if (y === void 0)
      return;
    const g = a + d;
    let $ = o[y];
    typeof u[r] == "string" && ($ = v.call(this, u[r])), S.call(this, u.$anchor), S.call(this, u.$dynamicAnchor), o[d] = $;
    function v(C) {
      const R = this.opts.uriResolver.resolve;
      if (C = Fn($ ? R($, C) : C), c.has(C))
        throw l(C);
      c.add(C);
      let M = this.refs[C];
      return typeof M == "string" && (M = this.refs[M]), typeof M == "object" ? f(u, M.schema, C) : C !== Fn(g) && (C[0] === "#" ? (f(u, s[C], C), s[C] = u) : this.refs[C] = g), C;
    }
    function S(C) {
      if (typeof C == "string") {
        if (!$I.test(C))
          throw new Error(`invalid anchor "${C}"`);
        v.call(this, `#${C}`);
      }
    }
  }), s;
  function f(u, d, h) {
    if (d !== void 0 && !dI(u, d))
      throw l(h);
  }
  function l(u) {
    return new Error(`reference "${u}" resolves to more than one schema`);
  }
}
je.getSchemaRefs = _I;
Object.defineProperty($t, "__esModule", { value: !0 });
$t.getData = $t.KeywordCxt = $t.validateFunctionCode = void 0;
const Zy = Hn, oh = Ce, Al = Kt, ga = Ce, wI = Qa, ki = kt, Ys = br, Q = re, te = ht, EI = je, Yt = Y, Si = go;
function SI(e) {
  if (rg(e) && (ng(e), tg(e))) {
    TI(e);
    return;
  }
  eg(e, () => (0, Zy.topBoolOrEmptySchema)(e));
}
$t.validateFunctionCode = SI;
function eg({ gen: e, validateName: t, schema: r, schemaEnv: n, opts: i }, o) {
  i.code.es5 ? e.func(t, (0, Q._)`${te.default.data}, ${te.default.valCxt}`, n.$async, () => {
    e.code((0, Q._)`"use strict"; ${ah(r, i)}`), PI(e, i), e.code(o);
  }) : e.func(t, (0, Q._)`${te.default.data}, ${bI(i)}`, n.$async, () => e.code(ah(r, i)).code(o));
}
function bI(e) {
  return (0, Q._)`{${te.default.instancePath}="", ${te.default.parentData}, ${te.default.parentDataProperty}, ${te.default.rootData}=${te.default.data}${e.dynamicRef ? (0, Q._)`, ${te.default.dynamicAnchors}={}` : Q.nil}}={}`;
}
function PI(e, t) {
  e.if(te.default.valCxt, () => {
    e.var(te.default.instancePath, (0, Q._)`${te.default.valCxt}.${te.default.instancePath}`), e.var(te.default.parentData, (0, Q._)`${te.default.valCxt}.${te.default.parentData}`), e.var(te.default.parentDataProperty, (0, Q._)`${te.default.valCxt}.${te.default.parentDataProperty}`), e.var(te.default.rootData, (0, Q._)`${te.default.valCxt}.${te.default.rootData}`), t.dynamicRef && e.var(te.default.dynamicAnchors, (0, Q._)`${te.default.valCxt}.${te.default.dynamicAnchors}`);
  }, () => {
    e.var(te.default.instancePath, (0, Q._)`""`), e.var(te.default.parentData, (0, Q._)`undefined`), e.var(te.default.parentDataProperty, (0, Q._)`undefined`), e.var(te.default.rootData, te.default.data), t.dynamicRef && e.var(te.default.dynamicAnchors, (0, Q._)`{}`);
  });
}
function TI(e) {
  const { schema: t, opts: r, gen: n } = e;
  eg(e, () => {
    r.$comment && t.$comment && og(e), RI(e), n.let(te.default.vErrors, null), n.let(te.default.errors, 0), r.unevaluated && AI(e), ig(e), kI(e);
  });
}
function AI(e) {
  const { gen: t, validateName: r } = e;
  e.evaluated = t.const("evaluated", (0, Q._)`${r}.evaluated`), t.if((0, Q._)`${e.evaluated}.dynamicProps`, () => t.assign((0, Q._)`${e.evaluated}.props`, (0, Q._)`undefined`)), t.if((0, Q._)`${e.evaluated}.dynamicItems`, () => t.assign((0, Q._)`${e.evaluated}.items`, (0, Q._)`undefined`));
}
function ah(e, t) {
  const r = typeof e == "object" && e[t.schemaId];
  return r && (t.code.source || t.code.process) ? (0, Q._)`/*# sourceURL=${r} */` : Q.nil;
}
function OI(e, t) {
  if (rg(e) && (ng(e), tg(e))) {
    CI(e, t);
    return;
  }
  (0, Zy.boolOrEmptySchema)(e, t);
}
function tg({ schema: e, self: t }) {
  if (typeof e == "boolean")
    return !e;
  for (const r in e)
    if (t.RULES.all[r])
      return !0;
  return !1;
}
function rg(e) {
  return typeof e.schema != "boolean";
}
function CI(e, t) {
  const { schema: r, gen: n, opts: i } = e;
  i.$comment && r.$comment && og(e), NI(e), DI(e);
  const o = n.const("_errs", te.default.errors);
  ig(e, o), n.var(t, (0, Q._)`${o} === ${te.default.errors}`);
}
function ng(e) {
  (0, Yt.checkUnknownRules)(e), II(e);
}
function ig(e, t) {
  if (e.opts.jtd)
    return sh(e, [], !1, t);
  const r = (0, oh.getSchemaTypes)(e.schema), n = (0, oh.coerceAndCheckDataType)(e, r);
  sh(e, r, !n, t);
}
function II(e) {
  const { schema: t, errSchemaPath: r, opts: n, self: i } = e;
  t.$ref && n.ignoreKeywordsWithRef && (0, Yt.schemaHasRulesButRef)(t, i.RULES) && i.logger.warn(`$ref: keywords ignored in schema at path "${r}"`);
}
function RI(e) {
  const { schema: t, opts: r } = e;
  t.default !== void 0 && r.useDefaults && r.strictSchema && (0, Yt.checkStrictMode)(e, "default is ignored in the schema root");
}
function NI(e) {
  const t = e.schema[e.opts.schemaId];
  t && (e.baseId = (0, EI.resolveUrl)(e.opts.uriResolver, e.baseId, t));
}
function DI(e) {
  if (e.schema.$async && !e.schemaEnv.$async)
    throw new Error("async schema in sync schema");
}
function og({ gen: e, schemaEnv: t, schema: r, errSchemaPath: n, opts: i }) {
  const o = r.$comment;
  if (i.$comment === !0)
    e.code((0, Q._)`${te.default.self}.logger.log(${o})`);
  else if (typeof i.$comment == "function") {
    const a = (0, Q.str)`${n}/$comment`, s = e.scopeValue("root", { ref: t.root });
    e.code((0, Q._)`${te.default.self}.opts.$comment(${o}, ${a}, ${s}.schema)`);
  }
}
function kI(e) {
  const { gen: t, schemaEnv: r, validateName: n, ValidationError: i, opts: o } = e;
  r.$async ? t.if((0, Q._)`${te.default.errors} === 0`, () => t.return(te.default.data), () => t.throw((0, Q._)`new ${i}(${te.default.vErrors})`)) : (t.assign((0, Q._)`${n}.errors`, te.default.vErrors), o.unevaluated && FI(e), t.return((0, Q._)`${te.default.errors} === 0`));
}
function FI({ gen: e, evaluated: t, props: r, items: n }) {
  r instanceof Q.Name && e.assign((0, Q._)`${t}.props`, r), n instanceof Q.Name && e.assign((0, Q._)`${t}.items`, n);
}
function sh(e, t, r, n) {
  const { gen: i, schema: o, data: a, allErrors: s, opts: c, self: f } = e, { RULES: l } = f;
  if (o.$ref && (c.ignoreKeywordsWithRef || !(0, Yt.schemaHasRulesButRef)(o, l))) {
    i.block(() => cg(e, "$ref", l.all.$ref.definition));
    return;
  }
  c.jtd || LI(e, t), i.block(() => {
    for (const d of l.rules)
      u(d);
    u(l.post);
  });
  function u(d) {
    (0, Al.shouldUseGroup)(o, d) && (d.type ? (i.if((0, ga.checkDataType)(d.type, a, c.strictNumbers)), ch(e, d), t.length === 1 && t[0] === d.type && r && (i.else(), (0, ga.reportTypeError)(e)), i.endIf()) : ch(e, d), s || i.if((0, Q._)`${te.default.errors} === ${n || 0}`));
  }
}
function ch(e, t) {
  const { gen: r, schema: n, opts: { useDefaults: i } } = e;
  i && (0, wI.assignDefaults)(e, t.type), r.block(() => {
    for (const o of t.rules)
      (0, Al.shouldUseRule)(n, o) && cg(e, o.keyword, o.definition, t.type);
  });
}
function LI(e, t) {
  e.schemaEnv.meta || !e.opts.strictTypes || (xI(e, t), e.opts.allowUnionTypes || UI(e, t), jI(e, e.dataTypes));
}
function xI(e, t) {
  if (t.length) {
    if (!e.dataTypes.length) {
      e.dataTypes = t;
      return;
    }
    t.forEach((r) => {
      ag(e.dataTypes, r) || Ol(e, `type "${r}" not allowed by context "${e.dataTypes.join(",")}"`);
    }), qI(e, t);
  }
}
function UI(e, t) {
  t.length > 1 && !(t.length === 2 && t.includes("null")) && Ol(e, "use allowUnionTypes to allow union type keyword");
}
function jI(e, t) {
  const r = e.self.RULES.all;
  for (const n in r) {
    const i = r[n];
    if (typeof i == "object" && (0, Al.shouldUseRule)(e.schema, i)) {
      const { type: o } = i.definition;
      o.length && !o.some((a) => MI(t, a)) && Ol(e, `missing type "${o.join(",")}" for keyword "${n}"`);
    }
  }
}
function MI(e, t) {
  return e.includes(t) || t === "number" && e.includes("integer");
}
function ag(e, t) {
  return e.includes(t) || t === "integer" && e.includes("number");
}
function qI(e, t) {
  const r = [];
  for (const n of e.dataTypes)
    ag(t, n) ? r.push(n) : t.includes("integer") && n === "number" && r.push("integer");
  e.dataTypes = r;
}
function Ol(e, t) {
  const r = e.schemaEnv.baseId + e.errSchemaPath;
  t += ` at "${r}" (strictTypes)`, (0, Yt.checkStrictMode)(e, t, e.opts.strictTypes);
}
class sg {
  constructor(t, r, n) {
    if ((0, ki.validateKeywordUsage)(t, r, n), this.gen = t.gen, this.allErrors = t.allErrors, this.keyword = n, this.data = t.data, this.schema = t.schema[n], this.$data = r.$data && t.opts.$data && this.schema && this.schema.$data, this.schemaValue = (0, Yt.schemaRefOrVal)(t, this.schema, n, this.$data), this.schemaType = r.schemaType, this.parentSchema = t.schema, this.params = {}, this.it = t, this.def = r, this.$data)
      this.schemaCode = t.gen.const("vSchema", lg(this.$data, t));
    else if (this.schemaCode = this.schemaValue, !(0, ki.validSchemaType)(this.schema, r.schemaType, r.allowUndefined))
      throw new Error(`${n} value must be ${JSON.stringify(r.schemaType)}`);
    ("code" in r ? r.trackErrors : r.errors !== !1) && (this.errsCount = t.gen.const("_errs", te.default.errors));
  }
  result(t, r, n) {
    this.failResult((0, Q.not)(t), r, n);
  }
  failResult(t, r, n) {
    this.gen.if(t), n ? n() : this.error(), r ? (this.gen.else(), r(), this.allErrors && this.gen.endIf()) : this.allErrors ? this.gen.endIf() : this.gen.else();
  }
  pass(t, r) {
    this.failResult((0, Q.not)(t), void 0, r);
  }
  fail(t) {
    if (t === void 0) {
      this.error(), this.allErrors || this.gen.if(!1);
      return;
    }
    this.gen.if(t), this.error(), this.allErrors ? this.gen.endIf() : this.gen.else();
  }
  fail$data(t) {
    if (!this.$data)
      return this.fail(t);
    const { schemaCode: r } = this;
    this.fail((0, Q._)`${r} !== undefined && (${(0, Q.or)(this.invalid$data(), t)})`);
  }
  error(t, r, n) {
    if (r) {
      this.setParams(r), this._error(t, n), this.setParams({});
      return;
    }
    this._error(t, n);
  }
  _error(t, r) {
    (t ? Si.reportExtraError : Si.reportError)(this, this.def.error, r);
  }
  $dataError() {
    (0, Si.reportError)(this, this.def.$dataError || Si.keyword$DataError);
  }
  reset() {
    if (this.errsCount === void 0)
      throw new Error('add "trackErrors" to keyword definition');
    (0, Si.resetErrorsCount)(this.gen, this.errsCount);
  }
  ok(t) {
    this.allErrors || this.gen.if(t);
  }
  setParams(t, r) {
    r ? Object.assign(this.params, t) : this.params = t;
  }
  block$data(t, r, n = Q.nil) {
    this.gen.block(() => {
      this.check$data(t, n), r();
    });
  }
  check$data(t = Q.nil, r = Q.nil) {
    if (!this.$data)
      return;
    const { gen: n, schemaCode: i, schemaType: o, def: a } = this;
    n.if((0, Q.or)((0, Q._)`${i} === undefined`, r)), t !== Q.nil && n.assign(t, !0), (o.length || a.validateSchema) && (n.elseIf(this.invalid$data()), this.$dataError(), t !== Q.nil && n.assign(t, !1)), n.else();
  }
  invalid$data() {
    const { gen: t, schemaCode: r, schemaType: n, def: i, it: o } = this;
    return (0, Q.or)(a(), s());
    function a() {
      if (n.length) {
        if (!(r instanceof Q.Name))
          throw new Error("ajv implementation error");
        const c = Array.isArray(n) ? n : [n];
        return (0, Q._)`${(0, ga.checkDataTypes)(c, r, o.opts.strictNumbers, ga.DataType.Wrong)}`;
      }
      return Q.nil;
    }
    function s() {
      if (i.validateSchema) {
        const c = t.scopeValue("validate$data", { ref: i.validateSchema });
        return (0, Q._)`!${c}(${r})`;
      }
      return Q.nil;
    }
  }
  subschema(t, r) {
    const n = (0, Ys.getSubschema)(this.it, t);
    (0, Ys.extendSubschemaData)(n, this.it, t), (0, Ys.extendSubschemaMode)(n, t);
    const i = { ...this.it, ...n, items: void 0, props: void 0 };
    return OI(i, r), i;
  }
  mergeEvaluated(t, r) {
    const { it: n, gen: i } = this;
    n.opts.unevaluated && (n.props !== !0 && t.props !== void 0 && (n.props = Yt.mergeEvaluated.props(i, t.props, n.props, r)), n.items !== !0 && t.items !== void 0 && (n.items = Yt.mergeEvaluated.items(i, t.items, n.items, r)));
  }
  mergeValidEvaluated(t, r) {
    const { it: n, gen: i } = this;
    if (n.opts.unevaluated && (n.props !== !0 || n.items !== !0))
      return i.if(r, () => this.mergeEvaluated(t, Q.Name)), !0;
  }
}
$t.KeywordCxt = sg;
function cg(e, t, r, n) {
  const i = new sg(e, r, t);
  "code" in r ? r.code(i, n) : i.$data && r.validate ? (0, ki.funcKeywordCode)(i, r) : "macro" in r ? (0, ki.macroKeywordCode)(i, r) : (r.compile || r.validate) && (0, ki.funcKeywordCode)(i, r);
}
const HI = /^\/(?:[^~]|~0|~1)*$/, BI = /^([0-9]+)(#|\/(?:[^~]|~0|~1)*)?$/;
function lg(e, { dataLevel: t, dataNames: r, dataPathArr: n }) {
  let i, o;
  if (e === "")
    return te.default.rootData;
  if (e[0] === "/") {
    if (!HI.test(e))
      throw new Error(`Invalid JSON-pointer: ${e}`);
    i = e, o = te.default.rootData;
  } else {
    const f = BI.exec(e);
    if (!f)
      throw new Error(`Invalid JSON-pointer: ${e}`);
    const l = +f[1];
    if (i = f[2], i === "#") {
      if (l >= t)
        throw new Error(c("property/index", l));
      return n[t - l];
    }
    if (l > t)
      throw new Error(c("data", l));
    if (o = r[t - l], !i)
      return o;
  }
  let a = o;
  const s = i.split("/");
  for (const f of s)
    f && (o = (0, Q._)`${o}${(0, Q.getProperty)((0, Yt.unescapeJsonPointer)(f))}`, a = (0, Q._)`${a} && ${o}`);
  return a;
  function c(f, l) {
    return `Cannot access ${f} ${l} levels up, current level is ${t}`;
  }
}
$t.getData = lg;
var Xn = {};
Object.defineProperty(Xn, "__esModule", { value: !0 });
class GI extends Error {
  constructor(t) {
    super("validation failed"), this.errors = t, this.ajv = this.validation = !0;
  }
}
Xn.default = GI;
var un = {};
Object.defineProperty(un, "__esModule", { value: !0 });
const Xs = je;
class VI extends Error {
  constructor(t, r, n, i) {
    super(i || `can't resolve reference ${n} from id ${r}`), this.missingRef = (0, Xs.resolveUrl)(t, r, n), this.missingSchema = (0, Xs.normalizeId)((0, Xs.getFullPath)(t, this.missingRef));
  }
}
un.default = VI;
var Qe = {};
Object.defineProperty(Qe, "__esModule", { value: !0 });
Qe.resolveSchema = Qe.getCompilingSchema = Qe.resolveRef = Qe.compileSchema = Qe.SchemaEnv = void 0;
const Et = re, zI = Xn, Gr = ht, Pt = je, lh = Y, WI = $t;
class Za {
  constructor(t) {
    var r;
    this.refs = {}, this.dynamicAnchors = {};
    let n;
    typeof t.schema == "object" && (n = t.schema), this.schema = t.schema, this.schemaId = t.schemaId, this.root = t.root || this, this.baseId = (r = t.baseId) !== null && r !== void 0 ? r : (0, Pt.normalizeId)(n == null ? void 0 : n[t.schemaId || "$id"]), this.schemaPath = t.schemaPath, this.localRefs = t.localRefs, this.meta = t.meta, this.$async = n == null ? void 0 : n.$async, this.refs = {};
  }
}
Qe.SchemaEnv = Za;
function Cl(e) {
  const t = ug.call(this, e);
  if (t)
    return t;
  const r = (0, Pt.getFullPath)(this.opts.uriResolver, e.root.baseId), { es5: n, lines: i } = this.opts.code, { ownProperties: o } = this.opts, a = new Et.CodeGen(this.scope, { es5: n, lines: i, ownProperties: o });
  let s;
  e.$async && (s = a.scopeValue("Error", {
    ref: zI.default,
    code: (0, Et._)`require("ajv/dist/runtime/validation_error").default`
  }));
  const c = a.scopeName("validate");
  e.validateName = c;
  const f = {
    gen: a,
    allErrors: this.opts.allErrors,
    data: Gr.default.data,
    parentData: Gr.default.parentData,
    parentDataProperty: Gr.default.parentDataProperty,
    dataNames: [Gr.default.data],
    dataPathArr: [Et.nil],
    // TODO can its length be used as dataLevel if nil is removed?
    dataLevel: 0,
    dataTypes: [],
    definedProperties: /* @__PURE__ */ new Set(),
    topSchemaRef: a.scopeValue("schema", this.opts.code.source === !0 ? { ref: e.schema, code: (0, Et.stringify)(e.schema) } : { ref: e.schema }),
    validateName: c,
    ValidationError: s,
    schema: e.schema,
    schemaEnv: e,
    rootId: r,
    baseId: e.baseId || r,
    schemaPath: Et.nil,
    errSchemaPath: e.schemaPath || (this.opts.jtd ? "" : "#"),
    errorPath: (0, Et._)`""`,
    opts: this.opts,
    self: this
  };
  let l;
  try {
    this._compilations.add(e), (0, WI.validateFunctionCode)(f), a.optimize(this.opts.code.optimize);
    const u = a.toString();
    l = `${a.scopeRefs(Gr.default.scope)}return ${u}`, this.opts.code.process && (l = this.opts.code.process(l, e));
    const h = new Function(`${Gr.default.self}`, `${Gr.default.scope}`, l)(this, this.scope.get());
    if (this.scope.value(c, { ref: h }), h.errors = null, h.schema = e.schema, h.schemaEnv = e, e.$async && (h.$async = !0), this.opts.code.source === !0 && (h.source = { validateName: c, validateCode: u, scopeValues: a._values }), this.opts.unevaluated) {
      const { props: y, items: g } = f;
      h.evaluated = {
        props: y instanceof Et.Name ? void 0 : y,
        items: g instanceof Et.Name ? void 0 : g,
        dynamicProps: y instanceof Et.Name,
        dynamicItems: g instanceof Et.Name
      }, h.source && (h.source.evaluated = (0, Et.stringify)(h.evaluated));
    }
    return e.validate = h, e;
  } catch (u) {
    throw delete e.validate, delete e.validateName, l && this.logger.error("Error compiling schema, function code:", l), u;
  } finally {
    this._compilations.delete(e);
  }
}
Qe.compileSchema = Cl;
function KI(e, t, r) {
  var n;
  r = (0, Pt.resolveUrl)(this.opts.uriResolver, t, r);
  const i = e.refs[r];
  if (i)
    return i;
  let o = JI.call(this, e, r);
  if (o === void 0) {
    const a = (n = e.localRefs) === null || n === void 0 ? void 0 : n[r], { schemaId: s } = this.opts;
    a && (o = new Za({ schema: a, schemaId: s, root: e, baseId: t }));
  }
  if (o !== void 0)
    return e.refs[r] = YI.call(this, o);
}
Qe.resolveRef = KI;
function YI(e) {
  return (0, Pt.inlineRef)(e.schema, this.opts.inlineRefs) ? e.schema : e.validate ? e : Cl.call(this, e);
}
function ug(e) {
  for (const t of this._compilations)
    if (XI(t, e))
      return t;
}
Qe.getCompilingSchema = ug;
function XI(e, t) {
  return e.schema === t.schema && e.root === t.root && e.baseId === t.baseId;
}
function JI(e, t) {
  let r;
  for (; typeof (r = this.refs[t]) == "string"; )
    t = r;
  return r || this.schemas[t] || es.call(this, e, t);
}
function es(e, t) {
  const r = this.opts.uriResolver.parse(t), n = (0, Pt._getFullPath)(this.opts.uriResolver, r);
  let i = (0, Pt.getFullPath)(this.opts.uriResolver, e.baseId, void 0);
  if (Object.keys(e.schema).length > 0 && n === i)
    return Js.call(this, r, e);
  const o = (0, Pt.normalizeId)(n), a = this.refs[o] || this.schemas[o];
  if (typeof a == "string") {
    const s = es.call(this, e, a);
    return typeof (s == null ? void 0 : s.schema) != "object" ? void 0 : Js.call(this, r, s);
  }
  if (typeof (a == null ? void 0 : a.schema) == "object") {
    if (a.validate || Cl.call(this, a), o === (0, Pt.normalizeId)(t)) {
      const { schema: s } = a, { schemaId: c } = this.opts, f = s[c];
      return f && (i = (0, Pt.resolveUrl)(this.opts.uriResolver, i, f)), new Za({ schema: s, schemaId: c, root: e, baseId: i });
    }
    return Js.call(this, r, a);
  }
}
Qe.resolveSchema = es;
const QI = /* @__PURE__ */ new Set([
  "properties",
  "patternProperties",
  "enum",
  "dependencies",
  "definitions"
]);
function Js(e, { baseId: t, schema: r, root: n }) {
  var i;
  if (((i = e.fragment) === null || i === void 0 ? void 0 : i[0]) !== "/")
    return;
  for (const s of e.fragment.slice(1).split("/")) {
    if (typeof r == "boolean")
      return;
    const c = r[(0, lh.unescapeFragment)(s)];
    if (c === void 0)
      return;
    r = c;
    const f = typeof r == "object" && r[this.opts.schemaId];
    !QI.has(s) && f && (t = (0, Pt.resolveUrl)(this.opts.uriResolver, t, f));
  }
  let o;
  if (typeof r != "boolean" && r.$ref && !(0, lh.schemaHasRulesButRef)(r, this.RULES)) {
    const s = (0, Pt.resolveUrl)(this.opts.uriResolver, t, r.$ref);
    o = es.call(this, n, s);
  }
  const { schemaId: a } = this.opts;
  if (o = o || new Za({ schema: r, schemaId: a, root: n, baseId: t }), o.schema !== o.root.schema)
    return o;
}
const ZI = "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#", eR = "Meta-schema for $data reference (JSON AnySchema extension proposal)", tR = "object", rR = [
  "$data"
], nR = {
  $data: {
    type: "string",
    anyOf: [
      {
        format: "relative-json-pointer"
      },
      {
        format: "json-pointer"
      }
    ]
  }
}, iR = !1, oR = {
  $id: ZI,
  description: eR,
  type: tR,
  required: rR,
  properties: nR,
  additionalProperties: iR
};
var Il = {}, ts = { exports: {} };
const aR = {
  0: 0,
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  a: 10,
  A: 10,
  b: 11,
  B: 11,
  c: 12,
  C: 12,
  d: 13,
  D: 13,
  e: 14,
  E: 14,
  f: 15,
  F: 15
};
var sR = {
  HEX: aR
};
const { HEX: cR } = sR, lR = /^(?:(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d)\.){3}(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d)$/u;
function fg(e) {
  if (hg(e, ".") < 3)
    return { host: e, isIPV4: !1 };
  const t = e.match(lR) || [], [r] = t;
  return r ? { host: fR(r, "."), isIPV4: !0 } : { host: e, isIPV4: !1 };
}
function uh(e, t = !1) {
  let r = "", n = !0;
  for (const i of e) {
    if (cR[i] === void 0) return;
    i !== "0" && n === !0 && (n = !1), n || (r += i);
  }
  return t && r.length === 0 && (r = "0"), r;
}
function uR(e) {
  let t = 0;
  const r = { error: !1, address: "", zone: "" }, n = [], i = [];
  let o = !1, a = !1, s = !1;
  function c() {
    if (i.length) {
      if (o === !1) {
        const f = uh(i);
        if (f !== void 0)
          n.push(f);
        else
          return r.error = !0, !1;
      }
      i.length = 0;
    }
    return !0;
  }
  for (let f = 0; f < e.length; f++) {
    const l = e[f];
    if (!(l === "[" || l === "]"))
      if (l === ":") {
        if (a === !0 && (s = !0), !c())
          break;
        if (t++, n.push(":"), t > 7) {
          r.error = !0;
          break;
        }
        f - 1 >= 0 && e[f - 1] === ":" && (a = !0);
        continue;
      } else if (l === "%") {
        if (!c())
          break;
        o = !0;
      } else {
        i.push(l);
        continue;
      }
  }
  return i.length && (o ? r.zone = i.join("") : s ? n.push(i.join("")) : n.push(uh(i))), r.address = n.join(""), r;
}
function dg(e) {
  if (hg(e, ":") < 2)
    return { host: e, isIPV6: !1 };
  const t = uR(e);
  if (t.error)
    return { host: e, isIPV6: !1 };
  {
    let r = t.address, n = t.address;
    return t.zone && (r += "%" + t.zone, n += "%25" + t.zone), { host: r, escapedHost: n, isIPV6: !0 };
  }
}
function fR(e, t) {
  let r = "", n = !0;
  const i = e.length;
  for (let o = 0; o < i; o++) {
    const a = e[o];
    a === "0" && n ? (o + 1 <= i && e[o + 1] === t || o + 1 === i) && (r += a, n = !1) : (a === t ? n = !0 : n = !1, r += a);
  }
  return r;
}
function hg(e, t) {
  let r = 0;
  for (let n = 0; n < e.length; n++)
    e[n] === t && r++;
  return r;
}
const fh = /^\.\.?\//u, dh = /^\/\.(?:\/|$)/u, hh = /^\/\.\.(?:\/|$)/u, dR = /^\/?(?:.|\n)*?(?=\/|$)/u;
function hR(e) {
  const t = [];
  for (; e.length; )
    if (e.match(fh))
      e = e.replace(fh, "");
    else if (e.match(dh))
      e = e.replace(dh, "/");
    else if (e.match(hh))
      e = e.replace(hh, "/"), t.pop();
    else if (e === "." || e === "..")
      e = "";
    else {
      const r = e.match(dR);
      if (r) {
        const n = r[0];
        e = e.slice(n.length), t.push(n);
      } else
        throw new Error("Unexpected dot segment condition");
    }
  return t.join("");
}
function pR(e, t) {
  const r = t !== !0 ? escape : unescape;
  return e.scheme !== void 0 && (e.scheme = r(e.scheme)), e.userinfo !== void 0 && (e.userinfo = r(e.userinfo)), e.host !== void 0 && (e.host = r(e.host)), e.path !== void 0 && (e.path = r(e.path)), e.query !== void 0 && (e.query = r(e.query)), e.fragment !== void 0 && (e.fragment = r(e.fragment)), e;
}
function mR(e) {
  const t = [];
  if (e.userinfo !== void 0 && (t.push(e.userinfo), t.push("@")), e.host !== void 0) {
    let r = unescape(e.host);
    const n = fg(r);
    if (n.isIPV4)
      r = n.host;
    else {
      const i = dg(n.host);
      i.isIPV6 === !0 ? r = `[${i.escapedHost}]` : r = e.host;
    }
    t.push(r);
  }
  return (typeof e.port == "number" || typeof e.port == "string") && (t.push(":"), t.push(String(e.port))), t.length ? t.join("") : void 0;
}
var yR = {
  recomposeAuthority: mR,
  normalizeComponentEncoding: pR,
  removeDotSegments: hR,
  normalizeIPv4: fg,
  normalizeIPv6: dg
};
const gR = /^[\da-f]{8}-[\da-f]{4}-[\da-f]{4}-[\da-f]{4}-[\da-f]{12}$/iu, vR = /([\da-z][\d\-a-z]{0,31}):((?:[\w!$'()*+,\-.:;=@]|%[\da-f]{2})+)/iu;
function pg(e) {
  return typeof e.secure == "boolean" ? e.secure : String(e.scheme).toLowerCase() === "wss";
}
function mg(e) {
  return e.host || (e.error = e.error || "HTTP URIs must have a host."), e;
}
function yg(e) {
  const t = String(e.scheme).toLowerCase() === "https";
  return (e.port === (t ? 443 : 80) || e.port === "") && (e.port = void 0), e.path || (e.path = "/"), e;
}
function $R(e) {
  return e.secure = pg(e), e.resourceName = (e.path || "/") + (e.query ? "?" + e.query : ""), e.path = void 0, e.query = void 0, e;
}
function _R(e) {
  if ((e.port === (pg(e) ? 443 : 80) || e.port === "") && (e.port = void 0), typeof e.secure == "boolean" && (e.scheme = e.secure ? "wss" : "ws", e.secure = void 0), e.resourceName) {
    const [t, r] = e.resourceName.split("?");
    e.path = t && t !== "/" ? t : void 0, e.query = r, e.resourceName = void 0;
  }
  return e.fragment = void 0, e;
}
function wR(e, t) {
  if (!e.path)
    return e.error = "URN can not be parsed", e;
  const r = e.path.match(vR);
  if (r) {
    const n = t.scheme || e.scheme || "urn";
    e.nid = r[1].toLowerCase(), e.nss = r[2];
    const i = `${n}:${t.nid || e.nid}`, o = Rl[i];
    e.path = void 0, o && (e = o.parse(e, t));
  } else
    e.error = e.error || "URN can not be parsed.";
  return e;
}
function ER(e, t) {
  const r = t.scheme || e.scheme || "urn", n = e.nid.toLowerCase(), i = `${r}:${t.nid || n}`, o = Rl[i];
  o && (e = o.serialize(e, t));
  const a = e, s = e.nss;
  return a.path = `${n || t.nid}:${s}`, t.skipEscape = !0, a;
}
function SR(e, t) {
  const r = e;
  return r.uuid = r.nss, r.nss = void 0, !t.tolerant && (!r.uuid || !gR.test(r.uuid)) && (r.error = r.error || "UUID is not valid."), r;
}
function bR(e) {
  const t = e;
  return t.nss = (e.uuid || "").toLowerCase(), t;
}
const gg = {
  scheme: "http",
  domainHost: !0,
  parse: mg,
  serialize: yg
}, PR = {
  scheme: "https",
  domainHost: gg.domainHost,
  parse: mg,
  serialize: yg
}, Zo = {
  scheme: "ws",
  domainHost: !0,
  parse: $R,
  serialize: _R
}, TR = {
  scheme: "wss",
  domainHost: Zo.domainHost,
  parse: Zo.parse,
  serialize: Zo.serialize
}, AR = {
  scheme: "urn",
  parse: wR,
  serialize: ER,
  skipNormalize: !0
}, OR = {
  scheme: "urn:uuid",
  parse: SR,
  serialize: bR,
  skipNormalize: !0
}, Rl = {
  http: gg,
  https: PR,
  ws: Zo,
  wss: TR,
  urn: AR,
  "urn:uuid": OR
};
var CR = Rl;
const { normalizeIPv6: IR, normalizeIPv4: RR, removeDotSegments: Ai, recomposeAuthority: NR, normalizeComponentEncoding: qo } = yR, Nl = CR;
function DR(e, t) {
  return typeof e == "string" ? e = Ft(Qt(e, t), t) : typeof e == "object" && (e = Qt(Ft(e, t), t)), e;
}
function kR(e, t, r) {
  const n = Object.assign({ scheme: "null" }, r), i = vg(Qt(e, n), Qt(t, n), n, !0);
  return Ft(i, { ...n, skipEscape: !0 });
}
function vg(e, t, r, n) {
  const i = {};
  return n || (e = Qt(Ft(e, r), r), t = Qt(Ft(t, r), r)), r = r || {}, !r.tolerant && t.scheme ? (i.scheme = t.scheme, i.userinfo = t.userinfo, i.host = t.host, i.port = t.port, i.path = Ai(t.path || ""), i.query = t.query) : (t.userinfo !== void 0 || t.host !== void 0 || t.port !== void 0 ? (i.userinfo = t.userinfo, i.host = t.host, i.port = t.port, i.path = Ai(t.path || ""), i.query = t.query) : (t.path ? (t.path.charAt(0) === "/" ? i.path = Ai(t.path) : ((e.userinfo !== void 0 || e.host !== void 0 || e.port !== void 0) && !e.path ? i.path = "/" + t.path : e.path ? i.path = e.path.slice(0, e.path.lastIndexOf("/") + 1) + t.path : i.path = t.path, i.path = Ai(i.path)), i.query = t.query) : (i.path = e.path, t.query !== void 0 ? i.query = t.query : i.query = e.query), i.userinfo = e.userinfo, i.host = e.host, i.port = e.port), i.scheme = e.scheme), i.fragment = t.fragment, i;
}
function FR(e, t, r) {
  return typeof e == "string" ? (e = unescape(e), e = Ft(qo(Qt(e, r), !0), { ...r, skipEscape: !0 })) : typeof e == "object" && (e = Ft(qo(e, !0), { ...r, skipEscape: !0 })), typeof t == "string" ? (t = unescape(t), t = Ft(qo(Qt(t, r), !0), { ...r, skipEscape: !0 })) : typeof t == "object" && (t = Ft(qo(t, !0), { ...r, skipEscape: !0 })), e.toLowerCase() === t.toLowerCase();
}
function Ft(e, t) {
  const r = {
    host: e.host,
    scheme: e.scheme,
    userinfo: e.userinfo,
    port: e.port,
    path: e.path,
    query: e.query,
    nid: e.nid,
    nss: e.nss,
    uuid: e.uuid,
    fragment: e.fragment,
    reference: e.reference,
    resourceName: e.resourceName,
    secure: e.secure,
    error: ""
  }, n = Object.assign({}, t), i = [], o = Nl[(n.scheme || r.scheme || "").toLowerCase()];
  o && o.serialize && o.serialize(r, n), r.path !== void 0 && (n.skipEscape ? r.path = unescape(r.path) : (r.path = escape(r.path), r.scheme !== void 0 && (r.path = r.path.split("%3A").join(":")))), n.reference !== "suffix" && r.scheme && i.push(r.scheme, ":");
  const a = NR(r);
  if (a !== void 0 && (n.reference !== "suffix" && i.push("//"), i.push(a), r.path && r.path.charAt(0) !== "/" && i.push("/")), r.path !== void 0) {
    let s = r.path;
    !n.absolutePath && (!o || !o.absolutePath) && (s = Ai(s)), a === void 0 && (s = s.replace(/^\/\//u, "/%2F")), i.push(s);
  }
  return r.query !== void 0 && i.push("?", r.query), r.fragment !== void 0 && i.push("#", r.fragment), i.join("");
}
const LR = Array.from({ length: 127 }, (e, t) => /[^!"$&'()*+,\-.;=_`a-z{}~]/u.test(String.fromCharCode(t)));
function xR(e) {
  let t = 0;
  for (let r = 0, n = e.length; r < n; ++r)
    if (t = e.charCodeAt(r), t > 126 || LR[t])
      return !0;
  return !1;
}
const UR = /^(?:([^#/:?]+):)?(?:\/\/((?:([^#/?@]*)@)?(\[[^#/?\]]+\]|[^#/:?]*)(?::(\d*))?))?([^#?]*)(?:\?([^#]*))?(?:#((?:.|[\n\r])*))?/u;
function Qt(e, t) {
  const r = Object.assign({}, t), n = {
    scheme: void 0,
    userinfo: void 0,
    host: "",
    port: void 0,
    path: "",
    query: void 0,
    fragment: void 0
  }, i = e.indexOf("%") !== -1;
  let o = !1;
  r.reference === "suffix" && (e = (r.scheme ? r.scheme + ":" : "") + "//" + e);
  const a = e.match(UR);
  if (a) {
    if (n.scheme = a[1], n.userinfo = a[3], n.host = a[4], n.port = parseInt(a[5], 10), n.path = a[6] || "", n.query = a[7], n.fragment = a[8], isNaN(n.port) && (n.port = a[5]), n.host) {
      const c = RR(n.host);
      if (c.isIPV4 === !1) {
        const f = IR(c.host);
        n.host = f.host.toLowerCase(), o = f.isIPV6;
      } else
        n.host = c.host, o = !0;
    }
    n.scheme === void 0 && n.userinfo === void 0 && n.host === void 0 && n.port === void 0 && n.query === void 0 && !n.path ? n.reference = "same-document" : n.scheme === void 0 ? n.reference = "relative" : n.fragment === void 0 ? n.reference = "absolute" : n.reference = "uri", r.reference && r.reference !== "suffix" && r.reference !== n.reference && (n.error = n.error || "URI is not a " + r.reference + " reference.");
    const s = Nl[(r.scheme || n.scheme || "").toLowerCase()];
    if (!r.unicodeSupport && (!s || !s.unicodeSupport) && n.host && (r.domainHost || s && s.domainHost) && o === !1 && xR(n.host))
      try {
        n.host = URL.domainToASCII(n.host.toLowerCase());
      } catch (c) {
        n.error = n.error || "Host's domain name can not be converted to ASCII: " + c;
      }
    (!s || s && !s.skipNormalize) && (i && n.scheme !== void 0 && (n.scheme = unescape(n.scheme)), i && n.host !== void 0 && (n.host = unescape(n.host)), n.path && (n.path = escape(unescape(n.path))), n.fragment && (n.fragment = encodeURI(decodeURIComponent(n.fragment)))), s && s.parse && s.parse(n, r);
  } else
    n.error = n.error || "URI can not be parsed.";
  return n;
}
const Dl = {
  SCHEMES: Nl,
  normalize: DR,
  resolve: kR,
  resolveComponents: vg,
  equal: FR,
  serialize: Ft,
  parse: Qt
};
ts.exports = Dl;
ts.exports.default = Dl;
ts.exports.fastUri = Dl;
var jR = ts.exports;
Object.defineProperty(Il, "__esModule", { value: !0 });
const $g = jR;
$g.code = 'require("ajv/dist/runtime/uri").default';
Il.default = $g;
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.CodeGen = e.Name = e.nil = e.stringify = e.str = e._ = e.KeywordCxt = void 0;
  var t = $t;
  Object.defineProperty(e, "KeywordCxt", { enumerable: !0, get: function() {
    return t.KeywordCxt;
  } });
  var r = re;
  Object.defineProperty(e, "_", { enumerable: !0, get: function() {
    return r._;
  } }), Object.defineProperty(e, "str", { enumerable: !0, get: function() {
    return r.str;
  } }), Object.defineProperty(e, "stringify", { enumerable: !0, get: function() {
    return r.stringify;
  } }), Object.defineProperty(e, "nil", { enumerable: !0, get: function() {
    return r.nil;
  } }), Object.defineProperty(e, "Name", { enumerable: !0, get: function() {
    return r.Name;
  } }), Object.defineProperty(e, "CodeGen", { enumerable: !0, get: function() {
    return r.CodeGen;
  } });
  const n = Xn, i = un, o = nn, a = Qe, s = re, c = je, f = Ce, l = Y, u = oR, d = Il, h = (U, T) => new RegExp(U, T);
  h.code = "new RegExp";
  const y = ["removeAdditional", "useDefaults", "coerceTypes"], g = /* @__PURE__ */ new Set([
    "validate",
    "serialize",
    "parse",
    "wrapper",
    "root",
    "schema",
    "keyword",
    "pattern",
    "formats",
    "validate$data",
    "func",
    "obj",
    "Error"
  ]), $ = {
    errorDataPath: "",
    format: "`validateFormats: false` can be used instead.",
    nullable: '"nullable" keyword is supported by default.',
    jsonPointers: "Deprecated jsPropertySyntax can be used instead.",
    extendRefs: "Deprecated ignoreKeywordsWithRef can be used instead.",
    missingRefs: "Pass empty schema with $id that should be ignored to ajv.addSchema.",
    processCode: "Use option `code: {process: (code, schemaEnv: object) => string}`",
    sourceCode: "Use option `code: {source: true}`",
    strictDefaults: "It is default now, see option `strict`.",
    strictKeywords: "It is default now, see option `strict`.",
    uniqueItems: '"uniqueItems" keyword is always validated.',
    unknownFormats: "Disable strict mode or pass `true` to `ajv.addFormat` (or `formats` option).",
    cache: "Map is used as cache, schema object as key.",
    serialize: "Map is used as cache, schema object as key.",
    ajvErrors: "It is default now."
  }, v = {
    ignoreKeywordsWithRef: "",
    jsPropertySyntax: "",
    unicode: '"minLength"/"maxLength" account for unicode characters by default.'
  }, S = 200;
  function C(U) {
    var T, N, A, _, b, j, m, p, D, P, ee, de, me, Pe, Ae, pt, _e, Xe, Lr, er, Mt, tr, ti, ri, ni;
    const xr = U.strict, rr = (T = U.code) === null || T === void 0 ? void 0 : T.optimize, fn = rr === !0 || rr === void 0 ? 1 : rr || 0, ii = (A = (N = U.code) === null || N === void 0 ? void 0 : N.regExp) !== null && A !== void 0 ? A : h, mt = (_ = U.uriResolver) !== null && _ !== void 0 ? _ : d.default;
    return {
      strictSchema: (j = (b = U.strictSchema) !== null && b !== void 0 ? b : xr) !== null && j !== void 0 ? j : !0,
      strictNumbers: (p = (m = U.strictNumbers) !== null && m !== void 0 ? m : xr) !== null && p !== void 0 ? p : !0,
      strictTypes: (P = (D = U.strictTypes) !== null && D !== void 0 ? D : xr) !== null && P !== void 0 ? P : "log",
      strictTuples: (de = (ee = U.strictTuples) !== null && ee !== void 0 ? ee : xr) !== null && de !== void 0 ? de : "log",
      strictRequired: (Pe = (me = U.strictRequired) !== null && me !== void 0 ? me : xr) !== null && Pe !== void 0 ? Pe : !1,
      code: U.code ? { ...U.code, optimize: fn, regExp: ii } : { optimize: fn, regExp: ii },
      loopRequired: (Ae = U.loopRequired) !== null && Ae !== void 0 ? Ae : S,
      loopEnum: (pt = U.loopEnum) !== null && pt !== void 0 ? pt : S,
      meta: (_e = U.meta) !== null && _e !== void 0 ? _e : !0,
      messages: (Xe = U.messages) !== null && Xe !== void 0 ? Xe : !0,
      inlineRefs: (Lr = U.inlineRefs) !== null && Lr !== void 0 ? Lr : !0,
      schemaId: (er = U.schemaId) !== null && er !== void 0 ? er : "$id",
      addUsedSchema: (Mt = U.addUsedSchema) !== null && Mt !== void 0 ? Mt : !0,
      validateSchema: (tr = U.validateSchema) !== null && tr !== void 0 ? tr : !0,
      validateFormats: (ti = U.validateFormats) !== null && ti !== void 0 ? ti : !0,
      unicodeRegExp: (ri = U.unicodeRegExp) !== null && ri !== void 0 ? ri : !0,
      int32range: (ni = U.int32range) !== null && ni !== void 0 ? ni : !0,
      uriResolver: mt
    };
  }
  class R {
    constructor(T = {}) {
      this.schemas = {}, this.refs = {}, this.formats = {}, this._compilations = /* @__PURE__ */ new Set(), this._loading = {}, this._cache = /* @__PURE__ */ new Map(), T = this.opts = { ...T, ...C(T) };
      const { es5: N, lines: A } = this.opts.code;
      this.scope = new s.ValueScope({ scope: {}, prefixes: g, es5: N, lines: A }), this.logger = z(T.logger);
      const _ = T.validateFormats;
      T.validateFormats = !1, this.RULES = (0, o.getRules)(), M.call(this, $, T, "NOT SUPPORTED"), M.call(this, v, T, "DEPRECATED", "warn"), this._metaOpts = K.call(this), T.formats && B.call(this), this._addVocabularies(), this._addDefaultMetaSchema(), T.keywords && w.call(this, T.keywords), typeof T.meta == "object" && this.addMetaSchema(T.meta), L.call(this), T.validateFormats = _;
    }
    _addVocabularies() {
      this.addKeyword("$async");
    }
    _addDefaultMetaSchema() {
      const { $data: T, meta: N, schemaId: A } = this.opts;
      let _ = u;
      A === "id" && (_ = { ...u }, _.id = _.$id, delete _.$id), N && T && this.addMetaSchema(_, _[A], !1);
    }
    defaultMeta() {
      const { meta: T, schemaId: N } = this.opts;
      return this.opts.defaultMeta = typeof T == "object" ? T[N] || T : void 0;
    }
    validate(T, N) {
      let A;
      if (typeof T == "string") {
        if (A = this.getSchema(T), !A)
          throw new Error(`no schema with key or ref "${T}"`);
      } else
        A = this.compile(T);
      const _ = A(N);
      return "$async" in A || (this.errors = A.errors), _;
    }
    compile(T, N) {
      const A = this._addSchema(T, N);
      return A.validate || this._compileSchemaEnv(A);
    }
    compileAsync(T, N) {
      if (typeof this.opts.loadSchema != "function")
        throw new Error("options.loadSchema should be a function");
      const { loadSchema: A } = this.opts;
      return _.call(this, T, N);
      async function _(P, ee) {
        await b.call(this, P.$schema);
        const de = this._addSchema(P, ee);
        return de.validate || j.call(this, de);
      }
      async function b(P) {
        P && !this.getSchema(P) && await _.call(this, { $ref: P }, !0);
      }
      async function j(P) {
        try {
          return this._compileSchemaEnv(P);
        } catch (ee) {
          if (!(ee instanceof i.default))
            throw ee;
          return m.call(this, ee), await p.call(this, ee.missingSchema), j.call(this, P);
        }
      }
      function m({ missingSchema: P, missingRef: ee }) {
        if (this.refs[P])
          throw new Error(`AnySchema ${P} is loaded but ${ee} cannot be resolved`);
      }
      async function p(P) {
        const ee = await D.call(this, P);
        this.refs[P] || await b.call(this, ee.$schema), this.refs[P] || this.addSchema(ee, P, N);
      }
      async function D(P) {
        const ee = this._loading[P];
        if (ee)
          return ee;
        try {
          return await (this._loading[P] = A(P));
        } finally {
          delete this._loading[P];
        }
      }
    }
    // Adds schema to the instance
    addSchema(T, N, A, _ = this.opts.validateSchema) {
      if (Array.isArray(T)) {
        for (const j of T)
          this.addSchema(j, void 0, A, _);
        return this;
      }
      let b;
      if (typeof T == "object") {
        const { schemaId: j } = this.opts;
        if (b = T[j], b !== void 0 && typeof b != "string")
          throw new Error(`schema ${j} must be string`);
      }
      return N = (0, c.normalizeId)(N || b), this._checkUnique(N), this.schemas[N] = this._addSchema(T, A, N, _, !0), this;
    }
    // Add schema that will be used to validate other schemas
    // options in META_IGNORE_OPTIONS are alway set to false
    addMetaSchema(T, N, A = this.opts.validateSchema) {
      return this.addSchema(T, N, !0, A), this;
    }
    //  Validate schema against its meta-schema
    validateSchema(T, N) {
      if (typeof T == "boolean")
        return !0;
      let A;
      if (A = T.$schema, A !== void 0 && typeof A != "string")
        throw new Error("$schema must be a string");
      if (A = A || this.opts.defaultMeta || this.defaultMeta(), !A)
        return this.logger.warn("meta-schema not available"), this.errors = null, !0;
      const _ = this.validate(A, T);
      if (!_ && N) {
        const b = "schema is invalid: " + this.errorsText();
        if (this.opts.validateSchema === "log")
          this.logger.error(b);
        else
          throw new Error(b);
      }
      return _;
    }
    // Get compiled schema by `key` or `ref`.
    // (`key` that was passed to `addSchema` or full schema reference - `schema.$id` or resolved id)
    getSchema(T) {
      let N;
      for (; typeof (N = I.call(this, T)) == "string"; )
        T = N;
      if (N === void 0) {
        const { schemaId: A } = this.opts, _ = new a.SchemaEnv({ schema: {}, schemaId: A });
        if (N = a.resolveSchema.call(this, _, T), !N)
          return;
        this.refs[T] = N;
      }
      return N.validate || this._compileSchemaEnv(N);
    }
    // Remove cached schema(s).
    // If no parameter is passed all schemas but meta-schemas are removed.
    // If RegExp is passed all schemas with key/id matching pattern but meta-schemas are removed.
    // Even if schema is referenced by other schemas it still can be removed as other schemas have local references.
    removeSchema(T) {
      if (T instanceof RegExp)
        return this._removeAllSchemas(this.schemas, T), this._removeAllSchemas(this.refs, T), this;
      switch (typeof T) {
        case "undefined":
          return this._removeAllSchemas(this.schemas), this._removeAllSchemas(this.refs), this._cache.clear(), this;
        case "string": {
          const N = I.call(this, T);
          return typeof N == "object" && this._cache.delete(N.schema), delete this.schemas[T], delete this.refs[T], this;
        }
        case "object": {
          const N = T;
          this._cache.delete(N);
          let A = T[this.opts.schemaId];
          return A && (A = (0, c.normalizeId)(A), delete this.schemas[A], delete this.refs[A]), this;
        }
        default:
          throw new Error("ajv.removeSchema: invalid parameter");
      }
    }
    // add "vocabulary" - a collection of keywords
    addVocabulary(T) {
      for (const N of T)
        this.addKeyword(N);
      return this;
    }
    addKeyword(T, N) {
      let A;
      if (typeof T == "string")
        A = T, typeof N == "object" && (this.logger.warn("these parameters are deprecated, see docs for addKeyword"), N.keyword = A);
      else if (typeof T == "object" && N === void 0) {
        if (N = T, A = N.keyword, Array.isArray(A) && !A.length)
          throw new Error("addKeywords: keyword must be string or non-empty array");
      } else
        throw new Error("invalid addKeywords parameters");
      if (k.call(this, A, N), !N)
        return (0, l.eachItem)(A, (b) => F.call(this, b)), this;
      x.call(this, N);
      const _ = {
        ...N,
        type: (0, f.getJSONTypes)(N.type),
        schemaType: (0, f.getJSONTypes)(N.schemaType)
      };
      return (0, l.eachItem)(A, _.type.length === 0 ? (b) => F.call(this, b, _) : (b) => _.type.forEach((j) => F.call(this, b, _, j))), this;
    }
    getKeyword(T) {
      const N = this.RULES.all[T];
      return typeof N == "object" ? N.definition : !!N;
    }
    // Remove keyword
    removeKeyword(T) {
      const { RULES: N } = this;
      delete N.keywords[T], delete N.all[T];
      for (const A of N.rules) {
        const _ = A.rules.findIndex((b) => b.keyword === T);
        _ >= 0 && A.rules.splice(_, 1);
      }
      return this;
    }
    // Add format
    addFormat(T, N) {
      return typeof N == "string" && (N = new RegExp(N)), this.formats[T] = N, this;
    }
    errorsText(T = this.errors, { separator: N = ", ", dataVar: A = "data" } = {}) {
      return !T || T.length === 0 ? "No errors" : T.map((_) => `${A}${_.instancePath} ${_.message}`).reduce((_, b) => _ + N + b);
    }
    $dataMetaSchema(T, N) {
      const A = this.RULES.all;
      T = JSON.parse(JSON.stringify(T));
      for (const _ of N) {
        const b = _.split("/").slice(1);
        let j = T;
        for (const m of b)
          j = j[m];
        for (const m in A) {
          const p = A[m];
          if (typeof p != "object")
            continue;
          const { $data: D } = p.definition, P = j[m];
          D && P && (j[m] = V(P));
        }
      }
      return T;
    }
    _removeAllSchemas(T, N) {
      for (const A in T) {
        const _ = T[A];
        (!N || N.test(A)) && (typeof _ == "string" ? delete T[A] : _ && !_.meta && (this._cache.delete(_.schema), delete T[A]));
      }
    }
    _addSchema(T, N, A, _ = this.opts.validateSchema, b = this.opts.addUsedSchema) {
      let j;
      const { schemaId: m } = this.opts;
      if (typeof T == "object")
        j = T[m];
      else {
        if (this.opts.jtd)
          throw new Error("schema must be object");
        if (typeof T != "boolean")
          throw new Error("schema must be object or boolean");
      }
      let p = this._cache.get(T);
      if (p !== void 0)
        return p;
      A = (0, c.normalizeId)(j || A);
      const D = c.getSchemaRefs.call(this, T, A);
      return p = new a.SchemaEnv({ schema: T, schemaId: m, meta: N, baseId: A, localRefs: D }), this._cache.set(p.schema, p), b && !A.startsWith("#") && (A && this._checkUnique(A), this.refs[A] = p), _ && this.validateSchema(T, !0), p;
    }
    _checkUnique(T) {
      if (this.schemas[T] || this.refs[T])
        throw new Error(`schema with key or id "${T}" already exists`);
    }
    _compileSchemaEnv(T) {
      if (T.meta ? this._compileMetaSchema(T) : a.compileSchema.call(this, T), !T.validate)
        throw new Error("ajv implementation error");
      return T.validate;
    }
    _compileMetaSchema(T) {
      const N = this.opts;
      this.opts = this._metaOpts;
      try {
        a.compileSchema.call(this, T);
      } finally {
        this.opts = N;
      }
    }
  }
  R.ValidationError = n.default, R.MissingRefError = i.default, e.default = R;
  function M(U, T, N, A = "error") {
    for (const _ in U) {
      const b = _;
      b in T && this.logger[A](`${N}: option ${_}. ${U[b]}`);
    }
  }
  function I(U) {
    return U = (0, c.normalizeId)(U), this.schemas[U] || this.refs[U];
  }
  function L() {
    const U = this.opts.schemas;
    if (U)
      if (Array.isArray(U))
        this.addSchema(U);
      else
        for (const T in U)
          this.addSchema(U[T], T);
  }
  function B() {
    for (const U in this.opts.formats) {
      const T = this.opts.formats[U];
      T && this.addFormat(U, T);
    }
  }
  function w(U) {
    if (Array.isArray(U)) {
      this.addVocabulary(U);
      return;
    }
    this.logger.warn("keywords option as map is deprecated, pass array");
    for (const T in U) {
      const N = U[T];
      N.keyword || (N.keyword = T), this.addKeyword(N);
    }
  }
  function K() {
    const U = { ...this.opts };
    for (const T of y)
      delete U[T];
    return U;
  }
  const q = { log() {
  }, warn() {
  }, error() {
  } };
  function z(U) {
    if (U === !1)
      return q;
    if (U === void 0)
      return console;
    if (U.log && U.warn && U.error)
      return U;
    throw new Error("logger must implement log, warn and error methods");
  }
  const X = /^[a-z_$][a-z0-9_$:-]*$/i;
  function k(U, T) {
    const { RULES: N } = this;
    if ((0, l.eachItem)(U, (A) => {
      if (N.keywords[A])
        throw new Error(`Keyword ${A} is already defined`);
      if (!X.test(A))
        throw new Error(`Keyword ${A} has invalid name`);
    }), !!T && T.$data && !("code" in T || "validate" in T))
      throw new Error('$data keyword must have "code" or "validate" function');
  }
  function F(U, T, N) {
    var A;
    const _ = T == null ? void 0 : T.post;
    if (N && _)
      throw new Error('keyword with "post" flag cannot have "type"');
    const { RULES: b } = this;
    let j = _ ? b.post : b.rules.find(({ type: p }) => p === N);
    if (j || (j = { type: N, rules: [] }, b.rules.push(j)), b.keywords[U] = !0, !T)
      return;
    const m = {
      keyword: U,
      definition: {
        ...T,
        type: (0, f.getJSONTypes)(T.type),
        schemaType: (0, f.getJSONTypes)(T.schemaType)
      }
    };
    T.before ? G.call(this, j, m, T.before) : j.rules.push(m), b.all[U] = m, (A = T.implements) === null || A === void 0 || A.forEach((p) => this.addKeyword(p));
  }
  function G(U, T, N) {
    const A = U.rules.findIndex((_) => _.keyword === N);
    A >= 0 ? U.rules.splice(A, 0, T) : (U.rules.push(T), this.logger.warn(`rule ${N} is not defined`));
  }
  function x(U) {
    let { metaSchema: T } = U;
    T !== void 0 && (U.$data && this.opts.$data && (T = V(T)), U.validateSchema = this.compile(T, !0));
  }
  const W = {
    $ref: "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#"
  };
  function V(U) {
    return { anyOf: [U, W] };
  }
})($l);
var kl = {}, rs = {}, Fl = {};
Object.defineProperty(Fl, "__esModule", { value: !0 });
const MR = {
  keyword: "id",
  code() {
    throw new Error('NOT SUPPORTED: keyword "id", use "$id" for schema ID');
  }
};
Fl.default = MR;
var Zt = {};
Object.defineProperty(Zt, "__esModule", { value: !0 });
Zt.callRef = Zt.getValidate = void 0;
const qR = un, ph = ae, at = re, _n = ht, mh = Qe, Ho = Y, HR = {
  keyword: "$ref",
  schemaType: "string",
  code(e) {
    const { gen: t, schema: r, it: n } = e, { baseId: i, schemaEnv: o, validateName: a, opts: s, self: c } = n, { root: f } = o;
    if ((r === "#" || r === "#/") && i === f.baseId)
      return u();
    const l = mh.resolveRef.call(c, f, i, r);
    if (l === void 0)
      throw new qR.default(n.opts.uriResolver, i, r);
    if (l instanceof mh.SchemaEnv)
      return d(l);
    return h(l);
    function u() {
      if (o === f)
        return ea(e, a, o, o.$async);
      const y = t.scopeValue("root", { ref: f });
      return ea(e, (0, at._)`${y}.validate`, f, f.$async);
    }
    function d(y) {
      const g = _g(e, y);
      ea(e, g, y, y.$async);
    }
    function h(y) {
      const g = t.scopeValue("schema", s.code.source === !0 ? { ref: y, code: (0, at.stringify)(y) } : { ref: y }), $ = t.name("valid"), v = e.subschema({
        schema: y,
        dataTypes: [],
        schemaPath: at.nil,
        topSchemaRef: g,
        errSchemaPath: r
      }, $);
      e.mergeEvaluated(v), e.ok($);
    }
  }
};
function _g(e, t) {
  const { gen: r } = e;
  return t.validate ? r.scopeValue("validate", { ref: t.validate }) : (0, at._)`${r.scopeValue("wrapper", { ref: t })}.validate`;
}
Zt.getValidate = _g;
function ea(e, t, r, n) {
  const { gen: i, it: o } = e, { allErrors: a, schemaEnv: s, opts: c } = o, f = c.passContext ? _n.default.this : at.nil;
  n ? l() : u();
  function l() {
    if (!s.$async)
      throw new Error("async schema referenced by sync schema");
    const y = i.let("valid");
    i.try(() => {
      i.code((0, at._)`await ${(0, ph.callValidateCode)(e, t, f)}`), h(t), a || i.assign(y, !0);
    }, (g) => {
      i.if((0, at._)`!(${g} instanceof ${o.ValidationError})`, () => i.throw(g)), d(g), a || i.assign(y, !1);
    }), e.ok(y);
  }
  function u() {
    e.result((0, ph.callValidateCode)(e, t, f), () => h(t), () => d(t));
  }
  function d(y) {
    const g = (0, at._)`${y}.errors`;
    i.assign(_n.default.vErrors, (0, at._)`${_n.default.vErrors} === null ? ${g} : ${_n.default.vErrors}.concat(${g})`), i.assign(_n.default.errors, (0, at._)`${_n.default.vErrors}.length`);
  }
  function h(y) {
    var g;
    if (!o.opts.unevaluated)
      return;
    const $ = (g = r == null ? void 0 : r.validate) === null || g === void 0 ? void 0 : g.evaluated;
    if (o.props !== !0)
      if ($ && !$.dynamicProps)
        $.props !== void 0 && (o.props = Ho.mergeEvaluated.props(i, $.props, o.props));
      else {
        const v = i.var("props", (0, at._)`${y}.evaluated.props`);
        o.props = Ho.mergeEvaluated.props(i, v, o.props, at.Name);
      }
    if (o.items !== !0)
      if ($ && !$.dynamicItems)
        $.items !== void 0 && (o.items = Ho.mergeEvaluated.items(i, $.items, o.items));
      else {
        const v = i.var("items", (0, at._)`${y}.evaluated.items`);
        o.items = Ho.mergeEvaluated.items(i, v, o.items, at.Name);
      }
  }
}
Zt.callRef = ea;
Zt.default = HR;
Object.defineProperty(rs, "__esModule", { value: !0 });
const BR = Fl, GR = Zt, VR = [
  "$schema",
  "$id",
  "$defs",
  "$vocabulary",
  { keyword: "$comment" },
  "definitions",
  BR.default,
  GR.default
];
rs.default = VR;
var ns = {}, Ll = {};
Object.defineProperty(Ll, "__esModule", { value: !0 });
const va = re, fr = va.operators, $a = {
  maximum: { okStr: "<=", ok: fr.LTE, fail: fr.GT },
  minimum: { okStr: ">=", ok: fr.GTE, fail: fr.LT },
  exclusiveMaximum: { okStr: "<", ok: fr.LT, fail: fr.GTE },
  exclusiveMinimum: { okStr: ">", ok: fr.GT, fail: fr.LTE }
}, zR = {
  message: ({ keyword: e, schemaCode: t }) => (0, va.str)`must be ${$a[e].okStr} ${t}`,
  params: ({ keyword: e, schemaCode: t }) => (0, va._)`{comparison: ${$a[e].okStr}, limit: ${t}}`
}, WR = {
  keyword: Object.keys($a),
  type: "number",
  schemaType: "number",
  $data: !0,
  error: zR,
  code(e) {
    const { keyword: t, data: r, schemaCode: n } = e;
    e.fail$data((0, va._)`${r} ${$a[t].fail} ${n} || isNaN(${r})`);
  }
};
Ll.default = WR;
var xl = {};
Object.defineProperty(xl, "__esModule", { value: !0 });
const Fi = re, KR = {
  message: ({ schemaCode: e }) => (0, Fi.str)`must be multiple of ${e}`,
  params: ({ schemaCode: e }) => (0, Fi._)`{multipleOf: ${e}}`
}, YR = {
  keyword: "multipleOf",
  type: "number",
  schemaType: "number",
  $data: !0,
  error: KR,
  code(e) {
    const { gen: t, data: r, schemaCode: n, it: i } = e, o = i.opts.multipleOfPrecision, a = t.let("res"), s = o ? (0, Fi._)`Math.abs(Math.round(${a}) - ${a}) > 1e-${o}` : (0, Fi._)`${a} !== parseInt(${a})`;
    e.fail$data((0, Fi._)`(${n} === 0 || (${a} = ${r}/${n}, ${s}))`);
  }
};
xl.default = YR;
var Ul = {}, jl = {};
Object.defineProperty(jl, "__esModule", { value: !0 });
function wg(e) {
  const t = e.length;
  let r = 0, n = 0, i;
  for (; n < t; )
    r++, i = e.charCodeAt(n++), i >= 55296 && i <= 56319 && n < t && (i = e.charCodeAt(n), (i & 64512) === 56320 && n++);
  return r;
}
jl.default = wg;
wg.code = 'require("ajv/dist/runtime/ucs2length").default';
Object.defineProperty(Ul, "__esModule", { value: !0 });
const Yr = re, XR = Y, JR = jl, QR = {
  message({ keyword: e, schemaCode: t }) {
    const r = e === "maxLength" ? "more" : "fewer";
    return (0, Yr.str)`must NOT have ${r} than ${t} characters`;
  },
  params: ({ schemaCode: e }) => (0, Yr._)`{limit: ${e}}`
}, ZR = {
  keyword: ["maxLength", "minLength"],
  type: "string",
  schemaType: "number",
  $data: !0,
  error: QR,
  code(e) {
    const { keyword: t, data: r, schemaCode: n, it: i } = e, o = t === "maxLength" ? Yr.operators.GT : Yr.operators.LT, a = i.opts.unicode === !1 ? (0, Yr._)`${r}.length` : (0, Yr._)`${(0, XR.useFunc)(e.gen, JR.default)}(${r})`;
    e.fail$data((0, Yr._)`${a} ${o} ${n}`);
  }
};
Ul.default = ZR;
var Ml = {};
Object.defineProperty(Ml, "__esModule", { value: !0 });
const eN = ae, _a = re, tN = {
  message: ({ schemaCode: e }) => (0, _a.str)`must match pattern "${e}"`,
  params: ({ schemaCode: e }) => (0, _a._)`{pattern: ${e}}`
}, rN = {
  keyword: "pattern",
  type: "string",
  schemaType: "string",
  $data: !0,
  error: tN,
  code(e) {
    const { data: t, $data: r, schema: n, schemaCode: i, it: o } = e, a = o.opts.unicodeRegExp ? "u" : "", s = r ? (0, _a._)`(new RegExp(${i}, ${a}))` : (0, eN.usePattern)(e, n);
    e.fail$data((0, _a._)`!${s}.test(${t})`);
  }
};
Ml.default = rN;
var ql = {};
Object.defineProperty(ql, "__esModule", { value: !0 });
const Li = re, nN = {
  message({ keyword: e, schemaCode: t }) {
    const r = e === "maxProperties" ? "more" : "fewer";
    return (0, Li.str)`must NOT have ${r} than ${t} properties`;
  },
  params: ({ schemaCode: e }) => (0, Li._)`{limit: ${e}}`
}, iN = {
  keyword: ["maxProperties", "minProperties"],
  type: "object",
  schemaType: "number",
  $data: !0,
  error: nN,
  code(e) {
    const { keyword: t, data: r, schemaCode: n } = e, i = t === "maxProperties" ? Li.operators.GT : Li.operators.LT;
    e.fail$data((0, Li._)`Object.keys(${r}).length ${i} ${n}`);
  }
};
ql.default = iN;
var Hl = {};
Object.defineProperty(Hl, "__esModule", { value: !0 });
const bi = ae, xi = re, oN = Y, aN = {
  message: ({ params: { missingProperty: e } }) => (0, xi.str)`must have required property '${e}'`,
  params: ({ params: { missingProperty: e } }) => (0, xi._)`{missingProperty: ${e}}`
}, sN = {
  keyword: "required",
  type: "object",
  schemaType: "array",
  $data: !0,
  error: aN,
  code(e) {
    const { gen: t, schema: r, schemaCode: n, data: i, $data: o, it: a } = e, { opts: s } = a;
    if (!o && r.length === 0)
      return;
    const c = r.length >= s.loopRequired;
    if (a.allErrors ? f() : l(), s.strictRequired) {
      const h = e.parentSchema.properties, { definedProperties: y } = e.it;
      for (const g of r)
        if ((h == null ? void 0 : h[g]) === void 0 && !y.has(g)) {
          const $ = a.schemaEnv.baseId + a.errSchemaPath, v = `required property "${g}" is not defined at "${$}" (strictRequired)`;
          (0, oN.checkStrictMode)(a, v, a.opts.strictRequired);
        }
    }
    function f() {
      if (c || o)
        e.block$data(xi.nil, u);
      else
        for (const h of r)
          (0, bi.checkReportMissingProp)(e, h);
    }
    function l() {
      const h = t.let("missing");
      if (c || o) {
        const y = t.let("valid", !0);
        e.block$data(y, () => d(h, y)), e.ok(y);
      } else
        t.if((0, bi.checkMissingProp)(e, r, h)), (0, bi.reportMissingProp)(e, h), t.else();
    }
    function u() {
      t.forOf("prop", n, (h) => {
        e.setParams({ missingProperty: h }), t.if((0, bi.noPropertyInData)(t, i, h, s.ownProperties), () => e.error());
      });
    }
    function d(h, y) {
      e.setParams({ missingProperty: h }), t.forOf(h, n, () => {
        t.assign(y, (0, bi.propertyInData)(t, i, h, s.ownProperties)), t.if((0, xi.not)(y), () => {
          e.error(), t.break();
        });
      }, xi.nil);
    }
  }
};
Hl.default = sN;
var Bl = {};
Object.defineProperty(Bl, "__esModule", { value: !0 });
const Ui = re, cN = {
  message({ keyword: e, schemaCode: t }) {
    const r = e === "maxItems" ? "more" : "fewer";
    return (0, Ui.str)`must NOT have ${r} than ${t} items`;
  },
  params: ({ schemaCode: e }) => (0, Ui._)`{limit: ${e}}`
}, lN = {
  keyword: ["maxItems", "minItems"],
  type: "array",
  schemaType: "number",
  $data: !0,
  error: cN,
  code(e) {
    const { keyword: t, data: r, schemaCode: n } = e, i = t === "maxItems" ? Ui.operators.GT : Ui.operators.LT;
    e.fail$data((0, Ui._)`${r}.length ${i} ${n}`);
  }
};
Bl.default = lN;
var Gl = {}, vo = {};
Object.defineProperty(vo, "__esModule", { value: !0 });
const Eg = Ky;
Eg.code = 'require("ajv/dist/runtime/equal").default';
vo.default = Eg;
Object.defineProperty(Gl, "__esModule", { value: !0 });
const Qs = Ce, Ue = re, uN = Y, fN = vo, dN = {
  message: ({ params: { i: e, j: t } }) => (0, Ue.str)`must NOT have duplicate items (items ## ${t} and ${e} are identical)`,
  params: ({ params: { i: e, j: t } }) => (0, Ue._)`{i: ${e}, j: ${t}}`
}, hN = {
  keyword: "uniqueItems",
  type: "array",
  schemaType: "boolean",
  $data: !0,
  error: dN,
  code(e) {
    const { gen: t, data: r, $data: n, schema: i, parentSchema: o, schemaCode: a, it: s } = e;
    if (!n && !i)
      return;
    const c = t.let("valid"), f = o.items ? (0, Qs.getSchemaTypes)(o.items) : [];
    e.block$data(c, l, (0, Ue._)`${a} === false`), e.ok(c);
    function l() {
      const y = t.let("i", (0, Ue._)`${r}.length`), g = t.let("j");
      e.setParams({ i: y, j: g }), t.assign(c, !0), t.if((0, Ue._)`${y} > 1`, () => (u() ? d : h)(y, g));
    }
    function u() {
      return f.length > 0 && !f.some((y) => y === "object" || y === "array");
    }
    function d(y, g) {
      const $ = t.name("item"), v = (0, Qs.checkDataTypes)(f, $, s.opts.strictNumbers, Qs.DataType.Wrong), S = t.const("indices", (0, Ue._)`{}`);
      t.for((0, Ue._)`;${y}--;`, () => {
        t.let($, (0, Ue._)`${r}[${y}]`), t.if(v, (0, Ue._)`continue`), f.length > 1 && t.if((0, Ue._)`typeof ${$} == "string"`, (0, Ue._)`${$} += "_"`), t.if((0, Ue._)`typeof ${S}[${$}] == "number"`, () => {
          t.assign(g, (0, Ue._)`${S}[${$}]`), e.error(), t.assign(c, !1).break();
        }).code((0, Ue._)`${S}[${$}] = ${y}`);
      });
    }
    function h(y, g) {
      const $ = (0, uN.useFunc)(t, fN.default), v = t.name("outer");
      t.label(v).for((0, Ue._)`;${y}--;`, () => t.for((0, Ue._)`${g} = ${y}; ${g}--;`, () => t.if((0, Ue._)`${$}(${r}[${y}], ${r}[${g}])`, () => {
        e.error(), t.assign(c, !1).break(v);
      })));
    }
  }
};
Gl.default = hN;
var Vl = {};
Object.defineProperty(Vl, "__esModule", { value: !0 });
const Tc = re, pN = Y, mN = vo, yN = {
  message: "must be equal to constant",
  params: ({ schemaCode: e }) => (0, Tc._)`{allowedValue: ${e}}`
}, gN = {
  keyword: "const",
  $data: !0,
  error: yN,
  code(e) {
    const { gen: t, data: r, $data: n, schemaCode: i, schema: o } = e;
    n || o && typeof o == "object" ? e.fail$data((0, Tc._)`!${(0, pN.useFunc)(t, mN.default)}(${r}, ${i})`) : e.fail((0, Tc._)`${o} !== ${r}`);
  }
};
Vl.default = gN;
var zl = {};
Object.defineProperty(zl, "__esModule", { value: !0 });
const Oi = re, vN = Y, $N = vo, _N = {
  message: "must be equal to one of the allowed values",
  params: ({ schemaCode: e }) => (0, Oi._)`{allowedValues: ${e}}`
}, wN = {
  keyword: "enum",
  schemaType: "array",
  $data: !0,
  error: _N,
  code(e) {
    const { gen: t, data: r, $data: n, schema: i, schemaCode: o, it: a } = e;
    if (!n && i.length === 0)
      throw new Error("enum must have non-empty array");
    const s = i.length >= a.opts.loopEnum;
    let c;
    const f = () => c ?? (c = (0, vN.useFunc)(t, $N.default));
    let l;
    if (s || n)
      l = t.let("valid"), e.block$data(l, u);
    else {
      if (!Array.isArray(i))
        throw new Error("ajv implementation error");
      const h = t.const("vSchema", o);
      l = (0, Oi.or)(...i.map((y, g) => d(h, g)));
    }
    e.pass(l);
    function u() {
      t.assign(l, !1), t.forOf("v", o, (h) => t.if((0, Oi._)`${f()}(${r}, ${h})`, () => t.assign(l, !0).break()));
    }
    function d(h, y) {
      const g = i[y];
      return typeof g == "object" && g !== null ? (0, Oi._)`${f()}(${r}, ${h}[${y}])` : (0, Oi._)`${r} === ${g}`;
    }
  }
};
zl.default = wN;
Object.defineProperty(ns, "__esModule", { value: !0 });
const EN = Ll, SN = xl, bN = Ul, PN = Ml, TN = ql, AN = Hl, ON = Bl, CN = Gl, IN = Vl, RN = zl, NN = [
  // number
  EN.default,
  SN.default,
  // string
  bN.default,
  PN.default,
  // object
  TN.default,
  AN.default,
  // array
  ON.default,
  CN.default,
  // any
  { keyword: "type", schemaType: ["string", "array"] },
  { keyword: "nullable", schemaType: "boolean" },
  IN.default,
  RN.default
];
ns.default = NN;
var is = {}, Jn = {};
Object.defineProperty(Jn, "__esModule", { value: !0 });
Jn.validateAdditionalItems = void 0;
const Xr = re, Ac = Y, DN = {
  message: ({ params: { len: e } }) => (0, Xr.str)`must NOT have more than ${e} items`,
  params: ({ params: { len: e } }) => (0, Xr._)`{limit: ${e}}`
}, kN = {
  keyword: "additionalItems",
  type: "array",
  schemaType: ["boolean", "object"],
  before: "uniqueItems",
  error: DN,
  code(e) {
    const { parentSchema: t, it: r } = e, { items: n } = t;
    if (!Array.isArray(n)) {
      (0, Ac.checkStrictMode)(r, '"additionalItems" is ignored when "items" is not an array of schemas');
      return;
    }
    Sg(e, n);
  }
};
function Sg(e, t) {
  const { gen: r, schema: n, data: i, keyword: o, it: a } = e;
  a.items = !0;
  const s = r.const("len", (0, Xr._)`${i}.length`);
  if (n === !1)
    e.setParams({ len: t.length }), e.pass((0, Xr._)`${s} <= ${t.length}`);
  else if (typeof n == "object" && !(0, Ac.alwaysValidSchema)(a, n)) {
    const f = r.var("valid", (0, Xr._)`${s} <= ${t.length}`);
    r.if((0, Xr.not)(f), () => c(f)), e.ok(f);
  }
  function c(f) {
    r.forRange("i", t.length, s, (l) => {
      e.subschema({ keyword: o, dataProp: l, dataPropType: Ac.Type.Num }, f), a.allErrors || r.if((0, Xr.not)(f), () => r.break());
    });
  }
}
Jn.validateAdditionalItems = Sg;
Jn.default = kN;
var Wl = {}, Qn = {};
Object.defineProperty(Qn, "__esModule", { value: !0 });
Qn.validateTuple = void 0;
const yh = re, ta = Y, FN = ae, LN = {
  keyword: "items",
  type: "array",
  schemaType: ["object", "array", "boolean"],
  before: "uniqueItems",
  code(e) {
    const { schema: t, it: r } = e;
    if (Array.isArray(t))
      return bg(e, "additionalItems", t);
    r.items = !0, !(0, ta.alwaysValidSchema)(r, t) && e.ok((0, FN.validateArray)(e));
  }
};
function bg(e, t, r = e.schema) {
  const { gen: n, parentSchema: i, data: o, keyword: a, it: s } = e;
  l(i), s.opts.unevaluated && r.length && s.items !== !0 && (s.items = ta.mergeEvaluated.items(n, r.length, s.items));
  const c = n.name("valid"), f = n.const("len", (0, yh._)`${o}.length`);
  r.forEach((u, d) => {
    (0, ta.alwaysValidSchema)(s, u) || (n.if((0, yh._)`${f} > ${d}`, () => e.subschema({
      keyword: a,
      schemaProp: d,
      dataProp: d
    }, c)), e.ok(c));
  });
  function l(u) {
    const { opts: d, errSchemaPath: h } = s, y = r.length, g = y === u.minItems && (y === u.maxItems || u[t] === !1);
    if (d.strictTuples && !g) {
      const $ = `"${a}" is ${y}-tuple, but minItems or maxItems/${t} are not specified or different at path "${h}"`;
      (0, ta.checkStrictMode)(s, $, d.strictTuples);
    }
  }
}
Qn.validateTuple = bg;
Qn.default = LN;
Object.defineProperty(Wl, "__esModule", { value: !0 });
const xN = Qn, UN = {
  keyword: "prefixItems",
  type: "array",
  schemaType: ["array"],
  before: "uniqueItems",
  code: (e) => (0, xN.validateTuple)(e, "items")
};
Wl.default = UN;
var Kl = {};
Object.defineProperty(Kl, "__esModule", { value: !0 });
const gh = re, jN = Y, MN = ae, qN = Jn, HN = {
  message: ({ params: { len: e } }) => (0, gh.str)`must NOT have more than ${e} items`,
  params: ({ params: { len: e } }) => (0, gh._)`{limit: ${e}}`
}, BN = {
  keyword: "items",
  type: "array",
  schemaType: ["object", "boolean"],
  before: "uniqueItems",
  error: HN,
  code(e) {
    const { schema: t, parentSchema: r, it: n } = e, { prefixItems: i } = r;
    n.items = !0, !(0, jN.alwaysValidSchema)(n, t) && (i ? (0, qN.validateAdditionalItems)(e, i) : e.ok((0, MN.validateArray)(e)));
  }
};
Kl.default = BN;
var Yl = {};
Object.defineProperty(Yl, "__esModule", { value: !0 });
const vt = re, Bo = Y, GN = {
  message: ({ params: { min: e, max: t } }) => t === void 0 ? (0, vt.str)`must contain at least ${e} valid item(s)` : (0, vt.str)`must contain at least ${e} and no more than ${t} valid item(s)`,
  params: ({ params: { min: e, max: t } }) => t === void 0 ? (0, vt._)`{minContains: ${e}}` : (0, vt._)`{minContains: ${e}, maxContains: ${t}}`
}, VN = {
  keyword: "contains",
  type: "array",
  schemaType: ["object", "boolean"],
  before: "uniqueItems",
  trackErrors: !0,
  error: GN,
  code(e) {
    const { gen: t, schema: r, parentSchema: n, data: i, it: o } = e;
    let a, s;
    const { minContains: c, maxContains: f } = n;
    o.opts.next ? (a = c === void 0 ? 1 : c, s = f) : a = 1;
    const l = t.const("len", (0, vt._)`${i}.length`);
    if (e.setParams({ min: a, max: s }), s === void 0 && a === 0) {
      (0, Bo.checkStrictMode)(o, '"minContains" == 0 without "maxContains": "contains" keyword ignored');
      return;
    }
    if (s !== void 0 && a > s) {
      (0, Bo.checkStrictMode)(o, '"minContains" > "maxContains" is always invalid'), e.fail();
      return;
    }
    if ((0, Bo.alwaysValidSchema)(o, r)) {
      let g = (0, vt._)`${l} >= ${a}`;
      s !== void 0 && (g = (0, vt._)`${g} && ${l} <= ${s}`), e.pass(g);
      return;
    }
    o.items = !0;
    const u = t.name("valid");
    s === void 0 && a === 1 ? h(u, () => t.if(u, () => t.break())) : a === 0 ? (t.let(u, !0), s !== void 0 && t.if((0, vt._)`${i}.length > 0`, d)) : (t.let(u, !1), d()), e.result(u, () => e.reset());
    function d() {
      const g = t.name("_valid"), $ = t.let("count", 0);
      h(g, () => t.if(g, () => y($)));
    }
    function h(g, $) {
      t.forRange("i", 0, l, (v) => {
        e.subschema({
          keyword: "contains",
          dataProp: v,
          dataPropType: Bo.Type.Num,
          compositeRule: !0
        }, g), $();
      });
    }
    function y(g) {
      t.code((0, vt._)`${g}++`), s === void 0 ? t.if((0, vt._)`${g} >= ${a}`, () => t.assign(u, !0).break()) : (t.if((0, vt._)`${g} > ${s}`, () => t.assign(u, !1).break()), a === 1 ? t.assign(u, !0) : t.if((0, vt._)`${g} >= ${a}`, () => t.assign(u, !0)));
    }
  }
};
Yl.default = VN;
var os = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.validateSchemaDeps = e.validatePropertyDeps = e.error = void 0;
  const t = re, r = Y, n = ae;
  e.error = {
    message: ({ params: { property: c, depsCount: f, deps: l } }) => {
      const u = f === 1 ? "property" : "properties";
      return (0, t.str)`must have ${u} ${l} when property ${c} is present`;
    },
    params: ({ params: { property: c, depsCount: f, deps: l, missingProperty: u } }) => (0, t._)`{property: ${c},
    missingProperty: ${u},
    depsCount: ${f},
    deps: ${l}}`
    // TODO change to reference
  };
  const i = {
    keyword: "dependencies",
    type: "object",
    schemaType: "object",
    error: e.error,
    code(c) {
      const [f, l] = o(c);
      a(c, f), s(c, l);
    }
  };
  function o({ schema: c }) {
    const f = {}, l = {};
    for (const u in c) {
      if (u === "__proto__")
        continue;
      const d = Array.isArray(c[u]) ? f : l;
      d[u] = c[u];
    }
    return [f, l];
  }
  function a(c, f = c.schema) {
    const { gen: l, data: u, it: d } = c;
    if (Object.keys(f).length === 0)
      return;
    const h = l.let("missing");
    for (const y in f) {
      const g = f[y];
      if (g.length === 0)
        continue;
      const $ = (0, n.propertyInData)(l, u, y, d.opts.ownProperties);
      c.setParams({
        property: y,
        depsCount: g.length,
        deps: g.join(", ")
      }), d.allErrors ? l.if($, () => {
        for (const v of g)
          (0, n.checkReportMissingProp)(c, v);
      }) : (l.if((0, t._)`${$} && (${(0, n.checkMissingProp)(c, g, h)})`), (0, n.reportMissingProp)(c, h), l.else());
    }
  }
  e.validatePropertyDeps = a;
  function s(c, f = c.schema) {
    const { gen: l, data: u, keyword: d, it: h } = c, y = l.name("valid");
    for (const g in f)
      (0, r.alwaysValidSchema)(h, f[g]) || (l.if(
        (0, n.propertyInData)(l, u, g, h.opts.ownProperties),
        () => {
          const $ = c.subschema({ keyword: d, schemaProp: g }, y);
          c.mergeValidEvaluated($, y);
        },
        () => l.var(y, !0)
        // TODO var
      ), c.ok(y));
  }
  e.validateSchemaDeps = s, e.default = i;
})(os);
var Xl = {};
Object.defineProperty(Xl, "__esModule", { value: !0 });
const Pg = re, zN = Y, WN = {
  message: "property name must be valid",
  params: ({ params: e }) => (0, Pg._)`{propertyName: ${e.propertyName}}`
}, KN = {
  keyword: "propertyNames",
  type: "object",
  schemaType: ["object", "boolean"],
  error: WN,
  code(e) {
    const { gen: t, schema: r, data: n, it: i } = e;
    if ((0, zN.alwaysValidSchema)(i, r))
      return;
    const o = t.name("valid");
    t.forIn("key", n, (a) => {
      e.setParams({ propertyName: a }), e.subschema({
        keyword: "propertyNames",
        data: a,
        dataTypes: ["string"],
        propertyName: a,
        compositeRule: !0
      }, o), t.if((0, Pg.not)(o), () => {
        e.error(!0), i.allErrors || t.break();
      });
    }), e.ok(o);
  }
};
Xl.default = KN;
var as = {};
Object.defineProperty(as, "__esModule", { value: !0 });
const Go = ae, St = re, YN = ht, Vo = Y, XN = {
  message: "must NOT have additional properties",
  params: ({ params: e }) => (0, St._)`{additionalProperty: ${e.additionalProperty}}`
}, JN = {
  keyword: "additionalProperties",
  type: ["object"],
  schemaType: ["boolean", "object"],
  allowUndefined: !0,
  trackErrors: !0,
  error: XN,
  code(e) {
    const { gen: t, schema: r, parentSchema: n, data: i, errsCount: o, it: a } = e;
    if (!o)
      throw new Error("ajv implementation error");
    const { allErrors: s, opts: c } = a;
    if (a.props = !0, c.removeAdditional !== "all" && (0, Vo.alwaysValidSchema)(a, r))
      return;
    const f = (0, Go.allSchemaProperties)(n.properties), l = (0, Go.allSchemaProperties)(n.patternProperties);
    u(), e.ok((0, St._)`${o} === ${YN.default.errors}`);
    function u() {
      t.forIn("key", i, ($) => {
        !f.length && !l.length ? y($) : t.if(d($), () => y($));
      });
    }
    function d($) {
      let v;
      if (f.length > 8) {
        const S = (0, Vo.schemaRefOrVal)(a, n.properties, "properties");
        v = (0, Go.isOwnProperty)(t, S, $);
      } else f.length ? v = (0, St.or)(...f.map((S) => (0, St._)`${$} === ${S}`)) : v = St.nil;
      return l.length && (v = (0, St.or)(v, ...l.map((S) => (0, St._)`${(0, Go.usePattern)(e, S)}.test(${$})`))), (0, St.not)(v);
    }
    function h($) {
      t.code((0, St._)`delete ${i}[${$}]`);
    }
    function y($) {
      if (c.removeAdditional === "all" || c.removeAdditional && r === !1) {
        h($);
        return;
      }
      if (r === !1) {
        e.setParams({ additionalProperty: $ }), e.error(), s || t.break();
        return;
      }
      if (typeof r == "object" && !(0, Vo.alwaysValidSchema)(a, r)) {
        const v = t.name("valid");
        c.removeAdditional === "failing" ? (g($, v, !1), t.if((0, St.not)(v), () => {
          e.reset(), h($);
        })) : (g($, v), s || t.if((0, St.not)(v), () => t.break()));
      }
    }
    function g($, v, S) {
      const C = {
        keyword: "additionalProperties",
        dataProp: $,
        dataPropType: Vo.Type.Str
      };
      S === !1 && Object.assign(C, {
        compositeRule: !0,
        createErrors: !1,
        allErrors: !1
      }), e.subschema(C, v);
    }
  }
};
as.default = JN;
var Jl = {};
Object.defineProperty(Jl, "__esModule", { value: !0 });
const QN = $t, vh = ae, Zs = Y, $h = as, ZN = {
  keyword: "properties",
  type: "object",
  schemaType: "object",
  code(e) {
    const { gen: t, schema: r, parentSchema: n, data: i, it: o } = e;
    o.opts.removeAdditional === "all" && n.additionalProperties === void 0 && $h.default.code(new QN.KeywordCxt(o, $h.default, "additionalProperties"));
    const a = (0, vh.allSchemaProperties)(r);
    for (const u of a)
      o.definedProperties.add(u);
    o.opts.unevaluated && a.length && o.props !== !0 && (o.props = Zs.mergeEvaluated.props(t, (0, Zs.toHash)(a), o.props));
    const s = a.filter((u) => !(0, Zs.alwaysValidSchema)(o, r[u]));
    if (s.length === 0)
      return;
    const c = t.name("valid");
    for (const u of s)
      f(u) ? l(u) : (t.if((0, vh.propertyInData)(t, i, u, o.opts.ownProperties)), l(u), o.allErrors || t.else().var(c, !0), t.endIf()), e.it.definedProperties.add(u), e.ok(c);
    function f(u) {
      return o.opts.useDefaults && !o.compositeRule && r[u].default !== void 0;
    }
    function l(u) {
      e.subschema({
        keyword: "properties",
        schemaProp: u,
        dataProp: u
      }, c);
    }
  }
};
Jl.default = ZN;
var Ql = {};
Object.defineProperty(Ql, "__esModule", { value: !0 });
const _h = ae, zo = re, wh = Y, Eh = Y, eD = {
  keyword: "patternProperties",
  type: "object",
  schemaType: "object",
  code(e) {
    const { gen: t, schema: r, data: n, parentSchema: i, it: o } = e, { opts: a } = o, s = (0, _h.allSchemaProperties)(r), c = s.filter((g) => (0, wh.alwaysValidSchema)(o, r[g]));
    if (s.length === 0 || c.length === s.length && (!o.opts.unevaluated || o.props === !0))
      return;
    const f = a.strictSchema && !a.allowMatchingProperties && i.properties, l = t.name("valid");
    o.props !== !0 && !(o.props instanceof zo.Name) && (o.props = (0, Eh.evaluatedPropsToName)(t, o.props));
    const { props: u } = o;
    d();
    function d() {
      for (const g of s)
        f && h(g), o.allErrors ? y(g) : (t.var(l, !0), y(g), t.if(l));
    }
    function h(g) {
      for (const $ in f)
        new RegExp(g).test($) && (0, wh.checkStrictMode)(o, `property ${$} matches pattern ${g} (use allowMatchingProperties)`);
    }
    function y(g) {
      t.forIn("key", n, ($) => {
        t.if((0, zo._)`${(0, _h.usePattern)(e, g)}.test(${$})`, () => {
          const v = c.includes(g);
          v || e.subschema({
            keyword: "patternProperties",
            schemaProp: g,
            dataProp: $,
            dataPropType: Eh.Type.Str
          }, l), o.opts.unevaluated && u !== !0 ? t.assign((0, zo._)`${u}[${$}]`, !0) : !v && !o.allErrors && t.if((0, zo.not)(l), () => t.break());
        });
      });
    }
  }
};
Ql.default = eD;
var Zl = {};
Object.defineProperty(Zl, "__esModule", { value: !0 });
const tD = Y, rD = {
  keyword: "not",
  schemaType: ["object", "boolean"],
  trackErrors: !0,
  code(e) {
    const { gen: t, schema: r, it: n } = e;
    if ((0, tD.alwaysValidSchema)(n, r)) {
      e.fail();
      return;
    }
    const i = t.name("valid");
    e.subschema({
      keyword: "not",
      compositeRule: !0,
      createErrors: !1,
      allErrors: !1
    }, i), e.failResult(i, () => e.reset(), () => e.error());
  },
  error: { message: "must NOT be valid" }
};
Zl.default = rD;
var eu = {};
Object.defineProperty(eu, "__esModule", { value: !0 });
const nD = ae, iD = {
  keyword: "anyOf",
  schemaType: "array",
  trackErrors: !0,
  code: nD.validateUnion,
  error: { message: "must match a schema in anyOf" }
};
eu.default = iD;
var tu = {};
Object.defineProperty(tu, "__esModule", { value: !0 });
const ra = re, oD = Y, aD = {
  message: "must match exactly one schema in oneOf",
  params: ({ params: e }) => (0, ra._)`{passingSchemas: ${e.passing}}`
}, sD = {
  keyword: "oneOf",
  schemaType: "array",
  trackErrors: !0,
  error: aD,
  code(e) {
    const { gen: t, schema: r, parentSchema: n, it: i } = e;
    if (!Array.isArray(r))
      throw new Error("ajv implementation error");
    if (i.opts.discriminator && n.discriminator)
      return;
    const o = r, a = t.let("valid", !1), s = t.let("passing", null), c = t.name("_valid");
    e.setParams({ passing: s }), t.block(f), e.result(a, () => e.reset(), () => e.error(!0));
    function f() {
      o.forEach((l, u) => {
        let d;
        (0, oD.alwaysValidSchema)(i, l) ? t.var(c, !0) : d = e.subschema({
          keyword: "oneOf",
          schemaProp: u,
          compositeRule: !0
        }, c), u > 0 && t.if((0, ra._)`${c} && ${a}`).assign(a, !1).assign(s, (0, ra._)`[${s}, ${u}]`).else(), t.if(c, () => {
          t.assign(a, !0), t.assign(s, u), d && e.mergeEvaluated(d, ra.Name);
        });
      });
    }
  }
};
tu.default = sD;
var ru = {};
Object.defineProperty(ru, "__esModule", { value: !0 });
const cD = Y, lD = {
  keyword: "allOf",
  schemaType: "array",
  code(e) {
    const { gen: t, schema: r, it: n } = e;
    if (!Array.isArray(r))
      throw new Error("ajv implementation error");
    const i = t.name("valid");
    r.forEach((o, a) => {
      if ((0, cD.alwaysValidSchema)(n, o))
        return;
      const s = e.subschema({ keyword: "allOf", schemaProp: a }, i);
      e.ok(i), e.mergeEvaluated(s);
    });
  }
};
ru.default = lD;
var nu = {};
Object.defineProperty(nu, "__esModule", { value: !0 });
const wa = re, Tg = Y, uD = {
  message: ({ params: e }) => (0, wa.str)`must match "${e.ifClause}" schema`,
  params: ({ params: e }) => (0, wa._)`{failingKeyword: ${e.ifClause}}`
}, fD = {
  keyword: "if",
  schemaType: ["object", "boolean"],
  trackErrors: !0,
  error: uD,
  code(e) {
    const { gen: t, parentSchema: r, it: n } = e;
    r.then === void 0 && r.else === void 0 && (0, Tg.checkStrictMode)(n, '"if" without "then" and "else" is ignored');
    const i = Sh(n, "then"), o = Sh(n, "else");
    if (!i && !o)
      return;
    const a = t.let("valid", !0), s = t.name("_valid");
    if (c(), e.reset(), i && o) {
      const l = t.let("ifClause");
      e.setParams({ ifClause: l }), t.if(s, f("then", l), f("else", l));
    } else i ? t.if(s, f("then")) : t.if((0, wa.not)(s), f("else"));
    e.pass(a, () => e.error(!0));
    function c() {
      const l = e.subschema({
        keyword: "if",
        compositeRule: !0,
        createErrors: !1,
        allErrors: !1
      }, s);
      e.mergeEvaluated(l);
    }
    function f(l, u) {
      return () => {
        const d = e.subschema({ keyword: l }, s);
        t.assign(a, s), e.mergeValidEvaluated(d, a), u ? t.assign(u, (0, wa._)`${l}`) : e.setParams({ ifClause: l });
      };
    }
  }
};
function Sh(e, t) {
  const r = e.schema[t];
  return r !== void 0 && !(0, Tg.alwaysValidSchema)(e, r);
}
nu.default = fD;
var iu = {};
Object.defineProperty(iu, "__esModule", { value: !0 });
const dD = Y, hD = {
  keyword: ["then", "else"],
  schemaType: ["object", "boolean"],
  code({ keyword: e, parentSchema: t, it: r }) {
    t.if === void 0 && (0, dD.checkStrictMode)(r, `"${e}" without "if" is ignored`);
  }
};
iu.default = hD;
Object.defineProperty(is, "__esModule", { value: !0 });
const pD = Jn, mD = Wl, yD = Qn, gD = Kl, vD = Yl, $D = os, _D = Xl, wD = as, ED = Jl, SD = Ql, bD = Zl, PD = eu, TD = tu, AD = ru, OD = nu, CD = iu;
function ID(e = !1) {
  const t = [
    // any
    bD.default,
    PD.default,
    TD.default,
    AD.default,
    OD.default,
    CD.default,
    // object
    _D.default,
    wD.default,
    $D.default,
    ED.default,
    SD.default
  ];
  return e ? t.push(mD.default, gD.default) : t.push(pD.default, yD.default), t.push(vD.default), t;
}
is.default = ID;
var ou = {}, Zn = {};
Object.defineProperty(Zn, "__esModule", { value: !0 });
Zn.dynamicAnchor = void 0;
const ec = re, RD = ht, bh = Qe, ND = Zt, DD = {
  keyword: "$dynamicAnchor",
  schemaType: "string",
  code: (e) => Ag(e, e.schema)
};
function Ag(e, t) {
  const { gen: r, it: n } = e;
  n.schemaEnv.root.dynamicAnchors[t] = !0;
  const i = (0, ec._)`${RD.default.dynamicAnchors}${(0, ec.getProperty)(t)}`, o = n.errSchemaPath === "#" ? n.validateName : kD(e);
  r.if((0, ec._)`!${i}`, () => r.assign(i, o));
}
Zn.dynamicAnchor = Ag;
function kD(e) {
  const { schemaEnv: t, schema: r, self: n } = e.it, { root: i, baseId: o, localRefs: a, meta: s } = t.root, { schemaId: c } = n.opts, f = new bh.SchemaEnv({ schema: r, schemaId: c, root: i, baseId: o, localRefs: a, meta: s });
  return bh.compileSchema.call(n, f), (0, ND.getValidate)(e, f);
}
Zn.default = DD;
var ei = {};
Object.defineProperty(ei, "__esModule", { value: !0 });
ei.dynamicRef = void 0;
const Ph = re, FD = ht, Th = Zt, LD = {
  keyword: "$dynamicRef",
  schemaType: "string",
  code: (e) => Og(e, e.schema)
};
function Og(e, t) {
  const { gen: r, keyword: n, it: i } = e;
  if (t[0] !== "#")
    throw new Error(`"${n}" only supports hash fragment reference`);
  const o = t.slice(1);
  if (i.allErrors)
    a();
  else {
    const c = r.let("valid", !1);
    a(c), e.ok(c);
  }
  function a(c) {
    if (i.schemaEnv.root.dynamicAnchors[o]) {
      const f = r.let("_v", (0, Ph._)`${FD.default.dynamicAnchors}${(0, Ph.getProperty)(o)}`);
      r.if(f, s(f, c), s(i.validateName, c));
    } else
      s(i.validateName, c)();
  }
  function s(c, f) {
    return f ? () => r.block(() => {
      (0, Th.callRef)(e, c), r.let(f, !0);
    }) : () => (0, Th.callRef)(e, c);
  }
}
ei.dynamicRef = Og;
ei.default = LD;
var au = {};
Object.defineProperty(au, "__esModule", { value: !0 });
const xD = Zn, UD = Y, jD = {
  keyword: "$recursiveAnchor",
  schemaType: "boolean",
  code(e) {
    e.schema ? (0, xD.dynamicAnchor)(e, "") : (0, UD.checkStrictMode)(e.it, "$recursiveAnchor: false is ignored");
  }
};
au.default = jD;
var su = {};
Object.defineProperty(su, "__esModule", { value: !0 });
const MD = ei, qD = {
  keyword: "$recursiveRef",
  schemaType: "string",
  code: (e) => (0, MD.dynamicRef)(e, e.schema)
};
su.default = qD;
Object.defineProperty(ou, "__esModule", { value: !0 });
const HD = Zn, BD = ei, GD = au, VD = su, zD = [HD.default, BD.default, GD.default, VD.default];
ou.default = zD;
var cu = {}, lu = {};
Object.defineProperty(lu, "__esModule", { value: !0 });
const Ah = os, WD = {
  keyword: "dependentRequired",
  type: "object",
  schemaType: "object",
  error: Ah.error,
  code: (e) => (0, Ah.validatePropertyDeps)(e)
};
lu.default = WD;
var uu = {};
Object.defineProperty(uu, "__esModule", { value: !0 });
const KD = os, YD = {
  keyword: "dependentSchemas",
  type: "object",
  schemaType: "object",
  code: (e) => (0, KD.validateSchemaDeps)(e)
};
uu.default = YD;
var fu = {};
Object.defineProperty(fu, "__esModule", { value: !0 });
const XD = Y, JD = {
  keyword: ["maxContains", "minContains"],
  type: "array",
  schemaType: "number",
  code({ keyword: e, parentSchema: t, it: r }) {
    t.contains === void 0 && (0, XD.checkStrictMode)(r, `"${e}" without "contains" is ignored`);
  }
};
fu.default = JD;
Object.defineProperty(cu, "__esModule", { value: !0 });
const QD = lu, ZD = uu, ek = fu, tk = [QD.default, ZD.default, ek.default];
cu.default = tk;
var du = {}, hu = {};
Object.defineProperty(hu, "__esModule", { value: !0 });
const dr = re, Oh = Y, rk = ht, nk = {
  message: "must NOT have unevaluated properties",
  params: ({ params: e }) => (0, dr._)`{unevaluatedProperty: ${e.unevaluatedProperty}}`
}, ik = {
  keyword: "unevaluatedProperties",
  type: "object",
  schemaType: ["boolean", "object"],
  trackErrors: !0,
  error: nk,
  code(e) {
    const { gen: t, schema: r, data: n, errsCount: i, it: o } = e;
    if (!i)
      throw new Error("ajv implementation error");
    const { allErrors: a, props: s } = o;
    s instanceof dr.Name ? t.if((0, dr._)`${s} !== true`, () => t.forIn("key", n, (u) => t.if(f(s, u), () => c(u)))) : s !== !0 && t.forIn("key", n, (u) => s === void 0 ? c(u) : t.if(l(s, u), () => c(u))), o.props = !0, e.ok((0, dr._)`${i} === ${rk.default.errors}`);
    function c(u) {
      if (r === !1) {
        e.setParams({ unevaluatedProperty: u }), e.error(), a || t.break();
        return;
      }
      if (!(0, Oh.alwaysValidSchema)(o, r)) {
        const d = t.name("valid");
        e.subschema({
          keyword: "unevaluatedProperties",
          dataProp: u,
          dataPropType: Oh.Type.Str
        }, d), a || t.if((0, dr.not)(d), () => t.break());
      }
    }
    function f(u, d) {
      return (0, dr._)`!${u} || !${u}[${d}]`;
    }
    function l(u, d) {
      const h = [];
      for (const y in u)
        u[y] === !0 && h.push((0, dr._)`${d} !== ${y}`);
      return (0, dr.and)(...h);
    }
  }
};
hu.default = ik;
var pu = {};
Object.defineProperty(pu, "__esModule", { value: !0 });
const Jr = re, Ch = Y, ok = {
  message: ({ params: { len: e } }) => (0, Jr.str)`must NOT have more than ${e} items`,
  params: ({ params: { len: e } }) => (0, Jr._)`{limit: ${e}}`
}, ak = {
  keyword: "unevaluatedItems",
  type: "array",
  schemaType: ["boolean", "object"],
  error: ok,
  code(e) {
    const { gen: t, schema: r, data: n, it: i } = e, o = i.items || 0;
    if (o === !0)
      return;
    const a = t.const("len", (0, Jr._)`${n}.length`);
    if (r === !1)
      e.setParams({ len: o }), e.fail((0, Jr._)`${a} > ${o}`);
    else if (typeof r == "object" && !(0, Ch.alwaysValidSchema)(i, r)) {
      const c = t.var("valid", (0, Jr._)`${a} <= ${o}`);
      t.if((0, Jr.not)(c), () => s(c, o)), e.ok(c);
    }
    i.items = !0;
    function s(c, f) {
      t.forRange("i", f, a, (l) => {
        e.subschema({ keyword: "unevaluatedItems", dataProp: l, dataPropType: Ch.Type.Num }, c), i.allErrors || t.if((0, Jr.not)(c), () => t.break());
      });
    }
  }
};
pu.default = ak;
Object.defineProperty(du, "__esModule", { value: !0 });
const sk = hu, ck = pu, lk = [sk.default, ck.default];
du.default = lk;
var ss = {}, mu = {};
Object.defineProperty(mu, "__esModule", { value: !0 });
const Te = re, uk = {
  message: ({ schemaCode: e }) => (0, Te.str)`must match format "${e}"`,
  params: ({ schemaCode: e }) => (0, Te._)`{format: ${e}}`
}, fk = {
  keyword: "format",
  type: ["number", "string"],
  schemaType: "string",
  $data: !0,
  error: uk,
  code(e, t) {
    const { gen: r, data: n, $data: i, schema: o, schemaCode: a, it: s } = e, { opts: c, errSchemaPath: f, schemaEnv: l, self: u } = s;
    if (!c.validateFormats)
      return;
    i ? d() : h();
    function d() {
      const y = r.scopeValue("formats", {
        ref: u.formats,
        code: c.code.formats
      }), g = r.const("fDef", (0, Te._)`${y}[${a}]`), $ = r.let("fType"), v = r.let("format");
      r.if((0, Te._)`typeof ${g} == "object" && !(${g} instanceof RegExp)`, () => r.assign($, (0, Te._)`${g}.type || "string"`).assign(v, (0, Te._)`${g}.validate`), () => r.assign($, (0, Te._)`"string"`).assign(v, g)), e.fail$data((0, Te.or)(S(), C()));
      function S() {
        return c.strictSchema === !1 ? Te.nil : (0, Te._)`${a} && !${v}`;
      }
      function C() {
        const R = l.$async ? (0, Te._)`(${g}.async ? await ${v}(${n}) : ${v}(${n}))` : (0, Te._)`${v}(${n})`, M = (0, Te._)`(typeof ${v} == "function" ? ${R} : ${v}.test(${n}))`;
        return (0, Te._)`${v} && ${v} !== true && ${$} === ${t} && !${M}`;
      }
    }
    function h() {
      const y = u.formats[o];
      if (!y) {
        S();
        return;
      }
      if (y === !0)
        return;
      const [g, $, v] = C(y);
      g === t && e.pass(R());
      function S() {
        if (c.strictSchema === !1) {
          u.logger.warn(M());
          return;
        }
        throw new Error(M());
        function M() {
          return `unknown format "${o}" ignored in schema at path "${f}"`;
        }
      }
      function C(M) {
        const I = M instanceof RegExp ? (0, Te.regexpCode)(M) : c.code.formats ? (0, Te._)`${c.code.formats}${(0, Te.getProperty)(o)}` : void 0, L = r.scopeValue("formats", { key: o, ref: M, code: I });
        return typeof M == "object" && !(M instanceof RegExp) ? [M.type || "string", M.validate, (0, Te._)`${L}.validate`] : ["string", M, L];
      }
      function R() {
        if (typeof y == "object" && !(y instanceof RegExp) && y.async) {
          if (!l.$async)
            throw new Error("async format in sync schema");
          return (0, Te._)`await ${v}(${n})`;
        }
        return typeof $ == "function" ? (0, Te._)`${v}(${n})` : (0, Te._)`${v}.test(${n})`;
      }
    }
  }
};
mu.default = fk;
Object.defineProperty(ss, "__esModule", { value: !0 });
const dk = mu, hk = [dk.default];
ss.default = hk;
var on = {};
Object.defineProperty(on, "__esModule", { value: !0 });
on.contentVocabulary = on.metadataVocabulary = void 0;
on.metadataVocabulary = [
  "title",
  "description",
  "default",
  "deprecated",
  "readOnly",
  "writeOnly",
  "examples"
];
on.contentVocabulary = [
  "contentMediaType",
  "contentEncoding",
  "contentSchema"
];
Object.defineProperty(kl, "__esModule", { value: !0 });
const pk = rs, mk = ns, yk = is, gk = ou, vk = cu, $k = du, _k = ss, Ih = on, wk = [
  gk.default,
  pk.default,
  mk.default,
  (0, yk.default)(!0),
  _k.default,
  Ih.metadataVocabulary,
  Ih.contentVocabulary,
  vk.default,
  $k.default
];
kl.default = wk;
var cs = {}, ls = {};
Object.defineProperty(ls, "__esModule", { value: !0 });
ls.DiscrError = void 0;
var Rh;
(function(e) {
  e.Tag = "tag", e.Mapping = "mapping";
})(Rh || (ls.DiscrError = Rh = {}));
Object.defineProperty(cs, "__esModule", { value: !0 });
const Sn = re, Oc = ls, Nh = Qe, Ek = un, Sk = Y, bk = {
  message: ({ params: { discrError: e, tagName: t } }) => e === Oc.DiscrError.Tag ? `tag "${t}" must be string` : `value of tag "${t}" must be in oneOf`,
  params: ({ params: { discrError: e, tag: t, tagName: r } }) => (0, Sn._)`{error: ${e}, tag: ${r}, tagValue: ${t}}`
}, Pk = {
  keyword: "discriminator",
  type: "object",
  schemaType: "object",
  error: bk,
  code(e) {
    const { gen: t, data: r, schema: n, parentSchema: i, it: o } = e, { oneOf: a } = i;
    if (!o.opts.discriminator)
      throw new Error("discriminator: requires discriminator option");
    const s = n.propertyName;
    if (typeof s != "string")
      throw new Error("discriminator: requires propertyName");
    if (n.mapping)
      throw new Error("discriminator: mapping is not supported");
    if (!a)
      throw new Error("discriminator: requires oneOf keyword");
    const c = t.let("valid", !1), f = t.const("tag", (0, Sn._)`${r}${(0, Sn.getProperty)(s)}`);
    t.if((0, Sn._)`typeof ${f} == "string"`, () => l(), () => e.error(!1, { discrError: Oc.DiscrError.Tag, tag: f, tagName: s })), e.ok(c);
    function l() {
      const h = d();
      t.if(!1);
      for (const y in h)
        t.elseIf((0, Sn._)`${f} === ${y}`), t.assign(c, u(h[y]));
      t.else(), e.error(!1, { discrError: Oc.DiscrError.Mapping, tag: f, tagName: s }), t.endIf();
    }
    function u(h) {
      const y = t.name("valid"), g = e.subschema({ keyword: "oneOf", schemaProp: h }, y);
      return e.mergeEvaluated(g, Sn.Name), y;
    }
    function d() {
      var h;
      const y = {}, g = v(i);
      let $ = !0;
      for (let R = 0; R < a.length; R++) {
        let M = a[R];
        if (M != null && M.$ref && !(0, Sk.schemaHasRulesButRef)(M, o.self.RULES)) {
          const L = M.$ref;
          if (M = Nh.resolveRef.call(o.self, o.schemaEnv.root, o.baseId, L), M instanceof Nh.SchemaEnv && (M = M.schema), M === void 0)
            throw new Ek.default(o.opts.uriResolver, o.baseId, L);
        }
        const I = (h = M == null ? void 0 : M.properties) === null || h === void 0 ? void 0 : h[s];
        if (typeof I != "object")
          throw new Error(`discriminator: oneOf subschemas (or referenced schemas) must have "properties/${s}"`);
        $ = $ && (g || v(M)), S(I, R);
      }
      if (!$)
        throw new Error(`discriminator: "${s}" must be required`);
      return y;
      function v({ required: R }) {
        return Array.isArray(R) && R.includes(s);
      }
      function S(R, M) {
        if (R.const)
          C(R.const, M);
        else if (R.enum)
          for (const I of R.enum)
            C(I, M);
        else
          throw new Error(`discriminator: "properties/${s}" must have "const" or "enum"`);
      }
      function C(R, M) {
        if (typeof R != "string" || R in y)
          throw new Error(`discriminator: "${s}" values must be unique strings`);
        y[R] = M;
      }
    }
  }
};
cs.default = Pk;
var yu = {};
const Tk = "https://json-schema.org/draft/2020-12/schema", Ak = "https://json-schema.org/draft/2020-12/schema", Ok = {
  "https://json-schema.org/draft/2020-12/vocab/core": !0,
  "https://json-schema.org/draft/2020-12/vocab/applicator": !0,
  "https://json-schema.org/draft/2020-12/vocab/unevaluated": !0,
  "https://json-schema.org/draft/2020-12/vocab/validation": !0,
  "https://json-schema.org/draft/2020-12/vocab/meta-data": !0,
  "https://json-schema.org/draft/2020-12/vocab/format-annotation": !0,
  "https://json-schema.org/draft/2020-12/vocab/content": !0
}, Ck = "meta", Ik = "Core and Validation specifications meta-schema", Rk = [
  {
    $ref: "meta/core"
  },
  {
    $ref: "meta/applicator"
  },
  {
    $ref: "meta/unevaluated"
  },
  {
    $ref: "meta/validation"
  },
  {
    $ref: "meta/meta-data"
  },
  {
    $ref: "meta/format-annotation"
  },
  {
    $ref: "meta/content"
  }
], Nk = [
  "object",
  "boolean"
], Dk = "This meta-schema also defines keywords that have appeared in previous drafts in order to prevent incompatible extensions as they remain in common use.", kk = {
  definitions: {
    $comment: '"definitions" has been replaced by "$defs".',
    type: "object",
    additionalProperties: {
      $dynamicRef: "#meta"
    },
    deprecated: !0,
    default: {}
  },
  dependencies: {
    $comment: '"dependencies" has been split and replaced by "dependentSchemas" and "dependentRequired" in order to serve their differing semantics.',
    type: "object",
    additionalProperties: {
      anyOf: [
        {
          $dynamicRef: "#meta"
        },
        {
          $ref: "meta/validation#/$defs/stringArray"
        }
      ]
    },
    deprecated: !0,
    default: {}
  },
  $recursiveAnchor: {
    $comment: '"$recursiveAnchor" has been replaced by "$dynamicAnchor".',
    $ref: "meta/core#/$defs/anchorString",
    deprecated: !0
  },
  $recursiveRef: {
    $comment: '"$recursiveRef" has been replaced by "$dynamicRef".',
    $ref: "meta/core#/$defs/uriReferenceString",
    deprecated: !0
  }
}, Fk = {
  $schema: Tk,
  $id: Ak,
  $vocabulary: Ok,
  $dynamicAnchor: Ck,
  title: Ik,
  allOf: Rk,
  type: Nk,
  $comment: Dk,
  properties: kk
}, Lk = "https://json-schema.org/draft/2020-12/schema", xk = "https://json-schema.org/draft/2020-12/meta/applicator", Uk = {
  "https://json-schema.org/draft/2020-12/vocab/applicator": !0
}, jk = "meta", Mk = "Applicator vocabulary meta-schema", qk = [
  "object",
  "boolean"
], Hk = {
  prefixItems: {
    $ref: "#/$defs/schemaArray"
  },
  items: {
    $dynamicRef: "#meta"
  },
  contains: {
    $dynamicRef: "#meta"
  },
  additionalProperties: {
    $dynamicRef: "#meta"
  },
  properties: {
    type: "object",
    additionalProperties: {
      $dynamicRef: "#meta"
    },
    default: {}
  },
  patternProperties: {
    type: "object",
    additionalProperties: {
      $dynamicRef: "#meta"
    },
    propertyNames: {
      format: "regex"
    },
    default: {}
  },
  dependentSchemas: {
    type: "object",
    additionalProperties: {
      $dynamicRef: "#meta"
    },
    default: {}
  },
  propertyNames: {
    $dynamicRef: "#meta"
  },
  if: {
    $dynamicRef: "#meta"
  },
  then: {
    $dynamicRef: "#meta"
  },
  else: {
    $dynamicRef: "#meta"
  },
  allOf: {
    $ref: "#/$defs/schemaArray"
  },
  anyOf: {
    $ref: "#/$defs/schemaArray"
  },
  oneOf: {
    $ref: "#/$defs/schemaArray"
  },
  not: {
    $dynamicRef: "#meta"
  }
}, Bk = {
  schemaArray: {
    type: "array",
    minItems: 1,
    items: {
      $dynamicRef: "#meta"
    }
  }
}, Gk = {
  $schema: Lk,
  $id: xk,
  $vocabulary: Uk,
  $dynamicAnchor: jk,
  title: Mk,
  type: qk,
  properties: Hk,
  $defs: Bk
}, Vk = "https://json-schema.org/draft/2020-12/schema", zk = "https://json-schema.org/draft/2020-12/meta/unevaluated", Wk = {
  "https://json-schema.org/draft/2020-12/vocab/unevaluated": !0
}, Kk = "meta", Yk = "Unevaluated applicator vocabulary meta-schema", Xk = [
  "object",
  "boolean"
], Jk = {
  unevaluatedItems: {
    $dynamicRef: "#meta"
  },
  unevaluatedProperties: {
    $dynamicRef: "#meta"
  }
}, Qk = {
  $schema: Vk,
  $id: zk,
  $vocabulary: Wk,
  $dynamicAnchor: Kk,
  title: Yk,
  type: Xk,
  properties: Jk
}, Zk = "https://json-schema.org/draft/2020-12/schema", eF = "https://json-schema.org/draft/2020-12/meta/content", tF = {
  "https://json-schema.org/draft/2020-12/vocab/content": !0
}, rF = "meta", nF = "Content vocabulary meta-schema", iF = [
  "object",
  "boolean"
], oF = {
  contentEncoding: {
    type: "string"
  },
  contentMediaType: {
    type: "string"
  },
  contentSchema: {
    $dynamicRef: "#meta"
  }
}, aF = {
  $schema: Zk,
  $id: eF,
  $vocabulary: tF,
  $dynamicAnchor: rF,
  title: nF,
  type: iF,
  properties: oF
}, sF = "https://json-schema.org/draft/2020-12/schema", cF = "https://json-schema.org/draft/2020-12/meta/core", lF = {
  "https://json-schema.org/draft/2020-12/vocab/core": !0
}, uF = "meta", fF = "Core vocabulary meta-schema", dF = [
  "object",
  "boolean"
], hF = {
  $id: {
    $ref: "#/$defs/uriReferenceString",
    $comment: "Non-empty fragments not allowed.",
    pattern: "^[^#]*#?$"
  },
  $schema: {
    $ref: "#/$defs/uriString"
  },
  $ref: {
    $ref: "#/$defs/uriReferenceString"
  },
  $anchor: {
    $ref: "#/$defs/anchorString"
  },
  $dynamicRef: {
    $ref: "#/$defs/uriReferenceString"
  },
  $dynamicAnchor: {
    $ref: "#/$defs/anchorString"
  },
  $vocabulary: {
    type: "object",
    propertyNames: {
      $ref: "#/$defs/uriString"
    },
    additionalProperties: {
      type: "boolean"
    }
  },
  $comment: {
    type: "string"
  },
  $defs: {
    type: "object",
    additionalProperties: {
      $dynamicRef: "#meta"
    }
  }
}, pF = {
  anchorString: {
    type: "string",
    pattern: "^[A-Za-z_][-A-Za-z0-9._]*$"
  },
  uriString: {
    type: "string",
    format: "uri"
  },
  uriReferenceString: {
    type: "string",
    format: "uri-reference"
  }
}, mF = {
  $schema: sF,
  $id: cF,
  $vocabulary: lF,
  $dynamicAnchor: uF,
  title: fF,
  type: dF,
  properties: hF,
  $defs: pF
}, yF = "https://json-schema.org/draft/2020-12/schema", gF = "https://json-schema.org/draft/2020-12/meta/format-annotation", vF = {
  "https://json-schema.org/draft/2020-12/vocab/format-annotation": !0
}, $F = "meta", _F = "Format vocabulary meta-schema for annotation results", wF = [
  "object",
  "boolean"
], EF = {
  format: {
    type: "string"
  }
}, SF = {
  $schema: yF,
  $id: gF,
  $vocabulary: vF,
  $dynamicAnchor: $F,
  title: _F,
  type: wF,
  properties: EF
}, bF = "https://json-schema.org/draft/2020-12/schema", PF = "https://json-schema.org/draft/2020-12/meta/meta-data", TF = {
  "https://json-schema.org/draft/2020-12/vocab/meta-data": !0
}, AF = "meta", OF = "Meta-data vocabulary meta-schema", CF = [
  "object",
  "boolean"
], IF = {
  title: {
    type: "string"
  },
  description: {
    type: "string"
  },
  default: !0,
  deprecated: {
    type: "boolean",
    default: !1
  },
  readOnly: {
    type: "boolean",
    default: !1
  },
  writeOnly: {
    type: "boolean",
    default: !1
  },
  examples: {
    type: "array",
    items: !0
  }
}, RF = {
  $schema: bF,
  $id: PF,
  $vocabulary: TF,
  $dynamicAnchor: AF,
  title: OF,
  type: CF,
  properties: IF
}, NF = "https://json-schema.org/draft/2020-12/schema", DF = "https://json-schema.org/draft/2020-12/meta/validation", kF = {
  "https://json-schema.org/draft/2020-12/vocab/validation": !0
}, FF = "meta", LF = "Validation vocabulary meta-schema", xF = [
  "object",
  "boolean"
], UF = {
  type: {
    anyOf: [
      {
        $ref: "#/$defs/simpleTypes"
      },
      {
        type: "array",
        items: {
          $ref: "#/$defs/simpleTypes"
        },
        minItems: 1,
        uniqueItems: !0
      }
    ]
  },
  const: !0,
  enum: {
    type: "array",
    items: !0
  },
  multipleOf: {
    type: "number",
    exclusiveMinimum: 0
  },
  maximum: {
    type: "number"
  },
  exclusiveMaximum: {
    type: "number"
  },
  minimum: {
    type: "number"
  },
  exclusiveMinimum: {
    type: "number"
  },
  maxLength: {
    $ref: "#/$defs/nonNegativeInteger"
  },
  minLength: {
    $ref: "#/$defs/nonNegativeIntegerDefault0"
  },
  pattern: {
    type: "string",
    format: "regex"
  },
  maxItems: {
    $ref: "#/$defs/nonNegativeInteger"
  },
  minItems: {
    $ref: "#/$defs/nonNegativeIntegerDefault0"
  },
  uniqueItems: {
    type: "boolean",
    default: !1
  },
  maxContains: {
    $ref: "#/$defs/nonNegativeInteger"
  },
  minContains: {
    $ref: "#/$defs/nonNegativeInteger",
    default: 1
  },
  maxProperties: {
    $ref: "#/$defs/nonNegativeInteger"
  },
  minProperties: {
    $ref: "#/$defs/nonNegativeIntegerDefault0"
  },
  required: {
    $ref: "#/$defs/stringArray"
  },
  dependentRequired: {
    type: "object",
    additionalProperties: {
      $ref: "#/$defs/stringArray"
    }
  }
}, jF = {
  nonNegativeInteger: {
    type: "integer",
    minimum: 0
  },
  nonNegativeIntegerDefault0: {
    $ref: "#/$defs/nonNegativeInteger",
    default: 0
  },
  simpleTypes: {
    enum: [
      "array",
      "boolean",
      "integer",
      "null",
      "number",
      "object",
      "string"
    ]
  },
  stringArray: {
    type: "array",
    items: {
      type: "string"
    },
    uniqueItems: !0,
    default: []
  }
}, MF = {
  $schema: NF,
  $id: DF,
  $vocabulary: kF,
  $dynamicAnchor: FF,
  title: LF,
  type: xF,
  properties: UF,
  $defs: jF
};
Object.defineProperty(yu, "__esModule", { value: !0 });
const qF = Fk, HF = Gk, BF = Qk, GF = aF, VF = mF, zF = SF, WF = RF, KF = MF, YF = ["/properties"];
function XF(e) {
  return [
    qF,
    HF,
    BF,
    GF,
    VF,
    t(this, zF),
    WF,
    t(this, KF)
  ].forEach((r) => this.addMetaSchema(r, void 0, !1)), this;
  function t(r, n) {
    return e ? r.$dataMetaSchema(n, YF) : n;
  }
}
yu.default = XF;
(function(e, t) {
  Object.defineProperty(t, "__esModule", { value: !0 }), t.MissingRefError = t.ValidationError = t.CodeGen = t.Name = t.nil = t.stringify = t.str = t._ = t.KeywordCxt = t.Ajv2020 = void 0;
  const r = $l, n = kl, i = cs, o = yu, a = "https://json-schema.org/draft/2020-12/schema";
  class s extends r.default {
    constructor(h = {}) {
      super({
        ...h,
        dynamicRef: !0,
        next: !0,
        unevaluated: !0
      });
    }
    _addVocabularies() {
      super._addVocabularies(), n.default.forEach((h) => this.addVocabulary(h)), this.opts.discriminator && this.addKeyword(i.default);
    }
    _addDefaultMetaSchema() {
      super._addDefaultMetaSchema();
      const { $data: h, meta: y } = this.opts;
      y && (o.default.call(this, h), this.refs["http://json-schema.org/schema"] = a);
    }
    defaultMeta() {
      return this.opts.defaultMeta = super.defaultMeta() || (this.getSchema(a) ? a : void 0);
    }
  }
  t.Ajv2020 = s, e.exports = t = s, e.exports.Ajv2020 = s, Object.defineProperty(t, "__esModule", { value: !0 }), t.default = s;
  var c = $t;
  Object.defineProperty(t, "KeywordCxt", { enumerable: !0, get: function() {
    return c.KeywordCxt;
  } });
  var f = re;
  Object.defineProperty(t, "_", { enumerable: !0, get: function() {
    return f._;
  } }), Object.defineProperty(t, "str", { enumerable: !0, get: function() {
    return f.str;
  } }), Object.defineProperty(t, "stringify", { enumerable: !0, get: function() {
    return f.stringify;
  } }), Object.defineProperty(t, "nil", { enumerable: !0, get: function() {
    return f.nil;
  } }), Object.defineProperty(t, "Name", { enumerable: !0, get: function() {
    return f.Name;
  } }), Object.defineProperty(t, "CodeGen", { enumerable: !0, get: function() {
    return f.CodeGen;
  } });
  var l = Xn;
  Object.defineProperty(t, "ValidationError", { enumerable: !0, get: function() {
    return l.default;
  } });
  var u = un;
  Object.defineProperty(t, "MissingRefError", { enumerable: !0, get: function() {
    return u.default;
  } });
})(wc, wc.exports);
var JF = wc.exports, Cc = { exports: {} }, Cg = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.formatNames = e.fastFormats = e.fullFormats = void 0;
  function t(q, z) {
    return { validate: q, compare: z };
  }
  e.fullFormats = {
    // date: http://tools.ietf.org/html/rfc3339#section-5.6
    date: t(o, a),
    // date-time: http://tools.ietf.org/html/rfc3339#section-5.6
    time: t(c(!0), f),
    "date-time": t(d(!0), h),
    "iso-time": t(c(), l),
    "iso-date-time": t(d(), y),
    // duration: https://tools.ietf.org/html/rfc3339#appendix-A
    duration: /^P(?!$)((\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+S)?)?|(\d+W)?)$/,
    uri: v,
    "uri-reference": /^(?:[a-z][a-z0-9+\-.]*:)?(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'"()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*)?(?:\?(?:[a-z0-9\-._~!$&'"()*+,;=:@/?]|%[0-9a-f]{2})*)?(?:#(?:[a-z0-9\-._~!$&'"()*+,;=:@/?]|%[0-9a-f]{2})*)?$/i,
    // uri-template: https://tools.ietf.org/html/rfc6570
    "uri-template": /^(?:(?:[^\x00-\x20"'<>%\\^`{|}]|%[0-9a-f]{2})|\{[+#./;?&=,!@|]?(?:[a-z0-9_]|%[0-9a-f]{2})+(?::[1-9][0-9]{0,3}|\*)?(?:,(?:[a-z0-9_]|%[0-9a-f]{2})+(?::[1-9][0-9]{0,3}|\*)?)*\})*$/i,
    // For the source: https://gist.github.com/dperini/729294
    // For test cases: https://mathiasbynens.be/demo/url-regex
    url: /^(?:https?|ftp):\/\/(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u{00a1}-\u{ffff}]+-)*[a-z0-9\u{00a1}-\u{ffff}]+)(?:\.(?:[a-z0-9\u{00a1}-\u{ffff}]+-)*[a-z0-9\u{00a1}-\u{ffff}]+)*(?:\.(?:[a-z\u{00a1}-\u{ffff}]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/iu,
    email: /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i,
    hostname: /^(?=.{1,253}\.?$)[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[-0-9a-z]{0,61}[0-9a-z])?)*\.?$/i,
    // optimized https://www.safaribooksonline.com/library/view/regular-expressions-cookbook/9780596802837/ch07s16.html
    ipv4: /^(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)\.){3}(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)$/,
    ipv6: /^((([0-9a-f]{1,4}:){7}([0-9a-f]{1,4}|:))|(([0-9a-f]{1,4}:){6}(:[0-9a-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9a-f]{1,4}:){5}(((:[0-9a-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9a-f]{1,4}:){4}(((:[0-9a-f]{1,4}){1,3})|((:[0-9a-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){3}(((:[0-9a-f]{1,4}){1,4})|((:[0-9a-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){2}(((:[0-9a-f]{1,4}){1,5})|((:[0-9a-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){1}(((:[0-9a-f]{1,4}){1,6})|((:[0-9a-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9a-f]{1,4}){1,7})|((:[0-9a-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))$/i,
    regex: K,
    // uuid: http://tools.ietf.org/html/rfc4122
    uuid: /^(?:urn:uuid:)?[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i,
    // JSON-pointer: https://tools.ietf.org/html/rfc6901
    // uri fragment: https://tools.ietf.org/html/rfc3986#appendix-A
    "json-pointer": /^(?:\/(?:[^~/]|~0|~1)*)*$/,
    "json-pointer-uri-fragment": /^#(?:\/(?:[a-z0-9_\-.!$&'()*+,;:=@]|%[0-9a-f]{2}|~0|~1)*)*$/i,
    // relative JSON-pointer: http://tools.ietf.org/html/draft-luff-relative-json-pointer-00
    "relative-json-pointer": /^(?:0|[1-9][0-9]*)(?:#|(?:\/(?:[^~/]|~0|~1)*)*)$/,
    // the following formats are used by the openapi specification: https://spec.openapis.org/oas/v3.0.0#data-types
    // byte: https://github.com/miguelmota/is-base64
    byte: C,
    // signed 32 bit integer
    int32: { type: "number", validate: I },
    // signed 64 bit integer
    int64: { type: "number", validate: L },
    // C-type float
    float: { type: "number", validate: B },
    // C-type double
    double: { type: "number", validate: B },
    // hint to the UI to hide input strings
    password: !0,
    // unchecked string payload
    binary: !0
  }, e.fastFormats = {
    ...e.fullFormats,
    date: t(/^\d\d\d\d-[0-1]\d-[0-3]\d$/, a),
    time: t(/^(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)$/i, f),
    "date-time": t(/^\d\d\d\d-[0-1]\d-[0-3]\dt(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)$/i, h),
    "iso-time": t(/^(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)?$/i, l),
    "iso-date-time": t(/^\d\d\d\d-[0-1]\d-[0-3]\d[t\s](?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)?$/i, y),
    // uri: https://github.com/mafintosh/is-my-json-valid/blob/master/formats.js
    uri: /^(?:[a-z][a-z0-9+\-.]*:)(?:\/?\/)?[^\s]*$/i,
    "uri-reference": /^(?:(?:[a-z][a-z0-9+\-.]*:)?\/?\/)?(?:[^\\\s#][^\s#]*)?(?:#[^\\\s]*)?$/i,
    // email (sources from jsen validator):
    // http://stackoverflow.com/questions/201323/using-a-regular-expression-to-validate-an-email-address#answer-8829363
    // http://www.w3.org/TR/html5/forms.html#valid-e-mail-address (search for 'wilful violation')
    email: /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)*$/i
  }, e.formatNames = Object.keys(e.fullFormats);
  function r(q) {
    return q % 4 === 0 && (q % 100 !== 0 || q % 400 === 0);
  }
  const n = /^(\d\d\d\d)-(\d\d)-(\d\d)$/, i = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  function o(q) {
    const z = n.exec(q);
    if (!z)
      return !1;
    const X = +z[1], k = +z[2], F = +z[3];
    return k >= 1 && k <= 12 && F >= 1 && F <= (k === 2 && r(X) ? 29 : i[k]);
  }
  function a(q, z) {
    if (q && z)
      return q > z ? 1 : q < z ? -1 : 0;
  }
  const s = /^(\d\d):(\d\d):(\d\d(?:\.\d+)?)(z|([+-])(\d\d)(?::?(\d\d))?)?$/i;
  function c(q) {
    return function(X) {
      const k = s.exec(X);
      if (!k)
        return !1;
      const F = +k[1], G = +k[2], x = +k[3], W = k[4], V = k[5] === "-" ? -1 : 1, U = +(k[6] || 0), T = +(k[7] || 0);
      if (U > 23 || T > 59 || q && !W)
        return !1;
      if (F <= 23 && G <= 59 && x < 60)
        return !0;
      const N = G - T * V, A = F - U * V - (N < 0 ? 1 : 0);
      return (A === 23 || A === -1) && (N === 59 || N === -1) && x < 61;
    };
  }
  function f(q, z) {
    if (!(q && z))
      return;
    const X = (/* @__PURE__ */ new Date("2020-01-01T" + q)).valueOf(), k = (/* @__PURE__ */ new Date("2020-01-01T" + z)).valueOf();
    if (X && k)
      return X - k;
  }
  function l(q, z) {
    if (!(q && z))
      return;
    const X = s.exec(q), k = s.exec(z);
    if (X && k)
      return q = X[1] + X[2] + X[3], z = k[1] + k[2] + k[3], q > z ? 1 : q < z ? -1 : 0;
  }
  const u = /t|\s/i;
  function d(q) {
    const z = c(q);
    return function(k) {
      const F = k.split(u);
      return F.length === 2 && o(F[0]) && z(F[1]);
    };
  }
  function h(q, z) {
    if (!(q && z))
      return;
    const X = new Date(q).valueOf(), k = new Date(z).valueOf();
    if (X && k)
      return X - k;
  }
  function y(q, z) {
    if (!(q && z))
      return;
    const [X, k] = q.split(u), [F, G] = z.split(u), x = a(X, F);
    if (x !== void 0)
      return x || f(k, G);
  }
  const g = /\/|:/, $ = /^(?:[a-z][a-z0-9+\-.]*:)(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)(?:\?(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?(?:#(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?$/i;
  function v(q) {
    return g.test(q) && $.test(q);
  }
  const S = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/gm;
  function C(q) {
    return S.lastIndex = 0, S.test(q);
  }
  const R = -2147483648, M = 2 ** 31 - 1;
  function I(q) {
    return Number.isInteger(q) && q <= M && q >= R;
  }
  function L(q) {
    return Number.isInteger(q);
  }
  function B() {
    return !0;
  }
  const w = /[^\\]\\Z/;
  function K(q) {
    if (w.test(q))
      return !1;
    try {
      return new RegExp(q), !0;
    } catch {
      return !1;
    }
  }
})(Cg);
var Ig = {}, Ic = { exports: {} }, gu = {};
Object.defineProperty(gu, "__esModule", { value: !0 });
const QF = rs, ZF = ns, e2 = is, t2 = ss, Dh = on, r2 = [
  QF.default,
  ZF.default,
  (0, e2.default)(),
  t2.default,
  Dh.metadataVocabulary,
  Dh.contentVocabulary
];
gu.default = r2;
const n2 = "http://json-schema.org/draft-07/schema#", i2 = "http://json-schema.org/draft-07/schema#", o2 = "Core schema meta-schema", a2 = {
  schemaArray: {
    type: "array",
    minItems: 1,
    items: {
      $ref: "#"
    }
  },
  nonNegativeInteger: {
    type: "integer",
    minimum: 0
  },
  nonNegativeIntegerDefault0: {
    allOf: [
      {
        $ref: "#/definitions/nonNegativeInteger"
      },
      {
        default: 0
      }
    ]
  },
  simpleTypes: {
    enum: [
      "array",
      "boolean",
      "integer",
      "null",
      "number",
      "object",
      "string"
    ]
  },
  stringArray: {
    type: "array",
    items: {
      type: "string"
    },
    uniqueItems: !0,
    default: []
  }
}, s2 = [
  "object",
  "boolean"
], c2 = {
  $id: {
    type: "string",
    format: "uri-reference"
  },
  $schema: {
    type: "string",
    format: "uri"
  },
  $ref: {
    type: "string",
    format: "uri-reference"
  },
  $comment: {
    type: "string"
  },
  title: {
    type: "string"
  },
  description: {
    type: "string"
  },
  default: !0,
  readOnly: {
    type: "boolean",
    default: !1
  },
  examples: {
    type: "array",
    items: !0
  },
  multipleOf: {
    type: "number",
    exclusiveMinimum: 0
  },
  maximum: {
    type: "number"
  },
  exclusiveMaximum: {
    type: "number"
  },
  minimum: {
    type: "number"
  },
  exclusiveMinimum: {
    type: "number"
  },
  maxLength: {
    $ref: "#/definitions/nonNegativeInteger"
  },
  minLength: {
    $ref: "#/definitions/nonNegativeIntegerDefault0"
  },
  pattern: {
    type: "string",
    format: "regex"
  },
  additionalItems: {
    $ref: "#"
  },
  items: {
    anyOf: [
      {
        $ref: "#"
      },
      {
        $ref: "#/definitions/schemaArray"
      }
    ],
    default: !0
  },
  maxItems: {
    $ref: "#/definitions/nonNegativeInteger"
  },
  minItems: {
    $ref: "#/definitions/nonNegativeIntegerDefault0"
  },
  uniqueItems: {
    type: "boolean",
    default: !1
  },
  contains: {
    $ref: "#"
  },
  maxProperties: {
    $ref: "#/definitions/nonNegativeInteger"
  },
  minProperties: {
    $ref: "#/definitions/nonNegativeIntegerDefault0"
  },
  required: {
    $ref: "#/definitions/stringArray"
  },
  additionalProperties: {
    $ref: "#"
  },
  definitions: {
    type: "object",
    additionalProperties: {
      $ref: "#"
    },
    default: {}
  },
  properties: {
    type: "object",
    additionalProperties: {
      $ref: "#"
    },
    default: {}
  },
  patternProperties: {
    type: "object",
    additionalProperties: {
      $ref: "#"
    },
    propertyNames: {
      format: "regex"
    },
    default: {}
  },
  dependencies: {
    type: "object",
    additionalProperties: {
      anyOf: [
        {
          $ref: "#"
        },
        {
          $ref: "#/definitions/stringArray"
        }
      ]
    }
  },
  propertyNames: {
    $ref: "#"
  },
  const: !0,
  enum: {
    type: "array",
    items: !0,
    minItems: 1,
    uniqueItems: !0
  },
  type: {
    anyOf: [
      {
        $ref: "#/definitions/simpleTypes"
      },
      {
        type: "array",
        items: {
          $ref: "#/definitions/simpleTypes"
        },
        minItems: 1,
        uniqueItems: !0
      }
    ]
  },
  format: {
    type: "string"
  },
  contentMediaType: {
    type: "string"
  },
  contentEncoding: {
    type: "string"
  },
  if: {
    $ref: "#"
  },
  then: {
    $ref: "#"
  },
  else: {
    $ref: "#"
  },
  allOf: {
    $ref: "#/definitions/schemaArray"
  },
  anyOf: {
    $ref: "#/definitions/schemaArray"
  },
  oneOf: {
    $ref: "#/definitions/schemaArray"
  },
  not: {
    $ref: "#"
  }
}, l2 = {
  $schema: n2,
  $id: i2,
  title: o2,
  definitions: a2,
  type: s2,
  properties: c2,
  default: !0
};
(function(e, t) {
  Object.defineProperty(t, "__esModule", { value: !0 }), t.MissingRefError = t.ValidationError = t.CodeGen = t.Name = t.nil = t.stringify = t.str = t._ = t.KeywordCxt = t.Ajv = void 0;
  const r = $l, n = gu, i = cs, o = l2, a = ["/properties"], s = "http://json-schema.org/draft-07/schema";
  class c extends r.default {
    _addVocabularies() {
      super._addVocabularies(), n.default.forEach((y) => this.addVocabulary(y)), this.opts.discriminator && this.addKeyword(i.default);
    }
    _addDefaultMetaSchema() {
      if (super._addDefaultMetaSchema(), !this.opts.meta)
        return;
      const y = this.opts.$data ? this.$dataMetaSchema(o, a) : o;
      this.addMetaSchema(y, s, !1), this.refs["http://json-schema.org/schema"] = s;
    }
    defaultMeta() {
      return this.opts.defaultMeta = super.defaultMeta() || (this.getSchema(s) ? s : void 0);
    }
  }
  t.Ajv = c, e.exports = t = c, e.exports.Ajv = c, Object.defineProperty(t, "__esModule", { value: !0 }), t.default = c;
  var f = $t;
  Object.defineProperty(t, "KeywordCxt", { enumerable: !0, get: function() {
    return f.KeywordCxt;
  } });
  var l = re;
  Object.defineProperty(t, "_", { enumerable: !0, get: function() {
    return l._;
  } }), Object.defineProperty(t, "str", { enumerable: !0, get: function() {
    return l.str;
  } }), Object.defineProperty(t, "stringify", { enumerable: !0, get: function() {
    return l.stringify;
  } }), Object.defineProperty(t, "nil", { enumerable: !0, get: function() {
    return l.nil;
  } }), Object.defineProperty(t, "Name", { enumerable: !0, get: function() {
    return l.Name;
  } }), Object.defineProperty(t, "CodeGen", { enumerable: !0, get: function() {
    return l.CodeGen;
  } });
  var u = Xn;
  Object.defineProperty(t, "ValidationError", { enumerable: !0, get: function() {
    return u.default;
  } });
  var d = un;
  Object.defineProperty(t, "MissingRefError", { enumerable: !0, get: function() {
    return d.default;
  } });
})(Ic, Ic.exports);
var u2 = Ic.exports;
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.formatLimitDefinition = void 0;
  const t = u2, r = re, n = r.operators, i = {
    formatMaximum: { okStr: "<=", ok: n.LTE, fail: n.GT },
    formatMinimum: { okStr: ">=", ok: n.GTE, fail: n.LT },
    formatExclusiveMaximum: { okStr: "<", ok: n.LT, fail: n.GTE },
    formatExclusiveMinimum: { okStr: ">", ok: n.GT, fail: n.LTE }
  }, o = {
    message: ({ keyword: s, schemaCode: c }) => (0, r.str)`should be ${i[s].okStr} ${c}`,
    params: ({ keyword: s, schemaCode: c }) => (0, r._)`{comparison: ${i[s].okStr}, limit: ${c}}`
  };
  e.formatLimitDefinition = {
    keyword: Object.keys(i),
    type: "string",
    schemaType: "string",
    $data: !0,
    error: o,
    code(s) {
      const { gen: c, data: f, schemaCode: l, keyword: u, it: d } = s, { opts: h, self: y } = d;
      if (!h.validateFormats)
        return;
      const g = new t.KeywordCxt(d, y.RULES.all.format.definition, "format");
      g.$data ? $() : v();
      function $() {
        const C = c.scopeValue("formats", {
          ref: y.formats,
          code: h.code.formats
        }), R = c.const("fmt", (0, r._)`${C}[${g.schemaCode}]`);
        s.fail$data((0, r.or)((0, r._)`typeof ${R} != "object"`, (0, r._)`${R} instanceof RegExp`, (0, r._)`typeof ${R}.compare != "function"`, S(R)));
      }
      function v() {
        const C = g.schema, R = y.formats[C];
        if (!R || R === !0)
          return;
        if (typeof R != "object" || R instanceof RegExp || typeof R.compare != "function")
          throw new Error(`"${u}": format "${C}" does not define "compare" function`);
        const M = c.scopeValue("formats", {
          key: C,
          ref: R,
          code: h.code.formats ? (0, r._)`${h.code.formats}${(0, r.getProperty)(C)}` : void 0
        });
        s.fail$data(S(M));
      }
      function S(C) {
        return (0, r._)`${C}.compare(${f}, ${l}) ${i[u].fail} 0`;
      }
    },
    dependencies: ["format"]
  };
  const a = (s) => (s.addKeyword(e.formatLimitDefinition), s);
  e.default = a;
})(Ig);
(function(e, t) {
  Object.defineProperty(t, "__esModule", { value: !0 });
  const r = Cg, n = Ig, i = re, o = new i.Name("fullFormats"), a = new i.Name("fastFormats"), s = (f, l = { keywords: !0 }) => {
    if (Array.isArray(l))
      return c(f, l, r.fullFormats, o), f;
    const [u, d] = l.mode === "fast" ? [r.fastFormats, a] : [r.fullFormats, o], h = l.formats || r.formatNames;
    return c(f, h, u, d), l.keywords && (0, n.default)(f), f;
  };
  s.get = (f, l = "full") => {
    const d = (l === "fast" ? r.fastFormats : r.fullFormats)[f];
    if (!d)
      throw new Error(`Unknown format "${f}"`);
    return d;
  };
  function c(f, l, u, d) {
    var h, y;
    (h = (y = f.opts.code).formats) !== null && h !== void 0 || (y.formats = (0, i._)`require("ajv-formats/dist/formats").${d}`);
    for (const g of l)
      f.addFormat(g, u[g]);
  }
  e.exports = t = s, Object.defineProperty(t, "__esModule", { value: !0 }), t.default = s;
})(Cc, Cc.exports);
var f2 = Cc.exports;
const d2 = /* @__PURE__ */ Ta(f2), h2 = (e, t, r, n) => {
  if (r === "length" || r === "prototype" || r === "arguments" || r === "caller")
    return;
  const i = Object.getOwnPropertyDescriptor(e, r), o = Object.getOwnPropertyDescriptor(t, r);
  !p2(i, o) && n || Object.defineProperty(e, r, o);
}, p2 = function(e, t) {
  return e === void 0 || e.configurable || e.writable === t.writable && e.enumerable === t.enumerable && e.configurable === t.configurable && (e.writable || e.value === t.value);
}, m2 = (e, t) => {
  const r = Object.getPrototypeOf(t);
  r !== Object.getPrototypeOf(e) && Object.setPrototypeOf(e, r);
}, y2 = (e, t) => `/* Wrapped ${e}*/
${t}`, g2 = Object.getOwnPropertyDescriptor(Function.prototype, "toString"), v2 = Object.getOwnPropertyDescriptor(Function.prototype.toString, "name"), $2 = (e, t, r) => {
  const n = r === "" ? "" : `with ${r.trim()}() `, i = y2.bind(null, n, t.toString());
  Object.defineProperty(i, "name", v2);
  const { writable: o, enumerable: a, configurable: s } = g2;
  Object.defineProperty(e, "toString", { value: i, writable: o, enumerable: a, configurable: s });
};
function _2(e, t, { ignoreNonConfigurable: r = !1 } = {}) {
  const { name: n } = e;
  for (const i of Reflect.ownKeys(t))
    h2(e, t, i, r);
  return m2(e, t), $2(e, t, n), e;
}
const kh = (e, t = {}) => {
  if (typeof e != "function")
    throw new TypeError(`Expected the first argument to be a function, got \`${typeof e}\``);
  const {
    wait: r = 0,
    maxWait: n = Number.POSITIVE_INFINITY,
    before: i = !1,
    after: o = !0
  } = t;
  if (r < 0 || n < 0)
    throw new RangeError("`wait` and `maxWait` must not be negative.");
  if (!i && !o)
    throw new Error("Both `before` and `after` are false, function wouldn't be called.");
  let a, s, c;
  const f = function(...l) {
    const u = this, d = () => {
      a = void 0, s && (clearTimeout(s), s = void 0), o && (c = e.apply(u, l));
    }, h = () => {
      s = void 0, a && (clearTimeout(a), a = void 0), o && (c = e.apply(u, l));
    }, y = i && !a;
    return clearTimeout(a), a = setTimeout(d, r), n > 0 && n !== Number.POSITIVE_INFINITY && !s && (s = setTimeout(h, n)), y && (c = e.apply(u, l)), c;
  };
  return _2(f, e), f.cancel = () => {
    a && (clearTimeout(a), a = void 0), s && (clearTimeout(s), s = void 0);
  }, f;
}, w2 = Object.prototype.toString, E2 = "[object Uint8Array]", S2 = "[object ArrayBuffer]";
function Rg(e, t, r) {
  return e ? e.constructor === t ? !0 : w2.call(e) === r : !1;
}
function Ng(e) {
  return Rg(e, Uint8Array, E2);
}
function b2(e) {
  return Rg(e, ArrayBuffer, S2);
}
function P2(e) {
  return Ng(e) || b2(e);
}
function T2(e) {
  if (!Ng(e))
    throw new TypeError(`Expected \`Uint8Array\`, got \`${typeof e}\``);
}
function A2(e) {
  if (!P2(e))
    throw new TypeError(`Expected \`Uint8Array\` or \`ArrayBuffer\`, got \`${typeof e}\``);
}
function Fh(e, t) {
  if (e.length === 0)
    return new Uint8Array(0);
  t ?? (t = e.reduce((i, o) => i + o.length, 0));
  const r = new Uint8Array(t);
  let n = 0;
  for (const i of e)
    T2(i), r.set(i, n), n += i.length;
  return r;
}
const Wo = {
  utf8: new globalThis.TextDecoder("utf8")
};
function Lh(e, t = "utf8") {
  return A2(e), Wo[t] ?? (Wo[t] = new globalThis.TextDecoder(t)), Wo[t].decode(e);
}
function O2(e) {
  if (typeof e != "string")
    throw new TypeError(`Expected \`string\`, got \`${typeof e}\``);
}
const C2 = new globalThis.TextEncoder();
function tc(e) {
  return O2(e), C2.encode(e);
}
Array.from({ length: 256 }, (e, t) => t.toString(16).padStart(2, "0"));
const I2 = d2.default, xh = "aes-256-cbc", wn = () => /* @__PURE__ */ Object.create(null), R2 = (e) => e != null, N2 = (e, t) => {
  const r = /* @__PURE__ */ new Set([
    "undefined",
    "symbol",
    "function"
  ]), n = typeof t;
  if (r.has(n))
    throw new TypeError(`Setting a value of type \`${n}\` for key \`${e}\` is not allowed as it's not supported by JSON`);
}, na = "__internal__", rc = `${na}.migrations.version`;
var vr, Vt, dt, zt;
class D2 {
  constructor(t = {}) {
    li(this, "path");
    li(this, "events");
    ui(this, vr);
    ui(this, Vt);
    ui(this, dt);
    ui(this, zt, {});
    li(this, "_deserialize", (t) => JSON.parse(t));
    li(this, "_serialize", (t) => JSON.stringify(t, void 0, "	"));
    const r = {
      configName: "config",
      fileExtension: "json",
      projectSuffix: "nodejs",
      clearInvalidConfig: !1,
      accessPropertiesByDotNotation: !0,
      configFileMode: 438,
      ...t
    };
    if (!r.cwd) {
      if (!r.projectName)
        throw new Error("Please specify the `projectName` option.");
      r.cwd = GO(r.projectName, { suffix: r.projectSuffix }).config;
    }
    if (fi(this, dt, r), r.schema ?? r.ajvOptions ?? r.rootSchema) {
      if (r.schema && typeof r.schema != "object")
        throw new TypeError("The `schema` option must be an object.");
      const a = new JF.Ajv2020({
        allErrors: !0,
        useDefaults: !0,
        ...r.ajvOptions
      });
      I2(a);
      const s = {
        ...r.rootSchema,
        type: "object",
        properties: r.schema
      };
      fi(this, vr, a.compile(s));
      for (const [c, f] of Object.entries(r.schema ?? {}))
        f != null && f.default && (ve(this, zt)[c] = f.default);
    }
    r.defaults && fi(this, zt, {
      ...ve(this, zt),
      ...r.defaults
    }), r.serialize && (this._serialize = r.serialize), r.deserialize && (this._deserialize = r.deserialize), this.events = new EventTarget(), fi(this, Vt, r.encryptionKey);
    const n = r.fileExtension ? `.${r.fileExtension}` : "";
    this.path = se.resolve(r.cwd, `${r.configName ?? "config"}${n}`);
    const i = this.store, o = Object.assign(wn(), r.defaults, i);
    if (r.migrations) {
      if (!r.projectVersion)
        throw new Error("Please specify the `projectVersion` option.");
      this._migrate(r.migrations, r.projectVersion, r.beforeEachMigration);
    }
    this._validate(o);
    try {
      tv.deepEqual(i, o);
    } catch {
      this.store = o;
    }
    r.watch && this._watch();
  }
  get(t, r) {
    if (ve(this, dt).accessPropertiesByDotNotation)
      return this._get(t, r);
    const { store: n } = this;
    return t in n ? n[t] : r;
  }
  set(t, r) {
    if (typeof t != "string" && typeof t != "object")
      throw new TypeError(`Expected \`key\` to be of type \`string\` or \`object\`, got ${typeof t}`);
    if (typeof t != "object" && r === void 0)
      throw new TypeError("Use `delete()` to clear values");
    if (this._containsReservedKey(t))
      throw new TypeError(`Please don't use the ${na} key, as it's used to manage this module internal operations.`);
    const { store: n } = this, i = (o, a) => {
      N2(o, a), ve(this, dt).accessPropertiesByDotNotation ? Jd(n, o, a) : n[o] = a;
    };
    if (typeof t == "object") {
      const o = t;
      for (const [a, s] of Object.entries(o))
        i(a, s);
    } else
      i(t, r);
    this.store = n;
  }
  /**
      Check if an item exists.
  
      @param key - The key of the item to check.
      */
  has(t) {
    return ve(this, dt).accessPropertiesByDotNotation ? MO(this.store, t) : t in this.store;
  }
  /**
      Reset items to their default values, as defined by the `defaults` or `schema` option.
  
      @see `clear()` to reset all items.
  
      @param keys - The keys of the items to reset.
      */
  reset(...t) {
    for (const r of t)
      R2(ve(this, zt)[r]) && this.set(r, ve(this, zt)[r]);
  }
  delete(t) {
    const { store: r } = this;
    ve(this, dt).accessPropertiesByDotNotation ? jO(r, t) : delete r[t], this.store = r;
  }
  /**
      Delete all items.
  
      This resets known items to their default values, if defined by the `defaults` or `schema` option.
      */
  clear() {
    this.store = wn();
    for (const t of Object.keys(ve(this, zt)))
      this.reset(t);
  }
  /**
      Watches the given `key`, calling `callback` on any changes.
  
      @param key - The key to watch.
      @param callback - A callback function that is called on any changes. When a `key` is first set `oldValue` will be `undefined`, and when a key is deleted `newValue` will be `undefined`.
      @returns A function, that when called, will unsubscribe.
      */
  onDidChange(t, r) {
    if (typeof t != "string")
      throw new TypeError(`Expected \`key\` to be of type \`string\`, got ${typeof t}`);
    if (typeof r != "function")
      throw new TypeError(`Expected \`callback\` to be of type \`function\`, got ${typeof r}`);
    return this._handleChange(() => this.get(t), r);
  }
  /**
      Watches the whole config object, calling `callback` on any changes.
  
      @param callback - A callback function that is called on any changes. When a `key` is first set `oldValue` will be `undefined`, and when a key is deleted `newValue` will be `undefined`.
      @returns A function, that when called, will unsubscribe.
      */
  onDidAnyChange(t) {
    if (typeof t != "function")
      throw new TypeError(`Expected \`callback\` to be of type \`function\`, got ${typeof t}`);
    return this._handleChange(() => this.store, t);
  }
  get size() {
    return Object.keys(this.store).length;
  }
  get store() {
    try {
      const t = oe.readFileSync(this.path, ve(this, Vt) ? null : "utf8"), r = this._encryptData(t), n = this._deserialize(r);
      return this._validate(n), Object.assign(wn(), n);
    } catch (t) {
      if ((t == null ? void 0 : t.code) === "ENOENT")
        return this._ensureDirectory(), wn();
      if (ve(this, dt).clearInvalidConfig && t.name === "SyntaxError")
        return wn();
      throw t;
    }
  }
  set store(t) {
    this._ensureDirectory(), this._validate(t), this._write(t), this.events.dispatchEvent(new Event("change"));
  }
  *[Symbol.iterator]() {
    for (const [t, r] of Object.entries(this.store))
      yield [t, r];
  }
  _encryptData(t) {
    if (!ve(this, Vt))
      return typeof t == "string" ? t : Lh(t);
    try {
      const r = t.slice(0, 16), n = di.pbkdf2Sync(ve(this, Vt), r.toString(), 1e4, 32, "sha512"), i = di.createDecipheriv(xh, n, r), o = t.slice(17), a = typeof o == "string" ? tc(o) : o;
      return Lh(Fh([i.update(a), i.final()]));
    } catch {
    }
    return t.toString();
  }
  _handleChange(t, r) {
    let n = t();
    const i = () => {
      const o = n, a = t();
      ev(a, o) || (n = a, r.call(this, a, o));
    };
    return this.events.addEventListener("change", i), () => {
      this.events.removeEventListener("change", i);
    };
  }
  _validate(t) {
    if (!ve(this, vr) || ve(this, vr).call(this, t) || !ve(this, vr).errors)
      return;
    const n = ve(this, vr).errors.map(({ instancePath: i, message: o = "" }) => `\`${i.slice(1)}\` ${o}`);
    throw new Error("Config schema violation: " + n.join("; "));
  }
  _ensureDirectory() {
    oe.mkdirSync(se.dirname(this.path), { recursive: !0 });
  }
  _write(t) {
    let r = this._serialize(t);
    if (ve(this, Vt)) {
      const n = di.randomBytes(16), i = di.pbkdf2Sync(ve(this, Vt), n.toString(), 1e4, 32, "sha512"), o = di.createCipheriv(xh, i, n);
      r = Fh([n, tc(":"), o.update(tc(r)), o.final()]);
    }
    if (Ie.env.SNAP)
      oe.writeFileSync(this.path, r, { mode: ve(this, dt).configFileMode });
    else
      try {
        Ny(this.path, r, { mode: ve(this, dt).configFileMode });
      } catch (n) {
        if ((n == null ? void 0 : n.code) === "EXDEV") {
          oe.writeFileSync(this.path, r, { mode: ve(this, dt).configFileMode });
          return;
        }
        throw n;
      }
  }
  _watch() {
    this._ensureDirectory(), oe.existsSync(this.path) || this._write(wn()), Ie.platform === "win32" ? oe.watch(this.path, { persistent: !1 }, kh(() => {
      this.events.dispatchEvent(new Event("change"));
    }, { wait: 100 })) : oe.watchFile(this.path, { persistent: !1 }, kh(() => {
      this.events.dispatchEvent(new Event("change"));
    }, { wait: 5e3 }));
  }
  _migrate(t, r, n) {
    let i = this._get(rc, "0.0.0");
    const o = Object.keys(t).filter((s) => this._shouldPerformMigration(s, i, r));
    let a = { ...this.store };
    for (const s of o)
      try {
        n && n(this, {
          fromVersion: i,
          toVersion: s,
          finalVersion: r,
          versions: o
        });
        const c = t[s];
        c == null || c(this), this._set(rc, s), i = s, a = { ...this.store };
      } catch (c) {
        throw this.store = a, new Error(`Something went wrong during the migration! Changes applied to the store until this failed migration will be restored. ${c}`);
      }
    (this._isVersionInRangeFormat(i) || !yn.eq(i, r)) && this._set(rc, r);
  }
  _containsReservedKey(t) {
    return typeof t == "object" && Object.keys(t)[0] === na ? !0 : typeof t != "string" ? !1 : ve(this, dt).accessPropertiesByDotNotation ? !!t.startsWith(`${na}.`) : !1;
  }
  _isVersionInRangeFormat(t) {
    return yn.clean(t) === null;
  }
  _shouldPerformMigration(t, r, n) {
    return this._isVersionInRangeFormat(t) ? r !== "0.0.0" && yn.satisfies(r, t) ? !1 : yn.satisfies(n, t) : !(yn.lte(t, r) || yn.gt(t, n));
  }
  _get(t, r) {
    return UO(this.store, t, r);
  }
  _set(t, r) {
    const { store: n } = this;
    Jd(n, t, r), this.store = n;
  }
}
vr = new WeakMap(), Vt = new WeakMap(), dt = new WeakMap(), zt = new WeakMap();
const { app: ia, ipcMain: Rc, shell: k2 } = Xt;
let Uh = !1;
const jh = () => {
  if (!Rc || !ia)
    throw new Error("Electron Store: You need to call `.initRenderer()` from the main process.");
  const e = {
    defaultCwd: ia.getPath("userData"),
    appVersion: ia.getVersion()
  };
  return Uh || (Rc.on("electron-store-get-data", (t) => {
    t.returnValue = e;
  }), Uh = !0), e;
};
class vu extends D2 {
  constructor(t) {
    let r, n;
    if (Ie.type === "renderer") {
      const i = Xt.ipcRenderer.sendSync("electron-store-get-data");
      if (!i)
        throw new Error("Electron Store: You need to call `.initRenderer()` from the main process.");
      ({ defaultCwd: r, appVersion: n } = i);
    } else Rc && ia && ({ defaultCwd: r, appVersion: n } = jh());
    t = {
      name: "config",
      ...t
    }, t.projectVersion || (t.projectVersion = n), t.cwd ? t.cwd = se.isAbsolute(t.cwd) ? t.cwd : se.join(r, t.cwd) : t.cwd = r, t.configName = t.name, delete t.name, super(t);
  }
  static initRenderer() {
    jh();
  }
  async openInEditor() {
    const t = await k2.openPath(this.path);
    if (t)
      throw new Error(t);
  }
}
var $u = Sa, F2 = ce, Rr = ro.spawn, _u = "HKLM", Dg = "HKCU", kg = "HKCR", Fg = "HKU", Lg = "HKCC", xg = [_u, Dg, kg, Fg, Lg], Ug = "REG_SZ", jg = "REG_MULTI_SZ", Mg = "REG_EXPAND_SZ", qg = "REG_DWORD", Hg = "REG_QWORD", Bg = "REG_BINARY", Gg = "REG_NONE", Vg = [Ug, jg, Mg, qg, Hg, Bg, Gg], L2 = "", x2 = /(\\[a-zA-Z0-9_\s]+)*/, U2 = /^(HKEY_LOCAL_MACHINE|HKEY_CURRENT_USER|HKEY_CLASSES_ROOT|HKEY_USERS|HKEY_CURRENT_CONFIG)(.*)$/, zg = /^(.*)\s(REG_SZ|REG_MULTI_SZ|REG_EXPAND_SZ|REG_DWORD|REG_QWORD|REG_BINARY|REG_NONE)\s+([^\s].*)$/;
function In(e, t) {
  if (!(this instanceof In))
    return new In(e, t);
  Error.captureStackTrace(this, In), this.__defineGetter__("name", function() {
    return In.name;
  }), this.__defineGetter__("message", function() {
    return e;
  }), this.__defineGetter__("code", function() {
    return t;
  });
}
$u.inherits(In, Error);
function Nr(e) {
  var t = { stdout: "", stderr: "" };
  return e.stdout.on("data", function(r) {
    t.stdout += r.toString();
  }), e.stderr.on("data", function(r) {
    t.stderr += r.toString();
  }), t;
}
function Dr(e, t, r) {
  var n = r.stdout.trim(), i = r.stderr.trim(), o = $u.format(`%s command exited with code %d:
%s
%s`, e, t, n, i);
  return new In(o, t);
}
function j2(e) {
  if (e == "x64")
    return "64";
  if (e == "x86")
    return "32";
  throw new Error("illegal architecture: " + e + " (use x86 or x64)");
}
function kr(e, t) {
  t && e.push("/reg:" + j2(t));
}
function Fr() {
  return process.platform === "win32" ? F2.join(process.env.windir, "system32", "reg.exe") : "REG";
}
function Zi(e, t, r, n, i, o, a) {
  if (!(this instanceof Zi))
    return new Zi(e, t, r, n, i, o, a);
  var s = e, c = t, f = r, l = n, u = i, d = o, h = a;
  this.__defineGetter__("host", function() {
    return s;
  }), this.__defineGetter__("hive", function() {
    return c;
  }), this.__defineGetter__("key", function() {
    return f;
  }), this.__defineGetter__("name", function() {
    return l;
  }), this.__defineGetter__("type", function() {
    return u;
  }), this.__defineGetter__("value", function() {
    return d;
  }), this.__defineGetter__("arch", function() {
    return h;
  });
}
$u.inherits(Zi, Object);
function ue(e) {
  if (!(this instanceof ue))
    return new ue(e);
  var t = e || {}, r = "" + (t.host || ""), n = "" + (t.hive || _u), i = "" + (t.key || ""), o = t.arch || null;
  if (this.__defineGetter__("host", function() {
    return r;
  }), this.__defineGetter__("hive", function() {
    return n;
  }), this.__defineGetter__("key", function() {
    return i;
  }), this.__defineGetter__("path", function() {
    return '"' + (r.length == 0 ? "" : "\\\\" + r + "\\") + n + i + '"';
  }), this.__defineGetter__("arch", function() {
    return o;
  }), this.__defineGetter__("parent", function() {
    var a = i.lastIndexOf("\\");
    return new ue({
      host: this.host,
      hive: this.hive,
      key: a == -1 ? "" : i.substring(0, a),
      arch: this.arch
    });
  }), xg.indexOf(n) == -1)
    throw new Error("illegal hive specified.");
  if (!x2.test(i))
    throw new Error("illegal key specified.");
  if (o && o != "x64" && o != "x86")
    throw new Error("illegal architecture specified (use x86 or x64)");
}
ue.HKLM = _u;
ue.HKCU = Dg;
ue.HKCR = kg;
ue.HKU = Fg;
ue.HKCC = Lg;
ue.HIVES = xg;
ue.REG_SZ = Ug;
ue.REG_MULTI_SZ = jg;
ue.REG_EXPAND_SZ = Mg;
ue.REG_DWORD = qg;
ue.REG_QWORD = Hg;
ue.REG_BINARY = Bg;
ue.REG_NONE = Gg;
ue.REG_TYPES = Vg;
ue.DEFAULT_VALUE = L2;
ue.prototype.values = function(t) {
  if (typeof t != "function")
    throw new TypeError("must specify a callback");
  var r = ["QUERY", this.path];
  kr(r, this.arch);
  var n = Rr(Fr(), r, {
    cwd: void 0,
    env: process.env,
    shell: !0,
    windowsHide: !0,
    stdio: ["ignore", "pipe", "pipe"]
  }), i = "", o = this, a = null, s = Nr(n);
  return n.on("close", function(c) {
    if (!a)
      if (c !== 0)
        t(Dr("QUERY", c, s), null);
      else {
        for (var f = [], l = [], u = i.split(`
`), d = 0, h = 0, y = u.length; h < y; h++) {
          var g = u[h].trim();
          g.length > 0 && (d != 0 && f.push(g), ++d);
        }
        for (var h = 0, y = f.length; h < y; h++) {
          var $ = zg.exec(f[h]), v, S, C;
          $ && (v = $[1].trim(), S = $[2].trim(), C = $[3], l.push(new Zi(o.host, o.hive, o.key, v, S, C, o.arch)));
        }
        t(null, l);
      }
  }), n.stdout.on("data", function(c) {
    i += c.toString();
  }), n.on("error", function(c) {
    a = c, t(c);
  }), this;
};
ue.prototype.keys = function(t) {
  if (typeof t != "function")
    throw new TypeError("must specify a callback");
  var r = ["QUERY", this.path];
  kr(r, this.arch);
  var n = Rr(Fr(), r, {
    cwd: void 0,
    env: process.env,
    shell: !0,
    windowsHide: !0,
    stdio: ["ignore", "pipe", "pipe"]
  }), i = "", o = this, a = null, s = Nr(n);
  return n.on("close", function(c) {
    a || c !== 0 && t(Dr("QUERY", c, s), null);
  }), n.stdout.on("data", function(c) {
    i += c.toString();
  }), n.stdout.on("end", function() {
    for (var c = [], f = [], l = i.split(`
`), u = 0, d = l.length; u < d; u++) {
      var h = l[u].trim();
      h.length > 0 && c.push(h);
    }
    for (var u = 0, d = c.length; u < d; u++) {
      var y = U2.exec(c[u]), g;
      y && (y[1], g = y[2], g && g !== o.key && f.push(new ue({
        host: o.host,
        hive: o.hive,
        key: g,
        arch: o.arch
      })));
    }
    t(null, f);
  }), n.on("error", function(c) {
    a = c, t(c);
  }), this;
};
ue.prototype.get = function(t, r) {
  if (typeof r != "function")
    throw new TypeError("must specify a callback");
  var n = ["QUERY", this.path];
  t == "" ? n.push("/ve") : n = n.concat(["/v", t]), kr(n, this.arch);
  var i = Rr(Fr(), n, {
    cwd: void 0,
    env: process.env,
    shell: !0,
    windowsHide: !0,
    stdio: ["ignore", "pipe", "pipe"]
  }), o = "", a = this, s = null, c = Nr(i);
  return i.on("close", function(f) {
    if (!s)
      if (f !== 0)
        r(Dr("QUERY", f, c), null);
      else {
        for (var l = [], u = null, d = o.split(`
`), h = 0, y = 0, g = d.length; y < g; y++) {
          var $ = d[y].trim();
          $.length > 0 && (h != 0 && l.push($), ++h);
        }
        var v = l[l.length - 1] || "", S = zg.exec(v), C, R, M;
        S && (C = S[1].trim(), R = S[2].trim(), M = S[3], u = new Zi(a.host, a.hive, a.key, C, R, M, a.arch)), r(null, u);
      }
  }), i.stdout.on("data", function(f) {
    o += f.toString();
  }), i.on("error", function(f) {
    s = f, r(f);
  }), this;
};
ue.prototype.set = function(t, r, n, i) {
  if (typeof i != "function")
    throw new TypeError("must specify a callback");
  if (Vg.indexOf(r) == -1)
    throw Error("illegal type specified.");
  var o = ["ADD", this.path];
  t == "" ? o.push("/ve") : o = o.concat(["/v", t]), o = o.concat(["/t", r, "/d", n, "/f"]), kr(o, this.arch);
  var a = Rr(Fr(), o, {
    cwd: void 0,
    env: process.env,
    shell: !0,
    windowsHide: !0,
    stdio: ["ignore", "pipe", "pipe"]
  }), s = null, c = Nr(a);
  return a.on("close", function(f) {
    s || i(f !== 0 ? Dr("ADD", f, c) : null);
  }), a.stdout.on("data", function(f) {
  }), a.on("error", function(f) {
    s = f, i(f);
  }), this;
};
ue.prototype.remove = function(t, r) {
  if (typeof r != "function")
    throw new TypeError("must specify a callback");
  var n = t ? ["DELETE", this.path, "/f", "/v", t] : ["DELETE", this.path, "/f", "/ve"];
  kr(n, this.arch);
  var i = Rr(Fr(), n, {
    cwd: void 0,
    env: process.env,
    shell: !0,
    windowsHide: !0,
    stdio: ["ignore", "pipe", "pipe"]
  }), o = null, a = Nr(i);
  return i.on("close", function(s) {
    o || (s !== 0 ? r(Dr("DELETE", s, a), null) : r(null));
  }), i.stdout.on("data", function(s) {
  }), i.on("error", function(s) {
    o = s, r(s);
  }), this;
};
ue.prototype.clear = function(t) {
  if (typeof t != "function")
    throw new TypeError("must specify a callback");
  var r = ["DELETE", this.path, "/f", "/va"];
  kr(r, this.arch);
  var n = Rr(Fr(), r, {
    cwd: void 0,
    env: process.env,
    shell: !0,
    windowsHide: !0,
    stdio: ["ignore", "pipe", "pipe"]
  }), i = null, o = Nr(n);
  return n.on("close", function(a) {
    i || (a !== 0 ? t(Dr("DELETE", a, o), null) : t(null));
  }), n.stdout.on("data", function(a) {
  }), n.on("error", function(a) {
    i = a, t(a);
  }), this;
};
ue.prototype.erase = ue.prototype.clear;
ue.prototype.destroy = function(t) {
  if (typeof t != "function")
    throw new TypeError("must specify a callback");
  var r = ["DELETE", this.path, "/f"];
  kr(r, this.arch);
  var n = Rr(Fr(), r, {
    cwd: void 0,
    env: process.env,
    shell: !0,
    windowsHide: !0,
    stdio: ["ignore", "pipe", "pipe"]
  }), i = null, o = Nr(n);
  return n.on("close", function(a) {
    i || (a !== 0 ? t(Dr("DELETE", a, o), null) : t(null));
  }), n.stdout.on("data", function(a) {
  }), n.on("error", function(a) {
    i = a, t(a);
  }), this;
};
ue.prototype.create = function(t) {
  if (typeof t != "function")
    throw new TypeError("must specify a callback");
  var r = ["ADD", this.path, "/f"];
  kr(r, this.arch);
  var n = Rr(Fr(), r, {
    cwd: void 0,
    env: process.env,
    shell: !0,
    windowsHide: !0,
    stdio: ["ignore", "pipe", "pipe"]
  }), i = null, o = Nr(n);
  return n.on("close", function(a) {
    i || (a !== 0 ? t(Dr("ADD", a, o), null) : t(null));
  }), n.stdout.on("data", function(a) {
  }), n.on("error", function(a) {
    i = a, t(a);
  }), this;
};
ue.prototype.keyExists = function(t) {
  return this.values(function(r, n) {
    if (r)
      return r.code == 1 ? t(null, !1) : t(r);
    t(null, !0);
  }), this;
};
ue.prototype.valueExists = function(t, r) {
  return this.get(t, function(n, i) {
    if (n)
      return n.code == 1 ? r(null, !1) : r(n);
    r(null, !0);
  }), this;
};
var M2 = ue;
const Mh = /* @__PURE__ */ Ta(M2), qh = "2.0.7", Ln = {
  version: qh,
  discord: "https://discord.gg/MonSuperServeur",
  serverName: `Server Arma 3 - ${qh}`,
  urlMods: "http://82.29.170.30/modsList",
  serverIp: "127.0.0.1",
  serverPort: 2302,
  serverPassword: "password",
  folderModsName: "@MonSuperMods"
}, hr = new vu({
  name: "userData",
  cwd: "arma3-data",
  fileExtension: "json"
}), Ea = new vu({
  name: "modsListClient",
  cwd: "arma3-data",
  defaults: {
    modsList: []
  },
  fileExtension: "json"
}), Nc = new vu({
  name: "modsListServer",
  cwd: "arma3-data",
  fileExtension: "json"
});
async function q2() {
  return new Promise((e) => {
    new Mh({
      hive: Mh.HKLM,
      key: "\\SOFTWARE\\WOW6432Node\\Bohemia Interactive\\Arma 3"
    }).get("main", (r, n) => {
      e(r || !n ? null : n.value);
    });
  });
}
function H2(e) {
  return Dt.existsSync(`${e}\\${Ln.folderModsName}`);
}
async function B2(e) {
  return await Dt.pathExists(`${e}\\arma3.exe`);
}
function ft(e, t, r, n, i, o, a) {
  e == null || e.webContents.send("main-process-message", {
    message: t,
    success: r,
    error: n,
    data: i,
    fileProgress: o,
    timeRemaining: a
  });
}
function G2(e) {
  e.webContents.on("did-finish-load", async () => {
    let t = hr.get("arma3Path");
    const r = hr.get("firstLaunch");
    if ((!t || t === "null") && (t = await q2(), t && hr.set("arma3Path", t)), t && t !== "null") {
      const n = H2(t);
      ft(
        e,
        n ? "arma3Path-mod-loaded" : "arma3Path-mod-not-loaded",
        void 0,
        n ? void 0 : `Mod ${Ln.folderModsName} non installé`
      ), r && (ft(
        e,
        "firstLaunch-done",
        "Nous vous avons trouvé Arma 3 automatiquement"
      ), hr.set("firstLaunch", !1));
    } else
      hr.set("arma3Path", null), ft(e, "arma3Path-not-loaded");
    V2(e);
  }), Mu.on("locate-arma3", async () => {
    try {
      const t = await Y0.showOpenDialog({
        properties: ["openDirectory"],
        title: "Sélectionner le dossier d'installation d'Arma 3",
        defaultPath: "C:\\Program Files (x86)\\Steam\\steamapps\\common\\Arma 3"
      });
      if (!t.canceled && t.filePaths.length > 0) {
        const r = t.filePaths[0];
        await B2(r) ? (hr.set("arma3Path", r), ft(e, "arma3Path-ready", "Arma 3 trouvé")) : ft(
          e,
          "arma3Path-invalid",
          void 0,
          "Le dossier sélectionné ne contient pas Arma 3"
        );
      }
    } catch (t) {
      console.error("Erreur lors de la sélection du dossier Arma 3:", t), ft(
        e,
        "arma3Path-error",
        void 0,
        t instanceof Error ? t.message : "Erreur inconnue"
      );
    }
  }), Mu.on("download-mods", async () => {
    var r;
    const t = hr.get("arma3Path");
    if (!t) {
      ft(e, "download-error", void 0, "Chemin Arma 3 non trouvé");
      return;
    }
    ft(e, "download-start"), console.log("download-start");
    try {
      const n = `${t}\\${Ln.folderModsName}\\addons`;
      await Dt.ensureDir(n);
      const i = Nc.get("modsList") || [], o = Ea.get("modsList") || [];
      if (!Array.isArray(i))
        throw new Error("La liste des mods serveur est invalide");
      let a = 0, s = 0;
      const c = Date.now();
      let f = 0;
      for (const l of o) {
        if (!(l != null && l.name)) continue;
        if (!i.find(
          (d) => (d == null ? void 0 : d.name) === l.name
        )) {
          const d = `${n}\\${l.name}`;
          await Dt.pathExists(d) && await Dt.remove(d);
        }
      }
      for (const l of i) {
        if (!(l != null && l.name) || !(l != null && l.hash)) continue;
        const u = o.find(
          (d) => (d == null ? void 0 : d.name) === l.name
        );
        (!u || u.hash !== l.hash) && (a += l.size);
      }
      for (const l of i) {
        if (!(l != null && l.name) || !(l != null && l.hash)) continue;
        const u = o.find(
          (d) => (d == null ? void 0 : d.name) === l.name
        );
        if (!u || u.hash !== l.hash)
          try {
            const d = await fetch(`${Ln.urlMods}/${l.name}`);
            if (!d.ok)
              throw new Error(`Erreur HTTP: ${d.status}`);
            const h = parseInt(
              d.headers.get("content-length") || "0"
            );
            let y = 0;
            const g = (r = d.body) == null ? void 0 : r.getReader(), $ = [];
            for (; ; ) {
              const { done: S, value: C } = await (g == null ? void 0 : g.read()) || {
                done: !0,
                value: void 0
              };
              if (S) break;
              $.push(C), y += (C == null ? void 0 : C.length) || 0, s += (C == null ? void 0 : C.length) || 0;
              const R = Math.round(
                y / h * 100
              ), M = (Date.now() - c) / 1e3, I = s / M, L = a - s, B = Math.round(
                L / I
              ), w = Math.floor(B / 60), K = Math.round(B % 60), q = `${w}m ${K}s`, z = Math.round(
                s / a * 100
              );
              Date.now() - f > 1e3 && (ft(
                e,
                "download-progress",
                z.toString(),
                void 0,
                l.name,
                R.toString(),
                q
              ), f = Date.now());
            }
            const v = Buffer.concat($);
            await Dt.writeFile(`${n}\\${l.name}`, v);
          } catch (d) {
            console.error(
              `Erreur lors du téléchargement de ${l.name}:`,
              d
            );
            continue;
          }
      }
      Ea.set("modsList", i), ft(e, "download-complete", "Mods mis à jour avec succès"), ft(e, "arma3Path-mod-loaded", "Jeu prêt à être lancé");
    } catch (n) {
      console.error("Erreur lors du téléchargement des mods:", n), ft(
        e,
        "download-error",
        void 0,
        n instanceof Error ? n.message : "Erreur inconnue"
      );
    }
  });
}
async function V2(e) {
  const t = hr.get("arma3Path");
  if (!t) return !1;
  const r = `${t}\\${Ln.folderModsName}`;
  try {
    await Dt.existsSync(r) || await Dt.mkdir(r);
    const i = await (await fetch(`${Ln.urlMods}/modsList.json`)).json();
    Nc.clear(), Nc.set("modsList", i);
    const o = Ea.get("modsList") || [], a = [], s = [];
    for (const c of i) {
      const f = o.find((l) => l.name === c.name);
      (!f || f.hash !== c.hash) && a.push(c);
    }
    for (const c of o)
      i.find(
        (l) => l.name === c.name
      ) || s.push(c);
    for (const c of s) {
      const f = se.join(r, c.name);
      Dt.existsSync(f) && Dt.unlinkSync(f);
      const l = o.findIndex(
        (u) => u.name === c.name
      );
      l > -1 && o.splice(l, 1);
    }
    return Ea.set("modsList", o), a.length > 0 && ft(
      e,
      "updateMod-needed",
      `Mise à jour nécessaire, ${a.length} mods à mettre à jour`
    ), !0;
  } catch (n) {
    return console.error("Erreur lors de la création du dossier mod:", n), !1;
  }
}
const Wg = se.dirname(Z0(import.meta.url));
process.env.APP_ROOT = se.join(Wg, "..");
const Dc = process.env.VITE_DEV_SERVER_URL, bL = se.join(process.env.APP_ROOT, "dist-electron"), Kg = se.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = Dc ? se.join(process.env.APP_ROOT, "public") : Kg;
let be;
xt.autoUpdater.autoDownload = !0;
xt.autoUpdater.autoInstallOnAppQuit = !0;
xt.autoUpdater.on("update-available", () => {
  be && be.webContents.send("update-available");
});
xt.autoUpdater.on("update-downloaded", () => {
  be && (be.webContents.send("update-ready"), setTimeout(() => {
    xt.autoUpdater.quitAndInstall(!1, !0);
  }, 5e3));
});
xt.autoUpdater.on("error", (e) => {
  be && be.webContents.send("update-error", e.message);
});
xt.autoUpdater.on("checking-for-update", () => {
  be && be.webContents.send("checking-update");
});
xt.autoUpdater.on("update-not-available", () => {
  be && be.webContents.send("update-not-available");
});
xt.autoUpdater.on("download-progress", (e) => {
  be && be.webContents.send("update-progress", {
    percent: e.percent,
    transferred: e.transferred,
    total: e.total,
    bytesPerSecond: e.bytesPerSecond
  });
});
const z2 = Vr.requestSingleInstanceLock();
if (!z2)
  Vr.quit();
else {
  let e = function() {
    be = new qu({
      icon: se.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
      autoHideMenuBar: !0,
      height: 512,
      width: 800,
      frame: !1,
      maximizable: !1,
      minimizable: !1,
      resizable: !1,
      center: !0,
      webPreferences: {
        preload: se.join(Wg, "preload.mjs")
      }
    }), G2(be), xt.autoUpdater.checkForUpdates().catch(console.error), Dc ? (be.loadURL(Dc), be.webContents.openDevTools({
      mode: "detach"
    })) : be.loadFile(se.join(Kg, "index.html"));
  };
  Vr.on("second-instance", () => {
    be && (be.isMinimized() && be.restore(), be.focus());
  }), Vr.on("window-all-closed", () => {
    process.platform !== "darwin" && (Vr.quit(), be = null);
  }), Vr.on("activate", () => {
    qu.getAllWindows().length === 0 && e();
  }), Vr.whenReady().then(() => {
    e();
  });
}
export {
  bL as MAIN_DIST,
  Kg as RENDERER_DIST,
  Dc as VITE_DEV_SERVER_URL
};
