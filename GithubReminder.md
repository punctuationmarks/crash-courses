# Github Reminders

## Some Basics

### Setting the global username for pushing to github.com
*some of the ideas taken from the Git docs [here](https://git-scm.com/book/en/v2/Getting-Started-First-Time-Git-Setup)*

```
$ git config --global user.name "Your Name Here"
$ git config --global user.email your@email.com
```

*Note:
You can use `git config --list` to see what the global settings are
or in home directory, you can look up `nano .gitconfig`. Also note, that .git
files are hidden by default, so if you want to "see" it in the file directory, 
`$ ls -al` which will list all of the files in whatever directory you're in.*


### Initializing new repositiory (`-y` for the defaults)

```
$ git init -y

```

### Adding files *(if the file(s) are added then it'll be in green text, red if not)*

```
$ git add <flileName>
```
or for all of the files in the directory
```
$ git add *
```



### Checking the status of the branch, shows the staging area

```
$ git status 
```

### Commiting the files (if you want more info on the varying versions on git commit, check the docs [here](https://git-scm.com/docs/git-commit#git-commit--a)

```
$ git commit -m
```

### Pushing the added files to github (this will prompt you for your github username/passw0rd)
```
$ git push -u origin master
```

### Cloning repositories
```
git cone https://github.com/meettingthespam/git_tutorial/.git
```

## Tips


#### Need to remove files from the staging area?

* one file at a time:
```
git rm --cached fileName
```

* a whole directory:

```
git rm -r --cached directoryName/*
```


#### Use a .gitignore becasue reading/reviewing/downloading/ect something without it is annoying
* [gitignore.io](https://www.gitignore.io) for a .gitignore generator for speed
* Or Github's [gitignore](https://github.com/github/gitignore)

* If you want to upload to another account, besides the global account:
```
$ git config user.name "Your Name Here"
$ git config user.email your@email.com
```
#### Use an MIT license, it's free and might protect some of your ideas
