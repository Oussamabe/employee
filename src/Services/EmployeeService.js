 import axios from 'axios'

 const EMPLOYEE_API_BASE_URL = "http://localhost:8080/api/v1/employees";
 const EMPLOYEETRI_API_BASE_URL = "http://localhost:8080/api/v1/triemp";

 const EMPLOYEESEARCCH_API_BASE_URL = "http://localhost:8080/api/v1/emp";
 
 class EmployeeService{

    getEmployees(){
        return axios.get(EMPLOYEE_API_BASE_URL);
    }

    getEmployeesTri(){
        return axios.get(EMPLOYEETRI_API_BASE_URL);
    }

    createEmployee(employee){
        return axios.post(EMPLOYEE_API_BASE_URL, employee);
    }

    getEmployeeById(employeeId){
        return axios.get(EMPLOYEE_API_BASE_URL + '/' + employeeId);
    }

    updateEmployee(employee, employeeId){
        return axios.put(EMPLOYEE_API_BASE_URL + '/' + employeeId, employee);
    }

    deleteEmployee(employeeId){
        return axios.delete(EMPLOYEE_API_BASE_URL + '/' + employeeId);
    }

    searchempbyid(id){
        return axios.get(EMPLOYEESEARCCH_API_BASE_URL + '/' + id);
    }


    
 }
 export default new EmployeeService()