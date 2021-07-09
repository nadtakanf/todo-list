'use strict';
const log = require('lambda-log');
const { DynamoDBClient, DeleteItemCommand } = require("@aws-sdk/client-dynamodb")
const ddbClient = new DynamoDBClient({ region: process.env.REGION })  
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
            TableName: process.env.tableName
        }
    
        const command = new DeleteItemCommand(params)
        const metadata = await ddbClient.send(command)
        log.info(metadata)
    } catch (err) {
        log.error(`error ${err}`)
    }
};
