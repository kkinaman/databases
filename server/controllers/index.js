var models = require('../models');

module.exports = {
  messages: {
    get: function (req, res) {
      models.messages.get().then(function(messages) {
        //What was being returned from messages was an object like {text:'hi', user"{username: 'Fred'}}
        //But we wanted a username attribute on the message object itself
        //Unfortunately when we tried to add a new key it would not get stringified for some reason
        //So the below code recreates the message object
        var newMessages = [];
        messages.forEach(function(message) {
          message['username'] = message.user.username;
          newMessages.push({
            username: message.user.username,
            text: message.text,
            roomname: message.roomname,
            createdAt: message.created_at
          });
        });
        res.end(JSON.stringify(newMessages));
      });
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      if (Object.keys(req.body).length > 0) {
        models.messages.post(req.body).then(function() {
          res.end();
        });
      } else {
        var message = '';
        req.on('data', function(data) {
          message += data;
          console.log('MESSAGE POSTED:', JSON.parse(message));
          models.messages.post(JSON.parse(message)).then(function() {
            res.end();
          });
        });
      }

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

