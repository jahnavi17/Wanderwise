import { Waves, Mountain, Building2, Wallet, Heart, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export type FilterType = 'beaches' | 'mountains' | 'city' | 'budget' | 'romantic' | 'surprise';

interface QuickFiltersProps {
  onFilterClick: (filter: FilterType) => void;
}

const filters = [
  { type: 'beaches' as FilterType, label: 'Beaches', icon: Waves, gradient: 'from-cyan-400 to-blue-500' },
  { type: 'mountains' as FilterType, label: 'Mountains', icon: Mountain, gradient: 'from-green-400 to-emerald-600' },
  { type: 'city' as FilterType, label: 'City Escapes', icon: Building2, gradient: 'from-purple-400 to-pink-500' },
  { type: 'budget' as FilterType, label: 'Budget Trips', icon: Wallet, gradient: 'from-yellow-400 to-orange-500' },
  { type: 'romantic' as FilterType, label: 'Romantic', icon: Heart, gradient: 'from-pink-400 to-rose-500' },
  { type: 'surprise' as FilterType, label: 'Surprise Me!', icon: Sparkles, gradient: 'from-indigo-400 to-purple-600' },
];

export default function QuickFilters({ onFilterClick }: QuickFiltersProps) {
  return (
    <div className="mb-8" id="quick-filters">
      <h3 className="text-sm font-semibold text-muted-foreground mb-4 text-center">
        Quick Filters
      </h3>
      <div className="flex flex-wrap justify-center gap-3">
        {filters.map((filter) => {
          const Icon = filter.icon;
          return (
            <Button
              key={filter.type}
              onClick={() => onFilterClick(filter.type)}
              className={`rounded-full bg-gradient-to-r ${filter.gradient} text-white border-0 hover:scale-110 hover:shadow-lg transition-all duration-300 px-5`}
              size="sm"
              data-testid={`filter-${filter.type}`}
            >
              <Icon className="w-4 h-4 mr-2" />
              {filter.label}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
