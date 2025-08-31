
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { BadgeCheck, Ban, Zap } from 'lucide-react';


export default function RulesPage() {
  return (
    <main className="container mx-auto p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-4xl font-bold">Community Rules</CardTitle>
            <p className="text-muted-foreground pt-2">To maintain a safe and respectful community, please follow these rules.</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-start space-x-4 p-4 rounded-lg bg-secondary/50">
              <BadgeCheck className="h-8 w-8 mt-1 text-green-500" />
              <div>
                <h3 className="font-semibold">Be Respectful</h3>
                <p className="text-muted-foreground">Treat all community members with respect. Harassment, hate speech, or any form of discrimination will not be tolerated.</p>
              </div>
            </div>
            <div className="flex items-start space-x-4 p-4 rounded-lg bg-secondary/50">
              <Zap className="h-8 w-8 mt-1 text-yellow-500" />
              <div>
                <h3 className="font-semibold">Secure Transactions</h3>
                <p className="text-muted-foreground">Always double-check wallet addresses and transaction details before confirming any payment. Practice due diligence and protect your assets.</p>
              </div>
            </div>
            <div className="flex items-start space-x-4 p-4 rounded-lg bg-secondary/50">
              <Ban className="h-8 w-8 mt-1 text-red-500" />
              <div>
                <h3 className="font-semibold">No Illegal Activities</h3>
                <p className="text-muted-foreground">Do not use the platform for money laundering, terrorist financing, or any other illegal activities. Accounts found in violation will be reported to the authorities.</p>
              </div>
            </div>
             <div className="flex items-start space-x-4 p-4 rounded-lg bg-secondary/50">
              <Ban className="h-8 w-8 mt-1 text-red-500" />
              <div>
                <h3 className="font-semibold">No Spam</h3>
                <p className="text-muted-foreground">Do not post unsolicited links, promotions, or any form of spam in community areas.</p>
              </div>
            </div>
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
