# Tips on R

# Getting the docs with help()
	- R has docs on most all functions and methods, make sure the library is imported 
		and then you can call help() on the function name without calling the library explcitly
```
library("dplyr")

help(mutate_all)

```


# Rstudio
- restart R session
	`CTRL/CMD + Shift + F10`


## R vs Tidyverse
Side note on R::ifelse vs dpylr::if_else, if_else is type/class strict and faster,
so rule of thumb is to use ifelse()
only when you need to batch rename different data types/classes
ALSO, when using either, put the most strict condition first, since R linearly processes the statement

### Filtering observations to see outliers and what needs to be cleaned

```r

# script to filter to your desires
# so you can grab anything from the select variable
# this selects all of the observations with a backslash in the variables VARIABLE_NAME

x <-
  wrangled.df %>%  dplyr::filter(grepl("/", VARIABLE_NAME))
```
### Mutating the observation after you find a pattern of messy data in the obseravtion 
_(from using the above "algorithm" to see what you're working with, filtering using things like the interstate)_

```r
wrangledUOF.df <-
  wrangledUOF.df %>%  dplyr::mutate(STREET = ifelse(
    grepl('I70|I65|I465|I-70|I-65|I-465|INTERSTATE',
          STREET),
    "INDOT",
    STREET
  ))

```


# Joining CSV tables:

```r
# combine all of these with join_full()
# have since moved the saved files for organization, hense the path differences
geo_1 <-
  read_csv("../CleanData/UOF/geoCodedAddressesUOF_1_10000.csv")
geo_2 <-
  read_csv("../CleanData/UOF/geoCodedAddressesUOF_10001_20000.csv")
geo_3 <-
  read_csv("../CleanData/UOF/geoCodedAddressesUOF_20001_30000.csv")
geo_4 <-
  read_csv("../CleanData/UOF/geoCodedAddressesUOF_30001_40000.csv")
geo_5 <-
  read_csv("../CleanData/UOF/geoCodedAddressesUOF_40001_50000.csv")
geo_6 <-
  read_csv("../CleanData/UOF/geoCodedAddressesUOF_50001_63413.csv")


# fastest way I've seen without having a nested, hard to read mess (but would love a better way)
join_1 <- full_join(geo_1, geo_2)
join_2 <- full_join(join_1, geo_3)
join_3 <- full_join(join_2, geo_4)
join_4 <- full_join(join_3, geo_5)

final_join <- full_join(join_4, geo_6) %>%
  write_csv("cleanedUOF_withGeoLocation.csv")
```
