# Fundamentals of JS, up to ES6










## House keeeping aka tips and tricks and reminders while working with JS

- All variables and functions are global by default
	- Note, in node, they are not "global" by default, but they are locally global to the file 

- Adding `"use strict";` at the top of a .js file enables "Strict Mode" which catches common mistakes and unsafe actions
  - This can also be used inside of a function if only needed strict mode in a localized area

- Callback functions
  - a function that executes on each individual element in an array (except for the first, if no "initialValue" is supplied)
  - When using callback functions (for sure on asynchronous functions) they only get triggered after the first function (the parent function) is either sucesssful or fails (so the callback can (usually) take an error)
- Rest parameter `...` passed in functions
  - Allows for a variable number of _parameters_ to be passed, think of *args, **kwargs in python
```JS
const sum = (...args) => args.reduce((a, b) => a + b, 0);
```

- Spread operator `...`
	- This handy tool allows for dynamic spreading of _arguments_ that get passed to a function
		- Meaning less boiler plate code and more abstraction

```JS
// using the spread operator to copy all of the contents of an array
const arr1 = ['JAN', 'FEB', 'MAR', 'APR', 'MAY'];
let arr2;

arr2 = [...arr1];
```

- You cannot use if/else statements in anonymous arrow functions, use a ternary operator if you want to use an if/else


- In browser javascript (client side), the browser interprets and runs the javascript being sent to it. It is inside of a "window" object and allows the javascript to have access to the document object model of the browser (DOM). Everything written in "browser" javascript gets appended to the "window" object (even the DOM is inside the window object)

```JS
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


- Back ticks for string formulating and passing variables through strings (instead of using a top of concatonation)
  - Using back tics is very similar to fstrings in python
  - _NOTE:_ you cannot use back tics to pass an object through, it will give an error of `TypeError: Cannot convert object to primitive value`
```JS
const path = require("path"); // node standard library


const fileLocation = path.join(__dirname, 'app.js');

// check this out
console.log(`fileLocation: ${fileLocation}`);
```



















## Objects
- Destructoring an object
  - Quick way to get values from properties/keys in an obect
  - Also does the same with arrays
  - _Note_, the variable names must == the properies or be explicityly declared 
  - _also note_ during property and value adding (when performing at the same time) you can use dot notation if the property being added is a single word, but you _must_ use bracket notation if you're using a previously declared variable (e.g. `const age = "person's age"; obj[age] = 21;` is valid, but dot notation would not be )

```JS
const obj = {
  name: "Billy Goat",
  age: 42,
  animals: {
    dog: "mr. goat",
    cat: "mr. goatee"
  }
}

const name1 = obj.name;
const age1 = obj.age;

// using destructuring to achieve the same thing
const {name, age} = obj;


// explicitly declaring the variable names
const {name: billName, age: billAge} = obj;

// grabbing nested values
const {animals: {dog, cat}} = obj;


// renaming the variables for the nested values
const LOCAL_FORECAST = {
  yesterday: { low: 61, high: 75 },
  today: { low: 64, high: 77 },
  tomorrow: { low: 68, high: 80 }
};

  
const {today: {low: lowToday, high: highToday}} = LOCAL_FORECAST;


// destructuring an array
const [x, y,,, z] = [0,1,2,3,4,5,6]; // x=0, y=1, z=4

// destructuring and rest parameter
const [a,b, ...arr] [0,1,2,3,4,5,6]; // a = 0, b = 1, arr = [2,3,4,5,6]


// destructuring and passing those destrucured elements into a function
// this means you don't have to have an entire object to a function to then just deconstruct certain desired parameters/keys
const stats = {
  max: 56.78,
  standard_deviation: 4.34,
  median: 34.54,
  mode: 23.87,
  min: -0.75,
  average: 35.85
};

const half = ({max, min}) => (max + min) / 2.0; 
half(stats);

```


- freezing the object
```JS
> const x = [1,2,3]
undefined
> Object.freeze(x);
[ 1, 2, 3 ]
> x[1]=1
1
> x
[ 1, 2, 3 ]
> 
```

- more explicit way of showing the freezing of the object
```JS
function freezeObj() {
  'use strict';
  const MATH_CONSTANTS = {
    PI: 3.14
  };
  // Only change code below this line

  Object.freeze(MATH_CONSTANTS)
  // Only change code above this line
  try {
    MATH_CONSTANTS.PI = 99;
  } catch(ex) {
    console.log(ex);
  }
  return MATH_CONSTANTS.PI;
}

const PI = freezeObj();
     
```

- Object literals, think of it like the oposite of deconstructing an object
```JS
const getXY = (x, y) => ({
  x: x,
  y: y
})

const getAnotherXY = (x, y) => {x:y}

```


- Object literals, think of it like the oposite of deconstructing an object
```
const getXY = (x, y) => ({
  x: x,
  y: y
})

const getAnotherXY = (x, y) => {x:y}

