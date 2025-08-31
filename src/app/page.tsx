
"use client";

import Link from 'next/link';
import { NftDeliveryForm } from '@/components/nft-delivery-form';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import Autoplay from "embla-carousel-autoplay"
import React from 'react';

const featuredNfts = [
  {
    id: 'new-art',
    name: 'Newest Creation',
    url: 'https://i.imgur.com/Szb2zpE.png',
    dataAiHint: 'abstract art'
  },
  {
    id: 'nft-7',
    name: 'pixel art mix',
    url: 'https://i.imgur.com/uGSNZ9e.png',
    dataAiHint: 'pixel art',
  },
  {
    id: 'nft-3',
    name: 'SIlver Mini Lady',
    url: 'https://i.imgur.com/QAv28u4.jpeg',
    dataAiHint: 'silver lady'
  },
  {
    id: 'nft-4',
    name: 'Mine +Lady',
    url: 'https://i.imgur.com/QKCX7qx.jpeg',
    dataAiHint: 'lady mining'
  },
  {
    id: 'nft-6',
    name: 'Smile',
    url: 'https://i.imgur.com/2GeLwJA.jpeg',
    dataAiHint: 'smile illustration'
  },
  {
    id: 'y5ukdql',
    name: 'Abstract Form',
    url: 'https://i.imgur.com/y5ukdql.png',
    dataAiHint: 'abstract form'
  },
  {
    id: 'MkAITqU',
    name: 'Pixel Portrait',
    url: 'https://i.imgur.com/MkAITqU.png',
    dataAiHint: 'pixel portrait'
  },
  {
    id: '4X89LGY',
    name: 'Glass Cube',
    url: 'https://i.imgur.com/4X89LGY.png',
    dataAiHint: 'glass cube'
  },
  {
    id: '4vlQ1ec',
    name: 'Digital Bloom',
    url: 'https://i.imgur.com/4vlQ1ec.png',
    dataAiHint: 'digital bloom'
  },
  {
    id: 'qHFPFsu',
    name: 'Glitchy',
    url: 'https://i.imgur.com/qHFPFsu.jpeg',
    dataAiHint: 'glitch art'
  },
  {
    id: 'y0vnqwR',
    name: 'Pixelscape',
    url: 'https://i.imgur.com/y0vnqwR.jpeg',
    dataAiHint: 'pixelscape'
  }
];

export default function Home() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );
  
  return (
    <main className="flex min-h-full flex-col items-center justify-center p-4 sm:p-6 lg:p-8 space-y-8">
      <div className="w-full max-w-4xl text-center space-y-2">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          Welcome to NFT Drop Zone
        </h1>
        <p className="text-lg text-muted-foreground">
          Your place to securely claim and receive exclusive NFTs from Pilukarts.
        </p>
      </div>

      <Carousel 
        className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg" 
        opts={{ loop: true }}
        plugins={[plugin.current]}
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {featuredNfts.map((nft) => (
            <CarouselItem key={nft.id}>
              <div className="p-1">
                <Card>
                  <CardContent className="flex aspect-square items-center justify-center p-6 relative">
                     <Image
                        src={nft.url}
                        alt={nft.name}
                        fill
                        className="rounded-md object-cover"
                        data-ai-hint={nft.dataAiHint}
                      />
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>


      <div className="text-center space-y-4">
        <p className="text-muted-foreground">Explore my collections on the official marketplaces:</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
                <Link href="https://opensea.io/pilukartsWorld" target="_blank" rel="noopener noreferrer">View on OpenSea (Main)</Link>
            </Button>
             <Button asChild size="lg" variant="secondary">
                <Link href="https://opensea.io/pilukartsinlondon" target="_blank" rel="noopener noreferrer">View on OpenSea (London)</Link>
            </Button>
            <Button asChild size="lg">
                <Link href="https://foundation.app/@pilukarts?username=pilukarts" target="_blank" rel="noopener noreferrer">View on Foundation</Link>
            </Button>
        </div>
        <p className="text-sm text-muted-foreground pt-4">After choosing your NFT, come back here to complete the secure delivery.</p>
      </div>
      
      <div className="flex justify-center">
        <Button asChild size="lg">
          <Link href="/nfts">View Full Gallery</Link>
        </Button>
      </div>

      <div id="form-section" className="w-full max-w-lg pt-8">
        <NftDeliveryForm />
      </div>
    </main>
  );
}
