# Django Tips and Reminders

- Starting new project 
```
$ python3 -m venv venv
$ source venv/bin/activate
(venv) $ pip3 install django
Collecting django
  Using cached https://files.pythonhosted.org/packages/55/d1/8ade70e65fa157e1903fe4078305ca53b6819ab212d9fbbe5755afc8ea2e/Django-3.0.2-py3-none-any.whl
Collecting pytz (from django)
  Using cached https://files.pythonhosted.org/packages/e7/f9/f0b53f88060247251bf481fa6ea62cd0d25bf1b11a87888e53ce5b7c8ad2/pytz-2019.3-py2.py3-none-any.whl
Collecting sqlparse>=0.2.2 (from django)
  Using cached https://files.pythonhosted.org/packages/ef/53/900f7d2a54557c6a37886585a91336520e5539e3ae2423ff1102daf4f3a7/sqlparse-0.3.0-py2.py3-none-any.whl
Collecting asgiref~=3.2 (from django)
  Using cached https://files.pythonhosted.org/packages/a5/cb/5a235b605a9753ebcb2730c75e610fb51c8cab3f01230080a8229fa36adb/asgiref-3.2.3-py2.py3-none-any.whl
Installing collected packages: pytz, sqlparse, asgiref, django
Successfully installed asgiref-3.2.3 django-3.0.2 pytz-2019.3 sqlparse-0.3.0
(venv) $ python3 -m django --version
3.0.2
(venv) $ django-admin startproject DjangoDocsTut
(venv) $ cd DjangoDocsTut/
(venv) $ python3 manage.py runserver
Watching for file changes with StatReloader
Performing system checks...

System check identified no issues (0 silenced).

You have 17 unapplied migration(s). Your project may not work properly until you apply the migrations for app(s): admin, auth, contenttypes, sessions.
Run 'python manage.py migrate' to apply them.

January 19, 2020 - 20:42:17
Django version 3.0.2, using settings 'DjangoDocsTut.settings'
Starting development server at http://127.0.0.1:8000/
Quit the server with CONTROL-C.
[19/Jan/2020 20:42:53] "GET / HTTP/1.1" 200 16351
[19/Jan/2020 20:42:53] "GET /static/admin/css/fonts.css HTTP/1.1" 200 423
[19/Jan/2020 20:42:53] "GET /static/admin/fonts/Roboto-Regular-webfont.woff HTTP/1.1" 200 85876
[19/Jan/2020 20:42:53] "GET /static/admin/fonts/Roboto-Bold-webfont.woff HTTP/1.1" 200 86184
[19/Jan/2020 20:42:53] "GET /static/admin/fonts/Roboto-Light-webfont.woff HTTP/1.1" 200 85692
Not Found: /favicon.ico
[19/Jan/2020 20:42:53] "GET /favicon.ico HTTP/1.1" 404 1979
```

- Starting new app in project
```
(venv) $ pyon3 manage.py startapp encuestas_de_votacion

```

- If you want to star your project in the same directory that you're currently in 
	_without having the nested ProjectName/ProjectName_

```
$ django-admin startproject PROJECT_NAME .
```

### Thoughts on the admin page
- It's built to be used in house, not to the public. If you do need a public facing login 
	and backend, make it custom to your app


- Want to see how the migrations are actually being written in SQL?
```
(venv) punctuationmarks@ddoublespeak:~/Projects/Classes/Django/DjangoDocsTutorial/DjangoDocsTut$ python3 manage.py sqlmigrate encuestas_de_votacion 0001
BEGIN;
--
-- Create model Pregunta
--
CREATE TABLE "encuestas_de_votacion_pregunta" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "pregunta_escrito" varchar(200) NOT NULL, "publicacion_fecha" datetime NOT NULL);
--
-- Create model Eleccion
--
CREATE TABLE "encuestas_de_votacion_eleccion" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "eleccion_escrito" varchar(200) NOT NULL, "votos" integer NOT NULL, "pregunta_id" integer NOT NULL REFERENCES "encuestas_de_votacion_pregunta" ("id") DEFERRABLE INITIALLY DEFERRED);
CREATE INDEX "encuestas_de_votacion_eleccion_pregunta_id_b1eb11a1" ON "encuestas_de_votacion_eleccion" ("pregunta_id");
COMMIT;

```


## Simple explaination of routing in Django from the docs
>When somebody requests a page from your website – say, “/polls/34/”, 
>Django will load the mysite.urls Python module because it’s pointed 
>to by the ROOT_URLCONF setting. It finds the variable named urlpatterns 
>and traverses the patterns in order. After finding the match at 'polls/', 
>it strips off the matching text ("polls/") and sends the remaining text 
>– "34/" – to the ‘polls.urls’ URLconf for further processing. There it 
>matches '<int:question_id>/', resulting in a call to the detail() view like so:


