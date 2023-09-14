import React, { useState, useEffect } from 'react';

function DebouncedInput(props) {
    const {searchInput, setSearchInput, searchRef} = props

    useEffect(() => {
        const timer = setTimeout(() => {
            console.log(`Making request with query: ${searchInput}`);
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