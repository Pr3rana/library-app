import React, { useState } from 'react';
import './Template.css';
import SearchBar from '../searchBar/SearchBar';

/* Template for header */
function Header(){
    return <h3 id="header">Unibuddy Library</h3>
}

/* Template for book card */
export function BookCard({title, summary,author}){
    return(
            <div className="bookCard"> 
                <p className="title">{title}</p>
                <p className="summary">{summary}</p>
                <p className="author">By: {author}</p>
            </div>
    )
}
/* Embedding all components to render the final view */
function Template(){
    const [books, setSelectBooks] = useState([]);
    return (
        <div>
            <Header />
            <SearchBar onSubmit={(book) => {
                /* updating the selected autosuggest result to books */
                setSelectBooks([...books, book])
            }}/>
            <div id="mainWrapper">
                {/* mapping the final result of the search to show the cards  */}
            {books.map((book, index)=>
                <BookCard 
                key={index} 
                title={book.title} 
                summary={book.summary} 
                author={book.author}
            />
            )}
            </div>
        </div>
            
    );
}
export default Template;
