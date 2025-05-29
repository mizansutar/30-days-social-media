import React from 'react'

export default function createpost() {
  return (
    <div>
      <h1>Create Post</h1>
      <form>
        <div>
          <label>Title:</label>
          <input type="text" />
        </div>
        <div>
          <label>Content:</label>
          <textarea></textarea>
        </div>
        <button type="submit">Create Post</button>
      </form>
    </div>
  )
}
