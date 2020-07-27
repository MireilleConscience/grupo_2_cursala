'use strict';
const bcryptjs = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('users', [
      {
        firstName: 'admin',
        email : 'admin@admin.com',
        password :bcryptjs.hashSync('admin', 5),
        avatar:'',
        admin : 1
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};
