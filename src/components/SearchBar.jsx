import { useState, useRef, useEffect} from "react";
import DebouncedInput from "./DebouncedInput";

function SearchBar () {
    const [borderFocus, setBorderFocus] = useState(false)
    const bigSearchRef = useRef(null)
    const buttonRef = useRef(null)
    const searchRef = useRef(null)
    const [searchInput, setSearchInput] = useState("")
    const [searchResults, setSearchResults] = useState([])

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

    console.log(searchResults)
    return (
        <div className= "absolute w-1/2 max-h-80 top-0 z-10">
          <div className='flex w-full h-full justify-center'>
                  <button ref={buttonRef} className= {`w-64 h-6 rounded-sm bg-white mt-2 ${borderFocus ? 'hidden' : ''} text-slate-400`} onClick={handleSearchBarButtonClick}> {searchInput ? `Search: ${searchInput}` : 'Add friend'}</button>
                  {borderFocus && 
                      <div ref={bigSearchRef} id= 'input2' className= "flex flex-col items-center w-full h-full overflow-visible bg-slate-600 px-2 pb-2">
                          <DebouncedInput
                            searchRef={searchRef}
                            searchInput={searchInput}
                            setSearchInput={setSearchInput}
                            searchResults={searchResults}
                            setSearchResults={setSearchResults}
                          />
                          <div className="w-full max-h-72 bg-white">
                            {searchResults && searchResults.map(item => (
                              <div>
                                {item.name}
                              </div>
                            ))}
                          </div>
                      </div>
                  }
          </div>
        </div>
    )
}

export default SearchBar;