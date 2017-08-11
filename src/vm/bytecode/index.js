export function createOp(type, A = null, B = null, C = null) {
  return {
    type,
    A,
    B,
    C,
  };
}
