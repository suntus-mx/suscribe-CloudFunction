const connection = require('./database.js');
const { UserTypesModel, ProspectsModel } = require('./models.js');

const testConnection = async () => {
    try {
        await connection.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

module.exports = testConnection;
