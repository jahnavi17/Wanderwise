import type { Express } from "express";
import { createServer, type Server } from "http";
import OpenAI from "openai";
import { travelPreferencesSchema } from "@shared/schema";

const openai = process.env.OPENAI_API_KEY 
  ? new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    })
  : null;

// Fallback mock data for when OpenAI API is unavailable
function generateFallbackDestinations(preferences: any) {
  const { budget, duration, month, mood, currency = "USD", country } = preferences;
  
  // Currency conversion rates (approximate, relative to USD)
  const conversionRates: Record<string, number> = {
    USD: 1,
    INR: 83,
    EUR: 0.92,
    GBP: 0.79,
  };
  
  const rate = conversionRates[currency] || 1;
  
  const destinationPool = [
    {
      name: "Kyoto",
      country: "Japan",
      subtitle: "Ancient temples and zen gardens",
      summary: "Immerse yourself in traditional Japanese culture with ancient temples, serene gardens, and authentic tea ceremonies in this historic city. Experience the perfect blend of tradition and modernity.",
      activities: [
        "Visit Fushimi Inari Shrine's thousands of red torii gates",
        "Experience an authentic tea ceremony in Gion",
        "Explore the magical bamboo groves of Arashiyama",
        "Walk through the historic Gion district at night",
      ],
      estimatedCost: Math.round(Math.min(budget * 0.9, 2400 * rate)),
      bestTime: "Mar - May",
      imageUrl: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80",
      tags: ["cultural", "adventurous", "city"],
    },
    {
      name: "Santorini",
      country: "Greece",
      subtitle: "Iconic sunsets and white-washed beauty",
      summary: "Experience breathtaking sunsets over the Aegean Sea in this iconic island paradise. White-washed buildings cascade down volcanic cliffs creating postcard-perfect views.",
      activities: [
        "Watch the world-famous sunset from Oia Castle",
        "Explore the ancient ruins of Akrotiri",
        "Wine tasting at traditional volcanic vineyards",
        "Sail around the stunning caldera",
      ],
      estimatedCost: Math.round(Math.min(budget * 0.95, 2800 * rate)),
      bestTime: "Apr - Oct",
      imageUrl: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800&q=80",
      tags: ["relaxing", "romantic", "beaches"],
    },
    {
      name: "Banff",
      country: "Canada",
      subtitle: "Majestic Rocky Mountain paradise",
      summary: "Discover pristine mountain landscapes, turquoise lakes, and abundant wildlife in the heart of the Canadian Rockies. A paradise for outdoor enthusiasts.",
      activities: [
        "Hike to the stunning Lake Louise and Moraine Lake",
        "Ride the Banff Gondola for panoramic mountain views",
        "Wildlife spotting in Banff National Park",
        "Relax in the natural Banff Upper Hot Springs",
      ],
      estimatedCost: Math.round(Math.min(budget * 0.85, 2200 * rate)),
      bestTime: "Jun - Sep",
      imageUrl: "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?w=800&q=80",
      tags: ["adventurous", "mountains"],
    },
    {
      name: "Bali",
      country: "Indonesia",
      subtitle: "Tropical paradise and spiritual haven",
      summary: "Experience the ultimate relaxation in this tropical paradise with pristine beaches, lush rice terraces, and ancient temples. Perfect for unwinding and spiritual renewal.",
      activities: [
        "Visit the iconic Tanah Lot temple at sunset",
        "Explore the Tegalalang rice terraces in Ubud",
        "Relax on the beaches of Seminyak and Nusa Dua",
        "Experience traditional Balinese spa treatments",
      ],
      estimatedCost: Math.round(Math.min(budget * 0.75, 1800 * rate)),
      bestTime: "Apr - Oct",
      imageUrl: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80",
      tags: ["relaxing", "beaches", "budget"],
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
      estimatedCost: Math.round(Math.min(budget * 1.0, 3200 * rate)),
      bestTime: "Apr - Jun, Sep - Oct",
      imageUrl: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80",
      tags: ["romantic", "cultural", "city"],
    },
    {
      name: "Maldives",
      country: "Maldives",
      subtitle: "Overwater luxury in paradise",
      summary: "Float above crystal-clear waters in luxurious overwater bungalows. Pristine beaches, vibrant coral reefs, and world-class diving make this the ultimate island escape.",
      activities: [
        "Snorkel with manta rays and whale sharks",
        "Relax in an overwater spa with ocean views",
        "Enjoy sunset dolphin cruises",
        "Dive into vibrant coral reef ecosystems",
      ],
      estimatedCost: Math.round(Math.min(budget * 1.1, 4000 * rate)),
      bestTime: "Nov - Apr",
      imageUrl: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80",
      tags: ["romantic", "beaches", "relaxing"],
    },
    {
      name: "Iceland",
      country: "Iceland",
      subtitle: "Land of fire and ice",
      summary: "Witness the raw power of nature with geysers, waterfalls, glaciers, and the magical Northern Lights. Adventure awaits in this otherworldly landscape.",
      activities: [
        "Chase the Northern Lights in winter months",
        "Bathe in the famous Blue Lagoon geothermal spa",
        "Explore ice caves and glacier hiking",
        "Visit powerful waterfalls like Gullfoss and Skógafoss",
      ],
      estimatedCost: Math.round(Math.min(budget * 0.95, 3000 * rate)),
      bestTime: "Jun - Aug, Dec - Feb",
      imageUrl: "https://images.unsplash.com/photo-1504829857797-ddff29c27927?w=800&q=80",
      tags: ["adventurous", "mountains"],
    },
    {
      name: "Phuket",
      country: "Thailand",
      subtitle: "Thailand's beach gem",
      summary: "Discover stunning beaches, vibrant nightlife, and incredible Thai cuisine. Perfect blend of relaxation and adventure in Southeast Asia's premier beach destination.",
      activities: [
        "Island hop to Phi Phi Islands and James Bond Island",
        "Experience authentic Thai massage on the beach",
        "Explore the colorful night markets",
        "Snorkel in crystal-clear Andaman waters",
      ],
      estimatedCost: Math.round(Math.min(budget * 0.65, 1400 * rate)),
      bestTime: "Nov - Apr",
      imageUrl: "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=800&q=80",
      tags: ["beaches", "budget", "relaxing"],
    },
    {
      name: "Barcelona",
      country: "Spain",
      subtitle: "Gaudí's architectural masterpiece city",
      summary: "Experience the perfect fusion of art, architecture, beaches, and cuisine. From Gaudí's Sagrada Familia to bustling Las Ramblas, Barcelona captivates at every turn.",
      activities: [
        "Marvel at Gaudí's Sagrada Familia and Park Güell",
        "Stroll down Las Ramblas and explore Gothic Quarter",
        "Relax on Barceloneta Beach",
        "Savor tapas and paella in local bodegas",
      ],
      estimatedCost: Math.round(Math.min(budget * 0.85, 2400 * rate)),
      bestTime: "May - Jun, Sep - Oct",
      imageUrl: "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=800&q=80",
      tags: ["cultural", "city", "beaches"],
    },
    {
      name: "Dubai",
      country: "UAE",
      subtitle: "Futuristic luxury in the desert",
      summary: "Experience ultramodern luxury, world-record-breaking architecture, and desert adventures. Dubai seamlessly blends traditional Arabian culture with cutting-edge innovation.",
      activities: [
        "Visit the world's tallest building, Burj Khalifa",
        "Shop in the massive Dubai Mall and traditional souks",
        "Experience a desert safari with dune bashing",
        "Explore the Palm Jumeirah and luxury beaches",
      ],
      estimatedCost: Math.round(Math.min(budget * 1.0, 3000 * rate)),
      bestTime: "Nov - Mar",
      imageUrl: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80",
      tags: ["city", "adventurous"],
    },
    {
      name: "Queenstown",
      country: "New Zealand",
      subtitle: "Adventure capital of the world",
      summary: "Nestled among dramatic mountains and pristine lakes, Queenstown offers adrenaline-pumping activities alongside breathtaking natural beauty.",
      activities: [
        "Bungee jump from the historic Kawarau Bridge",
        "Jet boat through narrow canyon rivers",
        "Hike the stunning Routeburn or Milford tracks",
        "Ski world-class slopes in winter months",
      ],
      estimatedCost: Math.round(Math.min(budget * 0.9, 2600 * rate)),
      bestTime: "Dec - Feb, Jun - Aug",
      imageUrl: "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?w=800&q=80",
      tags: ["adventurous", "mountains"],
    },
    {
      name: "Rome",
      country: "Italy",
      subtitle: "The eternal city of history",
      summary: "Walk through 3,000 years of history among ancient ruins, Renaissance art, and world-famous cuisine. Every corner of Rome tells a story.",
      activities: [
        "Explore the Colosseum and Roman Forum",
        "Toss a coin in the Trevi Fountain",
        "Visit Vatican City and the Sistine Chapel",
        "Savor authentic Italian pasta and gelato",
      ],
      estimatedCost: Math.round(Math.min(budget * 0.9, 2600 * rate)),
      bestTime: "Apr - Jun, Sep - Oct",
      imageUrl: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&q=80",
      tags: ["cultural", "romantic", "city"],
    },
    {
      name: "Machu Picchu",
      country: "Peru",
      subtitle: "Ancient Incan citadel in the clouds",
      summary: "Discover the mystical 15th-century Incan city perched high in the Andes Mountains. A bucket-list destination combining history, culture, and stunning mountain scenery.",
      activities: [
        "Hike the classic Inca Trail to Machu Picchu",
        "Explore the Sacred Valley of the Incas",
        "Visit colorful markets in Cusco",
        "Discover the floating islands of Lake Titicaca",
      ],
      estimatedCost: Math.round(Math.min(budget * 0.8, 2200 * rate)),
      bestTime: "Apr - Oct",
      imageUrl: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=800&q=80",
      tags: ["cultural", "adventurous", "mountains"],
    },
    {
      name: "Seychelles",
      country: "Seychelles",
      subtitle: "Pristine island paradise",
      summary: "115 islands of pure tropical bliss with powder-white beaches, granite boulders, and lush jungles. An exclusive escape for the discerning traveler.",
      activities: [
        "Swim in the crystal waters of Anse Source d'Argent",
        "Snorkel in protected marine parks",
        "Spot giant tortoises in their natural habitat",
        "Island hop between pristine islands",
      ],
      estimatedCost: Math.round(Math.min(budget * 1.05, 3500 * rate)),
      bestTime: "Apr - May, Oct - Nov",
      imageUrl: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=800&q=80",
      tags: ["romantic", "beaches", "relaxing"],
    },
    {
      name: "Marrakech",
      country: "Morocco",
      subtitle: "Exotic medinas and vibrant souks",
      summary: "Lose yourself in labyrinthine souks, stunning palaces, and aromatic gardens. Experience the magic of North African culture and hospitality.",
      activities: [
        "Explore the bustling Jemaa el-Fnaa square",
        "Wander through colorful souks and haggle for treasures",
        "Visit the stunning Bahia Palace and Jardin Majorelle",
        "Experience a traditional hammam spa",
      ],
      estimatedCost: Math.round(Math.min(budget * 0.7, 1900 * rate)),
      bestTime: "Mar - May, Sep - Nov",
      imageUrl: "https://images.unsplash.com/photo-1597212618440-806262de4f6b?w=800&q=80",
      tags: ["cultural", "budget", "city"],
    },
    {
      name: "Swiss Alps",
      country: "Switzerland",
      subtitle: "Majestic peaks and Alpine charm",
      summary: "Picture-perfect mountain villages, world-class skiing, and stunning Alpine scenery. Experience the pinnacle of mountain luxury and natural beauty.",
      activities: [
        "Ride the iconic Glacier Express train",
        "Ski or snowboard in world-renowned resorts",
        "Hike scenic Alpine trails in summer",
        "Visit charming villages like Zermatt and Interlaken",
      ],
      estimatedCost: Math.round(Math.min(budget * 1.1, 3800 * rate)),
      bestTime: "Dec - Mar, Jun - Sep",
      imageUrl: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800&q=80",
      tags: ["adventurous", "mountains", "romantic"],
    },
    {
      name: "Cancún",
      country: "Mexico",
      subtitle: "Caribbean beaches and Mayan ruins",
      summary: "White-sand beaches meet ancient Mayan culture. Enjoy world-class resorts, vibrant nightlife, and easy access to stunning cenotes and ruins.",
      activities: [
        "Explore the ancient Mayan ruins of Chichen Itza",
        "Swim in mystical cenotes",
        "Relax on pristine Caribbean beaches",
        "Snorkel in the Great Maya Reef",
      ],
      estimatedCost: Math.round(Math.min(budget * 0.8, 2000 * rate)),
      bestTime: "Dec - Apr",
      imageUrl: "https://images.unsplash.com/photo-1568402102990-bc541580b59f?w=800&q=80",
      tags: ["beaches", "cultural", "relaxing"],
    },
    {
      name: "Tokyo",
      country: "Japan",
      subtitle: "Neon-lit futuristic metropolis",
      summary: "Experience the perfect blend of ultramodern technology and traditional culture. From serene temples to bustling Shibuya crossing, Tokyo never ceases to amaze.",
      activities: [
        "Witness the famous Shibuya crossing",
        "Explore ancient temples in Asakusa",
        "Experience the quirky neighborhoods of Harajuku",
        "Savor authentic sushi at Tsukiji Market",
      ],
      estimatedCost: Math.round(Math.min(budget * 0.95, 2800 * rate)),
      bestTime: "Mar - May, Sep - Nov",
      imageUrl: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80",
      tags: ["cultural", "city", "adventurous"],
    },
    {
      name: "Costa Rica",
      country: "Costa Rica",
      subtitle: "Biodiversity and adventure paradise",
      summary: "Zip through rainforest canopies, discover incredible wildlife, and relax on both Pacific and Caribbean coasts. Pura vida awaits!",
      activities: [
        "Zip-line through cloud forests in Monteverde",
        "Surf world-class waves in Tamarindo",
        "Spot sloths and toucans in Manuel Antonio",
        "Soak in natural hot springs near Arenal Volcano",
      ],
      estimatedCost: Math.round(Math.min(budget * 0.75, 2000 * rate)),
      bestTime: "Dec - Apr",
      imageUrl: "https://images.unsplash.com/photo-1605108896412-c9bb2b635b50?w=800&q=80",
      tags: ["adventurous", "beaches", "budget"],
    },
    {
      name: "Venice",
      country: "Italy",
      subtitle: "The floating city of romance",
      summary: "Glide through romantic canals in iconic gondolas. This unique city built on water enchants with Renaissance architecture, art, and timeless charm.",
      activities: [
        "Take a romantic gondola ride through the canals",
        "Explore St. Mark's Square and Basilica",
        "Visit colorful Burano and Murano islands",
        "Get lost in charming narrow streets and bridges",
      ],
      estimatedCost: Math.round(Math.min(budget * 0.95, 2900 * rate)),
      bestTime: "Apr - Jun, Sep - Oct",
      imageUrl: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=800&q=80",
      tags: ["romantic", "cultural", "city"],
    },
    {
      name: "Vietnam",
      country: "Vietnam",
      subtitle: "Ancient culture meets natural beauty",
      summary: "From the bustling streets of Hanoi to the emerald waters of Ha Long Bay, discover incredible cuisine, rich history, and stunning landscapes—all budget-friendly.",
      activities: [
        "Cruise through Ha Long Bay's limestone karsts",
        "Explore ancient Hoi An's lantern-lit streets",
        "Ride motorbikes through terraced rice fields",
        "Savor authentic pho and banh mi street food",
      ],
      estimatedCost: Math.round(Math.min(budget * 0.6, 1200 * rate)),
      bestTime: "Feb - Apr, Aug - Oct",
      imageUrl: "https://images.unsplash.com/photo-1528127269322-539801943592?w=800&q=80",
      tags: ["cultural", "budget", "adventurous"],
    },
    {
      name: "New York City",
      country: "USA",
      subtitle: "The city that never sleeps",
      summary: "Experience the energy of Times Square, world-class museums, diverse neighborhoods, and endless entertainment in America's most iconic city.",
      activities: [
        "Visit the Statue of Liberty and Ellis Island",
        "Explore Central Park and Times Square",
        "See a Broadway show",
        "Discover world-renowned museums like MoMA and Met",
      ],
      estimatedCost: Math.round(Math.min(budget * 1.0, 3200 * rate)),
      bestTime: "Apr - Jun, Sep - Nov",
      imageUrl: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&q=80",
      tags: ["city", "cultural"],
    },
    {
      name: "Lisbon",
      country: "Portugal",
      subtitle: "Charming hills and Atlantic views",
      summary: "Discover colorful azulejo tiles, historic trams, and delicious pastéis de nata. Portugal's coastal capital offers European charm without the hefty price tag.",
      activities: [
        "Ride the iconic yellow Tram 28 through historic neighborhoods",
        "Explore the medieval São Jorge Castle",
        "Day trip to fairytale Sintra palaces",
        "Enjoy sunset at Belém Tower by the Tagus River",
      ],
      estimatedCost: Math.round(Math.min(budget * 0.7, 1800 * rate)),
      bestTime: "Mar - May, Sep - Oct",
      imageUrl: "https://images.unsplash.com/photo-1585208798174-6cedd86e019a?w=800&q=80",
      tags: ["cultural", "budget", "city"],
    },
    {
      name: "Patagonia",
      country: "Argentina/Chile",
      subtitle: "Untamed wilderness at the end of the world",
      summary: "Trek through dramatic glaciers, towering peaks, and pristine wilderness. Experience some of the most spectacular and remote landscapes on Earth.",
      activities: [
        "Hike the W Trek in Torres del Paine",
        "Witness the massive Perito Moreno Glacier",
        "Spot penguins, whales, and condors",
        "Camp under star-filled southern skies",
      ],
      estimatedCost: Math.round(Math.min(budget * 0.85, 2400 * rate)),
      bestTime: "Nov - Mar",
      imageUrl: "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=800&q=80",
      tags: ["adventurous", "mountains"],
    },
    {
      name: "Egypt",
      country: "Egypt",
      subtitle: "Ancient wonders of the pharaohs",
      summary: "Stand before the Great Pyramids, cruise the Nile, and explore magnificent temples. Journey through 5,000 years of human civilization.",
      activities: [
        "Marvel at the Pyramids of Giza and the Sphinx",
        "Explore the Valley of the Kings in Luxor",
        "Cruise the Nile River on a traditional felucca",
        "Dive in the Red Sea coral reefs",
      ],
      estimatedCost: Math.round(Math.min(budget * 0.7, 1800 * rate)),
      bestTime: "Oct - Apr",
      imageUrl: "https://images.unsplash.com/photo-1572252009286-268acec5ca0a?w=800&q=80",
      tags: ["cultural", "budget", "adventurous"],
    },
  ];

  // Filter by country if specified
  let filteredPool = destinationPool;
  if (country) {
    const normalizedCountry = country.trim().toLowerCase();
    filteredPool = destinationPool.filter(dest => 
      dest.country.toLowerCase().includes(normalizedCountry)
    );
  }

  // Shuffle array to ensure variety on each request
  const shuffleArray = (array: any[]) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Select destinations based on mood and other preferences
  let selected: any[] = [];
  
  if (mood === "Relaxing") {
    const relaxingDestinations = shuffleArray(filteredPool.filter((d: any) => 
      d.tags?.includes("relaxing") || d.tags?.includes("beaches")
    ));
    selected = relaxingDestinations.slice(0, 3);
  } else if (mood === "Adventurous") {
    const adventurousDestinations = shuffleArray(filteredPool.filter((d: any) => 
      d.tags?.includes("adventurous") || d.tags?.includes("mountains")
    ));
    selected = adventurousDestinations.slice(0, 3);
  } else if (mood === "Cultural") {
    const culturalDestinations = shuffleArray(filteredPool.filter((d: any) => 
      d.tags?.includes("cultural") || d.tags?.includes("city")
    ));
    selected = culturalDestinations.slice(0, 3);
  } else if (mood === "Romantic") {
    const romanticDestinations = shuffleArray(filteredPool.filter((d: any) => 
      d.tags?.includes("romantic")
    ));
    selected = romanticDestinations.slice(0, 3);
  } else {
    // Random selection if no mood specified
    selected = shuffleArray(filteredPool).slice(0, 3);
  }

  // If we don't have enough destinations, add more from the filtered pool
  if (selected.length < 3) {
    const remaining = shuffleArray(filteredPool.filter(d => !selected.includes(d)));
    selected = [...selected, ...remaining].slice(0, 3);
  }

  // If still not enough, use full pool to ensure we always return 3 destinations
  // This provides variety even when country filter has few matches
  if (selected.length < 3) {
    const remaining = shuffleArray(destinationPool.filter(d => !selected.includes(d)));
    selected = [...selected, ...remaining].slice(0, 3);
  }

  return selected.slice(0, 3);
}

