import React, {Component} from 'react';
import {Link} from "react-router-dom";
import axios from 'axios';

//uerlist component

const Deliver = props => (
    <tr>
        <td >{props.deliver.contact_name}</td>
        <td >{props.deliver.email}</td>
        <td >{props.deliver.contact_number}</td>
        <td >{props.deliver.address}</td>
        <td >{props.deliver.zip_code}</td>
        <td>
            <Link to={"/deliver_details/edit/"+props.deliver._id}>Edit</Link>
        </td>
    </tr>

)

export default class DeliverDetailList extends Component {

    constructor(props) {
        super(props);
        this.state = {Books: []};
    }

    componentDidMount() {
        axios.get('http://localhost:4000/deliver')
            .then(response => {
                this.setState({Books: response.data})
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    deliverList() {
        return this.state.Books.map(function (currentDetails, i) {
            return <Deliver deliver={currentDetails} key={i}/>
        })
    }

    render() {
        return (

            <div>
                <h2>Deliver Detail List</h2>
                <table className="table table-striped" style={{marginTop: 20}}>
                    <thead>
                    <tr>
                        <th>Contact Name</th>
                        <th>Email</th>
                        <th>Contact Number</th>
                        <th>Address</th>
                        <th>Zip code</th>

                    </tr>
                    </thead>
                    <tbody>
                    {this.deliverList()}
                    </tbody>
                </table>

            </div>

        )
    }

}