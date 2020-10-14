Python files that are imported into other python files export everything by default.
Meaning `__all__ == [*]` (which to be more exact: means everything minus anything that starts 
with an underscore) by default, but this can be overridden by specifying the __all__ method 
in the file you are exporting from (i.e. the file you are importing from). This can be used to
change the "scope" or "range" of a function or object from global to local.






Simple example from Stackoverflow:

```
# all_syntax_part_a.py

__all__ = ['bar', 'baz']

waz = 5
bar = 10

def baz(): return 'baz'



# importing this in all_syntax_part_b.py

```



```
# all_syntax_part_b.py
from all_syntax_part_a import *
print(bar)
print(baz)

try:
        print(waz)
except:
        print("error printing waz since it was not included \nin the __all__ dunder method override")

```


