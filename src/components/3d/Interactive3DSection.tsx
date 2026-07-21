import React, { useState } from 'react';
import { Language, View3DMode } from '../../types';
import { Resort3DCanvas } from './Resort3DCanvas';
import { Sparkles, Eye, Coffee, Compass, Key, RotateCcw } from 'lucide-react';

interface Interactive3DSectionProps {
  language: Language;
}

export const Interactive3DSection: React.FC<Interactive3DSectionProps> = ({ language }) => {
  const isAm = language === 'am';
  const [active3dMode, setActive3dMode] = useState<View3DMode>('resort');

  return (
    <section id="3d-world" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#fdfaf6] text-[#2d241e] border-t border-[#e8dcc4]">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#e8dcc4] text-[#c5a059] text-xs font-bold uppercase tracking-widest mb-3 shadow-xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isAm ? "3D ኢንተራክቲቭ ዓለም" : "3D Interactive Resort Experience"}</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#5a4634] mb-4">
            {isAm ? "የውበቴ ሆቴልን በ3D ቅርፅ በሁሉም አቅጣጫ ይመልከቱ" : "Inspect Wubete Hotel in Full Interactive 3D"}
          </h2>
          <p className="text-[#8b735b] text-sm sm:text-base font-medium">
            {isAm
              ? "የ3D ሪዞርት እይታን፣ የክፍሎች የ3D ቅኝትን፣ የቡና ፍች ሥነ-ሥርዓትን እና የጫሞ ሐይቅ የጀልባ ሳፋሪን በ3D ያግኙ።"
              : "Orbit, zoom, and inspect our property, luxury guest suites, coffee ceremony jebena, and Lake Chamo crocodile boat in real-time WebGL 3D."}
          </p>
        </div>

        {/* 3D View Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          <button
            onClick={() => setActive3dMode('resort')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all flex items-center gap-2 ${
              active3dMode === 'resort'
                ? 'bg-[#5a4634] text-white shadow-md'
                : 'bg-white border border-[#e8dcc4] text-[#8b735b] hover:text-[#5a4634]'
            }`}
          >
            <Eye className="w-4 h-4 text-[#c5a059]" />
            <span>{isAm ? "3D የሪዞርት እይታ" : "3D Resort Panorama"}</span>
          </button>

          <button
            onClick={() => setActive3dMode('room')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all flex items-center gap-2 ${
              active3dMode === 'room'
                ? 'bg-[#5a4634] text-white shadow-md'
                : 'bg-white border border-[#e8dcc4] text-[#8b735b] hover:text-[#5a4634]'
            }`}
          >
            <Sparkles className="w-4 h-4 text-[#c5a059]" />
            <span>{isAm ? "3D የክፍል ቅኝት" : "3D Suite Inspector"}</span>
          </button>

          <button
            onClick={() => setActive3dMode('coffee')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all flex items-center gap-2 ${
              active3dMode === 'coffee'
                ? 'bg-[#5a4634] text-white shadow-md'
                : 'bg-white border border-[#e8dcc4] text-[#8b735b] hover:text-[#5a4634]'
            }`}
          >
            <Coffee className="w-4 h-4 text-[#c5a059]" />
            <span>{isAm ? "3D የቡና ፍች" : "3D Coffee Ceremony"}</span>
          </button>

          <button
            onClick={() => setActive3dMode('safari')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all flex items-center gap-2 ${
              active3dMode === 'safari'
                ? 'bg-[#5a4634] text-white shadow-md'
                : 'bg-white border border-[#e8dcc4] text-[#8b735b] hover:text-[#5a4634]'
            }`}
          >
            <Compass className="w-4 h-4 text-[#c5a059]" />
            <span>{isAm ? "3D የጫሞ ሳፋሪ" : "3D Crocodile Safari"}</span>
          </button>

          <button
            onClick={() => setActive3dMode('keycard')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all flex items-center gap-2 ${
              active3dMode === 'keycard'
                ? 'bg-[#5a4634] text-white shadow-md'
                : 'bg-white border border-[#e8dcc4] text-[#8b735b] hover:text-[#5a4634]'
            }`}
          >
            <Key className="w-4 h-4 text-[#c5a059]" />
            <span>{isAm ? "3D VIP የክፍል ቁልፍ" : "3D VIP Keycard"}</span>
          </button>
        </div>

        {/* 3D Canvas Stage */}
        <div className="w-full h-[520px] rounded-3xl overflow-hidden border-4 border-white shadow-[0_30px_70px_rgba(90,40,0,0.12)] relative bg-white">
          <Resort3DCanvas mode={active3dMode} onModeChange={setActive3dMode} />
        </div>

        {/* Feature Explanation Footer Bar */}
        <div className="mt-6 text-center text-xs text-[#8b735b] font-medium flex items-center justify-center gap-2">
          <RotateCcw className="w-3.5 h-3.5 text-[#c5a059]" />
          <span>
            {isAm
              ? "ማሳሰቢያ፡ በስክሪኑ ላይ በመጎተት የ3D ምስሉን በ360 ዲግሪ ማዞር ይችላሉ።"
              : "Tip: Drag on screen to rotate 3D view 360°, scroll to zoom in/out."}
          </span>
        </div>

      </div>
    </section>
  );
};
