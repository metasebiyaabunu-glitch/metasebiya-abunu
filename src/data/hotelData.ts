import { Room, MenuItem, TourPackage, Review } from '../types';

export const HOTEL_INFO = {
  nameEn: "Wubete Hotel Arba Minch",
  nameAm: "ውበቴ ሆቴል አርባ ምንጭ",
  taglineEn: "Comfortable Lodge in Shecha Neighborhood Overlooking Forty Springs & Lake Chamo",
  taglineAm: "በሽንጫ አርባ ምንጭ የተገነባ ምቹ እና ውብ ሆቴል",
  phone: "+251 93 057 1111",
  phoneDisplay: "093 057 1111",
  whatsapp: "+251930571111",
  email: "info@wubetehotel.com",
  website: "wubetehotel.com",
  mapsUrl: "https://maps.app.goo.gl/MYjWVHXdo7h8EoQd9",
  mapsPhotoUrl: "https://maps.app.goo.gl/Pn9m2Ui24qdtGfaSA",
  addressEn: "Shecha Neighborhood (Plus Code: 2G6Q+RQ), Arba Minch, Ethiopia",
  addressAm: "ሽንጫ ሰፈር (2G6Q+RQ)፣ አርባ ምንጭ፣ ኢትዮጵያ",
  neighborhood: "Shecha (Good for visitors • 2.9/3.0)",
  distanceAirport: "10 km from Arba Minch Airport (AMH) - 15 mins free shuttle",
  googleRating: 4.3,
  googleReviewsCount: 138,
  tripAdvisorRating: 4.6,
  tripAdvisorReviewsCount: 22,
};

export const EXCHANGE_RATES = {
  ETB: 1,
  USD: 0.0083, // 1 ETB = ~0.0083 USD (or ~120 ETB per USD)
  EUR: 0.0076, // 1 ETB = ~0.0076 EUR (or ~130 ETB per EUR)
};

export function formatPrice(amountETB: number, currency: 'ETB' | 'USD' | 'EUR'): string {
  if (currency === 'USD') {
    const usd = Math.round(amountETB * EXCHANGE_RATES.USD);
    return `$${usd}`;
  }
  if (currency === 'EUR') {
    const eur = Math.round(amountETB * EXCHANGE_RATES.EUR);
    return `€${eur}`;
  }
  return `${amountETB.toLocaleString()} ETB`;
}

