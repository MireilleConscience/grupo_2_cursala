module.exports = (sequelize, DataTypes)=>{

const User = sequelize.define('User', {
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


User.associate = function(models) {
    // associations can be defined here
    User.belongsToMany(models.Curso, 
        {as:"cursos",
         through:  models.CursoUser,
         foreignKey: "users_id",
         otherKey: "cursos_id",
         timestamps:false
        });


    User.hasMany(models.Compras, {foreignKey:"Id_compras", as:"compras"});


  };
return User;

}