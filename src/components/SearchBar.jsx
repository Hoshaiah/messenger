import { useState, useRef, useEffect} from "react";
import DebouncedInput from "./DebouncedInput";

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
        <div className= "absolute w-1/2 h-40 top-0 z-10">
          <div className='flex w-full h-full justify-center'>
                  <button ref={buttonRef}className= {`w-64 h-6 rounded-sm bg-white mt-2 ${borderFocus ? 'hidden' : ''} text-slate-400`} onClick={handleSearchBarButtonClick}> {searchInput ? `Search: ${searchInput}` : 'Add friend'}</button>
                  {borderFocus && 
                      <div ref={bigSearchRef} id= 'input2' class = "flex w-full h-full overflow-visible justify-center bg-slate-600">
                          <DebouncedInput
                            searchRef={searchRef}
                            searchInput={searchInput}
                            setSearchInput={setSearchInput}
                          />
                      </div>
                  }
          </div>
        </div>
    )
}

export default SearchBar;