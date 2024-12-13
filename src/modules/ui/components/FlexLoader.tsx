import React, { useEffect } from 'react';
import { BatteryCharging } from 'lucide-react';

const FlexLoader: React.FC = () => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/70 backdrop-blur-sm">
      <div className="flex flex-col items-center justify-center">
        <div className="relative">
          <BatteryCharging
            className="text-green-600 animate-pulse"
            size={64}
            strokeWidth={2}
          />
          <div className="absolute inset-0 bg-green-500/20 rounded-full animate-ping"></div>
        </div>
        <p className="mt-4 text-gray-600 text-sm">Loading...</p>
      </div>
    </div>
  );
};

export default FlexLoader;