```
- Rewriting a function inside of an object
```
const bicycle1 = {
  gear: 2,
  setGear: function(newGear) {
    this.gear = newGear;
  }
};
bicycle1.setGeaobjectr(3);
console.log(bicycle1.gear);

const bicycle2 = {
  gear: 2,
  setGear(newGear) {
    this.gear = newGear;
  }
};
// changes the gear property to 3
bicycle2.setGear(3);
console.log(bicycle2.gear);
```


- Objects (has maps, aka dictionaries). Takes properties (or key value pairs)
  - interestly, even if you initialize the object with a const, it's still mutable
```
const anObject = {
  "an entree": "hamburger",
  "my side": "veggies",
  "the drink": "water",
  waiter: "cute"
};


// grabbing the values from keys
const entreeValue = anObject["an entree"];   
const drinkValue = anObject["the drink"]
const waiterValue = anObject.waiter;    


// adding new keys and values
anObject.place = "Chilis";
anObject['happy day?'] = true;

// removing a property
delete anObject["an entree"];
```

- Chaining dot and bracket notation to select nested propery of an object
```
const myStorage = {
  "car": {
    "inside": {
      "glove box": "maps",
      "passenger seat": "crumbs"
     },
    "outside": {
      "trunk": "jack"
    }
  }
};

const gloveBoxContents = myStorage.car.inside["glove box"];

```

- Returning a boolean if a property exists in an object
```
anObject.hasOwnProperty("keyBeingSearchedFor");

// also this syntax works as well
"keyBeingSearchedFor" in anObject;
```


- 


- Looping over an object to return a property and value pair (if it exists)
```
// Setup
var contacts = [
    {
        "firstName": "Akira",
        "lastName": "Laine",
        "number": "0543236543",
        "likes": ["Pizza", "Coding", "Brownie Points"]
    },
    {
        "firstName": "Harry",
        "lastName": "Potter",
        "number": "0994372684",
        "likes": ["Hogwarts", "Magic", "Hagrid"]
    },
    {
        "firstName": "Sherlock",
        "lastName": "Holmes",
        "number": "0487345643",
        "likes": ["Intriguing Cases", "Violin"]
    },
    {
        "firstName": "Kristian",
        "lastName": "Vos",
        "number": "unknown",
        "likes": ["JavaScript", "Gaming", "Foxes"]
    }
];

const lookUpProfile = (name, prop) => {
    //  looping over the indexes of the nested array
    for (let i = 0; i < contacts.length; i++){
        // checking to see if one of the properties has the passed value
        if (contacts[i].firstName === name){
            // checking to make sure the property exists if the firstName exists
            if(prop in contacts[i]){
                return contacts[i][prop]

            } else {
                // property failed
                return "No such property";
            }
        }
    }
    // if the firstName fails, the loop breaks
    return "No such contact"
}
```



- Looping over an object to return a property and value pair (if it exists)
```
// Setup
var contacts = [
    {
        "firstName": "Akira",
        "lastName": "Laine",
        "number": "0543236543",
        "likes": ["Pizza", "Coding", "Brownie Points"]
    },
    {
        "firstName": "Harry",
        "lastName": "Potter",
        "number": "0994372684",
        "likes": ["Hogwarts", "Magic", "Hagrid"]
    },
    {
        "firstName": "Sherlock",
        "lastName": "Holmes",
        "number": "0487345643",
        "likes": ["Intriguing Cases", "Violin"]
    },
    {
        "firstName": "Kristian",
        "lastName": "Vos",
        "number": "unknown",
        "likes": ["JavaScript", "Gaming", "Foxes"]
    }
];

const lookUpProfile = (name, prop) => {
    //  looping over the indexes of the nested array
    for (let i = 0; i < contacts.length; i++){
        // checking to see if one of the properties has the passed value
        if (contacts[i].firstName === name){
            // checking to make sure the property exists if the firstName exists
            if(prop in contacts[i]){
                return contacts[i][prop]

            } else {
                // property failed
                return "No such property";
            }
        }
    }
    // if the firstName fails, the loop breaks
    return "No such contact"
}
``` 


- Deleting specific key:value pairs in an object
```
let foods = {
  apples: 25,
  oranges: 32,
  plums: 28,
  bananas: 13,
  grapes: 35,
  strawberries: 27
};

// removes the key value pair
delete foods.oranges;
```


- Using `for... in... ` to loop through an object
```
const users = {
  Alan: {
    online: false
  },
  Jeff: {
    online: true
  },
  Sarah: {
    online: false
  }
};


function countOnline(usersObj) {
  let number = 0;
  for (let user in usersObj){
    // console.log(user);
    // both these syntaxs work for object unpacking
    // console.log(usersObj[user].online) // remember to pass the newly created "property" as a variable and not a direct string/property name
    if (usersObj[user]['online']){ // but in this situation, pass the direct second property name we're looking for
      number++;
    }
  }
  return number;
}


