var chat = require('../ws_server.js');

module.exports = {
  getClients: function(req, res, next) {
    res.json({
      clients: chat.getClients()
    });
  }
}