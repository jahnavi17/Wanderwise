import { Compass, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Hero() {
  const scrollToForm = () => {
    const formElement = document.getElementById('travel-form');
    formElement?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <div className="relative overflow-hidden rounded-3xl mb-12">
      {/* Background with gradient overlay */}
      <div className="relative h-[450px] md:h-[550px]">
        <img
          src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1600&q=80"
          alt="Travel background"
          className="absolute inset-0 w-full h-full object-cover animate-subtle-zoom"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/80 via-secondary/70 to-accent/60" />
        
        {/* Content */}
        <div className="relative h-full flex flex-col items-center justify-center text-center px-4 space-y-6">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30 animate-fade-in">
            <Compass className="w-5 h-5 text-white" />
            <span className="text-white font-medium text-sm">AI-Powered Travel Assistant</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white drop-shadow-lg animate-fade-in-up">
            Find your next adventure with AI ✈️
          </h1>
          
          <p className="text-xl md:text-2xl text-white/95 max-w-2xl font-serif drop-shadow-md animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            Smart travel recommendations tailored just for you
          </p>

          <Button
            onClick={scrollToForm}
            size="lg"
            className="mt-4 h-14 px-8 text-lg font-bold bg-white text-primary hover:bg-white/90 hover:scale-105 transition-all duration-300 shadow-xl animate-fade-in-up"
            style={{ animationDelay: '0.2s' }}
            data-testid="button-get-started"
          >
            Get Started
            <ChevronDown className="w-5 h-5 ml-2 animate-bounce" />
          </Button>
        </div>
      </div>
    </div>
  );
}
