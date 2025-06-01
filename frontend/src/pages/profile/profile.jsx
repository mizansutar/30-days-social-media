import React from 'react';
import LeftSidebar from '../home/leftBar/LeftSidebar';
import './profile.css';
import { useSelector } from 'react-redux';
import { Edit as EditIcon, Lock as LockIcon, Logout as LogoutIcon } from '@mui/icons-material';

export default function Profile() {
    const { user } = useSelector(state => state.user);
    const { token } = useSelector(state => state.user);
    return (
        <div className='profile-container'>
            <nav className='profile-nav'>
                <LeftSidebar />
            </nav>

            <main className='profile-main'>
                <div className="profile-main-header">
                    <div className="imagecontainer">
                        <img src="https://ui-avatars.com/api/?name=Jane+Smith&size=128" alt="" className='profile-avatar' />
                    </div>
                    <div className="profile-info">
                        <h1>{user?.username}</h1>
                        <p>@{user?.username}</p>
                        <p>{user?.bio}</p>
                    </div>

                </div>

                <div className="profile-main-middle">middle</div>
                <div className="profile-main-bottom">
                    <h2>Recent Activity</h2>
                    <ul>
                        <li>Commented on a post</li>
                        <li>Liked a photo</li>
                        <li>Followed a new user</li>
                        <li>Updated profile picture</li>
                    </ul>
                     <h2>Recent Activity</h2>
                    <ul>
                        <li>Commented on a post</li>
                        <li>Liked a photo</li>
                        <li>Followed a new user</li>
                        <li>Updated profile picture</li>
                    </ul>
                     <h2>Recent Activity</h2>
                    <ul>
                        <li>Commented on a post</li>
                        <li>Liked a photo</li>
                        <li>Followed a new user</li>
                        <li>Updated profile picture</li>
                    </ul>
                     <h2>Recent Activity</h2>
                    <ul>
                        <li>Commented on a post</li>
                        <li>Liked a photo</li>
                        <li>Followed a new user</li>
                        <li>Updated profile picture</li>
                    </ul>
                    

                </div>
            </main>

            <aside className='profile-aside'>
                <h2>Profile Actions</h2>
                <ul>
                    <li><a href="/edit-profile"><EditIcon fontSize="small" /> Edit Profile</a></li>
                    <li><a href="/change-password"><LockIcon fontSize="small" /> Change Password</a></li>
                    <li><a href="/logout"><LogoutIcon fontSize="small" /> Logout</a></li>
                </ul>
            </aside>
        </div>
    );
}