export const ROOMS: Room[] = [
  {
    id: "std-panoramic",
    nameEn: "Standard Panoramic Room",
    nameAm: "ስታንዳርድ ፓኖራሚክ ክፍል",
    taglineEn: "Serene mountain views with private balcony and modern amenities",
    taglineAm: "የተረጋጋ የደጋ እይታ ያለው የግል ባልኮኒ ያለው ንጹህ ክፍል",
    priceETB: 4500,
    priceUSD: 38,
    priceEUR: 35,
    sizeSqM: 32,
    capacity: "2 Guests",
    bedTypeEn: "1 King Bed or 2 Twin Beds",
    bedTypeAm: "1 ትልቅ አልጋ ወይም 2 መንታ አልጋዎች",
    image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1200&q=80",
    secondaryImages: [
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80"
    ],
    featuresEn: ["Balcony View", "High-Speed Wi-Fi", "Rainfall Shower", "Free Airport Shuttle", "Complimentary Breakfast"],
    featuresAm: ["የባልኮኒ እይታ", "ፈጣን ዋይፋይ", "የዝናብ ሻወር", "ነጻ የኤርፖርት ትራንስፖርት", "ነጻ ቁርስ"],
    amenities: ["Free Wi-Fi", "Air Conditioning", "Flat Screen TV", "Mini Fridge", "Work Desk", "Coffee Maker", "Safety Box"],
    roomsLeft: 3,
    modelType: "standard"
  },
  {
    id: "dlx-riftvalley",
    nameEn: "Deluxe Rift-Valley Suite",
    nameAm: "ዲሉክስ ሪፍት ቫሊ ስዊት",
    taglineEn: "Panoramic balcony overlooking Forty Springs forest and Lake Chamo",
    taglineAm: "በአርባ ምንጮች ደን እና በጫሞ ሐይቅ ላይ የተከፈተ ፓኖራሚክ ባልኮኒ",
    priceETB: 7500,
    priceUSD: 63,
    priceEUR: 58,
    sizeSqM: 48,
    capacity: "2-3 Guests",
    bedTypeEn: "1 Super King Bed + Sofa Bed",
    bedTypeAm: "1 ትልቅ ሱፐር ኪንግ አልጋ + ሶፋ",
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80",
    secondaryImages: [
      "https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=800&q=80"
    ],
    featuresEn: ["Lake Chamo Sunset View", "Jacuzzi Bathtub", "Private Coffee Station", "Express Check-in", "Free Coffee Ceremony Voucher"],
    featuresAm: ["የጫሞ ሐይቅ የፀሐይ ግብአት እይታ", "ጃኩዚ መታጠቢያ", "የግል ቡና ጣቢያ", "ፈጣን ቼክ-ኢን", "የነጻ ቡና ፍች ቫውቸር"],
    amenities: ["Lake View Balcony", "Jacuzzi Tub", "55' Smart TV", "Mini Bar", "Espresso Machine", "Bathrobes & Slippers", "24/7 Room Service"],
    isPopular: true,
    roomsLeft: 2,
    modelType: "deluxe"
  },
  {
    id: "exec-lakeview",
    nameEn: "Executive Twin-Lakes Suite",
    nameAm: "ኤክስኪዩቲቭ ሁለት ሐይቆች ስዊት",
    taglineEn: "180° uninterrupted view of Bridge of God (Lake Abaya & Lake Chamo)",
    taglineAm: "የእግዚአብሔር ድልድይ (አባያ እና ጫሞ ሐይቆች) 180 ዲግሪ ድንቅ እይታ",
    priceETB: 12000,
    priceUSD: 100,
    priceEUR: 92,
    sizeSqM: 68,
    capacity: "3 Guests",
    bedTypeEn: "1 Royal Emperor Bed + Living Area",
    bedTypeAm: "1 ሮያል አልጋ + ሰፊ የሳሎን ክፍል",
    image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80",
    secondaryImages: [
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=800&q=80"
    ],
    featuresEn: ["180° Bridge of God Panorama", "Dedicated Butler Service", "Private Dining Terrace", "Free Boat Tour Transfer", "VIP Airport Pickup"],
    featuresAm: ["180 ዲግሪ የሐይቆች ፓኖራማ", "የግል አስተናጋጅ አገልግሎት", "የግል የመመገቢያ ቴራስ", "የነጻ የሐይቅ ጀልባ ትራንስፖርት", "VIP ኤርፖርት መቀበያ"],
    amenities: ["Panoramic Terrace", "Living Room Lounge", "Luxury Marble Bath", "Walk-in Closet", "Welcome Tej & Fruit Basket", "Premium Sound System"],
    roomsLeft: 1,
    modelType: "suite"
  },
  {
    id: "royal-villa",
    nameEn: "Royal Arba Minch Villa",
    nameAm: "ሮያል አርባ ምንጭ ቪላ",
    taglineEn: "Private infinity plunge pool, 2 master bedrooms, and personal chef",
    taglineAm: "የግል ኢንፊኒቲ ፑል፣ 2 ዋና የመኝታ ክፍሎች እና የግል ምግብ አዘጋጅ",
    priceETB: 22000,
    priceUSD: 180,
    priceEUR: 165,
    sizeSqM: 110,
    capacity: "4-6 Guests",
    bedTypeEn: "2 King Master Bedrooms + Dining Villa",
    bedTypeAm: "2 ኪንግ የመኝታ ክፍሎች + የመመገቢያ ቪላ",
    image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=80",
    secondaryImages: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80"
    ],
    featuresEn: ["Private Heated Infinity Pool", "2 Master Bedrooms", "Private Chef on Request", "Traditional Coffee Lounge Setup", "Unmatched Privacy"],
    featuresAm: ["የግል ኢንፊኒቲ መዋኛ ገንዳ", "2 ማስተር የመኝታ ክፍሎች", "የግል ሼፍ በጥያቄ", "የተዘጋጀ የቡና ማፍያ ስፍራ", "ከፍተኛ ምስጢራዊነት"],
    amenities: ["Private Pool", "2 Master Suites", "Full Kitchenette", "Gourmet Dining Table", "Chauffeur Service", "Private Sun Deck"],
    roomsLeft: 1,
    modelType: "villa"
  }
];

