import React, { useState } from 'react';
import { Language, Currency } from '../types';
import { Calendar, Users, Home, Sparkles, ShieldCheck } from 'lucide-react';
import { ROOMS, formatPrice } from '../data/hotelData';

interface BookingBarProps {
  language: Language;
  currency: Currency;
  onSearch: (selectedRoomId: string, checkIn: string, checkOut: string, guests: number) => void;
}

export const BookingBar: React.FC<BookingBarProps> = ({
  language,
  currency,
  onSearch
}) => {
  const isAm = language === 'am';

  // Default dates: tomorrow to +2 days
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];
  const dayAfter = new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0];

  const [checkIn, setCheckIn] = useState(tomorrow);
  const [checkOut, setCheckOut] = useState(dayAfter);
  const [guests, setGuests] = useState(2);
  const [selectedRoomId, setSelectedRoomId] = useState(ROOMS[1].id);

  const activeRoom = ROOMS.find(r => r.id === selectedRoomId) || ROOMS[1];

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(selectedRoomId, checkIn, checkOut, guests);
  };

  return (
    <div className="w-full bg-white border-y border-[#e8dcc4] py-4 px-4 sm:px-6 shadow-[0_10px_30px_rgba(0,0,0,0.04)] relative z-30">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-4">
        
        {/* Urgency & Direct Savings Callout */}
        <div className="flex items-center gap-2 text-xs font-bold text-[#5a4634] w-full lg:w-auto justify-between lg:justify-start">
          <div className="flex items-center gap-1.5 bg-[#faf7f2] border border-[#e8dcc4] px-3.5 py-1.5 rounded-full shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#c5a059]" />
            <span>
              {isAm ? "በቀጥታ በመዘዝ 15% ይቆጥቡ + ነጻ የኤርፖርት ትራንስፖርት" : "Direct Booking Special: Save 15% + Free Airport Shuttle"}
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-1 bg-orange-50 border border-orange-200 text-orange-800 text-[11px] font-bold px-3 py-1 rounded-full">
            <span>🔥 {isAm ? "በእነዚህ ቀናት 2 ክፍሎች ብቻ ቀርተዋል!" : "Only 2 rooms left for selected dates!"}</span>
          </div>
        </div>

        {/* Interactive Search Bar Form */}
        <form onSubmit={handleFormSubmit} className="grid grid-cols-2 sm:grid-cols-4 lg:flex items-center gap-2 sm:gap-3 w-full lg:w-auto">
          
          {/* Room Type Selector */}
          <div className="flex flex-col gap-1 col-span-2 sm:col-span-1">
            <label className="text-[10px] uppercase font-bold text-[#8b735b] tracking-widest flex items-center gap-1">
              <Home className="w-3 h-3 text-[#c5a059]" />
              <span>{isAm ? "የክፍል ዓይነት" : "Room Type"}</span>
            </label>
            <select
              value={selectedRoomId}
              onChange={(e) => setSelectedRoomId(e.target.value)}
              className="bg-[#faf7f2] text-[#2d241e] text-xs font-semibold px-3 py-2 rounded-lg border border-[#e8dcc4] hover:border-[#c5a059] focus:outline-none cursor-pointer"
            >
              {ROOMS.map(room => (
                <option key={room.id} value={room.id}>
                  {isAm ? room.nameAm : room.nameEn} ({formatPrice(room.priceETB, currency)}/night)
                </option>
              ))}
            </select>
          </div>

          {/* Check-in */}
          <div className="flex flex-col gap-1">
            <label className="text-[10px] uppercase font-bold text-[#8b735b] tracking-widest flex items-center gap-1">
              <Calendar className="w-3 h-3 text-[#c5a059]" />
              <span>{isAm ? "መግቢያ ቀን" : "Check-in"}</span>
            </label>
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="bg-[#faf7f2] text-[#2d241e] text-xs font-semibold px-2.5 py-2 rounded-lg border border-[#e8dcc4] hover:border-[#c5a059] focus:outline-none"
            />
          </div>

          {/* Check-out */}
          <div className="flex flex-col gap-1">
            <label className="text-[10px] uppercase font-bold text-[#8b735b] tracking-widest flex items-center gap-1">
              <Calendar className="w-3 h-3 text-[#c5a059]" />
              <span>{isAm ? "መውጫ ቀን" : "Check-out"}</span>
            </label>
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="bg-[#faf7f2] text-[#2d241e] text-xs font-semibold px-2.5 py-2 rounded-lg border border-[#e8dcc4] hover:border-[#c5a059] focus:outline-none"
            />
          </div>

          {/* Guests */}
          <div className="flex flex-col gap-1">
            <label className="text-[10px] uppercase font-bold text-[#8b735b] tracking-widest flex items-center gap-1">
              <Users className="w-3 h-3 text-[#c5a059]" />
              <span>{isAm ? "እንግዶች" : "Guests"}</span>
            </label>
            <select
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
              className="bg-[#faf7f2] text-[#2d241e] text-xs font-semibold px-3 py-2 rounded-lg border border-[#e8dcc4] hover:border-[#c5a059] focus:outline-none cursor-pointer"
            >
              <option value={1}>1 Guest</option>
              <option value={2}>2 Guests</option>
              <option value={3}>3 Guests</option>
              <option value={4}>4+ Family</option>
            </select>
          </div>

          {/* Find Rooms Button */}
          <div className="col-span-2 sm:col-span-4 lg:col-span-1 flex items-end">
            <button
              type="submit"
              className="w-full bg-[#5a4634] hover:bg-[#433324] text-white font-bold text-xs py-2.5 px-6 rounded-lg shadow-md transition-all flex items-center justify-center gap-2 uppercase tracking-widest"
            >
              <ShieldCheck className="w-4 h-4 text-[#c5a059]" />
              <span>{isAm ? "ክፍል ይፈልጉ" : "FIND ROOMS"}</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
