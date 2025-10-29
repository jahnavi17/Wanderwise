import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import MoodSwitcher, { type MoodTheme } from "@/components/MoodSwitcher";
import QuickFilters, { type FilterType } from "@/components/QuickFilters";
import TravelForm, { type TravelPreferences } from "@/components/TravelForm";
import DestinationCard, { type Destination } from "@/components/DestinationCard";
import LoadingSpinner from "@/components/LoadingSpinner";
import InspirationCarousel from "@/components/InspirationCarousel";
import { Button } from "@/components/ui/button";
import { RefreshCw, Facebook, Twitter, Instagram, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const moodBackgrounds: Record<MoodTheme, string> = {
  adventure: 'bg-gradient-to-br from-orange-100 via-red-50 to-yellow-100',
  relax: 'bg-gradient-to-br from-cyan-100 via-blue-50 to-teal-100',
  romantic: 'bg-gradient-to-br from-pink-100 via-purple-50 to-rose-100',
  luxury: 'bg-gradient-to-br from-yellow-100 via-amber-50 to-orange-100',
};

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [destinations, setDestinations] = useState<Destination[] | null>(null);
  const [lastPreferences, setLastPreferences] = useState<TravelPreferences | null>(null);
  const [currentMood, setCurrentMood] = useState<MoodTheme>('relax');
  const [preferredCurrency, setPreferredCurrency] = useState<string>("USD");
  const { toast } = useToast();

  const generateRecommendations = async (preferences: TravelPreferences) => {
    try {
      setIsLoading(true);
      setDestinations(null);

      setTimeout(() => {
        window.scrollTo({ top: 900, behavior: 'smooth' });
      }, 100);

      const response = await fetch("/api/recommendations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(preferences),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch recommendations");
      }

      const data = await response.json();
      setDestinations(data.destinations);
      setLastPreferences(preferences);
      setPreferredCurrency(preferences.currency || "USD");
    } catch (error: any) {
      console.error("Error fetching recommendations:", error);
      toast({
        title: "Error",
        description: "Failed to generate recommendations. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = (preferences: TravelPreferences) => {
    console.log("Generating destinations with preferences:", preferences);
    generateRecommendations(preferences);
  };

  const handleGenerateAgain = () => {
    if (lastPreferences) {
      generateRecommendations(lastPreferences);
    }
  };

  const handleSurpriseMe = () => {
    console.log("Surprise me clicked!");
    
    const randomPreferences: TravelPreferences = {
      budget: Math.floor(Math.random() * 3000) + 1500,
      duration: Math.floor(Math.random() * 10) + 5,
      month: [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ][Math.floor(Math.random() * 12)],
      mood: ["Relaxing", "Adventurous", "Cultural", "Romantic"][
        Math.floor(Math.random() * 4)
      ] as any,
      currency: lastPreferences?.currency || preferredCurrency || "USD",
    };

    generateRecommendations(randomPreferences);
  };

  const handleFilterClick = (filter: FilterType) => {
    console.log("Filter clicked:", filter);
    
    if (filter === 'surprise') {
      handleSurpriseMe();
      return;
    }

    // Create preferences based on filter type
    const filterPreferences: Partial<TravelPreferences> = {
      currency: lastPreferences?.currency || preferredCurrency || "USD",
    };

    switch (filter) {
      case 'beaches':
        filterPreferences.mood = "Relaxing";
        filterPreferences.duration = 7;
        filterPreferences.budget = 2500;
        break;
      case 'mountains':
        filterPreferences.mood = "Adventurous";
        filterPreferences.duration = 5;
        filterPreferences.budget = 2000;
        break;
      case 'city':
        filterPreferences.mood = "Cultural";
        filterPreferences.duration = 4;
        filterPreferences.budget = 2500;
        break;
      case 'budget':
        filterPreferences.mood = "Relaxing";
        filterPreferences.duration = 5;
        filterPreferences.budget = 1000;
        break;
      case 'romantic':
        filterPreferences.mood = "Romantic";
        filterPreferences.duration = 7;
        filterPreferences.budget = 3000;
        break;
    }

    // Get current month
    const currentMonth = new Date().toLocaleString('default', { month: 'long' });
    filterPreferences.month = currentMonth;

    // Generate recommendations with the filter preferences
    generateRecommendations(filterPreferences as TravelPreferences);
  };

  const handleMoodChange = (mood: MoodTheme) => {
    setCurrentMood(mood);
    console.log("Mood changed to:", mood);
  };

  return (
    <div className={`min-h-screen transition-colors duration-700 ${moodBackgrounds[currentMood]}`}>
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Hero />
        
        <QuickFilters onFilterClick={handleFilterClick} />
        
        <div id="travel-form">
          <TravelForm 
            onSubmit={handleFormSubmit} 
            isLoading={isLoading}
            onCurrencyChange={setPreferredCurrency}
          />
        </div>

        {isLoading && (
          <div className="mt-16">
            <LoadingSpinner />
          </div>
        )}

        {destinations && !isLoading && (
          <div className="mt-20 space-y-10">
            <div className="text-center space-y-2">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Your Perfect Destinations ✈️
              </h2>
              <p className="text-lg text-muted-foreground font-serif">
                Handpicked by AI just for you
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {destinations.map((destination, index) => (
                <DestinationCard
                  key={index}
                  destination={destination}
                  index={index}
                  currency={preferredCurrency}
                />
              ))}
            </div>

            <div className="flex justify-center pt-6">
              <Button
                variant="outline"
                size="lg"
                onClick={handleGenerateAgain}
                data-testid="button-generate-again"
                className="font-semibold text-base px-8 rounded-xl border-2 border-primary/30 hover:bg-primary hover:text-white transition-all duration-300 hover:scale-105"
              >
                <RefreshCw className="w-5 h-5 mr-2" />
                Generate Again
              </Button>
            </div>
          </div>
        )}

        {!destinations && !isLoading && (
          <InspirationCarousel />
        )}

        <footer className="mt-24 pt-12 border-t border-primary/10">
          <div className="bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 rounded-2xl p-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                <p className="text-sm font-semibold text-muted-foreground mb-1" data-testid="text-footer">
                  Built for Media.net PM Challenge ✈️
                </p>
                <p className="text-xs text-muted-foreground font-serif">
                  Powered by AI to help you discover amazing destinations
                </p>
              </div>
              
              <div className="flex items-center gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-primary/10 hover:bg-primary flex items-center justify-center transition-all hover:scale-110 group">
                  <Facebook className="w-5 h-5 text-primary group-hover:text-white" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-primary/10 hover:bg-primary flex items-center justify-center transition-all hover:scale-110 group">
                  <Twitter className="w-5 h-5 text-primary group-hover:text-white" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-primary/10 hover:bg-primary flex items-center justify-center transition-all hover:scale-110 group">
                  <Instagram className="w-5 h-5 text-primary group-hover:text-white" />
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
