package com.example.fullstackbackend.controller;

import com.example.fullstackbackend.dao.EmployeeDao;
import com.example.fullstackbackend.dao.EmployeeProjectDao;
import com.example.fullstackbackend.model.Employee;
import com.example.fullstackbackend.model.EmployeeProject;
import com.example.fullstackbackend.model.Project;
import com.example.fullstackbackend.model.ProjectAssigned;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("employees")
@CrossOrigin(origins = "http://localhost:5173")
public class EmployeeController {


    @Autowired
    EmployeeDao employeeDao;

    @Autowired
    EmployeeProjectDao employeeProjectDao;

    @GetMapping("/")
    public List<Employee> findAll() {
        return employeeDao.findAll();
    }


    @DeleteMapping(value = "/{id}")
    public void deleteEmployee(@PathVariable Integer id) {
        employeeProjectDao.deleteFromEmployeeProjects(id);
        employeeDao.delete(id);
    }

    @PostMapping(value = "/", consumes = "application/json")
    public void insert(@RequestBody Employee employee) {
        employeeDao.insert(employee);
    }


    @PutMapping("/{id}")
    public void update(@RequestBody Employee employee, @PathVariable int id) {
        employeeDao.update(employee, id);
    }

    @GetMapping("/{id}")
    public Employee findById(@PathVariable int id) {
        return employeeDao.findById(id);
    }

    @GetMapping("/{id}/projects")
    public List<ProjectAssigned> findProjectByEmployee(@PathVariable int id) {
        return employeeProjectDao.findProjectByEmployeeId(id);
    }

    @GetMapping("/{id}/projectsnot")
    public List<Project> findProjectNotByEmployee(@PathVariable int id) {
        return employeeProjectDao.findProjectNoAssignByEmployeeId(id);
    }

    @PostMapping(value = "/assign/{id}", consumes = "application/json")
    public void insert(@RequestBody EmployeeProject employeeProject, @PathVariable int id) {
        employeeProjectDao.save(employeeProject, id);
    }


    @DeleteMapping(value = "/unassign/{id}/{idProject}")
    public void deleteEmployeeProject(@PathVariable Integer id, @PathVariable Integer idProject) {
        employeeProjectDao.delete(id, idProject);
    }


}
