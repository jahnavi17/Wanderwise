import DestinationCard from '../DestinationCard';

export default function DestinationCardExample() {
  const mockDestination = {
    name: "Santorini",
    country: "Greece",
    subtitle: "Perfect for beach lovers",
    summary: "Experience breathtaking sunsets over the Aegean Sea in this iconic island paradise. White-washed buildings cascade down volcanic cliffs, creating one of the world's most photographed landscapes.",
    activities: [
      "Watch sunset from Oia Castle",
      "Explore ancient Akrotiri ruins",
      "Wine tasting at local vineyards",
      "Sail around the caldera",
    ],
    estimatedCost: 2800,
    bestTime: "Apr - Oct",
    imageUrl: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800&q=80",
  };

  return (
    <div className="max-w-sm">
      <DestinationCard destination={mockDestination} index={0} />
    </div>
  );
}
