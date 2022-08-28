const bcrypt = require('bcrypt');
const util = require('util');
const hash = util.promisify(bcrypt.hash);
const salt = Number(process.env.SALT_ROUNDS)

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('users', [
      {
        login: 'Chokidar',
        password: await hash('qwerty1', salt),
        userName: 'Usepolling',
        gender: 'male',
        admin: true,
      },
      {
        login: 'Albertu',
        password: await hash('qwerty2', salt),
        userName: 'Alba',
        gender: 'male',
        admin: false,
      },
      {
        login: 'Gertrude',
        password: await hash('qwerty3', salt),
        gender: 'female',
        admin: false,
      },
      {
        login: 'Poncha',
        password: await hash('qwerty4', salt),
        userName: 'Panzerschreck',
        gender: 'other',
        admin: false,
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('users', null, {});
  },
};
