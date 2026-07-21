import React, { useState } from 'react';
import { Language, Currency } from '../types';
import { MENU_ITEMS, formatPrice } from '../data/hotelData';
import { Coffee, Utensils, Flame, Sparkles, CheckCircle2, Clock } from 'lucide-react';

interface DiningSectionProps {
  language: Language;
  currency: Currency;
  onOpenTableReservation: () => void;
  onShowCoffee3D: () => void;
}

export const DiningSection: React.FC<DiningSectionProps> = ({
  language,
  currency,
  onOpenTableReservation,
  onShowCoffee3D
}) => {
  const isAm = language === 'am';
  const [activeCategory, setActiveCategory] = useState<'all' | 'fish' | 'ethiopian' | 'coffee' | 'drinks'>('all');

  const filteredMenu = MENU_ITEMS.filter(item => {
    if (activeCategory === 'all') return true;
    return item.category === activeCategory;
  });

  return (
    <section id="dining" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#faf7f2] text-[#2d241e] relative border-b border-[#e8dcc4]">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#e8dcc4] text-[#c5a059] text-xs font-bold uppercase tracking-widest mb-3 shadow-xs">
            <Utensils className="w-3.5 h-3.5" />
            <span>{isAm ? "ፎርቲ ስፕሪንግስ ሬስቶራንት እና ባር" : "Forty Springs Terrace Restaurant & Bar"}</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#5a4634] mb-4">
            {isAm ? "የጋሞ እና የጫሞ ሐይቅ ትኩስ አሳ ምግቦች" : "Authentic Ethiopian Cuisine & Fresh Lake Chamo Fish"}
          </h2>
          <p className="text-[#8b735b] text-sm sm:text-base font-medium">
            {isAm
              ? "የቀኑ ትኩስ አሳ ከጫሞ ሐይቅ፣ ባህላዊ የክትፎ እና የዶሮ ወጥ ምግቦች እንዲሁም የተሟላ የቡና ፍች ሥነ-ሥርዓት ይደሰቱ።"
              : "Savor freshly caught Nile Perch & Tilapia from Lake Chamo, organic Gurage & Gamo Kitfo, and witness our live afternoon Ethiopian Coffee Ceremony."}
          </p>
        </div>

        {/* Coffee Ceremony Spotlight Card */}
        <div className="mb-14 p-6 sm:p-8 rounded-3xl bg-white border border-[#e8dcc4] shadow-[0_20px_50px_rgba(0,0,0,0.05)] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="inline-flex items-center gap-2 text-[#c5a059] text-xs font-bold uppercase tracking-widest">
              <Coffee className="w-4 h-4 text-[#c5a059]" />
              <span>{isAm ? "የቀኑ ነጻ ባህላዊ የቡና ፍች" : "Complimentary Daily Ethiopian Coffee Ritual"}</span>
            </div>
            <h3 className="font-serif font-bold text-2xl sm:text-3xl text-[#5a4634]">
              {isAm ? "የይርጋጨፌ ቡና በፍራንክንሴንስ ዕጣን ጭስ" : "Fresh Roasted Yirgacheffe Beans over Frankincense Smoke"}
            </h3>
            <p className="text-[#8b735b] text-sm leading-relaxed font-medium">
              {isAm
                ? "በየቀኑ ከሰዓት በኋላ በውበቴ ሆቴል ሳሎን የሚካሄድ የቡና ፍች ሥነ-ሥርዓት። ትኩስ ቡና በጀበና ተፈልቶ ከፈንድሻ እና ቆሎ ጋር ለአዲስ እንግዶች በነጻ ይቀርባል።"
                : "Join us every afternoon on the terrace for a traditional Ethiopian coffee ritual. Green Yirgacheffe coffee beans are roasted live before your eyes over aromatic incense smoke, poured from a clay Jebena into ceramic Cini cups with fresh popcorn & Kolo."}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onShowCoffee3D}
                className="bg-[#c5a059] hover:bg-[#b48e42] text-white font-bold text-xs uppercase tracking-widest px-6 py-3.5 rounded-xl shadow-md flex items-center gap-2 transition-transform active:scale-95"
              >
                <Sparkles className="w-4 h-4 text-white" />
                <span>{isAm ? "3D የቡና ፍች ይመልከቱ" : "VIEW 3D COFFEE CEREMONY"}</span>
              </button>

              <button
                onClick={onOpenTableReservation}
                className="bg-white hover:bg-[#faf7f2] border border-[#5a4634] text-[#5a4634] font-bold text-xs uppercase tracking-widest px-6 py-3.5 rounded-xl transition-colors shadow-xs"
              >
                {isAm ? "የምግብ ጠረጴዛ ያዙ" : "RESERVE DINING TABLE"}
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 h-64 sm:h-72 rounded-2xl overflow-hidden relative shadow-md border-2 border-white">
            <img
              src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80"
              alt="Traditional Ethiopian Coffee Ceremony Jebena"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#2d241e]/80 via-transparent to-transparent flex items-end p-4">
              <span className="text-white text-xs font-semibold">
                ☕ {isAm ? "በየቀኑ ከቀኑ 10፡00 ሰዓት ጀምሮ" : "Served daily from 4:00 PM at Hotel Terrace"}
              </span>
            </div>
          </div>
        </div>

        {/* Digital Menu Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-2 text-xs font-bold uppercase tracking-widest rounded-xl transition-all ${
              activeCategory === 'all'
                ? 'bg-[#5a4634] text-white shadow-md'
                : 'bg-white border border-[#e8dcc4] text-[#8b735b] hover:text-[#5a4634]'
            }`}
          >
            {isAm ? "ሁሉም የምግብ ዓይነቶች" : "All Digital Menu"}
          </button>
          <button
            onClick={() => setActiveCategory('fish')}
            className={`px-4 py-2 text-xs font-bold uppercase tracking-widest rounded-xl transition-all ${
              activeCategory === 'fish'
                ? 'bg-[#5a4634] text-white shadow-md'
                : 'bg-white border border-[#e8dcc4] text-[#8b735b] hover:text-[#5a4634]'
            }`}
          >
            🐟 {isAm ? "የጫሞ አሳ ምግቦች" : "Lake Chamo Fresh Fish"}
          </button>
          <button
            onClick={() => setActiveCategory('ethiopian')}
            className={`px-4 py-2 text-xs font-bold uppercase tracking-widest rounded-xl transition-all ${
              activeCategory === 'ethiopian'
                ? 'bg-[#5a4634] text-white shadow-md'
                : 'bg-white border border-[#e8dcc4] text-[#8b735b] hover:text-[#5a4634]'
            }`}
          >
            🍲 {isAm ? "ባህላዊ የኢትዮጵያ ምግቦች" : "Ethiopian Traditional"}
          </button>
          <button
            onClick={() => setActiveCategory('drinks')}
            className={`px-4 py-2 text-xs font-bold uppercase tracking-widest rounded-xl transition-all ${
              activeCategory === 'drinks'
                ? 'bg-[#5a4634] text-white shadow-md'
                : 'bg-white border border-[#e8dcc4] text-[#8b735b] hover:text-[#5a4634]'
            }`}
          >
            🍹 {isAm ? "መጠጦች እና ጠጅ" : "Juice & Honey Tej"}
          </button>
        </div>

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMenu.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-[#e8dcc4] hover:border-[#c5a059] rounded-2xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_15px_40px_rgba(90,40,0,0.08)] transition-all flex flex-col group"
            >
              <div className="h-48 overflow-hidden relative">
                <img
                  src={item.image}
                  alt={isAm ? item.nameAm : item.nameEn}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {item.isChefSpecial && (
                  <span className="absolute top-3 left-3 bg-[#c5a059] text-white text-[10px] font-bold px-3 py-1 rounded uppercase tracking-widest shadow-md">
                    ★ {isAm ? "የሼፉ ልዩ ምርጥ" : "Chef's Special"}
                  </span>
                )}
                {item.isSpicy && (
                  <span className="absolute top-3 right-3 bg-rose-600 text-white text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1">
                    <Flame className="w-3 h-3" />
                    <span>Spicy</span>
                  </span>
                )}
              </div>

              <div className="p-5 flex flex-col flex-1 justify-between gap-4">
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h4 className="font-serif font-bold text-lg text-[#5a4634]">
                      {isAm ? item.nameAm : item.nameEn}
                    </h4>
                    <span className="text-[#c5a059] font-serif font-bold text-base shrink-0">
                      {formatPrice(item.priceETB, currency)}
                    </span>
                  </div>
                  <p className="text-[#8b735b] text-xs leading-relaxed font-medium">
                    {isAm ? item.descriptionAm : item.descriptionEn}
                  </p>
                </div>

                <button
                  onClick={onOpenTableReservation}
                  className="w-full py-2.5 rounded-xl bg-[#faf7f2] hover:bg-[#5a4634] hover:text-white border border-[#e8dcc4] text-[#5a4634] font-bold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-1.5"
                >
                  <Clock className="w-3.5 h-3.5 text-[#c5a059]" />
                  <span>{isAm ? "ጠረጴዛ ይመዝገቡ" : "Reserve Table"}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
