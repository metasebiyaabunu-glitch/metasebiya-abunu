import React, { useState } from 'react';
import { Language, Currency, TourPackage } from '../../types';
import { formatPrice, HOTEL_INFO } from '../../data/hotelData';
import { X, Compass, Calendar, Clock, MapPin, CheckCircle2 } from 'lucide-react';

interface TourInquiryModalProps {
  language: Language;
  currency: Currency;
  tour: TourPackage;
  onClose: () => void;
}

export const TourInquiryModal: React.FC<TourInquiryModalProps> = ({
  language,
  currency,
  tour,
  onClose
}) => {
  const isAm = language === 'am';
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('2026-07-28');
  const [people, setPeople] = useState(2);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="bg-slate-900 border border-amber-500/40 w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden relative text-white">
        
        {/* Header */}
        <div className="p-5 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-amber-400" />
            <h3 className="font-serif font-bold text-lg text-amber-100">
              {isAm ? tour.titleAm : tour.titleEn}
            </h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-full text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {submitted ? (
            <div className="text-center space-y-4 py-4">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
              <h4 className="font-serif font-bold text-xl text-amber-100">
                {isAm ? "የቱር ጉዞ ጥያቄዎ ተመዝግቧል!" : "Tour Package Inquiry Sent!"}
              </h4>
              <p className="text-slate-300 text-xs">
                {isAm
                  ? "የውበቴ ሆቴል የቱር ቢሮ አስተናጋጅ በቅርቡ በስልክ ያነጋግሩዎታል።"
                  : `Tour request registered for ${people} person(s) on ${date}. Our licensed local guide will arrange hotel pickup.`}
              </p>
              <button
                onClick={onClose}
                className="w-full py-3 bg-amber-500 text-slate-950 font-bold text-xs rounded-xl"
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 flex justify-between items-center text-xs">
                <div>
                  <span className="text-slate-400 block">Duration & Location</span>
                  <span className="font-bold text-amber-200">{tour.duration} • {tour.location}</span>
                </div>
                <div className="text-right">
                  <span className="text-slate-400 block">Rate</span>
                  <span className="font-extrabold text-amber-400 text-base">{formatPrice(tour.priceETB, currency)}</span>
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-400 uppercase block mb-1">
                  {isAm ? "ሙሉ ስም" : "Your Name"}
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Lukas B."
                  className="w-full bg-slate-950 border border-slate-800 text-white text-xs rounded-xl p-3"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-slate-400 uppercase block mb-1">
                    {isAm ? "ስልክ ቁጥር" : "Phone Number"}
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="0911002233"
                    className="w-full bg-slate-950 border border-slate-800 text-white text-xs rounded-xl p-3"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-400 uppercase block mb-1">
                    {isAm ? "የሰው ብዛት" : "Number of Persons"}
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="15"
                    value={people}
                    onChange={(e) => setPeople(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 text-white text-xs rounded-xl p-3"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-400 uppercase block mb-1">
                  {isAm ? "የጉዞ ቀን" : "Preferred Tour Date"}
                </label>
                <input
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 text-white text-xs rounded-xl p-3"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 font-bold text-xs sm:text-sm rounded-xl shadow-lg uppercase tracking-wide mt-2"
              >
                {isAm ? "የቱር ጉዞውን ያረጋግጡ" : "CONFIRM TOUR PACKAGE"}
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