export const MENU_ITEMS: MenuItem[] = [
  {
    id: "m-chamo-fish",
    nameEn: "Signature Arba Minch Fish Cutlet",
    nameAm: "የአርባ ምንጭ ጫሞ አሳ ኩትሌት",
    category: "fish",
    descriptionEn: "Freshly caught Nile Perch or Tilapia from Lake Chamo, seasoned with Gamo herbs, pan-fried to golden perfection served with spiced rice & avocado salad.",
    descriptionAm: "ከጫሞ ሐይቅ የተያዘ ትኩስ አሳ በጋሞ ቅመሞች ተዘጋጅቶ በቅመም ሩዝ እና አቮካዶ ሰላጣ የቀረበ።",
    priceETB: 850,
    priceUSD: 7,
    priceEUR: 6.5,
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=800&q=80",
    isChefSpecial: true
  },
  {
    id: "m-kitfo",
    nameEn: "Special Gurage & Gamo Kitfo",
    nameAm: "ልዩ የጉራጌ እና ጋሞ ክትፎ",
    category: "ethiopian",
    descriptionEn: "Finely minced lean prime beef seasoned with clarified Niter Kibbeh (spiced butter) and Mitmita, served with Ayib (cottage cheese), Gomen (collard greens), and fresh Injera & Kocho.",
    descriptionAm: "በንጹህ ቅቤ እና ሚጥሚጣ የተለወሰ ክትፎ ከአይብ፣ ጎመን፣ እንጀራ እና ቆጮ ጋር የቀረበ።",
    priceETB: 1100,
    priceUSD: 9,
    priceEUR: 8.5,
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
    isChefSpecial: true,
    isSpicy: true
  },
  {
    id: "m-doro-wat",
    nameEn: "Traditional Doro Wat",
    nameAm: "ባህላዊ የዶሮ ወጥ",
    category: "ethiopian",
    descriptionEn: "Ethiopia's iconic slow-cooked chicken stew in rich Berbere sauce with boiled hard eggs and house-baked Injera.",
    descriptionAm: "በበርበሬ ወጥ በዝግታ የበሰለ የዶሮ ሥጋ ከእንቁላል እና እንጀራ ጋር።",
    priceETB: 1250,
    priceUSD: 10,
    priceEUR: 9.5,
    image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=800&q=80",
    isSpicy: true
  },
  {
    id: "m-beyaynetu",
    nameEn: "Royal Vegan Beyaynetu Platter",
    nameAm: "የጾም የቤት በያይነቱ",
    category: "ethiopian",
    descriptionEn: "Colorful assortment of Misir Wat (spiced lentils), Kik Alicha (yellow split peas), Shiro, Shiro Bozena, Gomen, and Beetroot salad over freshly poured Injera.",
    descriptionAm: "ልዩ ልዩ የጾም ወጦች - ምስር፣ ክክ፣ ሽሮ፣ ጎመን፣ ቀይ ስር በነጻ እንጀራ።",
    priceETB: 700,
    priceUSD: 6,
    priceEUR: 5.5,
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80",
    isVegetarian: true
  },
  {
    id: "m-coffee-ceremony",
    nameEn: "Wubete Traditional Coffee Ceremony",
    nameAm: "የውበቴ ባህላዊ የቡና ፍች ሥነ-ሥርዓት",
    category: "coffee",
    descriptionEn: "Authentic Ethiopian coffee ritual: green Yirgacheffe/Sidama beans roasted live before your eyes over burning frankincense incense, served in traditional clay Jebena with popcorn & Kolo.",
    descriptionAm: "በፊትዎ የሚቆላ የይርጋጨፌ ቡና በዕጣን ጭስ ታጅቦ በጀበና እና ሲኒ ከፈንድሻ እና ቆሎ ጋር።",
    priceETB: 450,
    priceUSD: 4,
    priceEUR: 3.5,
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80",
    isChefSpecial: true
  },
  {
    id: "m-layered-juice",
    nameEn: "Fresh Arba Minch Layered Fruit Spris",
    nameAm: "የአርባ ምንጭ ትኩስ ስፕሪስ ጭማቂ",
    category: "drinks",
    descriptionEn: "Famous local layered smoothie featuring fresh Arba Minch Mango, Avocado, Papaya, and Guava with a drizzle of honey & lime.",
    descriptionAm: "ከአርባ ምንጭ ትኩስ አቮካዶ፣ ማንጎ፣ ፓፓያ እና ዘይቱን የተዘጋጀ የተደራረበ ስፕሪስ።",
    priceETB: 350,
    priceUSD: 3,
    priceEUR: 2.5,
    image: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=800&q=80",
    isVegetarian: true
  },
  {
    id: "m-tej",
    nameEn: "Golden Gamo Honey Tej",
    nameAm: "የጋሞ ንጹህ የማር ጠጅ",
    category: "drinks",
    descriptionEn: "Traditional Ethiopian honey wine fermented with Gesho hops, smooth sweet flavor served in classic Berele flask.",
    descriptionAm: "ከንጹህ ማር እና ጌሾ የተቀመመ ባህላዊ ጠጅ በበረሌ የቀረበ።",
    priceETB: 500,
    priceUSD: 4.2,
    priceEUR: 3.8,
    image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80"
  }
];

