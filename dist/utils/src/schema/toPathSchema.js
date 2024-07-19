import { SCHEMA_KEY as c, ITEMS_KEY as l, PROPERTIES_KEY as f, NAME_KEY as A } from "../constants.js";
import { l as p } from "../../../lodash-COV_X6vg.js";
function s(t, e, i) {
  const n = {
    [A]: e
  };
  if (n[c] = t, l in t && Array.isArray(i)) {
    const { items: r } = t;
    Array.isArray(r) ? i.forEach((E, o) => {
      r[o] && (n[o] = s(r[o], `${e}[${o}]`, E));
    }) : i.forEach((E, o) => {
      n[o] = s(r, `${e}[${o}]`, E);
    });
  } else if (f in t)
    for (const r in t.properties) {
      const E = p.get(t, [f, r]);
      n[r] = s(E, `${e}.${r}`, p.get(i, [r]));
    }
  return n;
}
function h(t, e, i) {
  return s(t, e, i);
}
export {
  h as toPathSchema
};
