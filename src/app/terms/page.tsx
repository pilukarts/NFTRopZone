
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function TermsPage() {
  return (
    <main className="container mx-auto p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-4xl font-bold">Términos de Servicio</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl mx-auto text-muted-foreground space-y-4">
            <h2 className="font-bold">1. Aceptación de los Términos</h2>
            <p>Al acceder y utilizar NFT Drop Zone, aceptas y te comprometes a cumplir estos Términos de Servicio. Si no estás de acuerdo, no debes utilizar nuestra plataforma.</p>

            <h2 className="font-bold">2. Descripción del Servicio</h2>
            <p>NFT Drop Zone es una plataforma para la entrega segura de Non-Fungible Tokens (NFTs). Nosotros facilitamos el proceso de entrega, pero no somos dueños, vendedores ni intermediarios de los NFTs listados.</p>

            <h2 className="font-bold">3. Responsabilidades del Usuario</h2>
            <p>Eres el único responsable de la seguridad de tu wallet y de las contraseñas. Cualquier transacción iniciada desde tu wallet será considerada como autorizada por ti.</p>

            <h2 className="font-bold">4. Tarifas y Pagos</h2>
            <p>Todas las transacciones en la blockchain de Ethereum requieren "gas fees". Eres responsable de pagar estas tarifas. Todas las compras de NFTs son finales y no reembolsables.</p>
            
            <h2 className="font-bold">5. Propiedad Intelectual</h2>
            <p>Al adquirir un NFT a través de nuestra plataforma, obtienes la propiedad del token según lo define su contrato inteligente subyacente. Los derechos de autor sobre la obra de arte original permanecen con el creador, a menos que se especifique lo contrario.</p>
            
            <h2 className="font-bold">6. Limitación de Responsabilidad</h2>
            <p>NFT Drop Zone no será responsable de ninguna pérdida financiera, incluyendo, entre otros, la pérdida de criptomonedas o NFTs.</p>

            <h2 className="font-bold">7. Modificaciones de los Términos</h2>
            <p>Nos reservamos el derecho de modificar estos términos en cualquier momento. Te notificaremos de los cambios importantes, pero es tu responsabilidad revisar los términos periódicamente.</p>
          </CardContent>
        </Card>
        <div className="text-center mt-8">
            <Button asChild variant="outline">
                <Link href="/">Volver al Inicio</Link>
            </Button>
        </div>
      </div>
    </main>
  );
}
