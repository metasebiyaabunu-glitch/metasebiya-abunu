import React, { useState } from 'react';
import { Language, Currency, Room } from '../../types';
import { Resort3DCanvas } from '../3d/Resort3DCanvas';
import { formatPrice } from '../../data/hotelData';
import { X, Sparkles, Maximize, Users, BedDouble, ShieldCheck, Check } from 'lucide-react';

interface RoomInspectorModalProps {
  language: Language;
  currency: Currency;
  room: Room;
  onClose: () => void;
  onBookRoom: (room: Room) => void;
}

export const RoomInspectorModal: React.FC<RoomInspectorModalProps> = ({
  language,
  currency,
  room,
  onClose,
  onBookRoom
}) => {
  const isAm = language === 'am';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2d241e]/80 backdrop-blur-md">
      <div className="bg-white border border-[#e8dcc4] w-full max-w-4xl rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.15)] overflow-hidden relative text-[#2d241e] flex flex-col my-6 max-h-[90vh]">
        
        {/* Header */}
        <div className="p-5 bg-[#faf7f2] border-b border-[#e8dcc4] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-[#c5a059]" />
            <div>
              <h3 className="font-serif font-bold text-lg text-[#5a4634]">
                {isAm ? room.nameAm : room.nameEn} - 3D Room Tour
              </h3>
              <p className="text-xs text-[#8b735b] font-medium">
                {isAm ? room.taglineAm : room.taglineEn}
              </p>
            </div>
          </div>

          <button onClick={onClose} className="p-1 rounded-full text-[#8b735b] hover:text-[#2d241e]">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 3D Canvas Body */}
        <div className="w-full h-[380px] relative bg-[#2d241e] shrink-0">
          <Resort3DCanvas mode="room" />
          <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md border border-[#e8dcc4] px-3 py-1.5 rounded-xl text-xs text-[#5a4634] font-bold shadow-xs">
            ✨ Interactive 3D Suite Inspector - Drag to orbit 360°
          </div>
        </div>

        {/* Room Features & CTA */}
        <div className="p-6 bg-white border-t border-[#e8dcc4] flex flex-col sm:flex-row items-center justify-between gap-6 overflow-y-auto">
          <div>
            <div className="flex items-center gap-4 text-xs text-[#5a4634] font-semibold mb-3">
              <span className="flex items-center gap-1">
                <Maximize className="w-3.5 h-3.5 text-[#c5a059]" />
                {room.sizeSqM} m²
              </span>
              <span className="flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-[#c5a059]" />
                {room.capacity}
              </span>
              <span className="flex items-center gap-1">
                <BedDouble className="w-3.5 h-3.5 text-[#c5a059]" />
                {isAm ? room.bedTypeAm : room.bedTypeEn}
              </span>
            </div>

            <p className="text-[#8b735b] text-xs max-w-xl font-medium">
              Includes private balcony, rainfall shower, fiber Wi-Fi, 24/7 power backup, and complimentary airport shuttle.
            </p>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <div className="text-right">
              <span className="text-[#8b735b] text-[10px] block uppercase font-bold">Direct Rate</span>
              <span className="text-[#c5a059] font-serif font-bold text-2xl">
                {formatPrice(room.priceETB, currency)}
              </span>
            </div>

            <button
              onClick={() => {
                onClose();
                onBookRoom(room);
              }}
              className="px-6 py-3.5 bg-[#c5a059] hover:bg-[#b48e42] text-white font-bold text-xs rounded-xl shadow-md uppercase tracking-widest transition-all"
            >
              Book Room Now
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
