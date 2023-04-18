package com.fullstack.SpringBootBackend.Controller;


import com.fullstack.SpringBootBackend.exception.ResourceNotFoundException;
import com.fullstack.SpringBootBackend.model.Employee;
import com.fullstack.SpringBootBackend.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@Controller
@ResponseBody
@RequestMapping("/api")
public class EmployeeController {

    @Autowired
     EmployeeRepository employeeRepository;

    // get all the Employees
    @GetMapping("/employees")
    public List<Employee> getAllEmployee(){
        return employeeRepository.findAll();
    }

    //Create Employee REST API
    @PostMapping("/employees")
    public Employee createEmployee(@RequestBody Employee employee){
        return employeeRepository.save(employee);
    }

    //get Employee By id rest API
    @GetMapping("/employees/{id}")
    public ResponseEntity<Employee> getEmployeeById(@PathVariable Long id){
    Employee emp = employeeRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Employee Not Existed with id :" + id));
    return ResponseEntity.ok(emp);
    }

    // Update Employee Rest API
    @PutMapping("/employees/{id}")
    public ResponseEntity<Employee> updateEmployee(@PathVariable  Long id, @RequestBody Employee employeDetails){
        Employee emp = employeeRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Employee Not Existed with id :" + id));
        emp.setFirstName(employeDetails.getFirstName());
        emp.setLastName(employeDetails.getLastName());
        emp.setEmailId(employeDetails.getEmailId());
        Employee updateEmployee = employeeRepository.save(emp);
        return ResponseEntity.ok(updateEmployee);
    }

    // Delete Employee Rest API
    @DeleteMapping("/employees/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteEmployee(@PathVariable Long id){
        Employee emp = employeeRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Employee Not Existed with id :" + id));
        employeeRepository.delete(emp);
        Map<String, Boolean> response = new HashMap<>();
        response.put("Deleted",Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
}
