/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

export default function GitUrlSearch() {
    const [value, setValue] = useState('');
    const [highlightedIndex, setHighlightedIndex] = useState(-1);

    const fetchUsers = async ({ queryKey }) => {
        const query = queryKey[1];
        if (!query) return [];
        
        const response = await axios.get(`https://api.github.com/search/users?q=${query}`);
        return response.data.items;
    };

    const { data: users = [] } = useQuery({
        queryKey: ['searchUsers', value],
        queryFn: fetchUsers,
        enabled: !!value, // Only run the query when there's a search term
    });

    function keyHandler(e) {
        if (e.key === 'ArrowDown') {
            setHighlightedIndex((prevIndex) => 
              prevIndex < users.length - 1 ? prevIndex + 1 : 0
            );
            e.preventDefault(); 
        } else if (e.key === 'ArrowUp') {
            setHighlightedIndex((prevIndex) => 
              prevIndex > 0 ? prevIndex - 1 : users.length - 1
            );
            e.preventDefault(); 
        } else if (e.key === 'Enter') {
            if (highlightedIndex >= 0 && highlightedIndex < users.length) {
                setValue(users[highlightedIndex].login);
            }
        }
    }

    return (
        <>
            <div className='flex m-auto flex-col w-full h-screen'>
                <div className='flex justify-center items-center m-10 shadow-xl'>
                    <h1 className='font-extrabold'>Type Head (Online)</h1>
                </div>
                <div className='flex justify-center items-center flex-col'>
                    <p>Use up & down arrows to navigate suggestions</p>
                    <input
                        type='text'
                        placeholder='Search For Git username'
                        className='px-10 py-5 my-4 border-black'
                        onChange={(e) => {
                            setValue(e.target.value);
                            setHighlightedIndex(-1); 
                        }}
                        onKeyDown={keyHandler} 
                        value={value}
                    />
                    {value && (
                        <div className='flex justify-center items-center flex-col overflow-auto'>
                            {users.map((user, index) => (
                                <span
                                    key={user.id}
                                    className={`px-10 py-5 border-black ${highlightedIndex === index ? 'bg-gray-200' : ''}`}
                                >
                                    {user.login}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
