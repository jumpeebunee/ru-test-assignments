import React from 'react'
import { Routes, Route } from 'react-router-dom';
import MainPage from '../pages/MainPage';
import ValutesPage from '../pages/ValutesPage';

const AppNavigation = () => {
  return (
    <Routes>
      <Route path='/' element={<MainPage/>}></Route>
      <Route path='/valutes' element={<ValutesPage/>}></Route>
    </Routes>
  )
}

export default AppNavigation