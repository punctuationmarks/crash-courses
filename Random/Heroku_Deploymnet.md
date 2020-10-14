## Deploying Django on Heroku

Create [Heroku](https://www.heroku.com) login and install the CLI [here](https://devcenter.heroku.com/articles/heroku-cli)

Test the heroku cli is working in the terminal 
```
$ heroku
```

Inside your project and virtual environment, install gunicorn (remember to add to your requirements.txt)

```
$ pip install gunicorn
```

Use git inside your applicaton,

Initialize

```
$ git init
```


Create a .gitignore file


git add all the file (minus the .gitignore)

```
$ git add -A
```

Then commit

```
$ git commit -m "committing"
```

ONLY after you initialize git in your program can you try to build a heroku app

```
$ heroku create APPNAME
```

It'll give you a url or you can run `heroku open` to open the site in the browser



Once you verify the heroku site is working, then push your code to heroku

```
$ git push heroku master
```

if pushing Django, make sure to set your static files in settings.py:

```
STATIC_ROOT to os.path(BASE_DIR, 'staticfiles') 
```

(Remember Django handles static files differently in production, and this is the way heroku handles Django)

Next, add the heroku app to the ALLOWED_HOSTS in settings.py

```
ALLOWED_HOSTS = ['DJANGO_APP_NAME.herokuapp.com']
```


While in settings.py, make sure to have your secret variables set to environment 
variables (if you haven't already). Next, configure the secret keys to heroku

```
heroku config: set SECRET_KEY="ASDLKFJALSDJKFLAJKSDF"
``` 

*this can be kept on "True" until you're ready for poduction*
```
heroku config: set DEBUG_VALUE="True"
``` 

Create a Procfile (with no extension)
(wsgi stands for web service gateway interface)


```
web: gunicorn DJANGO_APP_NAME.wsgi

```


Heroku uses postgresql as a defualt database, so use that. Check to see if it's already built for you with 
```
$ heroku addons
```

		If it's not built already, you can add it on with (hobby-dev is the
		free version): 

		```
		$ heroku addons:create heroku-postgresql:hobby-dev
		```

		For more info on the postgresql db
		```
		$ heroku pg
		```

Add a helper library for Django and Heroku, which automatically connects the database and also helps connect the wsgi to gunicorn with a package called "whitenoise"

```
$ pip install django-heroku

```

Then back in the settings.py file, add to the very bottom:

```
django_heroku.settings(locals())
```
 
 ## Don't forget to update your requirements.txt file with new dependencies! (also pushing to Heroku)
 
 
 Next, create the database, through Django and Heroku
 (`heroku run` will allow you to run scripts, or you can run `heroku run bash` which will give you a linux bash shell)
 
 ```
 heroku run python manage.py migrate
 
 ```
 
 ```
 heroku run python manage.py createsuperuser
 
 ```


And lastly (after creating the db and user), push it to Heroku and test it.


### Note:
If it has any errors, run the command the site tells you. for instance:

```
$ heroku logs --tail
```


