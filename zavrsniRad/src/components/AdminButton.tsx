import { useEffect, useContext, useState, useCallback } from 'react';
import "./AdminButton.css"
import AdminContext from '../context/AdminContext';
import { useLocation } from 'react-router-dom';

const AdminButton = () => {
  const { isAdmin,  toggleUserMode } = useContext(AdminContext);
  const [isDisabled, setIsDisabled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/new-animal") {
      setIsDisabled(true);
    }
  }, [location.pathname])

  const onToggle = useCallback(() => {
    toggleUserMode();
  }, [toggleUserMode])

  return (
    
        
        <button className='admin' onClick={onToggle} disabled={isDisabled}>
            {isAdmin ? 'Admin' : 'Klijent'}
        </button>
       

      
    
  );
};

export default AdminButton;