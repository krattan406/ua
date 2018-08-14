'use strict';

const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.get = (event, context, callback) => {
  const reqx = console.log(event.body);
  const id = event.id;
  
  
  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Key: {
      id: id,
    },
    
  };

  // fetch chatfrom the database
  dynamoDb.get(params, (error, result) => {
    // handle potential errors
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'text/plain' },
        body: 'Couldn\'t fetch the chat.',
      });
      return;
    }

    // create a response
    const response = {
     statusCode: 200,
          body: JSON.stringify(
                { 'username' :  result.Item.username,
                 'text' : result.Item.text,
                 'expiration_date':  result.Item.timeout
                }
       )
    };
    console.log(response);
    callback(null, response);
  });
};
