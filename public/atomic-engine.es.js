var vi = Object.defineProperty;
var Ni = (i, t, e) => t in i ? vi(i, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : i[t] = e;
var c = (i, t, e) => (Ni(i, typeof t != "symbol" ? t + "" : t, e), e);
const k = Symbol("MethodExport"), Ys = Symbol("MethodReloadEvents"), q = Symbol("MethodDispatchEvent"), Le = Symbol("MethodDispatchScript"), Li = Symbol("MethodHasEvent"), Ms = Symbol("MethodStaticSetApp"), Gs = Symbol("MethodGetAllInsideAtomic"), xs = Symbol("MethodSetOptions");
class qe {
  constructor() {
    c(this, "_eventListeners", {});
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
    full_screen: !1,
    full_size: !1,
    height: 400,
    width: 400,
    x: 0,
    y: 0,
    icon: null,
    center: !0,
    title: void 0,
    resizable: !1
  },
  height: 500,
  width: 500,
  selector: "[data-canvas]",
  export: {
    exclude: [],
    format: "JSON",
    include: []
  },
  mode: "editor"
};
class Oi {
  constructor(t) {
    c(this, "$app");
    this.$app = t, this.init();
  }
  init() {
    this.$app.canvas && this.$app.canvas.instance !== void 0 && (this.$app.canvas.instance.addEventListener("mousedown", (t) => {
      t.preventDefault(), this.$app[q]("canvas/mouse:down", this, t);
    }), this.$app.canvas.instance.addEventListener("mouseup", (t) => {
      t.preventDefault(), this.$app[q]("canvas/mouse:up", this, t);
    }), window.addEventListener("mousemove", (t) => {
      t.preventDefault(), this.$app[q]("canvas/mouse:move", this, t);
    }), this.$app.canvas.instance.addEventListener("wheel", (t) => {
      t.preventDefault(), this.$app[q]("canvas/mouse:wheel", this, t);
    }), window.addEventListener("keydown", (t) => {
      this.$app[q]("canvas/key:down", this, t);
    }), window.addEventListener("keyup", (t) => {
      this.$app[q]("canvas/key:up", this, t);
    }), window.addEventListener("keypress", (t) => {
      this.$app[q]("canvas/key:press", this, t);
    }));
  }
  [Ys]() {
    this.init();
  }
}
const Xt = Symbol.for("yaml.alias"), Mt = Symbol.for("yaml.document"), pe = Symbol.for("yaml.map"), Ks = Symbol.for("yaml.pair"), he = Symbol.for("yaml.scalar"), Me = Symbol.for("yaml.seq"), te = Symbol.for("yaml.node.type"), Ge = (i) => !!i && typeof i == "object" && i[te] === Xt, yt = (i) => !!i && typeof i == "object" && i[te] === Mt, Qe = (i) => !!i && typeof i == "object" && i[te] === pe, j = (i) => !!i && typeof i == "object" && i[te] === Ks, T = (i) => !!i && typeof i == "object" && i[te] === he, et = (i) => !!i && typeof i == "object" && i[te] === Me;
function K(i) {
  if (i && typeof i == "object")
    switch (i[te]) {
      case pe:
      case Me:
        return !0;
    }
  return !1;
}
function P(i) {
  if (i && typeof i == "object")
    switch (i[te]) {
      case Xt:
      case pe:
      case he:
      case Me:
        return !0;
    }
  return !1;
}
const $i = (i) => (T(i) || K(i)) && !!i.anchor, Ce = Symbol("break visit"), Ti = Symbol("skip children"), Ze = Symbol("remove node");
function Ee(i, t) {
  const e = Yi(t);
  yt(i) ? ke(null, i.contents, e, Object.freeze([i])) === Ze && (i.contents = null) : ke(null, i, e, Object.freeze([]));
}
Ee.BREAK = Ce;
Ee.SKIP = Ti;
Ee.REMOVE = Ze;
function ke(i, t, e, s) {
  const n = Mi(i, t, e, s);
  if (P(n) || j(n))
    return Gi(i, s, n), ke(i, n, e, s);
  if (typeof n != "symbol") {
    if (K(t)) {
      s = Object.freeze(s.concat(t));
      for (let u = 0; u < t.items.length; ++u) {
        const r = ke(u, t.items[u], e, s);
        if (typeof r == "number")
          u = r - 1;
        else {
          if (r === Ce)
            return Ce;
          r === Ze && (t.items.splice(u, 1), u -= 1);
        }
      }
    } else if (j(t)) {
      s = Object.freeze(s.concat(t));
      const u = ke("key", t.key, e, s);
      if (u === Ce)
        return Ce;
      u === Ze && (t.key = null);
      const r = ke("value", t.value, e, s);
      if (r === Ce)
        return Ce;
      r === Ze && (t.value = null);
    }
  }
  return n;
}
function Yi(i) {
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
function Mi(i, t, e, s) {
  var n, u, r, o, a;
  if (typeof e == "function")
    return e(i, t, s);
  if (Qe(t))
    return (n = e.Map) == null ? void 0 : n.call(e, i, t, s);
  if (et(t))
    return (u = e.Seq) == null ? void 0 : u.call(e, i, t, s);
  if (j(t))
    return (r = e.Pair) == null ? void 0 : r.call(e, i, t, s);
  if (T(t))
    return (o = e.Scalar) == null ? void 0 : o.call(e, i, t, s);
  if (Ge(t))
    return (a = e.Alias) == null ? void 0 : a.call(e, i, t, s);
}
function Gi(i, t, e) {
  const s = t[t.length - 1];
  if (K(s))
    s.items[i] = e;
  else if (j(s))
    i === "key" ? s.key = e : s.value = e;
  else if (yt(s))
    s.contents = e;
  else {
    const n = Ge(s) ? "alias" : "scalar";
    throw new Error(`Cannot replace node with ${n} parent`);
  }
}
const xi = {
  "!": "%21",
  ",": "%2C",
  "[": "%5B",
  "]": "%5D",
  "{": "%7B",
  "}": "%7D"
}, Ki = (i) => i.replace(/[!,[\]{}]/g, (t) => xi[t]);
class X {
  constructor(t, e) {
    this.docStart = null, this.docEnd = !1, this.yaml = Object.assign({}, X.defaultYaml, t), this.tags = Object.assign({}, X.defaultTags, e);
  }
  clone() {
    const t = new X(this.yaml, this.tags);
    return t.docStart = this.docStart, t;
  }
  /**
   * During parsing, get a Directives instance for the current document and
   * update the stream state according to the current version's spec.
   */
  atDocument() {
    const t = new X(this.yaml, this.tags);
    switch (this.yaml.version) {
      case "1.1":
        this.atNextDocument = !0;
        break;
      case "1.2":
        this.atNextDocument = !1, this.yaml = {
          explicit: X.defaultYaml.explicit,
          version: "1.2"
        }, this.tags = Object.assign({}, X.defaultTags);
        break;
    }
    return t;
  }
  /**
   * @param onError - May be called even if the action was successful
   * @returns `true` on success
   */
  add(t, e) {
    this.atNextDocument && (this.yaml = { explicit: X.defaultYaml.explicit, version: "1.1" }, this.tags = Object.assign({}, X.defaultTags), this.atNextDocument = !1);
    const s = t.trim().split(/[ \t]+/), n = s.shift();
    switch (n) {
      case "%TAG": {
        if (s.length !== 2 && (e(0, "%TAG directive should contain exactly two parts"), s.length < 2))
          return !1;
        const [u, r] = s;
        return this.tags[u] = r, !0;
      }
      case "%YAML": {
        if (this.yaml.explicit = !0, s.length !== 1)
          return e(0, "%YAML directive should contain exactly one part"), !1;
        const [u] = s;
        if (u === "1.1" || u === "1.2")
          return this.yaml.version = u, !0;
        {
          const r = /^\d+\.\d+$/.test(u);
          return e(6, `Unsupported YAML version ${u}`, r), !1;
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
      const r = t.slice(2, -1);
      return r === "!" || r === "!!" ? (e(`Verbatim tags aren't resolved, so ${t} is invalid.`), null) : (t[t.length - 1] !== ">" && e("Verbatim tags must end with a >"), r);
    }
    const [, s, n] = t.match(/^(.*!)([^!]*)$/s);
    n || e(`The ${t} tag has no suffix`);
    const u = this.tags[s];
    if (u)
      try {
        return u + decodeURIComponent(n);
      } catch (r) {
        return e(String(r)), null;
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
        return e + Ki(t.substring(s.length));
    return t[0] === "!" ? t : `!<${t}>`;
  }
  toString(t) {
    const e = this.yaml.explicit ? [`%YAML ${this.yaml.version || "1.2"}`] : [], s = Object.entries(this.tags);
    let n;
    if (t && s.length > 0 && P(t.contents)) {
      const u = {};
      Ee(t.contents, (r, o) => {
        P(o) && o.tag && (u[o.tag] = !0);
      }), n = Object.keys(u);
    } else
      n = [];
    for (const [u, r] of s)
      u === "!!" && r === "tag:yaml.org,2002:" || (!t || n.some((o) => o.startsWith(r))) && e.push(`%TAG ${u} ${r}`);
    return e.join(`
`);
  }
}
X.defaultYaml = { explicit: !1, version: "1.2" };
X.defaultTags = { "!!": "tag:yaml.org,2002:" };
function js(i) {
  if (/[\x00-\x19\s,[\]{}]/.test(i)) {
    const e = `Anchor must not contain whitespace or control characters: ${JSON.stringify(i)}`;
    throw new Error(e);
  }
  return !0;
}
function Ps(i) {
  const t = /* @__PURE__ */ new Set();
  return Ee(i, {
    Value(e, s) {
      s.anchor && t.add(s.anchor);
    }
  }), t;
}
function Rs(i, t) {
  for (let e = 1; ; ++e) {
    const s = `${i}${e}`;
    if (!t.has(s))
      return s;
  }
}
function ji(i, t) {
  const e = [], s = /* @__PURE__ */ new Map();
  let n = null;
  return {
    onAnchor: (u) => {
      e.push(u), n || (n = Ps(i));
      const r = Rs(t, n);
      return n.add(r), r;
    },
    /**
     * With circular references, the source node is only resolved after all
     * of its child nodes are. This is why anchors are set only after all of
     * the nodes have been created.
     */
    setAnchors: () => {
      for (const u of e) {
        const r = s.get(u);
        if (typeof r == "object" && r.anchor && (T(r.node) || K(r.node)))
          r.node.anchor = r.anchor;
        else {
          const o = new Error("Failed to resolve repeated object (this should not happen)");
          throw o.source = u, o;
        }
      }
    },
    sourceObjects: s
  };
}
function ve(i, t, e, s) {
  if (s && typeof s == "object")
    if (Array.isArray(s))
      for (let n = 0, u = s.length; n < u; ++n) {
        const r = s[n], o = ve(i, s, String(n), r);
        o === void 0 ? delete s[n] : o !== r && (s[n] = o);
      }
    else if (s instanceof Map)
      for (const n of Array.from(s.keys())) {
        const u = s.get(n), r = ve(i, s, n, u);
        r === void 0 ? s.delete(n) : r !== u && s.set(n, r);
      }
    else if (s instanceof Set)
      for (const n of Array.from(s)) {
        const u = ve(i, s, n, n);
        u === void 0 ? s.delete(n) : u !== n && (s.delete(n), s.add(u));
      }
    else
      for (const [n, u] of Object.entries(s)) {
        const r = ve(i, s, n, u);
        r === void 0 ? delete s[n] : r !== u && (s[n] = r);
      }
  return i.call(t, e, s);
}
function ee(i, t, e) {
  if (Array.isArray(i))
    return i.map((s, n) => ee(s, String(n), e));
  if (i && typeof i.toJSON == "function") {
    if (!e || !$i(i))
      return i.toJSON(t, e);
    const s = { aliasCount: 0, count: 1, res: void 0 };
    e.anchors.set(i, s), e.onCreate = (u) => {
      s.res = u, delete e.onCreate;
    };
    const n = i.toJSON(t, e);
    return e.onCreate && e.onCreate(n), n;
  }
  return typeof i == "bigint" && !(e != null && e.keep) ? Number(i) : i;
}
class Ut {
  constructor(t) {
    Object.defineProperty(this, te, { value: t });
  }
  /** Create a copy of this node.  */
  clone() {
    const t = Object.create(Object.getPrototypeOf(this), Object.getOwnPropertyDescriptors(this));
    return this.range && (t.range = this.range.slice()), t;
  }
  /** A plain JavaScript representation of this node. */
  toJS(t, { mapAsMap: e, maxAliasCount: s, onAnchor: n, reviver: u } = {}) {
    if (!yt(t))
      throw new TypeError("A document argument is required");
    const r = {
      anchors: /* @__PURE__ */ new Map(),
      doc: t,
      keep: !0,
      mapAsMap: e === !0,
      mapKeyWarned: !1,
      maxAliasCount: typeof s == "number" ? s : 100
    }, o = ee(this, "", r);
    if (typeof n == "function")
      for (const { count: a, res: l } of r.anchors.values())
        n(l, a);
    return typeof u == "function" ? ve(u, { "": o }, "", o) : o;
  }
}
class Jt extends Ut {
  constructor(t) {
    super(Xt), this.source = t, Object.defineProperty(this, "tag", {
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
    return Ee(t, {
      Node: (s, n) => {
        if (n === this)
          return Ee.BREAK;
        n.anchor === this.source && (e = n);
      }
    }), e;
  }
  toJSON(t, e) {
    if (!e)
      return { source: this.source };
    const { anchors: s, doc: n, maxAliasCount: u } = e, r = this.resolve(n);
    if (!r) {
      const a = `Unresolved alias (the anchor must be set before the alias): ${this.source}`;
      throw new ReferenceError(a);
    }
    let o = s.get(r);
    if (o || (ee(r, null, e), o = s.get(r)), !o || o.res === void 0) {
      const a = "This should not happen: Alias anchor was not resolved?";
      throw new ReferenceError(a);
    }
    if (u >= 0 && (o.count += 1, o.aliasCount === 0 && (o.aliasCount = lt(n, r, s)), o.count * o.aliasCount > u)) {
      const a = "Excessive alias count indicates a resource exhaustion attack";
      throw new ReferenceError(a);
    }
    return o.res;
  }
  toString(t, e, s) {
    const n = `*${this.source}`;
    if (t) {
      if (js(this.source), t.options.verifyAliasOrder && !t.anchors.has(this.source)) {
        const u = `Unresolved alias (the anchor must be set before the alias): ${this.source}`;
        throw new Error(u);
      }
      if (t.implicitKey)
        return `${n} `;
    }
    return n;
  }
}
function lt(i, t, e) {
  if (Ge(t)) {
    const s = t.resolve(i), n = e && s && e.get(s);
    return n ? n.count * n.aliasCount : 0;
  } else if (K(t)) {
    let s = 0;
    for (const n of t.items) {
      const u = lt(i, n, e);
      u > s && (s = u);
    }
    return s;
  } else if (j(t)) {
    const s = lt(i, t.key, e), n = lt(i, t.value, e);
    return Math.max(s, n);
  }
  return 1;
}
const Ws = (i) => !i || typeof i != "function" && typeof i != "object";
class B extends Ut {
  constructor(t) {
    super(he), this.value = t;
  }
  toJSON(t, e) {
    return e != null && e.keep ? this.value : ee(this.value, t, e);
  }
  toString() {
    return String(this.value);
  }
}
B.BLOCK_FOLDED = "BLOCK_FOLDED";
B.BLOCK_LITERAL = "BLOCK_LITERAL";
B.PLAIN = "PLAIN";
B.QUOTE_DOUBLE = "QUOTE_DOUBLE";
B.QUOTE_SINGLE = "QUOTE_SINGLE";
const Pi = "tag:yaml.org,2002:";
function Ri(i, t, e) {
  if (t) {
    const s = e.filter((u) => u.tag === t), n = s.find((u) => !u.format) ?? s[0];
    if (!n)
      throw new Error(`Tag ${t} not found`);
    return n;
  }
  return e.find((s) => {
    var n;
    return ((n = s.identify) == null ? void 0 : n.call(s, i)) && !s.format;
  });
}
function He(i, t, e) {
  var f, p, m;
  if (yt(i) && (i = i.contents), P(i))
    return i;
  if (j(i)) {
    const A = (p = (f = e.schema[pe]).createNode) == null ? void 0 : p.call(f, e.schema, null, e);
    return A.items.push(i), A;
  }
  (i instanceof String || i instanceof Number || i instanceof Boolean || typeof BigInt < "u" && i instanceof BigInt) && (i = i.valueOf());
  const { aliasDuplicateObjects: s, onAnchor: n, onTagObj: u, schema: r, sourceObjects: o } = e;
  let a;
  if (s && i && typeof i == "object") {
    if (a = o.get(i), a)
      return a.anchor || (a.anchor = n(i)), new Jt(a.anchor);
    a = { anchor: null, node: null }, o.set(i, a);
  }
  t != null && t.startsWith("!!") && (t = Pi + t.slice(2));
  let l = Ri(i, t, r.tags);
  if (!l) {
    if (i && typeof i.toJSON == "function" && (i = i.toJSON()), !i || typeof i != "object") {
      const A = new B(i);
      return a && (a.node = A), A;
    }
    l = i instanceof Map ? r[pe] : Symbol.iterator in Object(i) ? r[Me] : r[pe];
  }
  u && (u(l), delete e.onTagObj);
  const D = l != null && l.createNode ? l.createNode(e.schema, i, e) : typeof ((m = l == null ? void 0 : l.nodeClass) == null ? void 0 : m.from) == "function" ? l.nodeClass.from(e.schema, i, e) : new B(i);
  return t ? D.tag = t : l.default || (D.tag = l.tag), a && (a.node = D), D;
}
function dt(i, t, e) {
  let s = e;
  for (let n = t.length - 1; n >= 0; --n) {
    const u = t[n];
    if (typeof u == "number" && Number.isInteger(u) && u >= 0) {
      const r = [];
      r[u] = s, s = r;
    } else
      s = /* @__PURE__ */ new Map([[u, s]]);
  }
  return He(s, void 0, {
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
class Ht extends Ut {
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
    return t && (e.schema = t), e.items = e.items.map((s) => P(s) || j(s) ? s.clone(t) : s), this.range && (e.range = this.range.slice()), e;
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
      const [s, ...n] = t, u = this.get(s, !0);
      if (K(u))
        u.addIn(n, e);
      else if (u === void 0 && this.schema)
        this.set(s, dt(this.schema, n, e));
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
    if (K(n))
      return n.deleteIn(s);
    throw new Error(`Expected YAML collection at ${e}. Remaining path: ${s}`);
  }
  /**
   * Returns item at `key`, or `undefined` if not found. By default unwraps
   * scalar values from their surrounding node; to disable set `keepScalar` to
   * `true` (collections are always returned intact).
   */
  getIn(t, e) {
    const [s, ...n] = t, u = this.get(s, !0);
    return n.length === 0 ? !e && T(u) ? u.value : u : K(u) ? u.getIn(n, e) : void 0;
  }
  hasAllNullValues(t) {
    return this.items.every((e) => {
      if (!j(e))
        return !1;
      const s = e.value;
      return s == null || t && T(s) && s.value == null && !s.commentBefore && !s.comment && !s.tag;
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
    return K(n) ? n.hasIn(s) : !1;
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
      const u = this.get(s, !0);
      if (K(u))
        u.setIn(n, e);
      else if (u === void 0 && this.schema)
        this.set(s, dt(this.schema, n, e));
      else
        throw new Error(`Expected YAML collection at ${s}. Remaining path: ${n}`);
    }
  }
}
Ht.maxFlowStringSingleLineLength = 60;
const Wi = (i) => i.replace(/^(?!$)(?: $)?/gm, "#");
function le(i, t) {
  return /^\n+$/.test(i) ? i.substring(1) : t ? i.replace(/^(?! *$)/gm, t) : i;
}
const Ae = (i, t, e) => i.endsWith(`
`) ? le(e, t) : e.includes(`
`) ? `
` + le(e, t) : (i.endsWith(" ") ? "" : " ") + e, Zs = "flow", Gt = "block", ct = "quoted";
function Ct(i, t, e = "flow", { indentAtStart: s, lineWidth: n = 80, minContentWidth: u = 20, onFold: r, onOverflow: o } = {}) {
  if (!n || n < 0)
    return i;
  const a = Math.max(1 + u, 1 + n - t.length);
  if (i.length <= a)
    return i;
  const l = [], D = {};
  let f = n - t.length;
  typeof s == "number" && (s > n - Math.max(2, u) ? l.push(0) : f = n - s);
  let p, m, A = !1, h = -1, d = -1, y = -1;
  e === Gt && (h = ps(i, h, t.length), h !== -1 && (f = h + a));
  for (let E; E = i[h += 1]; ) {
    if (e === ct && E === "\\") {
      switch (d = h, i[h + 1]) {
        case "x":
          h += 3;
          break;
        case "u":
          h += 5;
          break;
        case "U":
          h += 9;
          break;
        default:
          h += 1;
      }
      y = h;
    }
    if (E === `
`)
      e === Gt && (h = ps(i, h, t.length)), f = h + t.length + a, p = void 0;
    else {
      if (E === " " && m && m !== " " && m !== `
` && m !== "	") {
        const b = i[h + 1];
        b && b !== " " && b !== `
` && b !== "	" && (p = h);
      }
      if (h >= f)
        if (p)
          l.push(p), f = p + a, p = void 0;
        else if (e === ct) {
          for (; m === " " || m === "	"; )
            m = E, E = i[h += 1], A = !0;
          const b = h > y + 1 ? h - 2 : d - 1;
          if (D[b])
            return i;
          l.push(b), D[b] = !0, f = b + a, p = void 0;
        } else
          A = !0;
    }
    m = E;
  }
  if (A && o && o(), l.length === 0)
    return i;
  r && r();
  let F = i.slice(0, l[0]);
  for (let E = 0; E < l.length; ++E) {
    const b = l[E], w = l[E + 1] || i.length;
    b === 0 ? F = `
${t}${i.slice(0, w)}` : (e === ct && D[b] && (F += `${i[b]}\\`), F += `
${t}${i.slice(b + 1, w)}`);
  }
  return F;
}
function ps(i, t, e) {
  let s = t, n = t + 1, u = i[n];
  for (; u === " " || u === "	"; )
    if (t < n + e)
      u = i[++t];
    else {
      do
        u = i[++t];
      while (u && u !== `
`);
      s = t, n = t + 1, u = i[n];
    }
  return s;
}
const At = (i, t) => ({
  indentAtStart: t ? i.indent.length : i.indentAtStart,
  lineWidth: i.options.lineWidth,
  minContentWidth: i.options.minContentWidth
}), bt = (i) => /^(%|---|\.\.\.)/m.test(i);
function Zi(i, t, e) {
  if (!t || t < 0)
    return !1;
  const s = t - e, n = i.length;
  if (n <= s)
    return !1;
  for (let u = 0, r = 0; u < n; ++u)
    if (i[u] === `
`) {
      if (u - r > s)
        return !0;
      if (r = u + 1, n - r <= s)
        return !1;
    }
  return !0;
}
function Xe(i, t) {
  const e = JSON.stringify(i);
  if (t.options.doubleQuotedAsJSON)
    return e;
  const { implicitKey: s } = t, n = t.options.doubleQuotedMinMultiLineLength, u = t.indent || (bt(i) ? "  " : "");
  let r = "", o = 0;
  for (let a = 0, l = e[a]; l; l = e[++a])
    if (l === " " && e[a + 1] === "\\" && e[a + 2] === "n" && (r += e.slice(o, a) + "\\ ", a += 1, o = a, l = "\\"), l === "\\")
      switch (e[a + 1]) {
        case "u":
          {
            r += e.slice(o, a);
            const D = e.substr(a + 2, 4);
            switch (D) {
              case "0000":
                r += "\\0";
                break;
              case "0007":
                r += "\\a";
                break;
              case "000b":
                r += "\\v";
                break;
              case "001b":
                r += "\\e";
                break;
              case "0085":
                r += "\\N";
                break;
              case "00a0":
                r += "\\_";
                break;
              case "2028":
                r += "\\L";
                break;
              case "2029":
                r += "\\P";
                break;
              default:
                D.substr(0, 2) === "00" ? r += "\\x" + D.substr(2) : r += e.substr(a, 6);
            }
            a += 5, o = a + 1;
          }
          break;
        case "n":
          if (s || e[a + 2] === '"' || e.length < n)
            a += 1;
          else {
            for (r += e.slice(o, a) + `

`; e[a + 2] === "\\" && e[a + 3] === "n" && e[a + 4] !== '"'; )
              r += `
`, a += 2;
            r += u, e[a + 2] === " " && (r += "\\"), a += 1, o = a + 1;
          }
          break;
        default:
          a += 1;
      }
  return r = o ? r + e.slice(o) : e, s ? r : Ct(r, u, ct, At(t, !1));
}
function xt(i, t) {
  if (t.options.singleQuote === !1 || t.implicitKey && i.includes(`
`) || /[ \t]\n|\n[ \t]/.test(i))
    return Xe(i, t);
  const e = t.indent || (bt(i) ? "  " : ""), s = "'" + i.replace(/'/g, "''").replace(/\n+/g, `$&
${e}`) + "'";
  return t.implicitKey ? s : Ct(s, e, Zs, At(t, !1));
}
function Ne(i, t) {
  const { singleQuote: e } = t.options;
  let s;
  if (e === !1)
    s = Xe;
  else {
    const n = i.includes('"'), u = i.includes("'");
    n && !u ? s = xt : u && !n ? s = Xe : s = e ? xt : Xe;
  }
  return s(i, t);
}
let Kt;
try {
  Kt = new RegExp(`(^|(?<!
))
+(?!
|$)`, "g");
} catch {
  Kt = /\n+(?!\n|$)/g;
}
function ht({ comment: i, type: t, value: e }, s, n, u) {
  const { blockQuote: r, commentString: o, lineWidth: a } = s.options;
  if (!r || /\n[\t ]+$/.test(e) || /^\s*$/.test(e))
    return Ne(e, s);
  const l = s.indent || (s.forceBlockIndent || bt(e) ? "  " : ""), D = r === "literal" ? !0 : r === "folded" || t === B.BLOCK_FOLDED ? !1 : t === B.BLOCK_LITERAL ? !0 : !Zi(e, a, l.length);
  if (!e)
    return D ? `|
` : `>
`;
  let f, p;
  for (p = e.length; p > 0; --p) {
    const C = e[p - 1];
    if (C !== `
` && C !== "	" && C !== " ")
      break;
  }
  let m = e.substring(p);
  const A = m.indexOf(`
`);
  A === -1 ? f = "-" : e === m || A !== m.length - 1 ? (f = "+", u && u()) : f = "", m && (e = e.slice(0, -m.length), m[m.length - 1] === `
` && (m = m.slice(0, -1)), m = m.replace(Kt, `$&${l}`));
  let h = !1, d, y = -1;
  for (d = 0; d < e.length; ++d) {
    const C = e[d];
    if (C === " ")
      h = !0;
    else if (C === `
`)
      y = d;
    else
      break;
  }
  let F = e.substring(0, y < d ? y + 1 : d);
  F && (e = e.substring(F.length), F = F.replace(/\n+/g, `$&${l}`));
  let b = (D ? "|" : ">") + (h ? l ? "2" : "1" : "") + f;
  if (i && (b += " " + o(i.replace(/ ?[\r\n]+/g, " ")), n && n()), D)
    return e = e.replace(/\n+/g, `$&${l}`), `${b}
${l}${F}${e}${m}`;
  e = e.replace(/\n+/g, `
$&`).replace(/(?:^|\n)([\t ].*)(?:([\n\t ]*)\n(?![\n\t ]))?/g, "$1$2").replace(/\n+/g, `$&${l}`);
  const w = Ct(`${F}${e}${m}`, l, Gt, At(s, !0));
  return `${b}
${l}${w}`;
}
function Xi(i, t, e, s) {
  const { type: n, value: u } = i, { actualString: r, implicitKey: o, indent: a, indentStep: l, inFlow: D } = t;
  if (o && u.includes(`
`) || D && /[[\]{},]/.test(u))
    return Ne(u, t);
  if (!u || /^[\n\t ,[\]{}#&*!|>'"%@`]|^[?-]$|^[?-][ \t]|[\n:][ \t]|[ \t]\n|[\n\t ]#|[\n\t :]$/.test(u))
    return o || D || !u.includes(`
`) ? Ne(u, t) : ht(i, t, e, s);
  if (!o && !D && n !== B.PLAIN && u.includes(`
`))
    return ht(i, t, e, s);
  if (bt(u)) {
    if (a === "")
      return t.forceBlockIndent = !0, ht(i, t, e, s);
    if (o && a === l)
      return Ne(u, t);
  }
  const f = u.replace(/\n+/g, `$&
${a}`);
  if (r) {
    const p = (h) => {
      var d;
      return h.default && h.tag !== "tag:yaml.org,2002:str" && ((d = h.test) == null ? void 0 : d.test(f));
    }, { compat: m, tags: A } = t.doc.schema;
    if (A.some(p) || m != null && m.some(p))
      return Ne(u, t);
  }
  return o ? f : Ct(f, a, Zs, At(t, !1));
}
function Vt(i, t, e, s) {
  const { implicitKey: n, inFlow: u } = t, r = typeof i.value == "string" ? i : Object.assign({}, i, { value: String(i.value) });
  let { type: o } = i;
  o !== B.QUOTE_DOUBLE && /[\x00-\x08\x0b-\x1f\x7f-\x9f\u{D800}-\u{DFFF}]/u.test(r.value) && (o = B.QUOTE_DOUBLE);
  const a = (D) => {
    switch (D) {
      case B.BLOCK_FOLDED:
      case B.BLOCK_LITERAL:
        return n || u ? Ne(r.value, t) : ht(r, t, e, s);
      case B.QUOTE_DOUBLE:
        return Xe(r.value, t);
      case B.QUOTE_SINGLE:
        return xt(r.value, t);
      case B.PLAIN:
        return Xi(r, t, e, s);
      default:
        return null;
    }
  };
  let l = a(o);
  if (l === null) {
    const { defaultKeyType: D, defaultStringType: f } = t.options, p = n && D || f;
    if (l = a(p), l === null)
      throw new Error(`Unsupported default string type ${p}`);
  }
  return l;
}
function Xs(i, t) {
  const e = Object.assign({
    blockQuote: !0,
    commentString: Wi,
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
function Ui(i, t) {
  var n;
  if (t.tag) {
    const u = i.filter((r) => r.tag === t.tag);
    if (u.length > 0)
      return u.find((r) => r.format === t.format) ?? u[0];
  }
  let e, s;
  if (T(t)) {
    s = t.value;
    const u = i.filter((r) => {
      var o;
      return (o = r.identify) == null ? void 0 : o.call(r, s);
    });
    e = u.find((r) => r.format === t.format) ?? u.find((r) => !r.format);
  } else
    s = t, e = i.find((u) => u.nodeClass && s instanceof u.nodeClass);
  if (!e) {
    const u = ((n = s == null ? void 0 : s.constructor) == null ? void 0 : n.name) ?? typeof s;
    throw new Error(`Tag not resolved for ${u} value`);
  }
  return e;
}
function Ji(i, t, { anchors: e, doc: s }) {
  if (!s.directives)
    return "";
  const n = [], u = (T(i) || K(i)) && i.anchor;
  u && js(u) && (e.add(u), n.push(`&${u}`));
  const r = i.tag ? i.tag : t.default ? null : t.tag;
  return r && n.push(s.directives.tagString(r)), n.join(" ");
}
function Te(i, t, e, s) {
  var a;
  if (j(i))
    return i.toString(t, e, s);
  if (Ge(i)) {
    if (t.doc.directives)
      return i.toString(t);
    if ((a = t.resolvedAliases) != null && a.has(i))
      throw new TypeError("Cannot stringify circular structure without alias nodes");
    t.resolvedAliases ? t.resolvedAliases.add(i) : t.resolvedAliases = /* @__PURE__ */ new Set([i]), i = i.resolve(t.doc);
  }
  let n;
  const u = P(i) ? i : t.doc.createNode(i, { onTagObj: (l) => n = l });
  n || (n = Ui(t.doc.schema.tags, u));
  const r = Ji(u, n, t);
  r.length > 0 && (t.indentAtStart = (t.indentAtStart ?? 0) + r.length + 1);
  const o = typeof n.stringify == "function" ? n.stringify(u, t, e, s) : T(u) ? Vt(u, t, e, s) : u.toString(t, e, s);
  return r ? T(u) || o[0] === "{" || o[0] === "[" ? `${r} ${o}` : `${r}
${t.indent}${o}` : o;
}
function Hi({ key: i, value: t }, e, s, n) {
  const { allNullValues: u, doc: r, indent: o, indentStep: a, options: { commentString: l, indentSeq: D, simpleKeys: f } } = e;
  let p = P(i) && i.comment || null;
  if (f) {
    if (p)
      throw new Error("With simple keys, key nodes cannot have comments");
    if (K(i)) {
      const Y = "With simple keys, collection cannot be used as a key value";
      throw new Error(Y);
    }
  }
  let m = !f && (!i || p && t == null && !e.inFlow || K(i) || (T(i) ? i.type === B.BLOCK_FOLDED || i.type === B.BLOCK_LITERAL : typeof i == "object"));
  e = Object.assign({}, e, {
    allNullValues: !1,
    implicitKey: !m && (f || !u),
    indent: o + a
  });
  let A = !1, h = !1, d = Te(i, e, () => A = !0, () => h = !0);
  if (!m && !e.inFlow && d.length > 1024) {
    if (f)
      throw new Error("With simple keys, single line scalar must not span more than 1024 characters");
    m = !0;
  }
  if (e.inFlow) {
    if (u || t == null)
      return A && s && s(), d === "" ? "?" : m ? `? ${d}` : d;
  } else if (u && !f || t == null && m)
    return d = `? ${d}`, p && !A ? d += Ae(d, e.indent, l(p)) : h && n && n(), d;
  A && (p = null), m ? (p && (d += Ae(d, e.indent, l(p))), d = `? ${d}
${o}:`) : (d = `${d}:`, p && (d += Ae(d, e.indent, l(p))));
  let y, F, E;
  P(t) ? (y = !!t.spaceBefore, F = t.commentBefore, E = t.comment) : (y = !1, F = null, E = null, t && typeof t == "object" && (t = r.createNode(t))), e.implicitKey = !1, !m && !p && T(t) && (e.indentAtStart = d.length + 1), h = !1, !D && a.length >= 2 && !e.inFlow && !m && et(t) && !t.flow && !t.tag && !t.anchor && (e.indent = e.indent.substring(2));
  let b = !1;
  const w = Te(t, e, () => b = !0, () => h = !0);
  let C = " ";
  if (p || y || F) {
    if (C = y ? `
` : "", F) {
      const Y = l(F);
      C += `
${le(Y, e.indent)}`;
    }
    w === "" && !e.inFlow ? C === `
` && (C = `

`) : C += `
${e.indent}`;
  } else if (!m && K(t)) {
    const Y = w[0], M = w.indexOf(`
`), Z = M !== -1, ge = e.inFlow ?? t.flow ?? t.items.length === 0;
    if (Z || !ge) {
      let Be = !1;
      if (Z && (Y === "&" || Y === "!")) {
        let R = w.indexOf(" ");
        Y === "&" && R !== -1 && R < M && w[R + 1] === "!" && (R = w.indexOf(" ", R + 1)), (R === -1 || M < R) && (Be = !0);
      }
      Be || (C = `
${e.indent}`);
    }
  } else
    (w === "" || w[0] === `
`) && (C = "");
  return d += C + w, e.inFlow ? b && s && s() : E && !b ? d += Ae(d, e.indent, l(E)) : h && n && n(), d;
}
function Us(i, t) {
  (i === "debug" || i === "warn") && (typeof process < "u" && process.emitWarning ? process.emitWarning(t) : console.warn(t));
}
const Ds = "<<";
function Js(i, t, { key: e, value: s }) {
  if (i != null && i.doc.schema.merge && Vi(e))
    if (s = Ge(s) ? s.resolve(i.doc) : s, et(s))
      for (const n of s.items)
        _t(i, t, n);
    else if (Array.isArray(s))
      for (const n of s)
        _t(i, t, n);
    else
      _t(i, t, s);
  else {
    const n = ee(e, "", i);
    if (t instanceof Map)
      t.set(n, ee(s, n, i));
    else if (t instanceof Set)
      t.add(n);
    else {
      const u = zi(e, n, i), r = ee(s, u, i);
      u in t ? Object.defineProperty(t, u, {
        value: r,
        writable: !0,
        enumerable: !0,
        configurable: !0
      }) : t[u] = r;
    }
  }
  return t;
}
const Vi = (i) => i === Ds || T(i) && i.value === Ds && (!i.type || i.type === B.PLAIN);
function _t(i, t, e) {
  const s = i && Ge(e) ? e.resolve(i.doc) : e;
  if (!Qe(s))
    throw new Error("Merge sources must be maps or map aliases");
  const n = s.toJSON(null, i, Map);
  for (const [u, r] of n)
    t instanceof Map ? t.has(u) || t.set(u, r) : t instanceof Set ? t.add(u) : Object.prototype.hasOwnProperty.call(t, u) || Object.defineProperty(t, u, {
      value: r,
      writable: !0,
      enumerable: !0,
      configurable: !0
    });
  return t;
}
function zi(i, t, e) {
  if (t === null)
    return "";
  if (typeof t != "object")
    return String(t);
  if (P(i) && (e != null && e.doc)) {
    const s = Xs(e.doc, {});
    s.anchors = /* @__PURE__ */ new Set();
    for (const u of e.anchors.keys())
      s.anchors.add(u.anchor);
    s.inFlow = !0, s.inStringifyKey = !0;
    const n = i.toString(s);
    if (!e.mapKeyWarned) {
      let u = JSON.stringify(n);
      u.length > 40 && (u = u.substring(0, 36) + '..."'), Us(e.doc.options.logLevel, `Keys with collection values will be stringified due to JS Object restrictions: ${u}. Set mapAsMap: true to use object keys.`), e.mapKeyWarned = !0;
    }
    return n;
  }
  return JSON.stringify(t);
}
function zt(i, t, e) {
  const s = He(i, void 0, e), n = He(t, void 0, e);
  return new J(s, n);
}
class J {
  constructor(t, e = null) {
    Object.defineProperty(this, te, { value: Ks }), this.key = t, this.value = e;
  }
  clone(t) {
    let { key: e, value: s } = this;
    return P(e) && (e = e.clone(t)), P(s) && (s = s.clone(t)), new J(e, s);
  }
  toJSON(t, e) {
    const s = e != null && e.mapAsMap ? /* @__PURE__ */ new Map() : {};
    return Js(e, s, this);
  }
  toString(t, e, s) {
    return t != null && t.doc ? Hi(this, t, e, s) : JSON.stringify(this);
  }
}
function Hs(i, t, e) {
  return (t.inFlow ?? i.flow ? Qi : qi)(i, t, e);
}
function qi({ comment: i, items: t }, e, { blockItemPrefix: s, flowChars: n, itemIndent: u, onChompKeep: r, onComment: o }) {
  const { indent: a, options: { commentString: l } } = e, D = Object.assign({}, e, { indent: u, type: null });
  let f = !1;
  const p = [];
  for (let A = 0; A < t.length; ++A) {
    const h = t[A];
    let d = null;
    if (P(h))
      !f && h.spaceBefore && p.push(""), pt(e, p, h.commentBefore, f), h.comment && (d = h.comment);
    else if (j(h)) {
      const F = P(h.key) ? h.key : null;
      F && (!f && F.spaceBefore && p.push(""), pt(e, p, F.commentBefore, f));
    }
    f = !1;
    let y = Te(h, D, () => d = null, () => f = !0);
    d && (y += Ae(y, u, l(d))), f && d && (f = !1), p.push(s + y);
  }
  let m;
  if (p.length === 0)
    m = n.start + n.end;
  else {
    m = p[0];
    for (let A = 1; A < p.length; ++A) {
      const h = p[A];
      m += h ? `
${a}${h}` : `
`;
    }
  }
  return i ? (m += `
` + le(l(i), a), o && o()) : f && r && r(), m;
}
function Qi({ items: i }, t, { flowChars: e, itemIndent: s }) {
  const { indent: n, indentStep: u, flowCollectionPadding: r, options: { commentString: o } } = t;
  s += u;
  const a = Object.assign({}, t, {
    indent: s,
    inFlow: !0,
    type: null
  });
  let l = !1, D = 0;
  const f = [];
  for (let A = 0; A < i.length; ++A) {
    const h = i[A];
    let d = null;
    if (P(h))
      h.spaceBefore && f.push(""), pt(t, f, h.commentBefore, !1), h.comment && (d = h.comment);
    else if (j(h)) {
      const F = P(h.key) ? h.key : null;
      F && (F.spaceBefore && f.push(""), pt(t, f, F.commentBefore, !1), F.comment && (l = !0));
      const E = P(h.value) ? h.value : null;
      E ? (E.comment && (d = E.comment), E.commentBefore && (l = !0)) : h.value == null && (F != null && F.comment) && (d = F.comment);
    }
    d && (l = !0);
    let y = Te(h, a, () => d = null);
    A < i.length - 1 && (y += ","), d && (y += Ae(y, s, o(d))), !l && (f.length > D || y.includes(`
`)) && (l = !0), f.push(y), D = f.length;
  }
  const { start: p, end: m } = e;
  if (f.length === 0)
    return p + m;
  if (!l) {
    const A = f.reduce((h, d) => h + d.length + 2, 2);
    l = t.options.lineWidth > 0 && A > t.options.lineWidth;
  }
  if (l) {
    let A = p;
    for (const h of f)
      A += h ? `
${u}${n}${h}` : `
`;
    return `${A}
${n}${m}`;
  } else
    return `${p}${r}${f.join(" ")}${r}${m}`;
}
function pt({ indent: i, options: { commentString: t } }, e, s, n) {
  if (s && n && (s = s.replace(/^\n+/, "")), s) {
    const u = le(t(s), i);
    e.push(u.trimStart());
  }
}
function be(i, t) {
  const e = T(t) ? t.value : t;
  for (const s of i)
    if (j(s) && (s.key === t || s.key === e || T(s.key) && s.key.value === e))
      return s;
}
class Q extends Ht {
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
    const { keepUndefined: n, replacer: u } = s, r = new this(t), o = (a, l) => {
      if (typeof u == "function")
        l = u.call(e, a, l);
      else if (Array.isArray(u) && !u.includes(a))
        return;
      (l !== void 0 || n) && r.items.push(zt(a, l, s));
    };
    if (e instanceof Map)
      for (const [a, l] of e)
        o(a, l);
    else if (e && typeof e == "object")
      for (const a of Object.keys(e))
        o(a, e[a]);
    return typeof t.sortMapEntries == "function" && r.items.sort(t.sortMapEntries), r;
  }
  /**
   * Adds a value to the collection.
   *
   * @param overwrite - If not set `true`, using a key that is already in the
   *   collection will throw. Otherwise, overwrites the previous value.
   */
  add(t, e) {
    var r;
    let s;
    j(t) ? s = t : !t || typeof t != "object" || !("key" in t) ? s = new J(t, t == null ? void 0 : t.value) : s = new J(t.key, t.value);
    const n = be(this.items, s.key), u = (r = this.schema) == null ? void 0 : r.sortMapEntries;
    if (n) {
      if (!e)
        throw new Error(`Key ${s.key} already set`);
      T(n.value) && Ws(s.value) ? n.value.value = s.value : n.value = s.value;
    } else if (u) {
      const o = this.items.findIndex((a) => u(s, a) < 0);
      o === -1 ? this.items.push(s) : this.items.splice(o, 0, s);
    } else
      this.items.push(s);
  }
  delete(t) {
    const e = be(this.items, t);
    return e ? this.items.splice(this.items.indexOf(e), 1).length > 0 : !1;
  }
  get(t, e) {
    const s = be(this.items, t), n = s == null ? void 0 : s.value;
    return (!e && T(n) ? n.value : n) ?? void 0;
  }
  has(t) {
    return !!be(this.items, t);
  }
  set(t, e) {
    this.add(new J(t, e), !0);
  }
  /**
   * @param ctx - Conversion context, originally set in Document#toJS()
   * @param {Class} Type - If set, forces the returned collection type
   * @returns Instance of Type, Map, or Object
   */
  toJSON(t, e, s) {
    const n = s ? new s() : e != null && e.mapAsMap ? /* @__PURE__ */ new Map() : {};
    e != null && e.onCreate && e.onCreate(n);
    for (const u of this.items)
      Js(e, n, u);
    return n;
  }
  toString(t, e, s) {
    if (!t)
      return JSON.stringify(this);
    for (const n of this.items)
      if (!j(n))
        throw new Error(`Map items must all be pairs; found ${JSON.stringify(n)} instead`);
    return !t.allNullValues && this.hasAllNullValues(!1) && (t = Object.assign({}, t, { allNullValues: !0 })), Hs(this, t, {
      blockItemPrefix: "",
      flowChars: { start: "{", end: "}" },
      itemIndent: t.indent || "",
      onChompKeep: s,
      onComment: e
    });
  }
}
const xe = {
  collection: "map",
  default: !0,
  nodeClass: Q,
  tag: "tag:yaml.org,2002:map",
  resolve(i, t) {
    return Qe(i) || t("Expected a mapping for this tag"), i;
  },
  createNode: (i, t, e) => Q.from(i, t, e)
};
class we extends Ht {
  static get tagName() {
    return "tag:yaml.org,2002:seq";
  }
  constructor(t) {
    super(Me, t), this.items = [];
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
    return !e && T(n) ? n.value : n;
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
    T(n) && Ws(e) ? n.value = e : this.items[s] = e;
  }
  toJSON(t, e) {
    const s = [];
    e != null && e.onCreate && e.onCreate(s);
    let n = 0;
    for (const u of this.items)
      s.push(ee(u, String(n++), e));
    return s;
  }
  toString(t, e, s) {
    return t ? Hs(this, t, {
      blockItemPrefix: "- ",
      flowChars: { start: "[", end: "]" },
      itemIndent: (t.indent || "") + "  ",
      onChompKeep: s,
      onComment: e
    }) : JSON.stringify(this);
  }
  static from(t, e, s) {
    const { replacer: n } = s, u = new this(t);
    if (e && Symbol.iterator in Object(e)) {
      let r = 0;
      for (let o of e) {
        if (typeof n == "function") {
          const a = e instanceof Set ? o : String(r++);
          o = n.call(e, a, o);
        }
        u.items.push(He(o, void 0, s));
      }
    }
    return u;
  }
}
function nt(i) {
  let t = T(i) ? i.value : i;
  return t && typeof t == "string" && (t = Number(t)), typeof t == "number" && Number.isInteger(t) && t >= 0 ? t : null;
}
const Ke = {
  collection: "seq",
  default: !0,
  nodeClass: we,
  tag: "tag:yaml.org,2002:seq",
  resolve(i, t) {
    return et(i) || t("Expected a sequence for this tag"), i;
  },
  createNode: (i, t, e) => we.from(i, t, e)
}, Ft = {
  identify: (i) => typeof i == "string",
  default: !0,
  tag: "tag:yaml.org,2002:str",
  resolve: (i) => i,
  stringify(i, t, e, s) {
    return t = Object.assign({ actualString: !0 }, t), Vt(i, t, e, s);
  }
}, Et = {
  identify: (i) => i == null,
  createNode: () => new B(null),
  default: !0,
  tag: "tag:yaml.org,2002:null",
  test: /^(?:~|[Nn]ull|NULL)?$/,
  resolve: () => new B(null),
  stringify: ({ source: i }, t) => typeof i == "string" && Et.test.test(i) ? i : t.options.nullStr
}, qt = {
  identify: (i) => typeof i == "boolean",
  default: !0,
  tag: "tag:yaml.org,2002:bool",
  test: /^(?:[Tt]rue|TRUE|[Ff]alse|FALSE)$/,
  resolve: (i) => new B(i[0] === "t" || i[0] === "T"),
  stringify({ source: i, value: t }, e) {
    if (i && qt.test.test(i)) {
      const s = i[0] === "t" || i[0] === "T";
      if (t === s)
        return i;
    }
    return t ? e.options.trueStr : e.options.falseStr;
  }
};
function ue({ format: i, minFractionDigits: t, tag: e, value: s }) {
  if (typeof s == "bigint")
    return String(s);
  const n = typeof s == "number" ? s : Number(s);
  if (!isFinite(n))
    return isNaN(n) ? ".nan" : n < 0 ? "-.inf" : ".inf";
  let u = JSON.stringify(s);
  if (!i && t && (!e || e === "tag:yaml.org,2002:float") && /^\d/.test(u)) {
    let r = u.indexOf(".");
    r < 0 && (r = u.length, u += ".");
    let o = t - (u.length - r - 1);
    for (; o-- > 0; )
      u += "0";
  }
  return u;
}
const Vs = {
  identify: (i) => typeof i == "number",
  default: !0,
  tag: "tag:yaml.org,2002:float",
  test: /^(?:[-+]?\.(?:inf|Inf|INF|nan|NaN|NAN))$/,
  resolve: (i) => i.slice(-3).toLowerCase() === "nan" ? NaN : i[0] === "-" ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY,
  stringify: ue
}, zs = {
  identify: (i) => typeof i == "number",
  default: !0,
  tag: "tag:yaml.org,2002:float",
  format: "EXP",
  test: /^[-+]?(?:\.[0-9]+|[0-9]+(?:\.[0-9]*)?)[eE][-+]?[0-9]+$/,
  resolve: (i) => parseFloat(i),
  stringify(i) {
    const t = Number(i.value);
    return isFinite(t) ? t.toExponential() : ue(i);
  }
}, qs = {
  identify: (i) => typeof i == "number",
  default: !0,
  tag: "tag:yaml.org,2002:float",
  test: /^[-+]?(?:\.[0-9]+|[0-9]+\.[0-9]*)$/,
  resolve(i) {
    const t = new B(parseFloat(i)), e = i.indexOf(".");
    return e !== -1 && i[i.length - 1] === "0" && (t.minFractionDigits = i.length - e - 1), t;
  },
  stringify: ue
}, wt = (i) => typeof i == "bigint" || Number.isInteger(i), Qt = (i, t, e, { intAsBigInt: s }) => s ? BigInt(i) : parseInt(i.substring(t), e);
function Qs(i, t, e) {
  const { value: s } = i;
  return wt(s) && s >= 0 ? e + s.toString(t) : ue(i);
}
const ei = {
  identify: (i) => wt(i) && i >= 0,
  default: !0,
  tag: "tag:yaml.org,2002:int",
  format: "OCT",
  test: /^0o[0-7]+$/,
  resolve: (i, t, e) => Qt(i, 2, 8, e),
  stringify: (i) => Qs(i, 8, "0o")
}, ti = {
  identify: wt,
  default: !0,
  tag: "tag:yaml.org,2002:int",
  test: /^[-+]?[0-9]+$/,
  resolve: (i, t, e) => Qt(i, 0, 10, e),
  stringify: ue
}, si = {
  identify: (i) => wt(i) && i >= 0,
  default: !0,
  tag: "tag:yaml.org,2002:int",
  format: "HEX",
  test: /^0x[0-9a-fA-F]+$/,
  resolve: (i, t, e) => Qt(i, 2, 16, e),
  stringify: (i) => Qs(i, 16, "0x")
}, en = [
  xe,
  Ke,
  Ft,
  Et,
  qt,
  ei,
  ti,
  si,
  Vs,
  zs,
  qs
];
function gs(i) {
  return typeof i == "bigint" || Number.isInteger(i);
}
const ut = ({ value: i }) => JSON.stringify(i), tn = [
  {
    identify: (i) => typeof i == "string",
    default: !0,
    tag: "tag:yaml.org,2002:str",
    resolve: (i) => i,
    stringify: ut
  },
  {
    identify: (i) => i == null,
    createNode: () => new B(null),
    default: !0,
    tag: "tag:yaml.org,2002:null",
    test: /^null$/,
    resolve: () => null,
    stringify: ut
  },
  {
    identify: (i) => typeof i == "boolean",
    default: !0,
    tag: "tag:yaml.org,2002:bool",
    test: /^true|false$/,
    resolve: (i) => i === "true",
    stringify: ut
  },
  {
    identify: gs,
    default: !0,
    tag: "tag:yaml.org,2002:int",
    test: /^-?(?:0|[1-9][0-9]*)$/,
    resolve: (i, t, { intAsBigInt: e }) => e ? BigInt(i) : parseInt(i, 10),
    stringify: ({ value: i }) => gs(i) ? i.toString() : JSON.stringify(i)
  },
  {
    identify: (i) => typeof i == "number",
    default: !0,
    tag: "tag:yaml.org,2002:float",
    test: /^-?(?:0|[1-9][0-9]*)(?:\.[0-9]*)?(?:[eE][-+]?[0-9]+)?$/,
    resolve: (i) => parseFloat(i),
    stringify: ut
  }
], sn = {
  default: !0,
  tag: "",
  test: /^/,
  resolve(i, t) {
    return t(`Unresolved plain scalar ${JSON.stringify(i)}`), i;
  }
}, nn = [xe, Ke].concat(tn, sn), es = {
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
  stringify({ comment: i, type: t, value: e }, s, n, u) {
    const r = e;
    let o;
    if (typeof Buffer == "function")
      o = r instanceof Buffer ? r.toString("base64") : Buffer.from(r.buffer).toString("base64");
    else if (typeof btoa == "function") {
      let a = "";
      for (let l = 0; l < r.length; ++l)
        a += String.fromCharCode(r[l]);
      o = btoa(a);
    } else
      throw new Error("This environment does not support writing binary tags; either Buffer or btoa is required");
    if (t || (t = B.BLOCK_LITERAL), t !== B.QUOTE_DOUBLE) {
      const a = Math.max(s.options.lineWidth - s.indent.length, s.options.minContentWidth), l = Math.ceil(o.length / a), D = new Array(l);
      for (let f = 0, p = 0; f < l; ++f, p += a)
        D[f] = o.substr(p, a);
      o = D.join(t === B.BLOCK_LITERAL ? `
` : " ");
    }
    return Vt({ comment: i, type: t, value: o }, s, n, u);
  }
};
function ii(i, t) {
  if (et(i))
    for (let e = 0; e < i.items.length; ++e) {
      let s = i.items[e];
      if (!j(s)) {
        if (Qe(s)) {
          s.items.length > 1 && t("Each pair must have its own sequence indicator");
          const n = s.items[0] || new J(new B(null));
          if (s.commentBefore && (n.key.commentBefore = n.key.commentBefore ? `${s.commentBefore}
${n.key.commentBefore}` : s.commentBefore), s.comment) {
            const u = n.value ?? n.key;
            u.comment = u.comment ? `${s.comment}
${u.comment}` : s.comment;
          }
          s = n;
        }
        i.items[e] = j(s) ? s : new J(s);
      }
    }
  else
    t("Expected a sequence for this tag");
  return i;
}
function ni(i, t, e) {
  const { replacer: s } = e, n = new we(i);
  n.tag = "tag:yaml.org,2002:pairs";
  let u = 0;
  if (t && Symbol.iterator in Object(t))
    for (let r of t) {
      typeof s == "function" && (r = s.call(t, String(u++), r));
      let o, a;
      if (Array.isArray(r))
        if (r.length === 2)
          o = r[0], a = r[1];
        else
          throw new TypeError(`Expected [key, value] tuple: ${r}`);
      else if (r && r instanceof Object) {
        const l = Object.keys(r);
        if (l.length === 1)
          o = l[0], a = r[o];
        else
          throw new TypeError(`Expected tuple with one key, not ${l.length} keys`);
      } else
        o = r;
      n.items.push(zt(o, a, e));
    }
  return n;
}
const ts = {
  collection: "seq",
  default: !1,
  tag: "tag:yaml.org,2002:pairs",
  resolve: ii,
  createNode: ni
};
class Oe extends we {
  constructor() {
    super(), this.add = Q.prototype.add.bind(this), this.delete = Q.prototype.delete.bind(this), this.get = Q.prototype.get.bind(this), this.has = Q.prototype.has.bind(this), this.set = Q.prototype.set.bind(this), this.tag = Oe.tag;
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
      let u, r;
      if (j(n) ? (u = ee(n.key, "", e), r = ee(n.value, u, e)) : u = ee(n, "", e), s.has(u))
        throw new Error("Ordered maps must not include duplicate keys");
      s.set(u, r);
    }
    return s;
  }
  static from(t, e, s) {
    const n = ni(t, e, s), u = new this();
    return u.items = n.items, u;
  }
}
Oe.tag = "tag:yaml.org,2002:omap";
const ss = {
  collection: "seq",
  identify: (i) => i instanceof Map,
  nodeClass: Oe,
  default: !1,
  tag: "tag:yaml.org,2002:omap",
  resolve(i, t) {
    const e = ii(i, t), s = [];
    for (const { key: n } of e.items)
      T(n) && (s.includes(n.value) ? t(`Ordered maps must not include duplicate keys: ${n.value}`) : s.push(n.value));
    return Object.assign(new Oe(), e);
  },
  createNode: (i, t, e) => Oe.from(i, t, e)
};
function ui({ value: i, source: t }, e) {
  return t && (i ? ri : oi).test.test(t) ? t : i ? e.options.trueStr : e.options.falseStr;
}
const ri = {
  identify: (i) => i === !0,
  default: !0,
  tag: "tag:yaml.org,2002:bool",
  test: /^(?:Y|y|[Yy]es|YES|[Tt]rue|TRUE|[Oo]n|ON)$/,
  resolve: () => new B(!0),
  stringify: ui
}, oi = {
  identify: (i) => i === !1,
  default: !0,
  tag: "tag:yaml.org,2002:bool",
  test: /^(?:N|n|[Nn]o|NO|[Ff]alse|FALSE|[Oo]ff|OFF)$/,
  resolve: () => new B(!1),
  stringify: ui
}, un = {
  identify: (i) => typeof i == "number",
  default: !0,
  tag: "tag:yaml.org,2002:float",
  test: /^[-+]?\.(?:inf|Inf|INF|nan|NaN|NAN)$/,
  resolve: (i) => i.slice(-3).toLowerCase() === "nan" ? NaN : i[0] === "-" ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY,
  stringify: ue
}, rn = {
  identify: (i) => typeof i == "number",
  default: !0,
  tag: "tag:yaml.org,2002:float",
  format: "EXP",
  test: /^[-+]?(?:[0-9][0-9_]*)?(?:\.[0-9_]*)?[eE][-+]?[0-9]+$/,
  resolve: (i) => parseFloat(i.replace(/_/g, "")),
  stringify(i) {
    const t = Number(i.value);
    return isFinite(t) ? t.toExponential() : ue(i);
  }
}, on = {
  identify: (i) => typeof i == "number",
  default: !0,
  tag: "tag:yaml.org,2002:float",
  test: /^[-+]?(?:[0-9][0-9_]*)?\.[0-9_]*$/,
  resolve(i) {
    const t = new B(parseFloat(i.replace(/_/g, ""))), e = i.indexOf(".");
    if (e !== -1) {
      const s = i.substring(e + 1).replace(/_/g, "");
      s[s.length - 1] === "0" && (t.minFractionDigits = s.length);
    }
    return t;
  },
  stringify: ue
}, tt = (i) => typeof i == "bigint" || Number.isInteger(i);
function It(i, t, e, { intAsBigInt: s }) {
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
    const r = BigInt(i);
    return n === "-" ? BigInt(-1) * r : r;
  }
  const u = parseInt(i, e);
  return n === "-" ? -1 * u : u;
}
function is(i, t, e) {
  const { value: s } = i;
  if (tt(s)) {
    const n = s.toString(t);
    return s < 0 ? "-" + e + n.substr(1) : e + n;
  }
  return ue(i);
}
const an = {
  identify: tt,
  default: !0,
  tag: "tag:yaml.org,2002:int",
  format: "BIN",
  test: /^[-+]?0b[0-1_]+$/,
  resolve: (i, t, e) => It(i, 2, 2, e),
  stringify: (i) => is(i, 2, "0b")
}, ln = {
  identify: tt,
  default: !0,
  tag: "tag:yaml.org,2002:int",
  format: "OCT",
  test: /^[-+]?0[0-7_]+$/,
  resolve: (i, t, e) => It(i, 1, 8, e),
  stringify: (i) => is(i, 8, "0")
}, cn = {
  identify: tt,
  default: !0,
  tag: "tag:yaml.org,2002:int",
  test: /^[-+]?[0-9][0-9_]*$/,
  resolve: (i, t, e) => It(i, 0, 10, e),
  stringify: ue
}, hn = {
  identify: tt,
  default: !0,
  tag: "tag:yaml.org,2002:int",
  format: "HEX",
  test: /^[-+]?0x[0-9a-fA-F_]+$/,
  resolve: (i, t, e) => It(i, 2, 16, e),
  stringify: (i) => is(i, 16, "0x")
};
class $e extends Q {
  constructor(t) {
    super(t), this.tag = $e.tag;
  }
  add(t) {
    let e;
    j(t) ? e = t : t && typeof t == "object" && "key" in t && "value" in t && t.value === null ? e = new J(t.key, null) : e = new J(t, null), be(this.items, e.key) || this.items.push(e);
  }
  /**
   * If `keepPair` is `true`, returns the Pair matching `key`.
   * Otherwise, returns the value of that Pair's key.
   */
  get(t, e) {
    const s = be(this.items, t);
    return !e && j(s) ? T(s.key) ? s.key.value : s.key : s;
  }
  set(t, e) {
    if (typeof e != "boolean")
      throw new Error(`Expected boolean value for set(key, value) in a YAML set, not ${typeof e}`);
    const s = be(this.items, t);
    s && !e ? this.items.splice(this.items.indexOf(s), 1) : !s && e && this.items.push(new J(t));
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
    const { replacer: n } = s, u = new this(t);
    if (e && Symbol.iterator in Object(e))
      for (let r of e)
        typeof n == "function" && (r = n.call(e, r, r)), u.items.push(zt(r, null, s));
    return u;
  }
}
$e.tag = "tag:yaml.org,2002:set";
const ns = {
  collection: "map",
  identify: (i) => i instanceof Set,
  nodeClass: $e,
  default: !1,
  tag: "tag:yaml.org,2002:set",
  createNode: (i, t, e) => $e.from(i, t, e),
  resolve(i, t) {
    if (Qe(i)) {
      if (i.hasAllNullValues(!0))
        return Object.assign(new $e(), i);
      t("Set items must all have null values");
    } else
      t("Expected a mapping for this tag");
    return i;
  }
};
function us(i, t) {
  const e = i[0], s = e === "-" || e === "+" ? i.substring(1) : i, n = (r) => t ? BigInt(r) : Number(r), u = s.replace(/_/g, "").split(":").reduce((r, o) => r * n(60) + n(o), n(0));
  return e === "-" ? n(-1) * u : u;
}
function ai(i) {
  let { value: t } = i, e = (r) => r;
  if (typeof t == "bigint")
    e = (r) => BigInt(r);
  else if (isNaN(t) || !isFinite(t))
    return ue(i);
  let s = "";
  t < 0 && (s = "-", t *= e(-1));
  const n = e(60), u = [t % n];
  return t < 60 ? u.unshift(0) : (t = (t - u[0]) / n, u.unshift(t % n), t >= 60 && (t = (t - u[0]) / n, u.unshift(t))), s + u.map((r) => String(r).padStart(2, "0")).join(":").replace(/000000\d*$/, "");
}
const li = {
  identify: (i) => typeof i == "bigint" || Number.isInteger(i),
  default: !0,
  tag: "tag:yaml.org,2002:int",
  format: "TIME",
  test: /^[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+$/,
  resolve: (i, t, { intAsBigInt: e }) => us(i, e),
  stringify: ai
}, ci = {
  identify: (i) => typeof i == "number",
  default: !0,
  tag: "tag:yaml.org,2002:float",
  format: "TIME",
  test: /^[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+\.[0-9_]*$/,
  resolve: (i) => us(i, !1),
  stringify: ai
}, Bt = {
  identify: (i) => i instanceof Date,
  default: !0,
  tag: "tag:yaml.org,2002:timestamp",
  // If the time zone is omitted, the timestamp is assumed to be specified in UTC. The time part
  // may be omitted altogether, resulting in a date format. In such a case, the time part is
  // assumed to be 00:00:00Z (start of day, UTC).
  test: RegExp("^([0-9]{4})-([0-9]{1,2})-([0-9]{1,2})(?:(?:t|T|[ \\t]+)([0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2}(\\.[0-9]+)?)(?:[ \\t]*(Z|[-+][012]?[0-9](?::[0-9]{2})?))?)?$"),
  resolve(i) {
    const t = i.match(Bt.test);
    if (!t)
      throw new Error("!!timestamp expects a date, starting with yyyy-mm-dd");
    const [, e, s, n, u, r, o] = t.map(Number), a = t[7] ? Number((t[7] + "00").substr(1, 3)) : 0;
    let l = Date.UTC(e, s - 1, n, u || 0, r || 0, o || 0, a);
    const D = t[8];
    if (D && D !== "Z") {
      let f = us(D, !1);
      Math.abs(f) < 30 && (f *= 60), l -= 6e4 * f;
    }
    return new Date(l);
  },
  stringify: ({ value: i }) => i.toISOString().replace(/((T00:00)?:00)?\.000Z$/, "")
}, ms = [
  xe,
  Ke,
  Ft,
  Et,
  ri,
  oi,
  an,
  ln,
  cn,
  hn,
  un,
  rn,
  on,
  es,
  ss,
  ts,
  ns,
  li,
  ci,
  Bt
], ys = /* @__PURE__ */ new Map([
  ["core", en],
  ["failsafe", [xe, Ke, Ft]],
  ["json", nn],
  ["yaml11", ms],
  ["yaml-1.1", ms]
]), Cs = {
  binary: es,
  bool: qt,
  float: qs,
  floatExp: zs,
  floatNaN: Vs,
  floatTime: ci,
  int: ti,
  intHex: si,
  intOct: ei,
  intTime: li,
  map: xe,
  null: Et,
  omap: ss,
  pairs: ts,
  seq: Ke,
  set: ns,
  timestamp: Bt
}, fn = {
  "tag:yaml.org,2002:binary": es,
  "tag:yaml.org,2002:omap": ss,
  "tag:yaml.org,2002:pairs": ts,
  "tag:yaml.org,2002:set": ns,
  "tag:yaml.org,2002:timestamp": Bt
};
function kt(i, t) {
  let e = ys.get(t);
  if (!e)
    if (Array.isArray(i))
      e = [];
    else {
      const s = Array.from(ys.keys()).filter((n) => n !== "yaml11").map((n) => JSON.stringify(n)).join(", ");
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
    const n = Cs[s];
    if (n)
      return n;
    const u = Object.keys(Cs).map((r) => JSON.stringify(r)).join(", ");
    throw new Error(`Unknown custom tag "${s}"; use one of ${u}`);
  });
}
const dn = (i, t) => i.key < t.key ? -1 : i.key > t.key ? 1 : 0;
class rs {
  constructor({ compat: t, customTags: e, merge: s, resolveKnownTags: n, schema: u, sortMapEntries: r, toStringDefaults: o }) {
    this.compat = Array.isArray(t) ? kt(t, "compat") : t ? kt(null, t) : null, this.merge = !!s, this.name = typeof u == "string" && u || "core", this.knownTags = n ? fn : {}, this.tags = kt(e, this.name), this.toStringOptions = o ?? null, Object.defineProperty(this, pe, { value: xe }), Object.defineProperty(this, he, { value: Ft }), Object.defineProperty(this, Me, { value: Ke }), this.sortMapEntries = typeof r == "function" ? r : r === !0 ? dn : null;
  }
  clone() {
    const t = Object.create(rs.prototype, Object.getOwnPropertyDescriptors(this));
    return t.tags = this.tags.slice(), t;
  }
}
function pn(i, t) {
  var a;
  const e = [];
  let s = t.directives === !0;
  if (t.directives !== !1 && i.directives) {
    const l = i.directives.toString(i);
    l ? (e.push(l), s = !0) : i.directives.docStart && (s = !0);
  }
  s && e.push("---");
  const n = Xs(i, t), { commentString: u } = n.options;
  if (i.commentBefore) {
    e.length !== 1 && e.unshift("");
    const l = u(i.commentBefore);
    e.unshift(le(l, ""));
  }
  let r = !1, o = null;
  if (i.contents) {
    if (P(i.contents)) {
      if (i.contents.spaceBefore && s && e.push(""), i.contents.commentBefore) {
        const f = u(i.contents.commentBefore);
        e.push(le(f, ""));
      }
      n.forceBlockIndent = !!i.comment, o = i.contents.comment;
    }
    const l = o ? void 0 : () => r = !0;
    let D = Te(i.contents, n, () => o = null, l);
    o && (D += Ae(D, "", u(o))), (D[0] === "|" || D[0] === ">") && e[e.length - 1] === "---" ? e[e.length - 1] = `--- ${D}` : e.push(D);
  } else
    e.push(Te(i.contents, n));
  if ((a = i.directives) != null && a.docEnd)
    if (i.comment) {
      const l = u(i.comment);
      l.includes(`
`) ? (e.push("..."), e.push(le(l, ""))) : e.push(`... ${l}`);
    } else
      e.push("...");
  else {
    let l = i.comment;
    l && r && (l = l.replace(/^\n+/, "")), l && ((!r || o) && e[e.length - 1] !== "" && e.push(""), e.push(le(u(l), "")));
  }
  return e.join(`
`) + `
`;
}
class st {
  constructor(t, e, s) {
    this.commentBefore = null, this.comment = null, this.errors = [], this.warnings = [], Object.defineProperty(this, te, { value: Mt });
    let n = null;
    typeof e == "function" || Array.isArray(e) ? n = e : s === void 0 && e && (s = e, e = void 0);
    const u = Object.assign({
      intAsBigInt: !1,
      keepSourceTokens: !1,
      logLevel: "warn",
      prettyErrors: !0,
      strict: !0,
      uniqueKeys: !0,
      version: "1.2"
    }, s);
    this.options = u;
    let { version: r } = u;
    s != null && s._directives ? (this.directives = s._directives.atDocument(), this.directives.yaml.explicit && (r = this.directives.yaml.version)) : this.directives = new X({ version: r }), this.setSchema(r, s), this.contents = t === void 0 ? null : this.createNode(t, n, s);
  }
  /**
   * Create a deep copy of this Document and its contents.
   *
   * Custom Node values that inherit from `Object` still refer to their original instances.
   */
  clone() {
    const t = Object.create(st.prototype, {
      [te]: { value: Mt }
    });
    return t.commentBefore = this.commentBefore, t.comment = this.comment, t.errors = this.errors.slice(), t.warnings = this.warnings.slice(), t.options = Object.assign({}, this.options), this.directives && (t.directives = this.directives.clone()), t.schema = this.schema.clone(), t.contents = P(this.contents) ? this.contents.clone(t.schema) : this.contents, this.range && (t.range = this.range.slice()), t;
  }
  /** Adds a value to the document. */
  add(t) {
    Se(this.contents) && this.contents.add(t);
  }
  /** Adds a value to the document. */
  addIn(t, e) {
    Se(this.contents) && this.contents.addIn(t, e);
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
      const s = Ps(this);
      t.anchor = // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
      !e || s.has(e) ? Rs(e || "a", s) : e;
    }
    return new Jt(t.anchor);
  }
  createNode(t, e, s) {
    let n;
    if (typeof e == "function")
      t = e.call({ "": t }, "", t), n = e;
    else if (Array.isArray(e)) {
      const d = (F) => typeof F == "number" || F instanceof String || F instanceof Number, y = e.filter(d).map(String);
      y.length > 0 && (e = e.concat(y)), n = e;
    } else
      s === void 0 && e && (s = e, e = void 0);
    const { aliasDuplicateObjects: u, anchorPrefix: r, flow: o, keepUndefined: a, onTagObj: l, tag: D } = s ?? {}, { onAnchor: f, setAnchors: p, sourceObjects: m } = ji(
      this,
      // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
      r || "a"
    ), A = {
      aliasDuplicateObjects: u ?? !0,
      keepUndefined: a ?? !1,
      onAnchor: f,
      onTagObj: l,
      replacer: n,
      schema: this.schema,
      sourceObjects: m
    }, h = He(t, D, A);
    return o && K(h) && (h.flow = !0), p(), h;
  }
  /**
   * Convert a key and a value into a `Pair` using the current schema,
   * recursively wrapping all values as `Scalar` or `Collection` nodes.
   */
  createPair(t, e, s = {}) {
    const n = this.createNode(t, null, s), u = this.createNode(e, null, s);
    return new J(n, u);
  }
  /**
   * Removes a value from the document.
   * @returns `true` if the item was found and removed.
   */
  delete(t) {
    return Se(this.contents) ? this.contents.delete(t) : !1;
  }
  /**
   * Removes a value from the document.
   * @returns `true` if the item was found and removed.
   */
  deleteIn(t) {
    return Pe(t) ? this.contents == null ? !1 : (this.contents = null, !0) : Se(this.contents) ? this.contents.deleteIn(t) : !1;
  }
  /**
   * Returns item at `key`, or `undefined` if not found. By default unwraps
   * scalar values from their surrounding node; to disable set `keepScalar` to
   * `true` (collections are always returned intact).
   */
  get(t, e) {
    return K(this.contents) ? this.contents.get(t, e) : void 0;
  }
  /**
   * Returns item at `path`, or `undefined` if not found. By default unwraps
   * scalar values from their surrounding node; to disable set `keepScalar` to
   * `true` (collections are always returned intact).
   */
  getIn(t, e) {
    return Pe(t) ? !e && T(this.contents) ? this.contents.value : this.contents : K(this.contents) ? this.contents.getIn(t, e) : void 0;
  }
  /**
   * Checks if the document includes a value with the key `key`.
   */
  has(t) {
    return K(this.contents) ? this.contents.has(t) : !1;
  }
  /**
   * Checks if the document includes a value at `path`.
   */
  hasIn(t) {
    return Pe(t) ? this.contents !== void 0 : K(this.contents) ? this.contents.hasIn(t) : !1;
  }
  /**
   * Sets a value in this document. For `!!set`, `value` needs to be a
   * boolean to add/remove the item from the set.
   */
  set(t, e) {
    this.contents == null ? this.contents = dt(this.schema, [t], e) : Se(this.contents) && this.contents.set(t, e);
  }
  /**
   * Sets a value in this document. For `!!set`, `value` needs to be a
   * boolean to add/remove the item from the set.
   */
  setIn(t, e) {
    Pe(t) ? this.contents = e : this.contents == null ? this.contents = dt(this.schema, Array.from(t), e) : Se(this.contents) && this.contents.setIn(t, e);
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
        this.directives ? this.directives.yaml.version = "1.1" : this.directives = new X({ version: "1.1" }), s = { merge: !0, resolveKnownTags: !1, schema: "yaml-1.1" };
        break;
      case "1.2":
      case "next":
        this.directives ? this.directives.yaml.version = t : this.directives = new X({ version: t }), s = { merge: !1, resolveKnownTags: !0, schema: "core" };
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
      this.schema = new rs(Object.assign(s, e));
    else
      throw new Error("With a null YAML version, the { schema: Schema } option is required");
  }
  // json & jsonArg are only used from toJSON()
  toJS({ json: t, jsonArg: e, mapAsMap: s, maxAliasCount: n, onAnchor: u, reviver: r } = {}) {
    const o = {
      anchors: /* @__PURE__ */ new Map(),
      doc: this,
      keep: !t,
      mapAsMap: s === !0,
      mapKeyWarned: !1,
      maxAliasCount: typeof n == "number" ? n : 100
    }, a = ee(this.contents, e ?? "", o);
    if (typeof u == "function")
      for (const { count: l, res: D } of o.anchors.values())
        u(D, l);
    return typeof r == "function" ? ve(r, { "": a }, "", a) : a;
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
    return pn(this, t);
  }
}
function Se(i) {
  if (K(i))
    return !0;
  throw new Error("Expected a YAML collection as document contents");
}
class hi extends Error {
  constructor(t, e, s, n) {
    super(), this.name = t, this.code = s, this.message = n, this.pos = e;
  }
}
class Re extends hi {
  constructor(t, e, s) {
    super("YAMLParseError", t, e, s);
  }
}
class Dn extends hi {
  constructor(t, e, s) {
    super("YAMLWarning", t, e, s);
  }
}
const As = (i, t) => (e) => {
  if (e.pos[0] === -1)
    return;
  e.linePos = e.pos.map((o) => t.linePos(o));
  const { line: s, col: n } = e.linePos[0];
  e.message += ` at line ${s}, column ${n}`;
  let u = n - 1, r = i.substring(t.lineStarts[s - 1], t.lineStarts[s]).replace(/[\n\r]+$/, "");
  if (u >= 60 && r.length > 80) {
    const o = Math.min(u - 39, r.length - 79);
    r = "…" + r.substring(o), u -= o - 1;
  }
  if (r.length > 80 && (r = r.substring(0, 79) + "…"), s > 1 && /^ *$/.test(r.substring(0, u))) {
    let o = i.substring(t.lineStarts[s - 2], t.lineStarts[s - 1]);
    o.length > 80 && (o = o.substring(0, 79) + `…
`), r = o + r;
  }
  if (/[^ ]/.test(r)) {
    let o = 1;
    const a = e.linePos[1];
    a && a.line === s && a.col > n && (o = Math.max(1, Math.min(a.col - n, 80 - u)));
    const l = " ".repeat(u) + "^".repeat(o);
    e.message += `:

${r}
${l}
`;
  }
};
function Ye(i, { flow: t, indicator: e, next: s, offset: n, onError: u, startOnNewline: r }) {
  let o = !1, a = r, l = r, D = "", f = "", p = !1, m = !1, A = !1, h = null, d = null, y = null, F = null, E = null;
  for (const C of i)
    switch (A && (C.type !== "space" && C.type !== "newline" && C.type !== "comma" && u(C.offset, "MISSING_CHAR", "Tags and anchors must be separated from the next token by white space"), A = !1), C.type) {
      case "space":
        !t && a && e !== "doc-start" && C.source[0] === "	" && u(C, "TAB_AS_INDENT", "Tabs are not allowed as indentation"), l = !0;
        break;
      case "comment": {
        l || u(C, "MISSING_CHAR", "Comments must be separated from other tokens by white space characters");
        const Y = C.source.substring(1) || " ";
        D ? D += f + Y : D = Y, f = "", a = !1;
        break;
      }
      case "newline":
        a ? D ? D += C.source : o = !0 : f += C.source, a = !0, p = !0, (h || d) && (m = !0), l = !0;
        break;
      case "anchor":
        h && u(C, "MULTIPLE_ANCHORS", "A node can have at most one anchor"), C.source.endsWith(":") && u(C.offset + C.source.length - 1, "BAD_ALIAS", "Anchor ending in : is ambiguous", !0), h = C, E === null && (E = C.offset), a = !1, l = !1, A = !0;
        break;
      case "tag": {
        d && u(C, "MULTIPLE_TAGS", "A node can have at most one tag"), d = C, E === null && (E = C.offset), a = !1, l = !1, A = !0;
        break;
      }
      case e:
        (h || d) && u(C, "BAD_PROP_ORDER", `Anchors and tags must be after the ${C.source} indicator`), F && u(C, "UNEXPECTED_TOKEN", `Unexpected ${C.source} in ${t ?? "collection"}`), F = C, a = !1, l = !1;
        break;
      case "comma":
        if (t) {
          y && u(C, "UNEXPECTED_TOKEN", `Unexpected , in ${t}`), y = C, a = !1, l = !1;
          break;
        }
      default:
        u(C, "UNEXPECTED_TOKEN", `Unexpected ${C.type} token`), a = !1, l = !1;
    }
  const b = i[i.length - 1], w = b ? b.offset + b.source.length : n;
  return A && s && s.type !== "space" && s.type !== "newline" && s.type !== "comma" && (s.type !== "scalar" || s.source !== "") && u(s.offset, "MISSING_CHAR", "Tags and anchors must be separated from the next token by white space"), {
    comma: y,
    found: F,
    spaceBefore: o,
    comment: D,
    hasNewline: p,
    hasNewlineAfterProp: m,
    anchor: h,
    tag: d,
    end: w,
    start: E ?? w
  };
}
function Ve(i) {
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
        if (Ve(t.key) || Ve(t.value))
          return !0;
      }
      return !1;
    default:
      return !0;
  }
}
function jt(i, t, e) {
  if ((t == null ? void 0 : t.type) === "flow-collection") {
    const s = t.end[0];
    s.indent === i && (s.source === "]" || s.source === "}") && Ve(t) && e(s, "BAD_INDENT", "Flow end indicator should be more indented than parent", !0);
  }
}
function fi(i, t, e) {
  const { uniqueKeys: s } = i.options;
  if (s === !1)
    return !1;
  const n = typeof s == "function" ? s : (u, r) => u === r || T(u) && T(r) && u.value === r.value && !(u.value === "<<" && i.schema.merge);
  return t.some((u) => n(u.key, e));
}
const bs = "All mapping items must start at the same column";
function gn({ composeNode: i, composeEmptyNode: t }, e, s, n, u) {
  var D;
  const r = (u == null ? void 0 : u.nodeClass) ?? Q, o = new r(e.schema);
  e.atRoot && (e.atRoot = !1);
  let a = s.offset, l = null;
  for (const f of s.items) {
    const { start: p, key: m, sep: A, value: h } = f, d = Ye(p, {
      indicator: "explicit-key-ind",
      next: m ?? (A == null ? void 0 : A[0]),
      offset: a,
      onError: n,
      startOnNewline: !0
    }), y = !d.found;
    if (y) {
      if (m && (m.type === "block-seq" ? n(a, "BLOCK_AS_IMPLICIT_KEY", "A block sequence may not be used as an implicit map key") : "indent" in m && m.indent !== s.indent && n(a, "BAD_INDENT", bs)), !d.anchor && !d.tag && !A) {
        l = d.end, d.comment && (o.comment ? o.comment += `
` + d.comment : o.comment = d.comment);
        continue;
      }
      (d.hasNewlineAfterProp || Ve(m)) && n(m ?? p[p.length - 1], "MULTILINE_IMPLICIT_KEY", "Implicit keys need to be on a single line");
    } else
      ((D = d.found) == null ? void 0 : D.indent) !== s.indent && n(a, "BAD_INDENT", bs);
    const F = d.end, E = m ? i(e, m, d, n) : t(e, F, p, null, d, n);
    e.schema.compat && jt(s.indent, m, n), fi(e, o.items, E) && n(F, "DUPLICATE_KEY", "Map keys must be unique");
    const b = Ye(A ?? [], {
      indicator: "map-value-ind",
      next: h,
      offset: E.range[2],
      onError: n,
      startOnNewline: !m || m.type === "block-scalar"
    });
    if (a = b.end, b.found) {
      y && ((h == null ? void 0 : h.type) === "block-map" && !b.hasNewline && n(a, "BLOCK_AS_IMPLICIT_KEY", "Nested mappings are not allowed in compact mappings"), e.options.strict && d.start < b.found.offset - 1024 && n(E.range, "KEY_OVER_1024_CHARS", "The : indicator must be at most 1024 chars after the start of an implicit block mapping key"));
      const w = h ? i(e, h, b, n) : t(e, a, A, null, b, n);
      e.schema.compat && jt(s.indent, h, n), a = w.range[2];
      const C = new J(E, w);
      e.options.keepSourceTokens && (C.srcToken = f), o.items.push(C);
    } else {
      y && n(E.range, "MISSING_CHAR", "Implicit map keys need to be followed by map values"), b.comment && (E.comment ? E.comment += `
` + b.comment : E.comment = b.comment);
      const w = new J(E);
      e.options.keepSourceTokens && (w.srcToken = f), o.items.push(w);
    }
  }
  return l && l < a && n(l, "IMPOSSIBLE", "Map comment with trailing content"), o.range = [s.offset, a, l ?? a], o;
}
function mn({ composeNode: i, composeEmptyNode: t }, e, s, n, u) {
  const r = (u == null ? void 0 : u.nodeClass) ?? we, o = new r(e.schema);
  e.atRoot && (e.atRoot = !1);
  let a = s.offset, l = null;
  for (const { start: D, value: f } of s.items) {
    const p = Ye(D, {
      indicator: "seq-item-ind",
      next: f,
      offset: a,
      onError: n,
      startOnNewline: !0
    });
    if (!p.found)
      if (p.anchor || p.tag || f)
        f && f.type === "block-seq" ? n(p.end, "BAD_INDENT", "All sequence items must start at the same column") : n(a, "MISSING_CHAR", "Sequence item without - indicator");
      else {
        l = p.end, p.comment && (o.comment = p.comment);
        continue;
      }
    const m = f ? i(e, f, p, n) : t(e, p.end, D, null, p, n);
    e.schema.compat && jt(s.indent, f, n), a = m.range[2], o.items.push(m);
  }
  return o.range = [s.offset, a, l ?? a], o;
}
function it(i, t, e, s) {
  let n = "";
  if (i) {
    let u = !1, r = "";
    for (const o of i) {
      const { source: a, type: l } = o;
      switch (l) {
        case "space":
          u = !0;
          break;
        case "comment": {
          e && !u && s(o, "MISSING_CHAR", "Comments must be separated from other tokens by white space characters");
          const D = a.substring(1) || " ";
          n ? n += r + D : n = D, r = "";
          break;
        }
        case "newline":
          n && (r += a), u = !0;
          break;
        default:
          s(o, "UNEXPECTED_TOKEN", `Unexpected ${l} at node end`);
      }
      t += a.length;
    }
  }
  return { comment: n, offset: t };
}
const vt = "Block collections are not allowed within flow collections", Nt = (i) => i && (i.type === "block-map" || i.type === "block-seq");
function yn({ composeNode: i, composeEmptyNode: t }, e, s, n, u) {
  const r = s.start.source === "{", o = r ? "flow map" : "flow sequence", a = (u == null ? void 0 : u.nodeClass) ?? (r ? Q : we), l = new a(e.schema);
  l.flow = !0;
  const D = e.atRoot;
  D && (e.atRoot = !1);
  let f = s.offset + s.start.source.length;
  for (let d = 0; d < s.items.length; ++d) {
    const y = s.items[d], { start: F, key: E, sep: b, value: w } = y, C = Ye(F, {
      flow: o,
      indicator: "explicit-key-ind",
      next: E ?? (b == null ? void 0 : b[0]),
      offset: f,
      onError: n,
      startOnNewline: !1
    });
    if (!C.found) {
      if (!C.anchor && !C.tag && !b && !w) {
        d === 0 && C.comma ? n(C.comma, "UNEXPECTED_TOKEN", `Unexpected , in ${o}`) : d < s.items.length - 1 && n(C.start, "UNEXPECTED_TOKEN", `Unexpected empty item in ${o}`), C.comment && (l.comment ? l.comment += `
` + C.comment : l.comment = C.comment), f = C.end;
        continue;
      }
      !r && e.options.strict && Ve(E) && n(
        E,
        // checked by containsNewline()
        "MULTILINE_IMPLICIT_KEY",
        "Implicit keys of flow sequence pairs need to be on a single line"
      );
    }
    if (d === 0)
      C.comma && n(C.comma, "UNEXPECTED_TOKEN", `Unexpected , in ${o}`);
    else if (C.comma || n(C.start, "MISSING_CHAR", `Missing , between ${o} items`), C.comment) {
      let Y = "";
      e:
        for (const M of F)
          switch (M.type) {
            case "comma":
            case "space":
              break;
            case "comment":
              Y = M.source.substring(1);
              break e;
            default:
              break e;
          }
      if (Y) {
        let M = l.items[l.items.length - 1];
        j(M) && (M = M.value ?? M.key), M.comment ? M.comment += `
` + Y : M.comment = Y, C.comment = C.comment.substring(Y.length + 1);
      }
    }
    if (!r && !b && !C.found) {
      const Y = w ? i(e, w, C, n) : t(e, C.end, b, null, C, n);
      l.items.push(Y), f = Y.range[2], Nt(w) && n(Y.range, "BLOCK_IN_FLOW", vt);
    } else {
      const Y = C.end, M = E ? i(e, E, C, n) : t(e, Y, F, null, C, n);
      Nt(E) && n(M.range, "BLOCK_IN_FLOW", vt);
      const Z = Ye(b ?? [], {
        flow: o,
        indicator: "map-value-ind",
        next: w,
        offset: M.range[2],
        onError: n,
        startOnNewline: !1
      });
      if (Z.found) {
        if (!r && !C.found && e.options.strict) {
          if (b)
            for (const R of b) {
              if (R === Z.found)
                break;
              if (R.type === "newline") {
                n(R, "MULTILINE_IMPLICIT_KEY", "Implicit keys of flow sequence pairs need to be on a single line");
                break;
              }
            }
          C.start < Z.found.offset - 1024 && n(Z.found, "KEY_OVER_1024_CHARS", "The : indicator must be at most 1024 chars after the start of an implicit flow sequence key");
        }
      } else
        w && ("source" in w && w.source && w.source[0] === ":" ? n(w, "MISSING_CHAR", `Missing space after : in ${o}`) : n(Z.start, "MISSING_CHAR", `Missing , or : between ${o} items`));
      const ge = w ? i(e, w, Z, n) : Z.found ? t(e, Z.end, b, null, Z, n) : null;
      ge ? Nt(w) && n(ge.range, "BLOCK_IN_FLOW", vt) : Z.comment && (M.comment ? M.comment += `
` + Z.comment : M.comment = Z.comment);
      const Be = new J(M, ge);
      if (e.options.keepSourceTokens && (Be.srcToken = y), r) {
        const R = l;
        fi(e, R.items, M) && n(Y, "DUPLICATE_KEY", "Map keys must be unique"), R.items.push(Be);
      } else {
        const R = new Q(e.schema);
        R.flow = !0, R.items.push(Be), l.items.push(R);
      }
      f = ge ? ge.range[2] : Z.end;
    }
  }
  const p = r ? "}" : "]", [m, ...A] = s.end;
  let h = f;
  if (m && m.source === p)
    h = m.offset + m.source.length;
  else {
    const d = o[0].toUpperCase() + o.substring(1), y = D ? `${d} must end with a ${p}` : `${d} in block collection must be sufficiently indented and end with a ${p}`;
    n(f, D ? "MISSING_CHAR" : "BAD_INDENT", y), m && m.source.length !== 1 && A.unshift(m);
  }
  if (A.length > 0) {
    const d = it(A, h, e.options.strict, n);
    d.comment && (l.comment ? l.comment += `
` + d.comment : l.comment = d.comment), l.range = [s.offset, h, d.offset];
  } else
    l.range = [s.offset, h, h];
  return l;
}
function Lt(i, t, e, s, n, u) {
  const r = e.type === "block-map" ? gn(i, t, e, s, u) : e.type === "block-seq" ? mn(i, t, e, s, u) : yn(i, t, e, s, u), o = r.constructor;
  return n === "!" || n === o.tagName ? (r.tag = o.tagName, r) : (n && (r.tag = n), r);
}
function Cn(i, t, e, s, n) {
  var f;
  const u = s ? t.directives.tagName(s.source, (p) => n(s, "TAG_RESOLVE_FAILED", p)) : null, r = e.type === "block-map" ? "map" : e.type === "block-seq" ? "seq" : e.start.source === "{" ? "map" : "seq";
  if (!s || !u || u === "!" || u === Q.tagName && r === "map" || u === we.tagName && r === "seq" || !r)
    return Lt(i, t, e, n, u);
  let o = t.schema.tags.find((p) => p.tag === u && p.collection === r);
  if (!o) {
    const p = t.schema.knownTags[u];
    if (p && p.collection === r)
      t.schema.tags.push(Object.assign({}, p, { default: !1 })), o = p;
    else
      return p != null && p.collection ? n(s, "BAD_COLLECTION_TYPE", `${p.tag} used for ${r} collection, but expects ${p.collection}`, !0) : n(s, "TAG_RESOLVE_FAILED", `Unresolved tag: ${u}`, !0), Lt(i, t, e, n, u);
  }
  const a = Lt(i, t, e, n, u, o), l = ((f = o.resolve) == null ? void 0 : f.call(o, a, (p) => n(s, "TAG_RESOLVE_FAILED", p), t.options)) ?? a, D = P(l) ? l : new B(l);
  return D.range = a.range, D.tag = u, o != null && o.format && (D.format = o.format), D;
}
function An(i, t, e) {
  const s = i.offset, n = bn(i, t, e);
  if (!n)
    return { value: "", type: null, comment: "", range: [s, s, s] };
  const u = n.mode === ">" ? B.BLOCK_FOLDED : B.BLOCK_LITERAL, r = i.source ? Fn(i.source) : [];
  let o = r.length;
  for (let h = r.length - 1; h >= 0; --h) {
    const d = r[h][1];
    if (d === "" || d === "\r")
      o = h;
    else
      break;
  }
  if (o === 0) {
    const h = n.chomp === "+" && r.length > 0 ? `
`.repeat(Math.max(1, r.length - 1)) : "";
    let d = s + n.length;
    return i.source && (d += i.source.length), { value: h, type: u, comment: n.comment, range: [s, d, d] };
  }
  let a = i.indent + n.indent, l = i.offset + n.length, D = 0;
  for (let h = 0; h < o; ++h) {
    const [d, y] = r[h];
    if (y === "" || y === "\r")
      n.indent === 0 && d.length > a && (a = d.length);
    else {
      d.length < a && e(l + d.length, "MISSING_CHAR", "Block scalars with more-indented leading empty lines must use an explicit indentation indicator"), n.indent === 0 && (a = d.length), D = h;
      break;
    }
    l += d.length + y.length + 1;
  }
  for (let h = r.length - 1; h >= o; --h)
    r[h][0].length > a && (o = h + 1);
  let f = "", p = "", m = !1;
  for (let h = 0; h < D; ++h)
    f += r[h][0].slice(a) + `
`;
  for (let h = D; h < o; ++h) {
    let [d, y] = r[h];
    l += d.length + y.length + 1;
    const F = y[y.length - 1] === "\r";
    if (F && (y = y.slice(0, -1)), y && d.length < a) {
      const b = `Block scalar lines must not be less indented than their ${n.indent ? "explicit indentation indicator" : "first line"}`;
      e(l - y.length - (F ? 2 : 1), "BAD_INDENT", b), d = "";
    }
    u === B.BLOCK_LITERAL ? (f += p + d.slice(a) + y, p = `
`) : d.length > a || y[0] === "	" ? (p === " " ? p = `
` : !m && p === `
` && (p = `

`), f += p + d.slice(a) + y, p = `
`, m = !0) : y === "" ? p === `
` ? f += `
` : p = `
` : (f += p + y, p = " ", m = !1);
  }
  switch (n.chomp) {
    case "-":
      break;
    case "+":
      for (let h = o; h < r.length; ++h)
        f += `
` + r[h][0].slice(a);
      f[f.length - 1] !== `
` && (f += `
`);
      break;
    default:
      f += `
`;
  }
  const A = s + n.length + i.source.length;
  return { value: f, type: u, comment: n.comment, range: [s, A, A] };
}
function bn({ offset: i, props: t }, e, s) {
  if (t[0].type !== "block-scalar-header")
    return s(t[0], "IMPOSSIBLE", "Block scalar header not found"), null;
  const { source: n } = t[0], u = n[0];
  let r = 0, o = "", a = -1;
  for (let p = 1; p < n.length; ++p) {
    const m = n[p];
    if (!o && (m === "-" || m === "+"))
      o = m;
    else {
      const A = Number(m);
      !r && A ? r = A : a === -1 && (a = i + p);
    }
  }
  a !== -1 && s(a, "UNEXPECTED_TOKEN", `Block scalar header includes extra characters: ${n}`);
  let l = !1, D = "", f = n.length;
  for (let p = 1; p < t.length; ++p) {
    const m = t[p];
    switch (m.type) {
      case "space":
        l = !0;
      case "newline":
        f += m.source.length;
        break;
      case "comment":
        e && !l && s(m, "MISSING_CHAR", "Comments must be separated from other tokens by white space characters"), f += m.source.length, D = m.source.substring(1);
        break;
      case "error":
        s(m, "UNEXPECTED_TOKEN", m.message), f += m.source.length;
        break;
      default: {
        const A = `Unexpected token in block scalar header: ${m.type}`;
        s(m, "UNEXPECTED_TOKEN", A);
        const h = m.source;
        h && typeof h == "string" && (f += h.length);
      }
    }
  }
  return { mode: u, indent: r, chomp: o, comment: D, length: f };
}
function Fn(i) {
  const t = i.split(/\n( *)/), e = t[0], s = e.match(/^( *)/), u = [s != null && s[1] ? [s[1], e.slice(s[1].length)] : ["", e]];
  for (let r = 1; r < t.length; r += 2)
    u.push([t[r], t[r + 1]]);
  return u;
}
function En(i, t, e) {
  const { offset: s, type: n, source: u, end: r } = i;
  let o, a;
  const l = (p, m, A) => e(s + p, m, A);
  switch (n) {
    case "scalar":
      o = B.PLAIN, a = wn(u, l);
      break;
    case "single-quoted-scalar":
      o = B.QUOTE_SINGLE, a = In(u, l);
      break;
    case "double-quoted-scalar":
      o = B.QUOTE_DOUBLE, a = Bn(u, l);
      break;
    default:
      return e(i, "UNEXPECTED_TOKEN", `Expected a flow scalar value, but found: ${n}`), {
        value: "",
        type: null,
        comment: "",
        range: [s, s + u.length, s + u.length]
      };
  }
  const D = s + u.length, f = it(r, D, t, e);
  return {
    value: a,
    type: o,
    comment: f.comment,
    range: [s, D, f.offset]
  };
}
function wn(i, t) {
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
function In(i, t) {
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
  let n = s[1], u = " ", r = t.lastIndex;
  for (e.lastIndex = r; s = e.exec(i); )
    s[1] === "" ? u === `
` ? n += u : u = `
` : (n += u + s[1], u = " "), r = e.lastIndex;
  const o = /[ \t]*(.*)/sy;
  return o.lastIndex = r, s = o.exec(i), n + u + ((s == null ? void 0 : s[1]) ?? "");
}
function Bn(i, t) {
  let e = "";
  for (let s = 1; s < i.length - 1; ++s) {
    const n = i[s];
    if (!(n === "\r" && i[s + 1] === `
`))
      if (n === `
`) {
        const { fold: u, offset: r } = Sn(i, s);
        e += u, s = r;
      } else if (n === "\\") {
        let u = i[++s];
        const r = _n[u];
        if (r)
          e += r;
        else if (u === `
`)
          for (u = i[s + 1]; u === " " || u === "	"; )
            u = i[++s + 1];
        else if (u === "\r" && i[s + 1] === `
`)
          for (u = i[++s + 1]; u === " " || u === "	"; )
            u = i[++s + 1];
        else if (u === "x" || u === "u" || u === "U") {
          const o = { x: 2, u: 4, U: 8 }[u];
          e += kn(i, s + 1, o, t), s += o;
        } else {
          const o = i.substr(s - 1, 2);
          t(s - 1, "BAD_DQ_ESCAPE", `Invalid escape sequence ${o}`), e += o;
        }
      } else if (n === " " || n === "	") {
        const u = s;
        let r = i[s + 1];
        for (; r === " " || r === "	"; )
          r = i[++s + 1];
        r !== `
` && !(r === "\r" && i[s + 2] === `
`) && (e += s > u ? i.slice(u, s + 1) : n);
      } else
        e += n;
  }
  return (i[i.length - 1] !== '"' || i.length === 1) && t(i.length, "MISSING_CHAR", 'Missing closing "quote'), e;
}
function Sn(i, t) {
  let e = "", s = i[t + 1];
  for (; (s === " " || s === "	" || s === `
` || s === "\r") && !(s === "\r" && i[t + 2] !== `
`); )
    s === `
` && (e += `
`), t += 1, s = i[t + 1];
  return e || (e = " "), { fold: e, offset: t };
}
const _n = {
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
function kn(i, t, e, s) {
  const n = i.substr(t, e), r = n.length === e && /^[0-9a-fA-F]+$/.test(n) ? parseInt(n, 16) : NaN;
  if (isNaN(r)) {
    const o = i.substr(t - 2, e + 2);
    return s(t - 2, "BAD_DQ_ESCAPE", `Invalid escape sequence ${o}`), o;
  }
  return String.fromCodePoint(r);
}
function pi(i, t, e, s) {
  const { value: n, type: u, comment: r, range: o } = t.type === "block-scalar" ? An(t, i.options.strict, s) : En(t, i.options.strict, s), a = e ? i.directives.tagName(e.source, (f) => s(e, "TAG_RESOLVE_FAILED", f)) : null, l = e && a ? vn(i.schema, n, a, e, s) : t.type === "scalar" ? Nn(i, n, t, s) : i.schema[he];
  let D;
  try {
    const f = l.resolve(n, (p) => s(e ?? t, "TAG_RESOLVE_FAILED", p), i.options);
    D = T(f) ? f : new B(f);
  } catch (f) {
    const p = f instanceof Error ? f.message : String(f);
    s(e ?? t, "TAG_RESOLVE_FAILED", p), D = new B(n);
  }
  return D.range = o, D.source = n, u && (D.type = u), a && (D.tag = a), l.format && (D.format = l.format), r && (D.comment = r), D;
}
function vn(i, t, e, s, n) {
  var o;
  if (e === "!")
    return i[he];
  const u = [];
  for (const a of i.tags)
    if (!a.collection && a.tag === e)
      if (a.default && a.test)
        u.push(a);
      else
        return a;
  for (const a of u)
    if ((o = a.test) != null && o.test(t))
      return a;
  const r = i.knownTags[e];
  return r && !r.collection ? (i.tags.push(Object.assign({}, r, { default: !1, test: void 0 })), r) : (n(s, "TAG_RESOLVE_FAILED", `Unresolved tag: ${e}`, e !== "tag:yaml.org,2002:str"), i[he]);
}
function Nn({ directives: i, schema: t }, e, s, n) {
  const u = t.tags.find((r) => {
    var o;
    return r.default && ((o = r.test) == null ? void 0 : o.test(e));
  }) || t[he];
  if (t.compat) {
    const r = t.compat.find((o) => {
      var a;
      return o.default && ((a = o.test) == null ? void 0 : a.test(e));
    }) ?? t[he];
    if (u.tag !== r.tag) {
      const o = i.tagString(u.tag), a = i.tagString(r.tag), l = `Value may be parsed as either ${o} or ${a}`;
      n(s, "TAG_RESOLVE_FAILED", l, !0);
    }
  }
  return u;
}
function Ln(i, t, e) {
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
const On = { composeNode: Di, composeEmptyNode: os };
function Di(i, t, e, s) {
  const { spaceBefore: n, comment: u, anchor: r, tag: o } = e;
  let a, l = !0;
  switch (t.type) {
    case "alias":
      a = $n(i, t, s), (r || o) && s(t, "ALIAS_PROPS", "An alias node must not specify any properties");
      break;
    case "scalar":
    case "single-quoted-scalar":
    case "double-quoted-scalar":
    case "block-scalar":
      a = pi(i, t, o, s), r && (a.anchor = r.source.substring(1));
      break;
    case "block-map":
    case "block-seq":
    case "flow-collection":
      a = Cn(On, i, t, o, s), r && (a.anchor = r.source.substring(1));
      break;
    default: {
      const D = t.type === "error" ? t.message : `Unsupported token (type: ${t.type})`;
      s(t, "UNEXPECTED_TOKEN", D), a = os(i, t.offset, void 0, null, e, s), l = !1;
    }
  }
  return r && a.anchor === "" && s(r, "BAD_ALIAS", "Anchor cannot be an empty string"), n && (a.spaceBefore = !0), u && (t.type === "scalar" && t.source === "" ? a.comment = u : a.commentBefore = u), i.options.keepSourceTokens && l && (a.srcToken = t), a;
}
function os(i, t, e, s, { spaceBefore: n, comment: u, anchor: r, tag: o, end: a }, l) {
  const D = {
    type: "scalar",
    offset: Ln(t, e, s),
    indent: -1,
    source: ""
  }, f = pi(i, D, o, l);
  return r && (f.anchor = r.source.substring(1), f.anchor === "" && l(r, "BAD_ALIAS", "Anchor cannot be an empty string")), n && (f.spaceBefore = !0), u && (f.comment = u, f.range[2] = a), f;
}
function $n({ options: i }, { offset: t, source: e, end: s }, n) {
  const u = new Jt(e.substring(1));
  u.source === "" && n(t, "BAD_ALIAS", "Alias cannot be an empty string"), u.source.endsWith(":") && n(t + e.length - 1, "BAD_ALIAS", "Alias ending in : is ambiguous", !0);
  const r = t + e.length, o = it(s, r, i.strict, n);
  return u.range = [t, r, o.offset], o.comment && (u.comment = o.comment), u;
}
function Tn(i, t, { offset: e, start: s, value: n, end: u }, r) {
  const o = Object.assign({ _directives: t }, i), a = new st(void 0, o), l = {
    atRoot: !0,
    directives: a.directives,
    options: a.options,
    schema: a.schema
  }, D = Ye(s, {
    indicator: "doc-start",
    next: n ?? (u == null ? void 0 : u[0]),
    offset: e,
    onError: r,
    startOnNewline: !0
  });
  D.found && (a.directives.docStart = !0, n && (n.type === "block-map" || n.type === "block-seq") && !D.hasNewline && r(D.end, "MISSING_CHAR", "Block collection cannot start on same line with directives-end marker")), a.contents = n ? Di(l, n, D, r) : os(l, D.end, s, null, D, r);
  const f = a.contents.range[2], p = it(u, f, !1, r);
  return p.comment && (a.comment = p.comment), a.range = [e, f, p.offset], a;
}
function je(i) {
  if (typeof i == "number")
    return [i, i + 1];
  if (Array.isArray(i))
    return i.length === 2 ? i : [i[0], i[1]];
  const { offset: t, source: e } = i;
  return [t, t + (typeof e == "string" ? e.length : 1)];
}
function Fs(i) {
  var n;
  let t = "", e = !1, s = !1;
  for (let u = 0; u < i.length; ++u) {
    const r = i[u];
    switch (r[0]) {
      case "#":
        t += (t === "" ? "" : s ? `

` : `
`) + (r.substring(1) || " "), e = !0, s = !1;
        break;
      case "%":
        ((n = i[u + 1]) == null ? void 0 : n[0]) !== "#" && (u += 1), e = !1;
        break;
      default:
        e || (s = !0), e = !1;
    }
  }
  return { comment: t, afterEmptyLine: s };
}
class Yn {
  constructor(t = {}) {
    this.doc = null, this.atDirectives = !1, this.prelude = [], this.errors = [], this.warnings = [], this.onError = (e, s, n, u) => {
      const r = je(e);
      u ? this.warnings.push(new Dn(r, s, n)) : this.errors.push(new Re(r, s, n));
    }, this.directives = new X({ version: t.version || "1.2" }), this.options = t;
  }
  decorate(t, e) {
    const { comment: s, afterEmptyLine: n } = Fs(this.prelude);
    if (s) {
      const u = t.contents;
      if (e)
        t.comment = t.comment ? `${t.comment}
${s}` : s;
      else if (n || t.directives.docStart || !u)
        t.commentBefore = s;
      else if (K(u) && !u.flow && u.items.length > 0) {
        let r = u.items[0];
        j(r) && (r = r.key);
        const o = r.commentBefore;
        r.commentBefore = o ? `${s}
${o}` : s;
      } else {
        const r = u.commentBefore;
        u.commentBefore = r ? `${s}
${r}` : s;
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
      comment: Fs(this.prelude).comment,
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
          const u = je(t);
          u[0] += e, this.onError(u, "BAD_DIRECTIVE", s, n);
        }), this.prelude.push(t.source), this.atDirectives = !0;
        break;
      case "document": {
        const e = Tn(this.options, this.directives, t, this.onError);
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
        const e = t.source ? `${t.message}: ${JSON.stringify(t.source)}` : t.message, s = new Re(je(t), "UNEXPECTED_TOKEN", e);
        this.atDirectives || !this.doc ? this.errors.push(s) : this.doc.errors.push(s);
        break;
      }
      case "doc-end": {
        if (!this.doc) {
          const s = "Unexpected doc-end without preceding document";
          this.errors.push(new Re(je(t), "UNEXPECTED_TOKEN", s));
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
        this.errors.push(new Re(je(t), "UNEXPECTED_TOKEN", `Unsupported token ${t.type}`));
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
const gi = "\uFEFF", mi = "", yi = "", Pt = "";
function Mn(i) {
  switch (i) {
    case gi:
      return "byte-order-mark";
    case mi:
      return "doc-mode";
    case yi:
      return "flow-error-end";
    case Pt:
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
function z(i) {
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
const Es = "0123456789ABCDEFabcdef".split(""), Gn = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-#;/?:@&=+$_.!~*'()".split(""), Ot = ",[]{}".split(""), xn = ` ,[]{}
\r	`.split(""), $t = (i) => !i || xn.includes(i);
class Kn {
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
      if ((s === "---" || s === "...") && z(this.buffer[t + 3]))
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
    if (t[0] === gi && (yield* this.pushCount(1), t = t.substring(1)), t[0] === "%") {
      let e = t.length;
      const s = t.indexOf("#");
      if (s !== -1) {
        const u = t[s - 1];
        (u === " " || u === "	") && (e = s - 1);
      }
      for (; ; ) {
        const u = t[e - 1];
        if (u === " " || u === "	")
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
    return yield mi, yield* this.parseLineStart();
  }
  *parseLineStart() {
    const t = this.charAt(0);
    if (!t && !this.atEnd)
      return this.setNext("line-start");
    if (t === "-" || t === ".") {
      if (!this.atEnd && !this.hasChars(4))
        return this.setNext("line-start");
      const e = this.peek(3);
      if (e === "---" && z(this.charAt(3)))
        return yield* this.pushCount(3), this.indentValue = 0, this.indentNext = 0, "doc";
      if (e === "..." && z(this.charAt(3)))
        return yield* this.pushCount(3), "stream";
    }
    return this.indentValue = yield* this.pushSpaces(!1), this.indentNext > this.indentValue && !z(this.charAt(1)) && (this.indentNext = this.indentValue), yield* this.parseBlockStart();
  }
  *parseBlockStart() {
    const [t, e] = this.peek(2);
    if (!e && !this.atEnd)
      return this.setNext("block-start");
    if ((t === "-" || t === "?" || t === ":") && z(e)) {
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
        return yield* this.pushUntil($t), "doc";
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
    if ((s !== -1 && s < this.indentNext && n[0] !== "#" || s === 0 && (n.startsWith("---") || n.startsWith("...")) && z(n[3])) && !(s === this.indentNext - 1 && this.flowLevel === 1 && (n[0] === "]" || n[0] === "}")))
      return this.flowLevel = 0, yield yi, yield* this.parseLineStart();
    let u = 0;
    for (; n[u] === ","; )
      u += yield* this.pushCount(1), u += yield* this.pushSpaces(!0), this.flowKey = !1;
    switch (u += yield* this.pushIndicators(), n[u]) {
      case void 0:
        return "flow";
      case "#":
        return yield* this.pushCount(n.length - u), "flow";
      case "{":
      case "[":
        return yield* this.pushCount(1), this.flowKey = !1, this.flowLevel += 1, "flow";
      case "}":
      case "]":
        return yield* this.pushCount(1), this.flowKey = !0, this.flowLevel -= 1, this.flowLevel ? "flow" : "doc";
      case "*":
        return yield* this.pushUntil($t), "flow";
      case '"':
      case "'":
        return this.flowKey = !0, yield* this.parseQuotedScalar();
      case ":": {
        const r = this.charAt(1);
        if (this.flowKey || z(r) || r === ",")
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
        let u = 0;
        for (; this.buffer[e - 1 - u] === "\\"; )
          u += 1;
        if (u % 2 === 0)
          break;
        e = this.buffer.indexOf('"', e + 1);
      }
    const s = this.buffer.substring(0, e);
    let n = s.indexOf(`
`, this.pos);
    if (n !== -1) {
      for (; n !== -1; ) {
        const u = this.continueScalar(n + 1);
        if (u === -1)
          break;
        n = s.indexOf(`
`, u);
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
    return yield* this.pushUntil((e) => z(e) || e === "#");
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
            const u = this.buffer[n + 1];
            if (!u && !this.atEnd)
              return this.setNext("block-scalar");
            if (u === `
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
        let n = t - 1, u = this.buffer[n];
        u === "\r" && (u = this.buffer[--n]);
        const r = n;
        for (; u === " " || u === "	"; )
          u = this.buffer[--n];
        if (u === `
` && n >= this.pos && n + 1 + e > r)
          t = n;
        else
          break;
      } while (!0);
    return yield Pt, yield* this.pushToIndex(t + 1, !0), yield* this.parseLineStart();
  }
  *parsePlainScalar() {
    const t = this.flowLevel > 0;
    let e = this.pos - 1, s = this.pos - 1, n;
    for (; n = this.buffer[++s]; )
      if (n === ":") {
        const u = this.buffer[s + 1];
        if (z(u) || t && u === ",")
          break;
        e = s;
      } else if (z(n)) {
        let u = this.buffer[s + 1];
        if (n === "\r" && (u === `
` ? (s += 1, n = `
`, u = this.buffer[s + 1]) : e = s), u === "#" || t && Ot.includes(u))
          break;
        if (n === `
`) {
          const r = this.continueScalar(s + 1);
          if (r === -1)
            break;
          s = Math.max(s, r - 2);
        }
      } else {
        if (t && Ot.includes(n))
          break;
        e = s;
      }
    return !n && !this.atEnd ? this.setNext("plain-scalar") : (yield Pt, yield* this.pushToIndex(e + 1, !0), t ? "flow" : "doc");
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
        return (yield* this.pushUntil($t)) + (yield* this.pushSpaces(!0)) + (yield* this.pushIndicators());
      case "-":
      case "?":
      case ":": {
        const t = this.flowLevel > 0, e = this.charAt(1);
        if (z(e) || t && Ot.includes(e))
          return t ? this.flowKey && (this.flowKey = !1) : this.indentNext = this.indentValue + 1, (yield* this.pushCount(1)) + (yield* this.pushSpaces(!0)) + (yield* this.pushIndicators());
      }
    }
    return 0;
  }
  *pushTag() {
    if (this.charAt(1) === "<") {
      let t = this.pos + 2, e = this.buffer[t];
      for (; !z(e) && e !== ">"; )
        e = this.buffer[++t];
      return yield* this.pushToIndex(e === ">" ? t + 1 : t, !1);
    } else {
      let t = this.pos + 1, e = this.buffer[t];
      for (; e; )
        if (Gn.includes(e))
          e = this.buffer[++t];
        else if (e === "%" && Es.includes(this.buffer[t + 1]) && Es.includes(this.buffer[t + 2]))
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
class jn {
  constructor() {
    this.lineStarts = [], this.addNewLine = (t) => this.lineStarts.push(t), this.linePos = (t) => {
      let e = 0, s = this.lineStarts.length;
      for (; e < s; ) {
        const u = e + s >> 1;
        this.lineStarts[u] < t ? e = u + 1 : s = u;
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
function se(i, t) {
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
function Ci(i) {
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
function rt(i) {
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
function Is(i) {
  if (i.start.type === "flow-seq-start")
    for (const t of i.items)
      t.sep && !t.value && !se(t.start, "explicit-key-ind") && !se(t.sep, "map-value-ind") && (t.key && (t.value = t.key), delete t.key, Ci(t.value) ? t.value.end ? Array.prototype.push.apply(t.value.end, t.sep) : t.value.end = t.sep : Array.prototype.push.apply(t.start, t.sep), delete t.sep);
}
class Pn {
  /**
   * @param onNewLine - If defined, called separately with the start position of
   *   each new line (in `parse()`, including the start of input).
   */
  constructor(t) {
    this.atNewLine = !0, this.atScalar = !1, this.indent = 0, this.offset = 0, this.onKeyLine = !1, this.stack = [], this.source = "", this.type = "", this.lexer = new Kn(), this.onNewLine = t;
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
    const e = Mn(t);
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
      switch (e.type === "block-scalar" ? e.indent = "indent" in s ? s.indent : 0 : e.type === "flow-collection" && s.type === "document" && (e.indent = 0), e.type === "flow-collection" && Is(e), s.type) {
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
            Object.assign(n, { key: e, sep: [] }), this.onKeyLine = !se(n.start, "explicit-key-ind");
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
        n && !n.sep && !n.value && n.start.length > 0 && ws(n.start) === -1 && (e.indent === 0 || n.start.every((u) => u.type !== "comment" || u.indent < e.indent)) && (s.type === "document" ? s.end = n.start : s.items.push({ start: n.start }), e.items.splice(-1, 1));
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
      const e = rt(this.peek(2)), s = _e(e);
      let n;
      t.end ? (n = t.end, n.push(this.sourceToken), delete t.end) : n = [this.sourceToken];
      const u = {
        type: "block-map",
        offset: t.offset,
        indent: t.indent,
        items: [{ start: s, key: t, sep: n }]
      };
      this.onKeyLine = !0, this.stack[this.stack.length - 1] = u;
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
          const n = "end" in e.value ? e.value.end : void 0, u = Array.isArray(n) ? n[n.length - 1] : void 0;
          (u == null ? void 0 : u.type) === "comment" ? n == null || n.push(this.sourceToken) : t.items.push({ start: [this.sourceToken] });
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
            const n = t.items[t.items.length - 2], u = (s = n == null ? void 0 : n.value) == null ? void 0 : s.end;
            if (Array.isArray(u)) {
              Array.prototype.push.apply(u, e.start), u.push(this.sourceToken), t.items.pop();
              return;
            }
          }
          e.start.push(this.sourceToken);
        }
        return;
    }
    if (this.indent >= t.indent) {
      const n = !this.onKeyLine && this.indent === t.indent && e.sep && this.type !== "seq-item-ind";
      let u = [];
      if (n && e.sep && !e.value) {
        const r = [];
        for (let o = 0; o < e.sep.length; ++o) {
          const a = e.sep[o];
          switch (a.type) {
            case "newline":
              r.push(o);
              break;
            case "space":
              break;
            case "comment":
              a.indent > t.indent && (r.length = 0);
              break;
            default:
              r.length = 0;
          }
        }
        r.length >= 2 && (u = e.sep.splice(r[1]));
      }
      switch (this.type) {
        case "anchor":
        case "tag":
          n || e.value ? (u.push(this.sourceToken), t.items.push({ start: u }), this.onKeyLine = !0) : e.sep ? e.sep.push(this.sourceToken) : e.start.push(this.sourceToken);
          return;
        case "explicit-key-ind":
          !e.sep && !se(e.start, "explicit-key-ind") ? e.start.push(this.sourceToken) : n || e.value ? (u.push(this.sourceToken), t.items.push({ start: u })) : this.stack.push({
            type: "block-map",
            offset: this.offset,
            indent: this.indent,
            items: [{ start: [this.sourceToken] }]
          }), this.onKeyLine = !0;
          return;
        case "map-value-ind":
          if (se(e.start, "explicit-key-ind"))
            if (e.sep)
              if (e.value)
                t.items.push({ start: [], key: null, sep: [this.sourceToken] });
              else if (se(e.sep, "map-value-ind"))
                this.stack.push({
                  type: "block-map",
                  offset: this.offset,
                  indent: this.indent,
                  items: [{ start: u, key: null, sep: [this.sourceToken] }]
                });
              else if (Ci(e.key) && !se(e.sep, "newline")) {
                const r = _e(e.start), o = e.key, a = e.sep;
                a.push(this.sourceToken), delete e.key, delete e.sep, this.stack.push({
                  type: "block-map",
                  offset: this.offset,
                  indent: this.indent,
                  items: [{ start: r, key: o, sep: a }]
                });
              } else
                u.length > 0 ? e.sep = e.sep.concat(u, this.sourceToken) : e.sep.push(this.sourceToken);
            else if (se(e.start, "newline"))
              Object.assign(e, { key: null, sep: [this.sourceToken] });
            else {
              const r = _e(e.start);
              this.stack.push({
                type: "block-map",
                offset: this.offset,
                indent: this.indent,
                items: [{ start: r, key: null, sep: [this.sourceToken] }]
              });
            }
          else
            e.sep ? e.value || n ? t.items.push({ start: u, key: null, sep: [this.sourceToken] }) : se(e.sep, "map-value-ind") ? this.stack.push({
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
          const r = this.flowScalar(this.type);
          n || e.value ? (t.items.push({ start: u, key: r, sep: [] }), this.onKeyLine = !0) : e.sep ? this.stack.push(r) : (Object.assign(e, { key: r, sep: [] }), this.onKeyLine = !0);
          return;
        }
        default: {
          const r = this.startBlockValue(t);
          if (r) {
            n && r.type !== "block-seq" && se(e.start, "explicit-key-ind") && t.items.push({ start: u }), this.stack.push(r);
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
          const n = "end" in e.value ? e.value.end : void 0, u = Array.isArray(n) ? n[n.length - 1] : void 0;
          (u == null ? void 0 : u.type) === "comment" ? n == null || n.push(this.sourceToken) : t.items.push({ start: [this.sourceToken] });
        } else
          e.start.push(this.sourceToken);
        return;
      case "space":
      case "comment":
        if (e.value)
          t.items.push({ start: [this.sourceToken] });
        else {
          if (this.atIndentedComment(e.start, t.indent)) {
            const n = t.items[t.items.length - 2], u = (s = n == null ? void 0 : n.value) == null ? void 0 : s.end;
            if (Array.isArray(u)) {
              Array.prototype.push.apply(u, e.start), u.push(this.sourceToken), t.items.pop();
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
        e.value || se(e.start, "seq-item-ind") ? t.items.push({ start: [this.sourceToken] }) : e.start.push(this.sourceToken);
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
        const n = rt(s), u = _e(n);
        Is(t);
        const r = t.end.splice(1, t.end.length);
        r.push(this.sourceToken);
        const o = {
          type: "block-map",
          offset: t.offset,
          indent: t.indent,
          items: [{ start: u, key: t, sep: r }]
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
        const e = rt(t), s = _e(e);
        return s.push(this.sourceToken), {
          type: "block-map",
          offset: this.offset,
          indent: this.indent,
          items: [{ start: s }]
        };
      }
      case "map-value-ind": {
        this.onKeyLine = !0;
        const e = rt(t), s = _e(e);
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
function Rn(i) {
  const t = i.prettyErrors !== !1;
  return { lineCounter: i.lineCounter || t && new jn() || null, prettyErrors: t };
}
function Wn(i, t = {}) {
  const { lineCounter: e, prettyErrors: s } = Rn(t), n = new Pn(e == null ? void 0 : e.addNewLine), u = new Yn(t);
  let r = null;
  for (const o of u.compose(n.parse(i), !0, i.length))
    if (!r)
      r = o;
    else if (r.options.logLevel !== "silent") {
      r.errors.push(new Re(o.range.slice(0, 2), "MULTIPLE_DOCS", "Source contains multiple documents; please use YAML.parseAllDocuments()"));
      break;
    }
  return s && e && (r.errors.forEach(As(i, e)), r.warnings.forEach(As(i, e))), r;
}
function re(i, t, e) {
  let s;
  const n = Wn(i, e);
  if (!n)
    return null;
  if (n.warnings.forEach((u) => Us(n.options.logLevel, u)), n.errors.length > 0) {
    if (n.options.logLevel !== "silent")
      throw n.errors[0];
    n.errors = [];
  }
  return n.toJS(Object.assign({ reviver: s }, e));
}
function St(i, t, e) {
  let s = null;
  if (Array.isArray(t) && (s = t), i === void 0) {
    const { keepUndefined: n } = {};
    if (!n)
      return;
  }
  return new st(i, s, e).toString(e);
}
var Zn = /[\u1680\u2000-\u200A\u202F\u205F\u3000]/, Xn = /[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u08A0-\u08B4\u08B6-\u08BD\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312E\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FEA\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF2D-\uDF4A\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC03-\uDC37\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDF00-\uDF19]|\uD806[\uDCA0-\uDCDF\uDCFF\uDE00\uDE0B-\uDE32\uDE3A\uDE50\uDE5C-\uDE83\uDE86-\uDE89\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD30\uDD46]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50\uDF93-\uDF9F\uDFE0\uDFE1]|\uD821[\uDC00-\uDFEC]|\uD822[\uDC00-\uDEF2]|\uD82C[\uDC00-\uDD1E\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD83A[\uDC00-\uDCC4\uDD00-\uDD43]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]/, Un = /[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u0483-\u0487\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05F0-\u05F2\u0610-\u061A\u0620-\u0669\u066E-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06FC\u06FF\u0710-\u074A\u074D-\u07B1\u07C0-\u07F5\u07FA\u0800-\u082D\u0840-\u085B\u0860-\u086A\u08A0-\u08B4\u08B6-\u08BD\u08D4-\u08E1\u08E3-\u0963\u0966-\u096F\u0971-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u09FC\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0AF9-\u0AFF\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BEF\u0C00-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58-\u0C5A\u0C60-\u0C63\u0C66-\u0C6F\u0C80-\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2\u0D00-\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D54-\u0D57\u0D5F-\u0D63\u0D66-\u0D6F\u0D7A-\u0D7F\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E4E\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6C\u0F71-\u0F84\u0F86-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u135F\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17D3\u17D7\u17DC\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u1820-\u1877\u1880-\u18AA\u18B0-\u18F5\u1900-\u191E\u1920-\u192B\u1930-\u193B\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19D9\u1A00-\u1A1B\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA7\u1AB0-\u1ABD\u1B00-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BF3\u1C00-\u1C37\u1C40-\u1C49\u1C4D-\u1C7D\u1C80-\u1C88\u1CD0-\u1CD2\u1CD4-\u1CF9\u1D00-\u1DF9\u1DFB-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u203F\u2040\u2054\u2071\u207F\u2090-\u209C\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D7F-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u2E2F\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u3099\u309A\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312E\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FEA\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66F\uA674-\uA67D\uA67F-\uA6F1\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA827\uA840-\uA873\uA880-\uA8C5\uA8D0-\uA8D9\uA8E0-\uA8F7\uA8FB\uA8FD\uA900-\uA92D\uA930-\uA953\uA960-\uA97C\uA980-\uA9C0\uA9CF-\uA9D9\uA9E0-\uA9FE\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A-\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABEA\uABEC\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE00-\uFE0F\uFE20-\uFE2F\uFE33\uFE34\uFE4D-\uFE4F\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF3F\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDDFD\uDE80-\uDE9C\uDEA0-\uDED0\uDEE0\uDF00-\uDF1F\uDF2D-\uDF4A\uDF50-\uDF7A\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCA0-\uDCA9\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00-\uDE03\uDE05\uDE06\uDE0C-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE38-\uDE3A\uDE3F\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE6\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC00-\uDC46\uDC66-\uDC6F\uDC7F-\uDCBA\uDCD0-\uDCE8\uDCF0-\uDCF9\uDD00-\uDD34\uDD36-\uDD3F\uDD50-\uDD73\uDD76\uDD80-\uDDC4\uDDCA-\uDDCC\uDDD0-\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE37\uDE3E\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEEA\uDEF0-\uDEF9\uDF00-\uDF03\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3C-\uDF44\uDF47\uDF48\uDF4B-\uDF4D\uDF50\uDF57\uDF5D-\uDF63\uDF66-\uDF6C\uDF70-\uDF74]|\uD805[\uDC00-\uDC4A\uDC50-\uDC59\uDC80-\uDCC5\uDCC7\uDCD0-\uDCD9\uDD80-\uDDB5\uDDB8-\uDDC0\uDDD8-\uDDDD\uDE00-\uDE40\uDE44\uDE50-\uDE59\uDE80-\uDEB7\uDEC0-\uDEC9\uDF00-\uDF19\uDF1D-\uDF2B\uDF30-\uDF39]|\uD806[\uDCA0-\uDCE9\uDCFF\uDE00-\uDE3E\uDE47\uDE50-\uDE83\uDE86-\uDE99\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC36\uDC38-\uDC40\uDC50-\uDC59\uDC72-\uDC8F\uDC92-\uDCA7\uDCA9-\uDCB6\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD36\uDD3A\uDD3C\uDD3D\uDD3F-\uDD47\uDD50-\uDD59]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE60-\uDE69\uDED0-\uDEED\uDEF0-\uDEF4\uDF00-\uDF36\uDF40-\uDF43\uDF50-\uDF59\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50-\uDF7E\uDF8F-\uDF9F\uDFE0\uDFE1]|\uD821[\uDC00-\uDFEC]|\uD822[\uDC00-\uDEF2]|\uD82C[\uDC00-\uDD1E\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99\uDC9D\uDC9E]|\uD834[\uDD65-\uDD69\uDD6D-\uDD72\uDD7B-\uDD82\uDD85-\uDD8B\uDDAA-\uDDAD\uDE42-\uDE44]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB\uDFCE-\uDFFF]|\uD836[\uDE00-\uDE36\uDE3B-\uDE6C\uDE75\uDE84\uDE9B-\uDE9F\uDEA1-\uDEAF]|\uD838[\uDC00-\uDC06\uDC08-\uDC18\uDC1B-\uDC21\uDC23\uDC24\uDC26-\uDC2A]|\uD83A[\uDC00-\uDCC4\uDCD0-\uDCD6\uDD00-\uDD4A\uDD50-\uDD59]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]|\uDB40[\uDD00-\uDDEF]/, Tt = {
  Space_Separator: Zn,
  ID_Start: Xn,
  ID_Continue: Un
}, x = {
  isSpaceSeparator(i) {
    return typeof i == "string" && Tt.Space_Separator.test(i);
  },
  isIdStartChar(i) {
    return typeof i == "string" && (i >= "a" && i <= "z" || i >= "A" && i <= "Z" || i === "$" || i === "_" || Tt.ID_Start.test(i));
  },
  isIdContinueChar(i) {
    return typeof i == "string" && (i >= "a" && i <= "z" || i >= "A" && i <= "Z" || i >= "0" && i <= "9" || i === "$" || i === "_" || i === "‌" || i === "‍" || Tt.ID_Continue.test(i));
  },
  isDigit(i) {
    return typeof i == "string" && /[0-9]/.test(i);
  },
  isHexDigit(i) {
    return typeof i == "string" && /[0-9A-Fa-f]/.test(i);
  }
};
let Rt, U, ae, Dt, De, ne, W, as, Ue;
var Jn = function(t, e) {
  Rt = String(t), U = "start", ae = [], Dt = 0, De = 1, ne = 0, W = void 0, as = void 0, Ue = void 0;
  do
    W = Hn(), qn[U]();
  while (W.type !== "eof");
  return typeof e == "function" ? Wt({ "": Ue }, "", e) : Ue;
};
function Wt(i, t, e) {
  const s = i[t];
  if (s != null && typeof s == "object")
    if (Array.isArray(s))
      for (let n = 0; n < s.length; n++) {
        const u = String(n), r = Wt(s, u, e);
        r === void 0 ? delete s[u] : Object.defineProperty(s, u, {
          value: r,
          writable: !0,
          enumerable: !0,
          configurable: !0
        });
      }
    else
      for (const n in s) {
        const u = Wt(s, n, e);
        u === void 0 ? delete s[n] : Object.defineProperty(s, n, {
          value: u,
          writable: !0,
          enumerable: !0,
          configurable: !0
        });
      }
  return e.call(i, t, s);
}
let S, I, We, oe, _;
function Hn() {
  for (S = "default", I = "", We = !1, oe = 1; ; ) {
    _ = ce();
    const i = Ai[S]();
    if (i)
      return i;
  }
}
function ce() {
  if (Rt[Dt])
    return String.fromCodePoint(Rt.codePointAt(Dt));
}
function g() {
  const i = ce();
  return i === `
` ? (De++, ne = 0) : i ? ne += i.length : ne++, i && (Dt += i.length), i;
}
const Ai = {
  default() {
    switch (_) {
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
        g();
        return;
      case "/":
        g(), S = "comment";
        return;
      case void 0:
        return g(), O("eof");
    }
    if (x.isSpaceSeparator(_)) {
      g();
      return;
    }
    return Ai[U]();
  },
  comment() {
    switch (_) {
      case "*":
        g(), S = "multiLineComment";
        return;
      case "/":
        g(), S = "singleLineComment";
        return;
    }
    throw $(g());
  },
  multiLineComment() {
    switch (_) {
      case "*":
        g(), S = "multiLineCommentAsterisk";
        return;
      case void 0:
        throw $(g());
    }
    g();
  },
  multiLineCommentAsterisk() {
    switch (_) {
      case "*":
        g();
        return;
      case "/":
        g(), S = "default";
        return;
      case void 0:
        throw $(g());
    }
    g(), S = "multiLineComment";
  },
  singleLineComment() {
    switch (_) {
      case `
`:
      case "\r":
      case "\u2028":
      case "\u2029":
        g(), S = "default";
        return;
      case void 0:
        return g(), O("eof");
    }
    g();
  },
  value() {
    switch (_) {
      case "{":
      case "[":
        return O("punctuator", g());
      case "n":
        return g(), me("ull"), O("null", null);
      case "t":
        return g(), me("rue"), O("boolean", !0);
      case "f":
        return g(), me("alse"), O("boolean", !1);
      case "-":
      case "+":
        g() === "-" && (oe = -1), S = "sign";
        return;
      case ".":
        I = g(), S = "decimalPointLeading";
        return;
      case "0":
        I = g(), S = "zero";
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
        I = g(), S = "decimalInteger";
        return;
      case "I":
        return g(), me("nfinity"), O("numeric", 1 / 0);
      case "N":
        return g(), me("aN"), O("numeric", NaN);
      case '"':
      case "'":
        We = g() === '"', I = "", S = "string";
        return;
    }
    throw $(g());
  },
  identifierNameStartEscape() {
    if (_ !== "u")
      throw $(g());
    g();
    const i = Zt();
    switch (i) {
      case "$":
      case "_":
        break;
      default:
        if (!x.isIdStartChar(i))
          throw Bs();
        break;
    }
    I += i, S = "identifierName";
  },
  identifierName() {
    switch (_) {
      case "$":
      case "_":
      case "‌":
      case "‍":
        I += g();
        return;
      case "\\":
        g(), S = "identifierNameEscape";
        return;
    }
    if (x.isIdContinueChar(_)) {
      I += g();
      return;
    }
    return O("identifier", I);
  },
  identifierNameEscape() {
    if (_ !== "u")
      throw $(g());
    g();
    const i = Zt();
    switch (i) {
      case "$":
      case "_":
      case "‌":
      case "‍":
        break;
      default:
        if (!x.isIdContinueChar(i))
          throw Bs();
        break;
    }
    I += i, S = "identifierName";
  },
  sign() {
    switch (_) {
      case ".":
        I = g(), S = "decimalPointLeading";
        return;
      case "0":
        I = g(), S = "zero";
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
        I = g(), S = "decimalInteger";
        return;
      case "I":
        return g(), me("nfinity"), O("numeric", oe * (1 / 0));
      case "N":
        return g(), me("aN"), O("numeric", NaN);
    }
    throw $(g());
  },
  zero() {
    switch (_) {
      case ".":
        I += g(), S = "decimalPoint";
        return;
      case "e":
      case "E":
        I += g(), S = "decimalExponent";
        return;
      case "x":
      case "X":
        I += g(), S = "hexadecimal";
        return;
    }
    return O("numeric", oe * 0);
  },
  decimalInteger() {
    switch (_) {
      case ".":
        I += g(), S = "decimalPoint";
        return;
      case "e":
      case "E":
        I += g(), S = "decimalExponent";
        return;
    }
    if (x.isDigit(_)) {
      I += g();
      return;
    }
    return O("numeric", oe * Number(I));
  },
  decimalPointLeading() {
    if (x.isDigit(_)) {
      I += g(), S = "decimalFraction";
      return;
    }
    throw $(g());
  },
  decimalPoint() {
    switch (_) {
      case "e":
      case "E":
        I += g(), S = "decimalExponent";
        return;
    }
    if (x.isDigit(_)) {
      I += g(), S = "decimalFraction";
      return;
    }
    return O("numeric", oe * Number(I));
  },
  decimalFraction() {
    switch (_) {
      case "e":
      case "E":
        I += g(), S = "decimalExponent";
        return;
    }
    if (x.isDigit(_)) {
      I += g();
      return;
    }
    return O("numeric", oe * Number(I));
  },
  decimalExponent() {
    switch (_) {
      case "+":
      case "-":
        I += g(), S = "decimalExponentSign";
        return;
    }
    if (x.isDigit(_)) {
      I += g(), S = "decimalExponentInteger";
      return;
    }
    throw $(g());
  },
  decimalExponentSign() {
    if (x.isDigit(_)) {
      I += g(), S = "decimalExponentInteger";
      return;
    }
    throw $(g());
  },
  decimalExponentInteger() {
    if (x.isDigit(_)) {
      I += g();
      return;
    }
    return O("numeric", oe * Number(I));
  },
  hexadecimal() {
    if (x.isHexDigit(_)) {
      I += g(), S = "hexadecimalInteger";
      return;
    }
    throw $(g());
  },
  hexadecimalInteger() {
    if (x.isHexDigit(_)) {
      I += g();
      return;
    }
    return O("numeric", oe * Number(I));
  },
  string() {
    switch (_) {
      case "\\":
        g(), I += Vn();
        return;
      case '"':
        if (We)
          return g(), O("string", I);
        I += g();
        return;
      case "'":
        if (!We)
          return g(), O("string", I);
        I += g();
        return;
      case `
`:
      case "\r":
        throw $(g());
      case "\u2028":
      case "\u2029":
        Qn(_);
        break;
      case void 0:
        throw $(g());
    }
    I += g();
  },
  start() {
    switch (_) {
      case "{":
      case "[":
        return O("punctuator", g());
    }
    S = "value";
  },
  beforePropertyName() {
    switch (_) {
      case "$":
      case "_":
        I = g(), S = "identifierName";
        return;
      case "\\":
        g(), S = "identifierNameStartEscape";
        return;
      case "}":
        return O("punctuator", g());
      case '"':
      case "'":
        We = g() === '"', S = "string";
        return;
    }
    if (x.isIdStartChar(_)) {
      I += g(), S = "identifierName";
      return;
    }
    throw $(g());
  },
  afterPropertyName() {
    if (_ === ":")
      return O("punctuator", g());
    throw $(g());
  },
  beforePropertyValue() {
    S = "value";
  },
  afterPropertyValue() {
    switch (_) {
      case ",":
      case "}":
        return O("punctuator", g());
    }
    throw $(g());
  },
  beforeArrayValue() {
    if (_ === "]")
      return O("punctuator", g());
    S = "value";
  },
  afterArrayValue() {
    switch (_) {
      case ",":
      case "]":
        return O("punctuator", g());
    }
    throw $(g());
  },
  end() {
    throw $(g());
  }
};
function O(i, t) {
  return {
    type: i,
    value: t,
    line: De,
    column: ne
  };
}
function me(i) {
  for (const t of i) {
    if (ce() !== t)
      throw $(g());
    g();
  }
}
function Vn() {
  switch (ce()) {
    case "b":
      return g(), "\b";
    case "f":
      return g(), "\f";
    case "n":
      return g(), `
`;
    case "r":
      return g(), "\r";
    case "t":
      return g(), "	";
    case "v":
      return g(), "\v";
    case "0":
      if (g(), x.isDigit(ce()))
        throw $(g());
      return "\0";
    case "x":
      return g(), zn();
    case "u":
      return g(), Zt();
    case `
`:
    case "\u2028":
    case "\u2029":
      return g(), "";
    case "\r":
      return g(), ce() === `
` && g(), "";
    case "1":
    case "2":
    case "3":
    case "4":
    case "5":
    case "6":
    case "7":
    case "8":
    case "9":
      throw $(g());
    case void 0:
      throw $(g());
  }
  return g();
}
function zn() {
  let i = "", t = ce();
  if (!x.isHexDigit(t) || (i += g(), t = ce(), !x.isHexDigit(t)))
    throw $(g());
  return i += g(), String.fromCodePoint(parseInt(i, 16));
}
function Zt() {
  let i = "", t = 4;
  for (; t-- > 0; ) {
    const e = ce();
    if (!x.isHexDigit(e))
      throw $(g());
    i += g();
  }
  return String.fromCodePoint(parseInt(i, 16));
}
const qn = {
  start() {
    if (W.type === "eof")
      throw ye();
    Yt();
  },
  beforePropertyName() {
    switch (W.type) {
      case "identifier":
      case "string":
        as = W.value, U = "afterPropertyName";
        return;
      case "punctuator":
        ot();
        return;
      case "eof":
        throw ye();
    }
  },
  afterPropertyName() {
    if (W.type === "eof")
      throw ye();
    U = "beforePropertyValue";
  },
  beforePropertyValue() {
    if (W.type === "eof")
      throw ye();
    Yt();
  },
  beforeArrayValue() {
    if (W.type === "eof")
      throw ye();
    if (W.type === "punctuator" && W.value === "]") {
      ot();
      return;
    }
    Yt();
  },
  afterPropertyValue() {
    if (W.type === "eof")
      throw ye();
    switch (W.value) {
      case ",":
        U = "beforePropertyName";
        return;
      case "}":
        ot();
    }
  },
  afterArrayValue() {
    if (W.type === "eof")
      throw ye();
    switch (W.value) {
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
function Yt() {
  let i;
  switch (W.type) {
    case "punctuator":
      switch (W.value) {
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
      i = W.value;
      break;
  }
  if (Ue === void 0)
    Ue = i;
  else {
    const t = ae[ae.length - 1];
    Array.isArray(t) ? t.push(i) : Object.defineProperty(t, as, {
      value: i,
      writable: !0,
      enumerable: !0,
      configurable: !0
    });
  }
  if (i !== null && typeof i == "object")
    ae.push(i), Array.isArray(i) ? U = "beforeArrayValue" : U = "beforePropertyName";
  else {
    const t = ae[ae.length - 1];
    t == null ? U = "end" : Array.isArray(t) ? U = "afterArrayValue" : U = "afterPropertyValue";
  }
}
function ot() {
  ae.pop();
  const i = ae[ae.length - 1];
  i == null ? U = "end" : Array.isArray(i) ? U = "afterArrayValue" : U = "afterPropertyValue";
}
function $(i) {
  return gt(i === void 0 ? `JSON5: invalid end of input at ${De}:${ne}` : `JSON5: invalid character '${bi(i)}' at ${De}:${ne}`);
}
function ye() {
  return gt(`JSON5: invalid end of input at ${De}:${ne}`);
}
function Bs() {
  return ne -= 5, gt(`JSON5: invalid identifier character at ${De}:${ne}`);
}
function Qn(i) {
  console.warn(`JSON5: '${bi(i)}' in strings is not valid ECMAScript; consider escaping`);
}
function bi(i) {
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
function gt(i) {
  const t = new SyntaxError(i);
  return t.lineNumber = De, t.columnNumber = ne, t;
}
var eu = function(t, e, s) {
  const n = [];
  let u = "", r, o, a = "", l;
  if (e != null && typeof e == "object" && !Array.isArray(e) && (s = e.space, l = e.quote, e = e.replacer), typeof e == "function")
    o = e;
  else if (Array.isArray(e)) {
    r = [];
    for (const h of e) {
      let d;
      typeof h == "string" ? d = h : (typeof h == "number" || h instanceof String || h instanceof Number) && (d = String(h)), d !== void 0 && r.indexOf(d) < 0 && r.push(d);
    }
  }
  return s instanceof Number ? s = Number(s) : s instanceof String && (s = String(s)), typeof s == "number" ? s > 0 && (s = Math.min(10, Math.floor(s)), a = "          ".substr(0, s)) : typeof s == "string" && (a = s.substr(0, 10)), D("", { "": t });
  function D(h, d) {
    let y = d[h];
    switch (y != null && (typeof y.toJSON5 == "function" ? y = y.toJSON5(h) : typeof y.toJSON == "function" && (y = y.toJSON(h))), o && (y = o.call(d, h, y)), y instanceof Number ? y = Number(y) : y instanceof String ? y = String(y) : y instanceof Boolean && (y = y.valueOf()), y) {
      case null:
        return "null";
      case !0:
        return "true";
      case !1:
        return "false";
    }
    if (typeof y == "string")
      return f(y);
    if (typeof y == "number")
      return String(y);
    if (typeof y == "object")
      return Array.isArray(y) ? A(y) : p(y);
  }
  function f(h) {
    const d = {
      "'": 0.1,
      '"': 0.2
    }, y = {
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
    let F = "";
    for (let b = 0; b < h.length; b++) {
      const w = h[b];
      switch (w) {
        case "'":
        case '"':
          d[w]++, F += w;
          continue;
        case "\0":
          if (x.isDigit(h[b + 1])) {
            F += "\\x00";
            continue;
          }
      }
      if (y[w]) {
        F += y[w];
        continue;
      }
      if (w < " ") {
        let C = w.charCodeAt(0).toString(16);
        F += "\\x" + ("00" + C).substring(C.length);
        continue;
      }
      F += w;
    }
    const E = l || Object.keys(d).reduce((b, w) => d[b] < d[w] ? b : w);
    return F = F.replace(new RegExp(E, "g"), y[E]), E + F + E;
  }
  function p(h) {
    if (n.indexOf(h) >= 0)
      throw TypeError("Converting circular structure to JSON5");
    n.push(h);
    let d = u;
    u = u + a;
    let y = r || Object.keys(h), F = [];
    for (const b of y) {
      const w = D(b, h);
      if (w !== void 0) {
        let C = m(b) + ":";
        a !== "" && (C += " "), C += w, F.push(C);
      }
    }
    let E;
    if (F.length === 0)
      E = "{}";
    else {
      let b;
      if (a === "")
        b = F.join(","), E = "{" + b + "}";
      else {
        let w = `,
` + u;
        b = F.join(w), E = `{
` + u + b + `,
` + d + "}";
      }
    }
    return n.pop(), u = d, E;
  }
  function m(h) {
    if (h.length === 0)
      return f(h);
    const d = String.fromCodePoint(h.codePointAt(0));
    if (!x.isIdStartChar(d))
      return f(h);
    for (let y = d.length; y < h.length; y++)
      if (!x.isIdContinueChar(String.fromCodePoint(h.codePointAt(y))))
        return f(h);
    return h;
  }
  function A(h) {
    if (n.indexOf(h) >= 0)
      throw TypeError("Converting circular structure to JSON5");
    n.push(h);
    let d = u;
    u = u + a;
    let y = [];
    for (let E = 0; E < h.length; E++) {
      const b = D(String(E), h);
      y.push(b !== void 0 ? b : "null");
    }
    let F;
    if (y.length === 0)
      F = "[]";
    else if (a === "")
      F = "[" + y.join(",") + "]";
    else {
      let E = `,
` + u, b = y.join(E);
      F = `[
` + u + b + `,
` + d + "]";
    }
    return n.pop(), u = d, F;
  }
};
const tu = {
  parse: Jn,
  stringify: eu
};
var H = tu;
const v = Symbol("PropFunctions"), N = Symbol("PropAttributes"), L = Symbol("PropMetaKeys"), G = Symbol("PropNodes"), mt = Symbol("MethodSetParent"), ls = Symbol("MethodSetUUID"), Fi = Symbol("MethodSetFunctions"), cs = Symbol("MethodSetAttributes"), Ei = Symbol("MethodSetMetaKeys"), de = Symbol("MethodSetIndex"), wi = Symbol("MethodSetNodes"), Je = class Je {
  static import(t, e = "JSON") {
    throw new Error("Method not implemented! Use derived class");
  }
  getApp() {
    return Je.$app;
  }
  static [Ms](t) {
    Je.$app = t;
  }
};
c(Je, "$app");
let ze = Je;
var Fe = 256, ft = [], at;
for (; Fe--; )
  ft[Fe] = (Fe + 256).toString(16).substring(1);
function Ii() {
  var i = 0, t, e = "";
  if (!at || Fe + 16 > 256) {
    for (at = Array(i = 256); i--; )
      at[i] = 256 * Math.random() | 0;
    i = Fe = 0;
  }
  for (; i < 16; i++)
    t = at[Fe + i], i == 6 ? e += ft[t & 15 | 64] : i == 8 ? e += ft[t & 63 | 128] : e += ft[t], i & 1 && i > 1 && i < 11 && (e += "-");
  return Fe++, e;
}
const su = Object.getPrototypeOf(async function() {
}).constructor, Bi = async (i, t) => {
  const e = `return {$functions:{${i.indexOf("_ready") !== -1 ? "_ready," : ""}${i.indexOf("_process") !== -1 ? "_process," : ""}${i.indexOf("_draw") !== -1 ? "_draw," : ""}}};`, s = `with (node) {${i};
${e}}`;
  return await new su("node, $attributes", s)(t, t._attributes);
}, Si = {
  description: "",
  title: "",
  name: "GlobalNode"
}, fe = (i, t) => {
  var e = {};
  for (var s in i)
    t.indexOf(s) == -1 && (e[s] = i[s]);
  return e;
};
var Su, _u, ku, vu;
class hs extends ze {
  constructor(e) {
    super();
    c(this, "_initial");
    c(this, "_events");
    c(this, "_parent");
    c(this, "_uuid");
    c(this, "_index");
    c(this, "hierarchy", "children");
    c(this, "type", "GlobalNode");
    c(this, "script");
    c(this, "name");
    c(this, "title");
    c(this, "description");
    c(this, Su);
    c(this, _u);
    c(this, ku);
    c(this, vu);
    this._initial = {
      ...Si,
      ...e
    }, this._events = new qe(), this._parent = null, this._uuid = Ii(), this._index = 0, this.script = null, this.name = this._initial.name, this.title = this._initial.title, this.description = this._initial.description, this[G] = [], this[v] = /* @__PURE__ */ new Map(), this[N] = /* @__PURE__ */ new Map(), this[L] = /* @__PURE__ */ new Map();
  }
  get nodes() {
    return this[G];
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
    return this.parent ? this.parent.index + "_" + this.index : this.index.toString();
  }
  cloneNode() {
    return V([this[k](!0)])[0];
  }
  getNode(e) {
    return this[G].find((s) => s.uuid == e);
  }
  addNode(...e) {
    for (const s of e)
      s[de](this[G].length), s[mt](this), this[G].push(s);
  }
  hasNode(e) {
    return this[G].findIndex((s) => s.uuid === e) !== -1;
  }
  deleteNode(e) {
    let s = this.getNode(e);
    return s ? (this[G].splice(s.index, 1), s = void 0, !0) : !1;
  }
  clearNodes() {
    this[G] = [];
  }
  replaceNode(e, s) {
    const n = this.getNode(e);
    if (!n)
      throw new Error("node not found");
    s[de](n.index), this[G][n.index] = s;
  }
  replaceNodeByIndex(e, s) {
    if (e < 0 || e >= this[G].length)
      throw new Error("Indexes out ranges");
    if (!this[G][e])
      throw new Error("node not found");
    s[de](e), this[G][e] = s;
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
    if (e < 0 || e >= this[G].length)
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
    if (s < 0 || s >= this[G].length)
      throw new Error("Indexes out ranges");
    const u = this[G].slice(), [r] = u.splice(n.index, 1);
    u.splice(s, 0, r);
    for (let o = 0; o < u.length; o++)
      u[o][de](o);
    this[G] = u;
  }
  moveNodeByIndex(e, s) {
    if (e < 0 || e >= this[G].length || s < 0 || s >= this[G].length)
      throw new Error("Indexes out ranges");
    const n = this[G].slice(), [u] = n.splice(e, 1);
    n.splice(s, 0, u);
    for (let r = 0; r < n.length; r++)
      n[r][de](r);
    this[G] = n;
  }
  getFunctions() {
    return [...this[v].values()];
  }
  getFunction(e) {
    return this[v].get(e);
  }
  addFunction(e, s) {
    this[v].set(e, s);
  }
  hasFunction(e) {
    return this[v].has(e);
  }
  deleteFunction(e) {
    return this[v].delete(e);
  }
  executeFunction(e, ...s) {
    const n = this.getFunction(e);
    if (!n)
      throw new Error("function not found");
    n(s);
  }
  clearFunctions() {
    this[v].clear();
  }
  getAttributes() {
    return [...this[N].values()];
  }
  getAttribute(e) {
    return this[N].get(e);
  }
  addAttribute(e, s) {
    this[N].set(e, s);
  }
  hasAttribute(e) {
    return this[N].has(e);
  }
  deleteAttribute(e) {
    return this[N].delete(e);
  }
  clearAttributes() {
    this[N].clear();
  }
  getMetaKeys() {
    return [...this[L].values()];
  }
  getMetaKey(e) {
    return this[L].get(e);
  }
  addMetaKey(e, s) {
    this[L].set(e, s);
  }
  hasMetaKey(e) {
    return this[L].has(e);
  }
  deleteMetaKey(e) {
    return this[L].delete(e);
  }
  clearMetaKeys() {
    this[L].clear();
  }
  emit(e, s) {
    return this._events.addEventListener(e, s);
  }
  reset(e) {
    if (e)
      this[e] = this._initial[e];
    else
      for (const s of Object.keys(this._initial))
        this[s] = this._initial[s];
  }
  toObject() {
    return fe(
      {
        ...this
      },
      [
        "_initial",
        "_events",
        "_parent",
        "_uuid",
        "_index",
        "hierarchy",
        "type",
        "script"
      ]
    );
  }
  set(e, s, n) {
    if (e && typeof e == "string" && s)
      this[e] = s;
    else if (typeof n != "string")
      for (const [u, r] of Object.entries(this._initial))
        this[u] = r;
  }
  export(e = "JSON") {
    return e === "YAML" ? St(this[k]()) : H.stringify(this[k]());
  }
  static import(e, s = "JSON") {
    const n = s === "YAML" ? re(e) : H.parse(e);
    return V([n])[0];
  }
  [(Su = G, _u = v, ku = N, vu = L, mt)](e) {
    this._parent = e;
  }
  [ls](e) {
    this._uuid = e;
  }
  [de](e) {
    this._index = e;
  }
  [Fi](e) {
    this[v] = new Map(e);
  }
  [cs](e) {
    this[N] = new Map(e);
  }
  [Ei](e) {
    this[L] = new Map(e);
  }
  [wi](e) {
    this[G] = e;
  }
  [q](e, ...s) {
    return this._events.emitEvent(e, ...s);
  }
  async [Le]() {
    if (this.script === null)
      return;
    const e = await Bi(this.script, this), s = Object.entries(e.$functions);
    this[v] = new Map(s);
  }
  [k](e = !0) {
    const s = [];
    if (e)
      for (const n of this.getNodes())
        s.push(n[k]());
    return {
      uuid: this._uuid,
      functions: [...this[v].entries()],
      attributes: [...this[N].entries()],
      metaKeys: [...this[L].entries()],
      type: this.type,
      hierarchy: this.hierarchy,
      script: this.script ? this.script.replace(/(\r\n|\n|\r)/gm, "") : null,
      deep: this.deep,
      index: this.index,
      nodes: s,
      options: {
        ...this.toObject()
      }
    };
  }
}
const Ss = {
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
let _s = !1;
const Ie = (i) => {
  let t;
  return async function(...e) {
    return _s || (t = await i.apply(this, e), _s = !0), t;
  };
};
class ie extends hs {
  constructor(e) {
    super({ ...Ss, ...e });
    c(this, "_initial");
    c(this, "_calculate", {
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
    });
    c(this, "type", "Node2D");
    c(this, "visible");
    c(this, "selectable");
    c(this, "lock");
    c(this, "cursor");
    c(this, "x");
    c(this, "y");
    c(this, "rotationType");
    c(this, "centerScale");
    c(this, "centerRotation");
    c(this, "width");
    c(this, "height");
    c(this, "flipX");
    c(this, "flipY");
    c(this, "originX");
    c(this, "originY");
    c(this, "scaleX");
    c(this, "scaleY");
    c(this, "skewX");
    c(this, "skewY");
    c(this, "rotation");
    this._initial = { ...Ss, ...e }, this.visible = this._initial.visible, this.selectable = this._initial.selectable, this.lock = this._initial.lock, this.cursor = this._initial.cursor, this.x = this._initial.x, this.y = this._initial.y, this.rotationType = this._initial.rotationType, this.centerScale = this._initial.centerScale, this.centerRotation = this._initial.centerRotation, this.width = this._initial.width, this.height = this._initial.height, this.flipX = this._initial.flipX, this.flipY = this._initial.flipY, this.originX = this._initial.originX, this.originY = this._initial.originY, this.scaleX = this._initial.scaleX, this.scaleY = this._initial.scaleY, this.skewX = this._initial.skewX, this.skewY = this._initial.skewY, this.rotation = this._initial.rotation, this.processCalculate();
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
    this._parent && this._parent instanceof ie ? (this.x = (this._parent.width * this._parent.scaleX / 2 - this.width * this.scaleX / 2) / 2, this.y = (this._parent.height * this._parent.scaleY / 2 - this.height * this.scaleY / 2) / 2) : (this.x = (this.getApp().width / 2 - this.width * this.scaleX / 2) / 2, this.y = (this.getApp().height / 2 - this.height * this.scaleY / 2) / 2);
  }
  centerX() {
    this._parent && this._parent instanceof ie ? this.x = (this._parent.width * this._parent.scaleX / 2 - this.width * this.scaleX / 2) / 2 : this.x = (this.getApp().width / 2 - this.width * this.scaleX / 2) / 2;
  }
  centerY() {
    this._parent && this._parent instanceof ie ? this.y = (this._parent.height * this._parent.scaleY / 2 - this.height * this.scaleY / 2) / 2 : this.y = (this.getApp().height / 2 - this.height * this.scaleY / 2) / 2;
  }
  processCalculate() {
    this._parent && this._parent instanceof ie ? this._calculate.translate = {
      x: this._parent.x + this.x,
      y: this._parent.y + this.y
    } : this._calculate.translate = {
      x: this.x,
      y: this.y
    }, this._calculate.rotation = this.rotationType === "degrees" ? this.rotation * Math.PI / 180 : this.rotation, this._calculate.scaleFactor = {
      width: this.width * this.scaleX,
      height: this.height * this.scaleY
    }, this._calculate.middleScaleFactor = {
      width: this._calculate.scaleFactor.width / 2,
      height: this._calculate.scaleFactor.height / 2
    };
  }
  async process(e) {
    if (e === void 0) {
      if (this.getApp().execute("canvas:save", !0), this.script) {
        const s = this.getFunction("_draw"), n = this.getFunction("_ready"), u = this.getFunction("_process"), r = this.getApp().useGlobal("mode") === "preview" || this.getApp().useGlobal("mode") === "game";
        s && r && s(), n && r && Ie(n).call(null), u && r && u(e);
      }
      this.getApp().execute("canvas:restore", !0);
    }
  }
  emit(e, s) {
    return this._events.addEventListener(e, s);
  }
  reset(e) {
    if (e)
      this[e] = this._initial[e];
    else
      for (const s of Object.keys(this._initial))
        this[s] = this._initial[s];
  }
  toObject() {
    return fe(
      {
        ...this
      },
      [
        "_initial",
        "_events",
        "_parent",
        "_uuid",
        "_index",
        "_calculate",
        "hierarchy",
        "type",
        "script"
      ]
    );
  }
  set(e, s, n) {
    if (e && typeof e == "string" && s)
      this[e] = s;
    else if (typeof n != "string")
      for (const [u, r] of Object.entries(this._initial))
        this[u] = r;
  }
  static import(e, s = "JSON") {
    const n = s === "YAML" ? re(e) : H.parse(e);
    return V([n])[0];
  }
  [k](e = !0) {
    const s = [];
    if (e)
      for (const n of this.nodes)
        s.push(n[k]());
    return {
      uuid: this._uuid,
      functions: [...this[v].entries()],
      attributes: [...this[N].entries()],
      metaKeys: [...this[L].entries()],
      type: this.type,
      hierarchy: this.hierarchy,
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
class iu extends hs {
  constructor(e) {
    super(e);
    c(this, "type", "Scene2D");
  }
  async process() {
    if (this.script) {
      const e = this.getFunction("_draw"), s = this.getFunction("_ready"), n = this.getApp().$global.MODE === "preview" || this.getApp().$global.MODE === "game";
      e && n && e(), s && n && Ie(s).call(null);
    }
  }
  reset(e) {
    if (e)
      this[e] = this._initial[e];
    else
      for (const s of Object.keys(this._initial))
        this[s] = this._initial[s];
  }
  toObject() {
    return fe(
      {
        ...this
      },
      [
        "_initial",
        "_events",
        "_parent",
        "_uuid",
        "_index",
        "hierarchy",
        "type",
        "script"
      ]
    );
  }
  set(e, s, n) {
    if (e && typeof e == "string" && s)
      this[e] = s;
    else if (typeof n != "string")
      for (const [u, r] of Object.entries(this._initial))
        this[u] = r;
  }
  static import(e, s = "JSON") {
    const n = s === "YAML" ? re(e) : H.parse(e);
    return V([n])[0];
  }
  [k](e = !0) {
    const s = [];
    if (e)
      for (const n of this.nodes)
        s.push(n[k]());
    return {
      uuid: this._uuid,
      functions: [...this[v].entries()],
      attributes: [...this[N].entries()],
      metaKeys: [...this[L].entries()],
      type: this.type,
      hierarchy: this.hierarchy,
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
class nu extends ie {
  constructor(e) {
    super({ ...ks, ...e });
    c(this, "_initial");
    c(this, "type", "Rectangle2D");
    c(this, "background");
    c(this, "radius");
    c(this, "border");
    c(this, "borderColor");
    c(this, "borderWidth");
    this._initial = { ...ks, ...e }, this.background = this._initial.background, this.radius = this._initial.radius, this.border = this._initial.border, this.borderColor = this._initial.borderColor, this.borderWidth = this._initial.borderWidth;
  }
  async process(e, s) {
    if (!(e === void 0 && s !== void 0)) {
      if (this.getApp().execute("canvas:save", !0), this.processCalculate(), this.getApp().execute("draw:2D/rectangle", {
        ...this.toObject(),
        calculate: this._calculate
      }), this.script) {
        const n = this.getFunction("_draw"), u = this.getFunction("_ready"), r = this.getFunction("_process"), o = this.getApp().useGlobal("mode") === "preview" || this.getApp().useGlobal("mode") === "game";
        n && o && n(), u && o && Ie(u).call(null), r && o && r(s);
      }
      this.getApp().execute("canvas:restore", !0);
    }
  }
  reset(e) {
    if (e)
      this[e] = this._initial[e];
    else
      for (const s of Object.keys(this._initial))
        this[s] = this._initial[s];
  }
  toObject() {
    return fe(
      {
        ...this
      },
      [
        "_initial",
        "_events",
        "_parent",
        "_uuid",
        "_index",
        "_calculate",
        "hierarchy",
        "type",
        "script"
      ]
    );
  }
  set(e, s, n) {
    if (e && typeof e == "string" && s)
      this[e] = s;
    else if (typeof n != "string")
      for (const [u, r] of Object.entries(this._initial))
        this[u] = r;
  }
  static import(e, s = "JSON") {
    const n = s === "YAML" ? re(e) : H.parse(e);
    return V([n])[0];
  }
  [k](e = !0) {
    const s = [];
    if (e)
      for (const n of this.nodes)
        s.push(n[k]());
    return {
      uuid: this._uuid,
      functions: [...this[v].entries()],
      attributes: [...this[N].entries()],
      metaKeys: [...this[L].entries()],
      type: this.type,
      hierarchy: this.hierarchy,
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
const vs = {
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
class uu extends ie {
  constructor(e) {
    super({ ...vs, ...e });
    c(this, "_initial");
    c(this, "_selectedNodes", /* @__PURE__ */ new Set());
    c(this, "type", "Selection2D");
    c(this, "endX");
    c(this, "endY");
    c(this, "startX");
    c(this, "startY");
    c(this, "shape");
    c(this, "background");
    c(this, "radius");
    c(this, "border");
    c(this, "borderColor");
    c(this, "borderWidth");
    this._initial = { ...vs, ...e }, this.endX = this._initial.endX, this.endY = this._initial.endY, this.startX = this._initial.startX, this.startY = this._initial.startY, this.shape = this._initial.shape, this.background = this._initial.background, this.radius = this._initial.radius, this.border = this._initial.border, this.borderColor = this._initial.borderColor, this.borderWidth = this._initial.borderWidth;
  }
  validationPositionNode(e) {
    const s = this.getApp().$global.ZOOM.scale, n = this.getApp().$global.PAN.translateX, u = this.getApp().$global.PAN.translateY, r = (e.x - e.width * e.scaleX / 2 - n) / s, o = (e.y - e.height * e.scaleY / 2 - u) / s, a = r * Math.cos(-e.rotation * Math.PI / 180) - o * Math.sin(-e.rotation * Math.PI / 180), l = r * Math.sin(-e.rotation * Math.PI / 180) + o * Math.cos(-e.rotation * Math.PI / 180), D = Math.min(this.startX, this.endX) / s - n, f = Math.max(this.startX, this.endX) / s - n, p = Math.min(this.startY, this.endY) / s - u, m = Math.max(this.startY, this.endY) / s - u, A = e.width * e.scaleX / s, h = e.height * e.scaleY / s;
    return a >= D - A && a <= f && l >= p - h && l <= m;
  }
  select(e) {
    for (let s of e)
      this.validationPositionNode(s) ? this._selectedNodes.add(s) : this._selectedNodes.delete(s);
  }
  async process(e, s) {
    if (!(e === void 0 && s !== void 0)) {
      if (this.getApp().execute("canvas:save", !0), this.getApp().execute("draw:2D/selection", {
        ...this.toObject(),
        calculate: this._calculate
      }), this.script) {
        const n = this.getFunction("_draw"), u = this.getFunction("_ready"), r = this.getFunction("_process"), o = this.getApp().useGlobal("mode") === "preview" || this.getApp().useGlobal("mode") === "game";
        n && o && n(), u && o && Ie(u).call(null), r && o && r(s);
      }
      this.getApp().execute("canvas:restore", !0);
    }
  }
  reset(e) {
    if (e)
      this[e] = this._initial[e];
    else
      for (const s of Object.keys(this._initial))
        this[s] = this._initial[s];
  }
  toObject() {
    return fe(
      {
        ...this
      },
      [
        "_initial",
        "_events",
        "_parent",
        "_uuid",
        "_index",
        "_calculate",
        "_selectedNodes",
        "hierarchy",
        "type",
        "script"
      ]
    );
  }
  set(e, s, n) {
    if (e && typeof e == "string" && s)
      this[e] = s;
    else if (typeof n != "string")
      for (const [u, r] of Object.entries(this._initial))
        this[u] = r;
  }
  static import(e, s = "JSON") {
    const n = s === "YAML" ? re(e) : H.parse(e);
    return V([n])[0];
  }
  [k](e = !0) {
    const s = [];
    if (e)
      for (const n of this.nodes)
        s.push(n[k]());
    return {
      uuid: this._uuid,
      functions: [...this[v].entries()],
      attributes: [...this[N].entries()],
      metaKeys: [...this[L].entries()],
      type: this.type,
      hierarchy: this.hierarchy,
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
const Ns = {
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
class ru extends ie {
  constructor(e) {
    super({ ...Ns, ...e });
    c(this, "_initial");
    c(this, "type", "LineFlowEffect2D");
    c(this, "cellSize");
    c(this, "lineWidth");
    c(this, "spacing");
    c(this, "color");
    c(this, "radius");
    this._initial = { ...Ns, ...e }, this.cellSize = this._initial.cellSize, this.lineWidth = this._initial.lineWidth, this.spacing = this._initial.spacing, this.color = this._initial.color, this.radius = this._initial.radius;
  }
  async process(e, s) {
    if (!(e === void 0 && s !== void 0)) {
      if (this.getApp().execute("canvas:save", !0), this.getApp().execute("draw:2D/line-flow-effect", {
        ...this.toObject(),
        calculate: this._calculate
      }), this.script) {
        const n = this.getFunction("_draw"), u = this.getFunction("_ready"), r = this.getFunction("_process"), o = this.getApp().useGlobal("mode") === "preview" || this.getApp().useGlobal("mode") === "game";
        n && o && n(), u && o && Ie(u).call(null), r && o && r(s);
      }
      this.getApp().execute("canvas:restore", !0);
    }
  }
  reset(e) {
    if (e)
      this[e] = this._initial[e];
    else
      for (const s of Object.keys(this._initial))
        this[s] = this._initial[s];
  }
  toObject() {
    return fe(
      {
        ...this
      },
      [
        "_initial",
        "_events",
        "_parent",
        "_uuid",
        "_index",
        "_calculate",
        "hierarchy",
        "type",
        "script"
      ]
    );
  }
  set(e, s, n) {
    if (e && typeof e == "string" && s)
      this[e] = s;
    else if (typeof n != "string")
      for (const [u, r] of Object.entries(this._initial))
        this[u] = r;
  }
  static import(e, s = "JSON") {
    const n = s === "YAML" ? re(e) : H.parse(e);
    return V([n])[0];
  }
  [k](e = !0) {
    const s = [];
    if (e)
      for (const n of this.nodes)
        s.push(n[k]());
    return {
      uuid: this._uuid,
      functions: [...this[v].entries()],
      attributes: [...this[N].entries()],
      metaKeys: [...this[L].entries()],
      type: this.type,
      hierarchy: this.hierarchy,
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
class ou extends ie {
  constructor(e) {
    super({ ...Ls, ...e });
    c(this, "_initial");
    c(this, "type", "Text2D");
    c(this, "border");
    c(this, "borderColor");
    c(this, "borderWidth");
    c(this, "text");
    c(this, "fontSize");
    c(this, "fontFamily");
    c(this, "fontStretch");
    c(this, "fontStyle");
    c(this, "fontWeight");
    c(this, "fontVariant");
    c(this, "lineHeight");
    c(this, "textAlign");
    c(this, "textBaseline");
    c(this, "textDirection");
    c(this, "wordSpacing");
    c(this, "letterSpacing");
    c(this, "color");
    this._initial = { ...Ls, ...e }, this.border = this._initial.border, this.borderColor = this._initial.borderColor, this.borderWidth = this._initial.borderWidth, this.text = this._initial.text, this.fontSize = this._initial.fontSize, this.fontFamily = this._initial.fontFamily, this.fontStretch = this._initial.fontStretch, this.fontStyle = this._initial.fontStyle, this.fontWeight = this._initial.fontWeight, this.fontVariant = this._initial.fontVariant, this.lineHeight = this._initial.lineHeight, this.textAlign = this._initial.textAlign, this.textBaseline = this._initial.textBaseline, this.textDirection = this._initial.textDirection, this.wordSpacing = this._initial.wordSpacing, this.letterSpacing = this._initial.letterSpacing, this.color = this._initial.color;
  }
  async process(e, s) {
    if (!(e === void 0 && s !== void 0)) {
      if (this.getApp().execute("canvas:save", !0), this.getApp().execute("draw:2D/text", {
        ...this.toObject(),
        calculate: this._calculate
      }), this.script) {
        const n = this.getFunction("_draw"), u = this.getFunction("_ready"), r = this.getFunction("_process"), o = this.getApp().useGlobal("mode") === "preview" || this.getApp().useGlobal("mode") === "game";
        n && o && n(), u && o && Ie(u).call(null), r && o && r(s);
      }
      this.getApp().execute("canvas:restore", !0);
    }
  }
  reset(e) {
    if (e)
      this[e] = this._initial[e];
    else
      for (const s of Object.keys(this._initial))
        this[s] = this._initial[s];
  }
  toObject() {
    return fe(
      {
        ...this
      },
      [
        "_initial",
        "_events",
        "_parent",
        "_uuid",
        "_index",
        "_calculate",
        "hierarchy",
        "type",
        "script"
      ]
    );
  }
  set(e, s, n) {
    if (e && typeof e == "string" && s)
      this[e] = s;
    else if (typeof n != "string")
      for (const [u, r] of Object.entries(this._initial))
        this[u] = r;
  }
  static import(e, s = "JSON") {
    const n = s === "YAML" ? re(e) : H.parse(e);
    return V([n])[0];
  }
  [k](e = !0) {
    const s = [];
    if (e)
      for (const n of this.nodes)
        s.push(n[k]());
    return {
      uuid: this._uuid,
      functions: [...this[v].entries()],
      attributes: [...this[N].entries()],
      metaKeys: [...this[L].entries()],
      type: this.type,
      hierarchy: this.hierarchy,
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
const Os = {
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
class au extends ie {
  constructor(e) {
    super({ ...Os, ...e });
    c(this, "_initial");
    c(this, "type", "ControlEdition2D");
    c(this, "background");
    c(this, "radius");
    c(this, "border");
    c(this, "borderColor");
    c(this, "borderWidth");
    c(this, "padding");
    c(this, "cornerSize");
    c(this, "cornerColor");
    c(this, "cornerBorder");
    c(this, "cornerColorBorder");
    c(this, "showCorner");
    this._initial = { ...Os, ...e }, this.background = this._initial.background, this.radius = this._initial.radius, this.border = this._initial.border, this.borderColor = this._initial.borderColor, this.borderWidth = this._initial.borderWidth, this.padding = this._initial.padding, this.cornerSize = this._initial.cornerSize, this.cornerColor = this._initial.cornerColor, this.cornerBorder = this._initial.cornerBorder, this.cornerColorBorder = this._initial.cornerColorBorder, this.showCorner = this._initial.showCorner;
  }
  async process(e, s) {
    if (!(e === void 0 && s !== void 0)) {
      if (this.getApp().execute("canvas:save", !0), this.getApp().execute("draw:2D/control-edition", {
        ...this.toObject(),
        calculate: this._calculate
      }), this.script) {
        const n = this.getFunction("_draw"), u = this.getFunction("_ready"), r = this.getFunction("_process"), o = this.getApp().useGlobal("mode") === "preview" || this.getApp().useGlobal("mode") === "game";
        n && o && n(), u && o && Ie(u).call(null), r && o && r(s);
      }
      this.getApp().execute("canvas:restore", !0);
    }
  }
  reset(e) {
    if (e)
      this[e] = this._initial[e];
    else
      for (const s of Object.keys(this._initial))
        this[s] = this._initial[s];
  }
  toObject() {
    return fe(
      {
        ...this
      },
      [
        "_initial",
        "_events",
        "_parent",
        "_uuid",
        "_index",
        "_calculate",
        "hierarchy",
        "type",
        "script"
      ]
    );
  }
  set(e, s, n) {
    if (e && typeof e == "string" && s)
      this[e] = s;
    else if (typeof n != "string")
      for (const [u, r] of Object.entries(this._initial))
        this[u] = r;
  }
  static import(e, s = "JSON") {
    const n = s === "YAML" ? re(e) : H.parse(e);
    return V([n])[0];
  }
  [k](e = !0) {
    const s = [];
    if (e)
      for (const n of this.nodes)
        s.push(n[k]());
    return {
      uuid: this._uuid,
      functions: [...this[v].entries()],
      attributes: [...this[N].entries()],
      metaKeys: [...this[L].entries()],
      type: this.type,
      hierarchy: this.hierarchy,
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
const lu = {
  GlobalNode: hs,
  Node2D: ie,
  Scene2D: iu,
  Rectangle2D: nu,
  Selection2D: uu,
  LineFlowEffect2D: ru,
  Text2D: ou,
  ControlEdition2D: au
}, V = (i, t) => {
  const e = [];
  for (const s of i) {
    const n = new lu[s.type](s.options);
    t && n[mt](t), n.script = s.script, n[ls](s.uuid), n[de](s.index), n[cs](s.attributes), s.hierarchy === "children" && n[wi](
      V(
        s.nodes,
        n
      )
    ), e.push(n);
  }
  return e;
};
class cu {
  constructor(t) {
    c(this, "$app");
    c(this, "_formatExport", "JSON");
    this.$app = t;
  }
  import(t, e = "JSON") {
    const s = e === "JSON" ? H.parse(t) : re(t);
    this.$app[xs](s.options);
    const n = V(s.scenes);
    this.$app.scenes.add(...n), this.$app.scenes.change(s.scene);
  }
  export(t, e = this.$app.options.export.format) {
    return e === "YAML" ? St(this[k](t)) : H.stringify(this[k](t));
  }
  [k](t) {
    const e = this.$app.scenes[k](), s = this.$app[Gs]();
    return s.options.mode = t, {
      options: s.options,
      scenes: e,
      $plugins: s.plugins,
      $configs: s.configs,
      $providers: s.providers,
      $controls: s.controls,
      $nodes: s.nodes,
      $global: s.global,
      scene: this.$app.scenes.currentScene.uuid
    };
  }
}
class hu {
  constructor(t) {
    c(this, "$app");
    c(this, "_ref");
    c(this, "_events", new qe());
    c(this, "_framesPerSeconds", {
      delay: 0,
      // 1000 ms to delay
      velocity: 0
      // 60 fps per 1000 ms
    });
    c(this, "_deltaTime", 0);
    c(this, "_lastTime", 0);
    c(this, "_frame", 0);
    c(this, "_status", {
      pause: !1,
      playing: !1
    });
    c(this, "_state", {
      frames: 0,
      startTime: performance.now(),
      fps: 0
    });
    c(this, "_func", () => {
    });
    this.$app = t, this.$app;
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
  set callback(t) {
    this._func = t;
  }
  get isPlaying() {
    return this._status.playing;
  }
  get isPause() {
    return this._status.pause;
  }
  calculateFPS() {
    const t = performance.now(), e = t - this._state.startTime;
    e > this._framesPerSeconds.delay && (this._state.fps = Math.round(
      this._state.frames * this._framesPerSeconds.delay / e
    ), this._state.frames = 0, this._state.startTime = t), this._state.frames++;
  }
  loop(t) {
    this._lastTime === 0 && (this._lastTime = t), this._deltaTime = t - this._lastTime;
    let e = Math.floor(
      this._deltaTime / (this._framesPerSeconds.delay / this._framesPerSeconds.velocity)
    );
    e > this._frame && (this._frame = e, this.calculateFPS(), this._func({
      timestamp: t,
      deltaTime: this._deltaTime,
      frame: this._frame
    })), this._ref = window.requestAnimationFrame(this.loop.bind(this));
  }
  play() {
    this._status.playing || (this._status.playing = !0, this._status.pause = !1, this._ref = window.requestAnimationFrame(this.loop.bind(this)));
  }
  pause() {
    this._status.playing && (window.cancelAnimationFrame(this._ref), this._status.playing = !1, this._status.pause = !0, this._frame = 0, this._lastTime = 0, this._deltaTime = 0);
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
  [q](t, ...e) {
    this._events.emitEvent(t, e);
  }
}
class fu {
  constructor(t) {
    c(this, "$app");
    c(this, "_scenes", /* @__PURE__ */ new Map());
    c(this, "_scene");
    c(this, "_events", new qe());
    this.$app = t, this.$app;
  }
  get currentScene() {
    return this._scene;
  }
  get(t) {
    if (!this._scenes.has(t))
      throw new Error('not found scene "' + t + '"');
    return this._scenes.get(t);
  }
  change(t) {
    this._scene = this.get(t);
  }
  add(...t) {
    for (let e of t)
      this._scenes.set(e.uuid, e);
  }
  delete(t) {
    var e;
    this._scenes.delete(t), t === ((e = this.currentScene) == null ? void 0 : e.uuid) && (this._scene = void 0);
  }
  process(t, e = !1) {
    this._scene && this.executeProcess(this._scene, t, e);
  }
  executeProcess(t = this._scene, e, s = !1) {
    if (s && t.visible && t.reset(), t.visible && t.process(e), t.nodes.length)
      for (const n of t.nodes)
        this.executeProcess(n, e, s);
  }
  getScenes() {
    return [...this._scenes.values()];
  }
  export(t = "JSON") {
    return t === "YAML" ? St(this[k]()) : H.stringify(this[k]());
  }
  import(t, e = "JSON") {
    const s = e === "YAML" ? re(t) : H.parse(t), n = V(s).map((u) => [
      u.uuid,
      u
    ]);
    this._scenes = new Map(n);
  }
  emit(t, e) {
    this._events.addEventListener(t, e);
  }
  [Le](t = this._scene) {
    if (t[Le](), t.nodes.length)
      for (const e of t.nodes)
        this[Le](e);
  }
  [q](t, ...e) {
    this._events.emitEvent(t, e);
  }
  [k]() {
    const t = [];
    for (const e of this.getScenes())
      t.push(e[k]());
    return t;
  }
}
class fs {
}
class du extends fs {
  constructor(e) {
    super();
    c(this, "type");
    c(this, "canvas");
    c(this, "_size", {
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
class pu extends fs {
  constructor(e) {
    super();
    c(this, "type");
    c(this, "canvas");
    c(this, "_size", {
      height: 0,
      width: 0
    });
    this.type = "event", this.canvas = document.createElement("canvas"), this._size = { ...this._size, ...e }, this.init();
  }
  load() {
    return this.canvas.transferControlToOffscreen();
  }
  init() {
    this.canvas.width = this._size.width, this.canvas.height = this._size.height, this.canvas.style.position = "absolute", this.canvas.style.left = "0px", this.canvas.style.top = "0px", this.canvas.style.cursor = "default", this.canvas.style.userSelect = "none", this.canvas.style.touchAction = "none", this.canvas.setAttribute("data-type-canvas", this.type);
  }
}
class Du extends fs {
  constructor(e) {
    super();
    c(this, "type");
    c(this, "canvas");
    c(this, "_size", {
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
const _i = "Y29uc3QgdyA9IChyLCBhLCBlKSA9PiB7CiAgaWYgKHIuaW5kZXhPZigibGluZWFyLWdyYWRpZW50IikgIT09IC0xKSB7CiAgICBjb25zdCBsID0gci5yZXBsYWNlKCJsaW5lYXItZ3JhZGllbnQoIiwgIiIpLnNsaWNlKDAsIC0xKS5zcGxpdCgiLCIpLCBkID0gYS5jcmVhdGVMaW5lYXJHcmFkaWVudCgKICAgICAgMCwKICAgICAgMCwKICAgICAgZS53aWR0aCwKICAgICAgZS5oZWlnaHQKICAgICk7CiAgICByZXR1cm4gbC5mb3JFYWNoKChoKSA9PiB7CiAgICAgIGNvbnN0IGYgPSBoLnRyaW0oKS5zcGxpdCgiICIpOwogICAgICBkLmFkZENvbG9yU3RvcChOdW1iZXIoZlswXSksIGZbMV0pOwogICAgfSksIGQ7CiAgfSBlbHNlCiAgICByZXR1cm4gcjsKfSwgcyA9IChyKSA9PiB7CiAgci5jbGVhclJlY3QoMCwgMCwgci5jYW52YXMud2lkdGgsIHIuY2FudmFzLmhlaWdodCk7Cn0sIFMgPSAocikgPT4gewogIHIuc2F2ZSgpOwp9LCBiID0gKHIpID0+IHsKICByLnJlc3RvcmUoKTsKfSwgeSA9IChyLCBhKSA9PiB7CiAgci50cmFuc2xhdGUoYS54LCBhLnkpOwp9LCB2ID0gKHIsIGEpID0+IHsKICByLnNjYWxlKGEuc2NhbGUsIGEuc2NhbGUpOwp9LCBQID0gKHIsIGEpID0+IHsKICBjb25zdCB7IGNhbGN1bGF0ZTogZSB9ID0gYTsKICByLnRyYW5zbGF0ZShlLnRyYW5zbGF0ZS54LCBlLnRyYW5zbGF0ZS55KSwgci5yb3RhdGUoZS5yb3RhdGlvbiksIHIuZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uID0gImRlc3RpbmF0aW9uLW92ZXIiLCByLnN0cm9rZVN0eWxlID0gYS5ib3JkZXJDb2xvciwgci5saW5lV2lkdGggPSBhLmJvcmRlcldpZHRoOwogIGNvbnN0IGwgPSBlLnNjYWxlRmFjdG9yLndpZHRoICsgYS5wYWRkaW5nICogMiwgZCA9IGUuc2NhbGVGYWN0b3IuaGVpZ2h0ICsgYS5wYWRkaW5nICogMjsKICByLmJlZ2luUGF0aCgpLCByLnN0cm9rZVJlY3QoCiAgICAtbCAvIDIsCiAgICAtZCAvIDIsCiAgICBsLAogICAgZAogICksIGEuc2hvd0Nvcm5lciAmJiAoci5maWxsU3R5bGUgPSBhLmNvcm5lckNvbG9yLCByLmJlZ2luUGF0aCgpLCByLmFyYygKICAgIC1sIC8gMiwKICAgIC1kIC8gMiwKICAgIGEuY29ybmVyU2l6ZSwKICAgIDAsCiAgICAyICogTWF0aC5QSQogICksIHIuZmlsbCgpLCByLmJlZ2luUGF0aCgpLCByLmFyYygwLCAtZCAvIDIsIGEuY29ybmVyU2l6ZSwgMCwgMiAqIE1hdGguUEkpLCByLmZpbGwoKSwgci5iZWdpblBhdGgoKSwgci5hcmMoCiAgICBsIC8gMiwKICAgIC1kIC8gMiwKICAgIGEuY29ybmVyU2l6ZSwKICAgIDAsCiAgICAyICogTWF0aC5QSQogICksIHIuZmlsbCgpLCByLmJlZ2luUGF0aCgpLCByLmFyYygtbCAvIDIsIDAsIGEuY29ybmVyU2l6ZSwgMCwgMiAqIE1hdGguUEkpLCByLmZpbGwoKSwgci5iZWdpblBhdGgoKSwgci5hcmMobCAvIDIsIDAsIGEuY29ybmVyU2l6ZSwgMCwgMiAqIE1hdGguUEkpLCByLmZpbGwoKSwgci5iZWdpblBhdGgoKSwgci5hcmMoCiAgICAtbCAvIDIsCiAgICBkIC8gMiwKICAgIGEuY29ybmVyU2l6ZSwKICAgIDAsCiAgICAyICogTWF0aC5QSQogICksIHIuZmlsbCgpLCByLmJlZ2luUGF0aCgpLCByLmFyYygwLCBkIC8gMiwgYS5jb3JuZXJTaXplLCAwLCAyICogTWF0aC5QSSksIHIuZmlsbCgpLCByLmJlZ2luUGF0aCgpLCByLmFyYygKICAgIGwgLyAyLAogICAgZCAvIDIsCiAgICBhLmNvcm5lclNpemUsCiAgICAwLAogICAgMiAqIE1hdGguUEkKICApLCByLmZpbGwoKSksIHIuY2xvc2VQYXRoKCk7Cn0sIEYgPSAociwgYSkgPT4gewogIGNvbnN0IHsgY2FsY3VsYXRlOiBlIH0gPSBhOwogIHIudHJhbnNsYXRlKGUudHJhbnNsYXRlLngsIGUudHJhbnNsYXRlLnkpLCByLnJvdGF0ZShlLnJvdGF0aW9uKSwgci5saW5lV2lkdGggPSBhLmxpbmVXaWR0aCwgci5zdHJva2VTdHlsZSA9IHcoYS5jb2xvciwgciwgewogICAgd2lkdGg6IGEueCwKICAgIGhlaWdodDogYS55CiAgfSk7CiAgZm9yIChsZXQgbCA9IDA7IGwgPCBhLnk7IGwgKz0gYS5jZWxsU2l6ZSkKICAgIGZvciAobGV0IGQgPSAwOyBkIDwgYS54OyBkICs9IGEuY2VsbFNpemUpIHsKICAgICAgY29uc3QgaCA9IChNYXRoLmNvcyhkICogMC4wMSkgKyBNYXRoLnNpbihsICogMC4wMSkpICogYS5yYWRpdXM7CiAgICAgIHIuYmVnaW5QYXRoKCksIHIubW92ZVRvKGQsIGwpLCByLmxpbmVUbygKICAgICAgICBkICsgTWF0aC5jb3MoaCkgKiBhLnNwYWNpbmcsCiAgICAgICAgbCArIE1hdGguc2luKGgpICogYS5zcGFjaW5nCiAgICAgICksIHIuc3Ryb2tlKCk7CiAgICB9Cn0sIG0gPSAociwgYSkgPT4gewogIGNvbnN0IHsgY2FsY3VsYXRlOiBlIH0gPSBhOwogIHIudHJhbnNsYXRlKGUudHJhbnNsYXRlLngsIGUudHJhbnNsYXRlLnkpLCBlLnJvdGF0aW9uID09PSAwICYmIHIucm90YXRlKGUucm90YXRpb24pLCByLmZpbGxTdHlsZSA9IGEuYmFja2dyb3VuZCwgYS5ib3JkZXIgJiYgKHIuc3Ryb2tlU3R5bGUgPSBhLmJvcmRlckNvbG9yKSwgYS5ib3JkZXIgJiYgKHIubGluZVdpZHRoID0gYS5ib3JkZXJXaWR0aCksIHIuYmVnaW5QYXRoKCksIGEucmFkaXVzID8gdHlwZW9mIGEucmFkaXVzID09ICJudW1iZXIiIHx8IEFycmF5LmlzQXJyYXkoYS5yYWRpdXMpID8gci5yb3VuZFJlY3QoCiAgICAtZS5taWRkbGVTY2FsZUZhY3Rvci53aWR0aCwKICAgIC1lLm1pZGRsZVNjYWxlRmFjdG9yLmhlaWdodCwKICAgIGUuc2NhbGVGYWN0b3Iud2lkdGgsCiAgICBlLnNjYWxlRmFjdG9yLmhlaWdodCwKICAgIGEucmFkaXVzCiAgKSA6IHIucm91bmRSZWN0KAogICAgLWUubWlkZGxlU2NhbGVGYWN0b3Iud2lkdGgsCiAgICAtZS5taWRkbGVTY2FsZUZhY3Rvci5oZWlnaHQsCiAgICBlLnNjYWxlRmFjdG9yLndpZHRoLAogICAgZS5zY2FsZUZhY3Rvci5oZWlnaHQsCiAgICBbCiAgICAgIGEucmFkaXVzLnRvcExlZnQsCiAgICAgIGEucmFkaXVzLnRvcFJpZ2h0LAogICAgICBhLnJhZGl1cy5ib3R0b21MZWZ0LAogICAgICBhLnJhZGl1cy50b3BSaWdodAogICAgXQogICkgOiByLnJlY3QoCiAgICAtZS5taWRkbGVTY2FsZUZhY3Rvci53aWR0aCwKICAgIC1lLm1pZGRsZVNjYWxlRmFjdG9yLmhlaWdodCwKICAgIGUuc2NhbGVGYWN0b3Iud2lkdGgsCiAgICBlLnNjYWxlRmFjdG9yLmhlaWdodAogICksIHIuZmlsbCgpLCBhLmJvcmRlciAmJiByLnN0cm9rZSgpLCByLmNsb3NlUGF0aCgpOwp9LCBDID0gKHIsIGEpID0+IHsKICByLmZpbGxTdHlsZSA9IGEuYmFja2dyb3VuZCwgYS5ib3JkZXIgJiYgKHIuc3Ryb2tlU3R5bGUgPSBhLmJvcmRlckNvbG9yKSwgYS5ib3JkZXIgJiYgKHIubGluZVdpZHRoID0gYS5ib3JkZXJXaWR0aCksIHIuYmVnaW5QYXRoKCksIGEucmFkaXVzID8gdHlwZW9mIGEucmFkaXVzID09ICJudW1iZXIiIHx8IEFycmF5LmlzQXJyYXkoYS5yYWRpdXMpID8gci5yb3VuZFJlY3QoCiAgICBhLngsCiAgICBhLnksCiAgICBhLndpZHRoLAogICAgYS5oZWlnaHQsCiAgICBhLnJhZGl1cwogICkgOiByLnJvdW5kUmVjdChhLngsIGEueSwgYS53aWR0aCwgYS5oZWlnaHQsIFsKICAgIGEucmFkaXVzLnRvcExlZnQsCiAgICBhLnJhZGl1cy50b3BSaWdodCwKICAgIGEucmFkaXVzLmJvdHRvbUxlZnQsCiAgICBhLnJhZGl1cy50b3BSaWdodAogIF0pIDogci5yZWN0KGEueCwgYS55LCBhLndpZHRoLCBhLmhlaWdodCksIHIuZmlsbCgpLCBhLmJvcmRlciAmJiByLnN0cm9rZSgpLCByLmNsb3NlUGF0aCgpOwp9LCBEID0gKHIsIGEpID0+IHsKICBjb25zdCB7IGNhbGN1bGF0ZTogZSB9ID0gYTsKICByLnRyYW5zbGF0ZShlLnRyYW5zbGF0ZS54LCBlLnRyYW5zbGF0ZS55KSwgci5yb3RhdGUoZS5yb3RhdGlvbiksIHIuZmlsbFN0eWxlID0gYS5jb2xvciwgci5mb250ID0gYCR7YS5mb250U3RyZXRjaCA/IGEuZm9udFN0cmV0Y2ggKyAiICIgOiAiIn0ke2EuZm9udFZhcmlhbnQgPyBhLmZvbnRWYXJpYW50ICsgIiAiIDogIiJ9JHthLmZvbnRTdHlsZSA/IGEuZm9udFN0eWxlICsgIiAiIDogIiJ9JHthLmZvbnRXZWlnaHQgPyBhLmZvbnRXZWlnaHQgKyAiICIgOiAiIn0ke2EuZm9udFNpemUgPyBhLmZvbnRTaXplIDogIiJ9JHthLmxpbmVIZWlnaHQgPyAiLyIgKyBhLmxpbmVIZWlnaHQgKyAiICIgOiAiIn0ke2EuZm9udEZhbWlseSA/IGEuZm9udEZhbWlseSA6ICIifWAsIHIudGV4dEFsaWduID0gYS50ZXh0QWxpZ24sIHIudGV4dEJhc2VsaW5lID0gYS50ZXh0QmFzZWxpbmUsIHIuZGlyZWN0aW9uID0gYS50ZXh0RGlyZWN0aW9uLCByLndvcmRTcGFjaW5nID0gYS53b3JkU3BhY2luZywgci5sZXR0ZXJTcGFjaW5nID0gYS5sZXR0ZXJTcGFjaW5nLCBhLmJvcmRlciAmJiAoci5zdHJva2VTdHlsZSA9IGEuYm9yZGVyQ29sb3IpLCBhLmJvcmRlciAmJiAoci5saW5lV2lkdGggPSBhLmJvcmRlcldpZHRoKSwgYS5ib3JkZXIgPyByLnN0cm9rZVRleHQoYS50ZXh0LCBhLngsIGEueSkgOiByLmZpbGxUZXh0KGEudGV4dCwgYS54LCBhLnkpOwp9LCBfID0gKHIsIGEsIGUsIGwpID0+IHsKICBjb25zdCBoID0gewogICAgImRyYXc6MkQvcmVjdGFuZ2xlIjogbSwKICAgICJkcmF3OjJEL3RleHQiOiBELAogICAgImRyYXc6MkQvc2VsZWN0aW9uIjogQywKICAgICJkcmF3OjJEL2xpbmUtZmxvdy1lZmZlY3QiOiBGLAogICAgImRyYXc6MkQvY29udHJvbC1lZGl0aW9uIjogUCwKICAgICJjYW52YXM6Y2xlYXIiOiBzLAogICAgImNhbnZhczpyb3RhdGlvbiI6IHMsCiAgICAiY2FudmFzOnNjYWxlIjogdiwKICAgICJjYW52YXM6dHJhbnNsYXRlIjogeSwKICAgICJjYW52YXM6c2F2ZSI6IFMsCiAgICAiY2FudmFzOnJlc3RvcmUiOiBiCiAgfVtyXTsKICBoICYmIGgobC5jb250ZXh0LCBhKSwgZS5jbGVhclJlY3QoMCwgMCwgbC5jYW52YXMud2lkdGgsIGwuY2FudmFzLmhlaWdodCksIGUuZHJhd0ltYWdlKGwuY2FudmFzLCAwLCAwKTsKfTsKbGV0IGMsIHQsIHUsIGksIGc7CmNvbnN0IGsgPSAoeyBjb250ZXh0OiByIH0pID0+IHsKICBjID09PSB2b2lkIDAgJiYgKGMgPSByKTsKfSwgbiA9ICh7IGNhbnZhczogciB9KSA9PiB7CiAgciAhPT0gdm9pZCAwICYmIChpIHx8IChpID0gciwgdCA9IG5ldyBPZmZzY3JlZW5DYW52YXMoci53aWR0aCwgci5oZWlnaHQpKSk7Cn0sIFIgPSAoKSA9PiB7CiAgaWYgKGkgPT09IHZvaWQgMCB8fCBnICE9PSB2b2lkIDApCiAgICByZXR1cm47CiAgY29uc3QgciA9IGMucmVwbGFjZSgiLSIsICIiKTsKICBnID0gaS5nZXRDb250ZXh0KAogICAgcgogICksIHUgPSB0LmdldENvbnRleHQoCiAgICByCiAgKTsKfSwgVyA9ICh7CiAgc2l6ZTogcgp9KSA9PiB7CiAgciAmJiBpICYmIChpLndpZHRoID0gci53aWR0aCwgaS5oZWlnaHQgPSByLmhlaWdodCwgdC53aWR0aCA9IHIud2lkdGgsIHQuaGVpZ2h0ID0gci5oZWlnaHQpOwp9LCBNID0gKHIsIGEpID0+IHsKICBpICYmIGMgPT09ICIyZCIgJiYgXyhyLCBhLCBnLCB7CiAgICBjb250ZXh0OiB1LAogICAgY2FudmFzOiB0CiAgfSk7Cn07CnNlbGYub25tZXNzYWdlID0gZnVuY3Rpb24ocikgewogIGsoci5kYXRhKSwgbihyLmRhdGEpLCBSKCksIFcoci5kYXRhKTsKICBjb25zdCBhID0gci5kYXRhLnNldHRpbmc7CiAgYSAmJiBNKGEuYWN0aW9uLCBhLm9wdGlvbnMpOwp9Owo=", gu = (i) => Uint8Array.from(atob(i), (t) => t.charCodeAt(0)), $s = typeof window < "u" && window.Blob && new Blob(["URL.revokeObjectURL(import.meta.url);", gu(_i)], { type: "text/javascript;charset=utf-8" });
function mu(i) {
  let t;
  try {
    if (t = $s && (window.URL || window.webkitURL).createObjectURL($s), !t)
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
class yu {
  constructor(t) {
    c(this, "$app");
    c(this, "_worker");
    c(this, "_canvas", /* @__PURE__ */ new Map());
    c(this, "_main");
    this.$app = t, this._worker = new mu(), this._worker.postMessage({
      context: this.$app.options.context
    });
    const { width: e, height: s } = this.processSize();
    this.$app.options.mode === "editor" && this._canvas.set(
      "editor",
      new du({
        width: e,
        height: s
      })
    ), this.$app.options.mode === "game" && this._canvas.set(
      "game",
      new Du({
        width: e,
        height: s
      })
    ), this._canvas.set(
      "event",
      new pu({
        width: e,
        height: s
      })
    ), this.init(this.$app.options.selector, e, s), this.loadContext(e, s);
  }
  get instance() {
    return this._canvas.get(this.$app.options.mode).canvas;
  }
  processSize() {
    return this.$app.options.mode === "game" ? {
      width: this.$app.options.game.width,
      height: this.$app.options.game.height
    } : {
      width: this.$app.options.width,
      height: this.$app.options.height
    };
  }
  init(t, e, s) {
    var u;
    if (this._main)
      return;
    if (this._main = document.createElement("section"), this._main.style.userSelect = "none", this._main.style.position = "relative", this._main.setAttribute("data-canvas-container", this.$app.options.mode), this._main.style.width = e + "px", this._main.style.height = s + "px", this.$app.options.mode === "editor") {
      const r = this._canvas.get("editor");
      this._main.appendChild(r.canvas);
    }
    if (this.$app.options.mode === "game") {
      const r = this._canvas.get("game");
      this._main.appendChild(r.canvas);
    }
    const n = this._canvas.get("event");
    this._main.appendChild(n.canvas), (u = document.querySelector(t)) == null || u.appendChild(this._main);
  }
  loadContext(t, e) {
    let s = new OffscreenCanvas(t, e);
    this.$app.options.mode === "game" && (s = this._canvas.get("game").load()), this.$app.options.mode === "editor" && (s = this._canvas.get("editor").load()), this._worker.postMessage(
      {
        canvas: s
      },
      [s]
    );
  }
  setSize(t, e) {
    this._main && (this._main.style.width = t + "px", this._main.style.height = e + "px", this._worker.postMessage({
      size: {
        width: t,
        height: e
      }
    }));
  }
  execute(t) {
    this._worker.postMessage({
      setting: t
    });
  }
}
const ki = "Cg==", Cu = (i) => Uint8Array.from(atob(i), (t) => t.charCodeAt(0)), Ts = typeof window < "u" && window.Blob && new Blob(["URL.revokeObjectURL(import.meta.url);", Cu(ki)], { type: "text/javascript;charset=utf-8" });
function Au(i) {
  let t;
  try {
    if (t = Ts && (window.URL || window.webkitURL).createObjectURL(Ts), !t)
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
function bu(i) {
  return i && i.__esModule && Object.prototype.hasOwnProperty.call(i, "default") ? i.default : i;
}
const Fu = /[\u0000-\u001f\u0022\u005c\ud800-\udfff]|[\ud800-\udbff](?![\udc00-\udfff])|(?:[^\ud800-\udbff]|^)[\udc00-\udfff]/;
function Eu(i) {
  if (typeof i != "string")
    throw new TypeError(`Expected input to be of type string, received type ${typeof i} (${i})`);
  return i.length < 5e3 && !Fu.test(i) ? `"${i}"` : JSON.stringify(i);
}
var wu = Eu;
const Iu = /* @__PURE__ */ bu(wu);
class Bu {
  constructor(t) {
    c(this, "$app");
    c(this, "_window");
    this.$app = t;
  }
  makeConfigWindow(t) {
    let e = "scrollbars=0,status=0,menubar=0,toolbar=0,location=0,directories=0";
    if (t.full_size ? e += `,width=${screen.availWidth},height=${screen.availHeight}` : e += `,width=${t.width},height=${t.height}`, t.center && !t.full_size) {
      const s = screen.height / 2 - t.height / 2, n = screen.width / 2 - t.width / 2;
      e += `,top=${s},left=${n}`;
    } else
      t.full_size ? e += ",top=0,left=0" : e += `,top=${t.y},left=${t.x}`;
    return t.resizable ? e += ",resizable=1" : e += ",resizable=0", t.full_screen ? e += ",fullscreen=1" : e += ",fullscreen=0", t.title ? e += ",titlebar=1" : e += ",titlebar=0", e.trim();
  }
  makeCanvas(t) {
    return `
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
                padding: 0;
                margin: 0;
                width: 100%;
                height: 100%;
                overflow: hidden;
            }
        </style>
    </head>
    <body>
      <div data-canvas></div>
        <script>
          window.addEventListener("DOMContentLoaded", () => {
            (async ({ AtomicEngine }) => {
              const app = new AtomicEngine({}, true)

              app.import(${Iu(this.$app.export("game"))})

              app.preview().play()

              await app.start()
            })(Atomic)

            ${t.full_screen ? `
            if (!document.fullscreenElement) {
              app.canvas.instance.requestFullscreen();
            } else {
              document.exitFullscreen();
            }
            ` : ""}

            ${t.resizable ? "" : `window.onresize = function() {
              window.resizeTo(${t.width}, ${t.height});
            }`}
          })
        <\/script>
    </body>
    </html>
`;
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
class Tu {
  constructor(t, e = !1) {
    c(this, "_worker");
    c(this, "_options");
    c(this, "_plugins", /* @__PURE__ */ new Map());
    c(this, "_configs", /* @__PURE__ */ new Map());
    c(this, "_providers", /* @__PURE__ */ new Map());
    c(this, "_nodes", /* @__PURE__ */ new Map());
    c(this, "_controls", /* @__PURE__ */ new Map());
    c(this, "_global", /* @__PURE__ */ new Map([
      ["mode", "edition"],
      // "edition"| "game" | "preview"
      ["status", null],
      // null | "play" | "pause" | "game-over" | "stop" | "start" | "intro" | "cinematic"
      ["fps", null]
    ]));
    c(this, "_events", new qe());
    c(this, "$events");
    c(this, "$distribution");
    c(this, "$window");
    c(this, "$animation");
    c(this, "$scenes");
    c(this, "$canvas");
    this._worker = new Au(), this._options = { ...ds, ...t }, e || this.init(), this.$distribution = new cu(this), this.$window = new Bu(this), this.$events = new Oi(this), ze[Ms](this);
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
  get options() {
    return Object.freeze(this._options);
  }
  init() {
    this.$animation = new hu(this), this.$scenes = new fu(this), this.$canvas = new yu(this), this.initAnimation();
  }
  initAnimation() {
    this.animation.setDelayFrames(this.options.fps.delay), this.animation.setVelocityFrames(this.options.fps.velocity), this.animation.callback = (t) => {
      this.execute("canvas:clear"), this.scenes.process(t);
    };
  }
  setSize(t, e) {
    this._options.width = t, this._options.height = e, this.canvas.setSize(t, e);
  }
  setExport(t, e = [], s = []) {
    this._options.export.format = t, this._options.export.exclude = e, this._options.export.include = s;
  }
  plugin(t, e) {
    if (t.install(this, e), this._plugins.set(t.name, {
      config: t == null ? void 0 : t.config,
      nodes: t == null ? void 0 : t.nodes,
      providers: t == null ? void 0 : t.providers
    }), t.inject) {
      this[t.name] = {};
      for (const [s, n] of Object.entries(t.inject))
        this[t.name][s] = n;
    }
    if (t.events)
      for (const [s, n] of Object.entries(t.events))
        n && this._events.addEventListener(s, n);
  }
  use(t) {
    var n, u;
    const e = {
      config: this._configs,
      providers: this._providers,
      nodes: this._nodes
    };
    let s;
    if (/@(config|providers|nodes)\/[a-zA-Z-_)(.$]+\/[a-zA-Z-_)(.$]+/g.test(t)) {
      const [r, o, a] = t.substring(1).split("/");
      return s = this._plugins.get(o), s ? (n = s[r]) == null ? void 0 : n[a] : (u = e[r].get(o)) == null ? void 0 : u[a];
    }
    if (/@(config|providers|nodes)\/[a-zA-Z-_)(.$]+/g.test(t)) {
      const [r, o] = t.substring(1).split("/");
      return s = this._plugins.get(o), s ? s[r] : e[r].get(o);
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
  calculate() {
    this._worker;
  }
  validation() {
    this._worker;
  }
  execute(t, e) {
    this.canvas.execute({
      dimension: this.options.dimension,
      context: this.options.context,
      action: t,
      options: e
    });
  }
  export(t = "editor") {
    return this.$distribution.export(t);
  }
  import(t) {
    this.$distribution.import(t);
  }
  async start() {
    this.$scenes.currentScene && this.$scenes[Le](), this.animation.play();
  }
  preview() {
    return {
      play: () => {
        this._global.set("mode", "preview");
      },
      pause: () => {
        this._global.set("mode", "edition");
      }
    };
  }
  game() {
    return {
      play: () => {
        this.$window.createWindow();
      },
      stop: () => {
        this.$window.closeWindow();
      }
    };
  }
  [xs](t) {
    this._options = { ...ds, ...t }, this.init(), this.$events[Ys]();
  }
  [Gs]() {
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
  [q](t, ...e) {
    return this._events.emitEvent(t, ...e);
  }
  [Li](t) {
    return this._events.hasEventListener(t);
  }
}
var Nu, Lu, Ou;
class Yu extends ze {
  constructor(e) {
    super();
    c(this, "_initial");
    c(this, "_events");
    c(this, "_parent");
    c(this, "_uuid");
    c(this, "_index");
    c(this, "hierarchy", "not-children");
    c(this, "type", "GlobalNode");
    c(this, "script");
    c(this, "name");
    c(this, "title");
    c(this, "description");
    c(this, Nu);
    c(this, Lu);
    c(this, Ou);
    this._initial = { ...Si, ...e }, this._events = new qe(), this._parent = null, this._uuid = Ii(), this._index = 0, this.script = null, this.name = this._initial.name, this.title = this._initial.title, this.description = this._initial.description, this[v] = /* @__PURE__ */ new Map(), this[N] = /* @__PURE__ */ new Map(), this[L] = /* @__PURE__ */ new Map();
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
    return this.parent ? this.parent.index + "_" + this.index : this.index.toString();
  }
  getFunctions() {
    return [...this[v].values()];
  }
  getFunction(e) {
    return this[v].get(e);
  }
  addFunction(e, s) {
    this[v].set(e, s);
  }
  hasFunction(e) {
    return this[v].has(e);
  }
  deleteFunction(e) {
    return this[v].delete(e);
  }
  executeFunction(e, ...s) {
    const n = this.getFunction(e);
    if (!n)
      throw new Error("function not found");
    n(s);
  }
  clearFunctions() {
    this[v].clear();
  }
  getAttributes() {
    return [...this[N].values()];
  }
  getAttribute(e) {
    return this[N].get(e);
  }
  addAttribute(e, s) {
    this[N].set(e, s);
  }
  hasAttribute(e) {
    return this[N].has(e);
  }
  deleteAttribute(e) {
    return this[N].delete(e);
  }
  clearAttributes() {
    this[N].clear();
  }
  getMetaKeys() {
    return [...this[L].values()];
  }
  getMetaKey(e) {
    return this[L].get(e);
  }
  addMetaKey(e, s) {
    this[L].set(e, s);
  }
  hasMetaKey(e) {
    return this[L].has(e);
  }
  deleteMetaKey(e) {
    return this[L].delete(e);
  }
  clearMetaKeys() {
    this[L].clear();
  }
  emit(e, s) {
    return this._events.addEventListener(e, s);
  }
  reset(e) {
    if (e)
      this[e] = this._initial[e];
    else
      for (const s of Object.keys(this._initial))
        this[s] = this._initial[s];
  }
  toObject() {
    return fe(
      {
        ...this
      },
      [
        "_initial",
        "_events",
        "_parent",
        "_uuid",
        "_index",
        "hierarchy",
        "type",
        "script"
      ]
    );
  }
  set(e, s, n) {
    if (e && typeof e == "string" && s)
      this[e] = s;
    else if (typeof n != "string")
      for (const [u, r] of Object.entries(this._initial))
        this[u] = r;
  }
  export(e = "JSON") {
    return e === "YAML" ? St(this[k]()) : H.stringify(this[k]());
  }
  static import(e, s = "JSON") {
    const n = s === "YAML" ? re(e) : H.parse(e);
    return V([n])[0];
  }
  [(Nu = v, Lu = N, Ou = L, mt)](e) {
    this._parent = e;
  }
  [ls](e) {
    this._uuid = e;
  }
  [de](e) {
    this._index = e;
  }
  [Fi](e) {
    this[v] = new Map(e);
  }
  [cs](e) {
    this[N] = new Map(e);
  }
  [Ei](e) {
    this[L] = new Map(e);
  }
  [q](e, ...s) {
    return this._events.emitEvent(e, ...s);
  }
  async [Le]() {
    if (!this.$_script)
      return;
    const e = await Bi(this.$_script, this), s = Object.entries(e.$functions);
    this.$_functions = new Map(s);
  }
  [k]() {
    return {
      uuid: this.uuid,
      functions: [...this[v].entries()],
      attributes: [...this[N].entries()],
      metaKeys: [...this[L].entries()],
      type: this.type,
      hierarchy: this.hierarchy,
      script: this.script ? this.script.replace(/(\r\n|\n|\r)/gm, "") : null,
      deep: this.deep,
      index: this.index,
      options: {
        ...this.toObject()
      }
    };
  }
}
export {
  Tu as AtomicEngine,
  au as ControlEdition2D,
  hs as GlobalNode,
  Yu as GlobalNodeNC,
  ru as LineFlowEffect2D,
  ie as Node2D,
  nu as Rectangle2D,
  iu as Scene2D,
  uu as Selection2D,
  ou as Text2D
};
