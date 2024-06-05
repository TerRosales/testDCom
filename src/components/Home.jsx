// src/components/Home.jsx
import React from 'react';
import { getDexcomAuthUrl } from '../utils/auth';

const Home = () => {
  const handleLogin = () => {
    window.location.href = getDexcomAuthUrl();
  };

  return (
    <div>
      <h1>Welcome to Dexcom OAuth Integration</h1>
      <button onClick={handleLogin}>Login with Dexcom</button>
    </div>
  );
};

export default Home;
