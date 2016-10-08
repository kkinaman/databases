var db = require('../db');
var Promise = require('bluebird');

module.exports = {
  messages: {
    get: function () {
      return new Promise(function(resolve, reject) {
        db.query('SELECT * FROM messages', function(err, results) {
          if (err) {
            reject(err);
          } else {
            console.log(results);
            resolve(results);
          }
        });
      });
    }, // a function which produces all the messages
    post: function (message) {
      return new Promise(function(resolve, reject) {
        //INSERT INTO messages (text, user_id, roomname) values ('In mercy\'s name, three days is all I need.', (select id FROM users WHERE username = 'Valjean'), 'Hello');
        db.query('INSERT INTO messages (text, user_id, roomname) values (?, (select id FROM users WHERE username = ?), ?)', [message.message, message.username, message.roomname], function(err, results) {
          if (err) {
            reject(err);
          } else {
            console.log(results);
            resolve(results);
          }
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
            console.log(results);
            resolve(results);
          }
        });
      });
    }
  }
};


//INSERT INTO messages (text, user_id, roomname) select 'In mercy\'s name, three days is all I need.', id FROM users WHERE username = Valjean, Hello

