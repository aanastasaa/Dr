
import React, { useEffect, useState } from 'react';

interface Guest {
  name: string;
  status: string;
  song: string;
  date: string;
}

export const GuestList: React.FC = () => {
  const [guests, setGuests] = useState<Guest[]>([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('party_guests') || '[]');
    setGuests(data);
  }, []);

  if (guests.length === 0) {
    return (
      <div className="text-center py-8 italic text-gray-500">
        Пока никого нет... Будь первым, кто впишется в историю!
      </div>
    );
  }

  return (
    <div className="max-h-[300px] overflow-auto">
      <table className="w-full text-left text-xs md:text-sm">
        <thead className="bg-black text-white heavy-font text-[10px]">
          <tr>
            <th className="p-2 border border-black">НИКНЕЙМ</th>
            <th className="p-2 border border-black">СТАТУС</th>
            <th className="p-2 border border-black hidden md:table-cell">ЗАКАЗ ПЕСНИ</th>
          </tr>
        </thead>
        <tbody className="pixel-font text-lg">
          {guests.map((g, i) => (
            <tr key={i} className={i % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
              <td className="p-2 border border-black font-bold uppercase">{g.name}</td>
              <td className={`p-2 border border-black ${g.status.includes('Буду') ? 'text-green-600' : 'text-red-600'}`}>{g.status}</td>
              <td className="p-2 border border-black hidden md:table-cell italic">{g.song || '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 text-right">
        <button 
          onClick={() => {
            if(confirm('РЕАЛЬНО СТЕРЕТЬ ВСЕХ?')) {
              localStorage.removeItem('party_guests');
              setGuests([]);
            }
          }}
          className="text-[8px] text-gray-400 hover:text-red-600 underline uppercase"
        >
          Форматировать диск (Очистить)
        </button>
      </div>
    </div>
  );
};