countOnline(users);
```


- Returning all of the keys of an object 
_Note_ how the use of the Object class and we're passing the object through that class's method
```JS
let users = {
  Alan: {
    age: 27,
    online: false
  },
  Jeff: {
    age: 32,
    online: true
  },
  Sarah: {
    age: 48,
    online: false
  },
  Ryan: {
    age: 19,
    online: true
  }
};

function getArrayOfUsers(obj) {
  return Object.keys(obj);
}

console.log(getArrayOfUsers(users));

```
















## Asynchronous code
- Asynchronous code runs like the language is multi-threaded instead of single threaded. In Javascript, `async` functions always return a promise, which is only returned upon success or failure. 
- Return statements inside of callbacks (or inside of promise -> then calls) aren't the return value for the overall function, but only the return value for the nested (callback) function, which is then passed to the outer most function once it is executed
- Using the syntax `async ... await` is shorthand for explicitly making Promise objects. Example given by MDN
```

```

_Gotchas_
- When testing async code, use mocked data to avoid needless api calls and use async code inside of tests to verify the code is working properly (verified with passing tests)

























## Testing

- When testing code that perhaps calls an api, mock that data
- Best practices when using a test runner and unit testing library like Jest is to  have the functions with "mocked" data in a folder called \_\_mocks\_\_ in the root directory. In the file that has the testing code, run the script `jest.mock('fileYouBeMocking')` at the top and it'll run the mocked function/files instead of the development/production files. This will allow for the mocked data to be tested and not the 3rd party api.
- When testing async code, use mocked data to avoid needless api calls and use async code inside of tests to verify the code is working properly (verified with passing tests)
- You can also mock entire packages (like axios for instance)
- Write a ton of unit tests, a decent amount of functional tests (functions that call other functions) and very few end-to-end tests (front end tests that ensure the backend/api are working)
























## `var` vs `const` vs `let`
- __var__ allows the initialization of a variable without instantiating it with data
  - can be overridden
  - easily mutable
  - can allow for a variable name to re-instantiated to inifitum with different values
  - but you cannot change a single index in if referenced from the varaible itself ?
- __let__ is nearly identical to var except 
  - Will also throw errors if another variable is initialized with the same name
  - It's scope is limited to the "block" of code it is instatiated in, (e.g for loop, function, do while loop)
    - This is extremely useful for declaring looping variables such as `i` multiple times
      - When using `var`, the `i` variable is global (if called outside of a function) and then can have negative influences on other indexes that try to loop using `var = i;`
- __const__ forces the variable to be immutable ontop of all the feautres of `let`
  - can't be overriden from instantiating (has to have data upon initialization)
  - not easily immutable
  - common practice is to make `const` variable names SCREAMING_SNAKE_CASE
  - Buuuutt if you instantiate an array with `const`, the array will be mutable 
    - Work around this, is to "freeze" the array (or object, since technically arrays are objects too in JS) with `Object.freeze(arr)`


- Code example of differences between `var` and `let` with a loop that builds a function
```
var printNumThree;
for (var i = 0; i < 4; i++) {
  if (i === 3) {
    printNumThree = function() {
      return i;
    };
  }
}
console.log(printNumThree());
// returns 4



'use strict';
let printNumTwo;
for (let i = 0; i < 3; i++) {
  if (i === 2) {
    printNumTwo = function() {
      return i;
    };
  }
}
console.log(printNumTwo());
// returns 2
console.log(i);
// returns "i is not defined"

```

- `let` scope example
```
let i = "global scope";

function checkScope() {
  'use strict';
  let i = 'function scope';
  if (true) {
    let i = 'block scope';
    console.log('Block scope i is: ', i);
  }
  console.log('Function scope i is: ', i);
  return i;
}

console.log(i);
```

- `var` example (many more pitfalls than listed, just avoid it)
```
// eg
var variableName = "Billy Goat";
variableName[0] = "J';
console.log(variableName);
// prints Billy Goat

variableName = "Jilly Goat";
console.log(variableName);
// prints Jilly Goat

```

- `const` examples

- freezing the object
```
> const x = [1,2,3]
undefined
> Object.freeze(x);
[ 1, 2, 3 ]
> x[1]=1
1
> x
[ 1, 2, 3 ]
> 
```

- more explicit way of showing the freezing of the object
```
function freezeObj() {
  'use strict';
  const MATH_CONSTANTS = {
    PI: 3.14
  };
  // Only change code below this line

  Object.freeze(MATH_CONSTANTS)
  // Only change code above this line
  try {
    MATH_CONSTANTS.PI = 99;
  } catch(ex) {
    console.log(ex);
  }
  return MATH_CONSTANTS.PI;
}

const PI = freezeObj();
     
```


- Strings are immutable
- use "string literals" to pass variables inside the string with `${varNameGoes}` syntax
```
const result = {
  success: ["max-length", "no-amd", "prefer-arrow-functions"],
  failure: ["no-var", "var-on-top", "linebreak"],
  skipped: ["id-blacklist", "no-dup-keys"]
};
function makeList(arr) {
  "use strict";
  let resultDisplayArray = [];
  for (let i = 0; i <= 2; i++){
      resultDisplayArray.push(`<li class="text-warning">${arr[i]}</li>`);
  }
  return resultDisplayArray;
}

