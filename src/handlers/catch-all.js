'use strict';
const eventbridge = require('../helper/eventbridge');
const response = require('../helper/response-lib');

module.exports.handler = async event => {
    let err = null;
	try {
        await eventbridge.sendToEventBridge(process.env.EVENT_BRIDGE, event);
    } catch (err) {
        await sns.notifyFailure(err.errorMessage);
	}
	
	const statusCode = err ? 500 : 200
	return response.buildResponse(statusCode)
};
