import React, { useState, useEffect } from 'react';
import SearchBar from '../Common/SearchBar';
import StoreCard from './StoreCard';

const StoreListPage = () => {
  // TODO: Fetch all registered stores from the API
  const [stores, setStores] = useState([]); // Placeholder for stores data

  return (
    <div>
      <h2>All Stores</h2>
      [cite_start]<SearchBar /> {/* Allows searching by Name and Address [cite: 45] */}
      <div>
        {/* {stores.map(store => <StoreCard key={store.id} store={store} />)} */}
        <p>Store cards will be displayed here.</p>
      </div>
    </div>
  );
};

export default StoreListPage;