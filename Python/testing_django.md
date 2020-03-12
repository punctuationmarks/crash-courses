# Using TestCase

- If you want a more verbose test failure, you can pass along a string in the assert statement
	- This has the added benefit of knowing where the test failed and how 
	_if you have the foresight of understanding how the test will fail in the first place_

```
self.assertTrue(any(row.text == "Become an ultra learner" for row in rows),
	  "New note did not appear in table")
```
	_if this fails, this will return:_
```
Traceback (most recent call last):
  File "functional_tests.py", line 61, in test_can_create_new_crud_obj_and_retrieve_it_later
    "New note did not appear in table")
AssertionError: False is not true : New note did not appear in table

```


# Alternative (from default) test setup
	- Imediate benefits:
		- Tests fail louder and more verbose
		- Tests will help you write the code (did you forget syntax? it'll help out)
		- You don't need to call migrations on the actual app right at start
			- since everything is tested in a db that is in memory and then destroyed
	- Downsides
		- If you use print to debug your tests, you'll need to still import TestCase from django.test
			_Some reason py.test will not allow you to print()_
		- Not fully explored, but since we're making a child class of the TestCase class, there _might_ be side effects when running py.test
		- Alternatively (if you're worried about unknown side effects), you could make a psuedo class that inherits TestCase, 
			and debug your tests there (e.g. I can't remember, is it called .url from response or .context['PATH_INFO'] ?)
- Install requirements:
	_more verbose testing than standard django_
	- pytest
	_to view the tests in html form_
	- pytest-cov
	_pytest for django_
	- pytest-django
	_for psuedo data for testing_
	- mixer

- With this setup though you'll need to set up the following files:
_note, white spacing is important, if you have a failing error, start there_

	- projectName/projectName/test_settings.py:

```
from .settings import *
DATABASES = {
	"default": {
	"ENGINE": "django.db.backends.sqlite3",
	"NAME": ":memory:",
		}
	}
EMAIL_BACKEND = 'django.core.mail.backends.locmem.EmailBackend'

```


	- projectName/pytest.ini

```
[pytest]
DJANGO_SETTINGS_MODULE = projectName.test_settings
addopts = --nomigrations --cov=. --cov-report=html

```

	- projectName/.coveragerc
```
[run]
omit =
 *apps.py,
 *migrations/*,
 *settings*,
 *tests/*,
 *urls.py,
 *wsgi.py,
 manage.py

```















```
>>> from django.test.utils import setup_test_environment
>>> # installs a template renderer, allowing examinaton of additional attributes
>>> # on the response
>>> setup_test_environment()


>>> from django.test import Client
>>> # creating an instance of Client
>>> client = Client()
>>> # ensuring we get a response from "/"
>>> # we already know this should be 400 since there is no root index page
>>> response = client.get("/")
Not Found: /
>>> response.status_code
404
>>> # seeing what the response of "/polls" is
>>> from django.urls import reverse
>>> response = client.get(reverse('polls:index'))
>>> response.status_code
200
>>> #this returns the raw html
>>> response.content
b'<div>\n    \n    <ul>\n        \n        
<!-- This is the pages' html, ect -->\n       

>>> # this returns the object of the class
>>> response.context['latest_questions'] 

```
