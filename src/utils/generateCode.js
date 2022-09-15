const generateCode = (length = 6) => {
  return `GH_${Math.floor(
    Math.pow(10, length - 1) + Math.random() * (Math.pow(10, length) - Math.pow(10, length - 1) - 1)
  )}`;
};

module.exports = generateCode;
