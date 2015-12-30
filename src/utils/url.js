var _ = require('lodash'),

    gathererKeyMapper = require('../mappers/gatherer-keys'),
    colorMapper = require('../mappers/color'),
    rarityMapper = require('../mappers/rarity');

function createMappedUrlParam(parsedKey, parsedValue) {
    var mappedValue,
        mappedKey = gathererKeyMapper.map(parsedKey);

    if (parsedKey === 'color') {
        mappedValue = colorMapper.map(parsedValue);
    } else if (parsedKey === 'rarity') {
        mappedValue = rarityMapper.map(parsedValue);
    } else {
        mappedValue = parsedValue;
    }

    return mappedKey + '[' + mappedValue + ']';
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

function convertUserInputToUrlParams(userInput) {
    var params,
        trimmedParams;

    if (!userInput) {
        return '';

    } else if (userInput.indexOf('=') === -1) {
        return 'name=' + userInput;

    } else {
        params = userInput.split(',');

        trimmedParams = _.map(params, function (param) {
            return param.trim();
        });

        return trimmedParams.join('&');
    }
}

module.exports = {
    convertUrlParamsToGathererParams: convertUrlParamsToGathererParams,
    convertUserInputToUrlParams: convertUserInputToUrlParams
};