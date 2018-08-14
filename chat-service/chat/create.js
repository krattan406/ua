'use strict';
const uuid = require('uuid');
const AWS = require('aws-sdk');
//const Bluebird = require('bluebird')

//AWS.config.setPromisesDependency(Bluebird);
AWS.config.setPromisesDependency();

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.create = (event, context, callback) => {
  const reqx = console.log(event.body);
 const username =  event.username;
  const text = event.text;
  const timeout = event.timeout;

if (typeof username !== 'string' || 
		typeof text !== 'string' || 
		typeof timeout !== 'number') {
    console.error('Validation Failed');
    callback(new Error('Couldn\'t submit chat conversation because of validation errors.'));
    return;
  }

submitChat( chatInfo( username, text, timeout))
	.then( res => {
	callback(null, {
		statusCode: 201,
   		 body: JSON.stringify({
     	 id : res.id,
		})
		});
	})
	 .catch(err => {
      console.log(err);
      callback(null, {
        statusCode: 500,
        body: JSON.stringify({
          message: `Unable to submit chat`
        })
      })
    });
};

const submitChat = chat => {
	console.log('Submitting chat');
 	 const chatInfo = {
    TableName:process.env.DYNAMODB_TABLE,
    Item: chat
  };
  return dynamoDb.put(chatInfo).promise()
    .then(res => chat);
};

const chatInfo = (username, text, timeout) => {
  const timestamp = new Date().getTime();
  return {
    id: uuid.v1(),
    username: username,
    text: text,
    timeout: timeout,
    submittedAt: timestamp,
    updatedAt: timestamp,
  };
};
