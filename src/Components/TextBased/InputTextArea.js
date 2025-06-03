import React, { useEffect, useRef } from 'react';
import { useTheme } from '@mui/material/styles';

const InputTextArea = ({ jsonData , setJsonData }) => {
  const textareaRef = useRef(null);
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  useEffect(() => {
    // Function to adjust textarea height
    const adjustTextareaHeight = () => {
      const navbarHeight = 131;
      const availableHeight = window.innerHeight - navbarHeight;
      textareaRef.current.style.height = `${availableHeight}px`;
    };

    // Initial adjustment and event listener for window resize
    adjustTextareaHeight();
    window.addEventListener('resize', adjustTextareaHeight);

    // Cleanup on unmount
    return () => {
      window.removeEventListener('resize', adjustTextareaHeight);
    };
  }, []);

  return (
    <textarea
      ref={textareaRef}
      style={{
        width: '100%',
        backgroundColor: isDark ? '#303030' : '#f7f7f7',
        color: isDark ? 'white' : 'black',
        fontSize: '20px',
        fontFamily: 'monospace',
        resize: 'none',
        whiteSpace: 'nowrap',

      }}
      placeholder="Paste your JSON formatted text here..."
      autoFocus
        
      onChange={(e) => setJsonData(e.target.value)}
      value={jsonData}
    />
  );
};

export default InputTextArea;
