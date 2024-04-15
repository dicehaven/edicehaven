import React, { useState, useEffect } from "react";
import { getUserId, getUserToken, isAuthenticated } from "../helpers/auth";
import PageHeader from "../components/PageHeader";


const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/users/${getUserId()}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getUserToken()}`
          }
        });
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        } else {
          console.error("Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const updateUser = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/users/update", {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${getUserToken()}`
        },
        body: JSON.stringify({ fullName: user.fullName, userName: user.userName, email: user.email, admin: user.isAdmin, id: user._id })
      })

      const data = await response.json();

      if (data && data.success) {
        alert(data.message);
      } else {
        alert(data.message);
      }

    } catch (err) {
      alert(err.messasge)
      console.log('this is the error', err);
    }
  };

  if (!user) {
    return <div className="ProfilePage">
      <PageHeader title={"My Profile"} curPage={"Profile Page"} />
      <div className="my-profile padding-tb">
        <div className="container">
          <h1>
            You need to be logged in to access the cart page.
          </h1>
        </div></div></div>;
  }

  return (
    <>
      <div className="signUpPage">
        <PageHeader title={"My Profile"} curPage={"Profile Page"} />
        <div className="my-profile padding-tb">
          <div className="container">
            {!isAuthenticated() && <h1>
              You need to be logged in to access the cart page.
            </h1>}
            {isAuthenticated() &&
              <div className="section-wrapper">
                <h1>Profile</h1>

                <label>
                  <span>createdAt:</span>
                  <input disabled={true} type="text" value={new Date(user.created).toLocaleDateString('en-CA', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit'
                  })} />
                </label>
                <label>
                  <span>updatedAt:</span>
                  <input disabled={true} type="text" value={new Date(user.updated).toLocaleDateString('en-CA', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit'
                  })} />
                </label>
                <div></div>
                <span>Full Name:</span>
                <input
                  type="text"
                  name="fullname"
                  id="fullname"
                  placeholder="fullname"
                  value={user.fullName}
                  onChange={(ev) =>
                    setUser({
                      ...user,
                      fullName: ev.target.value,
                    })
                  }
                />
                <span>Username:</span>
                <input
                  type="text"
                  name="userName"
                  id="userName"
                  placeholder="username"
                  value={user.userName}
                  onChange={(ev) =>
                    setUser({
                      ...user,
                      userName: ev.target.value,
                    })
                  }
                />
                <span>Email:</span>
                <input
                  type="text"
                  name="email"
                  id="email"
                  placeholder="email"
                  value={user.email}
                  onChange={(ev) =>
                    setUser({
                      ...user,
                      email: ev.target.value,
                    })
                  }
                />
                <button type="button" style={{ fontWeight: 'bold', border: '2px solid black', padding: '5px 10px', marginTop: '10px' }} onClick={updateUser}>Update</button>
              </div>
            }</div>
        </div>
      </div>
    </>
  );
};

export default Profile;
