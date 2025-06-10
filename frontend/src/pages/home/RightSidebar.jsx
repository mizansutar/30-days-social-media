import React, { useState, useEffect } from 'react';
import './rightSideBar.css';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../../redux/userSlice'; // Adjust path if needed

const RightSidebar = () => {
  const dispatch = useDispatch();
  const { user: currentUser, token } = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const followHandler = async (targetUserId, isFollowing) => {
    try {
      const url = isFollowing
        ? `http://localhost:5000/api/users/f/${targetUserId}/unfollow`
        : `http://localhost:5000/api/users/f/${targetUserId}/follow`;

      const res = await axios.post(url, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });

      console.log(res.data.msg);

      const updatedFollowing = isFollowing
        ? currentUser.following.filter(id => id !== targetUserId)
        : [...(currentUser.following || []), targetUserId];

      dispatch(setUser({
        user: { ...currentUser, following: updatedFollowing },
        token: token
      }));









      
      setUsers(prevUsers =>
        prevUsers.map(user =>
          user._id === targetUserId
            ? {
                ...user,
                followers: isFollowing
                  ? user.followers.filter(id => id !== currentUser._id)
                  : [...user.followers, currentUser._id]
              }
            : user
        )
      );
    } catch (error) {
      console.error('Follow/Unfollow error:', error.response?.data || error.message);
    }
  };

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/users/recommendationUser', {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.data.success) {
          setUsers(res.data.users);
        }
      } catch (err) {
        console.error('Recommendation fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [token]);

  const truncate = (str, max = 10) =>
    str.length > max ? `${str.slice(0, max - 3)}...` : str;

  return (
    <aside className="right-sidebar">
      <h4>Who to follow</h4>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="recommendation-list">
          {users.map((user) => {
            const isFollowing = currentUser.following?.includes(user._id);
            return (
              <li key={user._id} className="recommendation-item">
                <img
                  src={
                    user.profilePicture ||
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(user.username)}`
                  }
                  alt={user.username}
                />
                <div className="user-info">
                  <span className="username">{truncate(user.username, 8)}</span>
                  <button
                    className="follow-btn"
                    onClick={() => followHandler(user._id, isFollowing)}
                  >
                    {isFollowing ? 'Unfollow' : 'Follow'}
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </aside>
  );
};

export default RightSidebar;
