import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Maincontent from './maincontent';
import Loginpage from './loginpage';
import Notes from './notes';
function App() {
  return ( 
    <Router>
      <Routes>
      <Route path="/" element={<Maincontent />} />
        <Route path="/notes" element={<Notes />} />
      </Routes>
    </Router>
  )
}

export default App