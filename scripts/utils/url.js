var consts = require('../../static/consts');

function createMappedUrlParam(parsedKey, parsedValue) {
    var mappedValue,
        mappedKey = consts.gathererUrlKeyMap[parsedKey];

    if (parsedKey === 'color') {
        mappedValue = consts.gathererColorMap[parsedValue];
    } else if (parsedKey === 'rarity') {
        mappedValue = consts.gathererRarityMap[parsedValue];
    } else {
        mappedValue = parsedValue;
    }

    return mappedKey + '[' + mappedValue + ']';
}

function parseGathererUrlParams(urlParams) {
    var mappedParams = urlParams.split('&');

    mappedParams.map(function (param) {
        return createMappedUrlParam(
            param.split('=')[0],
            param.split('=')[1]
        );
    });

    return mappedParams.join('&');
}

function parseUrlParams(userInput) {
    var params,
        trimmedParams;

    if (userInput.indexOf('=') === -1) {
        return 'name=' + userInput;

    } else {
        params = userInput.split(',');

        trimmedParams = map(params, function (param) {
            return param.trim();
        });

        return trimmedParams.join('&');
    }
}

module.exports = {
    parseGathererUrlParams: parseGathererUrlParams,
    parseUrlParams: parseUrlParams
};