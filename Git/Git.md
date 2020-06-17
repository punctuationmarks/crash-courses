
# Some things to remember about Git


## Terminology and theory
- __HEAD__
	- the commit currenly being worked on
	- always points to the most recent commit, reflected in the current working tree
	- normally points to a branch name
- __Detaching HEAD__
	- attaching the head to a commit instead of a branch
- __^__
	- adding this after a branch name will signify its parent, add more carrots for grandparents
- __Remote Branch__
	- Refect the state of remote repositories, since last "pull" of those repositories (meaning it can be out of date)
	- Forces a disconnect between local and public work
	- Also put in __detached HEAD__ mode
	- The remote branch is often called __origin__
		- the naming convention is {remote name}/{branch name}
		- so common would be to see `origin/master` (which only gets updated when the remote branch updates, aka origin)
	- __fetching__
		- Downloads changes from a remote repository (to the main repository) (`git fetch`)
		- Note, it downloads the changes, but _does not_ push them to your master
	- __pulling__
		- Downloads the changes from a remote repository and also commits them (`git pull`)
		- It's a shorthand for `git fetch` and then `git merge` of the fetched branch

- __Diverging Histories__
	- When a remote code has a different history than the main branch. 
	- Think if you pulled a repository on Monday and didn't push anything until Friday, but the rest of the team has been pushing code to the origin, then your remote branch has a "diverging history"
	- Solutions:
		- 1: fetch the new data, rebase the remote orgin/master, then push the code to the original tree
			- this seems safer
			- using flags `git pull --rebase; git push;`
		- 2: fetch the new data, merge the remote with the origin/master, then push the code to the original tree
			- this seems to leave more breadcrumbs

	- __rebasing vs merging when pushing new updates to remote branches__
		- In order to push new updates to the remote branches, you need to incorportate the latest changes from the remote. You can use rebase or merge in the remote branch to acheive this (since the remote branch will most likely be different than the origin branch)
		- rebasing
			- pros: rebasing makes the commit tree look tidy due to everything being in a straight succession
			- cons: it modifies the (apparent) history in the commit tree
		- merging 
			- pros: makes a full history of the commits, so nothing is lost
			- cons: can be a bit trickier to think about

		- to preserve the commit history, use merge. to have a clean commit tree, use rebase

- __Pull Request/ Merge Request__

# Branches and Merging


## Branches
- Making a new branch 
	- (but not checking out that branch, meaning it keeps you where you are, but creates the new branch)
```
$ git branch {newBranch}
```

- Selecting/checking out a branch
```
$ git checkout {branchName}
```

- Making and selecting the new branch
```
$ git checkout -b {newBranch}
```

## Merging
- Merging makes a commit with two "parent" commits, combingin them (used for experimental development)
Showing two branches, separately committed and then merging the first with the second
```
$ git checkout -b {branchName} # makes and checks out the branchName from current HEAD	 
$ git commit # commits to the new branchName
$ git checkout master # checks out the master branch
$ git commit # commits to the master branch
$ git merge {branchName} # merges the unselected branchName to the selected master branch
```




## Rebasing
- If you want a branch to seem that it was developed sequentially opposed to separately, then "rebase" the branch onto the master branch
	- It's pretty much taking multiple branches that are commited and built separately and then combining them in chronological order for continuity

Showing two branches, separately committed and then rebasing the checked out {branchName} with master
```
$ git checkout -b {branchName}
$ git commit 
$ git checkout master
$ git commit
$ git checkout {branchName}
$ git rebase master
```

- Note about rebasing, it moves the entire branch under the branch you want to rebase to,
- So all of the commits under side1, side2, side3 are rebased under their respective areas they get moved to
	- Problem:
		There are three feature branches -- side1 side2 and side3
		We want to push each one of these features, in order, to the remote
		The remote has since been updated, so we will need to incorporate that work as well

```
git fetch # grabbing the remote
git rebase origin/master side1 # this is rebasing the side1 ahead of the remote commit
git rebase side1 side2 # this is rebasing side2 ahead of side1 
git rebase side2 side3 
git rebase side3 master
git push
```


- pros: rebasing makes the commit tree look tidy due to everything being in a straight succession
- cons: it modifies the (apparent) history in the commit tree

 


## Going up the branch
- HEAD is what branch you're currently on. 
```
git checkout HEAD
```
- ^ indicates you want the parent branch
```
git checkout HEAD^
git checkout {branchName}^
```
- ~ takes a number for how many parent branches you want to go up
This goes back 5 parents of the current branch
```
git checkout HEAD~5
```

- Branch forcing
Moving branches around, using `-f` you can assign a branch to a specific commit
```
git branch -f master HEAD~3
```

- "Revealing the HEAD before and after a commit
```
git checkout {commit1};
git checkout master;
git commit;
git checkout commit2; 
```

- Detaching HEAD
	- attaching the HEAD to a commit instead of a branch
	- once a commit is checked out, then the checkout is now the HEAD (or currently working commit from the main tree)
										
