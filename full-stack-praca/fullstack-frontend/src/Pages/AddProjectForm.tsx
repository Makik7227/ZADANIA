import axios from 'axios';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {CssBaseline, Table, TableBody, TableCell, TableRow, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";


export const FormCompProject = () => {
    interface project {
        name: string
    }

    interface response {
        response: string | "No Response"
    }

    const initialState: project = {
        name: "ExampleName",
    }
    const inputStyle = {border: "2px solid black", height: 180, "padding": 10}
    const [project, setProject] = useState<project>(initialState)
    const [response, setResponse] = useState<response>()

    const navigate = useNavigate()

    const sumbitForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        axios.post<response>('http://localhost:8090/projects/', project)
            .then((response) => {
                setResponse(response.data)
                console.log(response.data)
                navigate('/Pages/Projects');

            })
            .catch(function (error) {
                console.log(error);
            });
    }
    const onChangeHandler = (event: HTMLInputElement) => {
        const {name, value} = event
        setProject((prev) => {
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
                            <TableRow sx={{height: "10vh"}}><TableCell><h3>Name:</h3></TableCell><TableCell><TextField
                                type="text" name="name"
                                value={project.name}
                                onChange={(e) => onChangeHandler(e.target)}/></TableCell></TableRow>
                            <TableRow sx={{height: "10vh"}}><TableCell><Button
                                sx={{backgroundColor: 'wheat', color: "text.primary", width: "100%"}}
                                type="submit">Submit</Button></TableCell></TableRow>
                            {response?.response &&
                                <TableRow><TableCell colSpan={2}>{response.response}</TableCell></TableRow>}


                        </TableBody>
                    </Table>
                </form>
            </Container>
        </>

    )
}
export default FormCompProject;