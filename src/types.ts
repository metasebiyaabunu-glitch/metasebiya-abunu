export type Currency = 'ETB' | 'USD' | 'EUR';
export type Language = 'en' | 'am';

export type View3DMode = 'resort' | 'room' | 'coffee' | 'safari' | 'keycard';

export interface Room {
  id: string;
  nameEn: string;
  nameAm: string;
  taglineEn: string;
  taglineAm: string;
  priceETB: number;
  priceUSD: number;
  priceEUR: number;
  sizeSqM: number;
  capacity: string;
  bedTypeEn: string;
  bedTypeAm: string;
  image: string;
  secondaryImages: string[];
  featuresEn: string[];
  featuresAm: string[];
  amenities: string[];
  isPopular?: boolean;
  roomsLeft: number;
  modelType: 'standard' | 'deluxe' | 'suite' | 'villa';
}

export interface MenuItem {
  id: string;
  nameEn: string;
  nameAm: string;
  category: 'ethiopian' | 'fish' | 'international' | 'drinks' | 'coffee';
  descriptionEn: string;
  descriptionAm: string;
  priceETB: number;
  priceUSD: number;
  priceEUR: number;
  image: string;
  isSpicy?: boolean;
  isChefSpecial?: boolean;
  isVegetarian?: boolean;
}

export interface TourPackage {
  id: string;
  titleEn: string;
  titleAm: string;
  duration: string;
  location: string;
  priceETB: number;
  priceUSD: number;
  priceEUR: number;
  descriptionEn: string;
  descriptionAm: string;
  image: string;
  highlightsEn: string[];
  highlightsAm: string[];
  includedEn: string[];
  includedAm: string[];
}

export interface Review {
  id: string;
  author: string;
  origin: string;
  avatar: string;
  rating: number;
  date: string;
  source: 'TripAdvisor' | 'Google' | 'Booking.com';
  commentEn: string;
  commentAm: string;
  roomStayed: string;
}

export interface BookingFormData {
  room: Room | null;
  checkIn: string;
  checkOut: string;
  guests: number;
  guestName: string;
  email: string;
  phone: string;
  specialRequests: string;
  airportShuttle: boolean;
  paymentMethod: 'telebirr' | 'cbe' | 'awash' | 'card' | 'pay_at_hotel';
  currency: Currency;
}

export interface BookingDetails {
  id: string;
  roomName: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  checkIn: string;
  checkOut: string;
  guestsCount: number;
  totalPriceETB: number;
  paymentMethod: string;
  airportShuttle: boolean;
  flightNumber?: string;
}

export interface BookingDetails {
  id: string;
  roomName: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  checkIn: string;
  checkOut: string;
  guestsCount: number;
  totalPriceETB: number;
  paymentMethod: string;
  shuttleRequested: boolean;
  flightNumber?: string;
}

export interface BookingConfirmation {
  bookingId: string;
  guestName: string;
  roomName: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalAmount: number;
  currency: Currency;
  paymentMethod: string;
  qrCodeUrl: string;
  shuttleRequested: boolean;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  modelUsed?: string;
}
