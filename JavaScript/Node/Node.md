# Node

- Allows javascript to 
    - read, write and access files on the server
    - create a server
    - connecting to a database
    - essentially allows javascript to be a backend scripting language

- Built as a wrapper on chromium's V8 engine. Built in C++ and allows javscript to access the v8 engine
 



- In browser javascript (client side), the browser interprets and runs the javascript being sent to it. It is inside of a "window" object and allows the javascript to have access to the document object model of the browser (DOM). Everything written in "browser" javascript gets appended to the "window" object (even the DOM is inside the window object)

```
// Browser JS example

document.getElementById("html-id");

// is actually the same thing as 
window.document.getElementById("html-id"); 

// everything is in the window object
window.console.log("html-id"); 


// even on custom variables and functions
const name = "billy goat";

window.name;

function sayName(name){
    console.log(name);
};

window.sayName(name); // note if you pass window.name you'll get a return value of undefined

```

- Node handles javascript different, there is no window object and there is no DOM. Each file is considered to be a "module" which is localized javascript written under a "wrapper" of an function that takes exports, require, module, the filename and the directory name (and subsequent path)

- The core concept of wrapping modules
    - Everything done in node is wrapped in a function
    - Everything gets an Immediately invoked function expression  (IIFE)
    - All of the parameters in the function are local to the module

```
/** using the keyword arguments 
* will return an object of 5 properties
*/

// (function (exports, require, module, __filename, __dirname){ // the immediately invoked function expression
   console.log(arguments); 
// return ...
// })() // executed immediately 
```



- __event loop__
  - taking the asynchronous concept to the next level with having blocks of async code to be passed over while other things get done and coming back to the async function when there is more available processing power, ect


- `exports` is an object that can be changed  by assigning it. It is used to export however many functions from one module to another that is desired
    - Also is an alias for `module.exports`
```
// at the end of a file...


// for a single export
module.exports = functionThatDoesSomething;



// end of a different file

// example of how to export a single item function
module.exports.function1 = function1;
module.exports.function2 = function2;

```


- `require`
    - straight node imports are done using the `require()` function to pull out the exports and assigning that to a variable

```
const functionNameButCanBeWhatever = require("./pathToModule/module.js");
```

- `__filename` and `__dirname` return the path to the current module and the current module's directory, respectively

- Installing node also installs npm (node's _package manager_) and npx (node's _package runner_)
    - note on npx, it's a package runner, so use it to run packages, like `$ npx create-react-apt` but still use node to run the server or client `$ npm run dev` for example

- Node typically will be in an `app.js`, `index.js` or `server.js` file, depending on the project and what's happening. Obviously there can be multiple modules (node files) that can be exported and then imported into the `server.js` (which is a common practice, think models that connect to respective api/routes which connect to the server)






# Tips and tricks
- Access the node shell in the terminal (linux) with `$ node`
- Return all of the available functions/methods/objects by pressing `tab` twice while inside of node 
    - Return all of the functions/methods nested under another call by typing the desired object/function  and double tapping `tab` again
    - This also applies to variables
    - Example below: 
        - shows the first time just double tapping `tab`, 
        - then `Array.` + `tab tab`, 
        - then `Array.prototype.` + `tab tab`, 
        - and finally declaring a new variable that's an array and logging the possible array functions with `array_example.` + `tab tab`
