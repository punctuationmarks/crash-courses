# Ajax
- Aysnchronous JavaScript and XML
- This allows for json data to be piped in from an API as bytes and then transformed into a string



- Simple example from FreeCodeCamp's cat json api
- Note this is not upto date on "modern" pracitces, use the fetch() call normally
```
<script>
    document.addEventListener('DOMContentLoaded', function () {
        document.getElementById('getMessage').onclick = function () {
            // initializing the class
            const request = new XMLHttpRequest();
            // defining the type of request 
            // where the reqest is coming from 
            // and boolean on asynchronous request
            request.open("GET", '/json/cats.json', true)
            // actually sending the request
            request.send()
            // parses the byte data into stringified json
            // once the request is loaded
            request.onload = function () {
                // coverting the bytes into json
                const json = JSON.parse(request.responseText);
                // stringifying the json and displaying it on screen
                document.getElementsByClassName('message')[0].innerHTML = JSON.stringify(json)

            }
        };
    });
</script>

<style>
    body {
        text - align: center;
        font-family: "Helvetica", sans-serif;
    }

    h1 {
        font - size: 2em;
        font-weight: bold;
    }

    .box {
        border - radius: 5px;
        background-color: #eee;
        padding: 20px 5px;
    }

    button {
        color: white;
        background-color: #4791d0;
        border-radius: 5px;
        border: 1px solid #4791d0;
        padding: 5px 10px 8px 10px;
    }

    button:hover {
        background - color: #0F5897;
        border: 1px solid #0F5897;
    }
</style>

<h1>Cat Photo Finder</h1>
<p class="message box">
    The message will go here
</p>
<p>
    <button id="getMessage">
        Get Message
    </button>
</p>

```




- Here is the same script as above, but using the modern fetch() method (which returns a promise) instead of XMLHttpRequest() class
```
document.addEventListener('DOMContentLoaded', () =>  {
    document.getElementById('getMessage').onclick = () => {
        fetch('/json/cats.json')
            .then(response => response.json())
            .then(data => {
                document.getElementById('message').innerHTML = JSON.stringify(data)
            })
    };
});
```



# Things to note while working in JSON with javascript
- Since the JSON data is returned as an array of objects and objects can also have arrays and objects in them, accessing the data can look interesting
```
json[2].keyName[1] // this returns the the second item in the keyName object in the third object in the returned json array
// or it is the third objects' keyName key and only returning the specified index of that value's array
```



- Filtering out JSON objects based on index (since json data is an array)
- Example from freecodecamp
```
<script>
    document.addEventListener('DOMContentLoaded', function(){
        document.getElementById('getMessage').onclick = function () {
            const req = new XMLHttpRequest();
            req.open("GET", '/json/cats.json', true);
            req.send();
            req.onload = function () {
                let json = JSON.parse(req.responseText);
                let html = "";
                // Add your code below this line
                json = json.filter((val) => {
                    return (val.id !== 1);
                })

                // Add your code above this line
                json.forEach(function (val) {
                    html += "<div class = 'cat'>"

                    html += "<img src = '" + val.imageLink + "' " + "alt='" + val.altText + "'>"

                    html += "</div>"
                });
                document.getElementsByClassName('message')[0].innerHTML = html;
            };
        };
  });
</script>

    <style>
        body {
            text - align: center;
    font-family: "Helvetica", sans-serif;
  }
  h1 {
            font - size: 2em;
    font-weight: bold;
  }
  .box {
            border - radius: 5px;
    background-color: #eee;
    padding: 20px 5px;
  }
  button {
            color: white;
    background-color: #4791d0;
    border-radius: 5px;
    border: 1px solid #4791d0;
    padding: 5px 10px 8px 10px;
  }
  button:hover {
            background - color: #0F5897;
    border: 1px solid #0F5897;
  }
</style>

    <h1>Cat Photo Finder</h1>
    <p class="message box">
        The message will go here
</p>
    <p>
        <button id="getMessage">
            Get Message
  </button>
    </p>


```


- Post requests
  - Example from freecodecamp
```
<script>
    document.addEventListener('DOMContentLoaded', function(){
        document.getElementById('sendMessage').onclick = function () {

            const userName = document.getElementById('name').value;
            const url = 'https://jsonplaceholder.typicode.com/posts';
            const xhr = new XMLHttpRequest()
            // building the request, it'll be sending a post request asynchronously to the specified URL
            xhr.open('POST', url, true);
            // since it's a post request, we have to declare the header, type and encoding
            xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
            xhr.onreadystatechange = function () {
                // readyState 4 means the operation is complete
                // and 201 is http status of sucessful
                if (xhr.readyState === 4 && xhr.status === 201) {
                    const serverResponse = JSON.parse(xhr.response);
                    document.getElementsByClassName('message')[0].textContent = serverResponse.userName + serverResponse.suffix;
                }
            };
            const body = JSON.stringify({ userName: userName, suffix: ' loves cats!' });
            xhr.send(body);

        };
  });
</script>

    <style>
        body {
            text - align: center;
    font-family: "Helvetica", sans-serif;
  }
  h1 {
            font - size: 2em;
    font-weight: bold;
  }
  .box {
            border - radius: 5px;
    background-color: #eee;
    padding: 20px 5px;
  }
  button {
            color: white;
    background-color: #4791d0;
    border-radius: 5px;
    border: 1px solid #4791d0;
    padding: 5px 10px 8px 10px;
  }
  button:hover {
            background - color: #0F5897;
    border: 1px solid #0F5897;
  }
</style>

    <h1>Cat Friends</h1>
    <p class="message box">
        Reply from Server will be here
</p>
    <p>
        <label for="name">Your name:
    <input type="text" id="name" />
        </label>
        <button id="sendMessage">
            Send Message
  </button>
    </p>

```
