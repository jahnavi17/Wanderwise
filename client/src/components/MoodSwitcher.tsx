import { useState } from "react";
import { Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export type MoodTheme = 'adventure' | 'relax' | 'romantic' | 'luxury';

interface MoodSwitcherProps {
  currentMood: MoodTheme;
  onMoodChange: (mood: MoodTheme) => void;
}

const moods = [
  { value: 'adventure' as MoodTheme, label: 'Adventure', emoji: '🔥', colors: 'text-orange-600' },
  { value: 'relax' as MoodTheme, label: 'Relax', emoji: '🌊', colors: 'text-cyan-600' },
  { value: 'romantic' as MoodTheme, label: 'Romantic', emoji: '💕', colors: 'text-pink-600' },
  { value: 'luxury' as MoodTheme, label: 'Luxury', emoji: '✨', colors: 'text-yellow-600' },
];

export default function MoodSwitcher({ currentMood, onMoodChange }: MoodSwitcherProps) {
  const currentMoodData = moods.find(m => m.value === currentMood);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="gap-2 rounded-full border-2 hover:scale-105 transition-transform"
          data-testid="button-mood-switcher"
        >
          <Palette className="w-4 h-4" />
          <span className="hidden sm:inline">Mood: {currentMoodData?.emoji}</span>
          <span className="sm:hidden">{currentMoodData?.emoji}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        {moods.map((mood) => (
          <DropdownMenuItem
            key={mood.value}
            onClick={() => onMoodChange(mood.value)}
            className="cursor-pointer"
            data-testid={`mood-${mood.value}`}
          >
            <span className="mr-2 text-lg">{mood.emoji}</span>
            <span className={mood.value === currentMood ? 'font-bold' : ''}>
              {mood.label}
            </span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
