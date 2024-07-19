import { DEFAULT_KEY as n, TYPE_KEY as e, ARRAY_TYPE as p, PROPERTIES_KEY as f } from "../constants.js";
import { l as t } from "../../../lodash-COV_X6vg.js";
function Y(r) {
  if (n in r)
    return t.get(r, [n]);
  if (e in r && t.get(r, [e]) == p)
    return [];
  if (f in r) {
    let o = {};
    for (const i in r.properties) {
      const E = t.get(r, [f, i]);
      t.set(o, [i], Y(E));
    }
    return o;
  }
  return "";
}
export {
  Y as getFormData
};
