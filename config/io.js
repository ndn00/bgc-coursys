var _io = require('socket.io');
var io = null;

exports.io = function () {
  return io;
};

exports.initialize = (server) => {
  return io = _io(server);
};