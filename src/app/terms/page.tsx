
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function TermsPage() {
  return (
    <main className="container mx-auto p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-4xl font-bold">Terms of Service</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl mx-auto text-muted-foreground space-y-4">
            <h2 className="font-bold">1. Acceptance of Terms</h2>
            <p>By accessing and using NFT Drop Zone, you accept and agree to be bound by these Terms of Service. If you do not agree, you should not use our platform.</p>

            <h2 className="font-bold">2. Service Description</h2>
            <p>NFT Drop Zone is a platform for the secure delivery of Non-Fungible Tokens (NFTs). We facilitate the delivery process but do not own, sell, or broker the NFTs listed.</p>

            <h2 className="font-bold">3. User Responsibilities</h2>
            <p>You are solely responsible for the security of your wallet and passwords. Any transactions initiated from your wallet will be considered as authorized by you.</p>

            <h2 className="font-bold">4. Fees and Payments</h2>
            <p>All transactions on the Ethereum blockchain require "gas fees." You are responsible for paying these fees. All NFT purchases are final and non-refundable.</p>
            
            <h2 className="font-bold">5. Intellectual Property</h2>
            <p>By acquiring an NFT through our platform, you gain ownership of the token as defined by its underlying smart contract. Copyright over the original artwork remains with the creator, unless otherwise specified.</p>
            
            <h2 className="font-bold">6. Limitation of Liability</h2>
            <p>NFT Drop Zone shall not be liable for any financial losses, including but not to, loss of cryptocurrencies or NFTs.</p>

            <h2 className="font-bold">7. Modification of Terms</h2>
            <p>We reserve the right to modify these terms at any time. We will notify you of any significant changes, but it is your responsibility to review the terms periodically.</p>
          </CardContent>
        </Card>
        <div className="text-center mt-8">
            <Button asChild variant="outline">
                <Link href="/">Back to Home</Link>
            </Button>
        </div>
      </div>
    </main>
  );
}
