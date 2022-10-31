'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('GiftRateds', {
      id: {
        allowNull: false,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      GiftId: {
        allowNull: false,
        type: Sequelize.UUID
      },
      userId: {
        allowNull: false,
        type: Sequelize.UUID
      },
      GiftRedeemId: {
        allowNull: false,
        type: Sequelize.UUID
      },
      rate: {
        allowNull: false,
        type: Sequelize.DECIMAL
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('GiftRateds');
  }
};