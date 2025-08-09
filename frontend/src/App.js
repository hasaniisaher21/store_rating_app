import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import your page components
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import LoginPage from './components/Auth/Login'; // Assuming you rename Login.js to LoginPage.js etc.
import SignupPage from './components/Auth/Signup';
import StoreListPage from './components/Store/StoreListPage';
import AdminDashboard from './components/Admin/AdminDashboard';
import OwnerDashboard from './components/Owner/OwnerDashboard';
import ProtectedRoute from './components/Auth/ProtectedRoute';

function App() {
  return (
    <Router>
      <Navbar />
      <main>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<StoreListPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/stores" element={<StoreListPage />} />

          {/* Protected Routes */}
          <Route 
            path="/admin-dashboard" 
            element={
              <ProtectedRoute allowedRoles={['System Administrator']}>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/owner-dashboard" 
            element={
              <ProtectedRoute allowedRoles={['Store Owner']}>
                <OwnerDashboard />
              </ProtectedRoute>
            } 
          />

          {/* Add other routes here */}
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;