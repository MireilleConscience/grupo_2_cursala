module.exports = (sequelize, DataTypes)=>{

//const CursoUser = sequelize.define('cursos_users', {
const CursoUser = sequelize.define('CursoUser', {
    id:{
        autoIncrement:true, 
        primaryKey:true,  
        type:DataTypes.INTEGER
    },
    cursos_id:DataTypes.INTEGER,
    users_id:DataTypes.INTEGER,
    cantidad: DataTypes.INTEGER
  },{
    tableName:'cursos_users',
    timestamps:false
});



return CursoUser;

}