export async function registerRoutes(app: Express): Promise<Server> {
  app.post("/api/recommendations", async (req, res) => {
    try {
      const preferences = travelPreferencesSchema.parse(req.body);
      
      const currencySymbols: Record<string, string> = {
        INR: "₹",
        USD: "$",
        EUR: "€",
        GBP: "£"
      };
      
      const currencySymbol = currencySymbols[preferences.currency] || "$";
      
      let promptParts = [
        `You are a travel expert AI assistant. Based on the following travel preferences, recommend exactly 3 unique travel destinations that would be perfect for this traveler.`,
        ``,
        `Preferences:`,
        `- Budget: ${currencySymbol}${preferences.budget} ${preferences.currency} (total trip cost)`,
        `- Duration: ${preferences.duration} days`,
        `- Travel Month: ${preferences.month}`,
        `- Mood: ${preferences.mood}`
      ];
      
      if (preferences.userLocation) {
        promptParts.push(`- Starting Location: ${preferences.userLocation} (suggest destinations within reasonable travel distance)`);
      }
      
      if (preferences.country) {
        promptParts.push(`- Preferred Country: ${preferences.country} (ONLY suggest destinations in this country)`);
      }
      
      promptParts.push(
        ``,
        `For each destination, provide:`,
        `1. Destination name (city or region)`,
        `2. Country`,
        `3. A catchy one-line subtitle (e.g., "Perfect for beach lovers", "Adventure seeker's paradise")`,
        `4. A compelling 2-3 sentence summary that captures the essence of the destination`,
        `5. Exactly 4 specific activities or attractions (be specific with names)`,
        `6. Estimated total cost for the trip in ${preferences.currency} (realistic for the budget and duration)`,
        `7. Best time to visit (e.g., "Mar - May", "Year-round")`,
        ``,
        `Return your response as a valid JSON object with this exact structure:`,
        `{`,
        `  "destinations": [`,
        `    {`,
        `      "name": "destination name",`,
        `      "country": "country name",`,
        `      "subtitle": "one-line description",`,
        `      "summary": "2-3 sentence description",`,
        `      "activities": ["activity 1", "activity 2", "activity 3", "activity 4"],`,
        `      "estimatedCost": number,`,
        `      "bestTime": "month range"`,
        `    }`,
        `  ]`,
        `}`,
        ``,
        `Ensure the destinations are diverse, realistic for the budget, and well-suited for the specified mood and travel month. Make the recommendations exciting and personalized.`
      );
      
      const prompt = promptParts.join('\n');

      try {
        if (!openai) {
          throw new Error("OpenAI API key not configured");
        }
        
        // the newest OpenAI model is "gpt-5" which was released August 7, 2025. do not change this unless explicitly requested by the user
        const completion = await openai.chat.completions.create({
          model: "gpt-5",
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
