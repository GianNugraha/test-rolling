"use strict";
const bcrypt = require("bcrypt");

const { v4: uuidv4 } = require("uuid");
const hashPassword = require("../helpers/hashPassword");
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const masterAdmin = {
      id: uuidv4(),
      username: "masteradmin",
      email: "giannugraha76@gmail.com",
      password: bcrypt.hashSync('1234qwer', 5),
      isActive: true,
      role: "admin",
      isVerifiedEmail: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    await queryInterface.bulkInsert("Users", [masterAdmin]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Users");
  },
};
