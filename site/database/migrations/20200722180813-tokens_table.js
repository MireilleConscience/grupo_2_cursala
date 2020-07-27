'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('tokens',{
      id:{
        allowNull: false,
        autoIncrement:true, 
        primaryKey:true,  
        type:Sequelize.INTEGER
      },
       userId:{ 
        type:Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'users'
          },
          key: 'id'
        },
        allowNull: false
      }, 
      token:{ 
        type:Sequelize.STRING,
        allowNull: false
       },
       expiresAt:{ 
         type:Sequelize.DATE,
         allowNull: false
        },
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('tokens');
  }
};
