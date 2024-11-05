/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import CommentsList from './CommentsList';

export default function NestedComments() {
    const commentsData = [
        {
          id: 1,
          text: "This is the first comment",
          replies: [
            {
              id: 2,
              text: "This is a reply to the first comment",
              replies: [
                {
                  id: 3,
                  text: "This is a reply to the reply",
                  replies: [],
                },
              ],
            },
          ],
        },
        {
          id: 4,
          text: "This is another top-level comment",
          replies: [],
        },
      ];
    const [value, setValue] = useState('');
    const [comments, setComments] = useState(commentsData);

    function submitHandler() {
        if (value.trim()) {
            setComments([
                ...comments,
                {
                    id: Date.now(),
                    text: value,
                    replies: []
                }
            ]);
            setValue('');
        }
    }

    return (
        <div className='flex w-full h-screen flex-col'>
            <div className='flex justify-center items-center w-full h-[100px] shadow-xl'>
                <h1 className='font-bold'>Nested Comments</h1>
            </div>
            <div className='flex justify-center items-center flex-col'>
                <div className='m-4'>
                    <input
                        className='p-4 border-black border-2'
                        type='text'
                        placeholder='Add comment...'
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                    />
                    <button className='m-2 p-4 bg-black text-white' onClick={submitHandler}>
                        Submit
                    </button>
                </div>
                <CommentsList comments={comments} setComments={setComments} />
            </div>
        </div>
    );
}
