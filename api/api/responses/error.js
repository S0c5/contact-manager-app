module.exports = function error(error) {
  const { res } = this;

  if (error.code === 'E_INVALID_NEW_RECORD') {
    error.status = 400;
  }

  res
    .status(error.status || 500)
    .json({
      error: {
        code: error.code || 'E_UNKNOW_ERROR',
        message: error.message
      }
    });
};
