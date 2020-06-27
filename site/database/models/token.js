'use strict';
module.exports = (sequelize, DataTypes) => {
  const Token = sequelize.define('Token', {
    id:{
      autoIncrement:true, 
      primaryKey:true,  
      type:DataTypes.INTEGER
  }, 
    userId: DataTypes.STRING,
    token: DataTypes.STRING,
    expiresAt: DataTypes.DATE
  }, {
    tableName : 'tokens',
    timestamps:false
  });
  /*Token.associate = function(models) {
    // associations can be defined here
  };*/
  return Token;
};