const resultDisplayArray = makeList(result.failure); // returns three li items with the items in the failure list values
```






























## Arrays
- Mutable
- Indexable
- Functions
  - `{array}.push({element})` appends an element to the end of the array
  - `{array}.unshift({element})` inserts an element to the beginning on an array
  -`{array}.pop()` removes the final element in an array and returns said element
  - `{array}.shift()` removes the first element in an array and returns said element
  - `{array}.splice(startingIndex, nonInclusiveStoppingIndex, anyDesiredDataToAddtoTheArrayStartingAtTheSameIndex)` - removes however many elements desired from the starting index, can replace if the option third arguments are passed (can be a multiple arguments separated by a comma)
  - `{array}.slice(startingIndex, nonInclusiveStoppingIndex)`  copies the data in the array and returns it
  - `{array}.indexOf(valueToBeCheck)` returns the index of the passed value (singular) in the array (if there are any, returns -1 if there are not any)


- Reduce
  - Executes a "reducer" function (a callback function) that is custom but must take these 4 arguments
    - accumulator (`acc`)
    - the current value (`cur`)
    - the current index (`idx`)
    - and the source array (`src`) 
      - this is the array that `reduce()` is called upon

  - Breaking down what is actually happening in the reducer function when reduce() is applied
```
> let arr = [10, 1, 2, 3, 4];
undefined
> console.log(arr)
[ 10, 1, 2, 3, 4 ]
undefined
> 

> arr.reduce(function(accumulator, currentValue, currentIndex, array) {
...   console.log("acc :" + accumulator); // note this start at index 0
...   console.log("cur " + currentValue); // note this starts at index 1
...   console.log("acc + cur " + (accumulator + currentValue));
...   return accumulator + currentValue;
... });
acc :10
cur 1
acc + cur 11
acc :11
cur 2
acc + cur 13
acc :13
cur 3
acc + cur 16
acc :16
cur 4
acc + cur 20
20
> 
> console.log(arr)
[ 10, 1, 2, 3, 4 ]
undefined
> 
> let arr2 = 
... arr.reduce(function(accumulator, currentValue, currentIndex, array) {
...   console.log("acc :" + accumulator);
...   console.log("cur " + currentValue);
...   console.log("acc + cur " + (accumulator + currentValue));
...   return accumulator + currentValue;
... });
acc :10
cur 1
acc + cur 11
acc :11
cur 2
acc + cur 13
acc :13
cur 3
acc + cur 16
acc :16
cur 4
acc + cur 20
undefined
> 
> console.log(arr2);
20
undefined
> 
```























## Scope
- Global Scope
  - Variables instatiated outside of a function 
- Local Scope/Function Scope
  - Variables instatiated inside of a function
  - Buuuut if you forget to declare `var` before stating a variable's value, then that variable will be global
  - Can also allow for the use of a locally scoped variable with the same name as a globally scoped variable






























## Sytntax notes

- `return` can only be called in a function

- Visual data types
```
[] // array, contains any data
{} // object, contains key:value pairs of any data type, if the key is a number or a single word, it doesn't need to be in a string

"" // string, contains strings lol

function namedFunction(parameter1, paramter2){
  return;
}

const anotherNamedFunction = () => {
  return;
}


```
- Equal signs and comparision operators
  - `=` assignment 
    - `x = 5  // returns true`
  - `==` equality 
    - `5 == '5'  // returns true`
  - `===` equality and type (strict equality) 
    - `5 === 5  // returns true`
  - `!=` not equal
    - `5 != 0 // returns true`
  - `!==` strictly not equal
    - `5 !== '5' // returns true
  - And JS has the other common comparision operators like less than `<`, less than or equal to `<=`, greater than `>`, greater than or equal to `>=` 
  - These all can be changed together with `&&` (and) or `||` (or)




- Shorthand mathematical functions

```
variableName++;
```

```
variableName += 5;
variableName /= 5;

```

- Length and indices
```
variableName.length; // returns length
```


```
variableName[0]; // indexing starts at 0
```



- Returning index based on other information
```
let lastName = "Lovelace";
let lastLetterOfLastName = lastName[lastName.length - 1]; 
```

- For loops
  - Note, keyword `return` cannot be used in for loops


```

for (let i = 0; i < 20; i++){
  console.log(i); // "returns" 
}