```
> 
Array                 ArrayBuffer           Atomics               BigInt
BigInt64Array         BigUint64Array        Boolean               Buffer
DataView              Date                  Error                 EvalError
Float32Array          Float64Array          Function              GLOBAL
Infinity              Int16Array            Int32Array            Int8Array
Intl                  JSON                  Map                   Math
NaN                   Number                Object                Promise
Proxy                 RangeError            ReferenceError        Reflect
RegExp                Set                   SharedArrayBuffer     String
Symbol                SyntaxError           TextDecoder           TextEncoder
TypeError             URIError              URL                   URLSearchParams
Uint16Array           Uint32Array           Uint8Array            Uint8ClampedArray
WeakMap               WeakSet               WebAssembly           _
_error                assert                async_hooks           buffer
child_process         clearImmediate        clearInterval         clearTimeout
cluster               console               crypto                decodeURI
decodeURIComponent    dgram                 dns                   domain
encodeURI             encodeURIComponent    escape                eval
events                fs                    global                globalThis
http                  http2                 https                 inspector
isFinite              isNaN                 module                net
os                    parseFloat            parseInt              path
perf_hooks            process               punycode              querystring
queueMicrotask        readline              repl                  require
root                  setImmediate          setInterval           setTimeout
stream                string_decoder        tls                   trace_events
tty                   undefined             unescape              url
util                  v8                    vm                    worker_threads
zlib

__defineGetter__      __defineSetter__      __lookupGetter__      __lookupSetter__
__proto__             hasOwnProperty        isPrototypeOf         propertyIsEnumerable
toLocaleString        toString              valueOf

constructor

> Array.
Array.__defineGetter__      Array.__defineSetter__      Array.__lookupGetter__
Array.__lookupSetter__      Array.__proto__             Array.hasOwnProperty
Array.isPrototypeOf         Array.propertyIsEnumerable  Array.toLocaleString
Array.valueOf

Array.apply                 Array.arguments             Array.bind
Array.call                  Array.caller                Array.constructor
Array.toString

Array.from                  Array.isArray               Array.length
Array.name                  Array.of                    Array.prototype



> Array.prototype.
Array.prototype.__defineGetter__      Array.prototype.__defineSetter__
Array.prototype.__lookupGetter__      Array.prototype.__lookupSetter__
Array.prototype.__proto__             Array.prototype.hasOwnProperty
Array.prototype.isPrototypeOf         Array.prototype.propertyIsEnumerable
Array.prototype.valueOf

Array.prototype.concat                Array.prototype.constructor
Array.prototype.copyWithin            Array.prototype.entries
Array.prototype.every                 Array.prototype.fill
Array.prototype.filter                Array.prototype.find
Array.prototype.findIndex             Array.prototype.flat
Array.prototype.flatMap               Array.prototype.forEach
Array.prototype.includes              Array.prototype.indexOf
Array.prototype.join                  Array.prototype.keys
Array.prototype.lastIndexOf           Array.prototype.length
Array.prototype.map                   Array.prototype.pop
Array.prototype.push                  Array.prototype.reduce
Array.prototype.reduceRight           Array.prototype.reverse
Array.prototype.shift                 Array.prototype.slice
Array.prototype.some                  Array.prototype.sort
Array.prototype.splice                Array.prototype.toLocaleString
Array.prototype.toString              Array.prototype.unshift
Array.prototype.values

> const array_example = [];
undefined
> array_example.
array_example.__defineGetter__      array_example.__defineSetter__
array_example.__lookupGetter__      array_example.__lookupSetter__
array_example.__proto__             array_example.hasOwnProperty
array_example.isPrototypeOf         array_example.propertyIsEnumerable
array_example.valueOf

array_example.concat                array_example.constructor
array_example.copyWithin            array_example.entries
array_example.every                 array_example.fill
array_example.filter                array_example.find
array_example.findIndex             array_example.flat
array_example.flatMap               array_example.forEach
array_example.includes              array_example.indexOf
array_example.join                  array_example.keys
array_example.lastIndexOf           array_example.map
array_example.pop                   array_example.push
array_example.reduce                array_example.reduceRight
array_example.reverse               array_example.shift
array_example.slice                 array_example.some
array_example.sort                  array_example.splice
array_example.toLocaleString        array_example.toString
array_example.unshift               array_example.values

array_example.length

```



- To see what the five arguments that are in the IIFE wrapper function, create a file with just `console.log(arguments);` and call it in node. This returns:
```
node app.js 
[Arguments] {
  '0': {},
  '1': [Function: require] {
    resolve: [Function: resolve] { paths: [Function: paths] },
    main: Module {
      id: '.',
      path: '/home/punctuationmarks/Programming/Projects/Classes/Javascript/Node/,
      exports: {},
      parent: null,
      filename: '/home/punctuationmarks/Programming/Projects/Classes/Javascript/Node/app.js',
      loaded: false,
      children: [],
      paths: [Array]
    },
    extensions: [Object: null prototype] {
      '.js': [Function],
      '.json': [Function],
      '.node': [Function]
    },
    cache: [Object: null prototype] {
      '/home/punctuationmarks/Programming/Projects/Classes/Javascript/Node/app.js': [Module]
    }
  },
  '2': Module {
    id: '.',
    path: '/home/punctuationmarks/Programming/Projects/Classes/Javascript/Node/,
    exports: {},
    parent: null,
    filename: '/home/punctuationmarks/Programming/Projects/Classes/Javascript/Node/app.js',
    loaded: false,
    children: [],
    paths: [
      '/home/punctuationmarks/Programming/Projects/Classes/Javascript/Node/node_modules',
      '/home/punctuationmarks/Programming/Projects/Classes/Javascript/Node/node_modules',
      '/home/punctuationmarks/Programming/Projects/Classes/Javascript/node_modules',
      '/home/punctuationmarks/Programming/Projects/Classes/node_modules',
      '/home/punctuationmarks/Programming/Projects/node_modules',
      '/home/punctuationmarks/Programming/node_modules',
      '/home/punctuationmarks/node_modules',
      '/home/node_modules',
      '/node_modules'
    ]
  },
  '3': '/home/punctuationmarks/Programming/Projects/Classes/Javascript/Node/app.js',
  '4': '/home/punctuationmarks/Programming/Projects/Classes/Javascript/Node/
}

```



