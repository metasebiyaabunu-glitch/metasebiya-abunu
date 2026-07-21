import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Gemini AI SDK securely on server
  const getAi = () => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn("GEMINI_API_KEY environment variable is missing.");
      return null;
    }
    return new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  };

  // API Routes
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", hotel: "Wubete Hotel Arba Minch 3D" });
  });

  // AI Concierge Endpoint using Gemini 3.1 Pro / 3.6 Flash
  app.post("/api/concierge", async (req, res) => {
    try {
      const { message, history, language = "en" } = req.body;
      const ai = getAi();

      if (!ai) {
        return res.status(500).json({
          error: "AI service not configured. Missing GEMINI_API_KEY.",
          reply: language === "am"
            ? "እንኳን ወደ ውበቴ ሆቴል አርባ ምንጭ በደህና መጡ! በአሁኑ ጊዜ የሰው ሰራሽ አስተ አስተናጋጅ በስራ ላይ نیست:: እባክዎ በቀጥታ በስልክ ያነጋግሩን።"
            : "Welcome to Wubete Hotel Arba Minch! Our AI concierge is currently offline. Please feel free to use our direct booking bar or contact us via WhatsApp."
        });
      }

      const systemPrompt = `You are "Wubete AI", the elite 5-star digital concierge for Wubete Hotel & Resort in Arba Minch, Ethiopia.
Wubete Hotel is located on the elevated hills overlooking Forty Springs (Arba Minch), Lake Chamo, Lake Abaya, and the Nechisar National Park rift valley.

Key Hotel Information:
- Accommodations:
  1. Standard Panoramic Room: ~4,500 ETB ($38 / €35) per night. Balcony view, King/Twin beds, High-speed Wi-Fi, Rainfall shower, Free breakfast & airport shuttle.
  2. Deluxe Rift-Valley Suite: ~7,500 ETB ($62 / €58) per night. Panoramic Lake Chamo balcony, Jacuzzi bath, Work desk, Complimentary Ethiopian coffee set, Minibar.
  3. Executive Lake View Suite: ~12,000 ETB ($100 / €92) per night. Prime 180° view of Lake Abaya & Chamo (Bridge of God), private terrace, lounge area, butler service.
  4. Royal Arba Minch Villa: ~22,000 ETB ($180 / €165) per night. Private infinity plunge pool, 2 bedrooms, dining area, private chef on call.

- Dining & Coffee Ceremony:
  - "Forty Springs" Terrace Restaurant: Authentic Ethiopian delicacies (Special Arba Minch Fish Cutlet, Kitfo, Doro Wat, Beyaynetu vegan platter) & International dishes.
  - Traditional Ethiopian Coffee Ceremony: Freshly roasted coffee beans over frankincense smoke, served with Popcorn & Kolo in traditional clay Jebena & Rekebot.
  - Sunset Lounge & Cocktail Bar: Fresh tropical fruit smoothies (Avocado-Mango-Papaya layers), Ethiopian Tej (honey wine), and signature cocktails.

- Tour Packages & Experiences:
  - Lake Chamo Crocodile Market Boat Safari: 3-hour boat trip to see giant Nile crocodiles, hippos, and flamingos (~2,500 ETB per person).
  - Nechisar National Park Game Drive: Zebra, Swayne's Hartebeest, gazelles, savannah landscape (~3,500 ETB per vehicle).
  - Chencha Dorze Bamboo Village Tour: Unique elephant-shaped bamboo houses, traditional weavers, Enset (false banana) bread baking (~2,000 ETB per person).
  - Forty Springs Nature Trekking: Scenic walking trail through forest springs (~1,200 ETB per person).

- Payment Methods accepted: CBE Birr, Telebirr, Awash Birr, Local Bank Transfers, Visa, Mastercard, Cash (ETB, USD, EUR).
- Guest Perks: Free airport shuttle from/to Arba Minch Airport (AMH), 24/7 high-speed Wi-Fi, free breakfast buffet, power backup generator.

Instructions:
- Be extremely polite, hospitable, warm, and helpful.
- Respond in the user's preferred language (English or Amharic). If Amharic is requested, speak natural, courteous Amharic (አማርኛ).
- Give precise recommendations, room availability advice, tour itineraries, or dining suggestions.
- Keep responses engaging, structured with markdown bullet points if helpful, and encourage direct booking on the website for 15% discount.`;

      // Try gemini-3.1-pro-preview first as requested, fallback to gemini-3.6-flash if needed
      let modelName = "gemini-3.1-pro-preview";
      let response;

      try {
        response = await ai.models.generateContent({
          model: modelName,
          contents: [
            { role: "user", parts: [{ text: `${systemPrompt}\n\nUser Question: ${message}` }] }
          ]
        });
      } catch (err) {
        console.warn(`Fallback from ${modelName} to gemini-3.6-flash due to:`, err);
        modelName = "gemini-3.6-flash";
        response = await ai.models.generateContent({
          model: modelName,
          contents: [
            { role: "user", parts: [{ text: `${systemPrompt}\n\nUser Question: ${message}` }] }
          ]
        });
      }

      const replyText = response.text || "Thank you for inquiring with Wubete Hotel Arba Minch! How else may I assist your stay?";

      return res.json({ reply: replyText, modelUsed: modelName });
    } catch (error: any) {
      console.error("Error in concierge endpoint:", error);
      return res.status(500).json({
        error: "Failed to process request.",
        reply: "We are delighted to welcome you to Wubete Hotel Arba Minch! Please check our direct room rates below or contact our 24/7 reception via WhatsApp (+251 91 100 2233)."
      });
    }
  });

  // Direct Room Booking API
  app.post("/api/booking", (req, res) => {
    const { roomType, checkIn, checkOut, guests, guestName, email, phone, currency, paymentMethod, totalAmount } = req.body;

    const bookingId = "WUB-" + Math.floor(100000 + Math.random() * 900000);
    const confirmationDate = new Date().toISOString();

    res.json({
      success: true,
      bookingId,
      confirmationDate,
      details: {
        roomType,
        checkIn,
        checkOut,
        guests,
        guestName,
        email,
        phone,
        currency,
        paymentMethod,
        totalAmount,
        status: "CONFIRMED",
        shuttleRequested: true,
        perks: ["Free Airport Shuttle", "Complimentary Breakfast", "15% Direct Booking Discount Applied", "Free Traditional Coffee Voucher"]
      },
      message: `Booking #${bookingId} successfully confirmed for ${guestName}! Instant voucher generated.`
    });
  });

  // Restaurant Table Reservation API
  app.post("/api/table-reservation", (req, res) => {
    const { name, phone, guests, date, time, seatingPreference, specialRequests } = req.body;
    const resId = "TAB-" + Math.floor(10000 + Math.random() * 90000);

    res.json({
      success: true,
      reservationId: resId,
      details: { name, phone, guests, date, time, seatingPreference, specialRequests },
      message: `Table reservation #${resId} placed for ${guests} guest(s) on ${date} at ${time}. We look forward to hosting you at Forty Springs Terrace!`
    });
  });

  // Tour Package Inquiry API
  app.post("/api/inquiry", (req, res) => {
    const { tourName, guestName, phone, date, participants, notes } = req.body;
    const inquiryId = "INQ-" + Math.floor(10000 + Math.random() * 90000);

    res.json({
      success: true,
      inquiryId,
      message: `Tour inquiry #${inquiryId} received for ${tourName}! Our Arba Minch tour desk will contact ${phone} shortly with your itinerary.`
    });
  });

  // Integrate Vite dev middleware or static serving
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Wubete Hotel Arba Minch 3D Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Server startup error:", err);
});
