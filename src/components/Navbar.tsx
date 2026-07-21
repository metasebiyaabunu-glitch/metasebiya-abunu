import React, { useState } from 'react';
import { Currency, Language } from '../types';
import { Phone, MessageSquare, Globe, Sparkles, Menu, X, ShieldCheck } from 'lucide-react';
import { HOTEL_INFO } from '../data/hotelData';

interface NavbarProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  currency: Currency;
  onCurrencyChange: (curr: Currency) => void;
  onOpenBooking: () => void;
  onOpenAiConcierge: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  language,
  onLanguageChange,
  currency,
  onCurrencyChange,
  onOpenBooking,
  onOpenAiConcierge
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isAm = language === 'am';

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#e8dcc4] text-[#2d241e] shadow-sm">
      {/* Top Utility Announcement Bar */}
      <div className="bg-[#5a4634] px-4 py-1.5 text-xs text-[#f2ede4] flex flex-wrap items-center justify-between gap-2 border-b border-[#c5a059]/30">
        <div className="flex items-center gap-4 max-w-7xl mx-auto w-full justify-between">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 font-medium text-[#f2ede4]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#c5a059]" />
              {isAm ? "በኢትዮጵያ ቱሪዝም ሚኒስቴር የተመዘገበ 5-ኮከብ ሪዞርት" : "Verified 5-Star Lodge • Ethiopian Ministry of Tourism Partner"}
            </span>
            <span className="hidden md:inline text-[#c5a059]">•</span>
            <span className="hidden md:inline text-[#f2ede4]">
              {isAm ? "ነጻ የኤርፖርት ትራንስፖርት ተካቷል" : "Free Airport Pickup & High-Speed Wi-Fi Included"}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={`tel:${HOTEL_INFO.phone}`}
              className="flex items-center gap-1 text-[#f2ede4] hover:text-white transition-colors"
            >
              <Phone className="w-3 h-3 text-[#c5a059]" />
              <span>{HOTEL_INFO.phoneDisplay}</span>
            </a>
            <a
              href={`https://wa.me/${HOTEL_INFO.whatsapp}?text=Hello%20Wubete%20Hotel%20Arba%20Minch`}
              target="_blank"
              rel="noreferrer"
              className="hidden sm:flex items-center gap-1 text-emerald-300 hover:text-emerald-200 transition-colors"
            >
              <MessageSquare className="w-3 h-3" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-[#5a4634] text-[#c5a059] flex items-center justify-center font-serif font-black text-xl shadow-md group-hover:scale-105 transition-transform">
            W
          </div>
          <div>
            <h1 className="font-serif font-bold text-lg sm:text-xl text-[#5a4634] leading-tight tracking-tight group-hover:text-[#c5a059] transition-colors">
              WUBETE<span className="text-[#c5a059]">HOTEL</span>
            </h1>
            <p className="text-[10px] tracking-widest text-[#8b735b] uppercase font-bold">
              ARBA MINCH • ETHIOPIA
            </p>
          </div>
        </a>

        {/* Desktop Links */}
        <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold uppercase tracking-widest text-[#8b735b]">
          <a href="#rooms" className="hover:text-[#5a4634] transition-colors">
            {isAm ? "ክፍሎች" : "Rooms"}
          </a>
          <a href="#dining" className="hover:text-[#5a4634] transition-colors">
            {isAm ? "ምግብ እና ቡና" : "Dining"}
          </a>
          <a href="#tours" className="hover:text-[#5a4634] transition-colors">
            {isAm ? "የቱር ጉዞዎች" : "Tours"}
          </a>
          <a href="#3d-world" className="hover:text-[#5a4634] transition-colors flex items-center gap-1 text-[#c5a059] font-bold">
            <Sparkles className="w-3.5 h-3.5 text-[#c5a059]" />
            <span>{isAm ? "3D አየር እይታ" : "3D World"}</span>
          </a>
          <a href="#amenities" className="hover:text-[#5a4634] transition-colors">
            {isAm ? "አገልግሎቶች" : "Amenities"}
          </a>
          <a href="#reviews" className="hover:text-[#5a4634] transition-colors">
            {isAm ? "ግምገማዎች" : "Reviews"}
          </a>
          <a href="#contact" className="hover:text-[#5a4634] transition-colors">
            {isAm ? "አድራሻ" : "Contact"}
          </a>
        </nav>

        {/* Right Actions: Currency, Language, AI Assistant & Booking */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Currency Switcher */}
          <select
            value={currency}
            onChange={(e) => onCurrencyChange(e.target.value as Currency)}
            className="bg-[#faf7f2] text-[#5a4634] text-xs font-bold px-2 py-1.5 rounded border border-[#e8dcc4] hover:border-[#c5a059] focus:outline-none cursor-pointer"
          >
            <option value="ETB">ETB (ብር)</option>
            <option value="USD">USD ($)</option>
            <option value="EUR">EUR (€)</option>
          </select>

          {/* Language Switcher */}
          <button
            onClick={() => onLanguageChange(language === 'en' ? 'am' : 'en')}
            className="bg-[#faf7f2] text-[#5a4634] hover:text-[#c5a059] text-xs font-bold px-2.5 py-1.5 rounded border border-[#e8dcc4] flex items-center gap-1 transition-colors"
            title="Switch Language / ቋንቋ ይቀይሩ"
          >
            <Globe className="w-3.5 h-3.5 text-[#c5a059]" />
            <span>{language === 'en' ? 'አማ' : 'EN'}</span>
          </button>

          {/* Gemini AI Concierge Button */}
          <button
            onClick={onOpenAiConcierge}
            className="bg-[#faf7f2] border border-[#c5a059]/60 hover:bg-amber-50 text-[#5a4634] text-xs font-bold px-3 py-1.5 rounded flex items-center gap-1.5 transition-all shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#c5a059] animate-pulse" />
            <span className="hidden sm:inline">{isAm ? "AI ረዳት" : "AI Concierge"}</span>
          </button>

          {/* Sticky Header Direct Booking CTA */}
          <button
            onClick={onOpenBooking}
            className="bg-[#5a4634] hover:bg-[#433324] text-white font-bold text-xs uppercase tracking-widest px-5 py-2.5 rounded shadow-md transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            {isAm ? "አሁኑኑ ይዘዙ" : "BOOK NOW"}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#5a4634] hover:text-[#c5a059]"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-[#e8dcc4] px-6 py-4 flex flex-col gap-3 text-xs font-bold uppercase tracking-widest text-[#8b735b]">
          <a href="#rooms" onClick={() => setMobileMenuOpen(false)} className="py-1 hover:text-[#5a4634]">
            {isAm ? "ክፍሎች" : "Rooms"}
          </a>
          <a href="#dining" onClick={() => setMobileMenuOpen(false)} className="py-1 hover:text-[#5a4634]">
            {isAm ? "ምግብ እና ቡና" : "Dining & Coffee"}
          </a>
          <a href="#tours" onClick={() => setMobileMenuOpen(false)} className="py-1 hover:text-[#5a4634]">
            {isAm ? "የቱር ጉዞዎች" : "Tour Packages"}
          </a>
          <a href="#3d-world" onClick={() => setMobileMenuOpen(false)} className="py-1 hover:text-[#5a4634] text-[#c5a059] flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-[#c5a059]" />
            <span>{isAm ? "3D አየር እይታ" : "3D Experience"}</span>
          </a>
          <a href="#amenities" onClick={() => setMobileMenuOpen(false)} className="py-1 hover:text-[#5a4634]">
            {isAm ? "አገልግሎቶች" : "Amenities"}
          </a>
          <a href="#reviews" onClick={() => setMobileMenuOpen(false)} className="py-1 hover:text-[#5a4634]">
            {isAm ? "ግምገማዎች" : "Reviews"}
          </a>
          <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="py-1 hover:text-[#5a4634]">
            {isAm ? "አድራሻ" : "Contact"}
          </a>
        </div>
      )}
    </header>
  );
};
