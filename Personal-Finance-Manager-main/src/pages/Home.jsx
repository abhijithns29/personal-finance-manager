import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Container } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";

const API_BASE = "http://localhost:5000/api"; // Change if needed

const Home = () => {
  const [expenses, setExpenses] = useState([]);

  // Fetch expenses from API
  useEffect(() => {
    axios
      .get(`${API_BASE}/expenses`)
      .then((res) => setExpenses(res.data))
      .catch((err) => console.error("Error fetching expenses:", err));
  }, []);

  // Delete an expense
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this expense?")) {
      try {
        await axios.delete(`${API_BASE}/expenses/${id}`);
        setExpenses(expenses.filter((expense) => expense._id !== id));
      } catch (error) {
        console.error("Error deleting expense:", error);
      }
    }
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">Expense Tracker</h2>

      <Table striped bordered hover>
        <thead className="table-dark">
          <tr>
            <th>Date</th>
            <th>Title</th>
            <th>Amount</th>
            <th>Type</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses.length > 0 ? (
            expenses.map((expense) => (
              <tr key={expense._id}>
                <td>{new Date(expense.date).toLocaleDateString()}</td>
                <td>{expense.title}</td>
                <td>₹{expense.amount}</td>
                <td>{expense.type}</td>
                <td>{expense.category}</td>
                <td>
                  <Button variant="warning" className="me-2">
                    <FaEdit />
                  </Button>
                  <Button variant="danger" onClick={() => handleDelete(expense._id)}>
                    <FaTrash />
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">
                No expenses recorded yet.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default Home;

