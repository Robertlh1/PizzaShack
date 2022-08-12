function checkForSameTopping(a, b) {
  for (let i = 0; i < a.length; i++) {
    if (a[i].name === b) {
      return true
    }
  }
  return false
}

export default checkForSameTopping