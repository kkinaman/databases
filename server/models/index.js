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
        db.query('INSERT INTO messages (text, user_id, room_id) select ?, id FROM users WHERE username = ?, id FROM rooms WHERE roomname = ?', [messages.text, messages.username, messages.roomname], function(err, results) {
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
    post: function () {}
  }
};

