'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('categorias',{
    id:{
      allowNull: false,
      autoIncrement:true, 
      primaryKey:true,  
      type:Sequelize.INTEGER
    },
    name:{ 
     type:Sequelize.STRING(50),
     allowNull: false
    }
  })
},
  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('categorias');
  }
};
