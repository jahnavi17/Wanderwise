import { Plane } from "lucide-react";

interface LoadingSpinnerProps {
  message?: string;
}

export default function LoadingSpinner({ message = "Discovering your perfect destinations..." }: LoadingSpinnerProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 space-y-6" data-testid="loading-spinner">
      <div className="relative">
        <div className="absolute inset-0 animate-ping">
          <div className="w-20 h-20 rounded-full bg-primary/20" />
        </div>
        <div className="relative animate-bounce">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-xl">
            <Plane className="w-10 h-10 text-white animate-pulse" />
          </div>
        </div>
      </div>
      <p className="text-lg text-muted-foreground font-semibold font-serif">{message}</p>
      <div className="flex gap-2">
        <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0ms' }} />
        <div className="w-2 h-2 rounded-full bg-secondary animate-bounce" style={{ animationDelay: '150ms' }} />
        <div className="w-2 h-2 rounded-full bg-accent animate-bounce" style={{ animationDelay: '300ms' }} />
      </div>
    </div>
  );
}
