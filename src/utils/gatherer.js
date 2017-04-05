var PARAMS_QUERY = 'Search/Default.aspx?action=advanced&{params}';

function wrapMessage(params) {
    var uri = encodeURI('http://gatherer.wizards.com/Pages/{params}'.replace('{params}', params));

    return 'View it in the gatherer: {uri}'.replace('{uri}', uri);
}

function convertToGathererSyntax(param, query) {
    switch(param) {
        case 'cmc':
            return query.split(',').map(function (value) { return '=[' + value + ']'}).join('+');
        case 'types':
        case 'subtypes':
        case 'supertypes':
            return query.split(',').map(function (value) { return '["' + value + '"]'}).join('+');
        case 'name':
        case 'text':
        case 'colorIdentity':
            return query.split(',').map(function (value) { return '[' + value + ']'}).join('+');
        default:
            return '';
    }
}

module.exports = {
    buildParamsQuery: function (params) {
        var paramsQuery = Object.keys(params).map(function (key) {
            switch (key) {
                case 'cmc':
                    return 'cmc=|{value}'.replace('{value}', convertToGathererSyntax(key, params[key]));
                case 'name':
                    return 'name=|{value}'.replace('{value}', convertToGathererSyntax(key, params[key]));
                case 'text':
                    return 'text=|{value}'.replace('{value}', convertToGathererSyntax(key, params[key]));
                case 'types':
                    return 'type=|{value}'.replace('{value}', convertToGathererSyntax(key, params[key]));
                case 'subtypes':
                    return 'subtype=|{value}'.replace('{value}', convertToGathererSyntax(key, params[key]));
                case 'supertypes':
                    return 'supertype=|{value}'.replace('{value}', convertToGathererSyntax(key, params[key]));
                case 'colorIdentity':
                    return 'color=|{value}'.replace('{value}', convertToGathererSyntax(key, params[key]));
                default:
                    return '';
            }
        }).filter(function (value) {
            return value;
        }).join('&');

        return wrapMessage(PARAMS_QUERY.replace('{params}', paramsQuery));
    }
};
