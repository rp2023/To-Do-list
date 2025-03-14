# To-Do-list
The To-Do List Serverless Web Application is designed to help users manage their tasks efficiently using a modern, serverless architecture that leverages various AWS services for seamless scalability, performance, and cost efficiency.

Key Components

Amazon DynamoDB: A fully managed NoSQL database service that provides fast and predictable performance with seamless scalability. It stores all the tasks with attributes such as Task ID, Task Name, Task Description, and Task Status.

AWS Lambda: A serverless compute service that lets you run code without provisioning or managing servers. Lambda functions handle the business logic for CRUD operations (Create, Read, Update, Delete) on tasks stored in DynamoDB.Only To-do-Lambda-Function.py file content needs to be deployed in Lambda function.

Amazon API Gateway: A fully managed service that makes it easy for developers to create, publish, maintain, monitor, and secure APIs. It acts as the front door for accessing data, business logic, or functionality from backend services.

Amazon S3: A scalable object storage service. It hosts the static files for the web application, such as HTML, CSS, and JavaScript, making the app accessible via a web browser.So basically it is being used for our Web Application hosting.

Application Workflow:

User Interaction(FrontEnd in Amazon S3): Users interact with the web application through a user-friendly interface, where they can add new tasks, delete existing ones, and view all tasks.Only FrontEnd firectory files needs to be uploaded on Amazon S3.

Adding a Task: When a user adds a task, the web application sends a POST request to the API Gateway, which triggers a Lambda function. The Lambda function writes the task data to DynamoDB.

Deleting a Task: When a user deletes a task, the web application sends a DELETE request to the API Gateway, which triggers a Lambda function. The Lambda function deletes the task from DynamoDB and updates the UI.

Viewing All Tasks: When a user wants to view all tasks, the web application sends a GET request to the API Gateway, which triggers a Lambda function. The Lambda function retrieves all tasks from DynamoDB and sends them back to the web application to be displayed in a table.

Files Details:

To-do-Lambda-Function.py : Python code to access dynamoDB from Lambda Function.

Bucket-Policy.txt : S3 Bucket Policy for statis website Hosting. Remember to change your bucket name in resource field.

API Gateway : Directory with Mapping templates for GET,PUT,POST and DELETE method.

FrontEnd : Directory with all the files required for Frontend of our web application and needs to eb uploaded on Amazon S3.Remember to update value of "apiUrl" with your API gateway URL before uploading to S3.
Ref:https://youtu.be/nHXJClmJMys?si=qGxxCwNkywYYqD1w
