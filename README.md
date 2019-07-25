# TakeMeTour's Job Quest 2018 Edition

## Development
1. Install dependencies
```
npm install
```
2. Copy .evn-default to .env
```
cp .env-default .env
```
3. Set MONGODB_URL enviroment variable to the following and replace {{username}}, {{password}}, {{cluster}} and {{appname}}
```
MONGODB_URL=mongodb+srv://{{username}}:{{password}}@{{cluster}}.mongodb.net/{{appname}}?retryWrites=true&w=majority
```
4. Running Local Environment.
Local api server and client app.
```
npm start
```
Have fun tinkering

## Publishing
1. Set now mongodb_url_jokes secret
```
now secrets add mongodb_url_jokes "mongodb+srv://{{username}}:{{password}}@{{cluster}}.mongodb.net/{{appname}}?retryWrites=true&w=majority"
```
2. Change apiHost url in ```src/apiHost.json``` to your now {{username}}.
```
https://jokes.{{username}}.now.sh/api
```
3. Publish Code in one command.
Handles webpack build, zeit now deploy and opens published app in new url.
```
npm run publish
```


Thank you for your interest in working at TakeMeTour. First, we would like to take a simple test on your coding skill.

Please fork this repo and work on the test. After finishing the test, please send your repo to WantToWork@takemetour.com (Subject: JavaScript Engineer Application).

The quest has 2 major parts: **Front-end** and **Back-end**. If you interesting on which part you can work on the test only that part. But you can do both. (Or in case you want to apply as **Full-stack Engineer** you should done both. Obviously.)

Also in both part has some question needed to be answer. So don't forget to done that. Answer can be both in Thai or English.

## Front-End

You are going to make a web application which allow users to get some joke from **Chuck Norris**.

> Chuck Norris once ordered a Big Mac at Burger King, and got one.

In case you don't know who the heck is Chuck Norris. See his statement.

![](https://blazepress.com/.image/c_limit%2Ccs_srgb%2Cq_auto:good%2Cw_620/MTI4OTk1Mjg4MDE3OTEzODY2/18.webp)

(Sorry. Please just google it)

### Features
- Users can get a joke from [Chuck Norris API](http://www.icndb.com/api/)
- Users has options to change number of result jokes, user's first name and last name
- How to display the result is up to you.

### Technical description
- Using data from [REST API](http://www.icndb.com/api/)
- Any tools & framework is allowed.
- If you are using tools & framework which is same as our tech stack (React, Redux, styled-components etc.) will be a plus.
- Any extra feature will be a plus.

### Front-end Questions

1. Please explain a situation that using Redux to manage application state is more helpful than original React's state.
**
Redux is nice because it gives us a system for managing the state globally and immutably. We could add an undo option to go right back to the previous state where as the original react state would be overwritten.
Another thing that is nice is the serialization of the state. In this project I have each "reducer" in it's own file: ```src/reducers```. Each app action, aside from some of the stuff in the ChuckNorris component, exists in it's own action file: ```src/actions```.
Even though it adds a lot of boilerplate on to the app for simple stuff it makes it clear what is happening at any given time.
**

2. Why do we need "Server-Side Rendering". Please explain.

**
Most of the time react takes care of the rendering. So most of the time we don't need to render server-side. Back in the php days you would need server-side rendering.

Data manipulation on the other hand needs to be validated and sanitized on a server. If a customer was receiving a 20% discount we wouldn't want the front end app to calculate the price. We would send it to the server to make sure.

**

3. Explain the differences of `null` and `undefined`
**
`null` is a set value. `undefined` comes from a variable that is declared but not set. Receiving a `null` tells me that my variable will change but has not changed. Receiving `undefined` can tell me that something is wrong and not returning.
**


4. Tell us the benefit of using ESLint.
**
ESLint is a way to checking your javascript code for syntax errors. Its good for a development team by enforcing standards and best practices.
**
## Back-End

You are going to made a simple **Thai's joke API**. And this API is follow to REST API pattern.

Thai's joke API can allow user to explore, add, delete, like or dislike Thai's joke.

### Endpoints
- `GET /` Get all jokes.
- `POST /` Add new joke.
- `GET /:id` Get joke by id.
- `DELETE /:id` Delete joke. (In case you hate it)
- `POST /:id/like` Like a joke. (Because we don't have authentication system yet. Like spaming is fine here.)
- `POST /:id/dislike` Dislike a joke. (Same as above. Dislike spaming is fine here.)

### Technical description
- All data must store to the database. Any database is fine. But we prefer MongoDB.
- Back-end code must written in Node.js. Any library or helper tools is up to you.

### Bonus
- If you can make like/dislike system can't be spammed (like or dislike action only happen once for each joke respect to user). We will give you a bonus on that.
- If you deploy this API publicly to anywhere with some **GOOD Thai's joke** to get. We will give you a bonus on that as well. (Deploy to where and how is up to you. But don't forget to send us your work.)

### Back-end Questions

1. Explain a benefit gain from using JavaScript to implements back-end API server.
**
Javascipt for a back end server is a good idea because it easier for a developer to work on both the front end and back end code since they are the same.
**
2. Explain what is a GraphQL?
**
GraphQL is a query language for the back end server api. It lets the client app query data and specify what data is returned. GraphQL provides a nice server service where queries can be tested eliminating the need for postman while developing.
**
3. If you have a task to convert existing back-end API which follow to REST API pattern to GraphQL. Which approach you will make?
**
I would start by looking at the requirements and what endpoints exists. I would then need to make a query function for each endpoint GET/POST/EDIT/DELETE and return the data accordingly.  
**
