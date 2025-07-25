"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class Balance extends Model {
        static associate(models) {
            Balance.belongsTo(models.User, {
                foreignKey: "user_id",
                as: "user",
            });
        }
    }

    Balance.init(
        {
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                unique: true,
            },
            balance: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
        },
        {
            sequelize,
            modelName: "Balance",
            tableName: "balances",
            timestamps: false,
        }
    );

    return Balance;
};
