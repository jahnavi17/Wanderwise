import Navbar from "@/components/Navbar";
import { Link } from "wouter";
import { ArrowLeft, Globe, Heart, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-100 via-blue-50 to-teal-100">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <Link href="/">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </Link>

        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-12 border border-primary/10">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            About WanderWise
          </h1>

          <div className="space-y-8 text-foreground/80">
            <section>
              <div className="flex items-center gap-3 mb-4">
                <Globe className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-bold text-foreground">Our Mission</h2>
              </div>
              <p className="text-lg leading-relaxed">
                WanderWise is your AI-powered travel companion, designed to inspire and simplify your journey planning. 
                We believe that everyone deserves to discover amazing destinations that match their unique preferences, 
                budget, and travel style.
              </p>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-4">
                <Lightbulb className="w-6 h-6 text-secondary" />
                <h2 className="text-2xl font-bold text-foreground">How It Works</h2>
              </div>
              <p className="text-lg leading-relaxed mb-4">
                Simply tell us your travel preferences - budget, duration, preferred travel month, and mood - 
                and our AI will generate personalized destination recommendations tailored just for you.
              </p>
              <ul className="list-disc list-inside space-y-2 text-lg ml-4">
                <li>AI-powered recommendations based on your preferences</li>
                <li>Multi-currency support for global travelers</li>
                <li>Detailed destination insights and activities</li>
                <li>Budget-friendly options for every traveler</li>
              </ul>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-4">
                <Heart className="w-6 h-6 text-accent" />
                <h2 className="text-2xl font-bold text-foreground">Built With Care</h2>
              </div>
              <p className="text-lg leading-relaxed">
                WanderWise was created to make travel planning accessible, exciting, and personalized. 
                Whether you're seeking adventure, relaxation, culture, or romance, we're here to help you 
                discover your next perfect destination.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
