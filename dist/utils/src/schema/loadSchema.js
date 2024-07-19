const d = (r) => new Promise((e, s) => {
  const t = new FileReader();
  t.onload = (o) => {
    var a;
    try {
      const n = (a = o.target) == null ? void 0 : a.result, c = JSON.parse(n);
      e(c);
    } catch (n) {
      s(n);
    }
  }, t.onerror = (o) => s(o), t.readAsText(r);
}), h = (r) => JSON.parse(r), l = (r) => fetch(r).then((e) => e.json()).then((e) => JSON.parse(e));
export {
  d as LoadFromFile,
  h as LoadFromString,
  l as LoadFromUrl
};
