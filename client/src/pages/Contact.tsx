import Navbar from "@/components/Navbar";
import { Link } from "wouter";
import { ArrowLeft, Mail, MessageSquare, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Contact() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-rose-100">
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
            Get In Touch
          </h1>

          <div className="space-y-8 text-foreground/80">
            <p className="text-lg leading-relaxed">
              Have questions, feedback, or suggestions? We'd love to hear from you! 
              WanderWise is constantly evolving to better serve travelers like you.
            </p>

            <section className="space-y-6">
              <div className="flex items-start gap-4 p-6 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl">
                <Mail className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-2">Email Us</h3>
                  <p className="text-lg">
                    <a href="mailto:hello@wanderwise.com" className="text-primary hover:underline">
                      hello@wanderwise.com
                    </a>
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    We typically respond within 24-48 hours
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-6 bg-gradient-to-r from-secondary/5 to-accent/5 rounded-2xl">
                <MessageSquare className="w-6 h-6 text-secondary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-2">Feedback</h3>
                  <p className="text-lg">
                    Your feedback helps us improve! Share your travel experiences and suggestions 
                    to help us make WanderWise even better.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-6 bg-gradient-to-r from-accent/5 to-primary/5 rounded-2xl">
                <Globe className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-2">Connect With Us</h3>
                  <p className="text-lg">
                    Follow us on social media for travel inspiration, tips, and updates about 
                    new features and destinations.
                  </p>
                </div>
              </div>
            </section>

            <div className="pt-6 border-t border-primary/10">
              <p className="text-center text-muted-foreground">
                Built for travelers, by travel enthusiasts
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
