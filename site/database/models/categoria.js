//const Curso = require('models/curso');
module.exports = (sequelize, DataTypes)=>{
const Model = sequelize.define('Category', {
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

//Model.AsMany(Curso, {foreignKey:"categoryId", as:"cursos"});
return Model;

}