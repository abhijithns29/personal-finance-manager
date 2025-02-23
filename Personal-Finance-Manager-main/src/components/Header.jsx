import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Navbar, Container, Nav } from "react-bootstrap";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="w-100">
  <Container>

        <Navbar.Brand as={Link} to="/">💰 Finance Tracker</Navbar.Brand>
        <Nav className="ms-auto">
          {localStorage.getItem("user") ? (
            <Button variant="danger" onClick={handleLogout}>Logout</Button>
          ) : (
            <>
              <Nav.Link as={Link} to="/login">Login</Nav.Link>
              <Nav.Link as={Link} to="/register">Register</Nav.Link>
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
