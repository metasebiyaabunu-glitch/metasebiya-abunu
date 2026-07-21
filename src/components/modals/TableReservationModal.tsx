import React, { useState } from 'react';
import { Language } from '../../types';
import { HOTEL_INFO } from '../../data/hotelData';
import { X, Utensils, Calendar, Clock, CheckCircle2 } from 'lucide-react';

interface TableReservationModalProps {
  language: Language;
  onClose: () => void;
}

export const TableReservationModal: React.FC<TableReservationModalProps> = ({
  language,
  onClose
}) => {
  const isAm = language === 'am';
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [guests, setGuests] = useState(2);
  const [date, setDate] = useState('2026-07-27');
  const [time, setTime] = useState('19:00');
  const [preference, setPreference] = useState('terraceView');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2d241e]/80 backdrop-blur-md">
      <div className="bg-white border border-[#e8dcc4] w-full max-w-lg rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.15)] overflow-hidden relative text-[#2d241e]">
        
        {/* Header */}
        <div className="p-5 bg-[#faf7f2] border-b border-[#e8dcc4] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Utensils className="w-5 h-5 text-[#c5a059]" />
            <h3 className="font-serif font-bold text-lg text-[#5a4634]">
              {isAm ? "የምግብ ጠረጴዛ መያዣ" : "Forty Springs Dining Table Reservation"}
            </h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-full text-[#8b735b] hover:text-[#2d241e]">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {submitted ? (
            <div className="text-center space-y-4 py-4">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h4 className="font-serif font-bold text-xl text-[#5a4634]">
                {isAm ? "ጠረጴዛዎ በስኬት ተይዟል!" : "Dining Table Reserved!"}
              </h4>
              <p className="text-[#8b735b] text-xs font-medium">
                {isAm
                  ? "የውበቴ ሆቴል ሬስቶራንት ክፍል ጥያቄዎን ተቀብሏል። በቅርቡ በስልክ ይደውሉልዎታል።"
                  : `Table reserved for ${guests} guest(s) on ${date} at ${time}. We look forward to serving you fresh Lake Chamo fish & kitfo.`}
              </p>
              <button
                onClick={onClose}
                className="w-full py-3 bg-[#c5a059] text-white font-bold text-xs rounded-xl uppercase tracking-widest shadow-md"
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <p className="text-xs text-[#8b735b] font-medium">
                {isAm
                  ? "በአርባ ምንጭ ሽንጫ በሚገኘው ሆቴላችን ትኩስ የጫሞ አሳ፣ ክትፎ እና ባህላዊ ቡና ይደሰቱ።"
                  : "Reserve your spot at Forty Springs terrace restaurant overlooking Lake Chamo."}
              </p>

              <div>
                <label className="text-[11px] font-bold text-[#8b735b] uppercase block mb-1">
                  {isAm ? "ሙሉ ስም" : "Guest Name"}
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Lukas B."
                  className="w-full bg-[#faf7f2] border border-[#e8dcc4] text-[#2d241e] text-xs font-medium rounded-xl p-3"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-[#8b735b] uppercase block mb-1">
                    {isAm ? "ስልክ ቁጥር" : "Phone Number"}
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="0911002233"
                    className="w-full bg-[#faf7f2] border border-[#e8dcc4] text-[#2d241e] text-xs font-medium rounded-xl p-3"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-[#8b735b] uppercase block mb-1">
                    {isAm ? "የሰው ብዛት" : "Number of Guests"}
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="20"
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className="w-full bg-[#faf7f2] border border-[#e8dcc4] text-[#2d241e] text-xs font-medium rounded-xl p-3"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-[#8b735b] uppercase block mb-1">
                    {isAm ? "ቀን" : "Date"}
                  </label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-[#faf7f2] border border-[#e8dcc4] text-[#2d241e] text-xs font-medium rounded-xl p-3"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-[#8b735b] uppercase block mb-1">
                    {isAm ? "ሰዓት" : "Preferred Time"}
                  </label>
                  <select
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full bg-[#faf7f2] border border-[#e8dcc4] text-[#2d241e] text-xs font-medium rounded-xl p-3"
                  >
                    <option value="12:30">12:30 PM (Lunch)</option>
                    <option value="16:00">04:00 PM (Coffee Ritual)</option>
                    <option value="19:00">07:00 PM (Dinner)</option>
                    <option value="20:30">08:30 PM (Late Dinner)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-[#8b735b] uppercase block mb-1">
                  Seating Preference
                </label>
                <select
                  value={preference}
                  onChange={(e) => setPreference(e.target.value)}
                  className="w-full bg-[#faf7f2] border border-[#e8dcc4] text-[#2d241e] text-xs font-medium rounded-xl p-3"
                >
                  <option value="terraceView">Outdoor Terrace Lake View</option>
                  <option value="indoorDining">Indoor Main Dining Room</option>
                  <option value="coffeeLounge">Traditional Coffee Lounge</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#c5a059] hover:bg-[#b48e42] text-white font-bold text-xs sm:text-sm rounded-xl shadow-md uppercase tracking-widest mt-2 transition-all"
              >
                {isAm ? "ጠረጴዛ ይዘዙ (RESERVE)" : "CONFIRM DINING RESERVATION"}
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
