import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";
import { User } from "@/types/models";

export function ContactSection({ vendor }: { vendor: User }) {
  return (
    <section id="contact" className="px-2 lg:px-8 py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Get in Touch
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Have questions? We're here to help. Reach out to us through any of
            these channels
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                <Phone className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Phone</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Call us directly
              </p>
              <a
                href="tel:+2348012345678"
                className="text-sm font-medium text-muted-foreground blur-sm hover:underline"
              >
                {vendor.phoneNumber}
              </a>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Email</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Send us a message
              </p>
              <a
                href="mailto:info@elitecommerce.ng"
                className="text-sm font-medium text-muted-foreground blur-sm hover:underline"
              >
                info@elitecommerce.ng
              </a>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Location</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Visit our store
              </p>
              <p className="text-sm font-medium text-muted-foreground blur-sm">
                {vendor?.vendorProfile?.address ?? ""}
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">
                Business Hours
              </h3>
              <p className="text-sm text-muted-foreground mb-3">
                Mon - Sat: 9AM - 7PM
              </p>
              <p className="text-sm font-medium text-muted-foreground blur-sm">
                Sunday: 10AM - 5PM
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="max-w-2xl mx-auto">
          <CardContent className="p-8">
            <div className="text-center mb-6">
              <MessageCircle className="h-12 w-12 text-muted-foreground blur-sm mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-foreground mb-2">
                Start a Conversation
              </h3>
              <p className="text-muted-foreground">
                Our team typically responds within 2 hours during business hours
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button size="lg" className="flex-1">
                <Phone className="h-4 w-4 mr-2" />
                Call Now
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="flex-1 bg-transparent"
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                Send Message
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
