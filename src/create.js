'use strict';
const log = require('lambda-log');
const { DynamoDBClient, PutItemCommand } = require("@aws-sdk/client-dynamodb")
const ddbClient = new DynamoDBClient({ region: process.env.REGION })  
const util = require('../helper/util') 
const response = require('../helper/response-lib')

module.exports.handler = async event => {
	try {
        const { body } = event;
        const params = util.formatTask(JSON.parse(body))
        const command = new PutItemCommand(params);
        const metadata = await ddbClient.send(command); 
        return response.success(metadata.$metadata.httpStatusCode)
    } catch (err) {
        log.error(`error ${err}`);
        // await sns.notifyFailure(err.errorMessage);
	}
};
