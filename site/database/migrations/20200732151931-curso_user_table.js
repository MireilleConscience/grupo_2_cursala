'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    return queryInterface.createTable('cursos_users',{
      id:{
        allowNull: false,
        autoIncrement:true, 
        primaryKey:true,  
        type:Sequelize.INTEGER
    },
      cursos_id:{
        type:Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'cursos'
          },
          key: 'id'
        },
        allowNull: false
    } ,
      users_id:{
        type:Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'users'
          },
          key: 'id'
        },
        allowNull: false
    } ,
      cantidad:{
        type:Sequelize.INTEGER
    }
    
  })
    
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('cursos_users');
  }
};


