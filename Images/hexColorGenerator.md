# Need just random colors? Need a ton of them? Generate some hex codes with some scripts







```
//js


function hexColorGenerator(num) {

    hexValue = [];

    for (let index = 0; index < num; index++) {
        // toString takes different parameters which alter the base 
        hexValue.push("#" + Math.random(6).toString(15).slice(2, 8));
        // console.log(hexValue);
    }       
    return hexValue;
}



console.log(hexColorGenerator(60));

```


```
# python3


import random

def hex_color_generator(num_of_hex_codes=0):
    hexValues = []

    alphabet = 'abcdef1234567890'

    for i in range(num_of_hex_codes):
        code = random.shuffle(alphabet)
        current_hex = "#" + code[0:6]
        hexValues += current_hex
    return hexValues


print(hex_color_generator(10))



```
