'use strict';
const { DynamoDBClient, DeleteItemCommand } = require("@aws-sdk/client-dynamodb")
const client = new DynamoDBClient({ region: process.env.REGION })  
const util = require('../helper/util')

module.exports.handler = async event => { 
    try {
        const idObject = util.matchPathElements(event.detail.path, '/delete/{id}')
        const params = {
            Key: {
                PK: {
                    S: `USER#${idObject.id}`
                },
                SK: {
                    S: `TYPE#ITEM1`
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
