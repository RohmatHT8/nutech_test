// migrations/xxxxxx-create-transactions.js
"use strict";
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("transactions", {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            user_id: {
                type: Sequelize.INTEGER,
                references: { model: "users", key: "id" },
                onDelete: "CASCADE",
            },
            invoice_number: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true,
            },
            service_code: Sequelize.STRING,
            service_name: Sequelize.STRING,
            transaction_type: Sequelize.ENUM("TOPUP", "PAYMENT"),
            description: Sequelize.STRING,
            total_amount: Sequelize.INTEGER,
            created_on: Sequelize.DATE,
        });
    },
    async down(queryInterface) {
        await queryInterface.dropTable("transactions");
    },
};
