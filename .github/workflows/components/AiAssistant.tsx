
import React, { useState } from 'react';
import { get90sResponse } from '../services/geminiService';

export const AiAssistant: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{role: 'user' | 'bot', text: string}[]>([
    { role: 'bot', text: 'Йоу! Я твой кибер-помощник из будущего (ну, из 1998-го). Спрашивай что угодно, базар будет коротким!' }
  ]);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    const botResp = await get90sResponse(userMsg);
    setMessages(prev => [...prev, { role: 'bot', text: botResp || '...' }]);
    setLoading(false);
  };

  return (
    <div className="flex flex-col h-[400px] w-[300px]">
      <div className="flex-1 overflow-auto bg-black p-2 space-y-2 win95-border-inset scrollbar-hide">
        {messages.map((m, i) => (
          <div key={i} className={`text-xs ${m.role === 'user' ? 'text-cyan-400' : 'text-lime-400'}`}>
            <span className="font-bold">[{m.role === 'user' ? 'GUEST' : 'BOT90x'}]: </span>
            {m.text}
          </div>
        ))}
        {loading && <div className="text-lime-400 animate-pulse text-[10px]">Processing...</div>}
      </div>
      
      <div className="mt-2 flex gap-1">
        <input 
          className="flex-1 win95-border-inset bg-white p-2 text-xs outline-none text-black font-bold"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Спроси что-нибудь..."
        />
        <button 
          onClick={handleSend}
          className="bg-cyan-400 border-2 border-black px-2 py-1 text-xs font-bold text-black"
        >
          SEND
        </button>
      </div>
    </div>
  );
};
