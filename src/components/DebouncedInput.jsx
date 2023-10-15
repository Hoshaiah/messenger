import React, { useState, useEffect } from 'react';
import { searchUsers } from '../services/actionServices';
import { useDispatch } from 'react-redux';

function DebouncedInput(props) {
    const {searchInput, setSearchInput, searchRef, searchResults, setSearchResults} = props

    useEffect(() => {
        const timer = setTimeout(async () => {
            if(searchRef.current.value) {
                const resp = await searchUsers(searchRef.current.value);
                setSearchResults(resp.data)
            } else {
                setSearchResults([])
            }
        }, 500); 

        return () => {
            clearTimeout(timer);
        };
    }, [searchInput]);

    return (
        <input className="w-full h-10 m-2 p-2 rounded-sm bg-white z-10 focus:outline-none" ref={searchRef} onChange={(e) => {setSearchInput(e.target.value)}} value={searchInput} placeholder="search for email, name, or id"></input>     
    );
}

export default DebouncedInput;