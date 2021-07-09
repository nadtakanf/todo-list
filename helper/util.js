'use strict';

const util = {}
const tableName = process.env.tableName;
const log = require('lambda-log');

/**
 * Returns task format object
 * @param {Object} task task to reformat
 */
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
            user: { S: "User1" } // TODO: replace this with cognito user email
        }
    };
    
})

/**
 * Returns a list of matches of the given pattern
 * @param {String} string string to match
 * @param {String} pattern pattern
 */
function getMatches(string, pattern) {
    const regex = new RegExp(pattern, 'g');
    const matches = [];
    let match;
    while ((match = regex.exec(string))) {
      matches.push(match[1]);
    }
    return matches;
}

/**
   * Attempts to match path elements and return it as
   * an object where the key is the token name and the
   * value is the matched value
   * @param {String} path path
   * @param {String} pathPattern path pattern
   */
util.matchPathElements = (path, pathPattern) => {
    // find all match tokens
    const tokens = getMatches(pathPattern, '{([^}]+)}');

    // convert {token}s into (.*) to create a regex pattern
    const pattern = pathPattern.replace(/{[^}]+}/g, '(.*)');

    // try to match against the pattern
    const match = path.match(new RegExp(pattern));
    
    if (!match) {
      return null;
    }

    if (tokens.length !== match.length - 1) {
      throw new BadRequestError('Match count different from token count');
    }

    const result = {};
    for (let i = 1; i < match.length; i += 1) {
      result[tokens[i - 1]] = match[i];
    }
    return result;
}

module.exports = util