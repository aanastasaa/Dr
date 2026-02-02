
import React from 'react';

export const InviteContent: React.FC = () => {
  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row gap-8 items-center">
        <div className="w-full md:w-1/2 relative">
          <img 
            src="https://images.unsplash.com/photo-1541535650810-10d26f5c2abb?auto=format&fit=crop&q=80&w=400" 
            alt="90s style" 
            className="w-full border-4 border-black shadow-[8px_8px_0_rgba(0,0,0,1)] hover:scale-105 transition-transform"
          />
          <div className="absolute -bottom-4 -right-4 bg-pink-500 text-white p-2 heavy-font text-xs md:text-sm shadow-lg">
            REAL 90s VIBE
          </div>
        </div>
        <div className="w-full md:w-1/2 space-y-4">
          <h3 className="marker-font text-4xl text-pink-600 underline">Йоу, Народ!</h3>
          <p className="text-lg leading-tight font-bold italic">
            Это не просто праздник, это реальный камбэк! Мы залетаем в 90-е на полной скорости. 
            Никаких соцсетей, только живое общение, денди и отрыв!
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t-4 border-black pt-8">
        <div className="space-y-4">
          <div className="bg-yellow-300 p-4 border-2 border-black">
            <h4 className="heavy-font text-sm mb-2 underline">ГДЕ СОБИРАЕМСЯ:</h4>
            <p className="pixel-font text-2xl leading-none">
              рп Боброво<br/>
              ул. Лесная, д. 12, кв. 592
            </p>
          </div>
          <div className="bg-cyan-300 p-4 border-2 border-black">
            <h4 className="heavy-font text-sm mb-2 underline">КОГДА ЖДАТЬ:</h4>
            <p className="pixel-font text-2xl leading-none">
              2 МАРТА<br/>
              СТАРТ В 19:00
            </p>
          </div>
        </div>

        <div className="bg-pink-100 p-4 border-2 border-black rotate-1">
          <h4 className="heavy-font text-sm mb-4 border-b-2 border-black">ДРЕСС-КОД (ОБЯЗАТЕЛЬНО!):</h4>
          <ul className="marker-font text-xl space-y-1 list-none">
            <li>✨ Олимпосы Adidas</li>
            <li>✨ Варенки / Клёш</li>
            <li>✨ Цепи как у Гангстеров</li>
            <li>✨ Лосины и Начёсы</li>
            <li>✨ Очки Oakley</li>
          </ul>
        </div>
      </div>

      <div className="text-center py-4">
        <div className="inline-block bg-black text-white px-8 py-4 -rotate-1 shadow-[8px_8px_0_#ff00ff]">
          <p className="heavy-font text-xl">БЕРИ С СОБОЙ ТАМАГОЧИ!</p>
        </div>
      </div>
    </div>
  );
};
