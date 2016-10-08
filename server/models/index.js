var db = require('../db');
var Promise = require('bluebird');

module.exports = {
  messages: {
    get: function () {
      return new Promise(function(resolve, reject) {
        db.query('SELECT u.username, m.text, m.roomname FROM messages m inner join users u on (m.user_id = u.id)', function(err, results) {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        });
      });
    }, // a function which produces all the messages
    post: function (message) {
      console.log('username in models file', message.username);
      
      return new Promise(function(resolve, reject) {
        db.query('INSERT INTO users (username) values (?)', [message.username], function(err, results) {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        });
      }).then(function() {
        return new Promise(function(resolve, reject) {
          db.query('INSERT INTO messages (text, user_id, roomname) values (?, (select id FROM users WHERE username = ?), ?)', [message.text, message.username, message.roomname], function(err, results) {
            if (err) {
              reject(err);
            } else {
              resolve(results);
            }
          });
        });
      });

    } // a function which can be used to insert a message into the database
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

