import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const useIsCurrentLocation = (url) => {
  const [isCurrent, setIsCurrent] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === url) {
      setIsCurrent(true);
      return;
    }
    setIsCurrent(false);
  }, [location]);

  return isCurrent;
};

export default useIsCurrentLocation;
