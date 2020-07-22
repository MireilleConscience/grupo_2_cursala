//const Curso = require('models/curso');
module.exports = (sequelize, DataTypes)=>{
const Compras = sequelize.define('Compras', {
    id_compras:{
        autoIncrement:true, 
        primaryKey:true,  
        type:DataTypes.INTEGER
    }, 
    cantidad: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    users_id:DataTypes.INTEGER
},{
    tableName:'compras',
    timestamps:false
});


return Compras;

}