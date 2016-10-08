var models = require('../models');

module.exports = {
  messages: {
    get: function (req, res) {
      models.messages.get().then(function(messages) {
        res.end(messages);
      });
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      var message = JSON.parse(Object.keys(req.body)[0]);
      models.messages.post(message);
    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {},
    post: function (req, res) {}
  }
};

