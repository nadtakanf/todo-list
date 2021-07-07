const AWS = require('aws-sdk')

const libs = {}

libs.call = ((action, params) => {
	const dynamoDb = new AWS.DynamoDB.DocumentClient()
	return dynamoDb[action](params).promise()
})

module.exports = libs