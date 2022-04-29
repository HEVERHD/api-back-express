const {DataTypes} = require('sequelize');

module.exports = sequelize =>{
    sequelize.define('Product',{
        sku:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true 
        },
        title:{
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type : DataTypes.INTEGER,
            allowNull: false
        },
        description:{
            type: DataTypes.STRING,
            allowNull: false
        },
        stock:{
            type : DataTypes.INTEGER,
            allowNull: false
        },
        ownerId:{
            type: DataTypes.UUID,
            allowNull: false
        }
    },{
        timestamp : true
    })
};