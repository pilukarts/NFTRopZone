
import Link from 'next/link';
import { NftDeliveryForm } from '@/components/nft-delivery-form';
import { Button } from '@/components/ui/button';

export default function Home() {
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
