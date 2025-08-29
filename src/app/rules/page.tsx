
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
            <CardTitle className="text-4xl font-bold">Reglas de la Comunidad</CardTitle>
            <p className="text-muted-foreground pt-2">Para mantener una comunidad segura y respetuosa, por favor sigue estas reglas.</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-start space-x-4 p-4 rounded-lg bg-secondary/50">
              <BadgeCheck className="h-8 w-8 mt-1 text-green-500" />
              <div>
                <h3 className="font-semibold">Sé Respetuoso</h3>
                <p className="text-muted-foreground">Trata a todos los miembros de la comunidad con respeto. No se tolerará el acoso, el discurso de odio o cualquier tipo de discriminación.</p>
              </div>
            </div>
            <div className="flex items-start space-x-4 p-4 rounded-lg bg-secondary/50">
              <Zap className="h-8 w-8 mt-1 text-yellow-500" />
              <div>
                <h3 className="font-semibold">Transacciones Seguras</h3>
                <p className="text-muted-foreground">Verifica siempre las direcciones de las wallets y los detalles de la transacción antes de confirmar cualquier pago. Actúa con diligencia y protege tus activos.</p>
              </div>
            </div>
            <div className="flex items-start space-x-4 p-4 rounded-lg bg-secondary/50">
              <Ban className="h-8 w-8 mt-1 text-red-500" />
              <div>
                <h3 className="font-semibold">No Actividades Ilegales</h3>
                <p className="text-muted-foreground">No utilices la plataforma para el lavado de dinero, la financiación del terrorismo o cualquier otra actividad ilegal. Las cuentas que infrinjan esta regla serán reportadas a las autoridades.</p>
              </div>
            </div>
             <div className="flex items-start space-x-4 p-4 rounded-lg bg-secondary/50">
              <Ban className="h-8 w-8 mt-1 text-red-500" />
              <div>
                <h3 className="font-semibold">No Spam</h3>
                <p className="text-muted-foreground">No publiques enlaces no solicitados, promociones o cualquier forma de spam en las áreas de la comunidad.</p>
              </div>
            </div>
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
