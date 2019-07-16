# Planning react app

## Component tree / Component structure
- App
    - Layout
        - Modal
        - Messages (reuse Modal)
            - Message
        - Toolbar
            - Logo
            - Search
            - Actions
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
