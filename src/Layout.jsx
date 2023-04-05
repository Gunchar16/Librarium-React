import React from 'react'
import './index.css';
import Book from './Book';
import BookDetails from './BookDetails';
import { Route, Routes } from 'react-router-dom';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';

export default function Layout() {  
  return (
    <div className="App">
      <SearchBar />
      <main>
        <Routes>  
          <Route path="/" element={<Book />} />
          <Route path="/books/:id" element={<BookDetails />} />
          <Route path="/books/search" element={<SearchResults />} />
        </Routes>
      </main>
    </div>
  );
}