export const TOUR_PACKAGES: TourPackage[] = [
  {
    id: "tour-chamo-safari",
    titleEn: "Lake Chamo Crocodile Market & Hippo Boat Safari",
    titleAm: "የጫሞ ሐይቅ የዓዞ ገበያ እና ጉማሬ ጀልባ ሳፋሪ",
    duration: "3 - 4 Hours",
    location: "Lake Chamo, Nechisar National Park",
    priceETB: 3500,
    priceUSD: 30,
    priceEUR: 27,
    descriptionEn: "Take a speed boat on Lake Chamo to witness the world-famous 'Crocodile Market' where giant Nile Crocodiles (up to 6 meters long) bask on the sandy shores alongside schools of hippos and rare water birds.",
    descriptionAm: "በጫሞ ሐይቅ ላይ በጀልባ በመጓዝ ግዙፍ የዓዞ መንጋዎችን፣ ጉማሬዎችን እና ብርቅዬ ወፎችን በቅርብ ይመልከቱ።",
    image: "https://images.unsplash.com/photo-1534567153574-2b12153a87f0?auto=format&fit=crop&w=1200&q=80",
    highlightsEn: [
      "World's largest Nile Crocodile concentration",
      "Close encounters with wild hippo pods",
      "Birdwatching: Pelicans, African Fish Eagles, Flamingos",
      "Hotel shuttle to boat docks included"
    ],
    highlightsAm: [
      "የዓለም ግዙፍ የዓዞ መንጋዎች ስብስብ",
      "የጉማሬ መንጋዎች እይታ",
      "የአፍሪካ ዓሳ በሊ አሞራዎች እና ፍላሚንጎዎች",
      "የሆቴል ትራንስፖርት ተካቷል"
    ],
    includedEn: ["Private Motorized Boat", "Licensed Wildlife Guide", "Park Entrance Permits", "Hotel Transfers", "Refreshments"],
    includedAm: ["የሞተር ጀልባ", "የዱር እንስሳት መሪ", "የፓርክ መግቢያ ፈቃድ", "ትራንስፖርት", "ቀለል ያለ ምግብ"]
  },
  {
    id: "tour-nechisar-zebras",
    titleEn: "Nechisar National Park Plains Game Drive",
    titleAm: "የነጭ ሣር ብሔራዊ ፓርክ የዱር እንስሳት ጉብኝት",
    duration: "Full Day (6 - 8 Hours)",
    location: "Nechisar Plains, Rift Valley",
    priceETB: 5500,
    priceUSD: 46,
    priceEUR: 42,
    descriptionEn: "4x4 Land Cruiser drive through the white grass plains ('Nechisar') to see herds of Burchell's Zebras, Swayne's Hartebeests, Gazelles, and baboons with panoramic mountain backdrops.",
    descriptionAm: "በ4x4 ላንድ ክሩዘር መኪና በነጭ ሣር ሜዳዎች ላይ በመጓዝ የዘብራ መንጋዎችን እና ብርቅዬ ሚዳቆዎችን ይጎብኙ።",
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80",
    highlightsEn: [
      "Burchell's Zebra herds in grass plains",
      "Endemic Swayne's Hartebeest sightings",
      "4x4 Off-road rift valley adventure",
      "Picnic lunch overlooking Twin Lakes"
    ],
    highlightsAm: [
      "የዘብራ መንጋዎች እይታ",
      "የስዌይንስ ሀርትቢስት እንስሳት",
      "የ4x4 ኦፍ-ሮድ ጉዞ",
      "የሽርሽር ምሳ በሐይቆች እይታ"
    ],
    includedEn: ["4x4 Land Cruiser + Fuel", "Senior Park Ranger", "Packed Gourmet Lunch", " Binoculars", "Hotel Pickup"],
    includedAm: ["4x4 መኪና + ነዳጅ", "የፓርክ ዘበኛ መሪ", "የሽርሽር ምሳ", "የርቀት መነፅር", "የሆቴል መቀበያ"]
  },
  {
    id: "tour-dorze-village",
    titleEn: "Chencha Dorze Cultural Village Tour & Weaving",
    titleAm: "የቸንቻ ዶርዜ ባህላዊ መንደር እና ሽመና ጉብኝት",
    duration: "4 Hours",
    location: "Chencha Highlands (2,800m elevation)",
    priceETB: 2800,
    priceUSD: 24,
    priceEUR: 22,
    descriptionEn: "Journey up into the cool Chencha mountains to visit the famous Dorze people, famous for their towering elephant-shaped bamboo houses, handwoven cotton shamahs, and Enset (false banana) bread baking.",
    descriptionAm: "ወደ ቸንቻ ተራሮች በመውጣት የዶርዜ ህዝቦችን የዝሆን ቅርጽ ያላቸው የቀርከሃ ቤቶች፣ የሽመና ጥበብ እና የቆጮ አጋጋር ይጎብኙ።",
    image: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1200&q=80",
    highlightsEn: [
      "12-meter tall living bamboo elephant huts",
      "Traditional Dorze cotton weaving demonstration",
      "Taste fresh Enset bread with hot spiced chili",
      "Scenic high-altitude views of Arba Minch"
    ],
    highlightsAm: [
      "የዝሆን ቅርጽ ያላቸው የቀርከሃ ቤቶች",
      "የባህላዊ የዶርዜ ጥጥ ሽመና ትርኢት",
      "ትኩስ ቆጮ ከሚጥሚጣ ጋር መቅመስ",
      "የአርባ ምንጭ ከተማ አየር እይታ"
    ],
    includedEn: ["Cultural Guide", "Local Dorze Community Fee", "Traditional Snacks & Honey Wine tasting", "Private Vehicle"],
    includedAm: ["የባህል መሪ", "የመንደር መግቢያ ክፍያ", "የቆጮ እና ጠጅ መቅመስ", "የግል መኪና"]
  },
  {
    id: "tour-forty-springs",
    titleEn: "Forty Springs Forest Trek & Natural Pools",
    titleAm: "የአርባ ምንጮች የደን ጉዞ እና የተፈጥሮ ምንጮች",
    duration: "2 - 3 Hours",
    location: "Forty Springs Forest Reserve",
    priceETB: 1800,
    priceUSD: 15,
    priceEUR: 14,
    descriptionEn: "Guided nature walk through the lush groundwater forest right below Wubete Hotel where forty natural freshwater springs bubble out of the earth under giant fig trees.",
    descriptionAm: "ከውበቴ ሆቴል በታች በሚገኘው የከርሰ ምድር ደን ውስጥ በመጓዝ አርባ የተፈጥሮ ንጹህ ምንጮች ከመሬት ሲፈልቁ ይጎብኙ።",
    image: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80",
    highlightsEn: [
      "Walk among 40 natural freshwater springs",
      "Colobus Monkey & Vervet Monkey sightings",
      "Cool rainforest microclimate walking paths",
      "Direct walking access from hotel terrace"
    ],
    highlightsAm: [
      "በ40 የተፈጥሮ ምንጮች መካከል መጓዝ",
      "የጉሬዛ እና ጦጣ መንጋዎች እይታ",
      "የተፈጥሮ የደን አየር",
      "ከሆቴሉ በቀጥታ የእግር መንገድ"
    ],
    includedEn: ["Local Forest Ranger", "Spring Water Bottle", "Nature Map", "Walking Stick"],
    includedAm: ["የደን መሪ", "የተፈጥሮ ውሃ", "የመንገድ ካርታ", "የእግር ምርኩዝ"]
  }
];

