- When importing, if you're importing a specific module, make sure to put the module in {}
	- If you're importing the main library, don't put it in the {}
```
import React, {Component} from "react";

```

- Using single or double quotes matters, based on the library, just pick one and be consistent



- `var` vs `const` vs `let`
	- __var__ allows the initialization of a variable without instantiating it with data
		- can be overridden
		- easily mutable
		- but you cannot change a single index in if referenced from the varaible itself
	- __const__ forces the variable to not
		- can't be overriden from instantiating (has to have data upon initialization)
		- not easily immutable
	- __let__ is nearly identical to var minus it has to be instantiated with data when initializede

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

- Strings are immutable
# Arrays
  - Mutable
  - Indexable
  - Functions
    - `{array}.push({element})` appends an element to the end of the array
    - `{array}.unshift({element})` appends an element to the beginning on an array
     -`{array}.pop()` removes the final element in an array and returns said element
     - `{array}.shift()` removes the first element in an array and returns said element


- Spread operator `...`
	- This handy tool allows for dynamic placing of
		- Meanign less boiler code and more abstraction


- All variables and customer functions are global by default
	- Note, in node, they are not "global" by default, they are local to the file 


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
{} // object, contains key:value pairs of any data type
"" // string, contains strings lol

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


- Functions
  - Lots of different ways to make functions in javascript, most upto date ES6 (although 7 just dropped apparently) is to use `const` with `=>` (an arrow function)

```

// these are the same 

function functionName(x){
  return x;
}

const functionName = (x) =>{
  return x;
}

// calling the function
functionName();
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
