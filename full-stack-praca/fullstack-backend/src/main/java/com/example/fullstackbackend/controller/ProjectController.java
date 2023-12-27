package com.example.fullstackbackend.controller;


import com.example.fullstackbackend.dao.EmployeeProjectDao;
import com.example.fullstackbackend.dao.ProjectDao;
import com.example.fullstackbackend.model.EmployeeAssigned;
import com.example.fullstackbackend.model.Project;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("projects")
@CrossOrigin(origins = "http://localhost:5173")
public class ProjectController {

    @Autowired
    ProjectDao projectDao;

    @Autowired
    EmployeeProjectDao employeeProjectDao;

    @GetMapping(value = "")
    public List<Project> getProjects() {
        return projectDao.findAll();
    }

    @DeleteMapping(value = "/{id}")
    public void deleteProject(@PathVariable Integer id) {
        employeeProjectDao.deleteFromProjectProjects(id);
        projectDao.delete(id);
    }

    @PostMapping(value = "/", consumes = "application/json")
    public void insert(@RequestBody Project project) {
        projectDao.insert(project);
    }

    @GetMapping("/{id}")
    public Project findById(@PathVariable int id) {
        return projectDao.findById(id);
    }

    @PutMapping("/{id}")
    public void update(@RequestBody Project project, @PathVariable int id) {
        projectDao.update(project, id);
    }

    @GetMapping("/{id}/byId")
    public List<EmployeeAssigned> findEmployeeByProjectId(@PathVariable int id) {
        return employeeProjectDao.findEmployeeByProjectId(id);
    }

    @PutMapping(value = "/hours/{EmpId}/{ProjId}", consumes = "application/json")
    public void insert(@PathVariable int EmpId, @RequestBody EmployeeAssigned Hours, @PathVariable int ProjId) {
        employeeProjectDao.saveHours(EmpId, Hours, ProjId);
    }


}


