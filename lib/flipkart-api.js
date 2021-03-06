'use strict'

const rp = require('request-promise');
const UrlAssembler = require('url-assembler');
const _ = require('lodash');


module.exports = {
    callFlipkartAPI: function (credentials, method) {
        return function (query) {
    
            let requestUrl = generateFlipkartURL(method, query);
            let requestOptions = {
                url: requestUrl,
                headers: {
                    'Fk-Affiliate-Id': credentials.affiliateId,
                    'Fk-Affiliate-Token': credentials.affiliateToken
                },
                json: true
            }

            return rp(requestOptions);

        }

    }
}

function generateFlipkartURL(method, query) {
    const baseUrl = 'https://affiliate-api.flipkart.net';

    let urlResource = UrlAssembler(baseUrl);
    let url = null;

    if (_.includes(['search', 'product', 'topFeed'], method)) {
        url = urlResource.prefix('affiliate')
            .template('/:version/:method')
            .param({
                version: '1.0',
                method: `${method}.json`
            })
            .query(query)
            .toString();
    }

    return url;

}

