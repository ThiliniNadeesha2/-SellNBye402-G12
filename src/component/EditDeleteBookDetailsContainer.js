import React, {Component} from 'react';
import Card from "react-bootstrap/Card";
import axios from "axios";
import BookDetailsMap from "./BookDetailsMap";

export default class EditDeleteBookDetailsContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bookData: [],
            name: '',
            category: '',
            author: '',
            price: '',
            id: '',
            selectedName: ''
        };
        this.onNameChange = this.onNameChange.bind(this);
        this.onCategoryChange = this.onCategoryChange.bind(this);
        this.onAuthorChange = this.onAuthorChange.bind(this);
        this.onPriceChange = this.onPriceChange.bind(this);
        this.onBookNameSelected = this.onBookNameSelected.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onDeleteClicked = this.onDeleteClicked.bind(this);
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

    onBookNameSelected(e) {
        console.log('Book Name Selected');
        // this.setState({
        //     name: e.target.value
        // });
        let bookName = '';
        if (e.target.value === null) {
            return;
        }
        if (e.target.value !== '') {
            bookName = e.target.value;
        }
        console.log(bookName);
        if (bookName !== '' || bookName != null) {
            let url = 'http://localhost:4000/books/get/' + bookName;
            axios.get(url).then(res => {
                let data = res.data;
                console.log(res.data);
                if (data != null) {
                    this.setState({
                        name: data.bookDetails.name,
                        category: data.bookDetails.category,
                        author: data.bookDetails.author,
                        price: data.bookDetails.price,
                        id: data.bookDetails._id

                    })
                }
            }).catch(err => {
                //console.error(err);
            })
        }
    }

    onSubmit(e) {
        e.preventDefault();

        if (this.state.name === null) {
            return;
        }
        if (this.state.id === null) {
            return;
        }
        const bookDetails = {
            name: this.state.name,
            category: this.state.category,
            author: this.state.author,
            price: this.state.price
        };
        let url = 'http://localhost:4000/books/update/' + this.state.id;
        axios.put(url, bookDetails).then(res => {
            let data = res.data;
            if (data.success === true) {
                alert('Successfully Updated Book Details !');
                this.setState({
                    name: '',
                    category: '',
                    author: '',
                    price: '',
                    id: ''
                })
            }
        })

    }

    onDeleteClicked(e) {
        if (this.state.name === '' || this.state.name === null) {
            alert('Please Select the Book to delete !');
            return;
        }

        if (this.state.id !== null || this.state.id !== '') {
            let url = 'http://localhost:4000/books/delete/' + this.state.id
            axios.delete(url).then(res => {
                let data = res.data;
                if (data.success === true) {
                    alert('Book Deleted Successfully !')
                    // this.setState({
                    //     name: '',
                    //     category: '',
                    //     author: '',
                    //     price: '',
                    //     id: ''
                    // });
                    window.location.reload();
                }
            })
        }

    }

    componentDidMount() {
        let books = [];
        axios.get('http://localhost:4000/books/all').then(res => {
            console.log(res.data);
            return res.data
        }).then(data => {
            books = data.books.map((books) => {
                return books
            });
            console.log(books);
            this.setState({
                bookData: books
            })
        }).catch(err => {
            console.error(err);
        })
    }

    render() {
        return <div>
            <Card bg="info" text="white" style={{width: '60%', marginLeft: "auto", marginRight: "auto"}}>
                <Card.Header style={{fontSize: "28px"}}>Edit/Delete Book Details</Card.Header>
                <Card.Body>
                    <div className="active-pink-3 active-pink-4 mb-4">
                        <input className="form-control" list="bookList" name="bookSearchBar" placeholder="Search"
                               aria-label="Search" onSelect={this.onBookNameSelected}/>
                        <datalist id="bookList">
                            <BookDetailsMap books={this.state.bookData}/>
                        </datalist>
                    </div>


                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label>Book Name :</label>
                            <input type="text" className="form-control" required={true} readOnly={true}
                                   title="Book Name"
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
                                   value={'Rs. ' + this.state.price}
                                   onChange={this.onPriceChange}/>

                            <button type="submit" style={{width: "auto", color: "white", marginRight: "10px"}}
                                    className="btn btn-warning">Update Book Details
                            </button>

                            <button type="button" style={{width: "auto", color: "white"}}
                                    className="btn btn-warning" onClick={this.onDeleteClicked}>Delete Book Details
                            </button>
                        </div>
                    </form>
                </Card.Body>
            </Card>
            <br/>
        </div>
    }
}