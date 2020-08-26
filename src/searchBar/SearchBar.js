import React, {useState, useEffect} from 'react';
import AutoSuggestPanel from '../autosuggestPanel/Autosuggest'
import './SearchBar.css'
import {searchBook} from "../relevancySearch/relSuggestionGenerator"


function SearchBar({onSubmit}) {
  const [inputData, setInputData] = useState("")
  const [list, setList] = useState([])
  const [openSuggestion, onSetOpenSuggestion] = useState(false)
  const [selectedBook, setSelectedBook] = useState({})

  /*Will run in everytime the input changes to get the search result*/
  useEffect( () => {
    async function search() {
      if(inputData) {
        const searchResult =  await searchBook(inputData)
        setList(searchResult)
        } else {
         setList([])
        }
    }
    search()
    }, [inputData])
  
    return(
        <div id="searchBar">
          <input id="myInput" type="text" required name="MyLibraray" placeholder="Search"
              onChange={(e)=> {
                setInputData(e.target.value)
                onSetOpenSuggestion(true)
              }}
              value = {inputData}
            />
            {/*submits the selected search result to display the book card and
            empty the search input and selectedBook data field*/}
            <button onClick={()=> {
              if (selectedBook.author) {
                onSubmit(selectedBook)
                setInputData('')
                setSelectedBook({})
              }
              /**/
            }}>
            <i className="fa fa-search"></i></button>
            {
              /*updates the inputData and selectedBook data, post selection of suggestion and closes the panel*/
              openSuggestion && <AutoSuggestPanel
              list={list.map((book) => ({label: book.title, value: book}))} 
              filterInput={inputData}
              onClick={(data) => {
                setInputData(data.label)
                setSelectedBook(data.value)
                onSetOpenSuggestion()
              }}
            />
          }
      </div>
    )
}

export default SearchBar;
