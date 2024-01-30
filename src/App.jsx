import { useState } from 'react'
import './App.css';
import Layout from './componenet/Layout/Layout';
import { Route,Routes } from 'react-router-dom';
import HomePage from "./Page/HomePage";
import Favourtie from "./Page/Favourtie";
import NewBooks from "./Page/NewBooks"


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Layout/>
    <Routes>
      <Route element={<HomePage/>} path='/'></Route>
      <Route element={<NewBooks/>} path='/books'></Route>
      <Route element={<Favourtie/>} path='/favourite'/>
    </Routes>
    </>
  )
}

export default App
