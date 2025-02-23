import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Form, Button, Container } from "react-bootstrap";

const Register = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/register", values);
      toast.success("Registration successful!");
      navigate("/login");
    } catch (error) {
      toast.error("Error registering!");
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
  <div className="w-100" style={{ maxWidth: "400px" }}>
    <h2 className="text-center mb-4">Login</h2>
    <Form onSubmit={handleSubmit}>

        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" name="name" onChange={handleChange} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" name="email" onChange={handleChange} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" name="password" onChange={handleChange} required />
        </Form.Group>
        <Button variant="success" type="submit">Register</Button>
      </Form>
      <p className="mt-3">
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
    </Container>
  );
};

export default Register;
