
# Some things to remember about Git



### Moving files and need to ensure Git keeps track of this?
```
$ git mv og_file.md ../new_school_file.md

```


### Making your .gitignore on the fly
```
$ echo "db.sqlite3" >> .gitignore
$ echo "venv" >> .gitignore

```




### reset entire tree

```
git reset --hard;git clean -df
```




### Initializing a git project
```
(venv) punctuationmarks@ddoublespeak:~/Projects/Classes/Django/ObeyTheTestingGoat$ git init .
Initialized empty Git repository in /home/punctuationmarks/Projects/Classes/Django/ObeyTheTestingGoat/.git/
(venv) punctuationmarks@ddoublespeak:~/Projects/Classes/Django/ObeyTheTestingGoat$ ls
crud  db.sqlite3  funtional_tests.py  geckodriver.log  manage.py  venv
(venv) punctuationmarks@ddoublespeak:~/Projects/Classes/Django/ObeyTheTestingGoat$ ls -la
total 52
drwxr-xr-x 6 punctuationmarks punctuationmarks  4096 Feb 24 13:45 .
drwxr-xr-x 6 punctuationmarks punctuationmarks  4096 Feb 14 08:30 ..
drwxr-xr-x 3 punctuationmarks punctuationmarks  4096 Feb 24 13:42 crud
-rw-r--r-- 1 punctuationmarks punctuationmarks 12288 Feb 24 13:42 db.sqlite3
-rw-r--r-- 1 punctuationmarks punctuationmarks   133 Feb 24 13:29 funtional_tests.py
-rw-r--r-- 1 punctuationmarks punctuationmarks  7805 Feb 24 13:43 geckodriver.log
drwxr-xr-x 7 punctuationmarks punctuationmarks  4096 Feb 24 13:45 .git
-rwxr-xr-x 1 punctuationmarks punctuationmarks   802 Feb 24 13:41 manage.py
drwxr-xr-x 6 punctuationmarks punctuationmarks  4096 Feb 24 13:13 venv
drwxrwxr-x 2 punctuationmarks punctuationmarks  4096 Feb 14 08:33 .vscode
(venv) punctuationmarks@ddoublespeak:~/Projects/Classes/Django/ObeyTheTestingGoat$ echo "db.sqlite3" >> .gitignore
(venv) punctuationmarks@ddoublespeak:~/Projects/Classes/Django/ObeyTheTestingGoat$ echo "geckodriver.log" >> .gitignore 
(venv) punctuationmarks@ddoublespeak:~/Projects/Classes/Django/ObeyTheTestingGoat$ echo "venv/*" >> .gitignore 
(venv) punctuationmarks@ddoublespeak:~/Projects/Classes/Django/ObeyTheTestingGoat$ nano .gitignore 
(venv) punctuationmarks@ddoublespeak:~/Projects/Classes/Django/ObeyTheTestingGoat$ nano .gitignore 
(venv) punctuationmarks@ddoublespeak:~/Projects/Classes/Django/ObeyTheTestingGoat$ echo "venv" >> .gitignore 
(venv) punctuationmarks@ddoublespeak:~/Projects/Classes/Django/ObeyTheTestingGoat$ git add .
(venv) punctuationmarks@ddoublespeak:~/Projects/Classes/Django/ObeyTheTestingGoat$ git status 
On branch master

No commits yet

Changes to be committed:
  (use "git rm --cached <file>..." to unstage)

	new file:   .gitignore
	new file:   .vscode/settings.json
	new file:   crud/__init__.py
	new file:   crud/__pycache__/__init__.cpython-36.pyc
	new file:   crud/__pycache__/settings.cpython-36.pyc
	new file:   crud/__pycache__/urls.cpython-36.pyc
	new file:   crud/__pycache__/wsgi.cpython-36.pyc
	new file:   crud/settings.py
	new file:   crud/urls.py
	new file:   crud/wsgi.py
	new file:   funtional_tests.py
	new file:   manage.py

(venv) punctuationmarks@ddoublespeak:~/Projects/Classes/Django/ObeyTheTestingGoat$ git rm -r --cached crud/__pycache__
rm 'crud/__pycache__/__init__.cpython-36.pyc'
rm 'crud/__pycache__/settings.cpython-36.pyc'
rm 'crud/__pycache__/urls.cpython-36.pyc'
rm 'crud/__pycache__/wsgi.cpython-36.pyc'
(venv) punctuationmarks@ddoublespeak:~/Projects/Classes/Django/ObeyTheTestingGoat$ echo "__pycache__" >> .gitignore
(venv) punctuationmarks@ddoublespeak:~/Projects/Classes/Django/ObeyTheTestingGoat$ echo "*.pyc" >> .gitignore 
(venv) punctuationmarks@ddoublespeak:~/Projects/Classes/Django/ObeyTheTestingGoat$ git status
On branch master

No commits yet

Changes to be committed:
  (use "git rm --cached <file>..." to unstage)

	new file:   .gitignore
	new file:   .vscode/settings.json
	new file:   crud/__init__.py
	new file:   crud/settings.py
	new file:   crud/urls.py
	new file:   crud/wsgi.py
	new file:   funtional_tests.py
	new file:   manage.py

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

	modified:   .gitignore

(venv) punctuationmarks@ddoublespeak:~/Projects/Classes/Django/ObeyTheTestingGoat$ git add .gitignore 
(venv) punctuationmarks@ddoublespeak:~/Projects/Classes/Django/ObeyTheTestingGoat$ git commit
Aborting commit due to empty commit message.
(venv) punctuationmarks@ddoublespeak:~/Projects/Classes/Django/ObeyTheTestingGoat$ git commit -m "initial commit"
[master (root-commit) 32c694d] initial commit
 8 files changed, 193 insertions(+)
 create mode 100644 .gitignore
 create mode 100644 .vscode/settings.json
 create mode 100644 crud/__init__.py
 create mode 100644 crud/settings.py
 create mode 100644 crud/urls.py
 create mode 100644 crud/wsgi.py
 create mode 100644 funtional_tests.py
 create mode 100755 manage.py


(venv) punctuationmarks@ddoublespeak:~/Projects/Classes/Django/ObeyTheTestingGoat$ git status
On branch master
Changes not staged for commit:
  (use "git add/rm <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

	deleted:    funtional_tests.py

Untracked files:
  (use "git add <file>..." to include in what will be committed)

	functional_tests.py

no changes added to commit (use "git add" and/or "git commit -a")
(venv) punctuationmarks@ddoublespeak:~/Projects/Classes/Django/ObeyTheTestingGoat$ git diff
diff --git a/funtional_tests.py b/funtional_tests.py
deleted file mode 100644
index df73c70..0000000
--- a/funtional_tests.py
+++ /dev/null
@@ -1,6 +0,0 @@
-from selenium import webdriver
-
-browser = webdriver.Firefox()
-browser.get('http://localhost:8000')
-
-assert 'Django' in browser.title
(venv) punctuationmarks@ddoublespeak:~/Projects/Classes/Django/ObeyTheTestingGoat$ git commit -a
[master 71a392a] Just making the functional_tests.py more robust
 1 file changed, 6 deletions(-)
 delete mode 100644 funtional_tests.py
(venv) punctuationmarks@ddoublespeak:~/Projects/Classes/Django/ObeyTheTestingGoat$ 


```


