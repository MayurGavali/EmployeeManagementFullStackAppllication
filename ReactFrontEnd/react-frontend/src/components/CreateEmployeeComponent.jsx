import React, { Component } from 'react';
import EmployeeService from '../services/EmployeeService';
class CreateEmployeeComponent extends Component {
    constructor(props){
        super(props)

            this.state =  {

                // Step 2
                    id: this.props.match.params.id,
                    firstName: '',
                    lastName: '',
                    emailId: ''
         }
         this.changeFirstNameHandler = this.changeFirstNameHandler.bind(this);
         this.changeLastNameHandler = this.changeLastNameHandler.bind(this);   
         this.changeEmailIdHandler = this.changeEmailIdHandler.bind(this);
         this.saveorUpdateEmployee =this.saveorUpdateEmployee.bind(this);
    }

    // Step 3
    componentDidMount(){

        // Step 4
        if(this.state.id==-1){
            return 
        }
        else{
        EmployeeService.getEmployeeByid(this.state.id).then((res) => {
            let emp = res.data;
            this.setState({firstName: emp.firstName,
                lastName: emp.lastName,
                emailId : emp.emailId
            });
        });
       }
    }
    saveorUpdateEmployee = (e) => {
        e.preventDefault();
        let employee = {firstName: this.state.firstName, lastName:this.state.lastName, emailId: this.state.emailId};
        console.log('employee => ' + JSON.stringify(employee));
     
        //step 5
        if(this.state.id === '_add'){
            EmployeeService.createEmployee(employee).then(res =>{
                this.props.history.push('/employees');
            });
        }
        else{   
            EmployeeService.updateEmployee(employee,this.state.id).then( res => { 
                    this.props.history.push('/employees');
                });
           }
    }
    changeFirstNameHandler =(event) => {
    this.setState({firstName: event.target.value});
    }
    changeLastNameHandler =(event) => {
        this.setState({lastName: event.target.value});
    }
    changeEmailIdHandler =(event) => {
            this.setState({emailId: event.target.value});
     }

    cancel(){
            this.props.history.push('/employees');
     }
    getTitle(){
        if(this.state.id == -1){
            return  <h3 className="text-center">Add Employee</h3>
        }
        else{
          return <h3 className="text-center">Update Employee</h3>
        }
    }
    render() {
        return (
            <div>
                <br></br>
                <br></br>
                <div className= "container">
                <h3 className="text-center">Add Employee Details</h3>
                <div className="row">
                    <div className = "card col-md-6 offset-md-3 offset-md-3">
                    {
                        this.getTitle    
                    }
                    <div className="card-body">
                        <form>
                            <div className= "form-group">
                                 <label>First Name:</label>
                                   <input placeholder="First Name" name="firstName" className="form-control"
                                    value={this.state.firstName} onChange ={this.changeFirstNameHandler}/>
                            </div>
                            <div className= "form-group">
                                <label>Last Name:</label>
                                <input placeholder="Last Name" name="lastName" className="form-control"
                                 value={this.state.lastName} onChange ={this.changeLastNameHandler}/>
                            </div>
                            <div className= "form-group">
                                <label>Email Id:</label>
                                 <input placeholder="Email Address" name="emailId" className="form-control"
                                 value={this.state.emailId} onChange ={this.changeEmailIdHandler}/>
                            </div>
                            
                            <button className="btn btn-success" onClick={this.saveorUpdateEmployee}>Save</button>
                            <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft:"10px"}}>Cancel</button>
                        </form>
                    </div>
                </div>
               </div>
            </div>
        </div>
        )
    }
}

export default CreateEmployeeComponent