import { Globe } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="py-4 px-4">
      <div className="container mx-auto max-w-7xl flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
            <Globe className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            WanderWise
          </span>
        </div>
        
        <div className="hidden md:flex items-center gap-8">
          <a href="#" className="text-sm font-semibold text-foreground hover:text-primary transition-colors">
            Home
          </a>
          <a href="#" className="text-sm font-semibold text-foreground hover:text-primary transition-colors">
            About
          </a>
          <a href="#" className="text-sm font-semibold text-foreground hover:text-primary transition-colors">
            Contact
          </a>
        </div>
      </div>
    </nav>
  );
}
