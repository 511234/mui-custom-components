import {InputMui, RowMui, TreeSelectMui} from "@lulutheflaneur/mui-custom-components";
import {Grid} from "@mui/material";
import {useState} from "react";

function App() {

    const [schoolClass, setSchoolClass] = useState('')

    const setValue = (_, classId) => {
        setSchoolClass(classId);
    };

    const optionTree = [{
        children_data: [{code: '1a', level: 2, nodeLabel: 'Class 1A'},
            {code: '1b', level: 2, nodeLabel: 'Class 1B'},
            {code: '1c', level: 2, nodeLabel: 'Class 1C'}],
        code: 'p1',
        disabled: true,
        level: 1,
        nodeLabel: 'Primary 1'
    }]

    return (<div className="App">
        <header className="App-header">
            <p>Sample lunch box ordering form using MUI Custom Component library
            </p>
        </header>
        <body>
        <RowMui>
            <RowMui justifyContent="center">
                <Grid item xs={6}>
                    <InputMui label="name" InputLabelProps={{shrink: true}}/>
                </Grid>

                <Grid item xs={6}>
                    <InputMui label="age" InputLabelProps={{shrink: true}}
                    />
                </Grid>
            </RowMui>
            <RowMui justifyContent="center">
                {/*<Grid item xs={6}>*/}
                <TreeSelectMui
                    defaultExpandAll
                    InputLabelProps={{shrink: true}}
                    label="Class"
                    labelKey="nodeLabel"
                    name="schoolClass"
                    nestedTree={optionTree}
                    valueKey="code"
                    setValue={setValue}
                    uniqueKey="code"
                />
                {/*</Grid>*/}
            </RowMui>
        </RowMui>
        </body>
    </div>)
}

export default App
