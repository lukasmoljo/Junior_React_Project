import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import AboutUs from './components/About'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import NewAnimal from './components/NewAnimal';
import List from './components/List';
import Donations from './components/Donations';
import News from './components/News';
import { useState } from 'react';
import AdminContext from './context/AdminContext';

function App() {
  const [isAdmin, setIsAdmin] = useState(false);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <AboutUs/>,
    },
    {
      path: "/about-us",
      element: <AboutUs/>,
    },
    {
      path: isAdmin ? "/new-animal" : "/",
      element: isAdmin ? <NewAnimal/> : <AboutUs/>,
    },
    {
      path: "/donations",
      element: <Donations/>,
    },
    {
      path: "/news",
      element: <News/>,
    },
    {
      path: "/list",
      element: <List/>,
    },
  ]);

  const toggleUserMode = () => {
    setIsAdmin(prev => !prev);
  };

  return (
    <AdminContext.Provider value={{ isAdmin, toggleUserMode}}>
      
  <div className='wrapper'>
     <RouterProvider router={router} />
  </div>
  </AdminContext.Provider>
      
      )
       
  
}

export default App
