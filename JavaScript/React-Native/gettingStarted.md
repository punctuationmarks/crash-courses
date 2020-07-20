# Getting started 
## Android on Linux

- To initialize a react native app with npx and react-native
```
$ npx react-native init HelloWorld
```

- To run the HelloWorld app
    - First open Android Studio, with the /android folder inside of the react native app (it'll have an android symbol)
        - Turn on a emulated android phone, have your android plugged in (with developer mode turned on), or do both.
        - This will probably just show a red error screen until the server and app is actualy running
    - Run the "server" in one terminal (this needs to keep running)
    - Then run the actual android version of the app from a second terminal 


- Terminal one (running the server)
```
$ npx react-native start
```
- Terminal two (running the react-native android app)
```
$ npx react-native run-android
```
