const AWS = require('aws-sdk');
const log = require('lambda-log');

const eventBridge = new AWS.EventBridge({ region: process.env.REGION, apiVersion: '2015-10-07'});

module.exports = {
    sendToEventBridge : async (bridgeName, event) => {
        const { requestId } = event.requestContext;

        log.info(`Sending requestId ${requestId} to the ${bridgeName} event bus on AWS EventBridge`);
        const params = {
        Entries: [
            {
            Detail: JSON.stringify(event),
            DetailType: 'dynamodb-crud',
            EventBusName: 'default',
            Source: 'Todo',
            Time: new Date()
            }
        ]
        };

        let result = await eventBridge.putEvents(params).promise()
        return result
    }
};
