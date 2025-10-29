import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Inspiration {
  image: string;
  destination: string;
  caption: string;
}

const inspirations: Inspiration[] = [
  {
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80",
    destination: "Norwegian Fjords",
    caption: "Dramatic landscapes and pristine nature await"
  },
  {
    image: "https://images.unsplash.com/photo-1533929736458-ca588d08c8be?w=600&q=80",
    destination: "Maldives",
    caption: "Crystal clear waters and luxury overwater villas"
  },
  {
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&q=80",
    destination: "Paris",
    caption: "The city of lights and romance"
  },
  {
    image: "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=600&q=80",
    destination: "Santorini",
    caption: "Iconic sunsets and whitewashed buildings"
  },
  {
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&q=80",
    destination: "Tokyo",
    caption: "Where tradition meets cutting-edge modernity"
  },
];

export default function InspirationCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % inspirations.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + inspirations.length) % inspirations.length);
  };

  return (
    <div className="mt-16 mb-12">
      <h2 className="text-3xl font-bold text-center mb-8 text-foreground">
        Travel Inspiration 🌟
      </h2>
      
      <div className="relative max-w-5xl mx-auto">
        <div className="overflow-hidden rounded-2xl">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {inspirations.map((inspiration, idx) => (
              <div
                key={idx}
                className="min-w-full px-2"
              >
                <div className="relative h-80 rounded-xl overflow-hidden group">
                  <img
                    src={inspiration.image}
                    alt={inspiration.destination}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                    <h3 className="text-3xl font-bold mb-2">{inspiration.destination}</h3>
                    <p className="text-lg font-serif text-white/90">{inspiration.caption}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Button
          onClick={prev}
          variant="outline"
          size="icon"
          className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 hover:bg-white shadow-lg"
          data-testid="button-carousel-prev"
        >
          <ChevronLeft className="w-5 h-5" />
        </Button>
        
        <Button
          onClick={next}
          variant="outline"
          size="icon"
          className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 hover:bg-white shadow-lg"
          data-testid="button-carousel-next"
        >
          <ChevronRight className="w-5 h-5" />
        </Button>

        <div className="flex justify-center gap-2 mt-6">
          {inspirations.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-2 h-2 rounded-full transition-all ${
                idx === currentIndex ? 'bg-primary w-8' : 'bg-gray-300'
              }`}
              data-testid={`carousel-dot-${idx}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
