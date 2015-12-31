var Path = require('path');

module.exports = function (robot) {
  path = Path.resolve(__dirname, 'src');
  robot.load(path);
};
