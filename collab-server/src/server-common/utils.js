module.exports = {
  getLimitCode: () => {
    return "_LIMIT";
  },

  generateId: (existingCount = 0, length = 4) => {
    let result = '';
    const possibleChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const permutations = Math.pow(possibleChars.length, length);
    if (permutations <= existingCount) {
      return getLimitCode();
    }
    const charLength = possibleChars.length;
    for (let i = 0; i < length; i++) {
      result += possibleChars.charAt(Math.floor(Math.random() * charLength));
    }
    return result;
  },

  getRandomIndex: (arrayLength) => {
    return Math.floor(Math.random() * (arrayLength - 1))
  }
}
