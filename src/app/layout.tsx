import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'NFT Drop Zone',
  description: 'A secure form for NFT delivery.',
};

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
