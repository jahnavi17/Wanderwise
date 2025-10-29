import { MapPin, DollarSign, Calendar, Activity, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export interface Destination {
  name: string;
  country: string;
  summary: string;
  activities: string[];
  estimatedCost: number;
  imageUrl: string;
  subtitle?: string;
  bestTime?: string;
}

interface DestinationCardProps {
  destination: Destination;
  index: number;
}

export default function DestinationCard({ destination, index }: DestinationCardProps) {
  const { toast } = useToast();

  const handleShare = () => {
    const shareText = `Check out ${destination.name}, ${destination.country}! ${destination.summary}`;
    
    if (navigator.share) {
      navigator.share({
        title: `${destination.name} - WanderWise`,
        text: shareText,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(shareText);
      toast({
        title: "Copied to clipboard!",
        description: "Share this destination with your friends",
      });
    }
  };

  return (
    <div
      className="group bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-500 hover:shadow-2xl hover:scale-105 hover:-translate-y-2"
      style={{
        animation: `fadeIn 0.6s ease-out ${index * 0.2}s backwards`,
      }}
      data-testid={`card-destination-${index}`}
    >
      <div className="relative h-56 overflow-hidden">
        <img
          src={destination.imageUrl}
          alt={destination.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        
        <Button
          onClick={handleShare}
          size="icon"
          variant="secondary"
          className="absolute top-3 right-3 rounded-full bg-white/90 hover:bg-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
          data-testid={`button-share-${index}`}
        >
          <Share2 className="w-4 h-4" />
        </Button>
        
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-2xl font-bold text-white mb-1" data-testid={`text-destination-name-${index}`}>
            {destination.name}
          </h3>
          <div className="flex items-center text-white/90 text-sm">
            <MapPin className="w-4 h-4 mr-1" />
            <span className="font-serif">{destination.country}</span>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-4">
        {destination.subtitle && (
          <p className="text-sm font-semibold text-accent italic">
            {destination.subtitle}
          </p>
        )}

        <p className="text-foreground/80 font-serif leading-relaxed">
          {destination.summary}
        </p>

        <div className="pt-2">
          <div className="flex items-center gap-2 mb-3">
            <Activity className="w-4 h-4 text-secondary" />
            <h4 className="text-sm font-bold text-foreground">
              Top Activities
            </h4>
          </div>
          <div className="space-y-2">
            {destination.activities.slice(0, 3).map((activity, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <span className="text-primary text-lg">•</span>
                <span className="text-sm text-muted-foreground font-serif flex-1">{activity}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-primary/10 flex items-center justify-between">
          <div className="space-y-1">
            <div className="text-xs text-muted-foreground font-medium">Estimated Budget</div>
            <div className="flex items-center text-2xl font-bold text-primary">
              <DollarSign className="w-5 h-5" />
              <span data-testid={`text-cost-${index}`}>{destination.estimatedCost.toLocaleString()}</span>
            </div>
          </div>
          
          {destination.bestTime && (
            <div className="text-right space-y-1">
              <div className="text-xs text-muted-foreground font-medium">Best Time</div>
              <div className="flex items-center justify-end gap-1 text-sm font-semibold text-secondary">
                <Calendar className="w-4 h-4" />
                <span>{destination.bestTime}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
