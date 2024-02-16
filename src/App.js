import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import SearchInput from './SeachInput';
import ErrorMessage from './ErrorMessage';
import NoResultsMessage from './NoResultsMessage';
import UserTable from './UserTable';
import PaginationButtons from './PaginationButtons';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);
  const debounceTimeout = 300;
  let debounceTimer;

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setUsers([]);
      setTotalCount(0);
      setError(null);
      return;
    }

    const fetchUsers = async () => {
      try {
        const response = await axios.get(`https://api.github.com/search/users?q=${searchQuery}&per_page=30&page=${currentPage}`);
        setUsers(response.data.items);
        setTotalCount(response.data.total_count);
        setError(null);
      } catch (error) {
        console.error('Error fetching users:', error.message);
        setUsers([]);
        setTotalCount(0);
        if (error.response && error.response.status === 404) {
          setError('Error 404: Users not found. Please try a different search term.');
        } else {
          setError('An error occurred while fetching data. Please refresh the page and try again.');
        }
      }
    };
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(fetchUsers, debounceTimeout);
    return () => clearTimeout(debounceTimer);
  }, [searchQuery, currentPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="App">
      <SearchInput value={searchQuery} onChange={setSearchQuery} />

      {error ? (
        <ErrorMessage message={error} />
      ) : users.length === 0 && searchQuery !== '' ? (
        <NoResultsMessage />
      ) : (
        <>
          <UserTable users={users} />
          <PaginationButtons currentPage={currentPage} pageCount={Math.ceil(totalCount / 30)} handlePageChange={handlePageChange} />
        </>
      )}
    </div>
  );
};


export default App;
