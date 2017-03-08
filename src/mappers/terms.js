var terms = require('../constants/terms');

function getInvalidTermMessage(term) {
    switch (term) {
        case mountainwalk:
        case islandwalk:
        case swampwalk:
        case plainswalk:
        case forestwalk:
            return 'Please look up landwalk instead of {value}'.replace('{value}', term);
        default:
            return 'Could not find the definition for term: {value}'.replace('{value}', term);
    }
}

module.exports = {
    toDescription: function (value) {
        var term = terms[value];

        return term ? term : getInvalidTermMessage(term);
    }
};
