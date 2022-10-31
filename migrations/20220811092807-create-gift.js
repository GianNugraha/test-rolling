'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Gifts', {
      id: {
        allowNull: false,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      typeName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      // image: {
      //   required: true,
      //   type: Sequelize.STRING
      // },
      seriesName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      resolution: {
        allowNull: false,
        type: Sequelize.STRING
      },
      memory: {
        allowNull: false,
        type: Sequelize.STRING
      },
      operationSystem: {
        allowNull: false,
        type: Sequelize.STRING
      },
      stock: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      poins: {
        allowNull: false,
        type: Sequelize.FLOAT
      },
      fileId: {
        allowNull: false,
        type: Sequelize.STRING
      },
      fileUrl: {
        allowNull: false,
        type: Sequelize.STRING
      },
      fileType: {
        allowNull: false,
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Gifts');
  }
};