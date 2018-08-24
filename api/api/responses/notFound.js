module.exports = function notFound() {
  const { res } = this;
  res.status(404).end('404');
};
