import { useState, useEffect, useRef } from 'react';

export default function useComponentVisibility(isStartVisible) {
  const [ isComponentVisible, setIsComponentVisible ] = useState(isStartVisible);
  const ref = useRef(null);

  const handleClickOutside = (e) => {
    if(ref.current && !ref.current.contains(e.target)) {
      setIsComponentVisible(false);
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    }
  });

  return { ref, isComponentVisible, setIsComponentVisible };
}