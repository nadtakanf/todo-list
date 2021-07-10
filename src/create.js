'use strict';
const log = require('lambda-log');
const { DynamoDBClient, PutItemCommand } = require("@aws-sdk/client-dynamodb")
const ddbClient = new DynamoDBClient({ region: process.env.REGION })  
const util = require('../helper/util') 
const response = require('../helper/response-lib')

module.exports.handler = async event => {
	try {
        const { body } = event.detail;
        const params = util.formatItem(JSON.parse(body))
        log.info(params);
        const command = new PutItemCommand(params);
        const metadata = await ddbClient.send(command); 
        return response.success(metadata.$metadata.httpStatusCode)
    } catch (err) {
        await sns.notifyFailure(err.errorMessage);
	}
};
