## MUI Custom UI Components

> 💡Highlight: Customized Tree Select component made with MUI's Autocomplete & List components

![TreeSelect](screenshots/TreeSelect.png)

### Description

A set of customized MUI components designed to reduce redundancy & improve readability during frontend development using
React.js and MUI. Can be easily
used along with react-hook-form.

### Installation

```
npm i @lulutheflaneur/mui-custom-components
```

### Usage

```
import { TreeSelectMui } from "@lulutheflaneur/mui-custom-components";

import { useState } from "react";

function App() {

    const optionTree = [
        {
            children_data: [{code: '1a', level: 2, nodeLabel: 'Class 1A'},
                {code: '1b', level: 2, nodeLabel: 'Class 1B'},
                {code: '1c', level: 2, nodeLabel: 'Class 1C'}],
            code: 'p1',
            disabled: true,
            level: 1,
            nodeLabel: 'Year 1'
        },
        {
            children_data: [{code: '2a', level: 2, nodeLabel: 'Class 2A'},
                {code: '2b', level: 2, nodeLabel: 'Class 2B'},
                {code: '2c', level: 2, nodeLabel: 'Class 2C'}],
            code: 'p2',
            disabled: true,
            level: 1,
            nodeLabel: 'Year 2'
        }
    ]

    const [schoolClass, setSchoolClass] = useState('')

    const setValue = (_, classId) => {
        setSchoolClass(classId);
    };

    return (
        <TreeSelectMui
            defaultExpandAll
            label="Class"
            labelKey="nodeLabel"
            name="schoolClass"
            nestedTree={optionTree}
            valueKey="code"
            setValue={setValue}
            uniqueKey="code"
        />
    )
    
}
```

### Story behind...

I was migrating a React.js, antd-based project to MUI. TreeView API is available in MUI but it seems impossible to be
used with Select / AutoComplete components for UI consistency. So, I tried writing a TreeSelect using MUI AutoComplete
and List components during my leisure time. ;)

### Components

- ButtonMui
- CheckboxMui
- DataGridMui
- FileUploadMui
- InputMui
- ModalMui
- RowMui
- SelectMui
- SnackbarMui
- SpanMui
- SwitchMui
- TextareaAutosizeMui
- TreeSelectMui
