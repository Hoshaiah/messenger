import { useState, useRef, useEffect} from "react";

function SearchBar () {
    const [borderFocus, setBorderFocus] = useState(false)
    const bigSearchRef = useRef(null)
    const buttonRef = useRef(null)
    const searchRef = useRef(null)
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

      useEffect(() => {
        if(borderFocus && searchRef) {
            searchRef.current.focus()
        }
      }, [borderFocus])


    return (
        <div class= "absolute w-1/2 h-40 top-0 z-10">
          <div class='flex w-full h-full justify-center'>
                  <button ref={buttonRef}class= {`w-64 h-6 rounded-sm bg-white mt-2 ${borderFocus ? 'hidden' : ''}`} onClick={handleSearchBarButtonClick}> {searchInput ? `Search: ${searchInput}` : ''}</button>
                  {borderFocus && 
                      <div ref={bigSearchRef} id= 'input2' class = "flex w-full h-full overflow-visible justify-center bg-slate-600">
                          <input class ="w-full h-10 m-2 p-2 rounded-sm bg-white z-10 focus:outline-none" ref={searchRef} onChange={(e) => {setSearchInput(e.target.value)}} value={searchInput} ></input>            
                      </div>
                  }
          </div>
        </div>
    )
}

export default SearchBar;