module.exports = function onlyFormats(fieldName, allowedFormats) {
  return async function (req, res, next) {
    const file = req.body[fieldName];

    /* istanbul ignore if */
    if (!file) {
      return res.error(new ApiError(400, 'E_NO_FILE_FOUND'));
    }

    /* istanbul ignore if */
    if (!file.type) {
      return res.error(new ApiError(400, 'E_INVALID_FORMAT'));
    }

    const baseTypeName = file.type.split('/')[0];

    if (!allowedFormats.includes(baseTypeName)) {
      return res.error(new ApiError(400, 'E_INVALID_FORMAT'));
    }

    next();
  };
};
