import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { MoodProvider } from './contexts/MoodContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Onboarding from './pages/Onboarding';
import Journal from './pages/Journal';
import Response from './pages/Response';
import Dashboard from './pages/Dashboard';
import VideoChat from './pages/VideoChat';
import TextChat from './pages/TextChat';
import Profile from './pages/Profile';

function App() {
  return (
    <Router>
      <AuthProvider>
        <MoodProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/onboarding" element={<Onboarding />} />
              <Route path="/journal" element={<Journal />} />
              <Route path="/response" element={<Response />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/video-chat" element={<VideoChat />} />
              <Route path="/chat" element={<TextChat />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </Layout>
        </MoodProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;