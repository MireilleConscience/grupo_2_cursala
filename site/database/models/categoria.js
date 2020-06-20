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
return Model;

}