# Some built in modules/libraries in node with some common functions (kinda like the standard library)

## `path`
    - `const path = require("path");`
    - used to find the current path, a file's path, a file's extension, and more


## `fs` 
- File System, allows for writing, reading and file manipulation


- Writing a file
  - takes the name of file, the data, and a callback function which allows access to any errors
  - is an asynchronous function, so keep that in mind
```
fs.writeFile("nameAndPathOfFile.txt", dataBeingWrittenToFile, (err) => {
   // call back function
} )
```

- Reading files 
  - takes file's name and path, the encoding and a callback function that allows access to errors and the data itself 
```
fs.readFile("nameAndPathOfFile.txt", 'utf8', (err, data) => {

})
```

## `url`
- Used for dealing with, parsing and manipulating URLs 

- Parsing a url with `url.parse()`
  - from the docs: `url.parse(urlString[, parseQueryString[, slashesDenoteHost]])`
    - urlString <string> The URL string to parse.
    - parseQueryString <boolean> If true, the query property will always be set to an object returned by the querystring module's parse() method. If false, the query property on the returned URL object will be an unparsed, undecoded string. Default: false.
    - slashesDenoteHost <boolean> If true, the first token after the literal string // and preceding the next / will be interpreted as the host. For instance, given //foo/bar, the result would be {host: 'foo', pathname: '/bar'} rather than {pathname: '//foo/bar'}. Default: false.

```
const url = require("url");


const address = "https://duckduckgo.com/?q=search+keywords&t=brave&ia=web";


// returns a URL object
const parsedURL = url.parse(address, true);

console.log(parsedURL); // returns entire object
/** in this example
Url {
  protocol: 'https:',
  slashes: true,
  auth: null,
  host: 'duckduckgo.com',
  port: null,
  hostname: 'duckduckgo.com',
  hash: null,
  search: '?q=search+keywords&t=brave&ia=web',
  query: [Object: null prototype] {
    q: 'search keywords',
    t: 'brave',
    ia: 'web'
  },
  pathname: '/',
  path: '/?q=search+keywords&t=brave&ia=web',
  href: 'https://duckduckgo.com/?q=search+keywords&t=brave&ia=web'
}
 */


// we can get the key value pairs by passing the desired parameters 
console.log(`parsedURL.host: ${parsedURL.host}`);
console.log(`parsedURL.href: ${parsedURL.href}`);

console.log(`parsedURL.pathname: ${parsedURL.pathname}`);
console.log(`parsedURL.protocol: ${parsedURL.protocol}`);
console.log(`parsedURL.port: ${parsedURL.port}`);
console.log(parsedURL.query); // this cannot be string formatted since it's an object
// these are all specific to the actual url that is being parsed, 
// meaning the parameters of the query object will be different every time 
console.log(parsedURL.query.q);
console.log(parsedURL.query.t);
console.log(parsedURL.query.ia);
```


## `http`
- Used for creating servers and manipulating http requests and reponses

- Creating a server with `http.createServer`
  - takes a callback function
  - the file will stay open and running until closed (or until a trigger is written to close it)
    - a trigger that will close the server is calling `response.end()` twice (which isn't a good practice anyway)

```
const http = require("http");

// takes a call back that allows for the listening to the requests made to the server as
// well as repsonding to those requests
const server = http.createServer((request, response) => {
    response.write("a response the user sees when making a request");
    response.end(); // have to end the response, every time
    
});

// listening to port 3000, makes a request when going to localhost:3000
// also takes a callback function
server.listen(3000, () => console.log("server is up and runnning on port 3000!"));
```



- Console logging the request that is passed to the createServer callback function, if you do this you'll get a huge JSON object which contains lings like the url, the headers, and a few hundred more things



## `os`
- Perhaps less common, but `os` can return some interesting information about the operating system that is running node


```
const os = require("os");
let totalMemory = os.totalmem() // total memory on the operating system of the infected computer with the node virus
let freeMemory = os.freemem() // free memory available


console.log("os.totalmem: ", totalMemory)
console.log("os.freemem: ", freeMemory)
```