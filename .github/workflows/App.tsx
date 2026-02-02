
import React, { useState, useRef, useEffect } from 'react';
import { BootScreen } from './components/BootScreen';
import { InviteContent } from './components/InviteContent';
import { RSVPForm } from './components/RSVPForm';
import { MusicPlayer } from './components/MusicPlayer';
import { AiAssistant } from './components/AiAssistant';
import { GuestList } from './components/GuestList';

// Define Marquee as any to bypass TypeScript intrinsic element check for deprecated tags
const Marquee = 'marquee' as any;

const Sticker: React.FC<{ icon: string; top: string; left: string; rotate: string; delay: string }> = ({ icon, top, left, rotate, delay }) => (
  <div 
    className="fixed text-6xl select-none pointer-events-none opacity-20 floating z-0"
    style={{ top, left, transform: `rotate(${rotate})`, animationDelay: delay }}
  >
    {icon}
  </div>
);

const App: React.FC = () => {
  const [isBooted, setIsBooted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [showAi, setShowAi] = useState(false);
  const [showGuests, setShowGuests] = useState(false);

  // Function to start music when user interacts with the boot screen
  const handleBootComplete = () => {
    setIsBooted(true);
    if (audioRef.current) {
      audioRef.current.play().catch(e => console.log("Autoplay blocked, waiting for more interaction."));
    }
  };

  return (
    <>
      {!isBooted && <BootScreen onBootComplete={handleBootComplete} />}
      
      <div className={`min-h-screen transition-opacity duration-1000 ${isBooted ? 'opacity-100' : 'opacity-0'}`}>
        <audio ref={audioRef} loop src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" />
        
        {/* Background Decorations */}
        <Sticker icon="📼" top="10%" left="5%" rotate="-15deg" delay="0s" />
        <Sticker icon="🕹️" top="40%" left="85%" rotate="20deg" delay="1s" />
        <Sticker icon="🥤" top="70%" left="10%" rotate="10deg" delay="0.5s" />
        <Sticker icon="🍬" top="85%" left="75%" rotate="-10deg" delay="2s" />
        <Sticker icon="👾" top="20%" left="80%" rotate="45deg" delay="1.5s" />

        <div className="max-w-4xl mx-auto px-4 py-20 relative z-10 space-y-24">
          
          {/* Hero Section */}
          <header className="text-center space-y-6">
            <div className="inline-block bg-yellow-400 text-black px-6 py-2 -rotate-2 radical-border">
              <span className="heavy-font text-xl md:text-2xl">TOP SECRET! ОПАСНО!</span>
            </div>
            <h1 className="heavy-font text-5xl md:text-8xl vhs-glitch leading-none uppercase">
              Ретро <br/> <span className="text-pink-500">Party</span>
            </h1>
            <div className="flex justify-center gap-4">
               <p className="marker-font text-2xl md:text-4xl text-cyan-300">В честь 27-летия!</p>
               <button 
                 onClick={() => setShowGuests(!showGuests)}
                 className="bg-white text-black px-2 py-1 radical-border text-[10px] heavy-font hover:bg-neon-yellow"
               >
                 КТО ИДЕТ?
               </button>
            </div>
          </header>

          {showGuests && (
            <section className="bg-white text-black p-4 radical-border animate-bounce-short">
              <div className="flex justify-between items-center mb-4 border-b-4 border-black pb-2">
                <h2 className="heavy-font text-xl uppercase">СПИСОК КРАСАВЧИКОВ</h2>
                <button onClick={() => setShowGuests(false)} className="bg-black text-white px-2 py-1 heavy-font text-xs">X</button>
              </div>
              <GuestList />
            </section>
          )}

          {/* Invitation Card */}
          <section className="relative group">
            <div className="absolute inset-0 bg-cyan-400 rotate-2 radical-border opacity-50"></div>
            <div className="relative bg-white text-black p-8 md:p-12 radical-border -rotate-1 group-hover:rotate-0 transition-transform duration-500">
              <InviteContent />
            </div>
          </section>

          {/* RSVP and Interactive Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <section className="bg-yellow-400 text-black p-8 radical-border rotate-2">
              <h2 className="heavy-font text-2xl mb-6 underline">КТО В ТЕМЕ?</h2>
              <RSVPForm />
            </section>
            
            <section className="space-y-12">
              <div className="bg-pink-600 p-2 radical-border -rotate-3">
                 <MusicPlayer />
              </div>
              
              <div className="text-center">
                <button 
                  onClick={() => setShowAi(!showAi)}
                  className="bg-cyan-400 text-black p-4 radical-border heavy-font hover:scale-110 transition-transform"
                >
                  {showAi ? 'ЗАКРЫТЬ ЧАТ' : 'КИБЕР-ПОМОЩНИК'}
                </button>
              </div>
            </section>
          </div>

          {showAi && (
            <div className="fixed bottom-24 right-4 md:right-10 z-[100] scale-90 md:scale-100">
               <div className="bg-black p-2 radical-border relative">
                  <button 
                    onClick={() => setShowAi(false)}
                    className="absolute -top-4 -left-4 bg-red-600 text-white w-8 h-8 radical-border flex items-center justify-center heavy-font z-[110]"
                  >
                    X
                  </button>
                  <AiAssistant />
               </div>
            </div>
          )}
        </div>

        {/* Footer Marquee */}
        <footer className="fixed bottom-0 left-0 w-full bg-black border-t-4 border-yellow-400 py-2 z-50">
          <Marquee scrollamount="12" className="pixel-font text-xl text-yellow-400">
            !!! ПРИНОСИТЬ С СОБОЙ: ТУРБО, ЛАВ ИС, ХОРОШЕЕ НАСТРОЕНИЕ, КАССЕТЫ С РУКИ ВВЕРХ !!! ДРЕСС-КОД: ВАРЕНКИ И КИСЛОТНЫЕ ЦВЕТА !!!
          </Marquee>
        </footer>
      </div>
    </>
  );
};

export default App;
