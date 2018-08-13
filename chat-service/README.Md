Instructions on how to compile your service : 
      The service uses Nodejs, DynamoDb, Lambda functions and serverless framework. I have used AWS Lambda services for the         excercise.

Setup & Compilation: 
1) If you want to deploy the service on AWS, you need an AWS account. I have used the free tier account.
             https://aws.amazon.com/free/
2) Install/ update pip:
              komal-2:~ komalrattan$ python3 get-pip.py --user

~~~~~
	Collecting pip
	  Downloading 		https://files.pythonhosted.org/packages/0f/74/ecd13431bcc456ed390b44c8a6e917c1820365cbebcb6a8974d1cd045ab4/pip-10.0.1-py2.py3-none-any.whl (1.3MB)
    100% |████████████████████████████████| 1.4MB 4.2MB/s 
Collecting setuptools
  Downloading https://files.pythonhosted.org/packages/7f/e1/820d941153923aac1d49d7fc37e17b6e73bfbd2904959fffbad77900cf92/setuptools-39.2.0-py2.py3-none-any.whl (567kB)
    100% |████████████████████████████████| 655kB 2.3MB/s 
Collecting wheel
  Downloading https://files.pythonhosted.org/packages/0c/80/16a85b47702a1f47a63c104c91abdd0a6704ee8ae3b4ce4afc49bc39f9d9/wheel-0.30.0-py2.py3-none-any.whl (49kB)
    100% |████████████████████████████████| 51kB 7.7MB/s 
Installing collected packages: pip, setuptools, wheel
  The script wheel is installed in '/Users/komalrattan/Library/Python/3.3/bin' which is not on PATH.
  Consider adding this directory to PATH or, if you prefer to suppress this warning, use --no-warn-script-location.
Successfully installed pip-10.0.1 setuptools-39.2.0 wheel-0.30.0
~~~~~

3) Install/update npm :
	I skipped this step as I have a current version of npm already installed for use in my development environment. 
https://docs.npmjs.com/cli/install.

4) Install/ update aws cli:
 Please follow the steps: https://docs.aws.amazon.com/cli/latest/userguide/cli-install-macos.html
komal-2:~ komalrattan$ pip3 install awscli --upgrade --user
	komal-2:~ komalrattan$ aws --version
aws-cli/1.11.129 Python/3.4.3 Darwin/17.7.0 botocore/1.5.92
komal-2:~ komalrattan$ pip3 install awscli --upgrade --user
	…..

5) Configure aws CLI :
Please follow the steps : https://docs.aws.amazon.com/cli/latest/userguide/cli-config-files.html
I also added the credentials and the keys created and downloaded in step 1 above (create free aws account)
	
6) Install Severless:
komal-2:~ komalrattan$ sudo npm install serverless -g

7) Make a directory for your project files:
komal-2:~ komalrattan$ pwd
/Users/komalrattan
komal-2:~ komalrattan$ mkdir ua-coding--chat && cd ua-coding-chat

8) Create a broilerplate code for serverless development:
komal-2:ua-coding-chat komalrattan$ serverless create --template aws-nodejs --path chat-service --name chat
Copy Nodejs files maintaining the directory structure from github.

9) Compile and deploy severless code:
For deployment to aws:
		https://serverless.com/framework/docs/providers/aws/guide/deploying/
komal-2:~ komalrattan$ serverless deploy -v

For local deployment: https://serverless.com/framework/docs/providers/aws/cli-reference/invoke-local/
Example: serverless invoke local --function functionName
Note: I have not tried running the service code locally as my system crashes. I did not have time to debug the issue. Also, I did not setup DynamoDb locally but proceeded with AWS deployments.

          SCREENSHOT 1:  Deployment


• Instructions on how to run your service locally:

endpoints:
  POST - https://feujlv0hwh.execute-api.us-east-1.amazonaws.com/dev/chat
  GET - https://feujlv0hwh.execute-api.us-east-1.amazonaws.com/dev/chats/{username}
  GET - https://feujlv0hwh.execute-api.us-east-1.amazonaws.com/dev/chat/{id}


curl -X POST lk1zugxhyl.execute-api.us-east-1.amazonaws.com/dev/chat 
--data '{"username":"testuser3","text": "testing3","timeout":60}'

        2) curl  https://lk1zugxhyl.execute-api.us-east-1.amazonaws.com/dev/chats/{testuser3}

       3)  curl  https://lk1zugxhyl.execute-api.us-east-1.amazonaws.com/dev/chat{2dbfe9e0-9e7e-11e8-bd95-6bafbf30c797}


          SCREENSHOT 2:  TEST


• The decisions you made

1) The problem stated a requirement create a production ready, horizontally scalable solution: Severless architecture seems to be the soution for concurrency requirements without putting pressure for the underlying infrastructure requirements. 
AWS Lambda :  gets horizontal scaling
Nodejs based AWS Lambda + AWS API Gateway : gets the functioning JSON API

Reading & references: 
https://martinfowler.com/articles/serverless.html
https://docs.aws.amazon.com/lambda/latest/dg/best-practices.html
https://docs.aws.amazon.com/lambda/latest/dg/scaling.html

Relevant skills and experience acquired during my work projects:
Klyman Info - Cloud Architect- Re-architect & implement monolith application to Microservices architecture. 
		Relevant tech stack: NodeJs, PAAS (Heroku), Postgresql, POC for docker
UCOP - Lead DevOps: Design and develop integrations between Hub (hosted on AWS) and campus applicatons
	Relevant tech stack: AWS, AWS CLI,API Gateway (mule & AWS),  CD/CI, GitHub, BitBucket, Software Architecture   patterns,

  2) Another requirement is : The serviceshould implement a hot/cold storage system where expired messages are stored
My solutions for hot/cold storage -
(1) Suppose you have used AWS DynamoDB as the 'hot' storage for the chat messages
(2) Usage of AWS Glacier might be appropriate for the 'cold' storage
   - NOTE: AWS Glacier AFAIK is not part of AWS Free Tier

The solution utilizes DynamoDb and DynamoDb streams.
https://aws.amazon.com/blogs/database/dynamodb-streams-use-cases-and-design-patterns/
https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GettingStarted.html


• The limitations of your implementation
1) The solution does not implement the actual chat app and only a REST service to PUT and GET messages. This was the requirement and so it is the boundry of the solution.
2) Use of Severless framework: Gives lesser control on the underling infrastructure.
3) Debugging of the service is more complex.
4) Use of DynamoDb: The soulution uses JSON and Dynamodb to store the JSON messages as schemaless db.
 It relies heavily on the Dynamodb stack to provide solution for streaming and syncing. 
5) Use of DynamoDb scan : Scan operation is very expenseive on resources. If I have additional time, I would implement the storage schema differently or re design the API with additional optimization code implementing parallel scans.
6) Hierarchical data support: There was no requirement for that. However, typically chat conversations can have hierarchical data. This feature can be implemented using ChatQL or some such framework.
The solution is not using Glacier or S3 as there are costs associated with both in the free tier. 

• What you would do if you had more time
1) Implement ChatQl feature
2) Remove scan and redo the access pattern for storage.

• How you would scale it in the future
Implement ChatQL 




