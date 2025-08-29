
import { NftDeliveryForm } from '@/components/nft-delivery-form';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-full flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-lg space-y-4">
        <div className="text-center">
            <h1 className="text-4xl font-bold">Bienvenido a NFT Zone</h1>
            <p className="text-muted-foreground">Tu lugar para asegurar NFTs exclusivos.</p>
        </div>
        <div className="flex justify-center">
            <Button asChild>
                <Link href="/nfts">Ver Galería de NFTs</Link>
            </Button>
        </div>
        <NftDeliveryForm />
      </div>
    </main>
  );
}
