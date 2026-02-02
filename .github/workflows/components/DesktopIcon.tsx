
import React from 'react';

interface DesktopIconProps {
  title: string;
  icon: string;
  onDoubleClick: () => void;
}

export const DesktopIcon: React.FC<DesktopIconProps> = ({ title, icon, onDoubleClick }) => {
  return (
    <div 
      className="flex flex-col items-center justify-center w-20 group cursor-pointer"
      onDoubleClick={onDoubleClick}
    >
      <div className="text-4xl mb-1 group-hover:opacity-80 transition-opacity">
        {icon}
      </div>
      <span className="text-white text-[10px] bg-blue-900 group-hover:bg-blue-700 px-1 text-center leading-tight">
        {title}
      </span>
    </div>
  );
};