So with a structure of commit0 -> commit1 (branches between) --< commit2 that is master (and) --< commit3 -> commit4
if I want the commit4 to be the HEAD, then just checkout the commit4 
```
git checkout commit4
```




- Seeing what actually happened in your logs (`--oneline` is optional)
	- The hashes are unique (most times) from the first few characters, so you can just call the first few on checkout
	- The `--oneline` flag shortens all of the commits to be one line each, otherwise you'll see the entire hash and more info
```
$ git log --oneline
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

- Relative refs
	- start somewhere memorable (like a named commit) and move upwards with `^` (x1) or `~{number of desired moves}`
	- `master^` means the first parent of master
	- `master^^` means the second parent of master
	- `master~4`  means the 4th parent of master

- Usefull to use relative refs for moving branches around
	- `-f` assign a brnach to a commit with (by force)
	- `git brnach -f master HEAD~3` moves the master branch to threee parents behind HEAD

So with a structure of commit0 -> commit1 (branches between) --< commit2 (HEAD) --> commit4 that starting as master (and branches between) --< commit3 -> commit5 (also named "bugFix") -> commit6
```
git branch -f master commit6 # moves the master to the newest commit (after bugFix)
git checkout HEAD^ # moves HEAD to commit 1
git checkout -f bugFix HEAD~ # moves bugFix to commit0
```


# Reversing changes



- Revert
	- Reverses changes and allows for sharing with remote git

- Reset
	- Good for local machine, not good for remote git, use `revert` instead
	- reverts the commit back to one parent up from HEAD
	
```
git reset HEAD^
```


- Reset entire tree, hard, not recommended

```
git reset --hard;git clean -df
```



- Example using revert and reset
```
git checkout {local}
git reset HEAD^ # reset the local by one parent
git checkout {pushed}
git revert HEAD # reverts the pushed to the current checked out HEAD
```



# Cherry-Picking
- States that you want to copy a series of commits below the current location (HEAD)
	- Meaing you can copy whatever commits you want and it will be copied behind whatever your HEAD is (implictly declared)
	- Whatever the order the commits are declared in the cherrypick is the order they will be coped 
```
git cherry-pick {commit10} {commit22} {commit1}
```


# Flags and command specifics




- `-M`
```

$ git status # functional_tests.py renamed + modified, new __init__.py
$ git add functional_tests
$ git diff --staged -M
$ git commit  # msg in nano: eg "make functional_tests an app, use LiveServerTestCase"

The -M flag on the git diff is a useful one. 
It means "detect moves", so it will notice that functional_tests.py and 
functional_tests/tests.py are the same file, 
and show you a more sensible diff (try it without the flag!).

```

- Adding changes to current branch before commit
```
git add . 			# stages new files and modifications, without deletions
git add -u 			# stages modifications and deletions, without new files
git add -A 			# stages all changes, equivalent to git add .; git add -u;
```





# Remote Git


- Cloning repositories (copying source code from a remote compute)
```
git clone {repository-url}
```


- Just an example of how the remote branch is different than the original? branch (or main branch?)
```
git checkout master #main
git commit -m "main commit here"
git checkout origin/master #remote
git commit -m "remote commit here"
```

- Grabbing data _from_ a remote repostitory with "fetch"
	- Note, this only downloads the data, from remote repositories, does not commit the data
```
git fetch

```


- Grabbing data from remote and commiting it the local repository
	- This is essentially a `git fetch` followed by a `git merge {branchName}` that was just fetched, which updates the local repository (opposed to `fetch` which just downloads the data and doesn't merge or commit anything)
	- To think of this clearer check out this following example
		- A main repository exists of commit0 and commit1. A remote branch exists containing those first two commits. 
			- The orignal has two updates, commit2 and commit3
			- The remote repository also has an updated tree commit4 
				- (so that's commit0, commit1, and commit4 for the remote repository, currently)
			- When the pull happens, the origin/master will be at commit3 (where the main tree is at)
			- But the remote branch's master* will be at commit5 since it'll take both the commit4 and the commit3
```
git pull
```



- Pushing your remote data to the main repository
	- Note, this will not only update the main repository, but bring the remote repository's `origin/master` up-to-date on the remote branch
```
git push
```


- Problem, you made a new feature on a remote branch. But your master is behind a commit. You want to incorperate the new feature and push it to the origin
	- The Origin looks like coomit0, commit1
	- The remote branch looks like commit0, commit1, commit2, with the master* on commit2 and origin/master on commit1
```
git reset --hard origin/master # this is forcing the remote repository to move the master* back to commit1
git checkout -b brandNewFeaure commit2 # this is making and selecting a new branch called brandNewFeature which was coded in commit2
git push origin brandNewFeaure # this is pushing the new branch {brandNewFeaure} that was just select to the master (which now everything is up to date) 
							   # and the origin has the new branch (with also still having its master on commit1)
