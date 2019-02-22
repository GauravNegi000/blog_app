# Blog_app
Hey,this is my first repo ,it is a web application for blog at the beginner level made on nodejs,express and mongodb.

![Blog_demo](https://github.com/GauravNegi000/blog_app/blob/master/blog-app-eg.PNG)

## Features
- (CRUD) Create/Read/Update/Delete Article
- Passsport Authentication for Administration
- Encrypt Password Hash</i>
- Image Upload
- Tiny MCE Text editor

## Server Side Dependencies
````
    "body-parser": "^1.18.3",
    "connect-flash": "^0.1.1",
    "ejs": "^2.6.1",
    "express": "^4.16.4",
    "express-sanitizer": "^1.0.5",
    "express-session": "^1.15.6",
    "method-override": "^3.0.0",
    "moment": "^2.24.0",
    "mongoose": "^5.4.2",
    "multer": "^1.4.1",
    "passport": "^0.4.0",
    "passport-local": "^1.0.0",
    "passport-local-mongoose": "^5.0.1"
    
   ````
   ## Getting Started

Clone Repo

````
git clone https://github.com/GauravNegi000/blog_app.git
````
Npm install dependencies

````
npm install
````
Start Mongodb-

````
mongod --dbpath "<dbpath>"
````
Start Server

````
 node app.js
````
Server Will be started at Local host at port 3000

type localhost:3000 in browser

Now,you can go to login page localhost:3000/blogs/login/ or u can register at localhost:3000/blogs/register/

And you will be redirected to Admin Panel .
Now you can Create/Edit/Delete yor blogs.

> Thank You
