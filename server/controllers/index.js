var models = require('../models');

module.exports = {
  messages: {
    get: function (req, res) {
      models.messages.get().then(function(messages) {
        res.end(messages);
      });
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      var message = req.body;
      console.log('username', message.username.trim());
      console.log('message', message.message.trim());
      console.log('roomname', message.roomname.trim());
      models.messages.post(message).then(function() {
        res.end();
      });

    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {},
    post: function (req, res) {
      var user = req.body;
      models.users.post(user).then(function() {
        res.end();
      });
    }
  }
};

