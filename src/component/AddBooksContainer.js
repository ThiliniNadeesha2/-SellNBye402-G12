import React, {Component} from 'react'
import Card from "react-bootstrap/Card";
import axios from 'axios';

export default class AddBooksContainer extends Component {

    constructor(props) {
        super(props)
        this.state = {
            name: '',
            category: '',
            author: '',
            price: ''
        }
        this.onNameChange = this.onNameChange.bind(this);
        this.onCategoryChange = this.onCategoryChange.bind(this);
        this.onAuthorChange = this.onAuthorChange.bind(this);
        this.onPriceChange = this.onPriceChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);


    }

    onNameChange(e) {
        this.setState({
            name: e.target.value
        })
    }

    onCategoryChange(e) {
        this.setState({
            category: e.target.value
        })
    }

    onAuthorChange(e) {
        this.setState({
            author: e.target.value
        })
    }

    onPriceChange(e) {
        this.setState({
            price: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();

        const bookDetails = {
            name: this.state.name,
            category: this.state.category,
            author: this.state.author,
            price: this.state.price
        }
        axios.post('http://localhost:4000/books/add', bookDetails).then(res => {
            console.log(res);
            let status = res.data;
            if (status.success === true) {
                alert('Book Details Added Successfully !');
                this.setState({
                    name: '',
                    category: '',
                    author: '',
                    price: ''
                })
            } else {
                alert('Server Error Please try Again')
            }

        })

    }

    render() {
        return <div>
            <Card bg="info" text="white" style={{width: '60%', marginLeft: "auto", marginRight: "auto"}}>
                <Card.Header style={{fontSize: "28px"}}>Add Books</Card.Header>
                <Card.Body>
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label>Book Name :</label>
                            <input type="text" className="form-control" required={true}
                                   title="Please Enter a Book Name"
                                   value={this.state.name}
                                   onChange={this.onNameChange}
                            />

                            <label>Category : </label>
                            <input type="text" className="form-control" required={true}
                                   title="Please Enter a Category"
                                   value={this.state.category}
                                   onChange={this.onCategoryChange}
                            />

                            <label>Author : </label>
                            <input type="text" className="form-control" required={true} title="Please enter an Author"
                                   value={this.state.author}
                                   onChange={this.onAuthorChange}/>

                            <label>Price : </label>
                            <input type="text" className="form-control" required={true} title="Please enter the Price"
                                   value={this.state.price}
                                   onChange={this.onPriceChange}/>

                            <button type="submit" style={{width: "20%", color: "white"}} className="btn btn-warning">Add
                                Book
                            </button>

                        </div>
                    </form>
                </Card.Body>
            </Card>
            <br/>
        </div>
    }

}