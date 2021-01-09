import React, { Component } from "react";
import EmployeeService from "../Services/EmployeeService";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default class CreateEmployeeComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // step 2
      id: this.props.match.params.id,
      firstName: "",
      lastName: "",
      emailId: "",

      firstNameError: "",
      lastNameError: "",
      emailIdError: "",
    };
    this.changeFirstNameHandler = this.changeFirstNameHandler.bind(this);
    this.changeLastNameHandler = this.changeLastNameHandler.bind(this);
    this.saveOrUpdateEmployee = this.saveOrUpdateEmployee.bind(this);
  }

  

  saveOrUpdateEmployee = (e) => {

    let employee = {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        emailId: this.state.emailId,
      };

    e.preventDefault(); 
    const isValid = this.validate();
    if (isValid) {
      console.log(this.state);
      EmployeeService.createEmployee(employee).then((res) => {
      this.props.history.push("/employees");
      
    });
      // clear form
      this.setState(this.state);
     
    }
    
    console.log("employee => " + JSON.stringify(employee));

   

    // step 5
    // if(this.state.id === '_add'){
    //     EmployeeService.createEmployee(employee).then(res =>{
    //         this.props.history.push('/employees');
    //     });
    // }else{
    //     EmployeeService.updateEmployee(employee, this.state.id).then( res => {
    //         this.props.history.push('/employees');
    //     });
    // }
  };

  changeFirstNameHandler = (event) => {
    this.setState({ firstName: event.target.value });
  };

  changeLastNameHandler = (event) => {
    this.setState({ lastName: event.target.value });
  };

  changeEmailHandler = (event) => {
    this.setState({ emailId: event.target.value });
  };

  cancel() {
    this.props.history.push("/employees");
  }

  getTitle() {
    if (this.state.id === "_add") {
      return <h3 className="text-center">Add Employee</h3>;
    } else {
      return <h3 className="text-center">Update Employee</h3>;
    }
  }

  // handleChange = event => {
  //     const isCheckbox = event.target.type === "checkbox";
  //     this.setState({
  //       [event.target.name]: isCheckbox
  //         ? event.target.checked
  //         : event.target.value
  //     });
  //   };

  validate = () => {
    let firstNameError = "";
    let lastNameError = "";
    let emailIdError = "";

    if (!this.state.firstName) {
      firstNameError = "name cannot be blank";
    }

    if (!this.state.lastName) {
      lastNameError = "last name cannot be blank";
    }

    if (!this.state.emailId.includes("@")) {
      emailIdError = "invalid email format";
    }

    if (emailIdError || firstNameError || lastNameError) {
      this.setState({ emailIdError, firstNameError, lastNameError });
      return false; 
    }

    return true;
    
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const isValid = this.validate();
    const notify = () => toast("Wow so easy !");
    if (isValid) {
      console.log(this.state);
      notify();
      // clear form
      this.setState(this.state);
    }
  };

  

  render() {
    
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="card col-md-6 offset-md-3 offset-md-3">
              {this.getTitle()}
              <div className="card-body">
                <form onSubmit={this.handleSubmit}>
                  <div className="form-group">
                    <label> First Name: </label>
                    <input
                      placeholder="First Name"
                      
                      name="firstName"
                      className="form-control"
                      value={this.state.firstName}
                      onChange={this.changeFirstNameHandler}
                    />
                    <div style={{ color: "red" }}>
                      {this.state.firstNameError}
                    </div>
                  </div>
                  <div className="form-group">
                    <label> Last Name: </label>
                    <input
                      placeholder="Last Name"
                       
                      name="lastName"
                      className="form-control"
                      value={this.state.lastName}
                      onChange={this.changeLastNameHandler}
                    />
                     <div style={{ color: "red" }}>
                      {this.state.lastNameError}
                    </div>
                  </div>
                  <div className="form-group">
                    <label> Email Id: </label>
                    <input
                      placeholder="Email Address"
                       
                      name="emailId"
                      className="form-control"
                      value={this.state.emailId}
                      onChange={this.changeEmailHandler}
                    />
                    <div style={{ color: "red" }}>
                      {this.state.emailIdError}
                    </div>
                  </div>

                  <button
                  type="submit"
                    className="btn btn-success"
                    onClick={this.saveOrUpdateEmployee}
                  >
                    Save
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={this.cancel.bind(this)}
                    style={{ marginLeft: "10px" }}
                  >
                    Cancel
                  </button>
                </form>

                <ToastContainer />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
