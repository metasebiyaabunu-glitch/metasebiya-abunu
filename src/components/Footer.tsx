import React from 'react';
import { Language } from '../types';
import { HOTEL_INFO } from '../data/hotelData';
import { Phone, Mail, MapPin, Globe, MessageSquare, ShieldCheck, Heart } from 'lucide-react';

interface FooterProps {
  language: Language;
  onOpenBooking: () => void;
  onOpenAiConcierge: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  language,
  onOpenBooking,
  onOpenAiConcierge
}) => {
  const isAm = language === 'am';

  return (
    <footer className="bg-[#2d241e] text-[#e8dcc4] text-xs border-t border-[#5a4634] pt-16 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
        
        {/* Col 1: Brand Info */}
        <div className="lg:col-span-2 flex flex-col items-start gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#c5a059] flex items-center justify-center text-white font-serif font-bold text-xl shadow-md">
              W
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg text-white">
                {isAm ? "ውበቴ ሆቴል አርባ ምንጭ" : "WUBETE HOTEL ARBA MINCH"}
              </h3>
              <p className="text-[10px] tracking-widest text-[#c5a059] uppercase font-bold">
                SHECHA • ARBA MINCH • ETHIOPIA
              </p>
            </div>
          </div>

          <p className="text-[#e8dcc4] text-xs leading-relaxed max-w-md font-medium">
            {isAm
              ? "በሽንጫ አርባ ምንጭ የሚገኝ 5-ኮከብ ደረጃ ያለው ምቹ ሆቴል። በአርባ ምንጮች ደን እና በጫሞ ሐይቅ እይታ ላይ የተገነባ።"
              : "Comfortable lodge in Shecha neighborhood overlooking Forty Springs and Lake Chamo. Dedicated to authentic Ethiopian hospitality, fresh lake dining, and seamless travel packages."}
          </p>

          <div className="flex items-center gap-2 text-[#c5a059] font-semibold">
            <ShieldCheck className="w-4 h-4 text-[#c5a059]" />
            <span>{isAm ? "የኢትዮጵያ ቱሪዝም ሚኒስቴር አጋር" : "Verified Hospitality Partner • Ministry of Tourism"}</span>
          </div>
        </div>

        {/* Col 2: Navigation Links */}
        <div>
          <h4 className="font-serif font-bold text-sm text-white uppercase tracking-widest mb-4">
            {isAm ? "ፈጣን ማውጫ" : "Navigation"}
          </h4>
          <ul className="space-y-2.5 font-medium">
            <li><a href="#rooms" className="hover:text-[#c5a059] transition-colors">{isAm ? "ክፍሎች" : "Luxury Guest Rooms"}</a></li>
            <li><a href="#dining" className="hover:text-[#c5a059] transition-colors">{isAm ? "ምግብ እና ቡና" : "Forty Springs Terrace"}</a></li>
            <li><a href="#tours" className="hover:text-[#c5a059] transition-colors">{isAm ? "የቱር ጉዞዎች" : "Lake Chamo Boat Safari"}</a></li>
            <li><a href="#3d-world" className="hover:text-[#c5a059] transition-colors">{isAm ? "3D አየር እይታ" : "3D Resort Inspector"}</a></li>
            <li><a href="#amenities" className="hover:text-[#c5a059] transition-colors">{isAm ? "አገልግሎቶች" : "Hotel Amenities"}</a></li>
          </ul>
        </div>

        {/* Col 3: Direct Contacts */}
        <div>
          <h4 className="font-serif font-bold text-sm text-white uppercase tracking-widest mb-4">
            {isAm ? "አድራሻ" : "Contact Desk"}
          </h4>
          <ul className="space-y-2.5 font-medium">
            <li className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-[#c5a059] shrink-0" />
              <a href={`tel:${HOTEL_INFO.phone}`} className="hover:text-[#c5a059]">{HOTEL_INFO.phoneDisplay}</a>
            </li>
            <li className="flex items-center gap-2">
              <MessageSquare className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <a href={`https://wa.me/${HOTEL_INFO.whatsapp}`} target="_blank" rel="noreferrer" className="hover:text-emerald-300">WhatsApp Desk</a>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-[#c5a059] shrink-0" />
              <span>{HOTEL_INFO.email}</span>
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-[#c5a059] shrink-0" />
              <span>Shecha (Plus Code: 2G6Q+RQ)</span>
            </li>
          </ul>
        </div>

        {/* Col 4: Ethiopian Payment Methods */}
        <div>
          <h4 className="font-serif font-bold text-sm text-white uppercase tracking-widest mb-4">
            {isAm ? "የክፍያ አማራጮች" : "Accepted Payments"}
          </h4>
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="px-2.5 py-1 rounded bg-[#5a4634] border border-[#8b735b] text-white font-bold text-[11px]">Telebirr</span>
            <span className="px-2.5 py-1 rounded bg-[#5a4634] border border-[#8b735b] text-white font-bold text-[11px]">CBE Birr</span>
            <span className="px-2.5 py-1 rounded bg-[#5a4634] border border-[#8b735b] text-white font-bold text-[11px]">Awash Birr</span>
            <span className="px-2.5 py-1 rounded bg-[#5a4634] border border-[#8b735b] text-white font-bold text-[11px]">Visa / Mastercard</span>
            <span className="px-2.5 py-1 rounded bg-[#5a4634] border border-[#8b735b] text-white font-bold text-[11px]">Cash (ETB/USD)</span>
          </div>

          <button
            onClick={onOpenBooking}
            className="w-full py-2.5 rounded-xl bg-[#c5a059] hover:bg-[#b48e42] text-white font-bold text-xs shadow-md transition-transform active:scale-95 uppercase tracking-widest"
          >
            {isAm ? "ክፍል ይዘዙ (15% ቅናሽ)" : "BOOK DIRECT (SAVE 15%)"}
          </button>
        </div>

      </div>

      {/* Copyright Bar */}
      <div className="max-w-7xl mx-auto pt-8 border-t border-[#5a4634] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#e8dcc4]">
        <p>© {new Date().getFullYear()} Wubete Hotel Arba Minch (wubetehotel.com). All Rights Reserved.</p>
        <p className="flex items-center gap-1">
          <span>Crafted with</span>
          <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
          <span>for Arba Minch, Ethiopia</span>
        </p>
      </div>
    </footer>
  );
};
