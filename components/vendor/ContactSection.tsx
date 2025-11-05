import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";
import { BusinessProfile, User } from "@/types/models";
import { FaWhatsapp } from "react-icons/fa";
import ShowContactButton from "../atoms/ShowContactButton";

export function ContactSection({
  vendor,
}: {
  vendor: BusinessProfile & { user: User };
}) {
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

        <div className="flex flex-col flex-wrap md:flex-row justify-center items-center gap-6 mb-12 ">
          <Card className="hover:shadow-lg transition-shadow w-64 ">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                <Phone className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Phone</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Call us directly
              </p>
              <ShowContactButton
                userPhoneNumber={vendor.user.phone_number ?? "No contact info"}
              />
            </CardContent>
          </Card>

          {vendor.user.whatsapp_number && (
            <Card className="hover:shadow-lg transition-shadow w-64">
              <CardContent className="p-6 text-center">
                <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                  <FaWhatsapp className="h-6 w-6 text-green-500" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">WhatsApp</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Send us a message
                </p>
                <ShowContactButton
                  userPhoneNumber={vendor.user.whatsapp_number}
                  type="whatsapp"
                />
              </CardContent>
            </Card>
          )}

          {/* <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Location</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Visit our store
              </p>
              <p className="text-sm font-medium text-muted-foreground blur-sm">
                {vendor?.user?.address ?? ""}
              </p>
            </CardContent>
          </Card> */}

          {/* <Card className="hover:shadow-lg transition-shadow">
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
          </Card> */}
        </div>

        {/* <Card className="max-w-2xl mx-auto">
          <CardContent className="p-8">
            <div className="text-center mb-6">
              <MessageCircle className="h-12 w-12 text-muted-foreground  mx-auto mb-4" />
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
                Show contact
              </Button>
         
            </div>
          </CardContent>
        </Card> */}
      </div>
    </section>
  );
}
