import {ButtonMui, CheckboxMui, InputMui, RowMui, TreeSelectMui} from "@lulutheflaneur/mui-custom-components";
import {Grid} from "@mui/material";
import {useRef, useState} from "react";

function App() {

    const [schoolClass, setSchoolClass] = useState('')

    const nameRef = useRef(null);
    const ageRef = useRef(null)
    const returningStudentRef = useRef(null)

    const handleSubmit = () => {
        console.log('-------------------------------')
        console.log('Name: ', nameRef.current.value)
        console.log('Age: ', ageRef.current.value)
        console.log('Class: ', schoolClass)
        console.log('Is returning student: ', returningStudentRef.current.checked)
        console.log('-------------------------------')

    }

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
        <Grid container spacing={2} style={{padding: 50}}>
            <RowMui justifyContent="center">
                <Grid item xs={6}>
                    <InputMui label="name" InputLabelProps={{shrink: true}} ref={nameRef}/>
                </Grid>

                <Grid item xs={6}>
                    <InputMui label="age" type="number" InputLabelProps={{shrink: true}} ref={ageRef}/>
                </Grid>
            </RowMui>

            <RowMui><CheckboxMui label="Are you a returning student?" ref={returningStudentRef}/></RowMui>

            <RowMui style={{paddingLeft: '1rem'}}>
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
            </RowMui>

            <RowMui>
                <ButtonMui text="Submit" onClick={handleSubmit}/>
            </RowMui>
        </Grid>

    </div>)
}

export default App
