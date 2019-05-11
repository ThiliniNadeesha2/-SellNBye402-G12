import React from 'react';
import './App.css';
import NavBar from "./component/NavBar";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import EditDeleteBookDetailsContainer from "./component/EditDeleteBookDetailsContainer";
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import AddBooksContainer from "./component/AddBooksContainer";

function App() {
    return (
        <div className="App">
            <NavBar/>
            <Router>
                {/*<Route path="/" exact component={AddBooksContainer}/>*/}
                <Route path="/books/add" exact component={AddBooksContainer}/>
                <Route path="/books/edit" exact component={EditDeleteBookDetailsContainer}/>
            </Router>
        </div>
    );
}

export default App;