```


- Problem:
There are three feature branches -- side1 side2 and side3
We want to push each one of these features, in order, to the remote
The remote has since been updated, so we will need to incorporate that work as well

	- Solved with fetch and rebase
```
git fetch # grabbing the remote, but HEAD is at side3
git rebase origin/master side1 # this is rebasing the side1 ahead of the remote commit
git rebase side1 side2 # this is rebasing side2 ahead of side1 
git rebase side2 side3 
git rebase side3 master
git push # pushing all of the rebased code 
```

	- Solved with merge
```
git checkout master # because HEAD is at the end of side3 (commit 7 let's say)
git pull # to make the origin up to date with the remote
git merge side1 # merging the up to date origin/master
git merge side2 # merging side2 ahead of side1 and origin/master (which will stay until push)
git merge side3 
git push # which will then make the remote up to date with the origin
```



# Work on these!
- Commit to braches, not to master
- Deleting a branch after a pull request
```
$ git remote -v
origin	https://github.com/DataVoke/auto-loto (fetch)
origin	https://github.com/DataVoke/auto-loto (push)
$ git push origin --delete Adding-Auto-Incrememnt-To-CX-Locks 
Username for 'https://github.com': punctuationmarks
Password for 'https://punctuationmarks@github.com': 
To https://github.com/DataVoke/auto-loto
 - [deleted]         Adding-Auto-Incrememnt-To-CX-Locks
$ 
```



- Grabbing a specific pull request that a team member is submitting from 3rd party (e.g. Github)
	- Grabbing pull request #103 (which will be in the title or the url of the PR)
	- Renaming the pull request to `pr-103`
```
git fetch origin pull/103/head:pr-103
git checkout pr-103 
```

































# Tips and Random
- Want to untrack a previously tracked file? (i.e. you don't really want your private keys pushed to Github, right?)
```
git rm --cached {desiredFileToUntrack}
```


- Moving files and need to ensure Git keeps track of this? Move them with git
```
$ git mv og_file.md ../new_school_file.md

```


- Making your .gitignore on the fly
```
$ echo "db.sqlite3" >> .gitignore
$ echo "venv" >> .gitignore

```


- Initializing a git project
```
$ git init .
Initialized empty Git repository in /home/punctuationmarks/Projects/Classes/Django/ObeyTheTestingGoat/.git/
$ ls
crud  db.sqlite3  funtional_tests.py  geckodriver.log  manage.py  venv
$ ls -la
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
$ echo "db.sqlite3" >> .gitignore
$ echo "geckodriver.log" >> .gitignore 
$ echo "venv/*" >> .gitignore 
$ nano .gitignore 
$ nano .gitignore 
$ echo "venv" >> .gitignore 
$ git add .
$ git status 
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

$ git rm -r --cached crud/__pycache__
rm 'crud/__pycache__/__init__.cpython-36.pyc'
rm 'crud/__pycache__/settings.cpython-36.pyc'
rm 'crud/__pycache__/urls.cpython-36.pyc'
rm 'crud/__pycache__/wsgi.cpython-36.pyc'
$ echo "__pycache__" >> .gitignore
$ echo "*.pyc" >> .gitignore 
$ git status
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

$ git add .gitignore 
$ git commit
Aborting commit due to empty commit message.
$ git commit -m "initial commit"
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


$ git status
On branch master
Changes not staged for commit:
  (use "git add/rm <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

	deleted:    funtional_tests.py

Untracked files:
  (use "git add <file>..." to include in what will be committed)

	functional_tests.py

no changes added to commit (use "git add" and/or "git commit -a")
$ git diff
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
$ git commit -a
[master 71a392a] Just making the functional_tests.py more robust
 1 file changed, 6 deletions(-)
 delete mode 100644 funtional_tests.py
$ 


```


- Shortcut with `-am`, it's the fastest way to commit, but also the least visual feedback so make sure you're checking `status` and `diff` before commiting

```

$ git diff
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
$ git commit -am "...
> "
[master bd966d91] ...
 4 files changed, 12 insertions(+), 3 deletions(-)
 delete mode 100644 Django/ObeyTheTestingGoat/notes/.tests.py.swp

```







































# From Stack overflow
```
Setting your branch to exactly match the remote branch can be done in two steps:

git fetch origin
git reset --hard origin/master
If you want to save your current branch's state before doing this (just in case), you can do:

git commit -a -m "Saving my work, just in case"
git branch my-saved-work
Now your work is saved on the branch "my-saved-work" in case you decide you want it back (or want to look at it later or diff it against your updated branch).

Note that the first example assumes that the remote repo's name is "origin" and that the branch named "master" in the remote repo matches the currently checked-out branch in your local repo.

BTW, this situation that you're in looks an awful lot like a common case where a push has been done into the currently checked out branch of a non-bare repository. Did you recently push into your local repo? If not, then no worries -- something else must have caused these files to unexpectedly end up modified. Otherwise, you should be aware that it's not recommended to push into a non-bare repository (and not into the currently checked-out branch, in particular).

--Dan Moulding
```