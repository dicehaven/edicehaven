import React from 'react';
import { isUserAdmin } from '../helpers/auth';

export default function RequireAdminRole({ children, requiredRoles }) {
  if (!isUserAdmin()) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <div className="banner-section style-4" ><h1 style={{ textAlign: "center" }}>You are not allowed in this route.</h1></div>
  }

  return children;
}