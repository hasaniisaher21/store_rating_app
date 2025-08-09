import React from 'react';
import Rating from '../Common/Rating';

// Assuming the 'store' prop looks like:
// { name: 'My Store', address: '123 Main St', overallRating: 4.5, userRating: 3 }
const StoreCard = ({ store }) => {

  // TODO: Add handlers for submitting or modifying a rating

  return (
    <div className="store-card">
      [cite_start]<h3>{store.name}</h3> {/* [cite: 47] */}
      [cite_start]<p>{store.address}</p> {/* [cite: 48] */}
      
      <div>
        [cite_start]<strong>Overall Rating:</strong> {/* [cite: 49] */}
        <Rating value={store.overallRating} readOnly={true} />
      </div>

      <div>
        [cite_start]<strong>Your Rating:</strong> {/* [cite: 50] */}
        [cite_start]{/* This component will allow submitting/modifying a rating [cite: 51, 52] */}
        <Rating value={store.userRating || 0} />
      </div>
    </div>
  );
};

export default StoreCard;