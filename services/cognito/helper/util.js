'use strict';

const util = {}
const tableName = process.env.TABLE_NAME;
/**
 * Returns user format object
 * @param {Object} cognito event object
 * @return {Object} item object
 */
util.formatUser = ((event) => {
    const { email_verified, phone_number_verified, phone_number, email} = event.request.userAttributes;
    const { userName } = event;

    return {
        TableName: tableName,
        Item: {
            PK: { S : `USER#${userName}` },
            SK: { S: `USER#${userName}` },
            email: { S: email },
            emailVerified: { BOOL: Boolean(email_verified) },
            phoneNumber: { S: phone_number },
            phoneNumberVefified: { BOOL: Boolean(phone_number_verified) },
            createdAt: { S: Date.now().toString() }
        },
        ConditionExpression: "attribute_not_exists(PK)"
    };
})

module.exports = util