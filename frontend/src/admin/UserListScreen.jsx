import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Table, Button } from "react-bootstrap";
import { FaCheck, FaTimes, FaEdit, FaTrash } from "react-icons/fa";
import PageHeader from "../components/PageHeader"; 
import { getUserToken } from "../helpers/auth";
import BASE_URL from '../config/index.ts';

function UserListScreen({ isLoading, error }) {
  const [dbUsers, setDbUsers] = useState([]);
  const [fetchAgain, setFetchAgain] = useState(false);

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/users`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getUserToken()}`
          },
        });

        const data = await response.json();

        if (data && data.success) {
          setDbUsers(data.users);
        }
      }
      catch (err) {
        alert(err.message)
      }
    };

    getAllUsers();

  }, [fetchAgain]);

  const deleteHandler = async (e, userId) => {
    e.preventDefault();
    // Function to delete a single user
    try {
      const response = await fetch(`${BASE_URL}/api/users/${userId}`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${getUserToken()}`
        },
      })

      const data = await response.json();
      if (data && data.success) {
        alert(data.message);
        setFetchAgain((prevState) => !prevState)
      } else {
        alert(data.message);
      }

    } catch (err) {
      alert(err.messasge)
      console.log('this is the error', err);
    }
  }

  return (
    <div>
      <PageHeader title={"List Of User"} curPage={"List Of User"} />
      <h4>Users</h4>
      {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error}</div> 
      ) : dbUsers ? (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {dbUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.fullName}</td>
                <td>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>
                <td>
                  {user.admin ? (
                    <FaCheck style={{ color: "green" }} />
                  ) : (
                    <FaTimes style={{ color: "red" }} />
                  )}
                </td>
                <td>
                  {!user.admin && (
                    <>
                      <Link
                        to='/admin/edituser'
                        state={{ ...user }}
                        style={{ marginRight: "10px" }}

                      >
                        <Button variant="light" className="btn-sm" style={{ marginRight: "10px" }}>
                          <FaEdit />
                        </Button>
                      </Link>
                      <Button
                        variant="danger"
                        className="btn-sm"
                        onClick={(e) => deleteHandler(e, user.id)}
                      >
                        <FaTrash style={{ color: "white" }} />
                      </Button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <div>No users found.</div>
      )}
    </div>
  );
}

export default UserListScreen;
