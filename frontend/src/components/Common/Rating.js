import React from 'react';

// 'value' is the rating number (e.g., 3.5)
// 'readOnly' determines if the user can change the rating
const Rating = ({ value, readOnly = false }) => {
  const stars = Array.from({ length: 5 }, (_, index) => {
    const starValue = index + 1;
    let starClass = 'star-empty';
    if (value >= starValue) {
      starClass = 'star-full';
    }
    // This is a simple implementation. You can enhance it for half-stars.
    
    return (
      <span key={starValue} className={starClass}>★</span>
    );
  });

  return <div className={`rating ${readOnly ? 'read-only' : ''}`}>{stars}</div>;
};

export default Rating;