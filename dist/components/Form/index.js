import { jsx as u, Fragment as N, jsxs as d } from "react/jsx-runtime";
import { useState as P, useEffect as O } from "react";
import { toPathSchema as E } from "../../utils/src/schema/toPathSchema.js";
import { SCHEMA_KEY as o, NUMBER_TYPE as T, STRING_TYPE as _, NAME_KEY as p, OBJECT_TYPE as x, ARRAY_TYPE as A } from "../../utils/src/constants.js";
import { l as i } from "../../lodash-COV_X6vg.js";
import { getFormData as J } from "../../utils/src/schema/loadFormData.js";
function Y(t, r, s, m, l) {
  return /* @__PURE__ */ u(N, { children: t[o].type === T || t[o].type === _ ? /* @__PURE__ */ u(
    "input",
    {
      name: t[p].substring(1),
      value: r,
      onChange: s,
      type: t[o].type
    }
  ) : /* @__PURE__ */ d(N, { children: [
    Object.keys(t).map((e) => e === p || e == o ? null : typeof i.get(t, [e]) === x && r && i.get(r, [e]) !== void 0 ? /* @__PURE__ */ d("div", { style: { marginLeft: `${l * 10}px` }, children: [
      /* @__PURE__ */ d("label", { children: [
        e,
        ": "
      ] }),
      Y(i.get(t, [e]), i.get(r, [e]), s, m, l + 1)
    ] }, e) : null),
    t[o].type == A && /* @__PURE__ */ u(
      "button",
      {
        onClick: (e) => m(e, t[p], t[o]),
        children: "Add Field"
      }
    )
  ] }) });
}
const M = (t) => {
  const [r, s] = P(t.formData), [m, l] = P(E(t.schema, "", r)), e = (f) => {
    const { name: g, value: c } = f.target;
    s((a) => {
      let n = JSON.parse(JSON.stringify(a));
      return i.set(n, g, c), l(E(t.schema, "", n)), n;
    });
  }, b = (f, g, c) => {
    f.preventDefault(), s((a) => {
      let n = JSON.parse(JSON.stringify(a)), F = i.get(n, g.substring(1));
      return F[F.length] = J(c.items), n;
    });
  };
  return O(() => {
    l(E(t.schema, "", r));
  }, [r]), /* @__PURE__ */ u("form", { children: Y(m, r, e, b, 0) });
};
export {
  M as Form
};
