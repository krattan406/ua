'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
  
module.exports.list = (event, context, callback) => {
 let user_name = event.username;
 console.log("user_name " + user_name);
  
  var params = {
     TableName: process.env.DYNAMODB_TABLE,
    FilterExpression: 'contains(username, user_name)',
  };
  
 console.log("params " + params);
 // fetch all chat for a username from the database
  dynamoDb.scan(params, function(err, data) {
    if (err) {
        console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
    } else {
        console.log("Query succeeded.");
        console.log('Count =',data.Items.length);

        if (data.Items.length > 0){
            console.log("post exists in tag");
        }else{
            console.log("post doesnt exist in tag");
        }
    }
});
}