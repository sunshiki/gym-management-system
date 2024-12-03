import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Clients from './pages/Clients';
import AddClient from './pages/AddClient';
import EditClient from './components/EditClient';
import Login from './pages/Login';
import { ClientsProvider } from './context/ClientsContext';

const App: React.FC = () => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  return (
    <ClientsProvider>
      <div className="app-container">
        {isAuthenticated ? (
          <>
            <Header />
            <main className="p-4">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/clients" element={<Clients />} />
                <Route path="/add-client" element={<AddClient />} />
                <Route path="/edit-client/:id" element={<EditClient />} />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </main>
          </>
        ) : (
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        )}
      </div>
    </ClientsProvider>
  );
};

export default App;
