import React, { useState } from 'react';
import './_categories.scss';

const keywords = [
  "All", "Music", "Live", "Gaming", "News", "Sports", "Learning", "Fashion",
  "Movies", "Comedy", "Technology", "Programming", "AI", "Crypto", "React.js",
  "JavaScript", "Bollywood", "Motivation", "Web Dev"
];

function Categories() {
  const [activeElement, setActiveElement] = useState("All");

  return (
    <div className="categoriesBar">
      {keywords.map((keyword, index) => (
        <span
          key={index}
          className={`category__item ${activeElement === keyword ? 'active' : ''}`}
          onClick={() => setActiveElement(keyword)}
        >
          {keyword}
        </span>
      ))}
    </div>
  );
}

export default Categories;
