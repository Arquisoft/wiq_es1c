const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'mariadb',
  host: 'wiq_es1c-mariadb-run-b01e5d88df91',
  port: 3306,
  database: 'db', // Reemplazar con el nombre de la base de datos
  username: 'root', // Reemplazar con el nombre de usuario
  password: ''
});

//Definir modelos de la base de datos
const Usuario = sequelize.define('usuario', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING
  },
  avatar: {
    type: Sequelize.STRING
  },
  puntos: {
    type: Sequelize.INTEGER
  }
});

const Pregunta = sequelize.define('pregunta', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  pregunta: {
    type: Sequelize.STRING
  },
  respuesta_correcta: {
    type: Sequelize.STRING
  },
  respuesta_incorrecta_1: {
    type: Sequelize.STRING
  },
  respuesta_incorrecta_2: {
    type: Sequelize.STRING
  },
  respuesta_incorrecta_3: {
    type: Sequelize.STRING
  },
  dificultad: {
    type: Sequelize.STRING
  },
  tema: {
    type: Sequelize.STRING
  }
});

const Partida = sequelize.define('partida', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: Sequelize.STRING
  },
  codigo: {
    type: Sequelize.STRING
  },
  fecha_inicio: {
    type: Sequelize.DATE
  },
  fecha_fin: {
    type: Sequelize.DATE
  },
  estado: {
    type: Sequelize.STRING
  },
  id_usuario_creador: {
    type: Sequelize.INTEGER
  }
});

const Resultado = sequelize.define('resultado', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_partida: {
    type: Sequelize.INTEGER
  },
  id_jugador: {
    type: Sequelize.INTEGER
  },
  puntuacion: {
    type: Sequelize.INTEGER
  },
  posicion: {
    type: Sequelize.INTEGER
  }
});

// Definir las relaciones entre los modelos
Usuario.hasMany(Partida, {foreignKey: 'id_usuario_creador'});
Partida.belongsTo(Usuario, {foreignKey: 'id_usuario_creador'});
Partida.hasMany(Resultado, {foreignKey: 'id_partida'});
Resultado.belongsTo(Partida, {foreignKey: 'id_partida'});
Usuario.hasMany(Resultado, {foreignKey: 'id_jugador'});
Resultado.belongsTo(Usuario, {foreignKey: 'id_jugador'});

//Sincroniza modelos con la base de datos
sequelize.sync();