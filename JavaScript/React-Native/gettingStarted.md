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


- Terminal one (running the server) (__note: `npx` is optional__)
```
$ npx react-native start
```
- Terminal two (running the react-native android app)
```
$ npx react-native run-android
```

## Views

### `<ScrollView>`

- Scrolling container that can even contain other views (from webdev, think `<div>`). Loads entire view even if not visible on current screen. 


### `<FlatList>`

- List of updating content that is from a database or some form of Javascript object or a dataframe/csv whatever that is dynamic. Works well on long lists. Is lazy loaded (meaning only rendering what is needed for the current screen, if not in user's view (ie eyesight) then it will not be rendered). 

# Gotchas

- You must import React to use any JSXp

- Navigators can only contain screens
```JS
        <Stack.Navigator headerMode="none">
            <Stack.Screen name="SignIn" component={SignIn} />
            <Stack.Screen name="CreateAccount" component={CreateAccount} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
            <Text>This is invalid and will throw error</Text>
            <Stack.Screen name="ResetPassword" component={ResetPassword} />
        </Stack.Navigator>

```

- All text has to be in `<Text>`, so remember nothing is freefloating, even during "debugging"

- Things are very similar, but different for web dev, 
Text input example:

```js
<input 
  placeholder="Password"
  onChange={(txt) => setPassword(txt)}
  type="password />
``` 
vs.
```js
<TextInput   secureTextEntry={true} />`
                        placeholder="Password"
                        secureTextEntry={true}
                        onChangeText={(txt) => setPassword(txt)} />
```































~~this is a clusterfuck, fix it after you learn more~~
# TDD 
## Things needed for testing
```JS
/* Server capabilities.
* This is how you tell Appium Server,
* how to run the test, in other words config.
* You probably will want to move this out of here.
*/
const capabilities = {
  platformName: 'iOS', // or Android
  platformVersion: '12.1', // version of the OS
  deviceName: 'iPhone 8', // or Android Emulator or specific device
  automationName: 'XCUITest', // platform specific framework (UIAutomator2 for Android)
  app: '/path/to/.app' // path to app (in case of Android it's .apk)
}
```

- typical to use Detox for automated tests, Jest for unit and integration tests, and react-

```
$ yarn add --dev react-native-testing-library detox

```

- Initializing detox and Jest
```
punctuationmarks@ddoublespeak:~/Programming/Classes/ReactNative$ npx detox init -r jest

```


