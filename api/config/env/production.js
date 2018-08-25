module.exports = {
  blueprints: {
    actions: false,
    rest: true,
    shortcuts: false,
    pluralize: true,
  },
  datastores: {
    default: {
      adapter: 'sails-mysql',
      url: process.env.DATABASE_URI || 'mysql://root@mysql:3306/contactsDb',
    },
  },
  models: {
    migrate: 'safe',
  },
  sockets: {
    onlyAllowOrigins: ['http://localhost:3000', 'https://app.minero.co', 'http://localhost']
  },
  security: {
    cors: {
      allRoutes: true,
      allowOrigins: ['http://localhost:3000', 'https://app.minero.co', 'http://localhost'],
      allowCredentials: true,
    },
  },
  custom: {
    s3: {
      enabled: true,
      accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
      accessSecretKey: process.env.AWS_ACCESS_SECRET_KEY || '',
      bucketName: process.env.AWS_BUCKET_NAME || ''
    }
  }
};
