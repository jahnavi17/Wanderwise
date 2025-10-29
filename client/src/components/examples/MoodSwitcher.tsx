import { useState } from 'react';
import MoodSwitcher, { type MoodTheme } from '../MoodSwitcher';

export default function MoodSwitcherExample() {
  const [mood, setMood] = useState<MoodTheme>('adventure');

  return (
    <div className="p-4">
      <MoodSwitcher currentMood={mood} onMoodChange={setMood} />
      <p className="mt-4 text-sm text-muted-foreground">Current mood: {mood}</p>
    </div>
  );
}
