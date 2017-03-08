var terms = require('../mappers/terms');

function term(robot) {
    var term = robot.match[1].trim().replace(' ', '');

    robot.send(terms.toDescription(term));
}

module.exports = term;
