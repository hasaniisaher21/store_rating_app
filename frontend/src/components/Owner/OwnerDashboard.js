import React, { useState, useEffect } from 'react';

const OwnerDashboard = () => {
  // TODO: Fetch owner-specific data from the API

  return (
    <div>
      <h2>Store Owner Dashboard</h2>
      [cite_start]{/* View the average rating of their store [cite: 60] */}
      <h3>Average Store Rating: {/* state for avg rating */}</h3>
      
      [cite_start]{/* View a list of users who have submitted ratings [cite: 59] */}
      <h4>Users Who Rated Your Store</h4>
      <ul>
        {/* TODO: Map over the list of users */}
      </ul>
    </div>
  );
};

export default OwnerDashboard;