
import React, { useState, useEffect } from 'react';

interface BootScreenProps {
  onBootComplete: () => void;
}

export const BootScreen: React.FC<BootScreenProps> = ({ onBootComplete }) => {
  const [lines, setLines] = useState<string[]>([]);
  const [showPressAnyKey, setShowPressAnyKey] = useState(false);

  const bootSequence = [
    "AWARD BIOS v4.51PG, An Energy Star Ally",
    "Copyright (C) 1984-1997, Award Software, Inc.",
    "",
    "PENTIUM-II CPU at 233MHz",
    "Memory Test : 65536K OK",
    "",
    "Detecting Primary Master ... QUANTUM FIREBALL ST3.2A",
    "Detecting Primary Slave  ... NONE",
    "Detecting Secondary Master ... ATAPI CD-ROM DRIVE",
    "Detecting Secondary Slave  ... NONE",
    "",
    "Floppy disk(s) fail (40)",
    "CMOS checksum error - Defaults loaded",
    "",
    "Press F1 to continue, DEL to enter SETUP",
    "Booting from C:...",
    "Starting Windows 95...",
    "",
    "WARNING: SYSTEM IS ABOUT TO GET RADICAL",
    "Initializing EURODANCE.SYS...",
    "Loading NEON_VIBES.DLL...",
    "Ready."
  ];

  useEffect(() => {
    let currentLine = 0;
    const interval = setInterval(() => {
      if (currentLine < bootSequence.length) {
        setLines(prev => [...prev, bootSequence[currentLine]]);
        currentLine++;
      } else {
        clearInterval(interval);
        setShowPressAnyKey(true);
      }
    }, 150);
    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      className="fixed inset-0 bg-black text-gray-300 p-8 bios-font text-xs md:text-sm z-[20000] cursor-pointer overflow-hidden"
      onClick={showPressAnyKey ? onBootComplete : undefined}
    >
      <div className="max-w-3xl mx-auto space-y-1">
        <div className="flex justify-between items-start mb-8">
          <div className="text-white border-2 border-white p-2 text-center leading-tight">
            ENERGY STAR<br/><span className="text-[8px]">EPA POLLUTION PREVENTER</span>
          </div>
          <div className="text-right">
            05/25/98-i440LX-8733-2A69JH2BC-00
          </div>
        </div>
        
        {lines.map((line, i) => (
          <div key={i} className={line?.includes('WARNING') ? 'text-yellow-400 font-bold' : ''}>
            {line}
          </div>
        ))}

        {showPressAnyKey && (
          <div className="mt-12 text-center animate-pulse text-white text-base md:text-xl">
            [ ЩЕЛКНИ, ЧТОБЫ ВОЙТИ В СИСТЕМУ ]
          </div>
        )}
      </div>
    </div>
  );
};
