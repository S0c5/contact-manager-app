import { promisify } from 'util';
import sails from 'sails';
import supertest from 'supertest';
import Q from 'q';



before(async () => {
  await promisify(sails.lift)({log: { level: 'warn' }});
  global.request = supertest(sails.hooks.http.app);

  // this clear the database by each test

  await Object.keys(sails.models)
  .map(_modelName => sails.models[_modelName])
  .map(async _model => await _model.destroy({}))
  .reduce(Q.when, Q.resolve());
});
