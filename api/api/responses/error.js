module.exports = function error(error) {
  const { res } = this;
  res.status(500).json(error);
};
