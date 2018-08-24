

module.exports = {

  datastores: {
    default: {
      adapter: 'sails-mysql',
      host: 'localhost',
      database: 'contactsDbTest',
      port: 3306,
      user: 'root',
      password: ''
    },
  },
  models: {
    migrate: 'alter'
  },
};
