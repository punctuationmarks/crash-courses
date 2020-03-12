Using tidyverse to import and write csv is UTF-8 by default, and 10x faster than base::

use read_csv() for comma dilliminated csv files
use read_csv2() for semi-colon dilliminated csv files (used in many other countries besides USA)


Super interesting difference between base:: string functions
and stringr functions, base:: functions DO SOMETHING TO FUCK 
WITH STRINGS (IT AIN'T VECTORIZED), so don't mix and match
them or you might increase your dataset to 500-1000x the size 
(no joke)



# Cool tip on getting more info and docs on a package, while in RStudio
vignette(package = "sf") # see which vignettes are available
vignette("sf1")          # an introduction to the package

