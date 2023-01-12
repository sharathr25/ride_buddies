import { useState, useEffect } from 'react';
import { getCurrentUser, subribeToAuthChange } from '../api/auth';

const useAuth = () => {
  const [user, setUser] = useState(getCurrentUser());

  function onAuthStateChanged (user) {
    setUser(user);
  }

  useEffect(() => {
    const subscriber = subribeToAuthChange(onAuthStateChanged);
    return subscriber;
  }, []);

  return { user };
};

export default useAuth;
