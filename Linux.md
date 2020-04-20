_these are all for Ubunutu/Debian distros_


# Staples for daily functioning
# See the PPA list for updates/installs
```
apt policy
```
_or_ 
```
ls /ect/apt/sources.list.d
```


# Remove PPA's (when they're dead or removing package/program)
https://vitux.com/how-to-add-remove-ppa-repositories-in-ubuntu/



# Make multiple files at once with touch
_Note there can be NO SPACING between {variable,variable2,variable10} or it'll come out as trash_

```
$ touch catalog/tests/__init__.py
$ touch catalog/tests/test_{models,forms,views}.py
$ cd catalog/tests/
$ ls
__init__.py  test_forms.py  test_models.py  test_views.py

```


# List all packages on a system
```
$ dpkg -l

```

# Install .deb download
```
$ dpkg -i {package.deb}
```

# See the structure of a folder's directory system
```
$ tree {folder}/

```

# Get the docs/user manual for a package

```
$ man {package name}

```

# Making your .gitignore on the fly
```
$ echo "db.sqlite3" >> .gitignore
$ echo "venv" >> .gitignore

```


# Greg
# Searching for function names inside files in a specific directory

```
$ grep -E "functionName1|orFunctionName2" directoryName/fileName.py

```


# File Conversion
# Converting .flac files to .wav files in terminal
_need to install ffmeg_
```
$ for f in *.flac; do ffmpeg -i "$f" "${f%.flac}.wav"; done
rm *.flac
```


# Play audio file from CLI
```
$ omxplayer -o local AUDIO_FILE.mp3
```


# Print all folders in a directory, print them with their size
```
$ find . -name "node_modules" -type d -prune -print | xargs du -chs

```


# Delete all folders inside the parent directory and print the results
```
$ find . -name 'node_modules' -type d -prune -print -exec rm -rf '{}' \;

```
