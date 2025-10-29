import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plane, DollarSign, Calendar, Clock, Heart } from "lucide-react";

interface TravelFormProps {
  onSubmit: (preferences: TravelPreferences) => void;
  isLoading?: boolean;
}

export interface TravelPreferences {
  budget: number;
  duration: number;
  month: string;
  mood: string;
}

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const moods = ["Relaxing", "Adventurous", "Cultural", "Romantic"];

export default function TravelForm({ onSubmit, isLoading = false }: TravelFormProps) {
  const [budget, setBudget] = useState("");
  const [duration, setDuration] = useState("");
  const [month, setMonth] = useState("");
  const [mood, setMood] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!budget || !duration || !month || !mood) {
      return;
    }

    onSubmit({
      budget: Number(budget),
      duration: Number(duration),
      month,
      mood,
    });
  };

  const isFormValid = budget && duration && month && mood;

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto">
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-10 border border-primary/10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="budget" className="text-sm font-semibold text-foreground flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-primary" />
              Budget (USD)
            </Label>
            <Input
              id="budget"
              data-testid="input-budget"
              type="number"
              placeholder="e.g., 2000"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="h-12 rounded-xl border-2 border-primary/20 focus:border-primary transition-colors"
              min="0"
              step="100"
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="duration" className="text-sm font-semibold text-foreground flex items-center gap-2">
              <Clock className="w-4 h-4 text-secondary" />
              Duration (Days)
            </Label>
            <Input
              id="duration"
              data-testid="input-duration"
              type="number"
              placeholder="e.g., 7"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="h-12 rounded-xl border-2 border-primary/20 focus:border-primary transition-colors"
              min="1"
              max="365"
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="month" className="text-sm font-semibold text-foreground flex items-center gap-2">
              <Calendar className="w-4 h-4 text-accent" />
              Travel Month
            </Label>
            <Select value={month} onValueChange={setMonth} disabled={isLoading}>
              <SelectTrigger id="month" data-testid="select-month" className="h-12 rounded-xl border-2 border-primary/20">
                <SelectValue placeholder="Select a month" />
              </SelectTrigger>
              <SelectContent>
                {months.map((m) => (
                  <SelectItem key={m} value={m}>
                    {m}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="mood" className="text-sm font-semibold text-foreground flex items-center gap-2">
              <Heart className="w-4 h-4 text-accent" />
              Mood
            </Label>
            <Select value={mood} onValueChange={setMood} disabled={isLoading}>
              <SelectTrigger id="mood" data-testid="select-mood" className="h-12 rounded-xl border-2 border-primary/20">
                <SelectValue placeholder="Select your mood" />
              </SelectTrigger>
              <SelectContent>
                {moods.map((m) => (
                  <SelectItem key={m} value={m}>
                    {m}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button
          type="submit"
          data-testid="button-generate"
          className="w-full h-14 text-lg font-bold mt-8 rounded-xl bg-gradient-to-r from-primary to-secondary hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
          disabled={!isFormValid || isLoading}
        >
          <Plane className="w-5 h-5 mr-2" />
          Get Recommendations
        </Button>
      </div>
    </form>
  );
}
