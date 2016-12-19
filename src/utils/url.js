var _ = require('lodash'),

    gathererKeyMapper = require('../mappers/gatherer-keys'),
    colorMapper = require('../mappers/color'),
    rarityMapper = require('../mappers/rarity');

function toWrappedParam(value) {
    return '[' + value + ']';
}

function formatValue(value) {
    return value.split(' ').map(toWrappedParam).join('+');
}

function createMappedUrlParam(parsedKey, parsedValue) {
    var mappedValue,
        mappedKey = gathererKeyMapper.map(parsedKey);

    if (parsedKey === 'color') {
        mappedValue = toWrappedParam(colorMapper.map(parsedValue));
    } else if (parsedKey === 'rarity') {
        mappedValue = toWrappedParam(rarityMapper.map(parsedValue));
    } else {
        mappedValue = formatValue(parsedValue);
    }

    return encodeURI(mappedKey + mappedValue);
}

function toGathererParams(param) {
    var paramKeyValue = param.split('=');

    return createMappedUrlParam(
        paramKeyValue[0],
        paramKeyValue[1]
    );
}

function convertUrlParamsToGathererParams(urlParams) {
    if (!urlParams) {
        return '';
    }

    var params = urlParams.split('&');

    return _.map(params, toGathererParams).join('&');
}

function buildArrayParams(params) {
    var paramParts = params.split('='),
        key = paramParts[0],
        values = paramParts[1];

    return key + '=' + values.replace(',', '&' + key + '=');
}

function convertUserInputToUrlParams(userInput) {
    var params,
        trimmedParams;

    if (!userInput) {
        return '';

    } else if (userInput.indexOf('=') === -1) {
        return 'name=' + userInput;

    } else {
        params = userInput.split(';');

        trimmedParams = _.map(params, function (param) {
            var newParams = param.trim();

            return newParams.indexOf(',') !== -1 ? buildArrayParams(newParams) : newParams;
        });

        return trimmedParams.join('&');
    }
}

module.exports = {
    convertUrlParamsToGathererParams: convertUrlParamsToGathererParams,
    convertUserInputToUrlParams: convertUserInputToUrlParams
};