# Flexbox

Gives the ability to aline "items" in a row or a column.
- Start with a container with the `display:flex;`
    - the flex container now controls how the "children" are laid out
    - default `flex-direction: row;`

## Tips with Flexbox
- Always keep in mind what the individual margins are doing, especially with list items 

## Rows and Columns
- `flex-direction: row;` has a __main axis__ that runs horizontally and a __cross axis__ that runs vertically
    - if adding an item with a fixed width, by default the items will start in the top left corner
        - this is due to the main axis starting on the left and cross axis starting on the top by default
    

- `flex-direction: column;` has  a __main axis__ that runs vertically and a __cross axis__ that runs horizontally



## Child items sizes and placement
- __main size__ The amount of space each item takes up in the row or column 
    - if each item in a flex-row has a fixed width of `50px;`, each item will be 50px next to eachother at the top left of the flex container by default
        - So if there are 600px width in a container, and 3 items, then each item will be 50px wide 
    - if each item in a flex-row has a fixed width of `100%;`, each item will be stretched out to fill the entire container
        - So if there are 600px width in a container, and 3 items, then each item will be 200px wide
        - A common way of thinking about this will be each item is a unit of a ratio that takes up the set ratio of space (1:1:1 in this case)
    - The ratio of space each item is taking up can be altered by setting the `flex: {ratio number}` on each individual item
        - So if there are 600px width in a container, and 3 items, with item_one set to `flex: 2;` (taking up 2 ratios), then item_one will have 300px width, and each other item item will be 150px wide (a ratio of 1:2:1)
        - The default is `flex: 1;` on each child item and is implied

- `justify-content` is how the items are spaced and/or aligned in a flex box on the __main axis__ . 
    - `justify-content: flex-start;` has the items starting at the default main and cross axes (default)
    - `justify-content: space-evenly;` has space "evenly" in between and on the outskirts of each item
    - `justify-content: space-between;` has space between items but no space on the outskirts of the flexbox
    - `justify-content: flex-end;` has the items at the furthest main and cross axes (opposite of the default)

- `align-items` is how the items are spaced and/or aligned in a flex box on the __cross axis__. 
    - `align-items: start;` has the items starting at the default main and cross axes (default)
    - `align-items: stretch;` stretches the items to fill the space
    - `align-items: center;` centers the items on the __cross axis__
    - `align-items: end;` has the items at the furthest main and cross axes (opposite of the default)




### Deeper dive
- `flex:`
    - Comination of `flex-grow`, `flex-shrink`, and `flex-basis`
    
    - `flex-grow`
        - positive means the item can "grow"
    - `flex-shrink`
        - positive means the item can "shrink" buuuut "only if their total values overflow the main axis"
    - `flex-basis`
        - "this is the value the items are using as their base value to grow and shrink from"
    - Default is `flex: 1 1 auto`


[Quick Video](https://www.youtube.com/watch?v=K74l26pE4YA)
[MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout/Basic_Concepts_of_Flexbox)