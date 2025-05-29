import React from 'react';
import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginRegister from './componets/loginreg';
import LandingPage from './pages/home/landingPage.jsx';
import { DataProvider } from './dataPRovider/dataProvider.jsx';
import Home from './pages/home/Home.jsx';
import CreatePosts from './pages/CreatePosts/create-post.jsx';
import Search from './pages/search/Search.jsx';
function App() {
  const [isauth, isUserAuth] = useState(false);
  return (
    <DataProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginRegister isUserAuth={isUserAuth} />} />
          <Route path="/landing" element={<LandingPage />} />
          <Route path="/" element={<Home />} />
          <Route path='/create-post' element={<CreatePosts />} />
          <Route
            path="/search"
            element={
              <>
                
                <Search />
              </>
            }
          />
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </DataProvider>
  );
}

export default App;
