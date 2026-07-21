import React, { useState } from 'react';
import { Language, Currency, Room } from '../types';
import { ROOMS, formatPrice } from '../data/hotelData';
import { Sparkles, Users, Maximize, BedDouble, ShieldCheck, Check, ArrowRight } from 'lucide-react';

interface RoomsSectionProps {
  language: Language;
  currency: Currency;
  onSelectRoom: (room: Room) => void;
  onInspectRoom3D: (room: Room) => void;
}

export const RoomsSection: React.FC<RoomsSectionProps> = ({
  language,
  currency,
  onSelectRoom,
  onInspectRoom3D
}) => {
  const isAm = language === 'am';
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'suite' | 'villa'>('all');

  const filteredRooms = ROOMS.filter(r => {
    if (selectedFilter === 'suite') return r.modelType === 'suite' || r.modelType === 'deluxe';
    if (selectedFilter === 'villa') return r.modelType === 'villa';
    return true;
  });

  return (
    <section id="rooms" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#fdfaf6] text-[#2d241e] relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-[#e8dcc4] pb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#faf7f2] border border-[#e8dcc4] text-[#c5a059] text-xs font-bold uppercase tracking-widest mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isAm ? "5-ኮከብ የመኝታ ክፍሎች" : "Luxury Accommodation & Suites"}</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#5a4634]">
              {isAm ? "ልዩ የውበቴ ሆቴል ክፍሎች" : "Rooms & Suites Overlooking Lake Chamo"}
            </h2>
            <p className="text-[#8b735b] text-sm mt-2 max-w-2xl font-medium">
              {isAm
                ? "እያንዳንዱ ክፍል የግል ባልኮኒ፣ የኢንተርኔት አገልግሎት፣ የነጻ ቁርስ እና የኤርፖርት መኪናን ያካትታል።"
                : "Every room features a private panoramic balcony, rainfall shower, 24/7 high speed Wi-Fi, free breakfast, and complimentary airport shuttle."}
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-2 bg-[#faf7f2] p-1.5 rounded-xl border border-[#e8dcc4] self-start shadow-xs">
            <button
              onClick={() => setSelectedFilter('all')}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-widest rounded-lg transition-all ${
                selectedFilter === 'all'
                  ? 'bg-[#5a4634] text-white shadow-xs'
                  : 'text-[#8b735b] hover:text-[#5a4634]'
              }`}
            >
              {isAm ? "ሁሉም ክፍሎች" : "All Rooms"}
            </button>
            <button
              onClick={() => setSelectedFilter('suite')}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-widest rounded-lg transition-all ${
                selectedFilter === 'suite'
                  ? 'bg-[#5a4634] text-white shadow-xs'
                  : 'text-[#8b735b] hover:text-[#5a4634]'
              }`}
            >
              {isAm ? "ስዊቶች" : "Luxury Suites"}
            </button>
            <button
              onClick={() => setSelectedFilter('villa')}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-widest rounded-lg transition-all ${
                selectedFilter === 'villa'
                  ? 'bg-[#5a4634] text-white shadow-xs'
                  : 'text-[#8b735b] hover:text-[#5a4634]'
              }`}
            >
              {isAm ? "ሮያል ቪላ" : "Royal Villa"}
            </button>
          </div>
        </div>

        {/* Room Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredRooms.map((room) => (
            <div
              key={room.id}
              className="bg-white border border-[#e8dcc4] hover:border-[#c5a059] rounded-2xl overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(90,40,0,0.1)] transition-all duration-300 flex flex-col group"
            >
              {/* Room Image Container */}
              <div className="relative h-64 sm:h-72 overflow-hidden">
                <img
                  src={room.image}
                  alt={isAm ? room.nameAm : room.nameEn}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />

                {/* Popular Badge */}
                {room.isPopular && (
                  <div className="absolute top-4 left-4 bg-[#c5a059] text-white font-bold text-[11px] px-3.5 py-1 rounded-full uppercase tracking-widest shadow-md">
                    ⭐ {isAm ? "በብዛት የተመረጠ" : "Most Popular"}
                  </div>
                )}

                {/* Scarcity Badge */}
                <div className="absolute top-4 right-4 bg-orange-50/95 backdrop-blur-md border border-orange-200 text-orange-800 font-bold text-xs px-3 py-1 rounded-full shadow-xs">
                  🔥 {room.roomsLeft} {isAm ? "ክፍሎች ብቻ ቀርተዋል" : "left for these dates!"}
                </div>

                {/* Price Tag Overlay */}
                <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md border border-[#e8dcc4] px-4 py-2 rounded-xl shadow-md">
                  <span className="text-[#5a4634] font-serif font-bold text-xl sm:text-2xl">
                    {formatPrice(room.priceETB, currency)}
                  </span>
                  <span className="text-[#8b735b] text-xs font-medium"> / {isAm ? "ለአንድ ሌሊት" : "night"}</span>
                </div>

                {/* 3D Room Inspector Trigger Button */}
                <button
                  onClick={() => onInspectRoom3D(room)}
                  className="absolute bottom-4 right-4 bg-[#5a4634]/90 hover:bg-[#5a4634] text-white font-bold text-xs px-3.5 py-2 rounded-xl flex items-center gap-1.5 shadow-md transition-transform active:scale-95"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#c5a059]" />
                  <span>3D Room Tour</span>
                </button>
              </div>

              {/* Room Info Content */}
              <div className="p-6 flex flex-col flex-1 justify-between gap-6">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h3 className="font-serif font-bold text-xl sm:text-2xl text-[#5a4634]">
                      {isAm ? room.nameAm : room.nameEn}
                    </h3>
                  </div>
                  <p className="text-[#8b735b] text-xs sm:text-sm font-medium">
                    {isAm ? room.taglineAm : room.taglineEn}
                  </p>

                  {/* Room Key Specifications */}
                  <div className="grid grid-cols-3 gap-2 my-4 p-3 rounded-xl bg-[#faf7f2] border border-[#e8dcc4] text-xs text-[#5a4634] font-semibold">
                    <div className="flex items-center gap-1.5">
                      <Maximize className="w-3.5 h-3.5 text-[#c5a059]" />
                      <span>{room.sizeSqM} m²</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-[#c5a059]" />
                      <span>{room.capacity}</span>
                    </div>
                    <div className="flex items-center gap-1.5 col-span-1 truncate">
                      <BedDouble className="w-3.5 h-3.5 text-[#c5a059]" />
                      <span className="truncate">{isAm ? room.bedTypeAm : room.bedTypeEn}</span>
                    </div>
                  </div>

                  {/* Features Bullet List */}
                  <ul className="space-y-2 mb-4">
                    {(isAm ? room.featuresAm : room.featuresEn).map((feat, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-xs text-[#5a4634] font-medium">
                        <Check className="w-3.5 h-3.5 text-[#c5a059] shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Booking CTA Button */}
                <div className="flex items-center justify-between gap-4 pt-4 border-t border-[#e8dcc4]">
                  <div className="text-[11px] text-emerald-700 font-bold flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{isAm ? "ነጻ ስረዛ እና በሆቴሉ መክፈል ይቻላል" : "Free Cancellation • Pay at Hotel Available"}</span>
                  </div>

                  <button
                    onClick={() => onSelectRoom(room)}
                    className="bg-[#5a4634] hover:bg-[#433324] text-white font-bold text-xs uppercase tracking-widest px-5 py-3 rounded-xl shadow-md transition-all flex items-center gap-1.5 shrink-0"
                  >
                    <span>{isAm ? "ክፍሉን ያዝ" : "BOOK ROOM"}</span>
                    <ArrowRight className="w-4 h-4 text-[#c5a059]" />
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
