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
      minLength: 1,
      required: true,
    },
    phone: {
      type: 'string',
      custom: (v) => v.match(/\+{0,1}[0-9\-]+/),
      required: true,
    },
    email: {
      type: 'string',
      isEmail: true,
      required: true,
    },
    profileImage: {
      type: 'string',
      required: false,
      allowNull: true
    }
  },
  createAndRetrieve: async function(data){
    return await this.create(data).fetch();
  },
  findById: async function(id){
    return await this.findOne({ id });
  },
  findOneAndUpdate: async function(query, data){
    return (await this.update(query, data).fetch())[0] || null;
  }
};

