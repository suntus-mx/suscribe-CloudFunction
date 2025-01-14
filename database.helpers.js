const { ProspectsModel, UserTypesModel, QuestionsModel } = require('./models.js');
const { UniqueConstraintError, DatabaseError, ValidationErrorItem } = require = require('sequelize');
const connection = require('./database.js');


const saveProspect = async (prospect) => {
    try {
        const insertedProspect = await ProspectsModel.create(prospect);
        console.log(insertedProspect);
        return insertedProspect;
    } catch (error) {
        console.log(error);

        if (error instanceof UniqueConstraintError) {
            throw new Error(error.errors[0].message);
        } else if (error instanceof DatabaseError) {
            throw new Error(error.errors[0].message);
        }

    };
};

const getQuestionsbyUserType = async (userTypeId) => {
    try {
        const questions = await QuestionsModel.findAll({
            where: {
                userTypeId: userTypeId
            }
        });
        return questions;
    } catch (error) {
        console.log(error);
        throw new Error(error.errors[0].message);
    }
};

module.exports = {
    saveProspect,
    getQuestionsbyUserType
};
