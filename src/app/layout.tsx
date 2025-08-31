import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import Link from 'next/link';
import { Facebook, Instagram, MessageCircle, Twitter } from 'lucide-react';

export const metadata: Metadata = {
  title: 'NFT Drop Zone',
  description: 'A secure form for NFT delivery.',
};

const socialLinks = [
    { name: 'Opensea (pilukartsWorls)', href: 'https://opensea.io/pilukartsWorls' },
    { name: 'Opensea (pilukartsinlondon)', href: 'https://opensea.io/pilukartsinlondon' },
    { name: 'Foundation', href: 'https://foundation.app/@pilukarts?username=pilukarts' },
    { name: 'X', href: 'https://x.com/pilukarts' },
    { name: 'TikTok', href: 'https://www.tiktok.com/@pilukarts' },
    { name: 'Facebook', href: 'https://www.facebook.com/estudiocreativopilukarts' },
    { name: 'Instagram', href: 'https://www.instagram.com/pilukarts' }
]

const socialIcons = {
    X: <Twitter className="h-5 w-5" />,
    TikTok: <MessageCircle className="h-5 w-5" />,
    Facebook: <Facebook className="h-5 w-5" />,
    Instagram: <Instagram className="h-5 w-5" />
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased bg-background h-full flex flex-col">
        <div className="flex-grow">
          {children}
        </div>
        <footer className="bg-muted text-muted-foreground py-6 mt-auto">
          <div className="container mx-auto text-center">
             <div className="flex justify-center space-x-4 mb-4">
              {socialLinks.map(link => (
                <Link key={link.name} href={link.href} target="_blank" rel="noopener noreferrer" className="text-sm hover:underline" aria-label={link.name}>
                  {/* @ts-ignore */}
                  {socialIcons[link.name] ? socialIcons[link.name] : link.name}
                </Link>
              ))}
            </div>
            <div className="flex justify-center space-x-6 mb-4">
              <Link href="/contact" className="text-sm hover:underline">Contact</Link>
              <Link href="/terms" className="text-sm hover:underline">Terms of Service</Link>
              <Link href="/rules" className="text-sm hover:underline">Rules</Link>
            </div>
            <p className="text-xs">&copy; {new Date().getFullYear()} NFT Drop Zone. All rights reserved.</p>
          </div>
        </footer>
        <Toaster />
      </body>
    </html>
  );
}
