# GGplot2 Layout:

```
graph <- dataframe %>%
ggplot(aes(x = dataframe$x.axis, fill = dataframe$y.axis)) +
geom_bar() +
labs(title = "Title",
	subtitle = "Subtitle",
	xlab = "X Label",
	ylab = "Y label",
	caption = "Bottom of the graph, small text") +
theme(axis.text.x = element_text(face="bold", color="#993333", # changing the x axis label
                           size=14, angle=45),
          axis.text.y = element_text(face="bold", color="#993333", 
                           size=14, angle=45))
```

### Alternatively:

```
graph <- dataframe %>%
ggplot(aes(x = dataframe$x.axis, y = dataframe$y.axis)) +
geom_point() +
ggtitle(label) # for the main title
xlab(label) # for the x axis label
ylab(label) # for the y axis label
labs(...) # for the main title, axis labels and legend titles


```



# Listing a ton of colors in R:
```
grDevices::colors()

```


# Setting Color Palettes:
```

# RColorBrewer::display.brewer.all(colorblindFriendly = TRUE)
# RColorBrewer::display.brewer.all()


# this is a RColorBrewer function to set your own palette
mypalette<-brewer.pal(7,"Greens")


# using colorFactor is a leaflet() function
palPaired_byCitzenRace <- colorFactor(palette = 'Set1',
                                      domain = UOF.df$CIT_RACE)


palPaired_byCitzenSex <-
  colorFactor(palette = c('#AE9C45', '#6073B1', '#052955'),
              domain = UOF.df$CIT_SEX)


```

### Large Example of using the above [might need to be refactored] in a shiny app:


```
 output$UOF.map_sex <- renderLeaflet({
    leaflet(options = c(
      leafletOptions(minZoom = 0, maxZoom = 12),
      leafletOptions(preferCanvas = TRUE) # to speed up the rendering
    )) %>%
      addTiles(options = tileOptions(updateWhenZooming = FALSE,      # map won't update tiles until zoom is done
                                     updateWhenIdle = TRUE)) %>%            # map won't load new tiles when panning))
      addCircleMarkers(
        data = locationByYear_sex(),
        popup = paste0(UOF.df$UOF_REASON,
                       "; ",
                       UOF.df$CITCHARGE_TYPE),
        label = paste0(
          UOF.df$UOF_FORCE_TYPE,
          " by ",
          stringr::str_to_lower(UOF.df$OFF_SEX),
          " officer"
        ),
        color = ~ palPaired_byCitzenSex(UOF.df$CIT_SEX),
        opacity = 1.2
      ) %>%
      addLegend(
        position = "bottomright",
        pal = palPaired_byCitzenSex,
        values = UOF.df$CIT_SEX,
        opacity = 1,
        # note, when changing the opacity and using a color pallete for information the color pallete also will have the alpha change
        title = paste0(
          count(locationByYear_sex()),
          " UOF Occurances in ",
          input$userSelectedYearSex_leafletMap,
          ", citizen sex by color"
        )
      )
  })
 

```
