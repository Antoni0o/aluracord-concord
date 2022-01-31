import React from 'react';

export default function useComponentVisibility(isStartVisible) {
  const [ isComponentVisible, setIsComponentVisible ] = React.useState(isStartVisible);
  const ref = React.useRef(null);

  const handleClickOutside = (e) => {
    if(ref.current && !ref.current.contains(e.target)) {
      setIsComponentVisible(false);
    }
  }

  React.useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    }
  });

  return { ref, isComponentVisible, setIsComponentVisible };
}