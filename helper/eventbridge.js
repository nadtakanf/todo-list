const AWS = require('aws-sdk');
const log = require('lambda-log');
const util = require('./util');
const eventBridge = new AWS.EventBridge({ region: process.env.REGION, apiVersion: '2015-10-07'});

module.exports = {
    sendToEventBridge : async (bridgeName, event) => {
        log.info(event)

        const { requestId } = event.requestContext;
        const { path, httpMethod } = event;

        // set default to api/create
        let detailType = 'create'; 

        // replace this with includes and array
        if (httpMethod === 'PUT' && util.matchPathElements(path, '/update/{id}')) {
            detailType = 'update'
        } else if (httpMethod === 'DELETE' && util.matchPathElements(path, '/delete/{id}')) {
            detailType = 'delete'
        } else if (httpMethod === 'GET' && path === '/search') {
            detailType = 'search'
        }

        log.info(`Sending requestId ${requestId} to the ${bridgeName} event bus on AWS EventBridge`);
        const params = {
        Entries: [
            {
            Detail: JSON.stringify(event),
            DetailType: detailType,
            EventBusName: 'default',
            Source: 'source.events',
            Time: new Date()
            }
        ]
        };

        log.info(params)

        let result = await eventBridge.putEvents(params).promise()
        return result
    }
};
