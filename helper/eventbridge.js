const AWS = require('aws-sdk');

const eventBridge = new AWS.EventBridge({ region: 'us-east-1', apiVersion: '2015-10-07'});

module.exports = {
    sendToEventBridge : async (bridgeName, event) => {
        const { id, type } = event;
        console.log(event);

        console.log(`Sending event ${id} of type ${type} to the ${bridgeName} event bus on AWS EventBridge`);
        const params = {
        Entries: [
            {
            Detail: JSON.stringify(event),
            DetailType: 'placing.order',
            EventBusName: 'default',
            Source: 'Orders',
            Time: new Date()
            }
        ]
        };

        let result = await eventBridge.putEvents(params).promise()
        return result
    }
};
