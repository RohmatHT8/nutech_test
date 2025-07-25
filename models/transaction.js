"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class Transaction extends Model {
        static associate(models) {
            Transaction.belongsTo(models.User, {
                foreignKey: "user_id",
                as: "user",
            });
        }
    }

    Transaction.init(
        {
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            invoice_number: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            transaction_type: {
                type: DataTypes.ENUM("TOPUP", "PAYMENT"),
                allowNull: false,
            },
            service_code: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            service_name: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            description: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            total_amount: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            created_on: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW,
            },
        },
        {
            sequelize,
            modelName: "Transaction",
            tableName: "transactions",
            timestamps: false,
        }
    );

    return Transaction;
};
