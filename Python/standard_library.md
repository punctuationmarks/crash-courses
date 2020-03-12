- 



- Why does the `all()` function return true if empty?
```
def all(iterable):
    for element in iterable:
        if not element:
            return False
    return True
```

is this just to "protect" the user of the progam?
