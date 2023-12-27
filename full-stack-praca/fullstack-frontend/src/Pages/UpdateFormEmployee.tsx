import axios from 'axios';
import {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {CssBaseline, Table, TableBody, TableCell, TableRow, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";


export const FormCompUpdateEmp = () => {
    const inputStyle = {border: "2px solid black", height: 350, "padding": 10}

    const {id} = useParams();
    const [values, setValues] = useState({
        Id: id,
        firstName: '',
        lastName: '',
        phoneNumber: ''
    })
    useEffect(() => {
        axios.get(`http://localhost:8090/employees/` + id)
            .then(res => {
                setValues({
                    ...values,
                    firstName: res.data.firstName,
                    lastName: res.data.lastName,
                    phoneNumber: res.data.phoneNumber
                })
            })


    }, [])

    const navigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault()
        axios.put(`http://localhost:8090/employees/` + id, values,
        )
            .then(res => {

                console.log(res.data)
                navigate(`/Pages/Employees`)
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
                            <TableRow><TableCell><h3>First name:</h3></TableCell><TableCell><TextField type="text"
                                                                                                       name="firstName"
                                                                                                       value={values.firstName}
                                                                                                       onChange={e => setValues({
                                                                                                           ...values,
                                                                                                           firstName: e.target.value
                                                                                                       })}/></TableCell></TableRow>
                            <TableRow><TableCell><h3>Last name:</h3></TableCell><TableCell><TextField type="text"
                                                                                                      name="lastName"
                                                                                                      value={values.lastName}
                                                                                                      onChange={e => setValues({
                                                                                                          ...values,
                                                                                                          lastName: e.target.value
                                                                                                      })}/></TableCell></TableRow>
                            <TableRow><TableCell><h3>Phone:</h3></TableCell><TableCell><TextField type="text"
                                                                                                  name="phoneNumber"
                                                                                                  value={values.phoneNumber}
                                                                                                  onChange={e => setValues({
                                                                                                      ...values,
                                                                                                      phoneNumber: e.target.value
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
export default FormCompUpdateEmp;