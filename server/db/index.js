// Database
var Sequelize = require('sequelize');
var db = new Sequelize('chat', 'root', 'pass');

var User = exports.users = db.define('users', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  username: {
    type: Sequelize.STRING,
    unique: true
  }

});

var Message = exports.messages = db.define('messages', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  text: Sequelize.STRING,
  roomname: Sequelize.STRING,

}, {underscored: true});


User.sync()
  .then(function() {
    Message.belongsTo(User);
    Message.sync();
  })
  .catch(function(err) {
    // Handle any error in the chain
    console.error(err);
    db.close();
  });