import { promisify } from 'util';
import sails from 'sails';
import supertest from 'supertest';
import cleanDb from './utils/clean-db';



before(async () => {
  await promisify(sails.lift)({log: { level: 'warn' }});
  global.request = supertest(sails.hooks.http.app);
  global.cleanDb = cleanDb;
  // this clear the database by each test
});

after(async () => {
  await promisify(sails.lower)();
});
