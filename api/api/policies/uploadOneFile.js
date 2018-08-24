import Q from 'q';
import skipperS3 from 'skipper-s3';

module.exports = function uploadOneFile(name) {
  return async function (req, _, next) {
    const UploadFileAsPromise = Q.nbind(req.file(name).upload, req.file(name));
    const { custom: { s3: s3Config } } = sails.config;
    let file = null;

    if (!s3Config.enabled) {
      file = await UploadFileAsPromise();
    } else {
      file = await UploadFileAsPromise({
        adapter: skipperS3,
        key: s3Config.accessKeyId,
        secret: s3Config.accessSecretKey,
        bucket: s3Config.bucketName
      });
    }
    req.body[name] = file[0];
    next();
  };
};
