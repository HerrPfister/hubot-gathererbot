var MULTIVERSE_ID_QUERY = 'Card/Details.aspx?multiverseid={id}';
var PARAMS_QUERY = 'Search/Default.aspx?action=advanced&{params}';

function wrapMessage(params) {
    var uri = encodeURI('http://gatherer.wizards.com/Pages/{params}'.replace('{params}', params));

    return 'View it in the gatherer: {uri}'.replace('{uri}', uri);
}

function buildComplexParam(values, useQuotes) {
    var optionalValues = values.split('|');

    return optionalValues.map(function (optionalValue) {
        if (optionalValue.indexOf(',') !== -1) {
            var requiredValues = optionalValue.split(',');

            return requiredValues.map(function (requiredValue) {
                var value = useQuotes ? '"{value}"'.replace('value', requiredValue) : requiredValue;

                return '[{value}]'.replace('{value}', value);
            }).join('+');
        } else {
            var value = useQuotes ? '"{value}"'.replace('value', optionalValue) : optionalValue;

            return '[{value}]'.replace('{value}', optionalValue);
        }
    }).join('|');
}

module.exports = {
    buildMultiverseIdQuery: function (id) {
        return wrapMessage(MULTIVERSE_ID_QUERY.replace('{id}', id));
    },
    buildParamsQuery: function (params) {
        var paramsQuery = Object.keys(params).map(function (key) {
            switch(key) {
                case 'cmc':
                    return 'type=|{value}'.replace('{value}', buildComplexParam(params[key], false));
                case 'name':
                    return 'name=|["{value}"]'.replace('{value}', params[key]);
                case 'text':
                    return 'text=|["{value}"]'.replace('{value}', params[key]);
                case 'types':
                    return 'type=|{value}'.replace('{value}', buildComplexParam(params[key], true));
                case 'subtypes':
                    return 'subtype=|{value}'.replace('{value}', buildComplexParam(params[key], true));
                case 'supertypes':
                    return 'supertype=|{value}'.replace('{value}', buildComplexParam(params[key], true));
                case 'colorIdentity':
                    return 'color=|{value}'.replace('{value}', buildComplexParam(params[key], false));
                default:
                    return '';
            }
        }).filter(function (value) { return value; }).join('&');

        return wrapMessage(PARAMS_QUERY.replace('{params}', paramsQuery));
    }
};