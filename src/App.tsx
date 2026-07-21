import React, { useState } from 'react';
import { Language, Currency, Room, TourPackage } from './types';
import { HOTEL_INFO } from './data/hotelData';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { RoomsSection } from './components/RoomsSection';
import { DiningSection } from './components/DiningSection';
import { ToursSection } from './components/ToursSection';
import { Interactive3DSection } from './components/3d/Interactive3DSection';
import { AmenitiesSection } from './components/AmenitiesSection';
import { ReviewsSection } from './components/ReviewsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

// Modals
import { BookingModal } from './components/modals/BookingModal';
import { TableReservationModal } from './components/modals/TableReservationModal';
import { AiConciergeModal } from './components/modals/AiConciergeModal';
import { RoomInspectorModal } from './components/modals/RoomInspectorModal';
import { TourInquiryModal } from './components/modals/TourInquiryModal';

// Floating Icons
import { Sparkles, MessageSquare, Phone, ShieldCheck } from 'lucide-react';

export default function App() {
  const [language, setLanguage] = useState<Language>('en');
  const [currency, setCurrency] = useState<Currency>('ETB');

  // Modal States
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedRoomForBooking, setSelectedRoomForBooking] = useState<Room | null>(null);

  const [isTableReservationOpen, setIsTableReservationOpen] = useState(false);
  const [isAiConciergeOpen, setIsAiConciergeOpen] = useState(false);

  const [inspectedRoom, setInspectedRoom] = useState<Room | null>(null);
  const [selectedTour, setSelectedTour] = useState<TourPackage | null>(null);

  // Quick Handlers
  const handleOpenBooking = (room?: Room) => {
    if (room) setSelectedRoomForBooking(room);
    else setSelectedRoomForBooking(null);
    setIsBookingOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-amber-500 selection:text-slate-950">
      
      {/* Top Banner Callout */}
      <div className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-slate-950 font-extrabold text-[11px] sm:text-xs py-2 px-4 text-center flex items-center justify-center gap-2 shadow-md">
        <ShieldCheck className="w-4 h-4 shrink-0" />
        <span>
          {language === 'am'
            ? "በቀጥታ በድህረ ገጻችን ያዙ እና 15% ቅናሽ + ነጻ የኤርፖርት መቀበያ ያግኙ! (ስልክ: 093 057 1111)"
            : "BOOK DIRECT ON OUR WEBSITE & GET 15% OFF + FREE AIRPORT PICKUP! (Phone: 093 057 1111)"}
        </span>
      </div>

      {/* Main Navigation Header */}
      <Navbar
        language={language}
        currency={currency}
        onLanguageChange={setLanguage}
        onCurrencyChange={setCurrency}
        onOpenBooking={() => handleOpenBooking()}
        onOpenAiConcierge={() => setIsAiConciergeOpen(true)}
      />

      {/* Hero Section */}
      <main>
        <HeroSection
          language={language}
          currency={currency}
          onOpenBooking={() => handleOpenBooking()}
          onOpenAiConcierge={() => setIsAiConciergeOpen(true)}
        />

        {/* Accommodation & Suites Section */}
        <RoomsSection
          language={language}
          currency={currency}
          onSelectRoom={(room) => handleOpenBooking(room)}
          onInspectRoom3D={(room) => setInspectedRoom(room)}
        />

        {/* Forty Springs Restaurant & Bar Section */}
        <DiningSection
          language={language}
          currency={currency}
          onOpenTableReservation={() => setIsTableReservationOpen(true)}
          onShowCoffee3D={() => {
            const el = document.getElementById('3d-world');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Guided Safaris & Tour Packages Section */}
        <ToursSection
          language={language}
          currency={currency}
          onSelectTour={(tour) => setSelectedTour(tour)}
        />

        {/* WebGL 3D Resort Showcase Stage */}
        <Interactive3DSection language={language} />

        {/* Hotel Amenities & Facilities Section */}
        <AmenitiesSection language={language} />

        {/* Social Proof & Verified Reviews Section */}
        <ReviewsSection language={language} />

        {/* Contact & Map Section */}
        <ContactSection language={language} />
      </main>

      {/* Footer */}
      <Footer
        language={language}
        onOpenBooking={() => handleOpenBooking()}
        onOpenAiConcierge={() => setIsAiConciergeOpen(true)}
      />

      {/* Floating Widget 1: WhatsApp Button */}
      <a
        href={`https://wa.me/${HOTEL_INFO.whatsapp}?text=Hello%20Wubete%20Hotel%20Arba%20Minch`}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-40 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold p-3.5 rounded-full shadow-2xl transition-transform hover:scale-110 flex items-center justify-center group"
        title="Chat on WhatsApp"
      >
        <MessageSquare className="w-6 h-6" />
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-in-out text-xs font-black pl-0 group-hover:pl-2">
          WhatsApp Desk
        </span>
      </a>

      {/* Floating Widget 2: AI Concierge Assistant */}
      <button
        onClick={() => setIsAiConciergeOpen(true)}
        className="fixed bottom-6 left-6 z-40 bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-bold px-4 py-3 rounded-full shadow-2xl transition-transform hover:scale-105 flex items-center gap-2"
      >
        <Sparkles className="w-5 h-5 text-slate-950" />
        <span className="text-xs font-extrabold hidden sm:inline">Ask AI Concierge</span>
      </button>

      {/* Modals */}
      {isBookingOpen && (
        <BookingModal
          language={language}
          currency={currency}
          selectedRoom={selectedRoomForBooking}
          onClose={() => setIsBookingOpen(false)}
        />
      )}

      {isTableReservationOpen && (
        <TableReservationModal
          language={language}
          onClose={() => setIsTableReservationOpen(false)}
        />
      )}

      {isAiConciergeOpen && (
        <AiConciergeModal
          language={language}
          onClose={() => setIsAiConciergeOpen(false)}
          onOpenBooking={() => handleOpenBooking()}
        />
      )}

      {inspectedRoom && (
        <RoomInspectorModal
          language={language}
          currency={currency}
          room={inspectedRoom}
          onClose={() => setInspectedRoom(null)}
          onBookRoom={(room) => {
            setInspectedRoom(null);
            handleOpenBooking(room);
          }}
        />
      )}

      {selectedTour && (
        <TourInquiryModal
          language={language}
          currency={currency}
          tour={selectedTour}
          onClose={() => setSelectedTour(null)}
        />
      )}

    </div>
  );
}
