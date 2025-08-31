
import Link from 'next/link';

import { NftDeliveryForm } from '@/components/nft-delivery-form';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ProtectedImage } from '@/components/protected-image';

const nfts = [
    {
    id: 'nft-1',
    name: 'Galactic Explorer',
    url: 'https://i.imgur.com/uGSNZ9e.jpeg',
    dataAiHint: 'astronaut space',
    description:
      'A brave explorer floating in the vastness of the cosmos.',
  },
  {
    id: 'nft-2',
    name: 'Cyber-Samurai',
    url: 'https://i.imgur.com/QAv28u4.jpeg',
    dataAiHint: 'samurai futuristic',
    description:
      'The fusion of ancient tradition and futuristic technology in a single warrior.',
  },
  {
    id: 'nft-3',
    name: 'Neon Overdrive',
    url: 'https://i.imgur.com/QKCX7qx.jpeg',
    dataAiHint: 'car night',
    description:
      'Feel the speed and adrenaline in a city bathed in neon lights.',
  },
  {
    id: 'nft-4',
    name: 'Mystic Feline',
    url: 'https://i.imgur.com/YoiO7mR.jpeg',
    dataAiHint: 'cat magic',
    description:
      'An enigmatic being that guards the secrets of a forgotten world.',
  },
];

export default function Home() {
  return (
    <main className="flex min-h-full flex-col items-center justify-center p-4 sm:p-6 lg:p-8 space-y-8">
      <div className="w-full max-w-4xl text-center space-y-2">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          Welcome to NFT Drop Zone
        </h1>
        <p className="text-lg text-muted-foreground">
          Your place to securely claim and receive exclusive NFTs.
        </p>
      </div>

      <Carousel
        opts={{
          loop: true,
        }}
        className="w-full max-w-4xl"
      >
        <CarouselContent>
          {nfts.map((nft) => (
            <CarouselItem key={nft.id}>
              <div className="p-1">
                <Card>
                  <CardContent className="relative aspect-[3/2] flex items-center justify-center p-0">
                    <ProtectedImage
                      src={nft.url}
                      alt={nft.name}
                      fill
                      className="rounded-lg object-cover"
                      data-ai-hint={nft.dataAiHint}
                    />
                    <div className="absolute inset-0 bg-black/50 rounded-lg flex flex-col justify-end p-6">
                      <h3 className="text-2xl font-bold text-white">{nft.name}</h3>
                      <p className="text-white/80">{nft.description}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="ml-16" />
        <CarouselNext className="mr-16" />
      </Carousel>

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
