_these are all for Ubunutu/Debian distros_

# Staples for daily functioning


- One of the most important function is the manual and how to search with it
```bash
$ man programYouKnowTheNameOf # this will return the manual of programYouKnowTheNameOf
$ man -k want to look this up # this will return everything that has those 

```

## Finding strucures and finding yourself

- listing _all_ of the contents of a directory and their sizes (human readable)

```
ls -lh
```

- Did you lose yourself in the hierarchy?

```bash
$ pwd # prints the working directory
```

- Do you not know who you're logged in as?
  - _NOTE_, this only returns your usename not your user privilieges

```bash
$ whoami
```

- Print all the groups of the current user
    - _NOTE_ if your user is root/admin, the user might not be in all groups but it doesn't matter since the root owns the files
```bash
$ groups
```

## Installing with a package manager

- See the PPA list for updates/installs

```
apt policy
```

_or_

```
ls /ect/apt/sources.list.d
```

- Remove PPA's (when they're dead or removing package/program)
  https://vitux.com/how-to-add-remove-ppa-repositories-in-ubuntu/

- Listing all of snap packages (will not be listed with dpgk since different package manager)

```
$ snap list
```

- Removing packages installed with snap

```
$ snap remove {package}
```

- List all packages, except for snap packages (different package manager)

```
$ dpkg -l

```

- Install .deb download

```
$ dpkg -i {package.deb}
```

## Creating files

- Make multiple files at once with touch
  _Note there can be NO SPACING between {variable,variable2,variable10} or it'll come out as trash_

```
$ touch rootDir/tests/__init__.py
$ touch rootDir/tests/test_{models,forms,views}.py
$ cd rootDir/tests/
$ ls
__init__.py  test_forms.py  test_models.py  test_views.py

```

- See the structure of a folder's directory in a visually pleasing way (this is a third party installation)

```bash
$ tree {folder}/
```

- See the structure of a folder's directory in a screen dump way (it works, without having a third party cli install)

```bash
$ ls *
```

- Get the documentation/user manual for a package

```
$ man {package name}
```

- Making your .gitignore on the fly

```
$ echo "db.sqlite3" >> .gitignore
$ echo "venv" >> .gitignore

```

## Deleting files and killing processes


- Process status `ps` is a very powerful tool to see what processes are running, how and where. Check out the manual

- Find a process and kill it
```bash
$ ps aux | grep partOfProcessName # ps aux lists all of the running processes on the UNIX system, grep is regex for the program name. This will return a PID (proccess id)
$ kill 1234 # kill the process of the PID 1234. This is done so "gracefully", by shutting it down
$ kill -9 1234 # this is "kill immediately"


```


## Finding and mutating found files

- Grep is used for searching within files.
  - Searching for function names inside files in a specific directory

```
$ grep -E "functionName1|orFunctionName2" directoryName/fileName.py
```

- Find files by user and/or group 

```
$ find . -group groupname -user username
```


- Use wildcards for returning files and dirs
```bash
$ ls * # prints the entire directory and all sub directories
$ ls *ing # prints every file or dir that ends in "ing"
$ ls P*** # prints every file or dir that starts with a "P" and is only 4 characters long
```


- Print all folders in a directory, print them with their size

```
$ find . -name "node_modules" -type d -prune -print | xargs du -chs
```

- Delete all folders inside the parent directory and print the results
  Before this is done, print them to the screen with their information, might be helpful since mass deleting is most likely irreversable (unless you get gud).
  For instance, I ran this from the ~ directory, which would have broken discord if I did a remove here

```
$ find . -name "node_modules" -type d -prune -print | xargs du -chs
381M	./.local/share/Trash/files/node_modules
156K	./.local/share/Trash/files/node_modules.5/snapdragon/node_modules
24K	./.local/share/Trash/files/node_modules.5/fill-range/node_modules
1.5M	./.config/discord/0.0.10/modules/discord_voice/node_modules
4.8G	total
...

```

```
$ find . -name 'node_modules' -type d -prune -print -exec rm -rf '{}' \;

```

- File Conversion
- Converting .flac files to .wav files in terminal
  _need to install ffmeg_

```
$ for f in *.flac; do ffmpeg -i "$f" "${f%.flac}.wav"; done
rm *.flac
```

## Viewing Files

- View images in the cli with FIM

```
$ fim {image.jpg}

```

- Displaying contents of a file in terminal can also be used with "more"

```
more filename
```

- Concatonate multiple files and print them to the screen
```
$ cat file1 file2 file3
```


- Concatonate multiple files and concatonate them onto an output file's original content
```
$ cat file1 file2 file3 >> outputfile
```


- Concatonate multiple files and over write the outputfile (erasing the file's original content)
```
$ cat file1 file2 file3 > outputfile
```

- Print the entire file on the terminal (not recommended with cat, but is possible)

```
$ cat filename.txt
```

- Have a file that has "-" (without quotation marks) in the beginning of the file and you only have read access?

```
$ cat < -filename
```

- Play audio file from CLI

```
$ omxplayer -o local AUDIO_FILE.mp3
```

## Piping

- Using sort to sort the lines of a text file, and unique (with the unique only flag) to return only unique occurances and print it to the screen with less

```
$ sort data.txt | uniq -u | less
```

## Permissions

- Seeing who owns what and how to read it

```bash
$ ls -la

# type&security          owner           group  size last modification
drwxrwxr--  8 punctuationmarks punctuationmarks 4096 Oct 31 09:10 .git
-rwxrwxr--  1 punctuationmarks punctuationmarks 4514 Oct 21 14:21 .gitignore

```

### Describing the printout from -la

The flag `-la` is to list all, inlcuding hidden, of the files in the current working directory

- Type will be either a `-` for file or a `d` for directory. The first symbol in the security grouping.
- The security characters are three sets of three. Each group of three letters or numbers are the security permissions of different levels of user privilege. The three groups are the user/owner, the group, and other/world. The three security layers in each group are the same as well, read - write - execute. If any of the `rwx` characters are replaced by a `-` then that permission is denied for that user. The 9 security characters are called the "security mode" of a file, hense why the command to change user permissions is `chmod` which is short for "change mode".

- Changing permission with alpha codes and flags. The first part of the flag is the user to be changed, so `u` for user/owner `g` for group and `o` for other/world. These can be combined in succession. The second part is either the additon `+` or subtraction `-` of a privilege, which are `r` read, `w` write, or `x` execute. These can also be combined in succession. _NOTE_ how the user/group/other parameter doesn't have a `-` dash in front

```bash
# removing write and execute privileges from the world
$ chmod o-wx filename
# adding all user levels all privileges
$ chmod ugo+rwx filename
# removing all user levels of all privileges
$ chmod ugo-rwx filename
# allowing the current group to have write permissions on everything in the current directory
$ chmod g+w *

```
