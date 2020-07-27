'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('compras',{
    id:{
      allowNull: false,
      autoIncrement:true, 
      primaryKey:true,  
      type:Sequelize.INTEGER
    },
    cantidad:{ 
     type:Sequelize.INTEGER,
     allowNull: false
    },
    price:{ 
      type:Sequelize.INTEGER,
      allowNull: false
     },
     users_id:{ 
      type:Sequelize.INTEGER,
      references: {
        model: {
          tableName: 'users'
        },
        key: 'id'
      },
      allowNull: false
    }
  })
},
  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('compras');
  }
};
