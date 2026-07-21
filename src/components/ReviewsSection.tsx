import React from 'react';
import { Language } from '../types';
import { REVIEWS, HOTEL_INFO } from '../data/hotelData';
import { Star, ShieldCheck, ThumbsUp, MapPin } from 'lucide-react';

interface ReviewsSectionProps {
  language: Language;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({ language }) => {
  const isAm = language === 'am';

  return (
    <section id="reviews" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#faf7f2] text-[#2d241e] relative border-t border-[#e8dcc4]">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#e8dcc4] text-[#c5a059] text-xs font-bold uppercase tracking-widest mb-3 shadow-xs">
            <Star className="w-3.5 h-3.5 text-[#c5a059] fill-[#c5a059]" />
            <span>{isAm ? "የእንግዶች ግምገማዎች" : "Verified Guest Reviews & Social Proof"}</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#5a4634] mb-4">
            {isAm ? "በGoogle እና TripAdvisor ከፍተኛ ደረጃ ያገኘ ሆቴል" : "Loved by Travelers in Arba Minch"}
          </h2>
          <p className="text-[#8b735b] text-sm sm:text-base font-medium">
            {isAm
              ? "በመቶዎች ከሚቆጠሩ ሀገር ውስጥ እና ዓለም አቀፍ ተጓዦች የተሰጡ እውነተኛ ግምገማዎች።"
              : "Read authentic feedback from regulars and visitors on Google Reviews & TripAdvisor."}
          </p>
        </div>

        {/* Live Ratings Aggregator Bar */}
        <div className="mb-12 p-6 rounded-3xl bg-white border border-[#e8dcc4] shadow-sm grid grid-cols-1 md:grid-cols-3 gap-6 text-center items-center">
          
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-1 text-[#c5a059] font-serif font-bold text-3xl mb-1">
              <span>{HOTEL_INFO.googleRating}</span>
              <span className="text-sm font-normal text-[#8b735b]">/ 5.0</span>
            </div>
            <div className="flex items-center gap-1 text-[#c5a059] mb-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-[#c5a059]" />
              ))}
            </div>
            <span className="text-[#5a4634] text-xs font-bold">
              Google Maps ({HOTEL_INFO.googleReviewsCount} {isAm ? "ግምገማዎች" : "reviews"})
            </span>
          </div>

          <div className="flex flex-col items-center border-y md:border-y-0 md:border-x border-[#e8dcc4] py-4 md:py-0">
            <div className="flex items-center gap-1 text-emerald-600 font-serif font-bold text-3xl mb-1">
              <span>{HOTEL_INFO.tripAdvisorRating}</span>
              <span className="text-sm font-normal text-[#8b735b]">/ 5.0</span>
            </div>
            <div className="flex items-center gap-1 text-emerald-600 mb-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-emerald-600" />
              ))}
            </div>
            <span className="text-[#5a4634] text-xs font-bold">
              TripAdvisor Certificate of Excellence
            </span>
          </div>

          <div className="flex flex-col items-center">
            <div className="flex items-center gap-1 text-[#c5a059] font-serif font-bold text-3xl mb-1">
              <span>98%</span>
            </div>
            <span className="text-[#5a4634] text-xs font-bold">
              {isAm ? "ለሌሎች ተጓዦች የሚመክሩት" : "Would Recommend to Friends"}
            </span>
            <span className="text-emerald-600 text-[11px] font-bold mt-0.5">
              ✓ {isAm ? "በሽንጫ ሰፈር ውስጥ የሚገኝ" : "In Shecha Neighborhood"}
            </span>
          </div>

        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="bg-white border border-[#e8dcc4] hover:border-[#c5a059] p-6 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_15px_40px_rgba(90,40,0,0.08)] transition-all flex flex-col justify-between gap-4"
            >
              <div>
                {/* Author Info */}
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src={rev.avatar}
                    alt={rev.author}
                    className="w-12 h-12 rounded-full object-cover border-2 border-[#e8dcc4]"
                  />
                  <div>
                    <h4 className="font-serif font-bold text-base text-[#5a4634]">{rev.author}</h4>
                    <span className="text-[#8b735b] text-xs flex items-center gap-1 font-medium">
                      <MapPin className="w-3 h-3 text-[#c5a059]" />
                      <span>{rev.origin}</span>
                    </span>
                  </div>
                </div>

                {/* Rating Stars & Source */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-0.5 text-[#c5a059]">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#c5a059]" />
                    ))}
                  </div>
                  <span className="text-[11px] font-bold text-[#8b735b] bg-[#faf7f2] px-2.5 py-1 rounded border border-[#e8dcc4]">
                    via {rev.source}
                  </span>
                </div>

                {/* Comment */}
                <p className="text-[#5a4634] text-xs sm:text-sm leading-relaxed italic font-medium">
                  "{isAm ? rev.commentAm : rev.commentEn}"
                </p>
              </div>

              {/* Room Stayed Footer */}
              <div className="pt-3 border-t border-[#e8dcc4] flex items-center justify-between text-[11px] text-[#c5a059] font-bold">
                <span>Stayed: {rev.roomStayed}</span>
                <span className="text-[#8b735b]">{rev.date}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
