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


## Hooks
- `useColorScheme()` 
  - Allows the status or override of the user's color scheme (currenly just `"light"`, `"dark"` or null which I assume defaults to system)
  - This hook allows you to update the app's color scheme based on the user's system preference or by letting the user click a button and change the color scheme in the app itself
- `userWindowDimensions()`
  - Automatically tracks and updates the window's height and width:
  ```JS
  const windowHeight = userWindowDimensions().height;
  const windowWdith = userWindowDimensions().width;
  ```

  - Has many more properties, including `fontScale`, `scale` (note, a returned value of `1` indicates a PPI/DPI of 96 or 76 and a `2` indicates a Retina or high DPI display, i.e. `1` is for cheaper phones, `2` is for pricier), 

- The react native community has many [hooks](https://github.com/react-native-community/hooks), some of which are useful are `useAppState` (returns `active` or `background` (android)/ `inactive` (ios)), `useCameraRoll`, `useClipboard`
## Views


### `<SafeAreaView>`
Everything in this view can be seen on screen and is in the area under things like the `<Statusbar>`

### `<ScrollView>`

Scroll view wraps an area and allows scrolling. It can wrap other `<views>`, `<texts>`, `<images>`, ect renders all of its components at once, which is only useful when there are few elements. If you want "lazy load" of at least the elements on the page, use `<Flatlist>` which only renders what the user can see. (NOTE: true lazy rendering will probably be more complex, think about how the data is coming down from the api/backend --> this will also increase efficiency)

Scrolling container that can even contain other views (from webdev, think `<div>`). Loads entire view even if not visible on current screen. 




### `<Statusbar >`
This is the literal header of the app, if it's a phone, it's the part where the time, data, wifi, ect are displayed. This can be styled however you would like instead of using the defaults. 


### `<FlatList>`
Only renders what the user can see (also allows scroll loading -> which I feel like is implied on the "only rendering..." but whatever). Allows for pull to refresh. Allows ScrollToIndex (I'm assuming this means something like #bottom in web-dev). The syntax and use of this built in component is much more complicated than a simple scroll view. Here are some examples:

```JS
<FlatList

    data={DATA} // takes an array of objects, here it's an object with title and id parameters
    
    renderItem={renderItem} // this takes a function (declared previously in the .js file) that passes data through an element e.g. <Text>{item.title}
    
    keyExtractor={item => item.id} // grabs a unique key from the DATA passed above. 
    // Its default is to look for item.key and then falls back to item.index() if a function specifying the key is not passed 

    extraData={selected} // by passing something to "extraData" this will be sure to be updated with new data being passed to it
    // without this the FlatList will not be updated on data change __READ MORE INTO THIS <-- THIS FEELS NOT FULLY COMPLETE__
    // docs:  If any of your renderItem, Header, Footer, etc. functions depend on anything outside of the data prop, stick it here and treat it immutably.
/>
```

- Props (there are more, this is a swiss army view component):
    -REQUIRED:
        - `renderItem({item, index, separators})`
            - item is the object's item itself, and the index is the index of that item
            - separators has multiple parameters   <--- __READ MORE INTO THIS <-- THIS FEELS NOT FULLY COMPLETE__
                - `highlight` (Function)
                - `unhighlight` (Function)
                - `updateProps` (Function)
                    - `select` (enum('leading', 'trailing'))
                    - `newProps` (Object) 
        - `data`
            - an array, usually of objects
    - SOME INTERESTING OPTIONAL PARAMTERS:
        - `keyExtractor`
            - Extracts a key so each of the children elements will havea  unique key. Takes a function telling react native how to make the key, although its default is to look for item.key and then falls back to item.index() if a function specifying the key is not passed
        - `extraData`
            - if you want your data to "refresh" add a variable of any type for the FlatList to also trigger an update (pthink of a useEffect with extra "trigger" to rerender outside of the declared dependecies). __READ MORE INTO THIS <-- THIS FEELS NOT FULLY COMPLETE__
        - `refreshing`
            - boolean value, set to true while waiting on data from a refesh  __READ MORE INTO THIS <-- THIS FEELS NOT FULLY COMPLETE__
        - `onEndReached` & `onEndReachedThreshold`
            - called once the user gets to the end of the visibile list items, it's a way to make the FlatList more custom to trigger when you want it to instead of letting react-native handle that
        - `initialNumToRender`
            - this takes a number if you want to render x number of items instead of having react native handle this
        - `initialScrollToIndex`
            - specifies the index of list items that is initially shown and rendered (e.g. show the user the 4th item at the top on first render, kinda like anchor tags in web dev (like home/#bottom)) 
        - `List{Footer, Header}Component`
            - Adding a footer/header component to the flat list view area, can be styled directly with List{Footer, Header}ComponentStyle 


This looks like a more complex use of the FlatList:

```jsx
<FlatList
  ItemSeparatorComponent={
    Platform.OS !== 'android' &&
    (({ highlighted }) => (
      <View
        style={[
          style.separator,
          highlighted && { marginLeft: 0 }
        ]}
      />
    ))
  }
  data={[{ title: 'Title Text', key: 'item1' }]}
  renderItem={({ item, index, separators }) => (
    <TouchableHighlight
      key={item.key}
      onPress={() => this._onPress(item)}
      onShowUnderlay={separators.highlight}
      onHideUnderlay={separators.unhighlight}>
      <View style={{ backgroundColor: 'white' }}>
        <Text>{item.title}</Text>
      </View>
    </TouchableHighlight>
  )}
/>
```















### Image Style Specific Props

There are many style specific props only on `<Images>`. Think `borderTopRightRadius` which "clips" the top right border of the image in a circle (if passed a whole number). and think things like `border{Color, Radius, Width}`, `opacity`, `resizeMode({"cover", "contian", "stretch", "repeat", "center")}`, `tinColor`, `overlayColor`. 




- `onPress` is returned when the user presses something. 
It returns an object:
```js
{
    changedTouches: [PressEvent],
    identifier: 1, // unique, perhaps thought of as a "key" in react?
    locationX: 8, // in relation to the parent element
    locationY: 4.5,
    pageX: 24, // in relation to the actual root of the page
    pageY: 49.5,
    target: 1127, // the id of the element the PressEvent is aimed at
    timestamp: 85131876.58868201, // time kept in miliseconds
    touches: [] // array of "all current touches" on screen
}
```

- on press events are used by:
    - Button
    - PanResponder
    - Pressable
    - ScrollView
    - Text
    - TextInput
    - TouchableHighlight
    - TouchableOpacity
    - TouchableNativeFeedback
    - TouchableWithoutFeedback
    - View
















# Gotchas

- You must import React to use any JSXp

- Any type of error, (as far as I know, anywhere in the app) will make the app crash
- All text must be in `<Text>`
- CSS styling is based off of flexbox and is much more limited than web based css, especially things like shadow




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


