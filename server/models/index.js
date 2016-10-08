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
      return db.users.findOrCreate({
        where: {username: message.username}
      })
      .then(function() {
        return db.users.findOne({
          where: {username: message.username}
        });
      })
      .then(function(user) {
        return db.messages.create({
          text: message.text,
          'user_id': user.id,
          roomname: message.roomname
        });
      });

    }
  },

  users: {
    get: function () {},
    post: function (user) {
      console.log('USERNAME:', user.username);
      return db.users.findOrCreate({
        where: {username: user.username}
      });
      // return new Promise(function(resolve, reject) {
      //   db.query('INSERT INTO users (username) VALUES (?)', [user.username], function(err, results) {
      //     if (err) {
      //       reject(err);
      //     } else {
      //       resolve(results);
      //     }
      //   });
      // });
    }
  }
};


//INSERT INTO messages (text, user_id, roomname) select 'In mercy\'s name, three days is all I need.', id FROM users WHERE username = Valjean, Hello

