# Udagram Image Filtering Microservice

Udagram is a simple cloud application developed alongside the Udacity Cloud Engineering Nanodegree. It allows users to register and log into a web client, post photos to the feed, and process photos using an image filtering microservice.

### Setup Node Environment

1. Initialize a new project: `npm i`
2. run the development server with `npm run dev`

### Deploying your system

Follow the process described in the course to `eb init` a new application and `eb create` a new environment to deploy your image-filter service! Don't forget you can use `eb deploy` to push changes.


### Refactor the course RESTapi
### ADD user is being add as an endpoint AND GET method requires authentication!

## How the code is structured

In file scr/server.ts - I commented out ***requireAuth*** function for authentication of users. For easy review. 

If you use this funtion you have to provide access token in order to recive an image. 
From the project use teodor_webdev-final.postman_collection.json in Postman. 

With POST http://{{HOST}}/auth and JSON {email, password} you can create new user and its going to retrive a token.

Use that thoken in Postman -> GET http://{{HOST_EB}}filteredimage?image_url= -> Authorization -> OAuth 2.0 

There are 2 variables:
    1. Host -> for localhost
    2. HOST_EB -> elastic beanstalk

http://app-final-web-dev.us-east-1.elasticbeanstalk.com/  --- EB URL
