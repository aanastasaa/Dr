
import React, { useState } from 'react';

export const RSVPForm: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [song, setSong] = useState('');
  const [status, setStatus] = useState('yes');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Save to "database" (localStorage)
    const existingGuests = JSON.parse(localStorage.getItem('party_guests') || '[]');
    const newGuest = {
      name,
      status: status === 'yes' ? 'Буду!' : 'Пропущу...',
      song,
      date: new Date().toLocaleDateString()
    };
    localStorage.setItem('party_guests', JSON.stringify([...existingGuests, newGuest]));
    
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="text-center p-4 space-y-4 bg-white border-4 border-black shadow-[8px_8px_0_#000]">
        <div className="text-6xl animate-bounce">🤟</div>
        <p className="heavy-font text-xl text-pink-600">КРАСАВА, {name.toUpperCase()}!</p>
        <p className="marker-font text-xl">Данные ушли в базу данных на дискете 3.5. Ждем тебя!</p>
        <button 
          onClick={() => {
            setSubmitted(false);
            setName('');
            setSong('');
          }}
          className="bg-cyan-400 border-2 border-black px-6 py-2 heavy-font text-xs"
        >
          ЕЩЕ РАЗ?
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label className="block heavy-font text-xs uppercase underline">Позывной:</label>
        <input 
          type="text" 
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border-4 border-black p-3 bg-white outline-none focus:bg-cyan-50 text-xl font-bold text-black"
          placeholder="Твоё имя / ник"
        />
      </div>

      <div className="space-y-2">
        <label className="block heavy-font text-xs uppercase underline">Статус участия:</label>
        <div className="space-y-2 font-bold text-lg text-black">
          <label className="flex items-center gap-3 cursor-pointer group">
            <input 
              type="radio" 
              name="attending" 
              value="yes"
              checked={status === 'yes'}
              onChange={() => setStatus('yes')}
              className="w-6 h-6 accent-pink-600" 
            />
            <span className="group-hover:text-pink-600 transition-colors">Я БУДУ! (ОДНОЗНАЧНО)</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer group">
            <input 
              type="radio" 
              name="attending" 
              value="no"
              checked={status === 'no'}
              onChange={() => setStatus('no')}
              className="w-6 h-6 accent-pink-600" 
            />
            <span className="group-hover:text-pink-600 transition-colors">Я СЛАБАК (НЕ БУДУ)</span>
          </label>
        </div>
      </div>

      <div className="space-y-2">
        <label className="block heavy-font text-xs uppercase underline">Что закажем Диджею?</label>
        <input 
          type="text" 
          value={song}
          onChange={(e) => setSong(e.target.value)}
          className="w-full border-4 border-black p-3 bg-white outline-none focus:bg-cyan-50 text-lg text-black"
          placeholder="Напр. Сектор Газа"
        />
      </div>

      <button 
        type="submit"
        className="w-full bg-pink-600 text-white p-4 border-4 border-black heavy-font text-xl shadow-[8px_8px_0_#000] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
      >
        ЗАПИСАТЬСЯ!
      </button>
    </form>
  );
};