## Seeing what actually happened in your logs (`--oneline` is optional)

```
punctuationmarks@ddoublespeak:~/Projects/Classes$ git log --oneline
bd966d91 (HEAD -> master) ...
c556e874 (origin/master, origin/HEAD) ...
866a8933 lots added
d9841395 should have commited earlier, added some selenium work
0edee76e added some django testing
adfe9bd9 added some django testing
815c75fd added some SQL, refreshers
093b9d9c added some testing
54019755 added some algorithm practice
05c44dd4 Merge branch 'master' of https://github.com/punctuationmarks/Classes
756f1f8c .
076f65f1 .
d1499c31 added pi
d1393ee3 added some pi stuff
054e1366 added ignore
d6200738 finished php course
8808476e asdf
efb091e8 learning laravel
6b45aca2 finished php course
62050c3e added more php learning
8514f3b4 intial commit

```



## Shortcut with `-am`, it's the fastest way to commit, but also the least visual feedback so make sure you're checking `status` and `diff` before commiting

```

punctuationmarks@ddoublespeak:~/Projects/Classes$ git diff
diff --git a/Django/ObeyTheTestingGoat/crud/urls.py b/Django/ObeyTheTestingGoat/crud/urls.py
index 3fde7e08..b76788d9 100644
--- a/Django/ObeyTheTestingGoat/crud/urls.py
+++ b/Django/ObeyTheTestingGoat/crud/urls.py
@@ -15,7 +15,10 @@ Including another URLconf
 """
 from django.conf.urls import url
 from django.contrib import admin
+from notes import views
 
 urlpatterns = [
+    # added homepage from notes
+    url(r'^$', views.home_page, name='home'),
     url(r'^admin/', admin.site.urls),
 ]
diff --git a/Django/ObeyTheTestingGoat/notes/.tests.py.swp b/Django/ObeyTheTestingGoat/notes/.tests.py.swp
deleted file mode 100644
index 144e87a6..00000000
Binary files a/Django/ObeyTheTestingGoat/notes/.tests.py.swp and /dev/null differ
diff --git a/Django/ObeyTheTestingGoat/notes/tests.py b/Django/ObeyTheTestingGoat/notes/tests.py
index 3a791178..c6b18717 100644
--- a/Django/ObeyTheTestingGoat/notes/tests.py
+++ b/Django/ObeyTheTestingGoat/notes/tests.py
@@ -1,5 +1,9 @@
 from django.test import TestCase
+from django.urls import resolve
+from notes.views import home_page
 
-class SmokeTest(TestCase):
-       def test_bad_maths(self):
-               self.assertEqual(1+1, 3)
+
+class HomePageTest(TestCase):
+       def test_root_url_returns_home_page_view(self):
+               url = resolve("/")
+               self.assertEqual(url.func, home_page)
diff --git a/Django/ObeyTheTestingGoat/notes/views.py b/Django/ObeyTheTestingGoat/notes/views.py
index 91ea44a2..529ce1e4 100644
--- a/Django/ObeyTheTestingGoat/notes/views.py
+++ b/Django/ObeyTheTestingGoat/notes/views.py
@@ -1,3 +1,5 @@
 from django.shortcuts import render
 
 # Create your views here.
+def home_page():
+       pass
diff --git a/Stolen_from_Corey_schafer/code_snippets b/Stolen_from_Corey_schafer/code_snippets
--- a/Stolen_from_Corey_schafer/code_snippets
+++ b/Stolen_from_Corey_schafer/code_snippets
@@ -1 +1 @@
-Subproject commit b2ba29df2f081b1ccf165241125697c1ac042b24
+Subproject commit b2ba29df2f081b1ccf165241125697c1ac042b24-dirty
punctuationmarks@ddoublespeak:~/Projects/Classes$ git commit -am "...
> "
[master bd966d91] ...
 4 files changed, 12 insertions(+), 3 deletions(-)
 delete mode 100644 Django/ObeyTheTestingGoat/notes/.tests.py.swp

```





# Flags




```

$ git status # functional_tests.py renamed + modified, new __init__.py
$ git add functional_tests
$ git diff --staged -M
$ git commit  # msg eg "make functional_tests an app, use LiveServerTestCase"

The -M flag on the git diff is a useful one. 
It means "detect moves", so it will notice that functional_tests.py and 
functional_tests/tests.py are the same file, 
and show you a more sensible diff (try it without the flag!).

```
