import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css'; // REQUIRED

import LoginRegister from './componets/loginreg';
import LandingPage from './pages/home/landingPage.jsx';
import Home from './pages/home/Home.jsx';
import CreatePosts from './pages/CreatePosts/create-post.jsx';
import Search from './pages/search/Search.jsx';
import Profile from './pages/profile/profile.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import { DataProvider } from './dataPRovider/dataProvider.jsx';
import Message from './pages/message/message.jsx';


import socket from './socket.js';

function App() {
  const [isauth, isUserAuth] = useState(false);
  const { user: currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected user socket ID:', socket.id);
      socket.emit('register', currentUser?._id); // Register user on socket server
    });

    socket.on('welcome', (msg) => {
      console.log(msg);
    });

    socket.on('notification', (payload) => {
     console.log(`👤 ${payload.message} `)
      if (payload?.type === 'follow') {
        toast.info(`👤 ${payload.message} followed you`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    });

    return () => {
      socket.off('notification');
    };
  }, [currentUser?._id]);

  return (
    <DataProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginRegister isUserAuth={isUserAuth} />} />
          <Route path="/landing" element={<LandingPage />} />
          <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path="/create-post" element={<PrivateRoute><CreatePosts /></PrivateRoute>} />
          <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
          <Route path="/search" element={<PrivateRoute><Search /></PrivateRoute>} />
          <Route path='/messages' element={<PrivateRoute><Message/></PrivateRoute>}/>
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </DataProvider>
  );
}

export default App;
