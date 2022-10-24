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

- Remove PPA's (when they're dead or left **after** purging a package/program)

```bash
sudo add-apt-repository --remove ppa:Desired_PPA_Name/ppa
```

_or_

```bash
# find the desired ppa in this dir
sudo ls /etc/apt/sources.list.d/
sudo rm -i /etc/apt/sources.list.d/Desired_PPA_Name.list
```

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

- Let's say you're trying to run a node app on port 3000 and some reason some phantom program is also running on 3000 from leaving your development machine on over night. Node kicks out something like `error listen EADDRINUSE: address already in use :::3000. Run CLI with --verbose flag for more details.`. Grab the PID on that port and shut down the program

```bash
# this is return the list of everything on that port, grab the PID
$ lsof -i:3000
...
$ kill -9 149459

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

# PGP Keys

- Generating a new key

```bash

$ sudo apt install gnupg2 gpa
Reading package lists... Done
Building dependency tree
Reading state information... Done
The following package was automatically installed and is no longer required:
  libnvidia-common-435
Use 'sudo apt autoremove' to remove it.
The following NEW packages will be installed:
  gnupg2 gpa
0 upgraded, 2 newly installed, 0 to remove and 0 not upgraded.
Need to get 310 kB of archives.
After this operation, 1,496 kB of additional disk space will be used.
Get:1 http://us.archive.ubuntu.com/ubuntu focal/universe amd64 gnupg2 all 2.2.19-3ubuntu2 [5,316 B]
Get:2 http://us.archive.ubuntu.com/ubuntu focal/universe amd64 gpa amd64 0.10.0-3 [304 kB]
Fetched 310 kB in 1s (320 kB/s)
Selecting previously unselected package gnupg2.
(Reading database ... 203012 files and directories currently installed.)
Preparing to unpack .../gnupg2_2.2.19-3ubuntu2_all.deb ...
Unpacking gnupg2 (2.2.19-3ubuntu2) ...
Selecting previously unselected package gpa.
Preparing to unpack .../gpa_0.10.0-3_amd64.deb ...
Unpacking gpa (0.10.0-3) ...
Setting up gnupg2 (2.2.19-3ubuntu2) ...
Setting up gpa (0.10.0-3) ...
Processing triggers for mime-support (3.64ubuntu1) ...
Processing triggers for gnome-menus (3.36.0-1ubuntu1) ...
Processing triggers for man-db (2.9.1-1) ...
Processing triggers for desktop-file-utils (0.24-1ubuntu3) ...

$ gpg --full-generate-key
gpg (GnuPG) 2.2.19; Copyright (C) 2019 Free Software Foundation, Inc.
This is free software: you are free to change and redistribute it.
There is NO WARRANTY, to the extent permitted by law.

Please select what kind of key you want:
   (1) RSA and RSA (default)
   (2) DSA and Elgamal
   (3) DSA (sign only)
   (4) RSA (sign only)
  (14) Existing key from card
Your selection? 1
RSA keys may be between 1024 and 4096 bits long.
What keysize do you want? (3072) 4096
Requested keysize is 4096 bits
Please specify how long the key should be valid.
         0 = key does not expire
      <n>  = key expires in n days
      <n>w = key expires in n weeks
      <n>m = key expires in n months
      <n>y = key expires in n years
Key is valid for? (0) 0
Key does not expire at all
Is this correct? (y/N) y

GnuPG needs to construct a user ID to identify your key.

Real name: punctuationmarks
Email address: punctuationmark@protonmail.com
Comment:
You selected this USER-ID:
    "punctuationmarks <punctuationmark@protonmail.com>"

Change (N)ame, (C)omment, (E)mail or (O)kay/(Q)uit? o
We need to generate a lot of random bytes. It is a good idea to perform
some other action (type on the keyboard, move the mouse, utilize the
disks) during the prime generation; this gives the random number
generator a better chance to gain enough entropy.
We need to generate a lot of random bytes. It is a good idea to perform
some other action (type on the keyboard, move the mouse, utilize the
disks) during the prime generation; this gives the random number
generator a better chance to gain enough entropy.
gpg: key D5952815F96B6F78 marked as ultimately trusted
gpg: directory '/home/punctuationmarks/.gnupg/openpgp-revocs.d' created
gpg: revocation certificate stored as '/home/punctuationmarks/.gnupg/openpgp-revocs.d/C3849665CA8DE2BE145463A4D5952815F96B6F78.rev'
public and secret key created and signed.

pub   rsa4096 2020-11-12 [SC]
      C3849665CA8DE2BE145463A4D5952815F96B6F78
uid                      punctuationmarks <punctuationmark@protonmail.com>
sub   rsa4096 2020-11-12 [E]

```

- Managing key with GPA

```
$ sudo gpa
```
