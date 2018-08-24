module.exports = {
  datastores: {
    default: {
      adapter: 'sails-mysql',
      host: 'localhost',
      database: 'contactsDb',
      port: 3306,
      user: 'root',
      password: ''
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
