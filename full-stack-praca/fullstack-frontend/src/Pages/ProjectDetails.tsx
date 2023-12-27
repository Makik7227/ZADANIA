import {
    CssBaseline,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField
} from "@mui/material";
import {useEffect, useState} from "react";
import axios from "axios";
import './Employee.css';
import {Link, useParams} from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

/* eslint-disable @typescript-eslint/no-explicit-any */

function ProjectDetails() {


    const {id} = useParams();

    const [values, setValues] = useState({
        Id: id,
        name: '',
        hours: null
    })

    const [emp, setEmp] = useState<any[]>([])

    useEffect(() => {
        axios.get(`http://localhost:8090/projects/` + id)
            .then(res => {
                setValues({...values, name: res.data.name, hours: res.data.hours})
            })


    }, [])

    useEffect(() => {
        axios.get(`http://localhost:8090/projects/${id}/byId`)
            .then(res => {
                setEmp(res.data)
                console.log(res.data)
            }).catch(er => {
            console.log(er)
        })
    }, []);


    const [hours, setPerson] = useState<any[]>([])

    const handleAsign = (empId: number) => {
        axios.put(`http://localhost:8090/projects/hours/${empId}/${id}`, {hours: parseInt(hours)})
            .then(res => {
                console.log(res.data)
                window.location.reload();
            })
            .catch(function (error) {
                console.log(error);
            });
    }


    return (
        <>
            <CssBaseline/>
            <Container sx={{bgcolor: "white", paddingTop: "40px", allignItems: "center"}} maxWidth={false}
                       disableGutters>
                <Box sx={{bgcolor: "grey", position: "relative"}}>
                    <Typography sx={{color: "text.primary"}} variant="h1" gutterBottom>
                        Name: {values.name}
                    </Typography>
                    <Typography sx={{color: "text.primary"}} variant="h1" gutterBottom>
                        Id:{values.Id}
                    </Typography>
                </Box>


                <h1 style={{backgroundColor: "grey"}}>Assigned Employees</h1>

                <TableContainer component={Paper}>
                    <Table className="table" sx={{minWidth: 1200}} aria-label="simple table">
                        <TableHead>
                            <TableRow sx={{'&:last-child td, &:last-child th': {border: 1}}}>
                                <TableCell><h2>ID</h2></TableCell>
                                <TableCell align="right"><h2>NAME</h2></TableCell>
                                <TableCell align="right"><h2>LASTNAME</h2></TableCell>
                                <TableCell align="right"><h2>HOURS</h2></TableCell>
                                <TableCell align="right"><h2>ACTIONS</h2></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {emp.map((emp) => (
                                <TableRow sx={{border: 1}}>
                                    <TableCell className="sticky-table-cell" align="left" key={emp.id}><h3>{emp.id}</h3>
                                    </TableCell>
                                    <TableCell className="sticky-table-cell" align="right"><h3>{emp.firstName}</h3>
                                    </TableCell>
                                    <TableCell className="sticky-table-cell" align="right"><h3>{emp.lastName}</h3>
                                    </TableCell>
                                    <TableCell className="sticky-table-cell" align="right">
                                        <h3>{emp.hours}</h3>
                                        <TextField type="number" name="hours" value={null}
                                                   onChange={(e) => setPerson(e.target.value)}/></TableCell>
                                    <TableCell className="sticky-table-cell" align="right"><Button
                                        onClick={() => handleAsign(emp.id)}
                                        variant="contained"
                                        sx={{width: "50%", borderSpacing: "10px"}}
                                    >ADD HOURS</Button>
                                        <Link to={`/Pages/EmployeeDetails/${emp.id}`}><Button variant="contained"
                                                                                              sx={{width: "50%"}}>DETAILS</Button></Link></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>


            </Container>
        </>

    )
}

export default ProjectDetails;