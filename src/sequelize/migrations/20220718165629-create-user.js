'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      login: {
        primaryKey: true,
        noUpdate: true,
        type: Sequelize.STRING(40),
      },
      password: {
        type: Sequelize.STRING(60),
        allowNull: false
      },
      userName: {
        type: Sequelize.STRING(100)
      },
      gender: {
        type: Sequelize.ENUM('male', 'female', 'other', 'unspecified'),
        defaultValue: 'unspecified',
      },
      admin: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        noUpdate: true,
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('NOW()')
      },
      updatedAt: {
        allowNull: false,
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('NOW()')
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};