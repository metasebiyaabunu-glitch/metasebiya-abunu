import React from 'react';
import { Language, Currency, TourPackage } from '../types';
import { TOUR_PACKAGES, formatPrice } from '../data/hotelData';
import { Compass, Clock, MapPin, CheckCircle2, ArrowRight } from 'lucide-react';

interface ToursSectionProps {
  language: Language;
  currency: Currency;
  onSelectTour: (tour: TourPackage) => void;
}

export const ToursSection: React.FC<ToursSectionProps> = ({
  language,
  currency,
  onSelectTour
}) => {
  const isAm = language === 'am';

  return (
    <section id="tours" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#faf7f2] text-[#2d241e] relative border-b border-[#e8dcc4]">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#e8dcc4] text-[#c5a059] text-xs font-bold uppercase tracking-widest mb-3 shadow-xs">
            <Compass className="w-3.5 h-3.5" />
            <span>{isAm ? "የአርባ ምንጭ የቱር ጉብኝቶች" : "Guided Tour Packages & Lake Safaris"}</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#5a4634] mb-4">
            {isAm ? "የነጭ ሣር፣ የጫሞ ሐይቅ እና የዶርዜ መንደር ጉዞዎች" : "Explore Lake Chamo Crocodiles & Nechisar Wildlife"}
          </h2>
          <p className="text-[#8b735b] text-sm sm:text-base font-medium">
            {isAm
              ? "ከውበቴ ሆቴል በቀጥታ የሚነሱ የጀልባ ሳፋሪዎች፣ የነጭ ሣር የዘብራ ሜዳዎች እና የዶርዜ ባህላዊ መንደር ጉብኝቶችን በሆቴላችን የቱር ቢሮ ያግኙ።"
              : "Discover Arba Minch's top attractions with licensed local guides, hotel transfers, and guaranteed direct booking spots."}
          </p>
        </div>

        {/* Tour Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {TOUR_PACKAGES.map((tour) => (
            <div
              key={tour.id}
              className="bg-white border border-[#e8dcc4] hover:border-[#c5a059] rounded-2xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_50px_rgba(90,40,0,0.08)] transition-all duration-300 flex flex-col group"
            >
              {/* Tour Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={tour.image}
                  alt={isAm ? tour.titleAm : tour.titleEn}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Duration Badge */}
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md border border-[#e8dcc4] text-[#5a4634] text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-xs">
                  <Clock className="w-3.5 h-3.5 text-[#c5a059]" />
                  <span>{tour.duration}</span>
                </div>

                {/* Location Badge */}
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md border border-[#e8dcc4] text-[#8b735b] text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-xs">
                  <MapPin className="w-3.5 h-3.5 text-[#c5a059]" />
                  <span>{tour.location}</span>
                </div>

                {/* Price Badge */}
                <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md border border-[#e8dcc4] px-4 py-2 rounded-xl shadow-md">
                  <span className="text-[#5a4634] font-serif font-bold text-xl">
                    {formatPrice(tour.priceETB, currency)}
                  </span>
                  <span className="text-[#8b735b] text-xs font-medium"> / {isAm ? "ለአንድ ሰው" : "person"}</span>
                </div>
              </div>

              {/* Tour Content */}
              <div className="p-6 flex flex-col flex-1 justify-between gap-6">
                <div>
                  <h3 className="font-serif font-bold text-xl sm:text-2xl text-[#5a4634] mb-2">
                    {isAm ? tour.titleAm : tour.titleEn}
                  </h3>
                  <p className="text-[#8b735b] text-xs sm:text-sm leading-relaxed mb-4 font-medium">
                    {isAm ? tour.descriptionAm : tour.descriptionEn}
                  </p>

                  {/* Highlights List */}
                  <div className="space-y-2 py-3 border-y border-[#e8dcc4] my-4">
                    <span className="text-[#c5a059] text-[11px] font-bold uppercase tracking-widest block mb-1">
                      {isAm ? "የጉዞው ዋና መስህቦች" : "Key Experience Highlights"}
                    </span>
                    {(isAm ? tour.highlightsAm : tour.highlightsEn).map((hl, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-[#5a4634] font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#c5a059] shrink-0 mt-0.5" />
                        <span>{hl}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Book Tour CTA Button */}
                <button
                  onClick={() => onSelectTour(tour)}
                  className="w-full bg-[#c5a059] hover:bg-[#b48e42] text-white font-bold text-xs uppercase tracking-widest py-3 px-6 rounded-xl shadow-md flex items-center justify-center gap-2 transition-transform active:scale-95"
                >
                  <span>{isAm ? "ጉዞውን ያስይዙ" : "BOOK TOUR PACKAGE"}</span>
                  <ArrowRight className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
