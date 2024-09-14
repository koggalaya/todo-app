import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Todo from './components/Todo';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';

const AppContent = () => {
  const { user } = useAuth();
  const [showRegister, setShowRegister] = useState(false);

  if (user) {
    return <Todo />;
  }

  return showRegister ? (
    <RegisterForm toggleForm={() => setShowRegister(false)} />
  ) : (
    <LoginForm toggleForm={() => setShowRegister(true)} />
  );
};

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <AppContent />
      </div>
    </AuthProvider>
  );
}

export default App;



