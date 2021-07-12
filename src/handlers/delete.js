'use strict';
const { DynamoDBClient, DeleteItemCommand } = require("@aws-sdk/client-dynamodb")
const client = new DynamoDBClient({ region: process.env.REGION })  
const util = require('../helper/util')

module.exports.handler = async event => { 
    try {
        const idObject = util.matchPathElements(event.detail.path, '/delete/{id}')

        // decode jwt to get user object from idToken
        const idToken = await util.getHeader(headers, 'Authorization');
        const payload = await util.decodeJWT(idToken, 1);
        
        const params = {
            Key: {
                PK: {
                    S: `USER#${payload['cognito:username']}`
                },
                SK: {
                    S: `ITEM#${idObject.id}`
                }
            }, 
            TableName: process.env.TABLE_NAME
        }
    
        const command = new DeleteItemCommand(params)
        await client.send(command)
    } catch (err) {
        await sns.notifyFailure(err.errorMessage);
    }
};
