const { Sequelize } = require('sequelize');

const connection = new Sequelize(`mysql://daniel:daniel-suntus-2024@34.59.142.231:3306/waitlist`);

module.exports = connection;
