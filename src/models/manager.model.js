'use strict'
const Manager =(sequelize ,DataTypes)=> sequelize.define('manager',{
    managerName:{type:DataTypes.STRING,allowNull:false,unieqe:true },
});
module.exports=Manager