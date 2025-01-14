const { DataTypes, UUID } = require('sequelize');
const connection = require('./database.js');

const UserTypesModel = connection.define(
    'UserTypes', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
        },
        active: {
            type: DataTypes.BOOLEAN,
        }
    },
    {
        tableName: 'UserTypes',
        timestamps: false,
    }
);

const AnswerTypesModel = connection.define(
    'AnswerTypes', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
        },
        active: {
            type: DataTypes.BOOLEAN,
        }
    },
    {
        tableName: 'AnswerTypes',
        timestamps: false,
    }
);

const ProspectsModel = connection.define('Prospects', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    points: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 15
    },
    linkToken: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
    },
    userTypeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            key: 'id',
            model: UserTypesModel
        }
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
}, {
    tableName: 'Prospects',
    timestamps: false
});

const QuestionsModel = connection.define('Questions', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    question: {
        type: DataTypes.STRING,
        allowNull: false
    },
    userTypeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            key: 'id',
            model: UserTypesModel
        }
    },
}, {
    tableName: 'Questions',
    timestamps: false
});

const AnswersModel = connection.define('Answers', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    questionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            key: 'id',
            model: QuestionsModel
        }
    },
    value: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, 
{
    tableName: 'Answers',
    timestamps: false
});

const RefferalsModel = connection.define('Refferals', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    prospectId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    refferalId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
}, {
    tableName: 'Refferals',
    timestamps: false
});


UserTypesModel.sync();
AnswerTypesModel.sync();
QuestionsModel.sync();
ProspectsModel.sync();
AnswersModel.sync();

module.exports = {
    UserTypesModel,
    ProspectsModel,
    QuestionsModel,
    AnswerTypesModel,
    AnswersModel
};
