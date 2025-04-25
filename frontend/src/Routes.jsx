import React from 'react';
import { useRoutes, Navigate } from 'react-router-dom';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Home from './components/Home';
import Dashboard from './components/dashboard/Dashboard';
import NewRepository from './components/repository/NewRepository';
import RepositoryView from './components/repository/RepositoryView';
import FilesPage from './components/files/FilesPage';
import { useAuth } from './authContext';

const ProjectRoutes = () => {
  const { currentUser } = useAuth();

  // Protected route component
  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  let element = useRoutes([
    {
      path: "/",
      element: <Home />
    },
    {
      path: "/login",
      element: currentUser ? <Navigate to="/dashboard" /> : <Login />
    },
    {
      path: "/signup",
      element: currentUser ? <Navigate to="/dashboard" /> : <Signup />
    },
    {
      path: "/dashboard",
      element: (
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      )
    },
    {
      path: "/new",
      element: (
        <ProtectedRoute>
          <NewRepository />
        </ProtectedRoute>
      )
    },
    {
      path: "/repo/:repoName",
      element: <RepositoryView />
    },
    {
      path: "/files",
      element: (
        <ProtectedRoute>
          <FilesPage />
        </ProtectedRoute>
      )
    },
    {
      path: "*",
      element: <Navigate to="/" />
    }
  ]);

  return element;
};

export default ProjectRoutes;
