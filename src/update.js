'use strict';
const log = require('lambda-log')
const { DynamoDBClient, UpdateItemCommand } = require("@aws-sdk/client-dynamodb")
const ddbClient = new DynamoDBClient({ region: process.env.REGION })
const util = require('../helper/util')

module.exports.handler = async even => {
    try {
        const body = JSON.parse(event.detail.body);
        const idObject = util.matchPathElements(event.detail.path, '/update/{id}')
        const params = {
            TableName: process.env.TABLE_NAME,
            Key: {
                PK: { S: `USER#${idObject.id}` },
                SK: { S: `TYPE#ITEM` }
            },
            UpdateExpression: "SET title = :title, description = :description, itemStatus = :itemStatus, dueDate = :dueDate",
            ExpressionAttributeValues: {
                ":title": { S: body.title },
                ":description": { S: body.description },
                ":itemStatus": { S: body.itemStatus },
                ":dueDate": { S: body.dueDate }
            },
            ReturnValues: "UPDATED_NEW",
        };
        console.log(params)
        const command = new UpdateItemCommand(params);
        const response = await ddbClient.send(command);
        log.info(response);
    } catch (err) {
        await sns.notifyFailure(err.errorMessage);
    }
    
};
