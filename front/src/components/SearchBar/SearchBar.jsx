import React, { useState } from 'react';
import { History, Provider } from 'react-history-search';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'react-history-search/dist/index.css';
import './SearchBar.css';
import { useSearch } from '../CardContainer/CardContainer';

export const SearchBar = () => {
  const { handleSearch } = useSearch();
  const [search, setSearch] = useState('');

  const triggerSearch = () => {
    const event = new KeyboardEvent('keydown', {
      key: 'Enter',
      bubbles: true,
      cancelable: true,
    });
    const element = document.getElementById('search-input');
    element.dispatchEvent(event);
    handleSearch(search);
  };

  const handleChange = (searchString) => {
    if (searchString === '') {
      handleSearch('');
    }
    setSearch(searchString);
  };

  return (
    <Provider
      id='search-provider'
      value={{
        handleSearch,
        isEnterDown: true,
      }}
    >
      <Form className='d-flex'>
        <History isHint isTabFill isRemoveHistory>
          <Form.Control
            type='search'
            placeholder='Search'
            className='me-2'
            aria-label='Search'
            id='search-input'
            value={search}
            onChange={(e) => handleChange(e.target.value)}
          />
        </History>
        <Button id='search-btn' onClick={triggerSearch}>
          Search
        </Button>
      </Form>
    </Provider>
  );
};
