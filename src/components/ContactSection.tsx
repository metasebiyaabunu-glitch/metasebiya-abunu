import React, { useState } from 'react';
import { Language } from '../types';
import { HOTEL_INFO } from '../data/hotelData';
import { Phone, Mail, MapPin, Globe, MessageSquare, Send, CheckCircle2, Clock } from 'lucide-react';

interface ContactSectionProps {
  language: Language;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ language }) => {
  const isAm = language === 'am';
  const [formSent, setFormSent] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: 'Room Inquiry',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSent(true);
  };

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#fdfaf6] text-[#2d241e] relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#e8dcc4] text-[#c5a059] text-xs font-bold uppercase tracking-widest mb-3 shadow-xs">
            <MapPin className="w-3.5 h-3.5" />
            <span>{isAm ? "አድራሻ እና መገኛ" : "Location & Contact Information"}</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#5a4634] mb-4">
            {isAm ? "ውበቴ ሆቴል አርባ ምንጭ ሽንጫ" : "Visit Us in Arba Minch Shecha"}
          </h2>
          <p className="text-[#8b735b] text-sm sm:text-base font-medium">
            {isAm
              ? "በቀጥታ በስልክ፣ በWhatsApp ወይም በድህረ ገጻችን ያነጋግሩን። የነጻ ኤርፖርት ትራንስፖርት አገልግሎት ተዘጋጅቷል።"
              : "Call us directly at 093 057 1111, chat via WhatsApp, or send a direct inquiry."}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Contacts & Embedded Map */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#e8dcc4] shadow-sm flex flex-col gap-4">
              <h3 className="font-serif font-bold text-xl text-[#5a4634] pb-2 border-b border-[#e8dcc4]">
                {isAm ? "የሆቴሉ አድራሻዎች" : "Property Contact Details"}
              </h3>

              {/* Phone */}
              <a
                href={`tel:${HOTEL_INFO.phone}`}
                className="flex items-center gap-3 p-3 rounded-2xl bg-[#faf7f2] border border-[#e8dcc4] hover:border-[#c5a059] transition-colors group"
              >
                <div className="w-10 h-10 rounded-xl bg-white border border-[#e8dcc4] text-[#c5a059] flex items-center justify-center shrink-0 group-hover:bg-[#c5a059] group-hover:text-white transition-colors">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] text-[#8b735b] uppercase font-bold tracking-widest block">
                    {isAm ? "ስልክ ቁጥር" : "Direct Phone"}
                  </span>
                  <span className="text-[#5a4634] font-serif font-bold text-base">{HOTEL_INFO.phoneDisplay}</span>
                </div>
              </a>

              {/* WhatsApp */}
              <a
                href={`https://wa.me/${HOTEL_INFO.whatsapp}?text=Hello%20Wubete%20Hotel%20Arba%20Minch`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 p-3 rounded-2xl bg-[#faf7f2] border border-[#e8dcc4] hover:border-emerald-600 transition-colors group"
              >
                <div className="w-10 h-10 rounded-xl bg-white border border-[#e8dcc4] text-emerald-600 flex items-center justify-center shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] text-[#8b735b] uppercase font-bold tracking-widest block">
                    WhatsApp Chat (Instant Response)
                  </span>
                  <span className="text-emerald-700 font-bold text-sm">+251 93 057 1111</span>
                </div>
              </a>

              {/* Address */}
              <div className="flex items-center gap-3 p-3 rounded-2xl bg-[#faf7f2] border border-[#e8dcc4]">
                <div className="w-10 h-10 rounded-xl bg-white border border-[#e8dcc4] text-[#c5a059] flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] text-[#8b735b] uppercase font-bold tracking-widest block">
                    {isAm ? "አድራሻ" : "Neighborhood & Plus Code"}
                  </span>
                  <span className="text-[#5a4634] text-xs font-semibold">{HOTEL_INFO.addressEn}</span>
                </div>
              </div>

              {/* Website */}
              <div className="flex items-center gap-3 p-3 rounded-2xl bg-[#faf7f2] border border-[#e8dcc4]">
                <div className="w-10 h-10 rounded-xl bg-white border border-[#e8dcc4] text-[#c5a059] flex items-center justify-center shrink-0">
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] text-[#8b735b] uppercase font-bold tracking-widest block">
                    Official Website
                  </span>
                  <span className="text-[#c5a059] text-xs font-bold">{HOTEL_INFO.website}</span>
                </div>
              </div>
            </div>

            {/* Embedded Map Visual */}
            <div className="rounded-3xl overflow-hidden border border-[#e8dcc4] shadow-sm flex flex-col bg-white">
              <div className="h-56 relative w-full">
                <iframe
                  title="Wubete Hotel Arba Minch Location Map"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=37.5200%2C6.0100%2C37.5800%2C6.0600&amp;layer=mapnik&amp;marker=6.0333%2C37.5500"
                  className="w-full h-full border-0 filter contrast-105 hover:contrast-120 transition-all duration-500"
                />
                <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl border border-[#e8dcc4] text-[11px] text-[#5a4634] font-bold shadow-xs">
                  📍 Shecha Neighborhood • 2G6Q+RQ Arba Minch
                </div>
              </div>

              {/* Direct Google Maps External Links Bar */}
              <div className="p-3 bg-[#faf7f2] border-t border-[#e8dcc4] flex flex-wrap items-center justify-between gap-2 text-xs">
                <a
                  href={HOTEL_INFO.mapsPhotoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-[#5a4634] hover:text-[#c5a059] font-bold transition-colors"
                >
                  <Globe className="w-3.5 h-3.5 text-[#c5a059]" />
                  <span>Google Maps Photo 1</span>
                </a>
                <a
                  href={HOTEL_INFO.mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-[#5a4634] hover:text-[#c5a059] font-bold transition-colors"
                >
                  <MapPin className="w-3.5 h-3.5 text-[#c5a059]" />
                  <span>Google Maps Photo 2</span>
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Contact Inquiry Form */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-[#e8dcc4] shadow-[0_10px_30px_rgba(0,0,0,0.03)]">
            <h3 className="font-serif font-bold text-2xl text-[#5a4634] mb-2">
              {isAm ? "የቀጥታ ጥያቄ ይላኩ" : "Send a Direct Inquiry"}
            </h3>
            <p className="text-[#8b735b] text-xs sm:text-sm mb-6 font-medium">
              {isAm
                ? "ስለ ክፍሎች፣ ስለ ኤርፖርት ትራንስፖርት ወይም ስለ ቱር ጉዞዎች ጥያቄ ካለዎት ይጻፉልን።"
                : "Need custom event arrangements, safari packages, or catering inquiries? Drop us a message below."}
            </p>

            {formSent ? (
              <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex flex-col items-center text-center gap-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600" />
                <h4 className="font-serif font-bold text-xl">
                  {isAm ? "ጥያቄዎ በስኬት ተልኳል!" : "Inquiry Sent Successfully!"}
                </h4>
                <p className="text-xs text-emerald-800 font-medium">
                  {isAm
                    ? "የውበቴ ሆቴል አስተናጋጆች በጥቂት ደቂቃዎች ውስጥ በስልክ ወይም በኢሜይል ያነጋግሩዎታል።"
                    : "Our reception desk in Shecha, Arba Minch will reach out to you within minutes."}
                </p>
                <button
                  onClick={() => setFormSent(false)}
                  className="mt-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs uppercase tracking-widest"
                >
                  {isAm ? "ሌላ መልእክት ይላኩ" : "Send Another Message"}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] font-bold text-[#8b735b] uppercase tracking-widest block mb-1">
                      {isAm ? "ሙሉ ስም" : "Your Name"}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Lukas / Dawit"
                      className="w-full bg-[#faf7f2] border border-[#e8dcc4] focus:border-[#c5a059] text-[#2d241e] text-xs font-medium rounded-xl p-3 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-[#8b735b] uppercase tracking-widest block mb-1">
                      {isAm ? "ስልክ ቁጥር" : "Phone / Mobile"}
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. 0911002233"
                      className="w-full bg-[#faf7f2] border border-[#e8dcc4] focus:border-[#c5a059] text-[#2d241e] text-xs font-medium rounded-xl p-3 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-[#8b735b] uppercase tracking-widest block mb-1">
                    {isAm ? "ኢሜይል" : "Email Address"}
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="guest@example.com"
                    className="w-full bg-[#faf7f2] border border-[#e8dcc4] focus:border-[#c5a059] text-[#2d241e] text-xs font-medium rounded-xl p-3 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-[#8b735b] uppercase tracking-widest block mb-1">
                    {isAm ? "መልእክት" : "Your Message / Special Requests"}
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your stay dates, airport shuttle details, or event plans..."
                    className="w-full bg-[#faf7f2] border border-[#e8dcc4] focus:border-[#c5a059] text-[#2d241e] text-xs font-medium rounded-xl p-3 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#c5a059] hover:bg-[#b48e42] text-white font-bold text-xs uppercase tracking-widest rounded-xl shadow-md flex items-center justify-center gap-2 transition-all"
                >
                  <Send className="w-4 h-4 text-white" />
                  <span>{isAm ? "መልእክቱን ይላኩ" : "SUBMIT INQUIRY"}</span>
                </button>
              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
