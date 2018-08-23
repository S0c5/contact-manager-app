import sails from 'sails';

before(async function () {
  this.timeout(5000);
  await sails.lift({
    hooks: { grunt: false },
    log: { level: 'warn' },
  });
});

after(async function () {
  await sails.lower();
});
