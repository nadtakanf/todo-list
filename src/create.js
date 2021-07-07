'use strict';
const eventbridge = require('../helper/eventbridge');

module.exports.handler = async event => {
    let err = null;
	try {
        await eventbridge.sendToEventBridge(process.env.EVENT_BRIDGE, event);
    } catch (err) {
        log.error(`error ${err}`);
        // await sns.notifyFailure(err.errorMessage);
	}
	
	// const statusCode = err ? 500 : 200
	// const response = {
	// 	statusCode: statusCode,
	// 	headers: {
	// 		"Access-Control-Allow-Origin": "*",
	// 		"Access-Control-Allow-Credentials": true
	// 	},
	// 	body: JSON.stringify(
	// 	{
	// 		statusCode: statusCode,
	// 	}
	// ),
	// };
  
    // return response
};
