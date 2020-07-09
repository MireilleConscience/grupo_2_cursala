module.exports = (sequelize, DataTypes)=>{

const Model = sequelize.define('User', {
    id:{
        autoIncrement:true, 
        primaryKey:true,  
        type:DataTypes.INTEGER
    },
    firstName:DataTypes.STRING(50),
    email: DataTypes.STRING(50),
    password: DataTypes.STRING(250),
    avatar:DataTypes.STRING(100),
    //typeId:DataTypes.INTEGER
    admin:DataTypes.BOOLEAN
},{
    tableName:'users',
    timestamps:false
});
return Model;

}