```

- If statements
```
function trueOrFalse(wasThatTrue) {
  if(wasThatTrue === true){
    return "Yes, that was true"
  }else{
    return "No, that was false"
  }

// can also be written without the explicitly declairing the else
const trueOrFalse = (wasThatTrue) => {
  if(wasThatTrue === true){
    return "Yes, that was true"
  }
    return "No, that was false"
}


// with else if
function testElseIf(val) {
  if (val > 10) {
    return "Greater than 10";
  }else if(val < 5) {
    return "Smaller than 5";
  } else {
  return "Between 5 and 10";
  }
};

testElseIf(7);
```

- Ternary operator
  - Shortcut for if/else statements
  - Very similar to an if/else statment or a switch statement, but nicer for quick inline conditional checking
  - Syntax
    - `condition ? statementIfTrue : statementIfFalse`

```JS
function checkEqual(a, b) {
  return a === b ? "Equal" : "Not Equal"
}

checkEqual(1, 2);


// chaining ternary operators
function checkSign(num) {
  return num > 0 ? "positive" 
    : num < 0 ? "negative"
    : "zero";
}

checkSign(10);
```

```JS
// you can't use if/else in anonymous arrow functions, so these are the same

this.forEach(function (element) {if(callback(element) === true) newArray.push(element)})

// ES6
this.forEach(element => callback(element) ? newArray.push(element):false);
  
```


- Switch statements
```
function caseInSwitch(val) {
  var answer = "";
  // note how the switch statement is in a single block
  switch(val){
    case 1:
      answer = "alpha";
      break; // ends the statement if case is found
    case 2:
      answer = "beta";
      break;
    case 3:
      answer = "gamma";
      break;
    case 4:
      answer = "delta";
      break;
    
    // multiple cases having same return
    case 5:
    case 6:
    case 7:
      answer = "fiver"
      break;

    // called if none of the other cases are called
    default:
    answer = "stuff";
    break;
  } 
  return answer;
}

console.log(caseInSwitch(1));

```

- Using the strict equality operator to negate using for loops (since equality operators always return a boolean)
```
function isStrictlyEqual(a, b) {
  // if (a === b) {
  //   return true;
  // } else {
  //   return false;
  // }
  return a === b;
}
```

- Card counting function with switch and if else statements. (Having more high cards in the deck favors the card counter)
```
var count = 0;

// card takes a string or int
function cc(card) {
  switch (card){
    case 2:
    case 3:
    case 4:
    case 5:
    case 6:
      count += 1;
      break;
    case 7:
    case 8:
    case 9:
      break;
    case 10:
    case 'J':
    case 'Q':
    case 'K':
    case 'A':
      count -= 1;
      break;
  }

  if (count <= 0){
    return count + " Hold";
  }else{
    return count + " Bet"
  }
}

cc(2); cc(3); cc(7); cc('K'); cc('A');

```

- Functions
  - Lots of different ways to make functions in javascript, most upto date ES6 (although 7 just dropped apparently) is to use `const` with `=>` (an arrow function)

```

// these are the same 

function functionName(x){
  return x * 2;
}

// ES6 arrow function
const functionName = (x) =>{
  return x * 2;
}

//  arrow function with a set default for x (meaning if nothing is passed)
const functionName = (x = 10) =>{
  return x * 2;
}


// Functions that have no body, can be written completely inline with arrow functions
const functionName = (x) => x * 2;

// if a function only takes one argument, the parantheses can be dropped - but 
const functionName = x => x *;


// calling the function
functionName();
```


- Object literals, think of it like the oposite of deconstructing an object
```
const getXY = (x, y) => ({
  x: x,
  y: y
})

const getAnotherXY = (x, y) => {x:y}

```

- Rewriting a function inside of an object
```
const bicycle1 = {
  gear: 2,
  setGear: function(newGear) {
    this.gear = newGear;
  }
};
bicycle1.setGeaobjectr(3);
console.log(bicycle1.gear);

const bicycle2 = {
  gear: 2,
  setGear(newGear) {
    this.gear = newGear;
  }
};
// changes the gear property to 3
bicycle2.setGear(3);
console.log(bicycle2.gear);
```


- Objects (has maps, aka dictionaries). Takes properties (or key value pairs)
  - interestly, even if you initialize the object with a const, it's still mutable
```
const anObject = {
  "an entree": "hamburger",
  "my side": "veggies",
  "the drink": "water",
  waiter: "cute"
};


// grabbing the values from keys
const entreeValue = anObject["an entree"];   
const drinkValue = anObject["the drink"]
const waiterValue = anObject.waiter;    


// adding new keys and values
anObject.place = "Chilis";
anObject['happy day?'] = true;

// removing a property
delete anObject["an entree"];
```

- Chaining dot and bracket notation to select nested propery of an object
```
const myStorage = {
  "car": {
    "inside": {
      "glove box": "maps",
      "passenger seat": "crumbs"
     },
    "outside": {
      "trunk": "jack"
    }
  }
};

const gloveBoxContents = myStorage.car.inside["glove box"];

```



- Looping over an object to return a property and value pair (if it exists)
```
// Setup
var contacts = [
    {
        "firstName": "Akira",
        "lastName": "Laine",
        "number": "0543236543",
        "likes": ["Pizza", "Coding", "Brownie Points"]
    },
    {
        "firstName": "Harry",
        "lastName": "Potter",
        "number": "0994372684",
        "likes": ["Hogwarts", "Magic", "Hagrid"]
    },
    {
        "firstName": "Sherlock",
        "lastName": "Holmes",
        "number": "0487345643",
        "likes": ["Intriguing Cases", "Violin"]
    },
    {
        "firstName": "Kristian",
        "lastName": "Vos",
        "number": "unknown",
        "likes": ["JavaScript", "Gaming", "Foxes"]
    }
];

const lookUpProfile = (name, prop) => {
    //  looping over the indexes of the nested array
    for (let i = 0; i < contacts.length; i++){
        // checking to see if one of the properties has the passed value
        if (contacts[i].firstName === name){
            // checking to make sure the property exists if the firstName exists
            if(prop in contacts[i]){
                return contacts[i][prop]

            } else {
                // property failed
                return "No such property";
            }
        }
    }
    // if the firstName fails, the loop breaks
    return "No such contact"
}
``` 

























## `this`
- `.bind(this)`

[MDN docs on bind method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)




















## Classes
  - Technically classes aren't robust like they are in Python or C, 

- Class with a getter, setter and constructor, converting fahrenheit to celsuis and back 
```
class Thermostat {
  constructor(fahrenheit) {
    this.fahrenheit = fahrenheit;
  }
  
  get temperature() {
    return (5 / 9) * (this.fahrenheit - 32);
  }
  
  set temperature(celsius) {
    this.fahrenheit = (celsius * 9.0) / 5 + 32;
  }
}

const thermos = new Thermostat(76); // Setting in Fahrenheit scale
let temp = thermos.temperature; // 24.44 in Celsius
thermos.temperature = 26;
temp = thermos.temperature; // 26 in Celsius
```

# Refactor Me!
- Inheritance
"In JavaScript, super refers to the parent class constructor. (In our example, it points to the React.Component implementation.)
Importantly, you can’t use this in a constructor until after you’ve called the parent constructor. JavaScript won’t let you:"

[MDN super](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/super)





























## While and Do While loops
```


```


































## Recursion (replacing for loops with a function that calls itself)
```

function multiply(arr, n)

function sum(arr, n) {
  if(n <= 0){
    return 0
  }else{
    return sum(arr, n -1) + arr[n -1];
  }
}

function countdown(n){
  if (n < 1){ // less than one to stop the countdown at 1
    return [];
  } else{
    const countDownArray = countdown(n -1);
    countDownArray.unshift(n);
    return countDownArray
  }
  return;
}


// using recursion (3 different ways) to return a range beween two numbers (inclusive)
function rangeOfNumbers(startNum, endNum) {
  if (endNum - startNum === 0) {
    return [startNum];
  } else {
    var numbers = rangeOfNumbers(startNum, endNum - 1);
    numbers.push(endNum);
    return numbers;
  }
}



function rangeOfNumbers(startNum, endNum) {
  return startNum === endNum
    ? [startNum]
    : rangeOfNumbers(startNum, endNum - 1).concat(endNum);
}


function rangeOfNumbers(startNum, endNum) {
  return startNum === endNum
    ? [startNum]
    : [...rangeOfNumbers(startNum, endNum - 1), endNum ];
}

console.log(countdown(10));
```






























## DOM (Document Object Model)
- The DOM is the model of the html structure of the website. With altering the dom, javascript can make elements (<h1>, <li>, ect) dynamic


- Simple example of the dom being referenced with event listeners
```
// once the page loads, run
document.addEventListener('DOMContentLoaded', function()
{
	// grabbing the parent element
	document.getElementIdBy('desiredElementId').onclick = function()
	{
		// grabbing the first elelemnt in the class
		document.getElementsByClassName('desiredElementsClass')[0].textContext = "This changes the text of this first element in the desired class"
		
	}
}

```




## Promises
- From MDN "a promise is a proxy for a value not necessarily known when the promise is created". In other words, it's a placeholder for when the asyncronous call will return
- Do something once the promise is fullfilled, usually asynchronously
- Use promises when something takes an unknown amount of time to fullfill like a api/server call (this will require asynchronous code)
- It's a class, so every promise is an instance of that class, instantiate new promises with the syntax `new Promise()`
- Promises have three states
	- pending (initial state)
	- fulfilled (returned)
	- rejected (failed)	



- Promise breakdown
```

const makeServerRequest = new Promise((resolve, reject) => {
  // responseFromServer just represents a response from a server, for educational purposes
  let responseFromServer;
    

  if(responseFromServer) {
    // if true, here's what "resolves"
    resolve("We got the data!")
  } else {  
    // if false, here's what gets "rejected"
    reject("Data not received :( ")
  }
})

makeServerRequest
.then(result => {console.log(result);})  // then only is called once the promise is resolved/fullfilled
.catch(error => console.log(error)); // catch only is called once the promise is rejected

/** the variable names 'result' and 'error' here are arbitrary, but standard practice */

```

- Example using fetch() requesting some json data, and writing it in a string to the html page

```
document.addEventListener('DOMContentLoaded',function(){
    document.getElementById('getMessage').onclick = () => {
      // fetch() returns a promise, once it is fullfilled, then something can happen
      fetch('/json/cats.json')
        .then(response => response.json())
        .then(data => {
            document.getElementById('message').innerHTML = JSON.stringify(data)
        })
    };
  });
```






























## Importing Code
- When importing, if you're importing a specific module, make sure to put the module in {}
	- If you're importing the main library, don't put it in the {}
```
import React, {Component} from "react";

```
- The path needs to be explicityly declared
```
// note the path, same directory
import {function1, function2} from "./_functions.js";  

function1("arrrggg");
function2("arrrgggss");

```

- importing defaults does not need brackets around the import
```
import defaultFunct from "./_defaultFunctions.js";
defaultFunct("arrggg");
```

- Using single or double quotes matters, based on the library, just pick one and be consistent


## Exporting code

```
const uppercaseString = (string) => {
  return string.toUpperCase();
}

const lowercaseString = (string) => {
  return string.toLowerCase()
}


export {uppercaseString, lowercaseString};
```

- Adding a "fall back" default, usually only used when one value is being exported
```
export function subtract(x, y) {
  return x - y;
}


export default function(x, y){
  return x - y;
}
```



























## Bebugging
- Getting a `Uncaught ReferenceError: d3 is not defined at pen.js:11` (this example is for CodePen). Check your cookie privilages. Allow some cookies for the site to grab the d3 from d3js.org in this example
```
<!--ie allow this traffic to happen-->
<script src="http://d3js.org/d3.v3.min.js" charset="utf-8"></script>

```

- `use strict;` is your best friend until you start using typescript

- Use `console.log()` to help with debugging, `console.clear()` will clear up the screen, wherever you place it

- Use `typeof` to check the types of the objects you're dealing with _note the syntax_
```
let x = 5;
ley y = '6';

console.log(typeof x); // returns number
console.log(typeof y); // return string
```

- When testing, you need to export your functions/ect, so if you use a function locally, make sure to declare the function, and then export it at the bottom of the module/file. (If you don't use it locally, with node, you can declare the function with exports.functionName = () => {} which is uggly, but is something you might read some day) 

- When installing a new package/library/module with npm, you can pick where it's saved with flags. For instance, we don't want our testng suite to be pushed to the client/server (most likely), so use the `--save-dev` flag to save it to the development package.json 


- Timing functions to see performance (example from stackoverflow)
```
let t0 = performance.now()

doSomething()   // <---- The function you're measuring time for 

let t1 = performance.now()
console.log("Call to doSomething took " + (t1 - t0) + " milliseconds.")

```





































## FreeCodeCamp and other random examples

- Updating an object/hash map/dictionary
```
var collection = {
  2548: {
    album: "Slippery When Wet",
    artist: "Bon Jovi",
    tracks: [
      "Let It Rock",
      "You Give Love a Bad Name"
    ]
  },
  2468: {
    album: "1999",
    artist: "Prince",
    tracks: [
      "1999",
      "Little Red Corvette"
    ]
  },
  1245: {
    artist: "Robert Palmer",
    tracks: [ ]
  },
  5439: {
    album: "ABBA Gold"
  }
};

// Only change code below this line
function updateRecords(id, prop, value) {

  if (value === ""){
    delete collection[id][prop];
  }else if (prop === "tracks"){
    // javascript returns the value if it exists, if not returns an empty array
    collection[id][prop] = collection[id][prop] || [];
    collection[id][prop].push(value); // does not work when passing an array, only a string
  }else if (prop !== "tracks"){
     collection[id][prop] = value;
  }



  return collection;
}

```


- Solution to JS not have a randRange() function
```
// returns a random number between the range (myMin, myMax) inclusive
function randomRange(myMin, myMax) {
  return Math.floor(Math.random() * (myMax - myMin + 1) + myMin);
}

```

- Converting a binary to a number
```
// parseInt(whatToParse, radixToParseBy) binary in this example, but goes from 2 and 36
function convertToInteger(str) {
  return parseInt(str, 2)
}

convertToInteger("10011");

```


- Destructuring, wtf? why don't we have to declare the newly built array (the combination of two variables)?
  - This is probably because variables are objects and arrays also contain objects (most things are objects in JS)
```
let a = 8, b = 6;
// array not declared by var, let or const?
[a, b] = [b, a];

console.log(b); // 8
console.log(a); // 6
```




- Returning a user's gps location and rendering it to their screen
```
<script>
  // making sure the geolocation object exists
  if (navigator.geolocation)
  {
    navigator.geolocation.getCurrentPosition((position) => 
    {
      document.getElementById('data').innerHTML="latitude: " + position.coords.latitude + "<br>longitude: " + position.coords.longitude;
    })
  }

  // Add your code above this line
</script>
<h4>You are here:</h4>
<div id="data">

</div>

```

- Buiding 2d tensors

```
function zeroArray(m, n) {
  // Creates a 2-D array with m rows and n columns of zeroes
  let newArray = [];
  let row = [];
  // let columns = [];
  for (let i = 0; i < m; i++) {
    // Adds the m-th row into newArray
    // Pushes the current row, which now has n zeroes in it, to the array
    newArray.push(row);
  }
   // building the columns
    for (let j = 0; j < n; j++) {
      // Pushes n zeroes into the current row to create the columns
      row.push(0);
    }
  return newArray;
}

let matrix = zeroArray(3, 2);
console.log(matrix);

```


- Copying with spread operator (medium article)

```
const array = ['😉','😊','😇']
const copyWithEquals = array // Changes to array will change copyWithEquals
const copyWithSpread = [...array] // Changes to array will not change copyWithSpread

array[0] = '😡' // Whoops, a bug

console.log(...array) // 😡 😊 😇
console.log(...copyWithEquals) // 😡 😊 😇
console.log(...copyWithSpread) // 😉 😊 😇
```
 

- push and unshift example (freecodecamp)
```
function mixedNumbers(arr) {
  arr.unshift('I', 2, 'three') // inserts into the beginning
  arr.push(7, 'VIII', 9) // appends to the end
  return arr;
}

console.log(mixedNumbers(['IV', 5, 'six'])); // returns [ 'I', 2, 'three', 'IV', 5, 'six', 7, 'VIII', 9 ]

```

- pop and shift example (freecodecamp) 
```
function popShift(arr) {
  let popped = arr.pop(); // drops and returns the last value
  let shifted = arr.shift(); // drops and returns the first value
  return [shifted, popped];
}

console.log(popShift(['challenge', 'is', 'not', 'complete'])); 
// returns ["challenge",  "complete"] because we're returning the values of .pop() and .shift() not the value of the mutated array

```

- splice freecodecamp example
```

const arr = [2, 4, 5, 1, 7, 5, 2, 1];
// just removing items, starting at index 1 and going to index 4
arr.splice(1, 4)
console.log(arr); // returns elements [2, 5, 2, 1]

function htmlColorNames(arr) {
  // removing and replacing indexes 0 and 1
  arr.splice(0,2, 'DarkSalmon', 'BlanchedAlmond') 
  return arr;
}

console.log(htmlColorNames(['DarkGoldenRod', 'WhiteSmoke', 'LavenderBlush', 'PaleTurquoise', 'FireBrick']));

```

- Copying arrays with spread operator and push (freecodecamp)
```
function copyMachine(arr, numberOfDesiredCopies) {
  let newArr = [];
  while (numberOfDesiredCopies >= 1) {
    newArr.push([...arr]); // appends the array copy (with spread operator) to the newArr
    numberOfDesiredCopies--;
  }
  return newArr;
}


console.log(copyMachine([true, false, true], 2));

```

- Using spread operator to copy arrays into other arrays (freecodecamp)
```
function spreadOut() {
  let fragment = ['to', 'code'];
  let sentence = ["learning", ...fragment, "is", "fun"]; 
  return sentence;
}

console.log(spreadOut()); // returns [ 'learning', 'to', 'code', 'is', 'fun' ]

```

- Using .indexOf() to filter out nested arrays (freecodecamp)
```
function filtersNestedArray(arr, elem) {
  let newArr = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].indexOf(elem) == -1) { // meaning the nested array doesn't have te element
      newArr.push(arr[i]);
    } else {
      console.log(arr[i]) // logs all of the nested arrays that contain that element
    }

  }
  return newArr;
};

