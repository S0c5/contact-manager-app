import sails from 'sails';
import Q from 'q';

module.exports = async () => {
  await Object.keys(sails.models)
    .map(_modelName => sails.models[_modelName])
    .map(async _model => await _model.destroy({}))
    .reduce(Q.when, Q.resolve());
};
