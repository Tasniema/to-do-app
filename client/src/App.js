import React, { useState } from 'react'
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import "react-toastify/dist/ReactToastify.css"
import Cards from './components/Cards';
import Header from './components/Header';

const App = () => {

  return (
    <div>
      <Header />
      <Router>
        <Routes>
        <Route exact  path='/register' element={<Register />} />
        <Route exact  path='/login' element={<Login />} />
        <Route exact path="/" element={<Cards />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
