
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
    name: 'CryptoPunk #7804',
    url: 'https://i.imgur.com/DXpmUKF.jpeg',
    price: '4200 ETH',
    dataAiHint: 'abstract art',
    description:
      'Una obra de arte abstracto que juega con la percepción y el color.',
  },
  {
    id: 'nft-2',
    name: 'Beeple, The First 5000 Days',
    url: 'https://picsum.photos/600/400?random=2',
    price: '$69.3M',
    dataAiHint: 'digital collage',
    description:
      'Una obra de arte monumental que consiste en 5000 imágenes diarias creadas por el artista Beeple.',
  },
  {
    id: 'nft-3',
    name: 'Bored Ape Yacht Club #8817',
    url: 'https://picsum.photos/600/400?random=3',
    price: '$3.4M',
    dataAiHint: 'cartoon ape',
    description:
      'Un simio dorado del exclusivo Bored Ape Yacht Club, un símbolo de estatus en el mundo cripto.',
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
