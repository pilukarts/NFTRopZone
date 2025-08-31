
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Phone, MapPin } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function ContactPage() {
  return (
    <main className="container mx-auto p-4 sm:p-6 lg:p-8">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-4xl font-bold">Contact Us</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-center text-muted-foreground">
              Have a question? We're here to help.
            </p>
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <Mail className="h-6 w-6 mt-1 text-primary" />
                <div>
                  <h3 className="font-semibold">Email</h3>
                  <a href="mailto:support@nftdropzone.com" className="text-primary hover:underline">
                    support@nftdropzone.com
                  </a>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Phone className="h-6 w-6 mt-1 text-primary" />
                <div>
                  <h3 className="font-semibold">Phone</h3>
                  <p className="text-muted-foreground">+1 (555) 123-4567</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <MapPin className="h-6 w-6 mt-1 text-primary" />
                <div>
                  <h3 className="font-semibold">Address</h3>
                  <p className="text-muted-foreground">123 Crypto Street, Metaverse City, 404</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <div className="text-center mt-8">
            <Button asChild variant="outline">
                <Link href="/">Back to Home</Link>
            </Button>
        </div>
      </div>
    </main>
  );
}
