import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginRegister from './componets/loginreg';
import LandingPage from './pages/home/landingPage.jsx';
import { DataProvider } from './dataPRovider/dataProvider.jsx';
import Home from './pages/home/Home.jsx';
import CreatePosts from './pages/CreatePosts/create-post.jsx';
import Search from './pages/search/Search.jsx';
import Profile from './pages/profile/profile.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';

function App() {
  const [isauth, isUserAuth] = useState(false);
  return (
    <DataProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginRegister isUserAuth={isUserAuth} />} />
          <Route path="/landing" element={<LandingPage />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/create-post"
            element={
              <PrivateRoute>
                <CreatePosts />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route
            path="/search"
            element={
              <PrivateRoute>
                <Search />
              </PrivateRoute>
            }
          />
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </DataProvider>
  );
}

export default App;
