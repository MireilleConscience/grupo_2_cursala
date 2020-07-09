//const Curso = require('models/curso');
module.exports = (sequelize, DataTypes)=>{
const Categoria = sequelize.define('Category', {
    id:{
        autoIncrement:true, 
        primaryKey:true,  
        type:DataTypes.INTEGER
    }, 
    name: DataTypes.STRING(50),
},{
    tableName:'categorias',
    timestamps:false
});


Categoria.associate = function(models) {
    // associations can be defined here
    Categoria.hasMany(models.Curso, {foreignKey:"categoryId", as:"cursos"});

  };

//Categoria.AsMany(Curso, {foreignKey:"categoryId", as:"cursos"});
return Categoria;

}