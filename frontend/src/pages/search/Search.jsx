import React, { useState } from 'react';
import './Search.css';
import LeftSidebar from '../home/leftBar/LeftSidebar';
import Header from './header';
import Categories from './Categories';
import PostsGrid from './PostGrid';

function Search() {
  const [filters, setFilters] = useState({
    posts: false,
    polls: false,
    users: false,
    textStory: false
  });

  return (
    <div className='search-container'>
      <div className='search-left'>
        <LeftSidebar />
      </div>

      <div className='main-part'>
        <div className='search-header'>
          <Header filters={filters} setFilters={setFilters} />
        </div>

        <div className='search-categories'>
          <Categories />
        </div>

        <PostsGrid filters={filters} />
      </div>
    </div>
  );
}

export default Search;
