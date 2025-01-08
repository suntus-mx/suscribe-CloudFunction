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
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    points: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 0
    },
    linkToken: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    userTypeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
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
    },
    answerType: {
        type: DataTypes.INTEGER,
        allowNull: false,
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
        allowNull: false
    },
    answerTypeId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    text: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, 
{
    tableName: 'Answers',
    timestamps: false
});

ProspectsModel.hasMany(UserTypesModel, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT'
});

QuestionsModel.hasMany(UserTypesModel, {
    foreignKey: 'userTypeId',
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT'
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


UserTypesModel.belongsTo(QuestionsModel);

AnswersModel.hasMany(QuestionsModel, {
    foreignKey: 'questionId',
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT'
});

AnswersModel.hasMany(AnswerTypesModel, {
    foreignKey: 'answerTypeId',
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT'
});

AnswersModel.belongsTo(QuestionsModel);
AnswersModel.belongsTo(AnswerTypesModel);

ProspectsModel.hasMany(UserTypesModel, {
    foreignKey: 'userTypeId',
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT'
});
UserTypesModel.belongsTo(ProspectsModel);

RefferalsModel.hasMany(ProspectsModel, {
    foreignKey: 'prospectId',
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT'
});
RefferalsModel.hasMany(ProspectsModel, {
    foreignKey: 'refferalId',
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT'
});

RefferalsModel.belongsTo(ProspectsModel);


ProspectsModel.sync( { force: true });
UserTypesModel.sync( { force: true });
QuestionsModel.sync( { force: true });
AnswerTypesModel.sync( { force : true });

module.exports = {
    UserTypesModel,
    ProspectsModel,
    QuestionsModel,
    AnswerTypesModel
};
