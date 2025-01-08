const { ProspectsModel, UserTypesModel } = require('./models.js');
const { UniqueConstraintError, DatabaseError, ValidationErrorItem } = require = require('sequelize');


const saveProspect = async (prospect) => {
    try {
        const insertedProspect = await ProspectsModel.create(prospect);
        console.log(insertedProspect);
        return insertedProspect;
    } catch (error) {
        console.log(error);

        if (error instanceof UniqueConstraintError) {
            throw new Error(error.message);
        } else if (error instanceof DatabaseError) {
            throw new Error(error.message);
        }

    };
};

module.exports = saveProspect;
