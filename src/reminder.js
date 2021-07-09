'use strict';
const log = require('lambda-log');

module.exports.handler = async event => {
    log.info(event)
};
