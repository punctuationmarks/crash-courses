## Environmental variables in Linux (using Python)


In terminal (home directory), edit the .bash_profile file

```
nano .bash_profile

```


then add your environment variable (note the no spaces between variable name, 
equal sign, and value)

```
export ENVIORNMENT_VARIABLE="SUPERsecretVARIABLE"
```


(note, you might have to restart your IDE/text editor for it to take effect)

```
import os

password = os.environ.get('ENVIORNMENT_VARIABLE')
```
