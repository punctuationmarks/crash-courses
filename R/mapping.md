### Mapping in R


## Gathering the lat and lon of addresses with google maps api with just the street number, street, city and  state
- Note, you will need a api key, which is done with an account and linked credit card
- Also, note the first $300 worth is free, after that, google will charge your account, see their docs to avoid unwanted charges

```
library(tidyverse)
library(ggmap)


googleApiKey = "SECRET_KEY"
register_google(key=googleApiKey)

geoUOF.df <- wrangledUOF.df   

geoUOF.df <- geoUOF.df %>%  
  # filtering only the unique incnum since there is no reason we need to spend more $$
  # on addresses through google api than needed
  distinct(INCNUM, .keep_all = TRUE) %>%
  # removing the na that will be produced when the street_g is comibined into full address
  mutate(STREET_G = ifelse(is.na(STREET_G), " ", STREET_G))%>% 
  unite(STREET_ADD, STREET_N, STREET_G, STREET, STREET_T,
        sep = " ") %>%
  unite(FULL_ADD, STREET_ADD,
        CITY, STATE, sep = ", ") %>% 
  distinct(FULL_ADD, .keep_all = TRUE)
  
# View(geoUOF.df)




geoCodedAddresses_officer_involved_shootings <-
  geoUOF.df %>%
  # google maps api, returns lat/lon from address
  mutate_geocode(FULL_ADD) %>%
  # the lat/lon variables will be added via ggmaps
 rename(latitude = lat, longitude = lon)


```






## Reverse geocdoding latitude and longitude to get the zip code
- Free service through library revgeo, note you can't do this on super large datasets, they will throttle your usage


```

#### Adding the zip code with reverse geocoding

all_uof_cleaned_with_lat_lon <- read_csv("Datasets/UOF_all___with_lat_lon_up_to_dec_2019.csv")


# View(all_uof_cleaned_with_lat_lon)


# for reverse geocoding to gather zipcode
library(revgeo)


lat_long_for_reverse_geo <- all_uof_cleaned_with_lat_lon %>%
  # revgeo needs the lat and lon to be named explicitly
  rename(latitude = lat, longitude = lon) %>% 
  select(latitude, longitude, INCNUM) %>% 
  # unique so we're not quering the same lat/lon multiple times
  unique() %>%
  # we're using index as a joiner between revgeo's zipcodes and the original data so we can combine them later
  mutate(index=row_number())

#View(lat_long_for_reverse_geo)

lat_long_incnum_zip <- revgeo(lat_long_for_reverse_geo$longitude, lat_long_for_reverse_geo$latitude, provider =  'photon', output = 'frame') %>% 
 # creaintg the joining variable
  mutate(index = row_number()) %>%
  # only returning the joining variable and the zip code, revgeo also gives other data like city, state could be useful
  select(index, zip) %>% 
  # left joinging on the joining varaible "index", to not lose any data and not have anything excessive
  left_join(lat_long_for_reverse_geo, by="index") %>% 
  # dropping the index column, since it's not useful anymore
  select(-index)

View(lat_long_incnum_zip)

```
