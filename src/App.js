import "./App.css";

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import ListEmployeeComponent from "./Components/ListEmployeeComponent";

import HeaderComponent from "./Components/HeaderComponent";
import FooterComponent from "./Components/FooterComponent";


import CreateEmployeeComponent from './Components/CreateEmployeeComponent';
import UpdateEmployeeComponent from './Components/UpdateEmployeeComponent';
import ViewEmployeeComponent from './Components/ViewEmployeeComponent';
import EmployeeTri from "./Components/EmployeeTri";
import SearchEmployee from "./Components/SearchEmployee";

function App() {
  return (
    <Router>
    <HeaderComponent />
      <div className="container"> 
          <Switch> 
                <Route path = "/" exact component = {ListEmployeeComponent}></Route>
                <Route path = "/employees" component = {ListEmployeeComponent}></Route>
                <Route path = "/tri-employee" component = {EmployeeTri}></Route>
                <Route path = "/search-employee1/:id" component = {SearchEmployee}></Route>
                <Route path = "/add-employee/:id" component = {CreateEmployeeComponent}></Route>
                <Route path = "/view-employee/:id" component = {ViewEmployeeComponent}></Route>
                <Route path = "/update-employee/:id" component = {UpdateEmployeeComponent}></Route>
          </Switch>
      </div>
    <FooterComponent />
</Router>
  );
}

export default App;
