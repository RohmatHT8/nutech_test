'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Banners', [
      {
        banner_name: 'Banner 1',
        banner_image: 'https://nutech-integrasi.app/dummy.jpg',
        description: 'Lorem Ipsum Dolor sit amet',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        banner_name: 'Banner 2',
        banner_image: 'https://nutech-integrasi.app/dummy.jpg',
        description: 'Lorem Ipsum Dolor sit amet',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Banners', null, {});
  }
};
