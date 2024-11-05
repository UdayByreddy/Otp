/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';

export default function Comment({ comment, setComments }) {
  const [reply, setReply] = useState('');
  const [replyButton, setReplyButton] = useState(false);

  function submitHandler() {
    setReplyButton(false);
    if (reply.trim()) {
      setComments((prevComments) =>
        addReplyToComment(prevComments, comment.id, {
          id: Date.now(),
          text: reply,
          replies: [],
        })
      );
      setReply('');
    }
  }

  function deleteHandler() {
    setComments((prevComments) => deleteComment(prevComments, comment.id));
  }

  function addReplyToComment(comments, commentId, newReply) {
    return comments.map((c) => {
      if (c.id === commentId) {
        return { ...c, replies: [...c.replies, newReply] };
      }
      return { ...c, replies: addReplyToComment(c.replies, commentId, newReply) };
    });
  }

  function deleteComment(comments, commentId) {
    return comments
      .filter((c) => c.id !== commentId)
      .map((c) => ({ ...c, replies: deleteComment(c.replies, commentId) }));
  }

  return (
    <div className="ml-4 mt-4">
      <div className='w-[300px] border-l-4 border-blue-500 rounded-xl shadow-xl p-2'>
        <p>{comment.text}</p>
        <button className="p-2" onClick={() => setReplyButton((prevReply) => !prevReply)}>
          Reply
        </button>
        <button className="p-2" onClick={deleteHandler}>
          Delete
        </button>

        {replyButton && (
          <div>
            <input
              type="text"
              placeholder="Write a reply..."
              value={reply}
              onChange={(e) => setReply(e.target.value)}
            />
            <button onClick={submitHandler}>Save</button>
          </div>
        )}
      </div>

      {comment.replies.length > 0 && (
        <div className="ml-8 border-l-4 border-blue-600">
          {comment.replies.map((reply) => (
            <Comment key={reply.id} comment={reply} setComments={setComments} />
          ))}
        </div>
      )}
    </div>
  );
}
