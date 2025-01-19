import { BrowserRouter, Routes, Route } from "react-router-dom"
import React, { useEffect, useState } from 'react';
import Bookview from "./bookview"

import Home from './Home'
import Categories from "./categories"
import Booklist from "./booklist"

import AddBookForm from "./addbook";
import SearchBook from "./searchbook";

function App() {
  

  return (
    <>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}>
        
          <Route index  element={<Categories />} />
          <Route path="/searchbook/:query" element={<SearchBook />} />
          <Route path="addbook" element={<AddBookForm />} />
         
          <Route path="booklist" element={<Booklist />} />
          <Route path="/bookview/:id" element={<Bookview />} />
          
          
          </Route>
        </Routes>
      </BrowserRouter>
      



    </>
  )
}


export default App
