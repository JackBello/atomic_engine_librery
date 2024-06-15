var Yi = Object.defineProperty;
var Ki = (i, t, e) => t in i ? Yi(i, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : i[t] = e;
var f = (i, t, e) => (Ki(i, typeof t != "symbol" ? t + "" : t, e), e);
const k = Symbol("MethodExport"), q = Symbol("MethodExportWorker"), Ys = Symbol("MethodReloadEvents"), L = Symbol("MethodDispatchEvent"), Ne = Symbol("MethodDispatchScript"), Ri = Symbol("MethodHasEvent"), Ks = Symbol("MethodStaticSetApp"), Rs = Symbol("MethodGetAllInsideAtomic"), Os = Symbol("MethodSetOptions"), Jt = Symbol("MethodSetRootNode");
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
    for (const t in this._eventListeners)
      this._eventListeners[t] = [];
  }
  emitEvent(t, ...e) {
    t in this._eventListeners && this._eventListeners[t].forEach((s) => s(...e));
  }
}
const ds = {
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
  },
  canvasMode: "main-thread"
}, Ut = Symbol.for("yaml.alias"), Rt = Symbol.for("yaml.document"), fe = Symbol.for("yaml.map"), Ws = Symbol.for("yaml.pair"), ge = Symbol.for("yaml.scalar"), We = Symbol.for("yaml.seq"), ne = Symbol.for("yaml.node.type"), He = (i) => !!i && typeof i == "object" && i[ne] === Ut, mt = (i) => !!i && typeof i == "object" && i[ne] === Rt, qe = (i) => !!i && typeof i == "object" && i[ne] === fe, W = (i) => !!i && typeof i == "object" && i[ne] === Ws, v = (i) => !!i && typeof i == "object" && i[ne] === ge, et = (i) => !!i && typeof i == "object" && i[ne] === We;
function O(i) {
  if (i && typeof i == "object")
    switch (i[ne]) {
      case fe:
      case We:
        return !0;
    }
  return !1;
}
function H(i) {
  if (i && typeof i == "object")
    switch (i[ne]) {
      case Ut:
      case fe:
      case ge:
      case We:
        return !0;
    }
  return !1;
}
const Oi = (i) => (v(i) || O(i)) && !!i.anchor, De = Symbol("break visit"), Wi = Symbol("skip children"), Je = Symbol("remove node");
function Se(i, t) {
  const e = Hi(t);
  mt(i) ? Ze(null, i.contents, e, Object.freeze([i])) === Je && (i.contents = null) : Ze(null, i, e, Object.freeze([]));
}
Se.BREAK = De;
Se.SKIP = Wi;
Se.REMOVE = Je;
function Ze(i, t, e, s) {
  const n = Ti(i, t, e, s);
  if (H(n) || W(n))
    return Vi(i, s, n), Ze(i, n, e, s);
  if (typeof n != "symbol") {
    if (O(t)) {
      s = Object.freeze(s.concat(t));
      for (let r = 0; r < t.items.length; ++r) {
        const u = Ze(r, t.items[r], e, s);
        if (typeof u == "number")
          r = u - 1;
        else {
          if (u === De)
            return De;
          u === Je && (t.items.splice(r, 1), r -= 1);
        }
      }
    } else if (W(t)) {
      s = Object.freeze(s.concat(t));
      const r = Ze("key", t.key, e, s);
      if (r === De)
        return De;
      r === Je && (t.key = null);
      const u = Ze("value", t.value, e, s);
      if (u === De)
        return De;
      u === Je && (t.value = null);
    }
  }
  return n;
}
function Hi(i) {
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
function Ti(i, t, e, s) {
  var n, r, u, o, a;
  if (typeof e == "function")
    return e(i, t, s);
  if (qe(t))
    return (n = e.Map) == null ? void 0 : n.call(e, i, t, s);
  if (et(t))
    return (r = e.Seq) == null ? void 0 : r.call(e, i, t, s);
  if (W(t))
    return (u = e.Pair) == null ? void 0 : u.call(e, i, t, s);
  if (v(t))
    return (o = e.Scalar) == null ? void 0 : o.call(e, i, t, s);
  if (He(t))
    return (a = e.Alias) == null ? void 0 : a.call(e, i, t, s);
}
function Vi(i, t, e) {
  const s = t[t.length - 1];
  if (O(s))
    s.items[i] = e;
  else if (W(s))
    i === "key" ? s.key = e : s.value = e;
  else if (mt(s))
    s.contents = e;
  else {
    const n = He(s) ? "alias" : "scalar";
    throw new Error(`Cannot replace node with ${n} parent`);
  }
}
const $i = {
  "!": "%21",
  ",": "%2C",
  "[": "%5B",
  "]": "%5D",
  "{": "%7B",
  "}": "%7D"
}, Mi = (i) => i.replace(/[!,[\]{}]/g, (t) => $i[t]);
class J {
  constructor(t, e) {
    this.docStart = null, this.docEnd = !1, this.yaml = Object.assign({}, J.defaultYaml, t), this.tags = Object.assign({}, J.defaultTags, e);
  }
  clone() {
    const t = new J(this.yaml, this.tags);
    return t.docStart = this.docStart, t;
  }
  /**
   * During parsing, get a Directives instance for the current document and
   * update the stream state according to the current version's spec.
   */
  atDocument() {
    const t = new J(this.yaml, this.tags);
    switch (this.yaml.version) {
      case "1.1":
        this.atNextDocument = !0;
        break;
      case "1.2":
        this.atNextDocument = !1, this.yaml = {
          explicit: J.defaultYaml.explicit,
          version: "1.2"
        }, this.tags = Object.assign({}, J.defaultTags);
        break;
    }
    return t;
  }
  /**
   * @param onError - May be called even if the action was successful
   * @returns `true` on success
   */
  add(t, e) {
    this.atNextDocument && (this.yaml = { explicit: J.defaultYaml.explicit, version: "1.1" }, this.tags = Object.assign({}, J.defaultTags), this.atNextDocument = !1);
    const s = t.trim().split(/[ \t]+/), n = s.shift();
    switch (n) {
      case "%TAG": {
        if (s.length !== 2 && (e(0, "%TAG directive should contain exactly two parts"), s.length < 2))
          return !1;
        const [r, u] = s;
        return this.tags[r] = u, !0;
      }
      case "%YAML": {
        if (this.yaml.explicit = !0, s.length !== 1)
          return e(0, "%YAML directive should contain exactly one part"), !1;
        const [r] = s;
        if (r === "1.1" || r === "1.2")
          return this.yaml.version = r, !0;
        {
          const u = /^\d+\.\d+$/.test(r);
          return e(6, `Unsupported YAML version ${r}`, u), !1;
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
      const u = t.slice(2, -1);
      return u === "!" || u === "!!" ? (e(`Verbatim tags aren't resolved, so ${t} is invalid.`), null) : (t[t.length - 1] !== ">" && e("Verbatim tags must end with a >"), u);
    }
    const [, s, n] = t.match(/^(.*!)([^!]*)$/s);
    n || e(`The ${t} tag has no suffix`);
    const r = this.tags[s];
    if (r)
      try {
        return r + decodeURIComponent(n);
      } catch (u) {
        return e(String(u)), null;
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
        return e + Mi(t.substring(s.length));
    return t[0] === "!" ? t : `!<${t}>`;
  }
  toString(t) {
    const e = this.yaml.explicit ? [`%YAML ${this.yaml.version || "1.2"}`] : [], s = Object.entries(this.tags);
    let n;
    if (t && s.length > 0 && H(t.contents)) {
      const r = {};
      Se(t.contents, (u, o) => {
        H(o) && o.tag && (r[o.tag] = !0);
      }), n = Object.keys(r);
    } else
      n = [];
    for (const [r, u] of s)
      r === "!!" && u === "tag:yaml.org,2002:" || (!t || n.some((o) => o.startsWith(u))) && e.push(`%TAG ${r} ${u}`);
    return e.join(`
`);
  }
}
J.defaultYaml = { explicit: !1, version: "1.2" };
J.defaultTags = { "!!": "tag:yaml.org,2002:" };
function Hs(i) {
  if (/[\x00-\x19\s,[\]{}]/.test(i)) {
    const e = `Anchor must not contain whitespace or control characters: ${JSON.stringify(i)}`;
    throw new Error(e);
  }
  return !0;
}
function Ts(i) {
  const t = /* @__PURE__ */ new Set();
  return Se(i, {
    Value(e, s) {
      s.anchor && t.add(s.anchor);
    }
  }), t;
}
function Vs(i, t) {
  for (let e = 1; ; ++e) {
    const s = `${i}${e}`;
    if (!t.has(s))
      return s;
  }
}
function Pi(i, t) {
  const e = [], s = /* @__PURE__ */ new Map();
  let n = null;
  return {
    onAnchor: (r) => {
      e.push(r), n || (n = Ts(i));
      const u = Vs(t, n);
      return n.add(u), u;
    },
    /**
     * With circular references, the source node is only resolved after all
     * of its child nodes are. This is why anchors are set only after all of
     * the nodes have been created.
     */
    setAnchors: () => {
      for (const r of e) {
        const u = s.get(r);
        if (typeof u == "object" && u.anchor && (v(u.node) || O(u.node)))
          u.node.anchor = u.anchor;
        else {
          const o = new Error("Failed to resolve repeated object (this should not happen)");
          throw o.source = r, o;
        }
      }
    },
    sourceObjects: s
  };
}
function Le(i, t, e, s) {
  if (s && typeof s == "object")
    if (Array.isArray(s))
      for (let n = 0, r = s.length; n < r; ++n) {
        const u = s[n], o = Le(i, s, String(n), u);
        o === void 0 ? delete s[n] : o !== u && (s[n] = o);
      }
    else if (s instanceof Map)
      for (const n of Array.from(s.keys())) {
        const r = s.get(n), u = Le(i, s, n, r);
        u === void 0 ? s.delete(n) : u !== r && s.set(n, u);
      }
    else if (s instanceof Set)
      for (const n of Array.from(s)) {
        const r = Le(i, s, n, n);
        r === void 0 ? s.delete(n) : r !== n && (s.delete(n), s.add(r));
      }
    else
      for (const [n, r] of Object.entries(s)) {
        const u = Le(i, s, n, r);
        u === void 0 ? delete s[n] : u !== r && (s[n] = u);
      }
  return i.call(t, e, s);
}
function ie(i, t, e) {
  if (Array.isArray(i))
    return i.map((s, n) => ie(s, String(n), e));
  if (i && typeof i.toJSON == "function") {
    if (!e || !Oi(i))
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
class xt {
  constructor(t) {
    Object.defineProperty(this, ne, { value: t });
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
    const u = {
      anchors: /* @__PURE__ */ new Map(),
      doc: t,
      keep: !0,
      mapAsMap: e === !0,
      mapKeyWarned: !1,
      maxAliasCount: typeof s == "number" ? s : 100
    }, o = ie(this, "", u);
    if (typeof n == "function")
      for (const { count: a, res: l } of u.anchors.values())
        n(l, a);
    return typeof r == "function" ? Le(r, { "": o }, "", o) : o;
  }
}
class jt extends xt {
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
    const { anchors: s, doc: n, maxAliasCount: r } = e, u = this.resolve(n);
    if (!u) {
      const a = `Unresolved alias (the anchor must be set before the alias): ${this.source}`;
      throw new ReferenceError(a);
    }
    let o = s.get(u);
    if (o || (ie(u, null, e), o = s.get(u)), !o || o.res === void 0) {
      const a = "This should not happen: Alias anchor was not resolved?";
      throw new ReferenceError(a);
    }
    if (r >= 0 && (o.count += 1, o.aliasCount === 0 && (o.aliasCount = lt(n, u, s)), o.count * o.aliasCount > r)) {
      const a = "Excessive alias count indicates a resource exhaustion attack";
      throw new ReferenceError(a);
    }
    return o.res;
  }
  toString(t, e, s) {
    const n = `*${this.source}`;
    if (t) {
      if (Hs(this.source), t.options.verifyAliasOrder && !t.anchors.has(this.source)) {
        const r = `Unresolved alias (the anchor must be set before the alias): ${this.source}`;
        throw new Error(r);
      }
      if (t.implicitKey)
        return `${n} `;
    }
    return n;
  }
}
function lt(i, t, e) {
  if (He(t)) {
    const s = t.resolve(i), n = e && s && e.get(s);
    return n ? n.count * n.aliasCount : 0;
  } else if (O(t)) {
    let s = 0;
    for (const n of t.items) {
      const r = lt(i, n, e);
      r > s && (s = r);
    }
    return s;
  } else if (W(t)) {
    const s = lt(i, t.key, e), n = lt(i, t.value, e);
    return Math.max(s, n);
  }
  return 1;
}
const $s = (i) => !i || typeof i != "function" && typeof i != "object";
class E extends xt {
  constructor(t) {
    super(ge), this.value = t;
  }
  toJSON(t, e) {
    return e != null && e.keep ? this.value : ie(this.value, t, e);
  }
  toString() {
    return String(this.value);
  }
}
E.BLOCK_FOLDED = "BLOCK_FOLDED";
E.BLOCK_LITERAL = "BLOCK_LITERAL";
E.PLAIN = "PLAIN";
E.QUOTE_DOUBLE = "QUOTE_DOUBLE";
E.QUOTE_SINGLE = "QUOTE_SINGLE";
const Xi = "tag:yaml.org,2002:";
function Ji(i, t, e) {
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
  var d, p, A;
  if (mt(i) && (i = i.contents), H(i))
    return i;
  if (W(i)) {
    const y = (p = (d = e.schema[fe]).createNode) == null ? void 0 : p.call(d, e.schema, null, e);
    return y.items.push(i), y;
  }
  (i instanceof String || i instanceof Number || i instanceof Boolean || typeof BigInt < "u" && i instanceof BigInt) && (i = i.valueOf());
  const { aliasDuplicateObjects: s, onAnchor: n, onTagObj: r, schema: u, sourceObjects: o } = e;
  let a;
  if (s && i && typeof i == "object") {
    if (a = o.get(i), a)
      return a.anchor || (a.anchor = n(i)), new jt(a.anchor);
    a = { anchor: null, node: null }, o.set(i, a);
  }
  t != null && t.startsWith("!!") && (t = Xi + t.slice(2));
  let l = Ji(i, t, u.tags);
  if (!l) {
    if (i && typeof i.toJSON == "function" && (i = i.toJSON()), !i || typeof i != "object") {
      const y = new E(i);
      return a && (a.node = y), y;
    }
    l = i instanceof Map ? u[fe] : Symbol.iterator in Object(i) ? u[We] : u[fe];
  }
  r && (r(l), delete e.onTagObj);
  const g = l != null && l.createNode ? l.createNode(e.schema, i, e) : typeof ((A = l == null ? void 0 : l.nodeClass) == null ? void 0 : A.from) == "function" ? l.nodeClass.from(e.schema, i, e) : new E(i);
  return t ? g.tag = t : l.default || (g.tag = l.tag), a && (a.node = g), g;
}
function pt(i, t, e) {
  let s = e;
  for (let n = t.length - 1; n >= 0; --n) {
    const r = t[n];
    if (typeof r == "number" && Number.isInteger(r) && r >= 0) {
      const u = [];
      u[r] = s, s = u;
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
const Me = (i) => i == null || typeof i == "object" && !!i[Symbol.iterator]().next().done;
class zt extends xt {
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
    return t && (e.schema = t), e.items = e.items.map((s) => H(s) || W(s) ? s.clone(t) : s), this.range && (e.range = this.range.slice()), e;
  }
  /**
   * Adds a value to the collection. For `!!map` and `!!omap` the value must
   * be a Pair instance or a `{ key, value }` object, which may not have a key
   * that already exists in the map.
   */
  addIn(t, e) {
    if (Me(t))
      this.add(e);
    else {
      const [s, ...n] = t, r = this.get(s, !0);
      if (O(r))
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
    if (O(n))
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
    return n.length === 0 ? !e && v(r) ? r.value : r : O(r) ? r.getIn(n, e) : void 0;
  }
  hasAllNullValues(t) {
    return this.items.every((e) => {
      if (!W(e))
        return !1;
      const s = e.value;
      return s == null || t && v(s) && s.value == null && !s.commentBefore && !s.comment && !s.tag;
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
    return O(n) ? n.hasIn(s) : !1;
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
      if (O(r))
        r.setIn(n, e);
      else if (r === void 0 && this.schema)
        this.set(s, pt(this.schema, n, e));
      else
        throw new Error(`Expected YAML collection at ${s}. Remaining path: ${n}`);
    }
  }
}
zt.maxFlowStringSingleLineLength = 60;
const Ui = (i) => i.replace(/^(?!$)(?: $)?/gm, "#");
function de(i, t) {
  return /^\n+$/.test(i) ? i.substring(1) : t ? i.replace(/^(?! *$)/gm, t) : i;
}
const be = (i, t, e) => i.endsWith(`
`) ? de(e, t) : e.includes(`
`) ? `
` + de(e, t) : (i.endsWith(" ") ? "" : " ") + e, Ms = "flow", Ot = "block", ct = "quoted";
function It(i, t, e = "flow", { indentAtStart: s, lineWidth: n = 80, minContentWidth: r = 20, onFold: u, onOverflow: o } = {}) {
  if (!n || n < 0)
    return i;
  const a = Math.max(1 + r, 1 + n - t.length);
  if (i.length <= a)
    return i;
  const l = [], g = {};
  let d = n - t.length;
  typeof s == "number" && (s > n - Math.max(2, r) ? l.push(0) : d = n - s);
  let p, A, y = !1, c = -1, h = -1, m = -1;
  e === Ot && (c = ps(i, c, t.length), c !== -1 && (d = c + a));
  for (let w; w = i[c += 1]; ) {
    if (e === ct && w === "\\") {
      switch (h = c, i[c + 1]) {
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
      m = c;
    }
    if (w === `
`)
      e === Ot && (c = ps(i, c, t.length)), d = c + t.length + a, p = void 0;
    else {
      if (w === " " && A && A !== " " && A !== `
` && A !== "	") {
        const D = i[c + 1];
        D && D !== " " && D !== `
` && D !== "	" && (p = c);
      }
      if (c >= d)
        if (p)
          l.push(p), d = p + a, p = void 0;
        else if (e === ct) {
          for (; A === " " || A === "	"; )
            A = w, w = i[c += 1], y = !0;
          const D = c > m + 1 ? c - 2 : h - 1;
          if (g[D])
            return i;
          l.push(D), g[D] = !0, d = D + a, p = void 0;
        } else
          y = !0;
    }
    A = w;
  }
  if (y && o && o(), l.length === 0)
    return i;
  u && u();
  let b = i.slice(0, l[0]);
  for (let w = 0; w < l.length; ++w) {
    const D = l[w], B = l[w + 1] || i.length;
    D === 0 ? b = `
${t}${i.slice(0, B)}` : (e === ct && g[D] && (b += `${i[D]}\\`), b += `
${t}${i.slice(D + 1, B)}`);
  }
  return b;
}
function ps(i, t, e) {
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
const Dt = (i, t) => ({
  indentAtStart: t ? i.indent.length : i.indentAtStart,
  lineWidth: i.options.lineWidth,
  minContentWidth: i.options.minContentWidth
}), yt = (i) => /^(%|---|\.\.\.)/m.test(i);
function xi(i, t, e) {
  if (!t || t < 0)
    return !1;
  const s = t - e, n = i.length;
  if (n <= s)
    return !1;
  for (let r = 0, u = 0; r < n; ++r)
    if (i[r] === `
`) {
      if (r - u > s)
        return !0;
      if (u = r + 1, n - u <= s)
        return !1;
    }
  return !0;
}
function Ue(i, t) {
  const e = JSON.stringify(i);
  if (t.options.doubleQuotedAsJSON)
    return e;
  const { implicitKey: s } = t, n = t.options.doubleQuotedMinMultiLineLength, r = t.indent || (yt(i) ? "  " : "");
  let u = "", o = 0;
  for (let a = 0, l = e[a]; l; l = e[++a])
    if (l === " " && e[a + 1] === "\\" && e[a + 2] === "n" && (u += e.slice(o, a) + "\\ ", a += 1, o = a, l = "\\"), l === "\\")
      switch (e[a + 1]) {
        case "u":
          {
            u += e.slice(o, a);
            const g = e.substr(a + 2, 4);
            switch (g) {
              case "0000":
                u += "\\0";
                break;
              case "0007":
                u += "\\a";
                break;
              case "000b":
                u += "\\v";
                break;
              case "001b":
                u += "\\e";
                break;
              case "0085":
                u += "\\N";
                break;
              case "00a0":
                u += "\\_";
                break;
              case "2028":
                u += "\\L";
                break;
              case "2029":
                u += "\\P";
                break;
              default:
                g.substr(0, 2) === "00" ? u += "\\x" + g.substr(2) : u += e.substr(a, 6);
            }
            a += 5, o = a + 1;
          }
          break;
        case "n":
          if (s || e[a + 2] === '"' || e.length < n)
            a += 1;
          else {
            for (u += e.slice(o, a) + `

`; e[a + 2] === "\\" && e[a + 3] === "n" && e[a + 4] !== '"'; )
              u += `
`, a += 2;
            u += r, e[a + 2] === " " && (u += "\\"), a += 1, o = a + 1;
          }
          break;
        default:
          a += 1;
      }
  return u = o ? u + e.slice(o) : e, s ? u : It(u, r, ct, Dt(t, !1));
}
function Wt(i, t) {
  if (t.options.singleQuote === !1 || t.implicitKey && i.includes(`
`) || /[ \t]\n|\n[ \t]/.test(i))
    return Ue(i, t);
  const e = t.indent || (yt(i) ? "  " : ""), s = "'" + i.replace(/'/g, "''").replace(/\n+/g, `$&
${e}`) + "'";
  return t.implicitKey ? s : It(s, e, Ms, Dt(t, !1));
}
function ve(i, t) {
  const { singleQuote: e } = t.options;
  let s;
  if (e === !1)
    s = Ue;
  else {
    const n = i.includes('"'), r = i.includes("'");
    n && !r ? s = Wt : r && !n ? s = Ue : s = e ? Wt : Ue;
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
function ht({ comment: i, type: t, value: e }, s, n, r) {
  const { blockQuote: u, commentString: o, lineWidth: a } = s.options;
  if (!u || /\n[\t ]+$/.test(e) || /^\s*$/.test(e))
    return ve(e, s);
  const l = s.indent || (s.forceBlockIndent || yt(e) ? "  " : ""), g = u === "literal" ? !0 : u === "folded" || t === E.BLOCK_FOLDED ? !1 : t === E.BLOCK_LITERAL ? !0 : !xi(e, a, l.length);
  if (!e)
    return g ? `|
` : `>
`;
  let d, p;
  for (p = e.length; p > 0; --p) {
    const I = e[p - 1];
    if (I !== `
` && I !== "	" && I !== " ")
      break;
  }
  let A = e.substring(p);
  const y = A.indexOf(`
`);
  y === -1 ? d = "-" : e === A || y !== A.length - 1 ? (d = "+", r && r()) : d = "", A && (e = e.slice(0, -A.length), A[A.length - 1] === `
` && (A = A.slice(0, -1)), A = A.replace(Ht, `$&${l}`));
  let c = !1, h, m = -1;
  for (h = 0; h < e.length; ++h) {
    const I = e[h];
    if (I === " ")
      c = !0;
    else if (I === `
`)
      m = h;
    else
      break;
  }
  let b = e.substring(0, m < h ? m + 1 : h);
  b && (e = e.substring(b.length), b = b.replace(/\n+/g, `$&${l}`));
  let D = (g ? "|" : ">") + (c ? l ? "2" : "1" : "") + d;
  if (i && (D += " " + o(i.replace(/ ?[\r\n]+/g, " ")), n && n()), g)
    return e = e.replace(/\n+/g, `$&${l}`), `${D}
${l}${b}${e}${A}`;
  e = e.replace(/\n+/g, `
$&`).replace(/(?:^|\n)([\t ].*)(?:([\n\t ]*)\n(?![\n\t ]))?/g, "$1$2").replace(/\n+/g, `$&${l}`);
  const B = It(`${b}${e}${A}`, l, Ot, Dt(s, !0));
  return `${D}
${l}${B}`;
}
function ji(i, t, e, s) {
  const { type: n, value: r } = i, { actualString: u, implicitKey: o, indent: a, indentStep: l, inFlow: g } = t;
  if (o && r.includes(`
`) || g && /[[\]{},]/.test(r))
    return ve(r, t);
  if (!r || /^[\n\t ,[\]{}#&*!|>'"%@`]|^[?-]$|^[?-][ \t]|[\n:][ \t]|[ \t]\n|[\n\t ]#|[\n\t :]$/.test(r))
    return o || g || !r.includes(`
`) ? ve(r, t) : ht(i, t, e, s);
  if (!o && !g && n !== E.PLAIN && r.includes(`
`))
    return ht(i, t, e, s);
  if (yt(r)) {
    if (a === "")
      return t.forceBlockIndent = !0, ht(i, t, e, s);
    if (o && a === l)
      return ve(r, t);
  }
  const d = r.replace(/\n+/g, `$&
${a}`);
  if (u) {
    const p = (c) => {
      var h;
      return c.default && c.tag !== "tag:yaml.org,2002:str" && ((h = c.test) == null ? void 0 : h.test(d));
    }, { compat: A, tags: y } = t.doc.schema;
    if (y.some(p) || A != null && A.some(p))
      return ve(r, t);
  }
  return o ? d : It(d, a, Ms, Dt(t, !1));
}
function Qt(i, t, e, s) {
  const { implicitKey: n, inFlow: r } = t, u = typeof i.value == "string" ? i : Object.assign({}, i, { value: String(i.value) });
  let { type: o } = i;
  o !== E.QUOTE_DOUBLE && /[\x00-\x08\x0b-\x1f\x7f-\x9f\u{D800}-\u{DFFF}]/u.test(u.value) && (o = E.QUOTE_DOUBLE);
  const a = (g) => {
    switch (g) {
      case E.BLOCK_FOLDED:
      case E.BLOCK_LITERAL:
        return n || r ? ve(u.value, t) : ht(u, t, e, s);
      case E.QUOTE_DOUBLE:
        return Ue(u.value, t);
      case E.QUOTE_SINGLE:
        return Wt(u.value, t);
      case E.PLAIN:
        return ji(u, t, e, s);
      default:
        return null;
    }
  };
  let l = a(o);
  if (l === null) {
    const { defaultKeyType: g, defaultStringType: d } = t.options, p = n && g || d;
    if (l = a(p), l === null)
      throw new Error(`Unsupported default string type ${p}`);
  }
  return l;
}
function Ps(i, t) {
  const e = Object.assign({
    blockQuote: !0,
    commentString: Ui,
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
function zi(i, t) {
  var n;
  if (t.tag) {
    const r = i.filter((u) => u.tag === t.tag);
    if (r.length > 0)
      return r.find((u) => u.format === t.format) ?? r[0];
  }
  let e, s;
  if (v(t)) {
    s = t.value;
    const r = i.filter((u) => {
      var o;
      return (o = u.identify) == null ? void 0 : o.call(u, s);
    });
    e = r.find((u) => u.format === t.format) ?? r.find((u) => !u.format);
  } else
    s = t, e = i.find((r) => r.nodeClass && s instanceof r.nodeClass);
  if (!e) {
    const r = ((n = s == null ? void 0 : s.constructor) == null ? void 0 : n.name) ?? typeof s;
    throw new Error(`Tag not resolved for ${r} value`);
  }
  return e;
}
function Qi(i, t, { anchors: e, doc: s }) {
  if (!s.directives)
    return "";
  const n = [], r = (v(i) || O(i)) && i.anchor;
  r && Hs(r) && (e.add(r), n.push(`&${r}`));
  const u = i.tag ? i.tag : t.default ? null : t.tag;
  return u && n.push(s.directives.tagString(u)), n.join(" ");
}
function Re(i, t, e, s) {
  var a;
  if (W(i))
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
  n || (n = zi(t.doc.schema.tags, r));
  const u = Qi(r, n, t);
  u.length > 0 && (t.indentAtStart = (t.indentAtStart ?? 0) + u.length + 1);
  const o = typeof n.stringify == "function" ? n.stringify(r, t, e, s) : v(r) ? Qt(r, t, e, s) : r.toString(t, e, s);
  return u ? v(r) || o[0] === "{" || o[0] === "[" ? `${u} ${o}` : `${u}
${t.indent}${o}` : o;
}
function qi({ key: i, value: t }, e, s, n) {
  const { allNullValues: r, doc: u, indent: o, indentStep: a, options: { commentString: l, indentSeq: g, simpleKeys: d } } = e;
  let p = H(i) && i.comment || null;
  if (d) {
    if (p)
      throw new Error("With simple keys, key nodes cannot have comments");
    if (O(i)) {
      const N = "With simple keys, collection cannot be used as a key value";
      throw new Error(N);
    }
  }
  let A = !d && (!i || p && t == null && !e.inFlow || O(i) || (v(i) ? i.type === E.BLOCK_FOLDED || i.type === E.BLOCK_LITERAL : typeof i == "object"));
  e = Object.assign({}, e, {
    allNullValues: !1,
    implicitKey: !A && (d || !r),
    indent: o + a
  });
  let y = !1, c = !1, h = Re(i, e, () => y = !0, () => c = !0);
  if (!A && !e.inFlow && h.length > 1024) {
    if (d)
      throw new Error("With simple keys, single line scalar must not span more than 1024 characters");
    A = !0;
  }
  if (e.inFlow) {
    if (r || t == null)
      return y && s && s(), h === "" ? "?" : A ? `? ${h}` : h;
  } else if (r && !d || t == null && A)
    return h = `? ${h}`, p && !y ? h += be(h, e.indent, l(p)) : c && n && n(), h;
  y && (p = null), A ? (p && (h += be(h, e.indent, l(p))), h = `? ${h}
${o}:`) : (h = `${h}:`, p && (h += be(h, e.indent, l(p))));
  let m, b, w;
  H(t) ? (m = !!t.spaceBefore, b = t.commentBefore, w = t.comment) : (m = !1, b = null, w = null, t && typeof t == "object" && (t = u.createNode(t))), e.implicitKey = !1, !A && !p && v(t) && (e.indentAtStart = h.length + 1), c = !1, !g && a.length >= 2 && !e.inFlow && !A && et(t) && !t.flow && !t.tag && !t.anchor && (e.indent = e.indent.substring(2));
  let D = !1;
  const B = Re(t, e, () => D = !0, () => c = !0);
  let I = " ";
  if (p || m || b) {
    if (I = m ? `
` : "", b) {
      const N = l(b);
      I += `
${de(N, e.indent)}`;
    }
    B === "" && !e.inFlow ? I === `
` && (I = `

`) : I += `
${e.indent}`;
  } else if (!A && O(t)) {
    const N = B[0], Y = B.indexOf(`
`), X = Y !== -1, Ae = e.inFlow ?? t.flow ?? t.items.length === 0;
    if (X || !Ae) {
      let Ge = !1;
      if (X && (N === "&" || N === "!")) {
        let T = B.indexOf(" ");
        N === "&" && T !== -1 && T < Y && B[T + 1] === "!" && (T = B.indexOf(" ", T + 1)), (T === -1 || Y < T) && (Ge = !0);
      }
      Ge || (I = `
${e.indent}`);
    }
  } else
    (B === "" || B[0] === `
`) && (I = "");
  return h += I + B, e.inFlow ? D && s && s() : w && !D ? h += be(h, e.indent, l(w)) : c && n && n(), h;
}
function Xs(i, t) {
  (i === "debug" || i === "warn") && (typeof process < "u" && process.emitWarning ? process.emitWarning(t) : console.warn(t));
}
const gs = "<<";
function Js(i, t, { key: e, value: s }) {
  if (i != null && i.doc.schema.merge && en(e))
    if (s = He(s) ? s.resolve(i.doc) : s, et(s))
      for (const n of s.items)
        Gt(i, t, n);
    else if (Array.isArray(s))
      for (const n of s)
        Gt(i, t, n);
    else
      Gt(i, t, s);
  else {
    const n = ie(e, "", i);
    if (t instanceof Map)
      t.set(n, ie(s, n, i));
    else if (t instanceof Set)
      t.add(n);
    else {
      const r = tn(e, n, i), u = ie(s, r, i);
      r in t ? Object.defineProperty(t, r, {
        value: u,
        writable: !0,
        enumerable: !0,
        configurable: !0
      }) : t[r] = u;
    }
  }
  return t;
}
const en = (i) => i === gs || v(i) && i.value === gs && (!i.type || i.type === E.PLAIN);
function Gt(i, t, e) {
  const s = i && He(e) ? e.resolve(i.doc) : e;
  if (!qe(s))
    throw new Error("Merge sources must be maps or map aliases");
  const n = s.toJSON(null, i, Map);
  for (const [r, u] of n)
    t instanceof Map ? t.has(r) || t.set(r, u) : t instanceof Set ? t.add(r) : Object.prototype.hasOwnProperty.call(t, r) || Object.defineProperty(t, r, {
      value: u,
      writable: !0,
      enumerable: !0,
      configurable: !0
    });
  return t;
}
function tn(i, t, e) {
  if (t === null)
    return "";
  if (typeof t != "object")
    return String(t);
  if (H(i) && (e != null && e.doc)) {
    const s = Ps(e.doc, {});
    s.anchors = /* @__PURE__ */ new Set();
    for (const r of e.anchors.keys())
      s.anchors.add(r.anchor);
    s.inFlow = !0, s.inStringifyKey = !0;
    const n = i.toString(s);
    if (!e.mapKeyWarned) {
      let r = JSON.stringify(n);
      r.length > 40 && (r = r.substring(0, 36) + '..."'), Xs(e.doc.options.logLevel, `Keys with collection values will be stringified due to JS Object restrictions: ${r}. Set mapAsMap: true to use object keys.`), e.mapKeyWarned = !0;
    }
    return n;
  }
  return JSON.stringify(t);
}
function qt(i, t, e) {
  const s = ze(i, void 0, e), n = ze(t, void 0, e);
  return new x(s, n);
}
class x {
  constructor(t, e = null) {
    Object.defineProperty(this, ne, { value: Ws }), this.key = t, this.value = e;
  }
  clone(t) {
    let { key: e, value: s } = this;
    return H(e) && (e = e.clone(t)), H(s) && (s = s.clone(t)), new x(e, s);
  }
  toJSON(t, e) {
    const s = e != null && e.mapAsMap ? /* @__PURE__ */ new Map() : {};
    return Js(e, s, this);
  }
  toString(t, e, s) {
    return t != null && t.doc ? qi(this, t, e, s) : JSON.stringify(this);
  }
}
function Us(i, t, e) {
  return (t.inFlow ?? i.flow ? nn : sn)(i, t, e);
}
function sn({ comment: i, items: t }, e, { blockItemPrefix: s, flowChars: n, itemIndent: r, onChompKeep: u, onComment: o }) {
  const { indent: a, options: { commentString: l } } = e, g = Object.assign({}, e, { indent: r, type: null });
  let d = !1;
  const p = [];
  for (let y = 0; y < t.length; ++y) {
    const c = t[y];
    let h = null;
    if (H(c))
      !d && c.spaceBefore && p.push(""), gt(e, p, c.commentBefore, d), c.comment && (h = c.comment);
    else if (W(c)) {
      const b = H(c.key) ? c.key : null;
      b && (!d && b.spaceBefore && p.push(""), gt(e, p, b.commentBefore, d));
    }
    d = !1;
    let m = Re(c, g, () => h = null, () => d = !0);
    h && (m += be(m, r, l(h))), d && h && (d = !1), p.push(s + m);
  }
  let A;
  if (p.length === 0)
    A = n.start + n.end;
  else {
    A = p[0];
    for (let y = 1; y < p.length; ++y) {
      const c = p[y];
      A += c ? `
${a}${c}` : `
`;
    }
  }
  return i ? (A += `
` + de(l(i), a), o && o()) : d && u && u(), A;
}
function nn({ items: i }, t, { flowChars: e, itemIndent: s }) {
  const { indent: n, indentStep: r, flowCollectionPadding: u, options: { commentString: o } } = t;
  s += r;
  const a = Object.assign({}, t, {
    indent: s,
    inFlow: !0,
    type: null
  });
  let l = !1, g = 0;
  const d = [];
  for (let y = 0; y < i.length; ++y) {
    const c = i[y];
    let h = null;
    if (H(c))
      c.spaceBefore && d.push(""), gt(t, d, c.commentBefore, !1), c.comment && (h = c.comment);
    else if (W(c)) {
      const b = H(c.key) ? c.key : null;
      b && (b.spaceBefore && d.push(""), gt(t, d, b.commentBefore, !1), b.comment && (l = !0));
      const w = H(c.value) ? c.value : null;
      w ? (w.comment && (h = w.comment), w.commentBefore && (l = !0)) : c.value == null && (b != null && b.comment) && (h = b.comment);
    }
    h && (l = !0);
    let m = Re(c, a, () => h = null);
    y < i.length - 1 && (m += ","), h && (m += be(m, s, o(h))), !l && (d.length > g || m.includes(`
`)) && (l = !0), d.push(m), g = d.length;
  }
  const { start: p, end: A } = e;
  if (d.length === 0)
    return p + A;
  if (!l) {
    const y = d.reduce((c, h) => c + h.length + 2, 2);
    l = t.options.lineWidth > 0 && y > t.options.lineWidth;
  }
  if (l) {
    let y = p;
    for (const c of d)
      y += c ? `
${r}${n}${c}` : `
`;
    return `${y}
${n}${A}`;
  } else
    return `${p}${u}${d.join(" ")}${u}${A}`;
}
function gt({ indent: i, options: { commentString: t } }, e, s, n) {
  if (s && n && (s = s.replace(/^\n+/, "")), s) {
    const r = de(t(s), i);
    e.push(r.trimStart());
  }
}
function we(i, t) {
  const e = v(t) ? t.value : t;
  for (const s of i)
    if (W(s) && (s.key === t || s.key === e || v(s.key) && s.key.value === e))
      return s;
}
class se extends zt {
  static get tagName() {
    return "tag:yaml.org,2002:map";
  }
  constructor(t) {
    super(fe, t), this.items = [];
  }
  /**
   * A generic collection parsing method that can be extended
   * to other node classes that inherit from YAMLMap
   */
  static from(t, e, s) {
    const { keepUndefined: n, replacer: r } = s, u = new this(t), o = (a, l) => {
      if (typeof r == "function")
        l = r.call(e, a, l);
      else if (Array.isArray(r) && !r.includes(a))
        return;
      (l !== void 0 || n) && u.items.push(qt(a, l, s));
    };
    if (e instanceof Map)
      for (const [a, l] of e)
        o(a, l);
    else if (e && typeof e == "object")
      for (const a of Object.keys(e))
        o(a, e[a]);
    return typeof t.sortMapEntries == "function" && u.items.sort(t.sortMapEntries), u;
  }
  /**
   * Adds a value to the collection.
   *
   * @param overwrite - If not set `true`, using a key that is already in the
   *   collection will throw. Otherwise, overwrites the previous value.
   */
  add(t, e) {
    var u;
    let s;
    W(t) ? s = t : !t || typeof t != "object" || !("key" in t) ? s = new x(t, t == null ? void 0 : t.value) : s = new x(t.key, t.value);
    const n = we(this.items, s.key), r = (u = this.schema) == null ? void 0 : u.sortMapEntries;
    if (n) {
      if (!e)
        throw new Error(`Key ${s.key} already set`);
      v(n.value) && $s(s.value) ? n.value.value = s.value : n.value = s.value;
    } else if (r) {
      const o = this.items.findIndex((a) => r(s, a) < 0);
      o === -1 ? this.items.push(s) : this.items.splice(o, 0, s);
    } else
      this.items.push(s);
  }
  delete(t) {
    const e = we(this.items, t);
    return e ? this.items.splice(this.items.indexOf(e), 1).length > 0 : !1;
  }
  get(t, e) {
    const s = we(this.items, t), n = s == null ? void 0 : s.value;
    return (!e && v(n) ? n.value : n) ?? void 0;
  }
  has(t) {
    return !!we(this.items, t);
  }
  set(t, e) {
    this.add(new x(t, e), !0);
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
      Js(e, n, r);
    return n;
  }
  toString(t, e, s) {
    if (!t)
      return JSON.stringify(this);
    for (const n of this.items)
      if (!W(n))
        throw new Error(`Map items must all be pairs; found ${JSON.stringify(n)} instead`);
    return !t.allNullValues && this.hasAllNullValues(!1) && (t = Object.assign({}, t, { allNullValues: !0 })), Us(this, t, {
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
  nodeClass: se,
  tag: "tag:yaml.org,2002:map",
  resolve(i, t) {
    return qe(i) || t("Expected a mapping for this tag"), i;
  },
  createNode: (i, t, e) => se.from(i, t, e)
};
class Ee extends zt {
  static get tagName() {
    return "tag:yaml.org,2002:seq";
  }
  constructor(t) {
    super(We, t), this.items = [];
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
    return !e && v(n) ? n.value : n;
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
    v(n) && $s(e) ? n.value = e : this.items[s] = e;
  }
  toJSON(t, e) {
    const s = [];
    e != null && e.onCreate && e.onCreate(s);
    let n = 0;
    for (const r of this.items)
      s.push(ie(r, String(n++), e));
    return s;
  }
  toString(t, e, s) {
    return t ? Us(this, t, {
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
      let u = 0;
      for (let o of e) {
        if (typeof n == "function") {
          const a = e instanceof Set ? o : String(u++);
          o = n.call(e, a, o);
        }
        r.items.push(ze(o, void 0, s));
      }
    }
    return r;
  }
}
function nt(i) {
  let t = v(i) ? i.value : i;
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
}, bt = {
  identify: (i) => typeof i == "string",
  default: !0,
  tag: "tag:yaml.org,2002:str",
  resolve: (i) => i,
  stringify(i, t, e, s) {
    return t = Object.assign({ actualString: !0 }, t), Qt(i, t, e, s);
  }
}, wt = {
  identify: (i) => i == null,
  createNode: () => new E(null),
  default: !0,
  tag: "tag:yaml.org,2002:null",
  test: /^(?:~|[Nn]ull|NULL)?$/,
  resolve: () => new E(null),
  stringify: ({ source: i }, t) => typeof i == "string" && wt.test.test(i) ? i : t.options.nullStr
}, es = {
  identify: (i) => typeof i == "boolean",
  default: !0,
  tag: "tag:yaml.org,2002:bool",
  test: /^(?:[Tt]rue|TRUE|[Ff]alse|FALSE)$/,
  resolve: (i) => new E(i[0] === "t" || i[0] === "T"),
  stringify({ source: i, value: t }, e) {
    if (i && es.test.test(i)) {
      const s = i[0] === "t" || i[0] === "T";
      if (t === s)
        return i;
    }
    return t ? e.options.trueStr : e.options.falseStr;
  }
};
function ae({ format: i, minFractionDigits: t, tag: e, value: s }) {
  if (typeof s == "bigint")
    return String(s);
  const n = typeof s == "number" ? s : Number(s);
  if (!isFinite(n))
    return isNaN(n) ? ".nan" : n < 0 ? "-.inf" : ".inf";
  let r = JSON.stringify(s);
  if (!i && t && (!e || e === "tag:yaml.org,2002:float") && /^\d/.test(r)) {
    let u = r.indexOf(".");
    u < 0 && (u = r.length, r += ".");
    let o = t - (r.length - u - 1);
    for (; o-- > 0; )
      r += "0";
  }
  return r;
}
const xs = {
  identify: (i) => typeof i == "number",
  default: !0,
  tag: "tag:yaml.org,2002:float",
  test: /^(?:[-+]?\.(?:inf|Inf|INF|nan|NaN|NAN))$/,
  resolve: (i) => i.slice(-3).toLowerCase() === "nan" ? NaN : i[0] === "-" ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY,
  stringify: ae
}, js = {
  identify: (i) => typeof i == "number",
  default: !0,
  tag: "tag:yaml.org,2002:float",
  format: "EXP",
  test: /^[-+]?(?:\.[0-9]+|[0-9]+(?:\.[0-9]*)?)[eE][-+]?[0-9]+$/,
  resolve: (i) => parseFloat(i),
  stringify(i) {
    const t = Number(i.value);
    return isFinite(t) ? t.toExponential() : ae(i);
  }
}, zs = {
  identify: (i) => typeof i == "number",
  default: !0,
  tag: "tag:yaml.org,2002:float",
  test: /^[-+]?(?:\.[0-9]+|[0-9]+\.[0-9]*)$/,
  resolve(i) {
    const t = new E(parseFloat(i)), e = i.indexOf(".");
    return e !== -1 && i[i.length - 1] === "0" && (t.minFractionDigits = i.length - e - 1), t;
  },
  stringify: ae
}, Bt = (i) => typeof i == "bigint" || Number.isInteger(i), ts = (i, t, e, { intAsBigInt: s }) => s ? BigInt(i) : parseInt(i.substring(t), e);
function Qs(i, t, e) {
  const { value: s } = i;
  return Bt(s) && s >= 0 ? e + s.toString(t) : ae(i);
}
const qs = {
  identify: (i) => Bt(i) && i >= 0,
  default: !0,
  tag: "tag:yaml.org,2002:int",
  format: "OCT",
  test: /^0o[0-7]+$/,
  resolve: (i, t, e) => ts(i, 2, 8, e),
  stringify: (i) => Qs(i, 8, "0o")
}, ei = {
  identify: Bt,
  default: !0,
  tag: "tag:yaml.org,2002:int",
  test: /^[-+]?[0-9]+$/,
  resolve: (i, t, e) => ts(i, 0, 10, e),
  stringify: ae
}, ti = {
  identify: (i) => Bt(i) && i >= 0,
  default: !0,
  tag: "tag:yaml.org,2002:int",
  format: "HEX",
  test: /^0x[0-9a-fA-F]+$/,
  resolve: (i, t, e) => ts(i, 2, 16, e),
  stringify: (i) => Qs(i, 16, "0x")
}, rn = [
  Te,
  Ve,
  bt,
  wt,
  es,
  qs,
  ei,
  ti,
  xs,
  js,
  zs
];
function fs(i) {
  return typeof i == "bigint" || Number.isInteger(i);
}
const rt = ({ value: i }) => JSON.stringify(i), un = [
  {
    identify: (i) => typeof i == "string",
    default: !0,
    tag: "tag:yaml.org,2002:str",
    resolve: (i) => i,
    stringify: rt
  },
  {
    identify: (i) => i == null,
    createNode: () => new E(null),
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
], on = {
  default: !0,
  tag: "",
  test: /^/,
  resolve(i, t) {
    return t(`Unresolved plain scalar ${JSON.stringify(i)}`), i;
  }
}, an = [Te, Ve].concat(un, on), ss = {
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
    const u = e;
    let o;
    if (typeof Buffer == "function")
      o = u instanceof Buffer ? u.toString("base64") : Buffer.from(u.buffer).toString("base64");
    else if (typeof btoa == "function") {
      let a = "";
      for (let l = 0; l < u.length; ++l)
        a += String.fromCharCode(u[l]);
      o = btoa(a);
    } else
      throw new Error("This environment does not support writing binary tags; either Buffer or btoa is required");
    if (t || (t = E.BLOCK_LITERAL), t !== E.QUOTE_DOUBLE) {
      const a = Math.max(s.options.lineWidth - s.indent.length, s.options.minContentWidth), l = Math.ceil(o.length / a), g = new Array(l);
      for (let d = 0, p = 0; d < l; ++d, p += a)
        g[d] = o.substr(p, a);
      o = g.join(t === E.BLOCK_LITERAL ? `
` : " ");
    }
    return Qt({ comment: i, type: t, value: o }, s, n, r);
  }
};
function si(i, t) {
  if (et(i))
    for (let e = 0; e < i.items.length; ++e) {
      let s = i.items[e];
      if (!W(s)) {
        if (qe(s)) {
          s.items.length > 1 && t("Each pair must have its own sequence indicator");
          const n = s.items[0] || new x(new E(null));
          if (s.commentBefore && (n.key.commentBefore = n.key.commentBefore ? `${s.commentBefore}
${n.key.commentBefore}` : s.commentBefore), s.comment) {
            const r = n.value ?? n.key;
            r.comment = r.comment ? `${s.comment}
${r.comment}` : s.comment;
          }
          s = n;
        }
        i.items[e] = W(s) ? s : new x(s);
      }
    }
  else
    t("Expected a sequence for this tag");
  return i;
}
function ii(i, t, e) {
  const { replacer: s } = e, n = new Ee(i);
  n.tag = "tag:yaml.org,2002:pairs";
  let r = 0;
  if (t && Symbol.iterator in Object(t))
    for (let u of t) {
      typeof s == "function" && (u = s.call(t, String(r++), u));
      let o, a;
      if (Array.isArray(u))
        if (u.length === 2)
          o = u[0], a = u[1];
        else
          throw new TypeError(`Expected [key, value] tuple: ${u}`);
      else if (u && u instanceof Object) {
        const l = Object.keys(u);
        if (l.length === 1)
          o = l[0], a = u[o];
        else
          throw new TypeError(`Expected tuple with one key, not ${l.length} keys`);
      } else
        o = u;
      n.items.push(qt(o, a, e));
    }
  return n;
}
const is = {
  collection: "seq",
  default: !1,
  tag: "tag:yaml.org,2002:pairs",
  resolve: si,
  createNode: ii
};
class Ye extends Ee {
  constructor() {
    super(), this.add = se.prototype.add.bind(this), this.delete = se.prototype.delete.bind(this), this.get = se.prototype.get.bind(this), this.has = se.prototype.has.bind(this), this.set = se.prototype.set.bind(this), this.tag = Ye.tag;
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
      let r, u;
      if (W(n) ? (r = ie(n.key, "", e), u = ie(n.value, r, e)) : r = ie(n, "", e), s.has(r))
        throw new Error("Ordered maps must not include duplicate keys");
      s.set(r, u);
    }
    return s;
  }
  static from(t, e, s) {
    const n = ii(t, e, s), r = new this();
    return r.items = n.items, r;
  }
}
Ye.tag = "tag:yaml.org,2002:omap";
const ns = {
  collection: "seq",
  identify: (i) => i instanceof Map,
  nodeClass: Ye,
  default: !1,
  tag: "tag:yaml.org,2002:omap",
  resolve(i, t) {
    const e = si(i, t), s = [];
    for (const { key: n } of e.items)
      v(n) && (s.includes(n.value) ? t(`Ordered maps must not include duplicate keys: ${n.value}`) : s.push(n.value));
    return Object.assign(new Ye(), e);
  },
  createNode: (i, t, e) => Ye.from(i, t, e)
};
function ni({ value: i, source: t }, e) {
  return t && (i ? ri : ui).test.test(t) ? t : i ? e.options.trueStr : e.options.falseStr;
}
const ri = {
  identify: (i) => i === !0,
  default: !0,
  tag: "tag:yaml.org,2002:bool",
  test: /^(?:Y|y|[Yy]es|YES|[Tt]rue|TRUE|[Oo]n|ON)$/,
  resolve: () => new E(!0),
  stringify: ni
}, ui = {
  identify: (i) => i === !1,
  default: !0,
  tag: "tag:yaml.org,2002:bool",
  test: /^(?:N|n|[Nn]o|NO|[Ff]alse|FALSE|[Oo]ff|OFF)$/,
  resolve: () => new E(!1),
  stringify: ni
}, ln = {
  identify: (i) => typeof i == "number",
  default: !0,
  tag: "tag:yaml.org,2002:float",
  test: /^[-+]?\.(?:inf|Inf|INF|nan|NaN|NAN)$/,
  resolve: (i) => i.slice(-3).toLowerCase() === "nan" ? NaN : i[0] === "-" ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY,
  stringify: ae
}, cn = {
  identify: (i) => typeof i == "number",
  default: !0,
  tag: "tag:yaml.org,2002:float",
  format: "EXP",
  test: /^[-+]?(?:[0-9][0-9_]*)?(?:\.[0-9_]*)?[eE][-+]?[0-9]+$/,
  resolve: (i) => parseFloat(i.replace(/_/g, "")),
  stringify(i) {
    const t = Number(i.value);
    return isFinite(t) ? t.toExponential() : ae(i);
  }
}, hn = {
  identify: (i) => typeof i == "number",
  default: !0,
  tag: "tag:yaml.org,2002:float",
  test: /^[-+]?(?:[0-9][0-9_]*)?\.[0-9_]*$/,
  resolve(i) {
    const t = new E(parseFloat(i.replace(/_/g, ""))), e = i.indexOf(".");
    if (e !== -1) {
      const s = i.substring(e + 1).replace(/_/g, "");
      s[s.length - 1] === "0" && (t.minFractionDigits = s.length);
    }
    return t;
  },
  stringify: ae
}, tt = (i) => typeof i == "bigint" || Number.isInteger(i);
function St(i, t, e, { intAsBigInt: s }) {
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
    const u = BigInt(i);
    return n === "-" ? BigInt(-1) * u : u;
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
  return ae(i);
}
const dn = {
  identify: tt,
  default: !0,
  tag: "tag:yaml.org,2002:int",
  format: "BIN",
  test: /^[-+]?0b[0-1_]+$/,
  resolve: (i, t, e) => St(i, 2, 2, e),
  stringify: (i) => rs(i, 2, "0b")
}, pn = {
  identify: tt,
  default: !0,
  tag: "tag:yaml.org,2002:int",
  format: "OCT",
  test: /^[-+]?0[0-7_]+$/,
  resolve: (i, t, e) => St(i, 1, 8, e),
  stringify: (i) => rs(i, 8, "0")
}, gn = {
  identify: tt,
  default: !0,
  tag: "tag:yaml.org,2002:int",
  test: /^[-+]?[0-9][0-9_]*$/,
  resolve: (i, t, e) => St(i, 0, 10, e),
  stringify: ae
}, fn = {
  identify: tt,
  default: !0,
  tag: "tag:yaml.org,2002:int",
  format: "HEX",
  test: /^[-+]?0x[0-9a-fA-F_]+$/,
  resolve: (i, t, e) => St(i, 2, 16, e),
  stringify: (i) => rs(i, 16, "0x")
};
class Ke extends se {
  constructor(t) {
    super(t), this.tag = Ke.tag;
  }
  add(t) {
    let e;
    W(t) ? e = t : t && typeof t == "object" && "key" in t && "value" in t && t.value === null ? e = new x(t.key, null) : e = new x(t, null), we(this.items, e.key) || this.items.push(e);
  }
  /**
   * If `keepPair` is `true`, returns the Pair matching `key`.
   * Otherwise, returns the value of that Pair's key.
   */
  get(t, e) {
    const s = we(this.items, t);
    return !e && W(s) ? v(s.key) ? s.key.value : s.key : s;
  }
  set(t, e) {
    if (typeof e != "boolean")
      throw new Error(`Expected boolean value for set(key, value) in a YAML set, not ${typeof e}`);
    const s = we(this.items, t);
    s && !e ? this.items.splice(this.items.indexOf(s), 1) : !s && e && this.items.push(new x(t));
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
      for (let u of e)
        typeof n == "function" && (u = n.call(e, u, u)), r.items.push(qt(u, null, s));
    return r;
  }
}
Ke.tag = "tag:yaml.org,2002:set";
const us = {
  collection: "map",
  identify: (i) => i instanceof Set,
  nodeClass: Ke,
  default: !1,
  tag: "tag:yaml.org,2002:set",
  createNode: (i, t, e) => Ke.from(i, t, e),
  resolve(i, t) {
    if (qe(i)) {
      if (i.hasAllNullValues(!0))
        return Object.assign(new Ke(), i);
      t("Set items must all have null values");
    } else
      t("Expected a mapping for this tag");
    return i;
  }
};
function os(i, t) {
  const e = i[0], s = e === "-" || e === "+" ? i.substring(1) : i, n = (u) => t ? BigInt(u) : Number(u), r = s.replace(/_/g, "").split(":").reduce((u, o) => u * n(60) + n(o), n(0));
  return e === "-" ? n(-1) * r : r;
}
function oi(i) {
  let { value: t } = i, e = (u) => u;
  if (typeof t == "bigint")
    e = (u) => BigInt(u);
  else if (isNaN(t) || !isFinite(t))
    return ae(i);
  let s = "";
  t < 0 && (s = "-", t *= e(-1));
  const n = e(60), r = [t % n];
  return t < 60 ? r.unshift(0) : (t = (t - r[0]) / n, r.unshift(t % n), t >= 60 && (t = (t - r[0]) / n, r.unshift(t))), s + r.map((u) => String(u).padStart(2, "0")).join(":").replace(/000000\d*$/, "");
}
const ai = {
  identify: (i) => typeof i == "bigint" || Number.isInteger(i),
  default: !0,
  tag: "tag:yaml.org,2002:int",
  format: "TIME",
  test: /^[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+$/,
  resolve: (i, t, { intAsBigInt: e }) => os(i, e),
  stringify: oi
}, li = {
  identify: (i) => typeof i == "number",
  default: !0,
  tag: "tag:yaml.org,2002:float",
  format: "TIME",
  test: /^[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+\.[0-9_]*$/,
  resolve: (i) => os(i, !1),
  stringify: oi
}, Et = {
  identify: (i) => i instanceof Date,
  default: !0,
  tag: "tag:yaml.org,2002:timestamp",
  // If the time zone is omitted, the timestamp is assumed to be specified in UTC. The time part
  // may be omitted altogether, resulting in a date format. In such a case, the time part is
  // assumed to be 00:00:00Z (start of day, UTC).
  test: RegExp("^([0-9]{4})-([0-9]{1,2})-([0-9]{1,2})(?:(?:t|T|[ \\t]+)([0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2}(\\.[0-9]+)?)(?:[ \\t]*(Z|[-+][012]?[0-9](?::[0-9]{2})?))?)?$"),
  resolve(i) {
    const t = i.match(Et.test);
    if (!t)
      throw new Error("!!timestamp expects a date, starting with yyyy-mm-dd");
    const [, e, s, n, r, u, o] = t.map(Number), a = t[7] ? Number((t[7] + "00").substr(1, 3)) : 0;
    let l = Date.UTC(e, s - 1, n, r || 0, u || 0, o || 0, a);
    const g = t[8];
    if (g && g !== "Z") {
      let d = os(g, !1);
      Math.abs(d) < 30 && (d *= 60), l -= 6e4 * d;
    }
    return new Date(l);
  },
  stringify: ({ value: i }) => i.toISOString().replace(/((T00:00)?:00)?\.000Z$/, "")
}, Cs = [
  Te,
  Ve,
  bt,
  wt,
  ri,
  ui,
  dn,
  pn,
  gn,
  fn,
  ln,
  cn,
  hn,
  ss,
  ns,
  is,
  us,
  ai,
  li,
  Et
], As = /* @__PURE__ */ new Map([
  ["core", rn],
  ["failsafe", [Te, Ve, bt]],
  ["json", an],
  ["yaml11", Cs],
  ["yaml-1.1", Cs]
]), ms = {
  binary: ss,
  bool: es,
  float: zs,
  floatExp: js,
  floatNaN: xs,
  floatTime: li,
  int: ei,
  intHex: ti,
  intOct: qs,
  intTime: ai,
  map: Te,
  null: wt,
  omap: ns,
  pairs: is,
  seq: Ve,
  set: us,
  timestamp: Et
}, Cn = {
  "tag:yaml.org,2002:binary": ss,
  "tag:yaml.org,2002:omap": ns,
  "tag:yaml.org,2002:pairs": is,
  "tag:yaml.org,2002:set": us,
  "tag:yaml.org,2002:timestamp": Et
};
function kt(i, t) {
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
  else
    typeof i == "function" && (e = i(e.slice()));
  return e.map((s) => {
    if (typeof s != "string")
      return s;
    const n = ms[s];
    if (n)
      return n;
    const r = Object.keys(ms).map((u) => JSON.stringify(u)).join(", ");
    throw new Error(`Unknown custom tag "${s}"; use one of ${r}`);
  });
}
const An = (i, t) => i.key < t.key ? -1 : i.key > t.key ? 1 : 0;
class as {
  constructor({ compat: t, customTags: e, merge: s, resolveKnownTags: n, schema: r, sortMapEntries: u, toStringDefaults: o }) {
    this.compat = Array.isArray(t) ? kt(t, "compat") : t ? kt(null, t) : null, this.merge = !!s, this.name = typeof r == "string" && r || "core", this.knownTags = n ? Cn : {}, this.tags = kt(e, this.name), this.toStringOptions = o ?? null, Object.defineProperty(this, fe, { value: Te }), Object.defineProperty(this, ge, { value: bt }), Object.defineProperty(this, We, { value: Ve }), this.sortMapEntries = typeof u == "function" ? u : u === !0 ? An : null;
  }
  clone() {
    const t = Object.create(as.prototype, Object.getOwnPropertyDescriptors(this));
    return t.tags = this.tags.slice(), t;
  }
}
function mn(i, t) {
  var a;
  const e = [];
  let s = t.directives === !0;
  if (t.directives !== !1 && i.directives) {
    const l = i.directives.toString(i);
    l ? (e.push(l), s = !0) : i.directives.docStart && (s = !0);
  }
  s && e.push("---");
  const n = Ps(i, t), { commentString: r } = n.options;
  if (i.commentBefore) {
    e.length !== 1 && e.unshift("");
    const l = r(i.commentBefore);
    e.unshift(de(l, ""));
  }
  let u = !1, o = null;
  if (i.contents) {
    if (H(i.contents)) {
      if (i.contents.spaceBefore && s && e.push(""), i.contents.commentBefore) {
        const d = r(i.contents.commentBefore);
        e.push(de(d, ""));
      }
      n.forceBlockIndent = !!i.comment, o = i.contents.comment;
    }
    const l = o ? void 0 : () => u = !0;
    let g = Re(i.contents, n, () => o = null, l);
    o && (g += be(g, "", r(o))), (g[0] === "|" || g[0] === ">") && e[e.length - 1] === "---" ? e[e.length - 1] = `--- ${g}` : e.push(g);
  } else
    e.push(Re(i.contents, n));
  if ((a = i.directives) != null && a.docEnd)
    if (i.comment) {
      const l = r(i.comment);
      l.includes(`
`) ? (e.push("..."), e.push(de(l, ""))) : e.push(`... ${l}`);
    } else
      e.push("...");
  else {
    let l = i.comment;
    l && u && (l = l.replace(/^\n+/, "")), l && ((!u || o) && e[e.length - 1] !== "" && e.push(""), e.push(de(r(l), "")));
  }
  return e.join(`
`) + `
`;
}
class st {
  constructor(t, e, s) {
    this.commentBefore = null, this.comment = null, this.errors = [], this.warnings = [], Object.defineProperty(this, ne, { value: Rt });
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
    let { version: u } = r;
    s != null && s._directives ? (this.directives = s._directives.atDocument(), this.directives.yaml.explicit && (u = this.directives.yaml.version)) : this.directives = new J({ version: u }), this.setSchema(u, s), this.contents = t === void 0 ? null : this.createNode(t, n, s);
  }
  /**
   * Create a deep copy of this Document and its contents.
   *
   * Custom Node values that inherit from `Object` still refer to their original instances.
   */
  clone() {
    const t = Object.create(st.prototype, {
      [ne]: { value: Rt }
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
      const s = Ts(this);
      t.anchor = // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
      !e || s.has(e) ? Vs(e || "a", s) : e;
    }
    return new jt(t.anchor);
  }
  createNode(t, e, s) {
    let n;
    if (typeof e == "function")
      t = e.call({ "": t }, "", t), n = e;
    else if (Array.isArray(e)) {
      const h = (b) => typeof b == "number" || b instanceof String || b instanceof Number, m = e.filter(h).map(String);
      m.length > 0 && (e = e.concat(m)), n = e;
    } else
      s === void 0 && e && (s = e, e = void 0);
    const { aliasDuplicateObjects: r, anchorPrefix: u, flow: o, keepUndefined: a, onTagObj: l, tag: g } = s ?? {}, { onAnchor: d, setAnchors: p, sourceObjects: A } = Pi(
      this,
      // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
      u || "a"
    ), y = {
      aliasDuplicateObjects: r ?? !0,
      keepUndefined: a ?? !1,
      onAnchor: d,
      onTagObj: l,
      replacer: n,
      schema: this.schema,
      sourceObjects: A
    }, c = ze(t, g, y);
    return o && O(c) && (c.flow = !0), p(), c;
  }
  /**
   * Convert a key and a value into a `Pair` using the current schema,
   * recursively wrapping all values as `Scalar` or `Collection` nodes.
   */
  createPair(t, e, s = {}) {
    const n = this.createNode(t, null, s), r = this.createNode(e, null, s);
    return new x(n, r);
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
    return Me(t) ? this.contents == null ? !1 : (this.contents = null, !0) : ke(this.contents) ? this.contents.deleteIn(t) : !1;
  }
  /**
   * Returns item at `key`, or `undefined` if not found. By default unwraps
   * scalar values from their surrounding node; to disable set `keepScalar` to
   * `true` (collections are always returned intact).
   */
  get(t, e) {
    return O(this.contents) ? this.contents.get(t, e) : void 0;
  }
  /**
   * Returns item at `path`, or `undefined` if not found. By default unwraps
   * scalar values from their surrounding node; to disable set `keepScalar` to
   * `true` (collections are always returned intact).
   */
  getIn(t, e) {
    return Me(t) ? !e && v(this.contents) ? this.contents.value : this.contents : O(this.contents) ? this.contents.getIn(t, e) : void 0;
  }
  /**
   * Checks if the document includes a value with the key `key`.
   */
  has(t) {
    return O(this.contents) ? this.contents.has(t) : !1;
  }
  /**
   * Checks if the document includes a value at `path`.
   */
  hasIn(t) {
    return Me(t) ? this.contents !== void 0 : O(this.contents) ? this.contents.hasIn(t) : !1;
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
    Me(t) ? this.contents = e : this.contents == null ? this.contents = pt(this.schema, Array.from(t), e) : ke(this.contents) && this.contents.setIn(t, e);
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
        this.directives ? this.directives.yaml.version = "1.1" : this.directives = new J({ version: "1.1" }), s = { merge: !0, resolveKnownTags: !1, schema: "yaml-1.1" };
        break;
      case "1.2":
      case "next":
        this.directives ? this.directives.yaml.version = t : this.directives = new J({ version: t }), s = { merge: !1, resolveKnownTags: !0, schema: "core" };
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
  toJS({ json: t, jsonArg: e, mapAsMap: s, maxAliasCount: n, onAnchor: r, reviver: u } = {}) {
    const o = {
      anchors: /* @__PURE__ */ new Map(),
      doc: this,
      keep: !t,
      mapAsMap: s === !0,
      mapKeyWarned: !1,
      maxAliasCount: typeof n == "number" ? n : 100
    }, a = ie(this.contents, e ?? "", o);
    if (typeof r == "function")
      for (const { count: l, res: g } of o.anchors.values())
        r(g, l);
    return typeof u == "function" ? Le(u, { "": a }, "", a) : a;
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
    return mn(this, t);
  }
}
function ke(i) {
  if (O(i))
    return !0;
  throw new Error("Expected a YAML collection as document contents");
}
class ci extends Error {
  constructor(t, e, s, n) {
    super(), this.name = t, this.code = s, this.message = n, this.pos = e;
  }
}
class Pe extends ci {
  constructor(t, e, s) {
    super("YAMLParseError", t, e, s);
  }
}
class In extends ci {
  constructor(t, e, s) {
    super("YAMLWarning", t, e, s);
  }
}
const Is = (i, t) => (e) => {
  if (e.pos[0] === -1)
    return;
  e.linePos = e.pos.map((o) => t.linePos(o));
  const { line: s, col: n } = e.linePos[0];
  e.message += ` at line ${s}, column ${n}`;
  let r = n - 1, u = i.substring(t.lineStarts[s - 1], t.lineStarts[s]).replace(/[\n\r]+$/, "");
  if (r >= 60 && u.length > 80) {
    const o = Math.min(r - 39, u.length - 79);
    u = "…" + u.substring(o), r -= o - 1;
  }
  if (u.length > 80 && (u = u.substring(0, 79) + "…"), s > 1 && /^ *$/.test(u.substring(0, r))) {
    let o = i.substring(t.lineStarts[s - 2], t.lineStarts[s - 1]);
    o.length > 80 && (o = o.substring(0, 79) + `…
`), u = o + u;
  }
  if (/[^ ]/.test(u)) {
    let o = 1;
    const a = e.linePos[1];
    a && a.line === s && a.col > n && (o = Math.max(1, Math.min(a.col - n, 80 - r)));
    const l = " ".repeat(r) + "^".repeat(o);
    e.message += `:

${u}
${l}
`;
  }
};
function Oe(i, { flow: t, indicator: e, next: s, offset: n, onError: r, startOnNewline: u }) {
  let o = !1, a = u, l = u, g = "", d = "", p = !1, A = !1, y = !1, c = null, h = null, m = null, b = null, w = null;
  for (const I of i)
    switch (y && (I.type !== "space" && I.type !== "newline" && I.type !== "comma" && r(I.offset, "MISSING_CHAR", "Tags and anchors must be separated from the next token by white space"), y = !1), I.type) {
      case "space":
        !t && a && e !== "doc-start" && I.source[0] === "	" && r(I, "TAB_AS_INDENT", "Tabs are not allowed as indentation"), l = !0;
        break;
      case "comment": {
        l || r(I, "MISSING_CHAR", "Comments must be separated from other tokens by white space characters");
        const N = I.source.substring(1) || " ";
        g ? g += d + N : g = N, d = "", a = !1;
        break;
      }
      case "newline":
        a ? g ? g += I.source : o = !0 : d += I.source, a = !0, p = !0, (c || h) && (A = !0), l = !0;
        break;
      case "anchor":
        c && r(I, "MULTIPLE_ANCHORS", "A node can have at most one anchor"), I.source.endsWith(":") && r(I.offset + I.source.length - 1, "BAD_ALIAS", "Anchor ending in : is ambiguous", !0), c = I, w === null && (w = I.offset), a = !1, l = !1, y = !0;
        break;
      case "tag": {
        h && r(I, "MULTIPLE_TAGS", "A node can have at most one tag"), h = I, w === null && (w = I.offset), a = !1, l = !1, y = !0;
        break;
      }
      case e:
        (c || h) && r(I, "BAD_PROP_ORDER", `Anchors and tags must be after the ${I.source} indicator`), b && r(I, "UNEXPECTED_TOKEN", `Unexpected ${I.source} in ${t ?? "collection"}`), b = I, a = !1, l = !1;
        break;
      case "comma":
        if (t) {
          m && r(I, "UNEXPECTED_TOKEN", `Unexpected , in ${t}`), m = I, a = !1, l = !1;
          break;
        }
      default:
        r(I, "UNEXPECTED_TOKEN", `Unexpected ${I.type} token`), a = !1, l = !1;
    }
  const D = i[i.length - 1], B = D ? D.offset + D.source.length : n;
  return y && s && s.type !== "space" && s.type !== "newline" && s.type !== "comma" && (s.type !== "scalar" || s.source !== "") && r(s.offset, "MISSING_CHAR", "Tags and anchors must be separated from the next token by white space"), {
    comma: m,
    found: b,
    spaceBefore: o,
    comment: g,
    hasNewline: p,
    hasNewlineAfterProp: A,
    anchor: c,
    tag: h,
    end: B,
    start: w ?? B
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
function hi(i, t, e) {
  const { uniqueKeys: s } = i.options;
  if (s === !1)
    return !1;
  const n = typeof s == "function" ? s : (r, u) => r === u || v(r) && v(u) && r.value === u.value && !(r.value === "<<" && i.schema.merge);
  return t.some((r) => n(r.key, e));
}
const Ds = "All mapping items must start at the same column";
function Dn({ composeNode: i, composeEmptyNode: t }, e, s, n, r) {
  var g;
  const u = (r == null ? void 0 : r.nodeClass) ?? se, o = new u(e.schema);
  e.atRoot && (e.atRoot = !1);
  let a = s.offset, l = null;
  for (const d of s.items) {
    const { start: p, key: A, sep: y, value: c } = d, h = Oe(p, {
      indicator: "explicit-key-ind",
      next: A ?? (y == null ? void 0 : y[0]),
      offset: a,
      onError: n,
      startOnNewline: !0
    }), m = !h.found;
    if (m) {
      if (A && (A.type === "block-seq" ? n(a, "BLOCK_AS_IMPLICIT_KEY", "A block sequence may not be used as an implicit map key") : "indent" in A && A.indent !== s.indent && n(a, "BAD_INDENT", Ds)), !h.anchor && !h.tag && !y) {
        l = h.end, h.comment && (o.comment ? o.comment += `
` + h.comment : o.comment = h.comment);
        continue;
      }
      (h.hasNewlineAfterProp || Qe(A)) && n(A ?? p[p.length - 1], "MULTILINE_IMPLICIT_KEY", "Implicit keys need to be on a single line");
    } else
      ((g = h.found) == null ? void 0 : g.indent) !== s.indent && n(a, "BAD_INDENT", Ds);
    const b = h.end, w = A ? i(e, A, h, n) : t(e, b, p, null, h, n);
    e.schema.compat && Tt(s.indent, A, n), hi(e, o.items, w) && n(b, "DUPLICATE_KEY", "Map keys must be unique");
    const D = Oe(y ?? [], {
      indicator: "map-value-ind",
      next: c,
      offset: w.range[2],
      onError: n,
      startOnNewline: !A || A.type === "block-scalar"
    });
    if (a = D.end, D.found) {
      m && ((c == null ? void 0 : c.type) === "block-map" && !D.hasNewline && n(a, "BLOCK_AS_IMPLICIT_KEY", "Nested mappings are not allowed in compact mappings"), e.options.strict && h.start < D.found.offset - 1024 && n(w.range, "KEY_OVER_1024_CHARS", "The : indicator must be at most 1024 chars after the start of an implicit block mapping key"));
      const B = c ? i(e, c, D, n) : t(e, a, y, null, D, n);
      e.schema.compat && Tt(s.indent, c, n), a = B.range[2];
      const I = new x(w, B);
      e.options.keepSourceTokens && (I.srcToken = d), o.items.push(I);
    } else {
      m && n(w.range, "MISSING_CHAR", "Implicit map keys need to be followed by map values"), D.comment && (w.comment ? w.comment += `
` + D.comment : w.comment = D.comment);
      const B = new x(w);
      e.options.keepSourceTokens && (B.srcToken = d), o.items.push(B);
    }
  }
  return l && l < a && n(l, "IMPOSSIBLE", "Map comment with trailing content"), o.range = [s.offset, a, l ?? a], o;
}
function yn({ composeNode: i, composeEmptyNode: t }, e, s, n, r) {
  const u = (r == null ? void 0 : r.nodeClass) ?? Ee, o = new u(e.schema);
  e.atRoot && (e.atRoot = !1);
  let a = s.offset, l = null;
  for (const { start: g, value: d } of s.items) {
    const p = Oe(g, {
      indicator: "seq-item-ind",
      next: d,
      offset: a,
      onError: n,
      startOnNewline: !0
    });
    if (!p.found)
      if (p.anchor || p.tag || d)
        d && d.type === "block-seq" ? n(p.end, "BAD_INDENT", "All sequence items must start at the same column") : n(a, "MISSING_CHAR", "Sequence item without - indicator");
      else {
        l = p.end, p.comment && (o.comment = p.comment);
        continue;
      }
    const A = d ? i(e, d, p, n) : t(e, p.end, g, null, p, n);
    e.schema.compat && Tt(s.indent, d, n), a = A.range[2], o.items.push(A);
  }
  return o.range = [s.offset, a, l ?? a], o;
}
function it(i, t, e, s) {
  let n = "";
  if (i) {
    let r = !1, u = "";
    for (const o of i) {
      const { source: a, type: l } = o;
      switch (l) {
        case "space":
          r = !0;
          break;
        case "comment": {
          e && !r && s(o, "MISSING_CHAR", "Comments must be separated from other tokens by white space characters");
          const g = a.substring(1) || " ";
          n ? n += u + g : n = g, u = "";
          break;
        }
        case "newline":
          n && (u += a), r = !0;
          break;
        default:
          s(o, "UNEXPECTED_TOKEN", `Unexpected ${l} at node end`);
      }
      t += a.length;
    }
  }
  return { comment: n, offset: t };
}
const _t = "Block collections are not allowed within flow collections", Zt = (i) => i && (i.type === "block-map" || i.type === "block-seq");
function bn({ composeNode: i, composeEmptyNode: t }, e, s, n, r) {
  const u = s.start.source === "{", o = u ? "flow map" : "flow sequence", a = (r == null ? void 0 : r.nodeClass) ?? (u ? se : Ee), l = new a(e.schema);
  l.flow = !0;
  const g = e.atRoot;
  g && (e.atRoot = !1);
  let d = s.offset + s.start.source.length;
  for (let h = 0; h < s.items.length; ++h) {
    const m = s.items[h], { start: b, key: w, sep: D, value: B } = m, I = Oe(b, {
      flow: o,
      indicator: "explicit-key-ind",
      next: w ?? (D == null ? void 0 : D[0]),
      offset: d,
      onError: n,
      startOnNewline: !1
    });
    if (!I.found) {
      if (!I.anchor && !I.tag && !D && !B) {
        h === 0 && I.comma ? n(I.comma, "UNEXPECTED_TOKEN", `Unexpected , in ${o}`) : h < s.items.length - 1 && n(I.start, "UNEXPECTED_TOKEN", `Unexpected empty item in ${o}`), I.comment && (l.comment ? l.comment += `
` + I.comment : l.comment = I.comment), d = I.end;
        continue;
      }
      !u && e.options.strict && Qe(w) && n(
        w,
        // checked by containsNewline()
        "MULTILINE_IMPLICIT_KEY",
        "Implicit keys of flow sequence pairs need to be on a single line"
      );
    }
    if (h === 0)
      I.comma && n(I.comma, "UNEXPECTED_TOKEN", `Unexpected , in ${o}`);
    else if (I.comma || n(I.start, "MISSING_CHAR", `Missing , between ${o} items`), I.comment) {
      let N = "";
      e:
        for (const Y of b)
          switch (Y.type) {
            case "comma":
            case "space":
              break;
            case "comment":
              N = Y.source.substring(1);
              break e;
            default:
              break e;
          }
      if (N) {
        let Y = l.items[l.items.length - 1];
        W(Y) && (Y = Y.value ?? Y.key), Y.comment ? Y.comment += `
` + N : Y.comment = N, I.comment = I.comment.substring(N.length + 1);
      }
    }
    if (!u && !D && !I.found) {
      const N = B ? i(e, B, I, n) : t(e, I.end, D, null, I, n);
      l.items.push(N), d = N.range[2], Zt(B) && n(N.range, "BLOCK_IN_FLOW", _t);
    } else {
      const N = I.end, Y = w ? i(e, w, I, n) : t(e, N, b, null, I, n);
      Zt(w) && n(Y.range, "BLOCK_IN_FLOW", _t);
      const X = Oe(D ?? [], {
        flow: o,
        indicator: "map-value-ind",
        next: B,
        offset: Y.range[2],
        onError: n,
        startOnNewline: !1
      });
      if (X.found) {
        if (!u && !I.found && e.options.strict) {
          if (D)
            for (const T of D) {
              if (T === X.found)
                break;
              if (T.type === "newline") {
                n(T, "MULTILINE_IMPLICIT_KEY", "Implicit keys of flow sequence pairs need to be on a single line");
                break;
              }
            }
          I.start < X.found.offset - 1024 && n(X.found, "KEY_OVER_1024_CHARS", "The : indicator must be at most 1024 chars after the start of an implicit flow sequence key");
        }
      } else
        B && ("source" in B && B.source && B.source[0] === ":" ? n(B, "MISSING_CHAR", `Missing space after : in ${o}`) : n(X.start, "MISSING_CHAR", `Missing , or : between ${o} items`));
      const Ae = B ? i(e, B, X, n) : X.found ? t(e, X.end, D, null, X, n) : null;
      Ae ? Zt(B) && n(Ae.range, "BLOCK_IN_FLOW", _t) : X.comment && (Y.comment ? Y.comment += `
` + X.comment : Y.comment = X.comment);
      const Ge = new x(Y, Ae);
      if (e.options.keepSourceTokens && (Ge.srcToken = m), u) {
        const T = l;
        hi(e, T.items, Y) && n(N, "DUPLICATE_KEY", "Map keys must be unique"), T.items.push(Ge);
      } else {
        const T = new se(e.schema);
        T.flow = !0, T.items.push(Ge), l.items.push(T);
      }
      d = Ae ? Ae.range[2] : X.end;
    }
  }
  const p = u ? "}" : "]", [A, ...y] = s.end;
  let c = d;
  if (A && A.source === p)
    c = A.offset + A.source.length;
  else {
    const h = o[0].toUpperCase() + o.substring(1), m = g ? `${h} must end with a ${p}` : `${h} in block collection must be sufficiently indented and end with a ${p}`;
    n(d, g ? "MISSING_CHAR" : "BAD_INDENT", m), A && A.source.length !== 1 && y.unshift(A);
  }
  if (y.length > 0) {
    const h = it(y, c, e.options.strict, n);
    h.comment && (l.comment ? l.comment += `
` + h.comment : l.comment = h.comment), l.range = [s.offset, c, h.offset];
  } else
    l.range = [s.offset, c, c];
  return l;
}
function Lt(i, t, e, s, n, r) {
  const u = e.type === "block-map" ? Dn(i, t, e, s, r) : e.type === "block-seq" ? yn(i, t, e, s, r) : bn(i, t, e, s, r), o = u.constructor;
  return n === "!" || n === o.tagName ? (u.tag = o.tagName, u) : (n && (u.tag = n), u);
}
function wn(i, t, e, s, n) {
  var d;
  const r = s ? t.directives.tagName(s.source, (p) => n(s, "TAG_RESOLVE_FAILED", p)) : null, u = e.type === "block-map" ? "map" : e.type === "block-seq" ? "seq" : e.start.source === "{" ? "map" : "seq";
  if (!s || !r || r === "!" || r === se.tagName && u === "map" || r === Ee.tagName && u === "seq" || !u)
    return Lt(i, t, e, n, r);
  let o = t.schema.tags.find((p) => p.tag === r && p.collection === u);
  if (!o) {
    const p = t.schema.knownTags[r];
    if (p && p.collection === u)
      t.schema.tags.push(Object.assign({}, p, { default: !1 })), o = p;
    else
      return p != null && p.collection ? n(s, "BAD_COLLECTION_TYPE", `${p.tag} used for ${u} collection, but expects ${p.collection}`, !0) : n(s, "TAG_RESOLVE_FAILED", `Unresolved tag: ${r}`, !0), Lt(i, t, e, n, r);
  }
  const a = Lt(i, t, e, n, r, o), l = ((d = o.resolve) == null ? void 0 : d.call(o, a, (p) => n(s, "TAG_RESOLVE_FAILED", p), t.options)) ?? a, g = H(l) ? l : new E(l);
  return g.range = a.range, g.tag = r, o != null && o.format && (g.format = o.format), g;
}
function Bn(i, t, e) {
  const s = i.offset, n = Sn(i, t, e);
  if (!n)
    return { value: "", type: null, comment: "", range: [s, s, s] };
  const r = n.mode === ">" ? E.BLOCK_FOLDED : E.BLOCK_LITERAL, u = i.source ? En(i.source) : [];
  let o = u.length;
  for (let c = u.length - 1; c >= 0; --c) {
    const h = u[c][1];
    if (h === "" || h === "\r")
      o = c;
    else
      break;
  }
  if (o === 0) {
    const c = n.chomp === "+" && u.length > 0 ? `
`.repeat(Math.max(1, u.length - 1)) : "";
    let h = s + n.length;
    return i.source && (h += i.source.length), { value: c, type: r, comment: n.comment, range: [s, h, h] };
  }
  let a = i.indent + n.indent, l = i.offset + n.length, g = 0;
  for (let c = 0; c < o; ++c) {
    const [h, m] = u[c];
    if (m === "" || m === "\r")
      n.indent === 0 && h.length > a && (a = h.length);
    else {
      h.length < a && e(l + h.length, "MISSING_CHAR", "Block scalars with more-indented leading empty lines must use an explicit indentation indicator"), n.indent === 0 && (a = h.length), g = c;
      break;
    }
    l += h.length + m.length + 1;
  }
  for (let c = u.length - 1; c >= o; --c)
    u[c][0].length > a && (o = c + 1);
  let d = "", p = "", A = !1;
  for (let c = 0; c < g; ++c)
    d += u[c][0].slice(a) + `
`;
  for (let c = g; c < o; ++c) {
    let [h, m] = u[c];
    l += h.length + m.length + 1;
    const b = m[m.length - 1] === "\r";
    if (b && (m = m.slice(0, -1)), m && h.length < a) {
      const D = `Block scalar lines must not be less indented than their ${n.indent ? "explicit indentation indicator" : "first line"}`;
      e(l - m.length - (b ? 2 : 1), "BAD_INDENT", D), h = "";
    }
    r === E.BLOCK_LITERAL ? (d += p + h.slice(a) + m, p = `
`) : h.length > a || m[0] === "	" ? (p === " " ? p = `
` : !A && p === `
` && (p = `

`), d += p + h.slice(a) + m, p = `
`, A = !0) : m === "" ? p === `
` ? d += `
` : p = `
` : (d += p + m, p = " ", A = !1);
  }
  switch (n.chomp) {
    case "-":
      break;
    case "+":
      for (let c = o; c < u.length; ++c)
        d += `
` + u[c][0].slice(a);
      d[d.length - 1] !== `
` && (d += `
`);
      break;
    default:
      d += `
`;
  }
  const y = s + n.length + i.source.length;
  return { value: d, type: r, comment: n.comment, range: [s, y, y] };
}
function Sn({ offset: i, props: t }, e, s) {
  if (t[0].type !== "block-scalar-header")
    return s(t[0], "IMPOSSIBLE", "Block scalar header not found"), null;
  const { source: n } = t[0], r = n[0];
  let u = 0, o = "", a = -1;
  for (let p = 1; p < n.length; ++p) {
    const A = n[p];
    if (!o && (A === "-" || A === "+"))
      o = A;
    else {
      const y = Number(A);
      !u && y ? u = y : a === -1 && (a = i + p);
    }
  }
  a !== -1 && s(a, "UNEXPECTED_TOKEN", `Block scalar header includes extra characters: ${n}`);
  let l = !1, g = "", d = n.length;
  for (let p = 1; p < t.length; ++p) {
    const A = t[p];
    switch (A.type) {
      case "space":
        l = !0;
      case "newline":
        d += A.source.length;
        break;
      case "comment":
        e && !l && s(A, "MISSING_CHAR", "Comments must be separated from other tokens by white space characters"), d += A.source.length, g = A.source.substring(1);
        break;
      case "error":
        s(A, "UNEXPECTED_TOKEN", A.message), d += A.source.length;
        break;
      default: {
        const y = `Unexpected token in block scalar header: ${A.type}`;
        s(A, "UNEXPECTED_TOKEN", y);
        const c = A.source;
        c && typeof c == "string" && (d += c.length);
      }
    }
  }
  return { mode: r, indent: u, chomp: o, comment: g, length: d };
}
function En(i) {
  const t = i.split(/\n( *)/), e = t[0], s = e.match(/^( *)/), r = [s != null && s[1] ? [s[1], e.slice(s[1].length)] : ["", e]];
  for (let u = 1; u < t.length; u += 2)
    r.push([t[u], t[u + 1]]);
  return r;
}
function Fn(i, t, e) {
  const { offset: s, type: n, source: r, end: u } = i;
  let o, a;
  const l = (p, A, y) => e(s + p, A, y);
  switch (n) {
    case "scalar":
      o = E.PLAIN, a = Gn(r, l);
      break;
    case "single-quoted-scalar":
      o = E.QUOTE_SINGLE, a = kn(r, l);
      break;
    case "double-quoted-scalar":
      o = E.QUOTE_DOUBLE, a = _n(r, l);
      break;
    default:
      return e(i, "UNEXPECTED_TOKEN", `Expected a flow scalar value, but found: ${n}`), {
        value: "",
        type: null,
        comment: "",
        range: [s, s + r.length, s + r.length]
      };
  }
  const g = s + r.length, d = it(u, g, t, e);
  return {
    value: a,
    type: o,
    comment: d.comment,
    range: [s, g, d.offset]
  };
}
function Gn(i, t) {
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
  return e && t(0, "BAD_SCALAR_START", `Plain value cannot start with ${e}`), di(i);
}
function kn(i, t) {
  return (i[i.length - 1] !== "'" || i.length === 1) && t(i.length, "MISSING_CHAR", "Missing closing 'quote"), di(i.slice(1, -1)).replace(/''/g, "'");
}
function di(i) {
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
  let n = s[1], r = " ", u = t.lastIndex;
  for (e.lastIndex = u; s = e.exec(i); )
    s[1] === "" ? r === `
` ? n += r : r = `
` : (n += r + s[1], r = " "), u = e.lastIndex;
  const o = /[ \t]*(.*)/sy;
  return o.lastIndex = u, s = o.exec(i), n + r + ((s == null ? void 0 : s[1]) ?? "");
}
function _n(i, t) {
  let e = "";
  for (let s = 1; s < i.length - 1; ++s) {
    const n = i[s];
    if (!(n === "\r" && i[s + 1] === `
`))
      if (n === `
`) {
        const { fold: r, offset: u } = Zn(i, s);
        e += r, s = u;
      } else if (n === "\\") {
        let r = i[++s];
        const u = Ln[r];
        if (u)
          e += u;
        else if (r === `
`)
          for (r = i[s + 1]; r === " " || r === "	"; )
            r = i[++s + 1];
        else if (r === "\r" && i[s + 1] === `
`)
          for (r = i[++s + 1]; r === " " || r === "	"; )
            r = i[++s + 1];
        else if (r === "x" || r === "u" || r === "U") {
          const o = { x: 2, u: 4, U: 8 }[r];
          e += vn(i, s + 1, o, t), s += o;
        } else {
          const o = i.substr(s - 1, 2);
          t(s - 1, "BAD_DQ_ESCAPE", `Invalid escape sequence ${o}`), e += o;
        }
      } else if (n === " " || n === "	") {
        const r = s;
        let u = i[s + 1];
        for (; u === " " || u === "	"; )
          u = i[++s + 1];
        u !== `
` && !(u === "\r" && i[s + 2] === `
`) && (e += s > r ? i.slice(r, s + 1) : n);
      } else
        e += n;
  }
  return (i[i.length - 1] !== '"' || i.length === 1) && t(i.length, "MISSING_CHAR", 'Missing closing "quote'), e;
}
function Zn(i, t) {
  let e = "", s = i[t + 1];
  for (; (s === " " || s === "	" || s === `
` || s === "\r") && !(s === "\r" && i[t + 2] !== `
`); )
    s === `
` && (e += `
`), t += 1, s = i[t + 1];
  return e || (e = " "), { fold: e, offset: t };
}
const Ln = {
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
function vn(i, t, e, s) {
  const n = i.substr(t, e), u = n.length === e && /^[0-9a-fA-F]+$/.test(n) ? parseInt(n, 16) : NaN;
  if (isNaN(u)) {
    const o = i.substr(t - 2, e + 2);
    return s(t - 2, "BAD_DQ_ESCAPE", `Invalid escape sequence ${o}`), o;
  }
  return String.fromCodePoint(u);
}
function pi(i, t, e, s) {
  const { value: n, type: r, comment: u, range: o } = t.type === "block-scalar" ? Bn(t, i.options.strict, s) : Fn(t, i.options.strict, s), a = e ? i.directives.tagName(e.source, (d) => s(e, "TAG_RESOLVE_FAILED", d)) : null, l = e && a ? Nn(i.schema, n, a, e, s) : t.type === "scalar" ? Yn(i, n, t, s) : i.schema[ge];
  let g;
  try {
    const d = l.resolve(n, (p) => s(e ?? t, "TAG_RESOLVE_FAILED", p), i.options);
    g = v(d) ? d : new E(d);
  } catch (d) {
    const p = d instanceof Error ? d.message : String(d);
    s(e ?? t, "TAG_RESOLVE_FAILED", p), g = new E(n);
  }
  return g.range = o, g.source = n, r && (g.type = r), a && (g.tag = a), l.format && (g.format = l.format), u && (g.comment = u), g;
}
function Nn(i, t, e, s, n) {
  var o;
  if (e === "!")
    return i[ge];
  const r = [];
  for (const a of i.tags)
    if (!a.collection && a.tag === e)
      if (a.default && a.test)
        r.push(a);
      else
        return a;
  for (const a of r)
    if ((o = a.test) != null && o.test(t))
      return a;
  const u = i.knownTags[e];
  return u && !u.collection ? (i.tags.push(Object.assign({}, u, { default: !1, test: void 0 })), u) : (n(s, "TAG_RESOLVE_FAILED", `Unresolved tag: ${e}`, e !== "tag:yaml.org,2002:str"), i[ge]);
}
function Yn({ directives: i, schema: t }, e, s, n) {
  const r = t.tags.find((u) => {
    var o;
    return u.default && ((o = u.test) == null ? void 0 : o.test(e));
  }) || t[ge];
  if (t.compat) {
    const u = t.compat.find((o) => {
      var a;
      return o.default && ((a = o.test) == null ? void 0 : a.test(e));
    }) ?? t[ge];
    if (r.tag !== u.tag) {
      const o = i.tagString(r.tag), a = i.tagString(u.tag), l = `Value may be parsed as either ${o} or ${a}`;
      n(s, "TAG_RESOLVE_FAILED", l, !0);
    }
  }
  return r;
}
function Kn(i, t, e) {
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
const Rn = { composeNode: gi, composeEmptyNode: ls };
function gi(i, t, e, s) {
  const { spaceBefore: n, comment: r, anchor: u, tag: o } = e;
  let a, l = !0;
  switch (t.type) {
    case "alias":
      a = On(i, t, s), (u || o) && s(t, "ALIAS_PROPS", "An alias node must not specify any properties");
      break;
    case "scalar":
    case "single-quoted-scalar":
    case "double-quoted-scalar":
    case "block-scalar":
      a = pi(i, t, o, s), u && (a.anchor = u.source.substring(1));
      break;
    case "block-map":
    case "block-seq":
    case "flow-collection":
      a = wn(Rn, i, t, o, s), u && (a.anchor = u.source.substring(1));
      break;
    default: {
      const g = t.type === "error" ? t.message : `Unsupported token (type: ${t.type})`;
      s(t, "UNEXPECTED_TOKEN", g), a = ls(i, t.offset, void 0, null, e, s), l = !1;
    }
  }
  return u && a.anchor === "" && s(u, "BAD_ALIAS", "Anchor cannot be an empty string"), n && (a.spaceBefore = !0), r && (t.type === "scalar" && t.source === "" ? a.comment = r : a.commentBefore = r), i.options.keepSourceTokens && l && (a.srcToken = t), a;
}
function ls(i, t, e, s, { spaceBefore: n, comment: r, anchor: u, tag: o, end: a }, l) {
  const g = {
    type: "scalar",
    offset: Kn(t, e, s),
    indent: -1,
    source: ""
  }, d = pi(i, g, o, l);
  return u && (d.anchor = u.source.substring(1), d.anchor === "" && l(u, "BAD_ALIAS", "Anchor cannot be an empty string")), n && (d.spaceBefore = !0), r && (d.comment = r, d.range[2] = a), d;
}
function On({ options: i }, { offset: t, source: e, end: s }, n) {
  const r = new jt(e.substring(1));
  r.source === "" && n(t, "BAD_ALIAS", "Alias cannot be an empty string"), r.source.endsWith(":") && n(t + e.length - 1, "BAD_ALIAS", "Alias ending in : is ambiguous", !0);
  const u = t + e.length, o = it(s, u, i.strict, n);
  return r.range = [t, u, o.offset], o.comment && (r.comment = o.comment), r;
}
function Wn(i, t, { offset: e, start: s, value: n, end: r }, u) {
  const o = Object.assign({ _directives: t }, i), a = new st(void 0, o), l = {
    atRoot: !0,
    directives: a.directives,
    options: a.options,
    schema: a.schema
  }, g = Oe(s, {
    indicator: "doc-start",
    next: n ?? (r == null ? void 0 : r[0]),
    offset: e,
    onError: u,
    startOnNewline: !0
  });
  g.found && (a.directives.docStart = !0, n && (n.type === "block-map" || n.type === "block-seq") && !g.hasNewline && u(g.end, "MISSING_CHAR", "Block collection cannot start on same line with directives-end marker")), a.contents = n ? gi(l, n, g, u) : ls(l, g.end, s, null, g, u);
  const d = a.contents.range[2], p = it(r, d, !1, u);
  return p.comment && (a.comment = p.comment), a.range = [e, d, p.offset], a;
}
function $e(i) {
  if (typeof i == "number")
    return [i, i + 1];
  if (Array.isArray(i))
    return i.length === 2 ? i : [i[0], i[1]];
  const { offset: t, source: e } = i;
  return [t, t + (typeof e == "string" ? e.length : 1)];
}
function ys(i) {
  var n;
  let t = "", e = !1, s = !1;
  for (let r = 0; r < i.length; ++r) {
    const u = i[r];
    switch (u[0]) {
      case "#":
        t += (t === "" ? "" : s ? `

` : `
`) + (u.substring(1) || " "), e = !0, s = !1;
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
class Hn {
  constructor(t = {}) {
    this.doc = null, this.atDirectives = !1, this.prelude = [], this.errors = [], this.warnings = [], this.onError = (e, s, n, r) => {
      const u = $e(e);
      r ? this.warnings.push(new In(u, s, n)) : this.errors.push(new Pe(u, s, n));
    }, this.directives = new J({ version: t.version || "1.2" }), this.options = t;
  }
  decorate(t, e) {
    const { comment: s, afterEmptyLine: n } = ys(this.prelude);
    if (s) {
      const r = t.contents;
      if (e)
        t.comment = t.comment ? `${t.comment}
${s}` : s;
      else if (n || t.directives.docStart || !r)
        t.commentBefore = s;
      else if (O(r) && !r.flow && r.items.length > 0) {
        let u = r.items[0];
        W(u) && (u = u.key);
        const o = u.commentBefore;
        u.commentBefore = o ? `${s}
${o}` : s;
      } else {
        const u = r.commentBefore;
        r.commentBefore = u ? `${s}
${u}` : s;
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
      comment: ys(this.prelude).comment,
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
          const r = $e(t);
          r[0] += e, this.onError(r, "BAD_DIRECTIVE", s, n);
        }), this.prelude.push(t.source), this.atDirectives = !0;
        break;
      case "document": {
        const e = Wn(this.options, this.directives, t, this.onError);
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
        const e = t.source ? `${t.message}: ${JSON.stringify(t.source)}` : t.message, s = new Pe($e(t), "UNEXPECTED_TOKEN", e);
        this.atDirectives || !this.doc ? this.errors.push(s) : this.doc.errors.push(s);
        break;
      }
      case "doc-end": {
        if (!this.doc) {
          const s = "Unexpected doc-end without preceding document";
          this.errors.push(new Pe($e(t), "UNEXPECTED_TOKEN", s));
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
        this.errors.push(new Pe($e(t), "UNEXPECTED_TOKEN", `Unsupported token ${t.type}`));
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
const fi = "\uFEFF", Ci = "", Ai = "", Vt = "";
function Tn(i) {
  switch (i) {
    case fi:
      return "byte-order-mark";
    case Ci:
      return "doc-mode";
    case Ai:
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
function te(i) {
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
const bs = "0123456789ABCDEFabcdef".split(""), Vn = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-#;/?:@&=+$_.!~*'()".split(""), vt = ",[]{}".split(""), $n = ` ,[]{}
\r	`.split(""), Nt = (i) => !i || $n.includes(i);
class Mn {
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
    t && (this.buffer = this.buffer ? this.buffer + t : t, this.lineEndPos = null), this.atEnd = !e;
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
      if ((s === "---" || s === "...") && te(this.buffer[t + 3]))
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
    if (t[0] === fi && (yield* this.pushCount(1), t = t.substring(1)), t[0] === "%") {
      let e = t.length;
      const s = t.indexOf("#");
      if (s !== -1) {
        const r = t[s - 1];
        (r === " " || r === "	") && (e = s - 1);
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
    return yield Ci, yield* this.parseLineStart();
  }
  *parseLineStart() {
    const t = this.charAt(0);
    if (!t && !this.atEnd)
      return this.setNext("line-start");
    if (t === "-" || t === ".") {
      if (!this.atEnd && !this.hasChars(4))
        return this.setNext("line-start");
      const e = this.peek(3);
      if (e === "---" && te(this.charAt(3)))
        return yield* this.pushCount(3), this.indentValue = 0, this.indentNext = 0, "doc";
      if (e === "..." && te(this.charAt(3)))
        return yield* this.pushCount(3), "stream";
    }
    return this.indentValue = yield* this.pushSpaces(!1), this.indentNext > this.indentValue && !te(this.charAt(1)) && (this.indentNext = this.indentValue), yield* this.parseBlockStart();
  }
  *parseBlockStart() {
    const [t, e] = this.peek(2);
    if (!e && !this.atEnd)
      return this.setNext("block-start");
    if ((t === "-" || t === "?" || t === ":") && te(e)) {
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
    if ((s !== -1 && s < this.indentNext && n[0] !== "#" || s === 0 && (n.startsWith("---") || n.startsWith("...")) && te(n[3])) && !(s === this.indentNext - 1 && this.flowLevel === 1 && (n[0] === "]" || n[0] === "}")))
      return this.flowLevel = 0, yield Ai, yield* this.parseLineStart();
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
        const u = this.charAt(1);
        if (this.flowKey || te(u) || u === ",")
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
    return yield* this.pushUntil((e) => te(e) || e === "#");
  }
  *parseBlockScalar() {
    let t = this.pos - 1, e = 0, s;
    e:
      for (let n = this.pos; s = this.buffer[n]; ++n)
        switch (s) {
          case " ":
            e += 1;
            break;
          case `
`:
            t = n, e = 0;
            break;
          case "\r": {
            const r = this.buffer[n + 1];
            if (!r && !this.atEnd)
              return this.setNext("block-scalar");
            if (r === `
`)
              break;
          }
          default:
            break e;
        }
    if (!s && !this.atEnd)
      return this.setNext("block-scalar");
    if (e >= this.indentNext) {
      this.blockScalarIndent === -1 ? this.indentNext = e : this.indentNext += this.blockScalarIndent;
      do {
        const n = this.continueScalar(t + 1);
        if (n === -1)
          break;
        t = this.buffer.indexOf(`
`, n);
      } while (t !== -1);
      if (t === -1) {
        if (!this.atEnd)
          return this.setNext("block-scalar");
        t = this.buffer.length;
      }
    }
    if (!this.blockScalarKeep)
      do {
        let n = t - 1, r = this.buffer[n];
        r === "\r" && (r = this.buffer[--n]);
        const u = n;
        for (; r === " " || r === "	"; )
          r = this.buffer[--n];
        if (r === `
` && n >= this.pos && n + 1 + e > u)
          t = n;
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
        if (te(r) || t && r === ",")
          break;
        e = s;
      } else if (te(n)) {
        let r = this.buffer[s + 1];
        if (n === "\r" && (r === `
` ? (s += 1, n = `
`, r = this.buffer[s + 1]) : e = s), r === "#" || t && vt.includes(r))
          break;
        if (n === `
`) {
          const u = this.continueScalar(s + 1);
          if (u === -1)
            break;
          s = Math.max(s, u - 2);
        }
      } else {
        if (t && vt.includes(n))
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
        if (te(e) || t && vt.includes(e))
          return t ? this.flowKey && (this.flowKey = !1) : this.indentNext = this.indentValue + 1, (yield* this.pushCount(1)) + (yield* this.pushSpaces(!0)) + (yield* this.pushIndicators());
      }
    }
    return 0;
  }
  *pushTag() {
    if (this.charAt(1) === "<") {
      let t = this.pos + 2, e = this.buffer[t];
      for (; !te(e) && e !== ">"; )
        e = this.buffer[++t];
      return yield* this.pushToIndex(e === ">" ? t + 1 : t, !1);
    } else {
      let t = this.pos + 1, e = this.buffer[t];
      for (; e; )
        if (Vn.includes(e))
          e = this.buffer[++t];
        else if (e === "%" && bs.includes(this.buffer[t + 1]) && bs.includes(this.buffer[t + 2]))
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
class Pn {
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
function re(i, t) {
  for (let e = 0; e < i.length; ++e)
    if (i[e].type === t)
      return !0;
  return !1;
}
function ws(i) {
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
function mi(i) {
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
function _e(i) {
  var e;
  if (i.length === 0)
    return [];
  let t = i.length;
  e:
    for (; --t >= 0; )
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
      t.sep && !t.value && !re(t.start, "explicit-key-ind") && !re(t.sep, "map-value-ind") && (t.key && (t.value = t.key), delete t.key, mi(t.value) ? t.value.end ? Array.prototype.push.apply(t.value.end, t.sep) : t.value.end = t.sep : Array.prototype.push.apply(t.start, t.sep), delete t.sep);
}
class Xn {
  /**
   * @param onNewLine - If defined, called separately with the start position of
   *   each new line (in `parse()`, including the start of input).
   */
  constructor(t) {
    this.atNewLine = !0, this.atScalar = !1, this.indent = 0, this.offset = 0, this.onKeyLine = !1, this.stack = [], this.source = "", this.type = "", this.lexer = new Mn(), this.onNewLine = t;
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
    const e = Tn(t);
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
            Object.assign(n, { key: e, sep: [] }), this.onKeyLine = !re(n.start, "explicit-key-ind");
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
        n && !n.sep && !n.value && n.start.length > 0 && ws(n.start) === -1 && (e.indent === 0 || n.start.every((r) => r.type !== "comment" || r.indent < e.indent)) && (s.type === "document" ? s.end = n.start : s.items.push({ start: n.start }), e.items.splice(-1, 1));
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
        ws(t.start) !== -1 ? (yield* this.pop(), yield* this.step()) : t.start.push(this.sourceToken);
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
      const e = ut(this.peek(2)), s = _e(e);
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
        } else
          e.sep ? e.sep.push(this.sourceToken) : e.start.push(this.sourceToken);
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
      const n = !this.onKeyLine && this.indent === t.indent && e.sep && this.type !== "seq-item-ind";
      let r = [];
      if (n && e.sep && !e.value) {
        const u = [];
        for (let o = 0; o < e.sep.length; ++o) {
          const a = e.sep[o];
          switch (a.type) {
            case "newline":
              u.push(o);
              break;
            case "space":
              break;
            case "comment":
              a.indent > t.indent && (u.length = 0);
              break;
            default:
              u.length = 0;
          }
        }
        u.length >= 2 && (r = e.sep.splice(u[1]));
      }
      switch (this.type) {
        case "anchor":
        case "tag":
          n || e.value ? (r.push(this.sourceToken), t.items.push({ start: r }), this.onKeyLine = !0) : e.sep ? e.sep.push(this.sourceToken) : e.start.push(this.sourceToken);
          return;
        case "explicit-key-ind":
          !e.sep && !re(e.start, "explicit-key-ind") ? e.start.push(this.sourceToken) : n || e.value ? (r.push(this.sourceToken), t.items.push({ start: r })) : this.stack.push({
            type: "block-map",
            offset: this.offset,
            indent: this.indent,
            items: [{ start: [this.sourceToken] }]
          }), this.onKeyLine = !0;
          return;
        case "map-value-ind":
          if (re(e.start, "explicit-key-ind"))
            if (e.sep)
              if (e.value)
                t.items.push({ start: [], key: null, sep: [this.sourceToken] });
              else if (re(e.sep, "map-value-ind"))
                this.stack.push({
                  type: "block-map",
                  offset: this.offset,
                  indent: this.indent,
                  items: [{ start: r, key: null, sep: [this.sourceToken] }]
                });
              else if (mi(e.key) && !re(e.sep, "newline")) {
                const u = _e(e.start), o = e.key, a = e.sep;
                a.push(this.sourceToken), delete e.key, delete e.sep, this.stack.push({
                  type: "block-map",
                  offset: this.offset,
                  indent: this.indent,
                  items: [{ start: u, key: o, sep: a }]
                });
              } else
                r.length > 0 ? e.sep = e.sep.concat(r, this.sourceToken) : e.sep.push(this.sourceToken);
            else if (re(e.start, "newline"))
              Object.assign(e, { key: null, sep: [this.sourceToken] });
            else {
              const u = _e(e.start);
              this.stack.push({
                type: "block-map",
                offset: this.offset,
                indent: this.indent,
                items: [{ start: u, key: null, sep: [this.sourceToken] }]
              });
            }
          else
            e.sep ? e.value || n ? t.items.push({ start: r, key: null, sep: [this.sourceToken] }) : re(e.sep, "map-value-ind") ? this.stack.push({
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
          n || e.value ? (t.items.push({ start: r, key: u, sep: [] }), this.onKeyLine = !0) : e.sep ? this.stack.push(u) : (Object.assign(e, { key: u, sep: [] }), this.onKeyLine = !0);
          return;
        }
        default: {
          const u = this.startBlockValue(t);
          if (u) {
            n && u.type !== "block-seq" && re(e.start, "explicit-key-ind") && t.items.push({ start: r }), this.stack.push(u);
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
        e.value || re(e.start, "seq-item-ind") ? t.items.push({ start: [this.sourceToken] }) : e.start.push(this.sourceToken);
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
        const n = ut(s), r = _e(n);
        Bs(t);
        const u = t.end.splice(1, t.end.length);
        u.push(this.sourceToken);
        const o = {
          type: "block-map",
          offset: t.offset,
          indent: t.indent,
          items: [{ start: r, key: t, sep: u }]
        };
        this.onKeyLine = !0, this.stack[this.stack.length - 1] = o;
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
        const e = ut(t), s = _e(e);
        return s.push(this.sourceToken), {
          type: "block-map",
          offset: this.offset,
          indent: this.indent,
          items: [{ start: s }]
        };
      }
      case "map-value-ind": {
        this.onKeyLine = !0;
        const e = ut(t), s = _e(e);
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
function Jn(i) {
  const t = i.prettyErrors !== !1;
  return { lineCounter: i.lineCounter || t && new Pn() || null, prettyErrors: t };
}
function Un(i, t = {}) {
  const { lineCounter: e, prettyErrors: s } = Jn(t), n = new Xn(e == null ? void 0 : e.addNewLine), r = new Hn(t);
  let u = null;
  for (const o of r.compose(n.parse(i), !0, i.length))
    if (!u)
      u = o;
    else if (u.options.logLevel !== "silent") {
      u.errors.push(new Pe(o.range.slice(0, 2), "MULTIPLE_DOCS", "Source contains multiple documents; please use YAML.parseAllDocuments()"));
      break;
    }
  return s && e && (u.errors.forEach(Is(i, e)), u.warnings.forEach(Is(i, e))), u;
}
function le(i, t, e) {
  let s;
  const n = Un(i, e);
  if (!n)
    return null;
  if (n.warnings.forEach((r) => Xs(n.options.logLevel, r)), n.errors.length > 0) {
    if (n.options.logLevel !== "silent")
      throw n.errors[0];
    n.errors = [];
  }
  return n.toJS(Object.assign({ reviver: s }, e));
}
function Ft(i, t, e) {
  let s = null;
  if (Array.isArray(t) && (s = t), i === void 0) {
    const { keepUndefined: n } = {};
    if (!n)
      return;
  }
  return new st(i, s, e).toString(e);
}
var xn = /[\u1680\u2000-\u200A\u202F\u205F\u3000]/, jn = /[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u08A0-\u08B4\u08B6-\u08BD\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312E\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FEA\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF2D-\uDF4A\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC03-\uDC37\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDF00-\uDF19]|\uD806[\uDCA0-\uDCDF\uDCFF\uDE00\uDE0B-\uDE32\uDE3A\uDE50\uDE5C-\uDE83\uDE86-\uDE89\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD30\uDD46]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50\uDF93-\uDF9F\uDFE0\uDFE1]|\uD821[\uDC00-\uDFEC]|\uD822[\uDC00-\uDEF2]|\uD82C[\uDC00-\uDD1E\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD83A[\uDC00-\uDCC4\uDD00-\uDD43]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]/, zn = /[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u0483-\u0487\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05F0-\u05F2\u0610-\u061A\u0620-\u0669\u066E-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06FC\u06FF\u0710-\u074A\u074D-\u07B1\u07C0-\u07F5\u07FA\u0800-\u082D\u0840-\u085B\u0860-\u086A\u08A0-\u08B4\u08B6-\u08BD\u08D4-\u08E1\u08E3-\u0963\u0966-\u096F\u0971-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u09FC\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0AF9-\u0AFF\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BEF\u0C00-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58-\u0C5A\u0C60-\u0C63\u0C66-\u0C6F\u0C80-\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2\u0D00-\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D54-\u0D57\u0D5F-\u0D63\u0D66-\u0D6F\u0D7A-\u0D7F\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E4E\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6C\u0F71-\u0F84\u0F86-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u135F\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17D3\u17D7\u17DC\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u1820-\u1877\u1880-\u18AA\u18B0-\u18F5\u1900-\u191E\u1920-\u192B\u1930-\u193B\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19D9\u1A00-\u1A1B\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA7\u1AB0-\u1ABD\u1B00-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BF3\u1C00-\u1C37\u1C40-\u1C49\u1C4D-\u1C7D\u1C80-\u1C88\u1CD0-\u1CD2\u1CD4-\u1CF9\u1D00-\u1DF9\u1DFB-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u203F\u2040\u2054\u2071\u207F\u2090-\u209C\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D7F-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u2E2F\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u3099\u309A\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312E\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FEA\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66F\uA674-\uA67D\uA67F-\uA6F1\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA827\uA840-\uA873\uA880-\uA8C5\uA8D0-\uA8D9\uA8E0-\uA8F7\uA8FB\uA8FD\uA900-\uA92D\uA930-\uA953\uA960-\uA97C\uA980-\uA9C0\uA9CF-\uA9D9\uA9E0-\uA9FE\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A-\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABEA\uABEC\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE00-\uFE0F\uFE20-\uFE2F\uFE33\uFE34\uFE4D-\uFE4F\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF3F\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDDFD\uDE80-\uDE9C\uDEA0-\uDED0\uDEE0\uDF00-\uDF1F\uDF2D-\uDF4A\uDF50-\uDF7A\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCA0-\uDCA9\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00-\uDE03\uDE05\uDE06\uDE0C-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE38-\uDE3A\uDE3F\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE6\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC00-\uDC46\uDC66-\uDC6F\uDC7F-\uDCBA\uDCD0-\uDCE8\uDCF0-\uDCF9\uDD00-\uDD34\uDD36-\uDD3F\uDD50-\uDD73\uDD76\uDD80-\uDDC4\uDDCA-\uDDCC\uDDD0-\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE37\uDE3E\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEEA\uDEF0-\uDEF9\uDF00-\uDF03\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3C-\uDF44\uDF47\uDF48\uDF4B-\uDF4D\uDF50\uDF57\uDF5D-\uDF63\uDF66-\uDF6C\uDF70-\uDF74]|\uD805[\uDC00-\uDC4A\uDC50-\uDC59\uDC80-\uDCC5\uDCC7\uDCD0-\uDCD9\uDD80-\uDDB5\uDDB8-\uDDC0\uDDD8-\uDDDD\uDE00-\uDE40\uDE44\uDE50-\uDE59\uDE80-\uDEB7\uDEC0-\uDEC9\uDF00-\uDF19\uDF1D-\uDF2B\uDF30-\uDF39]|\uD806[\uDCA0-\uDCE9\uDCFF\uDE00-\uDE3E\uDE47\uDE50-\uDE83\uDE86-\uDE99\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC36\uDC38-\uDC40\uDC50-\uDC59\uDC72-\uDC8F\uDC92-\uDCA7\uDCA9-\uDCB6\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD36\uDD3A\uDD3C\uDD3D\uDD3F-\uDD47\uDD50-\uDD59]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE60-\uDE69\uDED0-\uDEED\uDEF0-\uDEF4\uDF00-\uDF36\uDF40-\uDF43\uDF50-\uDF59\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50-\uDF7E\uDF8F-\uDF9F\uDFE0\uDFE1]|\uD821[\uDC00-\uDFEC]|\uD822[\uDC00-\uDEF2]|\uD82C[\uDC00-\uDD1E\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99\uDC9D\uDC9E]|\uD834[\uDD65-\uDD69\uDD6D-\uDD72\uDD7B-\uDD82\uDD85-\uDD8B\uDDAA-\uDDAD\uDE42-\uDE44]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB\uDFCE-\uDFFF]|\uD836[\uDE00-\uDE36\uDE3B-\uDE6C\uDE75\uDE84\uDE9B-\uDE9F\uDEA1-\uDEAF]|\uD838[\uDC00-\uDC06\uDC08-\uDC18\uDC1B-\uDC21\uDC23\uDC24\uDC26-\uDC2A]|\uD83A[\uDC00-\uDCC4\uDCD0-\uDCD6\uDD00-\uDD4A\uDD50-\uDD59]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]|\uDB40[\uDD00-\uDDEF]/, Yt = {
  Space_Separator: xn,
  ID_Start: jn,
  ID_Continue: zn
}, R = {
  isSpaceSeparator(i) {
    return typeof i == "string" && Yt.Space_Separator.test(i);
  },
  isIdStartChar(i) {
    return typeof i == "string" && (i >= "a" && i <= "z" || i >= "A" && i <= "Z" || i === "$" || i === "_" || Yt.ID_Start.test(i));
  },
  isIdContinueChar(i) {
    return typeof i == "string" && (i >= "a" && i <= "z" || i >= "A" && i <= "Z" || i >= "0" && i <= "9" || i === "$" || i === "_" || i === "‌" || i === "‍" || Yt.ID_Continue.test(i));
  },
  isDigit(i) {
    return typeof i == "string" && /[0-9]/.test(i);
  },
  isHexDigit(i) {
    return typeof i == "string" && /[0-9A-Fa-f]/.test(i);
  }
};
let $t, U, he, ft, Ce, oe, V, cs, xe;
var Qn = function(t, e) {
  $t = String(t), U = "start", he = [], ft = 0, Ce = 1, oe = 0, V = void 0, cs = void 0, xe = void 0;
  do
    V = qn(), sr[U]();
  while (V.type !== "eof");
  return typeof e == "function" ? Mt({ "": xe }, "", e) : xe;
};
function Mt(i, t, e) {
  const s = i[t];
  if (s != null && typeof s == "object")
    if (Array.isArray(s))
      for (let n = 0; n < s.length; n++) {
        const r = String(n), u = Mt(s, r, e);
        u === void 0 ? delete s[r] : Object.defineProperty(s, r, {
          value: u,
          writable: !0,
          enumerable: !0,
          configurable: !0
        });
      }
    else
      for (const n in s) {
        const r = Mt(s, n, e);
        r === void 0 ? delete s[n] : Object.defineProperty(s, n, {
          value: r,
          writable: !0,
          enumerable: !0,
          configurable: !0
        });
      }
  return e.call(i, t, s);
}
let F, S, Xe, ce, G;
function qn() {
  for (F = "default", S = "", Xe = !1, ce = 1; ; ) {
    G = pe();
    const i = Ii[F]();
    if (i)
      return i;
  }
}
function pe() {
  if ($t[ft])
    return String.fromCodePoint($t.codePointAt(ft));
}
function C() {
  const i = pe();
  return i === `
` ? (Ce++, oe = 0) : i ? oe += i.length : oe++, i && (ft += i.length), i;
}
const Ii = {
  default() {
    switch (G) {
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
        C(), F = "comment";
        return;
      case void 0:
        return C(), _("eof");
    }
    if (R.isSpaceSeparator(G)) {
      C();
      return;
    }
    return Ii[U]();
  },
  comment() {
    switch (G) {
      case "*":
        C(), F = "multiLineComment";
        return;
      case "/":
        C(), F = "singleLineComment";
        return;
    }
    throw Z(C());
  },
  multiLineComment() {
    switch (G) {
      case "*":
        C(), F = "multiLineCommentAsterisk";
        return;
      case void 0:
        throw Z(C());
    }
    C();
  },
  multiLineCommentAsterisk() {
    switch (G) {
      case "*":
        C();
        return;
      case "/":
        C(), F = "default";
        return;
      case void 0:
        throw Z(C());
    }
    C(), F = "multiLineComment";
  },
  singleLineComment() {
    switch (G) {
      case `
`:
      case "\r":
      case "\u2028":
      case "\u2029":
        C(), F = "default";
        return;
      case void 0:
        return C(), _("eof");
    }
    C();
  },
  value() {
    switch (G) {
      case "{":
      case "[":
        return _("punctuator", C());
      case "n":
        return C(), me("ull"), _("null", null);
      case "t":
        return C(), me("rue"), _("boolean", !0);
      case "f":
        return C(), me("alse"), _("boolean", !1);
      case "-":
      case "+":
        C() === "-" && (ce = -1), F = "sign";
        return;
      case ".":
        S = C(), F = "decimalPointLeading";
        return;
      case "0":
        S = C(), F = "zero";
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
        S = C(), F = "decimalInteger";
        return;
      case "I":
        return C(), me("nfinity"), _("numeric", 1 / 0);
      case "N":
        return C(), me("aN"), _("numeric", NaN);
      case '"':
      case "'":
        Xe = C() === '"', S = "", F = "string";
        return;
    }
    throw Z(C());
  },
  identifierNameStartEscape() {
    if (G !== "u")
      throw Z(C());
    C();
    const i = Pt();
    switch (i) {
      case "$":
      case "_":
        break;
      default:
        if (!R.isIdStartChar(i))
          throw Ss();
        break;
    }
    S += i, F = "identifierName";
  },
  identifierName() {
    switch (G) {
      case "$":
      case "_":
      case "‌":
      case "‍":
        S += C();
        return;
      case "\\":
        C(), F = "identifierNameEscape";
        return;
    }
    if (R.isIdContinueChar(G)) {
      S += C();
      return;
    }
    return _("identifier", S);
  },
  identifierNameEscape() {
    if (G !== "u")
      throw Z(C());
    C();
    const i = Pt();
    switch (i) {
      case "$":
      case "_":
      case "‌":
      case "‍":
        break;
      default:
        if (!R.isIdContinueChar(i))
          throw Ss();
        break;
    }
    S += i, F = "identifierName";
  },
  sign() {
    switch (G) {
      case ".":
        S = C(), F = "decimalPointLeading";
        return;
      case "0":
        S = C(), F = "zero";
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
        S = C(), F = "decimalInteger";
        return;
      case "I":
        return C(), me("nfinity"), _("numeric", ce * (1 / 0));
      case "N":
        return C(), me("aN"), _("numeric", NaN);
    }
    throw Z(C());
  },
  zero() {
    switch (G) {
      case ".":
        S += C(), F = "decimalPoint";
        return;
      case "e":
      case "E":
        S += C(), F = "decimalExponent";
        return;
      case "x":
      case "X":
        S += C(), F = "hexadecimal";
        return;
    }
    return _("numeric", ce * 0);
  },
  decimalInteger() {
    switch (G) {
      case ".":
        S += C(), F = "decimalPoint";
        return;
      case "e":
      case "E":
        S += C(), F = "decimalExponent";
        return;
    }
    if (R.isDigit(G)) {
      S += C();
      return;
    }
    return _("numeric", ce * Number(S));
  },
  decimalPointLeading() {
    if (R.isDigit(G)) {
      S += C(), F = "decimalFraction";
      return;
    }
    throw Z(C());
  },
  decimalPoint() {
    switch (G) {
      case "e":
      case "E":
        S += C(), F = "decimalExponent";
        return;
    }
    if (R.isDigit(G)) {
      S += C(), F = "decimalFraction";
      return;
    }
    return _("numeric", ce * Number(S));
  },
  decimalFraction() {
    switch (G) {
      case "e":
      case "E":
        S += C(), F = "decimalExponent";
        return;
    }
    if (R.isDigit(G)) {
      S += C();
      return;
    }
    return _("numeric", ce * Number(S));
  },
  decimalExponent() {
    switch (G) {
      case "+":
      case "-":
        S += C(), F = "decimalExponentSign";
        return;
    }
    if (R.isDigit(G)) {
      S += C(), F = "decimalExponentInteger";
      return;
    }
    throw Z(C());
  },
  decimalExponentSign() {
    if (R.isDigit(G)) {
      S += C(), F = "decimalExponentInteger";
      return;
    }
    throw Z(C());
  },
  decimalExponentInteger() {
    if (R.isDigit(G)) {
      S += C();
      return;
    }
    return _("numeric", ce * Number(S));
  },
  hexadecimal() {
    if (R.isHexDigit(G)) {
      S += C(), F = "hexadecimalInteger";
      return;
    }
    throw Z(C());
  },
  hexadecimalInteger() {
    if (R.isHexDigit(G)) {
      S += C();
      return;
    }
    return _("numeric", ce * Number(S));
  },
  string() {
    switch (G) {
      case "\\":
        C(), S += er();
        return;
      case '"':
        if (Xe)
          return C(), _("string", S);
        S += C();
        return;
      case "'":
        if (!Xe)
          return C(), _("string", S);
        S += C();
        return;
      case `
`:
      case "\r":
        throw Z(C());
      case "\u2028":
      case "\u2029":
        ir(G);
        break;
      case void 0:
        throw Z(C());
    }
    S += C();
  },
  start() {
    switch (G) {
      case "{":
      case "[":
        return _("punctuator", C());
    }
    F = "value";
  },
  beforePropertyName() {
    switch (G) {
      case "$":
      case "_":
        S = C(), F = "identifierName";
        return;
      case "\\":
        C(), F = "identifierNameStartEscape";
        return;
      case "}":
        return _("punctuator", C());
      case '"':
      case "'":
        Xe = C() === '"', F = "string";
        return;
    }
    if (R.isIdStartChar(G)) {
      S += C(), F = "identifierName";
      return;
    }
    throw Z(C());
  },
  afterPropertyName() {
    if (G === ":")
      return _("punctuator", C());
    throw Z(C());
  },
  beforePropertyValue() {
    F = "value";
  },
  afterPropertyValue() {
    switch (G) {
      case ",":
      case "}":
        return _("punctuator", C());
    }
    throw Z(C());
  },
  beforeArrayValue() {
    if (G === "]")
      return _("punctuator", C());
    F = "value";
  },
  afterArrayValue() {
    switch (G) {
      case ",":
      case "]":
        return _("punctuator", C());
    }
    throw Z(C());
  },
  end() {
    throw Z(C());
  }
};
function _(i, t) {
  return {
    type: i,
    value: t,
    line: Ce,
    column: oe
  };
}
function me(i) {
  for (const t of i) {
    if (pe() !== t)
      throw Z(C());
    C();
  }
}
function er() {
  switch (pe()) {
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
      if (C(), R.isDigit(pe()))
        throw Z(C());
      return "\0";
    case "x":
      return C(), tr();
    case "u":
      return C(), Pt();
    case `
`:
    case "\u2028":
    case "\u2029":
      return C(), "";
    case "\r":
      return C(), pe() === `
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
      throw Z(C());
    case void 0:
      throw Z(C());
  }
  return C();
}
function tr() {
  let i = "", t = pe();
  if (!R.isHexDigit(t) || (i += C(), t = pe(), !R.isHexDigit(t)))
    throw Z(C());
  return i += C(), String.fromCodePoint(parseInt(i, 16));
}
function Pt() {
  let i = "", t = 4;
  for (; t-- > 0; ) {
    const e = pe();
    if (!R.isHexDigit(e))
      throw Z(C());
    i += C();
  }
  return String.fromCodePoint(parseInt(i, 16));
}
const sr = {
  start() {
    if (V.type === "eof")
      throw Ie();
    Kt();
  },
  beforePropertyName() {
    switch (V.type) {
      case "identifier":
      case "string":
        cs = V.value, U = "afterPropertyName";
        return;
      case "punctuator":
        ot();
        return;
      case "eof":
        throw Ie();
    }
  },
  afterPropertyName() {
    if (V.type === "eof")
      throw Ie();
    U = "beforePropertyValue";
  },
  beforePropertyValue() {
    if (V.type === "eof")
      throw Ie();
    Kt();
  },
  beforeArrayValue() {
    if (V.type === "eof")
      throw Ie();
    if (V.type === "punctuator" && V.value === "]") {
      ot();
      return;
    }
    Kt();
  },
  afterPropertyValue() {
    if (V.type === "eof")
      throw Ie();
    switch (V.value) {
      case ",":
        U = "beforePropertyName";
        return;
      case "}":
        ot();
    }
  },
  afterArrayValue() {
    if (V.type === "eof")
      throw Ie();
    switch (V.value) {
      case ",":
        U = "beforeArrayValue";
        return;
      case "]":
        ot();
    }
  },
  end() {
  }
};
function Kt() {
  let i;
  switch (V.type) {
    case "punctuator":
      switch (V.value) {
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
      i = V.value;
      break;
  }
  if (xe === void 0)
    xe = i;
  else {
    const t = he[he.length - 1];
    Array.isArray(t) ? t.push(i) : Object.defineProperty(t, cs, {
      value: i,
      writable: !0,
      enumerable: !0,
      configurable: !0
    });
  }
  if (i !== null && typeof i == "object")
    he.push(i), Array.isArray(i) ? U = "beforeArrayValue" : U = "beforePropertyName";
  else {
    const t = he[he.length - 1];
    t == null ? U = "end" : Array.isArray(t) ? U = "afterArrayValue" : U = "afterPropertyValue";
  }
}
function ot() {
  he.pop();
  const i = he[he.length - 1];
  i == null ? U = "end" : Array.isArray(i) ? U = "afterArrayValue" : U = "afterPropertyValue";
}
function Z(i) {
  return Ct(i === void 0 ? `JSON5: invalid end of input at ${Ce}:${oe}` : `JSON5: invalid character '${Di(i)}' at ${Ce}:${oe}`);
}
function Ie() {
  return Ct(`JSON5: invalid end of input at ${Ce}:${oe}`);
}
function Ss() {
  return oe -= 5, Ct(`JSON5: invalid identifier character at ${Ce}:${oe}`);
}
function ir(i) {
  console.warn(`JSON5: '${Di(i)}' in strings is not valid ECMAScript; consider escaping`);
}
function Di(i) {
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
function Ct(i) {
  const t = new SyntaxError(i);
  return t.lineNumber = Ce, t.columnNumber = oe, t;
}
var nr = function(t, e, s) {
  const n = [];
  let r = "", u, o, a = "", l;
  if (e != null && typeof e == "object" && !Array.isArray(e) && (s = e.space, l = e.quote, e = e.replacer), typeof e == "function")
    o = e;
  else if (Array.isArray(e)) {
    u = [];
    for (const c of e) {
      let h;
      typeof c == "string" ? h = c : (typeof c == "number" || c instanceof String || c instanceof Number) && (h = String(c)), h !== void 0 && u.indexOf(h) < 0 && u.push(h);
    }
  }
  return s instanceof Number ? s = Number(s) : s instanceof String && (s = String(s)), typeof s == "number" ? s > 0 && (s = Math.min(10, Math.floor(s)), a = "          ".substr(0, s)) : typeof s == "string" && (a = s.substr(0, 10)), g("", { "": t });
  function g(c, h) {
    let m = h[c];
    switch (m != null && (typeof m.toJSON5 == "function" ? m = m.toJSON5(c) : typeof m.toJSON == "function" && (m = m.toJSON(c))), o && (m = o.call(h, c, m)), m instanceof Number ? m = Number(m) : m instanceof String ? m = String(m) : m instanceof Boolean && (m = m.valueOf()), m) {
      case null:
        return "null";
      case !0:
        return "true";
      case !1:
        return "false";
    }
    if (typeof m == "string")
      return d(m);
    if (typeof m == "number")
      return String(m);
    if (typeof m == "object")
      return Array.isArray(m) ? y(m) : p(m);
  }
  function d(c) {
    const h = {
      "'": 0.1,
      '"': 0.2
    }, m = {
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
    let b = "";
    for (let D = 0; D < c.length; D++) {
      const B = c[D];
      switch (B) {
        case "'":
        case '"':
          h[B]++, b += B;
          continue;
        case "\0":
          if (R.isDigit(c[D + 1])) {
            b += "\\x00";
            continue;
          }
      }
      if (m[B]) {
        b += m[B];
        continue;
      }
      if (B < " ") {
        let I = B.charCodeAt(0).toString(16);
        b += "\\x" + ("00" + I).substring(I.length);
        continue;
      }
      b += B;
    }
    const w = l || Object.keys(h).reduce((D, B) => h[D] < h[B] ? D : B);
    return b = b.replace(new RegExp(w, "g"), m[w]), w + b + w;
  }
  function p(c) {
    if (n.indexOf(c) >= 0)
      throw TypeError("Converting circular structure to JSON5");
    n.push(c);
    let h = r;
    r = r + a;
    let m = u || Object.keys(c), b = [];
    for (const D of m) {
      const B = g(D, c);
      if (B !== void 0) {
        let I = A(D) + ":";
        a !== "" && (I += " "), I += B, b.push(I);
      }
    }
    let w;
    if (b.length === 0)
      w = "{}";
    else {
      let D;
      if (a === "")
        D = b.join(","), w = "{" + D + "}";
      else {
        let B = `,
` + r;
        D = b.join(B), w = `{
` + r + D + `,
` + h + "}";
      }
    }
    return n.pop(), r = h, w;
  }
  function A(c) {
    if (c.length === 0)
      return d(c);
    const h = String.fromCodePoint(c.codePointAt(0));
    if (!R.isIdStartChar(h))
      return d(c);
    for (let m = h.length; m < c.length; m++)
      if (!R.isIdContinueChar(String.fromCodePoint(c.codePointAt(m))))
        return d(c);
    return c;
  }
  function y(c) {
    if (n.indexOf(c) >= 0)
      throw TypeError("Converting circular structure to JSON5");
    n.push(c);
    let h = r;
    r = r + a;
    let m = [];
    for (let w = 0; w < c.length; w++) {
      const D = g(String(w), c);
      m.push(D !== void 0 ? D : "null");
    }
    let b;
    if (m.length === 0)
      b = "[]";
    else if (a === "")
      b = "[" + m.join(",") + "]";
    else {
      let w = `,
` + r, D = m.join(w);
      b = `[
` + r + D + `,
` + h + "]";
    }
    return n.pop(), r = h, b;
  }
};
const rr = {
  parse: Qn,
  stringify: nr
};
var j = rr;
class yi {
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
    const e = this.$app.useGlobal("mode") === "preview", s = this.$app.useGlobal("re-draw");
    this.$app.mode === "game" ? (await this.$app.script.process({
      timestamp: t,
      deltaTime: this._deltaTime
    }), await this.$app.drawer.process()) : (this.$app.mode === "editor" && s || e) && (await this.$app.script.process({
      timestamp: t,
      deltaTime: this._deltaTime
    }), await this.$app.drawer.process(), this.$app.changeGlobal("re-draw", !1)), this._ref = window.requestAnimationFrame(this.loop.bind(this));
  }
  play() {
    this._status.playing || (this[L]("animation:play"), this._status.playing = !0, this._status.pause = !1, this._ref = window.requestAnimationFrame(this.loop.bind(this)));
  }
  pause() {
    this._status.playing && (this[L]("animation:pause"), window.cancelAnimationFrame(this._ref), this._status.playing = !1, this._status.pause = !0, this._frame = 0, this._lastTime = 0, this._deltaTime = 0);
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
  [L](t, ...e) {
    this._events.emitEvent(t, e);
  }
}
const $ = Symbol("PropFunctions"), M = Symbol("PropAttributes"), P = Symbol("PropMetaKeys"), K = Symbol("PropNodes"), z = Symbol("PropType"), Xt = Symbol("MethodSetParent"), bi = Symbol("MethodSetUUID"), ur = Symbol("MethodSetFunctions"), wi = Symbol("MethodSetAttributes"), or = Symbol("MethodSetMetaKeys"), ye = Symbol("MethodSetIndex"), Bi = Symbol("MethodSetNodes"), je = class je {
  static import(t, e = "JSON") {
    throw new Error("Method not implemented! Use derived class");
  }
  getApp() {
    return je.$app;
  }
  static [Ks](t) {
    je.$app = t;
  }
};
f(je, "$app");
let At = je;
var Be = 256, dt = [], at;
for (; Be--; )
  dt[Be] = (Be + 256).toString(16).substring(1);
function ar() {
  var i = 0, t, e = "";
  if (!at || Be + 16 > 256) {
    for (at = Array(i = 256); i--; )
      at[i] = 256 * Math.random() | 0;
    i = Be = 0;
  }
  for (; i < 16; i++)
    t = at[Be + i], i == 6 ? e += dt[t & 15 | 64] : i == 8 ? e += dt[t & 63 | 128] : e += dt[t], i & 1 && i > 1 && i < 11 && (e += "-");
  return Be++, e;
}
const lr = Object.getPrototypeOf(async function() {
}).constructor, cr = async (i, t, e) => {
  const s = `return {$functions:{${i.indexOf("_ready") !== -1 ? "_ready," : ""}${i.indexOf("_process") !== -1 ? "_process," : ""}${i.indexOf("_draw") !== -1 ? "_draw," : ""}}};`, n = `with (node) {${i};
${s}}`;
  return await new lr("node, viewport", n)(t, e);
}, hr = {
  description: "",
  title: "",
  name: "GlobalNode"
}, Q = (i, t) => {
  const e = {};
  for (const s in i)
    t.indexOf(s) == -1 && (e[s] = i[s]);
  return e;
};
var Rr, Or, Wr, Hr, Tr;
class hs extends At {
  constructor(e) {
    super();
    f(this, "_omit", ["name", "description"]);
    f(this, "_options");
    f(this, "_initial");
    f(this, "_events");
    f(this, "_parent");
    f(this, "_uuid");
    f(this, "_index");
    f(this, Rr, "primitive:node");
    f(this, "NODE_NAME", "PrimitiveNode");
    f(this, "script");
    f(this, Or);
    f(this, Wr);
    f(this, Hr);
    f(this, Tr);
    this._initial = {
      ...hr,
      ...e
    }, this._options = { ...this._initial }, this._events = new Fe(), this._parent = null, this._uuid = ar(), this._index = 0, this.script = null, this[K] = [], this[$] = /* @__PURE__ */ new Map(), this[M] = /* @__PURE__ */ new Map(), this[P] = /* @__PURE__ */ new Map();
  }
  get nodes() {
    return this[K];
  }
  get firstNode() {
    if (this._parent)
      return this._parent.nodes[0];
  }
  get lastNode() {
    if (this._parent)
      return this._parent.nodes[this._parent.nodes.length - 1];
  }
  get nextSiblingNode() {
    if (this._parent)
      return this._parent.nodes[this.index + 1];
  }
  get previousSiblingNode() {
    if (this._parent)
      return this._parent.nodes[this.index - 1];
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
    }), this.getApp().changeGlobal("re-draw", !0);
  }
  cloneNode() {
    return ee([this[k](!0)])[0];
  }
  getNode(e) {
    return this[K].find((s) => s.uuid == e);
  }
  addNode(...e) {
    for (const s of e)
      s[ye](this[K].length), s[Xt](this), this[K].push(s), this.getApp().drawer.addNode(
        s[q](),
        this.deep,
        "deep"
      );
    this.getApp().changeGlobal("re-draw", !0);
  }
  hasNode(e) {
    return this[K].findIndex((s) => s.uuid === e) !== -1;
  }
  deleteNode(e) {
    let s = this.getNode(e);
    return s ? (this[K].splice(s.index, 1), this.getApp().changeGlobal("re-draw", !0), s = void 0, !0) : !1;
  }
  clearNodes() {
    this[K] = [], this.getApp().changeGlobal("re-draw", !0);
  }
  replaceNode(e, s) {
    const n = this.getNode(e);
    if (!n)
      throw new Error("node not found");
    s[ye](n.index), this[K][n.index] = s, this.getApp().changeGlobal("re-draw", !0);
  }
  replaceNodeByIndex(e, s) {
    if (e < 0 || e >= this[K].length)
      throw new Error("Indexes out ranges");
    if (!this[K][e])
      throw new Error("node not found");
    s[ye](e), this[K][e] = s, this.getApp().changeGlobal("re-draw", !0);
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
    if (e < 0 || e >= this[K].length)
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
    if (!n)
      throw new Error("node not found");
    if (s < 0 || s >= this[K].length)
      throw new Error("Indexes out ranges");
    const r = this[K].slice(), [u] = r.splice(n.index, 1);
    r.splice(s, 0, u);
    for (let o = 0; o < r.length; o++)
      r[o][ye](o);
    this[K] = r, this.getApp().changeGlobal("re-draw", !0);
  }
  moveNodeByIndex(e, s) {
    if (e < 0 || e >= this[K].length || s < 0 || s >= this[K].length)
      throw new Error("Indexes out ranges");
    const n = this[K].slice(), [r] = n.splice(e, 1);
    n.splice(s, 0, r);
    for (let u = 0; u < n.length; u++)
      n[u][ye](u);
    this[K] = n, this.getApp().changeGlobal("re-draw", !0);
  }
  getFunctions() {
    return [...this[$].values()];
  }
  getFunction(e) {
    return this[$].get(e);
  }
  addFunction(e, s) {
    this[$].set(e, s), this.getApp().changeGlobal("re-draw", !0);
  }
  hasFunction(e) {
    return this[$].has(e);
  }
  deleteFunction(e) {
    return this.getApp().changeGlobal("re-draw", !0), this[$].delete(e);
  }
  executeFunction(e, ...s) {
    const n = this.getFunction(e);
    if (!n)
      throw new Error("function not found");
    n(s), this.getApp().changeGlobal("re-draw", !0);
  }
  clearFunctions() {
    this[$].clear(), this.getApp().changeGlobal("re-draw", !0);
  }
  getAttributes() {
    return [...this[M].values()];
  }
  getAttribute(e) {
    return this[M].get(e);
  }
  addAttribute(e, s) {
    this[M].set(e, s), this.getApp().changeGlobal("re-draw", !0);
  }
  hasAttribute(e) {
    return this[M].has(e);
  }
  deleteAttribute(e) {
    return this.getApp().changeGlobal("re-draw", !0), this[M].delete(e);
  }
  clearAttributes() {
    this[M].clear(), this.getApp().changeGlobal("re-draw", !0);
  }
  getMetaKeys() {
    return [...this[P].values()];
  }
  getMetaKey(e) {
    return this[P].get(e);
  }
  addMetaKey(e, s) {
    this[P].set(e, s), this.getApp().changeGlobal("re-draw", !0);
  }
  hasMetaKey(e) {
    return this[P].has(e);
  }
  deleteMetaKey(e) {
    return this.getApp().changeGlobal("re-draw", !0), this[P].delete(e);
  }
  clearMetaKeys() {
    this[P].clear(), this.getApp().changeGlobal("re-draw", !0);
  }
  emit(e, s) {
    return this._events.addEventListener(e, s);
  }
  reset(e) {
    e ? (this._options[e] = this._initial[e], this._omit.includes(e) || this.getApp().drawer.updateNode(this.deep, "property", "deep", {
      property: e,
      value: this._initial[e]
    })) : (this._options = { ...this._initial }, this.getApp().drawer.updateNode(this.deep, "properties", "deep", {
      properties: Q(this._initial, this._omit)
    })), this.getApp().changeGlobal("re-draw", !0);
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
      for (const [r, u] of Object.entries(this.properties))
        this._options[r] = u;
      this.getApp().drawer.updateNode(this.deep, "properties", "deep", {
        properties: Q(n, this._omit)
      });
    }
    this.getApp().changeGlobal("re-draw", !0);
  }
  export(e = "JSON") {
    return e === "YAML" ? Ft(this[k]()) : j.stringify(this[k]());
  }
  static import(e, s = "JSON") {
    const n = s === "YAML" ? le(e) : j.parse(e);
    return ee([n])[0];
  }
  [(Rr = z, Or = K, Wr = $, Hr = M, Tr = P, Xt)](e) {
    this._parent = e;
  }
  [bi](e) {
    this._uuid = e;
  }
  [ye](e) {
    this._index = e;
  }
  [ur](e) {
    this[$] = new Map(e);
  }
  [wi](e) {
    this[M] = new Map(e);
  }
  [or](e) {
    this[P] = new Map(e);
  }
  [Bi](e) {
    this[K] = e;
  }
  [L](e, ...s) {
    return this._events.emitEvent(e, ...s);
  }
  async [Ne]() {
    if (this.script === null)
      return;
    let e = {
      width: 0,
      height: 0
    };
    const s = this.getApp();
    s instanceof Kr ? e = s.options.game.viewport : s instanceof vi && (e = s.options.viewport);
    const n = await cr(this.script, this, e), r = Object.entries(n.$functions);
    this[$] = new Map(r);
  }
  [q](e = !0) {
    const s = [];
    if (e && this.nodes.length)
      for (const n of this.nodes)
        s.push(n[q](!0));
    return {
      __type__: this[z],
      deep: this.deep,
      index: this.index,
      nodes: s,
      uuid: this.uuid,
      options: Q(this.toObject(), this._omit)
    };
  }
  [k](e = !0) {
    const s = [];
    if (e && this.nodes.length)
      for (const n of this.nodes)
        s.push(n[k](e));
    return {
      uuid: this._uuid,
      functions: [...this[$].entries()],
      attributes: [...this[M].entries()],
      metaKeys: [...this[P].entries()],
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
var Vr;
class ue extends hs {
  constructor(e) {
    super({ ...Es, ...e });
    f(this, Vr, "primitive:2D/node");
    f(this, "_omit", [
      "centerRotation",
      "centerScale",
      "flipX",
      "flipY",
      "originX",
      "originY",
      "rotationType",
      "selectable",
      "title",
      "name",
      "lock"
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
    }), this.getApp().changeGlobal("re-draw", !0);
  }
  set selectable(e) {
    this._options.selectable = e;
  }
  set lock(e) {
    this._options.lock = e;
  }
  set cursor(e) {
    this._options.cursor = e, this.getApp().drawer.updateNode(this.deep, "property", "deep", {
      property: "cursor",
      value: e
    });
  }
  set x(e) {
    this._options.x = e, this.getApp().drawer.updateNode(this.deep, "property", "deep", {
      property: "x",
      value: e
    }), this.getApp().drawer.updateNode(this.deep, "property", "deep", {
      property: "calculate",
      value: this.processCalculate()
    }), this.getApp().changeGlobal("re-draw", !0);
  }
  set y(e) {
    this._options.y = e, this.getApp().drawer.updateNode(this.deep, "property", "deep", {
      property: "y",
      value: e
    }), this.getApp().drawer.updateNode(this.deep, "property", "deep", {
      property: "calculate",
      value: this.processCalculate()
    }), this.getApp().changeGlobal("re-draw", !0);
  }
  set width(e) {
    this._options.width = e, this.getApp().drawer.updateNode(this.deep, "property", "deep", {
      property: "width",
      value: e
    }), this.getApp().drawer.updateNode(this.deep, "property", "deep", {
      property: "calculate",
      value: this.processCalculate()
    }), this.getApp().changeGlobal("re-draw", !0);
  }
  set height(e) {
    this._options.height = e, this.getApp().drawer.updateNode(this.deep, "property", "deep", {
      property: "height",
      value: e
    }), this.getApp().drawer.updateNode(this.deep, "property", "deep", {
      property: "calculate",
      value: this.processCalculate()
    }), this.getApp().changeGlobal("re-draw", !0);
  }
  set rotationType(e) {
    this._options.rotationType = e, this.getApp().drawer.updateNode(this.deep, "property", "deep", {
      property: "calculate",
      value: this.processCalculate()
    }), this.getApp().changeGlobal("re-draw", !0);
  }
  set centerScale(e) {
    this._options.centerScale = e, this.getApp().changeGlobal("re-draw", !0);
  }
  set centerRotation(e) {
    this._options.centerRotation = e, this.getApp().changeGlobal("re-draw", !0);
  }
  set flipX(e) {
    this._options.flipX = e, this.getApp().changeGlobal("re-draw", !0);
  }
  set flipY(e) {
    this._options.flipY = e, this.getApp().changeGlobal("re-draw", !0);
  }
  set originX(e) {
    this._options.originX = e, this.getApp().changeGlobal("re-draw", !0);
  }
  set originY(e) {
    this._options.originY = e, this.getApp().changeGlobal("re-draw", !0);
  }
  set scaleX(e) {
    this._options.scaleX = e, this.getApp().drawer.updateNode(this.deep, "property", "deep", {
      property: "scaleX",
      value: e
    }), this.getApp().drawer.updateNode(this.deep, "property", "deep", {
      property: "calculate",
      value: this.processCalculate()
    }), this.getApp().changeGlobal("re-draw", !0);
  }
  set scaleY(e) {
    this._options.scaleY = e, this.getApp().drawer.updateNode(this.deep, "property", "deep", {
      property: "scaleY",
      value: e
    }), this.getApp().drawer.updateNode(this.deep, "property", "deep", {
      property: "calculate",
      value: this.processCalculate()
    }), this.getApp().changeGlobal("re-draw", !0);
  }
  set skewX(e) {
    this._options.skewX = e, this.getApp().drawer.updateNode(this.deep, "property", "deep", {
      property: "skewX",
      value: e
    }), this.getApp().changeGlobal("re-draw", !0);
  }
  set skewY(e) {
    this._options.skewY = e, this.getApp().drawer.updateNode(this.deep, "property", "deep", {
      property: "skewY",
      value: e
    }), this.getApp().changeGlobal("re-draw", !0);
  }
  set rotation(e) {
    this._options.rotation = e, this.getApp().drawer.updateNode(this.deep, "property", "deep", {
      property: "rotation",
      value: e
    }), this.getApp().drawer.updateNode(this.deep, "property", "deep", {
      property: "calculate",
      value: this.processCalculate()
    }), this.getApp().changeGlobal("re-draw", !0);
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
    this._parent && this._parent instanceof ue ? (this.x = (this._parent.width * this._parent.scaleX / 2 - this.width * this.scaleX / 2) / 2, this.y = (this._parent.height * this._parent.scaleY / 2 - this.height * this.scaleY / 2) / 2) : (this.x = this.getApp().width / 2, this.y = this.getApp().height / 2);
  }
  centerX() {
    this._parent && this._parent instanceof ue ? this.x = (this._parent.width * this._parent.scaleX / 2 - this.width * this.scaleX / 2) / 2 : this.x = (this.getApp().width / 2 - this.width * this.scaleX / 2) / 2;
  }
  centerY() {
    this._parent && this._parent instanceof ue ? this.y = (this._parent.height * this._parent.scaleY / 2 - this.height * this.scaleY / 2) / 2 : this.y = (this.getApp().height / 2 - this.height * this.scaleY / 2) / 2;
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
    return this._parent && this._parent instanceof ue ? s.translate = {
      x: this._parent.x + this.x * e,
      y: this._parent.y + this.y * e
    } : s.translate = {
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
    e ? (this._options[e] = this._initial[e], this._omit.includes(e) || this.getApp().drawer.updateNode(this.deep, "property", "deep", {
      property: e,
      value: this._initial[e]
    })) : (this._options = { ...this._initial }, this.getApp().drawer.updateNode(this.deep, "properties", "deep", {
      properties: {
        ...Q(this._initial, this._omit),
        calculate: this.processCalculate()
      }
    })), this.getApp().changeGlobal("re-draw", !0);
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
      for (const [r, u] of Object.entries(this._initial))
        this._options[r] = u;
      this.getApp().drawer.updateNode(this.deep, "properties", "deep", {
        properties: Q(n, this._omit)
      });
    }
    this.getApp().changeGlobal("re-draw", !0);
  }
  static import(e, s = "JSON") {
    const n = s === "YAML" ? le(e) : j.parse(e);
    return ee([n])[0];
  }
  [(Vr = z, q)](e = !0) {
    const s = [];
    if (e && this.nodes.length)
      for (const n of this.nodes)
        s.push(n[q](!0));
    return {
      __type__: this[z],
      deep: this.deep,
      index: this.index,
      nodes: s,
      uuid: this.uuid,
      options: {
        ...Q(this.toObject(), this._omit),
        calculate: this.processCalculate()
      }
    };
  }
  [k](e = !0) {
    const s = [];
    if (e && this.nodes.length)
      for (const n of this.nodes)
        s.push(n[k](e));
    return {
      uuid: this._uuid,
      functions: [...this[$].entries()],
      attributes: [...this[M].entries()],
      metaKeys: [...this[P].entries()],
      type: this.NODE_NAME,
      script: this.script,
      deep: this.deep,
      index: this.index,
      nodes: s,
      options: this.toObject()
    };
  }
}
var $r;
class dr extends hs {
  constructor(e) {
    super(e);
    f(this, $r, "primitive:2D/scene");
    f(this, "NODE_NAME", "Scene2D");
  }
  reset(e) {
    e ? (this._options[e] = this._initial[e], this._omit.includes(e) || this.getApp().drawer.updateNode(this.deep, "property", "deep", {
      property: e,
      value: this._initial[e]
    })) : (this._options = { ...this._initial }, this.getApp().drawer.updateNode(this.deep, "properties", "deep", {
      properties: Q(this._initial, this._omit)
    })), this.getApp().changeGlobal("re-draw", !0);
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
      for (const [r, u] of Object.entries(this.properties))
        this._options[r] = u;
      this.getApp().drawer.updateNode(this.deep, "properties", "deep", {
        properties: Q(n, this._omit)
      });
    }
    this.getApp().changeGlobal("re-draw", !0);
  }
  static import(e, s = "JSON") {
    const n = s === "YAML" ? le(e) : j.parse(e);
    return ee([n])[0];
  }
  [($r = z, q)](e = !0) {
    const s = [];
    if (e && this.nodes.length)
      for (const n of this.nodes)
        s.push(n[q](!0));
    return {
      __type__: this[z],
      deep: this.deep,
      index: this.index,
      nodes: s,
      uuid: this.uuid
    };
  }
  [k](e = !0) {
    const s = [];
    if (e && this.nodes.length)
      for (const n of this.nodes)
        s.push(n[k](e));
    return {
      uuid: this._uuid,
      functions: [...this[$].entries()],
      attributes: [...this[M].entries()],
      metaKeys: [...this[P].entries()],
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
var Mr;
class pr extends ue {
  constructor(e) {
    super({ ...Fs, ...e });
    f(this, Mr, "draw:2D/rectangle");
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
    }), this.getApp().changeGlobal("re-draw", !0);
  }
  set radius(e) {
    this._options.radius = e, this.getApp().drawer.updateNode(this.deep, "property", "deep", {
      property: "radius",
      value: e
    }), this.getApp().changeGlobal("re-draw", !0);
  }
  set border(e) {
    this._options.border = e, this.getApp().drawer.updateNode(this.deep, "property", "deep", {
      property: "border",
      value: e
    }), this.getApp().changeGlobal("re-draw", !0);
  }
  set borderColor(e) {
    this._options.borderColor = e, this.getApp().drawer.updateNode(this.deep, "property", "deep", {
      property: "borderColor",
      value: e
    }), this.getApp().changeGlobal("re-draw", !0);
  }
  set borderWidth(e) {
    this._options.borderWidth = e, this.getApp().drawer.updateNode(this.deep, "property", "deep", {
      property: "borderWidth",
      value: e
    }), this.getApp().changeGlobal("re-draw", !0);
  }
  reset(e) {
    e ? (this._options[e] = this._initial[e], this._omit.includes(e) || this.getApp().drawer.updateNode(this.deep, "property", "deep", {
      property: e,
      value: this._initial[e]
    })) : (this._options = { ...this._initial }, this.getApp().drawer.updateNode(this.deep, "properties", "deep", {
      properties: {
        ...Q(this._initial, this._omit),
        calculate: this.processCalculate()
      }
    })), this.getApp().changeGlobal("re-draw", !0);
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
      for (const [r, u] of Object.entries(this._initial))
        this._options[r] = u;
      this.getApp().drawer.updateNode(this.deep, "properties", "deep", {
        properties: Q(n, this._omit)
      });
    }
    this.getApp().changeGlobal("re-draw", !0);
  }
  static import(e, s = "JSON") {
    const n = s === "YAML" ? le(e) : j.parse(e);
    return ee([n])[0];
  }
  [(Mr = z, q)](e = !0) {
    const s = [];
    if (e && this.nodes.length)
      for (const n of this.nodes)
        s.push(n[q](!0));
    return {
      __type__: this[z],
      deep: this.deep,
      index: this.index,
      nodes: s,
      uuid: this.uuid,
      options: {
        ...Q(this.toObject(), this._omit),
        calculate: this.processCalculate()
      }
    };
  }
  [k](e = !0) {
    const s = [];
    if (e && this.nodes.length)
      for (const n of this.nodes)
        s.push(n[k](e));
    return {
      uuid: this._uuid,
      functions: [...this[$].entries()],
      attributes: [...this[M].entries()],
      metaKeys: [...this[P].entries()],
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
var Pr;
class gr extends ue {
  constructor(e) {
    super({ ...Gs, ...e });
    f(this, Pr, "draw:2D/selection");
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
    this[L]("selection2D:nodes", [...this._selectedNodes]);
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
      for (const [r, u] of Object.entries(this._initial))
        this._options[r] = u;
  }
  static import(e, s = "JSON") {
    const n = s === "YAML" ? le(e) : j.parse(e);
    return ee([n])[0];
  }
  [(Pr = z, k)](e = !0) {
    const s = [];
    if (e && this.nodes.length)
      for (const n of this.nodes)
        s.push(n[k](e));
    return {
      uuid: this._uuid,
      functions: [...this[$].entries()],
      attributes: [...this[M].entries()],
      metaKeys: [...this[P].entries()],
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
var Xr;
class fr extends ue {
  constructor(e) {
    super({ ...ks, ...e });
    f(this, Xr, "draw:2D/line-flow-effect");
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
    }), this.getApp().changeGlobal("re-draw", !0);
  }
  set lineWidth(e) {
    this._options.lineWidth = e, this.getApp().drawer.updateNode(this.deep, "property", "deep", {
      property: "lineWidth",
      value: e
    }), this.getApp().changeGlobal("re-draw", !0);
  }
  set spacing(e) {
    this._options.spacing = e, this.getApp().drawer.updateNode(this.deep, "property", "deep", {
      property: "spacing",
      value: e
    }), this.getApp().changeGlobal("re-draw", !0);
  }
  set color(e) {
    this._options.color = e, this.getApp().drawer.updateNode(this.deep, "property", "deep", {
      property: "color",
      value: e
    }), this.getApp().changeGlobal("re-draw", !0);
  }
  set radius(e) {
    this._options.radius = e, this.getApp().drawer.updateNode(this.deep, "property", "deep", {
      property: "radius",
      value: e
    }), this.getApp().changeGlobal("re-draw", !0);
  }
  reset(e) {
    e ? (this._options[e] = this._initial[e], this._omit.includes(e) || this.getApp().drawer.updateNode(this.deep, "property", "deep", {
      property: e,
      value: this._initial[e]
    })) : (this._options = { ...this._initial }, this.getApp().drawer.updateNode(this.deep, "properties", "deep", {
      properties: {
        ...Q(this._initial, this._omit),
        calculate: this.processCalculate()
      }
    })), this.getApp().changeGlobal("re-draw", !0);
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
      for (const [r, u] of Object.entries(this._initial))
        this._options[r] = u;
      this.getApp().drawer.updateNode(this.deep, "properties", "deep", {
        properties: Q(n, this._omit)
      });
    }
    this.getApp().changeGlobal("re-draw", !0);
  }
  static import(e, s = "JSON") {
    const n = s === "YAML" ? le(e) : j.parse(e);
    return ee([n])[0];
  }
  [(Xr = z, q)](e = !0) {
    const s = [];
    if (e && this.nodes.length)
      for (const n of this.nodes)
        s.push(n[q](!0));
    return {
      __type__: this[z],
      deep: this.deep,
      index: this.index,
      nodes: s,
      uuid: this.uuid,
      options: {
        ...Q(this.toObject(), this._omit),
        calculate: this.processCalculate()
      }
    };
  }
  [k](e = !0) {
    const s = [];
    if (e && this.nodes.length)
      for (const n of this.nodes)
        s.push(n[k](e));
    return {
      uuid: this._uuid,
      functions: [...this[$].entries()],
      attributes: [...this[M].entries()],
      metaKeys: [...this[P].entries()],
      type: this.NODE_NAME,
      script: this.script,
      deep: this.deep,
      index: this.index,
      nodes: s,
      options: this.toObject()
    };
  }
}
const _s = {
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
var Jr;
class Cr extends ue {
  constructor(e) {
    super({ ..._s, ...e });
    f(this, Jr, "draw:2D/text");
    f(this, "_options");
    f(this, "_initial");
    f(this, "NODE_NAME", "Text2D");
    this._initial = { ..._s, ...e }, this._options = this._initial;
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
      for (const [r, u] of Object.entries(this._initial))
        this._options[r] = u;
  }
  static import(e, s = "JSON") {
    const n = s === "YAML" ? le(e) : j.parse(e);
    return ee([n])[0];
  }
  [(Jr = z, k)](e = !0) {
    const s = [];
    if (e && this.nodes.length)
      for (const n of this.nodes)
        s.push(n[k](e));
    return {
      uuid: this._uuid,
      functions: [...this[$].entries()],
      attributes: [...this[M].entries()],
      metaKeys: [...this[P].entries()],
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
var Ur;
class Ar extends ue {
  constructor(e) {
    super({ ...Zs, ...e });
    f(this, Ur, "draw:2D/control-edition");
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
      for (const [r, u] of Object.entries(this._initial))
        this._options[r] = u;
  }
  static import(e, s = "JSON") {
    const n = s === "YAML" ? le(e) : j.parse(e);
    return ee([n])[0];
  }
  [(Ur = z, k)](e = !0) {
    const s = [];
    if (e && this.nodes.length)
      for (const n of this.nodes)
        s.push(n[k](e));
    return {
      uuid: this._uuid,
      functions: [...this[$].entries()],
      attributes: [...this[M].entries()],
      metaKeys: [...this[P].entries()],
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
const mr = {
  PrimitiveNode: hs,
  Node2D: ue,
  Scene2D: dr,
  Rectangle2D: pr,
  Selection2D: gr,
  LineFlowEffect2D: fr,
  Text2D: Cr,
  ControlEdition2D: Ar
}, ee = (i, t) => {
  const e = [];
  for (const s of i) {
    const n = new mr[s.type](s.options);
    t && n[Xt](t), n.script = s.script, n[bi](s.uuid), n[ye](s.index), n[wi](s.attributes), n[Bi](
      ee(s.nodes, n)
    ), e.push(n);
  }
  return e;
};
class Si {
  constructor(t) {
    f(this, "$app");
    f(this, "_scenes", /* @__PURE__ */ new Map());
    f(this, "_scene");
    f(this, "_events", new Fe());
    this.$app = t, At[Ks](this.$app);
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
      this._scenes.set(e.uuid, e);
    this[L]("scene:add", t);
  }
  delete(t) {
    var e;
    this._scenes.delete(t), t === ((e = this.currentScene) == null ? void 0 : e.uuid) && (this._scene = void 0), this[L]("scene:delete", t);
  }
  change(t) {
    this._scene = this.get(t), this[L]("scene:change", t);
  }
  reset(t = this._scene) {
    if (t && (t.reset(), t.nodes.length > 0))
      for (const e of t.nodes)
        this.reset(e);
  }
  getScenes() {
    return [...this._scenes.values()];
  }
  export(t = "JSON") {
    return this[L]("scene:export"), t === "YAML" ? Ft(this[k]()) : j.stringify(this[k]());
  }
  import(t, e = "JSON") {
    this[L]("scene:import");
    const s = e === "YAML" ? le(t) : j.parse(t), n = ee(s).map((r) => [
      r.uuid,
      r
    ]);
    this._scenes = new Map(n);
  }
  emit(t, e) {
    this._events.addEventListener(t, e);
  }
  [L](t, ...e) {
    this._events.emitEvent(t, e);
  }
  [k]() {
    const t = [];
    for (const e of this.getScenes())
      t.push(e[k]());
    return t;
  }
}
class Ei {
}
class Ir extends Ei {
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
class Dr extends Ei {
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
class Fi {
  constructor(t) {
    f(this, "$app");
    f(this, "_canvas", /* @__PURE__ */ new Map());
    f(this, "_main");
    f(this, "_event");
    this.$app = t;
    const { width: e, height: s } = this.processSize();
    this.$app.mode === "editor" && this._canvas.set(
      "editor",
      new Ir({
        width: e,
        height: s
      })
    ), this.$app.mode === "game" && this._canvas.set(
      "game",
      new Dr({
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
function yr(i, t) {
  return i.x + i.width > t.x && i.x < t.x + t.width && i.y + i.height > t.y && i.y < t.y + t.height;
}
function br(i, t, e, s) {
  e = e ?? { x: 0, y: 0 }, s = s ?? 1;
  const n = t.width / s, r = t.height / s, u = -e.x, o = -e.y, a = u + n, l = o + r;
  return i.x + i.width * i.scaleX / 2 > u && i.x - i.width * i.scaleX / 2 < a && i.y + i.height * i.scaleY / 2 > o && i.y - i.height * i.scaleY / 2 < l;
}
class Gi {
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
    const s = this.$app, n = s.useGlobal("mode") === "preview", r = s.use("@config/pan-and-zoom"), u = (r == null ? void 0 : r.pan) ?? { x: 0, y: 0 }, o = (r == null ? void 0 : r.zoom) ?? 1, a = t.getFunction("_draw"), l = t.getFunction("_process");
    if (t && (t != null && t.visible) && n && l && await l(e), br(
      t,
      {
        height: s.options.width,
        width: s.options.height
      },
      u,
      o
    ) && t && t[z].startsWith("draw:2D") && n && a && await a(), t.nodes.length > 0)
      for (const g of t.nodes)
        await this.executeFunctionScriptEditor(g, e);
  }
  async executeFunctionScriptGame(t, e) {
    const s = this.$app, n = t.getFunction("_draw"), r = t.getFunction("_process");
    if (t && (t != null && t.visible) && r && await r(e), yr(t, {
      x: 0,
      y: 0,
      height: s.options.viewport.height,
      width: s.options.viewport.width
    }) && t && t[z].startsWith("draw:2D") && n && await n(), t.nodes.length > 0)
      for (const u of t.nodes)
        await this.executeFunctionScriptGame(u, e);
  }
  async [Ne](t = this.root_node) {
    if (this[L]("script:execute"), t[Ne](), t.nodes.length > 0)
      for (const e of t.nodes)
        await this[Ne](e);
  }
  export(t = "JSON") {
    return this[L]("script:export"), t === "YAML" ? Ft(this[k]()) : j.stringify(this[k]());
  }
  import(t, e = "JSON") {
    this[L]("script:import");
  }
  emit(t, e) {
    this._events.addEventListener(t, e);
  }
  [Jt](t) {
    this.root_node = t;
  }
  [L](t, ...e) {
    this._events.emitEvent(t, e);
  }
  [k]() {
    return [];
  }
}
const ki = "dmFyIGIgPSBPYmplY3QuZGVmaW5lUHJvcGVydHk7CnZhciBEID0gKGUsIGEsIHIpID0+IGEgaW4gZSA/IGIoZSwgYSwgeyBlbnVtZXJhYmxlOiAhMCwgY29uZmlndXJhYmxlOiAhMCwgd3JpdGFibGU6ICEwLCB2YWx1ZTogciB9KSA6IGVbYV0gPSByOwp2YXIgbCA9IChlLCBhLCByKSA9PiAoRChlLCB0eXBlb2YgYSAhPSAic3ltYm9sIiA/IGEgKyAiIiA6IGEsIHIpLCByKTsKY29uc3QgeiA9IChlLCBhLCByKSA9PiB7CiAgaWYgKGUuaW5kZXhPZigibGluZWFyLWdyYWRpZW50IikgIT09IC0xKSB7CiAgICBjb25zdCB0ID0gZS5yZXBsYWNlKCJsaW5lYXItZ3JhZGllbnQoIiwgIiIpLnNsaWNlKDAsIC0xKS5zcGxpdCgiLCIpLCBpID0gYS5jcmVhdGVMaW5lYXJHcmFkaWVudCgKICAgICAgMCwKICAgICAgMCwKICAgICAgci53aWR0aCwKICAgICAgci5oZWlnaHQKICAgICk7CiAgICByZXR1cm4gdC5mb3JFYWNoKChoKSA9PiB7CiAgICAgIGNvbnN0IGMgPSBoLnRyaW0oKS5zcGxpdCgiICIpOwogICAgICBpLmFkZENvbG9yU3RvcChOdW1iZXIoY1swXSksIGNbMV0pOwogICAgfSksIGk7CiAgfSBlbHNlCiAgICByZXR1cm4gZTsKfSwgZyA9IChlKSA9PiB7CiAgZS5jbGVhclJlY3QoMCwgMCwgZS5jYW52YXMud2lkdGgsIGUuY2FudmFzLmhlaWdodCk7Cn0sIHYgPSAoZSkgPT4gewogIGUuc2F2ZSgpOwp9LCBQID0gKGUpID0+IHsKICBlLnJlc3RvcmUoKTsKfSwgRiA9IChlLCBhKSA9PiB7CiAgZS50cmFuc2xhdGUoYS54LCBhLnkpOwp9LCBSID0gKGUsIGEpID0+IHsKICBlLnNjYWxlKGEsIGEpOwp9LCBXID0gKGUsIGEpID0+IHsKICBjb25zdCB7IGNhbGN1bGF0ZTogciB9ID0gYTsKICBlLnRyYW5zbGF0ZShyLnRyYW5zbGF0ZS54LCByLnRyYW5zbGF0ZS55KSwgZS5yb3RhdGUoci5yb3RhdGlvbiksIGUuZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uID0gImRlc3RpbmF0aW9uLW92ZXIiLCBlLnN0cm9rZVN0eWxlID0gYS5ib3JkZXJDb2xvciwgZS5saW5lV2lkdGggPSBhLmJvcmRlcldpZHRoOwogIGNvbnN0IHQgPSByLnNjYWxlRmFjdG9yLndpZHRoICsgYS5wYWRkaW5nICogMiwgaSA9IHIuc2NhbGVGYWN0b3IuaGVpZ2h0ICsgYS5wYWRkaW5nICogMjsKICBlLmJlZ2luUGF0aCgpLCBlLnN0cm9rZVJlY3QoCiAgICAtdCAvIDIsCiAgICAtaSAvIDIsCiAgICB0LAogICAgaQogICksIGEuc2hvd0Nvcm5lciAmJiAoZS5maWxsU3R5bGUgPSBhLmNvcm5lckNvbG9yLCBlLmJlZ2luUGF0aCgpLCBlLmFyYygKICAgIC10IC8gMiwKICAgIC1pIC8gMiwKICAgIGEuY29ybmVyU2l6ZSwKICAgIDAsCiAgICAyICogTWF0aC5QSQogICksIGUuZmlsbCgpLCBlLmJlZ2luUGF0aCgpLCBlLmFyYygwLCAtaSAvIDIsIGEuY29ybmVyU2l6ZSwgMCwgMiAqIE1hdGguUEkpLCBlLmZpbGwoKSwgZS5iZWdpblBhdGgoKSwgZS5hcmMoCiAgICB0IC8gMiwKICAgIC1pIC8gMiwKICAgIGEuY29ybmVyU2l6ZSwKICAgIDAsCiAgICAyICogTWF0aC5QSQogICksIGUuZmlsbCgpLCBlLmJlZ2luUGF0aCgpLCBlLmFyYygtdCAvIDIsIDAsIGEuY29ybmVyU2l6ZSwgMCwgMiAqIE1hdGguUEkpLCBlLmZpbGwoKSwgZS5iZWdpblBhdGgoKSwgZS5hcmModCAvIDIsIDAsIGEuY29ybmVyU2l6ZSwgMCwgMiAqIE1hdGguUEkpLCBlLmZpbGwoKSwgZS5iZWdpblBhdGgoKSwgZS5hcmMoCiAgICAtdCAvIDIsCiAgICBpIC8gMiwKICAgIGEuY29ybmVyU2l6ZSwKICAgIDAsCiAgICAyICogTWF0aC5QSQogICksIGUuZmlsbCgpLCBlLmJlZ2luUGF0aCgpLCBlLmFyYygwLCBpIC8gMiwgYS5jb3JuZXJTaXplLCAwLCAyICogTWF0aC5QSSksIGUuZmlsbCgpLCBlLmJlZ2luUGF0aCgpLCBlLmFyYygKICAgIHQgLyAyLAogICAgaSAvIDIsCiAgICBhLmNvcm5lclNpemUsCiAgICAwLAogICAgMiAqIE1hdGguUEkKICApLCBlLmZpbGwoKSksIGUuY2xvc2VQYXRoKCk7Cn0sIE0gPSAoZSwgYSkgPT4gewogIGNvbnN0IHsgY2FsY3VsYXRlOiByIH0gPSBhOwogIGUudHJhbnNsYXRlKHIudHJhbnNsYXRlLngsIHIudHJhbnNsYXRlLnkpLCBlLnJvdGF0ZShyLnJvdGF0aW9uKSwgZS5saW5lV2lkdGggPSBhLmxpbmVXaWR0aCwgZS5zdHJva2VTdHlsZSA9IHooYS5jb2xvciwgZSwgewogICAgd2lkdGg6IGEud2lkdGgsCiAgICBoZWlnaHQ6IGEuaGVpZ2h0CiAgfSk7CiAgZm9yIChsZXQgdCA9IDA7IHQgPCBhLmhlaWdodDsgdCArPSBhLmNlbGxTaXplKQogICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhLndpZHRoOyBpICs9IGEuY2VsbFNpemUpIHsKICAgICAgY29uc3QgaCA9IChNYXRoLmNvcyhpICogMC4wMSkgKyBNYXRoLnNpbih0ICogMC4wMSkpICogYS5yYWRpdXM7CiAgICAgIGUuYmVnaW5QYXRoKCksIGUubW92ZVRvKGksIHQpLCBlLmxpbmVUbygKICAgICAgICBpICsgTWF0aC5jb3MoaCkgKiBhLnNwYWNpbmcsCiAgICAgICAgdCArIE1hdGguc2luKGgpICogYS5zcGFjaW5nCiAgICAgICksIGUuc3Ryb2tlKCk7CiAgICB9Cn0sIEMgPSAoZSwgYSkgPT4gewogIGNvbnN0IHsgY2FsY3VsYXRlOiByIH0gPSBhOwogIGUuc2F2ZSgpLCBlLnRyYW5zbGF0ZShyLnRyYW5zbGF0ZS54LCByLnRyYW5zbGF0ZS55KSwgci5yb3RhdGlvbiA9PT0gMCAmJiBlLnJvdGF0ZShyLnJvdGF0aW9uKSwgZS5maWxsU3R5bGUgPSBhLmJhY2tncm91bmQsIGEuYm9yZGVyICYmIChlLnN0cm9rZVN0eWxlID0gYS5ib3JkZXJDb2xvciksIGEuYm9yZGVyICYmIChlLmxpbmVXaWR0aCA9IGEuYm9yZGVyV2lkdGgpLCBlLmJlZ2luUGF0aCgpLCBhLnJhZGl1cyA/IHR5cGVvZiBhLnJhZGl1cyA9PSAibnVtYmVyIiB8fCBBcnJheS5pc0FycmF5KGEucmFkaXVzKSA/IGUucm91bmRSZWN0KAogICAgLXIubWlkZGxlU2NhbGVGYWN0b3Iud2lkdGgsCiAgICAtci5taWRkbGVTY2FsZUZhY3Rvci5oZWlnaHQsCiAgICByLnNjYWxlRmFjdG9yLndpZHRoLAogICAgci5zY2FsZUZhY3Rvci5oZWlnaHQsCiAgICBhLnJhZGl1cwogICkgOiBlLnJvdW5kUmVjdCgKICAgIC1yLm1pZGRsZVNjYWxlRmFjdG9yLndpZHRoLAogICAgLXIubWlkZGxlU2NhbGVGYWN0b3IuaGVpZ2h0LAogICAgci5zY2FsZUZhY3Rvci53aWR0aCwKICAgIHIuc2NhbGVGYWN0b3IuaGVpZ2h0LAogICAgWwogICAgICBhLnJhZGl1cy50b3BMZWZ0LAogICAgICBhLnJhZGl1cy50b3BSaWdodCwKICAgICAgYS5yYWRpdXMuYm90dG9tTGVmdCwKICAgICAgYS5yYWRpdXMudG9wUmlnaHQKICAgIF0KICApIDogZS5yZWN0KAogICAgLXIubWlkZGxlU2NhbGVGYWN0b3Iud2lkdGgsCiAgICAtci5taWRkbGVTY2FsZUZhY3Rvci5oZWlnaHQsCiAgICByLnNjYWxlRmFjdG9yLndpZHRoLAogICAgci5zY2FsZUZhY3Rvci5oZWlnaHQKICApLCBlLmZpbGwoKSwgYS5ib3JkZXIgJiYgZS5zdHJva2UoKSwgZS5jbG9zZVBhdGgoKSwgZS5yZXN0b3JlKCk7Cn0sIEkgPSAoZSwgYSkgPT4gewogIGUuc2F2ZSgpLCBlLmZpbGxTdHlsZSA9IGEuYmFja2dyb3VuZCwgYS5ib3JkZXIgJiYgKGUuc3Ryb2tlU3R5bGUgPSBhLmJvcmRlckNvbG9yKSwgYS5ib3JkZXIgJiYgKGUubGluZVdpZHRoID0gYS5ib3JkZXJXaWR0aCksIGUuYmVnaW5QYXRoKCksIGEucmFkaXVzID8gdHlwZW9mIGEucmFkaXVzID09ICJudW1iZXIiIHx8IEFycmF5LmlzQXJyYXkoYS5yYWRpdXMpID8gZS5yb3VuZFJlY3QoCiAgICBhLngsCiAgICBhLnksCiAgICBhLndpZHRoLAogICAgYS5oZWlnaHQsCiAgICBhLnJhZGl1cwogICkgOiBlLnJvdW5kUmVjdChhLngsIGEueSwgYS53aWR0aCwgYS5oZWlnaHQsIFsKICAgIGEucmFkaXVzLnRvcExlZnQsCiAgICBhLnJhZGl1cy50b3BSaWdodCwKICAgIGEucmFkaXVzLmJvdHRvbUxlZnQsCiAgICBhLnJhZGl1cy50b3BSaWdodAogIF0pIDogZS5yZWN0KGEueCwgYS55LCBhLndpZHRoLCBhLmhlaWdodCksIGUuZmlsbCgpLCBhLmJvcmRlciAmJiBlLnN0cm9rZSgpLCBlLmNsb3NlUGF0aCgpLCBlLnJlc3RvcmUoKTsKfSwgViA9IChlLCBhKSA9PiB7CiAgY29uc3QgeyBjYWxjdWxhdGU6IHIgfSA9IGE7CiAgZS50cmFuc2xhdGUoci50cmFuc2xhdGUueCwgci50cmFuc2xhdGUueSksIGUucm90YXRlKHIucm90YXRpb24pLCBlLmZpbGxTdHlsZSA9IGEuY29sb3IsIGUuZm9udCA9IGAke2EuZm9udFN0cmV0Y2ggPyBhLmZvbnRTdHJldGNoICsgIiAiIDogIiJ9JHthLmZvbnRWYXJpYW50ID8gYS5mb250VmFyaWFudCArICIgIiA6ICIifSR7YS5mb250U3R5bGUgPyBhLmZvbnRTdHlsZSArICIgIiA6ICIifSR7YS5mb250V2VpZ2h0ID8gYS5mb250V2VpZ2h0ICsgIiAiIDogIiJ9JHthLmZvbnRTaXplID8gYS5mb250U2l6ZSA6ICIifSR7YS5saW5lSGVpZ2h0ID8gIi8iICsgYS5saW5lSGVpZ2h0ICsgIiAiIDogIiJ9JHthLmZvbnRGYW1pbHkgPyBhLmZvbnRGYW1pbHkgOiAiIn1gLCBlLnRleHRBbGlnbiA9IGEudGV4dEFsaWduLCBlLnRleHRCYXNlbGluZSA9IGEudGV4dEJhc2VsaW5lLCBlLmRpcmVjdGlvbiA9IGEudGV4dERpcmVjdGlvbiwgZS53b3JkU3BhY2luZyA9IGEud29yZFNwYWNpbmcsIGUubGV0dGVyU3BhY2luZyA9IGEubGV0dGVyU3BhY2luZywgYS5ib3JkZXIgJiYgKGUuc3Ryb2tlU3R5bGUgPSBhLmJvcmRlckNvbG9yKSwgYS5ib3JkZXIgJiYgKGUubGluZVdpZHRoID0gYS5ib3JkZXJXaWR0aCksIGEuYm9yZGVyID8gZS5zdHJva2VUZXh0KGEudGV4dCwgYS54LCBhLnkpIDogZS5maWxsVGV4dChhLnRleHQsIGEueCwgYS55KTsKfSwgZCA9IChlLCBhLCByKSA9PiB7CiAgY29uc3QgaSA9IHsKICAgICJkcmF3OjJEL3JlY3RhbmdsZSI6IEMsCiAgICAiZHJhdzoyRC90ZXh0IjogViwKICAgICJkcmF3OjJEL3NlbGVjdGlvbiI6IEksCiAgICAiZHJhdzoyRC9saW5lLWZsb3ctZWZmZWN0IjogTSwKICAgICJkcmF3OjJEL2NvbnRyb2wtZWRpdGlvbiI6IFcsCiAgICAiY2FudmFzOmNsZWFyIjogZywKICAgICJjYW52YXM6cm90YXRpb24iOiBnLAogICAgImNhbnZhczpzY2FsZSI6IFIsCiAgICAiY2FudmFzOnRyYW5zbGF0ZSI6IEYsCiAgICAiY2FudmFzOnNhdmUiOiB2LAogICAgImNhbnZhczpyZXN0b3JlIjogUAogIH1bZV07CiAgaSAmJiBpKHIsIGEpOwp9OwpmdW5jdGlvbiBrKGUsIGEpIHsKICByZXR1cm4gZS54ICsgZS53aWR0aCA+IGEueCAmJiBlLnggPCBhLnggKyBhLndpZHRoICYmIGUueSArIGUuaGVpZ2h0ID4gYS55ICYmIGUueSA8IGEueSArIGEuaGVpZ2h0Owp9CmZ1bmN0aW9uIEEoZSwgYSwgciwgdCkgewogIHIgPSByID8/IHsgeDogMCwgeTogMCB9LCB0ID0gdCA/PyAxOwogIGNvbnN0IGkgPSBhLndpZHRoIC8gdCwgaCA9IGEuaGVpZ2h0IC8gdCwgYyA9IC1yLngsIGYgPSAtci55LCBfID0gYyArIGksIHkgPSBmICsgaDsKICByZXR1cm4gZS54ICsgZS53aWR0aCAqIGUuc2NhbGVYIC8gMiA+IGMgJiYgZS54IC0gZS53aWR0aCAqIGUuc2NhbGVYIC8gMiA8IF8gJiYgZS55ICsgZS5oZWlnaHQgKiBlLnNjYWxlWSAvIDIgPiBmICYmIGUueSAtIGUuaGVpZ2h0ICogZS5zY2FsZVkgLyAyIDwgeTsKfQpjbGFzcyBFIHsKfQpjbGFzcyBHIGV4dGVuZHMgRSB7CiAgY29uc3RydWN0b3IociwgdCwgaSkgewogICAgc3VwZXIoKTsKICAgIGwodGhpcywgIm5vZGUiLCB7fSk7CiAgICBsKHRoaXMsICJtb2RlIik7CiAgICBsKHRoaXMsICJhZnRlckRyYXciLCBbXSk7CiAgICBsKHRoaXMsICJiZWZvcmVEcmF3IiwgW10pOwogICAgbCh0aGlzLCAic2NhbGVWaWV3cG9ydCIsIDEpOwogICAgbCh0aGlzLCAiZ2FtZVNpemUiLCB7CiAgICAgIGhlaWdodDogMCwKICAgICAgd2lkdGg6IDAKICAgIH0pOwogICAgbCh0aGlzLCAiZWRpdG9yU2l6ZSIsIHsKICAgICAgaGVpZ2h0OiAwLAogICAgICB3aWR0aDogMAogICAgfSk7CiAgICBsKHRoaXMsICJjb25maWdzIik7CiAgICBsKHRoaXMsICJjb250ZXh0Iik7CiAgICB0aGlzLmNvbnRleHQgPSByLCB0aGlzLmNvbmZpZ3MgPSB0LCB0aGlzLm1vZGUgPSBpOwogIH0KICBzZXRTY2FsZVZpZXdwb3J0KHIpIHsKICAgIHRoaXMuc2NhbGVWaWV3cG9ydCA9IHI7CiAgfQogIHNldEdhbWVTaXplKHIpIHsKICAgIHRoaXMuZ2FtZVNpemUgPSByOwogIH0KICBzZXRFZGl0b3JTaXplKHIpIHsKICAgIHRoaXMuZWRpdG9yU2l6ZSA9IHI7CiAgfQogIHNldEFmdGVyRHJhdyhyKSB7CiAgICB0aGlzLmFmdGVyRHJhdyA9IHI7CiAgfQogIHNldEJlZm9yZURyYXcocikgewogICAgdGhpcy5iZWZvcmVEcmF3ID0gcjsKICB9CiAgbG9hZE5vZGUocikgewogICAgdGhpcy5ub2RlID0gcjsKICB9CiAgY2xlYXIoKSB7CiAgICB0aGlzLmNvbnRleHQuY2xlYXJSZWN0KAogICAgICAwLAogICAgICAwLAogICAgICB0aGlzLmNvbnRleHQuY2FudmFzLndpZHRoLAogICAgICB0aGlzLmNvbnRleHQuY2FudmFzLmhlaWdodAogICAgKTsKICB9CiAgZHJhdygpIHsKICAgIGlmICh0aGlzLm1vZGUgPT09ICJlZGl0b3IiICYmIHRoaXMuYmVmb3JlRHJhdy5sZW5ndGgpCiAgICAgIGZvciAoY29uc3QgciBvZiB0aGlzLmJlZm9yZURyYXcpCiAgICAgICAgZChyLl9fdHlwZV9fLCByLm9wdGlvbnMsIHRoaXMuY29udGV4dCk7CiAgICBpZiAodGhpcy5tb2RlID09PSAiZWRpdG9yIiAmJiB0aGlzLm5vZGUgJiYgdGhpcy5leGVjdXRlRHJhd0VkaXRvcih0aGlzLm5vZGUpLCB0aGlzLm1vZGUgPT09ICJnYW1lIiAmJiB0aGlzLm5vZGUgJiYgdGhpcy5leGVjdXRlRHJhd0dhbWUodGhpcy5ub2RlKSwgdGhpcy5tb2RlID09PSAiZWRpdG9yIiAmJiB0aGlzLmFmdGVyRHJhdy5sZW5ndGggPiAwKQogICAgICBmb3IgKGNvbnN0IHIgb2YgdGhpcy5hZnRlckRyYXcpCiAgICAgICAgZChyLl9fdHlwZV9fLCByLm9wdGlvbnMsIHRoaXMuY29udGV4dCk7CiAgfQogIGV4ZWN1dGVEcmF3RWRpdG9yKHIpIHsKICAgIGlmIChyICYmIHIuX190eXBlX18gPT09ICJwcmltaXRpdmU6MkQvc2NlbmUiICYmIHIubm9kZXMubGVuZ3RoID4gMCkKICAgICAgZm9yIChjb25zdCB0IG9mIHIubm9kZXMpCiAgICAgICAgdGhpcy5leGVjdXRlRHJhd0VkaXRvcih0KTsKICAgIGlmIChyICYmIHIub3B0aW9ucyAmJiByLm9wdGlvbnMudmlzaWJsZSAmJiByLl9fdHlwZV9fLnN0YXJ0c1dpdGgoImRyYXc6MkQiKSkgewogICAgICBjb25zdCB0ID0gdGhpcy5jb25maWdzLnBhbiA/PyB7IHg6IDAsIHk6IDAgfSwgaSA9IHRoaXMuY29uZmlncy56b29tID8/IDE7CiAgICAgIGlmIChBKAogICAgICAgIHIub3B0aW9ucywKICAgICAgICB7CiAgICAgICAgICBoZWlnaHQ6IHRoaXMuZWRpdG9yU2l6ZS5oZWlnaHQsCiAgICAgICAgICB3aWR0aDogdGhpcy5lZGl0b3JTaXplLndpZHRoCiAgICAgICAgfSwKICAgICAgICB0LAogICAgICAgIGkKICAgICAgKSAmJiAoZChyLl9fdHlwZV9fLCByLm9wdGlvbnMsIHRoaXMuY29udGV4dCksIHIubm9kZXMubGVuZ3RoID4gMCkpIHsKICAgICAgICB0aGlzLmNvbnRleHQuc2F2ZSgpLCB0aGlzLmNvbnRleHQudHJhbnNsYXRlKHIub3B0aW9ucy54LCByLm9wdGlvbnMueSksIHRoaXMuY29udGV4dC5zY2FsZShyLm9wdGlvbnMuc2NhbGVYLCByLm9wdGlvbnMuc2NhbGVZKTsKICAgICAgICBmb3IgKGNvbnN0IGggb2Ygci5ub2RlcykKICAgICAgICAgIHRoaXMuZXhlY3V0ZURyYXdFZGl0b3IoaCk7CiAgICAgICAgdGhpcy5jb250ZXh0LnJlc3RvcmUoKTsKICAgICAgfQogICAgfQogIH0KICBleGVjdXRlRHJhd0dhbWUocikgewogICAgaWYgKHIgJiYgci5fX3R5cGVfXyA9PT0gInByaW1pdGl2ZToyRC9zY2VuZSIpCiAgICAgIGZvciAoY29uc3QgdCBvZiByLm5vZGVzKQogICAgICAgIHRoaXMuZXhlY3V0ZURyYXdHYW1lKHQpOwogICAgaWYgKHIgJiYgci5vcHRpb25zICYmIHIub3B0aW9ucy52aXNpYmxlICYmIHIuX190eXBlX18uc3RhcnRzV2l0aCgiZHJhdzoyRCIpICYmIGsoci5vcHRpb25zLCB7CiAgICAgIHg6IDAsCiAgICAgIHk6IDAsCiAgICAgIGhlaWdodDogdGhpcy5nYW1lU2l6ZS5oZWlnaHQsCiAgICAgIHdpZHRoOiB0aGlzLmdhbWVTaXplLndpZHRoCiAgICB9KSAmJiAoZChyLl9fdHlwZV9fLCByLm9wdGlvbnMsIHRoaXMuY29udGV4dCksIHIubm9kZXMubGVuZ3RoID4gMCkpIHsKICAgICAgdGhpcy5jb250ZXh0LnNhdmUoKSwgdGhpcy5jb250ZXh0LnRyYW5zbGF0ZSgKICAgICAgICByLm9wdGlvbnMueCAqIHRoaXMuc2NhbGVWaWV3cG9ydCwKICAgICAgICByLm9wdGlvbnMueSAqIHRoaXMuc2NhbGVWaWV3cG9ydAogICAgICApLCB0aGlzLmNvbnRleHQuc2NhbGUoCiAgICAgICAgci5vcHRpb25zLnNjYWxlWCAqIHRoaXMuc2NhbGVWaWV3cG9ydCwKICAgICAgICByLm9wdGlvbnMuc2NhbGVZICogdGhpcy5zY2FsZVZpZXdwb3J0CiAgICAgICk7CiAgICAgIGZvciAoY29uc3QgdCBvZiByLm5vZGVzKQogICAgICAgIHRoaXMuZXhlY3V0ZURyYXdHYW1lKHQpOwogICAgICB0aGlzLmNvbnRleHQucmVzdG9yZSgpOwogICAgfQogIH0KfQpjb25zdCBzID0gewogIGRpbWVuc2lvbjogdm9pZCAwLAogIG1vZGU6IHZvaWQgMCwKICBjb250ZXh0OiB2b2lkIDAsCiAgY2FudmFzOiB2b2lkIDAsCiAgZHJhd2VyOiB2b2lkIDAKfTsKbGV0IHcgPSAxLCBuID0gewogIHdpZHRoOiAwLAogIGhlaWdodDogMAp9LCBtID0gewogIHdpZHRoOiAwLAogIGhlaWdodDogMAp9LCB1ID0gW10sIG8gPSBbXSwgUyA9IHt9Owpjb25zdCAkID0gKHsKICBjb250ZXh0OiBlLAogIG1vZGU6IGEsCiAgZGltZW5zaW9uOiByLAogIHdpZHRoOiB0LAogIGhlaWdodDogaQp9KSA9PiB7CiAgcy5tb2RlID0gYSwgcy5kaW1lbnNpb24gPSByLCBzLmNvbnRleHQgPSBlLCBzLmNhbnZhcyA9IG5ldyBPZmZzY3JlZW5DYW52YXModCwgaSksIHMuZHJhd2VyID0gcy5jYW52YXMuZ2V0Q29udGV4dCgKICAgIHMuY29udGV4dC5yZXBsYWNlKCItIiwgIiIpCiAgKTsKfSwgQiA9ICh7IHdpZHRoOiBlLCBoZWlnaHQ6IGEgfSkgPT4gewogIHMuY2FudmFzLndpZHRoID0gZSwgcy5jYW52YXMuaGVpZ2h0ID0gYTsKfSwgWCA9IChlKSA9PiB7CiAgaWYgKCFlIHx8ICFzLmNvbnRleHQgfHwgIXMuY2FudmFzIHx8ICFzLmRyYXdlcikKICAgIHJldHVybjsKICBjb25zdCByID0gewogICAgIjJkIjogbmV3IEcoCiAgICAgIHMuZHJhd2VyLAogICAgICBTLAogICAgICBzLm1vZGUKICAgICkKICB9W3MuY29udGV4dF07CiAgaWYgKHIpIHsKICAgIHMubW9kZSA9PT0gImVkaXRvciIgJiYgci5zZXRFZGl0b3JTaXplKG0pLCBzLm1vZGUgPT09ICJnYW1lIiAmJiAoci5zZXRHYW1lU2l6ZShuKSwgci5zZXRTY2FsZVZpZXdwb3J0KHcpKSwgci5zZXRBZnRlckRyYXcobyksIHIuc2V0QmVmb3JlRHJhdyh1KSwgci5sb2FkTm9kZShlWzBdKSwgci5jbGVhcigpLCByLmRyYXcoKTsKICAgIGNvbnN0IHQgPSBzLmNhbnZhcy50cmFuc2ZlclRvSW1hZ2VCaXRtYXAoKTsKICAgIHNlbGYucG9zdE1lc3NhZ2UoeyBpbWFnZUJpdE1hcDogdCB9LCBbdF0pOwogIH0KfTsKc2VsZi5vbm1lc3NhZ2UgPSBmdW5jdGlvbihlKSB7CiAgZS5kYXRhLmFjdGlvbiA9PT0gImxvYWQ6cmVuZGVyZWQiID8gJChlLmRhdGEub3B0aW9ucykgOiBlLmRhdGEuYWN0aW9uID09PSAicmVzaXplOmRyYXdlciIgPyBCKGUuZGF0YS5vcHRpb25zKSA6IGUuZGF0YS5hY3Rpb24gPT09ICJzZXQ6YWZ0ZXItZHJhdyIgPyBvID0gZS5kYXRhLmxpc3QgOiBlLmRhdGEuYWN0aW9uID09PSAic2V0OmJlZm9yZS1kcmF3IiA/IHUgPSBlLmRhdGEubGlzdCA6IGUuZGF0YS5hY3Rpb24gPT09ICJzZXQ6c2l6ZS1lZGl0b3IiID8gbSA9IGUuZGF0YS5zaXplIDogZS5kYXRhLmFjdGlvbiA9PT0gInNldDp2aWV3cG9ydC1nYW1lIiA/IG4gPSBlLmRhdGEudmlld3BvcnQgOiBlLmRhdGEuYWN0aW9uID09PSAic2V0OnNjYWxlLXZpZXdwb3J0IiA/IHcgPSBlLmRhdGEuc2NhbGVWaWV3cG9ydCA6IGUuZGF0YS5hY3Rpb24gPT09ICJzZXQ6YW5pbWF0aW9uIiA/IGUuZGF0YS5hbmltYXRpb24gOiBlLmRhdGEuYWN0aW9uID09PSAic2V0OmZyYW1lIiA/IGUuZGF0YS5jb250cm9sIDogZS5kYXRhLmFjdGlvbiA9PT0gInNldDpjb25maWdzIiA/IFMgPSBlLmRhdGEuY29uZmlncyA6IGUuZGF0YS5hY3Rpb24gPT09ICJyZW5kZXIiICYmIFgoZS5kYXRhLnJvb3QpOwp9Owo=", wr = (i) => Uint8Array.from(atob(i), (t) => t.charCodeAt(0)), Ls = typeof window < "u" && window.Blob && new Blob(["URL.revokeObjectURL(import.meta.url);", wr(ki)], { type: "text/javascript;charset=utf-8" });
function Br(i) {
  let t;
  try {
    if (t = Ls && (window.URL || window.webkitURL).createObjectURL(Ls), !t)
      throw "";
    const e = new Worker(t, {
      type: "module",
      name: i == null ? void 0 : i.name
    });
    return e.addEventListener("error", () => {
      (window.URL || window.webkitURL).revokeObjectURL(t);
    }), e;
  } catch {
    return new Worker(
      "data:text/javascript;base64," + ki,
      {
        type: "module",
        name: i == null ? void 0 : i.name
      }
    );
  }
}
const _i = "ZnVuY3Rpb24gXyhlLCBpLCB0ID0gInV1aWQiKSB7CiAgcmV0dXJuIHQgPT09ICJkZWVwIiA/IE4oZSwgaSkubm9kZXMgOiB0ID09PSAiaW5kZXgiID8gZVtpXS5ub2RlcyA6IGUuZmluZCgobykgPT4gby51dWlkID09IGkpLm5vZGVzOwp9CmZ1bmN0aW9uIHkoZSwgaSwgdCwgbyA9ICJ1dWlkIiwgbiA9ICJhZnRlciIpIHsKICBpZiAoaSAhPT0gdm9pZCAwICYmIHQgPT09IHZvaWQgMCkKICAgIG4gPT09ICJiZWZvcmUiID8gZS51bnNoaWZ0KGkpIDogZS5wdXNoKGkpOwogIGVsc2UgaWYgKGkgIT09IHZvaWQgMCAmJiB0ICE9PSB2b2lkIDAgJiYgKG8gPT09ICJpbmRleCIgfHwgbyA9PT0gInV1aWQiIHx8IG8gPT09ICJkZWVwIikpIHsKICAgIGNvbnN0IGQgPSBjKGUsIHQsIG8pOwogICAgbiA9PT0gImJlZm9yZSIgPyBkLm5vZGVzLnVuc2hpZnQoaSkgOiBkLm5vZGVzLnB1c2goaSk7CiAgfQp9CmZ1bmN0aW9uIHcoZSwgaSwgdCwgbywgbiA9ICJ1dWlkIikgewogIGNvbnN0IGQgPSBjKGUsIGksIG4pOwogIHJldHVybiB0ID09PSAidXVpZCIgfHwgdCA9PT0gImluZGV4IiB8fCB0ID09PSAiZGVlcCIgfHwgdCA9PT0gIm5vZGVzIiB8fCB0ID09PSAiX190eXBlX18iID8gITEgOiBkLm9wdGlvbnMgJiYgZC5vcHRpb25zW3RdICE9PSB2b2lkIDAgPyAoZC5vcHRpb25zW3RdID0gbywgITApIDogITE7Cn0KZnVuY3Rpb24gRChlLCBpLCB0LCBvID0gInV1aWQiKSB7CiAgY29uc3QgbiA9IGMoZSwgaSwgbyk7CiAgZm9yIChjb25zdCBkIGluIHQpCiAgICBkID09PSAidXVpZCIgfHwgZCA9PT0gImluZGV4IiB8fCBkID09PSAiZGVlcCIgfHwgZCA9PT0gIm5vZGVzIiB8fCBkID09PSAiX190eXBlX18iIHx8IG4ub3B0aW9ucyAmJiBuLm9wdGlvbnNbZF0gIT09IHZvaWQgMCAmJiAobi5vcHRpb25zW2RdID0gdFtkXSk7CiAgcmV0dXJuICEwOwp9CmZ1bmN0aW9uIGMoZSwgaSwgdCA9ICJ1dWlkIikgewogIHJldHVybiB0ID09PSAiZGVlcCIgPyBOKGUsIGkpIDogdCA9PT0gImluZGV4IiA/IGVbaV0gOiBlLmZpbmQoKG8pID0+IG8udXVpZCA9PSBpKTsKfQpmdW5jdGlvbiBNKGUsIGksIHQgPSAidXVpZCIpIHsKICByZXR1cm4gdCA9PT0gImRlZXAiID8gQihlLCBpKSA6IHQgPT09ICJpbmRleCIgPyBlLmZpbmRJbmRleCgobykgPT4gby5pbmRleCA9PT0gaSkgIT09IC0xIDogZS5maW5kSW5kZXgoKG8pID0+IG8udXVpZCA9PT0gaSkgIT09IC0xOwp9CmZ1bmN0aW9uIEYoZSwgaSwgdCA9ICJ1dWlkIikgewogIGxldCBvID0gYyhlLCBpLCB0KSwgbjsKICByZXR1cm4gdCA9PT0gImRlZXAiID8gKG4gPSBoKGUsIGkpLCBuLm5vZGVzLnNwbGljZShvLmluZGV4LCAxKSwgbiA9IHZvaWQgMCwgbyA9IHZvaWQgMCwgcChlLCB2b2lkIDApLCAhMCkgOiAodCA9PT0gImluZGV4IiB8fCB0ID09PSAidXVpZCIpICYmIG8gPyAoZS5zcGxpY2Uoby5pbmRleCwgMSksIG8gPSB2b2lkIDAsIHAoZSwgdm9pZCAwKSwgITApIDogITE7Cn0KZnVuY3Rpb24gSShlLCBpLCB0ID0gInV1aWQiKSB7CiAgbGV0IG87CiAgaSAmJiAobyA9IGMoZSwgaSwgdCkpLCBpICYmIG8gPyBvLm5vZGVzLnNwbGljZSgwLCBvLm5vZGVzLmxlbmd0aCkgOiBlLnNwbGljZSgwLCBlLmxlbmd0aCk7Cn0KZnVuY3Rpb24gJChlLCBpLCB0LCBvID0gInV1aWQiLCBuID0gITEpIHsKICBpZiAobyA9PT0gImluZGV4IiAmJiAoaSA8IDAgfHwgaSA+PSBlLmxlbmd0aCkpCiAgICB0aHJvdyBuZXcgRXJyb3IoIkluZGV4ZXMgb3V0IHJhbmdlcyIpOwogIGxldCBkID0gYyhlLCBpLCBvKSwgdTsKICBpZiAoIWQpCiAgICB0aHJvdyBuZXcgRXJyb3IoIm5vZGUgbm90IGZvdW5kIik7CiAgdC5pbmRleCA9IGQuaW5kZXgsIG4gJiYgKHQuZGVlcCA9IGQuZGVlcCksIG8gPT09ICJpbmRleCIgfHwgbyA9PT0gInV1aWQiID8gKGVbZC5pbmRleF0gPSB0LCBkID0gdm9pZCAwKSA6IG8gPT09ICJkZWVwIiAmJiAodSA9IGgoZSwgaSksIHUubm9kZXNbZC5pbmRleF0gPSB0LCBkID0gdm9pZCAwLCB1ID0gdm9pZCAwKTsKfQpmdW5jdGlvbiBiKGUsIGksIHQgPSAidXVpZCIpIHsKICBpZiAodCA9PT0gImluZGV4IiAmJiAoaSA8IDAgfHwgaSA+PSBlLm5vZGVzLmxlbmd0aCkpCiAgICB0aHJvdyBuZXcgRXJyb3IoIkluZGV4ZXMgb3V0IHJhbmdlcyIpOwogIGNvbnN0IG8gPSBbZV07CiAgZm9yICg7IG8ubGVuZ3RoID4gMDsgKSB7CiAgICBsZXQgbiA9IG8uc2hpZnQoKTsKICAgIGlmICh0ID09PSAidXVpZCIgJiYgKG4gPT0gbnVsbCA/IHZvaWQgMCA6IG4udXVpZCkgPT09IGkpCiAgICAgIHJldHVybiBuOwogICAgaWYgKHQgPT09ICJpbmRleCIgJiYgKG4gPT0gbnVsbCA/IHZvaWQgMCA6IG4uaW5kZXgpID09PSBpKQogICAgICByZXR1cm4gbjsKICAgIGlmICh0ID09PSAiZGVlcCIgJiYgKG4gPT0gbnVsbCA/IHZvaWQgMCA6IG4uZGVlcCkgPT09IGkpCiAgICAgIHJldHVybiBuOwogICAgby5wdXNoKC4uLkFycmF5LmZyb20oKG4gPT0gbnVsbCA/IHZvaWQgMCA6IG4ubm9kZXMpID8/IFtdKSk7CiAgfQp9CmZ1bmN0aW9uIHAoZSwgaSkgewogIGZvciAobGV0IHQgPSAwOyB0IDwgZS5sZW5ndGg7IHQrKykKICAgIGVbdF0uaW5kZXggPSB0LCBlW3RdLmRlZXAgPSBpID8gYCR7aS5kZWVwfV8ke3R9YCA6IGAke3R9YCwgZVt0XS5ub2Rlcy5sZW5ndGggJiYgcChlW3RdLm5vZGVzLCBlW3RdKTsKfQpmdW5jdGlvbiBFKGUsIGksIHQsIG8gPSAiYWZ0ZXIiKSB7CiAgbGV0IG4sIGQsIHUsIGE7CiAgaWYgKHQuZnJvbSA9PT0gImluZGV4IiAmJiAoaS5mcm9tIDwgMCB8fCBpLmZyb20gPj0gZS5sZW5ndGgpKQogICAgdGhyb3cgbmV3IEVycm9yKCJJbmRleGVzIG91dCByYW5nZXMiKTsKICBpZiAodC50byA9PT0gImluZGV4IiAmJiAoaS50byA8IDAgfHwgaS50byA+PSBlLmxlbmd0aCkpCiAgICB0aHJvdyBuZXcgRXJyb3IoIkluZGV4ZXMgb3V0IHJhbmdlcyIpOwogIGlmICgodC5mcm9tID09PSAiaW5kZXgiIHx8IHQuZnJvbSA9PT0gInV1aWQiKSAmJiAodC50byA9PT0gImluZGV4IiB8fCB0LnRvID09PSAidXVpZCIpKSB7CiAgICBuID0gYyhlLCBpLmZyb20sIHQuZnJvbSksIHUgPSBjKGUsIGkudG8sIHQudG8pOwogICAgY29uc3QgZiA9IGUuc2xpY2UoKSwgW2xdID0gZi5zcGxpY2UoCiAgICAgIHQuZnJvbSA9PT0gImluZGV4IiA/IG4uaW5kZXggOiBuLnV1aWQsCiAgICAgIDEKICAgICk7CiAgICBmLnNwbGljZSgKICAgICAgbyA9PT0gImJlZm9yZSIgPyB1LmluZGV4IDogdS5pbmRleCArIDEsCiAgICAgIDAsCiAgICAgIGwKICAgICksIHAoZiwgdm9pZCAwKSwgZS5zcGxpY2UoMCwgZS5sZW5ndGgpLCBlLnB1c2goLi4uZiksIG4gPSB2b2lkIDAsIHUgPSB2b2lkIDA7CiAgfSBlbHNlIGlmICgodC5mcm9tID09PSAiaW5kZXgiIHx8IHQuZnJvbSA9PT0gInV1aWQiKSAmJiB0LnRvID09PSAiZGVlcCIpIHsKICAgIG4gPSBjKGUsIGkuZnJvbSwgdC5mcm9tKSwgdSA9IGMoZSwgaS50bywgdC50byksIGEgPSBoKGUsIGkudG8pOwogICAgY29uc3QgZiA9IGUuc2xpY2UoKSwgW2xdID0gZi5zcGxpY2UoCiAgICAgIHQuZnJvbSA9PT0gImluZGV4IiA/IG4uaW5kZXggOiBuLnV1aWQsCiAgICAgIDEKICAgICksIHMgPSBhLm5vZGVzLnNsaWNlKCk7CiAgICBzLnNwbGljZSgKICAgICAgbyA9PT0gImJlZm9yZSIgPyB1LmluZGV4IDogdS5pbmRleCArIDEsCiAgICAgIDAsCiAgICAgIGwKICAgICksIGcoZiwgYS5kZWVwLCBzKSwgcChmLCB2b2lkIDApLCBlLnNwbGljZSgwLCBlLmxlbmd0aCksIGUucHVzaCguLi5mKSwgbiA9IHZvaWQgMCwgdSA9IHZvaWQgMCwgYSA9IHZvaWQgMDsKICB9IGVsc2UgaWYgKHQuZnJvbSA9PT0gImRlZXAiICYmICh0LnRvID09PSAiaW5kZXgiIHx8IHQudG8gPT09ICJ1dWlkIikpIHsKICAgIG4gPSBjKGUsIGkuZnJvbSwgdC5mcm9tKSwgZCA9IGgoZSwgaS5mcm9tKSwgdSA9IGMoZSwgaS50bywgdC50byk7CiAgICBjb25zdCBmID0gZC5ub2Rlcy5zbGljZSgpLCBbbF0gPSBmLnNwbGljZShuLmluZGV4LCAxKSwgcyA9IGUuc2xpY2UoKTsKICAgIHMuc3BsaWNlKAogICAgICBvID09PSAiYmVmb3JlIiA/IHUuaW5kZXggOiB1LmluZGV4ICsgMSwKICAgICAgMCwKICAgICAgbAogICAgKSwgZyhzLCBkLmRlZXAsIGYpLCBwKHMsIHZvaWQgMCksIGUuc3BsaWNlKDAsIGUubGVuZ3RoKSwgZS5wdXNoKC4uLnMpLCBuID0gdm9pZCAwLCBkID0gdm9pZCAwLCB1ID0gdm9pZCAwOwogIH0gZWxzZSBpZiAodC5mcm9tID09PSAiZGVlcCIgJiYgdC50byA9PT0gImRlZXAiKSB7CiAgICBuID0gYyhlLCBpLmZyb20sIHQuZnJvbSksIGQgPSBoKGUsIGkuZnJvbSksIHUgPSBjKGUsIGkudG8sIHQudG8pLCBhID0gaChlLCBpLnRvKTsKICAgIGxldCBmID0gZS5zbGljZSgpOwogICAgY29uc3QgbCA9IGQubm9kZXMuc2xpY2UoKSwgW3NdID0gbC5zcGxpY2Uobi5pbmRleCwgMSksIHggPSBhLm5vZGVzLnNsaWNlKCk7CiAgICB4LnNwbGljZSgKICAgICAgbyA9PT0gImJlZm9yZSIgPyB1LmluZGV4IDogdS5pbmRleCArIDEsCiAgICAgIDAsCiAgICAgIHMKICAgICksIGcoZiwgZC5kZWVwLCBsKSwgZyhmLCBhLmRlZXAsIHgpLCBwKGYsIHZvaWQgMCksIGUuc3BsaWNlKDAsIGUubGVuZ3RoKSwgZS5wdXNoKC4uLmYpLCBuID0gdm9pZCAwLCBkID0gdm9pZCAwLCB1ID0gdm9pZCAwLCBhID0gdm9pZCAwOwogIH0KfQpmdW5jdGlvbiBnKGUsIGksIHQpIHsKICBpZiAoaSA9PT0gInJvb3QiKQogICAgZS5zcGxpY2UoMCwgZS5sZW5ndGgpLCBlLnB1c2goLi4udCk7CiAgZWxzZSB7CiAgICBjb25zdCBvID0gIlsiICsgaS5yZXBsYWNlKC9fL2csICJdLm5vZGVzWyIpICsgIl0iLCBkID0gbmV3IEZ1bmN0aW9uKCJub2RlcyIsIGByZXR1cm4gbm9kZXMke299YCkoZSk7CiAgICBkLm5vZGVzID0gdDsKICB9Cn0KZnVuY3Rpb24gaChlLCBpKSB7CiAgaWYgKGkuc3BsaXQoIl8iKS5sZW5ndGggPiAxKSB7CiAgICBjb25zdCB0ID0gIlsiICsgaS5zbGljZSgwLCAtMikucmVwbGFjZSgvXy9nLCAiXS5ub2Rlc1siKSArICJdIjsKICAgIHJldHVybiBuZXcgRnVuY3Rpb24oIm5vZGVzIiwgYHJldHVybiBub2RlcyR7dH1gKShlKTsKICB9IGVsc2UKICAgIHJldHVybiB7CiAgICAgIGRlZXA6ICJyb290IiwKICAgICAgbm9kZXM6IGUKICAgIH07Cn0KZnVuY3Rpb24gTihlLCBpKSB7CiAgaWYgKGkgPT09ICJyb290IikKICAgIHJldHVybiB7CiAgICAgIGRlZXA6ICJyb290IiwKICAgICAgbm9kZXM6IGUKICAgIH07CiAgewogICAgY29uc3QgdCA9ICJbIiArIGkucmVwbGFjZSgvXy9nLCAiXS5ub2Rlc1siKSArICJdIjsKICAgIHJldHVybiBuZXcgRnVuY3Rpb24oIm5vZGVzIiwgYHJldHVybiBub2RlcyR7dH1gKShlKTsKICB9Cn0KZnVuY3Rpb24gQihlLCBpKSB7CiAgY29uc3QgdCA9ICJbIiArIGkucmVwbGFjZSgvXy9nLCAiXS5ub2Rlc1siKSArICJdIjsKICByZXR1cm4gbmV3IEZ1bmN0aW9uKCJub2RlcyIsIGByZXR1cm4gbm9kZXMke3R9YCkoZSkgIT09IHZvaWQgMDsKfQpsZXQgciA9IFtdOwpzZWxmLm9ubWVzc2FnZSA9IGZ1bmN0aW9uKGUpIHsKICBpZiAoZS5kYXRhLmFjdGlvbiA9PT0gImdldDpyb290IikKICAgIHNlbGYucG9zdE1lc3NhZ2UoewogICAgICB0eXBlOiAiZ2V0OnJvb3QiLAogICAgICBub2RlOiByCiAgICB9KTsKICBlbHNlIGlmIChlLmRhdGEuYWN0aW9uID09PSAic2V0OnJvb3QiKQogICAgciA9IFtlLmRhdGEucm9vdF07CiAgZWxzZSBpZiAoZS5kYXRhLmFjdGlvbiA9PT0gImdldDpub2RlcyIpIHsKICAgIGlmICghci5sZW5ndGgpCiAgICAgIHJldHVybjsKICAgIGNvbnN0IHsgbG9jYXRpb246IGksIG1vZGU6IHQgPSAidXVpZCIgfSA9IGUuZGF0YTsKICAgIHNlbGYucG9zdE1lc3NhZ2UoewogICAgICB0eXBlOiAiZ2V0Om5vZGVzIiwKICAgICAgbm9kZTogXyhyLCBpLCB0KQogICAgfSk7CiAgfSBlbHNlIGlmIChlLmRhdGEuYWN0aW9uID09PSAiZ2V0Om5vZGUiKSB7CiAgICBpZiAoIXIubGVuZ3RoKQogICAgICByZXR1cm47CiAgICBjb25zdCB7IGxvY2F0aW9uOiBpLCBtb2RlOiB0ID0gInV1aWQiIH0gPSBlLmRhdGE7CiAgICBzZWxmLnBvc3RNZXNzYWdlKHsKICAgICAgdHlwZTogImdldDpub2RlIiwKICAgICAgbm9kZTogYyhyLCBpLCB0KQogICAgfSk7CiAgfSBlbHNlIGlmIChlLmRhdGEuYWN0aW9uID09PSAiYWRkOm5vZGUiKSB7CiAgICBpZiAoIXIubGVuZ3RoKQogICAgICByZXR1cm47CiAgICBjb25zdCB7IG5vZGU6IGksIGxvY2F0aW9uOiB0LCBtb2RlOiBvID0gInV1aWQiIH0gPSBlLmRhdGE7CiAgICB5KHIsIGksIHQsIG8pOwogIH0gZWxzZSBpZiAoZS5kYXRhLmFjdGlvbiA9PT0gInVwZGF0ZTpub2RlIikgewogICAgaWYgKCFyLmxlbmd0aCkKICAgICAgcmV0dXJuOwogICAgY29uc3QgeyBsb2NhdGlvbjogaSwgdHlwZTogdCA9ICJwcm9wZXJ0eSIsIG1vZGU6IG8gPSAidXVpZCIgfSA9IGUuZGF0YTsKICAgIGlmICh0ID09PSAicHJvcGVydHkiKSB7CiAgICAgIGNvbnN0IHsgcHJvcGVydHk6IG4sIHZhbHVlOiBkIH0gPSBlLmRhdGEub3B0aW9uczsKICAgICAgdyhyLCBpLCBuLCBkLCBvKTsKICAgIH0KICAgIGlmICh0ID09PSAicHJvcGVydGllcyIpIHsKICAgICAgY29uc3QgeyBwcm9wZXJ0aWVzOiBuIH0gPSBlLmRhdGEub3B0aW9uczsKICAgICAgRChyLCBpLCBuLCBvKTsKICAgIH0KICB9IGVsc2UgaWYgKGUuZGF0YS5hY3Rpb24gPT09ICJoYXM6bm9kZSIpIHsKICAgIGlmICghci5sZW5ndGgpCiAgICAgIHJldHVybjsKICAgIGNvbnN0IHsgbG9jYXRpb246IGksIG1vZGU6IHQgPSAidXVpZCIgfSA9IGUuZGF0YTsKICAgIHNlbGYucG9zdE1lc3NhZ2UoewogICAgICB0eXBlOiAiaGFzOm5vZGUiLAogICAgICBub2RlOiBNKHIsIGksIHQpCiAgICB9KTsKICB9IGVsc2UgaWYgKGUuZGF0YS5hY3Rpb24gPT09ICJkZWxldGU6bm9kZSIpIHsKICAgIGlmICghci5sZW5ndGgpCiAgICAgIHJldHVybjsKICAgIGNvbnN0IHsgbG9jYXRpb246IGksIG1vZGU6IHQgPSAidXVpZCIgfSA9IGUuZGF0YTsKICAgIEYociwgaSwgdCk7CiAgfSBlbHNlIGlmIChlLmRhdGEuYWN0aW9uID09PSAiY2xlYXI6bm9kZXMiKSB7CiAgICBpZiAoIXIubGVuZ3RoKQogICAgICByZXR1cm47CiAgICBjb25zdCB7IGxvY2F0aW9uOiBpLCBtb2RlOiB0ID0gInV1aWQiIH0gPSBlLmRhdGE7CiAgICBJKHIsIGksIHQpOwogIH0gZWxzZSBpZiAoZS5kYXRhLmFjdGlvbiA9PT0gInJlcGxhY2U6bm9kZSIpIHsKICAgIGlmICghci5sZW5ndGgpCiAgICAgIHJldHVybjsKICAgIGNvbnN0IHsgbG9jYXRpb246IGksIG5vZGU6IHQsIG1vZGU6IG8gPSAidXVpZCIgfSA9IGUuZGF0YTsKICAgICQociwgaSwgdCwgbyk7CiAgfSBlbHNlIGlmIChlLmRhdGEuYWN0aW9uID09PSAic2VhcmNoOm5vZGUiKSB7CiAgICBpZiAoIXIubGVuZ3RoKQogICAgICByZXR1cm47CiAgICBjb25zdCB7IGxvY2F0aW9uOiBpLCBtb2RlOiB0ID0gInV1aWQiIH0gPSBlLmRhdGE7CiAgICBzZWxmLnBvc3RNZXNzYWdlKHsKICAgICAgdHlwZTogInNlYXJjaDpub2RlIiwKICAgICAgbm9kZTogYihyLCBpLCB0KQogICAgfSk7CiAgfSBlbHNlIGlmIChlLmRhdGEuYWN0aW9uID09PSAibW92ZTpub2RlIikgewogICAgaWYgKCFyLmxlbmd0aCkKICAgICAgcmV0dXJuOwogICAgY29uc3QgewogICAgICBwb3NpdGlvbjogaSwKICAgICAgbW9kZXM6IHQgPSB7IGZyb206ICJ1dWlkIiwgdG86ICJ1dWlkIiB9LAogICAgICBpbnNlcnQ6IG8gPSAiYWZ0ZXIiCiAgICB9ID0gZS5kYXRhLm9wdGlvbnM7CiAgICBFKHIsIGksIHQsIG8pOwogIH0KfTsK", Sr = (i) => Uint8Array.from(atob(i), (t) => t.charCodeAt(0)), vs = typeof window < "u" && window.Blob && new Blob(["URL.revokeObjectURL(import.meta.url);", Sr(_i)], { type: "text/javascript;charset=utf-8" });
function Er(i) {
  let t;
  try {
    if (t = vs && (window.URL || window.webkitURL).createObjectURL(vs), !t)
      throw "";
    const e = new Worker(t, {
      type: "module",
      name: i == null ? void 0 : i.name
    });
    return e.addEventListener("error", () => {
      (window.URL || window.webkitURL).revokeObjectURL(t);
    }), e;
  } catch {
    return new Worker(
      "data:text/javascript;base64," + _i,
      {
        type: "module",
        name: i == null ? void 0 : i.name
      }
    );
  }
}
const Zi = "c2VsZi5vbm1lc3NhZ2UgPSBmdW5jdGlvbihvKSB7CiAgaWYgKG8uZGF0YS5hY3Rpb24gPT09ICJub2RlOnByb2Nlc3MtY2FsY3VsYXRlIikgewogICAgY29uc3QgZSA9IG8uZGF0YS5vcHRpb25zLnNjYWxlVmlld3BvcnQsIHQgPSBvLmRhdGEub3B0aW9ucywgYSA9IHsKICAgICAgbWlkZGxlU2NhbGVGYWN0b3I6IHsKICAgICAgICBoZWlnaHQ6IDAsCiAgICAgICAgd2lkdGg6IDAKICAgICAgfSwKICAgICAgcm90YXRpb246IDAsCiAgICAgIHNjYWxlRmFjdG9yOiB7CiAgICAgICAgaGVpZ2h0OiAwLAogICAgICAgIHdpZHRoOiAwCiAgICAgIH0sCiAgICAgIHRyYW5zbGF0ZTogewogICAgICAgIHg6IDAsCiAgICAgICAgeTogMAogICAgICB9CiAgICB9OwogICAgdC5fX3BhcmVudCAmJiB0Ll9fcGFyZW50Ll9fdHlwZV9fID09ICJkcmF3OjJEL25vZGUiID8gYS50cmFuc2xhdGUgPSB7CiAgICAgIHg6IHQuX19wYXJlbnQueCArIHQueCAqIGUsCiAgICAgIHk6IHQuX19wYXJlbnQueSArIHQueSAqIGUKICAgIH0gOiBhLnRyYW5zbGF0ZSA9IHsKICAgICAgeDogdC54ICogZSwKICAgICAgeTogdC55ICogZQogICAgfSwgYS5yb3RhdGlvbiA9IHQucm90YXRpb25UeXBlID09PSAiZGVncmVlcyIgPyB0LnJvdGF0aW9uICogTWF0aC5QSSAvIDE4MCA6IHQucm90YXRpb24sIGEuc2NhbGVGYWN0b3IgPSB7CiAgICAgIHdpZHRoOiB0LndpZHRoICogdC5zY2FsZVggKiBlLAogICAgICBoZWlnaHQ6IHQuaGVpZ2h0ICogdC5zY2FsZVkgKiBlCiAgICB9LCBhLm1pZGRsZVNjYWxlRmFjdG9yID0gewogICAgICB3aWR0aDogYS5zY2FsZUZhY3Rvci53aWR0aCAvIDIsCiAgICAgIGhlaWdodDogYS5zY2FsZUZhY3Rvci5oZWlnaHQgLyAyCiAgICB9LCBzZWxmLnBvc3RNZXNzYWdlKHsKICAgICAgdHlwZTogIm5vZGU6cHJvY2Vzcy1jYWxjdWxhdGUiLAogICAgICByZXN1bHQ6IGEKICAgIH0pOwogIH0KfTsK", Fr = (i) => Uint8Array.from(atob(i), (t) => t.charCodeAt(0)), Ns = typeof window < "u" && window.Blob && new Blob(["URL.revokeObjectURL(import.meta.url);", Fr(Zi)], { type: "text/javascript;charset=utf-8" });
function Gr(i) {
  let t;
  try {
    if (t = Ns && (window.URL || window.webkitURL).createObjectURL(Ns), !t)
      throw "";
    const e = new Worker(t, {
      type: "module",
      name: i == null ? void 0 : i.name
    });
    return e.addEventListener("error", () => {
      (window.URL || window.webkitURL).revokeObjectURL(t);
    }), e;
  } catch {
    return new Worker(
      "data:text/javascript;base64," + Zi,
      {
        type: "module",
        name: i == null ? void 0 : i.name
      }
    );
  }
}
class Li {
  constructor(t) {
    f(this, "$app");
    f(this, "_workerRender");
    f(this, "_workerNodes");
    f(this, "_workerMath");
    f(this, "_events", new Fe());
    this.$app = t, this._workerRender = new Br(), this._workerNodes = new Er(), this._workerMath = new Gr(), this.loadWorker(), this.listenWorker();
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
  async process() {
    const t = await this.getRootNode();
    this._workerRender.postMessage({
      action: "render",
      root: t
    });
  }
  draw() {
  }
  emit(t, e) {
    this._events.addEventListener(t, e);
  }
  [L](t, ...e) {
    this._events.emitEvent(t, e);
  }
}
class vi {
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
    const s = e === "JSON" ? j.parse(t) : le(t);
    this._options = s.options, this._global.set("mode", "game"), this._global.set("status", null), this._global.set("scale-viewport", 1), this._global.set("re-draw", !0), this.$scenes = new Si(this), this.$canvas = new Fi(this), this.$script = new Gi(this), this.$drawer = new Li(this), this.$animation = new yi(this), this.$$events = new Ni(this), this.drawer.setViewportGame(
      this.options.viewport.width,
      this.options.viewport.height
    ), this.scenes.emit("scene:change", () => {
      this.script[Jt](this.scenes.currentScene), this.drawer.setRootNode(this.scenes.currentScene[q]());
    });
    const n = ee(s.scenes);
    this.scenes.add(...n), this.scenes.change(s.scene), this.animation.setDelayFrames(this.options.fps.delay), this.animation.setVelocityFrames(this.options.fps.velocity), this.resize();
  }
  async start() {
    this.$scenes.currentScene && await this.$script[Ne](), await this.$script.ready(), this.$animation.play();
  }
  [L](t, ...e) {
    return this._events.emitEvent(t, ...e);
  }
}
class Ni {
  constructor(t) {
    f(this, "$app");
    this.$app = t, this.init();
  }
  init() {
    this.$app.canvas && this.$app.canvas.event !== void 0 && (this.$app.canvas.event.addEventListener("mousedown", (t) => {
      t.preventDefault(), this.$app[L]("canvas/mouse:down", this.$app, t);
    }), window.addEventListener("mouseup", (t) => {
      t.preventDefault(), this.$app[L]("canvas/mouse:up", this.$app, t);
    }), window.addEventListener("mousemove", (t) => {
      t.preventDefault(), this.$app[L]("canvas/mouse:move", this.$app, t);
    }), this.$app.canvas.event.addEventListener("wheel", (t) => {
      t.preventDefault(), this.$app[L]("canvas/mouse:wheel", this.$app, t);
    }), window.addEventListener("keydown", (t) => {
      this.$app.mode === "game" && (t.preventDefault(), t.key === "F11" && (this.$app.canvas.main.requestFullscreen(), this.$app.resize())), this.$app[L]("canvas/key:down", this.$app, t);
    }), window.addEventListener("keyup", (t) => {
      this.$app.mode === "game" && t.preventDefault(), this.$app[L]("canvas/key:up", this.$app, t);
    }), window.addEventListener("keypress", (t) => {
      this.$app.mode === "game" && t.preventDefault(), this.$app[L]("canvas/key:press", this.$app, t);
    }), this.$app.mode === "game" && this.$app instanceof vi && window.addEventListener("resize", () => {
      this.$app.resize();
    }));
  }
  [Ys]() {
    this.init();
  }
}
class kr {
  constructor(t) {
    f(this, "$app");
    f(this, "_formatExport", "JSON");
    this.$app = t;
  }
  import(t, e = "JSON") {
    const s = e === "JSON" ? j.parse(t) : le(t);
    this.$app[Os](s.options);
    const n = ee(s.scenes);
    this.$app.scenes.add(...n), this.$app.scenes.change(s.scene);
  }
  export(t, e = this.$app.options.export.format) {
    return e === "YAML" ? Ft(this[k](t)) : j.stringify(this[k](t));
  }
  [k](t) {
    const e = this.$app.scenes[k](), s = this.$app[Rs]();
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
function _r(i) {
  return i && i.__esModule && Object.prototype.hasOwnProperty.call(i, "default") ? i.default : i;
}
const Zr = /[\u0000-\u001f\u0022\u005c\ud800-\udfff]|[\ud800-\udbff](?![\udc00-\udfff])|(?:[^\ud800-\udbff]|^)[\udc00-\udfff]/;
function Lr(i) {
  if (typeof i != "string")
    throw new TypeError(`Expected input to be of type string, received type ${typeof i} (${i})`);
  return i.length < 5e3 && !Zr.test(i) ? `"${i}"` : JSON.stringify(i);
}
var vr = Lr;
const Nr = /* @__PURE__ */ _r(vr);
class Yr {
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
    } else
      t.full_size ? e += ",top=0,left=0" : e += `,top=${t.y},left=${t.x}`;
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

              await app.load(${Nr(this.$app.export("game"))})

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
class Kr {
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
    this._options = { ...ds, ...t }, this.init(), this.$$distribution = new kr(this), this.$$window = new Yr(this), this.$$events = new Ni(this);
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
    this.$scenes = new Si(this), this.$canvas = new Fi(this), this.$script = new Gi(this), this.$drawer = new Li(this), this.$animation = new yi(this), this._global.set("mode", "edition"), this._global.set("status", null), this._global.set("fps", null), this._global.set("re-draw", !0), this._global.set("scale-viewport", 1), this.animation.setDelayFrames(this.options.fps.delay), this.animation.setVelocityFrames(this.options.fps.velocity), this.scenes.emit("scene:change", () => {
      this.script[Jt](this.scenes.currentScene), this.drawer.setRootNode(this.scenes.currentScene[q]());
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
      const [u, o, a] = t.substring(1).split("/");
      return s = this._plugins.get(o), s ? (n = s[u]) == null ? void 0 : n[a] : (r = e[u].get(o)) == null ? void 0 : r[a];
    }
    if (/@(config|providers|nodes)\/[a-zA-Z-_)(.$]+/g.test(t)) {
      const [u, o] = t.substring(1).split("/");
      return s = this._plugins.get(o), s ? s[u] : e[u].get(o);
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
        this.useGlobal("mode") === "preview" && (this._global.set("mode", "edition"), this.$scenes.reset());
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
  [Os](t) {
    this._options = { ...ds, ...t }, this.init(), this.$$events[Ys]();
  }
  [Rs]() {
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
  [L](t, ...e) {
    return this._events.emitEvent(t, ...e);
  }
  [Ri](t) {
    return this._events.hasEventListener(t);
  }
}
export {
  Kr as AtomicEngine,
  vi as AtomicGame,
  Ar as ControlEdition2D,
  fr as LineFlowEffect2D,
  ue as Node2D,
  hs as PrimitiveNode,
  pr as Rectangle2D,
  dr as Scene2D,
  gr as Selection2D,
  Cr as Text2D
};
