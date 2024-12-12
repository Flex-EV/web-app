import React, { useEffect } from 'react';

const FlexLoader: React.FC = () => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-b-4 border-green-500 border-t-transparent" />
    </div>
  );
};

export default FlexLoader;
