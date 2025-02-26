const { Sequelize, DataTypes } = require('sequelize');

const defineParticipantModel = (sequelize) => {
    const participantModel = sequelize.define('Participants', {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
        },
        chat_id: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        product_id: {
            type: DataTypes.INTEGER,
            unique: true,
            allowNull: false,
          },
        deleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
    }, {
        tableName: 'chat_participants',
        timestamps: false,
    });

    return participantModel;
};

module.exports = defineParticipantModel;
