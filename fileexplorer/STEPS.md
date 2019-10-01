# Planning react app

## Component tree / Component structure
- App
    - Layout
        - Modal
        - Messages (reuse Modal)
            - Message
        - Header
            - Logo
            - Search
            - ActionsF
                - Action
            - Settings
        - SideBar
            - Create Folder Btn
            - Folders Tree
                - Folder
        - Main view
            - Files
                - File
                - Actions
                    - Action
        - Preview (Detail) view
            - Details
        - {props.SelectedItem}
        - {props.ActiveFolder}
        - {props.ActiveFile}
        - {props.ViewMode}    


## Application State (Data)
- State
    - FoldersTree - js object of Folders
    - ActiveFolder
    - FoldersItems - js object of Files and Folders
    - SelectedItem
    - ViewMode
    

## Components vs Containers

https://medium.com/material-ui/material-ui-v4-is-out-4b7587d1e701
https://material-ui.com/api/app-bar/



https://redux.js.org/basics/example
https://react-redux.js.org/introduction/quick-start
https://habr.com/ru/post/269831/
https://metanit.com/web/react/5.3.php

https://medium.com/hackernoon/redux-patterns-caching-an-api-response-f85f8d8d73c6
https://github.com/reduxjs/redux/tree/master/examples/tree-view
https://codesandbox.io/embed/github/reduxjs/redux/tree/master/examples/tree-view


https://github.com/danilowoz/react-content-loader
http://danilowoz.com/create-content-loader/
