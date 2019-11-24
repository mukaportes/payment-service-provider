const getArraySum = (numArray) => numArray
  .reduce((current, next) => Number(current) + Number(next), 0);

module.exports = {
  getArraySum,
};