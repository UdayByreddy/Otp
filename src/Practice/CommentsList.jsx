/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import Comment from './Comment';

export default function CommentsList({ comments, setComments }) {
  return (
    <div>
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} setComments={setComments} />
      ))}
    </div>
  );
}
