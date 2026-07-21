import React, { useState } from 'react';
import { Language, Currency, Room, BookingDetails } from '../../types';
import { ROOMS, formatPrice, HOTEL_INFO } from '../../data/hotelData';
import { X, Calendar, Users, ShieldCheck, CheckCircle2, Download, Bus, CreditCard, Sparkles, QrCode } from 'lucide-react';

interface BookingModalProps {
  language: Language;
  currency: Currency;
  selectedRoom: Room | null;
  onClose: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  language,
  currency,
  selectedRoom,
  onClose
}) => {
  const isAm = language === 'am';
  const [activeRoom, setActiveRoom] = useState<Room>(selectedRoom || ROOMS[0]);
  const [step, setStep] = useState<'details' | 'payment' | 'confirmation'>('details');

  // Form State
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [checkIn, setCheckIn] = useState('2026-07-27');
  const [checkOut, setCheckOut] = useState('2026-07-28');
  const [guestsCount, setGuestsCount] = useState(2);
  const [needsAirportShuttle, setNeedsAirportShuttle] = useState(true);
  const [flightNumber, setFlightNumber] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'telebirr' | 'cbe' | 'card' | 'payAtHotel'>('telebirr');

  // Confirmation Record
  const [confirmedBooking, setConfirmedBooking] = useState<BookingDetails | null>(null);

  const calculateNights = () => {
    const d1 = new Date(checkIn);
    const d2 = new Date(checkOut);
    const diffTime = Math.abs(d2.getTime() - d1.getTime());
    const nights = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return nights > 0 ? nights : 1;
  };

  const nights = calculateNights();
  const rawTotalETB = activeRoom.priceETB * nights;
  // Apply 15% direct booking discount
  const directDiscountETB = Math.round(rawTotalETB * 0.15);
  const finalTotalETB = rawTotalETB - directDiscountETB;

  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };

  const handleFinalizeBooking = () => {
    const bookingCode = 'WB-' + Math.floor(100000 + Math.random() * 900000);
    const record: BookingDetails = {
      id: bookingCode,
      roomName: isAm ? activeRoom.nameAm : activeRoom.nameEn,
      guestName,
      guestEmail,
      guestPhone,
      checkIn,
      checkOut,
      guestsCount,
      totalPriceETB: finalTotalETB,
      paymentMethod,
      airportShuttle: needsAirportShuttle,
      flightNumber
    };
    setConfirmedBooking(record);
    setStep('confirmation');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2d241e]/80 backdrop-blur-md overflow-y-auto">
      <div className="bg-white border border-[#e8dcc4] w-full max-w-2xl rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.15)] overflow-hidden relative text-[#2d241e] my-8">
        
        {/* Header */}
        <div className="p-6 bg-[#faf7f2] border-b border-[#e8dcc4] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#c5a059] text-white flex items-center justify-center font-serif font-bold text-sm">
              WB
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg text-[#5a4634]">
                {isAm ? "የውበቴ ሆቴል ክፍል ማስያዣ" : "Direct Reservation - Save 15%"}
              </h3>
              <p className="text-[11px] text-[#c5a059] font-bold">
                {HOTEL_INFO.nameEn} • {HOTEL_INFO.phoneDisplay}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white text-[#8b735b] hover:text-[#2d241e] flex items-center justify-center border border-[#e8dcc4]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center justify-around bg-[#faf7f2] border-b border-[#e8dcc4] text-xs py-2.5 font-bold text-[#8b735b]">
          <span className={step === 'details' ? 'text-[#c5a059] font-bold' : ''}>
            1. {isAm ? "የክፍል እና የእንግዳ መረጃ" : "Room & Guest Details"}
          </span>
          <span className={step === 'payment' ? 'text-[#c5a059] font-bold' : ''}>
            2. {isAm ? "ክፍያ" : "Payment"}
          </span>
          <span className={step === 'confirmation' ? 'text-[#c5a059] font-bold' : ''}>
            3. {isAm ? "ቫውቸር" : "Confirmation Voucher"}
          </span>
        </div>

        {/* Modal Body Content */}
        <div className="p-6">
          
          {/* STEP 1: DETAILS */}
          {step === 'details' && (
            <form onSubmit={handleProceedToPayment} className="space-y-5">
              
              {/* Room Selector Selector */}
              <div>
                <label className="text-[11px] font-bold text-[#c5a059] uppercase tracking-widest block mb-2">
                  {isAm ? "የተመረጠው ክፍል" : "Select Accommodation"}
                </label>
                <select
                  value={activeRoom.id}
                  onChange={(e) => {
                    const r = ROOMS.find(rm => rm.id === e.target.value);
                    if (r) setActiveRoom(r);
                  }}
                  className="w-full bg-[#faf7f2] border border-[#e8dcc4] focus:border-[#c5a059] text-[#2d241e] text-xs font-medium rounded-xl p-3 focus:outline-none"
                >
                  {ROOMS.map((r) => (
                    <option key={r.id} value={r.id}>
                      {isAm ? r.nameAm : r.nameEn} - {formatPrice(r.priceETB, currency)}/night
                    </option>
                  ))}
                </select>
              </div>

              {/* Dates & Guests */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-[#8b735b] uppercase block mb-1">
                    {isAm ? "የመግቢያ ቀን" : "Check-in Date"}
                  </label>
                  <input
                    type="date"
                    required
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="w-full bg-[#faf7f2] border border-[#e8dcc4] text-[#2d241e] text-xs font-medium rounded-xl p-3"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-[#8b735b] uppercase block mb-1">
                    {isAm ? "የመውጫ ቀን" : "Check-out Date"}
                  </label>
                  <input
                    type="date"
                    required
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="w-full bg-[#faf7f2] border border-[#e8dcc4] text-[#2d241e] text-xs font-medium rounded-xl p-3"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-[#8b735b] uppercase block mb-1">
                    {isAm ? "የእንግዶች ብዛት" : "Guests"}
                  </label>
                  <select
                    value={guestsCount}
                    onChange={(e) => setGuestsCount(Number(e.target.value))}
                    className="w-full bg-[#faf7f2] border border-[#e8dcc4] text-[#2d241e] text-xs font-medium rounded-xl p-3"
                  >
                    <option value={1}>1 Guest</option>
                    <option value={2}>2 Guests</option>
                    <option value={3}>3 Guests</option>
                    <option value={4}>4 Guests / Family</option>
                  </select>
                </div>
              </div>

              {/* Guest Personal Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-[#e8dcc4]">
                <div>
                  <label className="text-[11px] font-bold text-[#8b735b] uppercase block mb-1">
                    {isAm ? "ሙሉ ስም" : "Full Name"}
                  </label>
                  <input
                    type="text"
                    required
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    placeholder="e.g. Lukas B. / Kebede T."
                    className="w-full bg-[#faf7f2] border border-[#e8dcc4] text-[#2d241e] text-xs font-medium rounded-xl p-3"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-[#8b735b] uppercase block mb-1">
                    {isAm ? "ስልክ ቁጥር" : "Phone Number"}
                  </label>
                  <input
                    type="tel"
                    required
                    value={guestPhone}
                    onChange={(e) => setGuestPhone(e.target.value)}
                    placeholder="0911223344"
                    className="w-full bg-[#faf7f2] border border-[#e8dcc4] text-[#2d241e] text-xs font-medium rounded-xl p-3"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-[#8b735b] uppercase block mb-1">
                  {isAm ? "ኢሜይል" : "Email Address"}
                </label>
                <input
                  type="email"
                  required
                  value={guestEmail}
                  onChange={(e) => setGuestEmail(e.target.value)}
                  placeholder="guest@example.com"
                  className="w-full bg-[#faf7f2] border border-[#e8dcc4] text-[#2d241e] text-xs font-medium rounded-xl p-3"
                />
              </div>

              {/* Complimentary Airport Pickup Toggle */}
              <div className="p-4 rounded-2xl bg-[#faf7f2] border border-[#e8dcc4] flex items-start gap-3">
                <input
                  type="checkbox"
                  id="shuttle"
                  checked={needsAirportShuttle}
                  onChange={(e) => setNeedsAirportShuttle(e.target.checked)}
                  className="mt-1 rounded border-[#e8dcc4] text-[#c5a059] focus:ring-[#c5a059]"
                />
                <label htmlFor="shuttle" className="text-xs cursor-pointer">
                  <span className="font-bold text-[#5a4634] block">
                    🎁 {isAm ? "ነጻ የኤርፖርት መቀበያ አገልግሎት (Free Shuttle)" : "Free Arba Minch Airport (AMH) Transfer Included"}
                  </span>
                  <span className="text-[#8b735b] text-[11px] block mt-0.5 font-medium">
                    Our driver will meet you with a Wubete Hotel sign at Arba Minch Airport arrivals.
                  </span>
                </label>
              </div>

              {needsAirportShuttle && (
                <div>
                  <label className="text-[11px] font-bold text-[#8b735b] uppercase block mb-1">
                    {isAm ? "የበረራ ቁጥር / የደረሰበት ሰዓት (አማራጭ)" : "Flight Number / Arrival Time"}
                  </label>
                  <input
                    type="text"
                    value={flightNumber}
                    onChange={(e) => setFlightNumber(e.target.value)}
                    placeholder="e.g. Ethiopian Airlines ET212 - 2:30 PM"
                    className="w-full bg-[#faf7f2] border border-[#e8dcc4] text-[#2d241e] text-xs font-medium rounded-xl p-3"
                  />
                </div>
              )}

              {/* Pricing Breakdown Summary */}
              <div className="p-4 rounded-2xl bg-[#faf7f2] border border-[#e8dcc4] space-y-2 text-xs font-medium">
                <div className="flex justify-between text-[#8b735b]">
                  <span>{nights} {isAm ? "ሌሊት x " : "nights x "} {formatPrice(activeRoom.priceETB, currency)}</span>
                  <span>{formatPrice(rawTotalETB, currency)}</span>
                </div>
                <div className="flex justify-between text-emerald-700 font-bold">
                  <span>Direct Booking Discount (-15%)</span>
                  <span>-{formatPrice(directDiscountETB, currency)}</span>
                </div>
                <div className="flex justify-between text-[#5a4634] font-serif font-bold text-base pt-2 border-t border-[#e8dcc4]">
                  <span>{isAm ? "ጠቅላላ ዋጋ:" : "Total Price:"}</span>
                  <span className="text-[#c5a059]">{formatPrice(finalTotalETB, currency)}</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#c5a059] hover:bg-[#b48e42] text-white font-bold text-sm rounded-xl shadow-md uppercase tracking-widest transition-all"
              >
                {isAm ? "ቀጥል ወደ ክፍያ (Step 2)" : "PROCEED TO PAYMENT (STEP 2)"}
              </button>
            </form>
          )}

          {/* STEP 2: PAYMENT */}
          {step === 'payment' && (
            <div className="space-y-5">
              <h4 className="font-serif font-bold text-lg text-[#5a4634]">
                {isAm ? "የክፍያ ዘዴ ይምረጡ" : "Select Payment Method"}
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={() => setPaymentMethod('telebirr')}
                  className={`p-4 rounded-2xl border text-left transition-all flex items-center justify-between ${
                    paymentMethod === 'telebirr'
                      ? 'bg-[#faf7f2] border-[#c5a059] text-[#5a4634]'
                      : 'bg-white border-[#e8dcc4] text-[#8b735b] hover:border-[#c5a059]'
                  }`}
                >
                  <div>
                    <span className="font-bold text-sm block">Telebirr SuperApp</span>
                    <span className="text-[11px] text-[#8b735b]">Instant Ethiopian Mobile Pay</span>
                  </div>
                  <span className="font-bold text-xs px-2 py-1 bg-[#c5a059] text-white rounded">TELEBIRR</span>
                </button>

                <button
                  onClick={() => setPaymentMethod('cbe')}
                  className={`p-4 rounded-2xl border text-left transition-all flex items-center justify-between ${
                    paymentMethod === 'cbe'
                      ? 'bg-[#faf7f2] border-[#c5a059] text-[#5a4634]'
                      : 'bg-white border-[#e8dcc4] text-[#8b735b] hover:border-[#c5a059]'
                  }`}
                >
                  <div>
                    <span className="font-bold text-sm block">CBE Birr / Awash</span>
                    <span className="text-[11px] text-[#8b735b]">Direct Commercial Bank Transfer</span>
                  </div>
                  <span className="font-bold text-xs px-2 py-1 bg-blue-600 text-white rounded">CBE</span>
                </button>

                <button
                  onClick={() => setPaymentMethod('payAtHotel')}
                  className={`p-4 rounded-2xl border text-left transition-all flex items-center justify-between ${
                    paymentMethod === 'payAtHotel'
                      ? 'bg-[#faf7f2] border-[#c5a059] text-[#5a4634]'
                      : 'bg-white border-[#e8dcc4] text-[#8b735b] hover:border-[#c5a059]'
                  }`}
                >
                  <div>
                    <span className="font-bold text-sm block">{isAm ? "በሆቴሉ ሲደርሱ መክፈል" : "Pay at Hotel Front Desk"}</span>
                    <span className="text-[11px] text-emerald-700 font-semibold">Cash / Card upon check-in</span>
                  </div>
                  <ShieldCheck className="w-5 h-5 text-emerald-600" />
                </button>

                <button
                  onClick={() => setPaymentMethod('card')}
                  className={`p-4 rounded-2xl border text-left transition-all flex items-center justify-between ${
                    paymentMethod === 'card'
                      ? 'bg-[#faf7f2] border-[#c5a059] text-[#5a4634]'
                      : 'bg-white border-[#e8dcc4] text-[#8b735b] hover:border-[#c5a059]'
                  }`}
                >
                  <div>
                    <span className="font-bold text-sm block">International Visa / MC</span>
                    <span className="text-[11px] text-[#8b735b]">USD & Foreign Cards Accepted</span>
                  </div>
                  <CreditCard className="w-5 h-5 text-[#c5a059]" />
                </button>
              </div>

              {/* Total Summary Banner */}
              <div className="p-4 rounded-2xl bg-[#faf7f2] border border-[#e8dcc4] flex items-center justify-between text-xs font-medium">
                <div>
                  <span className="text-[#8b735b] block">{isAm ? "የተያዘው ክፍል" : "Reserved Room"}</span>
                  <span className="font-bold text-[#5a4634]">{isAm ? activeRoom.nameAm : activeRoom.nameEn} ({nights} nights)</span>
                </div>
                <div className="text-right">
                  <span className="text-[#8b735b] block">{isAm ? "መክፈል ያለብዎት" : "Amount Due"}</span>
                  <span className="font-serif font-bold text-[#c5a059] text-lg">{formatPrice(finalTotalETB, currency)}</span>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep('details')}
                  className="w-1/3 py-3 rounded-xl bg-white border border-[#e8dcc4] text-[#5a4634] text-xs font-bold uppercase tracking-widest"
                >
                  {isAm ? "ተመለስ" : "Back"}
                </button>

                <button
                  onClick={handleFinalizeBooking}
                  className="w-2/3 py-3 bg-[#c5a059] hover:bg-[#b48e42] text-white font-bold text-xs sm:text-sm rounded-xl shadow-md uppercase tracking-widest"
                >
                  {isAm ? "ትእዛዙን አረጋግጥ (CONFIRM)" : "CONFIRM RESERVATION & GET VOUCHER"}
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: CONFIRMATION VOUCHER */}
          {step === 'confirmation' && confirmedBooking && (
            <div className="space-y-6 text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <h4 className="font-serif font-bold text-2xl text-[#5a4634]">
                  {isAm ? "ማስያዣዎ በስኬት ተረጋግጧል!" : "Reservation Confirmed!"}
                </h4>
                <p className="text-[#8b735b] text-xs mt-1 font-medium">
                  Voucher ID: <span className="font-mono font-bold text-[#c5a059]">{confirmedBooking.id}</span>
                </p>
              </div>

              {/* Printable Digital Voucher Card */}
              <div className="p-6 rounded-3xl bg-[#faf7f2] border border-[#e8dcc4] text-left space-y-4">
                <div className="flex justify-between items-start border-b border-[#e8dcc4] pb-3">
                  <div>
                    <h5 className="font-serif font-bold text-base text-[#5a4634]">{HOTEL_INFO.nameEn}</h5>
                    <p className="text-[11px] text-[#8b735b] font-medium">{HOTEL_INFO.addressEn} • {HOTEL_INFO.phoneDisplay}</p>
                  </div>
                  <div className="w-12 h-12 bg-white p-1 rounded-lg shrink-0 border border-[#e8dcc4]">
                    <QrCode className="w-full h-full text-[#5a4634]" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs font-medium">
                  <div>
                    <span className="text-[#8b735b] text-[10px] block uppercase font-bold">Guest Name</span>
                    <span className="font-bold text-[#5a4634]">{confirmedBooking.guestName}</span>
                  </div>
                  <div>
                    <span className="text-[#8b735b] text-[10px] block uppercase font-bold">Phone Number</span>
                    <span className="font-bold text-[#5a4634]">{confirmedBooking.guestPhone}</span>
                  </div>
                  <div>
                    <span className="text-[#8b735b] text-[10px] block uppercase font-bold">Check-in</span>
                    <span className="font-bold text-[#c5a059]">{confirmedBooking.checkIn}</span>
                  </div>
                  <div>
                    <span className="text-[#8b735b] text-[10px] block uppercase font-bold">Check-out</span>
                    <span className="font-bold text-[#c5a059]">{confirmedBooking.checkOut}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#e8dcc4] flex justify-between items-center text-xs">
                  <span className="text-emerald-700 font-bold">
                    ✓ Free Airport Shuttle Registered
                  </span>
                  <span className="font-serif font-bold text-[#c5a059] text-base">
                    {formatPrice(confirmedBooking.totalPriceETB, currency)}
                  </span>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => alert(`Downloading official confirmation voucher PDF for ${confirmedBooking.id}`)}
                  className="w-1/2 py-3 rounded-xl bg-[#c5a059] text-white font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-md"
                >
                  <Download className="w-4 h-4 text-white" />
                  <span>Download PDF Voucher</span>
                </button>

                <button
                  onClick={onClose}
                  className="w-1/2 py-3 rounded-xl bg-white border border-[#e8dcc4] text-[#5a4634] font-bold text-xs uppercase tracking-widest"
                >
                  Close Window
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
