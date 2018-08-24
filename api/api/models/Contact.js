/**
 * Contact.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    name: {
      type: 'string',
      required: true,
    },
    phone: {
      type: 'string',
      required: true,
    },
    email: {
      type: 'string',
      required: true,
    },
    profileImage: {
      type: 'string',
      required: false,
      allowNull: true
    }
  },
  createOne: async function(data){
    return await this.create(data).fetch();
  },
  findById: async function(id){
    return await this.findOne({ id });
  }
};

