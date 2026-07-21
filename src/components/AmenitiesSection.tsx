import React from 'react';
import { Language } from '../types';
import { AMENITIES_LIST, HOTEL_INFO } from '../data/hotelData';
import { Sparkles, Wifi, Bus, Coffee, Utensils, Waves, Zap, Compass, ShieldCheck, MapPin, CheckCircle2 } from 'lucide-react';

interface AmenitiesSectionProps {
  language: Language;
}

export const AmenitiesSection: React.FC<AmenitiesSectionProps> = ({ language }) => {
  const isAm = language === 'am';

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Wifi': return <Wifi className="w-6 h-6 text-[#c5a059]" />;
      case 'Bus': return <Bus className="w-6 h-6 text-[#c5a059]" />;
      case 'Coffee': return <Coffee className="w-6 h-6 text-[#c5a059]" />;
      case 'Utensils': return <Utensils className="w-6 h-6 text-[#c5a059]" />;
      case 'Waves': return <Waves className="w-6 h-6 text-[#c5a059]" />;
      case 'Zap': return <Zap className="w-6 h-6 text-[#c5a059]" />;
      case 'Compass': return <Compass className="w-6 h-6 text-[#c5a059]" />;
      default: return <ShieldCheck className="w-6 h-6 text-[#c5a059]" />;
    }
  };

  return (
    <section id="amenities" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#fdfaf6] text-[#2d241e] border-t border-[#e8dcc4]">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#e8dcc4] text-[#c5a059] text-xs font-bold uppercase tracking-widest mb-3 shadow-xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isAm ? "የውበቴ ሆቴል አገልግሎቶች" : "World-Class Amenities & Hospitality"}</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#5a4634] mb-4">
            {isAm ? "በአርባ ምንጭ ሽንጫ ምቹ እና አስተማማኝ ቆይታ" : "Everything You Need for a Seamless Arba Minch Stay"}
          </h2>
          <p className="text-[#8b735b] text-sm sm:text-base font-medium">
            {isAm
              ? "የ24 ሰዓት ኤሌክትሪክ ጀነሬተር፣ ፈጣን ዋይፋይ፣ ነጻ የኤርፖርት ትራንስፖርት እና የ24 ሰዓት ጥበቃ ያካትታል።"
              : "Located in Shecha neighborhood with uninterrupted power backup generators, high speed fiber Wi-Fi, and personalized concierge services."}
          </p>
        </div>

        {/* Grid of Amenities */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {AMENITIES_LIST.map((item, idx) => (
            <div
              key={idx}
              className="bg-white border border-[#e8dcc4] hover:border-[#c5a059] p-6 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.03)] transition-all hover:-translate-y-1 group"
            >
              <div className="w-12 h-12 rounded-xl bg-[#faf7f2] border border-[#e8dcc4] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                {getIcon(item.icon)}
              </div>
              <h3 className="font-serif font-bold text-lg text-[#5a4634] mb-1">
                {isAm ? item.nameAm : item.nameEn}
              </h3>
              <p className="text-[#8b735b] text-xs leading-relaxed font-medium">
                {isAm ? item.descAm : item.descEn}
              </p>
            </div>
          ))}
        </div>

        {/* Neighborhood Highlight Banner */}
        <div className="mt-12 p-6 rounded-2xl bg-white border border-[#e8dcc4] shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#faf7f2] border border-[#e8dcc4] flex items-center justify-center text-[#c5a059] shrink-0">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-lg text-[#5a4634]">
                {isAm ? "የሽንጫ ሰፈር ምርጥ አቀማመጥ" : "Located in Prime Shecha Neighborhood"}
              </h4>
              <p className="text-[#8b735b] text-xs mt-0.5 font-medium">
                {HOTEL_INFO.neighborhood} • {isAm ? "2G6Q+RQ አርባ ምንጭ" : "Plus Code: 2G6Q+RQ Arba Minch"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-[#5a4634] font-bold bg-[#faf7f2] px-4 py-2.5 rounded-xl border border-[#e8dcc4]">
            <CheckCircle2 className="w-4 h-4 text-[#c5a059]" />
            <span>{isAm ? "ከኤርፖርት በ15 ደቂቃ ትራንስፖርት" : "15 mins from Arba Minch Airport (AMH)"}</span>
          </div>
        </div>

      </div>
    </section>
  );
};
