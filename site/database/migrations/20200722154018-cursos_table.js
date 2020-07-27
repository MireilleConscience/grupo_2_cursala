'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('cursos',{
      id:{
        allowNull: false,
        autoIncrement:true, 
        primaryKey:true,  
        type:Sequelize.INTEGER
      },
      name:{ 
        type:Sequelize.STRING(50),
      },
      description:{ 
        type:Sequelize.STRING(250),
      },
      image:{ 
        type:Sequelize.STRING(100),
      },
      length:{ 
        type:Sequelize.INTEGER
      },
      price:{ 
        type:Sequelize.FLOAT
      },
      categoryId:{ 
        type:Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'categorias'
          },
          key: 'id'
        },
        allowNull: false
      }
    })
},

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('cursos');
  }
};
