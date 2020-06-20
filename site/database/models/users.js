module.exports = (sequelize, DataTypes)=>{

const Model = sequelize.define('User', {
    id:{
        autoIncrement:true, 
        primaryKey:true,  
        type:DataTypes.INTEGER
    },
    first_name:DataTypes.STRING(50),
    email: DataTypes.STRING(50),
    password: DataTypes.STRING(250),
    avatar:DataTypes.STRING(100),
    typeId:DataTypes.INTEGER
},{
    tableName:'users',
    timestamps:false
});
return Model;

}