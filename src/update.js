'use strict';
const log = require('lambda-log')
const { DynamoDBClient, UpdateItemCommand } = require("@aws-sdk/client-dynamodb")
const ddbClient = new DynamoDBClient({ region: process.env.REGION }) 

module.exports.handler = async event => {
    try {
        const { body } = event.detail;
        const params = {
            TableName: process.env.tableName,
            Key: {
                PK: `USER#111`,
                SK: `TYPE#TASK`
            },
            UpdateExpression: "SET title = :title, description = :description, status = :status, dueDate = :dueDate",
            ExpressionAttributeValues: {
                ":title": body.title || null,
                ":description": body.description || null,
                ":status": body.status || null,
                ":dueDate": body.dueDate || null
            },
            ReturnValues: "ALL_NEW"
        };
        const command = new UpdateItemCommand(params);
        const response = await ddbClient.send(command);
        log.info(response);
    } catch (err) {
        log.error(err);
    }
    
};
