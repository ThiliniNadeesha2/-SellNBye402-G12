import React, {Component} from 'react';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";

export default class NavBar extends Component {
    render() {
        return <div>

            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand href="#home">Sell n Buy</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="#features">Features</Nav.Link>
                        <Nav.Link href="#pricing">Pricing</Nav.Link>
                        <NavDropdown title="Book Management" id="collasible-nav-dropdown">
                            <NavDropdown.Item href="/books/add">Add Book Details</NavDropdown.Item>
                            <NavDropdown.Item href="/books/edit">Edit/ Delete Book Details</NavDropdown.Item>
                            {/*<NavDropdown.Item href="/books/delete">Delete Books</NavDropdown.Item>*/}
                            {/*<NavDropdown.Divider/>*/}
                            {/*<NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>*/}
                        </NavDropdown>
                    </Nav>
                    <Nav>
                        <Nav.Link href="#deets">Login</Nav.Link>
                        <Nav.Link eventKey={2} href="#memes">
                            Register
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>;
        </div>
    }
}