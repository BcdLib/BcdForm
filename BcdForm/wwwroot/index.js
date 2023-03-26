var y = Object.defineProperty;
var _ = (o, e, t) => e in o ? y(o, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : o[e] = t;
var n = (o, e, t) => (_(o, typeof e != "symbol" ? e + "" : e, t), t);
var c = (o) => {
  var e = sessionStorage.getItem("isDebug") === "true";
  e && o();
};
const g = (o, e = 160) => {
  let t;
  var i = +new Date();
  return function(...s) {
    let a = this, d = +new Date() - 0;
    window.clearTimeout(t), d - i >= e ? (o.apply(a, s), i = d) : t = window.setTimeout(() => {
      o.apply(this, s);
    }, e);
  };
}, r = (o) => o ? o instanceof Element ? o : document.querySelector(o) : null, h = (o, e, t = null) => {
  let i = r(o);
  return i ? t ? (i.setAttribute(e, t), t) : i.getAttribute(e) : null;
}, b = (o, e) => {
  let t = r(o);
  t && (typeof e == "string" ? t.classList.add(e) : t.classList.add(...e));
}, M = (o, e) => {
  let t = r(o);
  t && (typeof e == "string" ? t.classList.remove(e) : t.classList.remove(...e));
}, p = (o, e, t = null) => {
  if (typeof e == "string") {
    if (t === null) {
      let s = e.split(";");
      for (let a = 0; a < s.length; a++) {
        let d = s[a];
        if (!d)
          continue;
        let l = d.split(":");
        o.style.setProperty(l[0], l[1]);
      }
      return;
    }
    o.style.setProperty(e, t);
  } else
    for (let i in e)
      e.hasOwnProperty(i) && o.style.setProperty(i, e[i]);
}, f = /* @__PURE__ */ new Map(), x = {
  inViewport: !0
};
class w {
  constructor(e, t, i) {
    n(this, "_trigger");
    n(this, "_container");
    n(this, "_options", null);
    n(this, "_state", null);
    n(this, "_isFirst", !0);
    n(this, "_style", null);
    n(this, "onMousedown", (e) => {
      e.stopPropagation = !0, c(() => {
        console.log("onMousedown");
      });
      const t = this._state;
      t.isInDrag = !0, t.mX = e.clientX, t.mY = e.clientY;
      const { left: i, top: s } = this.getContainerPos();
      this._container.style.position = "absolute", c(() => {
        console.log("this._isFirst", this._isFirst, i, s);
      }), t.domMaxY = document.documentElement.clientHeight - this._container.offsetHeight - 1, t.domMaxX = document.documentElement.clientWidth - this._container.offsetWidth - 1, t.domMaxY = t.domMaxY < 0 ? 0 : t.domMaxY, t.domMaxX = t.domMaxX < 0 ? 0 : t.domMaxX, this._isFirst && (this._container.style.left = i + "px", this._container.style.top = s + "px", this._style || (this._style = this._container.getAttribute("style")), this._isFirst = !1), t.domStartX = i, t.domStartY = s;
    });
    n(this, "onMouseup", (e) => {
      e.stopPropagation = !0;
      const t = this._state;
      t.isInDrag = !1;
      const { left: i, top: s } = this.getContainerPos();
      t.domStartX = i, t.domStartY = s;
    });
    n(this, "onMousemove", g((e) => {
      const t = this._state;
      if (t.isInDrag) {
        var i = e.clientX, s = e.clientY, a = i - t.mX, d = s - t.mY, l = t.domStartX + a, u = t.domStartY + d;
        this._options.inViewport && (l < 0 ? l = 0 : l > t.domMaxX && (l = t.domMaxX), u < 0 ? u = 0 : u > t.domMaxY && (u = t.domMaxY)), this._container.style.margin = "0", this._container.style.paddingBottom = "0", this._container.style.left = l + "px", this._container.style.top = u + "px";
      }
    }, 10).bind(this));
    n(this, "onResize", g((e) => {
      const t = this._state;
      t.domMaxY = document.documentElement.clientHeight - this._container.offsetHeight - 1, t.domMaxX = document.documentElement.clientWidth - this._container.offsetWidth - 1, t.domMaxY = t.domMaxY < 0 ? 0 : t.domMaxY, t.domMaxX = t.domMaxX < 0 ? 0 : t.domMaxX, t.domStartY = parseInt(this._container.style.top), t.domStartX = parseInt(this._container.style.left), t.domStartY > t.domMaxY && t.domMaxY > 0 && (this._container.style.top = t.domMaxY + "px"), t.domStartX > t.domMaxX && (this._container.style.left = t.domMaxX + "px");
    }, 10).bind(this));
    this._trigger = e, this._container = t, this._options = Object.assign({}, x, {
      inViewport: i
    }), this._state = {
      isInDrag: !1,
      mX: 0,
      // mouse x
      mY: 0,
      // mouse y
      domStartX: 0,
      // on mousedown, the mouse x
      domStartY: 0
      // on mousedown, the mouse y            
    };
  }
  getContainerPos() {
    const e = this._container.getBoundingClientRect();
    return {
      left: e.left,
      top: e.top
    };
  }
  bindDrag() {
    const e = this._trigger, t = this._options;
    e.addEventListener("mousedown", this.onMousedown, !1), window.addEventListener("mouseup", this.onMouseup, !1), document.addEventListener("mousemove", this.onMousemove), t.inViewport && window.addEventListener("resize", this.onResize, !1);
  }
  unbindDrag() {
    this._trigger.removeEventListener("mousedown", this.onMousedown, !1), window.removeEventListener("mouseup", this.onMouseup, !1), document.removeEventListener("mousemove", this.onMousemove), this._options.inViewport && window.removeEventListener("resize", this.onResize, !1);
  }
  resetContainerStyle() {
    this._style !== null && (this._isFirst = !0, this._container.setAttribute("style", this._style));
  }
}
function v(o, e, t = !0) {
  let i = r(o);
  if (i != null) {
    let s = f.get(i);
    s || (s = new w(i, r(e), t), f.set(i, s)), s.bindDrag();
  }
}
function S(o) {
  let e = r(o);
  if (e != null) {
    const t = f.get(e);
    t && t.unbindDrag();
  }
}
function E(o) {
  let e = r(o);
  if (e != null) {
    const t = f.get(e);
    t && t.resetContainerStyle();
  }
}
function Y(o, e) {
  let t = r(o), i = "";
  if (t) {
    let s = t.querySelector(".bcd-form");
    e && (i = h(s, "style"), c(() => {
      console.log("get lastNormalStyle", i);
    })), c(() => {
      console.log("minResetStyle");
    }), s.style.left = "", s.style.top = "", s.style.right = "";
  }
  return i;
}
function X(o, e) {
  let t = r(o), i = "";
  if (t) {
    let s = t.querySelector(".bcd-form");
    e && (i = h(s, "style"), c(() => {
      console.log("get lastNormalStyle", i);
    })), c(() => {
      console.log("maxResetStyle");
    }), s.style.left = "", s.style.top = "";
  }
  return i;
}
let m = [];
const L = () => {
  let o = document.body.style.overflow;
  return o && o === "hidden" ? !1 : document.body.scrollHeight > (window.innerHeight || document.documentElement.clientHeight);
};
function C() {
  let o = document.body;
  const e = {};
  ["position", "width", "overflow"].forEach((t) => {
    e[t] = o.style[t];
  }), m.push(e), p(
    o,
    {
      position: "relative",
      width: L() ? "calc(100% - 17px)" : null,
      overflow: "hidden"
    }
  ), b(document.body, "ant-scrolling-effect");
}
function P() {
  let o = m.length > 0 ? m.pop() : {};
  p(
    document.body,
    {
      position: o.position ?? null,
      width: o.width ?? null,
      overflow: o.overflow ?? null
    }
  ), M(document.body, "ant-scrolling-effect");
}
const D = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  disableBodyScroll: C,
  disableDraggable: S,
  enableBodyScroll: P,
  enableDraggable: v,
  maxResetStyle: X,
  minResetStyle: Y,
  resetDraggableElePosition: E
}, Symbol.toStringTag, { value: "Module" }));
window.bcd = {
  interop: D,
  version: "0.0.1",
  autoDebug: c
};
