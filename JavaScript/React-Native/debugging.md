## Debugger with React Native pluggin
- In VS Code, use the package React Native
- Create a launch.json file in the root/.vscode
- Here you can search for the debugger configuration through intellisense, but it'll look something like this (this is debugging for android and a package like chrome?):
    - The first two steps can also be done throught the GUI, click debugger icon on the side panel (`crtl-shift-d`)
    - Select create launch.json
    - Select the desired configurations

```
{
    // Use IntelliSense to learn about possible attributes.
    // Hover to view descriptions of existing attributes.
    // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
    "version": "0.2.0",
    "configurations": [
        {
            "name": "Debug Android",
            "cwd": "${workspaceFolder}",
            "type": "reactnative",
            "request": "launch",
            "platform": "android"
        },
        {
            "name": "Attach to packager",
            "cwd": "${workspaceFolder}",
            "type": "reactnative",
            "request": "attach"
        }
    ]
}
```



- Once you have a .vscode/launch.json file, you can run the debugger by `crtl-shift-d` or clicking the debugger icon on the sidepanels
- Here you can select which type of debugger (from the above example, it's either "Android" or "Attach to packager")



## Using the Attach to Packager
- To use the Chrome debugger with React Native, you have to change the port that the debugger is using from VS Code.
    - Go to VS Code settings (`ctrl-comma`)
    - search for `react-native.packager.port`
    - here change the default port of `8081` to `19001` because the chrome debugger is located at `http://localhost:19001/debugger-ui/` (also be sure to close that window because the web browser will be blocking connection to that port)
