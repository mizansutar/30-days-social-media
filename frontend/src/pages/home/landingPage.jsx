import React from 'react'
import LeftSidebar from './leftBar/LeftSidebar'
import RightSidebar from './RightSidebar'
import StoryBar from './StoryBar'
import Feed from './Feed'
import './landingPage.css'
export default function landingPage() {
  return (
        <div className="app-container">
      <LeftSidebar />
      <main className="main-content">
        <StoryBar />
        <Feed />
      </main>
      <RightSidebar />
    </div>
  );
}
