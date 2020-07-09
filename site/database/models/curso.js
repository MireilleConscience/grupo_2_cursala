//const Category = require('models/categoria');
module.exports = (sequelize, DataTypes)=>{

const Curso = sequelize.define('Curso', {
    id:{
        autoIncrement:true, 
        primaryKey:true,  
        type:DataTypes.INTEGER
    },
    name:DataTypes.STRING(50),
    description: DataTypes.STRING(250),
    image:DataTypes.STRING(100),
    length:DataTypes.INTEGER,  
    price:DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER, 
},{
    tableName:'cursos',
    timestamps:false
});

Curso.associate = function(models) {
    // associations can be defined here
    Curso.belongsTo(models.Category, {foreignKey:"categoryId", as:"categorias"});

  };


return Curso;

}