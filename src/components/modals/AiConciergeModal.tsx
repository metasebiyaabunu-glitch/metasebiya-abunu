import React, { useState, useRef, useEffect } from 'react';
import { Language } from '../../types';
import { HOTEL_INFO, ROOMS, MENU_ITEMS, TOUR_PACKAGES } from '../../data/hotelData';
import { X, Sparkles, Send, Bot, User, Phone } from 'lucide-react';

interface AiConciergeModalProps {
  language: Language;
  onClose: () => void;
  onOpenBooking: () => void;
}

interface Message {
  sender: 'ai' | 'user';
  text: string;
}

export const AiConciergeModal: React.FC<AiConciergeModalProps> = ({
  language,
  onClose,
  onOpenBooking
}) => {
  const isAm = language === 'am';
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'ai',
      text: isAm
        ? "እንኳን ወደ ውበቴ ሆቴል አርባ ምንጭ የAI ረዳት በደህና መጡ! ስለ ክፍሎች፣ ስለ ኤርፖርት ትራንስፖርት፣ ስለ ጫሞ ሐይቅ የጀልባ ሳፋሪ ወይም ስለ ምግቦች ምን ማወቅ ይፈልጋሉ?"
        : "Welcome to Wubete Hotel Arba Minch AI Concierge! I can assist you with direct bookings, free airport pickup, Lake Chamo crocodile safaris, or restaurant recommendations. How can I help you today?"
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userText = input;
    setInput('');
    setMessages(prev => [...prev, { sender: 'user', text: userText }]);
    setLoading(true);

    try {
      const res = await fetch('/api/concierge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userText, language })
      });

      if (res.ok) {
        const data = await res.json();
        setMessages(prev => [...prev, { sender: 'ai', text: data.reply }]);
      } else {
        throw new Error('Fallback to local AI knowledge');
      }
    } catch {
      // Local fallback logic
      let reply = "";
      const lower = userText.toLowerCase();

      if (lower.includes('airport') || lower.includes('shuttle') || lower.includes('pickup') || lower.includes('ኤርፖርት')) {
        reply = isAm
          ? "በውበቴ ሆቴል ከወዲሁ ክፍል ሲይዙ ከሁለቱም ከአርባ ምንጭ ኤርፖርት (AMH) ነጻ የትራንስፖርት አገልግሎት እንሰጣለን። ሹፌራችን ስምዎ በተጻፈበት ሰሌዳ በአርባ ምንጭ ኤርፖርት ይጠብቅዎታል!"
          : "We provide 100% complimentary airport shuttle service from Arba Minch Airport (AMH). Our driver will meet you at the arrivals terminal with a personalized greeting sign!";
      } else if (lower.includes('room') || lower.includes('rate') || lower.includes('price') || lower.includes('ክፍል')) {
        reply = isAm
          ? `ክፍሎቻችን ከ ${ROOMS[0].priceETB} ETB ይጀምራሉ። ከእነዚህም የሮያል ቪላ፣ ፕሪሚየም ሐይቅ እይታ ስዊት እና ዴሉክስ ክፍሎች ይገኙበታል። በቀጥታ በድህረ ገጻችን ሲይዙ 15% ቅናሽ ያገኛሉ!`
          : `Our luxury suites start from ${ROOMS[0].priceETB} ETB per night. Every room features a private balcony overlooking Forty Springs and Lake Chamo with complimentary breakfast! Book direct here to save 15%.`;
      } else if (lower.includes('food') || lower.includes('beef') || lower.includes('fish') || lower.includes('kurt') || lower.includes('ምግብ')) {
        reply = isAm
          ? "በውበቴ ሆቴል የሚቀርበው ከጫሞ ሐይቅ ትኩስ አሳ፣ ልዩ የክትፎ እና የቁርጥ ሥጋ፣ እንዲሁም ባህላዊ የኢትዮጵያ ቡና በየቀኑ ከቀኑ 10፡00 ሰዓት ጀምሮ ይቀርባል።"
          : "Our Forty Springs Terrace Restaurant is famous for fresh Nile Perch & Tilapia fish caught daily from Lake Chamo, as well as gourmet raw beef Kitfo & Kurt! We also host a complimentary coffee ceremony every afternoon.";
      } else if (lower.includes('phone') || lower.includes('contact') || lower.includes('call') || lower.includes('ስልክ')) {
        reply = isAm
          ? `በቀጥታ በስልክ ቁጥር ${HOTEL_INFO.phoneDisplay} መደወል ወይም በWhatsApp ማወራት ይችላሉ። ሆቴላችን በአርባ ምንጭ ሽንጫ ሰፈር ይገኛል።`
          : `You can reach our front desk directly at ${HOTEL_INFO.phoneDisplay} or WhatsApp us at ${HOTEL_INFO.whatsapp}. We are located in Shecha neighborhood (Plus code: 2G6Q+RQ), Arba Minch.`;
      } else {
        reply = isAm
          ? "ውበቴ ሆቴል በአርባ ምንጭ ሽንጫ ሰፈር ይገኛል። ለተጨማሪ መረጃ ወይም ክፍል ለማስያዝ 093 057 1111 ይደውሉልን!"
          : "Wubete Hotel is located in Shecha, Arba Minch overlooking Lake Chamo & Forty Springs Reserve. You can book direct online or call us at 093 057 1111!";
      }

      setMessages(prev => [...prev, { sender: 'ai', text: reply }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2d241e]/80 backdrop-blur-md">
      <div className="bg-white border border-[#e8dcc4] w-full max-w-xl rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.15)] overflow-hidden relative text-[#2d241e] flex flex-col h-[580px]">
        
        {/* Header */}
        <div className="p-4 bg-[#faf7f2] border-b border-[#e8dcc4] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#c5a059] flex items-center justify-center text-white">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-base text-[#5a4634]">
                Wubete Hotel AI Concierge
              </h3>
              <p className="text-[10px] text-emerald-700 font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                <span>24/7 Virtual Assistant • Shecha, Arba Minch</span>
              </p>
            </div>
          </div>

          <button onClick={onClose} className="p-1 rounded-full text-[#8b735b] hover:text-[#2d241e]">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Action Chips */}
        <div className="px-4 py-2.5 bg-[#faf7f2] border-b border-[#e8dcc4] flex items-center gap-2 overflow-x-auto text-xs shrink-0">
          <button
            onClick={() => setInput('Tell me about free airport pickup')}
            className="px-3 py-1 rounded-full bg-white hover:bg-[#c5a059] hover:text-white text-[#5a4634] border border-[#e8dcc4] shrink-0 font-bold transition-colors shadow-xs"
          >
            ✈️ Free Airport Pickup
          </button>
          <button
            onClick={() => setInput('What are the room rates?')}
            className="px-3 py-1 rounded-full bg-white hover:bg-[#c5a059] hover:text-white text-[#5a4634] border border-[#e8dcc4] shrink-0 font-bold transition-colors shadow-xs"
          >
            🛏️ Room Rates & Discount
          </button>
          <button
            onClick={() => setInput('How to book Lake Chamo boat tour?')}
            className="px-3 py-1 rounded-full bg-white hover:bg-[#c5a059] hover:text-white text-[#5a4634] border border-[#e8dcc4] shrink-0 font-bold transition-colors shadow-xs"
          >
            🐊 Crocodile Safari
          </button>
        </div>

        {/* Message History */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex gap-2.5 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {m.sender === 'ai' && (
                <div className="w-7 h-7 rounded-lg bg-[#faf7f2] border border-[#e8dcc4] text-[#c5a059] flex items-center justify-center shrink-0 mt-0.5">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-[80%] p-3.5 rounded-2xl leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-[#c5a059] text-white font-medium rounded-tr-none shadow-xs'
                    : 'bg-[#faf7f2] border border-[#e8dcc4] text-[#2d241e] font-medium rounded-tl-none'
                }`}
              >
                {m.text}
              </div>

              {m.sender === 'user' && (
                <div className="w-7 h-7 rounded-lg bg-[#5a4634] text-white flex items-center justify-center shrink-0 mt-0.5">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2 text-[#8b735b] text-xs font-medium italic">
              <Sparkles className="w-4 h-4 animate-spin text-[#c5a059]" />
              <span>AI Concierge is typing...</span>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Direct CTA Footer inside Chat */}
        <div className="px-4 py-2.5 bg-[#faf7f2] border-t border-[#e8dcc4] flex items-center justify-between text-xs font-medium">
          <span className="text-[#8b735b]">Ready to stay with us?</span>
          <button
            onClick={() => {
              onClose();
              onOpenBooking();
            }}
            className="px-3 py-1 bg-[#c5a059] hover:bg-[#b48e42] text-white font-bold rounded-lg text-[11px] uppercase tracking-wider"
          >
            Book Direct (-15%)
          </button>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSend} className="p-3 bg-white border-t border-[#e8dcc4] flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={isAm ? "ጥያቄዎን እዚህ ይጻፉ..." : "Ask AI Concierge anything..."}
            className="flex-1 bg-[#faf7f2] border border-[#e8dcc4] focus:border-[#c5a059] text-[#2d241e] text-xs font-medium rounded-xl p-3 focus:outline-none"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-10 h-10 rounded-xl bg-[#c5a059] hover:bg-[#b48e42] text-white font-bold flex items-center justify-center shrink-0 shadow-xs"
          >
            <Send className="w-4 h-4 text-white" />
          </button>
        </form>

      </div>
    </div>
  );
};