console.log(filteredArray([[3, 2, 3], [1, 6, 3], [3, 13, 26], [19, 3, 9]], 9));
// returns [ [ 3, 2, 3 ], [ 1, 6, 3 ], [ 3, 13, 26 ] ]
// logs [ 19, 3, 9 ] (because it contained a 9)

```


- Nesting arrays example (freecodecamp)
```
let myNestedArray = [ // "first" layer, first index when indexing

  "1st layer",

  ['2nd layer', false, 1, 2, 3, 'complex', 'nested'],

  [
    ["3rd layer", "deep", 'shift', 6, 7, 1000, 'method'],
  ],
  [
    [
      ["4th layer", "deeper", 'concat', false, true, 'spread', 'array'],
      ['mutate', 1327.98, 'splice', 'slice', 'push'],
    ]
  ],
  [
    [
      [
        ["5th layer", "deepest", 'iterate', 1.3849, 7, '8.4876', 'arbitrary', 'depth']
      ]
    ]
  ]
  // Only change code above this line
];


console.log(myNestedArray[2][0][0]) // returns the string "3rd layer"

console.log(myNestedArray[4][0]) // returns the entire array starting with "5th layer"

console.log(myNestedArray[4][0][0][0][0]) // returns just the string "5th layer"
```


- updated nested arrays with dot notation (freecodecamp)
```
let userActivity = {
  id: 23894201352,
  date: 'January 1, 2017',
  data: {
    totalUsers: 51,
    online: 42
  }
};


userActivity.data.online = 45;

console.log(userActivity);

```