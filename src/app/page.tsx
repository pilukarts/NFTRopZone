
import Image from 'next/image';
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

const nfts = [
  {
    id: 'nft-1',
    name: 'Galactic Explorer',
    url: 'https://i.imgur.com/uGSNZ9e.jpeg',
    price: '2.5 ETH',
    dataAiHint: 'astronaut space',
    description:
      'Un explorador valiente flotando en la inmensidad del cosmos.',
  },
  {
    id: 'nft-2',
    name: 'Cyber-Samurai',
    url: 'https://i.imgur.com/QAv28u4.jpeg',
    price: '3.1 ETH',
    dataAiHint: 'samurai futuristic',
    description:
      'La fusión de la tradición ancestral y la tecnología futurista en un solo guerrero.',
  },
  {
    id: 'nft-3',
    name: 'Neon Overdrive',
    url: 'https://i.imgur.com/QKCX7qx.jpeg',
    price: '1.8 ETH',
    dataAiHint: 'car night',
    description:
      'Siente la velocidad y la adrenalina en una ciudad bañada por luces de neón.',
  },
  {
    id: 'nft-4',
    name: 'Mystic Feline',
    url: 'https://i.imgur.com/YoiO7mR.jpeg',
    price: '4.2 ETH',
    dataAiHint: 'cat magic',
    description:
      'Un ser enigmático que custodia los secretos de un mundo olvidado.',
  },
];

export default function Home() {
  return (
    <main className="flex min-h-full flex-col items-center justify-center p-4 sm:p-6 lg:p-8 space-y-8">
      <div className="w-full max-w-4xl text-center space-y-2">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          Bienvenido a NFT Drop Zone
        </h1>
        <p className="text-lg text-muted-foreground">
          Tu lugar para asegurar y recibir NFTs exclusivos de forma segura.
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
                    <Image
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
          <Link href="/nfts">Ver Galería Completa</Link>
        </Button>
      </div>

      <div id="form-section" className="w-full max-w-lg pt-8">
        <NftDeliveryForm />
      </div>
    </main>
  );
}
