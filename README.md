# Reviews Project
# This will be an app built to leave a review on a certain product. 
# It will be based on Node.js javascript and built with Express.

- Prerequisite:
Install Node.js which includes Node Package Manager.

- Run the application on teminal:
cd [PROJECT NAME]
npm start


- To test the code if it is functional, we have used Postman tool where you have to :
- Create a collection
- Inside this collection add a new request
- This request to test any code we want from our application, we have to give it the 
  type of method(GET, POST, DELETE...), the url, the type of data that we are entering 
  that in our case is JSON data, add headers, authorization, body structure if the 
  method has body.
- Then we click send and see in console if there is any error or code is executed.


- Have set up a MongoDB database for a Node.js application using Express. For this you 
  have to follow these steps:
  - Install MongoDB with comand and then install the required packages ( mongodb, mongoose,
    connect-mongodb-session)
  - Connect to the MongoDB database using Mongoose in entry point file which runs the app.
  - Define a schema and model for data using Mongoose.
  - Use the model in routes file.


- REST call for our app:
  - Signup --> PUT http://localhost:4000/auth/signup
  - Login --> POST http://localhost:4000/auth/login
  - Create Review --> POST http://localhost:4000/review
  - Read Review --> GET http://localhost:4000/review/
  - Update Review --> PUT http://localhost:4000/review/userId? 
  - Delete Review --> DELETE http://localhost:4000/review/userId?
- NOTE: Use the token that return the login to update and delete any review in header fiels
        as an authorization.

