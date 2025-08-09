import React from 'react';

const Navbar = () => {
  // TODO: Add logic to display different links based on user role and auth status
  // TODO: Add a logout button that clears user session

  return (
    <nav>
      <h1>Store Rater</h1>
      <ul>
        <li>Home</li>
        <li>Stores</li>
        <li>Login</li>
        {/* Example: <li>Admin Dashboard</li> */}
      </ul>
    </nav>
  );
};

export default Navbar;