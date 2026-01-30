import { Mail, Phone, MessageCircle, CreditCard, Calendar, HelpCircle } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function ContactUsPage() {
  const supportCategories = [
    {
      icon: HelpCircle,
      title: "Customer Care",
      description: "General inquiries and assistance",
      contact: "support@travelforevents.com",
      phone: "+1 (555) 123-4567",
    },
    {
      icon: CreditCard,
      title: "Package Price Inquiry",
      description: "Custom pricing and package details",
      contact: "pricing@travelforevents.com",
      phone: "+1 (555) 123-4568",
    },
    {
      icon: Calendar,
      title: "Booking Support",
      description: "Help with reservations and modifications",
      contact: "bookings@travelforevents.com",
      phone: "+1 (555) 123-4569",
    },
    {
      icon: MessageCircle,
      title: "Payment Issues",
      description: "Transaction and refund assistance",
      contact: "payments@travelforevents.com",
      phone: "+1 (555) 123-4570",
    },
  ];

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto max-w-6xl px-4 py-16">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="mb-3 text-4xl font-bold tracking-tight">Contact Us</h1>
          <p className="text-lg text-muted-foreground">
            We're here to help. Choose the support category that best fits your need.
          </p>
        </div>

        {/* Support Categories Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {supportCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <Card key={index} className="p-6 transition-shadow hover:shadow-md">
                <div className="mb-4 flex items-start gap-4">
                  <div className="rounded-lg bg-primary/10 p-3">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h2 className="mb-1 text-xl font-semibold">{category.title}</h2>
                    <p className="text-sm text-muted-foreground">{category.description}</p>
                  </div>
                </div>
                <div className="space-y-2 border-t border-border pt-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <a
                      href={`mailto:${category.contact}`}
                      className="text-foreground hover:text-primary transition-colors"
                    >
                      {category.contact}
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <a
                      href={`tel:${category.phone}`}
                      className="text-foreground hover:text-primary transition-colors"
                    >
                      {category.phone}
                    </a>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Business Hours */}
        <div className="mt-12 rounded-xl border border-border bg-card p-6 text-center">
          <h3 className="mb-2 text-lg font-semibold">Business Hours</h3>
          <p className="text-muted-foreground">
            Monday - Friday: 9:00 AM - 6:00 PM (EST)
          </p>
          <p className="text-muted-foreground">
            Saturday - Sunday: 10:00 AM - 4:00 PM (EST)
          </p>
          <p className="mt-3 text-sm text-muted-foreground">
            We typically respond within 24 hours
          </p>
        </div>
      </div>
    </main>
  );
}
