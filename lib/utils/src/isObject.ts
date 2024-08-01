export default function isObject(thing: any) {
  if (typeof File !== 'undefined' && thing instanceof File) {
    return false;
  }
  if (typeof Date !== 'undefined' && thing instanceof Date) {
    return false;
  }
  return typeof thing === 'object' && thing !== null && !Array.isArray(thing);
}
