module.exports = (sequelize, DataTypes)=>{

const Model = sequelize.define('Curso', {
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
return Model;

}