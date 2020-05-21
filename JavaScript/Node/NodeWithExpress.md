# Express


- Express allows you to build the back end (or server side)of a website in JavaScript
- Express is the most popular framework as of 2019, other frameworks are Koa, Happy.js, Adonis.js
- Express uses APIs that server JSON data


## Basic Syntax


 - importing Epress (without using Babel)

```
const express = require('express');
```

- initializing Express

```
const app = express();

```

- Creating the endpoints/route handlers

```
app.get('/', (request, response) => {
	response.send('Hello World'); // sends and then closes the response
})

```

- Listening to a port

```
app.listen(5000);

```


### Notes about Request and Response:
- Request Object: represents the HTTP request properties, e.g. URL parameters, query strings, HTTP headers, anything sent within the <body>, ect
- Response Object: represents the HTTP response, allows the sending of JSON data, rendering templates, redirect, ect


- In route, you can use `app.get()`, `app.post()`, `app.put()`, `app.delete()`, ect

You can have access to parameters, query strings, urls, ect

Express has a default router which allows you to store routes in seperate files and export as needed

Example:

```
app.get('/', function(req, res){
		// Fetch from database (PostgreSQL, MySQL, MongoDB, ect)
		// Load urls
		// Return JSON files
		// anything with request and response
});
```

### MiddleWare
- Functions that have access to the request and response object
- With Express, there is built in middleware as well as 3rd party modules
- Middleware in Express can:
	- Execute code
	- Make changes to request/response objects
	- End response cycle
	- Call next middleware in stack



## Getting started

Initialize a new npm pacakge.json file (`-y` just to have the defaults):

```
npm init -y
```


Install express in your app
```
npm i express

```

To run an index.js file:
```
npm index.js

```

Using NodeMON to watch the server and reload as we update the index.js file.

(install it as a dev dependency)
```
npm i -D nodemon
```

Also update the package.json file to run nodemon with development:
```
"scripts": {
  "start": "node index",
  "dev": "nodemon index"
}
```

Now in terminal, nodemon will watch the index.js file when we run:
```
npm run dev
```



In the index.js file:

```
app.get('/', (req, res) => {
  res.MODULE(SOMETHING COOL)
});

```

options for res.MODULE:
- res.json()
	- sends .json files
-	 res.render()
	- renders a template
	- exmaples: handlebars, e.js, pug
- res.sendFile()
	- sends a single file
- res.send()
	- sends only what is in the module, so very primitive info





### Some Express Template Engine Options:
- atpl
- dust
- eco
- ect
- ejs
- haml
- haml-coffee
- handlebars
- hogan
- jade
- jazz
- jqtpl
- JUST
- liquor
- mustache
- QEJS
- swig
- templayed
- toffee
- underscore
- walrus
- whiskers
