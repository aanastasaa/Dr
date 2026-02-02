
import React, { useState, useRef, useEffect } from 'react';

interface WindowProps {
  title: string;
  children: React.ReactNode;
  zIndex: number;
  onClose: () => void;
  onMinimize: () => void;
  onFocus: () => void;
}

export const Window: React.FC<WindowProps> = ({ 
  title, 
  children, 
  zIndex, 
  onClose, 
  onMinimize,
  onFocus 
}) => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [rel, setRel] = useState({ x: 0, y: 0 });
  const windowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Random initial position but centered-ish
    const startX = Math.max(20, (window.innerWidth / 2 - 200) + (Math.random() * 100 - 50));
    const startY = Math.max(60, (window.innerHeight / 2 - 250) + (Math.random() * 100 - 50));
    setPos({ x: startX, y: startY });
  }, []);

  const onMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    onFocus();
    setDragging(true);
    const rect = windowRef.current?.getBoundingClientRect();
    if (rect) {
      setRel({ x: e.pageX - rect.left, y: e.pageY - rect.top });
    }
  };

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (!dragging) return;
      setPos({ x: e.pageX - rel.x, y: e.pageY - rel.y });
    };
    const onMouseUp = () => setDragging(false);

    if (dragging) {
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [dragging, rel]);

  return (
    <div
      ref={windowRef}
      onMouseDown={onFocus}
      style={{
        position: 'absolute',
        left: pos.x,
        top: pos.y,
        zIndex,
        minWidth: '320px',
      }}
      className="win95-border bg-[#c0c0c0] p-[2px] shadow-2xl flex flex-col window-animate"
    >
      {/* Title Bar */}
      <div 
        onMouseDown={onMouseDown}
        className={`h-6 flex items-center justify-between px-1 select-none cursor-default ${dragging ? 'bg-[#000080]' : 'bg-[#000080]'}`}
      >
        <div className="flex items-center gap-1 overflow-hidden">
          <span className="text-white text-[10px] md:text-xs font-bold whitespace-nowrap px-1 uppercase tracking-tight">{title}</span>
        </div>
        <div className="flex gap-1">
          <button 
            onClick={(e) => { e.stopPropagation(); onMinimize(); }}
            className="win95-border win95-button w-4 h-4 bg-[#c0c0c0] text-black font-bold text-[8px] flex items-center justify-center shadow-none"
          >
            _
          </button>
          <button 
            className="win95-border win95-button w-4 h-4 bg-[#c0c0c0] text-black font-bold text-[8px] flex items-center justify-center opacity-50 cursor-not-allowed"
            disabled
          >
            □
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); onClose(); }}
            className="win95-border win95-button w-4 h-4 bg-[#c0c0c0] text-black font-bold text-[10px] flex items-center justify-center"
          >
            X
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="bg-white m-1 p-2 md:p-4 overflow-auto max-h-[75vh] win95-border-inset scrollbar-thin">
        {children}
      </div>
    </div>
  );
};
