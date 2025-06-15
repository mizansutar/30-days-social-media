import React from 'react';
import './PostGrid.css';

const allPosts = [
  { type: 'text', content: 'Just launched ONAC beta today! 🚀 #NextGenSocial' },
  { type: 'image', src: 'https://picsum.photos/id/1011/400/300', caption: 'Mountain View' },
  { type: 'poll', question: 'Favorite frontend library?', options: ['React', 'Vue', 'Angular', 'Svelte'] },
  { type: 'user', name: 'Nicky Sharma', avatar: 'https://picsum.photos/id/1027/50/50', bio: 'Full stack dev 💻' },
  { type: 'text', content: 'ONAC is here to redefine connectivity. Join now.' },
  { type: 'image', src: 'https://picsum.photos/id/1015/400/300', caption: 'River Side' },
  { type: 'poll', question: 'Which JS runtime do you prefer?', options: ['Node.js', 'Deno', 'Bun'] },
  { type: 'user', name: 'ONAC Official', avatar: 'https://picsum.photos/id/1005/50/50', bio: 'Welcome to the future of social.' },
  ...Array.from({ length: 12 }, (_, i) => {
    const mod = i % 4;
    if (mod === 0) return { type: 'image', src: `https://picsum.photos/id/${1040 + i}/400/300`, caption: `Photo #${i + 1}` };
    if (mod === 1) return { type: 'poll', question: `Poll ${i + 1}`, options: ['A', 'B', 'C', 'D'] };
    if (mod === 2) return { type: 'text', content: `Text content #${i + 1}` };
    return { type: 'user', name: `User ${i + 1}`, avatar: `https://picsum.photos/seed/user${i}/50/50`, bio: `Bio of user ${i + 1}` };
  })
];

function PostsGrid({ filters }) {
  const posts = allPosts.filter(post => {
    if (post.type === 'text') return filters.text || filters.posts;
    if (post.type === 'image') return filters.posts;
    if (post.type === 'poll') return filters.polls;
    return false;
  });

  const users = allPosts.filter(post => post.type === 'user' && filters.users);

  return (
    <div className='grid-wrapper'>
      <div className='posts-grid'>
        {posts.map((post, index) => (
          <div className='grid-item' key={index}>
            {post.type === 'image' && (
              <>
                <img src={post.src} alt='post' className='post-image' />
                <p>{post.caption}</p>
              </>
            )}
            {post.type === 'text' && (
              <p className='text-post'>{post.content}</p>
            )}
            {post.type === 'poll' && (
              <>
                <h4>{post.question}</h4>
                {post.options.map((option, i) => (
                  <label key={i} className='poll-option'>
                    <input type='radio' name={`poll-${index}`} />
                    {option}
                  </label>
                ))}
              </>
            )}
          </div>
        ))}
      </div>

      {users.length > 0 && (
        <div className='users-section'>
          <h3>Users</h3>
          <div className='user-list'>
            {users.map((user, index) => (
              <div className='insta-user-card' key={index}>
                <img src={user.avatar} alt={user.name} className='insta-user-avatar' />
                <div className='insta-user-info'>
                  <span className='insta-username'>{user.name}</span>
                  <span className='insta-subtext'>{user.bio}</span>
                </div>
                <button className='insta-follow-btn'>Follow</button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default PostsGrid;
