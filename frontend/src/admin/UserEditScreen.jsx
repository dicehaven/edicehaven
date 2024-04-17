import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import PageHeader from "../components/PageHeader";
import { useLocation, useNavigate } from "react-router-dom";
import { getUserToken } from "../helpers/auth";
import BASE_URL from '../config/index.ts';

function UserEditScreen() {
  const location = useLocation();
  const navigate = useNavigate();
  const [name, setName] = useState(location.state.fullName);
  const [email, setEmail] = useState(location.state.email);
  const [isAdmin, setIsAdmin] = useState(location.state.admin);

  const submitHandler = async (e) => {
    e.preventDefault();
    // Function to handle form submission
    try {
      const response = await fetch(`${BASE_URL}/api/users/update`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${getUserToken()}`
        },
        body: JSON.stringify({ fullName: name, email, admin: isAdmin, id: location.state.id })
      })

      const data = await response.json();

      if (data && data.success) {
        alert(data.message);
        navigate("/admin/listuser", { replace: true })
      } else {
        alert(data.message);
      }

    } catch (err) {
      alert(err.messasge)
      console.log('this is the error', err);
    }
  };

  return (
    <div>
      <PageHeader title={"Edit User"} curPage={"Edit User"} />
      <div className="container">
        <h4>Edit User</h4>
          <Form onSubmit={submitHandler}>
            <Form.Group className="my-2" controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="my-2" controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="my-2" controlId="isadmin">
              <Form.Check
                type="checkbox"
                label="Is Admin"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              />
            </Form.Group>

            <Button
              type="submit"
              variant="primary"
              style={{
                marginTop: "15px",
                backgroundColor: "#ffc107",
                borderColor: "#ffc107",
                color: "#000",
              }}
            >
              Update
            </Button>
          </Form>
      </div>
    </div>
  );
}

export default UserEditScreen;
