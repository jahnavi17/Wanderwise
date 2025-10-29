import type { Express } from "express";
import { createServer, type Server } from "http";
import OpenAI from "openai";
import { travelPreferencesSchema } from "@shared/schema";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Fallback mock data for when OpenAI API is unavailable
function generateFallbackDestinations(preferences: any) {
  const { budget, duration, month, mood } = preferences;
  
  const destinationPool = [
    {
      name: "Kyoto",
      country: "Japan",
      subtitle: "Perfect for culture lovers",
      summary: "Immerse yourself in traditional Japanese culture with ancient temples, serene gardens, and authentic tea ceremonies in this historic city. Experience the perfect blend of tradition and modernity.",
      activities: [
        "Visit Fushimi Inari Shrine's thousands of red torii gates",
        "Experience an authentic tea ceremony in Gion",
        "Explore the magical bamboo groves of Arashiyama",
        "Walk through the historic Gion district at night",
      ],
      estimatedCost: Math.min(budget * 0.9, 2400),
      bestTime: "Mar - May",
      imageUrl: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80",
    },
    {
      name: "Santorini",
      country: "Greece",
      subtitle: "Perfect for beach lovers",
      summary: "Experience breathtaking sunsets over the Aegean Sea in this iconic island paradise. White-washed buildings cascade down volcanic cliffs creating postcard-perfect views.",
      activities: [
        "Watch the world-famous sunset from Oia Castle",
        "Explore the ancient ruins of Akrotiri",
        "Wine tasting at traditional volcanic vineyards",
        "Sail around the stunning caldera",
      ],
      estimatedCost: Math.min(budget * 0.95, 2800),
      bestTime: "Apr - Oct",
      imageUrl: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800&q=80",
    },
    {
      name: "Banff",
      country: "Canada",
      subtitle: "Perfect for adventure seekers",
      summary: "Discover pristine mountain landscapes, turquoise lakes, and abundant wildlife in the heart of the Canadian Rockies. A paradise for outdoor enthusiasts.",
      activities: [
        "Hike to the stunning Lake Louise and Moraine Lake",
        "Ride the Banff Gondola for panoramic mountain views",
        "Wildlife spotting in Banff National Park",
        "Relax in the natural Banff Upper Hot Springs",
      ],
      estimatedCost: Math.min(budget * 0.85, 2200),
      bestTime: "Jun - Sep",
      imageUrl: "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?w=800&q=80",
    },
    {
      name: "Bali",
      country: "Indonesia",
      subtitle: "Tropical paradise retreat",
      summary: "Experience the ultimate relaxation in this tropical paradise with pristine beaches, lush rice terraces, and ancient temples. Perfect for unwinding and spiritual renewal.",
      activities: [
        "Visit the iconic Tanah Lot temple at sunset",
        "Explore the Tegalalang rice terraces in Ubud",
        "Relax on the beaches of Seminyak and Nusa Dua",
        "Experience traditional Balinese spa treatments",
      ],
      estimatedCost: Math.min(budget * 0.75, 1800),
      bestTime: "Apr - Oct",
      imageUrl: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80",
    },
    {
      name: "Paris",
      country: "France",
      subtitle: "The city of lights and romance",
      summary: "Fall in love with the timeless charm of Paris. From world-class museums to charming cafés, experience art, culture, and romance in every corner of this magnificent city.",
      activities: [
        "Visit the Eiffel Tower and cruise the Seine River",
        "Explore the Louvre Museum and see the Mona Lisa",
        "Stroll through charming Montmartre neighborhood",
        "Enjoy café culture in the Latin Quarter",
      ],
      estimatedCost: Math.min(budget * 1.0, 3200),
      bestTime: "Apr - Jun, Sep - Oct",
      imageUrl: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80",
    },
  ];

  // Select destinations based on mood
  let selected = [...destinationPool];
  if (mood === "Relaxing") {
    selected = [destinationPool[3], destinationPool[1], destinationPool[0]];
  } else if (mood === "Adventurous") {
    selected = [destinationPool[2], destinationPool[0], destinationPool[3]];
  } else if (mood === "Cultural") {
    selected = [destinationPool[0], destinationPool[4], destinationPool[1]];
  } else if (mood === "Romantic") {
    selected = [destinationPool[4], destinationPool[1], destinationPool[3]];
  }

  return selected.slice(0, 3);
}

export async function registerRoutes(app: Express): Promise<Server> {
  app.post("/api/recommendations", async (req, res) => {
    try {
      const preferences = travelPreferencesSchema.parse(req.body);
      
      const prompt = `You are a travel expert AI assistant. Based on the following travel preferences, recommend exactly 3 unique travel destinations that would be perfect for this traveler.

Preferences:
- Budget: $${preferences.budget} USD (total trip cost)
- Duration: ${preferences.duration} days
- Travel Month: ${preferences.month}
- Mood: ${preferences.mood}

For each destination, provide:
1. Destination name (city or region)
2. Country
3. A catchy one-line subtitle (e.g., "Perfect for beach lovers", "Adventure seeker's paradise")
4. A compelling 2-3 sentence summary that captures the essence of the destination
5. Exactly 4 specific activities or attractions (be specific with names)
6. Estimated total cost for the trip in USD (realistic for the budget and duration)
7. Best time to visit (e.g., "Mar - May", "Year-round")

Return your response as a valid JSON object with this exact structure:
{
  "destinations": [
    {
      "name": "destination name",
      "country": "country name",
      "subtitle": "one-line description",
      "summary": "2-3 sentence description",
      "activities": ["activity 1", "activity 2", "activity 3", "activity 4"],
      "estimatedCost": number,
      "bestTime": "month range"
    }
  ]
}

Ensure the destinations are diverse, realistic for the budget, and well-suited for the specified mood and travel month. Make the recommendations exciting and personalized.`;

      try {
        const completion = await openai.chat.completions.create({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content: "You are an expert travel advisor with deep knowledge of destinations worldwide. You provide personalized, practical, and inspiring travel recommendations."
            },
            {
              role: "user",
              content: prompt
            }
          ],
          temperature: 0.8,
          response_format: { type: "json_object" }
        });

        const content = completion.choices[0].message.content;
        if (!content) {
          throw new Error("No response from OpenAI");
        }

        const aiResponse = JSON.parse(content);
        
        // Add Unsplash image URLs to each destination
        const destinationsWithImages = aiResponse.destinations.map((dest: any) => ({
          ...dest,
          imageUrl: `https://source.unsplash.com/800x600/?${encodeURIComponent(dest.name + " " + dest.country + " travel")}`
        }));

        res.json({ destinations: destinationsWithImages });
      } catch (openaiError: any) {
        // If OpenAI fails (quota, network, etc.), use fallback data
        console.log("OpenAI API unavailable, using fallback recommendations:", openaiError.message);
        const fallbackDestinations = generateFallbackDestinations(preferences);
        res.json({ destinations: fallbackDestinations });
      }
    } catch (error: any) {
      console.error("Error generating recommendations:", error);
      res.status(500).json({ 
        error: "Failed to generate recommendations",
        message: error.message 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
