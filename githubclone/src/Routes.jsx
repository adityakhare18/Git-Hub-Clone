import React from 'react';
import { useRoutes } from 'react-router-dom';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';

const ProjectRoutes = () => {

  let element = useRoutes([
    {
      path: "/login", 
      element: <Login />
    },
    {
      path: "/signup",
      element: <Signup />
    }
    
  ]);

  return element;
};

export default ProjectRoutes;
