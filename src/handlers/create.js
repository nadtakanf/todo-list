'use strict';
const { DynamoDBClient, PutItemCommand } = require("@aws-sdk/client-dynamodb")
const client = new DynamoDBClient({ region: process.env.REGION })  
const util = require('../helper/util') 
const response = require('../helper/response-lib')
const sns = require('../helper/sns')
const log = require('lambda-log')

module.exports.handler = async event => {
	try {
        const { body } = event.detail;
        const { headers } = event.detail;

        const { claims } = event.detail.requestContext.authorizer;

        const params = util.formatItem(JSON.parse(body), claims)
        const command = new PutItemCommand(params);
        const metadata = await client.send(command); 
        return response.success(metadata.$metadata.httpStatusCode)
    } catch (err) {
        console.log(err)
        await sns.notifyFailure(err);
	}
};
