import React from 'react';
import { Link } from 'react-router-dom';
import './LeftSidebar.css';
import {
  FaHome,
  FaSearch,
  FaCompass,
  FaBell,
  FaEnvelope,
  FaUser,
  FaCog,
  FaSignOutAlt,
  FaPlus,
  FaVideo
} from 'react-icons/fa';

const LeftSidebar = () => {
  return (
    <div className="left-sidebar">
      <div className="logo-section">
        <h1>ONAS</h1>
      </div>

      <nav className="nav-links">
        <Link to="/"><FaHome /> Home</Link>
        <Link to="/search"><FaSearch /> Search</Link>
        <Link to="/explore"><FaCompass /> Explore</Link>
        <Link to="/notifications"><FaBell /> Notifications</Link>
        <Link to="/videos"><FaVideo /> Videos</Link>
        <Link to="/messages"><FaEnvelope /> Messages</Link>
        <Link to="/create-post"><FaPlus /> Create Post</Link>
        <Link to="/profile"><FaUser /> Profile</Link>
      </nav>

      <div className="bottom-links">
        <Link to="/settings"><FaCog /> Settings</Link>
        <Link to="/logout"><FaSignOutAlt /> Logout</Link>
      </div>
    </div>
  );
};

export default LeftSidebar;
