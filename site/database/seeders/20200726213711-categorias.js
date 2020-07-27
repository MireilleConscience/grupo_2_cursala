'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('categorias', [
      { name: 'Cocinar Tapas' },
      { name: 'Cocinar con nada' },
      { name: 'Cocina gourmet' }
    ]);
  },


  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('categorias', null, {});
  }
};
