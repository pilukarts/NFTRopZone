
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const nfts = [
  {
    id: 'nft-1',
    name: 'Galactic Explorer',
    url: 'https://i.imgur.com/uGSNZ9e.jpeg',
    price: '2.5 ETH',
    dataAiHint: 'astronaut space',
    description: 'A brave explorer floating in the vastness of the cosmos.'
  },
  {
    id: 'nft-2',
    name: 'Cyber-Samurai',
    url: 'https://i.imgur.com/QAv28u4.jpeg',
    price: '3.1 ETH',
    dataAiHint: 'samurai futuristic',
    description: 'The fusion of ancient tradition and futuristic technology in a single warrior.'
  },
  {
    id: 'nft-3',
    name: 'Neon Overdrive',
    url: 'https://i.imgur.com/QKCX7qx.jpeg',
    price: '1.8 ETH',
    dataAiHint: 'car night',
    description: 'Feel the speed and adrenaline in a city bathed in neon lights.'
  },
  {
    id: 'nft-4',
    name: 'Mystic Feline',
    url: 'https://i.imgur.com/YoiO7mR.jpeg',
    price: '4.2 ETH',
    dataAiHint: 'cat magic',
    description: 'An enigmatic being that guards the secrets of a forgotten world.'
  },
];

export default function NftsPage() {
  return (
    <main className="container mx-auto p-4 sm:p-6 lg:p-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold">NFT Gallery</h1>
        <p className="text-muted-foreground">Explore our collection of exclusive NFTs.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {nfts.map((nft) => (
          <Card key={nft.id} className="flex flex-col">
            <CardHeader>
              <CardTitle>{nft.name}</CardTitle>
              <CardDescription>Price: {nft.price}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="aspect-square relative w-full">
                <Image
                  src={nft.url}
                  alt={nft.name}
                  fill
                  className="rounded-md object-cover"
                  data-ai-hint={nft.dataAiHint}
                />
              </div>
              <p className="mt-4 text-sm text-muted-foreground">{nft.description}</p>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href="/">Go to Purchase</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
        <div className="text-center mt-8">
            <Button asChild variant="outline">
                <Link href="/">Back to Home</Link>
            </Button>
        </div>
    </main>
  );
}
