import axios from 'axios';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {CssBaseline, Table, TableBody, TableCell, TableRow, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";


export const FormComp = () => {
    interface person {
        firstName: string
        lastName: string
        phoneNumber: number;
    }

    interface response {
        response: string | "No Response"
    }

    const initialState: person = {
        firstName: "ExampleName",
        lastName: "ExampleLastname",
        phoneNumber: 483929384
    }
    const inputStyle = {border: "2px solid black", height: 350, "padding": 10}
    const [person, setPerson] = useState<person>(initialState)
    const [response, setResponse] = useState<response>()

    const navigate = useNavigate()

    const sumbitForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        axios.post<response>('http://localhost:8090/employees/', person)
            .then((response) => {
                setResponse(response.data)
                console.log(response.data)
                navigate('/Pages/Employees');

            })
            .catch(function (error) {
                console.log(error);
            });
    }
    const onChangeHandler = (event: HTMLInputElement) => {
        const {name, value} = event
        setPerson((prev) => {
            return {...prev, [name]: value}
        })
    }

    return (
        <>
            <CssBaseline/>
            <Container sx={{bgcolor: "white", paddingTop: "40px"}} maxWidth={false} disableGutters>
                <form onSubmit={sumbitForm}>
                    <Table style={inputStyle}>
                        <TableBody>
                            <TableRow sx={{height: "10vh"}}><TableCell><h3>First name:</h3>
                            </TableCell><TableCell><TextField type="text"
                                                              name="firstName"
                                                              value={person.firstName}
                                                              onChange={(e) => onChangeHandler(e.target)}/></TableCell></TableRow>
                            <TableRow sx={{height: "10vh"}}><TableCell><h3>Last name:</h3>
                            </TableCell><TableCell><TextField type="text"
                                                              name="lastName"
                                                              value={person.lastName}
                                                              onChange={(e) => onChangeHandler(e.target)}/></TableCell></TableRow>
                            <TableRow sx={{height: "10vh"}}><TableCell><h3>Phone:</h3></TableCell><TableCell><TextField
                                type="text"
                                name="phoneNumber"
                                value={person.phoneNumber}
                                onChange={(e) => onChangeHandler(e.target)}/></TableCell></TableRow>
                            <TableRow><TableCell><Button sx={{backgroundColor: 'wheat', color: "text.primary"}}
                                                         type="submit">Submit</Button></TableCell></TableRow>
                            {response?.response && <tr>
                                <td colSpan={2}>{response.response}</td>
                            </tr>}


                        </TableBody>
                    </Table>
                </form>
            </Container>
        </>

    )
}
export default FormComp;