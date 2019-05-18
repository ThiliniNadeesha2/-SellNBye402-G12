import React, {Component} from 'react';

import axios from 'axios';
export default class AddDeliverDetails extends Component{
    constructor(props){
        super(props);

        this.onChange_contact_name = this.onChange_contact_name.bind(this);
        this.onChange_email = this.onChange_email.bind(this);
        this.onChange_contact_number = this.onChange_contact_number.bind(this);
        this.onChange_address = this.onChange_address.bind(this);
        this.onChange_zip_code = this.onChange_zip_code.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            contact_name: '',
            email:'',
            contact_number:'',
            address:'',
            zip_code:'',
            deliver_completed: false

        }
    }

    onChange_contact_name(e){
        this.setState({
            contact_name: e.target.value
        })
    }

    onChange_email(e){
        this.setState({
            email: e.target.value
        })
    }
    onChange_contact_number(e){
        this.setState({
            contact_number: e.target.value
        })
    }


    onChange_address(e){
        this.setState({
            address: e.target.value
        })
    }

    onChange_zip_code(e){
        this.setState({
            zip_code: e.target.value
        })
    }
    onSubmit(e){
        e.preventDefault();

        console.log(`deliver success`);
        console.log(`username is:${this.state.contact_name}`);
        console.log(`password is:${this.state.email}`);

        const newDeliver = {
            contact_name: this.state.contact_name,
            email:this.state.email,
            contact_number:this.state.contact_number,
            address:this.state.address,
            zip_code:this.state.zip_code,
            SignUp_completed:this.state.SignUp_completed
        }

        axios.post('http://localhost:4000/Books/add', newDeliver)
            .then(res => console.log(res.data));

       // this.props.history.push('/');

        this.setState({
            contact_name: '',
            email:'',
            contact_number:'',
            address:'',
            zip_code:'',
            deliver_completed: false
        })
    }
    render() {
        return(
            <div className="container" style={{marginTop: 20}}>
                <h2>Enter the Deliver Details</h2>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Contact Name:</label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.contact_name}
                                onChange={this.onChange_contact_name}
                        />
                    </div>

                    <div className="form-group">
                        <label>Email:</label>
                        <input  type="email"
                                className="form-control"
                                value={this.state.email}
                                onChange={this.onChange_email}
                        />
                    </div>

                    <div className="form-group">
                        <label>Contact Number:</label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.contact_number}
                                onChange={this.onChange_contact_number}
                        />
                    </div>

                    <div className="form-group">
                        <label>Address:</label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.address}
                                onChange={this.onChange_address}
                        />
                    </div>

                    <div className="form-group">
                        <label>Zip Code:</label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.zip_code}
                                onChange={this.onChange_zip_code}
                        />
                    </div>
                    <div className="form-group">
                        <input  type="submit"
                                className="btn btn-primary"
                                value="Add Details"
                        />
                    </div>
                </form>
            </div>
        )
    }

}