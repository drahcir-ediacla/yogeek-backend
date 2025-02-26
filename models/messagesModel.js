const { Sequelize, DataTypes } = require('sequelize');

const defineMessagesModel = (sequelize) => {
    const messagesModel = sequelize.define('Messages', {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
        },
        chat_id: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        sender_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        receiver_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        product_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        read: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        archived: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        timestamp: {
            type: DataTypes.DATE,
            defaultValue: Sequelize.NOW,
        },
    }, {
        tableName: 'messages',
        timestamps: false,
    });

    return messagesModel;
}


module.exports = defineMessagesModel;