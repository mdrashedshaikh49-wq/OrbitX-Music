
import React, { useState } from 'react';
import LandingPage from './components/LandingPage.tsx';
import Dashboard from './components/Dashboard.tsx';
import AuthModal from './components/AuthModal.tsx';

const App: React.FC = () => {
  const [view, setView] = useState<'landing' | 'dashboard'>('landing');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

  const handleEnterDashboard = () => {
    if (isAuthenticated) {
      setView('dashboard');
    } else {
      setAuthMode('login');
      setIsAuthModalOpen(true);
    }
  };

  const handleStartDistributing = () => {
    if (isAuthenticated) {
      setView('dashboard');
    } else {
      setAuthMode('signup');
      setIsAuthModalOpen(true);
    }
  };

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
    setView('dashboard');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setView('landing');
  };

  return (
    <div className="min-h-screen">
      {view === 'landing' ? (
        <LandingPage 
          onEnterDashboard={handleEnterDashboard} 
          onStartDistributing={handleStartDistributing}
        />
      ) : (
        <Dashboard onBackToLanding={handleLogout} />
      )}

      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={handleAuthSuccess}
        initialMode={authMode}
      />
    </div>
  );
};

export default App;
