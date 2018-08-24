/**
 * ContactController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  /**
   * Create
   *
   * @description this action create a contact
   * @param {Contact} res.body the body should be a contact model
   */
  create: (req, res) => {
    Contact.createAndRetrieve(req.body)
      .then(res.success)
      .catch(res.error);
  },

  /**
   *  UploadImage
   *
   * @description this action upload an image to s3 and patch the contact image
   * @param {File} image multipart file
   */

  uploadImage: async (req, res) => {
    const { id } = req.params;

    Contact.findOneAndUpdate({ id }, { profileImage: _.get(req.body.image, 'extra.Location', `file://${req.body.image.fd}`) })
      .then(res.success)
      .catch(res.error);
  }

};

