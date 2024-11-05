/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';

export default function GitUrlSearch() {
    const [value, setValue] = useState('');
    const [users, setUsers] = useState([]);
    const [highlightedIndex, setHighlightedIndex] = useState(-1);
    const inputRef = useRef(null);
    const [enterClicked, setEnterClicked] = useState(false);
    const GitToken = import.meta.env.VITE_GIT_TOKEN;

    const fetchData = async (query) => {
        if (!query) {
            setUsers([]); 
            return;
        }
        try {
            const response = await axios.get(`https://api.github.com/search/users?q=${query}`, {
                headers: {
                    Authorization: `Token ${GitToken}`
                }
            });
            setUsers(response.data.items);
        } catch (error) {
            console.error("Error fetching data from GitHub API", error);
        }
    };

    useEffect(() => {
        if (!enterClicked) fetchData(value); 
    }, [value, enterClicked]);

    function keyHandler(e) {
        if (e.key === 'ArrowDown') {
            setHighlightedIndex((prevIndex) => 
                prevIndex < users.length - 1 ? prevIndex + 1 : 0
            );
            e.preventDefault();
            setEnterClicked(false);
        } else if (e.key === 'ArrowUp') {
            setHighlightedIndex((prevIndex) => 
                prevIndex > 0 ? prevIndex - 1 : users.length - 1
            );
            e.preventDefault();
            setEnterClicked(false);
        } else if (e.key === 'Enter') {
            if (highlightedIndex >= 0 && highlightedIndex < users.length) {
                setValue(users[highlightedIndex].login);
                setUsers([]);
                setHighlightedIndex(-1);
                setEnterClicked(true);
            }
        }
    }

    const handleUserClick = (userLogin) => {
        setValue(userLogin);
        setHighlightedIndex(-1);
        setUsers([]);
        setEnterClicked(true);
        if (inputRef.current) inputRef.current.focus(); 
    };

    return (
        <div className='flex m-auto flex-col w-full h-screen'>
            <div className='flex justify-center items-center m-10 shadow-xl'>
                <h1 className='font-extrabold'>Type Head (Online)</h1>
            </div>
            <div className='flex justify-center items-center flex-col'>
                <p>Use up & down arrows to navigate suggestions</p>
                <div>
                    <input
                        type='text'
                        ref={inputRef} 
                        placeholder='Search For Git username'
                        className='px-10 py-5 my-4 border-black  bottom-2 relative'
                        onChange={(e) => {
                            setValue(e.target.value);
                            setHighlightedIndex(-1);
                            setEnterClicked(false); 
                        }}
                        onKeyDown={keyHandler} 
                        value={value}
                    />
                </div>

                {value && users.length > 0 && (
                    <div className='flex flex-col overflow-auto max-h-60 border-t'>
                        {users.map((user, index) => (
                            <span
                                key={user.id}
                                onClick={() => handleUserClick(user.login)}
                                className={`px-10 py-5 cursor-pointer ${highlightedIndex === index ? 'bg-gray-200' : ''}`}
                            >
                                {user.login}
                            </span>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
