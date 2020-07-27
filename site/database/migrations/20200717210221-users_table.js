'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    return queryInterface.createTable('users',{
      id:{
        allowNull: false,
        autoIncrement:true, 
        primaryKey:true,  
        type:Sequelize.INTEGER
    },
      firstName:{ 
       type:Sequelize.STRING(50),
       allowNull: false
    },
      email:{
       type: Sequelize.STRING(50),
       allowNull: false
    },
      password:{
       type: Sequelize.STRING(250),
       allowNull: false,
       unique : true
    },
      avatar:{
       type:Sequelize.STRING(100)
    },
      admin:{
       type: Sequelize.BOOLEAN
    }

  })

  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('users');
  }
};
