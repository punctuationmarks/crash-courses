# Using Tidyverse



## Matching strings and renaming 'obersvations' with mutate

```



#### NARROW CRIME SKELETON, NARROWS CRIMES INTO SMALLER SECTIONS ####
NARROW_CRIME_2019 <- ucr_2019 %>% 
  mutate(CRIME = if_else(stringr::str_detect(ucr_2019$CRIME, "(LARCENY)"), "LARCENY", CRIME)) %>% 
  mutate(CRIME = if_else(stringr::str_detect(ucr_2019$CRIME, "(AGGRAVATED ASSAULT)"), "AGGRAVATED ASSAULT", CRIME)) %>% 
  mutate(CRIME = if_else(stringr::str_detect(ucr_2019$CRIME, "(ROBBERY)"), "ROBBERY", CRIME)) %>%  
  mutate(CRIME = if_else(stringr::str_detect(ucr_2019$CRIME, "(BURG)"), "BURGLARY", CRIME)) %>% 
  count(CRIME, sort=TRUE) %>%
  rename("NUM_OCCURRANCES_IN_2019" = n)


```
