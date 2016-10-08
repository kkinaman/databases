var models = require('../models');

module.exports = {
  messages: {
    get: function (req, res) {
      models.messages.get().then(function(messages) {
        res.end(JSON.stringify(messages));
      });
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      
      var message = '';
      req.on('data', function(data) {
        message += data;
        // console.log(message);
        models.messages.post(JSON.parse(message)).then(function() {
          res.end();
        });
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

