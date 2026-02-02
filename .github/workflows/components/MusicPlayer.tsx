
import React, { useState, useEffect, useRef } from 'react';

export const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [trackIndex, setTrackIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playlist = [
    { title: 'WHAT IS LOVE', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
    { title: 'RUSSIAN LULLABY', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' },
    { title: 'HAPPY NATION', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' }
  ];

  useEffect(() => {
    audioRef.current = document.querySelector('audio');
    if (audioRef.current) {
      setIsPlaying(!audioRef.current.paused);
    }
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;
    isPlaying ? audioRef.current.pause() : audioRef.current.play();
    setIsPlaying(!isPlaying);
  };

  const nextTrack = () => {
    const next = (trackIndex + 1) % playlist.length;
    setTrackIndex(next);
    if (audioRef.current) {
      audioRef.current.src = playlist[next].url;
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <div className="bg-white p-4 border-2 border-black shadow-[4px_4px_0_#000]">
      <div className="bg-pink-900 border-4 border-black p-4 space-y-4 rounded-xl relative overflow-hidden">
        {/* Transparent Window effect */}
        <div className="absolute inset-0 bg-white/10 pointer-events-none"></div>
        
        <div className="flex justify-between items-center text-cyan-400 pixel-font text-lg">
          <span className="animate-pulse">SIDE A</span>
          <span className="text-xs">DOLBY SYSTEM</span>
        </div>

        <div className="h-24 bg-black/40 rounded flex items-center justify-center relative overflow-hidden border-2 border-black">
          <div className="flex gap-4">
             <div className={`w-12 h-12 border-4 border-gray-600 rounded-full flex items-center justify-center ${isPlaying ? 'animate-spin' : ''}`}>
                <div className="w-2 h-2 bg-gray-600"></div>
             </div>
             <div className={`w-12 h-12 border-4 border-gray-600 rounded-full flex items-center justify-center ${isPlaying ? 'animate-spin' : ''}`}>
                <div className="w-2 h-2 bg-gray-600"></div>
             </div>
          </div>
        </div>

        <div className="bg-yellow-400 text-black p-1 text-center font-bold text-[10px] truncate uppercase border-2 border-black">
           {playlist[trackIndex].title}
        </div>

        <div className="flex justify-center gap-2">
          <button onClick={togglePlay} className="bg-cyan-400 p-2 border-2 border-black text-xl hover:scale-110 active:translate-y-1">
            {isPlaying ? '⏸️' : '▶️'}
          </button>
          <button onClick={nextTrack} className="bg-cyan-400 p-2 border-2 border-black text-xl hover:scale-110 active:translate-y-1">
            ⏭️
          </button>
        </div>
      </div>
      <p className="text-[10px] text-center mt-2 font-bold uppercase italic">Super Dynamic High Bias II</p>
    </div>
  );
};
