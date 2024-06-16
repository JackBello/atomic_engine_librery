var xi = Object.defineProperty;
var zi = (i, t, e) => t in i ? xi(i, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : i[t] = e;
var f = (i, t, e) => zi(i, typeof t != "symbol" ? t + "" : t, e);
const L = Symbol("MethodExport"), Q = Symbol("MethodExportWorker"), Us = Symbol("MethodReloadEvents"), v = Symbol("MethodDispatchEvent"), Ne = Symbol("MethodDispatchScript"), Qi = Symbol("MethodHasEvent"), js = Symbol("MethodStaticSetApp"), xs = Symbol("MethodGetAllInsideAtomic"), zs = Symbol("MethodSetOptions"), Jt = Symbol("MethodSetRootNode");
class Fe {
  constructor() {
    f(this, "_eventListeners", {});
  }
  getEventListeners(t) {
    return t in this._eventListeners || (this._eventListeners[t] = []), this._eventListeners[t];
  }
  addEventListener(t, e) {
    this.getEventListeners(t).push(e);
  }
  removeEventListener(t, e) {
    this.getEventListeners(t).forEach((s, n) => {
      s === e && Array.isArray(this._eventListeners[t]) && this._eventListeners[t].splice(n, 1);
    });
  }
  hasEventListener(t) {
    return t in this._eventListeners;
  }
  clearListeners() {
    for (const t in this._eventListeners) this._eventListeners[t] = [];
  }
  emitEvent(t, ...e) {
    t in this._eventListeners && this._eventListeners[t].forEach((s) => s(...e));
  }
}
const gs = {
  background: "#eeeeee",
  context: "2d",
  dimension: "2D",
  fps: {
    delay: 1e3,
    velocity: 60
  },
  game: {
    background: "#000000",
    full_screen: !1,
    full_size: !1,
    x: 0,
    y: 0,
    icon: null,
    center: !0,
    title: void 0,
    resizable: !1,
    viewport: {
      height: 600,
      width: 800
    }
  },
  height: 500,
  width: 500,
  selector: "[data-canvas]",
  export: {
    exclude: [],
    format: "JSON",
    include: []
  }
}, Ut = Symbol.for("yaml.alias"), Wt = Symbol.for("yaml.document"), pe = Symbol.for("yaml.map"), Qs = Symbol.for("yaml.pair"), de = Symbol.for("yaml.scalar"), Oe = Symbol.for("yaml.seq"), ie = Symbol.for("yaml.node.type"), He = (i) => !!i && typeof i == "object" && i[ie] === Ut, mt = (i) => !!i && typeof i == "object" && i[ie] === Wt, qe = (i) => !!i && typeof i == "object" && i[ie] === pe, O = (i) => !!i && typeof i == "object" && i[ie] === Qs, N = (i) => !!i && typeof i == "object" && i[ie] === de, et = (i) => !!i && typeof i == "object" && i[ie] === Oe;
function R(i) {
  if (i && typeof i == "object")
    switch (i[ie]) {
      case pe:
      case Oe:
        return !0;
    }
  return !1;
}
function H(i) {
  if (i && typeof i == "object")
    switch (i[ie]) {
      case Ut:
      case pe:
      case de:
      case Oe:
        return !0;
    }
  return !1;
}
const qi = (i) => (N(i) || R(i)) && !!i.anchor, me = Symbol("break visit"), en = Symbol("skip children"), Je = Symbol("remove node");
function Se(i, t) {
  const e = tn(t);
  mt(i) ? Ze(null, i.contents, e, Object.freeze([i])) === Je && (i.contents = null) : Ze(null, i, e, Object.freeze([]));
}
Se.BREAK = me;
Se.SKIP = en;
Se.REMOVE = Je;
function Ze(i, t, e, s) {
  const n = sn(i, t, e, s);
  if (H(n) || O(n))
    return nn(i, s, n), Ze(i, n, e, s);
  if (typeof n != "symbol") {
    if (R(t)) {
      s = Object.freeze(s.concat(t));
      for (let r = 0; r < t.items.length; ++r) {
        const o = Ze(r, t.items[r], e, s);
        if (typeof o == "number")
          r = o - 1;
        else {
          if (o === me)
            return me;
          o === Je && (t.items.splice(r, 1), r -= 1);
        }
      }
    } else if (O(t)) {
      s = Object.freeze(s.concat(t));
      const r = Ze("key", t.key, e, s);
      if (r === me)
        return me;
      r === Je && (t.key = null);
      const o = Ze("value", t.value, e, s);
      if (o === me)
        return me;
      o === Je && (t.value = null);
    }
  }
  return n;
}
function tn(i) {
  return typeof i == "object" && (i.Collection || i.Node || i.Value) ? Object.assign({
    Alias: i.Node,
    Map: i.Node,
    Scalar: i.Node,
    Seq: i.Node
  }, i.Value && {
    Map: i.Value,
    Scalar: i.Value,
    Seq: i.Value
  }, i.Collection && {
    Map: i.Collection,
    Seq: i.Collection
  }, i) : i;
}
function sn(i, t, e, s) {
  var n, r, o, u, a;
  if (typeof e == "function")
    return e(i, t, s);
  if (qe(t))
    return (n = e.Map) == null ? void 0 : n.call(e, i, t, s);
  if (et(t))
    return (r = e.Seq) == null ? void 0 : r.call(e, i, t, s);
  if (O(t))
    return (o = e.Pair) == null ? void 0 : o.call(e, i, t, s);
  if (N(t))
    return (u = e.Scalar) == null ? void 0 : u.call(e, i, t, s);
  if (He(t))
    return (a = e.Alias) == null ? void 0 : a.call(e, i, t, s);
}
function nn(i, t, e) {
  const s = t[t.length - 1];
  if (R(s))
    s.items[i] = e;
  else if (O(s))
    i === "key" ? s.key = e : s.value = e;
  else if (mt(s))
    s.contents = e;
  else {
    const n = He(s) ? "alias" : "scalar";
    throw new Error(`Cannot replace node with ${n} parent`);
  }
}
const rn = {
  "!": "%21",
  ",": "%2C",
  "[": "%5B",
  "]": "%5D",
  "{": "%7B",
  "}": "%7D"
}, on = (i) => i.replace(/[!,[\]{}]/g, (t) => rn[t]);
class $ {
  constructor(t, e) {
    this.docStart = null, this.docEnd = !1, this.yaml = Object.assign({}, $.defaultYaml, t), this.tags = Object.assign({}, $.defaultTags, e);
  }
  clone() {
    const t = new $(this.yaml, this.tags);
    return t.docStart = this.docStart, t;
  }
  /**
   * During parsing, get a Directives instance for the current document and
   * update the stream state according to the current version's spec.
   */
  atDocument() {
    const t = new $(this.yaml, this.tags);
    switch (this.yaml.version) {
      case "1.1":
        this.atNextDocument = !0;
        break;
      case "1.2":
        this.atNextDocument = !1, this.yaml = {
          explicit: $.defaultYaml.explicit,
          version: "1.2"
        }, this.tags = Object.assign({}, $.defaultTags);
        break;
    }
    return t;
  }
  /**
   * @param onError - May be called even if the action was successful
   * @returns `true` on success
   */
  add(t, e) {
    this.atNextDocument && (this.yaml = { explicit: $.defaultYaml.explicit, version: "1.1" }, this.tags = Object.assign({}, $.defaultTags), this.atNextDocument = !1);
    const s = t.trim().split(/[ \t]+/), n = s.shift();
    switch (n) {
      case "%TAG": {
        if (s.length !== 2 && (e(0, "%TAG directive should contain exactly two parts"), s.length < 2))
          return !1;
        const [r, o] = s;
        return this.tags[r] = o, !0;
      }
      case "%YAML": {
        if (this.yaml.explicit = !0, s.length !== 1)
          return e(0, "%YAML directive should contain exactly one part"), !1;
        const [r] = s;
        if (r === "1.1" || r === "1.2")
          return this.yaml.version = r, !0;
        {
          const o = /^\d+\.\d+$/.test(r);
          return e(6, `Unsupported YAML version ${r}`, o), !1;
        }
      }
      default:
        return e(0, `Unknown directive ${n}`, !0), !1;
    }
  }
  /**
   * Resolves a tag, matching handles to those defined in %TAG directives.
   *
   * @returns Resolved tag, which may also be the non-specific tag `'!'` or a
   *   `'!local'` tag, or `null` if unresolvable.
   */
  tagName(t, e) {
    if (t === "!")
      return "!";
    if (t[0] !== "!")
      return e(`Not a valid tag: ${t}`), null;
    if (t[1] === "<") {
      const o = t.slice(2, -1);
      return o === "!" || o === "!!" ? (e(`Verbatim tags aren't resolved, so ${t} is invalid.`), null) : (t[t.length - 1] !== ">" && e("Verbatim tags must end with a >"), o);
    }
    const [, s, n] = t.match(/^(.*!)([^!]*)$/s);
    n || e(`The ${t} tag has no suffix`);
    const r = this.tags[s];
    if (r)
      try {
        return r + decodeURIComponent(n);
      } catch (o) {
        return e(String(o)), null;
      }
    return s === "!" ? t : (e(`Could not resolve tag: ${t}`), null);
  }
  /**
   * Given a fully resolved tag, returns its printable string form,
   * taking into account current tag prefixes and defaults.
   */
  tagString(t) {
    for (const [e, s] of Object.entries(this.tags))
      if (t.startsWith(s))
        return e + on(t.substring(s.length));
    return t[0] === "!" ? t : `!<${t}>`;
  }
  toString(t) {
    const e = this.yaml.explicit ? [`%YAML ${this.yaml.version || "1.2"}`] : [], s = Object.entries(this.tags);
    let n;
    if (t && s.length > 0 && H(t.contents)) {
      const r = {};
      Se(t.contents, (o, u) => {
        H(u) && u.tag && (r[u.tag] = !0);
      }), n = Object.keys(r);
    } else
      n = [];
    for (const [r, o] of s)
      r === "!!" && o === "tag:yaml.org,2002:" || (!t || n.some((u) => u.startsWith(o))) && e.push(`%TAG ${r} ${o}`);
    return e.join(`
`);
  }
}
$.defaultYaml = { explicit: !1, version: "1.2" };
$.defaultTags = { "!!": "tag:yaml.org,2002:" };
function qs(i) {
  if (/[\x00-\x19\s,[\]{}]/.test(i)) {
    const e = `Anchor must not contain whitespace or control characters: ${JSON.stringify(i)}`;
    throw new Error(e);
  }
  return !0;
}
function ei(i) {
  const t = /* @__PURE__ */ new Set();
  return Se(i, {
    Value(e, s) {
      s.anchor && t.add(s.anchor);
    }
  }), t;
}
function ti(i, t) {
  for (let e = 1; ; ++e) {
    const s = `${i}${e}`;
    if (!t.has(s))
      return s;
  }
}
function un(i, t) {
  const e = [], s = /* @__PURE__ */ new Map();
  let n = null;
  return {
    onAnchor: (r) => {
      e.push(r), n || (n = ei(i));
      const o = ti(t, n);
      return n.add(o), o;
    },
    /**
     * With circular references, the source node is only resolved after all
     * of its child nodes are. This is why anchors are set only after all of
     * the nodes have been created.
     */
    setAnchors: () => {
      for (const r of e) {
        const o = s.get(r);
        if (typeof o == "object" && o.anchor && (N(o.node) || R(o.node)))
          o.node.anchor = o.anchor;
        else {
          const u = new Error("Failed to resolve repeated object (this should not happen)");
          throw u.source = r, u;
        }
      }
    },
    sourceObjects: s
  };
}
function _e(i, t, e, s) {
  if (s && typeof s == "object")
    if (Array.isArray(s))
      for (let n = 0, r = s.length; n < r; ++n) {
        const o = s[n], u = _e(i, s, String(n), o);
        u === void 0 ? delete s[n] : u !== o && (s[n] = u);
      }
    else if (s instanceof Map)
      for (const n of Array.from(s.keys())) {
        const r = s.get(n), o = _e(i, s, n, r);
        o === void 0 ? s.delete(n) : o !== r && s.set(n, o);
      }
    else if (s instanceof Set)
      for (const n of Array.from(s)) {
        const r = _e(i, s, n, n);
        r === void 0 ? s.delete(n) : r !== n && (s.delete(n), s.add(r));
      }
    else
      for (const [n, r] of Object.entries(s)) {
        const o = _e(i, s, n, r);
        o === void 0 ? delete s[n] : o !== r && (s[n] = o);
      }
  return i.call(t, e, s);
}
function se(i, t, e) {
  if (Array.isArray(i))
    return i.map((s, n) => se(s, String(n), e));
  if (i && typeof i.toJSON == "function") {
    if (!e || !qi(i))
      return i.toJSON(t, e);
    const s = { aliasCount: 0, count: 1, res: void 0 };
    e.anchors.set(i, s), e.onCreate = (r) => {
      s.res = r, delete e.onCreate;
    };
    const n = i.toJSON(t, e);
    return e.onCreate && e.onCreate(n), n;
  }
  return typeof i == "bigint" && !(e != null && e.keep) ? Number(i) : i;
}
class jt {
  constructor(t) {
    Object.defineProperty(this, ie, { value: t });
  }
  /** Create a copy of this node.  */
  clone() {
    const t = Object.create(Object.getPrototypeOf(this), Object.getOwnPropertyDescriptors(this));
    return this.range && (t.range = this.range.slice()), t;
  }
  /** A plain JavaScript representation of this node. */
  toJS(t, { mapAsMap: e, maxAliasCount: s, onAnchor: n, reviver: r } = {}) {
    if (!mt(t))
      throw new TypeError("A document argument is required");
    const o = {
      anchors: /* @__PURE__ */ new Map(),
      doc: t,
      keep: !0,
      mapAsMap: e === !0,
      mapKeyWarned: !1,
      maxAliasCount: typeof s == "number" ? s : 100
    }, u = se(this, "", o);
    if (typeof n == "function")
      for (const { count: a, res: l } of o.anchors.values())
        n(l, a);
    return typeof r == "function" ? _e(r, { "": u }, "", u) : u;
  }
}
class xt extends jt {
  constructor(t) {
    super(Ut), this.source = t, Object.defineProperty(this, "tag", {
      set() {
        throw new Error("Alias nodes cannot have tags");
      }
    });
  }
  /**
   * Resolve the value of this alias within `doc`, finding the last
   * instance of the `source` anchor before this node.
   */
  resolve(t) {
    let e;
    return Se(t, {
      Node: (s, n) => {
        if (n === this)
          return Se.BREAK;
        n.anchor === this.source && (e = n);
      }
    }), e;
  }
  toJSON(t, e) {
    if (!e)
      return { source: this.source };
    const { anchors: s, doc: n, maxAliasCount: r } = e, o = this.resolve(n);
    if (!o) {
      const a = `Unresolved alias (the anchor must be set before the alias): ${this.source}`;
      throw new ReferenceError(a);
    }
    let u = s.get(o);
    if (u || (se(o, null, e), u = s.get(o)), !u || u.res === void 0) {
      const a = "This should not happen: Alias anchor was not resolved?";
      throw new ReferenceError(a);
    }
    if (r >= 0 && (u.count += 1, u.aliasCount === 0 && (u.aliasCount = ct(n, o, s)), u.count * u.aliasCount > r)) {
      const a = "Excessive alias count indicates a resource exhaustion attack";
      throw new ReferenceError(a);
    }
    return u.res;
  }
  toString(t, e, s) {
    const n = `*${this.source}`;
    if (t) {
      if (qs(this.source), t.options.verifyAliasOrder && !t.anchors.has(this.source)) {
        const r = `Unresolved alias (the anchor must be set before the alias): ${this.source}`;
        throw new Error(r);
      }
      if (t.implicitKey)
        return `${n} `;
    }
    return n;
  }
}
function ct(i, t, e) {
  if (He(t)) {
    const s = t.resolve(i), n = e && s && e.get(s);
    return n ? n.count * n.aliasCount : 0;
  } else if (R(t)) {
    let s = 0;
    for (const n of t.items) {
      const r = ct(i, n, e);
      r > s && (s = r);
    }
    return s;
  } else if (O(t)) {
    const s = ct(i, t.key, e), n = ct(i, t.value, e);
    return Math.max(s, n);
  }
  return 1;
}
const si = (i) => !i || typeof i != "function" && typeof i != "object";
class F extends jt {
  constructor(t) {
    super(de), this.value = t;
  }
  toJSON(t, e) {
    return e != null && e.keep ? this.value : se(this.value, t, e);
  }
  toString() {
    return String(this.value);
  }
}
F.BLOCK_FOLDED = "BLOCK_FOLDED";
F.BLOCK_LITERAL = "BLOCK_LITERAL";
F.PLAIN = "PLAIN";
F.QUOTE_DOUBLE = "QUOTE_DOUBLE";
F.QUOTE_SINGLE = "QUOTE_SINGLE";
const an = "tag:yaml.org,2002:";
function ln(i, t, e) {
  if (t) {
    const s = e.filter((r) => r.tag === t), n = s.find((r) => !r.format) ?? s[0];
    if (!n)
      throw new Error(`Tag ${t} not found`);
    return n;
  }
  return e.find((s) => {
    var n;
    return ((n = s.identify) == null ? void 0 : n.call(s, i)) && !s.format;
  });
}
function ze(i, t, e) {
  var h, d, A;
  if (mt(i) && (i = i.contents), H(i))
    return i;
  if (O(i)) {
    const w = (d = (h = e.schema[pe]).createNode) == null ? void 0 : d.call(h, e.schema, null, e);
    return w.items.push(i), w;
  }
  (i instanceof String || i instanceof Number || i instanceof Boolean || typeof BigInt < "u" && i instanceof BigInt) && (i = i.valueOf());
  const { aliasDuplicateObjects: s, onAnchor: n, onTagObj: r, schema: o, sourceObjects: u } = e;
  let a;
  if (s && i && typeof i == "object") {
    if (a = u.get(i), a)
      return a.anchor || (a.anchor = n(i)), new xt(a.anchor);
    a = { anchor: null, node: null }, u.set(i, a);
  }
  t != null && t.startsWith("!!") && (t = an + t.slice(2));
  let l = ln(i, t, o.tags);
  if (!l) {
    if (i && typeof i.toJSON == "function" && (i = i.toJSON()), !i || typeof i != "object") {
      const w = new F(i);
      return a && (a.node = w), w;
    }
    l = i instanceof Map ? o[pe] : Symbol.iterator in Object(i) ? o[Oe] : o[pe];
  }
  r && (r(l), delete e.onTagObj);
  const p = l != null && l.createNode ? l.createNode(e.schema, i, e) : typeof ((A = l == null ? void 0 : l.nodeClass) == null ? void 0 : A.from) == "function" ? l.nodeClass.from(e.schema, i, e) : new F(i);
  return t ? p.tag = t : l.default || (p.tag = l.tag), a && (a.node = p), p;
}
function pt(i, t, e) {
  let s = e;
  for (let n = t.length - 1; n >= 0; --n) {
    const r = t[n];
    if (typeof r == "number" && Number.isInteger(r) && r >= 0) {
      const o = [];
      o[r] = s, s = o;
    } else
      s = /* @__PURE__ */ new Map([[r, s]]);
  }
  return ze(s, void 0, {
    aliasDuplicateObjects: !1,
    keepUndefined: !1,
    onAnchor: () => {
      throw new Error("This should not happen, please report a bug.");
    },
    schema: i,
    sourceObjects: /* @__PURE__ */ new Map()
  });
}
const Pe = (i) => i == null || typeof i == "object" && !!i[Symbol.iterator]().next().done;
class zt extends jt {
  constructor(t, e) {
    super(t), Object.defineProperty(this, "schema", {
      value: e,
      configurable: !0,
      enumerable: !1,
      writable: !0
    });
  }
  /**
   * Create a copy of this collection.
   *
   * @param schema - If defined, overwrites the original's schema
   */
  clone(t) {
    const e = Object.create(Object.getPrototypeOf(this), Object.getOwnPropertyDescriptors(this));
    return t && (e.schema = t), e.items = e.items.map((s) => H(s) || O(s) ? s.clone(t) : s), this.range && (e.range = this.range.slice()), e;
  }
  /**
   * Adds a value to the collection. For `!!map` and `!!omap` the value must
   * be a Pair instance or a `{ key, value }` object, which may not have a key
   * that already exists in the map.
   */
  addIn(t, e) {
    if (Pe(t))
      this.add(e);
    else {
      const [s, ...n] = t, r = this.get(s, !0);
      if (R(r))
        r.addIn(n, e);
      else if (r === void 0 && this.schema)
        this.set(s, pt(this.schema, n, e));
      else
        throw new Error(`Expected YAML collection at ${s}. Remaining path: ${n}`);
    }
  }
  /**
   * Removes a value from the collection.
   * @returns `true` if the item was found and removed.
   */
  deleteIn(t) {
    const [e, ...s] = t;
    if (s.length === 0)
      return this.delete(e);
    const n = this.get(e, !0);
    if (R(n))
      return n.deleteIn(s);
    throw new Error(`Expected YAML collection at ${e}. Remaining path: ${s}`);
  }
  /**
   * Returns item at `key`, or `undefined` if not found. By default unwraps
   * scalar values from their surrounding node; to disable set `keepScalar` to
   * `true` (collections are always returned intact).
   */
  getIn(t, e) {
    const [s, ...n] = t, r = this.get(s, !0);
    return n.length === 0 ? !e && N(r) ? r.value : r : R(r) ? r.getIn(n, e) : void 0;
  }
  hasAllNullValues(t) {
    return this.items.every((e) => {
      if (!O(e))
        return !1;
      const s = e.value;
      return s == null || t && N(s) && s.value == null && !s.commentBefore && !s.comment && !s.tag;
    });
  }
  /**
   * Checks if the collection includes a value with the key `key`.
   */
  hasIn(t) {
    const [e, ...s] = t;
    if (s.length === 0)
      return this.has(e);
    const n = this.get(e, !0);
    return R(n) ? n.hasIn(s) : !1;
  }
  /**
   * Sets a value in this collection. For `!!set`, `value` needs to be a
   * boolean to add/remove the item from the set.
   */
  setIn(t, e) {
    const [s, ...n] = t;
    if (n.length === 0)
      this.set(s, e);
    else {
      const r = this.get(s, !0);
      if (R(r))
        r.setIn(n, e);
      else if (r === void 0 && this.schema)
        this.set(s, pt(this.schema, n, e));
      else
        throw new Error(`Expected YAML collection at ${s}. Remaining path: ${n}`);
    }
  }
}
zt.maxFlowStringSingleLineLength = 60;
const cn = (i) => i.replace(/^(?!$)(?: $)?/gm, "#");
function he(i, t) {
  return /^\n+$/.test(i) ? i.substring(1) : t ? i.replace(/^(?! *$)/gm, t) : i;
}
const be = (i, t, e) => i.endsWith(`
`) ? he(e, t) : e.includes(`
`) ? `
` + he(e, t) : (i.endsWith(" ") ? "" : " ") + e, ii = "flow", Rt = "block", ht = "quoted";
function Dt(i, t, e = "flow", { indentAtStart: s, lineWidth: n = 80, minContentWidth: r = 20, onFold: o, onOverflow: u } = {}) {
  if (!n || n < 0)
    return i;
  const a = Math.max(1 + r, 1 + n - t.length);
  if (i.length <= a)
    return i;
  const l = [], p = {};
  let h = n - t.length;
  typeof s == "number" && (s > n - Math.max(2, r) ? l.push(0) : h = n - s);
  let d, A, w = !1, c = -1, g = -1, I = -1;
  e === Rt && (c = ds(i, c, t.length), c !== -1 && (h = c + a));
  for (let b; b = i[c += 1]; ) {
    if (e === ht && b === "\\") {
      switch (g = c, i[c + 1]) {
        case "x":
          c += 3;
          break;
        case "u":
          c += 5;
          break;
        case "U":
          c += 9;
          break;
        default:
          c += 1;
      }
      I = c;
    }
    if (b === `
`)
      e === Rt && (c = ds(i, c, t.length)), h = c + t.length + a, d = void 0;
    else {
      if (b === " " && A && A !== " " && A !== `
` && A !== "	") {
        const D = i[c + 1];
        D && D !== " " && D !== `
` && D !== "	" && (d = c);
      }
      if (c >= h)
        if (d)
          l.push(d), h = d + a, d = void 0;
        else if (e === ht) {
          for (; A === " " || A === "	"; )
            A = b, b = i[c += 1], w = !0;
          const D = c > I + 1 ? c - 2 : g - 1;
          if (p[D])
            return i;
          l.push(D), p[D] = !0, h = D + a, d = void 0;
        } else
          w = !0;
    }
    A = b;
  }
  if (w && u && u(), l.length === 0)
    return i;
  o && o();
  let m = i.slice(0, l[0]);
  for (let b = 0; b < l.length; ++b) {
    const D = l[b], y = l[b + 1] || i.length;
    D === 0 ? m = `
${t}${i.slice(0, y)}` : (e === ht && p[D] && (m += `${i[D]}\\`), m += `
${t}${i.slice(D + 1, y)}`);
  }
  return m;
}
function ds(i, t, e) {
  let s = t, n = t + 1, r = i[n];
  for (; r === " " || r === "	"; )
    if (t < n + e)
      r = i[++t];
    else {
      do
        r = i[++t];
      while (r && r !== `
`);
      s = t, n = t + 1, r = i[n];
    }
  return s;
}
const wt = (i, t) => ({
  indentAtStart: t ? i.indent.length : i.indentAtStart,
  lineWidth: i.options.lineWidth,
  minContentWidth: i.options.minContentWidth
}), bt = (i) => /^(%|---|\.\.\.)/m.test(i);
function hn(i, t, e) {
  if (!t || t < 0)
    return !1;
  const s = t - e, n = i.length;
  if (n <= s)
    return !1;
  for (let r = 0, o = 0; r < n; ++r)
    if (i[r] === `
`) {
      if (r - o > s)
        return !0;
      if (o = r + 1, n - o <= s)
        return !1;
    }
  return !0;
}
function Ue(i, t) {
  const e = JSON.stringify(i);
  if (t.options.doubleQuotedAsJSON)
    return e;
  const { implicitKey: s } = t, n = t.options.doubleQuotedMinMultiLineLength, r = t.indent || (bt(i) ? "  " : "");
  let o = "", u = 0;
  for (let a = 0, l = e[a]; l; l = e[++a])
    if (l === " " && e[a + 1] === "\\" && e[a + 2] === "n" && (o += e.slice(u, a) + "\\ ", a += 1, u = a, l = "\\"), l === "\\")
      switch (e[a + 1]) {
        case "u":
          {
            o += e.slice(u, a);
            const p = e.substr(a + 2, 4);
            switch (p) {
              case "0000":
                o += "\\0";
                break;
              case "0007":
                o += "\\a";
                break;
              case "000b":
                o += "\\v";
                break;
              case "001b":
                o += "\\e";
                break;
              case "0085":
                o += "\\N";
                break;
              case "00a0":
                o += "\\_";
                break;
              case "2028":
                o += "\\L";
                break;
              case "2029":
                o += "\\P";
                break;
              default:
                p.substr(0, 2) === "00" ? o += "\\x" + p.substr(2) : o += e.substr(a, 6);
            }
            a += 5, u = a + 1;
          }
          break;
        case "n":
          if (s || e[a + 2] === '"' || e.length < n)
            a += 1;
          else {
            for (o += e.slice(u, a) + `

`; e[a + 2] === "\\" && e[a + 3] === "n" && e[a + 4] !== '"'; )
              o += `
`, a += 2;
            o += r, e[a + 2] === " " && (o += "\\"), a += 1, u = a + 1;
          }
          break;
        default:
          a += 1;
      }
  return o = u ? o + e.slice(u) : e, s ? o : Dt(o, r, ht, wt(t, !1));
}
function Ot(i, t) {
  if (t.options.singleQuote === !1 || t.implicitKey && i.includes(`
`) || /[ \t]\n|\n[ \t]/.test(i))
    return Ue(i, t);
  const e = t.indent || (bt(i) ? "  " : ""), s = "'" + i.replace(/'/g, "''").replace(/\n+/g, `$&
${e}`) + "'";
  return t.implicitKey ? s : Dt(s, e, ii, wt(t, !1));
}
function ve(i, t) {
  const { singleQuote: e } = t.options;
  let s;
  if (e === !1)
    s = Ue;
  else {
    const n = i.includes('"'), r = i.includes("'");
    n && !r ? s = Ot : r && !n ? s = Ue : s = e ? Ot : Ue;
  }
  return s(i, t);
}
let Ht;
try {
  Ht = new RegExp(`(^|(?<!
))
+(?!
|$)`, "g");
} catch {
  Ht = /\n+(?!\n|$)/g;
}
function gt({ comment: i, type: t, value: e }, s, n, r) {
  const { blockQuote: o, commentString: u, lineWidth: a } = s.options;
  if (!o || /\n[\t ]+$/.test(e) || /^\s*$/.test(e))
    return ve(e, s);
  const l = s.indent || (s.forceBlockIndent || bt(e) ? "  " : ""), p = o === "literal" ? !0 : o === "folded" || t === F.BLOCK_FOLDED ? !1 : t === F.BLOCK_LITERAL ? !0 : !hn(e, a, l.length);
  if (!e)
    return p ? `|
` : `>
`;
  let h, d;
  for (d = e.length; d > 0; --d) {
    const B = e[d - 1];
    if (B !== `
` && B !== "	" && B !== " ")
      break;
  }
  let A = e.substring(d);
  const w = A.indexOf(`
`);
  w === -1 ? h = "-" : e === A || w !== A.length - 1 ? (h = "+", r && r()) : h = "", A && (e = e.slice(0, -A.length), A[A.length - 1] === `
` && (A = A.slice(0, -1)), A = A.replace(Ht, `$&${l}`));
  let c = !1, g, I = -1;
  for (g = 0; g < e.length; ++g) {
    const B = e[g];
    if (B === " ")
      c = !0;
    else if (B === `
`)
      I = g;
    else
      break;
  }
  let m = e.substring(0, I < g ? I + 1 : g);
  m && (e = e.substring(m.length), m = m.replace(/\n+/g, `$&${l}`));
  let D = (p ? "|" : ">") + (c ? l ? "2" : "1" : "") + h;
  if (i && (D += " " + u(i.replace(/ ?[\r\n]+/g, " ")), n && n()), p)
    return e = e.replace(/\n+/g, `$&${l}`), `${D}
${l}${m}${e}${A}`;
  e = e.replace(/\n+/g, `
$&`).replace(/(?:^|\n)([\t ].*)(?:([\n\t ]*)\n(?![\n\t ]))?/g, "$1$2").replace(/\n+/g, `$&${l}`);
  const y = Dt(`${m}${e}${A}`, l, Rt, wt(s, !0));
  return `${D}
${l}${y}`;
}
function gn(i, t, e, s) {
  const { type: n, value: r } = i, { actualString: o, implicitKey: u, indent: a, indentStep: l, inFlow: p } = t;
  if (u && r.includes(`
`) || p && /[[\]{},]/.test(r))
    return ve(r, t);
  if (!r || /^[\n\t ,[\]{}#&*!|>'"%@`]|^[?-]$|^[?-][ \t]|[\n:][ \t]|[ \t]\n|[\n\t ]#|[\n\t :]$/.test(r))
    return u || p || !r.includes(`
`) ? ve(r, t) : gt(i, t, e, s);
  if (!u && !p && n !== F.PLAIN && r.includes(`
`))
    return gt(i, t, e, s);
  if (bt(r)) {
    if (a === "")
      return t.forceBlockIndent = !0, gt(i, t, e, s);
    if (u && a === l)
      return ve(r, t);
  }
  const h = r.replace(/\n+/g, `$&
${a}`);
  if (o) {
    const d = (c) => {
      var g;
      return c.default && c.tag !== "tag:yaml.org,2002:str" && ((g = c.test) == null ? void 0 : g.test(h));
    }, { compat: A, tags: w } = t.doc.schema;
    if (w.some(d) || A != null && A.some(d))
      return ve(r, t);
  }
  return u ? h : Dt(h, a, ii, wt(t, !1));
}
function Qt(i, t, e, s) {
  const { implicitKey: n, inFlow: r } = t, o = typeof i.value == "string" ? i : Object.assign({}, i, { value: String(i.value) });
  let { type: u } = i;
  u !== F.QUOTE_DOUBLE && /[\x00-\x08\x0b-\x1f\x7f-\x9f\u{D800}-\u{DFFF}]/u.test(o.value) && (u = F.QUOTE_DOUBLE);
  const a = (p) => {
    switch (p) {
      case F.BLOCK_FOLDED:
      case F.BLOCK_LITERAL:
        return n || r ? ve(o.value, t) : gt(o, t, e, s);
      case F.QUOTE_DOUBLE:
        return Ue(o.value, t);
      case F.QUOTE_SINGLE:
        return Ot(o.value, t);
      case F.PLAIN:
        return gn(o, t, e, s);
      default:
        return null;
    }
  };
  let l = a(u);
  if (l === null) {
    const { defaultKeyType: p, defaultStringType: h } = t.options, d = n && p || h;
    if (l = a(d), l === null)
      throw new Error(`Unsupported default string type ${d}`);
  }
  return l;
}
function ni(i, t) {
  const e = Object.assign({
    blockQuote: !0,
    commentString: cn,
    defaultKeyType: null,
    defaultStringType: "PLAIN",
    directives: null,
    doubleQuotedAsJSON: !1,
    doubleQuotedMinMultiLineLength: 40,
    falseStr: "false",
    flowCollectionPadding: !0,
    indentSeq: !0,
    lineWidth: 80,
    minContentWidth: 20,
    nullStr: "null",
    simpleKeys: !1,
    singleQuote: null,
    trueStr: "true",
    verifyAliasOrder: !0
  }, i.schema.toStringOptions, t);
  let s;
  switch (e.collectionStyle) {
    case "block":
      s = !1;
      break;
    case "flow":
      s = !0;
      break;
    default:
      s = null;
  }
  return {
    anchors: /* @__PURE__ */ new Set(),
    doc: i,
    flowCollectionPadding: e.flowCollectionPadding ? " " : "",
    indent: "",
    indentStep: typeof e.indent == "number" ? " ".repeat(e.indent) : "  ",
    inFlow: s,
    options: e
  };
}
function dn(i, t) {
  var n;
  if (t.tag) {
    const r = i.filter((o) => o.tag === t.tag);
    if (r.length > 0)
      return r.find((o) => o.format === t.format) ?? r[0];
  }
  let e, s;
  if (N(t)) {
    s = t.value;
    const r = i.filter((o) => {
      var u;
      return (u = o.identify) == null ? void 0 : u.call(o, s);
    });
    e = r.find((o) => o.format === t.format) ?? r.find((o) => !o.format);
  } else
    s = t, e = i.find((r) => r.nodeClass && s instanceof r.nodeClass);
  if (!e) {
    const r = ((n = s == null ? void 0 : s.constructor) == null ? void 0 : n.name) ?? typeof s;
    throw new Error(`Tag not resolved for ${r} value`);
  }
  return e;
}
function pn(i, t, { anchors: e, doc: s }) {
  if (!s.directives)
    return "";
  const n = [], r = (N(i) || R(i)) && i.anchor;
  r && qs(r) && (e.add(r), n.push(`&${r}`));
  const o = i.tag ? i.tag : t.default ? null : t.tag;
  return o && n.push(s.directives.tagString(o)), n.join(" ");
}
function We(i, t, e, s) {
  var a;
  if (O(i))
    return i.toString(t, e, s);
  if (He(i)) {
    if (t.doc.directives)
      return i.toString(t);
    if ((a = t.resolvedAliases) != null && a.has(i))
      throw new TypeError("Cannot stringify circular structure without alias nodes");
    t.resolvedAliases ? t.resolvedAliases.add(i) : t.resolvedAliases = /* @__PURE__ */ new Set([i]), i = i.resolve(t.doc);
  }
  let n;
  const r = H(i) ? i : t.doc.createNode(i, { onTagObj: (l) => n = l });
  n || (n = dn(t.doc.schema.tags, r));
  const o = pn(r, n, t);
  o.length > 0 && (t.indentAtStart = (t.indentAtStart ?? 0) + o.length + 1);
  const u = typeof n.stringify == "function" ? n.stringify(r, t, e, s) : N(r) ? Qt(r, t, e, s) : r.toString(t, e, s);
  return o ? N(r) || u[0] === "{" || u[0] === "[" ? `${o} ${u}` : `${o}
${t.indent}${u}` : u;
}
function fn({ key: i, value: t }, e, s, n) {
  const { allNullValues: r, doc: o, indent: u, indentStep: a, options: { commentString: l, indentSeq: p, simpleKeys: h } } = e;
  let d = H(i) && i.comment || null;
  if (h) {
    if (d)
      throw new Error("With simple keys, key nodes cannot have comments");
    if (R(i) || !H(i) && typeof i == "object") {
      const K = "With simple keys, collection cannot be used as a key value";
      throw new Error(K);
    }
  }
  let A = !h && (!i || d && t == null && !e.inFlow || R(i) || (N(i) ? i.type === F.BLOCK_FOLDED || i.type === F.BLOCK_LITERAL : typeof i == "object"));
  e = Object.assign({}, e, {
    allNullValues: !1,
    implicitKey: !A && (h || !r),
    indent: u + a
  });
  let w = !1, c = !1, g = We(i, e, () => w = !0, () => c = !0);
  if (!A && !e.inFlow && g.length > 1024) {
    if (h)
      throw new Error("With simple keys, single line scalar must not span more than 1024 characters");
    A = !0;
  }
  if (e.inFlow) {
    if (r || t == null)
      return w && s && s(), g === "" ? "?" : A ? `? ${g}` : g;
  } else if (r && !h || t == null && A)
    return g = `? ${g}`, d && !w ? g += be(g, e.indent, l(d)) : c && n && n(), g;
  w && (d = null), A ? (d && (g += be(g, e.indent, l(d))), g = `? ${g}
${u}:`) : (g = `${g}:`, d && (g += be(g, e.indent, l(d))));
  let I, m, b;
  H(t) ? (I = !!t.spaceBefore, m = t.commentBefore, b = t.comment) : (I = !1, m = null, b = null, t && typeof t == "object" && (t = o.createNode(t))), e.implicitKey = !1, !A && !d && N(t) && (e.indentAtStart = g.length + 1), c = !1, !p && a.length >= 2 && !e.inFlow && !A && et(t) && !t.flow && !t.tag && !t.anchor && (e.indent = e.indent.substring(2));
  let D = !1;
  const y = We(t, e, () => D = !0, () => c = !0);
  let B = " ";
  if (d || I || m) {
    if (B = I ? `
` : "", m) {
      const K = l(m);
      B += `
${he(K, e.indent)}`;
    }
    y === "" && !e.inFlow ? B === `
` && (B = `

`) : B += `
${e.indent}`;
  } else if (!A && R(t)) {
    const K = y[0], S = y.indexOf(`
`), T = S !== -1, Ce = e.inFlow ?? t.flow ?? t.items.length === 0;
    if (T || !Ce) {
      let Ge = !1;
      if (T && (K === "&" || K === "!")) {
        let V = y.indexOf(" ");
        K === "&" && V !== -1 && V < S && y[V + 1] === "!" && (V = y.indexOf(" ", V + 1)), (V === -1 || S < V) && (Ge = !0);
      }
      Ge || (B = `
${e.indent}`);
    }
  } else (y === "" || y[0] === `
`) && (B = "");
  return g += B + y, e.inFlow ? D && s && s() : b && !D ? g += be(g, e.indent, l(b)) : c && n && n(), g;
}
function ri(i, t) {
  (i === "debug" || i === "warn") && (typeof process < "u" && process.emitWarning ? process.emitWarning(t) : console.warn(t));
}
const ps = "<<";
function oi(i, t, { key: e, value: s }) {
  if (i != null && i.doc.schema.merge && Cn(e))
    if (s = He(s) ? s.resolve(i.doc) : s, et(s))
      for (const n of s.items)
        kt(i, t, n);
    else if (Array.isArray(s))
      for (const n of s)
        kt(i, t, n);
    else
      kt(i, t, s);
  else {
    const n = se(e, "", i);
    if (t instanceof Map)
      t.set(n, se(s, n, i));
    else if (t instanceof Set)
      t.add(n);
    else {
      const r = An(e, n, i), o = se(s, r, i);
      r in t ? Object.defineProperty(t, r, {
        value: o,
        writable: !0,
        enumerable: !0,
        configurable: !0
      }) : t[r] = o;
    }
  }
  return t;
}
const Cn = (i) => i === ps || N(i) && i.value === ps && (!i.type || i.type === F.PLAIN);
function kt(i, t, e) {
  const s = i && He(e) ? e.resolve(i.doc) : e;
  if (!qe(s))
    throw new Error("Merge sources must be maps or map aliases");
  const n = s.toJSON(null, i, Map);
  for (const [r, o] of n)
    t instanceof Map ? t.has(r) || t.set(r, o) : t instanceof Set ? t.add(r) : Object.prototype.hasOwnProperty.call(t, r) || Object.defineProperty(t, r, {
      value: o,
      writable: !0,
      enumerable: !0,
      configurable: !0
    });
  return t;
}
function An(i, t, e) {
  if (t === null)
    return "";
  if (typeof t != "object")
    return String(t);
  if (H(i) && (e != null && e.doc)) {
    const s = ni(e.doc, {});
    s.anchors = /* @__PURE__ */ new Set();
    for (const r of e.anchors.keys())
      s.anchors.add(r.anchor);
    s.inFlow = !0, s.inStringifyKey = !0;
    const n = i.toString(s);
    if (!e.mapKeyWarned) {
      let r = JSON.stringify(n);
      r.length > 40 && (r = r.substring(0, 36) + '..."'), ri(e.doc.options.logLevel, `Keys with collection values will be stringified due to JS Object restrictions: ${r}. Set mapAsMap: true to use object keys.`), e.mapKeyWarned = !0;
    }
    return n;
  }
  return JSON.stringify(t);
}
function qt(i, t, e) {
  const s = ze(i, void 0, e), n = ze(t, void 0, e);
  return new U(s, n);
}
class U {
  constructor(t, e = null) {
    Object.defineProperty(this, ie, { value: Qs }), this.key = t, this.value = e;
  }
  clone(t) {
    let { key: e, value: s } = this;
    return H(e) && (e = e.clone(t)), H(s) && (s = s.clone(t)), new U(e, s);
  }
  toJSON(t, e) {
    const s = e != null && e.mapAsMap ? /* @__PURE__ */ new Map() : {};
    return oi(e, s, this);
  }
  toString(t, e, s) {
    return t != null && t.doc ? fn(this, t, e, s) : JSON.stringify(this);
  }
}
function ui(i, t, e) {
  return (t.inFlow ?? i.flow ? mn : In)(i, t, e);
}
function In({ comment: i, items: t }, e, { blockItemPrefix: s, flowChars: n, itemIndent: r, onChompKeep: o, onComment: u }) {
  const { indent: a, options: { commentString: l } } = e, p = Object.assign({}, e, { indent: r, type: null });
  let h = !1;
  const d = [];
  for (let w = 0; w < t.length; ++w) {
    const c = t[w];
    let g = null;
    if (H(c))
      !h && c.spaceBefore && d.push(""), ft(e, d, c.commentBefore, h), c.comment && (g = c.comment);
    else if (O(c)) {
      const m = H(c.key) ? c.key : null;
      m && (!h && m.spaceBefore && d.push(""), ft(e, d, m.commentBefore, h));
    }
    h = !1;
    let I = We(c, p, () => g = null, () => h = !0);
    g && (I += be(I, r, l(g))), h && g && (h = !1), d.push(s + I);
  }
  let A;
  if (d.length === 0)
    A = n.start + n.end;
  else {
    A = d[0];
    for (let w = 1; w < d.length; ++w) {
      const c = d[w];
      A += c ? `
${a}${c}` : `
`;
    }
  }
  return i ? (A += `
` + he(l(i), a), u && u()) : h && o && o(), A;
}
function mn({ items: i }, t, { flowChars: e, itemIndent: s }) {
  const { indent: n, indentStep: r, flowCollectionPadding: o, options: { commentString: u } } = t;
  s += r;
  const a = Object.assign({}, t, {
    indent: s,
    inFlow: !0,
    type: null
  });
  let l = !1, p = 0;
  const h = [];
  for (let w = 0; w < i.length; ++w) {
    const c = i[w];
    let g = null;
    if (H(c))
      c.spaceBefore && h.push(""), ft(t, h, c.commentBefore, !1), c.comment && (g = c.comment);
    else if (O(c)) {
      const m = H(c.key) ? c.key : null;
      m && (m.spaceBefore && h.push(""), ft(t, h, m.commentBefore, !1), m.comment && (l = !0));
      const b = H(c.value) ? c.value : null;
      b ? (b.comment && (g = b.comment), b.commentBefore && (l = !0)) : c.value == null && (m != null && m.comment) && (g = m.comment);
    }
    g && (l = !0);
    let I = We(c, a, () => g = null);
    w < i.length - 1 && (I += ","), g && (I += be(I, s, u(g))), !l && (h.length > p || I.includes(`
`)) && (l = !0), h.push(I), p = h.length;
  }
  const { start: d, end: A } = e;
  if (h.length === 0)
    return d + A;
  if (!l) {
    const w = h.reduce((c, g) => c + g.length + 2, 2);
    l = t.options.lineWidth > 0 && w > t.options.lineWidth;
  }
  if (l) {
    let w = d;
    for (const c of h)
      w += c ? `
${r}${n}${c}` : `
`;
    return `${w}
${n}${A}`;
  } else
    return `${d}${o}${h.join(" ")}${o}${A}`;
}
function ft({ indent: i, options: { commentString: t } }, e, s, n) {
  if (s && n && (s = s.replace(/^\n+/, "")), s) {
    const r = he(t(s), i);
    e.push(r.trimStart());
  }
}
function ye(i, t) {
  const e = N(t) ? t.value : t;
  for (const s of i)
    if (O(s) && (s.key === t || s.key === e || N(s.key) && s.key.value === e))
      return s;
}
class te extends zt {
  static get tagName() {
    return "tag:yaml.org,2002:map";
  }
  constructor(t) {
    super(pe, t), this.items = [];
  }
  /**
   * A generic collection parsing method that can be extended
   * to other node classes that inherit from YAMLMap
   */
  static from(t, e, s) {
    const { keepUndefined: n, replacer: r } = s, o = new this(t), u = (a, l) => {
      if (typeof r == "function")
        l = r.call(e, a, l);
      else if (Array.isArray(r) && !r.includes(a))
        return;
      (l !== void 0 || n) && o.items.push(qt(a, l, s));
    };
    if (e instanceof Map)
      for (const [a, l] of e)
        u(a, l);
    else if (e && typeof e == "object")
      for (const a of Object.keys(e))
        u(a, e[a]);
    return typeof t.sortMapEntries == "function" && o.items.sort(t.sortMapEntries), o;
  }
  /**
   * Adds a value to the collection.
   *
   * @param overwrite - If not set `true`, using a key that is already in the
   *   collection will throw. Otherwise, overwrites the previous value.
   */
  add(t, e) {
    var o;
    let s;
    O(t) ? s = t : !t || typeof t != "object" || !("key" in t) ? s = new U(t, t == null ? void 0 : t.value) : s = new U(t.key, t.value);
    const n = ye(this.items, s.key), r = (o = this.schema) == null ? void 0 : o.sortMapEntries;
    if (n) {
      if (!e)
        throw new Error(`Key ${s.key} already set`);
      N(n.value) && si(s.value) ? n.value.value = s.value : n.value = s.value;
    } else if (r) {
      const u = this.items.findIndex((a) => r(s, a) < 0);
      u === -1 ? this.items.push(s) : this.items.splice(u, 0, s);
    } else
      this.items.push(s);
  }
  delete(t) {
    const e = ye(this.items, t);
    return e ? this.items.splice(this.items.indexOf(e), 1).length > 0 : !1;
  }
  get(t, e) {
    const s = ye(this.items, t), n = s == null ? void 0 : s.value;
    return (!e && N(n) ? n.value : n) ?? void 0;
  }
  has(t) {
    return !!ye(this.items, t);
  }
  set(t, e) {
    this.add(new U(t, e), !0);
  }
  /**
   * @param ctx - Conversion context, originally set in Document#toJS()
   * @param {Class} Type - If set, forces the returned collection type
   * @returns Instance of Type, Map, or Object
   */
  toJSON(t, e, s) {
    const n = s ? new s() : e != null && e.mapAsMap ? /* @__PURE__ */ new Map() : {};
    e != null && e.onCreate && e.onCreate(n);
    for (const r of this.items)
      oi(e, n, r);
    return n;
  }
  toString(t, e, s) {
    if (!t)
      return JSON.stringify(this);
    for (const n of this.items)
      if (!O(n))
        throw new Error(`Map items must all be pairs; found ${JSON.stringify(n)} instead`);
    return !t.allNullValues && this.hasAllNullValues(!1) && (t = Object.assign({}, t, { allNullValues: !0 })), ui(this, t, {
      blockItemPrefix: "",
      flowChars: { start: "{", end: "}" },
      itemIndent: t.indent || "",
      onChompKeep: s,
      onComment: e
    });
  }
}
const Te = {
  collection: "map",
  default: !0,
  nodeClass: te,
  tag: "tag:yaml.org,2002:map",
  resolve(i, t) {
    return qe(i) || t("Expected a mapping for this tag"), i;
  },
  createNode: (i, t, e) => te.from(i, t, e)
};
class Ee extends zt {
  static get tagName() {
    return "tag:yaml.org,2002:seq";
  }
  constructor(t) {
    super(Oe, t), this.items = [];
  }
  add(t) {
    this.items.push(t);
  }
  /**
   * Removes a value from the collection.
   *
   * `key` must contain a representation of an integer for this to succeed.
   * It may be wrapped in a `Scalar`.
   *
   * @returns `true` if the item was found and removed.
   */
  delete(t) {
    const e = nt(t);
    return typeof e != "number" ? !1 : this.items.splice(e, 1).length > 0;
  }
  get(t, e) {
    const s = nt(t);
    if (typeof s != "number")
      return;
    const n = this.items[s];
    return !e && N(n) ? n.value : n;
  }
  /**
   * Checks if the collection includes a value with the key `key`.
   *
   * `key` must contain a representation of an integer for this to succeed.
   * It may be wrapped in a `Scalar`.
   */
  has(t) {
    const e = nt(t);
    return typeof e == "number" && e < this.items.length;
  }
  /**
   * Sets a value in this collection. For `!!set`, `value` needs to be a
   * boolean to add/remove the item from the set.
   *
   * If `key` does not contain a representation of an integer, this will throw.
   * It may be wrapped in a `Scalar`.
   */
  set(t, e) {
    const s = nt(t);
    if (typeof s != "number")
      throw new Error(`Expected a valid index, not ${t}.`);
    const n = this.items[s];
    N(n) && si(e) ? n.value = e : this.items[s] = e;
  }
  toJSON(t, e) {
    const s = [];
    e != null && e.onCreate && e.onCreate(s);
    let n = 0;
    for (const r of this.items)
      s.push(se(r, String(n++), e));
    return s;
  }
  toString(t, e, s) {
    return t ? ui(this, t, {
      blockItemPrefix: "- ",
      flowChars: { start: "[", end: "]" },
      itemIndent: (t.indent || "") + "  ",
      onChompKeep: s,
      onComment: e
    }) : JSON.stringify(this);
  }
  static from(t, e, s) {
    const { replacer: n } = s, r = new this(t);
    if (e && Symbol.iterator in Object(e)) {
      let o = 0;
      for (let u of e) {
        if (typeof n == "function") {
          const a = e instanceof Set ? u : String(o++);
          u = n.call(e, a, u);
        }
        r.items.push(ze(u, void 0, s));
      }
    }
    return r;
  }
}
function nt(i) {
  let t = N(i) ? i.value : i;
  return t && typeof t == "string" && (t = Number(t)), typeof t == "number" && Number.isInteger(t) && t >= 0 ? t : null;
}
const Ve = {
  collection: "seq",
  default: !0,
  nodeClass: Ee,
  tag: "tag:yaml.org,2002:seq",
  resolve(i, t) {
    return et(i) || t("Expected a sequence for this tag"), i;
  },
  createNode: (i, t, e) => Ee.from(i, t, e)
}, yt = {
  identify: (i) => typeof i == "string",
  default: !0,
  tag: "tag:yaml.org,2002:str",
  resolve: (i) => i,
  stringify(i, t, e, s) {
    return t = Object.assign({ actualString: !0 }, t), Qt(i, t, e, s);
  }
}, Bt = {
  identify: (i) => i == null,
  createNode: () => new F(null),
  default: !0,
  tag: "tag:yaml.org,2002:null",
  test: /^(?:~|[Nn]ull|NULL)?$/,
  resolve: () => new F(null),
  stringify: ({ source: i }, t) => typeof i == "string" && Bt.test.test(i) ? i : t.options.nullStr
}, es = {
  identify: (i) => typeof i == "boolean",
  default: !0,
  tag: "tag:yaml.org,2002:bool",
  test: /^(?:[Tt]rue|TRUE|[Ff]alse|FALSE)$/,
  resolve: (i) => new F(i[0] === "t" || i[0] === "T"),
  stringify({ source: i, value: t }, e) {
    if (i && es.test.test(i)) {
      const s = i[0] === "t" || i[0] === "T";
      if (t === s)
        return i;
    }
    return t ? e.options.trueStr : e.options.falseStr;
  }
};
function oe({ format: i, minFractionDigits: t, tag: e, value: s }) {
  if (typeof s == "bigint")
    return String(s);
  const n = typeof s == "number" ? s : Number(s);
  if (!isFinite(n))
    return isNaN(n) ? ".nan" : n < 0 ? "-.inf" : ".inf";
  let r = JSON.stringify(s);
  if (!i && t && (!e || e === "tag:yaml.org,2002:float") && /^\d/.test(r)) {
    let o = r.indexOf(".");
    o < 0 && (o = r.length, r += ".");
    let u = t - (r.length - o - 1);
    for (; u-- > 0; )
      r += "0";
  }
  return r;
}
const ai = {
  identify: (i) => typeof i == "number",
  default: !0,
  tag: "tag:yaml.org,2002:float",
  test: /^(?:[-+]?\.(?:inf|Inf|INF)|\.nan|\.NaN|\.NAN)$/,
  resolve: (i) => i.slice(-3).toLowerCase() === "nan" ? NaN : i[0] === "-" ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY,
  stringify: oe
}, li = {
  identify: (i) => typeof i == "number",
  default: !0,
  tag: "tag:yaml.org,2002:float",
  format: "EXP",
  test: /^[-+]?(?:\.[0-9]+|[0-9]+(?:\.[0-9]*)?)[eE][-+]?[0-9]+$/,
  resolve: (i) => parseFloat(i),
  stringify(i) {
    const t = Number(i.value);
    return isFinite(t) ? t.toExponential() : oe(i);
  }
}, ci = {
  identify: (i) => typeof i == "number",
  default: !0,
  tag: "tag:yaml.org,2002:float",
  test: /^[-+]?(?:\.[0-9]+|[0-9]+\.[0-9]*)$/,
  resolve(i) {
    const t = new F(parseFloat(i)), e = i.indexOf(".");
    return e !== -1 && i[i.length - 1] === "0" && (t.minFractionDigits = i.length - e - 1), t;
  },
  stringify: oe
}, St = (i) => typeof i == "bigint" || Number.isInteger(i), ts = (i, t, e, { intAsBigInt: s }) => s ? BigInt(i) : parseInt(i.substring(t), e);
function hi(i, t, e) {
  const { value: s } = i;
  return St(s) && s >= 0 ? e + s.toString(t) : oe(i);
}
const gi = {
  identify: (i) => St(i) && i >= 0,
  default: !0,
  tag: "tag:yaml.org,2002:int",
  format: "OCT",
  test: /^0o[0-7]+$/,
  resolve: (i, t, e) => ts(i, 2, 8, e),
  stringify: (i) => hi(i, 8, "0o")
}, di = {
  identify: St,
  default: !0,
  tag: "tag:yaml.org,2002:int",
  test: /^[-+]?[0-9]+$/,
  resolve: (i, t, e) => ts(i, 0, 10, e),
  stringify: oe
}, pi = {
  identify: (i) => St(i) && i >= 0,
  default: !0,
  tag: "tag:yaml.org,2002:int",
  format: "HEX",
  test: /^0x[0-9a-fA-F]+$/,
  resolve: (i, t, e) => ts(i, 2, 16, e),
  stringify: (i) => hi(i, 16, "0x")
}, Dn = [
  Te,
  Ve,
  yt,
  Bt,
  es,
  gi,
  di,
  pi,
  ai,
  li,
  ci
];
function fs(i) {
  return typeof i == "bigint" || Number.isInteger(i);
}
const rt = ({ value: i }) => JSON.stringify(i), wn = [
  {
    identify: (i) => typeof i == "string",
    default: !0,
    tag: "tag:yaml.org,2002:str",
    resolve: (i) => i,
    stringify: rt
  },
  {
    identify: (i) => i == null,
    createNode: () => new F(null),
    default: !0,
    tag: "tag:yaml.org,2002:null",
    test: /^null$/,
    resolve: () => null,
    stringify: rt
  },
  {
    identify: (i) => typeof i == "boolean",
    default: !0,
    tag: "tag:yaml.org,2002:bool",
    test: /^true|false$/,
    resolve: (i) => i === "true",
    stringify: rt
  },
  {
    identify: fs,
    default: !0,
    tag: "tag:yaml.org,2002:int",
    test: /^-?(?:0|[1-9][0-9]*)$/,
    resolve: (i, t, { intAsBigInt: e }) => e ? BigInt(i) : parseInt(i, 10),
    stringify: ({ value: i }) => fs(i) ? i.toString() : JSON.stringify(i)
  },
  {
    identify: (i) => typeof i == "number",
    default: !0,
    tag: "tag:yaml.org,2002:float",
    test: /^-?(?:0|[1-9][0-9]*)(?:\.[0-9]*)?(?:[eE][-+]?[0-9]+)?$/,
    resolve: (i) => parseFloat(i),
    stringify: rt
  }
], bn = {
  default: !0,
  tag: "",
  test: /^/,
  resolve(i, t) {
    return t(`Unresolved plain scalar ${JSON.stringify(i)}`), i;
  }
}, yn = [Te, Ve].concat(wn, bn), ss = {
  identify: (i) => i instanceof Uint8Array,
  // Buffer inherits from Uint8Array
  default: !1,
  tag: "tag:yaml.org,2002:binary",
  /**
   * Returns a Buffer in node and an Uint8Array in browsers
   *
   * To use the resulting buffer as an image, you'll want to do something like:
   *
   *   const blob = new Blob([buffer], { type: 'image/jpeg' })
   *   document.querySelector('#photo').src = URL.createObjectURL(blob)
   */
  resolve(i, t) {
    if (typeof Buffer == "function")
      return Buffer.from(i, "base64");
    if (typeof atob == "function") {
      const e = atob(i.replace(/[\n\r]/g, "")), s = new Uint8Array(e.length);
      for (let n = 0; n < e.length; ++n)
        s[n] = e.charCodeAt(n);
      return s;
    } else
      return t("This environment does not support reading binary tags; either Buffer or atob is required"), i;
  },
  stringify({ comment: i, type: t, value: e }, s, n, r) {
    const o = e;
    let u;
    if (typeof Buffer == "function")
      u = o instanceof Buffer ? o.toString("base64") : Buffer.from(o.buffer).toString("base64");
    else if (typeof btoa == "function") {
      let a = "";
      for (let l = 0; l < o.length; ++l)
        a += String.fromCharCode(o[l]);
      u = btoa(a);
    } else
      throw new Error("This environment does not support writing binary tags; either Buffer or btoa is required");
    if (t || (t = F.BLOCK_LITERAL), t !== F.QUOTE_DOUBLE) {
      const a = Math.max(s.options.lineWidth - s.indent.length, s.options.minContentWidth), l = Math.ceil(u.length / a), p = new Array(l);
      for (let h = 0, d = 0; h < l; ++h, d += a)
        p[h] = u.substr(d, a);
      u = p.join(t === F.BLOCK_LITERAL ? `
` : " ");
    }
    return Qt({ comment: i, type: t, value: u }, s, n, r);
  }
};
function fi(i, t) {
  if (et(i))
    for (let e = 0; e < i.items.length; ++e) {
      let s = i.items[e];
      if (!O(s)) {
        if (qe(s)) {
          s.items.length > 1 && t("Each pair must have its own sequence indicator");
          const n = s.items[0] || new U(new F(null));
          if (s.commentBefore && (n.key.commentBefore = n.key.commentBefore ? `${s.commentBefore}
${n.key.commentBefore}` : s.commentBefore), s.comment) {
            const r = n.value ?? n.key;
            r.comment = r.comment ? `${s.comment}
${r.comment}` : s.comment;
          }
          s = n;
        }
        i.items[e] = O(s) ? s : new U(s);
      }
    }
  else
    t("Expected a sequence for this tag");
  return i;
}
function Ci(i, t, e) {
  const { replacer: s } = e, n = new Ee(i);
  n.tag = "tag:yaml.org,2002:pairs";
  let r = 0;
  if (t && Symbol.iterator in Object(t))
    for (let o of t) {
      typeof s == "function" && (o = s.call(t, String(r++), o));
      let u, a;
      if (Array.isArray(o))
        if (o.length === 2)
          u = o[0], a = o[1];
        else
          throw new TypeError(`Expected [key, value] tuple: ${o}`);
      else if (o && o instanceof Object) {
        const l = Object.keys(o);
        if (l.length === 1)
          u = l[0], a = o[u];
        else
          throw new TypeError(`Expected tuple with one key, not ${l.length} keys`);
      } else
        u = o;
      n.items.push(qt(u, a, e));
    }
  return n;
}
const is = {
  collection: "seq",
  default: !1,
  tag: "tag:yaml.org,2002:pairs",
  resolve: fi,
  createNode: Ci
};
class Ke extends Ee {
  constructor() {
    super(), this.add = te.prototype.add.bind(this), this.delete = te.prototype.delete.bind(this), this.get = te.prototype.get.bind(this), this.has = te.prototype.has.bind(this), this.set = te.prototype.set.bind(this), this.tag = Ke.tag;
  }
  /**
   * If `ctx` is given, the return type is actually `Map<unknown, unknown>`,
   * but TypeScript won't allow widening the signature of a child method.
   */
  toJSON(t, e) {
    if (!e)
      return super.toJSON(t);
    const s = /* @__PURE__ */ new Map();
    e != null && e.onCreate && e.onCreate(s);
    for (const n of this.items) {
      let r, o;
      if (O(n) ? (r = se(n.key, "", e), o = se(n.value, r, e)) : r = se(n, "", e), s.has(r))
        throw new Error("Ordered maps must not include duplicate keys");
      s.set(r, o);
    }
    return s;
  }
  static from(t, e, s) {
    const n = Ci(t, e, s), r = new this();
    return r.items = n.items, r;
  }
}
Ke.tag = "tag:yaml.org,2002:omap";
const ns = {
  collection: "seq",
  identify: (i) => i instanceof Map,
  nodeClass: Ke,
  default: !1,
  tag: "tag:yaml.org,2002:omap",
  resolve(i, t) {
    const e = fi(i, t), s = [];
    for (const { key: n } of e.items)
      N(n) && (s.includes(n.value) ? t(`Ordered maps must not include duplicate keys: ${n.value}`) : s.push(n.value));
    return Object.assign(new Ke(), e);
  },
  createNode: (i, t, e) => Ke.from(i, t, e)
};
function Ai({ value: i, source: t }, e) {
  return t && (i ? Ii : mi).test.test(t) ? t : i ? e.options.trueStr : e.options.falseStr;
}
const Ii = {
  identify: (i) => i === !0,
  default: !0,
  tag: "tag:yaml.org,2002:bool",
  test: /^(?:Y|y|[Yy]es|YES|[Tt]rue|TRUE|[Oo]n|ON)$/,
  resolve: () => new F(!0),
  stringify: Ai
}, mi = {
  identify: (i) => i === !1,
  default: !0,
  tag: "tag:yaml.org,2002:bool",
  test: /^(?:N|n|[Nn]o|NO|[Ff]alse|FALSE|[Oo]ff|OFF)$/,
  resolve: () => new F(!1),
  stringify: Ai
}, Bn = {
  identify: (i) => typeof i == "number",
  default: !0,
  tag: "tag:yaml.org,2002:float",
  test: /^(?:[-+]?\.(?:inf|Inf|INF)|\.nan|\.NaN|\.NAN)$/,
  resolve: (i) => i.slice(-3).toLowerCase() === "nan" ? NaN : i[0] === "-" ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY,
  stringify: oe
}, Sn = {
  identify: (i) => typeof i == "number",
  default: !0,
  tag: "tag:yaml.org,2002:float",
  format: "EXP",
  test: /^[-+]?(?:[0-9][0-9_]*)?(?:\.[0-9_]*)?[eE][-+]?[0-9]+$/,
  resolve: (i) => parseFloat(i.replace(/_/g, "")),
  stringify(i) {
    const t = Number(i.value);
    return isFinite(t) ? t.toExponential() : oe(i);
  }
}, En = {
  identify: (i) => typeof i == "number",
  default: !0,
  tag: "tag:yaml.org,2002:float",
  test: /^[-+]?(?:[0-9][0-9_]*)?\.[0-9_]*$/,
  resolve(i) {
    const t = new F(parseFloat(i.replace(/_/g, ""))), e = i.indexOf(".");
    if (e !== -1) {
      const s = i.substring(e + 1).replace(/_/g, "");
      s[s.length - 1] === "0" && (t.minFractionDigits = s.length);
    }
    return t;
  },
  stringify: oe
}, tt = (i) => typeof i == "bigint" || Number.isInteger(i);
function Et(i, t, e, { intAsBigInt: s }) {
  const n = i[0];
  if ((n === "-" || n === "+") && (t += 1), i = i.substring(t).replace(/_/g, ""), s) {
    switch (e) {
      case 2:
        i = `0b${i}`;
        break;
      case 8:
        i = `0o${i}`;
        break;
      case 16:
        i = `0x${i}`;
        break;
    }
    const o = BigInt(i);
    return n === "-" ? BigInt(-1) * o : o;
  }
  const r = parseInt(i, e);
  return n === "-" ? -1 * r : r;
}
function rs(i, t, e) {
  const { value: s } = i;
  if (tt(s)) {
    const n = s.toString(t);
    return s < 0 ? "-" + e + n.substr(1) : e + n;
  }
  return oe(i);
}
const Fn = {
  identify: tt,
  default: !0,
  tag: "tag:yaml.org,2002:int",
  format: "BIN",
  test: /^[-+]?0b[0-1_]+$/,
  resolve: (i, t, e) => Et(i, 2, 2, e),
  stringify: (i) => rs(i, 2, "0b")
}, Gn = {
  identify: tt,
  default: !0,
  tag: "tag:yaml.org,2002:int",
  format: "OCT",
  test: /^[-+]?0[0-7_]+$/,
  resolve: (i, t, e) => Et(i, 1, 8, e),
  stringify: (i) => rs(i, 8, "0")
}, kn = {
  identify: tt,
  default: !0,
  tag: "tag:yaml.org,2002:int",
  test: /^[-+]?[0-9][0-9_]*$/,
  resolve: (i, t, e) => Et(i, 0, 10, e),
  stringify: oe
}, Ln = {
  identify: tt,
  default: !0,
  tag: "tag:yaml.org,2002:int",
  format: "HEX",
  test: /^[-+]?0x[0-9a-fA-F_]+$/,
  resolve: (i, t, e) => Et(i, 2, 16, e),
  stringify: (i) => rs(i, 16, "0x")
};
class Ye extends te {
  constructor(t) {
    super(t), this.tag = Ye.tag;
  }
  add(t) {
    let e;
    O(t) ? e = t : t && typeof t == "object" && "key" in t && "value" in t && t.value === null ? e = new U(t.key, null) : e = new U(t, null), ye(this.items, e.key) || this.items.push(e);
  }
  /**
   * If `keepPair` is `true`, returns the Pair matching `key`.
   * Otherwise, returns the value of that Pair's key.
   */
  get(t, e) {
    const s = ye(this.items, t);
    return !e && O(s) ? N(s.key) ? s.key.value : s.key : s;
  }
  set(t, e) {
    if (typeof e != "boolean")
      throw new Error(`Expected boolean value for set(key, value) in a YAML set, not ${typeof e}`);
    const s = ye(this.items, t);
    s && !e ? this.items.splice(this.items.indexOf(s), 1) : !s && e && this.items.push(new U(t));
  }
  toJSON(t, e) {
    return super.toJSON(t, e, Set);
  }
  toString(t, e, s) {
    if (!t)
      return JSON.stringify(this);
    if (this.hasAllNullValues(!0))
      return super.toString(Object.assign({}, t, { allNullValues: !0 }), e, s);
    throw new Error("Set items must all have null values");
  }
  static from(t, e, s) {
    const { replacer: n } = s, r = new this(t);
    if (e && Symbol.iterator in Object(e))
      for (let o of e)
        typeof n == "function" && (o = n.call(e, o, o)), r.items.push(qt(o, null, s));
    return r;
  }
}
Ye.tag = "tag:yaml.org,2002:set";
const os = {
  collection: "map",
  identify: (i) => i instanceof Set,
  nodeClass: Ye,
  default: !1,
  tag: "tag:yaml.org,2002:set",
  createNode: (i, t, e) => Ye.from(i, t, e),
  resolve(i, t) {
    if (qe(i)) {
      if (i.hasAllNullValues(!0))
        return Object.assign(new Ye(), i);
      t("Set items must all have null values");
    } else
      t("Expected a mapping for this tag");
    return i;
  }
};
function us(i, t) {
  const e = i[0], s = e === "-" || e === "+" ? i.substring(1) : i, n = (o) => t ? BigInt(o) : Number(o), r = s.replace(/_/g, "").split(":").reduce((o, u) => o * n(60) + n(u), n(0));
  return e === "-" ? n(-1) * r : r;
}
function Di(i) {
  let { value: t } = i, e = (o) => o;
  if (typeof t == "bigint")
    e = (o) => BigInt(o);
  else if (isNaN(t) || !isFinite(t))
    return oe(i);
  let s = "";
  t < 0 && (s = "-", t *= e(-1));
  const n = e(60), r = [t % n];
  return t < 60 ? r.unshift(0) : (t = (t - r[0]) / n, r.unshift(t % n), t >= 60 && (t = (t - r[0]) / n, r.unshift(t))), s + r.map((o) => String(o).padStart(2, "0")).join(":").replace(/000000\d*$/, "");
}
const wi = {
  identify: (i) => typeof i == "bigint" || Number.isInteger(i),
  default: !0,
  tag: "tag:yaml.org,2002:int",
  format: "TIME",
  test: /^[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+$/,
  resolve: (i, t, { intAsBigInt: e }) => us(i, e),
  stringify: Di
}, bi = {
  identify: (i) => typeof i == "number",
  default: !0,
  tag: "tag:yaml.org,2002:float",
  format: "TIME",
  test: /^[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+\.[0-9_]*$/,
  resolve: (i) => us(i, !1),
  stringify: Di
}, Ft = {
  identify: (i) => i instanceof Date,
  default: !0,
  tag: "tag:yaml.org,2002:timestamp",
  // If the time zone is omitted, the timestamp is assumed to be specified in UTC. The time part
  // may be omitted altogether, resulting in a date format. In such a case, the time part is
  // assumed to be 00:00:00Z (start of day, UTC).
  test: RegExp("^([0-9]{4})-([0-9]{1,2})-([0-9]{1,2})(?:(?:t|T|[ \\t]+)([0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2}(\\.[0-9]+)?)(?:[ \\t]*(Z|[-+][012]?[0-9](?::[0-9]{2})?))?)?$"),
  resolve(i) {
    const t = i.match(Ft.test);
    if (!t)
      throw new Error("!!timestamp expects a date, starting with yyyy-mm-dd");
    const [, e, s, n, r, o, u] = t.map(Number), a = t[7] ? Number((t[7] + "00").substr(1, 3)) : 0;
    let l = Date.UTC(e, s - 1, n, r || 0, o || 0, u || 0, a);
    const p = t[8];
    if (p && p !== "Z") {
      let h = us(p, !1);
      Math.abs(h) < 30 && (h *= 60), l -= 6e4 * h;
    }
    return new Date(l);
  },
  stringify: ({ value: i }) => i.toISOString().replace(/((T00:00)?:00)?\.000Z$/, "")
}, Cs = [
  Te,
  Ve,
  yt,
  Bt,
  Ii,
  mi,
  Fn,
  Gn,
  kn,
  Ln,
  Bn,
  Sn,
  En,
  ss,
  ns,
  is,
  os,
  wi,
  bi,
  Ft
], As = /* @__PURE__ */ new Map([
  ["core", Dn],
  ["failsafe", [Te, Ve, yt]],
  ["json", yn],
  ["yaml11", Cs],
  ["yaml-1.1", Cs]
]), Is = {
  binary: ss,
  bool: es,
  float: ci,
  floatExp: li,
  floatNaN: ai,
  floatTime: bi,
  int: di,
  intHex: pi,
  intOct: gi,
  intTime: wi,
  map: Te,
  null: Bt,
  omap: ns,
  pairs: is,
  seq: Ve,
  set: os,
  timestamp: Ft
}, Zn = {
  "tag:yaml.org,2002:binary": ss,
  "tag:yaml.org,2002:omap": ns,
  "tag:yaml.org,2002:pairs": is,
  "tag:yaml.org,2002:set": os,
  "tag:yaml.org,2002:timestamp": Ft
};
function Lt(i, t) {
  let e = As.get(t);
  if (!e)
    if (Array.isArray(i))
      e = [];
    else {
      const s = Array.from(As.keys()).filter((n) => n !== "yaml11").map((n) => JSON.stringify(n)).join(", ");
      throw new Error(`Unknown schema "${t}"; use one of ${s} or define customTags array`);
    }
  if (Array.isArray(i))
    for (const s of i)
      e = e.concat(s);
  else typeof i == "function" && (e = i(e.slice()));
  return e.map((s) => {
    if (typeof s != "string")
      return s;
    const n = Is[s];
    if (n)
      return n;
    const r = Object.keys(Is).map((o) => JSON.stringify(o)).join(", ");
    throw new Error(`Unknown custom tag "${s}"; use one of ${r}`);
  });
}
const _n = (i, t) => i.key < t.key ? -1 : i.key > t.key ? 1 : 0;
class as {
  constructor({ compat: t, customTags: e, merge: s, resolveKnownTags: n, schema: r, sortMapEntries: o, toStringDefaults: u }) {
    this.compat = Array.isArray(t) ? Lt(t, "compat") : t ? Lt(null, t) : null, this.merge = !!s, this.name = typeof r == "string" && r || "core", this.knownTags = n ? Zn : {}, this.tags = Lt(e, this.name), this.toStringOptions = u ?? null, Object.defineProperty(this, pe, { value: Te }), Object.defineProperty(this, de, { value: yt }), Object.defineProperty(this, Oe, { value: Ve }), this.sortMapEntries = typeof o == "function" ? o : o === !0 ? _n : null;
  }
  clone() {
    const t = Object.create(as.prototype, Object.getOwnPropertyDescriptors(this));
    return t.tags = this.tags.slice(), t;
  }
}
function vn(i, t) {
  var a;
  const e = [];
  let s = t.directives === !0;
  if (t.directives !== !1 && i.directives) {
    const l = i.directives.toString(i);
    l ? (e.push(l), s = !0) : i.directives.docStart && (s = !0);
  }
  s && e.push("---");
  const n = ni(i, t), { commentString: r } = n.options;
  if (i.commentBefore) {
    e.length !== 1 && e.unshift("");
    const l = r(i.commentBefore);
    e.unshift(he(l, ""));
  }
  let o = !1, u = null;
  if (i.contents) {
    if (H(i.contents)) {
      if (i.contents.spaceBefore && s && e.push(""), i.contents.commentBefore) {
        const h = r(i.contents.commentBefore);
        e.push(he(h, ""));
      }
      n.forceBlockIndent = !!i.comment, u = i.contents.comment;
    }
    const l = u ? void 0 : () => o = !0;
    let p = We(i.contents, n, () => u = null, l);
    u && (p += be(p, "", r(u))), (p[0] === "|" || p[0] === ">") && e[e.length - 1] === "---" ? e[e.length - 1] = `--- ${p}` : e.push(p);
  } else
    e.push(We(i.contents, n));
  if ((a = i.directives) != null && a.docEnd)
    if (i.comment) {
      const l = r(i.comment);
      l.includes(`
`) ? (e.push("..."), e.push(he(l, ""))) : e.push(`... ${l}`);
    } else
      e.push("...");
  else {
    let l = i.comment;
    l && o && (l = l.replace(/^\n+/, "")), l && ((!o || u) && e[e.length - 1] !== "" && e.push(""), e.push(he(r(l), "")));
  }
  return e.join(`
`) + `
`;
}
class st {
  constructor(t, e, s) {
    this.commentBefore = null, this.comment = null, this.errors = [], this.warnings = [], Object.defineProperty(this, ie, { value: Wt });
    let n = null;
    typeof e == "function" || Array.isArray(e) ? n = e : s === void 0 && e && (s = e, e = void 0);
    const r = Object.assign({
      intAsBigInt: !1,
      keepSourceTokens: !1,
      logLevel: "warn",
      prettyErrors: !0,
      strict: !0,
      uniqueKeys: !0,
      version: "1.2"
    }, s);
    this.options = r;
    let { version: o } = r;
    s != null && s._directives ? (this.directives = s._directives.atDocument(), this.directives.yaml.explicit && (o = this.directives.yaml.version)) : this.directives = new $({ version: o }), this.setSchema(o, s), this.contents = t === void 0 ? null : this.createNode(t, n, s);
  }
  /**
   * Create a deep copy of this Document and its contents.
   *
   * Custom Node values that inherit from `Object` still refer to their original instances.
   */
  clone() {
    const t = Object.create(st.prototype, {
      [ie]: { value: Wt }
    });
    return t.commentBefore = this.commentBefore, t.comment = this.comment, t.errors = this.errors.slice(), t.warnings = this.warnings.slice(), t.options = Object.assign({}, this.options), this.directives && (t.directives = this.directives.clone()), t.schema = this.schema.clone(), t.contents = H(this.contents) ? this.contents.clone(t.schema) : this.contents, this.range && (t.range = this.range.slice()), t;
  }
  /** Adds a value to the document. */
  add(t) {
    ke(this.contents) && this.contents.add(t);
  }
  /** Adds a value to the document. */
  addIn(t, e) {
    ke(this.contents) && this.contents.addIn(t, e);
  }
  /**
   * Create a new `Alias` node, ensuring that the target `node` has the required anchor.
   *
   * If `node` already has an anchor, `name` is ignored.
   * Otherwise, the `node.anchor` value will be set to `name`,
   * or if an anchor with that name is already present in the document,
   * `name` will be used as a prefix for a new unique anchor.
   * If `name` is undefined, the generated anchor will use 'a' as a prefix.
   */
  createAlias(t, e) {
    if (!t.anchor) {
      const s = ei(this);
      t.anchor = // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
      !e || s.has(e) ? ti(e || "a", s) : e;
    }
    return new xt(t.anchor);
  }
  createNode(t, e, s) {
    let n;
    if (typeof e == "function")
      t = e.call({ "": t }, "", t), n = e;
    else if (Array.isArray(e)) {
      const g = (m) => typeof m == "number" || m instanceof String || m instanceof Number, I = e.filter(g).map(String);
      I.length > 0 && (e = e.concat(I)), n = e;
    } else s === void 0 && e && (s = e, e = void 0);
    const { aliasDuplicateObjects: r, anchorPrefix: o, flow: u, keepUndefined: a, onTagObj: l, tag: p } = s ?? {}, { onAnchor: h, setAnchors: d, sourceObjects: A } = un(
      this,
      // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
      o || "a"
    ), w = {
      aliasDuplicateObjects: r ?? !0,
      keepUndefined: a ?? !1,
      onAnchor: h,
      onTagObj: l,
      replacer: n,
      schema: this.schema,
      sourceObjects: A
    }, c = ze(t, p, w);
    return u && R(c) && (c.flow = !0), d(), c;
  }
  /**
   * Convert a key and a value into a `Pair` using the current schema,
   * recursively wrapping all values as `Scalar` or `Collection` nodes.
   */
  createPair(t, e, s = {}) {
    const n = this.createNode(t, null, s), r = this.createNode(e, null, s);
    return new U(n, r);
  }
  /**
   * Removes a value from the document.
   * @returns `true` if the item was found and removed.
   */
  delete(t) {
    return ke(this.contents) ? this.contents.delete(t) : !1;
  }
  /**
   * Removes a value from the document.
   * @returns `true` if the item was found and removed.
   */
  deleteIn(t) {
    return Pe(t) ? this.contents == null ? !1 : (this.contents = null, !0) : ke(this.contents) ? this.contents.deleteIn(t) : !1;
  }
  /**
   * Returns item at `key`, or `undefined` if not found. By default unwraps
   * scalar values from their surrounding node; to disable set `keepScalar` to
   * `true` (collections are always returned intact).
   */
  get(t, e) {
    return R(this.contents) ? this.contents.get(t, e) : void 0;
  }
  /**
   * Returns item at `path`, or `undefined` if not found. By default unwraps
   * scalar values from their surrounding node; to disable set `keepScalar` to
   * `true` (collections are always returned intact).
   */
  getIn(t, e) {
    return Pe(t) ? !e && N(this.contents) ? this.contents.value : this.contents : R(this.contents) ? this.contents.getIn(t, e) : void 0;
  }
  /**
   * Checks if the document includes a value with the key `key`.
   */
  has(t) {
    return R(this.contents) ? this.contents.has(t) : !1;
  }
  /**
   * Checks if the document includes a value at `path`.
   */
  hasIn(t) {
    return Pe(t) ? this.contents !== void 0 : R(this.contents) ? this.contents.hasIn(t) : !1;
  }
  /**
   * Sets a value in this document. For `!!set`, `value` needs to be a
   * boolean to add/remove the item from the set.
   */
  set(t, e) {
    this.contents == null ? this.contents = pt(this.schema, [t], e) : ke(this.contents) && this.contents.set(t, e);
  }
  /**
   * Sets a value in this document. For `!!set`, `value` needs to be a
   * boolean to add/remove the item from the set.
   */
  setIn(t, e) {
    Pe(t) ? this.contents = e : this.contents == null ? this.contents = pt(this.schema, Array.from(t), e) : ke(this.contents) && this.contents.setIn(t, e);
  }
  /**
   * Change the YAML version and schema used by the document.
   * A `null` version disables support for directives, explicit tags, anchors, and aliases.
   * It also requires the `schema` option to be given as a `Schema` instance value.
   *
   * Overrides all previously set schema options.
   */
  setSchema(t, e = {}) {
    typeof t == "number" && (t = String(t));
    let s;
    switch (t) {
      case "1.1":
        this.directives ? this.directives.yaml.version = "1.1" : this.directives = new $({ version: "1.1" }), s = { merge: !0, resolveKnownTags: !1, schema: "yaml-1.1" };
        break;
      case "1.2":
      case "next":
        this.directives ? this.directives.yaml.version = t : this.directives = new $({ version: t }), s = { merge: !1, resolveKnownTags: !0, schema: "core" };
        break;
      case null:
        this.directives && delete this.directives, s = null;
        break;
      default: {
        const n = JSON.stringify(t);
        throw new Error(`Expected '1.1', '1.2' or null as first argument, but found: ${n}`);
      }
    }
    if (e.schema instanceof Object)
      this.schema = e.schema;
    else if (s)
      this.schema = new as(Object.assign(s, e));
    else
      throw new Error("With a null YAML version, the { schema: Schema } option is required");
  }
  // json & jsonArg are only used from toJSON()
  toJS({ json: t, jsonArg: e, mapAsMap: s, maxAliasCount: n, onAnchor: r, reviver: o } = {}) {
    const u = {
      anchors: /* @__PURE__ */ new Map(),
      doc: this,
      keep: !t,
      mapAsMap: s === !0,
      mapKeyWarned: !1,
      maxAliasCount: typeof n == "number" ? n : 100
    }, a = se(this.contents, e ?? "", u);
    if (typeof r == "function")
      for (const { count: l, res: p } of u.anchors.values())
        r(p, l);
    return typeof o == "function" ? _e(o, { "": a }, "", a) : a;
  }
  /**
   * A JSON representation of the document `contents`.
   *
   * @param jsonArg Used by `JSON.stringify` to indicate the array index or
   *   property name.
   */
  toJSON(t, e) {
    return this.toJS({ json: !0, jsonArg: t, mapAsMap: !1, onAnchor: e });
  }
  /** A YAML representation of the document. */
  toString(t = {}) {
    if (this.errors.length > 0)
      throw new Error("Document with errors cannot be stringified");
    if ("indent" in t && (!Number.isInteger(t.indent) || Number(t.indent) <= 0)) {
      const e = JSON.stringify(t.indent);
      throw new Error(`"indent" option must be a positive integer, not ${e}`);
    }
    return vn(this, t);
  }
}
function ke(i) {
  if (R(i))
    return !0;
  throw new Error("Expected a YAML collection as document contents");
}
class yi extends Error {
  constructor(t, e, s, n) {
    super(), this.name = t, this.code = s, this.message = n, this.pos = e;
  }
}
class Me extends yi {
  constructor(t, e, s) {
    super("YAMLParseError", t, e, s);
  }
}
class Nn extends yi {
  constructor(t, e, s) {
    super("YAMLWarning", t, e, s);
  }
}
const ms = (i, t) => (e) => {
  if (e.pos[0] === -1)
    return;
  e.linePos = e.pos.map((u) => t.linePos(u));
  const { line: s, col: n } = e.linePos[0];
  e.message += ` at line ${s}, column ${n}`;
  let r = n - 1, o = i.substring(t.lineStarts[s - 1], t.lineStarts[s]).replace(/[\n\r]+$/, "");
  if (r >= 60 && o.length > 80) {
    const u = Math.min(r - 39, o.length - 79);
    o = "…" + o.substring(u), r -= u - 1;
  }
  if (o.length > 80 && (o = o.substring(0, 79) + "…"), s > 1 && /^ *$/.test(o.substring(0, r))) {
    let u = i.substring(t.lineStarts[s - 2], t.lineStarts[s - 1]);
    u.length > 80 && (u = u.substring(0, 79) + `…
`), o = u + o;
  }
  if (/[^ ]/.test(o)) {
    let u = 1;
    const a = e.linePos[1];
    a && a.line === s && a.col > n && (u = Math.max(1, Math.min(a.col - n, 80 - r)));
    const l = " ".repeat(r) + "^".repeat(u);
    e.message += `:

${o}
${l}
`;
  }
};
function Re(i, { flow: t, indicator: e, next: s, offset: n, onError: r, parentIndent: o, startOnNewline: u }) {
  let a = !1, l = u, p = u, h = "", d = "", A = !1, w = !1, c = !1, g = null, I = null, m = null, b = null, D = null, y = null;
  for (const S of i)
    switch (c && (S.type !== "space" && S.type !== "newline" && S.type !== "comma" && r(S.offset, "MISSING_CHAR", "Tags and anchors must be separated from the next token by white space"), c = !1), g && (l && S.type !== "comment" && S.type !== "newline" && r(g, "TAB_AS_INDENT", "Tabs are not allowed as indentation"), g = null), S.type) {
      case "space":
        !t && (e !== "doc-start" || (s == null ? void 0 : s.type) !== "flow-collection") && S.source.includes("	") && (g = S), p = !0;
        break;
      case "comment": {
        p || r(S, "MISSING_CHAR", "Comments must be separated from other tokens by white space characters");
        const T = S.source.substring(1) || " ";
        h ? h += d + T : h = T, d = "", l = !1;
        break;
      }
      case "newline":
        l ? h ? h += S.source : a = !0 : d += S.source, l = !0, A = !0, (I || m) && (w = !0), p = !0;
        break;
      case "anchor":
        I && r(S, "MULTIPLE_ANCHORS", "A node can have at most one anchor"), S.source.endsWith(":") && r(S.offset + S.source.length - 1, "BAD_ALIAS", "Anchor ending in : is ambiguous", !0), I = S, y === null && (y = S.offset), l = !1, p = !1, c = !0;
        break;
      case "tag": {
        m && r(S, "MULTIPLE_TAGS", "A node can have at most one tag"), m = S, y === null && (y = S.offset), l = !1, p = !1, c = !0;
        break;
      }
      case e:
        (I || m) && r(S, "BAD_PROP_ORDER", `Anchors and tags must be after the ${S.source} indicator`), D && r(S, "UNEXPECTED_TOKEN", `Unexpected ${S.source} in ${t ?? "collection"}`), D = S, l = e === "seq-item-ind" || e === "explicit-key-ind", p = !1;
        break;
      case "comma":
        if (t) {
          b && r(S, "UNEXPECTED_TOKEN", `Unexpected , in ${t}`), b = S, l = !1, p = !1;
          break;
        }
      default:
        r(S, "UNEXPECTED_TOKEN", `Unexpected ${S.type} token`), l = !1, p = !1;
    }
  const B = i[i.length - 1], K = B ? B.offset + B.source.length : n;
  return c && s && s.type !== "space" && s.type !== "newline" && s.type !== "comma" && (s.type !== "scalar" || s.source !== "") && r(s.offset, "MISSING_CHAR", "Tags and anchors must be separated from the next token by white space"), g && (l && g.indent <= o || (s == null ? void 0 : s.type) === "block-map" || (s == null ? void 0 : s.type) === "block-seq") && r(g, "TAB_AS_INDENT", "Tabs are not allowed as indentation"), {
    comma: b,
    found: D,
    spaceBefore: a,
    comment: h,
    hasNewline: A,
    hasNewlineAfterProp: w,
    anchor: I,
    tag: m,
    end: K,
    start: y ?? K
  };
}
function Qe(i) {
  if (!i)
    return null;
  switch (i.type) {
    case "alias":
    case "scalar":
    case "double-quoted-scalar":
    case "single-quoted-scalar":
      if (i.source.includes(`
`))
        return !0;
      if (i.end) {
        for (const t of i.end)
          if (t.type === "newline")
            return !0;
      }
      return !1;
    case "flow-collection":
      for (const t of i.items) {
        for (const e of t.start)
          if (e.type === "newline")
            return !0;
        if (t.sep) {
          for (const e of t.sep)
            if (e.type === "newline")
              return !0;
        }
        if (Qe(t.key) || Qe(t.value))
          return !0;
      }
      return !1;
    default:
      return !0;
  }
}
function Tt(i, t, e) {
  if ((t == null ? void 0 : t.type) === "flow-collection") {
    const s = t.end[0];
    s.indent === i && (s.source === "]" || s.source === "}") && Qe(t) && e(s, "BAD_INDENT", "Flow end indicator should be more indented than parent", !0);
  }
}
function Bi(i, t, e) {
  const { uniqueKeys: s } = i.options;
  if (s === !1)
    return !1;
  const n = typeof s == "function" ? s : (r, o) => r === o || N(r) && N(o) && r.value === o.value && !(r.value === "<<" && i.schema.merge);
  return t.some((r) => n(r.key, e));
}
const Ds = "All mapping items must start at the same column";
function Kn({ composeNode: i, composeEmptyNode: t }, e, s, n, r) {
  var p;
  const o = (r == null ? void 0 : r.nodeClass) ?? te, u = new o(e.schema);
  e.atRoot && (e.atRoot = !1);
  let a = s.offset, l = null;
  for (const h of s.items) {
    const { start: d, key: A, sep: w, value: c } = h, g = Re(d, {
      indicator: "explicit-key-ind",
      next: A ?? (w == null ? void 0 : w[0]),
      offset: a,
      onError: n,
      parentIndent: s.indent,
      startOnNewline: !0
    }), I = !g.found;
    if (I) {
      if (A && (A.type === "block-seq" ? n(a, "BLOCK_AS_IMPLICIT_KEY", "A block sequence may not be used as an implicit map key") : "indent" in A && A.indent !== s.indent && n(a, "BAD_INDENT", Ds)), !g.anchor && !g.tag && !w) {
        l = g.end, g.comment && (u.comment ? u.comment += `
` + g.comment : u.comment = g.comment);
        continue;
      }
      (g.hasNewlineAfterProp || Qe(A)) && n(A ?? d[d.length - 1], "MULTILINE_IMPLICIT_KEY", "Implicit keys need to be on a single line");
    } else ((p = g.found) == null ? void 0 : p.indent) !== s.indent && n(a, "BAD_INDENT", Ds);
    const m = g.end, b = A ? i(e, A, g, n) : t(e, m, d, null, g, n);
    e.schema.compat && Tt(s.indent, A, n), Bi(e, u.items, b) && n(m, "DUPLICATE_KEY", "Map keys must be unique");
    const D = Re(w ?? [], {
      indicator: "map-value-ind",
      next: c,
      offset: b.range[2],
      onError: n,
      parentIndent: s.indent,
      startOnNewline: !A || A.type === "block-scalar"
    });
    if (a = D.end, D.found) {
      I && ((c == null ? void 0 : c.type) === "block-map" && !D.hasNewline && n(a, "BLOCK_AS_IMPLICIT_KEY", "Nested mappings are not allowed in compact mappings"), e.options.strict && g.start < D.found.offset - 1024 && n(b.range, "KEY_OVER_1024_CHARS", "The : indicator must be at most 1024 chars after the start of an implicit block mapping key"));
      const y = c ? i(e, c, D, n) : t(e, a, w, null, D, n);
      e.schema.compat && Tt(s.indent, c, n), a = y.range[2];
      const B = new U(b, y);
      e.options.keepSourceTokens && (B.srcToken = h), u.items.push(B);
    } else {
      I && n(b.range, "MISSING_CHAR", "Implicit map keys need to be followed by map values"), D.comment && (b.comment ? b.comment += `
` + D.comment : b.comment = D.comment);
      const y = new U(b);
      e.options.keepSourceTokens && (y.srcToken = h), u.items.push(y);
    }
  }
  return l && l < a && n(l, "IMPOSSIBLE", "Map comment with trailing content"), u.range = [s.offset, a, l ?? a], u;
}
function Yn({ composeNode: i, composeEmptyNode: t }, e, s, n, r) {
  const o = (r == null ? void 0 : r.nodeClass) ?? Ee, u = new o(e.schema);
  e.atRoot && (e.atRoot = !1);
  let a = s.offset, l = null;
  for (const { start: p, value: h } of s.items) {
    const d = Re(p, {
      indicator: "seq-item-ind",
      next: h,
      offset: a,
      onError: n,
      parentIndent: s.indent,
      startOnNewline: !0
    });
    if (!d.found)
      if (d.anchor || d.tag || h)
        h && h.type === "block-seq" ? n(d.end, "BAD_INDENT", "All sequence items must start at the same column") : n(a, "MISSING_CHAR", "Sequence item without - indicator");
      else {
        l = d.end, d.comment && (u.comment = d.comment);
        continue;
      }
    const A = h ? i(e, h, d, n) : t(e, d.end, p, null, d, n);
    e.schema.compat && Tt(s.indent, h, n), a = A.range[2], u.items.push(A);
  }
  return u.range = [s.offset, a, l ?? a], u;
}
function it(i, t, e, s) {
  let n = "";
  if (i) {
    let r = !1, o = "";
    for (const u of i) {
      const { source: a, type: l } = u;
      switch (l) {
        case "space":
          r = !0;
          break;
        case "comment": {
          e && !r && s(u, "MISSING_CHAR", "Comments must be separated from other tokens by white space characters");
          const p = a.substring(1) || " ";
          n ? n += o + p : n = p, o = "";
          break;
        }
        case "newline":
          n && (o += a), r = !0;
          break;
        default:
          s(u, "UNEXPECTED_TOKEN", `Unexpected ${l} at node end`);
      }
      t += a.length;
    }
  }
  return { comment: n, offset: t };
}
const Zt = "Block collections are not allowed within flow collections", _t = (i) => i && (i.type === "block-map" || i.type === "block-seq");
function Wn({ composeNode: i, composeEmptyNode: t }, e, s, n, r) {
  const o = s.start.source === "{", u = o ? "flow map" : "flow sequence", a = (r == null ? void 0 : r.nodeClass) ?? (o ? te : Ee), l = new a(e.schema);
  l.flow = !0;
  const p = e.atRoot;
  p && (e.atRoot = !1);
  let h = s.offset + s.start.source.length;
  for (let g = 0; g < s.items.length; ++g) {
    const I = s.items[g], { start: m, key: b, sep: D, value: y } = I, B = Re(m, {
      flow: u,
      indicator: "explicit-key-ind",
      next: b ?? (D == null ? void 0 : D[0]),
      offset: h,
      onError: n,
      parentIndent: s.indent,
      startOnNewline: !1
    });
    if (!B.found) {
      if (!B.anchor && !B.tag && !D && !y) {
        g === 0 && B.comma ? n(B.comma, "UNEXPECTED_TOKEN", `Unexpected , in ${u}`) : g < s.items.length - 1 && n(B.start, "UNEXPECTED_TOKEN", `Unexpected empty item in ${u}`), B.comment && (l.comment ? l.comment += `
` + B.comment : l.comment = B.comment), h = B.end;
        continue;
      }
      !o && e.options.strict && Qe(b) && n(
        b,
        // checked by containsNewline()
        "MULTILINE_IMPLICIT_KEY",
        "Implicit keys of flow sequence pairs need to be on a single line"
      );
    }
    if (g === 0)
      B.comma && n(B.comma, "UNEXPECTED_TOKEN", `Unexpected , in ${u}`);
    else if (B.comma || n(B.start, "MISSING_CHAR", `Missing , between ${u} items`), B.comment) {
      let K = "";
      e: for (const S of m)
        switch (S.type) {
          case "comma":
          case "space":
            break;
          case "comment":
            K = S.source.substring(1);
            break e;
          default:
            break e;
        }
      if (K) {
        let S = l.items[l.items.length - 1];
        O(S) && (S = S.value ?? S.key), S.comment ? S.comment += `
` + K : S.comment = K, B.comment = B.comment.substring(K.length + 1);
      }
    }
    if (!o && !D && !B.found) {
      const K = y ? i(e, y, B, n) : t(e, B.end, D, null, B, n);
      l.items.push(K), h = K.range[2], _t(y) && n(K.range, "BLOCK_IN_FLOW", Zt);
    } else {
      const K = B.end, S = b ? i(e, b, B, n) : t(e, K, m, null, B, n);
      _t(b) && n(S.range, "BLOCK_IN_FLOW", Zt);
      const T = Re(D ?? [], {
        flow: u,
        indicator: "map-value-ind",
        next: y,
        offset: S.range[2],
        onError: n,
        parentIndent: s.indent,
        startOnNewline: !1
      });
      if (T.found) {
        if (!o && !B.found && e.options.strict) {
          if (D)
            for (const V of D) {
              if (V === T.found)
                break;
              if (V.type === "newline") {
                n(V, "MULTILINE_IMPLICIT_KEY", "Implicit keys of flow sequence pairs need to be on a single line");
                break;
              }
            }
          B.start < T.found.offset - 1024 && n(T.found, "KEY_OVER_1024_CHARS", "The : indicator must be at most 1024 chars after the start of an implicit flow sequence key");
        }
      } else y && ("source" in y && y.source && y.source[0] === ":" ? n(y, "MISSING_CHAR", `Missing space after : in ${u}`) : n(T.start, "MISSING_CHAR", `Missing , or : between ${u} items`));
      const Ce = y ? i(e, y, T, n) : T.found ? t(e, T.end, D, null, T, n) : null;
      Ce ? _t(y) && n(Ce.range, "BLOCK_IN_FLOW", Zt) : T.comment && (S.comment ? S.comment += `
` + T.comment : S.comment = T.comment);
      const Ge = new U(S, Ce);
      if (e.options.keepSourceTokens && (Ge.srcToken = I), o) {
        const V = l;
        Bi(e, V.items, S) && n(K, "DUPLICATE_KEY", "Map keys must be unique"), V.items.push(Ge);
      } else {
        const V = new te(e.schema);
        V.flow = !0, V.items.push(Ge), l.items.push(V);
      }
      h = Ce ? Ce.range[2] : T.end;
    }
  }
  const d = o ? "}" : "]", [A, ...w] = s.end;
  let c = h;
  if (A && A.source === d)
    c = A.offset + A.source.length;
  else {
    const g = u[0].toUpperCase() + u.substring(1), I = p ? `${g} must end with a ${d}` : `${g} in block collection must be sufficiently indented and end with a ${d}`;
    n(h, p ? "MISSING_CHAR" : "BAD_INDENT", I), A && A.source.length !== 1 && w.unshift(A);
  }
  if (w.length > 0) {
    const g = it(w, c, e.options.strict, n);
    g.comment && (l.comment ? l.comment += `
` + g.comment : l.comment = g.comment), l.range = [s.offset, c, g.offset];
  } else
    l.range = [s.offset, c, c];
  return l;
}
function vt(i, t, e, s, n, r) {
  const o = e.type === "block-map" ? Kn(i, t, e, s, r) : e.type === "block-seq" ? Yn(i, t, e, s, r) : Wn(i, t, e, s, r), u = o.constructor;
  return n === "!" || n === u.tagName ? (o.tag = u.tagName, o) : (n && (o.tag = n), o);
}
function Rn(i, t, e, s, n) {
  var h;
  const r = s ? t.directives.tagName(s.source, (d) => n(s, "TAG_RESOLVE_FAILED", d)) : null, o = e.type === "block-map" ? "map" : e.type === "block-seq" ? "seq" : e.start.source === "{" ? "map" : "seq";
  if (!s || !r || r === "!" || r === te.tagName && o === "map" || r === Ee.tagName && o === "seq" || !o)
    return vt(i, t, e, n, r);
  let u = t.schema.tags.find((d) => d.tag === r && d.collection === o);
  if (!u) {
    const d = t.schema.knownTags[r];
    if (d && d.collection === o)
      t.schema.tags.push(Object.assign({}, d, { default: !1 })), u = d;
    else
      return d != null && d.collection ? n(s, "BAD_COLLECTION_TYPE", `${d.tag} used for ${o} collection, but expects ${d.collection}`, !0) : n(s, "TAG_RESOLVE_FAILED", `Unresolved tag: ${r}`, !0), vt(i, t, e, n, r);
  }
  const a = vt(i, t, e, n, r, u), l = ((h = u.resolve) == null ? void 0 : h.call(u, a, (d) => n(s, "TAG_RESOLVE_FAILED", d), t.options)) ?? a, p = H(l) ? l : new F(l);
  return p.range = a.range, p.tag = r, u != null && u.format && (p.format = u.format), p;
}
function On(i, t, e) {
  const s = t.offset, n = Hn(t, i.options.strict, e);
  if (!n)
    return { value: "", type: null, comment: "", range: [s, s, s] };
  const r = n.mode === ">" ? F.BLOCK_FOLDED : F.BLOCK_LITERAL, o = t.source ? Tn(t.source) : [];
  let u = o.length;
  for (let c = o.length - 1; c >= 0; --c) {
    const g = o[c][1];
    if (g === "" || g === "\r")
      u = c;
    else
      break;
  }
  if (u === 0) {
    const c = n.chomp === "+" && o.length > 0 ? `
`.repeat(Math.max(1, o.length - 1)) : "";
    let g = s + n.length;
    return t.source && (g += t.source.length), { value: c, type: r, comment: n.comment, range: [s, g, g] };
  }
  let a = t.indent + n.indent, l = t.offset + n.length, p = 0;
  for (let c = 0; c < u; ++c) {
    const [g, I] = o[c];
    if (I === "" || I === "\r")
      n.indent === 0 && g.length > a && (a = g.length);
    else {
      g.length < a && e(l + g.length, "MISSING_CHAR", "Block scalars with more-indented leading empty lines must use an explicit indentation indicator"), n.indent === 0 && (a = g.length), p = c, a === 0 && !i.atRoot && e(l, "BAD_INDENT", "Block scalar values in collections must be indented");
      break;
    }
    l += g.length + I.length + 1;
  }
  for (let c = o.length - 1; c >= u; --c)
    o[c][0].length > a && (u = c + 1);
  let h = "", d = "", A = !1;
  for (let c = 0; c < p; ++c)
    h += o[c][0].slice(a) + `
`;
  for (let c = p; c < u; ++c) {
    let [g, I] = o[c];
    l += g.length + I.length + 1;
    const m = I[I.length - 1] === "\r";
    if (m && (I = I.slice(0, -1)), I && g.length < a) {
      const D = `Block scalar lines must not be less indented than their ${n.indent ? "explicit indentation indicator" : "first line"}`;
      e(l - I.length - (m ? 2 : 1), "BAD_INDENT", D), g = "";
    }
    r === F.BLOCK_LITERAL ? (h += d + g.slice(a) + I, d = `
`) : g.length > a || I[0] === "	" ? (d === " " ? d = `
` : !A && d === `
` && (d = `

`), h += d + g.slice(a) + I, d = `
`, A = !0) : I === "" ? d === `
` ? h += `
` : d = `
` : (h += d + I, d = " ", A = !1);
  }
  switch (n.chomp) {
    case "-":
      break;
    case "+":
      for (let c = u; c < o.length; ++c)
        h += `
` + o[c][0].slice(a);
      h[h.length - 1] !== `
` && (h += `
`);
      break;
    default:
      h += `
`;
  }
  const w = s + n.length + t.source.length;
  return { value: h, type: r, comment: n.comment, range: [s, w, w] };
}
function Hn({ offset: i, props: t }, e, s) {
  if (t[0].type !== "block-scalar-header")
    return s(t[0], "IMPOSSIBLE", "Block scalar header not found"), null;
  const { source: n } = t[0], r = n[0];
  let o = 0, u = "", a = -1;
  for (let d = 1; d < n.length; ++d) {
    const A = n[d];
    if (!u && (A === "-" || A === "+"))
      u = A;
    else {
      const w = Number(A);
      !o && w ? o = w : a === -1 && (a = i + d);
    }
  }
  a !== -1 && s(a, "UNEXPECTED_TOKEN", `Block scalar header includes extra characters: ${n}`);
  let l = !1, p = "", h = n.length;
  for (let d = 1; d < t.length; ++d) {
    const A = t[d];
    switch (A.type) {
      case "space":
        l = !0;
      case "newline":
        h += A.source.length;
        break;
      case "comment":
        e && !l && s(A, "MISSING_CHAR", "Comments must be separated from other tokens by white space characters"), h += A.source.length, p = A.source.substring(1);
        break;
      case "error":
        s(A, "UNEXPECTED_TOKEN", A.message), h += A.source.length;
        break;
      default: {
        const w = `Unexpected token in block scalar header: ${A.type}`;
        s(A, "UNEXPECTED_TOKEN", w);
        const c = A.source;
        c && typeof c == "string" && (h += c.length);
      }
    }
  }
  return { mode: r, indent: o, chomp: u, comment: p, length: h };
}
function Tn(i) {
  const t = i.split(/\n( *)/), e = t[0], s = e.match(/^( *)/), r = [s != null && s[1] ? [s[1], e.slice(s[1].length)] : ["", e]];
  for (let o = 1; o < t.length; o += 2)
    r.push([t[o], t[o + 1]]);
  return r;
}
function Vn(i, t, e) {
  const { offset: s, type: n, source: r, end: o } = i;
  let u, a;
  const l = (d, A, w) => e(s + d, A, w);
  switch (n) {
    case "scalar":
      u = F.PLAIN, a = Xn(r, l);
      break;
    case "single-quoted-scalar":
      u = F.QUOTE_SINGLE, a = Pn(r, l);
      break;
    case "double-quoted-scalar":
      u = F.QUOTE_DOUBLE, a = Mn(r, l);
      break;
    default:
      return e(i, "UNEXPECTED_TOKEN", `Expected a flow scalar value, but found: ${n}`), {
        value: "",
        type: null,
        comment: "",
        range: [s, s + r.length, s + r.length]
      };
  }
  const p = s + r.length, h = it(o, p, t, e);
  return {
    value: a,
    type: u,
    comment: h.comment,
    range: [s, p, h.offset]
  };
}
function Xn(i, t) {
  let e = "";
  switch (i[0]) {
    case "	":
      e = "a tab character";
      break;
    case ",":
      e = "flow indicator character ,";
      break;
    case "%":
      e = "directive indicator character %";
      break;
    case "|":
    case ">": {
      e = `block scalar indicator ${i[0]}`;
      break;
    }
    case "@":
    case "`": {
      e = `reserved character ${i[0]}`;
      break;
    }
  }
  return e && t(0, "BAD_SCALAR_START", `Plain value cannot start with ${e}`), Si(i);
}
function Pn(i, t) {
  return (i[i.length - 1] !== "'" || i.length === 1) && t(i.length, "MISSING_CHAR", "Missing closing 'quote"), Si(i.slice(1, -1)).replace(/''/g, "'");
}
function Si(i) {
  let t, e;
  try {
    t = new RegExp(`(.*?)(?<![ 	])[ 	]*\r?
`, "sy"), e = new RegExp(`[ 	]*(.*?)(?:(?<![ 	])[ 	]*)?\r?
`, "sy");
  } catch {
    t = /(.*?)[ \t]*\r?\n/sy, e = /[ \t]*(.*?)[ \t]*\r?\n/sy;
  }
  let s = t.exec(i);
  if (!s)
    return i;
  let n = s[1], r = " ", o = t.lastIndex;
  for (e.lastIndex = o; s = e.exec(i); )
    s[1] === "" ? r === `
` ? n += r : r = `
` : (n += r + s[1], r = " "), o = e.lastIndex;
  const u = /[ \t]*(.*)/sy;
  return u.lastIndex = o, s = u.exec(i), n + r + ((s == null ? void 0 : s[1]) ?? "");
}
function Mn(i, t) {
  let e = "";
  for (let s = 1; s < i.length - 1; ++s) {
    const n = i[s];
    if (!(n === "\r" && i[s + 1] === `
`))
      if (n === `
`) {
        const { fold: r, offset: o } = $n(i, s);
        e += r, s = o;
      } else if (n === "\\") {
        let r = i[++s];
        const o = Jn[r];
        if (o)
          e += o;
        else if (r === `
`)
          for (r = i[s + 1]; r === " " || r === "	"; )
            r = i[++s + 1];
        else if (r === "\r" && i[s + 1] === `
`)
          for (r = i[++s + 1]; r === " " || r === "	"; )
            r = i[++s + 1];
        else if (r === "x" || r === "u" || r === "U") {
          const u = { x: 2, u: 4, U: 8 }[r];
          e += Un(i, s + 1, u, t), s += u;
        } else {
          const u = i.substr(s - 1, 2);
          t(s - 1, "BAD_DQ_ESCAPE", `Invalid escape sequence ${u}`), e += u;
        }
      } else if (n === " " || n === "	") {
        const r = s;
        let o = i[s + 1];
        for (; o === " " || o === "	"; )
          o = i[++s + 1];
        o !== `
` && !(o === "\r" && i[s + 2] === `
`) && (e += s > r ? i.slice(r, s + 1) : n);
      } else
        e += n;
  }
  return (i[i.length - 1] !== '"' || i.length === 1) && t(i.length, "MISSING_CHAR", 'Missing closing "quote'), e;
}
function $n(i, t) {
  let e = "", s = i[t + 1];
  for (; (s === " " || s === "	" || s === `
` || s === "\r") && !(s === "\r" && i[t + 2] !== `
`); )
    s === `
` && (e += `
`), t += 1, s = i[t + 1];
  return e || (e = " "), { fold: e, offset: t };
}
const Jn = {
  0: "\0",
  // null character
  a: "\x07",
  // bell character
  b: "\b",
  // backspace
  e: "\x1B",
  // escape character
  f: "\f",
  // form feed
  n: `
`,
  // line feed
  r: "\r",
  // carriage return
  t: "	",
  // horizontal tab
  v: "\v",
  // vertical tab
  N: "",
  // Unicode next line
  _: " ",
  // Unicode non-breaking space
  L: "\u2028",
  // Unicode line separator
  P: "\u2029",
  // Unicode paragraph separator
  " ": " ",
  '"': '"',
  "/": "/",
  "\\": "\\",
  "	": "	"
};
function Un(i, t, e, s) {
  const n = i.substr(t, e), o = n.length === e && /^[0-9a-fA-F]+$/.test(n) ? parseInt(n, 16) : NaN;
  if (isNaN(o)) {
    const u = i.substr(t - 2, e + 2);
    return s(t - 2, "BAD_DQ_ESCAPE", `Invalid escape sequence ${u}`), u;
  }
  return String.fromCodePoint(o);
}
function Ei(i, t, e, s) {
  const { value: n, type: r, comment: o, range: u } = t.type === "block-scalar" ? On(i, t, s) : Vn(t, i.options.strict, s), a = e ? i.directives.tagName(e.source, (h) => s(e, "TAG_RESOLVE_FAILED", h)) : null, l = e && a ? jn(i.schema, n, a, e, s) : t.type === "scalar" ? xn(i, n, t, s) : i.schema[de];
  let p;
  try {
    const h = l.resolve(n, (d) => s(e ?? t, "TAG_RESOLVE_FAILED", d), i.options);
    p = N(h) ? h : new F(h);
  } catch (h) {
    const d = h instanceof Error ? h.message : String(h);
    s(e ?? t, "TAG_RESOLVE_FAILED", d), p = new F(n);
  }
  return p.range = u, p.source = n, r && (p.type = r), a && (p.tag = a), l.format && (p.format = l.format), o && (p.comment = o), p;
}
function jn(i, t, e, s, n) {
  var u;
  if (e === "!")
    return i[de];
  const r = [];
  for (const a of i.tags)
    if (!a.collection && a.tag === e)
      if (a.default && a.test)
        r.push(a);
      else
        return a;
  for (const a of r)
    if ((u = a.test) != null && u.test(t))
      return a;
  const o = i.knownTags[e];
  return o && !o.collection ? (i.tags.push(Object.assign({}, o, { default: !1, test: void 0 })), o) : (n(s, "TAG_RESOLVE_FAILED", `Unresolved tag: ${e}`, e !== "tag:yaml.org,2002:str"), i[de]);
}
function xn({ directives: i, schema: t }, e, s, n) {
  const r = t.tags.find((o) => {
    var u;
    return o.default && ((u = o.test) == null ? void 0 : u.test(e));
  }) || t[de];
  if (t.compat) {
    const o = t.compat.find((u) => {
      var a;
      return u.default && ((a = u.test) == null ? void 0 : a.test(e));
    }) ?? t[de];
    if (r.tag !== o.tag) {
      const u = i.tagString(r.tag), a = i.tagString(o.tag), l = `Value may be parsed as either ${u} or ${a}`;
      n(s, "TAG_RESOLVE_FAILED", l, !0);
    }
  }
  return r;
}
function zn(i, t, e) {
  if (t) {
    e === null && (e = t.length);
    for (let s = e - 1; s >= 0; --s) {
      let n = t[s];
      switch (n.type) {
        case "space":
        case "comment":
        case "newline":
          i -= n.source.length;
          continue;
      }
      for (n = t[++s]; (n == null ? void 0 : n.type) === "space"; )
        i += n.source.length, n = t[++s];
      break;
    }
  }
  return i;
}
const Qn = { composeNode: Fi, composeEmptyNode: ls };
function Fi(i, t, e, s) {
  const { spaceBefore: n, comment: r, anchor: o, tag: u } = e;
  let a, l = !0;
  switch (t.type) {
    case "alias":
      a = qn(i, t, s), (o || u) && s(t, "ALIAS_PROPS", "An alias node must not specify any properties");
      break;
    case "scalar":
    case "single-quoted-scalar":
    case "double-quoted-scalar":
    case "block-scalar":
      a = Ei(i, t, u, s), o && (a.anchor = o.source.substring(1));
      break;
    case "block-map":
    case "block-seq":
    case "flow-collection":
      a = Rn(Qn, i, t, u, s), o && (a.anchor = o.source.substring(1));
      break;
    default: {
      const p = t.type === "error" ? t.message : `Unsupported token (type: ${t.type})`;
      s(t, "UNEXPECTED_TOKEN", p), a = ls(i, t.offset, void 0, null, e, s), l = !1;
    }
  }
  return o && a.anchor === "" && s(o, "BAD_ALIAS", "Anchor cannot be an empty string"), n && (a.spaceBefore = !0), r && (t.type === "scalar" && t.source === "" ? a.comment = r : a.commentBefore = r), i.options.keepSourceTokens && l && (a.srcToken = t), a;
}
function ls(i, t, e, s, { spaceBefore: n, comment: r, anchor: o, tag: u, end: a }, l) {
  const p = {
    type: "scalar",
    offset: zn(t, e, s),
    indent: -1,
    source: ""
  }, h = Ei(i, p, u, l);
  return o && (h.anchor = o.source.substring(1), h.anchor === "" && l(o, "BAD_ALIAS", "Anchor cannot be an empty string")), n && (h.spaceBefore = !0), r && (h.comment = r, h.range[2] = a), h;
}
function qn({ options: i }, { offset: t, source: e, end: s }, n) {
  const r = new xt(e.substring(1));
  r.source === "" && n(t, "BAD_ALIAS", "Alias cannot be an empty string"), r.source.endsWith(":") && n(t + e.length - 1, "BAD_ALIAS", "Alias ending in : is ambiguous", !0);
  const o = t + e.length, u = it(s, o, i.strict, n);
  return r.range = [t, o, u.offset], u.comment && (r.comment = u.comment), r;
}
function er(i, t, { offset: e, start: s, value: n, end: r }, o) {
  const u = Object.assign({ _directives: t }, i), a = new st(void 0, u), l = {
    atRoot: !0,
    directives: a.directives,
    options: a.options,
    schema: a.schema
  }, p = Re(s, {
    indicator: "doc-start",
    next: n ?? (r == null ? void 0 : r[0]),
    offset: e,
    onError: o,
    parentIndent: 0,
    startOnNewline: !0
  });
  p.found && (a.directives.docStart = !0, n && (n.type === "block-map" || n.type === "block-seq") && !p.hasNewline && o(p.end, "MISSING_CHAR", "Block collection cannot start on same line with directives-end marker")), a.contents = n ? Fi(l, n, p, o) : ls(l, p.end, s, null, p, o);
  const h = a.contents.range[2], d = it(r, h, !1, o);
  return d.comment && (a.comment = d.comment), a.range = [e, h, d.offset], a;
}
function Xe(i) {
  if (typeof i == "number")
    return [i, i + 1];
  if (Array.isArray(i))
    return i.length === 2 ? i : [i[0], i[1]];
  const { offset: t, source: e } = i;
  return [t, t + (typeof e == "string" ? e.length : 1)];
}
function ws(i) {
  var n;
  let t = "", e = !1, s = !1;
  for (let r = 0; r < i.length; ++r) {
    const o = i[r];
    switch (o[0]) {
      case "#":
        t += (t === "" ? "" : s ? `

` : `
`) + (o.substring(1) || " "), e = !0, s = !1;
        break;
      case "%":
        ((n = i[r + 1]) == null ? void 0 : n[0]) !== "#" && (r += 1), e = !1;
        break;
      default:
        e || (s = !0), e = !1;
    }
  }
  return { comment: t, afterEmptyLine: s };
}
class tr {
  constructor(t = {}) {
    this.doc = null, this.atDirectives = !1, this.prelude = [], this.errors = [], this.warnings = [], this.onError = (e, s, n, r) => {
      const o = Xe(e);
      r ? this.warnings.push(new Nn(o, s, n)) : this.errors.push(new Me(o, s, n));
    }, this.directives = new $({ version: t.version || "1.2" }), this.options = t;
  }
  decorate(t, e) {
    const { comment: s, afterEmptyLine: n } = ws(this.prelude);
    if (s) {
      const r = t.contents;
      if (e)
        t.comment = t.comment ? `${t.comment}
${s}` : s;
      else if (n || t.directives.docStart || !r)
        t.commentBefore = s;
      else if (R(r) && !r.flow && r.items.length > 0) {
        let o = r.items[0];
        O(o) && (o = o.key);
        const u = o.commentBefore;
        o.commentBefore = u ? `${s}
${u}` : s;
      } else {
        const o = r.commentBefore;
        r.commentBefore = o ? `${s}
${o}` : s;
      }
    }
    e ? (Array.prototype.push.apply(t.errors, this.errors), Array.prototype.push.apply(t.warnings, this.warnings)) : (t.errors = this.errors, t.warnings = this.warnings), this.prelude = [], this.errors = [], this.warnings = [];
  }
  /**
   * Current stream status information.
   *
   * Mostly useful at the end of input for an empty stream.
   */
  streamInfo() {
    return {
      comment: ws(this.prelude).comment,
      directives: this.directives,
      errors: this.errors,
      warnings: this.warnings
    };
  }
  /**
   * Compose tokens into documents.
   *
   * @param forceDoc - If the stream contains no document, still emit a final document including any comments and directives that would be applied to a subsequent document.
   * @param endOffset - Should be set if `forceDoc` is also set, to set the document range end and to indicate errors correctly.
   */
  *compose(t, e = !1, s = -1) {
    for (const n of t)
      yield* this.next(n);
    yield* this.end(e, s);
  }
  /** Advance the composer by one CST token. */
  *next(t) {
    switch (t.type) {
      case "directive":
        this.directives.add(t.source, (e, s, n) => {
          const r = Xe(t);
          r[0] += e, this.onError(r, "BAD_DIRECTIVE", s, n);
        }), this.prelude.push(t.source), this.atDirectives = !0;
        break;
      case "document": {
        const e = er(this.options, this.directives, t, this.onError);
        this.atDirectives && !e.directives.docStart && this.onError(t, "MISSING_CHAR", "Missing directives-end/doc-start indicator line"), this.decorate(e, !1), this.doc && (yield this.doc), this.doc = e, this.atDirectives = !1;
        break;
      }
      case "byte-order-mark":
      case "space":
        break;
      case "comment":
      case "newline":
        this.prelude.push(t.source);
        break;
      case "error": {
        const e = t.source ? `${t.message}: ${JSON.stringify(t.source)}` : t.message, s = new Me(Xe(t), "UNEXPECTED_TOKEN", e);
        this.atDirectives || !this.doc ? this.errors.push(s) : this.doc.errors.push(s);
        break;
      }
      case "doc-end": {
        if (!this.doc) {
          const s = "Unexpected doc-end without preceding document";
          this.errors.push(new Me(Xe(t), "UNEXPECTED_TOKEN", s));
          break;
        }
        this.doc.directives.docEnd = !0;
        const e = it(t.end, t.offset + t.source.length, this.doc.options.strict, this.onError);
        if (this.decorate(this.doc, !0), e.comment) {
          const s = this.doc.comment;
          this.doc.comment = s ? `${s}
${e.comment}` : e.comment;
        }
        this.doc.range[2] = e.offset;
        break;
      }
      default:
        this.errors.push(new Me(Xe(t), "UNEXPECTED_TOKEN", `Unsupported token ${t.type}`));
    }
  }
  /**
   * Call at end of input to yield any remaining document.
   *
   * @param forceDoc - If the stream contains no document, still emit a final document including any comments and directives that would be applied to a subsequent document.
   * @param endOffset - Should be set if `forceDoc` is also set, to set the document range end and to indicate errors correctly.
   */
  *end(t = !1, e = -1) {
    if (this.doc)
      this.decorate(this.doc, !0), yield this.doc, this.doc = null;
    else if (t) {
      const s = Object.assign({ _directives: this.directives }, this.options), n = new st(void 0, s);
      this.atDirectives && this.onError(e, "MISSING_CHAR", "Missing directives-end indicator line"), n.range = [0, e, e], this.decorate(n, !1), yield n;
    }
  }
}
const Gi = "\uFEFF", ki = "", Li = "", Vt = "";
function sr(i) {
  switch (i) {
    case Gi:
      return "byte-order-mark";
    case ki:
      return "doc-mode";
    case Li:
      return "flow-error-end";
    case Vt:
      return "scalar";
    case "---":
      return "doc-start";
    case "...":
      return "doc-end";
    case "":
    case `
`:
    case `\r
`:
      return "newline";
    case "-":
      return "seq-item-ind";
    case "?":
      return "explicit-key-ind";
    case ":":
      return "map-value-ind";
    case "{":
      return "flow-map-start";
    case "}":
      return "flow-map-end";
    case "[":
      return "flow-seq-start";
    case "]":
      return "flow-seq-end";
    case ",":
      return "comma";
  }
  switch (i[0]) {
    case " ":
    case "	":
      return "space";
    case "#":
      return "comment";
    case "%":
      return "directive-line";
    case "*":
      return "alias";
    case "&":
      return "anchor";
    case "!":
      return "tag";
    case "'":
      return "single-quoted-scalar";
    case '"':
      return "double-quoted-scalar";
    case "|":
    case ">":
      return "block-scalar-header";
  }
  return null;
}
function ee(i) {
  switch (i) {
    case void 0:
    case " ":
    case `
`:
    case "\r":
    case "	":
      return !0;
    default:
      return !1;
  }
}
const bs = new Set("0123456789ABCDEFabcdef"), ir = new Set("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-#;/?:@&=+$_.!~*'()"), ot = new Set(",[]{}"), nr = new Set(` ,[]{}
\r	`), Nt = (i) => !i || nr.has(i);
class rr {
  constructor() {
    this.atEnd = !1, this.blockScalarIndent = -1, this.blockScalarKeep = !1, this.buffer = "", this.flowKey = !1, this.flowLevel = 0, this.indentNext = 0, this.indentValue = 0, this.lineEndPos = null, this.next = null, this.pos = 0;
  }
  /**
   * Generate YAML tokens from the `source` string. If `incomplete`,
   * a part of the last line may be left as a buffer for the next call.
   *
   * @returns A generator of lexical tokens
   */
  *lex(t, e = !1) {
    if (t) {
      if (typeof t != "string")
        throw TypeError("source is not a string");
      this.buffer = this.buffer ? this.buffer + t : t, this.lineEndPos = null;
    }
    this.atEnd = !e;
    let s = this.next ?? "stream";
    for (; s && (e || this.hasChars(1)); )
      s = yield* this.parseNext(s);
  }
  atLineEnd() {
    let t = this.pos, e = this.buffer[t];
    for (; e === " " || e === "	"; )
      e = this.buffer[++t];
    return !e || e === "#" || e === `
` ? !0 : e === "\r" ? this.buffer[t + 1] === `
` : !1;
  }
  charAt(t) {
    return this.buffer[this.pos + t];
  }
  continueScalar(t) {
    let e = this.buffer[t];
    if (this.indentNext > 0) {
      let s = 0;
      for (; e === " "; )
        e = this.buffer[++s + t];
      if (e === "\r") {
        const n = this.buffer[s + t + 1];
        if (n === `
` || !n && !this.atEnd)
          return t + s + 1;
      }
      return e === `
` || s >= this.indentNext || !e && !this.atEnd ? t + s : -1;
    }
    if (e === "-" || e === ".") {
      const s = this.buffer.substr(t, 3);
      if ((s === "---" || s === "...") && ee(this.buffer[t + 3]))
        return -1;
    }
    return t;
  }
  getLine() {
    let t = this.lineEndPos;
    return (typeof t != "number" || t !== -1 && t < this.pos) && (t = this.buffer.indexOf(`
`, this.pos), this.lineEndPos = t), t === -1 ? this.atEnd ? this.buffer.substring(this.pos) : null : (this.buffer[t - 1] === "\r" && (t -= 1), this.buffer.substring(this.pos, t));
  }
  hasChars(t) {
    return this.pos + t <= this.buffer.length;
  }
  setNext(t) {
    return this.buffer = this.buffer.substring(this.pos), this.pos = 0, this.lineEndPos = null, this.next = t, null;
  }
  peek(t) {
    return this.buffer.substr(this.pos, t);
  }
  *parseNext(t) {
    switch (t) {
      case "stream":
        return yield* this.parseStream();
      case "line-start":
        return yield* this.parseLineStart();
      case "block-start":
        return yield* this.parseBlockStart();
      case "doc":
        return yield* this.parseDocument();
      case "flow":
        return yield* this.parseFlowCollection();
      case "quoted-scalar":
        return yield* this.parseQuotedScalar();
      case "block-scalar":
        return yield* this.parseBlockScalar();
      case "plain-scalar":
        return yield* this.parsePlainScalar();
    }
  }
  *parseStream() {
    let t = this.getLine();
    if (t === null)
      return this.setNext("stream");
    if (t[0] === Gi && (yield* this.pushCount(1), t = t.substring(1)), t[0] === "%") {
      let e = t.length, s = t.indexOf("#");
      for (; s !== -1; ) {
        const r = t[s - 1];
        if (r === " " || r === "	") {
          e = s - 1;
          break;
        } else
          s = t.indexOf("#", s + 1);
      }
      for (; ; ) {
        const r = t[e - 1];
        if (r === " " || r === "	")
          e -= 1;
        else
          break;
      }
      const n = (yield* this.pushCount(e)) + (yield* this.pushSpaces(!0));
      return yield* this.pushCount(t.length - n), this.pushNewline(), "stream";
    }
    if (this.atLineEnd()) {
      const e = yield* this.pushSpaces(!0);
      return yield* this.pushCount(t.length - e), yield* this.pushNewline(), "stream";
    }
    return yield ki, yield* this.parseLineStart();
  }
  *parseLineStart() {
    const t = this.charAt(0);
    if (!t && !this.atEnd)
      return this.setNext("line-start");
    if (t === "-" || t === ".") {
      if (!this.atEnd && !this.hasChars(4))
        return this.setNext("line-start");
      const e = this.peek(3);
      if (e === "---" && ee(this.charAt(3)))
        return yield* this.pushCount(3), this.indentValue = 0, this.indentNext = 0, "doc";
      if (e === "..." && ee(this.charAt(3)))
        return yield* this.pushCount(3), "stream";
    }
    return this.indentValue = yield* this.pushSpaces(!1), this.indentNext > this.indentValue && !ee(this.charAt(1)) && (this.indentNext = this.indentValue), yield* this.parseBlockStart();
  }
  *parseBlockStart() {
    const [t, e] = this.peek(2);
    if (!e && !this.atEnd)
      return this.setNext("block-start");
    if ((t === "-" || t === "?" || t === ":") && ee(e)) {
      const s = (yield* this.pushCount(1)) + (yield* this.pushSpaces(!0));
      return this.indentNext = this.indentValue + 1, this.indentValue += s, yield* this.parseBlockStart();
    }
    return "doc";
  }
  *parseDocument() {
    yield* this.pushSpaces(!0);
    const t = this.getLine();
    if (t === null)
      return this.setNext("doc");
    let e = yield* this.pushIndicators();
    switch (t[e]) {
      case "#":
        yield* this.pushCount(t.length - e);
      case void 0:
        return yield* this.pushNewline(), yield* this.parseLineStart();
      case "{":
      case "[":
        return yield* this.pushCount(1), this.flowKey = !1, this.flowLevel = 1, "flow";
      case "}":
      case "]":
        return yield* this.pushCount(1), "doc";
      case "*":
        return yield* this.pushUntil(Nt), "doc";
      case '"':
      case "'":
        return yield* this.parseQuotedScalar();
      case "|":
      case ">":
        return e += yield* this.parseBlockScalarHeader(), e += yield* this.pushSpaces(!0), yield* this.pushCount(t.length - e), yield* this.pushNewline(), yield* this.parseBlockScalar();
      default:
        return yield* this.parsePlainScalar();
    }
  }
  *parseFlowCollection() {
    let t, e, s = -1;
    do
      t = yield* this.pushNewline(), t > 0 ? (e = yield* this.pushSpaces(!1), this.indentValue = s = e) : e = 0, e += yield* this.pushSpaces(!0);
    while (t + e > 0);
    const n = this.getLine();
    if (n === null)
      return this.setNext("flow");
    if ((s !== -1 && s < this.indentNext && n[0] !== "#" || s === 0 && (n.startsWith("---") || n.startsWith("...")) && ee(n[3])) && !(s === this.indentNext - 1 && this.flowLevel === 1 && (n[0] === "]" || n[0] === "}")))
      return this.flowLevel = 0, yield Li, yield* this.parseLineStart();
    let r = 0;
    for (; n[r] === ","; )
      r += yield* this.pushCount(1), r += yield* this.pushSpaces(!0), this.flowKey = !1;
    switch (r += yield* this.pushIndicators(), n[r]) {
      case void 0:
        return "flow";
      case "#":
        return yield* this.pushCount(n.length - r), "flow";
      case "{":
      case "[":
        return yield* this.pushCount(1), this.flowKey = !1, this.flowLevel += 1, "flow";
      case "}":
      case "]":
        return yield* this.pushCount(1), this.flowKey = !0, this.flowLevel -= 1, this.flowLevel ? "flow" : "doc";
      case "*":
        return yield* this.pushUntil(Nt), "flow";
      case '"':
      case "'":
        return this.flowKey = !0, yield* this.parseQuotedScalar();
      case ":": {
        const o = this.charAt(1);
        if (this.flowKey || ee(o) || o === ",")
          return this.flowKey = !1, yield* this.pushCount(1), yield* this.pushSpaces(!0), "flow";
      }
      default:
        return this.flowKey = !1, yield* this.parsePlainScalar();
    }
  }
  *parseQuotedScalar() {
    const t = this.charAt(0);
    let e = this.buffer.indexOf(t, this.pos + 1);
    if (t === "'")
      for (; e !== -1 && this.buffer[e + 1] === "'"; )
        e = this.buffer.indexOf("'", e + 2);
    else
      for (; e !== -1; ) {
        let r = 0;
        for (; this.buffer[e - 1 - r] === "\\"; )
          r += 1;
        if (r % 2 === 0)
          break;
        e = this.buffer.indexOf('"', e + 1);
      }
    const s = this.buffer.substring(0, e);
    let n = s.indexOf(`
`, this.pos);
    if (n !== -1) {
      for (; n !== -1; ) {
        const r = this.continueScalar(n + 1);
        if (r === -1)
          break;
        n = s.indexOf(`
`, r);
      }
      n !== -1 && (e = n - (s[n - 1] === "\r" ? 2 : 1));
    }
    if (e === -1) {
      if (!this.atEnd)
        return this.setNext("quoted-scalar");
      e = this.buffer.length;
    }
    return yield* this.pushToIndex(e + 1, !1), this.flowLevel ? "flow" : "doc";
  }
  *parseBlockScalarHeader() {
    this.blockScalarIndent = -1, this.blockScalarKeep = !1;
    let t = this.pos;
    for (; ; ) {
      const e = this.buffer[++t];
      if (e === "+")
        this.blockScalarKeep = !0;
      else if (e > "0" && e <= "9")
        this.blockScalarIndent = Number(e) - 1;
      else if (e !== "-")
        break;
    }
    return yield* this.pushUntil((e) => ee(e) || e === "#");
  }
  *parseBlockScalar() {
    let t = this.pos - 1, e = 0, s;
    e: for (let r = this.pos; s = this.buffer[r]; ++r)
      switch (s) {
        case " ":
          e += 1;
          break;
        case `
`:
          t = r, e = 0;
          break;
        case "\r": {
          const o = this.buffer[r + 1];
          if (!o && !this.atEnd)
            return this.setNext("block-scalar");
          if (o === `
`)
            break;
        }
        default:
          break e;
      }
    if (!s && !this.atEnd)
      return this.setNext("block-scalar");
    if (e >= this.indentNext) {
      this.blockScalarIndent === -1 ? this.indentNext = e : this.indentNext = this.blockScalarIndent + (this.indentNext === 0 ? 1 : this.indentNext);
      do {
        const r = this.continueScalar(t + 1);
        if (r === -1)
          break;
        t = this.buffer.indexOf(`
`, r);
      } while (t !== -1);
      if (t === -1) {
        if (!this.atEnd)
          return this.setNext("block-scalar");
        t = this.buffer.length;
      }
    }
    let n = t + 1;
    for (s = this.buffer[n]; s === " "; )
      s = this.buffer[++n];
    if (s === "	") {
      for (; s === "	" || s === " " || s === "\r" || s === `
`; )
        s = this.buffer[++n];
      t = n - 1;
    } else if (!this.blockScalarKeep)
      do {
        let r = t - 1, o = this.buffer[r];
        o === "\r" && (o = this.buffer[--r]);
        const u = r;
        for (; o === " "; )
          o = this.buffer[--r];
        if (o === `
` && r >= this.pos && r + 1 + e > u)
          t = r;
        else
          break;
      } while (!0);
    return yield Vt, yield* this.pushToIndex(t + 1, !0), yield* this.parseLineStart();
  }
  *parsePlainScalar() {
    const t = this.flowLevel > 0;
    let e = this.pos - 1, s = this.pos - 1, n;
    for (; n = this.buffer[++s]; )
      if (n === ":") {
        const r = this.buffer[s + 1];
        if (ee(r) || t && ot.has(r))
          break;
        e = s;
      } else if (ee(n)) {
        let r = this.buffer[s + 1];
        if (n === "\r" && (r === `
` ? (s += 1, n = `
`, r = this.buffer[s + 1]) : e = s), r === "#" || t && ot.has(r))
          break;
        if (n === `
`) {
          const o = this.continueScalar(s + 1);
          if (o === -1)
            break;
          s = Math.max(s, o - 2);
        }
      } else {
        if (t && ot.has(n))
          break;
        e = s;
      }
    return !n && !this.atEnd ? this.setNext("plain-scalar") : (yield Vt, yield* this.pushToIndex(e + 1, !0), t ? "flow" : "doc");
  }
  *pushCount(t) {
    return t > 0 ? (yield this.buffer.substr(this.pos, t), this.pos += t, t) : 0;
  }
  *pushToIndex(t, e) {
    const s = this.buffer.slice(this.pos, t);
    return s ? (yield s, this.pos += s.length, s.length) : (e && (yield ""), 0);
  }
  *pushIndicators() {
    switch (this.charAt(0)) {
      case "!":
        return (yield* this.pushTag()) + (yield* this.pushSpaces(!0)) + (yield* this.pushIndicators());
      case "&":
        return (yield* this.pushUntil(Nt)) + (yield* this.pushSpaces(!0)) + (yield* this.pushIndicators());
      case "-":
      case "?":
      case ":": {
        const t = this.flowLevel > 0, e = this.charAt(1);
        if (ee(e) || t && ot.has(e))
          return t ? this.flowKey && (this.flowKey = !1) : this.indentNext = this.indentValue + 1, (yield* this.pushCount(1)) + (yield* this.pushSpaces(!0)) + (yield* this.pushIndicators());
      }
    }
    return 0;
  }
  *pushTag() {
    if (this.charAt(1) === "<") {
      let t = this.pos + 2, e = this.buffer[t];
      for (; !ee(e) && e !== ">"; )
        e = this.buffer[++t];
      return yield* this.pushToIndex(e === ">" ? t + 1 : t, !1);
    } else {
      let t = this.pos + 1, e = this.buffer[t];
      for (; e; )
        if (ir.has(e))
          e = this.buffer[++t];
        else if (e === "%" && bs.has(this.buffer[t + 1]) && bs.has(this.buffer[t + 2]))
          e = this.buffer[t += 3];
        else
          break;
      return yield* this.pushToIndex(t, !1);
    }
  }
  *pushNewline() {
    const t = this.buffer[this.pos];
    return t === `
` ? yield* this.pushCount(1) : t === "\r" && this.charAt(1) === `
` ? yield* this.pushCount(2) : 0;
  }
  *pushSpaces(t) {
    let e = this.pos - 1, s;
    do
      s = this.buffer[++e];
    while (s === " " || t && s === "	");
    const n = e - this.pos;
    return n > 0 && (yield this.buffer.substr(this.pos, n), this.pos = e), n;
  }
  *pushUntil(t) {
    let e = this.pos, s = this.buffer[e];
    for (; !t(s); )
      s = this.buffer[++e];
    return yield* this.pushToIndex(e, !1);
  }
}
class or {
  constructor() {
    this.lineStarts = [], this.addNewLine = (t) => this.lineStarts.push(t), this.linePos = (t) => {
      let e = 0, s = this.lineStarts.length;
      for (; e < s; ) {
        const r = e + s >> 1;
        this.lineStarts[r] < t ? e = r + 1 : s = r;
      }
      if (this.lineStarts[e] === t)
        return { line: e + 1, col: 1 };
      if (e === 0)
        return { line: 0, col: t };
      const n = this.lineStarts[e - 1];
      return { line: e, col: t - n + 1 };
    };
  }
}
function we(i, t) {
  for (let e = 0; e < i.length; ++e)
    if (i[e].type === t)
      return !0;
  return !1;
}
function ys(i) {
  for (let t = 0; t < i.length; ++t)
    switch (i[t].type) {
      case "space":
      case "comment":
      case "newline":
        break;
      default:
        return t;
    }
  return -1;
}
function Zi(i) {
  switch (i == null ? void 0 : i.type) {
    case "alias":
    case "scalar":
    case "single-quoted-scalar":
    case "double-quoted-scalar":
    case "flow-collection":
      return !0;
    default:
      return !1;
  }
}
function ut(i) {
  switch (i.type) {
    case "document":
      return i.start;
    case "block-map": {
      const t = i.items[i.items.length - 1];
      return t.sep ?? t.start;
    }
    case "block-seq":
      return i.items[i.items.length - 1].start;
    default:
      return [];
  }
}
function Le(i) {
  var e;
  if (i.length === 0)
    return [];
  let t = i.length;
  e: for (; --t >= 0; )
    switch (i[t].type) {
      case "doc-start":
      case "explicit-key-ind":
      case "map-value-ind":
      case "seq-item-ind":
      case "newline":
        break e;
    }
  for (; ((e = i[++t]) == null ? void 0 : e.type) === "space"; )
    ;
  return i.splice(t, i.length);
}
function Bs(i) {
  if (i.start.type === "flow-seq-start")
    for (const t of i.items)
      t.sep && !t.value && !we(t.start, "explicit-key-ind") && !we(t.sep, "map-value-ind") && (t.key && (t.value = t.key), delete t.key, Zi(t.value) ? t.value.end ? Array.prototype.push.apply(t.value.end, t.sep) : t.value.end = t.sep : Array.prototype.push.apply(t.start, t.sep), delete t.sep);
}
class ur {
  /**
   * @param onNewLine - If defined, called separately with the start position of
   *   each new line (in `parse()`, including the start of input).
   */
  constructor(t) {
    this.atNewLine = !0, this.atScalar = !1, this.indent = 0, this.offset = 0, this.onKeyLine = !1, this.stack = [], this.source = "", this.type = "", this.lexer = new rr(), this.onNewLine = t;
  }
  /**
   * Parse `source` as a YAML stream.
   * If `incomplete`, a part of the last line may be left as a buffer for the next call.
   *
   * Errors are not thrown, but yielded as `{ type: 'error', message }` tokens.
   *
   * @returns A generator of tokens representing each directive, document, and other structure.
   */
  *parse(t, e = !1) {
    this.onNewLine && this.offset === 0 && this.onNewLine(0);
    for (const s of this.lexer.lex(t, e))
      yield* this.next(s);
    e || (yield* this.end());
  }
  /**
   * Advance the parser by the `source` of one lexical token.
   */
  *next(t) {
    if (this.source = t, this.atScalar) {
      this.atScalar = !1, yield* this.step(), this.offset += t.length;
      return;
    }
    const e = sr(t);
    if (e)
      if (e === "scalar")
        this.atNewLine = !1, this.atScalar = !0, this.type = "scalar";
      else {
        switch (this.type = e, yield* this.step(), e) {
          case "newline":
            this.atNewLine = !0, this.indent = 0, this.onNewLine && this.onNewLine(this.offset + t.length);
            break;
          case "space":
            this.atNewLine && t[0] === " " && (this.indent += t.length);
            break;
          case "explicit-key-ind":
          case "map-value-ind":
          case "seq-item-ind":
            this.atNewLine && (this.indent += t.length);
            break;
          case "doc-mode":
          case "flow-error-end":
            return;
          default:
            this.atNewLine = !1;
        }
        this.offset += t.length;
      }
    else {
      const s = `Not a YAML token: ${t}`;
      yield* this.pop({ type: "error", offset: this.offset, message: s, source: t }), this.offset += t.length;
    }
  }
  /** Call at end of input to push out any remaining constructions */
  *end() {
    for (; this.stack.length > 0; )
      yield* this.pop();
  }
  get sourceToken() {
    return {
      type: this.type,
      offset: this.offset,
      indent: this.indent,
      source: this.source
    };
  }
  *step() {
    const t = this.peek(1);
    if (this.type === "doc-end" && (!t || t.type !== "doc-end")) {
      for (; this.stack.length > 0; )
        yield* this.pop();
      this.stack.push({
        type: "doc-end",
        offset: this.offset,
        source: this.source
      });
      return;
    }
    if (!t)
      return yield* this.stream();
    switch (t.type) {
      case "document":
        return yield* this.document(t);
      case "alias":
      case "scalar":
      case "single-quoted-scalar":
      case "double-quoted-scalar":
        return yield* this.scalar(t);
      case "block-scalar":
        return yield* this.blockScalar(t);
      case "block-map":
        return yield* this.blockMap(t);
      case "block-seq":
        return yield* this.blockSequence(t);
      case "flow-collection":
        return yield* this.flowCollection(t);
      case "doc-end":
        return yield* this.documentEnd(t);
    }
    yield* this.pop();
  }
  peek(t) {
    return this.stack[this.stack.length - t];
  }
  *pop(t) {
    const e = t ?? this.stack.pop();
    if (!e)
      yield { type: "error", offset: this.offset, source: "", message: "Tried to pop an empty stack" };
    else if (this.stack.length === 0)
      yield e;
    else {
      const s = this.peek(1);
      switch (e.type === "block-scalar" ? e.indent = "indent" in s ? s.indent : 0 : e.type === "flow-collection" && s.type === "document" && (e.indent = 0), e.type === "flow-collection" && Bs(e), s.type) {
        case "document":
          s.value = e;
          break;
        case "block-scalar":
          s.props.push(e);
          break;
        case "block-map": {
          const n = s.items[s.items.length - 1];
          if (n.value) {
            s.items.push({ start: [], key: e, sep: [] }), this.onKeyLine = !0;
            return;
          } else if (n.sep)
            n.value = e;
          else {
            Object.assign(n, { key: e, sep: [] }), this.onKeyLine = !n.explicitKey;
            return;
          }
          break;
        }
        case "block-seq": {
          const n = s.items[s.items.length - 1];
          n.value ? s.items.push({ start: [], value: e }) : n.value = e;
          break;
        }
        case "flow-collection": {
          const n = s.items[s.items.length - 1];
          !n || n.value ? s.items.push({ start: [], key: e, sep: [] }) : n.sep ? n.value = e : Object.assign(n, { key: e, sep: [] });
          return;
        }
        default:
          yield* this.pop(), yield* this.pop(e);
      }
      if ((s.type === "document" || s.type === "block-map" || s.type === "block-seq") && (e.type === "block-map" || e.type === "block-seq")) {
        const n = e.items[e.items.length - 1];
        n && !n.sep && !n.value && n.start.length > 0 && ys(n.start) === -1 && (e.indent === 0 || n.start.every((r) => r.type !== "comment" || r.indent < e.indent)) && (s.type === "document" ? s.end = n.start : s.items.push({ start: n.start }), e.items.splice(-1, 1));
      }
    }
  }
  *stream() {
    switch (this.type) {
      case "directive-line":
        yield { type: "directive", offset: this.offset, source: this.source };
        return;
      case "byte-order-mark":
      case "space":
      case "comment":
      case "newline":
        yield this.sourceToken;
        return;
      case "doc-mode":
      case "doc-start": {
        const t = {
          type: "document",
          offset: this.offset,
          start: []
        };
        this.type === "doc-start" && t.start.push(this.sourceToken), this.stack.push(t);
        return;
      }
    }
    yield {
      type: "error",
      offset: this.offset,
      message: `Unexpected ${this.type} token in YAML stream`,
      source: this.source
    };
  }
  *document(t) {
    if (t.value)
      return yield* this.lineEnd(t);
    switch (this.type) {
      case "doc-start": {
        ys(t.start) !== -1 ? (yield* this.pop(), yield* this.step()) : t.start.push(this.sourceToken);
        return;
      }
      case "anchor":
      case "tag":
      case "space":
      case "comment":
      case "newline":
        t.start.push(this.sourceToken);
        return;
    }
    const e = this.startBlockValue(t);
    e ? this.stack.push(e) : yield {
      type: "error",
      offset: this.offset,
      message: `Unexpected ${this.type} token in YAML document`,
      source: this.source
    };
  }
  *scalar(t) {
    if (this.type === "map-value-ind") {
      const e = ut(this.peek(2)), s = Le(e);
      let n;
      t.end ? (n = t.end, n.push(this.sourceToken), delete t.end) : n = [this.sourceToken];
      const r = {
        type: "block-map",
        offset: t.offset,
        indent: t.indent,
        items: [{ start: s, key: t, sep: n }]
      };
      this.onKeyLine = !0, this.stack[this.stack.length - 1] = r;
    } else
      yield* this.lineEnd(t);
  }
  *blockScalar(t) {
    switch (this.type) {
      case "space":
      case "comment":
      case "newline":
        t.props.push(this.sourceToken);
        return;
      case "scalar":
        if (t.source = this.source, this.atNewLine = !0, this.indent = 0, this.onNewLine) {
          let e = this.source.indexOf(`
`) + 1;
          for (; e !== 0; )
            this.onNewLine(this.offset + e), e = this.source.indexOf(`
`, e) + 1;
        }
        yield* this.pop();
        break;
      default:
        yield* this.pop(), yield* this.step();
    }
  }
  *blockMap(t) {
    var s;
    const e = t.items[t.items.length - 1];
    switch (this.type) {
      case "newline":
        if (this.onKeyLine = !1, e.value) {
          const n = "end" in e.value ? e.value.end : void 0, r = Array.isArray(n) ? n[n.length - 1] : void 0;
          (r == null ? void 0 : r.type) === "comment" ? n == null || n.push(this.sourceToken) : t.items.push({ start: [this.sourceToken] });
        } else e.sep ? e.sep.push(this.sourceToken) : e.start.push(this.sourceToken);
        return;
      case "space":
      case "comment":
        if (e.value)
          t.items.push({ start: [this.sourceToken] });
        else if (e.sep)
          e.sep.push(this.sourceToken);
        else {
          if (this.atIndentedComment(e.start, t.indent)) {
            const n = t.items[t.items.length - 2], r = (s = n == null ? void 0 : n.value) == null ? void 0 : s.end;
            if (Array.isArray(r)) {
              Array.prototype.push.apply(r, e.start), r.push(this.sourceToken), t.items.pop();
              return;
            }
          }
          e.start.push(this.sourceToken);
        }
        return;
    }
    if (this.indent >= t.indent) {
      const n = !this.onKeyLine && this.indent === t.indent, r = n && (e.sep || e.explicitKey) && this.type !== "seq-item-ind";
      let o = [];
      if (r && e.sep && !e.value) {
        const u = [];
        for (let a = 0; a < e.sep.length; ++a) {
          const l = e.sep[a];
          switch (l.type) {
            case "newline":
              u.push(a);
              break;
            case "space":
              break;
            case "comment":
              l.indent > t.indent && (u.length = 0);
              break;
            default:
              u.length = 0;
          }
        }
        u.length >= 2 && (o = e.sep.splice(u[1]));
      }
      switch (this.type) {
        case "anchor":
        case "tag":
          r || e.value ? (o.push(this.sourceToken), t.items.push({ start: o }), this.onKeyLine = !0) : e.sep ? e.sep.push(this.sourceToken) : e.start.push(this.sourceToken);
          return;
        case "explicit-key-ind":
          !e.sep && !e.explicitKey ? (e.start.push(this.sourceToken), e.explicitKey = !0) : r || e.value ? (o.push(this.sourceToken), t.items.push({ start: o, explicitKey: !0 })) : this.stack.push({
            type: "block-map",
            offset: this.offset,
            indent: this.indent,
            items: [{ start: [this.sourceToken], explicitKey: !0 }]
          }), this.onKeyLine = !0;
          return;
        case "map-value-ind":
          if (e.explicitKey)
            if (e.sep)
              if (e.value)
                t.items.push({ start: [], key: null, sep: [this.sourceToken] });
              else if (we(e.sep, "map-value-ind"))
                this.stack.push({
                  type: "block-map",
                  offset: this.offset,
                  indent: this.indent,
                  items: [{ start: o, key: null, sep: [this.sourceToken] }]
                });
              else if (Zi(e.key) && !we(e.sep, "newline")) {
                const u = Le(e.start), a = e.key, l = e.sep;
                l.push(this.sourceToken), delete e.key, delete e.sep, this.stack.push({
                  type: "block-map",
                  offset: this.offset,
                  indent: this.indent,
                  items: [{ start: u, key: a, sep: l }]
                });
              } else o.length > 0 ? e.sep = e.sep.concat(o, this.sourceToken) : e.sep.push(this.sourceToken);
            else if (we(e.start, "newline"))
              Object.assign(e, { key: null, sep: [this.sourceToken] });
            else {
              const u = Le(e.start);
              this.stack.push({
                type: "block-map",
                offset: this.offset,
                indent: this.indent,
                items: [{ start: u, key: null, sep: [this.sourceToken] }]
              });
            }
          else
            e.sep ? e.value || r ? t.items.push({ start: o, key: null, sep: [this.sourceToken] }) : we(e.sep, "map-value-ind") ? this.stack.push({
              type: "block-map",
              offset: this.offset,
              indent: this.indent,
              items: [{ start: [], key: null, sep: [this.sourceToken] }]
            }) : e.sep.push(this.sourceToken) : Object.assign(e, { key: null, sep: [this.sourceToken] });
          this.onKeyLine = !0;
          return;
        case "alias":
        case "scalar":
        case "single-quoted-scalar":
        case "double-quoted-scalar": {
          const u = this.flowScalar(this.type);
          r || e.value ? (t.items.push({ start: o, key: u, sep: [] }), this.onKeyLine = !0) : e.sep ? this.stack.push(u) : (Object.assign(e, { key: u, sep: [] }), this.onKeyLine = !0);
          return;
        }
        default: {
          const u = this.startBlockValue(t);
          if (u) {
            n && u.type !== "block-seq" && t.items.push({ start: o }), this.stack.push(u);
            return;
          }
        }
      }
    }
    yield* this.pop(), yield* this.step();
  }
  *blockSequence(t) {
    var s;
    const e = t.items[t.items.length - 1];
    switch (this.type) {
      case "newline":
        if (e.value) {
          const n = "end" in e.value ? e.value.end : void 0, r = Array.isArray(n) ? n[n.length - 1] : void 0;
          (r == null ? void 0 : r.type) === "comment" ? n == null || n.push(this.sourceToken) : t.items.push({ start: [this.sourceToken] });
        } else
          e.start.push(this.sourceToken);
        return;
      case "space":
      case "comment":
        if (e.value)
          t.items.push({ start: [this.sourceToken] });
        else {
          if (this.atIndentedComment(e.start, t.indent)) {
            const n = t.items[t.items.length - 2], r = (s = n == null ? void 0 : n.value) == null ? void 0 : s.end;
            if (Array.isArray(r)) {
              Array.prototype.push.apply(r, e.start), r.push(this.sourceToken), t.items.pop();
              return;
            }
          }
          e.start.push(this.sourceToken);
        }
        return;
      case "anchor":
      case "tag":
        if (e.value || this.indent <= t.indent)
          break;
        e.start.push(this.sourceToken);
        return;
      case "seq-item-ind":
        if (this.indent !== t.indent)
          break;
        e.value || we(e.start, "seq-item-ind") ? t.items.push({ start: [this.sourceToken] }) : e.start.push(this.sourceToken);
        return;
    }
    if (this.indent > t.indent) {
      const n = this.startBlockValue(t);
      if (n) {
        this.stack.push(n);
        return;
      }
    }
    yield* this.pop(), yield* this.step();
  }
  *flowCollection(t) {
    const e = t.items[t.items.length - 1];
    if (this.type === "flow-error-end") {
      let s;
      do
        yield* this.pop(), s = this.peek(1);
      while (s && s.type === "flow-collection");
    } else if (t.end.length === 0) {
      switch (this.type) {
        case "comma":
        case "explicit-key-ind":
          !e || e.sep ? t.items.push({ start: [this.sourceToken] }) : e.start.push(this.sourceToken);
          return;
        case "map-value-ind":
          !e || e.value ? t.items.push({ start: [], key: null, sep: [this.sourceToken] }) : e.sep ? e.sep.push(this.sourceToken) : Object.assign(e, { key: null, sep: [this.sourceToken] });
          return;
        case "space":
        case "comment":
        case "newline":
        case "anchor":
        case "tag":
          !e || e.value ? t.items.push({ start: [this.sourceToken] }) : e.sep ? e.sep.push(this.sourceToken) : e.start.push(this.sourceToken);
          return;
        case "alias":
        case "scalar":
        case "single-quoted-scalar":
        case "double-quoted-scalar": {
          const n = this.flowScalar(this.type);
          !e || e.value ? t.items.push({ start: [], key: n, sep: [] }) : e.sep ? this.stack.push(n) : Object.assign(e, { key: n, sep: [] });
          return;
        }
        case "flow-map-end":
        case "flow-seq-end":
          t.end.push(this.sourceToken);
          return;
      }
      const s = this.startBlockValue(t);
      s ? this.stack.push(s) : (yield* this.pop(), yield* this.step());
    } else {
      const s = this.peek(2);
      if (s.type === "block-map" && (this.type === "map-value-ind" && s.indent === t.indent || this.type === "newline" && !s.items[s.items.length - 1].sep))
        yield* this.pop(), yield* this.step();
      else if (this.type === "map-value-ind" && s.type !== "flow-collection") {
        const n = ut(s), r = Le(n);
        Bs(t);
        const o = t.end.splice(1, t.end.length);
        o.push(this.sourceToken);
        const u = {
          type: "block-map",
          offset: t.offset,
          indent: t.indent,
          items: [{ start: r, key: t, sep: o }]
        };
        this.onKeyLine = !0, this.stack[this.stack.length - 1] = u;
      } else
        yield* this.lineEnd(t);
    }
  }
  flowScalar(t) {
    if (this.onNewLine) {
      let e = this.source.indexOf(`
`) + 1;
      for (; e !== 0; )
        this.onNewLine(this.offset + e), e = this.source.indexOf(`
`, e) + 1;
    }
    return {
      type: t,
      offset: this.offset,
      indent: this.indent,
      source: this.source
    };
  }
  startBlockValue(t) {
    switch (this.type) {
      case "alias":
      case "scalar":
      case "single-quoted-scalar":
      case "double-quoted-scalar":
        return this.flowScalar(this.type);
      case "block-scalar-header":
        return {
          type: "block-scalar",
          offset: this.offset,
          indent: this.indent,
          props: [this.sourceToken],
          source: ""
        };
      case "flow-map-start":
      case "flow-seq-start":
        return {
          type: "flow-collection",
          offset: this.offset,
          indent: this.indent,
          start: this.sourceToken,
          items: [],
          end: []
        };
      case "seq-item-ind":
        return {
          type: "block-seq",
          offset: this.offset,
          indent: this.indent,
          items: [{ start: [this.sourceToken] }]
        };
      case "explicit-key-ind": {
        this.onKeyLine = !0;
        const e = ut(t), s = Le(e);
        return s.push(this.sourceToken), {
          type: "block-map",
          offset: this.offset,
          indent: this.indent,
          items: [{ start: s, explicitKey: !0 }]
        };
      }
      case "map-value-ind": {
        this.onKeyLine = !0;
        const e = ut(t), s = Le(e);
        return {
          type: "block-map",
          offset: this.offset,
          indent: this.indent,
          items: [{ start: s, key: null, sep: [this.sourceToken] }]
        };
      }
    }
    return null;
  }
  atIndentedComment(t, e) {
    return this.type !== "comment" || this.indent <= e ? !1 : t.every((s) => s.type === "newline" || s.type === "space");
  }
  *documentEnd(t) {
    this.type !== "doc-mode" && (t.end ? t.end.push(this.sourceToken) : t.end = [this.sourceToken], this.type === "newline" && (yield* this.pop()));
  }
  *lineEnd(t) {
    switch (this.type) {
      case "comma":
      case "doc-start":
      case "doc-end":
      case "flow-seq-end":
      case "flow-map-end":
      case "map-value-ind":
        yield* this.pop(), yield* this.step();
        break;
      case "newline":
        this.onKeyLine = !1;
      case "space":
      case "comment":
      default:
        t.end ? t.end.push(this.sourceToken) : t.end = [this.sourceToken], this.type === "newline" && (yield* this.pop());
    }
  }
}
function ar(i) {
  const t = i.prettyErrors !== !1;
  return { lineCounter: i.lineCounter || t && new or() || null, prettyErrors: t };
}
function lr(i, t = {}) {
  const { lineCounter: e, prettyErrors: s } = ar(t), n = new ur(e == null ? void 0 : e.addNewLine), r = new tr(t);
  let o = null;
  for (const u of r.compose(n.parse(i), !0, i.length))
    if (!o)
      o = u;
    else if (o.options.logLevel !== "silent") {
      o.errors.push(new Me(u.range.slice(0, 2), "MULTIPLE_DOCS", "Source contains multiple documents; please use YAML.parseAllDocuments()"));
      break;
    }
  return s && e && (o.errors.forEach(ms(i, e)), o.warnings.forEach(ms(i, e))), o;
}
function ue(i, t, e) {
  let s;
  const n = lr(i, e);
  if (!n)
    return null;
  if (n.warnings.forEach((r) => ri(n.options.logLevel, r)), n.errors.length > 0) {
    if (n.options.logLevel !== "silent")
      throw n.errors[0];
    n.errors = [];
  }
  return n.toJS(Object.assign({ reviver: s }, e));
}
function Gt(i, t, e) {
  let s = null;
  if (Array.isArray(t) && (s = t), i === void 0) {
    const { keepUndefined: n } = {};
    if (!n)
      return;
  }
  return new st(i, s, e).toString(e);
}
var cr = /[\u1680\u2000-\u200A\u202F\u205F\u3000]/, hr = /[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u08A0-\u08B4\u08B6-\u08BD\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312E\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FEA\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF2D-\uDF4A\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC03-\uDC37\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDF00-\uDF19]|\uD806[\uDCA0-\uDCDF\uDCFF\uDE00\uDE0B-\uDE32\uDE3A\uDE50\uDE5C-\uDE83\uDE86-\uDE89\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD30\uDD46]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50\uDF93-\uDF9F\uDFE0\uDFE1]|\uD821[\uDC00-\uDFEC]|\uD822[\uDC00-\uDEF2]|\uD82C[\uDC00-\uDD1E\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD83A[\uDC00-\uDCC4\uDD00-\uDD43]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]/, gr = /[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u0483-\u0487\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05F0-\u05F2\u0610-\u061A\u0620-\u0669\u066E-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06FC\u06FF\u0710-\u074A\u074D-\u07B1\u07C0-\u07F5\u07FA\u0800-\u082D\u0840-\u085B\u0860-\u086A\u08A0-\u08B4\u08B6-\u08BD\u08D4-\u08E1\u08E3-\u0963\u0966-\u096F\u0971-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u09FC\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0AF9-\u0AFF\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BEF\u0C00-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58-\u0C5A\u0C60-\u0C63\u0C66-\u0C6F\u0C80-\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2\u0D00-\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D54-\u0D57\u0D5F-\u0D63\u0D66-\u0D6F\u0D7A-\u0D7F\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E4E\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6C\u0F71-\u0F84\u0F86-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u135F\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17D3\u17D7\u17DC\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u1820-\u1877\u1880-\u18AA\u18B0-\u18F5\u1900-\u191E\u1920-\u192B\u1930-\u193B\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19D9\u1A00-\u1A1B\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA7\u1AB0-\u1ABD\u1B00-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BF3\u1C00-\u1C37\u1C40-\u1C49\u1C4D-\u1C7D\u1C80-\u1C88\u1CD0-\u1CD2\u1CD4-\u1CF9\u1D00-\u1DF9\u1DFB-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u203F\u2040\u2054\u2071\u207F\u2090-\u209C\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D7F-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u2E2F\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u3099\u309A\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312E\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FEA\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66F\uA674-\uA67D\uA67F-\uA6F1\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA827\uA840-\uA873\uA880-\uA8C5\uA8D0-\uA8D9\uA8E0-\uA8F7\uA8FB\uA8FD\uA900-\uA92D\uA930-\uA953\uA960-\uA97C\uA980-\uA9C0\uA9CF-\uA9D9\uA9E0-\uA9FE\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A-\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABEA\uABEC\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE00-\uFE0F\uFE20-\uFE2F\uFE33\uFE34\uFE4D-\uFE4F\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF3F\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDDFD\uDE80-\uDE9C\uDEA0-\uDED0\uDEE0\uDF00-\uDF1F\uDF2D-\uDF4A\uDF50-\uDF7A\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCA0-\uDCA9\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00-\uDE03\uDE05\uDE06\uDE0C-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE38-\uDE3A\uDE3F\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE6\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC00-\uDC46\uDC66-\uDC6F\uDC7F-\uDCBA\uDCD0-\uDCE8\uDCF0-\uDCF9\uDD00-\uDD34\uDD36-\uDD3F\uDD50-\uDD73\uDD76\uDD80-\uDDC4\uDDCA-\uDDCC\uDDD0-\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE37\uDE3E\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEEA\uDEF0-\uDEF9\uDF00-\uDF03\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3C-\uDF44\uDF47\uDF48\uDF4B-\uDF4D\uDF50\uDF57\uDF5D-\uDF63\uDF66-\uDF6C\uDF70-\uDF74]|\uD805[\uDC00-\uDC4A\uDC50-\uDC59\uDC80-\uDCC5\uDCC7\uDCD0-\uDCD9\uDD80-\uDDB5\uDDB8-\uDDC0\uDDD8-\uDDDD\uDE00-\uDE40\uDE44\uDE50-\uDE59\uDE80-\uDEB7\uDEC0-\uDEC9\uDF00-\uDF19\uDF1D-\uDF2B\uDF30-\uDF39]|\uD806[\uDCA0-\uDCE9\uDCFF\uDE00-\uDE3E\uDE47\uDE50-\uDE83\uDE86-\uDE99\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC36\uDC38-\uDC40\uDC50-\uDC59\uDC72-\uDC8F\uDC92-\uDCA7\uDCA9-\uDCB6\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD36\uDD3A\uDD3C\uDD3D\uDD3F-\uDD47\uDD50-\uDD59]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE60-\uDE69\uDED0-\uDEED\uDEF0-\uDEF4\uDF00-\uDF36\uDF40-\uDF43\uDF50-\uDF59\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50-\uDF7E\uDF8F-\uDF9F\uDFE0\uDFE1]|\uD821[\uDC00-\uDFEC]|\uD822[\uDC00-\uDEF2]|\uD82C[\uDC00-\uDD1E\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99\uDC9D\uDC9E]|\uD834[\uDD65-\uDD69\uDD6D-\uDD72\uDD7B-\uDD82\uDD85-\uDD8B\uDDAA-\uDDAD\uDE42-\uDE44]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB\uDFCE-\uDFFF]|\uD836[\uDE00-\uDE36\uDE3B-\uDE6C\uDE75\uDE84\uDE9B-\uDE9F\uDEA1-\uDEAF]|\uD838[\uDC00-\uDC06\uDC08-\uDC18\uDC1B-\uDC21\uDC23\uDC24\uDC26-\uDC2A]|\uD83A[\uDC00-\uDCC4\uDCD0-\uDCD6\uDD00-\uDD4A\uDD50-\uDD59]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]|\uDB40[\uDD00-\uDDEF]/, Kt = {
  Space_Separator: cr,
  ID_Start: hr,
  ID_Continue: gr
}, W = {
  isSpaceSeparator(i) {
    return typeof i == "string" && Kt.Space_Separator.test(i);
  },
  isIdStartChar(i) {
    return typeof i == "string" && (i >= "a" && i <= "z" || i >= "A" && i <= "Z" || i === "$" || i === "_" || Kt.ID_Start.test(i));
  },
  isIdContinueChar(i) {
    return typeof i == "string" && (i >= "a" && i <= "z" || i >= "A" && i <= "Z" || i >= "0" && i <= "9" || i === "$" || i === "_" || i === "‌" || i === "‍" || Kt.ID_Continue.test(i));
  },
  isDigit(i) {
    return typeof i == "string" && /[0-9]/.test(i);
  },
  isHexDigit(i) {
    return typeof i == "string" && /[0-9A-Fa-f]/.test(i);
  }
};
let Xt, J, ce, Ct, fe, re, X, cs, je;
var dr = function(t, e) {
  Xt = String(t), J = "start", ce = [], Ct = 0, fe = 1, re = 0, X = void 0, cs = void 0, je = void 0;
  do
    X = pr(), Ar[J]();
  while (X.type !== "eof");
  return typeof e == "function" ? Pt({ "": je }, "", e) : je;
};
function Pt(i, t, e) {
  const s = i[t];
  if (s != null && typeof s == "object")
    if (Array.isArray(s))
      for (let n = 0; n < s.length; n++) {
        const r = String(n), o = Pt(s, r, e);
        o === void 0 ? delete s[r] : Object.defineProperty(s, r, {
          value: o,
          writable: !0,
          enumerable: !0,
          configurable: !0
        });
      }
    else
      for (const n in s) {
        const r = Pt(s, n, e);
        r === void 0 ? delete s[n] : Object.defineProperty(s, n, {
          value: r,
          writable: !0,
          enumerable: !0,
          configurable: !0
        });
      }
  return e.call(i, t, s);
}
let G, E, $e, le, k;
function pr() {
  for (G = "default", E = "", $e = !1, le = 1; ; ) {
    k = ge();
    const i = _i[G]();
    if (i)
      return i;
  }
}
function ge() {
  if (Xt[Ct])
    return String.fromCodePoint(Xt.codePointAt(Ct));
}
function C() {
  const i = ge();
  return i === `
` ? (fe++, re = 0) : i ? re += i.length : re++, i && (Ct += i.length), i;
}
const _i = {
  default() {
    switch (k) {
      case "	":
      case "\v":
      case "\f":
      case " ":
      case " ":
      case "\uFEFF":
      case `
`:
      case "\r":
      case "\u2028":
      case "\u2029":
        C();
        return;
      case "/":
        C(), G = "comment";
        return;
      case void 0:
        return C(), Z("eof");
    }
    if (W.isSpaceSeparator(k)) {
      C();
      return;
    }
    return _i[J]();
  },
  comment() {
    switch (k) {
      case "*":
        C(), G = "multiLineComment";
        return;
      case "/":
        C(), G = "singleLineComment";
        return;
    }
    throw _(C());
  },
  multiLineComment() {
    switch (k) {
      case "*":
        C(), G = "multiLineCommentAsterisk";
        return;
      case void 0:
        throw _(C());
    }
    C();
  },
  multiLineCommentAsterisk() {
    switch (k) {
      case "*":
        C();
        return;
      case "/":
        C(), G = "default";
        return;
      case void 0:
        throw _(C());
    }
    C(), G = "multiLineComment";
  },
  singleLineComment() {
    switch (k) {
      case `
`:
      case "\r":
      case "\u2028":
      case "\u2029":
        C(), G = "default";
        return;
      case void 0:
        return C(), Z("eof");
    }
    C();
  },
  value() {
    switch (k) {
      case "{":
      case "[":
        return Z("punctuator", C());
      case "n":
        return C(), Ae("ull"), Z("null", null);
      case "t":
        return C(), Ae("rue"), Z("boolean", !0);
      case "f":
        return C(), Ae("alse"), Z("boolean", !1);
      case "-":
      case "+":
        C() === "-" && (le = -1), G = "sign";
        return;
      case ".":
        E = C(), G = "decimalPointLeading";
        return;
      case "0":
        E = C(), G = "zero";
        return;
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
        E = C(), G = "decimalInteger";
        return;
      case "I":
        return C(), Ae("nfinity"), Z("numeric", 1 / 0);
      case "N":
        return C(), Ae("aN"), Z("numeric", NaN);
      case '"':
      case "'":
        $e = C() === '"', E = "", G = "string";
        return;
    }
    throw _(C());
  },
  identifierNameStartEscape() {
    if (k !== "u")
      throw _(C());
    C();
    const i = Mt();
    switch (i) {
      case "$":
      case "_":
        break;
      default:
        if (!W.isIdStartChar(i))
          throw Ss();
        break;
    }
    E += i, G = "identifierName";
  },
  identifierName() {
    switch (k) {
      case "$":
      case "_":
      case "‌":
      case "‍":
        E += C();
        return;
      case "\\":
        C(), G = "identifierNameEscape";
        return;
    }
    if (W.isIdContinueChar(k)) {
      E += C();
      return;
    }
    return Z("identifier", E);
  },
  identifierNameEscape() {
    if (k !== "u")
      throw _(C());
    C();
    const i = Mt();
    switch (i) {
      case "$":
      case "_":
      case "‌":
      case "‍":
        break;
      default:
        if (!W.isIdContinueChar(i))
          throw Ss();
        break;
    }
    E += i, G = "identifierName";
  },
  sign() {
    switch (k) {
      case ".":
        E = C(), G = "decimalPointLeading";
        return;
      case "0":
        E = C(), G = "zero";
        return;
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
        E = C(), G = "decimalInteger";
        return;
      case "I":
        return C(), Ae("nfinity"), Z("numeric", le * (1 / 0));
      case "N":
        return C(), Ae("aN"), Z("numeric", NaN);
    }
    throw _(C());
  },
  zero() {
    switch (k) {
      case ".":
        E += C(), G = "decimalPoint";
        return;
      case "e":
      case "E":
        E += C(), G = "decimalExponent";
        return;
      case "x":
      case "X":
        E += C(), G = "hexadecimal";
        return;
    }
    return Z("numeric", le * 0);
  },
  decimalInteger() {
    switch (k) {
      case ".":
        E += C(), G = "decimalPoint";
        return;
      case "e":
      case "E":
        E += C(), G = "decimalExponent";
        return;
    }
    if (W.isDigit(k)) {
      E += C();
      return;
    }
    return Z("numeric", le * Number(E));
  },
  decimalPointLeading() {
    if (W.isDigit(k)) {
      E += C(), G = "decimalFraction";
      return;
    }
    throw _(C());
  },
  decimalPoint() {
    switch (k) {
      case "e":
      case "E":
        E += C(), G = "decimalExponent";
        return;
    }
    if (W.isDigit(k)) {
      E += C(), G = "decimalFraction";
      return;
    }
    return Z("numeric", le * Number(E));
  },
  decimalFraction() {
    switch (k) {
      case "e":
      case "E":
        E += C(), G = "decimalExponent";
        return;
    }
    if (W.isDigit(k)) {
      E += C();
      return;
    }
    return Z("numeric", le * Number(E));
  },
  decimalExponent() {
    switch (k) {
      case "+":
      case "-":
        E += C(), G = "decimalExponentSign";
        return;
    }
    if (W.isDigit(k)) {
      E += C(), G = "decimalExponentInteger";
      return;
    }
    throw _(C());
  },
  decimalExponentSign() {
    if (W.isDigit(k)) {
      E += C(), G = "decimalExponentInteger";
      return;
    }
    throw _(C());
  },
  decimalExponentInteger() {
    if (W.isDigit(k)) {
      E += C();
      return;
    }
    return Z("numeric", le * Number(E));
  },
  hexadecimal() {
    if (W.isHexDigit(k)) {
      E += C(), G = "hexadecimalInteger";
      return;
    }
    throw _(C());
  },
  hexadecimalInteger() {
    if (W.isHexDigit(k)) {
      E += C();
      return;
    }
    return Z("numeric", le * Number(E));
  },
  string() {
    switch (k) {
      case "\\":
        C(), E += fr();
        return;
      case '"':
        if ($e)
          return C(), Z("string", E);
        E += C();
        return;
      case "'":
        if (!$e)
          return C(), Z("string", E);
        E += C();
        return;
      case `
`:
      case "\r":
        throw _(C());
      case "\u2028":
      case "\u2029":
        Ir(k);
        break;
      case void 0:
        throw _(C());
    }
    E += C();
  },
  start() {
    switch (k) {
      case "{":
      case "[":
        return Z("punctuator", C());
    }
    G = "value";
  },
  beforePropertyName() {
    switch (k) {
      case "$":
      case "_":
        E = C(), G = "identifierName";
        return;
      case "\\":
        C(), G = "identifierNameStartEscape";
        return;
      case "}":
        return Z("punctuator", C());
      case '"':
      case "'":
        $e = C() === '"', G = "string";
        return;
    }
    if (W.isIdStartChar(k)) {
      E += C(), G = "identifierName";
      return;
    }
    throw _(C());
  },
  afterPropertyName() {
    if (k === ":")
      return Z("punctuator", C());
    throw _(C());
  },
  beforePropertyValue() {
    G = "value";
  },
  afterPropertyValue() {
    switch (k) {
      case ",":
      case "}":
        return Z("punctuator", C());
    }
    throw _(C());
  },
  beforeArrayValue() {
    if (k === "]")
      return Z("punctuator", C());
    G = "value";
  },
  afterArrayValue() {
    switch (k) {
      case ",":
      case "]":
        return Z("punctuator", C());
    }
    throw _(C());
  },
  end() {
    throw _(C());
  }
};
function Z(i, t) {
  return {
    type: i,
    value: t,
    line: fe,
    column: re
  };
}
function Ae(i) {
  for (const t of i) {
    if (ge() !== t)
      throw _(C());
    C();
  }
}
function fr() {
  switch (ge()) {
    case "b":
      return C(), "\b";
    case "f":
      return C(), "\f";
    case "n":
      return C(), `
`;
    case "r":
      return C(), "\r";
    case "t":
      return C(), "	";
    case "v":
      return C(), "\v";
    case "0":
      if (C(), W.isDigit(ge()))
        throw _(C());
      return "\0";
    case "x":
      return C(), Cr();
    case "u":
      return C(), Mt();
    case `
`:
    case "\u2028":
    case "\u2029":
      return C(), "";
    case "\r":
      return C(), ge() === `
` && C(), "";
    case "1":
    case "2":
    case "3":
    case "4":
    case "5":
    case "6":
    case "7":
    case "8":
    case "9":
      throw _(C());
    case void 0:
      throw _(C());
  }
  return C();
}
function Cr() {
  let i = "", t = ge();
  if (!W.isHexDigit(t) || (i += C(), t = ge(), !W.isHexDigit(t)))
    throw _(C());
  return i += C(), String.fromCodePoint(parseInt(i, 16));
}
function Mt() {
  let i = "", t = 4;
  for (; t-- > 0; ) {
    const e = ge();
    if (!W.isHexDigit(e))
      throw _(C());
    i += C();
  }
  return String.fromCodePoint(parseInt(i, 16));
}
const Ar = {
  start() {
    if (X.type === "eof")
      throw Ie();
    Yt();
  },
  beforePropertyName() {
    switch (X.type) {
      case "identifier":
      case "string":
        cs = X.value, J = "afterPropertyName";
        return;
      case "punctuator":
        at();
        return;
      case "eof":
        throw Ie();
    }
  },
  afterPropertyName() {
    if (X.type === "eof")
      throw Ie();
    J = "beforePropertyValue";
  },
  beforePropertyValue() {
    if (X.type === "eof")
      throw Ie();
    Yt();
  },
  beforeArrayValue() {
    if (X.type === "eof")
      throw Ie();
    if (X.type === "punctuator" && X.value === "]") {
      at();
      return;
    }
    Yt();
  },
  afterPropertyValue() {
    if (X.type === "eof")
      throw Ie();
    switch (X.value) {
      case ",":
        J = "beforePropertyName";
        return;
      case "}":
        at();
    }
  },
  afterArrayValue() {
    if (X.type === "eof")
      throw Ie();
    switch (X.value) {
      case ",":
        J = "beforeArrayValue";
        return;
      case "]":
        at();
    }
  },
  end() {
  }
};
function Yt() {
  let i;
  switch (X.type) {
    case "punctuator":
      switch (X.value) {
        case "{":
          i = {};
          break;
        case "[":
          i = [];
          break;
      }
      break;
    case "null":
    case "boolean":
    case "numeric":
    case "string":
      i = X.value;
      break;
  }
  if (je === void 0)
    je = i;
  else {
    const t = ce[ce.length - 1];
    Array.isArray(t) ? t.push(i) : Object.defineProperty(t, cs, {
      value: i,
      writable: !0,
      enumerable: !0,
      configurable: !0
    });
  }
  if (i !== null && typeof i == "object")
    ce.push(i), Array.isArray(i) ? J = "beforeArrayValue" : J = "beforePropertyName";
  else {
    const t = ce[ce.length - 1];
    t == null ? J = "end" : Array.isArray(t) ? J = "afterArrayValue" : J = "afterPropertyValue";
  }
}
function at() {
  ce.pop();
  const i = ce[ce.length - 1];
  i == null ? J = "end" : Array.isArray(i) ? J = "afterArrayValue" : J = "afterPropertyValue";
}
function _(i) {
  return At(i === void 0 ? `JSON5: invalid end of input at ${fe}:${re}` : `JSON5: invalid character '${vi(i)}' at ${fe}:${re}`);
}
function Ie() {
  return At(`JSON5: invalid end of input at ${fe}:${re}`);
}
function Ss() {
  return re -= 5, At(`JSON5: invalid identifier character at ${fe}:${re}`);
}
function Ir(i) {
  console.warn(`JSON5: '${vi(i)}' in strings is not valid ECMAScript; consider escaping`);
}
function vi(i) {
  const t = {
    "'": "\\'",
    '"': '\\"',
    "\\": "\\\\",
    "\b": "\\b",
    "\f": "\\f",
    "\n": "\\n",
    "\r": "\\r",
    "	": "\\t",
    "\v": "\\v",
    "\0": "\\0",
    "\u2028": "\\u2028",
    "\u2029": "\\u2029"
  };
  if (t[i])
    return t[i];
  if (i < " ") {
    const e = i.charCodeAt(0).toString(16);
    return "\\x" + ("00" + e).substring(e.length);
  }
  return i;
}
function At(i) {
  const t = new SyntaxError(i);
  return t.lineNumber = fe, t.columnNumber = re, t;
}
var mr = function(t, e, s) {
  const n = [];
  let r = "", o, u, a = "", l;
  if (e != null && typeof e == "object" && !Array.isArray(e) && (s = e.space, l = e.quote, e = e.replacer), typeof e == "function")
    u = e;
  else if (Array.isArray(e)) {
    o = [];
    for (const c of e) {
      let g;
      typeof c == "string" ? g = c : (typeof c == "number" || c instanceof String || c instanceof Number) && (g = String(c)), g !== void 0 && o.indexOf(g) < 0 && o.push(g);
    }
  }
  return s instanceof Number ? s = Number(s) : s instanceof String && (s = String(s)), typeof s == "number" ? s > 0 && (s = Math.min(10, Math.floor(s)), a = "          ".substr(0, s)) : typeof s == "string" && (a = s.substr(0, 10)), p("", { "": t });
  function p(c, g) {
    let I = g[c];
    switch (I != null && (typeof I.toJSON5 == "function" ? I = I.toJSON5(c) : typeof I.toJSON == "function" && (I = I.toJSON(c))), u && (I = u.call(g, c, I)), I instanceof Number ? I = Number(I) : I instanceof String ? I = String(I) : I instanceof Boolean && (I = I.valueOf()), I) {
      case null:
        return "null";
      case !0:
        return "true";
      case !1:
        return "false";
    }
    if (typeof I == "string")
      return h(I);
    if (typeof I == "number")
      return String(I);
    if (typeof I == "object")
      return Array.isArray(I) ? w(I) : d(I);
  }
  function h(c) {
    const g = {
      "'": 0.1,
      '"': 0.2
    }, I = {
      "'": "\\'",
      '"': '\\"',
      "\\": "\\\\",
      "\b": "\\b",
      "\f": "\\f",
      "\n": "\\n",
      "\r": "\\r",
      "	": "\\t",
      "\v": "\\v",
      "\0": "\\0",
      "\u2028": "\\u2028",
      "\u2029": "\\u2029"
    };
    let m = "";
    for (let D = 0; D < c.length; D++) {
      const y = c[D];
      switch (y) {
        case "'":
        case '"':
          g[y]++, m += y;
          continue;
        case "\0":
          if (W.isDigit(c[D + 1])) {
            m += "\\x00";
            continue;
          }
      }
      if (I[y]) {
        m += I[y];
        continue;
      }
      if (y < " ") {
        let B = y.charCodeAt(0).toString(16);
        m += "\\x" + ("00" + B).substring(B.length);
        continue;
      }
      m += y;
    }
    const b = l || Object.keys(g).reduce((D, y) => g[D] < g[y] ? D : y);
    return m = m.replace(new RegExp(b, "g"), I[b]), b + m + b;
  }
  function d(c) {
    if (n.indexOf(c) >= 0)
      throw TypeError("Converting circular structure to JSON5");
    n.push(c);
    let g = r;
    r = r + a;
    let I = o || Object.keys(c), m = [];
    for (const D of I) {
      const y = p(D, c);
      if (y !== void 0) {
        let B = A(D) + ":";
        a !== "" && (B += " "), B += y, m.push(B);
      }
    }
    let b;
    if (m.length === 0)
      b = "{}";
    else {
      let D;
      if (a === "")
        D = m.join(","), b = "{" + D + "}";
      else {
        let y = `,
` + r;
        D = m.join(y), b = `{
` + r + D + `,
` + g + "}";
      }
    }
    return n.pop(), r = g, b;
  }
  function A(c) {
    if (c.length === 0)
      return h(c);
    const g = String.fromCodePoint(c.codePointAt(0));
    if (!W.isIdStartChar(g))
      return h(c);
    for (let I = g.length; I < c.length; I++)
      if (!W.isIdContinueChar(String.fromCodePoint(c.codePointAt(I))))
        return h(c);
    return c;
  }
  function w(c) {
    if (n.indexOf(c) >= 0)
      throw TypeError("Converting circular structure to JSON5");
    n.push(c);
    let g = r;
    r = r + a;
    let I = [];
    for (let b = 0; b < c.length; b++) {
      const D = p(String(b), c);
      I.push(D !== void 0 ? D : "null");
    }
    let m;
    if (I.length === 0)
      m = "[]";
    else if (a === "")
      m = "[" + I.join(",") + "]";
    else {
      let b = `,
` + r, D = I.join(b);
      m = `[
` + r + D + `,
` + g + "]";
    }
    return n.pop(), r = g, m;
  }
};
const Dr = {
  parse: dr,
  stringify: mr
};
var j = Dr;
class Ni {
  constructor(t) {
    f(this, "$app");
    f(this, "_ref");
    f(this, "_events", new Fe());
    f(this, "_framesPerSeconds", {
      delay: 0,
      // 1000 ms to delay
      velocity: 0
      // 60 fps per 1000 ms
    });
    f(this, "_deltaTime", 0);
    f(this, "_lastTime", 0);
    f(this, "_frame", 0);
    f(this, "_status", {
      pause: !1,
      playing: !1
    });
    f(this, "_state", {
      frames: 0,
      startTime: performance.now(),
      fps: 0
    });
    this.$app = t;
  }
  get DELTA_TIME() {
    return this._deltaTime;
  }
  get TIME_STAMP() {
    return this._lastTime;
  }
  get FRAME() {
    return this._frame;
  }
  get FPS() {
    return this._state.fps;
  }
  get framesPerSeconds() {
    return Object.freeze({
      delay: this._framesPerSeconds.delay,
      velocity: this._framesPerSeconds.velocity
    });
  }
  get isPlaying() {
    return this._status.playing;
  }
  get isPause() {
    return this._status.pause;
  }
  /**
   *
   * pasar a otro worker
   */
  // protected calculateFPS() {
  //   const time = performance.now()
  //   const delayTime = time - this._state.startTime
  //   if (delayTime > this._framesPerSeconds.delay) {
  //     this._state.fps = Math.round(
  //       (this._state.frames * this._framesPerSeconds.delay) / delayTime
  //     )
  //     this._state.frames = 0
  //     this._state.startTime = time
  //   }
  //   this._state.frames++
  // }
  async loop(t) {
    this._lastTime || (this._lastTime = t), this._deltaTime = t - this._lastTime;
    const e = this.$app.useGlobal("mode") === "preview";
    this.$app.useGlobal("re-draw"), this.$app.mode === "game" ? (await this.$app.script.process({
      timestamp: t,
      deltaTime: this._deltaTime
    }), await this.$app.drawer.process()) : (this.$app.mode === "editor" || e) && (await this.$app.script.process({
      timestamp: t,
      deltaTime: this._deltaTime
    }), await this.$app.drawer.process(), this.$app.changeGlobal("re-draw", !1)), this._ref = window.requestAnimationFrame(this.loop.bind(this));
  }
  play() {
    this._status.playing || (this[v]("animation:play"), this._status.playing = !0, this._status.pause = !1, this._ref = window.requestAnimationFrame(this.loop.bind(this)));
  }
  pause() {
    this._status.playing && (this[v]("animation:pause"), window.cancelAnimationFrame(this._ref), this._status.playing = !1, this._status.pause = !0, this._frame = 0, this._lastTime = 0, this._deltaTime = 0);
  }
  setDelayFrames(t) {
    this._framesPerSeconds.delay = t, this._frame = 0, this._lastTime = 0, this._deltaTime = 0;
  }
  setVelocityFrames(t) {
    this._framesPerSeconds.velocity = t, this._frame = 0, this._lastTime = 0, this._deltaTime = 0;
  }
  emit(t, e) {
    this._events.addEventListener(t, e);
  }
  [v](t, ...e) {
    this._events.emitEvent(t, e);
  }
}
const ne = Symbol("PropFunctions"), P = Symbol("PropAttributes"), M = Symbol("PropMetaKeys"), Y = Symbol("PropNodes"), x = Symbol("PropType"), $t = Symbol("MethodSetParent"), Ki = Symbol("MethodSetUUID"), wr = Symbol("MethodSetFunctions"), Yi = Symbol("MethodSetAttributes"), br = Symbol("MethodSetMetaKeys"), De = Symbol("MethodSetIndex"), Wi = Symbol("MethodSetNodes"), xe = class xe {
  static import(t, e = "JSON") {
    throw new Error("Method not implemented! Use derived class");
  }
  getApp() {
    return xe.$app;
  }
  static [js](t) {
    xe.$app = t;
  }
};
f(xe, "$app");
let It = xe;
var Be = 256, dt = [], lt;
for (; Be--; ) dt[Be] = (Be + 256).toString(16).substring(1);
function yr() {
  var i = 0, t, e = "";
  if (!lt || Be + 16 > 256) {
    for (lt = Array(i = 256); i--; ) lt[i] = 256 * Math.random() | 0;
    i = Be = 0;
  }
  for (; i < 16; i++)
    t = lt[Be + i], i == 6 ? e += dt[t & 15 | 64] : i == 8 ? e += dt[t & 63 | 128] : e += dt[t], i & 1 && i > 1 && i < 11 && (e += "-");
  return Be++, e;
}
const Br = Object.getPrototypeOf(async function() {
}).constructor, Sr = async (i, t, e) => {
  const s = `return {$functions:{${i.indexOf("_ready") !== -1 ? "_ready," : ""}${i.indexOf("_process") !== -1 ? "_process," : ""}${i.indexOf("_draw") !== -1 ? "_draw," : ""}}};`, n = `with (node) {${i};
${s}}`;
  return await new Br("node, viewport", n)(t, e);
}, Er = {
  description: "",
  title: "",
  name: "GlobalNode"
}, z = (i, t, e = []) => {
  const s = {};
  for (const n in i)
    t.indexOf(n) == -1 && (s[n] = i[n]);
  if (e.length > 0)
    for (const n of e)
      s[n] = 0;
  return s;
};
var Ys, Ws, Rs, Os, Hs;
class hs extends It {
  constructor(e) {
    super();
    f(this, "_omit", ["name", "description"]);
    f(this, "_options");
    f(this, "_initial");
    f(this, "_events");
    f(this, "_parent");
    f(this, "_uuid");
    f(this, "_index");
    f(this, Hs, "primitive:node");
    f(this, "NODE_NAME", "PrimitiveNode");
    f(this, "script");
    f(this, Os);
    f(this, Rs);
    f(this, Ws);
    f(this, Ys);
    this._initial = {
      ...Er,
      ...e
    }, this._options = { ...this._initial }, this._events = new Fe(), this._parent = null, this._uuid = yr(), this._index = 0, this.script = null, this[Y] = [], this[ne] = /* @__PURE__ */ new Map(), this[P] = /* @__PURE__ */ new Map(), this[M] = /* @__PURE__ */ new Map();
  }
  get nodes() {
    return this[Y];
  }
  get firstNode() {
    if (this._parent) return this._parent.nodes[0];
  }
  get lastNode() {
    if (this._parent) return this._parent.nodes[this._parent.nodes.length - 1];
  }
  get nextSiblingNode() {
    if (this._parent) return this._parent.nodes[this.index + 1];
  }
  get previousSiblingNode() {
    if (this._parent) return this._parent.nodes[this.index - 1];
  }
  get parent() {
    return this._parent;
  }
  get uuid() {
    return this._uuid;
  }
  get index() {
    return this._index;
  }
  get deep() {
    return this.parent ? this.parent.deep + "_" + this.index : this.index.toString();
  }
  get name() {
    return this._options.name;
  }
  get title() {
    return this._options.title;
  }
  get description() {
    return this._options.description;
  }
  set name(e) {
    this._options.name = e;
  }
  set title(e) {
    this._options.title = e;
  }
  set description(e) {
    this._options.description = e, this.getApp().drawer.updateNode(this.deep, "property", "deep", {
      property: "description",
      value: e
    }), this.getApp().drawer.reDraw(), this.getApp().changeGlobal("re-draw", !0);
  }
  cloneNode() {
    return q([this[L](!0)])[0];
  }
  getNode(e) {
    return this[Y].find((s) => s.uuid == e);
  }
  addNode(...e) {
    for (const s of e)
      s[De](this[Y].length), s[$t](this), this[Y].push(s), this.getApp().drawer.addNode(
        s[Q](),
        this.deep,
        "deep"
      );
    this.getApp().drawer.reDraw(), this.getApp().changeGlobal("re-draw", !0);
  }
  hasNode(e) {
    return this[Y].findIndex((s) => s.uuid === e) !== -1;
  }
  deleteNode(e) {
    let s = this.getNode(e);
    return s ? (this[Y].splice(s.index, 1), this.getApp().drawer.reDraw(), this.getApp().changeGlobal("re-draw", !0), s = void 0, !0) : !1;
  }
  clearNodes() {
    this[Y] = [], this.getApp().drawer.reDraw(), this.getApp().changeGlobal("re-draw", !0);
  }
  replaceNode(e, s) {
    const n = this.getNode(e);
    if (!n) throw new Error("node not found");
    s[De](n.index), this[Y][n.index] = s, this.getApp().drawer.reDraw(), this.getApp().changeGlobal("re-draw", !0);
  }
  replaceNodeByIndex(e, s) {
    if (e < 0 || e >= this[Y].length)
      throw new Error("Indexes out ranges");
    if (!this[Y][e]) throw new Error("node not found");
    s[De](e), this[Y][e] = s, this.getApp().drawer.reDraw(), this.getApp().changeGlobal("re-draw", !0);
  }
  searchNode(e) {
    const s = [this];
    for (; s.length > 0; ) {
      let n = s.shift();
      if ((n == null ? void 0 : n.uuid) === e)
        return n;
      s.push(...Array.from((n == null ? void 0 : n.nodes) ?? []));
    }
  }
  searchNodeByIndex(e) {
    if (e < 0 || e >= this[Y].length)
      throw new Error("Indexes out ranges");
    const s = [this];
    for (; s.length > 0; ) {
      let n = s.shift();
      if ((n == null ? void 0 : n.index) === e)
        return n;
      s.push(...Array.from((n == null ? void 0 : n.nodes) ?? []));
    }
  }
  moveNode(e, s) {
    const n = this.getNode(e);
    if (!n) throw new Error("node not found");
    if (s < 0 || s >= this[Y].length)
      throw new Error("Indexes out ranges");
    const r = this[Y].slice(), [o] = r.splice(n.index, 1);
    r.splice(s, 0, o);
    for (let u = 0; u < r.length; u++)
      r[u][De](u);
    this[Y] = r, this.getApp().drawer.reDraw(), this.getApp().changeGlobal("re-draw", !0);
  }
  moveNodeByIndex(e, s) {
    if (e < 0 || e >= this[Y].length || s < 0 || s >= this[Y].length)
      throw new Error("Indexes out ranges");
    const n = this[Y].slice(), [r] = n.splice(e, 1);
    n.splice(s, 0, r);
    for (let o = 0; o < n.length; o++)
      n[o][De](o);
    this[Y] = n, this.getApp().drawer.reDraw(), this.getApp().changeGlobal("re-draw", !0);
  }
  getFunctions() {
    return [...this[ne].values()];
  }
  getFunction(e) {
    return this[ne].get(e);
  }
  addFunction(e, s) {
    this[ne].set(e, s), this.getApp().drawer.reDraw(), this.getApp().changeGlobal("re-draw", !0);
  }
  hasFunction(e) {
    return this[ne].has(e);
  }
  deleteFunction(e) {
    return this.getApp().drawer.reDraw(), this.getApp().changeGlobal("re-draw", !0), this[ne].delete(e);
  }
  executeFunction(e, ...s) {
    const n = this.getFunction(e);
    if (!n) throw new Error("function not found");
    n(s), this.getApp().drawer.reDraw(), this.getApp().changeGlobal("re-draw", !0);
  }
  clearFunctions() {
    this[ne].clear(), this.getApp().drawer.reDraw(), this.getApp().changeGlobal("re-draw", !0);
  }
  getAttributes() {
    return [...this[P].values()];
  }
  getAttribute(e) {
    return this[P].get(e);
  }
  addAttribute(e, s) {
    this[P].set(e, s), this.getApp().drawer.reDraw(), this.getApp().changeGlobal("re-draw", !0);
  }
  hasAttribute(e) {
    return this[P].has(e);
  }
  deleteAttribute(e) {
    return this.getApp().drawer.reDraw(), this.getApp().changeGlobal("re-draw", !0), this[P].delete(e);
  }
  clearAttributes() {
    this[P].clear(), this.getApp().drawer.reDraw(), this.getApp().changeGlobal("re-draw", !0);
  }
  getMetaKeys() {
    return [...this[M].values()];
  }
  getMetaKey(e) {
    return this[M].get(e);
  }
  addMetaKey(e, s) {
    this[M].set(e, s), this.getApp().drawer.reDraw(), this.getApp().changeGlobal("re-draw", !0);
  }
  hasMetaKey(e) {
    return this[M].has(e);
  }
  deleteMetaKey(e) {
    return this.getApp().changeGlobal("re-draw", !0), this.getApp().drawer.reDraw(), this[M].delete(e);
  }
  clearMetaKeys() {
    this[M].clear(), this.getApp().drawer.reDraw(), this.getApp().changeGlobal("re-draw", !0);
  }
  emit(e, s) {
    return this._events.addEventListener(e, s);
  }
  reset(e) {
    e ? (this._options[e] = this._initial[e], this._omit.includes(e) || this.getApp().drawer.updateNode(this.deep, "property", "deep", {
      property: e,
      value: this._initial[e]
    })) : (this._options = { ...this._initial }, this.getApp().drawer.updateNode(this.deep, "properties", "deep", {
      properties: z(this._initial, this._omit)
    })), this.getApp().drawer.reDraw(), this.getApp().changeGlobal("re-draw", !0);
  }
  toObject() {
    return this._options;
  }
  set(e, s, n) {
    if (e && typeof e == "string" && s)
      this._options[e] = s, this._omit.includes(e) || this.getApp().drawer.updateNode(this.deep, "property", "deep", {
        property: e,
        value: s
      });
    else if (typeof n != "string") {
      for (const [r, o] of Object.entries(this.properties))
        this._options[r] = o;
      this.getApp().drawer.updateNode(this.deep, "properties", "deep", {
        properties: z(n, this._omit)
      });
    }
    this.getApp().drawer.reDraw(), this.getApp().changeGlobal("re-draw", !0);
  }
  export(e = "JSON") {
    return e === "YAML" ? Gt(this[L]()) : j.stringify(this[L]());
  }
  static import(e, s = "JSON") {
    const n = s === "YAML" ? ue(e) : j.parse(e);
    return q([n])[0];
  }
  [(Hs = x, Os = Y, Rs = ne, Ws = P, Ys = M, $t)](e) {
    this._parent = e;
  }
  [Ki](e) {
    this._uuid = e;
  }
  [De](e) {
    this._index = e;
  }
  [wr](e) {
    this[ne] = new Map(e);
  }
  [Yi](e) {
    this[P] = new Map(e);
  }
  [br](e) {
    this[M] = new Map(e);
  }
  [Wi](e) {
    this[Y] = e;
  }
  [v](e, ...s) {
    return this._events.emitEvent(e, ...s);
  }
  async [Ne]() {
    if (this.script === null) return;
    let e = {
      width: 0,
      height: 0
    };
    const s = this.getApp();
    s instanceof xr ? e = s.options.game.viewport : s instanceof Ui && (e = s.options.viewport);
    const n = await Sr(this.script, this, e), r = Object.entries(n.$functions);
    this[ne] = new Map(r);
  }
  [Q](e = !0) {
    const s = [];
    if (e && this.nodes.length)
      for (const n of this.nodes)
        s.push(n[Q](!0));
    return {
      __type__: this[x],
      deep: this.deep,
      index: this.index,
      nodes: s,
      uuid: this.uuid,
      options: z(this.toObject(), this._omit)
    };
  }
  [L](e = !0) {
    const s = [];
    if (e && this.nodes.length)
      for (const n of this.nodes)
        s.push(n[L](e));
    return {
      uuid: this._uuid,
      attributes: [...this[P].entries()],
      metaKeys: [...this[M].entries()],
      type: this.NODE_NAME,
      script: this.script,
      deep: this.deep,
      index: this.index,
      nodes: s,
      options: this.toObject()
    };
  }
}
const Es = {
  rotationType: "degrees",
  rotation: 0,
  cursor: "default",
  height: 10,
  name: "Node2D",
  description: "",
  title: "",
  originX: "center",
  originY: "center",
  centerRotation: !0,
  centerScale: !0,
  scaleX: 1,
  scaleY: 1,
  skewX: 1,
  skewY: 1,
  visible: !0,
  lock: !1,
  selectable: !0,
  width: 10,
  flipX: !1,
  flipY: !1,
  x: 0,
  y: 0
};
var Ts;
class ae extends hs {
  constructor(e) {
    super({ ...Es, ...e });
    f(this, Ts, "primitive:2D/node");
    f(this, "_omit", [
      "centerRotation",
      "centerScale",
      "flipX",
      "flipY",
      "originX",
      "originY",
      "rotationType",
      "title",
      "name"
    ]);
    f(this, "_options");
    f(this, "_initial");
    f(this, "NODE_NAME", "Node2D");
    this._initial = { ...Es, ...e }, this._options = { ...this._initial };
  }
  get visible() {
    return this._options.visible;
  }
  get selectable() {
    return this._options.selectable;
  }
  get lock() {
    return this._options.lock;
  }
  get cursor() {
    return this._options.cursor;
  }
  get x() {
    return this._options.x;
  }
  get y() {
    return this._options.y;
  }
  get width() {
    return this._options.width;
  }
  get height() {
    return this._options.height;
  }
  get rotationType() {
    return this._options.rotationType;
  }
  get centerScale() {
    return this._options.centerScale;
  }
  get centerRotation() {
    return this._options.centerRotation;
  }
  get flipX() {
    return this._options.flipX;
  }
  get flipY() {
    return this._options.flipY;
  }
  get originX() {
    return this._options.originX;
  }
  get originY() {
    return this._options.originY;
  }
  get scaleX() {
    return this._options.scaleX;
  }
  get scaleY() {
    return this._options.scaleY;
  }
  get skewX() {
    return this._options.skewX;
  }
  get skewY() {
    return this._options.skewY;
  }
  get rotation() {
    return this._options.rotation;
  }
  set visible(e) {
    this._options.visible = e, this.getApp().drawer.updateNode(this.deep, "property", "deep", {
      property: "visible",
      value: e
    }), this.getApp().drawer.reDraw(), this.getApp().changeGlobal("re-draw", !0);
  }
  set selectable(e) {
    this._options.selectable = e, this.getApp().drawer.updateNode(this.deep, "property", "deep", {
      property: "selectable",
      value: e
    }), this.getApp().drawer.reDraw(), this.getApp().changeGlobal("re-draw", !0);
  }
  set lock(e) {
    this._options.lock = e, this.getApp().drawer.updateNode(this.deep, "property", "deep", {
      property: "lock",
      value: e
    }), this.getApp().drawer.reDraw(), this.getApp().changeGlobal("re-draw", !0);
  }
  set cursor(e) {
    this._options.cursor = e, this.getApp().drawer.updateNode(this.deep, "property", "deep", {
      property: "cursor",
      value: e
    }), this.getApp().drawer.reDraw(), this.getApp().changeGlobal("re-draw", !0);
  }
  set x(e) {
    this._options.x = e, this.getApp().drawer.updateNode(this.deep, "properties", "deep", {
      properties: {
        x: e,
        calculate: this.processCalculate()
      }
    }), this.getApp().drawer.reDraw(), this.getApp().changeGlobal("re-draw", !0);
  }
  set y(e) {
    this._options.y = e, this.getApp().drawer.updateNode(this.deep, "properties", "deep", {
      properties: {
        y: e,
        calculate: this.processCalculate()
      }
    }), this.getApp().drawer.reDraw(), this.getApp().changeGlobal("re-draw", !0);
  }
  set width(e) {
    this._options.width = e, this.getApp().drawer.updateNode(this.deep, "properties", "deep", {
      properties: {
        width: e,
        calculate: this.processCalculate()
      }
    }), this.getApp().drawer.reDraw(), this.getApp().changeGlobal("re-draw", !0);
  }
  set height(e) {
    this._options.height = e, this.getApp().drawer.updateNode(this.deep, "properties", "deep", {
      properties: {
        height: e,
        calculate: this.processCalculate()
      }
    }), this.getApp().drawer.reDraw(), this.getApp().changeGlobal("re-draw", !0);
  }
  set rotationType(e) {
    this._options.rotationType = e, this.getApp().drawer.updateNode(this.deep, "property", "deep", {
      property: "calculate",
      value: this.processCalculate()
    }), this.getApp().drawer.reDraw(), this.getApp().changeGlobal("re-draw", !0);
  }
  set centerScale(e) {
    this._options.centerScale = e, this.getApp().drawer.reDraw(), this.getApp().changeGlobal("re-draw", !0);
  }
  set centerRotation(e) {
    this._options.centerRotation = e, this.getApp().drawer.reDraw(), this.getApp().changeGlobal("re-draw", !0);
  }
  set flipX(e) {
    this._options.flipX = e, this.getApp().drawer.reDraw(), this.getApp().changeGlobal("re-draw", !0);
  }
  set flipY(e) {
    this._options.flipY = e, this.getApp().drawer.reDraw(), this.getApp().changeGlobal("re-draw", !0);
  }
  set originX(e) {
    this._options.originX = e, this.getApp().drawer.reDraw(), this.getApp().changeGlobal("re-draw", !0);
  }
  set originY(e) {
    this._options.originY = e, this.getApp().drawer.reDraw(), this.getApp().changeGlobal("re-draw", !0);
  }
  set scaleX(e) {
    this._options.scaleX = e, this.getApp().drawer.updateNode(this.deep, "properties", "deep", {
      properties: {
        scaleX: e,
        calculate: this.processCalculate()
      }
    }), this.getApp().drawer.reDraw(), this.getApp().changeGlobal("re-draw", !0);
  }
  set scaleY(e) {
    this._options.scaleY = e, this.getApp().drawer.updateNode(this.deep, "properties", "deep", {
      properties: {
        scaleY: e,
        calculate: this.processCalculate()
      }
    }), this.getApp().drawer.reDraw(), this.getApp().changeGlobal("re-draw", !0);
  }
  set skewX(e) {
    this._options.skewX = e, this.getApp().drawer.updateNode(this.deep, "property", "deep", {
      property: "skewX",
      value: e
    }), this.getApp().drawer.reDraw(), this.getApp().changeGlobal("re-draw", !0);
  }
  set skewY(e) {
    this._options.skewY = e, this.getApp().drawer.updateNode(this.deep, "property", "deep", {
      property: "skewY",
      value: e
    }), this.getApp().drawer.reDraw(), this.getApp().changeGlobal("re-draw", !0);
  }
  set rotation(e) {
    this._options.rotation = e, this.getApp().drawer.updateNode(this.deep, "properties", "deep", {
      properties: {
        rotation: e,
        calculate: this.processCalculate()
      }
    }), this.getApp().drawer.reDraw(), this.getApp().changeGlobal("re-draw", !0);
  }
  setOrigin(e) {
    if (e === "center")
      this.originX = e, this.originY = e;
    else {
      const [s, n] = e.split("-");
      this.originX = n, this.originY = s;
    }
  }
  setScale(e) {
    this.scaleX = e, this.scaleY = e;
  }
  scaleToWidth(e) {
    this.scaleX = e / this.width;
  }
  scaleToHeight(e) {
    this.scaleY = e / this.height;
  }
  setSkew(e) {
    this.skewX = e, this.skewY = e;
  }
  center() {
    this._parent && this._parent instanceof ae ? (this.x = (this._parent.width * this._parent.scaleX / 2 - this.width * this.scaleX / 2) / 2, this.y = (this._parent.height * this._parent.scaleY / 2 - this.height * this.scaleY / 2) / 2) : (this.x = this.getApp().width / 2, this.y = this.getApp().height / 2);
  }
  centerX() {
    this._parent && this._parent instanceof ae ? this.x = (this._parent.width * this._parent.scaleX / 2 - this.width * this.scaleX / 2) / 2 : this.x = (this.getApp().width / 2 - this.width * this.scaleX / 2) / 2;
  }
  centerY() {
    this._parent && this._parent instanceof ae ? this.y = (this._parent.height * this._parent.scaleY / 2 - this.height * this.scaleY / 2) / 2 : this.y = (this.getApp().height / 2 - this.height * this.scaleY / 2) / 2;
  }
  processCalculate() {
    const e = this.getApp().useGlobal("scale-viewport"), s = {
      middleScaleFactor: {
        height: 0,
        width: 0
      },
      rotation: 0,
      scaleFactor: {
        height: 0,
        width: 0
      },
      translate: {
        x: 0,
        y: 0
      }
    };
    return s.translate = {
      x: this.x * e,
      y: this.y * e
    }, s.rotation = this.rotationType === "degrees" ? this.rotation * Math.PI / 180 : this.rotation, s.scaleFactor = {
      width: this.width * this.scaleX * e,
      height: this.height * this.scaleY * e
    }, s.middleScaleFactor = {
      width: s.scaleFactor.width / 2,
      height: s.scaleFactor.height / 2
    }, s;
  }
  emit(e, s) {
    return this._events.addEventListener(e, s);
  }
  reset(e) {
    if (e)
      this._options[e] = this._initial[e], this._omit.includes(e) || this.getApp().drawer.updateNode(this.deep, "property", "deep", {
        property: e,
        value: this._initial[e]
      });
    else {
      this._options = { ...this._initial };
      const s = z(this._initial, this._omit, ["calculate"]);
      s.calculate = this.processCalculate(), this.getApp().drawer.updateNode(this.deep, "properties", "deep", {
        properties: s
      });
    }
    this.getApp().drawer.reDraw(), this.getApp().changeGlobal("re-draw", !0);
  }
  toObject() {
    return this._options;
  }
  set(e, s, n) {
    if (e && typeof e == "string" && s)
      this._options[e] = s, this._omit.includes(e) || this.getApp().drawer.updateNode(this.deep, "property", "deep", {
        property: e,
        value: s
      });
    else if (typeof n != "string") {
      for (const [r, o] of Object.entries(this._initial))
        this._options[r] = o;
      this.getApp().drawer.updateNode(this.deep, "properties", "deep", {
        properties: z(n, this._omit)
      });
    }
    this.getApp().drawer.reDraw(), this.getApp().changeGlobal("re-draw", !0);
  }
  static import(e, s = "JSON") {
    const n = s === "YAML" ? ue(e) : j.parse(e);
    return q([n])[0];
  }
  [(Ts = x, Q)](e = !0) {
    const s = [];
    if (e && this.nodes.length)
      for (const r of this.nodes)
        s.push(r[Q](!0));
    const n = {
      __type__: this[x],
      deep: this.deep,
      index: this.index,
      nodes: s,
      uuid: this.uuid,
      options: z(this.toObject(), this._omit, ["calculate"])
    };
    return n.options.calculate = this.processCalculate(), n;
  }
  [L](e = !0) {
    const s = [];
    if (e && this.nodes.length)
      for (const n of this.nodes)
        s.push(n[L](e));
    return {
      uuid: this._uuid,
      attributes: [...this[P].entries()],
      metaKeys: [...this[M].entries()],
      type: this.NODE_NAME,
      script: this.script,
      deep: this.deep,
      index: this.index,
      nodes: s,
      options: this.toObject()
    };
  }
}
var Vs;
class Ri extends hs {
  constructor(e) {
    super(e);
    f(this, Vs, "primitive:2D/scene");
    f(this, "NODE_NAME", "Scene2D");
  }
  reset(e) {
    e ? (this._options[e] = this._initial[e], this._omit.includes(e) || this.getApp().drawer.updateNode(this.deep, "property", "deep", {
      property: e,
      value: this._initial[e]
    })) : (this._options = { ...this._initial }, this.getApp().drawer.updateNode(this.deep, "properties", "deep", {
      properties: z(this._initial, this._omit)
    })), this.getApp().drawer.reDraw(), this.getApp().changeGlobal("re-draw", !0);
  }
  toObject() {
    return this._options;
  }
  set(e, s, n) {
    if (e && typeof e == "string" && s)
      this._options[e] = s, this._omit.includes(e) || this.getApp().drawer.updateNode(this.deep, "property", "deep", {
        property: e,
        value: s
      });
    else if (typeof n != "string") {
      for (const [r, o] of Object.entries(this.properties))
        this._options[r] = o;
      this.getApp().drawer.updateNode(this.deep, "properties", "deep", {
        properties: z(n, this._omit)
      });
    }
    this.getApp().drawer.reDraw(), this.getApp().changeGlobal("re-draw", !0);
  }
  static import(e, s = "JSON") {
    const n = s === "YAML" ? ue(e) : j.parse(e);
    return q([n])[0];
  }
  [(Vs = x, Q)](e = !0) {
    const s = [];
    if (e && this.nodes.length)
      for (const n of this.nodes)
        s.push(n[Q](!0));
    return {
      __type__: this[x],
      deep: this.deep,
      index: this.index,
      nodes: s,
      uuid: this.uuid
    };
  }
  [L](e = !0) {
    const s = [];
    if (e && this.nodes.length)
      for (const n of this.nodes)
        s.push(n[L](e));
    return {
      uuid: this._uuid,
      attributes: [...this[P].entries()],
      metaKeys: [...this[M].entries()],
      type: this.NODE_NAME,
      script: this.script,
      deep: this.deep,
      index: this.index,
      nodes: s,
      options: this.toObject()
    };
  }
}
const Fs = {
  rotation: 0,
  cursor: "default",
  height: 100,
  name: "Rectangle2D",
  description: "",
  title: "",
  originX: "center",
  originY: "center",
  centerRotation: !0,
  centerScale: !0,
  scaleX: 1,
  scaleY: 1,
  skewX: 1,
  skewY: 1,
  visible: !0,
  width: 100,
  x: 0,
  y: 0,
  background: "black",
  border: !1,
  borderColor: "",
  borderWidth: 0,
  radius: 0,
  flipX: !1,
  flipY: !1,
  lock: !1,
  selectable: !0,
  rotationType: "degrees"
};
var Xs;
class Fr extends ae {
  constructor(e) {
    super({ ...Fs, ...e });
    f(this, Xs, "draw:2D/rectangle");
    f(this, "_options");
    f(this, "_initial");
    f(this, "NODE_NAME", "Rectangle2D");
    this._initial = { ...Fs, ...e }, this._options = { ...this._initial };
  }
  get background() {
    return this._options.background;
  }
  get radius() {
    return this._options.radius;
  }
  get border() {
    return this._options.border;
  }
  get borderColor() {
    return this._options.borderColor;
  }
  get borderWidth() {
    return this._options.borderWidth;
  }
  set background(e) {
    this._options.background = e, this.getApp().drawer.updateNode(this.deep, "property", "deep", {
      property: "background",
      value: e
    }), this.getApp().drawer.reDraw(), this.getApp().changeGlobal("re-draw", !0);
  }
  set radius(e) {
    this._options.radius = e, this.getApp().drawer.updateNode(this.deep, "property", "deep", {
      property: "radius",
      value: e
    }), this.getApp().drawer.reDraw(), this.getApp().changeGlobal("re-draw", !0);
  }
  set border(e) {
    this._options.border = e, this.getApp().drawer.updateNode(this.deep, "property", "deep", {
      property: "border",
      value: e
    }), this.getApp().drawer.reDraw(), this.getApp().changeGlobal("re-draw", !0);
  }
  set borderColor(e) {
    this._options.borderColor = e, this.getApp().drawer.updateNode(this.deep, "property", "deep", {
      property: "borderColor",
      value: e
    }), this.getApp().drawer.reDraw(), this.getApp().changeGlobal("re-draw", !0);
  }
  set borderWidth(e) {
    this._options.borderWidth = e, this.getApp().drawer.updateNode(this.deep, "property", "deep", {
      property: "borderWidth",
      value: e
    }), this.getApp().drawer.reDraw(), this.getApp().changeGlobal("re-draw", !0);
  }
  reset(e) {
    if (e)
      this._options[e] = this._initial[e], this._omit.includes(e) || this.getApp().drawer.updateNode(this.deep, "property", "deep", {
        property: e,
        value: this._initial[e]
      });
    else {
      this._options = { ...this._initial };
      const s = z(this._initial, this._omit, ["calculate"]);
      s.calculate = this.processCalculate(), this.getApp().drawer.updateNode(this.deep, "properties", "deep", {
        properties: s
      });
    }
    this.getApp().drawer.reDraw(), this.getApp().changeGlobal("re-draw", !0);
  }
  toObject() {
    return this._options;
  }
  set(e, s, n) {
    if (e && typeof e == "string" && s)
      this._options[e] = s, this._omit.includes(e) || this.getApp().drawer.updateNode(this.deep, "property", "deep", {
        property: e,
        value: s
      });
    else if (typeof n != "string") {
      for (const [r, o] of Object.entries(this._initial))
        this._options[r] = o;
      this.getApp().drawer.updateNode(this.deep, "properties", "deep", {
        properties: z(n, this._omit)
      });
    }
    this.getApp().drawer.reDraw(), this.getApp().changeGlobal("re-draw", !0);
  }
  static import(e, s = "JSON") {
    const n = s === "YAML" ? ue(e) : j.parse(e);
    return q([n])[0];
  }
  [(Xs = x, Q)](e = !0) {
    const s = [];
    if (e && this.nodes.length)
      for (const r of this.nodes)
        s.push(r[Q](!0));
    const n = {
      __type__: this[x],
      deep: this.deep,
      index: this.index,
      nodes: s,
      uuid: this.uuid,
      options: z(this.toObject(), this._omit, ["calculate"])
    };
    return n.options.calculate = this.processCalculate(), n;
  }
  [L](e = !0) {
    const s = [];
    if (e && this.nodes.length)
      for (const n of this.nodes)
        s.push(n[L](e));
    return {
      uuid: this._uuid,
      attributes: [...this[P].entries()],
      metaKeys: [...this[M].entries()],
      type: this.NODE_NAME,
      script: this.script,
      deep: this.deep,
      index: this.index,
      nodes: s,
      options: this.toObject()
    };
  }
}
const Gs = {
  background: "#000",
  border: !0,
  borderColor: "#eee",
  borderWidth: 1,
  centerRotation: !0,
  centerScale: !0,
  cursor: "default",
  description: "",
  endX: 0,
  endY: 0,
  flipX: !1,
  flipY: !1,
  height: 100,
  width: 100,
  lock: !1,
  name: "Selection2D",
  originX: "center",
  originY: "center",
  radius: 0,
  rotation: 0,
  scaleX: 1,
  scaleY: 1,
  selectable: !0,
  shape: "rectangle",
  skewX: 1,
  skewY: 1,
  startX: 0,
  startY: 0,
  title: "",
  rotationType: "degrees",
  visible: !0,
  x: 0,
  y: 0
};
var Ps;
class Gr extends ae {
  constructor(e) {
    super({ ...Gs, ...e });
    f(this, Ps, "draw:2D/selection");
    f(this, "_options");
    f(this, "_initial");
    f(this, "_selectedNodes", /* @__PURE__ */ new Set());
    f(this, "_intersectionNode", () => !1);
    f(this, "NODE_NAME", "Selection2D");
    this._initial = { ...Gs, ...e }, this._options = this._initial;
  }
  get endX() {
    return this._options.endX;
  }
  get endY() {
    return this._options.endY;
  }
  get startX() {
    return this._options.startX;
  }
  get startY() {
    return this._options.startY;
  }
  get shape() {
    return this._options.shape;
  }
  get background() {
    return this._options.background;
  }
  get radius() {
    return this._options.radius;
  }
  get border() {
    return this._options.border;
  }
  get borderColor() {
    return this._options.borderColor;
  }
  get borderWidth() {
    return this._options.borderWidth;
  }
  set endX(e) {
    this._options.endX = e;
  }
  set endY(e) {
    this._options.endY = e;
  }
  set startX(e) {
    this._options.startX = e;
  }
  set startY(e) {
    this._options.startY = e;
  }
  set shape(e) {
    this._options.shape = e;
  }
  set background(e) {
    this._options.background = e;
  }
  set radius(e) {
    this._options.radius = e;
  }
  set border(e) {
    this._options.border = e;
  }
  set borderColor(e) {
    this._options.borderColor = e;
  }
  set borderWidth(e) {
    this._options.borderWidth = e;
  }
  setIntersectionNode(e) {
    this._intersectionNode = e;
  }
  select(e) {
    for (let s of e)
      this._intersectionNode(s) ? this._selectedNodes.add(s) : this._selectedNodes.delete(s);
    this[v]("selection2D:nodes", [...this._selectedNodes]);
  }
  emit(e, s) {
    return this._events.addEventListener(e, s);
  }
  reset(e) {
    e ? this._options[e] = this._initial[e] : this._options = this._initial;
  }
  toObject() {
    return this._options;
  }
  set(e, s, n) {
    if (n && typeof n == "string" && s)
      this._options[n] = s;
    else if (typeof e != "string")
      for (const [r, o] of Object.entries(this._initial))
        this._options[r] = o;
  }
  static import(e, s = "JSON") {
    const n = s === "YAML" ? ue(e) : j.parse(e);
    return q([n])[0];
  }
  [(Ps = x, L)](e = !0) {
    const s = [];
    if (e && this.nodes.length)
      for (const n of this.nodes)
        s.push(n[L](e));
    return {
      uuid: this._uuid,
      attributes: [...this[P].entries()],
      metaKeys: [...this[M].entries()],
      type: this.NODE_NAME,
      script: this.script,
      deep: this.deep,
      index: this.index,
      nodes: s,
      options: {
        ...this.toObject()
      }
    };
  }
}
const ks = {
  cursor: "default",
  name: "LineFlowEffect2D",
  visible: !0,
  lock: !1,
  selectable: !0,
  cellSize: 15,
  lineWidth: 5,
  spacing: 5,
  radius: 0,
  color: "white",
  description: "",
  title: "",
  rotationType: "degrees",
  rotation: 0,
  height: 10,
  originX: "center",
  originY: "center",
  centerRotation: !0,
  centerScale: !0,
  scaleX: 1,
  scaleY: 1,
  skewX: 1,
  skewY: 1,
  width: 10,
  flipX: !1,
  flipY: !1,
  x: 0,
  y: 0
};
var Ms;
class kr extends ae {
  constructor(e) {
    super({ ...ks, ...e });
    f(this, Ms, "draw:2D/line-flow-effect");
    f(this, "_options");
    f(this, "_initial");
    f(this, "NODE_NAME", "LineFlowEffect2D");
    this._initial = { ...ks, ...e }, this._options = { ...this._initial };
  }
  get cellSize() {
    return this._options.cellSize;
  }
  get lineWidth() {
    return this._options.lineWidth;
  }
  get spacing() {
    return this._options.spacing;
  }
  get color() {
    return this._options.color;
  }
  get radius() {
    return this._options.radius;
  }
  set cellSize(e) {
    this._options.cellSize = e, this.getApp().drawer.updateNode(this.deep, "property", "deep", {
      property: "cellSize",
      value: e
    }), this.getApp().drawer.reDraw(), this.getApp().changeGlobal("re-draw", !0);
  }
  set lineWidth(e) {
    this._options.lineWidth = e, this.getApp().drawer.updateNode(this.deep, "property", "deep", {
      property: "lineWidth",
      value: e
    }), this.getApp().drawer.reDraw(), this.getApp().changeGlobal("re-draw", !0);
  }
  set spacing(e) {
    this._options.spacing = e, this.getApp().drawer.updateNode(this.deep, "property", "deep", {
      property: "spacing",
      value: e
    }), this.getApp().drawer.reDraw(), this.getApp().changeGlobal("re-draw", !0);
  }
  set color(e) {
    this._options.color = e, this.getApp().drawer.updateNode(this.deep, "property", "deep", {
      property: "color",
      value: e
    }), this.getApp().drawer.reDraw(), this.getApp().changeGlobal("re-draw", !0);
  }
  set radius(e) {
    this._options.radius = e, this.getApp().drawer.updateNode(this.deep, "property", "deep", {
      property: "radius",
      value: e
    }), this.getApp().drawer.reDraw(), this.getApp().changeGlobal("re-draw", !0);
  }
  reset(e) {
    if (e)
      this._options[e] = this._initial[e], this._omit.includes(e) || this.getApp().drawer.updateNode(this.deep, "property", "deep", {
        property: e,
        value: this._initial[e]
      });
    else {
      this._options = { ...this._initial };
      const s = z(this._initial, this._omit, ["calculate"]);
      s.calculate = this.processCalculate(), this.getApp().drawer.updateNode(this.deep, "properties", "deep", {
        properties: s
      });
    }
    this.getApp().drawer.reDraw(), this.getApp().changeGlobal("re-draw", !0);
  }
  toObject() {
    return this._options;
  }
  set(e, s, n) {
    if (e && typeof e == "string" && s)
      this._options[e] = s, this._omit.includes(e) || this.getApp().drawer.updateNode(this.deep, "property", "deep", {
        property: e,
        value: s
      });
    else if (typeof n != "string") {
      for (const [r, o] of Object.entries(this._initial))
        this._options[r] = o;
      this.getApp().drawer.updateNode(this.deep, "properties", "deep", {
        properties: z(n, this._omit)
      });
    }
    this.getApp().drawer.reDraw(), this.getApp().changeGlobal("re-draw", !0);
  }
  static import(e, s = "JSON") {
    const n = s === "YAML" ? ue(e) : j.parse(e);
    return q([n])[0];
  }
  [(Ms = x, Q)](e = !0) {
    const s = [];
    if (e && this.nodes.length)
      for (const r of this.nodes)
        s.push(r[Q](!0));
    const n = {
      __type__: this[x],
      deep: this.deep,
      index: this.index,
      nodes: s,
      uuid: this.uuid,
      options: z(this.toObject(), this._omit, ["calculate"])
    };
    return n.options.calculate = this.processCalculate(), n;
  }
  [L](e = !0) {
    const s = [];
    if (e && this.nodes.length)
      for (const n of this.nodes)
        s.push(n[L](e));
    return {
      uuid: this._uuid,
      attributes: [...this[P].entries()],
      metaKeys: [...this[M].entries()],
      type: this.NODE_NAME,
      script: this.script,
      deep: this.deep,
      index: this.index,
      nodes: s,
      options: this.toObject()
    };
  }
}
const Ls = {
  rotation: 0,
  cursor: "default",
  height: 0,
  name: "Text2D",
  originX: "center",
  originY: "center",
  centerRotation: !0,
  centerScale: !0,
  scaleX: 1,
  scaleY: 1,
  skewX: 1,
  skewY: 1,
  visible: !0,
  width: 0,
  x: 0,
  y: 0,
  fontFamily: "system-ui",
  fontSize: "0px",
  fontStretch: "normal",
  fontStyle: "normal",
  fontVariant: "normal",
  fontWeight: "normal",
  lineHeight: "normal",
  textBaseline: "alphabetic",
  textDirection: "ltr",
  text: "",
  textAlign: "left",
  border: !1,
  borderColor: "",
  borderWidth: 0,
  color: "black",
  wordSpacing: "0px",
  letterSpacing: "0px",
  flipX: !1,
  flipY: !1,
  lock: !1,
  selectable: !0,
  title: "",
  description: "",
  rotationType: "degrees"
};
var $s;
class Lr extends ae {
  constructor(e) {
    super({ ...Ls, ...e });
    f(this, $s, "draw:2D/text");
    f(this, "_options");
    f(this, "_initial");
    f(this, "NODE_NAME", "Text2D");
    this._initial = { ...Ls, ...e }, this._options = this._initial;
  }
  get border() {
    return this._options.border;
  }
  get borderColor() {
    return this._options.borderColor;
  }
  get borderWidth() {
    return this._options.borderWidth;
  }
  get text() {
    return this._options.text;
  }
  get fontSize() {
    return this._options.fontSize;
  }
  get fontFamily() {
    return this._options.fontFamily;
  }
  get fontStretch() {
    return this._options.fontStretch;
  }
  get fontStyle() {
    return this._options.fontStyle;
  }
  get fontWeight() {
    return this._options.fontWeight;
  }
  get fontVariant() {
    return this._options.fontVariant;
  }
  get lineHeight() {
    return this._options.lineHeight;
  }
  get textAlign() {
    return this._options.textAlign;
  }
  get textBaseline() {
    return this._options.textBaseline;
  }
  get textDirection() {
    return this._options.textDirection;
  }
  get wordSpacing() {
    return this._options.wordSpacing;
  }
  get letterSpacing() {
    return this._options.letterSpacing;
  }
  get color() {
    return this._options.color;
  }
  set border(e) {
    this._options.border = e;
  }
  set borderColor(e) {
    this._options.borderColor = e;
  }
  set borderWidth(e) {
    this._options.borderWidth = e;
  }
  set text(e) {
    this._options.text = e;
  }
  set fontSize(e) {
    this._options.fontSize = e;
  }
  set fontFamily(e) {
    this._options.fontFamily = e;
  }
  set fontStretch(e) {
    this._options.fontStretch = e;
  }
  set fontStyle(e) {
    this._options.fontStyle = e;
  }
  set fontWeight(e) {
    this._options.fontWeight = e;
  }
  set fontVariant(e) {
    this._options.fontVariant = e;
  }
  set lineHeight(e) {
    this._options.lineHeight = e;
  }
  set textAlign(e) {
    this._options.textAlign = e;
  }
  set textBaseline(e) {
    this._options.textBaseline = e;
  }
  set textDirection(e) {
    this._options.textDirection = e;
  }
  set wordSpacing(e) {
    this._options.wordSpacing = e;
  }
  set letterSpacing(e) {
    this._options.letterSpacing = e;
  }
  set color(e) {
    this._options.color = e;
  }
  reset(e) {
    e ? this._options[e] = this._initial[e] : this._options = this._initial;
  }
  toObject() {
    return this._options;
  }
  set(e, s, n) {
    if (e && typeof e == "string" && s)
      this._options[e] = s;
    else if (typeof n != "string")
      for (const [r, o] of Object.entries(this._initial))
        this._options[r] = o;
  }
  static import(e, s = "JSON") {
    const n = s === "YAML" ? ue(e) : j.parse(e);
    return q([n])[0];
  }
  [($s = x, L)](e = !0) {
    const s = [];
    if (e && this.nodes.length)
      for (const n of this.nodes)
        s.push(n[L](e));
    return {
      uuid: this._uuid,
      functions: [...this[ne].entries()],
      attributes: [...this[P].entries()],
      metaKeys: [...this[M].entries()],
      type: this.NODE_NAME,
      script: this.script,
      deep: this.deep,
      index: this.index,
      nodes: s,
      options: {
        ...this.toObject()
      }
    };
  }
}
const Zs = {
  background: "#fff",
  border: !0,
  borderColor: "#eee",
  borderWidth: 1,
  centerRotation: !0,
  centerScale: !0,
  cornerBorder: !0,
  cornerColor: "blue",
  cornerColorBorder: "red",
  cornerSize: 2,
  cursor: "default",
  description: "",
  flipX: !1,
  flipY: !1,
  height: 0,
  width: 0,
  lock: !1,
  name: "ControlEdition2D",
  originX: "center",
  originY: "center",
  padding: 10,
  radius: 0,
  rotation: 0,
  rotationType: "degrees",
  scaleX: 1,
  scaleY: 1,
  selectable: !0,
  showCorner: !0,
  skewX: 1,
  skewY: 1,
  title: "",
  visible: !0,
  x: 0,
  y: 0
};
var Js;
class Zr extends ae {
  constructor(e) {
    super({ ...Zs, ...e });
    f(this, Js, "draw:2D/control-edition");
    f(this, "_options");
    f(this, "_initial");
    f(this, "NODE_NAME", "ControlEdition2D");
    this._initial = { ...Zs, ...e }, this._options = this._initial;
  }
  get padding() {
    return this._options.padding;
  }
  get cornerSize() {
    return this._options.cornerSize;
  }
  get cornerColor() {
    return this._options.cornerColor;
  }
  get cornerBorder() {
    return this._options.cornerBorder;
  }
  get cornerColorBorder() {
    return this._options.cornerColorBorder;
  }
  get showCorner() {
    return this._options.showCorner;
  }
  get background() {
    return this._options.background;
  }
  get radius() {
    return this._options.radius;
  }
  get border() {
    return this._options.border;
  }
  get borderColor() {
    return this._options.borderColor;
  }
  get borderWidth() {
    return this._options.borderWidth;
  }
  set padding(e) {
    this._options.padding = e;
  }
  set cornerSize(e) {
    this._options.cornerSize = e;
  }
  set cornerColor(e) {
    this._options.cornerColor = e;
  }
  set cornerBorder(e) {
    this._options.cornerBorder = e;
  }
  set cornerColorBorder(e) {
    this._options.cornerColorBorder = e;
  }
  set showCorner(e) {
    this._options.showCorner = e;
  }
  set background(e) {
    this._options.background = e;
  }
  set radius(e) {
    this._options.radius = e;
  }
  set border(e) {
    this._options.border = e;
  }
  set borderColor(e) {
    this._options.borderColor = e;
  }
  set borderWidth(e) {
    this._options.borderWidth = e;
  }
  reset(e) {
    e ? this._options[e] = this._initial[e] : this._options = this._initial;
  }
  toObject() {
    return this._options;
  }
  set(e, s, n) {
    if (n && typeof n == "string" && s)
      this._options[n] = s;
    else if (typeof e != "string")
      for (const [r, o] of Object.entries(this._initial))
        this._options[r] = o;
  }
  static import(e, s = "JSON") {
    const n = s === "YAML" ? ue(e) : j.parse(e);
    return q([n])[0];
  }
  [(Js = x, L)](e = !0) {
    const s = [];
    if (e && this.nodes.length)
      for (const n of this.nodes)
        s.push(n[L](e));
    return {
      uuid: this._uuid,
      attributes: [...this[P].entries()],
      metaKeys: [...this[M].entries()],
      type: this.NODE_NAME,
      script: this.script,
      deep: this.deep,
      index: this.index,
      nodes: s,
      options: {
        ...this.toObject()
      }
    };
  }
}
const _r = {
  PrimitiveNode: hs,
  Node2D: ae,
  Scene2D: Ri,
  Rectangle2D: Fr,
  Selection2D: Gr,
  LineFlowEffect2D: kr,
  Text2D: Lr,
  ControlEdition2D: Zr
}, q = (i, t) => {
  const e = [];
  for (const s of i) {
    const n = new _r[s.type](s.options);
    t && n[$t](t), n.script = s.script, n[Ki](s.uuid), n[De](s.index), n[Yi](s.attributes), n[Wi](
      q(s.nodes, n)
    ), e.push(n);
  }
  return e;
};
class Oi {
  constructor(t) {
    f(this, "$app");
    f(this, "_scenes", /* @__PURE__ */ new Map());
    f(this, "_scene");
    f(this, "_events", new Fe());
    this.$app = t, It[js](this.$app);
  }
  get currentScene() {
    return this._scene;
  }
  get(t) {
    if (!this._scenes.has(t))
      throw new Error('not found scene "' + t + '"');
    return this._scenes.get(t);
  }
  add(...t) {
    for (let e of t)
      if (e instanceof Ri) this._scenes.set(e.uuid, e);
      else throw new Error("this instance is not a scene");
    this[v]("scene:add", t);
  }
  delete(t) {
    var e;
    this._scenes.delete(t), t === ((e = this.currentScene) == null ? void 0 : e.uuid) && (this._scene = void 0), this[v]("scene:delete", t);
  }
  change(t) {
    this._scene = this.get(t), this[v]("scene:change", t);
  }
  reset(t) {
    if (t && (t.reset(), t.nodes.length > 0))
      for (const e of t.nodes)
        this.reset(e);
  }
  getScenes() {
    return [...this._scenes.values()];
  }
  export(t = "JSON") {
    return this[v]("scene:export"), t === "YAML" ? Gt(this[L]()) : j.stringify(this[L]());
  }
  import(t, e = "JSON") {
    this[v]("scene:import");
    const s = e === "YAML" ? ue(t) : j.parse(t), n = q(s).map((r) => [
      r.uuid,
      r
    ]);
    this._scenes = new Map(n);
  }
  emit(t, e) {
    this._events.addEventListener(t, e);
  }
  [v](t, ...e) {
    this._events.emitEvent(t, e);
  }
  [L]() {
    const t = [];
    for (const e of this.getScenes())
      t.push(e[L]());
    return t;
  }
}
class Hi {
}
class vr extends Hi {
  constructor(e) {
    super();
    f(this, "type");
    f(this, "canvas");
    f(this, "_size", {
      height: 0,
      width: 0
    });
    this.type = "editor", this.canvas = document.createElement("canvas"), this._size = { ...this._size, ...e }, this.init();
  }
  load() {
    return this.canvas.transferControlToOffscreen();
  }
  init() {
    this.canvas.width = this._size.width, this.canvas.height = this._size.height, this.canvas.style.position = "absolute", this.canvas.style.left = "0px", this.canvas.style.top = "0px", this.canvas.style.cursor = "default", this.canvas.style.userSelect = "none", this.canvas.style.touchAction = "none", this.canvas.setAttribute("data-type-canvas", this.type);
  }
}
class Nr extends Hi {
  constructor(e) {
    super();
    f(this, "type");
    f(this, "canvas");
    f(this, "_size", {
      height: 0,
      width: 0
    });
    this.type = "game", this.canvas = document.createElement("canvas"), this._size = { ...this._size, ...e }, this.init();
  }
  load() {
    return this.canvas.transferControlToOffscreen();
  }
  init() {
    this.canvas.width = this._size.width, this.canvas.height = this._size.height, this.canvas.style.position = "absolute", this.canvas.style.left = "0px", this.canvas.style.top = "0px", this.canvas.style.cursor = "default", this.canvas.style.userSelect = "none", this.canvas.style.touchAction = "none", this.canvas.setAttribute("data-type-canvas", this.type);
  }
}
class Ti {
  constructor(t) {
    f(this, "$app");
    f(this, "_canvas", /* @__PURE__ */ new Map());
    f(this, "_main");
    f(this, "_event");
    this.$app = t;
    const { width: e, height: s } = this.processSize();
    this.$app.mode === "editor" && this._canvas.set(
      "editor",
      new vr({
        width: e,
        height: s
      })
    ), this.$app.mode === "game" && this._canvas.set(
      "game",
      new Nr({
        width: e,
        height: s
      })
    ), this.initLayerEvent(e, s), this.initLayerCanvas(this.$app.options.selector, e, s);
  }
  get event() {
    return this._event;
  }
  get main() {
    return this._main;
  }
  get instance() {
    let t = document.createElement("canvas");
    return this.$app.mode === "game" && (t = this._canvas.get("game").canvas), this.$app.mode === "editor" && (t = this._canvas.get("editor").canvas), t;
  }
  processSize() {
    return this.$app.mode === "editor" ? {
      width: this.$app.options.width,
      height: this.$app.options.height
    } : {
      width: this.$app.options.viewport.width,
      height: this.$app.options.viewport.height
    };
  }
  initLayerCanvas(t, e, s) {
    var n;
    if (!this._main) {
      if (this._main = document.createElement("section"), this._main.style.userSelect = "none", this._main.style.position = "relative", this._main.setAttribute("data-canvas-container", this.$app.mode), this._main.style.width = e + "px", this._main.style.height = s + "px", this._main.style.background = this.$app.options.background, this.$app.mode === "editor") {
        const r = this._canvas.get("editor");
        this._main.appendChild(r.canvas);
      }
      if (this.$app.mode === "game") {
        const r = this._canvas.get("game");
        this._main.appendChild(r.canvas);
      }
      this._main.appendChild(this.event), (n = document.querySelector(t)) == null || n.appendChild(this._main);
    }
  }
  initLayerEvent(t, e) {
    this._event || (this._event = document.createElement("div"), this._event.style.width = t + "px", this._event.style.height = e + "px", this._event.style.position = "absolute", this._event.style.left = "0px", this._event.style.top = "0px", this._event.style.cursor = "default", this._event.style.userSelect = "none", this._event.style.touchAction = "none", this._event.setAttribute("data-type-canvas", "events"));
  }
  setSize(t, e, s = !1) {
    this._main && this._event && (s || (this.instance.width = t, this.instance.height = e), this._event.style.width = t + "px", this._event.style.height = e + "px", this._main.style.width = t + "px", this._main.style.height = e + "px");
  }
}
class Vi {
  constructor(t) {
    f(this, "$app");
    f(this, "root_node");
    f(this, "_events", new Fe());
    this.$app = t;
  }
  async ready() {
    this.root_node && await this.executeFunctionReady(this.root_node);
  }
  async process(t) {
    this.root_node && this.$app.mode === "game" && await this.executeFunctionScriptGame(this.root_node, t), this.root_node && this.$app.mode === "editor" && await this.executeFunctionScriptEditor(this.root_node, t);
  }
  async executeFunctionReady(t) {
    const e = this.$app, s = e.useGlobal("mode") === "preview", n = t.getFunction("_ready");
    if (e.mode === "editor" && t && (t != null && t.visible) && s && n && await n(), e.mode === "game" && t && (t != null && t.visible) && n && await n(), t.nodes.length > 0)
      for (const r of t.nodes)
        await this.executeFunctionReady(r);
  }
  async executeFunctionScriptEditor(t, e) {
    const n = this.$app.useGlobal("mode") === "preview", r = t.getFunction("_draw"), o = t.getFunction("_process");
    if (t && (t != null && t.visible) && n && o && await o(e), t && t[x].startsWith("draw:2D") && n && r && await r(), t.nodes.length > 0)
      for (const u of t.nodes)
        await this.executeFunctionScriptEditor(u, e);
  }
  async executeFunctionScriptGame(t, e) {
    const s = t.getFunction("_draw"), n = t.getFunction("_process");
    if (t && (t != null && t.visible) && n && await n(e), t && t[x].startsWith("draw:2D") && s && await s(), t.nodes.length > 0)
      for (const r of t.nodes)
        await this.executeFunctionScriptGame(r, e);
  }
  async [Ne](t = this.root_node) {
    if (this[v]("script:execute"), t[Ne](), t.nodes.length > 0)
      for (const e of t.nodes)
        await this[Ne](e);
  }
  export(t = "JSON") {
    return this[v]("script:export"), t === "YAML" ? Gt(this[L]()) : j.stringify(this[L]());
  }
  import(t, e = "JSON") {
    this[v]("script:import");
  }
  emit(t, e) {
    this._events.addEventListener(t, e);
  }
  [Jt](t) {
    this.root_node = t;
  }
  [v](t, ...e) {
    this._events.emitEvent(t, e);
  }
  [L]() {
    return [];
  }
}
const Xi = "bGV0IHAgPSBbXTsKZnVuY3Rpb24geSh7CiAgem9vbTogZSwKICBwYW46IHMsCiAgbm9kZTogbywKICBtb3VzZUNvb3JkczogaQp9KSB7CiAgY29uc3QgYSA9IG8ueCAtIG8ud2lkdGggKiBvLnNjYWxlWCAvIDIsIGwgPSBvLnkgLSBvLmhlaWdodCAqIG8uc2NhbGVZIC8gMiwgciA9IG8ud2lkdGggKiBvLnNjYWxlWCwgaCA9IG8uaGVpZ2h0ICogby5zY2FsZVksIG4gPSAoaS54IC0gcy54KSAvIGUsIHQgPSAoaS55IC0gcy55KSAvIGUsIGMgPSAobiAtIG8ueCkgKiBNYXRoLmNvcygtby5yb3RhdGlvbiAqIE1hdGguUEkgLyAxODApIC0gKHQgLSBvLnkpICogTWF0aC5zaW4oLW8ucm90YXRpb24gKiBNYXRoLlBJIC8gMTgwKSArIG8ueCwgeCA9IChuIC0gby54KSAqIE1hdGguc2luKC1vLnJvdGF0aW9uICogTWF0aC5QSSAvIDE4MCkgKyAodCAtIG8ueSkgKiBNYXRoLmNvcygtby5yb3RhdGlvbiAqIE1hdGguUEkgLyAxODApICsgby55OwogIHJldHVybiBjID49IGEgJiYgYyA8PSBhICsgciAmJiB4ID49IGwgJiYgeCA8PSBsICsgaDsKfQpjb25zdCB1ID0gKGUsIHMsIG8pID0+IHsKICB2YXIgYSwgbCwgciwgaDsKICBsZXQgaSA9ICJkZWZhdWx0IjsKICBmb3IgKGxldCBuID0gZS5sZW5ndGggLSAxOyBuID49IDA7IG4tLSkgewogICAgY29uc3QgdCA9IGVbbl0sIGMgPSBzID8gewogICAgICB4OiAoYSA9IHMub3B0aW9ucykgPT0gbnVsbCA/IHZvaWQgMCA6IGEueCwKICAgICAgeTogKGwgPSBzLm9wdGlvbnMpID09IG51bGwgPyB2b2lkIDAgOiBsLnksCiAgICAgIHNjYWxlWDogKHIgPSBzLm9wdGlvbnMpID09IG51bGwgPyB2b2lkIDAgOiByLnNjYWxlWCwKICAgICAgc2NhbGVZOiAoaCA9IHMub3B0aW9ucykgPT0gbnVsbCA/IHZvaWQgMCA6IGguc2NhbGVZCiAgICB9IDogewogICAgICB4OiAwLAogICAgICB5OiAwLAogICAgICBzY2FsZVg6IDEsCiAgICAgIHNjYWxlWTogMQogICAgfTsKICAgIGlmICh0Lm9wdGlvbnMgJiYgeSh7CiAgICAgIHpvb206IDEsCiAgICAgIHBhbjogewogICAgICAgIHg6IDAsCiAgICAgICAgeTogMAogICAgICB9LAogICAgICBub2RlOiB7CiAgICAgICAgeDogdC5vcHRpb25zLnggKyBjLngsCiAgICAgICAgeTogdC5vcHRpb25zLnkgKyBjLnksCiAgICAgICAgd2lkdGg6IHQub3B0aW9ucy53aWR0aCwKICAgICAgICBoZWlnaHQ6IHQub3B0aW9ucy5oZWlnaHQsCiAgICAgICAgc2NhbGVYOiB0Lm9wdGlvbnMuc2NhbGVYICogYy5zY2FsZVgsCiAgICAgICAgc2NhbGVZOiB0Lm9wdGlvbnMuc2NhbGVZICogYy5zY2FsZVksCiAgICAgICAgcm90YXRpb246IHQub3B0aW9ucy5yb3RhdGlvbgogICAgICB9LAogICAgICBtb3VzZUNvb3JkczogbwogICAgfSkpIHsKICAgICAgaSA9IHQub3B0aW9ucy5jdXJzb3IgPT09ICJkZWZhdWx0IiA/ICJtb3ZlIiA6IHQub3B0aW9ucy5jdXJzb3I7CiAgICAgIGJyZWFrOwogICAgfSBlbHNlCiAgICAgIGkgPSB1KHQubm9kZXMsIHQsIG8pOwogIH0KICByZXR1cm4gaTsKfSwgZCA9IChlLCBzLCBvKSA9PiB7CiAgdmFyIGEsIGwsIHIsIGg7CiAgbGV0IGk7CiAgZm9yIChsZXQgbiA9IGUubGVuZ3RoIC0gMTsgbiA+PSAwOyBuLS0pIHsKICAgIGNvbnN0IHQgPSBlW25dLCBjID0gcyA/IHsKICAgICAgeDogKGEgPSBzLm9wdGlvbnMpID09IG51bGwgPyB2b2lkIDAgOiBhLngsCiAgICAgIHk6IChsID0gcy5vcHRpb25zKSA9PSBudWxsID8gdm9pZCAwIDogbC55LAogICAgICBzY2FsZVg6IChyID0gcy5vcHRpb25zKSA9PSBudWxsID8gdm9pZCAwIDogci5zY2FsZVgsCiAgICAgIHNjYWxlWTogKGggPSBzLm9wdGlvbnMpID09IG51bGwgPyB2b2lkIDAgOiBoLnNjYWxlWQogICAgfSA6IHsKICAgICAgeDogMCwKICAgICAgeTogMCwKICAgICAgc2NhbGVYOiAxLAogICAgICBzY2FsZVk6IDEKICAgIH07CiAgICBpZiAodC5vcHRpb25zICYmIHkoewogICAgICB6b29tOiAxLAogICAgICBwYW46IHsKICAgICAgICB4OiAwLAogICAgICAgIHk6IDAKICAgICAgfSwKICAgICAgbm9kZTogewogICAgICAgIHg6IHQub3B0aW9ucy54ICsgYy54LAogICAgICAgIHk6IHQub3B0aW9ucy55ICsgYy55LAogICAgICAgIHdpZHRoOiB0Lm9wdGlvbnMud2lkdGgsCiAgICAgICAgaGVpZ2h0OiB0Lm9wdGlvbnMuaGVpZ2h0LAogICAgICAgIHNjYWxlWDogdC5vcHRpb25zLnNjYWxlWCAqIGMuc2NhbGVYLAogICAgICAgIHNjYWxlWTogdC5vcHRpb25zLnNjYWxlWSAqIGMuc2NhbGVZLAogICAgICAgIHJvdGF0aW9uOiB0Lm9wdGlvbnMucm90YXRpb24KICAgICAgfSwKICAgICAgbW91c2VDb29yZHM6IG8KICAgIH0pKSB7CiAgICAgIGNvbnN0IHggPSB0Lm9wdGlvbnMueCArIHQub3B0aW9ucy53aWR0aCAvIDIsIFggPSB0Lm9wdGlvbnMueSArIHQub3B0aW9ucy5oZWlnaHQgLyAyOwogICAgICBNYXRoLnNxcnQoCiAgICAgICAgTWF0aC5wb3coby54IC0geCwgMikgKyBNYXRoLnBvdyhvLnkgLSBYLCAyKQogICAgICApLCBpID0gdDsKICAgICAgYnJlYWs7CiAgICB9IGVsc2UKICAgICAgaSA9IGQodC5ub2RlcywgdCwgbyk7CiAgfQogIHJldHVybiBpOwp9OwpzZWxmLm9ubWVzc2FnZSA9IGZ1bmN0aW9uKGUpIHsKICBpZiAoZS5kYXRhLmFjdGlvbiA9PT0gInNldDpyb290IikKICAgIHAgPSBlLmRhdGEucm9vdDsKICBlbHNlIGlmIChlLmRhdGEuYWN0aW9uID09PSAic2VsZWN0Om5vZGUiKSB7CiAgICBpZiAocC5sZW5ndGggPT09IDApIHJldHVybjsKICAgIGNvbnN0IHMgPSBwWzBdLm5vZGVzLCBvID0gZS5kYXRhLm1vdXNlQ29vcmRzLCBpID0gZChzLCB2b2lkIDAsIG8pOwogICAgc2VsZi5wb3N0TWVzc2FnZSh7CiAgICAgIHR5cGU6ICJzZWxlY3Q6bm9kZSIsCiAgICAgIHJlc3VsdDogaQogICAgfSk7CiAgfSBlbHNlIGlmIChlLmRhdGEuYWN0aW9uID09PSAiY3Vyc29yOm5vZGUiKSB7CiAgICBpZiAocC5sZW5ndGggPT09IDApIHJldHVybjsKICAgIGNvbnN0IHMgPSBwWzBdLm5vZGVzLCBvID0gZS5kYXRhLm1vdXNlQ29vcmRzLCBpID0gdShzLCB2b2lkIDAsIG8pOwogICAgc2VsZi5wb3N0TWVzc2FnZSh7CiAgICAgIHR5cGU6ICJjdXJzb3I6bm9kZSIsCiAgICAgIHJlc3VsdDogaQogICAgfSk7CiAgfQp9Owo=", Kr = (i) => Uint8Array.from(atob(i), (t) => t.charCodeAt(0)), _s = typeof window < "u" && window.Blob && new Blob(["URL.revokeObjectURL(import.meta.url);", Kr(Xi)], { type: "text/javascript;charset=utf-8" });
function Yr(i) {
  let t;
  try {
    if (t = _s && (window.URL || window.webkitURL).createObjectURL(_s), !t) throw "";
    const e = new Worker(t, {
      type: "module",
      name: i == null ? void 0 : i.name
    });
    return e.addEventListener("error", () => {
      (window.URL || window.webkitURL).revokeObjectURL(t);
    }), e;
  } catch {
    return new Worker(
      "data:text/javascript;base64," + Xi,
      {
        type: "module",
        name: i == null ? void 0 : i.name
      }
    );
  }
}
const Pi = "dmFyIHogPSBPYmplY3QuZGVmaW5lUHJvcGVydHk7CnZhciBGID0gKGUsIGEsIHQpID0+IGEgaW4gZSA/IHooZSwgYSwgeyBlbnVtZXJhYmxlOiAhMCwgY29uZmlndXJhYmxlOiAhMCwgd3JpdGFibGU6ICEwLCB2YWx1ZTogdCB9KSA6IGVbYV0gPSB0Owp2YXIgYyA9IChlLCBhLCB0KSA9PiBGKGUsIHR5cGVvZiBhICE9ICJzeW1ib2wiID8gYSArICIiIDogYSwgdCk7CmNvbnN0IFAgPSAoZSwgYSwgdCkgPT4gewogIGlmIChlLmluZGV4T2YoImxpbmVhci1ncmFkaWVudCIpICE9PSAtMSkgewogICAgY29uc3QgaSA9IGUucmVwbGFjZSgibGluZWFyLWdyYWRpZW50KCIsICIiKS5zbGljZSgwLCAtMSkuc3BsaXQoIiwiKSwgciA9IGEuY3JlYXRlTGluZWFyR3JhZGllbnQoCiAgICAgIDAsCiAgICAgIDAsCiAgICAgIHQud2lkdGgsCiAgICAgIHQuaGVpZ2h0CiAgICApOwogICAgcmV0dXJuIGkuZm9yRWFjaCgoaCkgPT4gewogICAgICBjb25zdCBsID0gaC50cmltKCkuc3BsaXQoIiAiKTsKICAgICAgci5hZGRDb2xvclN0b3AoTnVtYmVyKGxbMF0pLCBsWzFdKTsKICAgIH0pLCByOwogIH0gZWxzZQogICAgcmV0dXJuIGU7Cn0sIG0gPSAoZSkgPT4gewogIGUuY2xlYXJSZWN0KDAsIDAsIGUuY2FudmFzLndpZHRoLCBlLmNhbnZhcy5oZWlnaHQpOwp9LCBSID0gKGUpID0+IHsKICBlLnNhdmUoKTsKfSwgVyA9IChlKSA9PiB7CiAgZS5yZXN0b3JlKCk7Cn0sIE0gPSAoZSwgYSkgPT4gewogIGUudHJhbnNsYXRlKGEueCwgYS55KTsKfSwgQyA9IChlLCBhKSA9PiB7CiAgZS5zY2FsZShhLCBhKTsKfSwgSSA9IChlLCBhKSA9PiB7CiAgY29uc3QgeyBjYWxjdWxhdGU6IHQgfSA9IGE7CiAgZS5zYXZlKCksIGUudHJhbnNsYXRlKHQudHJhbnNsYXRlLngsIHQudHJhbnNsYXRlLnkpLCB0LnJvdGF0aW9uICE9PSAwICYmIGUucm90YXRlKHQucm90YXRpb24pLCBlLmdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbiA9ICJkZXN0aW5hdGlvbi1vdmVyIiwgZS5zdHJva2VTdHlsZSA9IGEuYm9yZGVyQ29sb3IsIGUubGluZVdpZHRoID0gYS5ib3JkZXJXaWR0aDsKICBjb25zdCBpID0gdC5zY2FsZUZhY3Rvci53aWR0aCArIGEucGFkZGluZyAqIDIsIHIgPSB0LnNjYWxlRmFjdG9yLmhlaWdodCArIGEucGFkZGluZyAqIDI7CiAgZS5iZWdpblBhdGgoKSwgZS5zdHJva2VSZWN0KAogICAgLWkgLyAyLAogICAgLXIgLyAyLAogICAgaSwKICAgIHIKICApLCBhLnNob3dDb3JuZXIgJiYgKGUuZmlsbFN0eWxlID0gYS5jb3JuZXJDb2xvciwgZS5iZWdpblBhdGgoKSwgZS5hcmMoCiAgICAtaSAvIDIsCiAgICAtciAvIDIsCiAgICBhLmNvcm5lclNpemUsCiAgICAwLAogICAgMiAqIE1hdGguUEkKICApLCBlLmZpbGwoKSwgZS5iZWdpblBhdGgoKSwgZS5hcmMoMCwgLXIgLyAyLCBhLmNvcm5lclNpemUsIDAsIDIgKiBNYXRoLlBJKSwgZS5maWxsKCksIGUuYmVnaW5QYXRoKCksIGUuYXJjKAogICAgaSAvIDIsCiAgICAtciAvIDIsCiAgICBhLmNvcm5lclNpemUsCiAgICAwLAogICAgMiAqIE1hdGguUEkKICApLCBlLmZpbGwoKSwgZS5iZWdpblBhdGgoKSwgZS5hcmMoLWkgLyAyLCAwLCBhLmNvcm5lclNpemUsIDAsIDIgKiBNYXRoLlBJKSwgZS5maWxsKCksIGUuYmVnaW5QYXRoKCksIGUuYXJjKGkgLyAyLCAwLCBhLmNvcm5lclNpemUsIDAsIDIgKiBNYXRoLlBJKSwgZS5maWxsKCksIGUuYmVnaW5QYXRoKCksIGUuYXJjKAogICAgLWkgLyAyLAogICAgciAvIDIsCiAgICBhLmNvcm5lclNpemUsCiAgICAwLAogICAgMiAqIE1hdGguUEkKICApLCBlLmZpbGwoKSwgZS5iZWdpblBhdGgoKSwgZS5hcmMoMCwgciAvIDIsIGEuY29ybmVyU2l6ZSwgMCwgMiAqIE1hdGguUEkpLCBlLmZpbGwoKSwgZS5iZWdpblBhdGgoKSwgZS5hcmMoCiAgICBpIC8gMiwKICAgIHIgLyAyLAogICAgYS5jb3JuZXJTaXplLAogICAgMCwKICAgIDIgKiBNYXRoLlBJCiAgKSwgZS5maWxsKCkpLCBlLmNsb3NlUGF0aCgpLCBlLnJlc3RvcmUoKTsKfSwgViA9IChlLCBhKSA9PiB7CiAgY29uc3QgeyBjYWxjdWxhdGU6IHQgfSA9IGE7CiAgZS5zYXZlKCksIGUudHJhbnNsYXRlKHQudHJhbnNsYXRlLngsIHQudHJhbnNsYXRlLnkpLCB0LnJvdGF0aW9uICE9PSAwICYmIGUucm90YXRlKHQucm90YXRpb24pLCBlLmxpbmVXaWR0aCA9IGEubGluZVdpZHRoLCBlLnN0cm9rZVN0eWxlID0gUChhLmNvbG9yLCBlLCB7CiAgICB3aWR0aDogYS53aWR0aCwKICAgIGhlaWdodDogYS5oZWlnaHQKICB9KTsKICBmb3IgKGxldCBpID0gLXQubWlkZGxlU2NhbGVGYWN0b3IuaGVpZ2h0OyBpIDwgdC5taWRkbGVTY2FsZUZhY3Rvci5oZWlnaHQ7IGkgKz0gYS5jZWxsU2l6ZSkKICAgIGZvciAobGV0IHIgPSAtdC5taWRkbGVTY2FsZUZhY3Rvci53aWR0aDsgciA8IHQubWlkZGxlU2NhbGVGYWN0b3Iud2lkdGg7IHIgKz0gYS5jZWxsU2l6ZSkgewogICAgICBlLmJlZ2luUGF0aCgpOwogICAgICBjb25zdCBoID0gKE1hdGguY29zKHIgKiAwLjAxKSArIE1hdGguc2luKGkgKiAwLjAxKSkgKiBhLnJhZGl1czsKICAgICAgZS5tb3ZlVG8ociwgaSksIGUubGluZVRvKAogICAgICAgIHIgKyBNYXRoLmNvcyhoKSAqIGEuc3BhY2luZywKICAgICAgICBpICsgTWF0aC5zaW4oaCkgKiBhLnNwYWNpbmcKICAgICAgKSwgZS5zdHJva2UoKTsKICAgIH0KICBlLnJlc3RvcmUoKTsKfSwgayA9IChlLCBhKSA9PiB7CiAgY29uc3QgeyBjYWxjdWxhdGU6IHQgfSA9IGE7CiAgZS5zYXZlKCksIGUudHJhbnNsYXRlKHQudHJhbnNsYXRlLngsIHQudHJhbnNsYXRlLnkpLCB0LnJvdGF0aW9uICE9PSAwICYmIGUucm90YXRlKHQucm90YXRpb24pLCBlLmZpbGxTdHlsZSA9IGEuYmFja2dyb3VuZCwgYS5ib3JkZXIgJiYgKGUuc3Ryb2tlU3R5bGUgPSBhLmJvcmRlckNvbG9yKSwgYS5ib3JkZXIgJiYgKGUubGluZVdpZHRoID0gYS5ib3JkZXJXaWR0aCksIGUuYmVnaW5QYXRoKCksIGEucmFkaXVzID8gdHlwZW9mIGEucmFkaXVzID09ICJudW1iZXIiIHx8IEFycmF5LmlzQXJyYXkoYS5yYWRpdXMpID8gZS5yb3VuZFJlY3QoCiAgICAtdC5taWRkbGVTY2FsZUZhY3Rvci53aWR0aCwKICAgIC10Lm1pZGRsZVNjYWxlRmFjdG9yLmhlaWdodCwKICAgIHQuc2NhbGVGYWN0b3Iud2lkdGgsCiAgICB0LnNjYWxlRmFjdG9yLmhlaWdodCwKICAgIGEucmFkaXVzCiAgKSA6IGUucm91bmRSZWN0KAogICAgLXQubWlkZGxlU2NhbGVGYWN0b3Iud2lkdGgsCiAgICAtdC5taWRkbGVTY2FsZUZhY3Rvci5oZWlnaHQsCiAgICB0LnNjYWxlRmFjdG9yLndpZHRoLAogICAgdC5zY2FsZUZhY3Rvci5oZWlnaHQsCiAgICBbCiAgICAgIGEucmFkaXVzLnRvcExlZnQsCiAgICAgIGEucmFkaXVzLnRvcFJpZ2h0LAogICAgICBhLnJhZGl1cy5ib3R0b21MZWZ0LAogICAgICBhLnJhZGl1cy50b3BSaWdodAogICAgXQogICkgOiBlLnJlY3QoCiAgICAtdC5taWRkbGVTY2FsZUZhY3Rvci53aWR0aCwKICAgIC10Lm1pZGRsZVNjYWxlRmFjdG9yLmhlaWdodCwKICAgIHQuc2NhbGVGYWN0b3Iud2lkdGgsCiAgICB0LnNjYWxlRmFjdG9yLmhlaWdodAogICksIGUuZmlsbCgpLCBhLmJvcmRlciAmJiBlLnN0cm9rZSgpLCBlLmNsb3NlUGF0aCgpLCBlLnJlc3RvcmUoKTsKfSwgWCA9IChlLCBhKSA9PiB7CiAgY29uc3QgeyBjYWxjdWxhdGU6IHQgfSA9IGE7CiAgZS5zYXZlKCksIHQucm90YXRpb24gIT09IDAgJiYgZS5yb3RhdGUodC5yb3RhdGlvbiksIGUuZmlsbFN0eWxlID0gYS5iYWNrZ3JvdW5kLCBhLmJvcmRlciAmJiAoZS5zdHJva2VTdHlsZSA9IGEuYm9yZGVyQ29sb3IpLCBhLmJvcmRlciAmJiAoZS5saW5lV2lkdGggPSBhLmJvcmRlcldpZHRoKSwgZS5iZWdpblBhdGgoKSwgYS5yYWRpdXMgPyB0eXBlb2YgYS5yYWRpdXMgPT0gIm51bWJlciIgfHwgQXJyYXkuaXNBcnJheShhLnJhZGl1cykgPyBlLnJvdW5kUmVjdCgKICAgIGEueCwKICAgIGEueSwKICAgIGEud2lkdGgsCiAgICBhLmhlaWdodCwKICAgIGEucmFkaXVzCiAgKSA6IGUucm91bmRSZWN0KGEueCwgYS55LCBhLndpZHRoLCBhLmhlaWdodCwgWwogICAgYS5yYWRpdXMudG9wTGVmdCwKICAgIGEucmFkaXVzLnRvcFJpZ2h0LAogICAgYS5yYWRpdXMuYm90dG9tTGVmdCwKICAgIGEucmFkaXVzLnRvcFJpZ2h0CiAgXSkgOiBlLnJlY3QoYS54LCBhLnksIGEud2lkdGgsIGEuaGVpZ2h0KSwgZS5maWxsKCksIGEuYm9yZGVyICYmIGUuc3Ryb2tlKCksIGUuY2xvc2VQYXRoKCksIGUucmVzdG9yZSgpOwp9LCBZID0gKGUsIGEpID0+IHsKICBjb25zdCB7IGNhbGN1bGF0ZTogdCB9ID0gYTsKICBlLnNhdmUoKSwgZS50cmFuc2xhdGUodC50cmFuc2xhdGUueCwgdC50cmFuc2xhdGUueSksIHQucm90YXRpb24gIT09IDAgJiYgZS5yb3RhdGUodC5yb3RhdGlvbiksIGUuZmlsbFN0eWxlID0gYS5jb2xvciwgZS5mb250ID0gYCR7YS5mb250U3RyZXRjaCA/IGEuZm9udFN0cmV0Y2ggKyAiICIgOiAiIn0ke2EuZm9udFZhcmlhbnQgPyBhLmZvbnRWYXJpYW50ICsgIiAiIDogIiJ9JHthLmZvbnRTdHlsZSA/IGEuZm9udFN0eWxlICsgIiAiIDogIiJ9JHthLmZvbnRXZWlnaHQgPyBhLmZvbnRXZWlnaHQgKyAiICIgOiAiIn0ke2EuZm9udFNpemUgPyBhLmZvbnRTaXplIDogIiJ9JHthLmxpbmVIZWlnaHQgPyAiLyIgKyBhLmxpbmVIZWlnaHQgKyAiICIgOiAiIn0ke2EuZm9udEZhbWlseSA/IGEuZm9udEZhbWlseSA6ICIifWAsIGUudGV4dEFsaWduID0gYS50ZXh0QWxpZ24sIGUudGV4dEJhc2VsaW5lID0gYS50ZXh0QmFzZWxpbmUsIGUuZGlyZWN0aW9uID0gYS50ZXh0RGlyZWN0aW9uLCBlLndvcmRTcGFjaW5nID0gYS53b3JkU3BhY2luZywgZS5sZXR0ZXJTcGFjaW5nID0gYS5sZXR0ZXJTcGFjaW5nLCBhLmJvcmRlciAmJiAoZS5zdHJva2VTdHlsZSA9IGEuYm9yZGVyQ29sb3IpLCBhLmJvcmRlciAmJiAoZS5saW5lV2lkdGggPSBhLmJvcmRlcldpZHRoKSwgYS5ib3JkZXIgPyBlLnN0cm9rZVRleHQoYS50ZXh0LCBhLngsIGEueSkgOiBlLmZpbGxUZXh0KGEudGV4dCwgYS54LCBhLnkpLCBlLnJlc3RvcmUoKTsKfSwgZyA9IChlLCBhLCB0KSA9PiB7CiAgY29uc3QgciA9IHsKICAgICJkcmF3OjJEL3JlY3RhbmdsZSI6IGssCiAgICAiZHJhdzoyRC90ZXh0IjogWSwKICAgICJkcmF3OjJEL3NlbGVjdGlvbiI6IFgsCiAgICAiZHJhdzoyRC9saW5lLWZsb3ctZWZmZWN0IjogViwKICAgICJkcmF3OjJEL2NvbnRyb2wtZWRpdGlvbiI6IEksCiAgICAiY2FudmFzOmNsZWFyIjogbSwKICAgICJjYW52YXM6cm90YXRpb24iOiBtLAogICAgImNhbnZhczpzY2FsZSI6IEMsCiAgICAiY2FudmFzOnRyYW5zbGF0ZSI6IE0sCiAgICAiY2FudmFzOnNhdmUiOiBSLAogICAgImNhbnZhczpyZXN0b3JlIjogVwogIH1bZV07CiAgciAmJiByKHQsIGEpOwp9OwpmdW5jdGlvbiBBKGUsIGEpIHsKICByZXR1cm4gZS54ICsgZS53aWR0aCA+IGEueCAmJiBlLnggPCBhLnggKyBhLndpZHRoICYmIGUueSArIGUuaGVpZ2h0ID4gYS55ICYmIGUueSA8IGEueSArIGEuaGVpZ2h0Owp9CmZ1bmN0aW9uIEUoZSwgYSwgdCwgaSkgewogIHQgPSB0ID8/IHsgeDogMCwgeTogMCB9LCBpID0gaSA/PyAxOwogIGNvbnN0IHIgPSBhLndpZHRoIC8gaSwgaCA9IGEuaGVpZ2h0IC8gaSwgbCA9IC10LngsIGQgPSAtdC55LCBmID0gbCArIHIsIHcgPSBkICsgaDsKICByZXR1cm4gZS54ICsgZS53aWR0aCAqIGUuc2NhbGVYIC8gMiA+IGwgJiYgZS54IC0gZS53aWR0aCAqIGUuc2NhbGVYIC8gMiA8IGYgJiYgZS55ICsgZS5oZWlnaHQgKiBlLnNjYWxlWSAvIDIgPiBkICYmIGUueSAtIGUuaGVpZ2h0ICogZS5zY2FsZVkgLyAyIDwgdzsKfQpjbGFzcyBHIHsKfQpjbGFzcyAkIGV4dGVuZHMgRyB7CiAgY29uc3RydWN0b3IodCwgaSwgcikgewogICAgc3VwZXIoKTsKICAgIGModGhpcywgIm5vZGUiLCB7fSk7CiAgICBjKHRoaXMsICJtb2RlIik7CiAgICBjKHRoaXMsICJhZnRlckRyYXciLCBbXSk7CiAgICBjKHRoaXMsICJiZWZvcmVEcmF3IiwgW10pOwogICAgYyh0aGlzLCAic2NhbGVWaWV3cG9ydCIsIDEpOwogICAgYyh0aGlzLCAiZ2FtZVNpemUiLCB7CiAgICAgIGhlaWdodDogMCwKICAgICAgd2lkdGg6IDAKICAgIH0pOwogICAgYyh0aGlzLCAiZWRpdG9yU2l6ZSIsIHsKICAgICAgaGVpZ2h0OiAwLAogICAgICB3aWR0aDogMAogICAgfSk7CiAgICBjKHRoaXMsICJjb25maWdzIik7CiAgICBjKHRoaXMsICJjb250ZXh0Iik7CiAgICB0aGlzLmNvbnRleHQgPSB0LCB0aGlzLmNvbmZpZ3MgPSBpLCB0aGlzLm1vZGUgPSByOwogIH0KICBzZXRTY2FsZVZpZXdwb3J0KHQpIHsKICAgIHRoaXMuc2NhbGVWaWV3cG9ydCA9IHQ7CiAgfQogIHNldEdhbWVTaXplKHQpIHsKICAgIHRoaXMuZ2FtZVNpemUgPSB0OwogIH0KICBzZXRFZGl0b3JTaXplKHQpIHsKICAgIHRoaXMuZWRpdG9yU2l6ZSA9IHQ7CiAgfQogIHNldEFmdGVyRHJhdyh0KSB7CiAgICB0aGlzLmFmdGVyRHJhdyA9IHQ7CiAgfQogIHNldEJlZm9yZURyYXcodCkgewogICAgdGhpcy5iZWZvcmVEcmF3ID0gdDsKICB9CiAgbG9hZE5vZGUodCkgewogICAgdGhpcy5ub2RlID0gdDsKICB9CiAgY2xlYXIoKSB7CiAgICB0aGlzLmNvbnRleHQuY2xlYXJSZWN0KAogICAgICAwLAogICAgICAwLAogICAgICB0aGlzLmNvbnRleHQuY2FudmFzLndpZHRoLAogICAgICB0aGlzLmNvbnRleHQuY2FudmFzLmhlaWdodAogICAgKTsKICB9CiAgZHJhdygpIHsKICAgIGlmICh0aGlzLm1vZGUgPT09ICJlZGl0b3IiICYmIHRoaXMuYmVmb3JlRHJhdy5sZW5ndGgpCiAgICAgIGZvciAoY29uc3QgdCBvZiB0aGlzLmJlZm9yZURyYXcpCiAgICAgICAgZyh0Ll9fdHlwZV9fLCB0Lm9wdGlvbnMsIHRoaXMuY29udGV4dCk7CiAgICBpZiAodGhpcy5tb2RlID09PSAiZWRpdG9yIiAmJiB0aGlzLm5vZGUgJiYgdGhpcy5leGVjdXRlRHJhd0VkaXRvcih0aGlzLm5vZGUsIHZvaWQgMCksIHRoaXMubW9kZSA9PT0gImdhbWUiICYmIHRoaXMubm9kZSAmJiB0aGlzLmV4ZWN1dGVEcmF3R2FtZSh0aGlzLm5vZGUsIHZvaWQgMCksIHRoaXMubW9kZSA9PT0gImVkaXRvciIgJiYgdGhpcy5hZnRlckRyYXcubGVuZ3RoID4gMCkKICAgICAgZm9yIChjb25zdCB0IG9mIHRoaXMuYWZ0ZXJEcmF3KQogICAgICAgIGcodC5fX3R5cGVfXywgdC5vcHRpb25zLCB0aGlzLmNvbnRleHQpOwogIH0KICBleGVjdXRlRHJhd0VkaXRvcih0LCBpKSB7CiAgICB2YXIgciwgaCwgbCwgZDsKICAgIGlmICh0ICYmIHQuX190eXBlX18gPT09ICJwcmltaXRpdmU6MkQvc2NlbmUiICYmIHQubm9kZXMubGVuZ3RoID4gMCkKICAgICAgZm9yIChjb25zdCBmIG9mIHQubm9kZXMpCiAgICAgICAgdGhpcy5leGVjdXRlRHJhd0VkaXRvcihmLCB2b2lkIDApOwogICAgaWYgKHQgJiYgdC5vcHRpb25zICYmIHQub3B0aW9ucy52aXNpYmxlICYmIHQuX190eXBlX18uc3RhcnRzV2l0aCgiZHJhdzoyRCIpKSB7CiAgICAgIGNvbnN0IGYgPSB0aGlzLmNvbmZpZ3MucGFuID8/IHsgeDogMCwgeTogMCB9LCB3ID0gdGhpcy5jb25maWdzLnpvb20gPz8gMSwgbyA9IGkgPyB7CiAgICAgICAgeDogKHIgPSBpLm9wdGlvbnMpID09IG51bGwgPyB2b2lkIDAgOiByLngsCiAgICAgICAgeTogKGggPSBpLm9wdGlvbnMpID09IG51bGwgPyB2b2lkIDAgOiBoLnksCiAgICAgICAgc2NhbGVYOiAobCA9IGkub3B0aW9ucykgPT0gbnVsbCA/IHZvaWQgMCA6IGwuc2NhbGVYLAogICAgICAgIHNjYWxlWTogKGQgPSBpLm9wdGlvbnMpID09IG51bGwgPyB2b2lkIDAgOiBkLnNjYWxlWQogICAgICB9IDogewogICAgICAgIHg6IDAsCiAgICAgICAgeTogMCwKICAgICAgICBzY2FsZVg6IDEsCiAgICAgICAgc2NhbGVZOiAxCiAgICAgIH07CiAgICAgIGlmIChFKAogICAgICAgIHsKICAgICAgICAgIHg6IHQub3B0aW9ucy54ICsgby54LAogICAgICAgICAgeTogdC5vcHRpb25zLnkgKyBvLnksCiAgICAgICAgICB3aWR0aDogdC5vcHRpb25zLndpZHRoLAogICAgICAgICAgaGVpZ2h0OiB0Lm9wdGlvbnMuaGVpZ2h0LAogICAgICAgICAgc2NhbGVYOiB0Lm9wdGlvbnMuc2NhbGVYICogby5zY2FsZVgsCiAgICAgICAgICBzY2FsZVk6IHQub3B0aW9ucy5zY2FsZVkgKiBvLnNjYWxlWQogICAgICAgIH0sCiAgICAgICAgewogICAgICAgICAgaGVpZ2h0OiB0aGlzLmVkaXRvclNpemUuaGVpZ2h0LAogICAgICAgICAgd2lkdGg6IHRoaXMuZWRpdG9yU2l6ZS53aWR0aAogICAgICAgIH0sCiAgICAgICAgZiwKICAgICAgICB3CiAgICAgICkgJiYgKGcodC5fX3R5cGVfXywgdC5vcHRpb25zLCB0aGlzLmNvbnRleHQpLCB0Lm5vZGVzLmxlbmd0aCA+IDApKSB7CiAgICAgICAgdGhpcy5jb250ZXh0LnNhdmUoKSwgdGhpcy5jb250ZXh0LnRyYW5zbGF0ZSh0Lm9wdGlvbnMueCwgdC5vcHRpb25zLnkpLCB0aGlzLmNvbnRleHQuc2NhbGUodC5vcHRpb25zLnNjYWxlWCwgdC5vcHRpb25zLnNjYWxlWSksIHRoaXMuY29udGV4dC5yb3RhdGUodC5vcHRpb25zLmNhbGN1bGF0ZS5yb3RhdGlvbik7CiAgICAgICAgZm9yIChjb25zdCB2IG9mIHQubm9kZXMpCiAgICAgICAgICB0aGlzLmV4ZWN1dGVEcmF3RWRpdG9yKHYsIHQpOwogICAgICAgIHRoaXMuY29udGV4dC5yZXN0b3JlKCk7CiAgICAgIH0KICAgIH0KICB9CiAgZXhlY3V0ZURyYXdHYW1lKHQsIGkpIHsKICAgIHZhciByLCBoOwogICAgaWYgKHQgJiYgdC5fX3R5cGVfXyA9PT0gInByaW1pdGl2ZToyRC9zY2VuZSIpCiAgICAgIGZvciAoY29uc3QgbCBvZiB0Lm5vZGVzKQogICAgICAgIHRoaXMuZXhlY3V0ZURyYXdHYW1lKGwsIHZvaWQgMCk7CiAgICBpZiAodCAmJiB0Lm9wdGlvbnMgJiYgdC5vcHRpb25zLnZpc2libGUgJiYgdC5fX3R5cGVfXy5zdGFydHNXaXRoKCJkcmF3OjJEIikpIHsKICAgICAgY29uc3QgbCA9IGkgPyB7CiAgICAgICAgeDogKHIgPSBpLm9wdGlvbnMpID09IG51bGwgPyB2b2lkIDAgOiByLngsCiAgICAgICAgeTogKGggPSBpLm9wdGlvbnMpID09IG51bGwgPyB2b2lkIDAgOiBoLnkKICAgICAgfSA6IHsKICAgICAgICB4OiAwLAogICAgICAgIHk6IDAKICAgICAgfTsKICAgICAgaWYgKEEoCiAgICAgICAgewogICAgICAgICAgeDogdC5vcHRpb25zLnggKyBsLngsCiAgICAgICAgICB5OiB0Lm9wdGlvbnMueSArIGwueSwKICAgICAgICAgIHdpZHRoOiB0Lm9wdGlvbnMud2lkdGgsCiAgICAgICAgICBoZWlnaHQ6IHQub3B0aW9ucy5oZWlnaHQKICAgICAgICB9LAogICAgICAgIHsKICAgICAgICAgIHg6IDAsCiAgICAgICAgICB5OiAwLAogICAgICAgICAgaGVpZ2h0OiB0aGlzLmdhbWVTaXplLmhlaWdodCwKICAgICAgICAgIHdpZHRoOiB0aGlzLmdhbWVTaXplLndpZHRoCiAgICAgICAgfQogICAgICApICYmIChnKHQuX190eXBlX18sIHQub3B0aW9ucywgdGhpcy5jb250ZXh0KSwgdC5ub2Rlcy5sZW5ndGggPiAwKSkgewogICAgICAgIHRoaXMuY29udGV4dC5zYXZlKCksIHRoaXMuY29udGV4dC50cmFuc2xhdGUoCiAgICAgICAgICB0Lm9wdGlvbnMueCAqIHRoaXMuc2NhbGVWaWV3cG9ydCwKICAgICAgICAgIHQub3B0aW9ucy55ICogdGhpcy5zY2FsZVZpZXdwb3J0CiAgICAgICAgKSwgdGhpcy5jb250ZXh0LnNjYWxlKAogICAgICAgICAgdC5vcHRpb25zLnNjYWxlWCAqIHRoaXMuc2NhbGVWaWV3cG9ydCwKICAgICAgICAgIHQub3B0aW9ucy5zY2FsZVkgKiB0aGlzLnNjYWxlVmlld3BvcnQKICAgICAgICApLCB0aGlzLmNvbnRleHQucm90YXRlKHQub3B0aW9ucy5jYWxjdWxhdGUucm90YXRpb24pOwogICAgICAgIGZvciAoY29uc3QgZCBvZiB0Lm5vZGVzKQogICAgICAgICAgdGhpcy5leGVjdXRlRHJhd0dhbWUoZCwgdCk7CiAgICAgICAgdGhpcy5jb250ZXh0LnJlc3RvcmUoKTsKICAgICAgfQogICAgfQogIH0KfQpjb25zdCBzID0gewogIGRpbWVuc2lvbjogdm9pZCAwLAogIG1vZGU6IHZvaWQgMCwKICBjb250ZXh0OiB2b2lkIDAsCiAgY2FudmFzOiB2b2lkIDAsCiAgZHJhd2VyOiB2b2lkIDAKfTsKbGV0IG4gPSAhMCwgdSA9IDEsIHkgPSB7CiAgd2lkdGg6IDAsCiAgaGVpZ2h0OiAwCn0sIFMgPSB7CiAgd2lkdGg6IDAsCiAgaGVpZ2h0OiAwCn0sIF8gPSBbXSwgYiA9IFtdLCBEID0ge307CmNvbnN0IEIgPSAoewogIGNvbnRleHQ6IGUsCiAgbW9kZTogYSwKICBkaW1lbnNpb246IHQsCiAgd2lkdGg6IGksCiAgaGVpZ2h0OiByCn0pID0+IHsKICBzLm1vZGUgPSBhLCBzLmRpbWVuc2lvbiA9IHQsIHMuY29udGV4dCA9IGUsIHMuY2FudmFzID0gbmV3IE9mZnNjcmVlbkNhbnZhcyhpLCByKSwgcy5kcmF3ZXIgPSBzLmNhbnZhcy5nZXRDb250ZXh0KAogICAgcy5jb250ZXh0LnJlcGxhY2UoIi0iLCAiIikKICApOwp9LCBMID0gKHsgd2lkdGg6IGUsIGhlaWdodDogYSB9KSA9PiB7CiAgcy5jYW52YXMud2lkdGggPSBlLCBzLmNhbnZhcy5oZWlnaHQgPSBhOwp9LCBUID0gKGUpID0+IHsKICBpZiAoIWUgfHwgIXMuY29udGV4dCB8fCAhcy5jYW52YXMgfHwgIXMuZHJhd2VyKSByZXR1cm47CiAgY29uc3QgdCA9IHsKICAgICIyZCI6IG5ldyAkKAogICAgICBzLmRyYXdlciwKICAgICAgRCwKICAgICAgcy5tb2RlCiAgICApCiAgfVtzLmNvbnRleHRdOwogIGlmICh0KSB7CiAgICBzLm1vZGUgPT09ICJlZGl0b3IiICYmIHQuc2V0RWRpdG9yU2l6ZShTKSwgcy5tb2RlID09PSAiZ2FtZSIgJiYgKHQuc2V0R2FtZVNpemUoeSksIHQuc2V0U2NhbGVWaWV3cG9ydCh1KSksIHQuc2V0QWZ0ZXJEcmF3KGIpLCB0LnNldEJlZm9yZURyYXcoXyksIHQubG9hZE5vZGUoZVswXSksIHQuY2xlYXIoKSwgdC5kcmF3KCk7CiAgICBjb25zdCBpID0gcy5jYW52YXMudHJhbnNmZXJUb0ltYWdlQml0bWFwKCk7CiAgICBzZWxmLnBvc3RNZXNzYWdlKHsgaW1hZ2VCaXRNYXA6IGkgfSwgW2ldKTsKICB9Cn07CnNlbGYub25tZXNzYWdlID0gZnVuY3Rpb24oZSkgewogIGUuZGF0YS5hY3Rpb24gPT09ICJsb2FkOnJlbmRlcmVkIiA/IEIoZS5kYXRhLm9wdGlvbnMpIDogZS5kYXRhLmFjdGlvbiA9PT0gInJlc2l6ZTpkcmF3ZXIiID8gTChlLmRhdGEub3B0aW9ucykgOiBlLmRhdGEuYWN0aW9uID09PSAic2V0OmFmdGVyLWRyYXciID8gYiA9IGUuZGF0YS5saXN0IDogZS5kYXRhLmFjdGlvbiA9PT0gInNldDpiZWZvcmUtZHJhdyIgPyBfID0gZS5kYXRhLmxpc3QgOiBlLmRhdGEuYWN0aW9uID09PSAic2V0OnNpemUtZWRpdG9yIiA/IFMgPSBlLmRhdGEuc2l6ZSA6IGUuZGF0YS5hY3Rpb24gPT09ICJzZXQ6dmlld3BvcnQtZ2FtZSIgPyB5ID0gZS5kYXRhLnZpZXdwb3J0IDogZS5kYXRhLmFjdGlvbiA9PT0gInNldDpzY2FsZS12aWV3cG9ydCIgPyB1ID0gZS5kYXRhLnNjYWxlVmlld3BvcnQgOiBlLmRhdGEuYWN0aW9uID09PSAic2V0OmFuaW1hdGlvbiIgPyBlLmRhdGEuYW5pbWF0aW9uIDogZS5kYXRhLmFjdGlvbiA9PT0gInNldDpmcmFtZSIgPyBlLmRhdGEuY29udHJvbCA6IGUuZGF0YS5hY3Rpb24gPT09ICJzZXQ6Y29uZmlncyIgPyBEID0gZS5kYXRhLmNvbmZpZ3MgOiBlLmRhdGEuYWN0aW9uID09PSAicmUtZHJhdyIgPyBuID0gITAgOiBlLmRhdGEuYWN0aW9uID09PSAicmVuZGVyIiAmJiBuICYmIChUKGUuZGF0YS5yb290KSwgbiA9ICExKTsKfTsK", Wr = (i) => Uint8Array.from(atob(i), (t) => t.charCodeAt(0)), vs = typeof window < "u" && window.Blob && new Blob(["URL.revokeObjectURL(import.meta.url);", Wr(Pi)], { type: "text/javascript;charset=utf-8" });
function Rr(i) {
  let t;
  try {
    if (t = vs && (window.URL || window.webkitURL).createObjectURL(vs), !t) throw "";
    const e = new Worker(t, {
      type: "module",
      name: i == null ? void 0 : i.name
    });
    return e.addEventListener("error", () => {
      (window.URL || window.webkitURL).revokeObjectURL(t);
    }), e;
  } catch {
    return new Worker(
      "data:text/javascript;base64," + Pi,
      {
        type: "module",
        name: i == null ? void 0 : i.name
      }
    );
  }
}
const Mi = "ZnVuY3Rpb24gXyhlLCBpLCB0ID0gInV1aWQiKSB7CiAgcmV0dXJuIHQgPT09ICJkZWVwIiA/IE4oZSwgaSkubm9kZXMgOiB0ID09PSAiaW5kZXgiID8gZVtpXS5ub2RlcyA6IGUuZmluZCgobykgPT4gby51dWlkID09IGkpLm5vZGVzOwp9CmZ1bmN0aW9uIHkoZSwgaSwgdCwgbyA9ICJ1dWlkIiwgbiA9ICJhZnRlciIpIHsKICBpZiAoaSAhPT0gdm9pZCAwICYmIHQgPT09IHZvaWQgMCkKICAgIG4gPT09ICJiZWZvcmUiID8gZS51bnNoaWZ0KGkpIDogZS5wdXNoKGkpOwogIGVsc2UgaWYgKGkgIT09IHZvaWQgMCAmJiB0ICE9PSB2b2lkIDAgJiYgKG8gPT09ICJpbmRleCIgfHwgbyA9PT0gInV1aWQiIHx8IG8gPT09ICJkZWVwIikpIHsKICAgIGNvbnN0IGQgPSBjKGUsIHQsIG8pOwogICAgbiA9PT0gImJlZm9yZSIgPyBkLm5vZGVzLnVuc2hpZnQoaSkgOiBkLm5vZGVzLnB1c2goaSk7CiAgfQp9CmZ1bmN0aW9uIHcoZSwgaSwgdCwgbywgbiA9ICJ1dWlkIikgewogIGNvbnN0IGQgPSBjKGUsIGksIG4pOwogIHJldHVybiB0ID09PSAidXVpZCIgfHwgdCA9PT0gImluZGV4IiB8fCB0ID09PSAiZGVlcCIgfHwgdCA9PT0gIm5vZGVzIiB8fCB0ID09PSAiX190eXBlX18iID8gITEgOiBkLm9wdGlvbnMgJiYgZC5vcHRpb25zW3RdICE9PSB2b2lkIDAgPyAoZC5vcHRpb25zW3RdID0gbywgITApIDogITE7Cn0KZnVuY3Rpb24gRChlLCBpLCB0LCBvID0gInV1aWQiKSB7CiAgY29uc3QgbiA9IGMoZSwgaSwgbyk7CiAgZm9yIChjb25zdCBkIGluIHQpCiAgICBkID09PSAidXVpZCIgfHwgZCA9PT0gImluZGV4IiB8fCBkID09PSAiZGVlcCIgfHwgZCA9PT0gIm5vZGVzIiB8fCBkID09PSAiX190eXBlX18iIHx8IG4ub3B0aW9ucyAmJiBuLm9wdGlvbnNbZF0gIT09IHZvaWQgMCAmJiAobi5vcHRpb25zW2RdID0gdFtkXSk7CiAgcmV0dXJuICEwOwp9CmZ1bmN0aW9uIGMoZSwgaSwgdCA9ICJ1dWlkIikgewogIHJldHVybiB0ID09PSAiZGVlcCIgPyBOKGUsIGkpIDogdCA9PT0gImluZGV4IiA/IGVbaV0gOiBlLmZpbmQoKG8pID0+IG8udXVpZCA9PSBpKTsKfQpmdW5jdGlvbiBNKGUsIGksIHQgPSAidXVpZCIpIHsKICByZXR1cm4gdCA9PT0gImRlZXAiID8gQihlLCBpKSA6IHQgPT09ICJpbmRleCIgPyBlLmZpbmRJbmRleCgobykgPT4gby5pbmRleCA9PT0gaSkgIT09IC0xIDogZS5maW5kSW5kZXgoKG8pID0+IG8udXVpZCA9PT0gaSkgIT09IC0xOwp9CmZ1bmN0aW9uIEYoZSwgaSwgdCA9ICJ1dWlkIikgewogIGxldCBvID0gYyhlLCBpLCB0KSwgbjsKICByZXR1cm4gdCA9PT0gImRlZXAiID8gKG4gPSBoKGUsIGkpLCBuLm5vZGVzLnNwbGljZShvLmluZGV4LCAxKSwgbiA9IHZvaWQgMCwgbyA9IHZvaWQgMCwgcChlLCB2b2lkIDApLCAhMCkgOiAodCA9PT0gImluZGV4IiB8fCB0ID09PSAidXVpZCIpICYmIG8gPyAoZS5zcGxpY2Uoby5pbmRleCwgMSksIG8gPSB2b2lkIDAsIHAoZSwgdm9pZCAwKSwgITApIDogITE7Cn0KZnVuY3Rpb24gSShlLCBpLCB0ID0gInV1aWQiKSB7CiAgbGV0IG87CiAgaSAmJiAobyA9IGMoZSwgaSwgdCkpLCBpICYmIG8gPyBvLm5vZGVzLnNwbGljZSgwLCBvLm5vZGVzLmxlbmd0aCkgOiBlLnNwbGljZSgwLCBlLmxlbmd0aCk7Cn0KZnVuY3Rpb24gJChlLCBpLCB0LCBvID0gInV1aWQiLCBuID0gITEpIHsKICBpZiAobyA9PT0gImluZGV4IiAmJiAoaSA8IDAgfHwgaSA+PSBlLmxlbmd0aCkpCiAgICB0aHJvdyBuZXcgRXJyb3IoIkluZGV4ZXMgb3V0IHJhbmdlcyIpOwogIGxldCBkID0gYyhlLCBpLCBvKSwgdTsKICBpZiAoIWQpIHRocm93IG5ldyBFcnJvcigibm9kZSBub3QgZm91bmQiKTsKICB0LmluZGV4ID0gZC5pbmRleCwgbiAmJiAodC5kZWVwID0gZC5kZWVwKSwgbyA9PT0gImluZGV4IiB8fCBvID09PSAidXVpZCIgPyAoZVtkLmluZGV4XSA9IHQsIGQgPSB2b2lkIDApIDogbyA9PT0gImRlZXAiICYmICh1ID0gaChlLCBpKSwgdS5ub2Rlc1tkLmluZGV4XSA9IHQsIGQgPSB2b2lkIDAsIHUgPSB2b2lkIDApOwp9CmZ1bmN0aW9uIGIoZSwgaSwgdCA9ICJ1dWlkIikgewogIGlmICh0ID09PSAiaW5kZXgiICYmIChpIDwgMCB8fCBpID49IGUubm9kZXMubGVuZ3RoKSkKICAgIHRocm93IG5ldyBFcnJvcigiSW5kZXhlcyBvdXQgcmFuZ2VzIik7CiAgY29uc3QgbyA9IFtlXTsKICBmb3IgKDsgby5sZW5ndGggPiAwOyApIHsKICAgIGxldCBuID0gby5zaGlmdCgpOwogICAgaWYgKHQgPT09ICJ1dWlkIiAmJiAobiA9PSBudWxsID8gdm9pZCAwIDogbi51dWlkKSA9PT0gaSkKICAgICAgcmV0dXJuIG47CiAgICBpZiAodCA9PT0gImluZGV4IiAmJiAobiA9PSBudWxsID8gdm9pZCAwIDogbi5pbmRleCkgPT09IGkpCiAgICAgIHJldHVybiBuOwogICAgaWYgKHQgPT09ICJkZWVwIiAmJiAobiA9PSBudWxsID8gdm9pZCAwIDogbi5kZWVwKSA9PT0gaSkKICAgICAgcmV0dXJuIG47CiAgICBvLnB1c2goLi4uQXJyYXkuZnJvbSgobiA9PSBudWxsID8gdm9pZCAwIDogbi5ub2RlcykgPz8gW10pKTsKICB9Cn0KZnVuY3Rpb24gcChlLCBpKSB7CiAgZm9yIChsZXQgdCA9IDA7IHQgPCBlLmxlbmd0aDsgdCsrKQogICAgZVt0XS5pbmRleCA9IHQsIGVbdF0uZGVlcCA9IGkgPyBgJHtpLmRlZXB9XyR7dH1gIDogYCR7dH1gLCBlW3RdLm5vZGVzLmxlbmd0aCAmJiBwKGVbdF0ubm9kZXMsIGVbdF0pOwp9CmZ1bmN0aW9uIEUoZSwgaSwgdCwgbyA9ICJhZnRlciIpIHsKICBsZXQgbiwgZCwgdSwgYTsKICBpZiAodC5mcm9tID09PSAiaW5kZXgiICYmIChpLmZyb20gPCAwIHx8IGkuZnJvbSA+PSBlLmxlbmd0aCkpCiAgICB0aHJvdyBuZXcgRXJyb3IoIkluZGV4ZXMgb3V0IHJhbmdlcyIpOwogIGlmICh0LnRvID09PSAiaW5kZXgiICYmIChpLnRvIDwgMCB8fCBpLnRvID49IGUubGVuZ3RoKSkKICAgIHRocm93IG5ldyBFcnJvcigiSW5kZXhlcyBvdXQgcmFuZ2VzIik7CiAgaWYgKCh0LmZyb20gPT09ICJpbmRleCIgfHwgdC5mcm9tID09PSAidXVpZCIpICYmICh0LnRvID09PSAiaW5kZXgiIHx8IHQudG8gPT09ICJ1dWlkIikpIHsKICAgIG4gPSBjKGUsIGkuZnJvbSwgdC5mcm9tKSwgdSA9IGMoZSwgaS50bywgdC50byk7CiAgICBjb25zdCBmID0gZS5zbGljZSgpLCBbbF0gPSBmLnNwbGljZSgKICAgICAgdC5mcm9tID09PSAiaW5kZXgiID8gbi5pbmRleCA6IG4udXVpZCwKICAgICAgMQogICAgKTsKICAgIGYuc3BsaWNlKAogICAgICBvID09PSAiYmVmb3JlIiA/IHUuaW5kZXggOiB1LmluZGV4ICsgMSwKICAgICAgMCwKICAgICAgbAogICAgKSwgcChmLCB2b2lkIDApLCBlLnNwbGljZSgwLCBlLmxlbmd0aCksIGUucHVzaCguLi5mKSwgbiA9IHZvaWQgMCwgdSA9IHZvaWQgMDsKICB9IGVsc2UgaWYgKCh0LmZyb20gPT09ICJpbmRleCIgfHwgdC5mcm9tID09PSAidXVpZCIpICYmIHQudG8gPT09ICJkZWVwIikgewogICAgbiA9IGMoZSwgaS5mcm9tLCB0LmZyb20pLCB1ID0gYyhlLCBpLnRvLCB0LnRvKSwgYSA9IGgoZSwgaS50byk7CiAgICBjb25zdCBmID0gZS5zbGljZSgpLCBbbF0gPSBmLnNwbGljZSgKICAgICAgdC5mcm9tID09PSAiaW5kZXgiID8gbi5pbmRleCA6IG4udXVpZCwKICAgICAgMQogICAgKSwgcyA9IGEubm9kZXMuc2xpY2UoKTsKICAgIHMuc3BsaWNlKAogICAgICBvID09PSAiYmVmb3JlIiA/IHUuaW5kZXggOiB1LmluZGV4ICsgMSwKICAgICAgMCwKICAgICAgbAogICAgKSwgZyhmLCBhLmRlZXAsIHMpLCBwKGYsIHZvaWQgMCksIGUuc3BsaWNlKDAsIGUubGVuZ3RoKSwgZS5wdXNoKC4uLmYpLCBuID0gdm9pZCAwLCB1ID0gdm9pZCAwLCBhID0gdm9pZCAwOwogIH0gZWxzZSBpZiAodC5mcm9tID09PSAiZGVlcCIgJiYgKHQudG8gPT09ICJpbmRleCIgfHwgdC50byA9PT0gInV1aWQiKSkgewogICAgbiA9IGMoZSwgaS5mcm9tLCB0LmZyb20pLCBkID0gaChlLCBpLmZyb20pLCB1ID0gYyhlLCBpLnRvLCB0LnRvKTsKICAgIGNvbnN0IGYgPSBkLm5vZGVzLnNsaWNlKCksIFtsXSA9IGYuc3BsaWNlKG4uaW5kZXgsIDEpLCBzID0gZS5zbGljZSgpOwogICAgcy5zcGxpY2UoCiAgICAgIG8gPT09ICJiZWZvcmUiID8gdS5pbmRleCA6IHUuaW5kZXggKyAxLAogICAgICAwLAogICAgICBsCiAgICApLCBnKHMsIGQuZGVlcCwgZiksIHAocywgdm9pZCAwKSwgZS5zcGxpY2UoMCwgZS5sZW5ndGgpLCBlLnB1c2goLi4ucyksIG4gPSB2b2lkIDAsIGQgPSB2b2lkIDAsIHUgPSB2b2lkIDA7CiAgfSBlbHNlIGlmICh0LmZyb20gPT09ICJkZWVwIiAmJiB0LnRvID09PSAiZGVlcCIpIHsKICAgIG4gPSBjKGUsIGkuZnJvbSwgdC5mcm9tKSwgZCA9IGgoZSwgaS5mcm9tKSwgdSA9IGMoZSwgaS50bywgdC50byksIGEgPSBoKGUsIGkudG8pOwogICAgbGV0IGYgPSBlLnNsaWNlKCk7CiAgICBjb25zdCBsID0gZC5ub2Rlcy5zbGljZSgpLCBbc10gPSBsLnNwbGljZShuLmluZGV4LCAxKSwgeCA9IGEubm9kZXMuc2xpY2UoKTsKICAgIHguc3BsaWNlKAogICAgICBvID09PSAiYmVmb3JlIiA/IHUuaW5kZXggOiB1LmluZGV4ICsgMSwKICAgICAgMCwKICAgICAgcwogICAgKSwgZyhmLCBkLmRlZXAsIGwpLCBnKGYsIGEuZGVlcCwgeCksIHAoZiwgdm9pZCAwKSwgZS5zcGxpY2UoMCwgZS5sZW5ndGgpLCBlLnB1c2goLi4uZiksIG4gPSB2b2lkIDAsIGQgPSB2b2lkIDAsIHUgPSB2b2lkIDAsIGEgPSB2b2lkIDA7CiAgfQp9CmZ1bmN0aW9uIGcoZSwgaSwgdCkgewogIGlmIChpID09PSAicm9vdCIpCiAgICBlLnNwbGljZSgwLCBlLmxlbmd0aCksIGUucHVzaCguLi50KTsKICBlbHNlIHsKICAgIGNvbnN0IG8gPSAiWyIgKyBpLnJlcGxhY2UoL18vZywgIl0ubm9kZXNbIikgKyAiXSIsIGQgPSBuZXcgRnVuY3Rpb24oIm5vZGVzIiwgYHJldHVybiBub2RlcyR7b31gKShlKTsKICAgIGQubm9kZXMgPSB0OwogIH0KfQpmdW5jdGlvbiBoKGUsIGkpIHsKICBpZiAoaS5zcGxpdCgiXyIpLmxlbmd0aCA+IDEpIHsKICAgIGNvbnN0IHQgPSAiWyIgKyBpLnNsaWNlKDAsIC0yKS5yZXBsYWNlKC9fL2csICJdLm5vZGVzWyIpICsgIl0iOwogICAgcmV0dXJuIG5ldyBGdW5jdGlvbigibm9kZXMiLCBgcmV0dXJuIG5vZGVzJHt0fWApKGUpOwogIH0gZWxzZQogICAgcmV0dXJuIHsKICAgICAgZGVlcDogInJvb3QiLAogICAgICBub2RlczogZQogICAgfTsKfQpmdW5jdGlvbiBOKGUsIGkpIHsKICBpZiAoaSA9PT0gInJvb3QiKQogICAgcmV0dXJuIHsKICAgICAgZGVlcDogInJvb3QiLAogICAgICBub2RlczogZQogICAgfTsKICB7CiAgICBjb25zdCB0ID0gIlsiICsgaS5yZXBsYWNlKC9fL2csICJdLm5vZGVzWyIpICsgIl0iOwogICAgcmV0dXJuIG5ldyBGdW5jdGlvbigibm9kZXMiLCBgcmV0dXJuIG5vZGVzJHt0fWApKGUpOwogIH0KfQpmdW5jdGlvbiBCKGUsIGkpIHsKICBjb25zdCB0ID0gIlsiICsgaS5yZXBsYWNlKC9fL2csICJdLm5vZGVzWyIpICsgIl0iOwogIHJldHVybiBuZXcgRnVuY3Rpb24oIm5vZGVzIiwgYHJldHVybiBub2RlcyR7dH1gKShlKSAhPT0gdm9pZCAwOwp9CmxldCByID0gW107CnNlbGYub25tZXNzYWdlID0gZnVuY3Rpb24oZSkgewogIGlmIChlLmRhdGEuYWN0aW9uID09PSAiZ2V0OnJvb3QiKQogICAgc2VsZi5wb3N0TWVzc2FnZSh7CiAgICAgIHR5cGU6ICJnZXQ6cm9vdCIsCiAgICAgIG5vZGU6IHIKICAgIH0pOwogIGVsc2UgaWYgKGUuZGF0YS5hY3Rpb24gPT09ICJzZXQ6cm9vdCIpCiAgICByID0gW2UuZGF0YS5yb290XTsKICBlbHNlIGlmIChlLmRhdGEuYWN0aW9uID09PSAiZ2V0Om5vZGVzIikgewogICAgaWYgKCFyLmxlbmd0aCkgcmV0dXJuOwogICAgY29uc3QgeyBsb2NhdGlvbjogaSwgbW9kZTogdCA9ICJ1dWlkIiB9ID0gZS5kYXRhOwogICAgc2VsZi5wb3N0TWVzc2FnZSh7CiAgICAgIHR5cGU6ICJnZXQ6bm9kZXMiLAogICAgICBub2RlOiBfKHIsIGksIHQpCiAgICB9KTsKICB9IGVsc2UgaWYgKGUuZGF0YS5hY3Rpb24gPT09ICJnZXQ6bm9kZSIpIHsKICAgIGlmICghci5sZW5ndGgpIHJldHVybjsKICAgIGNvbnN0IHsgbG9jYXRpb246IGksIG1vZGU6IHQgPSAidXVpZCIgfSA9IGUuZGF0YTsKICAgIHNlbGYucG9zdE1lc3NhZ2UoewogICAgICB0eXBlOiAiZ2V0Om5vZGUiLAogICAgICBub2RlOiBjKHIsIGksIHQpCiAgICB9KTsKICB9IGVsc2UgaWYgKGUuZGF0YS5hY3Rpb24gPT09ICJhZGQ6bm9kZSIpIHsKICAgIGlmICghci5sZW5ndGgpIHJldHVybjsKICAgIGNvbnN0IHsgbm9kZTogaSwgbG9jYXRpb246IHQsIG1vZGU6IG8gPSAidXVpZCIgfSA9IGUuZGF0YTsKICAgIHkociwgaSwgdCwgbyk7CiAgfSBlbHNlIGlmIChlLmRhdGEuYWN0aW9uID09PSAidXBkYXRlOm5vZGUiKSB7CiAgICBpZiAoIXIubGVuZ3RoKSByZXR1cm47CiAgICBjb25zdCB7IGxvY2F0aW9uOiBpLCB0eXBlOiB0ID0gInByb3BlcnR5IiwgbW9kZTogbyA9ICJ1dWlkIiB9ID0gZS5kYXRhOwogICAgaWYgKHQgPT09ICJwcm9wZXJ0eSIpIHsKICAgICAgY29uc3QgeyBwcm9wZXJ0eTogbiwgdmFsdWU6IGQgfSA9IGUuZGF0YS5vcHRpb25zOwogICAgICB3KHIsIGksIG4sIGQsIG8pOwogICAgfQogICAgaWYgKHQgPT09ICJwcm9wZXJ0aWVzIikgewogICAgICBjb25zdCB7IHByb3BlcnRpZXM6IG4gfSA9IGUuZGF0YS5vcHRpb25zOwogICAgICBEKHIsIGksIG4sIG8pOwogICAgfQogIH0gZWxzZSBpZiAoZS5kYXRhLmFjdGlvbiA9PT0gImhhczpub2RlIikgewogICAgaWYgKCFyLmxlbmd0aCkgcmV0dXJuOwogICAgY29uc3QgeyBsb2NhdGlvbjogaSwgbW9kZTogdCA9ICJ1dWlkIiB9ID0gZS5kYXRhOwogICAgc2VsZi5wb3N0TWVzc2FnZSh7CiAgICAgIHR5cGU6ICJoYXM6bm9kZSIsCiAgICAgIG5vZGU6IE0ociwgaSwgdCkKICAgIH0pOwogIH0gZWxzZSBpZiAoZS5kYXRhLmFjdGlvbiA9PT0gImRlbGV0ZTpub2RlIikgewogICAgaWYgKCFyLmxlbmd0aCkgcmV0dXJuOwogICAgY29uc3QgeyBsb2NhdGlvbjogaSwgbW9kZTogdCA9ICJ1dWlkIiB9ID0gZS5kYXRhOwogICAgRihyLCBpLCB0KTsKICB9IGVsc2UgaWYgKGUuZGF0YS5hY3Rpb24gPT09ICJjbGVhcjpub2RlcyIpIHsKICAgIGlmICghci5sZW5ndGgpIHJldHVybjsKICAgIGNvbnN0IHsgbG9jYXRpb246IGksIG1vZGU6IHQgPSAidXVpZCIgfSA9IGUuZGF0YTsKICAgIEkociwgaSwgdCk7CiAgfSBlbHNlIGlmIChlLmRhdGEuYWN0aW9uID09PSAicmVwbGFjZTpub2RlIikgewogICAgaWYgKCFyLmxlbmd0aCkgcmV0dXJuOwogICAgY29uc3QgeyBsb2NhdGlvbjogaSwgbm9kZTogdCwgbW9kZTogbyA9ICJ1dWlkIiB9ID0gZS5kYXRhOwogICAgJChyLCBpLCB0LCBvKTsKICB9IGVsc2UgaWYgKGUuZGF0YS5hY3Rpb24gPT09ICJzZWFyY2g6bm9kZSIpIHsKICAgIGlmICghci5sZW5ndGgpIHJldHVybjsKICAgIGNvbnN0IHsgbG9jYXRpb246IGksIG1vZGU6IHQgPSAidXVpZCIgfSA9IGUuZGF0YTsKICAgIHNlbGYucG9zdE1lc3NhZ2UoewogICAgICB0eXBlOiAic2VhcmNoOm5vZGUiLAogICAgICBub2RlOiBiKHIsIGksIHQpCiAgICB9KTsKICB9IGVsc2UgaWYgKGUuZGF0YS5hY3Rpb24gPT09ICJtb3ZlOm5vZGUiKSB7CiAgICBpZiAoIXIubGVuZ3RoKSByZXR1cm47CiAgICBjb25zdCB7CiAgICAgIHBvc2l0aW9uOiBpLAogICAgICBtb2RlczogdCA9IHsgZnJvbTogInV1aWQiLCB0bzogInV1aWQiIH0sCiAgICAgIGluc2VydDogbyA9ICJhZnRlciIKICAgIH0gPSBlLmRhdGEub3B0aW9uczsKICAgIEUociwgaSwgdCwgbyk7CiAgfQp9Owo=", Or = (i) => Uint8Array.from(atob(i), (t) => t.charCodeAt(0)), Ns = typeof window < "u" && window.Blob && new Blob(["URL.revokeObjectURL(import.meta.url);", Or(Mi)], { type: "text/javascript;charset=utf-8" });
function Hr(i) {
  let t;
  try {
    if (t = Ns && (window.URL || window.webkitURL).createObjectURL(Ns), !t) throw "";
    const e = new Worker(t, {
      type: "module",
      name: i == null ? void 0 : i.name
    });
    return e.addEventListener("error", () => {
      (window.URL || window.webkitURL).revokeObjectURL(t);
    }), e;
  } catch {
    return new Worker(
      "data:text/javascript;base64," + Mi,
      {
        type: "module",
        name: i == null ? void 0 : i.name
      }
    );
  }
}
const $i = "c2VsZi5vbm1lc3NhZ2UgPSBmdW5jdGlvbihvKSB7CiAgaWYgKG8uZGF0YS5hY3Rpb24gPT09ICJub2RlOnByb2Nlc3MtY2FsY3VsYXRlIikgewogICAgY29uc3QgZSA9IG8uZGF0YS5vcHRpb25zLnNjYWxlVmlld3BvcnQsIHQgPSBvLmRhdGEub3B0aW9ucywgYSA9IHsKICAgICAgbWlkZGxlU2NhbGVGYWN0b3I6IHsKICAgICAgICBoZWlnaHQ6IDAsCiAgICAgICAgd2lkdGg6IDAKICAgICAgfSwKICAgICAgcm90YXRpb246IDAsCiAgICAgIHNjYWxlRmFjdG9yOiB7CiAgICAgICAgaGVpZ2h0OiAwLAogICAgICAgIHdpZHRoOiAwCiAgICAgIH0sCiAgICAgIHRyYW5zbGF0ZTogewogICAgICAgIHg6IDAsCiAgICAgICAgeTogMAogICAgICB9CiAgICB9OwogICAgdC5fX3BhcmVudCAmJiB0Ll9fcGFyZW50Ll9fdHlwZV9fID09ICJkcmF3OjJEL25vZGUiID8gYS50cmFuc2xhdGUgPSB7CiAgICAgIHg6IHQuX19wYXJlbnQueCArIHQueCAqIGUsCiAgICAgIHk6IHQuX19wYXJlbnQueSArIHQueSAqIGUKICAgIH0gOiBhLnRyYW5zbGF0ZSA9IHsKICAgICAgeDogdC54ICogZSwKICAgICAgeTogdC55ICogZQogICAgfSwgYS5yb3RhdGlvbiA9IHQucm90YXRpb25UeXBlID09PSAiZGVncmVlcyIgPyB0LnJvdGF0aW9uICogTWF0aC5QSSAvIDE4MCA6IHQucm90YXRpb24sIGEuc2NhbGVGYWN0b3IgPSB7CiAgICAgIHdpZHRoOiB0LndpZHRoICogdC5zY2FsZVggKiBlLAogICAgICBoZWlnaHQ6IHQuaGVpZ2h0ICogdC5zY2FsZVkgKiBlCiAgICB9LCBhLm1pZGRsZVNjYWxlRmFjdG9yID0gewogICAgICB3aWR0aDogYS5zY2FsZUZhY3Rvci53aWR0aCAvIDIsCiAgICAgIGhlaWdodDogYS5zY2FsZUZhY3Rvci5oZWlnaHQgLyAyCiAgICB9LCBzZWxmLnBvc3RNZXNzYWdlKHsKICAgICAgdHlwZTogIm5vZGU6cHJvY2Vzcy1jYWxjdWxhdGUiLAogICAgICByZXN1bHQ6IGEKICAgIH0pOwogIH0KfTsK", Tr = (i) => Uint8Array.from(atob(i), (t) => t.charCodeAt(0)), Ks = typeof window < "u" && window.Blob && new Blob(["URL.revokeObjectURL(import.meta.url);", Tr($i)], { type: "text/javascript;charset=utf-8" });
function Vr(i) {
  let t;
  try {
    if (t = Ks && (window.URL || window.webkitURL).createObjectURL(Ks), !t) throw "";
    const e = new Worker(t, {
      type: "module",
      name: i == null ? void 0 : i.name
    });
    return e.addEventListener("error", () => {
      (window.URL || window.webkitURL).revokeObjectURL(t);
    }), e;
  } catch {
    return new Worker(
      "data:text/javascript;base64," + $i,
      {
        type: "module",
        name: i == null ? void 0 : i.name
      }
    );
  }
}
class Ji {
  constructor(t) {
    f(this, "$app");
    f(this, "_workerEditor");
    f(this, "_workerRender");
    f(this, "_workerNodes");
    f(this, "_workerMath");
    f(this, "_events", new Fe());
    this.$app = t, this._workerEditor = new Yr(), this._workerRender = new Rr(), this._workerNodes = new Hr(), this._workerMath = new Vr(), this.loadWorker(), this.listenWorker();
  }
  loadWorker() {
    this._workerRender.postMessage({
      action: "load:rendered",
      options: {
        context: this.$app.options.context,
        mode: this.$app.mode,
        dimension: this.$app.options.dimension,
        width: this.$app.canvas.instance.clientWidth,
        height: this.$app.canvas.instance.clientHeight
      }
    });
  }
  listenWorker() {
    this._workerRender.onmessage = (t) => {
      const e = t.data.imageBitMap;
      e && this.$app.canvas.instance.getContext(
        "bitmaprenderer"
      ).transferFromImageBitmap(e);
    };
  }
  setSize(t, e) {
    this._workerRender.postMessage({
      action: "resize:drawer",
      options: {
        width: t,
        height: e
      }
    });
  }
  setAfterDraw(t) {
    this._workerRender.postMessage({
      action: "set:after-draw",
      list: t
    });
  }
  setBeforeDraw(t) {
    this._workerRender.postMessage({
      action: "set:before-draw",
      list: t
    });
  }
  setSizeEditor(t, e) {
    this._workerRender.postMessage({
      action: "set:size-editor",
      size: {
        width: t,
        height: e
      }
    });
  }
  setViewportGame(t, e) {
    this._workerRender.postMessage({
      action: "set:viewport-game",
      viewport: {
        width: t,
        height: e
      }
    });
  }
  setScaleViewport(t) {
    this._workerRender.postMessage({
      action: "set:scale-viewport",
      scaleViewport: t
    });
  }
  setAnimation(t) {
    this._workerRender.postMessage({
      action: "set:animation",
      animation: t
    });
  }
  setFrame(t) {
    this._workerRender.postMessage({
      action: "set:frame",
      control: t
    });
  }
  setConfigs(t) {
    this._workerRender.postMessage({
      action: "set:configs",
      configs: t
    });
  }
  async getRootNode() {
    return this._workerNodes.postMessage({
      action: "get:root"
    }), new Promise((t) => {
      this._workerNodes.onmessage = (e) => {
        e.data.type === "get:root" && t(e.data.node);
      };
    });
  }
  setRootNode(t) {
    this._workerNodes.postMessage({
      action: "set:root",
      root: t
    });
  }
  addNode(t, e, s) {
    this._workerNodes.postMessage({
      action: "add:node",
      location: e,
      mode: s,
      node: t
    });
  }
  updateNode(t, e, s, n) {
    this._workerNodes.postMessage({
      action: "update:node",
      location: t,
      type: e,
      mode: s,
      options: n
    });
  }
  reDraw() {
    this._workerRender.postMessage({
      action: "re-draw"
    });
  }
  async process() {
    const t = await this.getRootNode();
    this._workerEditor.postMessage({
      action: "set:root",
      root: t
    }), this._workerRender.postMessage({
      action: "render",
      root: t
    });
  }
  editor() {
    return {
      selectNode: async (t) => (this._workerEditor.postMessage({
        action: "select:node",
        mouseCoords: t
      }), new Promise((e) => {
        this._workerEditor.onmessage = function(s) {
          s.data.type === "select:node" && e(s.data.result);
        };
      })),
      cursorNode: async (t) => (this._workerEditor.postMessage({
        action: "cursor:node",
        mouseCoords: t
      }), new Promise((e) => {
        this._workerEditor.onmessage = function(s) {
          s.data.type === "cursor:node" && e(s.data.result);
        };
      }))
    };
  }
  emit(t, e) {
    this._events.addEventListener(t, e);
  }
  [v](t, ...e) {
    this._events.emitEvent(t, e);
  }
}
class Ui {
  constructor() {
    f(this, "_options");
    f(this, "_controls", /* @__PURE__ */ new Map());
    f(this, "_global", /* @__PURE__ */ new Map());
    f(this, "_events", new Fe());
    f(this, "$$events");
    f(this, "$animation");
    f(this, "$scenes");
    f(this, "$canvas");
    f(this, "$script");
    f(this, "$drawer");
    f(this, "mode", "game");
  }
  get animation() {
    return this.$animation;
  }
  get scenes() {
    return this.$scenes;
  }
  get canvas() {
    return this.$canvas;
  }
  get script() {
    return this.$script;
  }
  get drawer() {
    return this.$drawer;
  }
  get options() {
    return Object.freeze(this._options);
  }
  get width() {
    return this.options.viewport.width;
  }
  get height() {
    return this.options.viewport.height;
  }
  resize() {
    const t = window.innerWidth / window.innerHeight, e = this.options.viewport.width / this.options.viewport.height;
    t > e ? (this.canvas.instance.height = window.innerHeight, this.canvas.instance.width = this.options.viewport.width * (this.canvas.instance.height / this.options.viewport.height), this.setSize(this.canvas.instance.width, this.canvas.instance.height)) : (this.canvas.instance.width = window.innerWidth, this.canvas.instance.height = this.options.viewport.height * (this.canvas.instance.width / this.options.viewport.width), this.setSize(this.canvas.instance.width, this.canvas.instance.height)), this.changeGlobal(
      "scale-viewport",
      this.canvas.instance.width / this.options.viewport.width
    ), this.drawer.setScaleViewport(this.useGlobal("scale-viewport"));
  }
  setSize(t, e) {
    this.canvas.setSize(t, e, !0), this.drawer.setSize(t, e);
  }
  useGlobal(t) {
    return this._global.get(t);
  }
  emit(t, e) {
    this._events.addEventListener(t, e);
  }
  changeGlobal(t, e) {
    this._global.set(t, e);
  }
  async load(t, e = "JSON") {
    const s = e === "JSON" ? j.parse(t) : ue(t);
    this._options = s.options, this._global.set("mode", "game"), this._global.set("status", null), this._global.set("scale-viewport", 1), this._global.set("re-draw", !0), this.$scenes = new Oi(this), this.$canvas = new Ti(this), this.$script = new Vi(this), this.$drawer = new Ji(this), this.$animation = new Ni(this), this.$$events = new ji(this), this.drawer.setViewportGame(
      this.options.viewport.width,
      this.options.viewport.height
    ), this.scenes.emit("scene:change", () => {
      this.scenes.currentScene && (this.script[Jt](this.scenes.currentScene), this.drawer.setRootNode(this.scenes.currentScene[Q]()));
    });
    const n = q(s.scenes);
    this.scenes.add(...n), this.scenes.change(s.scene), this.animation.setDelayFrames(this.options.fps.delay), this.animation.setVelocityFrames(this.options.fps.velocity), this.resize();
  }
  async start() {
    this.$scenes.currentScene && await this.$script[Ne](), await this.$script.ready(), this.$animation.play();
  }
  [v](t, ...e) {
    return this._events.emitEvent(t, ...e);
  }
}
class ji {
  constructor(t) {
    f(this, "$app");
    this.$app = t, this.init();
  }
  init() {
    this.$app.canvas && this.$app.canvas.event !== void 0 && (this.$app.canvas.event.addEventListener("mousedown", (t) => {
      t.preventDefault(), this.$app[v]("canvas/mouse:down", this.$app, t);
    }), window.addEventListener("mouseup", (t) => {
      t.preventDefault(), this.$app[v]("canvas/mouse:up", this.$app, t);
    }), window.addEventListener("mousemove", (t) => {
      t.preventDefault(), this.$app[v]("canvas/mouse:move", this.$app, t);
    }), this.$app.canvas.event.addEventListener("wheel", (t) => {
      t.preventDefault(), this.$app[v]("canvas/mouse:wheel", this.$app, t);
    }), window.addEventListener("keydown", (t) => {
      this.$app.mode === "game" && (t.preventDefault(), t.key === "F11" && (this.$app.canvas.main.requestFullscreen(), this.$app.resize())), this.$app[v]("canvas/key:down", this.$app, t);
    }), window.addEventListener("keyup", (t) => {
      this.$app.mode === "game" && t.preventDefault(), this.$app[v]("canvas/key:up", this.$app, t);
    }), window.addEventListener("keypress", (t) => {
      this.$app.mode === "game" && t.preventDefault(), this.$app[v]("canvas/key:press", this.$app, t);
    }), this.$app.mode === "game" && this.$app instanceof Ui && window.addEventListener("resize", () => {
      this.$app.resize();
    }));
  }
  [Us]() {
    this.init();
  }
}
class Xr {
  constructor(t) {
    f(this, "$app");
    f(this, "_formatExport", "JSON");
    this.$app = t;
  }
  import(t, e = "JSON") {
    const s = e === "JSON" ? j.parse(t) : ue(t);
    this.$app[zs](s.options);
    const n = q(s.scenes);
    this.$app.scenes.add(...n), this.$app.scenes.change(s.scene);
  }
  export(t, e = this.$app.options.export.format) {
    return e === "YAML" ? Gt(this[L](t)) : j.stringify(this[L](t));
  }
  [L](t) {
    const e = this.$app.scenes[L](), s = this.$app[xs]();
    return t === "game" ? {
      options: {
        background: s.options.game.background,
        context: s.options.context,
        dimension: s.options.dimension,
        fps: {
          delay: s.options.fps.delay,
          velocity: s.options.fps.velocity
        },
        selector: s.options.selector,
        viewport: {
          height: s.options.game.viewport.height,
          width: s.options.game.viewport.width
        },
        x: s.options.game.x,
        y: s.options.game.y,
        center: s.options.game.center,
        full_screen: s.options.game.full_screen,
        full_size: s.options.game.full_size,
        icon: s.options.game.icon,
        resizable: s.options.game.resizable,
        title: s.options.game.title
      },
      scenes: e,
      $global: s.global,
      scene: this.$app.scenes.currentScene.uuid
    } : {
      options: s.options,
      scenes: e,
      $plugins: s.plugins,
      $configs: s.configs,
      $controls: s.controls,
      $nodes: s.nodes,
      $global: s.global,
      scene: this.$app.scenes.currentScene.uuid
    };
  }
}
function Pr(i) {
  return i && i.__esModule && Object.prototype.hasOwnProperty.call(i, "default") ? i.default : i;
}
const Mr = /[\u0000-\u001f\u0022\u005c\ud800-\udfff]|[\ud800-\udbff](?![\udc00-\udfff])|(?:[^\ud800-\udbff]|^)[\udc00-\udfff]/;
function $r(i) {
  if (typeof i != "string")
    throw new TypeError(`Expected input to be of type string, received type ${typeof i} (${i})`);
  return i.length < 5e3 && !Mr.test(i) ? `"${i}"` : JSON.stringify(i);
}
var Jr = $r;
const Ur = /* @__PURE__ */ Pr(Jr);
class jr {
  constructor(t) {
    f(this, "$app");
    f(this, "_window");
    this.$app = t;
  }
  makeConfigWindow(t) {
    let e = "scrollbars=no,status=no,menubar=no,toolbar=no,location=no,directories=no";
    if (t.full_size ? e += `,width=${screen.availWidth},height=${screen.availHeight}` : e += `,width=${t.viewport.width},height=${t.viewport.height}`, t.center && !t.full_size) {
      const s = screen.height / 2 - t.viewport.height / 2, n = screen.width / 2 - t.viewport.width / 2;
      e += `,top=${s},left=${n}`;
    } else t.full_size ? e += ",top=0,left=0" : e += `,top=${t.y},left=${t.x}`;
    return t.resizable ? e += ",resizable=yes" : e += ",resizable=no", t.full_screen ? e += ",fullscreen=yes" : e += ",fullscreen=no", t.title ? e += ",titlebar=yes" : e += ",titlebar=no", e.trim();
  }
  makeCanvas(t) {
    return (
      /* html */
      `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <script src="https://localhost:5173/atomic-engine.iife.js" crossorigin="anonymous" referrerpolicy="no-referrer"><\/script>
      ${t.icon ? `<link rel="icon" type="image/png" href="${t.icon}">` : ""}
      <title>${t.title ? t.title : "Atomic Engine"}</title>
      <style>
        body, html {
          margin: 0;
          padding: 0;
          overflow: hidden;
        }
        canvas {
          display: block;
        }
        </style>
    </head>
    <body>
      <div data-canvas></div>
        <script>
          window.addEventListener("DOMContentLoaded", () => {
            (async ({ AtomicGame }) => {
              const app = new AtomicGame()

              await app.load(${Ur(this.$app.export("game"))})

              app.start()
            })(Atomic)

            ${t.full_screen ? `
            if (!document.fullscreenElement) {
              app.canvas.instance.requestFullscreen();
            } else {
              document.exitFullscreen();
            }
            ` : ""}

            ${t.resizable ? "" : `window.onresize = function() {
              window.resizeTo(${t.viewport.width}, ${t.viewport.height});
            }`}
          })
        <\/script>
    </body>
    </html>
`
    );
  }
  createWindow() {
    var t, e, s;
    this._window || (this._window = window.open(
      "",
      "window-game",
      this.makeConfigWindow(this.$app.options.game)
    ), this.$app.options.game.full_size && ((t = this._window) == null || t.focus()), (e = this._window) == null || e.document.write(this.makeCanvas(this.$app.options.game)), (s = this._window) == null || s.document.close());
  }
  closeWindow() {
    this._window && (this._window.close(), this._window = null);
  }
}
class xr {
  constructor(t) {
    f(this, "_options");
    f(this, "_plugins", /* @__PURE__ */ new Map());
    f(this, "_configs", /* @__PURE__ */ new Map());
    f(this, "_providers", /* @__PURE__ */ new Map());
    f(this, "_nodes", /* @__PURE__ */ new Map());
    f(this, "_controls", /* @__PURE__ */ new Map());
    f(this, "_global", /* @__PURE__ */ new Map());
    f(this, "_events", new Fe());
    f(this, "$$events");
    f(this, "$$distribution");
    f(this, "$$window");
    f(this, "$animation");
    f(this, "$scenes");
    f(this, "$canvas");
    f(this, "$script");
    f(this, "$drawer");
    f(this, "mode", "editor");
    this._options = { ...gs, ...t }, this.init(), this.$$distribution = new Xr(this), this.$$window = new jr(this), this.$$events = new ji(this);
  }
  get animation() {
    return this.$animation;
  }
  get scenes() {
    return this.$scenes;
  }
  get canvas() {
    return this.$canvas;
  }
  get script() {
    return this.$script;
  }
  get drawer() {
    return this.$drawer;
  }
  get options() {
    return Object.freeze({ ...this._options });
  }
  get width() {
    return this.options.width;
  }
  get height() {
    return this.options.height;
  }
  init() {
    this.$scenes = new Oi(this), this.$canvas = new Ti(this), this.$script = new Vi(this), this.$drawer = new Ji(this), this.$animation = new Ni(this), this._global.set("mode", "edition"), this._global.set("status", null), this._global.set("fps", null), this._global.set("re-draw", !0), this._global.set("scale-viewport", 1), this.animation.setDelayFrames(this.options.fps.delay), this.animation.setVelocityFrames(this.options.fps.velocity), this.scenes.emit("scene:change", () => {
      this.scenes.currentScene && (this.script[Jt](this.scenes.currentScene), this.drawer.setRootNode(this.scenes.currentScene[Q]()));
    }), this.setSize(this._options.width, this._options.height);
  }
  setSize(t, e) {
    this._options.width = t, this._options.height = e, this.canvas.setSize(t, e), this.drawer.setSize(t, e), this.drawer.setSizeEditor(t, e);
  }
  setExport(t, e = [], s = []) {
    this._options.export.format = t, this._options.export.exclude = e, this._options.export.include = s;
  }
  plugin(t, e) {
    if (this._plugins.set(t.name, {
      config: t == null ? void 0 : t.config,
      nodes: t == null ? void 0 : t.nodes,
      providers: t == null ? void 0 : t.providers
    }), t.inject) {
      this[t.name] = {};
      for (const [s, n] of Object.entries(t.inject))
        this[t.name][s] = n.bind(this);
    }
    if (t.events)
      for (const [s, n] of Object.entries(t.events))
        n && this._events.addEventListener(s, n);
    t.install && t.install(this, e);
  }
  use(t) {
    var n, r;
    const e = {
      config: this._configs,
      providers: this._providers,
      nodes: this._nodes
    };
    let s;
    if (/@(config|providers|nodes)\/[a-zA-Z-_)(.$]+\/[a-zA-Z-_)(.$]+/g.test(t)) {
      const [o, u, a] = t.substring(1).split("/");
      return s = this._plugins.get(u), s ? (n = s[o]) == null ? void 0 : n[a] : (r = e[o].get(u)) == null ? void 0 : r[a];
    }
    if (/@(config|providers|nodes)\/[a-zA-Z-_)(.$]+/g.test(t)) {
      const [o, u] = t.substring(1).split("/");
      return s = this._plugins.get(u), s ? s[o] : e[o].get(u);
    }
  }
  useGlobal(t) {
    return this._global.get(t);
  }
  emit(t, e) {
    this._events.addEventListener(t, e);
  }
  config(t, e) {
    this._plugins.has(t) || this._configs.set(t, e);
  }
  provide(t, e) {
    this._plugins.has(t) || this._providers.set(t, e);
  }
  node(t, e) {
    this._plugins.has(t) || this._nodes.set(t, e);
  }
  export(t = "editor", e = "JSON") {
    return this.$$distribution.export(t, e);
  }
  import(t, e = "JSON") {
    this.$$distribution.import(t, e);
  }
  async start() {
    this.$scenes.currentScene && await this.$script[Ne](), this.animation.play();
  }
  changeGlobal(t, e) {
    this._global.set(t, e);
  }
  preview() {
    return {
      play: async () => {
        this.useGlobal("mode") === "edition" && (this._global.set("mode", "preview"), await this.$script.ready());
      },
      stop: () => {
        this.useGlobal("mode") === "preview" && this.$scenes.currentScene && (this._global.set("mode", "edition"), this.$scenes.reset(this.$scenes.currentScene));
      },
      pause: () => {
        this.useGlobal("mode") === "preview" && this._global.set("mode", "edition");
      }
    };
  }
  game() {
    return {
      play: () => {
        this.$$window.createWindow();
      },
      stop: () => {
        this.$$window.closeWindow();
      }
    };
  }
  [zs](t) {
    this._options = { ...gs, ...t }, this.init(), this.$$events[Us]();
  }
  [xs]() {
    return JSON.parse(
      JSON.stringify({
        options: this._options,
        plugins: this._plugins,
        configs: this._configs,
        global: this._global,
        controls: this._controls,
        nodes: this._nodes,
        providers: this._providers
      })
    );
  }
  [v](t, ...e) {
    return this._events.emitEvent(t, ...e);
  }
  [Qi](t) {
    return this._events.hasEventListener(t);
  }
}
export {
  xr as AtomicEngine,
  Ui as AtomicGame,
  Zr as ControlEdition2D,
  kr as LineFlowEffect2D,
  ae as Node2D,
  hs as PrimitiveNode,
  Fr as Rectangle2D,
  Ri as Scene2D,
  Gr as Selection2D,
  Lr as Text2D
};
