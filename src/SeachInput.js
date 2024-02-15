import React from 'react';

const SearchInput = ({ value, onChange }) => (
  <input
    type="text"
    placeholder="Search for GitHub users..."
    value={value}
    onChange={(e) => onChange(e.target.value)}
  />
);

export default SearchInput;
