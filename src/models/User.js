const {DataTypes} = require('sequelize');

module.exports = (sequelize) =>{
    sequelize.define('User',{
        id:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true 
        },
        username:{
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password:{
            type: DataTypes.STRING,
            allowNull: false
        },
        disable:{
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false,
        },
        isAdmin:{
            type: DataTypes.BOOLEAN,
            defaultValue : false
        }
    },{
        timestamp : true
    })
};