import React from 'react';

const SearchBar = () => {
  // TODO: Add state and handlers to manage search input
  // TODO: Pass search query up to the parent component (StoreListPage) to filter results

  return (
    <form>
      <input type="text" placeholder="Search for stores by name or address..." />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchBar;