import React from 'react'
import LeftSidebar from '../home/leftBar/LeftSidebar'
import './Search.css'
export default function Search() {
  return (
    <div className="search-container">
      <LeftSidebar />

      <div className="search-content">
        <div className="Searchbar">
          <input type="text" />
        </div>
        
      </div>
    </div>
  )
}
