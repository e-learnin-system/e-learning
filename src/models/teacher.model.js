'use strict '


const Teacher =(sequelize ,DataTypes)=> sequelize.define('theTeacher',{
    teacherName:{type:DataTypes.STRING,allowNull:false,unieqe:true },
    classLevel:{type:DataTypes.STRING}
});
module.exports=Teacher