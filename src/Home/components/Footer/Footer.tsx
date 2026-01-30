import Link from "next/link";
import { Facebook, Twitter, Instagram, Mail, MapPin, Phone, Ticket } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border mt-20">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Ticket className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold tracking-tight text-foreground">
                TripFactory<span className="text-primary">Live</span>
              </span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              We curate world-class travel experiences around the biggest global events. 
              From the front row to your hotel room, we handle the details.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Explore Events</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/category/sports" className="hover:text-primary transition-colors">Sports & Cricket</Link></li>
              <li><Link href="/category/music" className="hover:text-primary transition-colors">Music & Concerts</Link></li>
              <li><Link href="/category/racing" className="hover:text-primary transition-colors">Grand Prix Racing</Link></li>
              <li><Link href="/category/festivals" className="hover:text-primary transition-colors">Global Festivals</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/how-it-works" className="hover:text-primary transition-colors">How it Works</Link></li>
              <li><Link href="/itinerary" className="hover:text-primary transition-colors">Plan Itinerary</Link></li>
              <li><Link href="/support" className="hover:text-primary transition-colors">Support Center</Link></li>
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground mb-4">Get in Touch</h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-primary" />
                <span>New Delhi, India</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-primary" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-primary" />
                <span>hello@TripFactoryLive.com</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <p>© {currentYear} TripFactory Live. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-foreground">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-foreground">Terms of Service</Link>
            <Link href="/refund" className="hover:text-foreground">Refund Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}