
"use client";

import { useSearchParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

export default function ErrorPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const reason = searchParams.get('reason');

  let errorMessage = "Ocurrió un error inesperado.";
  if (reason === 'payment_failed') {
    errorMessage = "El pago no pudo ser procesado. Por favor, inténtalo de nuevo.";
  }

  return (
    <main className="flex min-h-full flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
      <Card className="w-full max-w-lg text-center shadow-2xl">
        <CardHeader>
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
            <AlertTriangle className="h-6 w-6 text-red-600" />
          </div>
          <CardTitle className="mt-4">Error en el Proceso</CardTitle>
          <CardDescription>{errorMessage}</CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={() => router.push('/')}>Volver al formulario</Button>
        </CardContent>
      </Card>
    </main>
  );
}
