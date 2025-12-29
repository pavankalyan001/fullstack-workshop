const typeOf = value => {
  if (value === null) return "null";

  if (typeof value === "number" && Number.isNaN(value)) {
    return "nan";
  }

  const primitiveTypes = new Set([
    "undefined",
    "string",
    "number",
    "boolean",
    "symbol",
    "function"
  ]);

  const baseType = typeof value;

  if (primitiveTypes.has(baseType)) {
    return baseType;
  }

  return Object.prototype.toString
    .call(value)
    .slice(8, -1)
    .toLowerCase();
};

/* ================= TEST ================= */

[
  null,
  undefined,
  42,
  NaN,
  "hello",
  true,
  Symbol(),
  [],
  {},
  () => {},
  new Date(),
  new Map(),
  new Set(),
  /regex/,
  new Error(),
  Promise.resolve()
].forEach(value =>
  console.log(`Type of value is: ${typeOf(value)}`)
);