export const REVIEWS: Review[] = [
  {
    id: "r1",
    author: "Elena Rostova",
    origin: "Frankfurt, Germany",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    date: "12 days ago",
    source: "TripAdvisor",
    commentEn: "Wubete Hotel is without a doubt the finest lodge in Arba Minch! The 3D room preview on their website was 100% accurate. The view of Lake Chamo from our Deluxe balcony during sunset took our breath away. The crocodile boat safari organized by the hotel was seamless!",
    commentAm: "ውበቴ ሆቴል በአርባ ምንጭ ውስጥ የሚገኝ ምርጥ ሆቴል ነው! ከባልኮኒው የሚታየው የጫሞ ሐይቅ የፀሐይ ግብአት እይታ በጣም አስደናቂ ነው። የጀልባ ጉብኝቱም በጣም የተሳካ ነበር።",
    roomStayed: "Deluxe Rift-Valley Suite"
  },
  {
    id: "r2",
    author: "Dawit Tadesse",
    origin: "Addis Ababa, Ethiopia",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    date: "3 weeks ago",
    source: "Google",
    commentEn: "የውበቴ ሆቴል አስተናጋጆች በጣም ትህትና ያላቸው እና ኢትዮጵያዊ ባህልን የሚያንፀባርቁ ናቸው። የዓሳ ኩትሌቱ እና የቡና ፍች ሥነ-ሥርዓቱ ልዩ ነው። በTelebirr በቀጥታ ከፍለን ወዲያውኑ ማረጋገጫ ቫውቸር አገኘን።",
    commentAm: "የውበቴ ሆቴል አስተናጋጆች በጣም ትህትና ያላቸው እና ኢትዮጵያዊ ባህልን የሚያንፀባርቁ ናቸው። የዓሳ ኩትሌቱ እና የቡና ፍች ሥነ-ሥርዓቱ ልዩ ነው። በTelebirr በቀጥታ ከፍለን ወዲያውኑ ማረጋገጫ ቫውቸር አገኘን።",
    roomStayed: "Executive Twin-Lakes Suite"
  },
  {
    id: "r3",
    author: "Marcus Vance",
    origin: "London, UK",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    date: "1 month ago",
    source: "Booking.com",
    commentEn: "The AI Travel Concierge on their website helped us plan our 3-day itinerary before we even landed at Arba Minch airport. Free shuttle was waiting for us right outside arrivals. Clean rooms, high speed Wi-Fi, and top tier hospitality!",
    commentAm: "በድህረ ገጹ ላይ ያለው የAI ረዳት ወደ አርባ ምንጭ ከመምጣታችን በፊት የ3 ቀን ጉዞአችንን ለማቀድ ረድቶናል። ኤርፖርት ሲደርስ ነጻ መኪና ጠብቆናል።",
    roomStayed: "Standard Panoramic Room"
  }
];

