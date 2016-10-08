var db = require('../db');
var Promise = require('bluebird');

module.exports = {
  messages: {
    get: function () {
      
      return db.messages.findAll({
        include: [
        {model: db.users,
          required: true}]
      });

    }, // a function which produces all the messages
    post: function (message) {
      console.log('message in models', message);
      return db.users.findOrCreate({
        where: {username: message.username}
      })
      .then(function() {
        console.log('IN THE THEN:', message.username);
        return db.users.findOne({
          where: {username: message.username}
          // attributes: ['id', ['id']]
        });
      })
      .then(function(user) {
        console.log('LAST THEN BEFORE POST', message.text, user.id, message.roomname);
        return db.messages.create({
          text: message.text,
          'user_id': user.id,
          roomname: message.roomname
        });
      });
    }
  },

  users: {
    // Ditto as above.
    get: function () {},
    post: function (user) {
      return new Promise(function(resolve, reject) {
        db.query('INSERT INTO users (username) VALUES (?)', [user.username], function(err, results) {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        });
      });
    }
  }
};


//INSERT INTO messages (text, user_id, roomname) select 'In mercy\'s name, three days is all I need.', id FROM users WHERE username = Valjean, Hello

