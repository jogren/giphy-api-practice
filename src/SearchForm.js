import React from 'react';

function SearchForm({ search, handleSearch, handleSubmit }) {
    return(
      <form>
        <input 
          type="text"
          name="search"
          value={search}
          placeholder="Search for gifs"
          onChange={handleSearch}
        />
        <button onClick={handleSubmit}>Search</button>
      </form>
    )
  }

export default SearchForm;