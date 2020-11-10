module.exports = {
  generateId: (length = 4) => {
    let result = '';
    const possibleChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    const charLength = possibleChars.length;
    for (let i = 0; i < length; i++) {
      result += possibleChars.charAt(Math.floor(Math.random() * charLength));
    }
    return result;
  }
}
