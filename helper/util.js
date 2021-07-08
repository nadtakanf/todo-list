'use strict';

const util = {}
const tableName = process.env.tableName;
const log = require('lambda-log');

util.formatTask = ((task) => {

    return {
        TableName: tableName,
        Item: {
            PK: { S : "USER#1111" },
            SK: { S: "TYPE#ITEM1" },
            title: { S: task.title },
            description: { S: task.description },
            status: { S: task.status },
            dueDate: { S: task.dueDate },
            user: { S: "User1" }
        }
    };
    
})

module.exports = util