export const AMENITIES_LIST = [
  { icon: "Wifi", nameEn: "High-Speed Fiber Wi-Fi", nameAm: "ፈጣን የፋይበር ዋይፋይ", descEn: "24/7 unlimited internet across all rooms & gardens", descAm: "24 ሰዓት በሁሉም ክፍሎች የሚሰራ ዋይፋይ" },
  { icon: "Bus", nameEn: "Free Airport Shuttle", nameAm: "ነጻ የኤርፖርት ትራንስፖርት", descEn: "Dedicated hotel van pickup at Arba Minch Airport (AMH)", descAm: "ከአርባ ምንጭ ኤርፖርት የነጻ መቀበያ መኪና" },
  { icon: "Coffee", nameEn: "Traditional Coffee Lounge", nameAm: "ባህላዊ የቡና ፍች ሳሎን", descEn: "Live Ethiopian coffee roasting & ceremony every afternoon", descAm: "በየቀኑ ከሰዓት በኋላ የሚዘጋጅ የቡና ፍች" },
  { icon: "Utensils", nameEn: "Forty Springs Restaurant", nameAm: "ፎርቲ ስፕሪንግስ ሬስቶራንት", descEn: "Gourmet Ethiopian & Fresh Lake Chamo fish dishes", descAm: "የላቀ ኢትዮጵያዊ እና የጫሞ አሳ ምግቦች" },
  { icon: "Waves", nameEn: "Panorama Infinity Pool", nameAm: "ፓኖራማ ኢንፊኒቲ መዋኛ ገንዳ", descEn: "Overlooking Forty Springs valley and Lake Chamo", descAm: "በሐይቆች እይታ ላይ የተሰራ የመዋኛ ገንዳ" },
  { icon: "Zap", nameEn: "24/7 Power Backup", nameAm: "24 ሰዓት የመብራት ጀነሬተር", descEn: "Heavy-duty diesel generators ensuring uninterrupted electricity", descAm: "ሳይቋረጥ የሚሰራ የኤሌክትሪክ ኃይል" },
  { icon: "Compass", nameEn: "Tour & Safari Desk", nameAm: "የጉዞ እና ሳፋሪ ቢሮ", descEn: "On-site guides for Lake Chamo, Nechisar & Chencha Dorze", descAm: "የአካባቢ ጉብኝት መሪዎች አገልግሎት" },
  { icon: "ShieldCheck", nameEn: "24/7 Security & Safe", nameAm: "24 ሰዓት ጥበቃ እና ደህንነት", descEn: "Secure private parking & round-the-clock security staff", descAm: "አስተማማኝ ጥበቃ እና መኪና ማቆሚያ" }
];
