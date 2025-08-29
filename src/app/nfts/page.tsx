
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const nfts = [
  {
    id: 'nft-1',
    name: 'CryptoPunk #7804',
    url: 'https://picsum.photos/400/400?random=1',
    price: '4200 ETH',
    dataAiHint: 'pixel art',
    description: 'Uno de los CryptoPunks más raros y codiciados, conocido por sus atributos únicos.'
  },
  {
    id: 'nft-2',
    name: 'Beeple, The First 5000 Days',
    url: 'https://picsum.photos/400/400?random=2',
    price: '$69.3M',
    dataAiHint: 'digital collage',
    description: 'Una obra de arte monumental que consiste en 5000 imágenes diarias creadas por el artista Beeple.'
  },
  {
    id: 'nft-3',
    name: 'Bored Ape Yacht Club #8817',
    url: 'https://picsum.photos/400/400?random=3',
    price: '$3.4M',
    dataAiHint: 'cartoon ape',
    description: 'Un simio dorado del exclusivo Bored Ape Yacht Club, un símbolo de estatus en el mundo cripto.'
  },
];

export default function NftsPage() {
  return (
    <main className="container mx-auto p-4 sm:p-6 lg:p-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold">Galería de NFTs</h1>
        <p className="text-muted-foreground">Explora nuestra colección de NFTs exclusivos.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {nfts.map((nft) => (
          <Card key={nft.id} className="flex flex-col">
            <CardHeader>
              <CardTitle>{nft.name}</CardTitle>
              <CardDescription>Precio: {nft.price}</CardDescription>
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
                <Link href="/">Ir a Comprar</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
        <div className="text-center mt-8">
            <Button asChild variant="outline">
                <Link href="/">Volver al Inicio</Link>
            </Button>
        </div>
    </main>
  );
}
