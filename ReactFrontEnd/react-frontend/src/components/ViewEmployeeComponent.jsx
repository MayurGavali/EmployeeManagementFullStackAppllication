import React, { Component } from 'react'
import EmployeeService from '../services/EmployeeService'

export default class ViewEmployeeComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                 id: this.props.match.params.id,
                 employee:{

                 }
        }
    }

    componentDidMount() {
        EmployeeService.getEmployeeByid(this.state.id).then(res => {
            this.setState({employee: res.data});
        })
    }


    // Class Properties (Stage 3 Proposal)
    handler = () => { this.setState() }

    render() {
        return (
            <div>
                    <div className="card col-md-6 offset-md-3">
                        <h3 className="text-center">View Employee Details</h3>
                        <div className = "card-body">
                        <div className="row">
                            <label>Employee First Name</label>
                            <div>{ this.state.employee.firstName }</div>
                        </div>
                        <div className="row">
                            <label>Employee Last Name</label>
                            <div>{ this.state.employee.lastName }</div>
                        </div>
                        <div className="row">
                            <label>Employee Email Name</label>
                            <div>{ this.state.employee.emailId }</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
