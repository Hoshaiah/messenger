import React, { useState, useEffect } from 'react';
import { searchUsers } from '../services/actionServices';

function DebouncedInput(props) {
    const {searchInput, setSearchInput, searchRef} = props

    useEffect(() => {
        const timer = setTimeout(async () => {
            if(searchRef.current.value) {
                const resp = await searchUsers(searchRef.current.value);
            }
        }, 500); 

        return () => {
            clearTimeout(timer);
        };
    }, [searchInput]);

    return (
        <input class ="w-full h-10 m-2 p-2 rounded-sm bg-white z-10 focus:outline-none" ref={searchRef} onChange={(e) => {setSearchInput(e.target.value)}} value={searchInput} placeholder="search for email, name, or id"></input>     
    );
}

export default DebouncedInput;