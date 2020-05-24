# Types of tests

- Unit tests
Verify functional behavior of individual components, often to class and function level. It's testing the individual unit of code. Write tons of these. 
- Functional tests
Simulate how a user would actually use your program, i.e. using Selenium to spin up a browser
and test a Django web app
- Regression tests
Tests that reproduce historic bugs. Each test is initially run to verify that the bug has been fixed, and then re-run to ensure that it has not been reintroduced following later changes to the code.
- Integration tests
Verify how groupings of components work when used together. Integration tests are aware of the required interactions between components, but not necessarily of the internal operations of each component. They may cover simple groupings of components through to the whole app. An example is a function that calls another funtion.
- End-to-end tests/UI tests
For web development it's like validating the dom has been changed. 


- _Note_: Other common types of tests include black box, white box, manual, automated, canary, smoke, conformance, acceptance, functional, system, performance, load, and stress tests. Look them up for more information.




## Things to note when testing

- Only run functional tests once all unit tests are passing
- Run tests specifically (e.g. in Django `python3 manage.py test APPNAME`)
- And then when passing you can run everything to ensure it all functions
- Test only your code, not the library
- Assume that any libraries you are using have been tested,
        (and perhaps try only use libraries that have been thoroughly tested)


- Get in the mindset of writing failing failing tests and  then getting back up to fix the  code, i.e.  passing "silly" requests to ensure tests fail is a common trope in TDD



- 'Red, green, refactor'
	- Write a failing test
	- Write the code for the test to pass
	- Then refactor to make the code more effecient

## Unit Tests

- Typcally follow this strucutre:
	-Setup 
	- Exercise
	- Assert

- Should test one thing and one thing only
	- E.g. if you're testing a POST request
		- Test the POST went through
		- Test the redirect happened
		- Test the data persisted onto the page

- Imports matter
	- Meaning, double check paths, sometimes the paths are relative from root directory

- The testing environment needs to be learned
    - for instance
         When testing a Django project, you'll need to either use or delete the starter test.py file.
	Meaning, you can't leave the built in test.py file if you intend on breaking up your tests into 
	tests for models, views, forms, ect in a app/tests/{__init__.py, test_models.py, test_views.py}
	form, then make sure to delete the original tests.py file that comes when the app is initialized



# Tools (read as "concepts") while testing

- Test Runner
Executes the tests, summarizies the results, and gives ouput. For Javascript, there's Mocha, Jest is a solution that is both a test runner and an assertion library

- Assertion Library
Allows the defining fo testing logic, defining "expectations". For Javascript, there's Chai

- Headless Browser (for web development)
Used for accessing the DOM without doing manual tests. For Javascript, Puppeteer is used for this

- Explicit Waits
These are pauses in your functional tests, i.e. sleep timers for the functional test to actually run. 
They can be used while imitating input by a user, adding an explicit wait while the page loads. But
explicit waits also allow you to see if the language or framework has something to say as well
i.e. if you are using Django and have debug set to True, then Django might be able to tell you something 
in the functional test e.g. "Hey, you forgot to add a cross-site-request-forgery token", which 
might not (read as "doesn't for some frameworks") show up in the failing test logs. 

	
	
_Note_: Know your framework, language, whatever. Sometimes there are tools built into the framework
for testing, e.g. LiveServerTestCase for functional tests with Django)
