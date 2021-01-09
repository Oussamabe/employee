import React, { Component } from 'react'
import EmployeeService from '../Services/EmployeeService'  
import {InputGroup, FormControl, Button} from 'react-bootstrap';
// import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'



export default class ListEmployeeComponent extends Component {

    

    constructor(props) {
        super(props)

        this.state = {
                employees: [], 
                id : '',
                currentPage : 1,
                employeesPerPage : 5
                
        }
        
       
        this.addEmployee = this.addEmployee.bind(this);
        this.editEmployee = this.editEmployee.bind(this);
        this.deleteEmployee = this.deleteEmployee.bind(this);
        this.triEmployee =this.triEmployee.bind(this);


    }

  
    
    componentDidMount(){
        EmployeeService.getEmployees().then((res) => {
            this.setState({ employees: res.data});
        });
    }


    addEmployee(){
        this.props.history.push('/add-employee/_add');
    }

    triEmployee(){
        this.props.history.push('/tri-employee/_tri');
    }

    editEmployee(id){
        this.props.history.push(`/update-employee/${id}`);
    }

    deleteEmployee(id){
        EmployeeService.deleteEmployee(id).then( res => {
            this.setState({employees: this.state.employees.filter(employee => employee.id !== id)});
        });
    }
    
    viewEmployee(id){
        this.props.history.push(`/view-employee/${id}`);
    }


    searchData(id){
        //  currentPage -= 1;
        // axios.get("http://localhost:8080/api/v1/emp/"+this.state.id)
        //     .then(response => response.data)
        //     .then((data) => {
        //         this.setState({
        //             employees: data.content
                   
        //         });
        //     });
        this.props.history.push(`/search-employee1/${id}`);
    };

    changePage = event => {
        this.setState({
            [event.target.name]: parseInt(event.target.value)
        });
    };

    firstPage = () => {
        if(this.state.currentPage > 1) {
            this.setState({
                currentPage: 1
            });
        }
    };

    prevPage = () => {
        if(this.state.currentPage > 1) {
            this.setState({
                currentPage: this.state.currentPage - 1
            });
        }
    };

    lastPage = () => {
        if(this.state.currentPage < Math.ceil(this.state.employees.length / this.state.employeesPerPage)) {
            this.setState({
                currentPage: Math.ceil(this.state.employees.length  / this.state.employeesPerPage)
                
            });
        }
    };

    nextPage = () => {
        if(this.state.currentPage < Math.ceil(this.state.employees.length / this.state.employeesPerPage)) {
            this.setState({
                currentPage: this.state.currentPage + 1
            });
        }
    };
      
    render() {
        const {employees, currentPage ,employeesPerPage ,id} =this.state

        const lastIndex = currentPage * employeesPerPage;
        const firstIndex = lastIndex - employeesPerPage;
        const currentUsers = employees.slice(firstIndex, lastIndex);
        const totalPages = employees.length / employeesPerPage;

        const notify = () => toast("Wow so easy !");
    
        return (
            
            <div className="container">
                  <h2 className="text-center">Employees List</h2>
                 <div className = "row">
                    <button className="btn btn-primary" onClick={this.addEmployee}><i class="fa fa-plus" aria-hidden="true"></i> Add Employee</button>
                    <button className="btn btn-success" onClick={this.triEmployee}><i class="fa fa-plus" aria-hidden="true"></i> tri Employee</button>
                 </div>
                 <br></br>
                 <form className="mx-5">
                <div className="form-group">
                  <label for="ncompte">id</label>
                  <input
                    type="text"
                    name="search"
                    value={id}
                    onChange={this.changePage}
                    className="form-control"
                    id="ncompte"
                    placeholder="id"
                  />
                </div>

                <div className="form-group">
                  <label for="exampleInputEmail1">Nom porteur</label>
                  <input
                    type="text"
                     
                    className="form-control"
                    id="Nom "
                    aria-describedby="emailHelp"
                    placeholder="Nom"
                  />
                </div>

                <button type="button"
               onClick={this.searchData} className="btn btn-search">
                  Chercher
                </button> &nbsp;
                <a
                  href="#"
                  className="btn btn-parametre"
                  data-toggle="modal"
                  data-target="#exampleModalCenter"
                >
                  Plus de parametre
                </a>
              </form>
                 <div className = "row">
                        <table className = "table table-striped table-bordered">

                            <thead>
                                <tr>
                                    <th> Employee First Name</th>
                                    <th> Employee Last Name</th>
                                    <th> Employee Email Id</th>
                                    <th> Actions</th> 
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    currentUsers.map(
                                        employee => 
                                        <tr key = {employee.id}>
                                             <td> { employee.firstName} </td>   
                                             <td> {employee.lastName}</td>
                                             <td> {employee.emailId}</td>
                                             <td>
                                                 <button onClick={ () => this.editEmployee(employee.id)} className="btn btn-info"><i class="fa fa-pencil" aria-hidden="true"></i> </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.deleteEmployee(employee.id)} className="btn btn-danger"><i class="fa fa-trash" aria-hidden="true"></i> </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.viewEmployee(employee.id)} className="btn btn-info"><i class="fa fa-eye" aria-hidden="true"></i> </button>
                                             </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>

                        <div style={{"float":"left"}}>
                                    Showing Page {currentPage} of {totalPages}
                                </div>

                                <div style={{"float":"right"}}>
                                    <InputGroup size="sm">
                                        <InputGroup.Prepend>
                                            <Button type="button" variant="outline-info" disabled={currentPage === 1 ? true : false}
                                                onClick={this.firstPage}>
                                                  First
                                            </Button>
                                            <Button type="button" variant="outline-info" disabled={currentPage === 1 ? true : false}
                                                onClick={this.prevPage}>
                                                  Prev
                                            </Button>
                                        </InputGroup.Prepend>
                                        <FormControl className={"page-num bg-default"} name="currentPage" value={currentPage}
                                            onChange={this.changePage}/>
                                        <InputGroup.Append>
                                            <Button type="button" variant="outline-info" disabled={currentPage === totalPages ? true : false}
                                                onClick={this.nextPage}>
                                                  Next
                                            </Button>
                                            <Button type="button" variant="outline-info" disabled={currentPage === totalPages ? true : false}
                                                onClick={this.lastPage}>
                                                  Last
                                            </Button>
                                        </InputGroup.Append>
                                    </InputGroup>
                                </div>
                        
                 </div>

                 <button className="btn btn-success" onClick={notify}>Notify !</button>
        <ToastContainer />
            </div>
                 
        )
    }


    
      
}

 