# House keeeping
- When importing, if you're importing a specific module, make sure to put the module in {}
	- If you're importing the main library, don't put it in the {}
```
import React, {Component} from "react";

```

- Using single or double quotes matters, based on the library, just pick one and be consistent

- All variables and functions are global by default
	- Note, in node, they are not "global" by default, but they are locally global to the file 

- Adding `"use strict";` at the top of a .js file enables "Strict Mode" which catches common mistakes and unsafe actions
  - This can also be used inside of a function if only needed strict mode in a localized area


- Rest parameter `...` passed in functions
  - Allows for a variable number of _parameters_ to be passed, think of *args, **kwargs in python

```
const sum = (...args) => args.reduce((a, b) => a + b, 0);
```

- Spread operator `...`
	- This handy tool allows for dynamic spreading of _arguments_ that get passed to a function
		- Meanign less boiler plate code and more abstraction
```
let arr = [1, 10, 20, 30];
let max_value = Math.max.apply(null, arr) // have to pass null because apply() expects individual items separated by commas, returns 30

let max_value_spread = Math.max.apply(..arr) // deconstructs each element and passes them one by one


// using the spread operator to copy all of the contents of an array
const arr1 = ['JAN', 'FEB', 'MAR', 'APR', 'MAY'];
let arr2;

arr2 = [...arr1];
```

- Destructoring an object
  - Quick way to get values from properties/keys in an obect
  - Also does the same with arrays
  - Note, the variable names must == the properies or being explicityly declared 
```
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

- Object literals, think of it like the oposite of deconstructing an object
```
const getXY = (x, y) => ({
  x: x,
  y: y
})

const getAnotherXY = (x, y) => {x:y}

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

# Arrays
  - Mutable
  - Indexable
  - Functions
    - `{array}.push({element})` appends an element to the end of the array
    - `{array}.unshift({element})` appends an element to the beginning on an array
     -`{array}.pop()` removes the final element in an array and returns said element
     - `{array}.shift()` removes the first element in an array and returns said element





# Scope
- Global Scope
  - Variables instatiated outside of a function 
- Local Scope/Function Scope
  - Variables instatiated inside of a function
  - Buuuut if you forget to declare `var` before stating a variable's value, then that variable will be global
  - Can also allow for the use of a locally scoped variable with the same name as a globally scoped variable


# Sytntax notes


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
  - Note, return cannot be used in for loops


```

for (let i = 0; i < 20; i++){
  console.log(i); // returns 
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

- Rewriting a function inside of an object
```
const bicycle1 = {
  gear: 2,
  setGear: function(newGear) {
    this.gear = newGear;
  }
};
bicycle1.setGear(3);
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


- Obbjects (has maps, aka dictionaries). Takes properties (or key value pairs)
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
anObject.hasOwnProperty("waiter"); // true
anObject.hasOwnProperty("billy goat"); // false
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


# While and Do While loops
```


```


# Recursion (replacing for loops with a function that calls itself)
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

# Ternary Operator `? :`
- Very similar to an if/else statment or a switch statement, but nicer for quick inline conditional checking
  - Syntax
    - `condition ? statementIfTrue : statementIfFalse`

```
function checkEqual(a, b) {
  return a === b ? "Equal" : "Not Equal"
}

checkEqual(1, 2);


// chaining operators
function checkSign(num) {
  return num > 0 ? "positive" 
    : num < 0 ? "negative"
    : "zero";
}

checkSign(10);


```

# DOM (Document Object Model)
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




# Promises
- From MDN "a promise is a proxy for a value not necessarily known when the promise is created". In other words, it's a placeholder for when the asyncronous call will return
- Promises have three states
	- pending (initial state)
	- fulfilled (returned)
	- rejected (failed)	



- Simple example from requesting some json data
```
document.addEventListener('DOMContentLoaded',function(){
    document.getElementById('getMessage').onclick= () => {
      // fetch() returns a promise, once it is fullfilled, then something can happen
      fetch('/json/cats.json')
        .then(response => response.json())
        .then(data => {
            document.getElementById('message').innerHTML = JSON.stringify(data)
        })
    };
  });
```



# Returning a user's gps location and rendering it to their screen
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




# Bebugging
- Getting a `Uncaught ReferenceError: d3 is not defined at pen.js:11` (this example is for CodePen). Check your cookie privilages. Allow some cookies for the site to grab the d3 from d3js.org in this example
```
<!--ie allow this traffic to happen-->
<script src="http://d3js.org/d3.v3.min.js" charset="utf-8"></script>

```







# FreeCodeCamp Examples

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
```
let a = 8, b = 6;
// array not declared by var, let or const?
[a, b] = [b, a];

console.log(b); // 8
console.log(a); // 6
```