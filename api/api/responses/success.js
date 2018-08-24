module.exports = function success(data) {
  const { res } = this;
  res.status(200).json(data);
};
