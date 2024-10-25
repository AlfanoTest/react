import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import KakaoMap from './KakaoMap.js';

function App() {
  return (
    <BrowserRouter basename="/react">
      <Routes>
        <Route path = "/" element={<KakaoMap/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
