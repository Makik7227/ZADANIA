import {
    CssBaseline,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow
} from "@mui/material";
import React, {useEffect, useState} from "react";
import axios from "axios";
import './Employee.css';
import Button from "@mui/material/Button";
import {Link, useNavigate} from "react-router-dom";
import Container from "@mui/material/Container";

function Employee() {

    const [page, setPage] = React.useState(0);
    const [employees, setEmployee] = useState<any[]>([])
    const [rowperpage] = useState(5);
    const refresh = () => window.location.reload();

    const loadEmployee = async () => {
        await axios.get("http://localhost:8090/employees/", {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json;charset=UTF-8'
                }
            }
        ).then((result) => {
            console.log(result.data);
            setEmployee(result.data);
        })

    }

    const handleChangePage = (_event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = () => {
        setPage(0);
    };

    useEffect(() => {
        loadEmployee();
    }, []);

    const deleteEmployee = async (id: number) => {

        await axios.delete(`http://localhost:8090/employees/${id}`, {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json;charset=UTF-8'
                }

            }
        ).then((result) => {
            console.log(result.data);
            setEmployee(result.data);
            refresh();
        })
    }

    const navigate = useNavigate();


    return (
        <>
            <CssBaseline></CssBaseline>
            <Container maxWidth="xl" sx={{bgcolor: "white", paddingTop: "20px", width: "100%"}}>
                <Button onClick={() => navigate("/Pages/AddEmployeeForm")} variant="contained"
                        sx={{bgcolor: 'lightskyblue', color: "text.primary"}}>ADD EMPLOYEE</Button>
                <Table className="table" sx={{width: "100%"}} aria-label="simple table">

                    <TableContainer component={Paper}>
                        <TableHead>
                            <TableRow sx={{'&:last-child td, &:last-child th': {border: 1}}}>

                                <TableCell>Id</TableCell>
                                <TableCell>First name</TableCell>
                                <TableCell>Last name</TableCell>
                                <TableCell>Phone</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {employees
                                .slice(page * rowperpage, page * rowperpage + rowperpage)
                                .map((employee) => {
                                    return (<TableRow

                                            sx={{border: 1}}
                                        >


                                            <TableCell sx={{width: 500}} className="sticky-table-cell" align="left"
                                                       key={employee.id}>{employee.id}</TableCell>
                                            <TableCell sx={{width: 500}} className="sticky-table-cell" align="right">
                                                {employee.firstName}</TableCell>
                                            <TableCell sx={{width: 500}} className="sticky-table-cell" align="right">
                                                {employee.lastName}</TableCell>
                                            <TableCell sx={{width: 500}} className="sticky-table-cell" align="right">
                                                {employee.phoneNumber}</TableCell>
                                            <TableCell sx={{width: 500}} className="sticky-table-cell"
                                                       align="right"><Button onClick={() => deleteEmployee(employee.id)}
                                                                             variant="contained"
                                                                             sx={{width: "30%"}}>DELETE</Button>
                                                <Link to={`/Pages/UpdateFormEmployee/${employee.id}`}><Button
                                                    variant="contained" sx={{width: "30%"}}>UPDATE</Button></Link>
                                                <Link to={`/Pages/EmployeeDetails/${employee.id}`}><Button
                                                    variant="contained"
                                                    sx={{width: "30%"}}>DETAILS</Button></Link></TableCell>

                                        </TableRow>
                                    )
                                })}
                        </TableBody>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5]}
                        component="div"
                        count={employees.length}
                        rowsPerPage={rowperpage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Table>
            </Container>


        </>
    )
}

export default Employee;