/* You'll need to
 *   npm install sequelize
 * before running this example. Documentation is at http://sequelizejs.com/
 */

var Sequelize = require('sequelize');
var db = new Sequelize('chat', 'root', 'pass');
/* TODO this constructor takes the database name, username, then password.
 * Modify the arguments if you need to */

/* first define the data structure by giving property names and datatypes
 * See http://sequelizejs.com for other datatypes you can use besides STRING. */
var User = db.define('users', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  username: Sequelize.STRING

});

var Message = db.define('messages', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  text: Sequelize.STRING,
  roomname: Sequelize.STRING,

}, {underscored: true});


/* Sequelize comes with built in support for promises
 * making it easy to chain asynchronous operations together */

User.sync({force: true})
  .then(function() {
    // Now instantiate an object and save it:
    return User.create({username: 'Jean Valjean'});
  })
  .then(function() {
    // Retrieve objects from the database:
    return User.findAll({ where: {username: 'Jean Valjean'} });
  })
  .then(function(users) {
    users.forEach(function(user) {
      console.log(user.username + ' exists');
    });
  })
  .then(function() {
    Message.belongsTo(User);
    // User.hasOne(Message, {foreignKey: 'id', as: 'user_id'});
    Message.sync({force: true})
    .then(function() {
      db.close();
    });
  })
  .catch(function(err) {
    // Handle any error in the chain
    console.error(err);
    db.close();
  });

  // .then(function() {
  //   User.hasOne(Message, {foreignKey: 'id'});
  //   // Now instantiate an object and save it:
  //   // db.close();
  // });
