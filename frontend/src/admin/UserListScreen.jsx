import React from "react";
import { Link } from "react-router-dom";
import { Table, Button } from "react-bootstrap";
import { FaCheck, FaTimes, FaEdit, FaTrash } from "react-icons/fa"; // Add imports for icons
import PageHeader from "../components/PageHeader"; // Add PageHeader import

function UserListScreen({ isLoading, error, users, deleteHandler }) {
  return (
    <div>
      <PageHeader title={"List Of User"} curPage={"List Of User"} />
      <h4>Users</h4>
      {isLoading ? (
        <div>Loading...</div> // Replace Loader component with simple text
      ) : error ? (
        <div>Error: {error}</div> // Replace Message component with simple text
      ) : users ? ( // Check if users array is defined
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
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>
                <td>
                  {user.isAdmin ? (
                    <FaCheck style={{ color: "green" }} />
                  ) : (
                    <FaTimes style={{ color: "red" }} />
                  )}
                </td>
                <td>
                  {!user.isAdmin && (
                    <>
                      <Link
                        to={`/admin/user/${user._id}/edit`}
                        style={{ marginRight: "10px" }}
                      >
                        <Button variant="light" className="btn-sm">
                          <FaEdit />
                        </Button>
                      </Link>
                      <Button
                        variant="danger"
                        className="btn-sm"
                        onClick={() => deleteHandler(user._id)}
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
        <div>No users found.</div> // Render a message if users array is empty or undefined
      )}
    </div>
  );
}

export default UserListScreen;
