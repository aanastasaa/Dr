
import React, { useState, useEffect } from 'react';
import { WindowState } from '../types';

interface TaskbarProps {
  windows: WindowState[];
  onWindowClick: (id: string) => void;
}

export const Taskbar: React.FC<TaskbarProps> = ({ windows, onWindowClick }) => {
  const [time, setTime] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed bottom-0 left-0 w-full h-10 bg-[#c0c0c0] border-t-2 border-white flex items-center px-1 gap-2 z-[999]">
      <button className="win95-border win95-button px-2 py-1 flex items-center gap-1 font-bold italic h-8">
        <span className="text-lg">🪟</span> Start
      </button>
      
      <div className="h-full w-px bg-gray-500 mx-1" />

      <div className="flex-1 flex gap-1 overflow-x-auto">
        {windows.map(w => (
          w.isOpen && (
            <button
              key={w.id}
              onClick={() => onWindowClick(w.id)}
              className={`win95-border px-2 h-8 text-xs flex items-center gap-2 max-w-[120px] truncate ${w.isMinimized ? 'bg-[#c0c0c0]' : 'bg-[#e0e0e0]'}`}
            >
              <span>{w.icon}</span>
              <span className="truncate">{w.title}</span>
            </button>
          )
        ))}
      </div>

      <div className="win95-border-inset px-3 py-1 bg-[#c0c0c0] text-xs flex items-center gap-2 min-w-[80px]">
        <span>🔊</span>
        <span>{time}</span>
      </div>
    </div>
  );
};
