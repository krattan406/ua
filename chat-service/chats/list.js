'use strict';
const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
  
module.exports.list = (event, context, callback) => {
  let user_name = event.username;
  console.log("user_name " + user_name);
  
  var params = {
    TableName: process.env.DYNAMODB_TABLE,
   // FilterExpression: 'username = ' + event.username,
    ProjectionExpression: "id, username"
  };
  
  console.log("Scanning chat table.");
    const onScan = (err, data) => {

        if (err) {
            console.log('Scan failed to load data. Error JSON:', JSON.stringify(err, null, 2));
            callback(err);
        } else {
            console.log("Scan succeeded." +data.Items);
            return callback(null, {
                statusCode: 200,
                body: JSON.stringify({
                    "": data.Items
                })
            });
        }

    };

    dynamoDb.scan(params, onScan);

};
