import { useState, useRef, useEffect} from "react";

function SearchBar () {
    const [borderFocus, setBorderFocus] = useState(false)
    const bigSearchRef = useRef(null)
    const buttonRef = useRef(null)
    const [searchInput, setSearchInput] = useState("")

    const handleSearchBarButtonClick = () => {
        setBorderFocus(true)
    }
    const handleBorderBlur = () => {
        setBorderFocus(false)
    }

    useEffect(() => {
        function handleClickOutside(event) {
          if (bigSearchRef.current && !bigSearchRef.current.contains(event.target) && event.target!== buttonRef.current) {
            handleBorderBlur()
          }
        }
    
        document.addEventListener('click', handleClickOutside);
    
        return () => {
          document.removeEventListener('click', handleClickOutside);
        };
      }, []);


    return (
        <div id='input1'>
            <button ref={buttonRef}class= "w-64 h-6 rounded-sm bg-white" onClick={handleSearchBarButtonClick}> {`Search: ${searchInput}`}</button>
            {borderFocus && 
                <div ref={bigSearchRef} id= 'input2' class = "overflow-visible h-full z-10">
                    <input class ="w-64 h-40 rounded-sm bg-orange-300" onChange={(e) => {setSearchInput(e.target.value)}} value={searchInput} ></input>            
                </div>
            }
        </div>
    )
}

export default SearchBar;