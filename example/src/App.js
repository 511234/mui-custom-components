import {
    ButtonMui,
    CheckboxMui,
    InputMui,
    RowMui,
    SelectMui,
    SnackbarMui,
    SpanMui,
    TreeSelectMui
} from "@lulutheflaneur/mui-custom-components";
import {Grid} from "@mui/material";
import {useRef, useState} from "react";

function App() {

    const [isSuccess, setIsSuccess] = useState(false);
    const [schoolClass, setSchoolClass] = useState('')
    const [lunchBox, setLunchBox] = useState('')

    const snackbarRef = useRef(null)
    const nameRef = useRef(null);
    const ageRef = useRef(null)
    const returningStudentRef = useRef(null)

    const handleLunchboxChange = (e) => {
        setLunchBox(e.target.value)
    }

    const handleSubmit = () => {
        snackbarRef.current.handleOpen()

        if (!nameRef.current.value || !ageRef.current.value || !schoolClass || !lunchBox) {
            setIsSuccess(false)
            snackbarRef.current.setMessage('Please fill in all fields')
            return;
        }

        setIsSuccess(true)
        snackbarRef.current.setMessage('Successfully submitted form')
        console.log('-------------------------------')
        console.log('Name: ', nameRef.current.value)
        console.log('Age: ', ageRef.current.value)
        console.log('Class: ', schoolClass)
        console.log('Is returning student: ', returningStudentRef.current.checked)
        console.log('Lunch box: ', lunchBox)
        console.log('-------------------------------')

    }

    const setValue = (_, classId) => {
        setSchoolClass(classId);
    };

    const lunchOptions = [
        {label: 'Lunch A: Pan seared halibut with asparagus', value: 'a'},
        {label: 'Lunch B: Banana waffles with hash brown and sausages', value: 'b'},
        {label: 'Lunch C: Chicken fried rice', value: 'c'},
    ]

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

    return (
        <>
            <div className="App">
                <header style={{textAlign: 'center'}}>
                    <SpanMui>
                        Sample lunch box ordering form using MUI Custom Component library
                    </SpanMui>
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

                    <RowMui style={{paddingLeft: '1rem'}}>
                        <SelectMui
                            InputLabelProps={{shrink: true}}
                            label="Select Lunchbox"
                            onChange={handleLunchboxChange}
                            options={lunchOptions}
                        />
                    </RowMui>

                    <RowMui style={{paddingLeft: '1rem'}}>
                        <CheckboxMui label="Are you a returning student?" ref={returningStudentRef}/>
                    </RowMui>

                    <br/>

                    <RowMui>
                        <ButtonMui text="Submit" onClick={handleSubmit}/>
                    </RowMui>
                </Grid>

            </div>
            <SnackbarMui
                ref={snackbarRef}
                severity={isSuccess ? 'success' : 'error'}
            />
        </>
    )
}

export default App
