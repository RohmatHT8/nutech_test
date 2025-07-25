'use strict';

const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const password = await bcrypt.hash('password123', 10);

    await queryInterface.bulkInsert(
      'Users',
      [
        {
          email: 'user1@example.com',
          first_name: 'User',
          last_name: 'One',
          password,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          email: 'user2@example.com',
          first_name: 'User',
          last_name: 'Two',
          password,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );

    const [users] = await queryInterface.sequelize.query(
      'SELECT id FROM Users;'
    );

    const balances = users.map(user => ({
      user_id: user.id,
      balance: 0,
    }));

    await queryInterface.bulkInsert('Balances', balances, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Balances', null, {});
    await queryInterface.bulkDelete('Users', null, {});
  }
};