##  Using the built in API
```
$ python manage.py shell

```
	- This allows the shell ability to connect to the models and database that is through the django app


- Example:
```
python3 manage.py shell
Python 3.6.9 (default, Nov  7 2019, 10:44:02) 
[GCC 8.3.0] on linux
Type "help", "copyright", "credits" or "license" for more information.
(InteractiveConsole)
>>> from encuestas_de_votacion.models import Pregunta, Eleccion 
>>> from django.utils import timezone
>>> q = Pregunta(pregunta_escrito="is this some text?", publicacion_fecha=timezone.now())
>>> q.save()
>>> q.id
1
>>> q.pregunta_escrito
'is this some text?'
>>> q.publicacion_fecha
datetime.datetime(2020, 1, 19, 21, 39, 26, 213346, tzinfo=<UTC>)
>>> q.pregunta_escrito = "updated text"
>>> q.save()
>>> Pregunta.objects.all()
<QuerySet [<Pregunta: Pregunta object (1)>]>


>>># doing more with the shell

>>> from encuestas_de_votacion.models import Pregunta, Eleccion
>>> Pregunta.objects.all()
<QuerySet [<Pregunta: updated text>]>
>>> Pregunta.objects.filter(id=1)
<QuerySet [<Pregunta: updated text>]>
>>> Pregunta.objects.filter(pregunta_escrito__startswith="updated")
<QuerySet [<Pregunta: updated text>]>
>>> from django.utils import timezone
>>> current_year = timezone.now().year
>>> Pregunta.objects.get(publicacion_fecha__year=current_year)
<Pregunta: updated text>

>>> # asking for an object that doesn't exist

>>> Pregunta.objects.get(id=2)
Traceback (most recent call last):
  File "<console>", line 1, in <module>
  File "/home/punctuationmarks/Projects/Classes/Django/DjangoDocsTutorial/venv/lib/python3.6/site-packages/django/db/models/manager.py", line 82, in manager_method
    return getattr(self.get_queryset(), name)(*args, **kwargs)
  File "/home/punctuationmarks/Projects/Classes/Django/DjangoDocsTutorial/venv/lib/python3.6/site-packages/django/db/models/query.py", line 417, in get
    self.model._meta.object_name
encuestas_de_votacion.models.Pregunta.DoesNotExist: Pregunta matching query does not exist.
>>> 



>>> # seeing how the preguntas and eleccions are connected in a one-to-many relationship
>>> q.eleccion_set.all()
<QuerySet []>
>>> q.eleccion_set.create(eleccion_escrito="choice option 1", votos=2)
<Eleccion: choice option 1>
>>> q.eleccion_set.create(eleccion_escrito="choice option 2", votos=3)
<Eleccion: choice option 2>
>>> c = q.eleccion_set.create(eleccion_escrito="choice option 3", votos=0)
>>> c.pregunta
<Pregunta: updated text>
>>> q.eleccion_set.all()
<QuerySet [<Eleccion: choice option 1>, <Eleccion: choice option 2>, <Eleccion: choice option 3>]>
>>> # eleccion objects have access to their respective pregunta
>>> # and pregunta objects have access to all of their respective eleccions
>>> q.eleccion_set.count()
3
>>> 

>>> # deleting a eleccion object
>>> c
<Eleccion: choice option 3>
>>> c.delete()
(1, {'encuestas_de_votacion.Eleccion': 1})
>>> Pregunta.objects.all()
<QuerySet [<Pregunta: updated text>]>
>>> Eleccion.objects.all()
<QuerySet [<Eleccion: choice option 1>, <Eleccion: choice option 2>]>
>>> 

```


# On Views from the Docs:
>Write views that actually do something¶
>Each view is responsible for doing one of two things: 
>returning an HttpResponse object containing the content 
>for the requested page, or raising an exception such as Http404. 
>The rest is up to you.
>Your view can read records from a database, or not. 
>It can use a template system such as Django’s – or a third-party Python template system – or not. 
>It can generate a PDF file, output XML, create a ZIP file on the fly, 
>anything you want, using whatever Python libraries you want.


_refator this or rewrite_
# Templates in Django
Your project’s TEMPLATES setting describes how Django will load and render templates. 
The default settings file configures a DjangoTemplates backend whose APP_DIRS option 
is set to True. By convention DjangoTemplates looks for a “templates” 
subdirectory in each of the INSTALLED_APPS.

Within the templates directory you have just created, 
create another directory called polls, and within that 
create a file called index.html. In other words, your 
template should be at polls/templates/polls/index.html. 
Because of how the app_directories template loader works as 
described above, you can refer to this template within Django as polls/index.html.


# Check out the framework if you want to find out more information
- For instance, check out venv/lib/python3.6/site-packages/django/shortcuts.py
	- This is the shortcuts module that contains render, get_object_or_404() and more





# reverse()

```

        reverse(viewname, urlconf=None, args=None, kwargs=None, current_app=None)

```
