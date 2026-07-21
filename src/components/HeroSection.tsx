import React, { useState } from 'react';
import { Language, Currency, View3DMode } from '../types';
import { Resort3DCanvas } from './3d/Resort3DCanvas';
import { HOTEL_INFO } from '../data/hotelData';
import { Sparkles, Compass, ShieldCheck, Star, MapPin, Coffee, Waves, ExternalLink } from 'lucide-react';

interface HeroSectionProps {
  language: Language;
  currency: Currency;
  onOpenBooking: () => void;
  onOpenAiConcierge: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  language,
  currency,
  onOpenBooking,
  onOpenAiConcierge
}) => {
  const isAm = language === 'am';
  const [hero3dMode, setHero3dMode] = useState<View3DMode>('resort');
  const [viewFormat, setViewFormat] = useState<'3d' | 'photo'>('3d');

  return (
    <section className="relative min-h-[85vh] bg-[radial-gradient(circle_at_center,_#ffffff_0%,_#f2ede4_100%)] text-[#2d241e] overflow-hidden py-12 px-4 sm:px-6 lg:px-8 flex flex-col justify-center border-b border-[#e8dcc4]">
      {/* Background Subtle Warm Blobs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#c5a059]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#5a4634]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 items-center z-10">
        
        {/* Left Column: Headlines & High-Converting CTAs */}
        <div className="lg:col-span-6 flex flex-col items-start gap-5">
          
          {/* Trust Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#faf7f2] border border-[#e8dcc4] text-[#c5a059] text-xs font-bold uppercase tracking-widest shadow-xs">
            <Star className="w-3.5 h-3.5 text-[#c5a059] fill-[#c5a059]" />
            <span>
              {isAm ? "4.9 ★ በTripAdvisor እና Google አርባ ምንጭ" : "4.9 ★ Top Rated Lodge in Arba Minch"}
            </span>
          </div>

          {/* Main Display Headline */}
          <h1 className="font-serif text-3xl sm:text-5xl xl:text-6xl font-bold text-[#5a4634] leading-[1.15] tracking-tight">
            {isAm ? (
              <>
                የአርባ ምንጭን <span className="text-[#c5a059]">የተፈጥሮ ውበት</span> በ5-ኮከብ ምቾት ይለማመዱ
              </>
            ) : (
              <>
                Experience the <span className="text-[#c5a059]">Natural Majesty</span> of Arba Minch
              </>
            )}
          </h1>

          {/* Subtitle description */}
          <p className="text-[#8b735b] text-sm sm:text-base leading-relaxed max-w-xl font-medium">
            {isAm
              ? "በአርባ ምንጮች ደን፣ በጫሞ እና በአባያ ሐይቆች አስደናቂ እይታ ላይ የተገነባ የላቀ ሪዞርት። ባህላዊ የኢትዮጵያ አስተናጋጅነት፣ የነጻ ኤርፖርት ትራንስፖርት እና የዓሳ ምግቦችን ያግኙ።"
              : "Perched high on the Rift Valley ridge overlooking Forty Springs, Lake Chamo & Nechisar National Park. Enjoy authentic Ethiopian hospitality, live coffee ceremonies, and direct booking discounts."}
          </p>

          {/* Value Proposition Highlights */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full py-2">
            <div className="flex items-center gap-2 text-xs font-bold text-[#5a4634] bg-white border border-[#e8dcc4] p-3 rounded-xl shadow-xs">
              <ShieldCheck className="w-4 h-4 text-[#c5a059] shrink-0" />
              <span>{isAm ? "ነጻ ኤርፖርት መቀበያ" : "Free Airport Pickup"}</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#5a4634] bg-white border border-[#e8dcc4] p-3 rounded-xl shadow-xs">
              <Waves className="w-4 h-4 text-[#c5a059] shrink-0" />
              <span>{isAm ? "100% የሐይቅ እይታ" : "100% Lake Views"}</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#5a4634] bg-white border border-[#e8dcc4] p-3 rounded-xl shadow-xs">
              <Coffee className="w-4 h-4 text-[#c5a059] shrink-0" />
              <span>{isAm ? "ነጻ ባህላዊ ቡና" : "Free Coffee Ritual"}</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-2 w-full sm:w-auto">
            <button
              onClick={onOpenBooking}
              className="w-full sm:w-auto bg-[#c5a059] hover:bg-[#b48e42] text-white font-bold text-xs uppercase tracking-widest px-8 py-3.5 rounded shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4 text-white" />
              <span>{isAm ? "አሁኑኑ በ15% ቅናሽ ይዘዙ" : "BOOK DIRECT (SAVE 15%)"}</span>
            </button>

            <button
              onClick={onOpenAiConcierge}
              className="w-full sm:w-auto bg-white hover:bg-[#faf7f2] text-[#5a4634] border border-[#5a4634] font-bold text-xs uppercase tracking-widest px-6 py-3.5 rounded transition-all flex items-center justify-center gap-2 shadow-xs"
            >
              <Sparkles className="w-4 h-4 text-[#c5a059]" />
              <span>{isAm ? "የAI ረዳት ይጠይቁ" : "Ask AI Concierge"}</span>
            </button>
          </div>

          {/* Location Callout & Google Maps Action Buttons */}
          <div className="flex flex-col gap-2 pt-1 w-full">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-[#8b735b]">
              <MapPin className="w-3.5 h-3.5 text-[#c5a059] shrink-0" />
              <span>{HOTEL_INFO.addressEn} • {HOTEL_INFO.distanceAirport}</span>
            </div>

            <div className="flex flex-wrap items-center gap-2 pt-1">
              <a
                href={HOTEL_INFO.mapsPhotoUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-[#e8dcc4] hover:border-[#c5a059] text-[#5a4634] hover:text-[#c5a059] text-xs font-bold transition-all shadow-xs"
              >
                <Compass className="w-3.5 h-3.5 text-[#c5a059]" />
                <span>{isAm ? "በGoogle Maps ላይ ፎቶዎቹን ይመልከቱ" : "View Google Maps Photo 1"}</span>
                <ExternalLink className="w-3 h-3 text-[#c5a059]" />
              </a>

              <a
                href={HOTEL_INFO.mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-[#e8dcc4] hover:border-[#c5a059] text-[#5a4634] hover:text-[#c5a059] text-xs font-bold transition-all shadow-xs"
              >
                <MapPin className="w-3.5 h-3.5 text-[#c5a059]" />
                <span>{isAm ? "የሆቴሉ መገኛ (Google Maps)" : "View Google Maps Photo 2"}</span>
                <ExternalLink className="w-3 h-3 text-[#c5a059]" />
              </a>
            </div>
          </div>

        </div>

        {/* Right Column: Interactive 3D Canvas Viewport & Google Maps Photo Showcase */}
        <div className="lg:col-span-6 flex flex-col gap-3">
          
          {/* Format Switcher Tabs */}
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-1 bg-white border border-[#e8dcc4] p-1 rounded-xl shadow-xs">
              <button
                onClick={() => setViewFormat('3d')}
                className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-lg transition-all flex items-center gap-1.5 ${
                  viewFormat === '3d'
                    ? 'bg-[#5a4634] text-white shadow-xs'
                    : 'text-[#8b735b] hover:text-[#5a4634]'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-[#c5a059]" />
                <span>Interactive 3D View</span>
              </button>

              <button
                onClick={() => setViewFormat('photo')}
                className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-lg transition-all flex items-center gap-1.5 ${
                  viewFormat === 'photo'
                    ? 'bg-[#5a4634] text-white shadow-xs'
                    : 'text-[#8b735b] hover:text-[#5a4634]'
                }`}
              >
                <Compass className="w-3.5 h-3.5 text-[#c5a059]" />
                <span>Google Maps Photo</span>
              </button>
            </div>

            <a
              href={HOTEL_INFO.mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="text-[11px] text-[#c5a059] hover:text-[#5a4634] font-bold uppercase tracking-widest hidden sm:inline flex items-center gap-1 transition-colors"
            >
              <span>📍 Google Maps Verified Place</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Main Interactive Stage */}
          <div className="w-full h-[450px] sm:h-[500px] relative rounded-3xl overflow-hidden border-4 border-white shadow-[0_30px_70px_rgba(90,40,0,0.12)] bg-white">
            {viewFormat === '3d' ? (
              <Resort3DCanvas mode={hero3dMode} onModeChange={setHero3dMode} />
            ) : (
              <div className="w-full h-full relative group">
                <img
                  src="https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1200&q=80"
                  alt="Wubete Hotel Arba Minch Google Maps Location Photo"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2d241e] via-transparent to-transparent flex flex-col justify-end p-6">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="px-3 py-1 bg-[#c5a059] text-white text-[11px] font-bold uppercase tracking-widest rounded shadow-xs flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      Google Maps Location Photo
                    </span>
                    <a
                      href={HOTEL_INFO.mapsUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-1 bg-white/95 hover:bg-white text-[#5a4634] text-[11px] font-bold rounded shadow-xs flex items-center gap-1 transition-all"
                    >
                      <span>Open Photo in Google Maps</span>
                      <ExternalLink className="w-3 h-3 text-[#c5a059]" />
                    </a>
                  </div>
                  <span className="text-[#fdfaf6] font-serif font-bold text-xl sm:text-2xl">
                    Wubete Hotel Arba Minch • Shecha
                  </span>
                  <p className="text-[#e8dcc4] text-xs font-medium">
                    {HOTEL_INFO.addressEn}
                  </p>
                </div>
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
