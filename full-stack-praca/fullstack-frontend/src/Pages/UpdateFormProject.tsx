import axios from 'axios';
import {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {CssBaseline, Table, TableBody, TableCell, TableRow, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";


export const FormCompUpdateProject = () => {
    const inputStyle = {border: "2px solid black", height: 180, "padding": 10}

    const {id} = useParams();
    const [values, setValues] = useState({
        Id: id,
        name: '',
    })
    useEffect(() => {
        axios.get(`http://localhost:8090/projects/` + id)
            .then(res => {
                setValues({...values, name: res.data.name})
            })


    }, [])

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.put(`http://localhost:8090/projects/` + id, values,
        )
            .then(res => {

                console.log(res.data)
                navigate(`/Pages/Projects`)
            }).catch(function (error) {
            console.log(error);
        })
    }


    return (
        <>
            <CssBaseline/>
            <Container sx={{bgcolor: "white", paddingTop: "40px"}} maxWidth={false} disableGutters>
                <form onSubmit={handleSubmit}>
                    <Table style={inputStyle}>
                        <TableBody>
                            <TableRow><TableCell><h3>Name:</h3></TableCell><TableCell><TextField type="text"
                                                                                                 name="firstName"
                                                                                                 value={values.name}
                                                                                                 onChange={e => setValues({
                                                                                                     ...values,
                                                                                                     name: e.target.value
                                                                                                 })}/></TableCell></TableRow>
                            <TableRow><TableCell><Button sx={{backgroundColor: 'wheat', color: "text.primary"}}
                                                         type="submit">Submit</Button></TableCell></TableRow>
                        </TableBody>
                    </Table>
                </form>
            </Container>
        </>

    )
}
export default FormCompUpdateProject;