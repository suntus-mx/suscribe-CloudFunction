const { ProspectsModel, UserTypesModel } = require('./models.js');
const { UniqueConstraintError } = require = require('sequelize');


const saveProspect = async (prospect) => {
    try {
        const insertedProspect = await ProspectsModel.create(prospect);
        return insertedProspect;
    } catch (error) {

        if (error instanceof UniqueConstraintError) {
            throw new Error('This email is already in use');
        }

    };
};

module.exports = saveProspect;
