import React, {Component} from 'react'

export default class BookDetailsMap extends Component {

    constructor(props) {
        super(props);

    }

    render() {
        let books = this.props.books;
        let optionsItems = books.map((books) =>
            <option key={books._id} value={books.name}>{books.name}</option>
        );
        return <div>
            {optionsItems}
        </div>
    }
}