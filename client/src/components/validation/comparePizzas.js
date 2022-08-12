function comparePizzas(a, b) {
  for (let i = 0; i < a.length; i++) {
    a[i] = a[i] + 1
  }
  return Array.isArray(a) &&
    Array.isArray(b) &&
    a.length === b.length &&
    a.every((val, index) => val === b[index])
}

export default comparePizzas