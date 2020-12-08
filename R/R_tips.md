Using tidyverse to import and write csv is UTF-8 by default, and 10x faster than base::

```r
use read_csv() # for comma dilliminated csv files
use read_csv2() # for semi-colon dilliminated csv files (used in many other countries besides USA)
```

Super interesting difference between base:: string functions
and stringr functions, base:: functions manipulate the strings and it is not vectorized.
So don't mix and match them or you might increase your dataset to 500-1000x the size which might drain your CPU (no joke)



# Cool tip on getting more info and docs on a package, while in RStudio
```r
vignette(package = "sf") # see which vignettes are available
vignette("sf1")          # an introduction to the package
```
