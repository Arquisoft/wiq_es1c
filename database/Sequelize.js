const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'mariadb',
  host: 'localhost',
  port: 3306,
  database: 'db', // Reemplazar con el nombre de la base de datos
  username: 'root', // Reemplazar con el nombre de usuario
  password: ''
});

const User = sequelize.define('User', {
  userId: {
    type: Sequelize.UUIDV4,
    defaultValue: () => uuidv4(),
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  role: {
    type: Sequelize.ENUM('admin', 'player'),
    defaultValue: 'player',
  },
  points: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
});

const Question = sequelize.define('Question', {
  questionId: {
    type: Sequelize.UUIDV4,
    defaultValue: () => uuidv4(),
    primaryKey: true
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  answer: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  fake: {
    type: Sequelize.JSON,
    allowNull: false,
  },
  user_answer: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  duration: {
    type: Sequelize.INTEGER,
    defaultValue: 20,
    allowNull: false
  },
  onTime:{
    type: Sequelize.BOOLEAN,
    defaultValue: false,
    allowNull: false
  }
});

const Game = sequelize.define('Game', {
  gameId: {
    type: Sequelize.UUIDV4,
    defaultValue: () => uuidv4(),
    primaryKey: true
  },
  difficulty: {
    type: Sequelize.ENUM('easy', 'medium', 'hard'),
    defaultValue: 'easy',
  },
  startDate: {
    type: Sequelize.DATE
  },
  endDate: {
    type: Sequelize.DATE
  },
  state: {
    type: Sequelize.ENUM('active', 'inactive'),
  }
});

// Define las relaciones entre las entidades
User.hasMany(Game, {foreignKey: 'userId'});
Game.belongsTo(User, {foreignKey: 'userId'});

Game.hasMany(Question, {foreignKey: 'gameId'});
Question.belongsTo(Game, {foreignKey: 'gameId'});

//Sincroniza modelos con la base de datos
sequelize.sync();